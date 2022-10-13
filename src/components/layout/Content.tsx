import {PropsWithChildren} from "react";
import './Content.scss'

type Props = {
  className?: string;
};

const Content = ({className, children}: PropsWithChildren<Props>) => (
  <div className={className}>
    <div className="content">
      <div className="wrapper">
        {children}
      </div>
    </div>
  </div>
)

export {Content};
