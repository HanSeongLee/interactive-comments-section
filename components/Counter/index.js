import React from "react";
import styles from './style.module.scss';
import PlusIcon from '../../public/icons/icon-plus.svg';
import MinusIcon from '../../public/icons/icon-minus.svg';

const Counter = ({ value, onPlusClick, onMinusClick }) => {
    return (
        <div className={styles.counterContainer}>
            <button className={styles.button}
                    onClick={onPlusClick}
                    aria-label={'plus'}
            >
                <PlusIcon className={styles.icon} />
            </button>
            <span className={styles.counterInput}>
                {value}
            </span>
            <button className={styles.button}
                    onClick={onMinusClick}
                    aria-label={'minus'}
            >
                <MinusIcon className={styles.icon} />
            </button>
        </div>
    );
};

export default Counter;
