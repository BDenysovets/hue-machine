import {FC} from 'react';
import {Table} from '../../components/pages/campaigns/Table';
import {ContractT} from '../../lib/nft-port';
import {Layout} from "../../components/layout";
import {find} from "../../lib/dato-cms";

export async function getStaticProps() {
  const contracts = await find("adminCampaign")

  return {
    props: { contracts },
    revalidate: 1
  };
}

const Campaigns: FC<{ contracts: Array<ContractT> }> = ({ contracts }) => <Layout hasAuth={true}><Table contracts={contracts} /></Layout>

export { Campaigns as default };
