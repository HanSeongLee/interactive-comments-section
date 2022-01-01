import {remove, update} from "../../../../api/comments";

export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        return await handlePATCH(req, res);
    } else if (req.method === 'DELETE') {
        return await handleDELETE(req, res);
    }
    throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
    );
};

async function handlePATCH(req, res) {
    const id = req.query.id;
    const { content, score } = req.body;
    const comment = await update({
        id,
        content,
        score,
    });
    res.json(comment);
}

async function handleDELETE(req, res) {
    const id = req.query.id;
    const comment = await remove({
        id,
    });
    res.json(comment);
}
