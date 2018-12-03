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
    return Object.keys(body).map((key) => {
        return key + "=" + body[key];
    }).join('&')
}
