const columns = [
  { name: 'Table No', uid: 'tbl_name' },
  { name: 'Capacity', uid: 'capacity', sortable: true },
  { name: 'Created Date', uid: 'createdAt' },
  { name: 'QR code download', uid: 'qr_code' },
  { name: 'Total Orders', uid: '_count', sortable: true },
  { name: 'Table Availability', uid: 'totalAvailability' },
  { name: 'STATUS', uid: 'status' },
  { name: 'ACTIONS', uid: 'actions' },
];

const statusOptions = [
  { name: 'Available', uid: 'available' },
  { name: 'Unavailable', uid: 'unavailable' },
];

export { columns, statusOptions };
