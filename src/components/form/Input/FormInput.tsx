import { FC } from 'react'
import { IFormData, IFormFields } from '../form.inteface'
import style from './FormInput.module.sass'

const FormInput: FC<IFormFields> = ({
  label,
  field,
  handleChange,
  errors,
  value,
}) => {
  return (
    <>
      <label htmlFor={field}>{label}</label>
      <input
        type={field === 'birthday' ? 'date' : 'text'}
        id={label}
        name={field}
        value={value[field as keyof IFormData]}
        onChange={handleChange}
        placeholder={label}
      />
      {errors[field as keyof IFormData] && (
        <div className={style.mistake}>{errors[field as keyof IFormData]}</div>
      )}
    </>
  )
}

export default FormInput
