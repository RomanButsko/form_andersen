import { Component } from 'react'
import { IFormData } from '../form/form.inteface'
import style from './Questionary.module.sass'

export class Questionary extends Component<IFormData> {
  render() {
    const {
      firstName,
      lastName,
      birthday,
      phone,
      website,
      aboutMe,
      technology,
      lastProject,
    } = this.props
    return (
      <div className={style.container}>
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
    )
  }
}
