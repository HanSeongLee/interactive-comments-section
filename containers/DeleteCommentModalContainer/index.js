import React, {useCallback} from "react";
import DeleteCommentModal from "../../components/DeleteCommentModal";
import {useDispatch, useSelector} from "react-redux";
import {close} from "../../store/modules/deleteCommentModal";
import axios from "axios";
import {mutate} from "swr";

const DeleteCommentModalContainer = () => {
    const {open, id} = useSelector(({ deleteCommentModal }) => deleteCommentModal);
    const dispatch = useDispatch();

    const onCancel = () => {
        dispatch(close());
    };

    const onDelete = useCallback(async () => {
        await axios.delete(`/api/comments/${id}`);

        await mutate('/api/comments');
        dispatch(close());
    }, [id]);

    return (
        <>
            {open && (
                <DeleteCommentModal onCancel={onCancel}
                                    onDelete={onDelete}
                />
            )}
        </>
    );
}

export default DeleteCommentModalContainer;
