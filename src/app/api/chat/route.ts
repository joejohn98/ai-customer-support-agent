import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

const data: string[] = [];

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Hello from the chat API!" });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await streamText({
      model: google("gemini-2.5-flash-lite"),
      prompt:
        "You are a helpful assistant. Please provide a concise and informative response to the following user input:\n\n" +
        body.message,
    });
    for await (const textPart of result.textStream) {
      data.push(textPart);
    }
    const text = data.join("").replace(/\n/g, "");
    return NextResponse.json({ message: text });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to parse request body",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
