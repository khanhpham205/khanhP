/* eslint-disable @typescript-eslint/no-unused-vars */
import { use } from "react";
import AudioVisualizers from "../function/AudioVisualizer";

interface Prop {
    params: Promise<{ tool: string }>;
}
export default function Tool({params} : Prop){ 
    const {tool} = use(params);

    const render = ()=>{
        switch(tool){
            case "audiovisualizers":
                return <AudioVisualizers/>
        }
    }
    
    return <div className="gridsys">
        <div className="fullcol">
            {tool}
        </div>
        {render()}
        <div className="fullcol">
            <h3 className='text-2xl border-b-1'>Orther tools</h3>
        </div>
    </div>
}