import {FC} from 'react'
import {useAuth} from "../../contexts/Auth";
import {Login} from "./Login";
import {List} from "./List";
import {CampaignsLayout} from "../../components/layout/campaignsLayout";
import {MainLayout} from "../../components/layout/mainLayout";


const Campaigns: FC = () => {
  const { authenticated } = useAuth()

  return authenticated ? (
    <CampaignsLayout>
      <List />
    </CampaignsLayout>
  ) : (
    <MainLayout>
      <Login />
    </MainLayout>
  )
}

export { Campaigns as default }
