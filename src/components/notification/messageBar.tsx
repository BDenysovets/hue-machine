import { FC, useEffect, useState } from 'react';
import { AlertProps, Alert as MuiAlert, Snackbar } from '@mui/material';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

type MessageType = 'success' | 'error';

type MessageT = {
  type: MessageType;
  message?: string;
};

const MessageBar: FC<MessageT> = (props) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<MessageType>('success');
  const [message, setMessage] = useState('');

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    if (props.type !== message || props.type !== type) {
      setOpen(true);
      setMessage(props.message);
      setType(props.type);
    }
  }, [message, type]);

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export { MessageBar };
