import React from "react";
import styles from './style.module.scss';

const DeleteCommentModal = ({ onCancel, onDelete }) => {
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalBox}>
                <h2 className={styles.title}>
                    Delete comment
                </h2>
                <p className={styles.description}>
                    Are you sure you want to delete this comment? This will remove the comment and can’t be undone.
                </p>
                <div className={styles.buttonContainer}>
                    <button className={styles.cancelButton}
                            onClick={onCancel}
                    >
                        No, cancel
                    </button>
                    <button className={styles.deleteButton}
                            onClick={onDelete}
                    >
                        Yes, delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteCommentModal;
