import { BrowserRouter as Router, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import "./App.css";
import ErrorAuthModal from "./components/ErrorAuthModal";
import MenuBar from "./components/MenuBar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import SingleQuack from "./components/pages/SingleQuack";
import { AuthProvider } from "./context/Auth";
import AuthRoute from "./utils/AuthRoute";

function App() {
  return (
    <Router>
      <Container>
        <AuthProvider>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/quack/:quackId" component={SingleQuack} />
          <ErrorAuthModal />
        </AuthProvider>
      </Container>
    </Router>
  );
}

export default App;
