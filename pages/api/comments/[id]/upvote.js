import {upvote} from "../../../../api/comments";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        return await handlePOST(req, res);
    }
    throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
    );
};

async function handlePOST(req, res) {
    const id = req.query.id;
    const comment = await upvote(id);
    res.json(comment);
}
