import React from "react";
import DeleteCommentModal from "../../components/DeleteCommentModal";
import {useDispatch, useSelector} from "react-redux";
import {close} from "../../store/modules/deleteCommentModal";

const DeleteCommentModalContainer = () => {
    const {open, id} = useSelector(({ deleteCommentModal }) => deleteCommentModal);
    const dispatch = useDispatch();

    const onCancel = () => {
        dispatch(close());
    };

    const onDelete = () => {
        dispatch(close());
    };

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
