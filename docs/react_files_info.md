# React files info

## Components
各画面、navbar、ユーザー情報コンポーネント等、大小の部品群のこと

### 場所
`resources/js/components/*`にコンポーネントごとにファイル分けされている

### 追記方法
指定の場所に新しいコンポーネント用ファイルを作成し、`class`や`const`などでコンポーネントを作成する。
基本的には`.jsx`で書く。


## Appコンポーネント
基本は全ての土台となるコンポーネント。
各画面のコンポーネントを別ファイルで作成し、Appコンポーネントで全てを呼び出し、URLによって画面のコンポーネントを入れ替える、といった処理をする。

### 場所
`resources/js/components/App.jsx`に書いてある。

### 追記方法
良い感じに任せた！
基礎となる部分なので最終的にはガンガン触るということは少ないはず。



## Container
通常のコンポーネントをReduxの仕組みに乗せるための処理をする場所。
内外部とのstateやりとりがあるコンポーネントは基本的にContainerで加工する必要がある。

### 場所
`resources/js/containers.js`に書かれている。
同一ファイル内でそれぞれの部品ごとに加工されている。
いずれ適切な大きさを保つように、ファイル分割をするかも。

### 追記方法
内外部とのstateやりとりがあるコンポーネントは基本的にContainerで加工する必要がある。
加工の方法は、`connect`関数に加工したいコンポーネントを渡して、stateを指定するだけ。
基本的にはすでにある物をコピペしてコンポーネントの名前を変更すればOK。


## Action
基本的にはstateの変更内容をtypeと一緒にreducerに分かるように返すのが仕事。
typeとはreducerがどのようにstateを加工すべきか支持するための、加工方法識別番号みたいなもの。
外部のAPIから値を取得して、別のactionに渡す役割も持っている場合もある。

### 場所
`resources/js/actions.js`に書かれている。
actionはそれぞれ`export const`で書かれていることが多い。
action内部でactionを使う場合は、dispatchを渡していることもある。

### 追記方法
新しく変数や関数を定義し、その中に処理を書く。
dispatchを使うactionなのか、変数を受け取って識別子だけ付属させるactionなのか、2パターンがあるので既存のコードを見ながら判断する。
actionごとに仕事内容を決め、actionを分割するのかしなくても良いのか考える必要がある。
actionを使うときは、dispatch関数にactionを渡せば実行される。


## Reducer
実行されたactionの**type**に応じて`switch case`で、stateの変化を振り分ける

### 場所
`resources/js/reducers.ts`に書かれている。

### 追記方法
`switch case`の**case**を追加して、stateの変化を記述する。
追加するcaseのtypeは名前がわかりやすければ自由に決めて良い。

