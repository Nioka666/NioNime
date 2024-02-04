/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const AlertConfirmDialog = ({
  openDialog,
  handleCloseDialog,
  handleConfirm,
  headerMessageConfirmDialog,
  messageConfirmDialog,
}: any) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

  const handleClose = () => {
    setOpen(false);
    handleCloseDialog();
  };

  const handleConfirmClick = () => {
    setOpen(false);
    handleCloseDialog();
    handleConfirm(true);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ border: "none" }}
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            backgroundColor: "#212121",
            color: "white",
            border: "none",
            paddingTop: "30px",
          }}
        >
          {headerMessageConfirmDialog}
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#212121", border: "none" }}>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "gray", padding: "10px 0" }}
          >
            {messageConfirmDialog}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{ backgroundColor: "#212121", color: "white", border: "none" }}
        >
          <Button className="text-white" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="text-white" onClick={handleConfirmClick} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
