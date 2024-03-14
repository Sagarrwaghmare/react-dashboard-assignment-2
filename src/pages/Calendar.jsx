import React from 'react'
// import 'react-calendar/dist/Calendar.css';


// import DatePicker from "react-multi-date-picker";
import { useOrders } from '../components/api/API';



function CalendarView() {
  // let values = [new Date('3/1/2024'), new Date('3/15/2024'), new Date('3/10/2024'), new Date('3/25/2024')]
  let values = [new Date('3/25/2024')]
  // console.log(new Date());

  let orders = useOrders()
  let dates = orders.map(function(d){
    let val = d.date.split("-")

    let date = new Date(val[1]+"/"+val[2]+"/"+val[0])
    
    return date
    // 0009-09-09', '2024-03-29', '2024-03-29', '2024-03-22'
  })
  

  for (const d of dates) {
    values.push(d)
    
  }

  console.log((values));
  
  let pickDate = (e)=>[
    console.log(e)
  ]
  return (
    <div>
        <h2 className='font-bold text-2xl'>Calendar</h2>

        <div className='w-[320px]  p-2 rounded-lg text-black'>
          {/* <DatePicker value={values} 


            onChange={pickDate}
            editable={false}          
            
            // map
            />; */}
            
        </div>
    </div>
  )
}

export default CalendarView