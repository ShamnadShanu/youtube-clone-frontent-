import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "./ManageVideos.css";
import Table from "react-bootstrap/Table";
import axios from "axios";

import LongMenu from "./dot";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Moment from "react-moment";
import { server } from "../../../server";


function ManageVideos(props) {
  let [videos, setVideos] = useState();
  useEffect(() => {
    axios
      .post(
        server+"/manageChannel",
        { data: props.location.state.channelId,token:localStorage.getItem("token") }
      )
      .then((response) => {
        setVideos(response.data);
        console.log(response.data);
      });
  }, []);
  return (
    <>
      <Header />
      <div className="ManageChannel">
        <Sidebar />
        <div className="maindiv">
         {videos&&videos.length>0?<Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Video</th>
                <th>Visibility</th>
                <th>Date</th>
                <th>Views</th>
                <th>Comments</th>
                <th>Likes</th>
                <th>Dislikes</th>
              </tr>
            </thead>
            <tbody>
              {videos &&
                videos.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <div style={{ width: "10rem" }} className="optui">
                          <img
                            style={{minWidth: "9rem",maxHeight:"5rem" }}
                            src={server+"/Thumbanails/" + item._id + ".jpg"}
                            alt=""
                          />
                          <LongMenu  item={item}/>
                        </div>
                      </td>
                      <td>
                        <div className="visibility">
                          <Select
                            style={{ border: "none" }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={item.visibility}
                            onChange={(e) => {
                              axios.post(server+'/changevisibility',{channelId:props.location.state.channelId ,videoId:item._id,visibility:e.target.value,token:localStorage.getItem("token")}).then((data)=>{
                              setVideos(data.data)
                              })
                            }}
                          >
                            <MenuItem value={"10"}>Private</MenuItem>
                            <MenuItem value={"20"}>Public</MenuItem>
                            <MenuItem value={"30"}>Unlisted</MenuItem>
                          </Select>
                        </div>
                      </td>
                      <td>
                        <Moment format="YYYY/MM/DD">{item.timestamp}</Moment>
                      </td>
                      <td>{item.views ? item.views.length : 0}</td>
                      <td>{item.comments ? item.comments.length : 0}</td>
                      <td>{item.likes ? item.likes.length : 0}</td>
                      <td>{item.dislikes ? item.dislikes.length : 0}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>:<div className="nov">
          <h1>NO VIDEOS UPLOADED</h1></div>}
        </div>
      </div>
    </>
  );
}

export default ManageVideos;
