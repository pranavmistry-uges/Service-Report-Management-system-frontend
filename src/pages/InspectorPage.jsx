import { useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DraftsIcon from '@mui/icons-material/Drafts';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ServiceTable from '../components/ServiceTable';
import { inspectorData } from '../data/dummyData';

const tabConfig = [
  {
    label: 'Assigned Service Report',
    icon: <AssignmentTurnedInIcon fontSize="small" />,
    data: inspectorData.assigned,
    theme: 'blue',
    actionType: 'assigned',
    description: 'Service reports assigned to you for inspection and data entry',
  },
  {
    label: 'Service Report Draft',
    icon: <DraftsIcon fontSize="small" />,
    data: inspectorData.draft,
    theme: 'orange',
    actionType: 'submit',
    description: 'Reports saved as draft — review and complete before submitting',
  },
  {
    label: 'Submitted Service Report List',
    icon: <TaskAltIcon fontSize="small" />,
    data: inspectorData.submitted,
    theme: 'green',
    actionType: 'view',
    description: 'Reports you have submitted and are awaiting admin approval',
  },
];

const tabColors = ['#1565C0', '#E65100', '#1B5E20'];

export default function InspectorPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
          Inspector Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Access your assigned reports, manage drafts, and track submitted service report status.
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
