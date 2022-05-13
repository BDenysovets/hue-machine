import { Box, Typography, Modal as MaterialModal, Divider } from '@mui/material';
import { FC } from 'react';

type ModalT = {
  open: boolean;
  onClose: () => void;
  title?: string;
  width?: string | number;
  description?: string;
};

const Modal: FC<ModalT> = ({ children, onClose, open, title = 'Modal', description, width }) => {
  const style = {
    position: 'absolute' as 'absolute',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #ссс',
    width: width || 400,
    maxHeight: '100vh',
    maxWidth: '100vw',
    overflow: 'auto',
    boxShadow: 24,
    left: '50%',
    top: '50%',
    p: 4
  };

  return (
    <MaterialModal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Box>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {title}
          </Typography>
          {description && (
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              {description}
            </Typography>
          )}
          <Divider />
        </Box>
        <Box>{children}</Box>
      </Box>
    </MaterialModal>
  );
};

export { Modal };
