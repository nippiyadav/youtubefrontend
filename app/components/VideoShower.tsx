"use client"
import Image from 'next/image';
import React from 'react'
import ProfileShower from './ProfileShower';
import Link from 'next/link';
import { convertTime } from '@/utils/common';

interface VideoShowerProps {
  id:string;
  title?: string;
  description: string;
  duration:string
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  image?:string;
  channelTitle?:string;
  views?:number;
}

function VideoShower({ description, thumbnail, title,image,channelTitle,views,id,duration }: VideoShowerProps) {
  return (
    <Link href={`https://www.youtube.com/watch?v=${id}`}>
    <div className='min-[444px]:w-[350px] w-full max-[444px]:h-[330px] h-[310px] rounded-md mb-2 bg-gray-600/50 backdrop-blur-xl p-2 flex justify-between flex-col'>
      <div className='relative'>
        <Image style={{aspectRatio:"16/9"}} priority={true} src={thumbnail.url ?? "https://i.ytimg.com/vi/75hqPk6pq5g/mqdefault.jpg"} alt='thumnail' width={1000} height={1000} className={`w-[${thumbnail.width}] h-[${thumbnail.height}] object-cover  rounded-md`} />

        <div className='absolute bottom-1 right-1 bg-black/80 p-0.5 rounded-md text-sm text-white'>
          {convertTime(duration)}
        </div>
      </div>
      <div className='text-white flex flex-col flex-1'>
        <h3 className='text-xl font-bold p-1 line-clamp-2'>{title}</h3>
      <ProfileShower channelTitle={channelTitle} image={image} views={views}/>
      </div>
    </div>
    </Link>
  )
}

export default VideoShower