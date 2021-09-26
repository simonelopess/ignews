import { NextApiRequest, NextApiResponse } from "next";

function WebhookStripe(req: NextApiRequest, res: NextApiResponse) {
    console.log('evento recebido')

    res.status(200).json({ ok: true })
}

export default WebhookStripe;