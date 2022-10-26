import {FC} from 'react';
import {Table} from '../../components/pages/connectedCampaigns/Table';
import {Layout} from "../../components/layout";
import {find} from "../../lib/dato-cms";
import {ConnectedContractT} from "../../utils/interfaces";

export async function getStaticProps() {
  const campaigns = await find("adminConnectedCampaign")

  return {
    props: { campaigns },
    revalidate: 1
  };
}

const ConnectedCampaigns: FC<{ campaigns: Array<ConnectedContractT> }> = ({ campaigns }) => <Layout hasAuth={true}><Table campaigns={campaigns} /></Layout>

export { ConnectedCampaigns as default };
