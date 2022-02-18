import React, { useState } from 'react'
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import "./PlaylistCard.css"
import { server } from "../../../server";


function PlaylistCard({id,title,count,image}) {
    return (
        
            <div  className="optun">
                 
                {image&&
               <div className="play">
               <img
                  
                  
                  src={server+'/Thumbanails/'+image+".jpg"}
                //   {'/Thumbanails/'+item.videos[item.videos.length-1]+".jpg"}
                
                />
                 
                <div class="text-bloc">
                  {count}
                  <PlaylistPlayIcon />
                </div>
               </div>}
                <div className="playlist_titl">
                  <h4>{title}</h4>
                </div>
                
              </div>    )
}

export default PlaylistCard
