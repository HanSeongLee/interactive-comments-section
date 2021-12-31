import React, {useState} from "react";
import styles from './style.module.scss';
import Comment from "../../components/Comment";
import CommentForm from "../../components/CommentForm";
import DeleteCommentModal from "../../components/DeleteCommentModal";

const Comments = ({ comments, currentUser }) => {
    const [openDeleteCommentModal, setOpenDeleteCommentModal] = useState(false);

    const onDeleteCommentModalClose = () => {
        setOpenDeleteCommentModal(false);
    };

    const onDeleteCommentModalDelete = () => {
        setOpenDeleteCommentModal(false);
    };

    return (
        <div className={styles.container}>
            {comments?.map((comment) => (
                <>
                    <Comment {...comment}
                             currentUser={currentUser}
                             me={currentUser?.username === comment?.user?.username}
                             openDeleteComment={_ => setOpenDeleteCommentModal(true)}
                    />
                    {comment?.replies?.length > 0 && (
                        <div className={styles.replyContainer}>
                            {comment?.replies?.map((reply) => (
                                <Comment {...reply}
                                         currentUser={currentUser}
                                         me={currentUser?.username === reply?.user?.username}
                                         openDeleteComment={_ => setOpenDeleteCommentModal(true)}
                                />
                            ))}
                        </div>
                    )}
                </>
            ))}
            <CommentForm currentUser={currentUser} />
            {openDeleteCommentModal && (
                <DeleteCommentModal onCancel={onDeleteCommentModalClose}
                                    onDelete={onDeleteCommentModalDelete}
                />
            )}
        </div>
    );
};

export default Comments;
