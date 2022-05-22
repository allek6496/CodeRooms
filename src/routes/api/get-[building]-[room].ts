import type { RequestHandler } from './__types/get-[building]-[room].d'

import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get as get_ } from "firebase/database";
import { populate } from '$lib/github'

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

// const checkOut = (building: String, room: String, username: String) => {
//     const db = getDatabase(app)
//     let postref  = ref(db, building + '/' + room + '/' + username + '/' + "timestamps")
//     set(child(postref, String(Date.now())), Date.now())
// }

const getData = async (building: String, room: String): Promise<{ [time : string] : string }> => {
    const db = getDatabase(app)
    const dbRef = ref(db);
    let outData = {}
    await get_(child(dbRef, building + '/' + room + '/')).then((snapshot) => {
        if (snapshot.exists()) {
            let data = snapshot.val()
            for (let user in data) {
                for (let temp in data[user]) {
                    for (let timestamp in data[user][temp]) {
                        outData[timestamp] = user
                    }
                }
            }
            // console.log(outData)
            // return outData
        } else {
            console.log("No data available");
        }}).catch((error) => {
            console.error(error);
        });
    return outData;
}

async function getBuildingRooms() : Promise<{building: String, room: String}[]> {
    const db = getDatabase(app)
    const dbRef = ref(db);
    let outData: {building: string, room :string}[] = []
    await get_(child(dbRef, '/')).then((snapshot) => {
        if (snapshot.exists()) {
            let data = snapshot.val()
            for (let building in data) {
                for (let room in data[building]) {
                    outData.push({ building, room })
                }
            }
            console.log(outData)
            return outData
        } else {
            console.log("No data available");
            return []
        }
    })
    
    return outData
}

async function mostPopular() {
    let buildingRooms = await getBuildingRooms()
    let out = {}
    let tempkeys: number[] = []
    for (let i = 0; i < buildingRooms.length; i++) {
        out[(Object.keys(await getData(buildingRooms[i].building, buildingRooms[i].room)).length)] = buildingRooms[i].building + " " + buildingRooms[i].room
    }

    let keys = (Object.keys(out))
    for(let i = 0; i < keys.length; i++) {
        tempkeys.push(parseInt(keys[i]))
    }
    let maxKey = (Math.max(...tempkeys))
    console.log(out[maxKey])
    return out[maxKey]
}


export const get: RequestHandler = async ({ params: { building, room } }) => {
    // console.log("REQUEST GET", params)
    
    if (room == 'getMostPopular') {
        return { body: { data: await mostPopular() } }
    }
    const outData = await getData(building, room)
    
    
    const data = await populate(outData);
    
    return { body: data }
}
