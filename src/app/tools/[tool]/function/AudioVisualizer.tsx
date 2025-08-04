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

export default function AudioVisualizers() {
    const [file, setFile] = useState<File | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const animationFrameRef = useRef<number>(0);
    const runningRef = useRef<boolean>(false);
    const pointsRef = useRef<Point[]>([]);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserLRef = useRef<AnalyserNode | null>(null);
    const analyserRRef = useRef<AnalyserNode | null>(null);
    const audioDataArrayLRef = useRef<Uint8Array | null>(null);
    const audioDataArrayRRef = useRef<Uint8Array | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const audio = audioRef.current;
        if (!canvas || !audio) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 120;
        const dist = 1.3;

        const generatePoints = () => {
            const newPoints: Point[] = [];
            for (let angle = 0; angle < 360; angle++) {
                newPoints.push({
                    angle: angle + 90,
                    x: centerX + radius * Math.cos((-angle + 90) * Math.PI / 180) * dist,
                    y: centerY + radius * Math.sin((-angle + 90) * Math.PI / 180) * dist,
                    dist: dist,
                });
            }
            return newPoints;
        };

        pointsRef.current = generatePoints();

        const loadAudio = () => {
            if (!file) return;

            const context = new AudioContext();
            audioContextRef.current = context;
            const analyserL = context.createAnalyser();
            const analyserR = context.createAnalyser();

            analyserL.fftSize = 8192;
            analyserR.fftSize = 8192;

            analyserLRef.current = analyserL;
            analyserRRef.current = analyserR;

            const bufferLengthL = analyserL.frequencyBinCount;
            const bufferLengthR = analyserR.frequencyBinCount;

            const audioDataArrayL = new Uint8Array(bufferLengthL);
            const audioDataArrayR = new Uint8Array(bufferLengthR);

            audioDataArrayLRef.current = audioDataArrayL;
            audioDataArrayRRef.current = audioDataArrayR;

            const source = context.createMediaElementSource(audio);
            const splitter = new ChannelSplitterNode(context, { numberOfOutputs: 2 });
            const mergerNode = new ChannelMergerNode(context, { numberOfInputs: 2 });

            source.connect(splitter);
            splitter.connect(analyserL, 0);
            splitter.connect(analyserR, 1);

            analyserL.connect(mergerNode, 0, 0);
            analyserR.connect(mergerNode, 0, 1);
            mergerNode.connect(context.destination);

            audio.loop = false;
            audio.autoplay = false;
            audio.src = URL.createObjectURL(file);
            runningRef.current = true;
        };

        const drawLine = (points: Point[]) => {
            let origin = points[0];

            ctx.beginPath();
            ctx.strokeStyle = 'White';
            ctx.lineJoin = 'round';
            ctx.moveTo(origin.x, origin.y);

            for (let i = 0; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }

            ctx.lineTo(origin.x, origin.y);
            ctx.stroke();
        };

        const update = () => {
            if (
                !analyserLRef.current || !analyserRRef.current ||
                !audioDataArrayLRef.current || !audioDataArrayRRef.current
            ) return;

            const analyserL = analyserLRef.current;
            const analyserR = analyserRRef.current;
            const audioDataArrayL = audioDataArrayLRef.current;
            const audioDataArrayR = audioDataArrayRRef.current;

            analyserL.getByteFrequencyData(audioDataArrayL);
            analyserR.getByteFrequencyData(audioDataArrayR);

            const pCircle = 2 * Math.PI * radius;
            const points = pointsRef.current;

            for (let i = 0; i < 180; i++) {
                let audioIndex = Math.ceil(points[i].angle * (8192 / (pCircle * 2))) | 0;
                let audioValue = audioDataArrayL[audioIndex] / 255;

                points[i].dist = 1.3 + audioValue * 0.8;
                points[i].x = centerX + radius * Math.cos(-points[i].angle * Math.PI / 180) * points[i].dist;
                points[i].y = centerY + radius * Math.sin(-points[i].angle * Math.PI / 180) * points[i].dist;
            }
            for (let i = 180; i < 360; i++) {
                let audioIndex = Math.ceil(points[i].angle * (8192 / (pCircle * 2))) | 0;
                let audioValue = audioDataArrayR[audioIndex] / 255;

                points[i].dist = 1.3 + audioValue * 0.8;
                points[i].x = centerX + radius * Math.cos(-points[i].angle * Math.PI / 180) * points[i].dist;
                points[i].y = centerY + radius * Math.sin(-points[i].angle * Math.PI / 180) * points[i].dist;
            }
        };

        const draw = () => {
            animationFrameRef.current = requestAnimationFrame(draw);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (runningRef.current) {
                update();
                drawLine(pointsRef.current);
            }
        };

        loadAudio();
        draw();

        return () => {
            cancelAnimationFrame(animationFrameRef.current);
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, [file]);

    return (<>
        <h2 className='fullcol text-5xl'>Audio Visualizers</h2>
        <div className='col-span-5 flex flex-col gap-2 text-white'>
            <canvas ref={canvasRef} id="canva1" width={700} height={700} ></canvas>
        </div>
        <div className="col-span-5 flex flex-col  gap-2">            
            {file ? 
                file.name.split('.')[0].toUpperCase(): 
                <label htmlFor="file-input" className='text-center border-1 rounded-full'>
                    Chọn Audio
                </label>
            }

            <audio className='w-full ' ref={audioRef} controls />
            <input 
                id='file-input'
                type="file" 
                accept="audio/*" 
                hidden
                onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
        </div>
    </>);
}