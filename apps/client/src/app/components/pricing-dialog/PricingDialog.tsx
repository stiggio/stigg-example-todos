import { Close } from '@mui/icons-material';
import {
  CloseButton,
  StyledDialog,
  StyledDialogTitle,
} from './PricingDialog.style';
import React from 'react';

type PricingDialogProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function PricingDialog({ children, open, onClose}: PricingDialogProps) {
  return (
    <StyledDialog open={open} onClose={onClose} fullWidth>
      <StyledDialogTitle>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
      </StyledDialogTitle>

      {children}
    </StyledDialog>
  );
}
