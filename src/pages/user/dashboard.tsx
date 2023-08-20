import Cripto from 'components/cripto/cripto';
import Profile from 'components/user/profile';
import styles from 'styles/pages/user/dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={`${styles.content}`}>
      <Profile />
      <Cripto />
    </div>
  );
};

export default Dashboard;
