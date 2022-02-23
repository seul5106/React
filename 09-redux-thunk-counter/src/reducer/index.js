import { combineReducers } from "redux";
import counterReducer from "./CounterReducer";

const rootReducer = combineReducers({
    counterReducer
});

export default rootReducer;