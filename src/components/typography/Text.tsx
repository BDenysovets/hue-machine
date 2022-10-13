import {PropsWithChildren} from "react";

type Props = {
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

const Text = ({ children }: PropsWithChildren<Props>) => {
  return (
    <div>{children}</div>
  )
}

export { Text }
