import * as React from "react";
import * as ReactDOM from "react-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { hot } from "react-hot-loader/root";
import TuitionList from "./tuition/TuitionList";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TuitionInfo from "./tuition/TuitionInfo";
// import "./style.scss";
const c = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log("clicked", e);
};
const App = () => {
  return (
    <div>
      <Router>
        <Provider store={store}>
          <div>
            <p>Hello World</p>
            <button onClick={c}>Click</button>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/tuition">TuitionList</Link>
              </li>
              <li>
                <Link to="/tuition/1">TuitionInfo</Link>
              </li>
            </ul>

            <Switch>
              <Route path="/tuition/" exact>
                <TuitionList />
              </Route>
              <Route path="/tuition/:tuitionId">
                <TuitionInfo />
              </Route>
              <Route path="/">
                <div>Home</div>
              </Route>
            </Switch>
          </div>
        </Provider>
      </Router>
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
