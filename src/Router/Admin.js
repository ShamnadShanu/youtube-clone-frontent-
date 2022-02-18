import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import ChannelPage from "../Admin/Views/ChannelPage/ChannelPage";
import Home from '../Admin/Views/Home/Home'
import  AdminLogin from '../Admin/Views/Login/AdminLogin'
import UsersPage from '../Admin/Views/UsersPage/UsersPage'
import ReportedVideos from "../Admin/Views/VideosPage/ReportedVideos";
function Admin() {
 
const checkAuth = () => {
  const token = localStorage.getItem('admin');
  if (!token) {
    return false;
  }

return true
 } 
 const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props} />
    ) : (
        <Redirect to={{ pathname: '/admin/login' }} />
      )
  )} />
)
  return (
    <>
      <Router>
      <AuthRoute exact path="/admin" component={Home} />
        <Route path="/admin/login" component={AdminLogin}></Route>
        <AuthRoute path="/admin/users" component={UsersPage}></AuthRoute>
        <AuthRoute path="/admin/reported" component={ReportedVideos}></AuthRoute>
        <AuthRoute path="/admin/channels" component={ChannelPage}></AuthRoute>

      </Router>
    </>
  );
}

export default Admin;
