"use client"

import React, { useEffect, useRef, useState } from 'react'
import VideoShower from '@/app/components/VideoShower';
import Input from './components/Input';
import { Search } from 'lucide-react';

// this is the typescript interface
interface YoutubeVideoProps {
  items: {
    id: string;
    statistics: {
      viewCount: number;
      likeCount: number;
      favoriteCount: number;
      commentCount: number;
    }
    contentDetails: {
      caption: string;
      definition: string;
      dimension: string;
      duration: string;
      licensedContent: boolean;
      projection: string;
    };
    snippet: {
      title: string;
      categoryId: string;
      channelId: string;
      channelTitle: string;
      defaultAudioLanguage: string;
      description: string;
      liveBroadcastContent: string;
      localised: {
        description: string;
        title: string;
      };
      thumbnails: {
        default: {
          height: number;
          url: string;
          width: number;
        };
        high: {
          height: number;
          url: string;
          width: number;
        };
        medium: {
          height: number;
          url: string;
          width: number;
        }
      };
      tags: string[];
      id: string;
      kind: string;
    };
    kind: string;
  }
}

function Page() {
  const [youtubeVideos, setYoutubeVideos] = useState<YoutubeVideoProps[]>([]);

  // searching result holding because i do not want to change directly in youtubeVideos
  const [searchResult, setSearchResult] = useState<YoutubeVideoProps[]>([]);

  // searching text
  const [searchText, setSearchText] = useState<string>("");

  // i am inserting ref for getting scrollheight of div
  const resultRef = useRef<HTMLDivElement>(null);

  // i am inserting ref for getting scrollheight of div
  const inputRef = useRef<HTMLInputElement>(null);

  // video fetching youtube
  useEffect(() => {
    const youtubeVideoFetching = async () => {
      const url = 'https://api.freeapi.app/api/v1/public/youtube/videos?page=2&limit=20&query=javascript&sortBy=keep%2520one%253A%2520mostLiked%2520%257C%2520mostViewed%2520%257C%2520latest%2520%257C%2520oldest';
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          // debugging purpose
          console.log(data.data.data);
          setYoutubeVideos(data.data.data);
          setSearchResult(data.data.data);
        }
      } catch (error) {
        console.error(`Error in fetching from url:- ${url}`, error);
      }
    }
    youtubeVideoFetching();
  }, []);


  // running whenever change in searchinputbox
  useEffect(() => {
    // debbuging purpose
    // console.log("searchResult:- ", searchText);
    // if there is not search text then it will return and not run of further methods
    if (!searchText?.trim()) {
      return
    };

    // debugging purpose
    // console.log("youtubeVideos:- ", youtubeVideos);

    // i will filter on the basis of title, description, channelTitle, and tags etc
    const filterResult = youtubeVideos.filter((video) => {
      const searchterm = searchText.toLowerCase();
      // debugging purpose
      // console.log(video.items.snippet.title.toLowerCase().includes(searchterm));

      // this is long condition i am implimenting includes in string and array, and include run on all array element, this is use for subString and case sensitive
      return video.items.snippet.title.toLowerCase().includes(searchterm) || video.items.snippet.description.toLowerCase().includes(searchterm) || video.items.snippet.channelTitle.toLowerCase().includes(searchterm) || video.items.snippet.tags?.includes(searchterm)
    });

    // debugging purpose
    // console.log("filterResult:- ", filterResult);

    // this is being set filter value
    setSearchResult(filterResult);
  },[searchText,youtubeVideos]);



  // searching function manually
  const searchingForm = () => {
    const searchValue = inputRef.current?.value;
    console.log("searchValue:- ", searchValue);
    if (!searchValue?.trim()) {
      return
    };

    console.log("youtubeVideos:- ", youtubeVideos);

    // i will filter on the basis of title, description, channelTitle, and tags etc
    const filterResult = youtubeVideos.filter((video) => {
      const searchterm = searchValue.toLowerCase();
      console.log(video.items.snippet.title.toLowerCase().includes(searchterm));

      return video.items.snippet.title.toLowerCase().includes(searchterm) || video.items.snippet.description.toLowerCase().includes(searchterm) || video.items.snippet.channelTitle.toLowerCase().includes(searchterm) || video.items.snippet.tags?.includes(searchterm)
    });

    console.log("filterResult:- ", filterResult);
    setSearchResult(filterResult);
  }

  // this function run every time when ever input value change
  const inputChangingValue = (text: string) => {
    // debugging purpose
    // console.log("text:- ", text);
    setSearchText(text)
  }

  return (
    <div>
      {/* this is for searching features */}
      <div className='lg:w-[444px] mx-auto w-full p-2'>
        <form className='flex bg-gray-700 p-2 rounded-full gap-2' onSubmit={(e) => {
          e.preventDefault();
          searchingForm();
        }}>
          <Input onchange={(e) => inputChangingValue(e)} className='rounded-full text-white outline-none bg-gray-900 focus:ring-1 ring-blue-400 flex-1' ref={inputRef} />
          <button type='submit' className=' rounded-full px-4 py-2 flex justify-center items-center cursor-pointer '>
            <Search color='white' size={25} />
          </button>
        </form>
      </div>

      {/* result search */}
      <div ref={resultRef} className='flex flex-col gap-1 p-2'>
        {searchResult.length > 0 ?
          (<>
            <div className='flex flex-wrap gap-2 p-2 justify-center'>
              {searchResult.map((video, index) => (
                <VideoShower
                  id={video.items.id}
                  key={index}
                  description={video.items.snippet.description}
                  title={video.items.snippet.title} thumbnail={video.items.snippet.thumbnails.high}
                  channelTitle={video.items.snippet.channelTitle}
                  views={video.items.statistics.viewCount}
                  duration={video.items.contentDetails.duration}
                />
              ))}
            </div>
            
            {/* this is the load More button jsx */}
              <div className='flex items-center justify-center'>
                <span className='font-bold rounded-md px-4 py-2 shadow-md bg-white cursor-pointer'>Load More</span>
              </div>
          </>)
          :
          (<div className='flex flex-wrap justify-center gap-2 p-2'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((data, index) => (
              <div key={index} className='flex flex-wrap gap-2 p-2 justify-center'>
                <div className='w-[320px] h-[310px] bg-gray-400/30 backdrop-blur-xl rounded-md'>

                </div>
              </div>
            ))}
          </div>)}
      </div>
    </div>
  )
}

export default Page