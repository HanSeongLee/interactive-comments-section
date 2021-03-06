const { PrismaClient } = require('@prisma/client')
const moment = require('moment');

const prisma = new PrismaClient()

const now = moment().toDate();

const monthAgo = new Date(moment().toDate().setMonth(now.getMonth() - 1));
const twoWeeksAgo = new Date(moment().toDate().setDate(now.getDate() - 14));
const oneWeekAgo = new Date(moment().toDate().setDate(now.getDate() - 7));
const twoDaysAgo = new Date(moment().toDate().setDate(now.getDate() - 2));

const userData = [
    {
        "image": {
            create: {
                "png": "./img/avatars/image-amyrobson.png",
                "webp": "./img/avatars/image-amyrobson.webp"
            },
        },
        "username": "amyrobson",
        comments: {
            create: [
                {
                    "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
                    "score": 12,
                    createdAt: monthAgo,
                },
            ]
        }
    },
    {
        "image": {
            create: {
                "png": "./img/avatars/image-maxblagun.png",
                "webp": "./img/avatars/image-maxblagun.webp"
            }
        },
        "username": "maxblagun",
        comments: {
            create: [
                {
                    "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
                    "score": 5,
                    createdAt: twoWeeksAgo,
                },
            ]
        }
    },
    {
        "image": {
            create: {
                "png": "./img/avatars/image-ramsesmiron.png",
                "webp": "./img/avatars/image-ramsesmiron.webp"
            }
        },
        "username": "ramsesmiron",
        comments: {
            create: [
                {
                    "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                    "score": 4,
                    parentCommentId: 2,
                    replyingToId: 2,
                    createdAt: oneWeekAgo,
                }
            ]
        }
    },
    {
        "image": {
            create: {
                "png": "./img/avatars/image-juliusomo.png",
                "webp": "./img/avatars/image-juliusomo.webp"
            }
        },
        "username": "juliusomo",
        comments: {
            create: [
                {
                    "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                    "score": 2,
                    parentCommentId: 2,
                    replyingToId: 3,
                    createdAt: twoDaysAgo,
                }
            ]
        }
    }
];

const commentData = [
    {
        "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        "score": 12,
        "user": 1,
        "replies": []
    },
    {
        "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        "score": 5,
        "user": 2,
        "replies": [
            {
                "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                "score": 4,
                "replyingTo": 2,
                "user": 3,
            },
            {
                "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                "score": 2,
                "replyingTo": 3,
                "user": 4,
            }
        ]
    }
];

async function main() {
    console.log(`Start seeding ...`)
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u,
        })
        console.log(`Created comment with id: ${user.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    });
