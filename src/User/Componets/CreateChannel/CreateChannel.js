import { Avatar } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './CreateChannel.css'
import { server } from "../../../server";


function CreateChannel(props) {
    const config={
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }
    let history=useHistory()
    const [Cname,setCname]=useState(props.userName)
    const [channelImg,setChannelImg]=useState()
    const [channelIMG,setChannelIMG]=useState()
    const [error,setError]=useState(false)
    const data=new FormData()
    return (
        <div className="create_channel">
            <h2>How you'll appear</h2>
            <hr />
        <div className="profile">
        {channelImg?<img  className="channel_img" src={channelImg} alt="" />:<Avatar className="channel_img"/>}
            <label className="profile_label">
                UPLOAD PICTURE
            <input id="channel_image" onChange={(e)=>{
{e.target.files[0]&&setChannelImg(URL.createObjectURL(e.target.files[0]))}
{e.target.files[0]&&setChannelIMG(e.target.files[0])}
            }} hidden type="file" />
            </label>
           <input className="channel_name" onChange={(e)=>{
         setCname(e.target.value)
         setError(false)
            }} type="text" value={Cname} />
            <p style={{color:"red"}}>{error}</p>
        </div>
        <div className="footer">
        <p style={{flex:"0.5",cursor:"pointer"}}>CANCEL</p>
        <p onClick={()=>{
            data.append("channelName",Cname)
            data.append("channelImage",channelIMG)
            data.append("token",localStorage.getItem("token"))
            // const data = new FormData();
            // data.append("channelName", Cname);
            // data.append("channelImage", channelIMG);
            // data.append("token",localStorage.getItem("token"))
            console.log(channelIMG);
            console.log(data,"data");
            axios.post(server+'/createChannel',data,config).then((data)=>{
                  if(data.data){
                      history.push("/channel")
                  }else{
                    setError('Channel Name Already exist')
                  }
              })
        }} style={{marginLeft:"10px",cursor:"pointer", color:"blue", float:"right"}}>CREATE CHANNEL</p>
        </div>
        </div>
    )
}

export default CreateChannel
