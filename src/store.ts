import { all } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import { tuitionSaga } from "./tuition/actions";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { tuitionReducer } from "./tuition/reducer";

const rootReducer = combineReducers({
  tuition: tuitionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

function* rootSaga() {
  yield all([tuitionSaga()]);
}
const reduxSagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(reduxSagaMiddleware));

reduxSagaMiddleware.run(rootSaga);

export default store;
