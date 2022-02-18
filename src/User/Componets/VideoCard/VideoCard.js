import React from "react";
import Avatar from "@material-ui/core/Avatar";
import './VideoCard.css'
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';
import VerifiedIcon from "@material-ui/icons/CheckCircleOutlineOutlined"
import { server } from "../../../server";




function VideoCard(item) {
  console.log(item);



//   function truncateText(selector, maxLength) {
//     var element = document.querySelector(selector),
//         truncated = element.innerText;

//     if (truncated.length > maxLength) {
//         truncated = truncated.substr(0,maxLength) + '...';
//     }
//     return truncated;
// }

  function truncateText() {

    if (item.title.length > 50) {
       var truncated = item.title.substr(0,50) + '...';
    }else{
      return item.title
    }
    return truncated;
}
  return (
    <Link className="don" to={{
      pathname: `/watch/${item._id}`
    }}>
    <div className="videoCard">
      <img className="videoCard_thumbnail" src={server+'/Thumbanails/'+item._id+".jpg"} alt="" />
      <div className="videoCard_info">
        <Avatar className="videoCard_avatar" alt={item.channelName} src={server+'/ChannelImages/'+item.channelId+".jpg"} />
        <div className="video_text">
          <h4>{truncateText()}</h4> 
<Link className="don" to={{
  pathname: '/channelview',
  state: {
    channelId:item.channelId
  }
}}>
<p >{item.channelName}{item.verified && <VerifiedIcon style={{width:"15px"}}/>}</p> 
</Link>          <p>{item.views?item.views.length:0} views .<Moment fromNow>{item.timestamp}</Moment></p>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default VideoCard;
