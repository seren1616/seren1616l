import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import htmlTags from "./components/tags/Tags";
import boardComponent from "./components/views/Board/Board";
import Auth from "./hoc/auth";
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer";
import { Suspense } from "react";
import UploadProductPage from "./components/views/UploadProductPage/UploadProductPage";
import DetailProductPage from "./components/views/DetailProductPage/DetailProductPage";
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Router>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, "/", null)} />
            <Route
              exact
              path="/login"
              component={Auth(LoginPage, "/login", false)}
            />
            <Route
              exact
              path="/register"
              component={Auth(RegisterPage, "/register", false)}
            />
            <Route
              exact
              path="/tags"
              component={Auth(htmlTags, "/tags", null)}
            />
            <Route
              exact
              path="/board"
              component={Auth(boardComponent, "/board", true)}
            />
            <Route
              exact
              path="/product/upload"
              component={Auth(UploadProductPage, "/product/upload")}
            />
            <Route
              exact
              path="/product/:productId"
              component={DetailProductPage}
            />
          </Switch>
        </Router>
      </div>
      <Footer />
    </Suspense>
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
