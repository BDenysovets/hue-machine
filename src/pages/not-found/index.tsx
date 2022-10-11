import {FC} from "react";
import {DefaultLayout} from "../../components/layout/DefaultLayout";
import balloon from './assets/balloon.svg'

const NotFound: FC = () => {
  return (
    <DefaultLayout hasFooter={false}>
      <h1>404 Page</h1>
      <img src={balloon} alt="balloon"/>
    </DefaultLayout>
  )
}

export default NotFound
