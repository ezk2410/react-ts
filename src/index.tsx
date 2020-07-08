import * as React from "react";
import * as ReactDOM from "react-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { hot } from "react-hot-loader/root";
// import "./style.scss";
const c = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log("clicked", e);
};
const App = () => {
  return (
    <div>
      Hello World
      <button onClick={c}>Click</button>
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
