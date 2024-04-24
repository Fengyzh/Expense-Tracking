"use client"

import React, { useState } from 'react'
import Form from '../comp/Form';

export default function EditPage() {

  return (
    <div className='h-full w-full'>
      <Form data={{title:"Edit Entry", type:"edit"}}/>

    </div>
  )
}
