import { FC, PropsWithChildren } from 'react'
import { IModal } from './modal.interface'
import style from './Modal.module.sass'

export const Modal: FC<PropsWithChildren & IModal> = ({
  title,
  onClose,
  children,
  show,
}) => {
  const closeHandler = () => {
    onClose(false)
  }

  return (
    <div
      style={{
        visibility: show ? 'visible' : 'hidden',
        opacity: show ? '1' : '0',
      }}
      className={style.container}
    >
      <div className={style.container_wrapper}>
        <h2 className={style.container_wrapper__title}>{title}</h2>
        <span className={style.container_wrapper__close} onClick={closeHandler}>
          &times;
        </span>
        <div className={style.container_wrapper__content}>{children}</div>
      </div>
    </div>
  )
}
