import { reactive } from 'vue'

export interface ActionLogEntry {
  id: string
  eventName: string
  payload: unknown[]
  timestamp: Date
}

export interface ActionLogger {
  logs: ActionLogEntry[]
  logAction: (eventName: string, ...payload: unknown[]) => void
  clearLogs: () => void
}

export function createActionLogger(maxLogs = 50): ActionLogger {
  const logs = reactive<ActionLogEntry[]>([])

  function logAction(eventName: string, ...payload: unknown[]) {
    const normalize = payload.map((p) => {
      return p instanceof Event ? p.constructor.name : p
    })

    const entry: ActionLogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      eventName,
      payload: normalize,
      timestamp: new Date(),
    }

    logs.unshift(entry)

    if (logs.length > maxLogs) {
      logs.pop()
    }
  }

  function clearLogs() {
    logs.length = 0
  }

  return {
    logs,
    logAction,
    clearLogs,
  }
}
