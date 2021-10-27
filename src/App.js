import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Login from './Pages/Login';
import ReturnUser from './Pages/ReturnUser';
import Portal from './Pages/Portal';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path ="/" component={Home} />
          <Route path="/signUp" component={Login} />
          <Route path="/login" component={ReturnUser} />
          <Route path="/portal" component={Portal} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
