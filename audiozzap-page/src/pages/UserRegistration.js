import { React } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from "axios";
import * as yup from "yup"; //yup needs to be imported like that or destructured for specific resources.
import styles from "../styles/UserRegistration.module.css";

const UserConfirmation = () => {
  const navigate = useNavigate();

  const { userHash } = useParams();  

  const validationPassword = yup.object({
    password: yup
      .string()
      .min(8, "Senha deve conter no mínimo 8 caracteres")
      .required("Insira sua senha"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Senhas não coincidem').required('Confirme sua senha'),
  });

  const handleSubmit = (values) => {
    if (userHash) {
      Axios.post(`${window.name}/userRegistration/${userHash}`, {
        password: values.password,
      })
        .then((response) => {
          if (response.data.message) {
            alert(response.data.message);
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error(error);
          alert(error.response.data.error);
        });
    }
  };

  return (
    <div
      className={styles.loginContainer}
      onLoad={window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <h2 className={styles.title}>Por favor insira sua senha:</h2>
      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={validationPassword}
      >
        <Form className={styles.loginForm}>
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

          <button className={styles.button} type="submit">
            Enviar
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default UserConfirmation;
