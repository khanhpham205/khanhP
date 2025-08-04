/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Pause, Play, VolumeX  } from 'lucide-react';
import { toast } from 'react-toastify';

import { useEffect, useRef, useState } from "react"

interface Point {
    x: number;
    y: number;
    angle: number;
    dist: number;
}

export default function SimpleCal() {

    return (<>
        <h2 className='fullcol text-5xl'>Simple Calculator</h2>
        <div className="col-span-6 w-fit grid grid-cols-4 gap-2">
            <div className="col-span-4 border-1 rounded h-15">
                {/* display */}
            </div>
            {/* buttons */}
            <button className='border-1 rounded aspect-square w-10'> AC </button>
            <button className='border-1 rounded  col-span-2'> DEL </button>
            <button className='border-1 rounded aspect-square '> / </button>
            <button className='border-1 rounded aspect-square '> 7 </button>
            <button className='border-1 rounded aspect-square '> 8 </button>
            <button className='border-1 rounded aspect-square '> 9 </button>
            <button className='border-1 rounded aspect-square '> + </button>
            <button className='border-1 rounded aspect-square '> 4 </button>
            <button className='border-1 rounded aspect-square '> 5 </button>
            <button className='border-1 rounded aspect-square '> 6 </button>
            <button className='border-1 rounded aspect-square '> - </button>
            <button className='border-1 rounded aspect-square '> 1 </button>
            <button className='border-1 rounded aspect-square '> 2 </button>
            <button className='border-1 rounded aspect-square '> 3 </button>
            <button className='border-1 rounded aspect-square '> x </button>
            <button className='border-1 rounded aspect-square '> 0 </button>
            <button className='border-1 rounded aspect-square '> . </button>
            <button className='border-1 rounded w-full col-span-2'> = </button>
            
        </div>
        
    </>);
}