import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createTheme } from '@mui/material';

// Pages
import InternalOps from './pages/InternalOps';
import ComplianceDashboard from './pages/ComplianceDashboard';
import OverridesManager from './pages/OverridesManager';

// Components
import Navigation from './components/Navigation';
import Layout from './components/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <Router>
            <Layout>
              <Navigation />
              <Routes>
                <Route path="/" element={<InternalOps />} />
                <Route path="/compliance" element={<ComplianceDashboard />} />
                <Route path="/overrides" element={<OverridesManager />} />
              </Routes>
            </Layout>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
