import React, { useEffect, useState } from "react";
import "./Playlists.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Moment from "react-moment";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { InputLabel, Modal } from "@material-ui/core";
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import PlaylistRow from "../Plylist/PlaylistRow";
import { server } from "../../../server";


function Playlists(props) {

  console.log(props);
  const [that,setThat]=useState()
  let [view,setview]=useState()
  let [state, setstate] = useState();
  let [Error, setError] = useState();
  let [title,setTitle]=useState()
  let [visibility,setVisibility]=useState()
  let [playlists,setPlaylists]=useState()
  useEffect(()=>{
      axios.post(server+'/getPlaylists',{channelId:props.channelId}).then((response)=>{
          setPlaylists(response.data)
          console.log(response.data);

      })
     
  },[])
  return (
    <div className="playlists">
        <Popover
        id="K"
        open={Error}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <Typography  className="pop">The Playlist Name Is Already Exist</Typography>
      </Popover>
      <button
        onClick={() => {
          setstate(true);
        }}
        className="rigthk"
      >
        Add New Playlist
      </button>


      <Modal className="modal"
        open={state}
        onClose={() => {
          setstate(false);
        }}
      >
        <div className="playlist_form">
        <form
        onSubmit={(e) => {
          e.preventDefault();          
              const data = new FormData();
              data.append("title", title);
              data.append("visibility", visibility);
               data.append("channeId",props.channelId)
              axios
                .post(server+"/createPlaylist", data)
                .then((response) => {
                  if(response.data){
                    window.location.reload();
                  }else{
                    setError(true)
                    setTimeout(()=>{
              setError(false)
                    },1000)
                  }
                });
            }    
    }
      >
        <div className="upload_video">
          <div className="form">
            <div className="formInputs">
            <input
            value={title}
              required
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Playlist Name"
            />
             <FormControl className="gg">
              <InputLabel id="demo-simple-select-label">Visibility</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => {
                  setVisibility(e.target.value);
                }}
              >
                <MenuItem value={10}>Private</MenuItem>
                <MenuItem value={20}>Public</MenuItem>
                <MenuItem value={30}>Unlisted</MenuItem>
              </Select>
            </FormControl>
            </div>
          
        <button className="rigthk">Create Playlist</button>
          </div>
        </div>
      </form> </div> 
      </Modal>
     {playlists&&playlists.length>0? <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Playlists</th>
            <th>Visibility</th>
            <th>Last updated</th>
            <th>Video Count</th>
          </tr>
        </thead>
        <tbody>
          
          {playlists &&
                playlists.map((item, index) => {
                  return (
          <tr>
            <Modal className="modal"
        open={view}
        onClose={() => {
          setview(false);
        }}
      >
{playlists?that&&<PlaylistRow 
playlistId={that}
 />:null}
      </Modal>
            {/* <td>{index + 1}</td> */}
            <td>{index + 1}</td>
            <td>
              <div onClick={()=>{
                setview(true)
                setThat(item._id)

              }} style={{ minWidth: "9rem", maxHeight: "5rem" }} className="optuin">
                {item.videos?<img
                  style={{ minWidth: "9rem", maxHeight: "5rem" }}
                  src={server+'/Thumbanails/'+item.videos[item.videos.length-1]+".jpg"}
                  alt=""
                />:<div style={{ minWidth: "9rem", maxHeight: "5rem" }}><p style={{marginLeft:"0"}}>No Videos</p></div>}

                <div class="text-block">
                  <p>{item.videos?item.videos.length:0}</p>
                  <PlaylistPlayIcon />
                </div>
                  
                <div className="playlist_title">
                  <h4>{item.title}</h4>
                </div>
                
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
                              axios.post(server,'/changePlaylistvisibility',{playlistId:item._id,visibility:e.target.value,channelId:item.channelId},{
                                headers: {
                                  "x-access-token": localStorage.getItem("token"),
                                },
                              }).then((data)=>{
                                  setPlaylists(data.data)
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
              <Moment format="YYYY/MM/DD">{item.lastUpdate}</Moment>
            </td>
            <td>{item.videos?item.videos.length:0}</td>
          </tr>
           );
              })} 
        </tbody>
      </Table>:null}
    </div>
  );
}

export default Playlists;
