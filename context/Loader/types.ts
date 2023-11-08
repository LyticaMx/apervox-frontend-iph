
export interface State {
  show: boolean
}

export interface Actions {
  show: () => void
  hide: () => void
  toggle: () => void
}

export interface ContextType extends State {
  actions?: Actions
}

