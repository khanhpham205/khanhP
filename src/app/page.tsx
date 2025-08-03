'use client'
import HomeHeader from '@/components/homeHeader'
import AudioVisualizers from './tools/function/AudioVisualizer'

export default function Home() {
    
    return (
        <div className="font-sans" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
           
            <HomeHeader />
            <div className="flex items-center justify-center text-white">
                <h1 className='text-5xl text-bold italic whitespace-nowrap'>
                    Phạm Nguyễn Bảo Khánh
                </h1>
            </div>
            <div className='flex items-center justify-center mt-8'>
                <AudioVisualizers />
            </div>
     </div>
    );
}
