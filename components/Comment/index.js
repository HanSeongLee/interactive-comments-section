import React, {useCallback, useState} from "react";
import styles from './style.module.scss';
import Counter from "../Counter";
import ReplyIcon from '/public/icons/icon-reply.svg';
import DeleteIcon from '/public/icons/icon-delete.svg';
import EditIcon from '/public/icons/icon-edit.svg';
import Avatar from "../Avatar";
import CommentForm from "../CommentForm";
import {useDispatch} from "react-redux";
import {open} from "../../store/modules/deleteCommentModal";
import moment from 'moment';
import axios from "axios";
import {mutate} from "swr";

moment.updateLocale('en', {
    relativeTime : {
        future: 'in %s',
        past:   '%s ago',
        s:      'a few seconds',
        m:      'a minute',
        mm:     '%d minutes',
        h:      'an hour',
        hh:     '%d hours',
        d:      'a day',
        dd:     function(number) {
            if (number < 7) {
                return number + ' days'; // Moment uses "d" when it's just 1 day.
            }
            else {
                const weeks = Math.round(number / 7);
                return weeks + ' ' + (weeks > 1 ? 'weeks' : 'week');
            }
        },
        M:      '1 month',
        MM:     '%d months',
        y:      'a year',
        yy:     '%d years'
    }
});

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

    const onPlusClick = useCallback(async () => {
        await axios.post(`/api/comments/${id}/upvote`, {
        });

        await mutate('/api/comments');
    }, [id, score]);

    const onMinusClick = useCallback(async () => {
        await axios.post(`/api/comments/${id}/downvote`, {
        });

        await mutate('/api/comments');
    }, [id, score]);

    const onEdit = useCallback(async (comment) => {
        await axios.patch(`/api/comments/${id}`, {
            content: comment,
        });

        await mutate('/api/comments');
        setOpenEditForm(false);
    }, [id]);

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
                            {moment(createdAt).startOf('hour').fromNow()}
                        </span>
                    </div>
                </div>
                <div className={styles.content}>
                    {openEditForm ? (
                        <p>
                            <CommentForm defaultValue={content}
                                         submitButtonText={'edit'}
                                         edit
                                         onSubmit={onEdit}
                                         replyingTo={replyingTo?.username}
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
                    <Counter value={score}
                             onPlusClick={onPlusClick}
                             onMinusClick={onMinusClick}
                    />
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
