import React, { useRef, useEffect, useState } from 'react';
import MarioCoderGIF from '@/assets/mario-coder.gif';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MdQuestionMark } from 'react-icons/md';

const GreetingScreen = () => {
  const [isQuestionClicked, setIsQuestionClicked] = useState(false);

  return (
    <section className='w-dvw h-dvh relative'>
      <div className='bg-black w-full h-full absolute inset-0 flex justify-center items-center'>
        <div
          className={`absolute text-green-500 text-5xl hover:scale-125 z-20 border-4 border-green-500 bg-black rounded-full p-2 hover:text-black hover:bg-green-500 duration-500 ${
            isQuestionClicked ? 'opacity-0 cursor-default' : 'cursor-pointer'
          }`}
          onClick={() => {
            if (!isQuestionClicked) {
              setIsQuestionClicked(true);
            }
          }}
        >
          <MdQuestionMark />
        </div>
        {isQuestionClicked && <TextIntroduction />}
        <MatrixBackground isQuestionClicked={isQuestionClicked} />
      </div>
      <div className='absolute left-0 top-0 h-full w-full -z-10'>
        <img
          src={MarioCoderGIF}
          alt=''
          className='h-full w-full object-cover'
        />
      </div>
    </section>
  );
};

const MatrixBackground = ({
  isQuestionClicked,
}: {
  isQuestionClicked: boolean;
}) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [matrix, setMatrix] = useState<string[]>([]);

  useEffect(() => {
    const updateMatrix = () => {
      const charWidth = 16; // px
      const charHeight = 16; // px
      const width = backgroundRef.current?.offsetWidth || window.innerWidth;
      const height = backgroundRef.current?.offsetHeight || window.innerHeight;
      const cols = Math.floor(width / charWidth);
      const rows = Math.floor(height / charHeight);
      const newMatrix = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, getRandomChar).join(' ')
      );
      setMatrix(newMatrix);
    };
    updateMatrix();
    window.addEventListener('resize', updateMatrix);
    window.addEventListener('mousemove', updateMatrix);
    return () => {
      window.removeEventListener('resize', updateMatrix);
      window.removeEventListener('mousemove', updateMatrix);
    };
  }, []);

  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none duration-500 ${
        isQuestionClicked ? 'opacity-0' : ''
      }`}
    >
      <div
        className='text-green-500 opacity-70 font-mono absolute inset-0 whitespace-pre select-none text-sm overflow-hidden'
        ref={backgroundRef}
        style={{
          maskImage:
            'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,1) 70%)',
          WebkitMaskImage:
            'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,1) 70%)',
        }}
      >
        {matrix.join('\n')}
      </div>
    </div>
  );
};

const TextIntroduction = () => {
  const textParentRef = useRef(null);
  const subtitleBlockRef = useRef(null);

  useGSAP(() => {
    if (!textParentRef.current) return;
    const children = (textParentRef.current as HTMLElement).children;
    gsap.set(children, {
      opacity: 0,
      y: 20,
      filter: 'blur(16px)',
      scale: 1.1,
    });
    gsap.to(children, {
      delay: 1.5,
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      duration: 1.2,
      ease: 'power4.out',
      stagger: 0.15,
    });

    if (subtitleBlockRef.current) {
      gsap.set(subtitleBlockRef.current, {
        opacity: 0,
        x: -20,
        filter: 'blur(16px)',
      });
      gsap.to(subtitleBlockRef.current, {
        delay: 2.75,
        duration: 2,
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        ease: 'power4.out',
      });
    }
  }, []);

  return (
    <header className='relative text-white flex items-center justify-center w-full h-full z-10 p-8 sm:p-16'>
      <div className='w-full md:w-1/2'>
        <h1
          className='flex max-w-96 flex-wrap gap-4 text-6xl font-black mb-8'
          ref={textParentRef}
        >
          <div>Hi,</div>
          <div>My</div>
          <div>Name</div>
          <div>Is</div>
          <div
            style={{
              background: 'linear-gradient(to top left,#0fd850,#f9f047)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Ivan
          </div>
        </h1>
        <p className='text-xl leading-relaxed' ref={subtitleBlockRef}>
          Full-stack software engineer with 1 year of experience building
          scalable web applications, skilled in React, TypeScript, and Node.js
        </p>
      </div>
    </header>
  );
};

export default GreetingScreen;
