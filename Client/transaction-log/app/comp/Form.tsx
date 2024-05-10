"use client"

import React from 'react'
import axios from 'axios';
import { useTransaction } from './TransactionContext';

interface IFormProp {
    data: {title:String, type:String}
}




export default function Form({data}:IFormProp) {

  let currentDate = new Date().toJSON().slice(0, 10);

  const context = useTransaction();

  if (!context) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }

  const { curTransaction } = context;

const inputBlocks = [
    {labelText: "Date", inputType:"date", isReq:true, value:curTransaction?.date? curTransaction.date : currentDate},
    {labelText: "Item Name", inputType:"text", isReq:true, value:curTransaction?.name? curTransaction.name : ""},
    {labelText: "Price", inputType:"number", isReq:true, value:curTransaction?.price? curTransaction.price:""},
    {labelText: "Amount", inputType:"number", isReq:true, value:curTransaction?.amount? curTransaction.amount:""},
    {labelText: "Category", inputType:"text", isReq:true, value:curTransaction?.category? curTransaction.category:""},
    {labelText: "Note", inputType:"text", isReq:false, value:curTransaction?.note? curTransaction.note:""},
    {labelText: "Purpose", inputType:"text", isReq:false, value:curTransaction?.purpose? curTransaction.purpose:""},
    {labelText: "Store Name", inputType:"text", isReq:true, value:curTransaction?.store_name?.storeName? curTransaction.store_name.storeName:""},
    {labelText: "Store Address", inputType:"text", isReq:true, value:curTransaction?.store_name?.address? curTransaction.store_name.address:""}
    ]



  let payload = {id:curTransaction?.id, date:inputBlocks[0].value, name: inputBlocks[1].value, price: inputBlocks[2].value, amount:inputBlocks[3].value, category:inputBlocks[4].value, note:inputBlocks[5].value, purpose:inputBlocks[6].value, store_name:{storeName:inputBlocks[7].value, address:inputBlocks[8].value}}  


  const handleAdd = (e:React.ChangeEvent<HTMLInputElement>, label:String) => {
    console.log(label, e.currentTarget.value, payload)
    switch(label) {
      case("Date"):
        payload.date = e.currentTarget.value
        break;
      case ("Item Name"):
        payload.name = e.currentTarget.value
        break;
      case ("Price"):
        payload.price = e.currentTarget.value
        break;
      case ("Amount"):
        payload.amount = e.currentTarget.value
        break;
      case ("Category"):
        payload.category = e.currentTarget.value
        break;
      case ("Note"):
        payload.note = e.currentTarget.value
        break;
      case ("Purpose"):
        payload.purpose = e.currentTarget.value
        break;
      case ("Store Name"):
        payload.store_name.storeName = e.currentTarget.value
        break;
      case ("Store Address"):
        payload.store_name.address = e.currentTarget.value
        break;
    } 
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (data.type == 'add') {
      if (!payload.date) {
        payload.date = currentDate
      }

      console.log(payload)
      axios.post("http://localhost:8080", payload).then((res)=> {
        console.log(res)
      })
    } else {
      console.log(payload.id)
      axios.post("http://localhost:8080/update", payload).then((res)=> {
        console.log(res)
      })
    }



  }

  const handleClearForm = () => {
    console.log("clear")
    let inputs:HTMLInputElement[] = Array.from(document.getElementsByClassName("form-inputs")) as HTMLInputElement[]
    for (let i = 0; i < inputs.length; i ++) {
        inputs[i].value=""
    }
  }



  return (
    <div className='h-full w-full'>
      <div className='m-0 flex text-3xl font-bold justify-center items-center'>
        <h1> {data.title} </h1>
      </div>
      <button className='ml-10 mt-10 bg-red-400 border w-32 h-10 rounded-lg text-white' onClick={()=>handleClearForm()}> Clear Form </button>
      <form className='m-10' onSubmit={(e)=>handleSubmit(e)}>
        {inputBlocks.map((item, key)=> {
          return  (
          <div key={key} className='flex flex-col mb-5'>
            <label className='mb-2'> {item.labelText} </label>
            <input className='form-inputs' placeholder='input Here' onChange={(e)=>handleAdd(e, item.labelText)} defaultValue={item.value} type={item.inputType} required={item.isReq}/>
        </div>
        )
        })}

      <button type="submit" className='mt-10 bg-green-400 border w-32 h-10 rounded-lg text-white'> {data.type=='add'?"Add Entry" : "Update Entry"} </button>
      </form>



    </div>
  )
}
