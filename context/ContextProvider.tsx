"use client"

import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react';

// ye help in data ko predict karne mai, what types of data i will get in array and satisfy the typescripts
export interface MoodValueProps{
    mood:{
        name: string;
        emoji: string;
    },
    description: string;
    date: string;
}

// this help in what types of value and methods, are being sent which will be available all over the application where i will use useContext 
// moodValue bata rha hai ki is mai ek erray, jiske pas MoodValueProps object hoga
export interface moodContextProps{
    moodValue:MoodValueProps[],
    setMoodValue:React.Dispatch<React.SetStateAction<MoodValueProps[]>>
}

// hamane createContext ko type diya hai es liye hume a dome data dena hoga otherwise type script will give error
const moodContext = createContext<moodContextProps>(
{
    moodValue:[{
        mood:{
            emoji:"",
            name:""
        },
        date:"",
        description:""
    }],
    setMoodValue:()=> {},
}
);

function ContextProvider({children}:{children:React.ReactNode}) {
    // es useState ka use mai intial data fetching mai bhi kar sakta hu aur i will have to send what value this hold which must be same array holding Object
    const [moodValue,setMoodValue] = useState<MoodValueProps[]>([]);

    useEffect(()=>{
        const response = ()=>{
            const response = localStorage.getItem("userMoodTracker");
            console.log("userModeTracker_Response:- ", response);
            
            if (response !== null) {
                const jsonParse = JSON.parse(response)
                setMoodValue(jsonParse as MoodValueProps[])
                // return jsonParse as MoodValueProps[]
            }else{
                return []
            }
        }

        response()
    },[])

    useEffect(()=>{
        if (moodValue.length>0) {
            try {
                const response = localStorage.setItem("userMoodTracker",JSON.stringify(moodValue));
                console.log("Response after saving in the LocalStorage:- ", response);
            } catch (error) {
                console.log("Error in the time of saving value in localStorage:- ", error);
                
            }
        }else{
            // const response = localStorage.setItem("userMoodTracker",JSON.stringify([]));
            console.log("Error in the time saving ");
            
        }
    },[moodValue]);

    // monthly moodsaver
    useEffect(()=>{
        const singleValueMoodSaver = ()=>{
            const userMoodTrackerData:MoodValueProps[] = JSON.parse(localStorage.getItem("userMoodTracker")??"[]");

            const allPreviousValueExceptToday = userMoodTrackerData.filter((data,index)=>{
                const todayDate = new Date()
                return data.date !== todayDate.toString();
            });

            console.log("allPreviousValueExceptToday:- ",allPreviousValueExceptToday);

            const knowingAverageMood = allPreviousValueExceptToday.reduce((prev,curr,index)=>{
                console.log(prev,index);
                prev.some((data,index)=>{
                    console.log("Data in Some:- ", data.mood);
                });

                if (prev.some((data,index)=> data.mood === curr.mood.name)) {
                    console.log("inside the some condition passed:- ", prev);

                    const modifiedValue = prev.map((data,index)=> data.mood === curr.mood.name?{...data,count:data.count++}:data);

                    console.log("modifiedValue:- ", modifiedValue);
                    
                    // const newData = {
                    //     mood:curr.mood.name,
                    //     count:
                    // }
                    
                }

                const newData = {
                    mood:curr.mood.name,
                    count:0
                }
                return [...prev,newData]
                
            },[] as {mood:string,count:number}[])
            
        }
        singleValueMoodSaver()
    },[]);

    return (
        <moodContext.Provider value={{moodValue,setMoodValue}}>
            {children}
        </moodContext.Provider>
    )
}

export default ContextProvider

// we are doing this because it help in solving problem of repeat code again and again because if we do not use then we have to use useContent this again and again
export const useMoodContextValue = ()=>{
    const value = useContext(moodContext);
    if (!value) {
        throw Error("ContextProvider not wraped in the main.tsx")
    }
    return value
}