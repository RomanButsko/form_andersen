import { ChangeEvent, Component } from 'react'
import { constants } from '../../consts'
import { Questionary } from '../questionary/Questionary'
import { countForm, IForm, IFormData } from './form.inteface'
import style from './Form.module.sass'
import { fields } from './formItems'

class Form extends Component {
  state: IForm = {
    isValid: false,
    value: {
      firstName: '',
      lastName: '',
      birthday: '',
      phone: '',
      website: '',
      aboutMe: '',
      technology: '',
      lastProject: '',
    },
    errors: {
      firstName: '',
      lastName: '',
      birthday: '',
      phone: '',
      website: '',
      aboutMe: '',
      technology: '',
      lastProject: '',
    },
    countSymbol: {
      aboutMe: constants.maxCountSymbol,
      lastProject: constants.maxCountSymbol,
      technology: constants.maxCountSymbol,
    },
  }

  isFirstLetterUppercase = (value: string) => value && value[0] !== value[0].toUpperCase()
  
  handleNameChange(
    newValue: IFormData[keyof IFormData],
    name: keyof IFormData,
    errors: IForm['errors']
  ) {
    if (this.isFirstLetterUppercase(newValue)) errors[name] = 'Первая буква должна быть большой!'
    else errors[name] = ''
  }

  handlePhoneChange(newValue: IFormData['phone']) {
    const match = newValue
      .replace(/\D/g, '')
      .match(/(\d{0,1})(\d{0,4})(\d{0,2})(\d{0,2})/)
      
    if (!match) return ''

    return !match[1]
      ? ''
      : `${match[1]}-${match[2].slice(0, 4)}${match[3] ? `-${match[3]}` : ''}${
          match[4] ? `-${match[4]}` : ''
        }`
  }

  handleWebsiteChange(
    newValue: IFormData['website'],
    name: 'website',
    errors: IForm['errors']
  ) {
    if (newValue.length >= constants.siteCheck.length) {
      if (!newValue.startsWith(constants.siteCheck)) {
        errors[name] = `Поле должно начинаться с ${constants.siteCheck}`
      } else {
        errors[name] = ''
      }
    } else {
      errors[name] = ''
    }
  }

  handleTextChange(
    newValue:
      | IFormData['aboutMe']
      | IFormData['technology']
      | IFormData['lastProject'],
    name: 'aboutMe' | 'technology' | 'lastProject',
    countSymbol: IForm['countSymbol']
  ) {
    countSymbol[name] = newValue
      ? constants.maxCountSymbol - newValue.length
      : constants.maxCountSymbol
  }

  handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget
    let newValue = value
    let errors: IForm['errors'] = { ...this.state.errors }
    let countSymbol: IForm['countSymbol'] = { ...this.state.countSymbol }

    if (name === 'firstName' || name === 'lastName') {
      this.handleNameChange(newValue, name, errors)
    } else if (name === 'phone') {
      errors[name] = ''
      newValue = this.handlePhoneChange(newValue)
    } else if (name === 'birthday') {
      errors[name] = ''
    } else if (name === 'website') {
      this.handleWebsiteChange(newValue, name, errors)
    } else if (
      name === 'aboutMe' ||
      name === 'technology' ||
      name === 'lastProject'
    ) {
      if (newValue.length > constants.maxCountSymbol) {
        errors[name] = 'Превышен лимит симоволов'
      } else {
        errors[name] = ''
      }
      this.handleTextChange(newValue, name, countSymbol)
    }

    this.setState({
      value: { ...this.state.value, [name]: newValue },
      errors,
      countSymbol,
    })
  }

  clear = () => {
    this.setState({
      isValid: false,
      value: {
        firstName: '',
        lastName: '',
        birthday: '',
        phone: '',
        website: '',
        aboutMe: '',
        technology: '',
        lastProject: '',
      },
      errors: {},
      countSymbol: {
        aboutMe: constants.maxCountSymbol,
        lastProject: constants.maxCountSymbol,
        technology: constants.maxCountSymbol,
      },
    })
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formValues = this.state.value
    const errors: any = {}
    let isFormValid = true
    Object.entries(formValues).forEach(([field, value]) => {
      if (!value.trim()) {
        isFormValid = false
        errors[field as keyof IFormData] = 'Поле пустое. Заполните пожалуйста'
      }
    })
    if (!isFormValid) {
      this.setState({ errors: { ...this.state.errors, ...errors } })
      return
    }
    let isEmptyErrors = Object.values(this.state.errors).filter(
      (item) => item.length >= 1
    )
    if (Object.keys(errors).length === 0 && !isEmptyErrors.length) {
      this.setState({ isValid: true })
    }
  }

  render() {
    return (
      <div className={style.wrapper}>
        {!this.state.isValid ? (
          <form className={style.container} onSubmit={this.handleSubmit}>
            <>
              <h1>Создание анкеты</h1>
              {fields.map((elem) => {
                return elem.type === 'input' ? (
                  <div className={style.container_field} key={elem.field}>
                    <label htmlFor={elem.field}>{elem.label}</label>
                    <input
                      type={elem.field === 'birthday' ? 'date' : 'text'}
                      id={elem.label}
                      name={elem.field}
                      value={this.state.value[elem.field as keyof IFormData]}
                      onChange={this.handleChange}
                      placeholder={elem.label}
                    />
                    {this.state.errors[elem.field as keyof IFormData] && (
                      <div className={style.container_field__mistake}>
                        {this.state.errors[elem.field as keyof IFormData]}
                      </div>
                    )}
                    {elem.field === 'aboutMe' &&
                      this.state.countSymbol[elem.field] >= 0 && (
                        <div
                          className={style.container_field__count}
                        >{`Осталось ${this.state.countSymbol[elem.field]}/${
                          constants.maxCountSymbol
                        } символов`}</div>
                      )}
                  </div>
                ) : (
                  <div className={style.container_field} key={elem.field}>
                    <label htmlFor={elem.field}>{elem.label}</label>
                    <textarea
                      rows={7}
                      id={elem.field}
                      name={elem.field}
                      value={this.state.value[elem.field as keyof IFormData]}
                      onChange={this.handleChange}
                      placeholder={elem.label}
                    />
                    {!this.state.value[elem.field as keyof IFormData].trim() &&
                      this.state.errors[elem.field as keyof IFormData] && (
                        <div className={style.container_field__mistake}>
                          {this.state.errors[elem.field as keyof IFormData]}
                        </div>
                      )}
                    {this.state.countSymbol[elem.field as keyof countForm] >=
                    0 ? (
                      <div
                        className={style.container_field__count}
                      >{`Осталось ${
                        this.state.countSymbol[elem.field as keyof countForm]
                      }/${constants.maxCountSymbol} символов`}</div>
                    ) : (
                      <div className={style.container_field__mistake}>
                        Превышен лимит символов в поле
                      </div>
                    )}
                  </div>
                )
              })}
              <div className={style.container_btns}>
                <button
                  type="button"
                  onClick={this.clear}
                  className={style.container_reset}
                >
                  Отмена
                </button>
                <button type="submit" className={style.container_submit}>
                  Сохранить
                </button>
              </div>
            </>
          </form>
        ) : (
          <Questionary {...this.state.value} />
        )}
      </div>
    )
  }
}

export default Form
