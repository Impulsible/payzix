import * as React from "react"

const TOAST_LIMIT = 3
const TOAST_REMOVE_DELAY = 5000
const DEFAULT_TOAST_DURATION = 5000

export type ToastVariant = "default" | "success" | "error" | "info"

export type ToastProps = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactElement
  variant?: ToastVariant
  duration?: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

type ActionType = typeof actionTypes

type Action =
  | { type: ActionType["ADD_TOAST"]; toast: ToastProps }
  | { type: ActionType["UPDATE_TOAST"]; toast: Partial<ToastProps> & { id: string } }
  | { type: ActionType["DISMISS_TOAST"]; toastId?: string }
  | { type: ActionType["REMOVE_TOAST"]; toastId?: string }

interface State {
  toasts: ToastProps[]
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()
const toastDurationTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

function clearTimeoutFromMap(
  map: Map<string, ReturnType<typeof setTimeout>>,
  toastId: string
) {
  const timeout = map.get(toastId)
  if (timeout) {
    clearTimeout(timeout)
    map.delete(toastId)
  }
}

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) return

  clearTimeoutFromMap(toastDurationTimeouts, toastId)

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({ type: "REMOVE_TOAST", toastId })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

const scheduleAutoDismiss = (toastId: string, duration: number) => {
  clearTimeoutFromMap(toastDurationTimeouts, toastId)

  if (duration <= 0) return

  const timeout = setTimeout(() => {
    toastDurationTimeouts.delete(toastId)
    dispatch({ type: "DISMISS_TOAST", toastId })
  }, duration)

  toastDurationTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => addToRemoveQueue(toast.id))
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? { ...t, open: false }
            : t
        ),
      }
    }

    case "REMOVE_TOAST": {
      if (action.toastId === undefined) {
        toastTimeouts.forEach((_, id) => clearTimeoutFromMap(toastTimeouts, id))
        toastDurationTimeouts.forEach((_, id) =>
          clearTimeoutFromMap(toastDurationTimeouts, id)
        )
        return { ...state, toasts: [] }
      }

      clearTimeoutFromMap(toastTimeouts, action.toastId)
      clearTimeoutFromMap(toastDurationTimeouts, action.toastId)

      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
    }
  }
}

const listeners: Array<(state: State) => void> = []
let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => listener(memoryState))
}

type ToastOptions = Omit<ToastProps, "id" | "open" | "onOpenChange">

function toast({ duration = DEFAULT_TOAST_DURATION, ...props }: ToastOptions) {
  const id = genId()

  const update = (next: ToastOptions) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...next, id },
    })

  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      duration,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  scheduleAutoDismiss(id, duration)

  return { id, dismiss, update }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }