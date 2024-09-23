import * as yup from 'yup';

export const FORM_FIELDS = {
  name: yup.object().shape({ name: yup.string().required() }),
  age: yup.object().shape({ age: yup.number().required() }),
  stu_class: yup.object().shape({ stu_class: yup.number().required() }),
};
