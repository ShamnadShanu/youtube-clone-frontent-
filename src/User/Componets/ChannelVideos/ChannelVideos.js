import axios from 'axios'
import React, { useEffect, useState } from 'react'
import VideoCard from '../VideoCard/VideoCard'
import './ChannelVideos.css'
import { server } from "../../../server";

function ChannelVideos(props) {
  console.log('sfsgs',props);
  const [content,setContent]=useState([])
  useEffect(()=>{
 axios.post(server+'/Channel-videos',{data:props.channelId,token:localStorage.getItem("token")}).then((response)=>{
  setContent(response.data)
  console.log(response.data);
})
  },[])
    return (
        <div className="recomentedVideo-c">
        <div className="recomentedVideo_videos-c">
        {content.map((item, index) => {
              return (
                <VideoCard
                channelId={item.channelId}
                discription={item.discription}
                channelImage={item.channelImage}
                timestamp={item.timestamp}
                title={item.title}
                _id={item._id}
                channelName={item.channelName}
                views={item.views}
        />
              );
            })}
        </div>
      </div>
    )
}

export default ChannelVideos
