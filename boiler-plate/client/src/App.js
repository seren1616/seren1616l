import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import htmlTags from "./components/tags/Tags";
import footerComponent from "./components/views/Footer/Footer";
import boardComponent from "./components/views/Board/Board";
import Auth from "./hoc/auth";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />

        <Route exact path="/register" component={Auth(RegisterPage, false)} />
        <Route exact path="/tags" component={Auth(htmlTags, null)} />
        <Route exact path="/board" component={Auth(boardComponent, true)} />
      </Switch>
    </Router>
  );
}
// function Home() {
//   return (
//     <div>
//       <h2>Home</h2>
//     </div>
//   );
// }

// function About() {
//   return (
//     <div>
//       <h2>About</h2>
//     </div>
//   );
// }

// function Dashboard() {
//   return (
//     <div>
//       <h2>Dashboard</h2>
//     </div>
//   );
// }
export default App;
