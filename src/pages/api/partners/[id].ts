import { NextApiRequest, NextApiResponse } from 'next';
import * as repository from '../../../repositories/partners';
import { Partner } from '../../../utils/interfaces';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method, body } = req;
    let data: any;

    switch (method) {
      case 'GET':
        data = await getPartner(req.query.partner as string);
        break;
      case 'PUT':
        await updatePartner(req.query.partner as string, body);
        break;
      case 'DELETE':
        await deletePartner(req.query.partner as string);
        break;
      default:
        res.statusCode = 404;
        res.json({ success: false });
        return;
    }

    res.statusCode = 200;
    res.json({ success: true, data });
  } catch (e) {
    res.statusCode = 500;
    res.json({ success: false, message: e.message });
  }
};

async function getPartner(partner: string) {
  const authData: { [key: string]: any } = await repository.getAuthRecord(partner);

  if (!authData) {
    throw new Error(`Partner "${partner}" is not found`);
  }

  const customData: { [key: string]: any } = await repository.getCustomRecord(partner);

  delete customData._id;
  delete customData.target;

  return {
    name: partner,
    absynthKey: authData.key,
    customizations: customData
  };
}

async function updatePartner(partnerName: string, partnerObj: Partner) {
  const newTarget = partnerObj.name;
  const absynthKey = partnerObj.absynthKey;
  const customizations = partnerObj.customizations;

  let authData = await repository.getAuthRecord(partnerName);

  if (!authData) {
    throw new Error(`Partner "${partnerName}" is not found`);
  }

  if (partnerName !== newTarget) {
    authData = await repository.getAuthRecord(newTarget);

    if (authData) {
      throw new Error(`Partner with name "${newTarget}" already exists`);
    }
  }

  await repository.updateAuthRecord(partnerName, { partner: newTarget, key: absynthKey });
  await repository.updateCustomRecord(partnerName, { target: newTarget, ...customizations });
}

async function deletePartner(partner: string) {
  await repository.deleteAuthRecord(partner);
  await repository.deleteCustomRecord(partner);
}
