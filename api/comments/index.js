import prisma from "../../lib/prisma";

export const findAll = async () => {
    return await prisma.comment.findMany({
        where: {
            parentCommentId: null,
        },
        select: {
            id: true,
            content: true,
            score: true,
            createdAt: true,
            user: {
                select: {
                    username: true,
                    image: {
                        select: {
                            png: true,
                            webp: true,
                        },
                    },
                }
            },
            replies: {
                select: {
                    id: true,
                    content: true,
                    score: true,
                    createdAt: true,
                    replyingTo: {
                        select: {
                            username: true,
                            image: {
                                select: {
                                    png: true,
                                    webp: true,
                                },
                            },
                        },
                    },
                    user: {
                        select: {
                            username: true,
                            image: {
                                select: {
                                    png: true,
                                    webp: true,
                                },
                            },
                        }
                    },
                }
            }
        },
    });
}

export const create = async ({ userId, content }) => {
    const comment = prisma.comment.create({
        data: {
            content,
            userId,
        },
        select: {
            id: true,
            content: true,
            score: true,
            createdAt: true,
            user: {
                select: {
                    username: true,
                    image: {
                        select: {
                            png: true,
                            webp: true,
                        },
                    },
                }
            },
        },
    });
    return comment;
}

const commentUpdate = async ({ id, data }) => {
    const comment = prisma.comment.update({
        where: {
            id: Number(id),
        },
        data,
        select: {
            id: true,
            content: true,
            score: true,
            createdAt: true,
            user: {
                select: {
                    username: true,
                    image: {
                        select: {
                            png: true,
                            webp: true,
                        },
                    },
                }
            },
        },
    });
    return comment;
}

export const update = async ({ id, content, score }) => {
    const comment = await commentUpdate(
        {
            id,
            data: {
                content,
            },
        },
    );
    return comment;
}

export const upvote = async (id) => {
    const comment = await commentUpdate(
        {
            id,
            data: {
                score: {
                    increment: 1,
                }
            },
        },
    );
    return comment;
}

export const downvote = async (id) => {
    const comment = await commentUpdate(
        {
            id,
            data: {
                score: {
                    decrement: 1,
                }
            },
        },
    );
    return comment;
}

export const remove = async ({ id }) => {
    const comment = prisma.comment.delete({
        where: {
            id: Number(id),
        },
        select: {
            id: true,
            content: true,
            score: true,
            createdAt: true,
            user: {
                select: {
                    username: true,
                    image: {
                        select: {
                            png: true,
                            webp: true,
                        },
                    },
                }
            },
        },
    });
    return comment;
}
