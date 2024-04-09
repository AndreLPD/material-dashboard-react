import { forwardRef, useState } from "react";
import { ModalRoot } from "@mui/material";

const MDModal = forwardRef(() => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <ModalRoot
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      {children}
    </ModalRoot>
  );
});

export default MDModal;
