import Link from "next/link";

export default function Tools (){
    return <div className="gridsys">
        <h2 className='text-4xl fullcol'>Tools</h2>

        
        <Link 
            href="/tools/audiovisualizers" 
            className="col-span-3 border-1 rounded-lg px-3 py-2"
        >
            Audio Visualizers
        </Link>
        
    </div>
}