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

$.isSurrogatePear = function(upper, lower) {
      return 0xD800 <= upper && upper <= 0xDBFF && 0xDC00 <= lower && lower <= 0xDFFF;
};
//マルチバイト文字対応型の文字列の切り出しをする
export function mb_substr(str, begin, end) {
    let ret = '';
    for (let i = 0, len = 0; i < str.length; i++, len++) {
        let upper = str.charCodeAt(i);
        let lower = str.length > (i + 1) ? str.charCodeAt(i + 1) : 0;
        let string = '';
        if ($.isSurrogatePear(upper, lower)) {
            i++;
            string = String.fromCharCode(upper, lower);
        } else {
            string = String.fromCharCode(upper);
        }
        if(begin <= len && len < end) { ret += string; }
    }
    return ret;
}

//漢字・ひらがな・カタカナ以外の文字を含んでいたら「false」が返る
export function ja2Bit(chr) {
    return ( chr.match(/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/) )? true : false
}
