import { useState, useMemo, ReactNode, ReactElement } from 'react'

import { LoaderContext } from './LoaderContext'

interface Props {
  children: ReactNode
}

const LoaderProvider = ({ children }: Props): ReactElement => {
  const [show, setShow] = useState<boolean>(false)

  const showLoader = (): void => {
    setShow(true)
  }
  const hideLoader = (): void => {
    setShow(false)
  }
  const toggleLoader = (): void => {
    setShow(prev => !prev)
  }

  const contextValue = useMemo(
    () => ({
      show,
      actions: {
        show: showLoader,
        hide: hideLoader,
        toggle: toggleLoader
      }
    }),
    [show]
  )

  return (
    <LoaderContext.Provider value={contextValue}>
      {children}
    </LoaderContext.Provider>
  )
}

export { LoaderProvider }
