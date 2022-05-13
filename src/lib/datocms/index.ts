import { GraphQLClient } from 'graphql-request';
import { SiteClient } from 'datocms-client';

export const cmsApiToken = process.env.NEXT_PUBLIC_DATO_CMS_API_KEY
export const cmsClient = new SiteClient(cmsApiToken)

export const modelsId = {
  campaign: '227995',
  contractTemplate: '242847'
}

export function request<T = any>({
  query,
  variables,
  preview,
  token = cmsApiToken
}: {
  query: string;
  variables?: any;
  preview?: boolean;
  token?: string;
}): Promise<T> {
  const environment = '';
  const endpoint = preview
    ? `https://graphql.datocms.com/${environment}preview`
    : `https://graphql.datocms.com/${environment}`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  return client.request<T>(query, variables);
}
