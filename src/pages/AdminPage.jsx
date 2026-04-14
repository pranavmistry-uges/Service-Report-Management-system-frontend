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

      <Paper elevation={0} sx={{borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)'}}>
        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#FAFAFA' }}>
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              px: 2,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                minHeight: 56,
                gap: 0.5,
                color: 'text.secondary',
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
                backgroundColor: tabColors[activeTab],
              },
              '& .Mui-selected': {
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



// import React, { useState } from "react";
// import { Tabs, Tab, Box, Typography } from "@mui/material";
// import TableComponent from "../components/TableComponent";

// export default function AdminPage() {
//     const [tab, setTab] = useState(0);

//     return (
//         <Box sx={{ p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
//             <Typography variant="h5" mb={2}>
//                 Admin Panel
//             </Typography>

//             <Tabs value={tab} onChange={(e, v) => setTab(v)} textColor="primary" indicatorColor="primary">
//                 <Tab label="Assign Service Report" />
//                 <Tab label="Service Report For Approval" />
//                 <Tab label="Approved Service Report List" />
//             </Tabs>

//             {tab === 0 && <TableComponent type="assigned" />}
//             {tab === 1 && <TableComponent type="draft" />}
//             {tab === 2 && <TableComponent type="submitted" />}
//         </Box>
//     );
// }