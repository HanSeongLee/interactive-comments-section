import React from "react";
import styles from './style.module.scss';
import Comment from "../../components/Comment";
import CommentForm from "../../components/CommentForm";
import DeleteCommentModalContainer from "../DeleteCommentModalContainer";

const Comments = ({ comments, currentUser }) => {
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
            <CommentForm currentUser={currentUser} />
            <DeleteCommentModalContainer />
        </div>
    );
};

export default Comments;
