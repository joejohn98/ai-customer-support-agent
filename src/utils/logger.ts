import fs from "fs/promises";
import path from "path";
import os from "os";

export const getLogFilePath = () => {
  if (process.env.VERCEL === "1") {
    return path.join(os.tmpdir(), "agent-logs.json");
  }
  return path.join(process.cwd(), "src/data/agent-logs.json");
};

export async function saveAgentLog(
  action: string,
  status: string,
  details: Record<string, string>,
) {
  const filePath = getLogFilePath();

  const newLog = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    action,
    status,
    details,
  };
  try {
    const fileData = await fs.readFile(filePath, "utf-8");
    const logs = JSON.parse(fileData);

    logs.unshift(newLog);
    await fs.writeFile(filePath, JSON.stringify(logs, null, 2));
  } catch (error) {
    await fs.writeFile(filePath, JSON.stringify([newLog], null, 2));
    console.error("Error saving agent log:", error);
  }
}
