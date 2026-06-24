import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { google } from "@ai-sdk/google";
import { stepCountIs, streamText } from "ai";
import z from "zod";
import mockData from "@/mockData.json";

function removeMessageNewlines(message: string) {
  return message
    .replace(/(?:\\n|\r?\n)+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Hello from the chat API!" });
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages) {
      return NextResponse.json(
        {
          error:
            "Invalid request body. 'messages' field is required and must be an array.",
        },
        { status: 400 },
      );
    }

    const result = await streamText({
      model: google("gemini-3.1-flash-lite"),
      system: `You are a strict but polite customer support AI.
    Today's date is ${new Date().toISOString().split("T")[0]}.
    You process refunds by strictly following these rules:
    1. Electronics are refundable within 7 days of delivery.
    2. Clothing is refundable within 15 days if unused.
    3. Food items are non-refundable.
    4. Digital products are non-refundable once accessed.
    5. Refund is denied if product is damaged by customer.
    6. Refund is denied if product is used and category requires unused condition.
    7. Refund is denied if order status is not Delivered.
    8. Refund is denied if customer has more than 3 refunds in the last 30 days.
    9. Refund is approved only after all applicable policy checks pass.
    
    CRITICAL INSTRUCTION: You must ALWAYS use the lookupOrder tool to fetch the customer's data before answering. Do not guess or assume order details. If the user does not provide an Order ID, politely ask them for it.`,
      messages,

      tools: {
        lookupOrder: {
          description: "Fetches order details for a given Order ID.",
          inputSchema: z.object({
            orderId: z
              .string()
              .describe("The order ID provided by the customer."),
          }),
          execute: async ({ orderId }: { orderId: string }) => {
            console.log(
              `Gemini is looking up order details for Order ID: ${orderId}`,
            );

            for (const customer of mockData) {
              const order = customer.orders.find(
                (order) => order.orderId === orderId,
              );
              if (order) {
                console.log(`Found order details for Order ID: ${orderId}`);
                return { success: true, data: { customer, order } };
              }
            }
            console.log(`No order details found for Order ID: ${orderId}`);
            return {
              success: false,
              error: "Order not found. Ask user to verify ID",
            };
          },
        },
      },
      stopWhen: stepCountIs(5),
    });

    let text = "";

    for await (const textPart of result.textStream) {
      text += textPart;
    }
    const data = removeMessageNewlines(text);
    return NextResponse.json({ message: data });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong ! Internal Server Error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
