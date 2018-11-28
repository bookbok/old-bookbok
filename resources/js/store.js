import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
// HACK: こいつが2.16.x系では、storeを生成した後にdispatchを実行するとエラーが出るので一旦使わない
// import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers";

export const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
);
