const API_key = process.env.DATO_API
const destination_partnerId = process.env.destination_partner_id
const source_partnerId = process.env.source_partner_id

const { SiteClient } = require('datocms-client')

const client = new SiteClient(
  API_key,
  //{ environment: 'main-copy-2021-02-03' }
)

async function getAllAssetsByPartnerId ( partner_id ) {
  return await client.items.all({
    filter: {
      type: "asset",
      fields: {
        partners: {
          any_in: partner_id,
        },
      },
    },
  },
  { allPages: true });
}

async function assignPartnerToAssets ( destination_partnerId, source_partnerId ) {
  const assets = await getAllAssetsByPartnerId( source_partnerId )
  
  for (const asset of assets) {
    const updatedAsset = await client.items.update(asset.id, {
      partners: [...asset.partners, destination_partnerId]
    })
    console.log(updatedAsset.name)
  }
  console.log(`Done! ${assets.length} assets have been updated`)
}

assignPartnerToAssets(destination_partnerId, source_partnerId)