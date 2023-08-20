import { SetStateAction, useState } from 'react';

import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { ISignUp, defSignUp } from 'models/auth/signUp';
import { registerService } from 'services/auth/register';
import styles from 'styles/components/login/login.module.css';

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no debe exceder los 50 caracteres')
    .matches(
      /^[a-zA-Z\s]+$/,
      'El nombre no puede contener números ni caracteres especiales'
    )
    .required('El campo de nombre es obligatorio'),
  email: Yup.string()
    .email('Ingresa una dirección de correo electrónico válida')
    .required('El campo de correo es obligatorio'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'La contraseña debe tener al menos una letra mayúscula, un número y un carácter especial'
    )
    .required('La contraseña es requerida'),
});

interface RegiserProps {
  setToogleComponent: (value: SetStateAction<boolean>) => void;
}

const Regiser = ({ setToogleComponent }: RegiserProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const ShowAlert = (err: string) => {
    if (err) {
      setError(err);
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  const ShowSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      navigate('/user/dashboard');
    }, 1000);
  };

  const initialValues = defSignUp;

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: ValidationSchema,
    onSubmit: (values: ISignUp, { resetForm }) => {
      setLoading(true);
      registerService({ ...values })
        .then(async () => {
          ShowSuccess();
        })
        .catch((err) => {
          ShowAlert(err?.response?.data?.error);
          resetForm();
          setLoading(false);
        });
    },
  });

  const getErrorText = () => {
    if (error) {
      return 'El Correo electronico ya se encuentra registrado';
    }
    if (Object.keys(formik.errors).length) {
      return `${Object.values(formik.errors)[0]}`;
    }
    return null;
  };

  return (
    <div className={`${styles.layout}`}>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Crear cuenta</h1>
      </motion.div>
      <form className={`${styles.authForm}`}>
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <label htmlFor="name">Nombre</label>
          <input
            className={`${formik.errors.name && 'error'}`}
            type="text"
            id="name"
            placeholder="Ingresa tu correo"
            {...formik.getFieldProps('name')}
            onChange={formik.handleChange}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75 }}
        >
          <label htmlFor="email">Correo electrónico</label>
          <input
            className={`${formik.errors.email && 'error'}`}
            type="text"
            id="email"
            placeholder="Ingresa tu correo"
            {...formik.getFieldProps('email')}
            onChange={formik.handleChange}
          />
        </motion.div>
        <div>
          <motion.div
            className={`${styles.layoutPassword}`}
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <label htmlFor="password">Contraseña</label>
            <div className={`${styles.password}`}>
              <input
                className={`${formik.errors.password && 'error'}`}
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Contraseña"
                {...formik.getFieldProps('password')}
                onChange={formik.handleChange}
              />
              <div onClick={toggleShowPassword}>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </motion.div>
        </div>
        <div>
          <div>
            {getErrorText() ? (
              <div className="error_text">{getErrorText()}</div>
            ) : (
              <div className="success_text">
                {success && 'Cuenta creada'}&nbsp;
              </div>
            )}
          </div>
        </div>
        <motion.button
          className={`${styles.buttonSubmit}`}
          type="button"
          onClick={() => formik.handleSubmit()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 1 }}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.25 }}
          style={{
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {!loading ? (
            <div>Crear cuenta</div>
          ) : (
            <>
              <motion.div
                className={`${styles.loading}`}
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <div>Espere un momento...</div>
            </>
          )}
        </motion.button>
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          <button
            className={`${styles.signupText}`}
            type="button"
            onClick={() => setToogleComponent(false)}
          >
            Iniciar sesion
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default Regiser;
