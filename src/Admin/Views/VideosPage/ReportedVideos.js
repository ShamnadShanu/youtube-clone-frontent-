import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import "./bootstrap.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useEffect } from "react";
import axios from "axios";
import "./UserPage.css";
// const server="http://localhost:8000/admin"
const server="https://y-clone.xyz/admin"

function ReportedVideos() {
  let [Reports, setReports] = useState([]);
  useEffect(() => {
    axios.get(server+"/Reported").then((response) => {
      console.log(response.data);
      setReports(response.data);
    });
  }, []);
  return (
    <div className="all_users">
      <Navbar />
      <h1>All Users</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Channel</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Reports.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.channelName}</td>
                {item.block ? (
                  <td
                    onClick={() => {
                      axios
                        .get(server+"/video-unblock", {
                          params: {
                            id: item._id,
                          },
                        })
                        .then((response) => {
                          setReports(response.data);
                        });
                    }}
                    className="btn btn-success"
                  >
                    unblock
                  </td>
                ) : (
                  <td
                    onClick={() => {
                      axios
                        .get(server+"/video-block", {
                          params: {
                            id: item._id,
                          },
                        })
                        .then((response) => {
                          setReports(response.data);
                        });
                    }}
                    className="btn btn-danger"
                  >
                    block
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ReportedVideos;
