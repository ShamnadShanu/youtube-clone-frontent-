import axios from "axios";
import React, { useState } from "react";
import Header from "../../Componets/Header/Header";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import VideoContent from "../../Componets/VideoContent/VideoContent";
import "./VideoPlayer.css";
import { useParams } from 'react-router-dom';
import { server } from "../../../server";

function VideoPlayer(props) {
  let { id } = useParams();
  let [state,setState]=useState()
  useState(()=>{
axios.post(server+'/getTheVideo',{videoId:id}).then((response)=>{
  console.log(response.data);
setState(response.data)
})
  },[])
  return (
   <>
     <Header/>
      <div className="watch">
      <Sidebar/>
   {state&&<VideoContent content={state} />}
      </div>
   </>
  );
}

export default VideoPlayer;
