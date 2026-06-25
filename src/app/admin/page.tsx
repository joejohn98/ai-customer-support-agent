"use client";

import { useEffect, useState } from "react";

// Define the shape of your log data
type LogEntry = {
  id: string;
  date: string;
  action: string;
  status: string;
  details: Record<string, string>;
};

export default function AdminDashboard() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const fetchLogs = async () => {
    const response = await fetch("/api/logs");
    const data = await response.json();
    setLogs(data);
  };

  useEffect(() => {
    Promise.resolve().then(() => fetchLogs());
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Agent Reasoning Logs</h1>

      <div className="bg-gray-900 p-6 rounded-lg font-mono text-sm h-150 overflow-y-auto shadow-xl">
        {logs.length === 0 ? (
          <p className="text-gray-500">Waiting for agent activity...</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="mb-4 border-b border-gray-700 pb-4">
              <span className="text-gray-400">[{log.date}]</span>{" "}
              <strong className="text-white">{log.action}</strong>
              <span
                className={`ml-2 px-2 py-1 rounded text-xs text-white ${
                  log.status === "completed"
                    ? "bg-green-600"
                    : log.status === "failed"
                      ? "bg-red-600"
                      : log.status === "found"
                        ? "bg-yellow-600"
                        : "bg-blue-600"
                }`}
              >
                {log.status}
              </span>
              <div className="mt-2 space-y-2 overflow-x-auto rounded bg-gray-800 p-3 text-xs leading-relaxed text-gray-300">
                {Object.entries(log.details).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-gray-500">{key}: </span>
                    <span className="whitespace-pre-wrap">
                      {value.split("\\n").join("\n")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
