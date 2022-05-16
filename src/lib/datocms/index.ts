import {SiteClient} from 'datocms-client';

export const cmsApiToken = process.env.NEXT_PUBLIC_DATO_CMS_API_KEY;
export const cmsClient = new SiteClient(cmsApiToken);

export const modelsId = {
  campaign: '227995',
  contractTemplate: '242847'
};

export async function create(data: Record<any, any>, modelId: keyof typeof modelsId): Promise<any> {
  return await cmsClient.items.create({itemType: modelsId[modelId], ...data});
}

export async function update(data: Record<any, any>, itemId: string): Promise<any> {
  return await cmsClient.items.update(itemId, {...data});
}

export async function findOne(itemId: string) {
  return await cmsClient.items.find(itemId, {version: 'published'});
}

export async function find(modelId: keyof typeof modelsId): Promise<any> {
  return await cmsClient.items.all({filter: {type: modelsId[modelId]}});
}
