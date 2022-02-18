import axios from "axios";
import React, { useEffect, useState } from "react";
import PlaylistCard from "../PlaylistCard/PlaylistCard";
import { Modal } from "@material-ui/core";
import PlaylistRow from "../Plylist/PlaylistRow";
import { server } from "../../../server";


function PlaylistSection(props) {
  let [view, setview] = useState();
  const [content, setContent] = useState([]);
  useEffect(() => {
    axios
      .post(
        server+"/Channel_view-playlist",
        { data: props.channelId,token:localStorage.getItem("token") }
      )
      .then((response) => {
        console.log(response.data, "llllllllllllllllllllll");
        setContent(response.data);
      });
  }, []);
  return (
    <div className="recomentedVideo-m">
      <div className="recomentedVideo_videos-m">
        {content &&
          content.map((item, index) => {
            return (
              <>
              <div onClick={()=>{
                setview(true)


              }} >
              <Modal className="modal"
                open={view}
                onClose={() => {
                  setview(false);
                }}
              >
        {<PlaylistRow 
        onClick={()=>{
            setview(true)


          }} 
        playlistId={item._id}
         />}
              </Modal>
                <PlaylistCard
                  id={item._id}
                  title={item.videos && item.title}
                  image={item.videos && item.videos[item.videos.length - 1]}
                  count={item.videos && item.videos.length}
                />
              </div>
              </>
            );
          })}
      </div>
    </div>
  );
}

export default PlaylistSection;
