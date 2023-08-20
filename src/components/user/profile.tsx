/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useState, useEffect } from "react";

import { useFormik } from "formik";
import {
  FaCheck,
  FaEdit,
  FaRegWindowClose,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { IUser, defUser } from "models/user/user";
import { UserContext } from "provider/userProvider";
import { profileEditService } from "services/user/profile";
import styles from "styles/components/user/profile.module.css";
import PhotoProfile from "./photoProfile";

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no debe exceder los 50 caracteres")
    .matches(
      /^[a-zA-Z\s]+$/,
      "El nombre no puede contener números ni caracteres especiales"
    )
    .required("El campo de nombre es obligatorio"),
  email: Yup.string()
    .email("Ingresa una dirección de correo electrónico válida")
    .required("El campo de correo es obligatorio"),
});

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [disable, setDisable] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/auth/sign_in");
      window.location.reload();
    }, 100);
  };

  const initialValues = defUser;

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: ValidationSchema,
    onSubmit: (values: IUser) => {
      profileEditService({ ...values });
      setDisable(!disable);
    },
  });

  useEffect(() => {
    if (user) {
      formik.setFieldValue("name", user.name);
      formik.setFieldValue("email", user.email);
      formik.setFieldValue("description", user.description);
    }
  }, [user]);

  return (
    <div className={`${styles.layout}`}>
      <form className={`${styles.form}`}>
        <div className={`${styles.head}`}>
          <div>
            <PhotoProfile />
          </div>
          <div className={`${styles.nameEdit}`}>
            <input
              disabled={disable}
              className={`${formik.errors.name && "error"}`}
              type="text"
              id="name"
              placeholder="Nombre"
              {...formik.getFieldProps("name")}
              onChange={formik.handleChange}
            />
            {disable ? (
              <button>
                <FaEdit onClick={() => setDisable(!disable)} />
              </button>
            ) : (
              <>
                <button type="button" onClick={() => formik.handleSubmit()}>
                  <FaCheck style={{ color: "green" }} />
                </button>
                <button type="button" onClick={() => setDisable(!disable)}>
                  <FaRegWindowClose style={{ color: "red" }} />
                </button>
              </>
            )}
          </div>
        </div>
        <hr />
        <div className={`${styles.body}`}>
          <div>
            <label htmlFor="email">Correo</label>
            <input
              disabled={disable}
              className={`${formik.errors.email && "error"}`}
              type="text"
              id="email"
              placeholder="Correo"
              {...formik.getFieldProps("email")}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Description</label>
            <input
              disabled={disable}
              className={`${formik.errors.description && "error"}`}
              type="text"
              id="description"
              placeholder="Descripcion"
              {...formik.getFieldProps("description")}
              onChange={formik.handleChange}
            />
          </div>
        </div>
      </form>
      <div className={`${styles.logout}`} onClick={() => logout()}>
        <FaSignOutAlt /> Cerrar sesion
      </div>
    </div>
  );
};

export default Profile;
