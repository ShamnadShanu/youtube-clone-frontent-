import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./UploadVideo.css";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { server } from "../../../server";

function UploadVideo(props) {
  let settime= ()=>{
    setTimeout(() => {
      setState(100)
    }, 1000);
  }
  function LinearProgressWithLabel(props) {
   
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  const useStyles = makeStyles({
    rr: {
      marginBottom:"20px",
      width: '100%',
    },
  });
  const classes = useStyles();
  
  let [state,setState]=useState(0)
  let [imageError, setImageError] = useState(null);
  let [videoError, setVideoError] = useState("");
  let [thumbanail, setThumbanail] = useState("");
  let [thumb, setThumb] = useState();
  let options={
    onUploadProgress:(progressEvent)=>{
const{loaded,total}=progressEvent;
let percent=Math.floor((loaded*100)/total)
console.log(`${loaded}kb of ${total}kb|${percent}%`)
if(percent <100){
setState(percent)
}
    } ,
    headers: { "content-type": "multipart/form-data" }
  }
  // let config = {
  //   header: { "content-type": "multipart/form-data" },
  // };
  let [upload, setUpload] = useState();
  let [required, setRequired] = useState("");
  let [require, setRequire] = useState("");
  let [title, setTitle] = useState();
  let [discription, setDiscription] = useState();
  let [category, setCategory] = useState();
  let [visibility, setVisibility] = useState();
  function imageValidation(value) {
    var filePath = value.name;
    console.log(filePath, "function in call");
    // Allowing file type
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

    if (!allowedExtensions.exec(filePath)) {
      setImageError("Select an image file");
      return false;
    } else {
      setThumbanail(value);
      setThumb(URL.createObjectURL(value));
      console.log("nallaathah");
    }
  }
  function videoValidation(value) {
    var filePath = value.name;
    console.log(filePath, "function in call");
    var allowedExtensions = /(\.mp4)$/i;

    if (!allowedExtensions.exec(filePath)) {
      setVideoError("Select an mp4 file");
      setUpload(null);
      return false;
    } else {
      setUpload(value);
      console.log("nallaathah");
    }
  }
  return (
    <div className="container-c">
      <h1>Upload Video</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (upload == null) {
            setRequired("Select A Video File");
          } else {
            if (thumbanail == null) {
              setRequire("Select A thumbanail image");
            } else {
              const data = new FormData();
              data.append("file", upload);
              data.append("title", title);
              data.append("discription", discription);
              data.append("category", category);
              data.append("visibility", visibility);
              data.append("channelId", props.channelId);
              data.append("channelName", props.channelName);
              data.append("videothumbanail", thumbanail);
              console.log(data);
              axios
                .post(server+"/upload-video/", data,options)
                .then((response) => {
                  console.log(response);
                  setState(100)
                 settime()
                  // window.location.reload();
                });
            }
          }

          console.log(imageError);
        }}
      >
        <div className="upload_video">
          <div className="form">
            <div className="formInputs">
            <input
              required
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Video Title"
            />
            <input
              required
              type="text"
              onChange={(e) => {
                setDiscription(e.target.value);
              }}
              placeholder="Video Description"
            />
            </div>
           <div className="formSelect">
           <FormControl className="gg">
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <MenuItem value={1}>Sports</MenuItem>
                <MenuItem value={2}>Film And Entertinement</MenuItem>
                <MenuItem value={3}>Gaming</MenuItem>
                <MenuItem value={4}>Travel</MenuItem>
                <MenuItem value={5}>Education</MenuItem>
              </Select>
            </FormControl>
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
          </div>
          <div className="thumbanail">
           <div className="videodiv">
           <input
              hidden
              onChange={(e) => {
                setVideoError(" ");
                setRequired(" ");
                videoValidation(e.target.files[0]);
              }}
              type="file"
              id="actual-btn"
            />
            <label className="label-u" htmlFor="actual-btn">
              SELECT FILES
            </label>
           </div>
           <div className="thumbanaildiv">
           <label className="thumb_div" htmlFor="thumb">
              {thumb ? (
                <img className="thumb_image" src={thumb} alt="" />
              ) : imageError ? (
                <p style={{ color: "red" }}>{imageError}</p>
              ) : (
                <div>Uplod thumbanail</div>
                
              )}
            </label>
            <input
              hidden
              onChange={(e) => {
                setThumbanail(null);
                setThumb(null);
                setImageError(null);
                imageValidation(e.target.files[0]);
              }}
              id="thumb"
              type="file"
            />
           </div>

          </div>
          <p style={{ color: "red" }}>{required}</p>
          <p style={{ color: "red" }}>{videoError}</p>
          <p style={{ color: "red" }}>{require}</p>
          
        </div>

        {state===0?<button type="submit" className="label-u">
          SUBMIT
        </button>:null}
      </form>
      <div className={classes.rr}>
        {state===100? <button onClick={()=>{
          window.location.reload()
        }} type="button" className="label-u">
          DONE
        </button> :null}
      {state>1&&state<100?<LinearProgressWithLabel value={state} />:null}
    </div>    
    </div>
  );
}

export default UploadVideo;
