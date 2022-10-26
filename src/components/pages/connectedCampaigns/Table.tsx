import {FC} from 'react';
import {
  Tooltip,
} from '@mui/material';
import {Edit as EditIcon} from '@mui/icons-material';
import Link from 'next/link';
import MUIDataTable, {MUIDataTableColumnDef, MUIDataTableOptions} from 'mui-datatables';
import {PageWrapper} from "../../layout/Page";
import {ConnectedContractT} from "../../../utils/interfaces";

const Table: FC<{ campaigns: Array<ConnectedContractT> }> = ({ campaigns }) => {
  const columns: MUIDataTableColumnDef[] = [
    {
      label: 'Name',
      name: 'name',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      label: 'Opensea',
      name: 'opensea_link',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      label: 'Network',
      name: 'network',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      label: 'Contract Address',
      name: 'contract_address',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      label: 'Edit',
      name: 'id',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id: string) => {
          return (
            <Link href="/connected-campaigns/[id]" as={`/connected-campaigns/${id}`}>
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
      title={'Connected Campaigns list'}
      link={{
        text: 'Add New campaign',
        href: '/connected-campaigns/add'
      }}
    >
      <MUIDataTable title={'Connected Campaigns'} data={campaigns} columns={columns} options={options} />
    </PageWrapper>
  );
}

export { Table };
