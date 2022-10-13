import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material/";

const ConfirmDialog = (props) => {
  const { title, children, open, setOpen, onConfirm } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          style={{ backgroundColor: "#e50000", color: "#FFFFFF" }}
          onClick={() => setOpen(false)}
        >
          Cancelar
        </Button>
        <Button
          style={{ backgroundColor: "#94d529", color: "#FFFFFF" }}
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
