export const generateRows = (count, prefix = '') => {
  const projects = ['Windpower Alpha', 'Green Horizon', 'SkyForce Delta', 'AeroGreen Plus', 'WindVista Pro'];
  const windfarms = ['Sahyadri WF', 'Kutch WF-1', 'Jaisalmer WF', 'Bellary WF', 'Coimbatore WF'];
  const countries = ['India'];
  const states = ['Gujarat', 'Rajasthan', 'Maharashtra', 'Karnataka', 'Tamil Nadu'];
  const districts = ['Ankleshwar', 'Jaisalmer', 'Pune', 'Bellary', 'Coimbatore'];
  const talukas = ['Ankleshwar', 'Fatehgarh', 'Bhor', 'Hospet', 'Madukkarai'];
  const villages = ['Amod', 'Khuri', 'Nira', 'Hagaribommanahalli', 'Kalapatti'];
  const makes = ['Vestas', 'GE', 'Siemens', 'Suzlon', 'Inox Wind'];
  const models = ['V150-4.5', 'GE2.7-116', 'SG 5.0-145', 'S97-2.1', 'DF113-2.0'];

  return Array.from({ length: count }, (_, i) => {
    const idx = i % 5;
    return {
      id: i + 1,
      title: `${prefix}Service Report ${String(i + 1).padStart(3, '0')}`,
      assignDate: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
      projectName: projects[idx],
      windfarmName: windfarms[idx],
      country: countries[0],
      state: states[idx],
      district: districts[idx],
      taluka: talukas[idx],
      village: villages[idx],
      locationNo: `LOC-${String(1000 + i).padStart(4, '0')}`,
      wtgMake: makes[idx],
      wtgModel: models[idx],
      wtgSerialNo: `WTG-${String(5000 + i)}`,
      installationDate: `2020-${String((i % 12) + 1).padStart(2, '0')}-15`,
      commissioningDate: `2020-${String((i % 12) + 1).padStart(2, '0')}-28`,
      maintenanceDate: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    };
  });
};

export const adminData = {
  assign: generateRows(8, 'ASN-'),
  approval: generateRows(6, 'APR-'),
  approved: generateRows(10, 'APP-'),
};

export const inspectorData = {
  assigned: generateRows(7, 'INS-'),
  draft: generateRows(5, 'DFT-'),
  submitted: generateRows(9, 'SUB-'),
};
