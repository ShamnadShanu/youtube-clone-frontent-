import { Avatar, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Comments.css";
import ThumbUpAltSharpIcon from "@material-ui/icons/ThumbUpAltSharp";
import ThumbDownSharpIcon from "@material-ui/icons/ThumbDownSharp";
import axios from "axios";
import Moment from "react-moment";
import "moment-timezone";
import { useHistory } from "react-router";
import { server } from "../../../server";


function Comments(props) {
  let history = useHistory();
  let [liked, setLiked] = useState(false);
  let [disliked, setDisliked] = useState();
  let [likeCount, setLikeCount] = useState(0);
  let [dislikeCount, setDislikeCount] = useState(0);
  console.log(props);
  let [profile, setProfile] = useState();
  let [length, setlength] = useState();
  let [Comments, AddComments] = useState();
  let [AddedCommet, addAddedComment] = useState();
  useEffect(() => {
    axios
      .post(
       server+"/getAllComment",
        { videoId: props.item._id,token: localStorage.getItem("token") }
      )
      .then((response) => {
        AddComments(response.data);
        setlength(response.data.length);
      });
    axios
      .post(
        server,
        {token: localStorage.getItem("token"),},
      )
      .then((response) => {
        setProfile(response.data.profile);
      });
    //   axios
    //   .post(
    //     "/comment-getLikes",
    //     { videoId: props.props.props.item._id },
    //     {
    //       headers: {
    //         "x-access-token": localStorage.getItem("token"),
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response.data);
    //     setLikeCount(response.data.response.like);
    //     setDislikeCount(response.data.response.dislike)
    //     if (response.data.liked) {
    //       setLiked(true);
    //     }else if(response.data.disliked){
    //       setDisliked(true)
    //     }
    //   });
  }, []);
  return (
    <div className="Comments">
      <hr style={{ borderTop: "1px solid grey" }} />
      <span>{length}</span> Comments
      <div className="add__comment">
        <Avatar
          style={{ marginTop: "10px", marginRight: "20px" }}
          src={profile}
        />
        <textarea
          value={AddedCommet}
          onChange={(e) => {
            addAddedComment(e.target.value);
          }}
          placeholder="Add a public comment"
          name=""
          id=""
          cols="30"
          rows="1"
        ></textarea>
        <Button
          onClick={() => {
            if (AddedCommet) {
              axios
                .post(
                  server+"/comment",
                  { Comment: AddedCommet, videoId: props.item._id,token: localStorage.getItem("token")}
                )
                .then((response) => {
                  AddComments(response.data);
                  setlength(response.data.length);
                  addAddedComment("");
                });
            }
          }}
          className="buttonss"
        >
          Add Comment
        </Button>
      </div>
      {Comments &&
        Comments.map((item, index) => {
          return (
            <>
              <div className="comments_section">
                <Avatar src={item.userProfile} />
                <h3>{item.userName}</h3>
                <span>
                  <Moment fromNow>{item.timestamp}</Moment>
                </span>
              </div>
              <p style={{ marginLeft: "3rem" }}>{item.comment}</p>
              <div className="like">
                {item.liked ? (
                  <>
                    <p style={{ margin: 0, marginRight: "10px" }}>
                      {item.likes&&item.likes.length}
                    </p>
                    <ThumbUpAltSharpIcon
                      style={{
                        margin: "0",
                        width: "15px",
                        marginRight: "20px",
                        color: "blue",
                      }}
                      className="hoverr"
                      onClick={() => {
                        axios
                          .post(
                           server+"/comment-unlike",
                            { commentId: item._id ,token: localStorage.getItem("token")}
                          )
                          .then((response) => {
                            AddComments(response.data);
                          });
                      }}
                    />
                  </>
                ) : (
                  <>
                    <p style={{ margin: 0}}>
                      {item.likes&&item.likes.length}
                    </p>
                    <ThumbUpAltSharpIcon
                      style={{ width: "15px"}}
                      className="hoverr"
                      onClick={() => {
                        {
                          localStorage.getItem("token")
                            ? axios
                                .post(
                                  server+"/comment-like",
                                  { commentId: item._id,token: localStorage.getItem("token")}
                                )
                                .then((response) => {
                                  AddComments(response.data);
                                })
                            : history.push({
                                pathname: "/login",
                                state: {
                                  redl: props.props.props.item,
                                },
                              });
                        }
                      }}
                    />
                  </>
                )}

                {item.disliked ? (
                  <>
                    <p style={{ margin: 0 }}>
                      {item.dislikes&&item.dislikes.length}
                    </p>
                    <ThumbDownSharpIcon
                      style={{
                        width: "15px",
                    
                        color: "blue",
                      }}
                      className="hoverr"
                      onClick={() => {
                        axios
                          .post(
                            server+"/comment-undislike",
                            {
                              commentId: item._id,
                            token: localStorage.getItem("token")}
                          )
                          .then((response) => {
                            AddComments(response.data);
                            
                          });
                      }}
                    />
                  </>
                ) : (
                  <>
                  <p style={{ margin: 0 }}>
                      {item.dislikes&&item.dislikes.length}
                    </p>
                  <ThumbDownSharpIcon
                    style={{ width: "15px" }}
                    className="hoverr"
                    onClick={() => {
                      {
                        localStorage.getItem("token")
                          ? axios
                              .post(
                                server+"/comment-dislike",
                                { commentId: item._id ,token: localStorage.getItem("token")}
                              )
                              .then((response) => {
                                AddComments(response.data);
                              })
                          : history.push({
                              pathname: "/login",
                              state: {
                                reds: props.props.props.item,
                              },
                            });
                      }
                    }}
                  /></>
                )}
                <p style={{ color: "blue" }}>reply</p>
              </div>
            </>
          );
        })}
    </div>
  );
}

export default Comments;
