import fs from "fs/promises";
import path from "path";

export async function saveAgentLog(
  action: string,
  status: string,
  details: Record<string, string>,
) {
  const filePath = path.join(process.cwd(), "src/agent-logs.json");

  const newLog = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    action,
    status,
    details,
  };
  try {
    const existingData = await fs.readFile(filePath, "utf-8");
    const logs = existingData ? JSON.parse(existingData) : [];

    logs.unshift(newLog);
    await fs.writeFile(filePath, JSON.stringify(logs, null, 2), "utf8");
  } catch (error) {
    await fs.writeFile(filePath, JSON.stringify([newLog], null, 2), "utf8");
    console.error("Error writing agent log:", error);
  }
}
``;
