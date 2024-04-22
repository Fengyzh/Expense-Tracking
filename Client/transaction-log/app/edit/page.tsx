"use client"

import React, { useState } from 'react'

export default function EditPage() {

  let currentDate = new Date().toJSON().slice(0, 10);


  // TODO, get the value from the "CurTransaction" in context
  const inputBlocks = [
    {labelText: "Date", inputType:"date", isReq:true, value:currentDate},
    {labelText: "Item Name", inputType:"text", isReq:true, value:""},
    {labelText: "Price", inputType:"number", isReq:true, value:""},
    {labelText: "Amount", inputType:"number", isReq:true, value:""},
    {labelText: "Category", inputType:"text", isReq:true, value:""},
    {labelText: "Note", inputType:"text", isReq:false, value:""},
    {labelText: "Purpose", inputType:"text", isReq:false, value:""},
  ]

  let payload = {date:"", name: "", price: "", amount:"", category:"", note:"", purpose:""}  


  const handleAdd = (e:React.ChangeEvent<HTMLInputElement>, label:String) => {
    switch(label) {
      case("Date"):
        payload.date = e.currentTarget.value
      case ("Item Name"):
        payload.name = e.currentTarget.value
      case ("Price"):
        payload.price = e.currentTarget.value
      case ("Amount"):
        payload.amount = e.currentTarget.value
      case ("Category"):
        payload.category = e.currentTarget.value  
      case ("Note"):
        payload.note = e.currentTarget.value
      case ("Purpose"):
        payload.purpose = e.currentTarget.value
    } 

  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!payload.date) {
      payload.date = currentDate
    }
  }



  return (
    <div className='h-full w-full'>
      <div className='m-0 flex text-3xl font-bold justify-center items-center'>
        <h1> Add New Entry </h1>
      </div>

      <form className='m-10' onSubmit={(e)=>handleSubmit(e)}>
        {inputBlocks.map((item, key)=> {
          return  (
          <div key={key} className='flex flex-col mb-5'>
            <label className='mb-2'> {item.labelText} </label>
            <input placeholder='input Here' onChange={(e)=>handleAdd(e, item.labelText)} defaultValue={item.value} type={item.inputType} required={item.isReq}/>
        </div>
        )
        })}

      <button type="submit" className='mt-10 bg-green-400 border w-32 h-10 rounded-lg text-white'> Add Entry </button>
      </form>



    </div>
  )
}
