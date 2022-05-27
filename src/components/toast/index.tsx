import {FC} from "react";
import {Alert, Snackbar} from "@mui/material";
import {AlertColor, AlertProps} from "@mui/material/Alert/Alert";
import {SnackbarProps} from "@mui/material/Snackbar/Snackbar";

type ToastT = AlertProps & SnackbarProps

export type MessageT = {
  text: string,
  type?: AlertColor
} | null

const Toast: FC<ToastT> = ({ open, onClose, autoHideDuration = 3000, severity= 'success', children }) => {
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {children}
      </Alert>
    </Snackbar>
  )
}

export { Toast }
