import { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Container, Chip, Avatar, Divider, useMediaQuery, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EngineeringIcon from '@mui/icons-material/Engineering';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import MenuIcon from '@mui/icons-material/Menu';
import AdminPage from './pages/AdminPage';
import InspectorPage from './pages/InspectorPage';

const theme = createTheme({
  palette: {
    primary: { main: '#1565C0' },
    background: { default: '#F0F4F8', paper: '#FFFFFF' },
  },
  typography: { fontFamily: '"Inter", "Roboto", sans-serif' },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } } },
    MuiTab: { styleOverrides: { root: { textTransform: 'none' } } },
  },
});

const pages = [
  { key: 'admin', label: 'Admin', icon: <AdminPanelSettingsIcon /> },
  { key: 'inspector', label: 'Inspector', icon: <EngineeringIcon /> },
];

export default function App() {
  const [activePage, setActivePage] = useState('admin');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const statsMap = {
    admin: [
      { label: 'Total Assigned', value: '24', color: '#1565C0', bg: '#E3F2FD' },
      { label: 'Pending Approval', value: '6', color: '#E65100', bg: '#FFF3E0' },
      { label: 'Approved', value: '18', color: '#1B5E20', bg: '#E8F5E9' },
    ],
    inspector: [
      { label: 'Assigned to Me', value: '7', color: '#1565C0', bg: '#E3F2FD' },
      { label: 'Draft Reports', value: '5', color: '#E65100', bg: '#FFF3E0' },
      { label: 'Submitted', value: '9', color: '#1B5E20', bg: '#E8F5E9' },
    ],
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '50vh', bgcolor: 'background.default' }}>
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#fff', borderBottom: '1px solid', borderColor: 'divider', color: 'text.primary' }}>
          <Toolbar sx={{ gap: 2, px: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mr: 2 }}>
              <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: '#1565C0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <WbSunnyIcon sx={{ color: '#fff', fontSize: 20 }} />
              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="subtitle1" fontWeight={800} color="text.primary" lineHeight={1.1}>UGES</Typography>
                <Typography variant="caption" color="text.secondary" lineHeight={1}>Service Report System</Typography>
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
            {isMobile ? (
              <>
                <Box sx={{ flex: 1 }} />
                <IconButton onClick={() => setDrawerOpen(true)}><MenuIcon /></IconButton>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1, flex: 1 }}>
                {pages.map((page) => (
                  <Button key={page.key} startIcon={page.icon} onClick={() => setActivePage(page.key)}
                    variant={activePage === page.key ? 'contained' : 'text'} size="medium"
                    sx={{ borderRadius: 2, px: 2, ...(activePage !== page.key && { color: 'text.secondary' }) }}>
                    {page.label}
                  </Button>
                ))}
              </Box>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 'auto' }}>
              <Box sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'right' }}>
                <Typography variant="body2" fontWeight={600} lineHeight={1.2}>{activePage === 'admin' ? 'Admin User' : 'Inspector user'}</Typography>
                <Typography variant="caption" color="text.secondary">{activePage === 'admin' ? 'Administrator' : 'Field Inspector'}</Typography>
              </Box>
              <Avatar sx={{ width: 36, height: 36, bgcolor: activePage === 'admin' ? '#1565C0' : '#2E7D32', fontSize: '0.85rem', fontWeight: 700 }}>
                {activePage === 'admin' ? 'AU' : 'IU'}
              </Avatar>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 240, pt: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ px: 2, mb: 1 }}>Navigation</Typography>
            <List>
              {pages.map((page) => (
                <ListItem key={page.key} disablePadding>
                  <ListItemButton selected={activePage === page.key} onClick={() => { setActivePage(page.key); setDrawerOpen(false); }}>
                    <ListItemIcon>{page.icon}</ListItemIcon>
                    <ListItemText primary={page.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid', borderColor: 'divider', py: 1.5 }}>
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mr: 1 }}>QUICK STATS:</Typography>
              {statsMap[activePage].map((s) => (
                <Chip key={s.label} label={`${s.label}: ${s.value}`} size="small"
                  sx={{ bgcolor: s.bg, color: s.color, fontWeight: 700, fontSize: '0.75rem', border: `1px solid ${s.color}22` }} />
              ))}
            </Box>
          </Container>
        </Box>

        <Container maxWidth="xl" sx={{ py: 3 }}>
          {activePage === 'admin' ? <AdminPage /> : <InspectorPage />}
        </Container>

        <Box component="footer" sx={{ mt: 4, py: 1, borderTop: '1px solid', borderColor: 'divider', bgcolor: '#fff' }}>
          <Container maxWidth="xl">
            <Typography variant="caption" color="text.secondary" textAlign="center" display="block">
              UGES PowerMax Service Report Management System © 2026 — All rights reserved
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
