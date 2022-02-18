import React, { useEffect, useState } from 'react'
import Header from '../../Componets/Header/Header'
import './Search.css'
import Sidebar from "../../Componets/Sidebar/Sidebar";
import SearchBody from './SearchBody';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from "../../../server";
export default function Search(props) {


    let[searchResult,setSearchResult]=useState()
    let { searchTerm } = useParams(); 
    // setState(searchTerm);
    useEffect(()=>{
        axios
        .post(server+"/search", { input: searchTerm,token:localStorage.getItem("token")})
        .then((response) => {
            setSearchResult(response.data)
        })
    },[])
    return (
        <>
           <Header searchValue={searchTerm} />
           <div className="searchPage">
               <Sidebar/>
           {searchResult&&<SearchBody searchResult={searchResult}/>}
           </div>
        </>
    )
}
