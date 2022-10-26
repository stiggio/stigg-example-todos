import { styled, Dialog, DialogTitle, IconButton } from '@mui/material';

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    height: 730px;
    min-width: 1150px;
    background-color: #f4f4f4;
    padding-top: ${({ theme }) => theme.spacing(6)};
  }
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  right: ${({ theme }) => theme.spacing(2)};
  top: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.palette.grey[500]};
`;

export const StyledDialogTitle = styled(DialogTitle)`
  position: absolute;
  right: 10px;
  top: 10px;
`;
