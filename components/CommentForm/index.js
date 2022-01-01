import React, {useState} from "react";
import styles from './style.module.scss';
import Avatar from "../Avatar";
import cn from 'classnames';

const CommentForm = ({
                         key, currentUser, replyingTo, submitButtonText = 'send',
                         defaultValue='', edit, onSubmit
                     }) => {
    const [comment, setComment] = useState(defaultValue);

    const adjustTextArea = (e) => {
        e.target.style['height'] = "1px";
        e.target.style['height'] = (e.target.scrollHeight) + "px";
    };

    return (
        <form className={cn(styles.formBox, {
            [styles.editForm]: edit,
        })}
              key={key}
              onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit(comment);
                  setComment('');
              }}
        >
            <textarea className={styles.commentTextArea}
                      placeholder={'Add a comment...'}
                      autoFocus
                      onFocus={adjustTextArea}
                      onChange={(e) => {
                          const comment = replyingTo ? e.target.value.split(`@${replyingTo} `)[1] : e.target.value;
                          if (comment) {
                              setComment(comment);
                          } else {
                              setComment('');
                          }

                          adjustTextArea(e);
                      }}
                      value={replyingTo ? `@${replyingTo} ${comment}` : comment}
            />
            {currentUser && (
                <div>
                    <Avatar className={styles.avatar}
                            alt={currentUser?.username}
                            {...currentUser?.image}
                    />
                </div>
            )}
            <div className={styles.buttonContainer}>
                <button className={styles.sendButton}
                        type={'submit'}
                >
                    {submitButtonText}
                </button>
            </div>
        </form>
    );
};

export default CommentForm;
