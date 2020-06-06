import { isObject, isString } from "util";

export { toLines } from './utils-for-jsx';

// オブジェクト、配列が空かどうか判定する
// TODO: どうも上手くTypeGuardできない
type None = null | undefined | Record<never, never> | never[];
export function isEmpty<T>(value: T | None): value is None {
    if (value === null || value === undefined) {
        return true;
    } else if (Array.isArray(value)) {
        return value.length === 0;
    } else if (typeof value === 'object' && value instanceof Object) {
        return Object.keys(value).length === 0;
    } else if (typeof value === 'string') {
        return false;
    }
    return false;
}

// ステータスコードが200番代か判定する
export function successfulStatus(code) {
    return code / 100 == 2;
}

// オブジェクトを受け取って、GETリクエストのクエリパラメーターに変換する
export function convertQuery(obj) {
    return Object.keys(obj)
        .map(key => {
            if (Array.isArray(obj[key])) {
                return obj[key]
                    .map(value => {
                        return key + '[]=' + value;
                    })
                    .join('&');
            }
            return key + '=' + obj[key];
        })
        .join('&');
}

// DateTime形式の文字列を年月日だけの日本表記に変換する
export function makeDateJP(dateTime) {
    const date = dateTime.split(/-|\s/, 4);
    return date[0] + '年' + date[1] + '月' + date[2] + '日';
}

// 引数に渡した文字列をクリップボードにコピーする
export function execCopy(text) {
    let input = document.createElement('input');
    input.setAttribute('id', 'copyinput');
    document.body.appendChild(input);
    input.value = text;
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
}

// URLのクエリパラメータからnameの値を取得する
export function getQueryParam(name, url) {
    if (!url) url = window.location.href;
    // eslint-disable-next-line
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/* ----------------------- */
import { store } from './store';

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
export async function wrapFetch(url, options: { body?: object, method?: string, isParse?: boolean } = {}) {
    const { body = {}, method = 'GET', isParse = true } = options
    const res = await smartFetch(url, body, method);

    if (res.status === 401) {
        throw new Error('[401]Authorization error: ' + res.statusText);
    }

    let json: { userMessage?} | null = null;
    if (isParse) {
        json = await res.json();
    }

    if (!res.ok) {
        console.error(json?.userMessage);
        throw new Error(`[${res.status}]Fetch error: ` + res.statusText);
    }

    return json;
}

/**
 * fetch関数を楽に扱えるようにしただけの関数で、戻り値は通常のfetchと同じ
 * ネットワークエラーなどの重大エラー以外はcatchされないので注意
 * 400, 500などのサーバーレスポンスが返ってきても全てthenとして扱われる
 */
export async function smartFetch(url: string, params: object = {}, method: string = 'GET') {
    // GETリクエスト時にクエリパラメーターを自動作成する
    if (method === 'GET' && !isEmpty(params)) {
        url += '?' + convertQuery(params);
    }

    let defaultHeader: { [key: string]: any } = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
    if (state.token) {
        defaultHeader = {
            ...defaultHeader,
            Authorization: `Bearer ${state.token}`,
        };
    }

    const res = await fetch(url, {
        method,
        headers: defaultHeader,
        body: method === 'GET' || isEmpty(params) ? null : JSON.stringify(params), // GET時はクエリで代用するため
    }).catch(err => {
        console.error(err);
        throw err;
    });

    return res;
}

// 封印されしラッパー関数
export function wrapAction(actionCreator, callback) {
    return (...args) => {
        return actionCreator(...args).then(json => callback(json));
    };
}

/**
 * https://developer.mozilla.org/ja/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 */
export function storageAvailable(type: 'localStorage' | 'sessionStorage'): boolean {
    try {
        var storage = window[type],
            x = '__storage_test__';
        // @ts-ignore
        storage.setItem(x, x);
        // @ts-ignore
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            // everything except Firefox
            (e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            // @ts-ignore
            storage.length !== 0
        );
    }
}
