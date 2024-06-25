import React, { useEffect } from 'react'
import sendRequestFunc from '../../../utils/sendRequestFunc'
import { BASEURL } from '../../../utils/URL'

const MyOrders = () => {

    const getAllOrders = async() => {
        const orders = await sendRequestFunc(`${BASEURL}/getAllOrders`,'GET');
        console.log(orders)
    }
    useEffect(()=>{
        getAllOrders();
    },[])
  return (
    <div>MyOrders</div>
  )
}

export default MyOrders