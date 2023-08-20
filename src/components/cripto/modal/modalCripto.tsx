import { SetStateAction } from 'react';

import { FaRegWindowClose } from 'react-icons/fa';

import { ICripto } from 'models/cripto/cripto';
import styles from 'styles/components/cripto/modal/modalCripto.module.css';

interface ModalCriptoProps {
  cripto: ICripto;
  setShowModal: (value: SetStateAction<boolean>) => void;
}

const ModalCripto = ({ cripto, setShowModal }: ModalCriptoProps) => {
  return (
    <div className={`${styles.layout}`}>
      <div className={`${styles.background}`} />
      <div className={`${styles.card}`}>
        <div className={`${styles.close}`} onClick={() => setShowModal(false)}>
          <FaRegWindowClose style={{ color: 'red' }} />
        </div>
        <div>
          {cripto.name} <sup>{cripto.symbol}</sup>
        </div>
        <div>
          {cripto.infinite_supply ? (
            'Sin limite'
          ) : (
            <>
              {cripto.circulating_supply.toFixed(0)} / {cripto.max_supply}
            </>
          )}
        </div>
        <div className={`${styles.tagContent}`}>
          {cripto.tags &&
            cripto.tags.slice(0, 7).map((tag, index) => (
              <div className={`${styles.tag}`} key={index}>
                {tag}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ModalCripto;
