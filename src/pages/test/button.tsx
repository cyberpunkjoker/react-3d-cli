import { FC } from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = (props) => {
  const { onClick, children } = props

  return (
    <div onClick={onClick}>{children}</div>
  )
}

export default Button;