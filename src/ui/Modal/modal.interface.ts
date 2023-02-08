export interface IModal {
  title: string
  show: boolean
  onClose: (value: boolean) => void
}
