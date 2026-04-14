import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip, Typography, Paper, Chip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SendIcon from '@mui/icons-material/Send';

const themeMap = {
  blue: {
    header: '#1565C0',
    headerText: '#fff',
    rowHover: '#E3F2FD',
    chipBg: '#BBDEFB',
    chipColor: '#0D47A1',
    accent: '#1976D2',
  },
  orange: {
    header: '#E65100',
    headerText: '#fff',
    rowHover: '#FFF3E0',
    chipBg: '#FFE0B2',
    chipColor: '#BF360C',
    accent: '#F57C00',
  },
  green: {
    header: '#1B5E20',
    headerText: '#fff',
    rowHover: '#E8F5E9',
    chipBg: '#C8E6C9',
    chipColor: '#1B5E20',
    accent: '#2E7D32',
  },
};

const columns = [
  { id: 'title', label: 'Title', minWidth: 180, sticky: true },
  { id: 'view', label: 'View', minWidth: 60, align: 'center' },
  { id: 'actions', label: 'Actions', minWidth: 120, align: 'center' },
  { id: 'assignDate', label: 'Assign Date', minWidth: 120 },
  { id: 'projectName', label: 'Project Name', minWidth: 150 },
  { id: 'windfarmName', label: 'Windfarm Name', minWidth: 150 },
  { id: 'country', label: 'Country', minWidth: 100 },
  { id: 'state', label: 'State', minWidth: 120 },
  { id: 'district', label: 'District', minWidth: 120 },
  { id: 'taluka', label: 'Taluka', minWidth: 120 },
  { id: 'village', label: 'Village', minWidth: 120 },
  { id: 'locationNo', label: 'Location No', minWidth: 120 },
  { id: 'wtgMake', label: 'WTG Make', minWidth: 120 },
  { id: 'wtgModel', label: 'WTG Model', minWidth: 130 },
  { id: 'wtgSerialNo', label: 'WTG Serial No', minWidth: 140 },
  { id: 'installationDate', label: 'Installation Date', minWidth: 140 },
  { id: 'commissioningDate', label: 'Commissioning Date', minWidth: 160 },
  { id: 'maintenanceDate', label: 'Maintenance Date', minWidth: 150 },
];

const ActionButtons = ({ row, actionType, theme }) => {
  const color = themeMap[theme]?.accent || '#1976D2';

  const handleAction = (action) => {
    console.log(`Action: ${action}`, row);
  };

  return (
    <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
      <Tooltip title="Edit">
        <IconButton size="small" onClick={() => handleAction('edit')} sx={{ color: '#F57C00', '&:hover': { bgcolor: '#FFF3E0' } }}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      {(actionType === 'assign' || actionType === 'assigned') && (
        <Tooltip title="Assign">
          <IconButton size="small" onClick={() => handleAction('assign')}
            sx={{ color, '&:hover': { bgcolor: themeMap[theme]?.rowHover } }}>
            <AssignmentIndIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      {actionType === 'approve' && (
        <Tooltip title="Approve">
          <IconButton size="small" onClick={() => handleAction('approve')}
            sx={{ color: '#2E7D32', '&:hover': { bgcolor: '#E8F5E9' } }}>
            <CheckCircleIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      {actionType === 'submit' && (
        <Tooltip title="Submit">
          <IconButton size="small" onClick={() => handleAction('submit')}
            sx={{ color: '#1565C0', '&:hover': { bgcolor: '#E3F2FD' } }}>
            <SendIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default function ServiceTable({ data = [], theme = 'blue', actionType = 'assign', title = '' }) {
  const colors = themeMap[theme];

  return (
    <Box>
      {title && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
          <Chip
            label={`${data.length} Records`}
            size="small"
            sx={{ bgcolor: colors.chipBg, color: colors.chipColor, fontWeight: 600, fontSize: '0.75rem' }}
          />
        </Box>
      )}
      <Paper elevation={0} sx={{borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider', boxShadow: '0 2px 12px rgba(0,0,0,0.06)'}}>
        <TableContainer sx={{ maxHeight: 520, overflowX: 'auto' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.id}
                    align={col.align || 'left'}
                    sx={{
                      minWidth: col.minWidth,
                      bgcolor: colors.header,
                      color: colors.headerText,
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      py: 1.5,
                      px: 1.5,
                      borderBottom: 'none',
                      ...(col.sticky ? { position: 'sticky', left: 0, zIndex: 5, bgcolor: colors.header } : {}),
                    }}>
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={row.id} sx={{bgcolor: index % 2 === 0 ? '#fff' : '#FAFAFA', transition: 'background 0.15s', '&:hover': { bgcolor: colors.rowHover }, cursor: 'pointer'}}>
                  {columns.map((col) => {
                    if (col.id === 'view') {
                      return (
                        <TableCell key={col.id} align="center" sx={{ py: 0.75, px: 1 }}>
                          <Tooltip title="View Details">
                            <IconButton size="small" onClick={() => console.log('View:', row)} sx={{ color: colors.accent, '&:hover': { bgcolor: colors.rowHover } }}>
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      );
                    }
                    if (col.id === 'actions') {
                      return (
                        <TableCell key={col.id} align="center" sx={{ py: 0.75, px: 1 }}>
                          <ActionButtons row={row} actionType={actionType} theme={theme} />
                        </TableCell>
                      );
                    }
                    if (col.id === 'title') {
                      return (
                        <TableCell key={col.id} sx={{ py: 0.75, px: 1.5, fontWeight: 600, fontSize: '0.8rem', color: colors.accent, whiteSpace: 'nowrap', position: 'sticky', left: 0, bgcolor: 'inherit', zIndex: 2, borderRight: '2px solid', borderColor: 'divider' }}>
                          {row[col.id]}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={col.id} align={col.align || 'left'} sx={{py: 0.75, px: 1.5, fontSize: '0.8rem', color: 'text.secondary', whiteSpace: 'nowrap'}}>
                        {row[col.id]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
              {data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary" fontSize="0.9rem">No records found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
