import React, { useEffect } from 'react';
import { Input } from '../Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IonButton } from '@ionic/react';

export const FormProfile = ({ sendForm, button = true, initialValues, formikRef = null }) => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('El nombre es requerido'),
    fathersName: Yup.string().required('El apellido paterno es requerido'),
    mothersName: Yup.string().required('El apellido materno es requerido'),
  });
  const formik = useFormik({
    initialValues: initialValues
      ? initialValues
      : { firstName: '', fathersName: '', mothersName: '' },
    validationSchema,
    onSubmit: values => {
      sendForm(values);
    },
  });

  useEffect(() => {
    if (formikRef !== null) {
      formikRef.current = formik;
    }
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} ref={formikRef}>
        <Input
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.errors.firstName}
          label="Nombre"
          name="firstName"
        />
        <Input
          value={formik.values.fathersName}
          onChange={formik.handleChange}
          error={formik.errors.fathersName}
          label="Apellido paterno"
          name="fathersName"
        />
        <Input
          value={formik.values.mothersName}
          onChange={formik.handleChange}
          error={formik.errors.mothersName}
          label="Apellido materno"
          name="mothersName"
        />
        {button && <IonButton type="submit">Enviar</IonButton>}
      </form>
    </div>
  );
};
