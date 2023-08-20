/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect } from 'react';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import styles from 'styles/components/tools/pagination.module.css';

interface CourseProps {
  data: any;
  current: number;
  setCurrent: Dispatch<React.SetStateAction<number>>;
  maxItems: number;
  setData: Dispatch<SetStateAction<any>>;
}

const Pagination = ({
  data,
  current,
  setCurrent,
  maxItems,
  setData,
}: CourseProps) => {
  useEffect(() => {
    const index = current - 1;
    setData(data.slice(index * maxItems, index * maxItems + maxItems));
  }, [current, data]);

  const handleBack = () => {
    if (current !== 1) {
      setCurrent(current - 1);
    }
  };
  const handleNext = () => {
    if (current !== Math.round(data.length / maxItems)) {
      setCurrent(current + 1);
    }
  };

  const pages = () => {
    const items = [];
    for (let i = 1; i <= Math.ceil(data.length / maxItems); i += 1) {
      if (current === i) {
        items.push(
          <div key={i} className={`${styles.select}`}>
            {i}
          </div>
        );
      } else {
        items.push(
          <div
            key={i}
            className={`${styles.number}`}
            onClick={() => setCurrent(i)}
          >
            {i}
          </div>
        );
      }
    }
    return items;
  };

  if (data.length <= maxItems) {
    return <></>;
  }

  return (
    <div className={`${styles.layout}`}>
      <div className={`${styles.img}`} onClick={() => handleBack()}>
        <FaArrowLeft />
      </div>
      {pages()}
      <div className={`${styles.img}`} onClick={() => handleNext()}>
        <FaArrowRight />
      </div>
    </div>
  );
};

export default Pagination;
