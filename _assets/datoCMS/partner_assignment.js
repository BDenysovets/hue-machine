const API_key = process.env.DATO_API;
const partnerId = process.env.partner_id;
const assetType = process.env.asset_type;

const { SiteClient } = require('datocms-client');

const client = new SiteClient(
  API_key
  //{ environment: 'main-copy-2020-11-11' }
);

async function getAssetsByType(asset_type) {
  return await client.items.all(
    {
      filter: {
        type: 'asset',
        fields: {
          asset_type: {
            eq: asset_type
          }
        }
      }
    },
    { allPages: true }
  );
}

async function assignPartnerToAssets(partnerId, asset_type) {
  const assets = await getAssetsByType(asset_type);

  for (const asset of assets) {
    const updatedAsset = await client.items.update(asset.id, {
      partners: [...asset.partners, partnerId]
    });
    console.log(updatedAsset);
  }
}

assignPartnerToAssets(partnerId, assetType);
