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
