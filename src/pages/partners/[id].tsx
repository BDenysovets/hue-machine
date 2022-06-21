import { FC, useState } from 'react';
import Form from '@rjsf/material-ui';
import {
  Fab,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  Button,
  Typography,
  Box,
  Container
} from '@mui/material';
import { ImportExport } from '@mui/icons-material';
import partnerConfig from './partner_config.json';
import formSchemaJson from './form_schema.json';
import {PageT, Partner} from '../../utils/interfaces';
import {MessageT, Toast} from "../../components/toast";
import {findOne, update} from "../../lib/dato-cms";

type PartnerPageT = {
  partner?: Partner;
};

export const getServerSideProps = async ({ params }: PageT) => {
  const partner = await findOne(params.id)

  return {
    props: { partner }
  };
};

const PartnerPage: FC<PartnerPageT> = ({ partner }) => {
  console.log(partner)

  const [partnerData, setPartnerData] = useState({
    name: partner ? partner.name : '',
    absynthKey: partner ? partner.absynthKey : '',
    customizations: partner ? partner.customizations : partnerConfig
  });
  const [message, setMessage] = useState<MessageT>(null);
  const [importExportDialog, setImportExportDialog] = useState({
    content: '',
    open: false
  });

  const openImportExportDialog = () => {
    setImportExportDialog({ content: JSON.stringify(partnerData), open: true });
  };

  const closemportExportDialog = () => {
    setImportExportDialog({ content: '', open: false });
  };

  const handleImportExportDialogChange = (event: { target: { name: any; value: any } }) => {
    setImportExportDialog({ ...importExportDialog, [event.target.name]: event.target.value });
  };

  const applyJSON = () => {
    let newContent: any;
    try {
      newContent = JSON.parse(importExportDialog.content);
      setPartnerData(newContent);
      closemportExportDialog();
    } catch (e) {
      setMessage({
        type: 'error',
        text: "JSON can't be recognized"
      });
    }
  };

  const handleSubmit = async ({ formData }) => {
    update({ ...formData }, partner.id)
      .then(() => {
        setMessage({
          type: 'success',
          text: `Partner ${formData.name} was ${partner ? 'updated' : 'added'} successfully.`
        });
      })
      .catch(() => {
        setMessage({
          type: 'error',
          text: 'An error occured while submitting the form'
        });
      })
  };

  return (
    <Container maxWidth='sm'>
      <style jsx>{`
        .floatPanel {
          position: fixed;
          bottom: 30px;
          right: 30px;
        }
      `}</style>
      <div className='floatPanel'>
        <Fab variant='extended' onClick={openImportExportDialog}>
          <ImportExport />
          Import/Export
        </Fab>
      </div>

      <Dialog
        open={importExportDialog.open}
        maxWidth='xl'
        fullWidth
        onClose={closemportExportDialog}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Import/Export</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='content'
            name='content'
            label='JSON'
            type='text'
            value={importExportDialog.content}
            onChange={handleImportExportDialogChange}
            fullWidth
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closemportExportDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={applyJSON} color='primary'>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
      <Toast open={!!message} onClose={() => setMessage(null)} message={message} />
      <Box my={4}>
        <Typography variant='h4' component='h1' gutterBottom>
          {partner ? partner.name : 'New Partner'}
        </Typography>
        <Form
          schema={JSON.parse(JSON.stringify(formSchemaJson))}
          formData={partnerData}
          onChange={({ formData }) => setPartnerData(formData)}
          onSubmit={handleSubmit}
        />
      </Box>
    </Container>
  );
};

export { PartnerPage as default };
