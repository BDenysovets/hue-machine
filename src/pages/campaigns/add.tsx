import {
  Box,
  Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField
} from '@mui/material';
import { MuiForm } from '@rjsf/material-ui';
import { FC, useState } from 'react';
import { JSONSchema7 } from 'json-schema';
import {ChainT, createContract} from '../../lib/nft-port';
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {toast} from "react-toastify";

export const formSchema: JSONSchema7 = {
  "type": "object",
  "required": [
    "name",
    "symbol",
    "max_supply",
    "mint_price",
    "tokens_per_mint",
    "owner_address",
    "treasury_address",
  ],
  "properties": {
    "name": {
      "type": "string",
      "title": "Contract Name"
    },
    "symbol": {
      "type": "string",
      "title": "Symbol of the NFT contract"
    },
    "max_supply": {
      "type": "number",
      "title": "Max qty. of NFTs that can be minted"
    },
    "mint_price": {
      "type": "number",
      "title": "Minting price per NFT"
    },
    "tokens_per_mint": {
      "type": "number",
      "title": "NFTs that be can mint in a single transaction"
    },
    "owner_address": {
      "type": "string",
      "title": "The contract owner address"
    },
    "treasury_address": {
      "type": "string",
      "title": "Address of the balance of paid minting"
    },
    "base_uri": {
      "type": "string",
      "title": "Metadata base URI for tokens"
    },
    "prereveal_token_uri": {
      "type": "string",
      "title": "Pre-reveal token URI for placeholder metadata"
    },
    "presale_whitelisted_addresses": {
      "type": "string",
      "title": "List of addresses whitelisted for the presale"
    },
    "royalties_share": {
      "type": "number",
      "title": "Secondary market royalty rate in basis points",
      "minimum": 0,
      "maximum": 10000,
    },
    "royalties_address": {
      "type": "string",
      "title": "Address that will have access to the balance of royalties paid",
    },
  }
}

const Add: FC = () => {
  const [contract, setContract] = useState()
  const [chain, setChain] = useState<ChainT>('rinkeby')
  const [mintDate, setMintDate] = useState<Date>(new Date());
  const [presaleDate, setPresaleDate] = useState<Date>();

  const handleSubmit = async ({ formData }) => {
    const contractData = {
      ...formData,
      "chain": chain,
      "public_mint_start_date": new Date(mintDate).toISOString().slice(0,-5),
    }

    createContract(contractData)
      .then(() => toast("Contract created!", { type: 'success' }))
      .catch(() => toast("Ohh, something went wrong, please try again later...", { type: 'error' }))
  }

  const handleFormChange = ({ formData }) => setContract(formData);

  return (
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
              <MuiForm schema={formSchema} formData={contract} onChange={handleFormChange} onSubmit={handleSubmit} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default Add;
