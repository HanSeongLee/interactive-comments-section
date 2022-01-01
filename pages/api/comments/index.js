import {findAll} from "../../../api/comments";

export default async function handle(req, res) {
    if (req.method === 'GET') {
        handleGET(res);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        );
    }
};

async function handleGET(res) {
    const comments = await findAll();
    res.json(comments);
}
