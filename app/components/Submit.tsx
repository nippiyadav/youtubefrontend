import React from 'react'

interface ButtonProps{
    text?:string;
    classname?:string;
    type?:"submit"|"reset"|"button"
}
function Button({classname,text="Submit",type="submit"}:ButtonProps) {
  return (
    <div className='flex justify-center items-center'>
    <button className={`w-fit bg-blue-400 hover:bg-blue-500 text-xl font-bold px-6 py-3 rounded-md shadow-md ${classname}`} type={type}>
        {text}
    </button>
    </div>
  )
}

export default Button