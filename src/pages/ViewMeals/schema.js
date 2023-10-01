import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required'),
  description: Yup.string()
    .min(5, 'Description too short!')
    .max(300, 'Description too long!')
    .required('Description is required'),
  timeFrom: Yup.string(),
  timeTo: Yup.string(),
  price: Yup.number()
    .min(0, 'Total price should be 0 or more')
    .required('Total price is required'),
  tags: Yup.object().required('Tag is required'),
});
