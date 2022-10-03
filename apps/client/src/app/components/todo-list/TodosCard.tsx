import { Card, styled } from '@mui/material';

export const StyledCard = styled(Card)`
  width: 700px;
  border-radius: 0;

  &:before {
    content: ' ';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    width: 700px;
    height: 50px;
    box-shadow: 0 1px 1px rgb(0 0 0 / 20%), 0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgb(0 0 0 / 20%), 0 16px 0 -6px #f6f6f6,
      0 17px 2px -6px rgb(0 0 0 / 20%);
  }
`;
