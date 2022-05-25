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
import {ContractT} from "../../../lib/nft-port";

const Table: FC<{ campaigns: Array<ContractT> }> = ({ campaigns }) => (
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
                <b>Chain</b>
              </TableCell>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Symbol</b>
              </TableCell>
              <TableCell align='right'>
                <b>Mint Price</b>
              </TableCell>
              <TableCell align='right'>
                <b>Public Mint Date</b>
              </TableCell>
              <TableCell align='right'>
                <b>Edit</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.map((item, index) => <Row key={index} {...item} />)}
          </TableBody>
        </MaterialTable>
      </TableContainer>
    </Box>
  </Stack>
);

export { Table };
