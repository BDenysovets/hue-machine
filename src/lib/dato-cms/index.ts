import {buildClient} from "@datocms/cma-client";

export const apiToken = process.env.DATO_CMS_API_KEY;
export const cmsClient = buildClient({
  apiToken: apiToken,
  environment: 'campaign-manager-dev',
});

export const modelsId = {
  partner: '180521',
  asset: '180527',
  campaign: '227995',
};

export async function create(data: Record<any, any>, id: keyof typeof modelsId): Promise<any> {
  return await cmsClient.items.create({item_type: { type: 'item_type', id }, ...data});
}

export async function update(data: Record<any, any>, id: string): Promise<any> {
  return await cmsClient.items.update(id, {...data});
}

export async function findOne(id: string) {
  return await cmsClient.items.find(id, {version: 'published'});
}

export async function deleteOne(id: string) {
  return await cmsClient.items.destroy(id);
}

export async function find(id: keyof typeof modelsId): Promise<any> {
  return await cmsClient.items.list({filter: {type: modelsId[id]}});
}
