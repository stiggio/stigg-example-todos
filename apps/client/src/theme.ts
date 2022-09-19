import { createTheme } from '@mui/material';

const color = '#4895ff';
export const textFont = 'Helvetica Neue';
export const theme = createTheme({
  palette: {
    primary: {
      main: color,
    },
    text: {
      primary: '#0000008A',
    },
  },
  typography: {
    fontFamily: textFont,
    h6: {
      fontFamily: textFont,
      fontSize: 50,
      fontWeight: 200,
      color,
    },
    body1: {
      fontFamily: textFont,
      fontSize: 18,
      fontWeight: 400,
      color,
    },
  },
});
