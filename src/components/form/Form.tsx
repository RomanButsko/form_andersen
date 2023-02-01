import { Component } from 'react'
import style from './Form.module.sass'

class Form extends Component {
    render() {
        return (
            <div className={style.wrapper}>
            <form className={style.container}>
                <h1>Создание анкеты</h1>
                <div>
                    <label htmlFor="firstName">Имя:</label>
                    <input type="text" id='firstName' name="firstName" placeholder='Имя' />
                </div>
                <div>
                    <label htmlFor="lastName">Фамилия:</label>
                    <input type="text" id="lastName" name="lastName" placeholder='Фамилия' />
                </div>
                <div>
                    <label htmlFor="birthday">Дата Рождения:</label>
                    <input type="date" id="birthday" name="birthday" placeholder='Дата рождения' />
                </div>
                <div>
                    <label htmlFor="phone">Телефон:</label>
                    <input type="text" id="phone" name="phone" placeholder='Телефон'/>
                </div>
                <div>
                    <label htmlFor="website">Сайт:</label>
                    <input type="text" id="website" name="website" placeholder='Сайт' />
                </div>
                <div>
                    <label htmlFor="aboutMe">О себе:</label>
                    <textarea id="aboutMe" name="aboutMe" rows={7} placeholder='О себе'/>
                </div>
                <div>
                    <label htmlFor="technology">Стек технологий:</label>
                    <textarea
                        rows={7}
                        id="technology"
                        name="technology"
                        placeholder='Стек технологий'
                    />
                </div>
                <div>
                    <label htmlFor="lastProject">
                    Описание последнего проекта:
                    </label>
                    <textarea
                        id="lastProject"
                        rows={7}
                        name="lastProject"
                        placeholder='Описание последнего проекта'
                    />
                </div>
                <div>
                    <button type="button" className={style.container_reset}>Отмена</button>
                    <button type="submit" className={style.container_submit}>Сохранить</button>
                </div>
            </form>
            </div>
        )
    }
}

export default Form
