import { useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ServiceTable from '../components/ServiceTable';
import { adminData } from '../data/dummyData';

const tabConfig = [
    {
        label: 'Assign Service Report',
        icon: <AssignmentIcon fontSize="small" />,
        data: adminData.assign,
        theme: 'blue',
        actionType: 'assign',
        description: 'Manage and assign service reports to inspectors',
    },
    {
        label: 'Service Report For Approval',
        icon: <HourglassTopIcon fontSize="small" />,
        data: adminData.approval,
        theme: 'orange',
        actionType: 'approve',
        description: 'Review submitted reports pending your approval',
    },
    {
        label: 'Approved Service Report List',
        icon: <ChecklistIcon fontSize="small" />,
        data: adminData.approved,
        theme: 'green',
        actionType: 'view',
        description: 'All approved and finalized service reports',
    },
];

const tabColors = ['#1565C0', '#E65100', '#1B5E20'];

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
                    Admin Dashboard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Manage service report assignments, approvals, and complete report history.
                </Typography>
            </Box>

            <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
                <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#FAFAFA' }}>
                    <Tabs
                        value={activeTab}
                        onChange={(_, v) => setActiveTab(v)}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            px: 2,
                            py: 1,
                            bgcolor: '#f1f5f9',
                            borderRadius: '0px',
                            minHeight: 'auto',

                            '& .MuiTabs-indicator': {
                                height: 3,
                                borderRadius: '3px 3px 0 0',
                                backgroundColor: tabColors[activeTab],
                                // display: 'none',
                            },

                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '0.85rem',
                                minHeight: '46px',
                                borderTopLeftRadius: '25px',
                                borderBottomRightRadius: '25px',
                                px: 2,
                                mx: 0.5,
                                transition: 'all 0.2s ease',
                                color: '#64748b',
                            },

                            '& .MuiTab-root:hover': {
                                backgroundColor: '#e2e8f0',
                            },

                            '& .Mui-selected': {
                                backgroundColor: `${tabColors[activeTab]}20`,
                                color: `${tabColors[activeTab]} !important`,
                            },
                        }}
                    >
                        {tabConfig.map((tab, i) => (
                            <Tab
                                key={i}
                                label={tab.label}
                                icon={tab.icon}
                                iconPosition="start"
                            />
                        ))}
                    </Tabs>
                </Box>

                <Box sx={{ p: 3 }}>
                    <Box sx={{ mb: 2.5 }}>
                        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                            {tabConfig[activeTab].label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                            {tabConfig[activeTab].description}
                        </Typography>
                    </Box>

                    <ServiceTable
                        data={tabConfig[activeTab].data}
                        theme={tabConfig[activeTab].theme}
                        actionType={tabConfig[activeTab].actionType}
                    />
                </Box>
            </Paper>
        </Box>
    );
}