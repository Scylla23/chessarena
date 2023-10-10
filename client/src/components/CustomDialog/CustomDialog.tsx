import { ReactNode } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface CustomDialogProps {
  open: boolean;
  children: ReactNode;
  title: string;
  contentText: string;
  handleContinue: () => void;
}

export default function CustomDialog({ open, children, title, contentText, handleContinue }: CustomDialogProps) {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {contentText}
        </DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleContinue}>Continue</Button>
      </DialogActions>
    </Dialog>
  );
}
