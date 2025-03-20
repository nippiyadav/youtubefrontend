import React, { forwardRef } from 'react';

interface InputProps {
    className?: string;
    placeholder?: string;
    onchange: (e:string)=>void;
}

const  Input = forwardRef<HTMLInputElement,InputProps>(({onchange,...props},ref)=>{
  return (
    <input className={` px-4 py-2 w-full ${props.className}`} onChange={(e)=> onchange(e.target.value)} ref={ref} placeholder='Searching...' type='search'/>
  )
})

export default Input