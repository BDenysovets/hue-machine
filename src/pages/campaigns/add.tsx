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
import {create, find} from '../../lib/datocms';
import { TemplateModal } from '../../components/pages/campaigns/TemplateModal';


export async function getStaticProps() {
  const templates = await find("contractTemplate")

  return {
    props: { templates },
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
  create({
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
  }, 'campaign').then(data => console.log(data))

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

const Add: FC<{ templates: Array<any> }> = ({ templates: templatesProps }) => {
  const [data, setData] = useState();
  const [templates, setTemplates] = useState(templatesProps)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contractTemplate, setContractTemplate] = useState(templates[0]);
  const [formsSchema, setFormSchema] = useState<JSONSchema7>(contractTemplate.template);

  useEffect(() => {
    console.log(templates, contractTemplate)
  }, [templates, contractTemplate])

  useEffect( () => {
    async function updateTemplates() {
      const newContractTemplates = await find("contractTemplate")

      setTemplates(newContractTemplates)
    }

    updateTemplates()
  }, [isModalOpen, find])

  const handleSelectChange = (event: SelectChangeEvent) => {
    setContractTemplate(templates.find((it) => it.id === event.target.value));
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
              {templates.map((item) => (
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
        {/*<MuiForm schema={formsSchema} formData={data} onChange={handleChange} onSubmit={handleSubmit} />*/}
      </Container>
      <TemplateModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
};

export default Add;
