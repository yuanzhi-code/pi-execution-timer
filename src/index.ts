/**
 * Pi Execution Timer Extension
 *
 * - During execution: "Working... 3s" (updates every second)
 * - After completion: "Started: 14:30:00 | Finished: 14:30:03 | Duration: 3s | TPS: 42.5"
 */

import type { ExtensionAPI, ExtensionContext } from "@mariozechner/pi-coding-agent";

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('zh-CN', { hour12: false });
}

function calculateTPS(messages: any[], durationMs: number): number | null {
  if (durationMs <= 0) return null;
  
  let totalOutputTokens = 0;
  for (const msg of messages) {
    if (msg.role === 'assistant' && msg.usage) {
      totalOutputTokens += msg.usage.output || 0;
    }
  }
  
  if (totalOutputTokens === 0) return null;
  
  const durationSeconds = durationMs / 1000;
  return totalOutputTokens / durationSeconds;
}

export default function executionTimer(pi: ExtensionAPI): void {
  let startTime: Date | null = null;
  let timer: ReturnType<typeof setInterval> | null = null;

  function stopTimer(): void {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function startTimer(ctx: ExtensionContext): void {
    stopTimer();
    startTime = new Date();
    ctx.ui.setWorkingMessage(`Working... 0s`);
    
    timer = setInterval(() => {
      if (startTime === null) return;
      const elapsed = Date.now() - startTime.getTime();
      ctx.ui.setWorkingMessage(`Working... ${formatDuration(elapsed)}`);
    }, 1000);
  }

  pi.on("agent_start", async (_event, ctx) => {
    ctx.ui.setWidget("exec-timer", undefined); // 清空上次结果
    startTimer(ctx);
  });

  pi.on("agent_end", async (_event, ctx) => {
    stopTimer();
    if (startTime === null) return;
    
    const endTime = new Date();
    const elapsed = endTime.getTime() - startTime.getTime();
    
    const startStr = formatTime(startTime);
    const endStr = formatTime(endTime);
    const durationStr = formatDuration(elapsed);
    
    ctx.ui.setWorkingMessage(); // 恢复默认
    const theme = ctx.ui.theme;
    
    // 计算 TPS
    const tps = calculateTPS(_event.messages, elapsed);
    const tpsStr = tps !== null ? ` | TPS: ${tps.toFixed(1)}` : '';
    
    ctx.ui.setWidget("exec-timer", [
      theme.fg("dim", `Started: ${startStr} | Finished: ${endStr} | Duration: ${durationStr}${tpsStr}`)
    ]);
    
    startTime = null;
  });

  pi.on("session_shutdown", async (_event, _ctx) => {
    stopTimer();
    startTime = null;
  });
}
