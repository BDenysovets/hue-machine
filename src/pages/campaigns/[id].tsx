import { FC, useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { MuiForm } from '@rjsf/material-ui';
import { NextPageContext } from 'next';
import {ContractT, updateContract, ChainT} from '../../lib/nft-port';
import { formSchema } from './add';
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {MessageT, Toast} from "../../components/toast";
import {Layout} from "../../components/layout";
import {find, update} from "../../lib/dato-cms";

type EditPageT = {
  params: {
    id: string;
  };
} & NextPageContext;

export async function getStaticPaths() {
  const contracts = await find("adminCampaign")

  return {
    paths: contracts.map((contract) => `/campaigns/${contract.id}`),
    fallback: true
  };
}

export async function getStaticProps({ params }: EditPageT) {
  const contracts = await find("adminCampaign")
  const contract = contracts.find((contract) => contract.id === params.id)

  return {
    props: { contract },
    revalidate: 1
  };
}

const Edit: FC<{ contract?: ContractT }> = ({ contract }) => {
  const [formData, setFormData] = useState({ ...contract });
  const [chain, setChain] = useState<ChainT>(contract?.chain ?? 'rinkeby')
  const [mintDate, setMintDate] = useState<Date>(new Date(contract?.public_mint_start));
  const [presaleDate, setPresaleDate] = useState<Date>(new Date(contract?.presale_mint_start));
  const [message, setMessage] = useState<MessageT>(null)

  const handleFormChange = ({ formData }) => setFormData(formData);
  const handleSubmit = ({ formData }) => {
    const contractData = {
      "chain": chain,
      "contract_address": contract.address,
      "public_mint_start_date": new Date(mintDate).toISOString().slice(0,-5),
      "base_uri": formData.base_uri,
      "freeze_metadata": false,
      "prereveal_token_uri": formData.prereveal_token_uri,
      "presale_mint_start_date": new Date(presaleDate).toISOString().slice(0,-5),
      "presale_whitelisted_addresses": formData.presale_whitelisted_addresses.split(', '),
      "royalties_share": formData.royalties_share,
      "royalties_address": formData.royalties_address,
    }

    updateContract(contractData)
      .then(() => {
        update(contractData, contract.id)
          .then(() => setMessage({ text: "Contract updated!", type: 'success' }))
          .catch(() => setMessage({ text: "Ohh, something went wrong, please try again later...", type: 'error' }))
      })
      .catch(() => setMessage({ text: "Ohh, something went wrong, please try again later...", type: 'error' }))
  };

  return (
    <Layout hasAuth={true}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box>
          <Container maxWidth='lg'>
            <Grid container spacing={8}>
              <Grid item xs={12} lg={4}>
                <Stack direction={'column'} spacing={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Chain</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={chain}
                      label="Chain"
                      sx={{ padding: '4px 12px' }}
                      onChange={(e) => setChain(e.target.value as ChainT)}
                    >
                      <MenuItem value={'rinkeby'} sx={{ width: '100%' }}>Rinkeby</MenuItem>
                      <MenuItem value={'polygon'} sx={{ width: '100%' }}>Polygon</MenuItem>
                      <MenuItem value={'ethereum'} sx={{ width: '100%' }}>Ethereum</MenuItem>
                    </Select>
                  </FormControl>
                  <DesktopDatePicker
                    label="Public minting start date *"
                    inputFormat="MM/dd/yyyy"
                    value={mintDate}
                    onChange={(date) => setMintDate(date)}
                    renderInput={(params) => <TextField {...params} sx={{ padding: 4 }} />}
                  />
                  <DesktopDatePicker
                    label="Whitelisted/presale minting start date"
                    inputFormat="MM/dd/yyyy"
                    value={presaleDate}
                    onChange={(date) => setPresaleDate(date)}
                    renderInput={(params) => <TextField {...params} sx={{ padding: 4 }} />}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} lg={8}>
                <MuiForm schema={formSchema} formData={formData} onChange={handleFormChange} onSubmit={handleSubmit} />
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Toast open={!!message} onClose={() => setMessage(null)} message={message} />
      </LocalizationProvider>
    </Layout>
  );
};

export default Edit;
