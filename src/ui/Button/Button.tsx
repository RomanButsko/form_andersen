import { PropsWithChildren } from 'react'
import { FC } from 'react'
import { IButton } from './button.interface'

export const Button: FC<PropsWithChildren<IButton>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  )
}
