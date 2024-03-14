import axios from 'axios'
import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useProducts } from '../components/api/API'



// rder ID, customer name, order date, and status, 
function Order() {
  let [orders,setOrders] = useState([])
  
  // For Updating data
  const [seed, setSeed] = useState(1);
  const reset = () => {
       setSeed(Math.random());
  }

  function loadOrders(){
    axios.get(process.env.REACT_APP_API_URL+"orders")
    .then(function(success){
      setOrders(success.data)
    })
    .catch(function(err){
      console.log(err)
    })
  }


  
  // Modal
  let [displayModal,setShowModal] = useState("none")
  let toggleShowModal = ()=>{

    if(displayModal == "none"){
      
      window.scrollTo(0, 0);
      window.document.body.style.overflow = 'hidden';
      setShowModal("flex")
    }else{
      window.document.body.style.overflow = 'auto';
      setShowModal("none")
    }
  }

  useEffect(()=>{
    return loadOrders
  },[seed])


  return (
    <>
      <div className="container">

        <OrderAdd reset={reset}/>
        <OrderData reset={reset} orders={orders} displayModal={displayModal} toggleShowModal={toggleShowModal}/>
      </div>

    </>
  )
}


function OrderAdd({reset}) {

  let products = useProducts()

  let inputName = useRef()
  let inputDate = useRef()
  let inputProductId = useRef()
   


  function addOrder(e){
      e.preventDefault()
      
      let product = JSON.parse(inputProductId.current.value)

      let formdata = {
        name:inputName.current.value,
        date:inputDate.current.value,
        status:"Pending",
        
        productId:product.id,
        productName:product.name,
        productPrice:product.price,
      }

      console.log(formdata);
      

      axios.post(process.env.REACT_APP_API_URL+'orders',formdata)
      .then(function(succ){
          reset()
          alert("Order Added")
      })
      .catch(function(err){
      console.log(err);
      })

      
  }
return (
  <>

<div className="container p-2">

<h2>Add Orders</h2>

<form onSubmit={addOrder} className=' '>

  <div className=" grid sm:grid-cols-2">

      <div className="w-1/2  flex flex-col justify-center    ">
        <label className=' mr-1' htmlFor="name">Enter Name</label>
        <input type="text" name="name" id="name" className='p-1 my-2 rounded-md text-black' placeholder='Enter Name' required  ref={inputName}  />
      </div>
      
      <div className="w-1/2  flex flex-col justify-center    ">
        <label  className=' mr-1'  htmlFor="name">Enter Order Date</label>
        <input type="date" name="size" id="size" className='p-1 my-2 rounded-md text-black' placeholder='Enter Size' required ref={inputDate}/>
      </div>

      <div className="w-1/2  flex flex-col justify-center     ">
        <label  className=' mr-1'  htmlFor="name">Select Product</label>

        <select name="thumbnail" id="" className='p-1 my-2 rounded-md text-black' placeholder='Enter Thumbnail Link' required ref={inputProductId}>
            {products.map((e,key)=>
            <option key={key} value={JSON.stringify(e)}>
              {e.name}
            </option>
            )}
        </select>
      </div>
      
      
    </div>
    {/* <div className="w-1/2 flex flex-col">
      <label  className=' mr-1'  htmlFor="name">Enter Category</label>
      <input type="text" name="category" className='p-1 my-2 rounded-md text-black' placeholder='Enter Category' id=""  required/>
    </div> */}

  <button className="p-1 my-2 w-1/2 border-2 border-blue-400 hover:bg-blue-400 hover:text-black rounded-md"
      // onClick={addOrder}
      >Add</button>
  
</form>

</div>

  </>
)
}


