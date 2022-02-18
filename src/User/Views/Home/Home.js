import React from "react";
import Header from "../../Componets/Header/Header";
import RecomentedVideo from "../../Componets/RecomentedVideo/RecomentedVideo";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import './Home.css'


export default function Home() {
  
//   const[state,setstate] =useState([])
// useEffect(()=>{
//   axios.post('/',{},{
//     headers:{
//       "x-access-token": localStorage.getItem("token")
//     }
//   })
//   .then(res => {
// setstate(res.data)
//   }
//   )
//   .catch(err =>{
//     console.log(err);
//   })
// },[])
  return (
    <div className="home">
      <Header/>
      <div className="app_page">
        <Sidebar Home={true}/>
          <RecomentedVideo/>
      </div>
    </div>
  );
}
