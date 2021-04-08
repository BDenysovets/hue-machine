import { SiteClient } from 'datocms-client'

const client = new SiteClient(
  process.env.DATO_API
)

interface Partner {
  name: string,
  absynthKey: string,
  bodyType: 'halfbody' | 'fullbody'
}

export const Partner = {
  getPartnerByName: async (name: string): Promise<any | void> => {
    const records = await client.items.all({
      filter: {
        type: "partner",
        fields: {
          name: {
            eq: name
          }
        }
      }
    })
    return records.length ? records[0] : null
  },
  createNewPartner: async (partner: Partner): Promise<any> => {
    let newPartner = await client.items.duplicate(process.env.PARTNER_TEMPLATE_ID)

    if (!newPartner) throw new Error("Template record can't be found")

    return client.items.update(newPartner.id, partner) 
  }

}