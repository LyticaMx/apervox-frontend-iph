/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentClass, FunctionComponent, ReactElement, ReactNode } from "react";

interface Props {
    children: ReactNode
}


export const withProvider = <P, >(Component: ComponentClass | FunctionComponent, ...providers: Array<ComponentClass<P> | FunctionComponent<P>>): (() => ReactElement) => {
    const displayName = Component.displayName ?? Component.name ?? 'Component'

    const CombinedProviders = providers.reduce(
        (AccumulatedComponents: FunctionComponent<Props> | ComponentClass<Props>, CurrentComponent: any) => {
          return function Combined({ children }: Props): JSX.Element {
            return (
              <AccumulatedComponents>
                <CurrentComponent>{children}</CurrentComponent>
              </AccumulatedComponents>
            )
          }
        },
        ({ children }: Props) => <>{children}</>
      )
    
      const Providers = (): ReactElement => <CombinedProviders><Component/></CombinedProviders> 

      Providers.displayName = `withProviders (${displayName})`
      
      return Providers
}
