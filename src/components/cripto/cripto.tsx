import { useEffect, useState } from 'react';

import { FaSearch } from 'react-icons/fa';

import Pagination from 'components/tools/pagination';
import { ICripto } from 'models/cripto/cripto';
import { coinMarketcapService } from 'services/cripto/coinMarketcap';
import styles from 'styles/components/cripto/cripto.module.css';

import CardCripto from './card/cardCripto';

const Cripto = () => {
  const [allCriptos, setAllCriptos] = useState<ICripto[]>([]);
  const [criptos, setCriptos] = useState<ICripto[]>([]);
  const [pageCripto, setPageCripto] = useState<ICripto[]>();
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    coinMarketcapService().then((res) => {
      setAllCriptos(res.data.data);
      setCriptos(res.data.data);
    });
  }, []);

  const search = (searchTerm: string) => {
    if (searchTerm) {
      const filteredCriptos = allCriptos.filter((allCripto) =>
        allCripto.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCriptos(filteredCriptos);
      setCurrent(1);
    } else {
      setCriptos(allCriptos);
    }
  };

  return (
    <div className={`${styles.layout}`}>
      <div className={`${styles.search}`}>
        <input
          type="search"
          onChange={(e) => search(e.target.value)}
          placeholder="Buscar criptomoneda por nombre"
        />
        <div className={`${styles.searchImg}`}>
          <FaSearch />
        </div>
      </div>
      <div className={`${styles.cardCriptos}`}>
        <div className={`${styles.headerTable}`}>
          <div className={`${styles.name}`}>Nombre</div>
          <div className={`${styles.price}`}>Precio</div>
          <div className={`${styles.volume}`}>24H Cambio</div>
          <div>&nbsp;</div>
        </div>
        {pageCripto &&
          pageCripto.map((cripto, index) => (
            <CardCripto key={index} cripto={cripto} />
          ))}
        {criptos && (
          <Pagination
            data={criptos}
            current={current}
            setCurrent={setCurrent}
            maxItems={10}
            setData={setPageCripto}
          />
        )}
      </div>
    </div>
  );
};

export default Cripto;
