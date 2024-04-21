'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Navbar() {
    const pathname = usePathname()

    const links = [
        {text:'Dashboard', link:'/'},
        {text:'Log', link:'/log'},
        {text:'Search', link:'/search'},
        {text:'Add Entry', link:'/add'}
    ]

    const linkClass = (path:String)=> `text-white mt-2 border border-white rounded-lg transition duration-500 p-2 w-9/12 ${pathname === path ? 'bg-green' : 'bg-gray'}-400`


  return (
    <div className=' bg-prui-grey h-full text-center w-48'>
        <h1 className='text-white'>PFT</h1>
        <div className='flex mt-10 justify-center flex-col items-center'>
            {links.map((link, key)=>{
                return <Link key={key} className={linkClass(link.link)} href={link.link}>{link.text}</Link>
            })}
        </div>
    </div>
  )
}
