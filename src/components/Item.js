import React, { useState,useEffect } from 'react'
import dataItem from '../dataItem'
import '../style/item.css'

function Item() {
    let sum = 0
    
/// Because myData didn't consiste quantite and total i added them by hook 
    const[modData,setModData] = useState(
        dataItem.map(function(e){
            return (
                {
                    id: e.id,
                    quantity: 1,
                    name:e.name,
                    image: e.image,
                    price: e.price,
                    total:0
                }
            )
        })
    )

    function addItems (id){
        setModData (modData.map(function(e){
            if(e.id===id){
                e.quantity+=1
                e.total=e.price*e.quantity
            }
            return e
        }))
    }

    function minusItems (id){
        setModData (modData.map(function(e){
            if(e.id===id){
                if(e.quantity<=1){
                    e.total=0
                    e.quantity=1   
                } else{
                    e.quantity-=1
                    e.total=e.price*e.quantity   
                }  
            }
            return e
        }))
    }

/// Using arr it's gonna be push all totals from modData
 let arr = []
 pushIt()
 function pushIt (){
     modData.map((e)=>{
         arr.push(e.total)
     })
 }

getTotalSum(arr)
function getTotalSum(array){
    for(let e of array){
        sum+=e
    }
}
    

///////LOCAL STORAGE////////
useEffect(()=>{
    const localData = JSON.parse(localStorage.getItem('myItems'))
    if(localData){
        setModData(localData)
    }
    
},[])

useEffect(()=>{
    localStorage.setItem('myItems',JSON.stringify(modData))
})
////////////////////////////
    return (
        <div className = 'itemBlock' >
            <div className='left' >
            {modData.map((e)=>{
                return (
                    <div key={e.id} className='row' >
                        <div ><img src={e.image} alt=""/></div>
                        <div>
                            <div>{e.name}</div>
                            <div className='price' > $ {e.price}</div>
                        </div>    
                        <div className='btns_section' >
                            <div>Quantity</div>
                            <div className='btns'>
                                <button onClick = {() => {addItems(e.id)}} >+</button>
                                <div> {e.quantity}</div>
                                <button onClick = {() => {minusItems(e.id)}}>-</button>
                            </div>
                        </div>
                        <div className='section_total' >
                            <div  >Total</div>
                            <div className='total' > {e.total}</div>
                        </div>
                    </div> 
            )
            })}
         </div>
            <div className='right'>
                <h3>Order Summary</h3> 
                <div className='itemsPrice' >
                    <h4>Items {modData.length}</h4>
                    <h2 >
                      {sum}
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default Item


//1 Add Quantity
//2 Add Minus/Plus functions
//3 create array for subTotal
//4 Storage

