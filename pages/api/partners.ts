import { NextApiRequest, NextApiResponse } from "next"
import DatabaseConnect from '../../utils/db_connect'
import Authentication from '../../models/Authentication.model'
import Customization from '../../models/Customization.model'

DatabaseConnect()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method, body } = req

    if (method !== 'POST') {
      res.statusCode = 400
      res.json({ success: false })
      return
    }

    const target = body.name
    const absynthKey = body.absynthKey
    const customizations = JSON.parse(body.customizations)

    customizations.target = target

    const authData = await Authentication.findOne({ partner: target })

    if (authData) {
      throw new Error(`Partner "${target}" already exists`)
    }

    let authDoc = new Authentication({
      partner: target,
      key: absynthKey
    })

    await authDoc.save()


    const customData = await Customization.findOne({ target })

    if (customData) {
      throw new Error(`Partner "${target}" already exists`)
    }

    let customDoc = new Customization(customizations)

    await customDoc.save()

    res.statusCode = 200
    res.json({ success: true })

  }catch (e) {

    res.statusCode = 500
    res.json({ success: false, message:  e.message })

  }
}
