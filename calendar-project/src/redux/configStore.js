import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import schedule from "./modules/schedule";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
const middlewares = [thunk];
const rootReducer = combineReducers({ schedule });

const enhancer = applyMiddleware(...middlewares);
const store = createStore(
    rootReducer,
    enhancer
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
