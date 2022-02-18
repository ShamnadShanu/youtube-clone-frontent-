import React from 'react'
import Moment from 'react-moment';
import './VideoRow.css'
import { server } from "../../../server";

function VideoRow({views,description,timestamp,channel,title,image}) {
    function truncateText(selector, maxLength) {
        var truncated =selector
        if (truncated.length > maxLength) {
            truncated = truncated.substr(0,maxLength) + '...';
        }
        return truncated;
    }
    return (
        <div className="videoRow">
            <img src={server+'/Thumbanails/'+image+".jpg"} alt="" />
            <div className="videoRow__text">
                <h3>{title}</h3>
                <p className="videoRow__headline">
                    {channel}{" * "}{views} Views . <Moment fromNow>{timestamp}</Moment>
                </p>
                <p className="videoRow__description">{truncateText(description,150)}</p>
            </div>
        </div>
    )
}

export default VideoRow
