import React from 'react'
import Comments from '../Comments/Comments';
import RelatedVideo from '../RelatedVideos/RelatedVideo';
import VideoArea from './Sections/VideoArea';
import './VideoContent.css'

function VideoContent(props) {
    console.log(props);
    return (
        <div className="watch__page">
         <div className="page-content">
         <VideoArea props={props.content}/>
         <RelatedVideo props={props.content} />
         </div>
         <Comments item={props.content}/>
        </div>
    )
}

export default VideoContent
