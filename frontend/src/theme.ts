import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#eece1a',
      contrastText: '#222', // for buttons, etc.
    },
    background: {
      default: '#444',
      paper: '#515151',
    },
    text: {
      primary: '#fff',
      secondary: '#eece1a',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
});

export default theme;