import { FC, useState } from 'react';
import { JSONSchema7 } from 'json-schema';
import { Box, Container } from '@mui/material';
import { MuiForm } from '@rjsf/material-ui';
import { NextPageContext } from 'next';
import { findOne, find } from '../../../lib/datocms';
import { concatFormFields, defaultFormFields } from '../add';
import {CampaignT} from "../../../components/pages/campaigns/Table";

type EditPageT = {
  params: {
    id: string;
  };
} & NextPageContext;

export async function getStaticPaths() {
  const campaigns = await find('campaign')

  return {
    paths: campaigns.map((it) => `/campaigns/edit/${it.id}`),
    fallback: true
  };
}

export async function getStaticProps({ params }: EditPageT) {
  const campaign = await findOne(params.id)
  const contractTemplate = await findOne(campaign.contractTemplate)

  return {
    props: {
      campaign: campaign,
      contractTemplate: contractTemplate,
    },
    revalidate: 1
  };
}

const Edit: FC<{ campaign: CampaignT, contractTemplate: any }> = ({ campaign, contractTemplate }) => {
  const [formData, setFormData] = useState({
    title: campaign.title,
    address: campaign.address,
    ownership: campaign.ownership,
    parentContract: campaign.parentContract
  });

  console.log('component data', contractTemplate)

  // const [formSchema, setFormSchema] = useState<JSONSchema7>(
  //   concatFormFields(defaultFormFields)
  // );

  const handleChange = ({ formData }) => setFormData(formData);
  const handleSubmit = ({ formData }) => {
    console.log(formData);
  };

  return (
    <Box>
      <Container maxWidth='sm'>
        {/*<MuiForm schema={formSchema} formData={formData} onChange={handleChange} onSubmit={handleSubmit} />*/}
      </Container>
    </Box>
  );
};

export default Edit;
