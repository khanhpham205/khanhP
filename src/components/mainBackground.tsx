'use client'
import { useEffect, useRef } from 'react';
export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars: { x: number; y: number; size: number; speed: number }[] = [];
        const numStars = 50;
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() ,
                speed: Math.random() * 0.2,
            });
        }
        function drawStars() {
            if( !ctx || !canvas) return 
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach((star) => {
                star.x -= star.speed;
                if (star.x < 0) {
                    star.x = canvas.width;
                }
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = 'white';
                ctx.fill();
            });
            requestAnimationFrame(drawStars);
        }
        drawStars();
    }, []);
    return (<canvas
        ref={canvasRef}
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -1,
        }}
    />);
}
