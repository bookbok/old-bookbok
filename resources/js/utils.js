// オブジェクト、配列が空かどうか判定する
export function isEmpty(obj) {
    if(Array.isArray(obj)) {
      return obj.length <= 0;
    } else {
      return !obj || !Object.keys(obj).length;
    }
}

// ステータスコードが200番代か判定する
export function successfulStatus(code) {
    return (code / 100 == 2);
}

// オブジェクトを受け取って、GETリクエストのクエリパラメーターに変換する
export function convertQuery(obj) {
    return Object.keys(obj).map((key) => {
        if(Array.isArray(obj[key])){
            return obj[key].map((value) => {
                return key + "[]=" + value;
            }).join('&')
        }
        return key + "=" + obj[key];
    }).join('&')
}



// DateTime形式の文字列を年月日だけの日本表記に変換する
export function makeDateJP(dateTime) {
    const date = dateTime.split(/-|\s/, 4);
    return date[0] + '年' + date[1] + '月' + date[2] + '日';
}



/* ----------------------- */
import { store } from "./store";

// stateの値を取得し、自動更新する
let state = store.getState();
store.subscribe(() => {
    state = store.getState();
});

// ログイン中のユーザーを取得するヘルパー関数
export function getAuthUser() {
    return state.loggedinUser;
}


/**
 * fetch関数を綺麗に扱えるようにするラッパー関数
 * 200系のレスポンスのみthen句に流れるので、この関数を使った場合then句ではエラーレスポンスはありえない
 * ステータスコードで細かくエラーハンドリングしたい場合、smartFetchを使う必要がある
 */
export async function wrapFetch(url, { body, method = "GET", isParse = true } = {}) {
    const res = await smartFetch(url, { body, method, isParse });

    if(res.status === 401) {
        throw new Error("[401]Authorization error: " + res.statusText);
    }

    let json = null;
    if(isParse) {
        json = await res.json();
    }

    if(!res.ok) {
        console.error(json.userMessage);
        throw new Error(`[${res.status}]Fetch error: ` + res.statusText);
    }

    return json;
}

/**
 * fetch関数を楽に扱えるようにしただけの関数で、戻り値は通常のfetchと同じ
 * ネットワークエラーなどの重大エラー以外はcatchされないので注意
 * 400, 500などのサーバーレスポンスが返ってきても全てthenとして扱われる
 */
export async function smartFetch(url, { body, method = "GET", isParse = true } = {}) {
    // GETリクエスト時にクエリパラメーターを自動作成する
    if(method === "GET" && !isEmpty(body)) {
        url += "?" + convertQuery(body);
    } else if(!isEmpty(body)) { // not get request && body not empty
        body = JSON.stringify(body);
    }

    const res = await fetch(url, {
        method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${state.token}`,
        },
        body: method === "GET" ? null : body // GET時はクエリで代用するため
    });

    return res;
}

// 封印されしラッパー関数
export function wrapAction(actionCreator, callback) {
    return (...args) => {
        return actionCreator(...args)
            .then(json => callback(json));
    }
}

