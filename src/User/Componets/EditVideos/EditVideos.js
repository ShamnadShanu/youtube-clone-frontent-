import React, { useEffect, useState } from 'react'
import './EditVideos.css'
// import LongMenu from "./dot";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import axios from 'axios';
import { server } from "../../../server";


function EditVideos(props) {
    console.log(props.item);
  let [imageError, setImageError] = useState(null);
  let [thumbanail, setThumbanail] = useState(null);
  let [thumb, setThumb] = useState(server+'/Thumbanails/'+props.item._id+".jpg");
    let [title, setTitle] = useState(props.item.title);
    let [discription, setDiscription] = useState(props.item.discription);
    let [category, setCategory] = useState(props.item.category);
    let [visibility, setVisibility] = useState(props.item.visibility);
    let [require, setRequire] = useState("");
    let config = {
        header: { "content-type": "multipart/form-data" },
      };

    function imageValidation(value) {
       if(value){
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
      }
    useEffect(()=>{

    })
    return (
        <div className="edit_videos">
            <h2>Edit Videos</h2>
            <div className="edit_form">
            <form
        onSubmit={(e) => {
          e.preventDefault();          
            if (thumbanail==null) {
              setRequire("Select A thumbanail image");
            } else {
                console.log(thumbanail,"yhksfk");
              const data = new FormData();
              data.append("title", title);
              data.append("discription", discription);
              data.append("category", category);
              data.append("visibility", visibility);
              data.append("videothumbanail",thumbanail);
              data.append('videoId',props.item._id)
              console.log(data);
              axios
                .post(server+"/edit-video", data,config)
                .then(() => {
                  window.location.reload();
                });
            }

          console.log(imageError);
        }}
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
              placeholder="Video Title"
            />
            <input
            value={discription}
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
              <Select
              value={category}
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
              <Select
              value={visibility}
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
          <div className="thumbanail-e">
           <div className="videodiv">
           <label className="thumb_div" htmlFor="thumb">
           {thumb ? (
                <img className="thumb_image" src={thumb} alt="" />
              ) : imageError ? (
                <p style={{ color: "red" }}>{imageError}</p>
              ) : (
                <div>Uplod thumbanail</div>
                
              )}
            </label>
            <p style={{ color: "red" }}>{require}</p>
            <input
              hidden
              onChange={(e) => {
                setThumbanail(null);
                setThumb(null);
                setImageError(null);
                imageValidation(e.target.files[0]);
                setRequire(null)
              }}
              id="thumb"
              type="file"
            />
           </div>
           <div className="videodiv">
           <button style={{marginLeft:"3rem"}} type="submit" className="label-u">
          SUBMIT
        </button>
           </div>

          </div>          
        </div>
      </form>
            </div>
        </div>
    )
}

export default EditVideos
