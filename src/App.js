import './App.css'
import Login from './components/Login';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Route exact path='/'>
          <Home></Home>
        </Route>
        <Route path='/login'>
          <Login option='login'></Login>
        </Route>
        <Route path='/register'>
          <Login option='register'></Login>
        </Route>
      </BrowserRouter>
    </div>
  )
}

export default App;
