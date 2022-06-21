import React, { FC, useState } from 'react';
import { Button, Container, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import {MessageT, Toast} from "../../components/toast";
import {create} from "../../lib/dato-cms";

const PartnerAddPage: FC = () => {
  const [subdomain, setSubdomain] = useState('');
  const [bodyType, setBodyType] = useState('fullbody');
  const [excludeFromPartnersList, setExcludeFromPartnersList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageT>(null)

  function onSubdomainChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSubdomain(e.target.value);
  }

  function onBodyTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBodyType(e.target.value);
  }

  async function onFormSubmit() {
    setLoading(true);

    await create({ subdomain, bodyType, excludeFromPartnersList }, "partner")
      .then((data) => {

        console.log(data)
        setMessage({
          text: `Partner was added successfully`,
          type: 'success'
        })
      })
      .catch(error => setMessage({ text: error.message, type: 'success' }))
      .finally(() => setLoading(false))
  }

  return (
    <Container className='mt-10' maxWidth='sm'>
      <h1>New partner</h1>
      <TextField required id='subdomain' label='Subdomain' value={subdomain} onChange={onSubdomainChange} />
      <RadioGroup aria-label='gender' name='bodyType' value={bodyType} onChange={onBodyTypeChange}>
        <FormControlLabel value='fullbody' control={<Radio />} label='Full-body' />
        <FormControlLabel value='halfbody' control={<Radio />} label='Half-body' />
      </RadioGroup>
      {loading ? (
        'Processing...'
      ) : (
        <Button variant='outlined' onClick={onFormSubmit}>
          Submit
        </Button>
      )}
      <Toast open={!!message} onClose={() => setMessage(null)} message={message} />
    </Container>
  );
};

export { PartnerAddPage as default };
