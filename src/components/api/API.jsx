import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


let useProducts = () =>{
    let [data,setdata] = useState([])

    useEffect(()=>{
        axios.get(process.env.REACT_APP_API_URL+"products")
        .then(function(succ){
        setdata(succ.data)
        })
        .catch(function(err){
        console.log(err);
        })

    },[])
    
    return (data)
} 

let useOrders = () =>{
    let [data,setdata] = useState([])

    useEffect(()=>{
        axios.get(process.env.REACT_APP_API_URL+"orders")
        .then(function(succ){
        setdata(succ.data)
        })
        .catch(function(err){
        console.log(err);
        })

    },[])
    
    return (data)
} 

let useProductById = (id) => {
  
  let [data,setdata] = useState([])
  
  useEffect(()=>{
    axios.get(process.env.REACT_APP_API_URL+"products/"+1)
    .then(function(succ){
      setdata(succ.data)
    })
    .catch(function(err){
    console.log(err);
    })

  },[])

  return data
}



function API() {
  return (
    <>API</>
  )
}

export {API,useProducts,useOrders,useProductById}