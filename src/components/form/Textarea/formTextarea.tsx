import { FC } from 'react'
import { IFormFields } from '../form.inteface'
import { constants } from '../../../consts/index'
import style from './FormTextarea.module.sass'

export const FormTextarea: FC<IFormFields> = ({
  label,
  field,
  value,
  errors,
  handleChange,
}) => {
  const { maxCountSymbol } = constants
  return (
    <>
      <label htmlFor={field}>{label}</label>
      <textarea
        rows={7}
        id={field}
        name={field}
        value={value[field]}
        onChange={handleChange}
        placeholder={label}
      />
      {!value[field].trim() && errors[field] && (
        <div className={style.mistake}>{errors[field]}</div>
      )}
      {value[field].length <= maxCountSymbol ? (
        <div className={style.count}>{`Осталось ${
          maxCountSymbol - value[field].length
        }/${maxCountSymbol} символов`}</div>
      ) : (
        <div className={style.mistake}>Превышен лимит символов в поле</div>
      )}
    </>
  )
}
