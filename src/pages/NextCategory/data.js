const columns = [
  { name: 'Image', uid: 'thumbnail'},
  { name: 'Category Name', uid: 'name', sortable: true },
  { name: 'Category Date', uid: 'createdAt'},
  { name: 'Total Foods', uid: '_count', sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
];

const statusOptions = [
  { name: 'Available', uid: 'available' },
  { name: 'Unavailable', uid: 'unavailable' },
];


export { columns, statusOptions };
