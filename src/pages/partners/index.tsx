import { FC, useState } from 'react';
import Link from 'next/link';
import MUIDataTable, {MUIDataTableColumnDef, MUIDataTableOptions} from 'mui-datatables';
import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  IconButton,
  Button,
  Box, Typography
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import {find, deleteOne} from "../../lib/dato-cms";
import {PageWrapper} from "../../components/layout/Page";
import {MessageT, Toast} from "../../components/toast";

type Partner = {
  partner: string;
  key: string;
} & Record<string, any>

interface PartnerProps {
  partners: Partner[];
}

const Partners: FC<PartnerProps> = (props) => {
  const [partners, setPartners] = useState(props.partners);
  const [message, setMessage] = useState<MessageT>(null);
  const [removePartner, setRemovePartner] = useState<{ id: string, name: string } | null>(null);

  const removePartnerConfirm = async () => {
    await deleteOne(removePartner.id)
      .then(() => {
        setMessage({
          type: 'success',
          text: `Partner ${removePartner.name} was removed successfully.`
        });
        setPartners(partners.filter(item => item.id !== removePartner.id))
      })
      .catch(error => {
        setMessage({
          type: 'error',
          text: error
        });
      })
      .finally(() => {
        setRemovePartner(null);
      })
  };

  const columns: MUIDataTableColumnDef[] = [
    {
      label: 'Partner (subdomain or name)',
      name: 'name',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      label: 'Absynth Key',
      name: 'absynth_key',
      options: {
        filter: false,
        sort: false
      }
    },
    {
      label: 'Edit',
      name: 'id',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string) =>  (
          <Link href={'/partners/[partner]'} as={`/partners/${value}`}>
            <IconButton>
              <Edit />
            </IconButton>
          </Link>
        )
      }
    },
    {
      label: 'Delete',
      name: 'id',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id: string) => (
          <IconButton aria-label='delete' onClick={() => setRemovePartner({ id, name: partners.find(item => item.id === id)?.name })}>
            <Delete />
          </IconButton>
        )
      }
    }
  ];

  const options: MUIDataTableOptions = {
    selectableRows: 'none',
    sortOrder: {
      name: 'partner',
      direction: 'asc'
    }
  };

  return (
    <PageWrapper
      title={'Partners list'}
      link={{
        text: 'Add New partner',
        href: '/partners/new'
      }}
    >
      <Dialog
        open={!!removePartner}
        onClose={() => setRemovePartner(null)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            You are about to remove the "{removePartner?.name}" partner. Please confirm this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRemovePartner(null)} variant={'outlined'}>
            No
          </Button>
          <Button onClick={removePartnerConfirm} variant={'contained'} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Box my={4}>
        <MUIDataTable title={'Partners'} data={partners} columns={columns} options={options} />
      </Box>
      <Toast open={!!message} onClose={() => setMessage(null)} message={message} />
    </PageWrapper>
  );
};

export { Partners as default };

export async function getServerSideProps() {
  const partners = await find('partner')

  return {
    props: { partners }
  };
}
