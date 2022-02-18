import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Modal } from '@material-ui/core';
import EditVideos from '../EditVideos/EditVideos';
import "./ManageVideos.css";
import axios from 'axios';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { server } from "../../../server";




const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
  let [Error, setError] = useState();
  let [playlist,setPlaylist]=useState()
  useEffect(()=>{
    axios.post(server+'/getPlaylists',{channelId:props.item.channelId}).then((response)=>{
      setPlaylist(response.data)
      console.log(response.data,"playlist");

  })

  },[])
  console.log(props);
  let [isModel,setIsModel]=useState()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
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
        <Typography  className="pop">The Video Is Already In The Playlist</Typography>
      </Popover>
      <Modal classNames="modal"
 center onClose={()=>{
  setIsModel(false)
}} open={isModel}>
  <EditVideos item={props.item}/>
</Modal>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
          <MenuItem onClick={()=>{
setIsModel(true)
          }}>Edit</MenuItem>
          <MenuItem onClick={()=>{
            axios.post(server+'/deletevideos',{videoId:props.item._id}).then(()=>{
              window.location.reload()
            })
          }}>Delete</MenuItem>
           <MenuItem ><FormControl className="ggg">
              <InputLabel  id="demo-simple-select-label">Add to playlist</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => {
                  // setVisibility(e.target.value);
                }}
              >
                {playlist&&playlist.map((item, index) => {
          return (
            <MenuItem onClick={()=>{
              axios.post(server+'/addtoPlaylist',{playlistId:item._id,videoId:props.item._id}).then((response)=>{
                if(response.data){
                  window.location.reload()

                }else{
                  setError(true)
                  setTimeout(()=>{
            setError(false)
                  },1000)
                }
              })
            }} value={10}>{item.title}</MenuItem>
          )})}
               
                
              </Select>
            </FormControl></MenuItem>
      </Menu>
    </div>
  );
}
