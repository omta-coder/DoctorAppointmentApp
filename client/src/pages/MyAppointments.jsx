import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {
  const {doctors} = useContext(AppContext)
  return (
    <div>
      <p>My appointments</p>
      <div>
        {
          doctors.slice(0,2).map((index,item)=>(
            <div key={index}>
              <div>
                <img src={item.image} alt="" />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments