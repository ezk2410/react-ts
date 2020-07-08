import * as React from "react";
import * as ReactDOM from "react-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { hot } from "react-hot-loader/root";
import TuitionList from "./tuition/TuitionList";
import { Provider } from "react-redux";
import store from "./store";
// import "./style.scss";
const c = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log("clicked", e);
};
const App = () => {
  return (
    <div>
      <Provider store={store}>
        <div>
          <p>Hello World</p>
          <button onClick={c}>Click</button>
          <TuitionList />
        </div>
      </Provider>
    </div>
  );
};
function main(): void {
  const root = document.getElementById("root");
  if (root) {
    ReactDOM.render(<App />, root);
  }
}
hot(main());
