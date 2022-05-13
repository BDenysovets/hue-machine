import { FC } from 'react';
import {
  Stack,
  Button,
  Typography,
  Table as MaterialTable,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  Box
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import Link from 'next/link';
import { Row } from './Row';

export type CampaignT = {
  id: string;
  address: string;
  title: string;
  ownership: string;
  parentTokenAddress: string;
} & Record<string, any>;

const Table: FC<{ campaigns: Array<CampaignT> }> = ({ campaigns }) => (
  <Stack gap={2} sx={{ height: 500 }}>
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={4}>
      <Typography variant={'h5'}>Campaigns list</Typography>
      <Link href={'/campaigns/add'}>
        <Button variant='contained' size='large' startIcon={<AddIcon />}>
          Add New
        </Button>
      </Link>
    </Stack>
    <Box>
      <TableContainer component={Paper}>
        <MaterialTable sx={{ minWidth: 650 }} aria-label='campaigns table table'>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Id</b>
              </TableCell>
              <TableCell>
                <b>Address</b>
              </TableCell>
              <TableCell>
                <b>Ownership</b>
              </TableCell>
              <TableCell>
                <b>Title</b>
              </TableCell>
              <TableCell align='right'>
                <b>Version</b>
              </TableCell>
              <TableCell align='right'>
                <b>Edit</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.map((item) => (
              <Row key={item.id} {...item} />
            ))}
          </TableBody>
        </MaterialTable>
      </TableContainer>
    </Box>
  </Stack>
);

export { Table };
