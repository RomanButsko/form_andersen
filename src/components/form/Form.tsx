import { ChangeEvent, useState } from 'react'
import { Questionary } from '../questionary/Questionary'
import { IFormData } from './form.inteface'
import style from './Form.module.sass'
import FormInput from './Input/FormInput'
import { fields } from './formItems'
import { FormTextarea } from './Textarea/formTextarea'
import { Button } from '../../ui/Button/Button'
import {
  handleNameChange,
  handlePhoneChange,
  handleWebsiteChange,
} from './form.validation'
import { constants } from '../../consts'

const initialFormValues = {
  firstName: '',
  lastName: '',
  birthday: '',
  phone: '',
  website: '',
  aboutMe: '',
  technology: '',
  lastProject: '',
}

const formValues = Object.assign({}, initialFormValues)
const formErrorsData = Object.assign({}, initialFormValues)

export const Form = () => {
  const [valid, setValid] = useState<boolean>(false)
  const [formValue, setFormValue] = useState<IFormData>(formValues)
  const [formErrors, setFormErrors] = useState<IFormData>(formErrorsData)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget
    let newValue = value
    let errors = { ...formErrors }

    switch (name) {
      case 'firstName':
      case 'lastName':
        handleNameChange(newValue, name, errors)
        break
      case 'phone':
        errors[name] = ''
        newValue = handlePhoneChange(newValue)
        break
      case 'birthday':
        errors[name] = ''
        break
      case 'website':
        handleWebsiteChange(newValue, name, errors)
        break
      case 'aboutMe':
      case 'technology':
      case 'lastProject':
        newValue.length > constants.maxCountSymbol
          ? (errors[name] = 'Превышен лимит симоволов')
          : (errors[name] = '')
        break
      default:
        break
    }
    setFormValue((prevState) => ({ ...prevState, [name]: newValue }))
    setFormErrors(errors)
  }

  const clear = (e: any) => {
    e.preventDefault()
    setValid(false)
    setFormErrors(initialFormValues), setFormValue(initialFormValues)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const errors: any = {}
    let isFormValid = true
    Object.entries(formValue).forEach(([field, value]) => {
      if (!value.trim()) {
        isFormValid = false
        errors[field] = 'Поле пустое. Заполните пожалуйста'
      }
    })
    if (!isFormValid) {
      setFormErrors((prevState) => ({ ...prevState, ...errors }))
      return
    }
    let isEmptyErrors = Object.values(formErrors).filter((item) => item)
    if (Object.keys(errors).length === 0 && !isEmptyErrors.length) {
      setValid(true)
    }
  }

  return (
    <div className={style.wrapper}>
      {!valid ? (
        <form className={style.container} onSubmit={handleSubmit}>
          <h1>Создание анкеты</h1>
          {fields.map((elem) => {
            return elem.type === 'input' ? (
              <div className={style.container_field} key={elem.field}>
                <FormInput
                  field={elem.field as keyof IFormData}
                  label={elem.label as keyof IFormData}
                  handleChange={handleChange}
                  value={formValue}
                  errors={formErrors}
                />
              </div>
            ) : (
              <div className={style.container_field} key={elem.field}>
                <FormTextarea
                  field={elem.field as keyof IFormData}
                  label={elem.label as keyof IFormData}
                  handleChange={handleChange}
                  value={formValue}
                  errors={formErrors}
                />
              </div>
            )
          })}
          <div className={style.container_btns}>
            <Button onClick={clear} className={style.container_reset}>
              Отмена
            </Button>
            <Button className={style.container_submit}>Сохранить</Button>
          </div>
        </form>
      ) : (
        <Questionary {...formValue} />
      )}
    </div>
  )
}
