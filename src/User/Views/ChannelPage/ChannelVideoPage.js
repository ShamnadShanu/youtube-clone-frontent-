import React, { useEffect, useState } from "react";
import Header from "../../Componets/Header/Header";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import "./ChannelPage.css";
import Button from "@material-ui/core/Button";
import ChannelVideos from "../../Componets/ChannelVideos/ChannelVideos";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../../server";


function ChannelVideoPage() {
  let [channelName, setChannelName] = useState();
  let [channelId, setChannelId] = useState(null);
  let [subscriberCount, setSubscriberCount] = useState();

  useEffect(() => {
    axios
      .post(server+"/getChannel", { token: localStorage.getItem("token") })
      .then((response) => {
        setChannelName(response.data.channelName);
        setChannelId(response.data._id);
        if (response.data.subscribers) {
          setSubscriberCount(response.data.subscribers.length);
        } else {
          setSubscriberCount(0);
        }
      });
  }, []);
  return (
    <div className="channel_page">
      <Header />
      <div className="channel_container">
        <Sidebar Your={true} />
        <div className="channel_bodyy">
          <div className="channel_header">
            <div className="channeldet">
              {" "}
              <img src={server+'/ChannelImages/'+channelId+".jpg"} alt="" />
              <div className="aaa">
                <h2>{channelName}</h2>
                <p>
                  <span>{subscriberCount}</span> Subscribers
                </p>
              </div>
            </div>
            <Button className="buttons" variant="contained" color="primary">
              CUSTOMISE CHANNEL
            </Button>
            <Link
              to={{
                pathname: "/managevideos",
                state: {
                  channelId: channelId,
                },
              }}
            >
              <Button className="buttons" variant="contained" color="primary">
                MANAGE VIDEOS
              </Button>
            </Link>
          </div>
          <div className="channel_navbar">
            <Link to="/channelhome" className="channel_nav">
              HOME
            </Link>
            <Link to="/channelvideos" className="channel_nav">
              VIDEOS
            </Link>
            <Link to="/channelplaylist" className="channel_nav">
              PLAYLISTS
            </Link>
          </div>
          <div className="channel_content">
            {channelId ? <ChannelVideos channelId={channelId} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChannelVideoPage;
