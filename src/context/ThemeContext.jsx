import React, { createContext } from 'react'
import { createTheme } from '@mui/material/styles';

export const ThemeContext = createContext();

const ThemeContextProvider =(props) => {

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});
let value = {theme,}
  return (
    <ThemeContext.Provider value={value}>
    {props.children}
  </ThemeContext.Provider>
  )
}

export default ThemeContextProvider
