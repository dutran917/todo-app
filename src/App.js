import './App.css'
import Login from './components/Login/index';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home/index';
import { useSelector } from 'react-redux';
import ProtectedRoute from './route/ProtectedRoute';
function App() {

  const isAuth = useSelector(state => state.auth)
  return (
    <div className='App'>
      <BrowserRouter>
        <ProtectedRoute isAuth={isAuth} Component={Home}>
        </ProtectedRoute>
        <Route path='/login'>
          <Login option='login' isAuth={isAuth}></Login>
        </Route>
        <Route path='/register'>
          <Login option='register' isAuth={isAuth}></Login>
        </Route>
      </BrowserRouter>
    </div>
  )
}

export default App;
