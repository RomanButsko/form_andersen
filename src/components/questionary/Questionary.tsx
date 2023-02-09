import { FC } from 'react'
import { useOutside } from '../../hooks/useOutside'
import { Modal } from '../../ui/Modal/Modal'
import { IFormData } from '../form/form.inteface'
import { Portal } from './../../portal/Portal'
import style from './Questionary.module.sass'

export const Questionary: FC<IFormData> = ({
  firstName,
  lastName,
  birthday,
  phone,
  website,
  aboutMe,
  technology,
  lastProject,
}) => {
  const { ref, isShow, setIsShow } = useOutside(true)

  const closePopup = () => {
    setIsShow(false)
  }

  return (
    <>
      {isShow && (
        <Portal>
          <div ref={ref}>
            <Modal show={isShow} onClose={closePopup} title="Успешно">
              <p>Данные были успешно обработаны</p>
            </Modal>
          </div>
        </Portal>
      )}
      <div className={`${style.container} ${isShow && style.container_hide}`}>
        <div className={style.container_name}>{`${firstName} ${lastName}`}</div>
        <div className={style.container_phone}>
          <i>Телефон:</i> {phone}
        </div>
        <div className={style.container_site}>
          <i>Веб-сайт:</i> {website}
        </div>
        <div className={style.container_birthday}>
          <i>Дата Рождения:</i> {birthday}
        </div>
        <div className={style.container_descr}>
          <i>Обо мне:</i>{' '}
          <div className={style.container_indent}>{aboutMe}</div>
        </div>
        <div className={style.container_lastProj}>
          <i>Последний проект:</i>{' '}
          <div className={style.container_indent}>{lastProject}</div>
        </div>
        <div className={style.container_technology}>
          <i>Технологии:</i>{' '}
          <div className={style.container_indent}>{technology}</div>
        </div>
      </div>
    </>
  )
}
