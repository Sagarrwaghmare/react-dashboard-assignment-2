import React, { useRef } from 'react'
import { useEffect,useState } from 'react';
import axios from "axios";

// import { IoMdClose } from "react-icons/io";
import Loader from '../components/Loader';






function Products() {
  // DISPLAY PRODUCT
  let [data,setdata] = useState([])

  let getData = () =>{
    axios.get(process.env.REACT_APP_API_URL+"products")
    .then(function(succ){
      setdata(succ.data)
    })
    .catch(function(err){
      console.log(err);
    })
  }
  
  // For Updating data
  const [seed, setSeed] = useState(1);
  const reset = () => {
       setSeed(Math.random());
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

  let [loader,setLoader] =useState(false)

  useEffect(() => {
    getData()
    setTimeout(() => {
      setLoader(true)
    }, 10);
    return console.log("hi");
  },[seed])
  
  return (
    < >

          <Loader loader={loader} div={<>
            <ProductAdd reset={reset} />
            <ProductData data={data} reset={reset} displayModal={displayModal}  toggleShowModal={toggleShowModal}/>
          </>}  />
     

    </>
  )
}


function ProductAdd({reset}) {


  let inputName = useRef()
  let inputSize = useRef()
  let inputPrice = useRef()
  let inputThumbnail = useRef()
  let inputBrand = useRef()


  // ADD PRODUCT

  function addProducts(e){
    e.preventDefault()

    let obj = 
    {
      name:inputName.current.value,
      size:inputSize.current.value,
      price:inputPrice.current.value,
      thumbnail:inputThumbnail.current.value,
      brand:inputBrand.current.value
    }

    console.log(obj);
    axios.post(process.env.REACT_APP_API_URL+'products',obj)
    .then(function(succ){
      reset()
      alert("Product Added")
    })
    .catch(function(err){
      console.log(err);
    })

  }
  return (
    <div className="container p-2">

          <h2>Add Product</h2>

          <form onSubmit={addProducts} className=' '>

            <div className=" grid sm:grid-cols-2">

                <div className="w-1/2  flex flex-col justify-center    ">
                  <label className=' mr-1' htmlFor="name">Enter Name</label>
                  <input type="text" name="name" id="name" className='p-1 my-2 rounded-md text-black' placeholder='Enter Name' required  ref={inputName}  />
                </div>
                
                <div className="w-1/2  flex flex-col justify-center    ">
                  <label  className=' mr-1'  htmlFor="name">Enter Size</label>
                  <input type="number" name="size" id="size" className='p-1 my-2 rounded-md text-black' placeholder='Enter Size' required ref={inputSize}/>
                </div>

                <div className="w-1/2  flex flex-col justify-center     ">
                  <label  className=' mr-1'  htmlFor="name">Enter Thumbnail</label>
                  <input type="text" name="thumbnail"className='p-1 my-2 rounded-md text-black' placeholder='Enter Thumbnail Link' id=""  required ref={inputThumbnail}/>
                </div>
                
                <div className="w-1/2   flex flex-col justify-center    ">
                  <label  className=' mr-1'  htmlFor="name">Enter Price</label>
                  <input type="number" name="price"    className='p-1 my-2 rounded-md text-black' placeholder='Enter Price' id=""  required ref={inputPrice}/>
                </div>

                <div className="w-1/2   flex flex-col justify-center    ">
                  <label   className=' mr-1' htmlFor="name">Enter Brand</label>
                  <input type="text" name="brand"    className='p-1 my-2 rounded-md text-black' placeholder='Enter Brand' id=""  required ref={inputBrand}/>
                </div>             
                
              </div>
              {/* <div className="w-1/2 flex flex-col">
                <label  className=' mr-1'  htmlFor="name">Enter Category</label>
                <input type="text" name="category" className='p-1 my-2 rounded-md text-black' placeholder='Enter Category' id=""  required/>
              </div> */}

            <button className="p-1 my-2 w-1/2 border-2 border-blue-400 hover:bg-blue-400 hover:text-black rounded-md">Add</button>
            
          </form>

    </div>
  )
}


function ProductData({data,reset,displayModal,toggleShowModal}) {
  const inputRef = useRef(null)


  let updateInputId =         useRef(null);
  let updateInputName =       useRef(null);
  let updateInputThumbnail =  useRef(null);
  let updateInputBrand =      useRef(null);
  let updateInputStock =      useRef(null);
  let updateInputPrice =      useRef(null);


    
  let ProductDeleteBtn = (e)=>{
    e.preventDefault()

    let id = e.target.getAttribute('data-id')

    let con = window.confirm("Delete "+id+"?")
    
    if(con){
      axios.delete(process.env.REACT_APP_API_URL+"products/"+id)
      .then((succ)=>{
          alert("Record was deleted")
          reset()          
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  } 

  let ProductEditBtn = (e)=>{
    e.preventDefault()
    
    let id = e.target.getAttribute('data-id') //can use btn data-id  

    let parentDiv = e.target.parentElement.parentElement.children

    // DO NOT CHANGE ORDER OF INPUT IN FORM(OR UPDATE WILL MALFUNCTION)
    {/*id 
    name
    thumbnail
    brand
    stock
    price */}
    let name = parentDiv[2].textContent
    let thumbnail = parentDiv[1].children[0].getAttribute("src");
    let brand = parentDiv[3].textContent;
    let size = parentDiv[4].textContent
    let price = parentDiv[5].children[1].textContent;
  

    
    toggleShowModal()

    updateInputId.current.value = id //should use this insted of data-id
    updateInputName.current.value = name
    updateInputThumbnail.current.value = thumbnail 
    updateInputBrand.current.value = brand
    updateInputStock.current.value = size
    updateInputPrice.current.value = price
  }

  let updateProductDetails = (e)=>{
    e.preventDefault()

    let Id = updateInputId.current.value;
    let Name = updateInputName.current.value;
    let Thumbnail = updateInputThumbnail.current.value;
    let Brand = updateInputBrand.current.value;
    let Stock = updateInputStock.current.value;
    let Price = updateInputPrice.current.value;

    let obj = {
      name:Name,
      thumbnail:Thumbnail,
      brand:Brand,
      size:Stock,
      price:Price}

    axios.put(process.env.REACT_APP_API_URL+"products/"+Id,obj)
    .then((succ)=>{
      
      alert("Record Updated Successfully")
      reset()
      toggleShowModal()
    })
    .then((err)=>{
      console.log(err);
    })

  }
  
  let no = 1

  return (
    <div className='tableContainer'>

      {/* Modal */}
      <div className='updateModalProduct'
        style={{display:displayModal}}
        >
          <div className='updateModalContent w-full sm:w-1/3 rounded-lg'
              
          >
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
                thumbnail
                brand
                stock
                price */}
                  <input className='p-2 rounded-md text-black' ref={updateInputId} type="text"  placeholder='Enter ID' disabled hidden/>
                  <input className='p-2 rounded-md text-black' ref={updateInputName} type="text"  placeholder='Enter Name' />
                  <input className='p-2 rounded-md text-black' ref={updateInputThumbnail} type="text"  placeholder='Enter Thumbnail' />
                  <input className='p-2 rounded-md text-black' ref={updateInputBrand} type="text"  placeholder='Enter Brand'  />
                  <input className='p-2 rounded-md text-black' ref={updateInputStock} type="text"  placeholder='Enter Stock'  />
                  <input className='p-2 rounded-md text-black' ref={updateInputPrice} type="text"  placeholder='Enter Price'  />


                  <button
                      className='bg-[#121212] p-2 rounded-lg hover:bg-[#3f3f3f]'
                      onClick={updateProductDetails}
                      >Update</button>
              </div>
          </div>            
      </div>

        <h2 className='text-2xl'>Products</h2>
          <table border={2} className='container text-center text-sm' >
            <thead>
              <tr >
                <th>Id</th>
                <th>Thumbnail</th>
                <th>Name</th>
                <th hidden>Brand</th>

                <th>Stock</th>
                <th>Price</th>
                <th colSpan={2}>Operation</th>
              </tr>
            </thead>      
            <tbody>
                {data.map((d,key)=> 
                    <tr key={key}>
                    
                    <td>{no++}</td>
                    <td className=' flex items-center justify-center'><img src={d.thumbnail} alt={d.name+".jpg"} style={{height:"60px"}} width={80} className='rounded-full' /></td>
                    <td>{d.name}</td>
                    <td>{d.brand}</td>

                    <td>{d.size}</td>
                    <td>
                      <span>$</span>
                      <span>{d.price}</span>
                    </td>
                    
                    <td><button className="p-2 border-2 border-blue-400 rounded-md hover:bg-blue-400 hover:text-black" data-id={d.id} onClick={ProductEditBtn}>Update</button></td>
                    <td><button className="p-2 border-2 border-blue-400 rounded-md hover:bg-blue-400 hover:text-black" data-id={d.id} onClick={ProductDeleteBtn}>Delete</button></td>
                    </tr>
                )}
            </tbody>
          </table>
    </div>
  )
}



export default Products






