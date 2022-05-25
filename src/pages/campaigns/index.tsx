import {FC} from 'react';
import {Table} from '../../components/pages/campaigns/Table';
import {ContractT, getAllContracts} from '../../lib/nft-port';

export async function getStaticProps() {
  const campaigns = await getAllContracts('rinkeby')

  return {
    props: { data: campaigns },
    revalidate: 1
  };
}

const Campaigns: FC<{ data: Array<ContractT> }> = ({ data }) => <Table campaigns={data} />

export { Campaigns as default };
