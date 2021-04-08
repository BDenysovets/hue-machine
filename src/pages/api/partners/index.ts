import { NextApiRequest, NextApiResponse } from "next"
import { Absynth } from "../../../../services/absynth"
import { Partner } from "../../../../services/partners"
import * as repository from '../../../repositories/partners'



export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method, body } = req
    let data: any;

    switch (method) {
      case 'GET':
        data = await getPartners()
        res.statusCode = 200
      res.json({ success: true, data })
        break
      case 'POST':
        await submitPartner(req, res)
        break
      default:
        res.statusCode = 404
        res.json({ success: false })
        return
    }
  }catch (e) {
    res.statusCode = 500
    res.json({ success: false, message:  e.message })

  }
}

async function getPartners(){
  return await repository.getAuthList()
}

async function submitPartner (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { subdomain, bodyType } = req.body

    if (!subdomain || !bodyType) {
      throw new Error('subdomain and bodyType are required parameters')
    }

    const partner = await Partner.getPartnerByName(subdomain)

    if (partner) {
      throw new Error('This subdomain is already taken')
    }

    const absynth = await Absynth.registerNewClient(subdomain, -1)

    if (!absynth.success) {
      throw new Error(absynth.message)
    }

    const newPartner = await Partner.createNewPartner({ name: subdomain, absynthKey: absynth.authKey, bodyType})

    res.json({success: true, partner: newPartner})

  }catch (err) {
    console.log(err)
    res.json({message: err.message, success: false})
  }
}

/*async function submitPartner (partner: Partner) {
  const target = partner.name
  const absynthKey = partner.absynthKey
  const customizations = partner.customizations

  const authData = await repository.getAuthRecord(target)

  if (authData) {
    throw new Error(`Partner "${target}" already exists`)
  }

  await repository.createAuthRecord({
    partner: target,
    key: absynthKey
  })

  const customData = await repository.getCustomRecord(target)

  if (customData) {
    throw new Error(`Partner "${target}" already exists`)
  }

  await repository.createCustomRecord({target, ...customizations})
}*/