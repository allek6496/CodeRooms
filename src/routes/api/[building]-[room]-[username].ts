import type { RequestHandler } from './__types/[building]-[room]-[username].d'

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyD3g4ZFpCflsQQY51IaJJy-W4nel6EZb1g",
    authDomain: "coderooms-c63a7.firebaseapp.com",
    projectId: "coderooms-c63a7",
    storageBucket: "coderooms-c63a7.appspot.com",
    messagingSenderId: "597832638799",
    appId: "1:597832638799:web:9442cf02af500c5d83653a",
    measurementId: "G-XHLF0M7YCH"
};

const app = initializeApp(firebaseConfig)

const checkOut = async (building: String, room: String, username: String) => {
    const db = getDatabase(app)
    let postref  = ref(db, building + '/' + room + '/' + username + '/' + "timestamps")
    await set(child(postref, String(Date.now())), Date.now())
}


// get database code here

export const get: RequestHandler = async ({ params }) => {
    const { building, room, username } = params
    
    console.log("REQUEST", username)
    
    await checkOut(building, room, username)
    
    return { body: {} }
}
