import { NextResponse } from "next/server";
import fs from "fs/promises";
import { getLogFilePath } from "@/utils/logger";

export async function GET() {
  const filePath = getLogFilePath();

  try {
    const data = await fs.readFile(filePath, "utf-8");
    const agentLogs = JSON.parse(data);
    return NextResponse.json(agentLogs);
  } catch (error) {
    // If file doesn't exist (e.g. first run on Vercel), return empty array
    if ((error as any).code === 'ENOENT') {
      return NextResponse.json([]);
    }
    
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
