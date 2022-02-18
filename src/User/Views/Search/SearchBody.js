import React from 'react'
import './Search.css'
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined'
import ChannelRow from '../../Componets/ChannelRow/ChannelRow'
import VideoRow from '../../Componets/VideoRow/VideoRow'
import { Link } from 'react-router-dom'
function SearchBody(props) {
    console.log(props.searchResult,"/////////////////////");
    let isResult=()=>{
        if(props.searchResult.length <1){
            console.log('illa');
            return false
        }
        console.log('unt');
        return true
    }
    return (
        <div className="search_body">
        <div className="search__filter">
<TuneOutlinedIcon/>
<h2>FILTER</h2>
        </div>
       {isResult() ?props.searchResult.channel? 
       <>
                              <hr style={{ borderTop: "1px solid grey",marginLeft:"1rem" }} />

                              
        <ChannelRow
        subscribed={props.searchResult.subscribed}
        channelId={props.searchResult.channel._id}
        image={props.searchResult.channel.channelImage}
        channel={props.searchResult.channel.channelName}
    verified={props.searchResult.channel.verified}
        subs={props.searchResult.channel.subscribers&&props.searchResult.channel.subscribers.length}
        noOfVideos={props.searchResult.count?props.searchResult.count:0}
        description="discriprion"
        />
                                      <hr style={{ borderTop: "1px solid grey",marginLeft:"1rem" }} />

       </>
        :null:null}
        {isResult() ?props.searchResult.result.map((item, index) => {
            return(

<Link className="don" to={{
      pathname: `/watch/${item._id}`
    }}><VideoRow 
 views={item.views?item.views.length:0}
 description={item.discription}
 timestamp={item.timestamp}
 channel={item.channelName}
 title={item.title}
 image={item._id}
 channelId={item.channelId}
 /></Link>












            )
 
        }):<div className="noresult">
            <h1>No Result Found</h1>
            </div>}
       
        </div>
    )
}

export default SearchBody
