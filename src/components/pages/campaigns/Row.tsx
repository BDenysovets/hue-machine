import { FC } from 'react';
import { TableCell, TableRow, Tooltip } from '@mui/material';
import Link from 'next/link';
import { Edit as EditIcon } from '@mui/icons-material';
import {ContractT} from "../../../lib/nft-port";

const Row: FC<ContractT> = (props) => {
  const mintStartDate = new Date(props.public_mint_start).toISOString().slice(0,10)

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>{props.chain}</TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.symbol}</TableCell>
      <TableCell align='right'>{`${props.mint_price} ETH`}</TableCell>
      <TableCell align='right'>{mintStartDate}</TableCell>
      <TableCell align='right'>
        <Link href={`/campaigns/edit/${props.address}`}>
          <Tooltip title='Edit' arrow>
            <EditIcon sx={{ cursor: 'pointer' }} />
          </Tooltip>
        </Link>
      </TableCell>
    </TableRow>
  );
};

export { Row };
