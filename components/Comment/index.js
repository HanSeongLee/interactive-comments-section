import React, {useState} from "react";
import styles from './style.module.scss';
import Counter from "../Counter";
import ReplyIcon from '/public/icons/icon-reply.svg';
import DeleteIcon from '/public/icons/icon-delete.svg';
import EditIcon from '/public/icons/icon-edit.svg';
import Avatar from "../Avatar";
import CommentForm from "../CommentForm";
import {useDispatch} from "react-redux";
import {open} from "../../store/modules/deleteCommentModal";

const Comment = ({
                     id, user, createdAt, content,
                     score, replyingTo, me, currentUser,
                 }) => {
    const dispatch = useDispatch();
    const [openReplyForm, setOpenReplyForm] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);

    const openDeleteComment = () => {
        dispatch(open({ id }));
    };

    return (
        <>
            <article className={styles.commentBox}
                     key={id}
            >
                <div className={styles.header}>
                    <div className={styles.leftSide}>
                        <Avatar className={styles.avatar}
                                alt={user?.username}
                                {...user?.image}
                        />
                        <span className={styles.username}>
                        {user?.username}
                    </span>
                        {me && (
                            <span className={styles.label}>
                            you
                        </span>
                        )}
                        <span className={styles.createdAt}>
                            {createdAt.toString()}
                        </span>
                    </div>
                </div>
                <div className={styles.content}>
                    {openEditForm ? (
                        <p>
                            <CommentForm defaultValue={content}
                                         submitButtonText={'edit'}
                                         edit
                            />
                        </p>
                    ) : (
                        <p>
                            {replyingTo && (
                                <span className={styles.replyingTo}>@{replyingTo.username}</span>
                            )} {content}
                        </p>
                    )}
                </div>
                <div className={styles.counterContainer}>
                    <Counter value={score}/>
                </div>
                <div className={styles.buttonContainer}>
                    {me ? (
                        <>
                            <button className={styles.dangerousButton}
                                    onClick={openDeleteComment}
                            >
                                <DeleteIcon className={styles.icon}/>
                                Delete
                            </button>
                            <button className={styles.primaryButton}
                                    onClick={_ => setOpenEditForm(!openEditForm)}
                            >
                                <EditIcon className={styles.icon}/>
                                Edit
                            </button>
                        </>
                    ) : (
                        <button className={styles.primaryButton}
                                onClick={_ => setOpenReplyForm(!openReplyForm)}
                        >
                            <ReplyIcon className={styles.icon}/>
                            Reply
                        </button>
                    )}
                </div>
            </article>
            {openReplyForm && (
                <CommentForm currentUser={currentUser}
                             replyingTo={user?.username}
                             submitButtonText={'reply'}
                             key={`${id}-replyForm`}
                />
            )}
        </>
    );
};

export default Comment;
