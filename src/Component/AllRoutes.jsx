import {Routes, Route} from 'react-router-dom'
import Dashboard from '../Pages/Dashboard'
import Login from './../Pages/Login';
import Notfound from './../Pages/Notfound';
import Single from './../Pages/Single';
import Home from './../Pages/Home';
import PrivateRoute from './PrivateRoute';
import Register from './../Pages/Register';
function AllRoutes() {
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/signup'} element={<Register />} />
      <Route path={'/dash'} element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/dash/:id'} element={<PrivateRoute><Single /></PrivateRoute>} />
      <Route path={'*'} element={<Notfound />} />
    </Routes>
  )
}
export default AllRoutes