function OrderData({reset,orders,displayModal,toggleShowModal}) {

  
  
  const inputRef = useRef(null)

  let updateOrderid =         useRef(null);
  let updateOrderName =       useRef(null);
  let updateOrderStatus =  useRef(null);
  let updateOrderDate =      useRef(null);
  let updateProduct =      useRef(null);
  let updateProductName = useRef(null)
  let updateProductPrice = useRef(null)


  let deleteOrderBtn = (e) =>{
    e.preventDefault()
    let id = e.target.getAttribute('data-id')

    let con = window.confirm("Delete "+id+"?")


    if(con){      
      
      axios.delete(process.env.REACT_APP_API_URL+"orders/"+id)
      .then((succ)=>{
          alert("Deleted")
          reset()          
      })
      .catch((err)=>{
        console.log(err)
      })
      
    }else{
      alert("Not Deleted")
    }
  }

  let updateOrderBtn = (e)=>{
    e.preventDefault()

    toggleShowModal()

    let parentDiv = e.target.parentElement.parentElement.children
    // console.log(parentDiv);
    let customerName = parentDiv[1].textContent
    let productName = parentDiv[2].textContent
    let date = parentDiv[3].textContent
    let productPrice = parentDiv[4].textContent
    let status = parentDiv[5].textContent
    let productId = parentDiv[6].textContent
    
    
    {/*id
    name
    status
    orderdate
    pid
    pname
    pprice */}
    updateOrderid.current.value = e.target.getAttribute("data-id")
    updateOrderName.current.value = customerName
    updateOrderStatus.current.value = status
    updateOrderDate.current.value = date
    updateProduct.current.value = productId

    updateProductName.current.value = productName
    updateProductPrice.current.value = productPrice 
    
  }
  
  let updateOrderModalBtn = (e)=>{
    e.preventDefault()
    
    let id = updateOrderid.current.value  //for update
    
    let name = updateOrderName.current.value 
    let date = updateOrderDate.current.value 
    let status = updateOrderStatus.current.value 
    let productId = updateProduct.current.value 
    
    let productName = updateProductName.current.value 
    let productPrice = updateProductPrice.current.value 

    let obj = {
        name:name,
        date:date,
        status:status,
        productId:productId,
        productName:productName,
        productPrice:productPrice,
      }
      console.log(obj);


      axios.put(process.env.REACT_APP_API_URL+"orders/"+id,obj)
      .then((succ)=>{
        
        alert("Order Updated Successfully")
        reset()
        toggleShowModal()
      })
      .then((err)=>{
        console.log(err);
      })
      
      
      
    }


    
    
    // TURNING PRODUCT INTO AN ASSOCIATIVE ARRAY FOR DISPLAY 
    let products = useProducts()
    console.log(products);
    let assProduct = products.map(x => [x.id, x])
    let assProduct2 = []
    for (const ass of assProduct) {    
      assProduct2[ass[0]] = ass[1]
    }
    
    // HELPER FUNCTION FOR PRODUCT NAME
    function returnProductName(id){
      try {
        
        let val = assProduct2[id]
        if(typeof(val) == undefined){
          return "PRODUCT"
        }else{
          return assProduct2[id].name
        }
      } catch (error) {
        return "PRODUCT"
      }
    } 
    
    function returnProductPrice(id){
      let val = assProduct2[id]
      try {
        if(typeof(val) == undefined){
          return "PRODUCT"
        }else{
          return assProduct2[id].price
        }
        // return assProduct2[id].price
      } catch (error) {
        return "PRICE"
      }
    } 

  let no = 1

  return (
  <>     
  <div className='tableContainer'>

      {/* Modal */}
      <div className='updateModalProduct'
        style={{display:displayModal}}
        >
          <div className='updateModalContent w-full sm:w-1/3 rounded-lg'>
              <div className="flex flex-row  align-middle w-full justify-between p-4">
                  <h2 className=' text-2xl font-bold'>Update Product</h2>
                  <button className='text-3xl hover:bg-[#3f3f3f] p-1'
                    onClick={toggleShowModal}
                    > 
                    {/* <IoMdClose/> */}
                    X
                     </button>
              </div>

              <div className="flex flex-col space-y-2 p-5" ref={inputRef}>

                {/*id
                name
                status
                orderdate
                pid
                pname
                pprice */}
                  <input className='p-2 rounded-md text-black' ref={updateOrderid} type="text"  placeholder='Enter ID' disabled hidden/>
                  <input className='p-2 rounded-md text-black' ref={updateOrderName} type="text"  placeholder='Enter Name' />



                  {/* <input className='p-2 rounded-md text-black' ref={updateOrderStatus} type="text"  placeholder='Enter Status' /> */}

                  <select className='p-2 rounded-md text-black' ref={updateOrderStatus}>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancel">Cancel</option>
                  </select>
                  
                  <input className='p-2 rounded-md text-black' ref={updateOrderDate} type="date"  placeholder='Enter Orderdate'  />
                  
                  
                  {/* <input className='p-2 rounded-md text-black' ref={updateProduct} type="text"  placeholder='Enter Product'  /> */}

                  <select className='p-2 rounded-md text-black' ref={updateProduct}>
                    {products.map((p,key)=>
                      <option key={key} value={p.id}>{p.name}</option>
                    )}
                  </select>
                  




                  <input className='p-2 rounded-md text-black' ref={updateProductName} type="text"  placeholder='Enter Product name'  hidden/>
                  <input className='p-2 rounded-md text-black' ref={updateProductPrice} type="text"  placeholder='Enter Product price'  hidden/>
                  

                  <button
                      className='bg-[#121212] p-2 rounded-lg hover:bg-[#3f3f3f]'
                      onClick={updateOrderModalBtn}
                      >Update</button>
              </div>
          </div>            
      </div>


      <h2 className='text-2xl'>Orders</h2>
        <table border={2} className='container text-center text-sm' >
        <thead>
        <tr>
          <td>No</td>
          <td>Customer Name</td>
          <td>Product Name</td>
          <td>Order Date</td>
          <td>Price</td>
          <td>Status</td>
          <td hidden>ProductId</td>

          <td colSpan={2}>Operation</td>
        </tr>
        </thead>
      <tbody>
        {orders.map((data,key)=>
          <tr key={key}>
            <td>{no++}</td>
            <td>{data.name}</td>
            
            <td>{returnProductName(data.productId)}</td>
            <td>{data.date}</td>
            
            <td>{returnProductPrice(data.productId)}</td>
            <td>{data.status}</td>
            <td hidden>{data.productId}</td>


            <td><button className="border-2 border-blue-400 p-2 rounded-md" data-id={data.id} id="OrderEditBtn"   
            onClick={updateOrderBtn}>Update</button></td>
            <td><button className="border-2 border-blue-400 p-2 rounded-md" data-id={data.id} id="OrderDeleteBtn" onClick={deleteOrderBtn}>Delete</button></td>
          </tr>
        )}
      </tbody>
        </table>
  </div>
  </>
  )
}

export default Order