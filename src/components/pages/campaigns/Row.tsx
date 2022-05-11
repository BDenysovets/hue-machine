import {FC} from "react";
import {TableCell, TableRow, Tooltip} from "@mui/material";
import Link from "next/link";
import {Edit as EditIcon} from "@mui/icons-material";
import {CampaignT} from "./Table";

const Row: FC<CampaignT> = (props) => {
    const version = props.versions[props.versions.length - 1].version || 'N/A'

    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">{props.id}</TableCell>
            <TableCell component="th" scope="row">{props.address}</TableCell>
            <TableCell>{props.ownership}</TableCell>
            <TableCell>{props.title}</TableCell>
            <TableCell align="right">{version}</TableCell>
            <TableCell align="right">
                <Link href={`/campaigns/edit/${props.id}`}>
                    <Tooltip title="Edit" arrow>
                        <EditIcon sx={{ cursor: 'pointer' }} />
                    </Tooltip>
                </Link>
            </TableCell>
        </TableRow>
    )
}

export { Row }
