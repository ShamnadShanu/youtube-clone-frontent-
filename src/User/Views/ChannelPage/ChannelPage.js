import React, { useEffect, useState } from "react";
import Header from "../../Componets/Header/Header";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import "./ChannelPage.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Modal from 'react-responsive-modal'
import UploadVideo from "../../Componets/UploadVideo/UploadVideo";
import axios from "axios";
import { server } from "../../../server";



function ChannelPage() {
  let [isModel,setIsModal]=useState(false)
  let [channelName,setChannelName]=useState()
  let [channelId,setChannelId]=useState()
  let [subscriberCount,setSubscriberCount]=useState()

  useEffect(()=>{
axios.post(server+'/getChannel',{token:localStorage.getItem("token")})
.then((response)=>{
 setChannelName(response.data.channelName);
 setChannelId(response.data._id)
 if(response.data.subscribers){
  setSubscriberCount(response.data.subscribers.length)
 }else{
  setSubscriberCount(0)
 }

})
  },[])
  console.log(channelName);
  return (
    <div className="channel_page">
      <Header />
      <div className="channel_container">
        <Sidebar Your={true} />
        <div className="channel_bodyy">
          <div className="channel_header">
            <div className="channeldet">
              {" "}
              <img
                src={server+'/ChannelImages/'+channelId+".jpg"}
                alt=""
              />
              <div className="aaa">
                <h2>{channelName}</h2>
                <p><span>{subscriberCount}</span> Subscribers</p>
              </div>
            </div>
            <Button className="buttons" variant="contained" color="primary">
              CUSTOMISE CHANNEL
            </Button>
            <Link to={{pathname:"/managevideos",
          state:{
            channelId:channelId
          }}}><Button className="buttons" variant="contained" color="primary">
              MANAGE VIDEOS
            </Button></Link>
          </div>
          <div className="channel_navbar">
            <Link active to="/channelhome" className="channel_nav">
              HOME
            </Link>
            <Link to="/channelvideos" style={{}} className="channel_nav">
              VIDEOS
            </Link>
            <Link to="/channelplaylist" className="channel_nav">
              PLAYLISTS
            </Link>
          </div>
          <div className="channel_content-h">
          <Modal classNames="modal"
 center onClose={()=>{
  setIsModal(false)
}} open={isModel}>
    < UploadVideo channelName={channelName} channelImage={server+'/ChannelImages/'+channelId+".jpg"} channelId={channelId}/>
</Modal>
          <Button className="upload" onClick={()=>{
              setIsModal(true)
          }} variant="contained" color="primary">
              UPLOAD VIDEO
        </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChannelPage;




/*
 <input hidden onChange={(e)=>{

          }} type="file" id="actual-btn"/>
<label className="label-c" for="actual-btn">No file chosen</label>
*/