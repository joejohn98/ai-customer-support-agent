import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "src/data/agent-logs.json");

  try {
    const data = await fs.readFile(filePath, "utf-8");
    const agentLogs = JSON.parse(data);
    return NextResponse.json(agentLogs);
  } catch (error) {
    console.error("Error reading agent logs:", error);
    return NextResponse.json(
      {
        error: "Something went wrong ! Internal Server Error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
