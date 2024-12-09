import { getAuthDebugInfo } from './authDebugger';

type LogLevel = 'info' | 'warning' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  details?: unknown;
}

class AuthLogger {
  private logs: LogEntry[] = [];
  private readonly MAX_LOGS = 100;

  log(level: LogLevel, message: string, details?: unknown) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      details,
    };

    this.logs.unshift(entry);
    if (this.logs.length > this.MAX_LOGS) {
      this.logs.pop();
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Auth ${level.toUpperCase()}]`, message, details || '');
    }
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }

  logAuthState() {
    const debugInfo = getAuthDebugInfo();
    this.log('info', 'Current auth state', debugInfo);
    return debugInfo;
  }
}

export const authLogger = new AuthLogger();