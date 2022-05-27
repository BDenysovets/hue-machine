import {FC} from 'react';
import {Table} from '../../components/pages/campaigns/Table';
import {ContractT, getAllContracts} from '../../lib/nft-port';

export async function getStaticProps() {
  const contracts = await getAllContracts('rinkeby')

  return {
    props: { contracts },
    revalidate: 1
  };
}

const Campaigns: FC<{ contracts: Array<ContractT> }> = ({ contracts }) => <Table contracts={contracts} />

export { Campaigns as default };
