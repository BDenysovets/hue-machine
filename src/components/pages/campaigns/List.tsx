import {FC, useState} from "react";
import {
  Stack,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  Box
} from "@mui/material";
import {Add as AddIcon, Edit as EditIcon} from "@mui/icons-material";
import {Add} from "./Add";
import {Edit} from "./Edit";
import {Modal} from "../../modal";

export type CampaignT = {
  metadataUrl: string
  metadataSuffix: string
  NFTPrice: string
  parentTokenAddress: string
  maxAssets: number
}

const data = [
  {
    metadataUrl: 'https://some-website.com',
    metadataSuffix: 'wb1',
    NFTPrice: '10 USD',
    parentTokenAddress: '8498qtuv98n3v98asudf89sdf7a3477af77a749ar32pnc',
    maxAssets: 500,
  },
  {
    metadataUrl: 'https://some-website-1.com',
    metadataSuffix: 'wb1',
    NFTPrice: '30 ETH',
    parentTokenAddress: 'c354vjtyo4,cj8rce0249,8tm49mwmi498cm59mw8m',
    maxAssets: 7600,
  },
  {
    metadataUrl: 'https://some-website-2.com',
    metadataSuffix: 'wb1',
    NFTPrice: '1000 BNB',
    parentTokenAddress: 'wFAN4IAO38OM328uo8m3u28omcum4c8r80c42c4',
    maxAssets: 200,
  },
  {
    metadataUrl: 'https://some-website-3.com',
    metadataSuffix: 'wb3',
    NFTPrice: '4532340 SHIB',
    parentTokenAddress: '8498qtuv98n3v98af4c44c4csudf89sfsdfoqn23c',
    maxAssets: 5000,
  },
]

const List: FC = () => {
  const [campaigns, setCampaigns] = useState<Array<CampaignT>>(data)
  const [addModal, setAddModal] = useState(false)
  const [editCampaign, setEditCampaign] = useState<CampaignT | null>(null)

  function addCampaign(campaign: CampaignT) {
    setCampaigns(prevState => [ ...prevState, campaign ])
  }

  function handleEditCampaign(campaign: CampaignT) {
    setCampaigns(prevState => [ ...prevState.filter(it => it.parentTokenAddress !== campaign.parentTokenAddress), campaign ])
  }

  return (
    <Stack gap={2} sx={{ height: 500 }}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={4}
      >
        <Typography variant={'h5'}>Campaigns list</Typography>
        <Button variant="contained" size="large" startIcon={<AddIcon />} onClick={() => setAddModal(true)}>
          Add New
        </Button>
      </Stack>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="campaigns table table">
            <TableHead>
              <TableRow>
                <TableCell>Metadata Url</TableCell>
                <TableCell>Parent Token Address</TableCell>
                <TableCell align="right">Max Assets Qty.</TableCell>
                <TableCell align="right">NFT Price</TableCell>
                <TableCell align="right">Metadata Suffix</TableCell>
                <TableCell align="right">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaigns.map((item, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">{item.metadataUrl}</TableCell>
                  <TableCell component="th" scope="row">{item.parentTokenAddress}</TableCell>
                  <TableCell align="right">{item.maxAssets}</TableCell>
                  <TableCell align="right">{item.NFTPrice}</TableCell>
                  <TableCell align="right">{item.metadataSuffix}</TableCell>
                  <TableCell align="right"><EditIcon sx={{ cursor: 'pointer' }} onClick={() => setEditCampaign({ ...item })} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Modal
        width={600}
        open={addModal}
        onClose={() => setAddModal(false)}
        title={'Add new campaign'}
      >
        <Add
          onSubmit={(data) => {
            addCampaign(data)
            setAddModal(false)
          }}
        />
      </Modal>
      {!!editCampaign && (
        <Modal
          width={600}
          open={Boolean(editCampaign)}
          onClose={() => setEditCampaign(null)}
          title={`Edit campaign: ${editCampaign.metadataUrl}`}
        >
          <Edit
            campaign={editCampaign}
            onSubmit={(data) => {
              handleEditCampaign(data)
              setEditCampaign(null)
            }}
          />
        </Modal>
      )}
    </Stack>
  )
}

export { List }
