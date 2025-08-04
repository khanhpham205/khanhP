/* eslint-disable @typescript-eslint/no-unused-vars */
import { use } from "react";
import AudioVisualizers from "./function/AudioVisualizer";
import SimpleCal from "./function/SimpleCal";
import Link from "next/link";

interface Prop {
    params: Promise<{ tool: string }>;
}
export default function Tool({params} : Prop){ 
    const {tool} = use(params);

    const render = ()=>{
        switch(tool){
            case "audiovisualizers":
                return <AudioVisualizers/>
            case "simplecalculator":
                return <SimpleCal/>
        }
    }

    return <div className="gridsys">
        <div className="fullcol">
            {/* breacrum */}
            <p className="h-fit">
                <Link className='cursor-pointer text-xl' href='/tools'>Tools</Link> / 
                <span className='cursor-pointer text-xl'> {tool}</span> 
            </p>
        </div>
        <div className="fullcol">
            <Link className='border-1 mt-2 px-4 py-3 rounded' href='/tools'>Back</Link>
        </div>
        {render()}
        <div className="fullcol">
            <h3 className='text-2xl border-b-1'>Orther tools</h3>

        </div>
    </div>
}