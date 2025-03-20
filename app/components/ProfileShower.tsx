import { viewsShorter } from '@/utils/common';
import { CircleUser } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

interface ProfileShowerProps {
    image?: string;
    channelTitle?: string;
    views?: number;
}

function ProfileShower({ channelTitle, image = "https://yt3.googleusercontent.com/6tLBV-DRVemxhmanuezR5HkHshX2g7Y46Rq8cysyO1V-nd2SaQ2Fi8cdgVM-n6v_8XZ5BEimxXI=s160-c-k-c0x00ffffff-no-rj", views }: ProfileShowerProps) {
    return (
        <div>
            <div className='flex items-center gap-2 mt-2'>
                {image ?
                    (<div className='w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center'>
                        <Image style={{aspectRatio:"1:1"}} src={image} width={500} height={500} alt='profile' className='w-8 h-8 rounded-full object-cover' />
                    </div>)
                    :
                    (<div className='w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center'>
                        <CircleUser color='black' />
                    </div>)}
                <h3 className='text-white ml-2'>{channelTitle}</h3>
                <div className='text-white'>
                    <p>{viewsShorter(views as number)} views</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileShower