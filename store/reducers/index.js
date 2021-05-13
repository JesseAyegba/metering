import { combineReducers } from "redux";
import { loaderReducer } from "./loaderReducer";

export const rootReducer = combineReducers({
    loaderReducer: loaderReducer,
});