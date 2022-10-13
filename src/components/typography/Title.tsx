import {PropsWithChildren} from "react";

type Props = {
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

const Title = ({ children, level }: PropsWithChildren<Props>) => {
  return (
    <div>{children}</div>
  )
}

export { Title }
