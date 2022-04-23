import {FC} from 'react'
import { MainLayout } from '../../components/layout/mainLayout'
import {useAuth} from "../../contexts/Auth";
import {Login} from "./Login";
import {List} from "./List";


const Campaigns: FC = () => {
  const { authenticated } = useAuth()

  console.log(authenticated)

  return (
    <MainLayout>
      {authenticated ? <List /> : <Login />}
    </MainLayout>
  )
}

export { Campaigns as default }
