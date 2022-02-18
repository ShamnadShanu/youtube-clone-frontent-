import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Home from "../User/Views/Home/Home";
import Signup from "../User/Views/Signup/Signup";
import Login from "../User/Views/Login/Login"
import Search from "../User/Views/Search/Search"
import VideoPlayer from "../User/Views/VideoPlayer/VideoPlayer";
import ChannelPage from "../User/Views/ChannelPage/ChannelPage";
import ChannelPlaylistPage from "../User/Views/ChannelPage/ChannelPlaylistPage";
import ChannelVideoPage from "../User/Views/ChannelPage/ChannelVideoPage";
import ChannelViewPage from "../User/Views/ChannelViewaPage/ChannelViewPage";
import ChannelViewVideosPage from "../User/Views/ChannelViewaPage/ChannelViewVidoesPage";
import ManageVideos from "../User/Componets/ManageVidoes/ManageVideos";
import LikedVideosPage from "../User/Views/LikedVideosPage/LikedVideosPage";
import SubscriptionPage from "../User/Views/SubscriptionPage/SubscriptionPage";
import ChannelViewPlaylistPage from "../User/Views/ChannelViewaPage/ChannelViewPlaylistPage";

function User() {
  const checkAuth = () => {
    const token = localStorage.getItem('token');
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
          <Redirect to={{ pathname: '/login' }} />
        )
    )} />
  )
  return (
    <>
      
      <Router>
        <Route exact path="/" component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/search/:searchTerm" component={Search}></Route>
        <Route path="/signup" component={Signup}></Route>      
        <AuthRoute path="/channelvideos" component={ChannelVideoPage}></AuthRoute>      
        <AuthRoute path="/channelhome" component={ChannelPage}></AuthRoute>      
        <AuthRoute path="/channelplaylist" component={ChannelPlaylistPage}></AuthRoute>      
        <AuthRoute path="/channel" component={ChannelPage}></AuthRoute>      
        <Route path="/watch/:id" component={VideoPlayer}></Route>      
        <Route path="/channelview" component={ChannelViewPage}></Route>      
        <Route path="/channelviewplaylist" component={ChannelViewPlaylistPage}></Route>      
        <Route path="/channelviewvideos" component={ChannelViewVideosPage}></Route>      
        <Route path="/managevideos" component={ManageVideos}></Route>      
        <AuthRoute path="/liked-videos" component={LikedVideosPage}></AuthRoute>      
        <AuthRoute path="/subscriptions" component={SubscriptionPage}></AuthRoute>      
        </Router>
    </>
  );
}
export default User;
