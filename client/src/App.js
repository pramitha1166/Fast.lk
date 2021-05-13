import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Nevbar";
import Home from "./components/Home/Home";
import Footer from "./components/layout/Footer";
import Login from "./components/Login/Login";
import Contact from "./components/Contact/Contact";
import Products from './components/Products/Products';
import Checkout from "./components/Checkout/Checkout";

function App() {
  return (
    <Router>
      {" "}
      <div className="App">
        <Route path="/" exec component={Navbar} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/contact" exact component={Contact}></Route>
          <Route path="/products" exact component={Products}></Route>
          <Route path="/checkout" exact component={Checkout}></Route>
        </Switch>
        <Route path="/" exec component={Footer} />
      </div>
    </Router>
  );
}

export default App;
