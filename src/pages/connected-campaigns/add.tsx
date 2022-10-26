import {
  Box,
  Container,
  Grid,
  Backdrop, CircularProgress
} from '@mui/material';
import {MuiForm} from '@rjsf/material-ui';
import {FC, useState} from 'react';
import {JSONSchema7} from 'json-schema';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {MessageT, Toast} from "../../components/toast";
import {Layout} from "../../components/layout";
import axios from "axios";
import {create} from "../../lib/dato-cms";
import {useRouter} from "next/router";

export const formSchema: JSONSchema7 = {
  "type": "object",
  "required": [
    "name",
    "opensea_link",
    "network",
    "contract_address",
  ],
  "properties": {
    "name": {
      "type": "string",
      "title": "Contract Name"
    },
    "opensea_link": {
      "type": "string",
      "title": "Opensea drop Link"
    },
    "network": {
      "type": "string",
      "title": "Network ID"
    },
    "contract_address": {
      "type": "string",
      "title": "Contract Address"
    },
  }
}

export const ABI_ENDPOINT = process.env.ABI_ENDPOINT

const Add: FC = () => {
  const router = useRouter()
  const [contract, setContract] = useState()
  const [message, setMessage] = useState<MessageT>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async ({formData}) => {
    const abi = await axios({url: `${ABI_ENDPOINT}${formData.contract_address}`}).then(({data}) => data.result)

    setLoading(true)

    create({...formData, abi}, "adminConnectedCampaign")
      .then(() => {
        setMessage({text: "Contract created!", type: 'success'})
        setTimeout(() => {
          setLoading(false)
          router.push('/connected-campaigns')
        }, 2000)
      })
      .catch(() => setMessage({text: "Ohh, something went wrong, please try again later...", type: 'error'}))
  }

  const handleFormChange = ({formData}) => setContract(formData);

  return (
    <Layout hasAuth={true}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box>
          <Container maxWidth='lg'>
            <Grid container display="flex" justifyContent="center" direction="row">
              <Grid item xs={12} lg={8}>
                <MuiForm schema={formSchema} formData={contract} onChange={handleFormChange} onSubmit={handleSubmit}/>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Toast open={!!message} onClose={() => setMessage(null)} message={message}/>
      </LocalizationProvider>
    </Layout>
  );
};

export default Add;
