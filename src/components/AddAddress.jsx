import React, { useRef } from 'react'
import "../AddAddress.css"
import { Link } from 'react-router-dom'
function AddAddress({selectedAddress,handleSelectedAddress,handleRemoveAddress,addedAddress, handleAddAddressState}) {
    const addressRef = useRef();
  return (
    <div className='a-a-c'>
        <div className="addresses">
            {addedAddress.map((address , index)=>{
                return <div ref={addressRef} key={index} className={`address ${selectedAddress === address ? "address-selected" : ""}`} onClick={()=>handleSelectedAddress(address )}>
                <div className="adress-text">{address.address}</div>
                <div className="address-edit" onClick={()=>handleRemoveAddress(index)} >delete</div>
                </div>
            })}
            
        </div>
       <button onClick={()=> handleAddAddressState()} className='add-address'>Add adress <span>+</span></button>
    </div>
    
  )
}

export default AddAddress