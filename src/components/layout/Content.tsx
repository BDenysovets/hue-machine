import {PropsWithChildren} from "react";
import cx from "classnames";
import './Content.scss'

type Props = {
  className?: string;
};

const Content = ({className, children}: PropsWithChildren<Props>) => (
  <div className={cx('content', className)}>
    <div className="wrapper">
      {children}
    </div>
  </div>
)

export {Content};
