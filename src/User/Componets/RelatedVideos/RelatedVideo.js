import {  useHistory } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./RelatedVideo.css";
import Moment from "react-moment";
import { server } from "../../../server";


function RelatedVideo(props) {
  let history=useHistory()
  console.log(props.props.category,"relaaaaaaaaaaaaaaaaaaaa");
  // let history=useHistory()
  function truncateText(item) {

    if (item.title.length > 60) {
       var truncated = item.title.substr(0,60) + '...';
    }else{
      return item.title
    }
    return truncated;
}
  let [related, setRelated] = useState();
  console.log(props.props,"lllllllllllllllllllllllll");
  useEffect(() => {
    axios
      .post(
        server+"/related",
        {
          category: props.props.category,
          current: props.props.title,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setRelated(response.data);
      });
  },[]);
  return (
    <div className="related_videos">
<h3 style={{margin:"0",marginLeft:"20px"}}>UP NEXT</h3> 
<hr style={{ borderTop: "1px solid grey",marginLeft:"20px" }} />
     {related &&
        related.map((item, index) => {
          return (
//             <Link onClick={()=>{
// // window.location.reload()
//             }}
//               className="dont"
//               to={{
//                 pathname: `/watch/${item._id}`
//               }}
//             >
              <div onClick={()=>{
                history.push( `/watch/${item._id}`)
                window.location.reload()
              }} className="related">
                <div className="related_videothumbanail">
                  <img
                    src={server+"/Thumbanails/" + item._id + ".jpg"}
                    alt="thumbnail"
                  />
                </div>
                <div className="videoRow__tex">
                  <h5>{truncateText(item)}</h5>
                  <p className="videoRow__headline">
                    {item.channelName}
                    <br /> {item.views ? item.views.length : 0} Views .<Moment fromNow>{item.timestamp}</Moment>
                  </p>
                </div>
              </div>
            // </Link>
          );
        })}
    </div>
  );
}

export default RelatedVideo;
