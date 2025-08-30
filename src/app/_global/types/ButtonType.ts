type ButtonType = {
  children: React.ReactNode | string
  width?: number | string
  height?: number
  color?: string
  fontcolor?: string
  fontSize?: string
  center?: boolean
  borderradius?: number | string
  onClick?: () => void;
}

export default ButtonType
