import { SetStateAction, useState } from 'react';

import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { ISignIn, defSignIn } from 'models/auth/signIn';
import { loginService } from 'services/auth/login';
import styles from 'styles/components/login/login.module.css';

const ValidationSchema = Yup.object().shape({
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

interface LoginProps {
  setToogleComponent: (value: SetStateAction<boolean>) => void;
}

const Login = ({ setToogleComponent }: LoginProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const [error, setError] = useState('');

  const ShowAlert = (err: string) => {
    if (err) {
      setError(err);
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  const initialValues = defSignIn;

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: ValidationSchema,
    onSubmit: (values: ISignIn, { resetForm }) => {
      setLoading(true);
      loginService({ ...values })
        .then(async (res: any) => {
          localStorage.setItem('token', res.data);
          setTimeout(() => {
            navigate('/user/dashboard');
            window.location.reload();
          }, 100);
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
      return error;
    }
    if (Object.keys(formik.errors).length) {
      return `${Object.values(formik.errors)[0]}`;
    }
    return null;
  };

  return (
    <div className={`${styles.layout}`}>
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Acceder</h1>
      </motion.div>
      <form className={`${styles.authForm}`}>
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
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
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75 }}
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
              <>&nbsp;</>
            )}
          </div>
        </div>
        <motion.button
          className={`${styles.buttonSubmit}`}
          type="button"
          onClick={() => formik.handleSubmit()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 1 }}
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {!loading ? (
            <div>Iniciar sesión</div>
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
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.25 }}
        >
          <button
            className={`${styles.signupText}`}
            type="button"
            onClick={() => setToogleComponent(false)}
          >
            Crear una cuenta
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default Login;
