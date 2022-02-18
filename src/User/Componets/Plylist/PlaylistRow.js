import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import'./PlaylistRow.css'
import { server } from "../../../server";

function PlaylistRow(Props) {

  const [videos,setVideos]=useState()
  console.log(Props);
  let props=Props
  function truncateText(item) {

    if (item.title.length > 50) {
       var truncated = item.title.substr(0,50) + '...';
    }else{
      return item.title
    }
    return truncated;
}
    useEffect(()=>{
      axios.post(server+'/getPlaylistVideos',{playlistId:props.playlistId}).then((response)=>{
        console.log(response.data);
setVideos(response.data)
      })
    },[])
    return (
        <div className="BACK">
           {videos&&videos.length>0?videos.map((item, index) => {
          return (
            <Link className="don" to={{
              pathname: `/watch/${item.videos._id}`
            }}>
               <div className="related-p">
                <div className="related_videothumbanail-p">
                  <img
                    src={server+'/Thumbanails/'+item.videos._id+".jpg"}
                    alt="thumbnail"
                  />
                </div>
                <div className="videoRow__tex-p">
                  <h5>{truncateText(item.videos)}</h5>
                  <p className="videoRow__headline-p">
{item.videos.channelName}                    <br /> 
                    .<Moment fromNow>{item.videos.timestamp}</Moment>
                  </p>
                </div>
              </div>
            </Link>
        )}):<div className="noplaylilst">
          <h4>No Videos</h4>
          </div>}
      
        </div>
    )
}

export default PlaylistRow
