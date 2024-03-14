import React, { useState } from 'react'
// import { AiOutlineDropbox } from 'react-icons/ai'
import { useOrders, useProducts } from '../components/api/API'
import { useEffect } from 'react'
import Loader from '../components/Loader';

function Dashboard() {
  let products = useProducts()
  let orders = useOrders()

  let TotalStocks = products.map((p)=> p.size)

  let TotalStocksQuantity = 0
  for (const TS of TotalStocks) {TotalStocksQuantity += Number(TS)}

  let RevenueArr = orders.map((P)=>P.productPrice)
  let Revenue = 0
  for (const TS of RevenueArr) {if(TS!="PRICE"){Revenue += Number(TS)}}
  
  
  let [loader,setLoader] = useState(false)


  useEffect(()=>{

    setTimeout(() => {
      setLoader(true)
    }, 200);
    
  },[])
  

  return (
    <div className='dashboard flex flex-col'>

            <Loader loader={loader} div={
                <>
                  <h2 className='p-2 text-2xl font-bold'>Dashboard</h2>
                  <div className="cards-container flex flex-col sm:flex-row w-full justify-around items-center">
                  
                  <InnerCard Title={"PRODUCTS"} value={products.length} ICON={"ICON"} />
                  <InnerCard Title={"ORDERS"} value={orders.length} ICON={"ICON"}/>
                  <InnerCard Title={"REVENUE"} value={Revenue} ICON={"ICON"}/>
                  <InnerCard Title={"STOCK"} value={TotalStocksQuantity} ICON={"ICON"}/>
                  
                  </div>

                  <RecentOrders/>


                </>
            } />


    </div>

  )
}

function RecentOrders() {

  let orders = useOrders()
  orders = Object.entries(orders).slice(0,5).map(entry => entry[1]);

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
      return "Product"
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
      return "100"
    }
  } 




  let no = 1

  return (
    <div className='p-2'>
        <h2 className='text-2xl font-bold'>Orders</h2>
        <table className='container text-lg'>
          <thead>
            <tr>
              <td>No</td>
              <td>Name</td>
              <td>Product</td>
              <td>Price</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((o,key)=>

              <tr key={key}>
                  <td>{no++}</td>
                  <td>{o.name}</td>
                  <td>{returnProductName(o.productId)}</td>
                  <td>{returnProductPrice(o.productId)}</td>
              </tr>  

            )}
          </tbody>
        </table>
    </div>
  )
}






function InnerCard({Title,value,ICON}) {
  return (
    <div className="cards p-2 m-2 bg-gray-700 rounded-md "
            // min-w-[200] w-full sm:w-20 
            style={{width:"200px",height:"200px"}}
            >
          <h2 className='text-2xl font-bold '>{Title}</h2>
          <hr />
          <div className="card-inner flex flex-row justify-center items-center  w-full h-full text-6xl bottom-8 relative">
            <span>{value}</span>
            {/* {ICON} */}
          </div>
        </div>
  )
}


export default Dashboard