import {PropsWithChildren} from "react";
import './Title.scss';
import cx from "classnames";

type Props = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  upperCase?: boolean;
}

const Title = ({ children, level = 1, className, upperCase }: PropsWithChildren<Props>) => {
  const setClassNames = (level: number) => cx(className, `typography-title typography-title-${level}`, upperCase && 'upperCase');

  switch (level) {
    case 1:
      return <h1 className={setClassNames(1)}>{children}</h1>;
    case 2:
      return <h2 className={setClassNames(2)}>{children}</h2>;
    case 3:
      return <h3 className={setClassNames(3)}>{children}</h3>;
    case 4:
      return <h4 className={setClassNames(4)}>{children}</h4>;
    case 5:
      return <h5 className={setClassNames(5)}>{children}</h5>;
    case 6:
      return <h6 className={setClassNames(6)}>{children}</h6>;
  }
}

export { Title }
