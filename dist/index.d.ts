/**
 * Pi Execution Timer Extension
 *
 * - During execution: "Working... 3s" (updates every second)
 * - After completion: "Started: 14:30:00 | Finished: 14:30:03 | Duration: 3s | TPS: 42.5"
 */
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
export default function executionTimer(pi: ExtensionAPI): void;
