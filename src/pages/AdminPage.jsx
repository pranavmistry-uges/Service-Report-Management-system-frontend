import { useState } from 'react';
import {
  Box, Tabs, Tab, Typography, Paper, Grid, TextField,
  MenuItem, Select, FormControl, InputLabel, Button, Divider, Chip
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ServiceTable from '../components/ServiceTable';
import { adminData } from '../data/dummyData';

const tabColors = ['#1565C0', '#E65100', '#1B5E20'];

const projects = ['Global Wind Project Alpha', 'Green Horizon', 'SkyForce Delta', 'AeroGreen Plus', 'WindVista Pro'];
const windfarms = ['GreenValley East Farm', 'Sahyadri WF', 'Kutch WF-1', 'Jaisalmer WF', 'Coimbatore WF'];
const technicians = ['Priya Patel', 'Rahul Mehta', 'Sneha Joshi', 'Arjun Singh', 'Kavya Nair'];

const emptyForm = {
  project: '',
  windfarm: '',
  noOfTasks: 1,
  locationNo: '',
  assignTo: '',
  country: '',
  state: '',
  district: '',
  taluka: '',
  village: '',
  wtgMake: '',
  wtgModel: '',
  wtgSerialNo: '',
  installationDate: '',
  commissioningDate: '',
  maintenanceDate: '',
};

function AssignForm({ onAssign }) {
  const [form, setForm] = useState(emptyForm);
  const [tasks, setTasks] = useState([emptyForm]);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleTaskCountChange = (e) => {
    const count = Math.max(1, Number(e.target.value));

    setForm(f => ({ ...f, noOfTasks: count }));

    // update tasks array
    setTasks(prev => {
      let updated = [...prev];

      if (count > updated.length) {
        while (updated.length < count) {
          updated.push({ ...emptyForm });
        }
      } else {
        updated = updated.slice(0, count);
      }

      return updated;
    });
  };

  const setTaskField = (index, field) => (e) => {
    const value = e.target.value;

    setTasks(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAssign = () => {
    if (!form.project || !form.windfarm) {
      alert('Please fill Project and Wind Farm.');
      return;
    }

    const now = new Date().toISOString().split('T')[0];

    const rows = tasks.map((task, index) => ({
      id: Date.now() + index,
      title: `ASN-${String(Date.now() + index).slice(-4)}-${index + 1}`,
      assignDate: now,
      projectName: form.project,
      windfarmName: form.windfarm,

      country: task.country || '—',
      state: task.state || '—',
      district: task.district || '—',
      taluka: task.taluka || '—',
      village: task.village || '—',
      locationNo: task.locationNo || '—',

      wtgMake: task.wtgMake || '—',
      wtgModel: task.wtgModel || '—',
      wtgSerialNo: task.wtgSerialNo || '—',

      installationDate: task.installationDate || '—',
      commissioningDate: task.commissioningDate || '—',
      maintenanceDate: task.maintenanceDate || '—',

      assignTo: task.assignTo || '—',

      taskNumber: index + 1
    }));

    onAssign(rows);

    setForm(emptyForm);
    setTasks([emptyForm]);
  };

  const labelSx = {
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.07em',
    color: '#1565C0',
    textTransform: 'uppercase',
    mb: 0.5,
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      fontSize: '0.875rem',
      bgcolor: '#fff',
      '&:hover fieldset': { borderColor: '#1565C0' },
      '&.Mui-focused fieldset': { borderColor: '#1565C0', borderWidth: 2 },
    },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#BBDEFB' },
  };

  return (
    <Box
      sx={{
        border: '1.5px solid #BBDEFB',
        borderRadius: 0,
        overflow: 'hidden',
        mb: 3,
        bgcolor: '#F8FBFF',
      }}
    >
      {/* Form Header */}
      <Box sx={{ bgcolor: '#1565C0', px: 3, py: 1.75, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <AssignmentTurnedInIcon sx={{ color: '#fff', fontSize: 20 }} />
        <Typography variant="subtitle1" fontWeight={700} color="white">
          Assign Task — WTG Inspection Report
        </Typography>
      </Box>

      <Box sx={{ px: 3, pt: 2.5, pb: 2, bgcolor: '#EBF4FF', borderBottom: '1px solid #BBDEFB' }}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} sm={4}>
            <Typography sx={labelSx}>Select Project</Typography>
            <FormControl fullWidth size="small" sx={inputSx}>
              <Select
                value={form.project}
                onChange={set('project')}
                displayEmpty
                renderValue={v => v || <span style={{ color: '#aaa' }}>Global Wind Project Alpha</span>}
              >
                {projects.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography sx={labelSx}>Select Wind Farm</Typography>
            <FormControl fullWidth size="small" sx={inputSx}>
              <Select
                value={form.windfarm}
                onChange={set('windfarm')}
                displayEmpty
                renderValue={v => v || <span style={{ color: '#aaa' }}>GreenValley East Farm</span>}
              >
                {windfarms.map(w => <MenuItem key={w} value={w}>{w}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={2}>
            <Typography sx={labelSx}>No. of Tasks</Typography>
            <TextField
              fullWidth
              size="small"
              type="number"
              value={form.noOfTasks}
              onChange={handleTaskCountChange}
              inputProps={{ min: 1 }}
              sx={inputSx}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Inspection Parameters */}
      <Box sx={{ px: 3, py: 1 }}>
        {Array.from({ length: Number(form.noOfTasks) || 1 }).map((_, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            {/* Task Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
              <Chip
                label={`TASK ${index + 1}`}
                size="small"
                sx={{
                  bgcolor: '#1565C0',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  borderRadius: 1
                }}
              />
              <Typography
                variant="subtitle2"
                fontWeight={700}
                color="text.primary"
                fontSize="1rem"
              >
                Inspection Parameters
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {/* Row 1 */}
              <Grid item xs={12} sm={4}>
                <Typography sx={labelSx}>Windfarm Name</Typography>
                <FormControl fullWidth size="small" sx={inputSx}>
                  <Select
                    value={tasks[index].windfarm}
                    onChange={setTaskField(index, 'windfarm')}
                    displayEmpty
                    renderValue={v => v || <span style={{ color: '#aaa' }}>GreenValley East Farm</span>}
                  >
                    {windfarms.map(w => <MenuItem key={w} value={w}>{w}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={labelSx}>Location No.</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g. GV-402"
                  value={tasks[index].locationNo}
                  onChange={setTaskField(index, 'locationNo')}
                  sx={inputSx}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={labelSx}>Assign To</Typography>
                <FormControl fullWidth size="small" sx={inputSx}>
                  <Select
                    value={tasks[index].assignTo}
                    onChange={setTaskField(index, 'assignTo')}
                    displayEmpty
                    renderValue={v => v || <span style={{ color: '#aaa' }}>Select Technician</span>}
                  >
                    {technicians.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>

              {/* Row 2 */}
              <Grid item xs={12} sm={4}>
                <Typography sx={labelSx}>Country</Typography>
                <TextField
                  fullWidth size="small"
                  value={tasks[index].country}
                  onChange={setTaskField(index, 'country')}
                  sx={inputSx}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={labelSx}>State</Typography>
                <TextField
                  fullWidth size="small"
                  value={tasks[index].state}
                  onChange={setTaskField(index, 'state')}
                  sx={inputSx}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={labelSx}>District</Typography>
                <TextField
                  fullWidth size="small"
                  value={tasks[index].district}
                  onChange={setTaskField(index, 'district')}
                  sx={inputSx}
                />
              </Grid>

              {/* Row 3 */}
              <Grid item xs={12} sm={4}>
                <Typography sx={labelSx}>Taluka</Typography>
                <TextField
                  fullWidth size="small"
                  value={tasks[index].taluka}
                  onChange={setTaskField(index, 'taluka')}
                  sx={inputSx}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={labelSx}>Village</Typography>
                <TextField
                  fullWidth size="small"
                  value={tasks[index].village}
                  onChange={setTaskField(index, 'village')}
                  sx={inputSx}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={labelSx}>WTG Make</Typography>
                <TextField
                  fullWidth size="small"
                  value={tasks[index].wtgMake}
                  onChange={setTaskField(index, 'wtgMake')}
                  sx={inputSx}
                />
              </Grid>

              {/* Row 4 */}
              <Grid item xs={12} sm={4}>
                <Typography sx={labelSx}>WTG Model</Typography>
                <TextField
                  fullWidth size="small"
                  value={tasks[index].wtgModel}
                  onChange={setTaskField(index, 'wtgModel')}
                  sx={inputSx}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={labelSx}>WTG Serial No.</Typography>
                <TextField
                  fullWidth size="small"
                  value={tasks[index].wtgSerialNo}
                  onChange={setTaskField(index, 'wtgSerialNo')}
                  sx={inputSx}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={labelSx}>Installation Date</Typography>
                <TextField
                  fullWidth size="small"
                  type="date"
                  value={tasks[index].installationDate}
                  onChange={setTaskField(index, 'installationDate')}
                  InputLabelProps={{ shrink: true }}
                  sx={inputSx}
                />
              </Grid>

              {/* Row 5 */}
              <Grid item xs={12} sm={4}>
                <Typography sx={labelSx}>Commissioning Date</Typography>
                <TextField
                  fullWidth size="small"
                  type="date"
                  value={tasks[index].commissioningDate}
                  onChange={setTaskField(index, 'commissioningDate')}
                  InputLabelProps={{ shrink: true }}
                  sx={inputSx}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography sx={labelSx}>Maintenance Date</Typography>
                <TextField
                  fullWidth size="small"
                  type="date"
                  value={tasks[index].maintenanceDate}
                  onChange={setTaskField(index, 'maintenanceDate')}
                  InputLabelProps={{ shrink: true }}
                  sx={inputSx}
                />
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3, pt: 1, borderTop: '1px solid #BBDEFB', marginRight: '10px', marginBottom: '10px' }}>
        <Button
          variant="contained"
          endIcon={<AssignmentTurnedInIcon />}
          onClick={handleAssign}
          sx={{
            bgcolor: '#1565C0', fontWeight: 700, textTransform: 'uppercase',
            fontSize: '0.8rem', letterSpacing: '0.06em', borderRadius: 2,
            px: 3, '&:hover': { bgcolor: '#0D47A1' },
            boxShadow: '0 2px 8px rgba(21,101,192,0.4)',
          }}
        >
          Assign Task
        </Button>
      </Box>
    </Box>
  )
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [assignedRows, setAssignedRows] = useState(adminData.assign);

  const handleAssign = (newRows) => {
    setAssignedRows(prev => [...newRows, ...prev]);
  };

  const tabConfig = [
    {
      label: 'Assign Service Report',
      icon: <AssignmentIcon fontSize="small" />,
      theme: 'blue',
      actionType: 'assign',
      description: 'Fill the form below to assign a new WTG inspection task to a technician.',
      data: assignedRows,
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

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        }}
      >
        {/* Tab Bar */}
        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#FAFAFA', }}>
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
              <Tab key={i} label={tab.label} icon={tab.icon} iconPosition="start" />
            ))}
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ p: 3 }}>
          <Box sx={{ mb: 2.5 }}>
            <Typography variant="subtitle1" fontWeight={700} color="text.primary">
              {tabConfig[activeTab].label}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              {tabConfig[activeTab].description}
            </Typography>
          </Box>

          {/* Show form only on Tab 0 */}
          {activeTab === 0 && <AssignForm onAssign={handleAssign} />}

          {/* Table always shown below */}
          <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" fontWeight={700} color="text.primary">
              Assigned Reports
            </Typography>
            <Chip
              label={`${tabConfig[activeTab].data.length} records`}
              size="small"
              sx={{
                bgcolor: '#BBDEFB',
                color: '#0D47A1',
                fontWeight: 600,
                fontSize: '0.7rem',
              }}
            />
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