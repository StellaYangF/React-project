import { ReducersMapObject, Reducer } from "redux";
import { connectRouter } from "connected-react-router";
import history from "../history";
import home from "./home";
import mime from "./mine";
import cart from "./cart";
import { combineReducers } from "redux-immer";
import produce from "immer";
import profile from "./profile";
let reducers: ReducersMapObject = {
  router: connectRouter(history),
  home,
  mime,
  profile,
 cart,
};
type CombinedState = {
  [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>;
};
let reducer: Reducer<CombinedState> = combineReducers<CombinedState>(
  produce,
  reducers
);
export { CombinedState };
export default reducer;