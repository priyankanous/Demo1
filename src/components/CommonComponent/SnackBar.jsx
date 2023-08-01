import { IconButton, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";
import React from "react";

const SnackBar = ({ open, message, onClose }) => (
  <Snackbar
    anchorOrigin={{
      horizontal: "center",
      vertical: "top",
    }}
    open={open}
    autoHideDuration={5000}
    message={message}
    onClose={onClose}
    action={
      <>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <Close fontSize="small" />
        </IconButton>
      </>
    }
  />
);

export default SnackBar;
