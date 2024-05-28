import React, { useState } from 'react'
import { itemslist } from '../utils/Itemslist'
import './Items.scss'
import { MdCurrencyRupee } from "react-icons/md";
import Popup from './Popup';

const Items = () => {

    const [showModal,setShowModal] = useState(false);


    function toggleModal(){
        setShowModal(!showModal)
    }
    function placeOrder(url,price,remarks){
        console.log(url);
        console.log(price);
        console.log(remarks);

        let redirecturl ='https://api.whatsapp.com/send?phone=9849888788&text=%0a Price : ' +price+ '%0aCustomizations : '+remarks+'%0a %0a'+url;
        setTimeout(()=>{
            window.location.href=redirecturl;
        },500)
        toggleModal();
    }
  return (
    <>
         <div className='itemsdiv mt-4'>
            {itemslist.map((item, i) => (
                <div className='itemcontainer' onClick={()=>toggleModal()}>
                    <div>
                        <img src={item.imageurl} alt="keychain"  className='image'/>
                    </div>
                    <div key={i} className='mx-3 mt-2 price'>
                    <MdCurrencyRupee /> {item.price}
                    </div>
                    <div className='fs-10 d-flex justify-content-center'>
                        click on image to order
                    </div>
                    <Popup toggle={showModal} toggleModal={toggleModal} data={item} doorder={placeOrder}/>
                </div>
                
                
            ))}
            
        </div>
    </>
  )
}

export default Items