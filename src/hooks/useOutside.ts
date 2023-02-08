import { SetStateAction, useState, Dispatch, useRef, useEffect } from 'react'

type TypeOut = {
  ref: any
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
}

export const useOutside = (initialIsVisible: boolean): TypeOut => {
  const [isShow, setIsShow] = useState(initialIsVisible)
  const ref = useRef<HTMLElement>(null)

  const handleClickOutside = (event: any) => {
    console.log('Зашли')
    if (ref.current && !ref.current.contains(event.target)) {
      console.log('Зашли2')
      setIsShow(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return { ref, isShow, setIsShow }
}
