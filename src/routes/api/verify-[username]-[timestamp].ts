import type { RequestHandler } from './__types/verify-[username]-[timestamp].d'

import { verifyCheckout } from '$lib/github'

export const get: RequestHandler = async ({ params: { username, timestamp } }) => {
    // console.log("REQUEST GET", params)
    
    const verified = await verifyCheckout(username, new Date(Number(timestamp)))
    
    return { body: { verified } }
}
