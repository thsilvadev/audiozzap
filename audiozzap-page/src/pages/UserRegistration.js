import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from "axios";
import * as yup from "yup";
import styles from "../styles/UserRegistration.module.css";

const UserConfirmation = () => {
  const navigate = useNavigate();
  const { encodedURIHash } = useParams();
  console.log(encodedURIHash)

  const validationPassword = yup.object({
    username: yup
    .string()
    .min(3, "Apelido deve conter no mínimo 3 caracteres")
    .required("Por favor, insira seu apelido"),
    password: yup
      .string()
      .min(8, "Senha deve conter no mínimo 8 caracteres")
      .required("Insira sua senha"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Senhas não coincidem')
      .required('Confirme sua senha'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form submitted with values:", values);
    if (encodedURIHash) {
      Axios.post(`${window.name}/userRegistration/${encodedURIHash}`, {
        username: values.username,
        password: values.password,
      })
        .then((response) => {
          setSubmitting(false);
          if (response.data.message) {
            alert(response.data.message);
            navigate("/");
          }
        })
        .catch((error) => {
          setSubmitting(false);
          console.error(error);
          alert(error.response.data.message);
        });
    } else {
      console.log('encodedURIHash not found')
    }
  };

  return (
    <div
      className={styles.loginContainer}
      onLoad={window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <h2 className={styles.title}>Insira seu apelido e senha:</h2>
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationPassword}
      >
        {({ isSubmitting }) => (
          <Form className={styles.loginForm}>
            <div className={styles.loginFormGroup}>
              <Field
                name="username"
                className={styles.formField}
                placeholder="Username"
              />
              <ErrorMessage
                component="span"
                name="username"
                className={styles.formError}
              />
            </div>
            <div className={styles.loginFormGroup}>
              <Field
                name="password"
                className={styles.formField}
                placeholder="Password"
                type="password"
              />
              <ErrorMessage
                component="span"
                name="password"
                className={styles.formError}
                type="password"
              />
            </div>
            <div className={styles.loginFormGroup}>
              <Field
                name="confirmPassword"
                className={styles.formField}
                placeholder="Confirm Password"
                type="password"
              />
              <ErrorMessage
                component="span"
                name="confirmPassword"
                className={styles.formError}
              />
            </div>
            <button
              className={styles.button}
              type="submit"
              disabled={isSubmitting}
            >
              Enviar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserConfirmation;
