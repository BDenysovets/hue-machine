import DatabaseConnect from '../utils/db_connect'
import Authentication from '../models/Authentication.model'
import Customization from '../models/Customization.model'
import { AuthRecord, CustomRecord } from '../utils/interfaces'

DatabaseConnect()

export async function getAuthList () {
    return await Authentication.find({},'-_id').lean()
}

export async function getAuthRecord (partner: string) {
    return await Authentication.findOne({ partner }).lean()
}

export async function createAuthRecord (partner: AuthRecord) {
    let authDoc = new Authentication(partner)
  
    return await authDoc.save()
}

export async function updateAuthRecord (partnerName: string, partner: AuthRecord) {
    return await Authentication.updateOne({ partner: partnerName }, partner)
}

export async function getCustomRecord (target: string) {
    return await Customization.findOne({ target }).lean()
}

export async function createCustomRecord (customObj: CustomRecord) {
    let customDoc = new Customization(customObj)

    await customDoc.save()
}

export async function updateCustomRecord (partnerName: string, partner: CustomRecord) {
    return await Customization.updateOne({ target: partnerName }, partner)
}