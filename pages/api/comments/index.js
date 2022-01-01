import {create, findAll} from "../../../api/comments";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await handleGET(req, res);
    } else if (req.method === 'POST') {
        return await handlePOST(req, res);
    }
    throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
    );
};

async function handleGET(req, res) {
    const comments = await findAll();
    res.json(comments);
}

async function handlePOST(req, res) {
    const { content } = req.body;

    const comment = await create({
        userId: 4,
        content,
    });
    res.json(comment);
}
