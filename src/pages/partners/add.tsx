import React, { FC, useState } from 'react';
import { Button, Container, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';

const PartnerAddPage: FC = () => {
  const [subdomain, setSubdomain] = useState('');
  const [bodyType, setBodyType] = useState('fullbody');
  const [excludeFromPartnersList, setExcludeFromPartnersList] = useState(false);
  const [loading, setLoading] = useState(false);

  function onSubdomainChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSubdomain(e.target.value);
  }

  function onBodytypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBodyType(e.target.value);
  }

  async function onFormSubmit() {
    setLoading(true);

    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        body: JSON.stringify({
          subdomain,
          bodyType,
          excludeFromPartnersList
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.message);
      }

      setSubdomain('');
      // return toast.success(`Partner "${json.partner.name}" was added successfully`);
    } catch (error) {
      // toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className='mt-10' maxWidth='sm'>
      <h1>New partner</h1>
      <TextField required id='subdomain' label='Subdomain' value={subdomain} onChange={onSubdomainChange} />
      <RadioGroup aria-label='gender' name='bodyType' value={bodyType} onChange={onBodytypeChange}>
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
    </Container>
  );
};

export { PartnerAddPage as default };
