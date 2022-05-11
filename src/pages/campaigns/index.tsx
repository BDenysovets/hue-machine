import {FC} from 'react'
import {Table} from "../../components/pages/campaigns/Table";
import { QueryListenerOptions, useQuerySubscription } from 'react-datocms';
import {datoCmsApiToken, request} from "../../lib/datocms";
import { NextPageContext } from 'next';

type CampaignsPageT = {
  preview: any
} & NextPageContext


export async function getStaticProps({ preview }: CampaignsPageT) {
  const graphqlRequest = {
    query: `
      {
        allCampaigns(first: 100) {
          id
          abi
          title
          address
          ownership
          parentContract
          versions {
            id
            url
            date
            version
          }
          metadata {
            id
            key
            value
          }
        }
      }
    `,
    preview,
  };

  return {
    props: {
      subscription: preview
          ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: datoCmsApiToken
          }
          : {
            enabled: false,
            initialData: await request(graphqlRequest)
          }
    },
    revalidate: 1
  };
}

const Campaigns: FC<{ subscription: QueryListenerOptions<any, any> }> = ({ subscription }) => {
  const { data: { allCampaigns } } = useQuerySubscription(subscription)

  return <Table campaigns={allCampaigns} />
}

export { Campaigns as default }
