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

export interface IFormFields {
  field: keyof IFormData
  label: keyof IFormData
  handleChange: (value: any) => void
  errors: IFormData
  value: IFormData
}

export interface IFormBtns {
  clear: () => void
}
