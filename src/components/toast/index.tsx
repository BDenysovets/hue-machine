import {FC} from "react";
import {Alert, Snackbar} from "@mui/material";
import {AlertProps} from "@mui/material/Alert/Alert";
import {SnackbarProps} from "@mui/material/Snackbar/Snackbar";

type ToastT = AlertProps & SnackbarProps

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
