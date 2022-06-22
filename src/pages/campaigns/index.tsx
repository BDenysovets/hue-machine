import {FC} from 'react';
import {Table} from '../../components/pages/campaigns/Table';
import {ContractT, getAllContracts} from '../../lib/nft-port';
import {Layout} from "../../components/layout";

export async function getStaticProps() {
  const contracts = await getAllContracts('rinkeby')

  return {
    props: { contracts },
    revalidate: 1
  };
}

const Campaigns: FC<{ contracts: Array<ContractT> }> = ({ contracts }) => <Layout hasAuth={true}><Table contracts={contracts} /></Layout>

export { Campaigns as default };
