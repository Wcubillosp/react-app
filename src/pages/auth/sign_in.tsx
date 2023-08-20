/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import Login from 'components/auth/login';
import Register from 'components/auth/register';
import styles from 'styles/pages/auth/signIn.module.css';

interface SignInProps {
  register?: boolean;
}

const SignIn = ({ register }: SignInProps) => {
  const [toogleComponent, setToogleComponent] = useState(true);
  const [exitLogin, setExitLogin] = useState(false);
  const [exitRegister, setExitRegister] = useState(false);

  const handleChangeComponent = () => {
    setExitLogin(true);
    setExitRegister(true);
    setTimeout(() => {
      setExitLogin(false);
      setExitRegister(false);
      setToogleComponent(!toogleComponent);
    }, 500);
  };

  useEffect(() => {
    if (register) {
      setToogleComponent(!toogleComponent);
    }
  }, [register]);

  useEffect(() => {
    if (!toogleComponent) {
      window.history.pushState(null, '', '/auth/sign_up');
    } else {
      window.history.pushState(null, '', '/auth/sign_in');
    }
  }, [toogleComponent]);

  return (
    <div className={styles.grid}>
      <div className={`${styles.content}`}>
        <AnimatePresence>
          {toogleComponent ? (
            <motion.div
              initial={exitLogin ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
              animate={
                exitLogin ? { opacity: 0, x: -100 } : { opacity: 1, x: 0 }
              }
              transition={{ duration: 0.5 }}
            >
              <Login setToogleComponent={handleChangeComponent} />
            </motion.div>
          ) : (
            <motion.div
              initial={
                exitRegister ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }
              }
              animate={
                exitRegister ? { opacity: 0, x: 100 } : { opacity: 1, x: 0 }
              }
              transition={{ duration: 0.5 }}
            >
              <Register setToogleComponent={handleChangeComponent} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SignIn;
