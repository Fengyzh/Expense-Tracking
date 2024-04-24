"use client"

import React, { useState } from 'react'
import axios from 'axios';
import Form from '../comp/Form';

export default function AddPage() {

 
  return (
    <div className='h-full w-full'>
      <Form data={{title:"Add New Entry", type:"add"}}/>
    </div>
  )
}
