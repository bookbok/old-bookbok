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

// DateTime形式の文字列を年月日だけの日本表記に変換する
export function makeDateJP(dateTime) {
    const date = dateTime.split(/-|\s/, 4);
    return date[0] + '年' + date[1] + '月' + date[2] + '日';
}
