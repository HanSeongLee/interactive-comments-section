import React from "react";
import styles from './style.module.scss';
import PlusIcon from '../../public/icons/icon-plus.svg';
import MinusIcon from '../../public/icons/icon-minus.svg';

const Counter = ({ value, onPlusClick, onMinusClick }) => {
    return (
        <div className={styles.counterContainer}>
            <button className={styles.button}
                    onClick={onPlusClick}
            >
                <PlusIcon className={styles.icon} />
            </button>
            <input className={styles.counterInput}
                   type={'number'}
                   defaultValue={value}
                   disabled
            />
            <button className={styles.button}
                    onClick={onMinusClick}
            >
                <MinusIcon className={styles.icon} />
            </button>
        </div>
    );
};

export default Counter;
