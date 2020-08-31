import { NextApiRequest, NextApiResponse } from "next"
import * as repository from '../../../repositories/partners'
import { Partner } from "../../../utils/interfaces";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method, body } = req
    let data: any;

    switch (method) {
      case 'GET':
        data = await getPartners()
        break
      case 'POST':
        await submitPartner(body)
        break
      default:
        res.statusCode = 404
        res.json({ success: false })
        return
    }

    res.statusCode = 200
    res.json({ success: true, data })

  }catch (e) {

    res.statusCode = 500
    res.json({ success: false, message:  e.message })

  }
}

async function getPartners(){
  return await repository.getAuthList()
}


async function submitPartner (partner: Partner) {
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
}