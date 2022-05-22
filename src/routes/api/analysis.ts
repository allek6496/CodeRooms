import type { RequestHandler } from './__types/analysis.d'

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child } from "firebase/database";


export const get: RequestHandler = async ({ }) => {
    
    console.log("REQUEST", "amongus")
    
    return { body: {} }
}
