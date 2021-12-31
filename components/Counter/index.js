import React from "react";
import styles from './style.module.scss';
import PlusIcon from '../../public/icons/icon-plus.svg';
import MinusIcon from '../../public/icons/icon-minus.svg';

const Counter = ({ value }) => {
    return (
        <div className={styles.counterContainer}>
            <button className={styles.button}>
                <PlusIcon className={styles.icon} />
            </button>
            <input className={styles.counterInput}
                   type={'number'}
                   value={value}
            />
            <button className={styles.button}>
                <MinusIcon className={styles.icon} />
            </button>
        </div>
    );
};

export default Counter;
