import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import './App.css';
import AuthContextProvider from './context/AuthContext';
import BlogContextProvider from './context/BlogContext';
import ThemeContextProvider from './context/ThemeContext';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <Box sx={{position:'relative'}}>
      <AuthContextProvider>
        <ThemeContextProvider>

        <BlogContextProvider>
          <AppRouter />
          <ToastContainer />
        </BlogContextProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </Box>
  );
}

export default App;
