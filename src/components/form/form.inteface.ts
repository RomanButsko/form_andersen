export interface IForm {
  isValid: boolean
  value: IFormData
  errors: IFormData
  countSymbol: countForm
}

export type countForm = {
  aboutMe: number
  technology: number
  lastProject: number
}

export interface IFormData {
  firstName: string
  lastName: string
  birthday: string
  phone: string
  website: string
  aboutMe: string
  technology: string
  lastProject: string
}
