import { constants } from '../../consts'
import { IFormData } from './form.inteface'

export const isFirstLetterUppercase = (value: string) =>
  value && value[0] !== value[0].toUpperCase()

export const handleNameChange = (
  newValue: IFormData[keyof IFormData],
  name: keyof IFormData,
  errors: IFormData
) => {
  if (isFirstLetterUppercase(newValue))
    errors[name] = 'Первая буква должна быть большой!'
  else errors[name] = ''
}

export const handlePhoneChange = (newValue: IFormData['phone']) => {
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

export const handleWebsiteChange = (
  newValue: IFormData['website'],
  name: 'website',
  errors: IFormData
) => {
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
