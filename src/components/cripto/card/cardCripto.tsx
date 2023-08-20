import { useState } from 'react';

import { ICripto } from 'models/cripto/cripto';
import styles from 'styles/components/cripto/card/cardCripto.module.css';

import ModalCripto from '../modal/modalCripto';

interface CardCriptoProps {
  cripto: ICripto;
}

const CardCripto = ({ cripto }: CardCriptoProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={`${styles.card}`} onClick={() => setShowModal(true)}>
        <div className={`${styles.name}`}>
          <p>{cripto.symbol}</p>
          <p>{cripto.name}</p>
        </div>
        <div className={`${styles.price}`}>
          <p>USD${cripto.quote.USD.price.toFixed(2)}</p>
        </div>
        <div className={`${styles.volume}`}>
          <p>{cripto.quote.USD.volume_change_24h.toFixed(2)}%</p>
        </div>
        <p className={`${styles.detail}`}>Detalle</p>
      </div>
      {showModal && <ModalCripto setShowModal={setShowModal} cripto={cripto} />}
    </>
  );
};

export default CardCripto;
