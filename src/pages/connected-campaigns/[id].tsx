import { FC, useState } from 'react';
import {
  Backdrop,
  Box, CircularProgress,
  Container,
  Grid,
} from '@mui/material';
import { MuiForm } from '@rjsf/material-ui';
import { NextPageContext } from 'next';
import {formSchema} from './add';
import { LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {MessageT, Toast} from "../../components/toast";
import {Layout} from "../../components/layout";
import { find, findOne, update} from "../../lib/dato-cms";
import {useRouter} from "next/router";
import {ConnectedContractT} from "../../utils/interfaces";
import axios from "axios";

type EditPageT = {
  params: {
    id: string;
  };
} & NextPageContext;

export const ABI_ENDPOINT = process.env.ABI_ENDPOINT

export async function getStaticPaths() {
  const connectedCampaigns = await find('adminConnectedCampaign')

  return {
    paths: connectedCampaigns.map((campaign) => `/connected-campaigns/${campaign.id}`),
    fallback: true
  };
}

export async function getStaticProps({ params }: EditPageT) {
  const campaign = await findOne(params.id)

  return {
    props: { campaign },
    revalidate: 1
  };
}

const Edit: FC<{ campaign: ConnectedContractT }> = ({ campaign }) => {
  const router = useRouter()
  const [form, setForm] = useState({ ...campaign });
  const [message, setMessage] = useState<MessageT>(null)
  const [loading, setLoading] = useState(false)

  const handleFormChange = ({ formData }) => setForm(formData);

  const updateCampaign = (campaignData) => {
    update({ ...campaignData }, campaign.id)
      .then(() => {
        setMessage({text: "Contract updated!", type: 'success'})
        setTimeout(() => {
          setLoading(false)
          router.push('/connected-campaigns')
        }, 2000)
      })
      .catch(() => setMessage({text: "Ohh, something went wrong, please try again later...", type: 'error'}))
  }

  const handleSubmit = async ({ formData }) => {
    setLoading(true)

    if (formData.contract_address !== campaign.contract_address) {
      const abi = await axios({url: `${ABI_ENDPOINT}${formData.contract_address}`}).then(({data}) => data.result)

      updateCampaign({ ...formData, abi })
    } else {
      updateCampaign(formData)
    }
  };

  return (
    <Layout hasAuth={true}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box>
          <Container maxWidth='lg'>
            <Grid container display="flex" justifyContent="center" direction="row">
              <Grid item xs={12} lg={8}>
                <MuiForm schema={formSchema} formData={form} onChange={handleFormChange} onSubmit={handleSubmit}/>
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
        <Toast open={!!message} onClose={() => setMessage(null)} message={message} />
      </LocalizationProvider>
    </Layout>
  );
};

export default Edit;
