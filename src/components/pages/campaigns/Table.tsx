import {FC} from 'react';
import {
  Typography,
  Tooltip,
} from '@mui/material';
import {Edit as EditIcon} from '@mui/icons-material';
import Link from 'next/link';
import {ContractT} from "../../../lib/nft-port";
import MUIDataTable, {MUIDataTableColumnDef, MUIDataTableOptions} from 'mui-datatables';
import {PageWrapper} from "../../layout/Page";

const Table: FC<{ contracts: Array<ContractT> }> = ({ contracts }) => {
  const columns: MUIDataTableColumnDef[] = [
    {
      label: 'Chain',
      name: 'chain',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      label: 'Name',
      name: 'name',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      label: 'Symbol',
      name: 'symbol',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      label: 'Mint Price',
      name: 'mint_price',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => <Typography variant={'inherit'}><b>ETH</b>{` ${value}`}</Typography>
      }
    },
    {
      label: 'Public Mint Date',
      name: 'public_mint_start',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string) => {
          const mintStartDate = new Date(value).toISOString().slice(0,10);

          return <Typography variant={'inherit'}>{mintStartDate}</Typography>;
        }
      }
    },
    {
      label: 'Edit',
      name: 'address',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string) => {
          return (
            <Link href={`/campaigns/${value}`}>
              <Tooltip title='Edit' arrow>
                <EditIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Link>
          );
        }
      }
    },
  ];

  const options: MUIDataTableOptions = {
    selectableRows: 'none',
    sortOrder: {
      name: 'name',
      direction: 'asc'
    }
  };

  return (
    <PageWrapper
      title={'Campaigns list'}
      link={{
        text: 'Add New campaign',
        href: '/campaigns/add'
      }}
    >
      <MUIDataTable title={'Campaigns'} data={contracts} columns={columns} options={options} />
    </PageWrapper>
  );
}

export { Table };
