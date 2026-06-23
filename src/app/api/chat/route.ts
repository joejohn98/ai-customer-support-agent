import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Hello from the chat API!" });
}

export async function POST(request: NextRequest) {
  try {
    throw new Error("Simulated error for testing purposes");
    const body = await request.json();
    return NextResponse.json({ message: "Hello from the chat API!", body });
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