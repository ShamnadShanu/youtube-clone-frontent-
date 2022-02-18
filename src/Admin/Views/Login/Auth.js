import React,{useState} from 'react'

function Auth() {
    function Authenticate(){
        if(localStorage.getItem("admin")){
return true    
}else{
    return false
    }

    }
}

export default Auth
