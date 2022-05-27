import {FC} from "react";
import {Alert, Snackbar, Typography} from "@mui/material";
import {AlertColor, AlertProps} from "@mui/material/Alert/Alert";
import {SnackbarProps} from "@mui/material/Snackbar/Snackbar";

export type MessageT = {
  text: string,
  type?: AlertColor
} | null

type ToastT = {
  message: MessageT
  onClose: () => void
} & SnackbarProps

const Toast: FC<ToastT> = ({ open, onClose, autoHideDuration = 3000, message }) => {
  return message ? (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={() => onClose()}>
      <Alert onClose={() => onClose()} severity={message.type} sx={{ width: '100%' }}>
        <Typography variant={'inherit'}>{message.text}</Typography>
      </Alert>
    </Snackbar>
  ) : null
}

export { Toast }
