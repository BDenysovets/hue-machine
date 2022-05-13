import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Container,
  Button
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { MuiForm } from '@rjsf/material-ui';
import { JSONSchema7 } from 'json-schema';
import { NextPageContext } from 'next';
import { cmsClient, cmsApiToken, request, modelsId } from '../../lib/datocms';
import { QueryListenerOptions, useQuerySubscription } from 'react-datocms';
import { TemplateModal } from '../../components/pages/campaigns/TemplateModal';

type AddPageT = {
  preview: any;
} & NextPageContext;

export async function getStaticProps({ preview }: AddPageT) {
  const graphqlRequest = {
    query: `
          {
            allContractTemplates(first: 100) {
                id
                slug
                template
            }
          }
        `,
    preview
  };

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: cmsApiToken
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest)
          }
    },
    revalidate: 1
  };
}

export const defaultFormFields = {
  title: {
    type: 'string',
    title: 'Title'
  },
  address: {
    type: 'string',
    title: 'Address'
  },
  ownership: {
    type: 'string',
    title: 'Ownership'
  },
  parentContract: {
    type: 'string',
    title: 'Parent Contract'
  }
};

async function createCampaigns(formData: Record<string, any>, templateId) {
  console.log('formdata', formData);

  const record = await cmsClient.items.create({
    itemType: modelsId.campaign,
    title: formData.title,
    parent_contract: formData.parentContract,
    address: formData.address,
    pricing: [
      {
        quantity: 500,
        currency: 'USD'
      }
    ],
    metadata: [
      {
        value: 'som desc value',
        key: 'desc'
      }
    ],
    versions: [
      {
        url: 'https://version.1.0.0',
        date: '2022-05-23T22:00:00',
        version: '1.0.0'
      }
    ],
    abi: JSON.stringify(formData),
    contract_template: templateId
  });

  console.log('record', record);
}

export function concatFormFields(template: Record<string, any>, additionalFields: Record<string, any>): JSONSchema7 {
  return {
    ...template,
    properties: {
      ...additionalFields,
      ...template.properties
    }
  };
}

const Add: FC<{ subscription: QueryListenerOptions<any, any> }> = ({ subscription }) => {
  const {
    data: { allContractTemplates }
  } = useQuerySubscription(subscription);

  const [data, setData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contractTemplate, setContractTemplate] = useState(allContractTemplates[0]);
  const [formsSchema, setFormSchema] = useState<JSONSchema7>(contractTemplate.template);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setContractTemplate(allContractTemplates.find((it) => it.id === event.target.value));
  };

  const handleSubmit = ({ formData }) =>
    createCampaigns(formData, contractTemplate.id)
      .then(() => console.log('loaded'))
      .catch((error) => console.log(error));

  useEffect(() => {
    setFormSchema(concatFormFields(contractTemplate.template, defaultFormFields));
  }, [contractTemplate]);

  const handleChange = ({ formData }) => setData(formData);

  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
        <Typography variant={'h6'}>Select your contract template</Typography>
        <Stack direction='row' alignItems='center' spacing={1}>
          <FormControl sx={{ width: 200 }}>
            <InputLabel id='demo-simple-select-label'>Select Template</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={contractTemplate.id}
              label='Select Template'
              onChange={handleSelectChange}
            >
              {allContractTemplates.map((item) => (
                <MenuItem key={item.id} sx={{ width: '100%' }} value={item.id}>
                  {item.slug}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant={'caption'}>OR</Typography>
          <Button variant={'contained'} onClick={() => setIsModalOpen(true)}>
            Create new Template
          </Button>
        </Stack>
      </Stack>
      <Container maxWidth='sm'>
        <MuiForm schema={formsSchema} formData={data} onChange={handleChange} onSubmit={handleSubmit} />
      </Container>
      <TemplateModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
};

export default Add;
