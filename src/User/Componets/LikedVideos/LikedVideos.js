import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import VideoRow from '../VideoRow/VideoRow'
import './LikedVideos.css'
import { server } from "../../../server";

function LikedVideos() {
    const [videos,setVideos]=useState()
    useEffect(()=>{
axios.post(server+'/liked-videos',{token: localStorage.getItem("token")}).then((response)=>{
    console.log(response.data);
setVideos(response.data)
})
    },[])
    return (
        <div className="liked_videos">
            <h3>Liked Videos</h3>
        <hr />
            {videos&&videos.map((item, index) => {
          return ( 
            <Link className="don" to={{
                pathname: `/watch/${item._id}`
              }}>
              <VideoRow 
            views={item.views?item.views.length:0}
            subs={item.subscribers?item.subscribers.length:0}
            description={item.discription}
            timestamp={item.timestamp}
            channel={item.channelName}
            title={item.title}
            image={item._id}
            channelId={item.channelId}/></Link>
           );
        })}
            
        </div>
    )
}

export default LikedVideos
