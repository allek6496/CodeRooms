import 'dotenv/config'
import { Octokit } from '@octokit/rest'

const octo = new Octokit({
    auth: process.env.TOKEN,
    userAgent: "testing"
})

export async function getCommit(username : string, time : Date) {
    // console.log("log time", time);
    
    const { data } = await octo.rest.search.commits({
        q: `author:${username}+committer-date:<=${time.toISOString().substring(0, 10)}`,
        sort: "author-date",
        per_page: 1
    })

    if (data == null || data.items.length == 0) return null; //i'm not sure which it defaults to
    // console.log(data.items[0]);
    data.items[0].commit.url = data.items[0].repository.html_url; // add the url so we can get it later, kinda jank but easiest
    data.items[0].commit.message = data.items[0].author?.login ?? '' // dont worry about it
    return data.items[0].commit;
}

export async function verifyCheckout(username : string, time : Date) {
    let commit = await getCommit(username, time);
    // console.log('verify commit', username, username == commit?.author.name)
    
    if (commit === null || commit.message != username) return false;
    
    let then = new Date(commit.author.date);

    // return true;
    return Number(time) - Number(then) < 1000 * 60 * 60;
}

// `data` is from the database which consists of valid commits
export async function populate(data : { [time : string] : string }) :
    Promise<{ [time : string] : { name: string, url: string } }> {
    let tempData = { ...data };
    let output = {};

    for (let i = 0; i < Math.min(10, Object.keys(data).length); i++) {
        let maxTime = 0;
        
        for (let time in tempData) {
            // time = new Date(key);
            if (Number(time) > maxTime) maxTime = Number(time);
        }
        
        let maxDate = new Date();
        maxDate.setTime(maxTime);
        let commit = await getCommit(tempData[maxTime], maxDate);
        if (commit != null) {
            output[maxTime] = {
                name: commit.author.name,
                url: commit.url
            }
        } else {
            // if there are enough extra datapoints, don't stop at 10 if one wasn't found (they all should be found)
            if (Object.keys(tempData).length > 10 - i) {
                i--;
            }
        }
        
        delete tempData[maxTime];
    }

    return output;
}

// checkout("Luke-zhang-04", new Date())
//     .then(res => console.log(res));

// populate({
//     1653181537259: "Luke-zhang-04",
//     [new Date("2022/04/25").getTime()]: "allek6496"
// }).then(res => console.log(res));
