import { FC } from 'react';
import {CampaignT, Table} from '../../components/pages/campaigns/Table';
import {find} from '../../lib/datocms';

export async function getStaticProps() {
  const campaigns = await find("campaign")

  return {
    props: { data: campaigns },
    revalidate: 1
  };
}

const Campaigns: FC<{ data: CampaignT[] }> = ({ data }) => {
  return <Table campaigns={data} />;
};

export { Campaigns as default };
