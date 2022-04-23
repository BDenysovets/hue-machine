import {FC, useState} from "react";
import {Stack, Button, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import {AddForm} from "./Form";
import {Modal} from "../../components/modal";

const List: FC = () => {
  const [addModal, setAddModal] = useState(false)

  return (
    <Stack
      gap={2}
      sx={{
        height: 500
      }}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={4}
      >
        <Typography variant={'h5'}>Campaigns list</Typography>
        <Button variant="contained" size="large" startIcon={<Add />} onClick={() => setAddModal(true)}>
          Add New
        </Button>
        <Modal
          open={addModal}
          onClose={() => setAddModal(false)}
          title={'Add new campaign'}
        >
          <AddForm />
        </Modal>
      </Stack>
    </Stack>
  )
}

export { List }
