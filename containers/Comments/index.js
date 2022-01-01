import React, {useCallback} from "react";
import styles from './style.module.scss';
import Comment from "../../components/Comment";
import CommentForm from "../../components/CommentForm";
import DeleteCommentModalContainer from "../DeleteCommentModalContainer";
import useRequest from "../../lib/useRequest";
import axios from "axios";
import {mutate} from "swr";

const Comments = ({ currentUser }) => {
    const { data: comments } = useRequest('/api/comments');

    const onSubmit = useCallback(async (comment) => {
        await axios.post(`/api/comments`, {
            content: comment,
        });

        await mutate('/api/comments');
    }, []);

    return (
        <div className={styles.container}>
            {comments?.map((comment) => (
                <>
                    <Comment {...comment}
                             currentUser={currentUser}
                             me={currentUser?.username === comment?.user?.username}
                    />
                    {comment?.replies?.length > 0 && (
                        <div className={styles.replyContainer}>
                            {comment?.replies?.map((reply) => (
                                <Comment {...reply}
                                         currentUser={currentUser}
                                         me={currentUser?.username === reply?.user?.username}
                                />
                            ))}
                        </div>
                    )}
                </>
            ))}
            <CommentForm currentUser={currentUser}
                         onSubmit={onSubmit}
            />
            <DeleteCommentModalContainer/>
        </div>
    );
};

export default Comments;
