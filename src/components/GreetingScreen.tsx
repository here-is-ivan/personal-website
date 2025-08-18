import { useRef, useEffect, useState } from 'react';
import { MdQuestionMark } from 'react-icons/md';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const GreetingScreen = () => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isQuestionClicked, setIsQuestionClicked] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const [questionOffset, setQuestionOffset] = useState({ x: 0, y: 0 });
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [magneticScale, setMagneticScale] = useState(0);
  const [eyeOpacity, setEyeOpacity] = useState<number>(1);

  // Blinking logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 120);
    }, 3000 * Math.random() + 5000);
    return () => clearInterval(interval);
  }, []);

  // Magnetic effect logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!questionRef.current) return;
      const rect = questionRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const threshold = 200; // px
      const scale = 1.4 * Math.max(0, (threshold - distance) / threshold);

      const eyeStrength = 0.015;
      setEyeOffset({ x: dx * eyeStrength, y: dy * eyeStrength });

      if (distance < threshold) {
        const strength = ((threshold - distance) / threshold) * 0.4;
        setQuestionOffset({ x: dx * strength, y: dy * strength });
        setEyeOpacity(0);
      } else {
        setQuestionOffset({ x: 0, y: 0 });
        setEyeOpacity(1);
      }
      setMagneticScale(scale);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Section fade-in animation
  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.set(sectionRef.current, { opacity: 0, filter: 'blur(16px)' });
    gsap.to(sectionRef.current, {
      opacity: 1,
      duration: 2,
      filter: 'blur(0px)',
    });
  }, []);

  return (
    <section className='w-dvw h-dvh relative bg-black'>
      <div
        className='w-full h-full absolute inset-0 flex justify-center items-center'
        ref={sectionRef}
      >
        <div
          className={`absolute text-green-500 text-5xl hover:scale-150 z-20 border-4 border-green-500 bg-black rounded-full p-6 hover:text-black hover:bg-green-500 duration-500 ${
            isQuestionClicked ? 'opacity-0 cursor-default' : 'cursor-pointer'
          }`}
          style={{
            boxShadow: '0 0 15px oklch(50% 0.219 149.579)',
          }}
          onClick={() => {
            if (!isQuestionClicked) {
              setIsQuestionClicked(true);
            }
          }}
        >
          <div
            ref={questionRef}
            style={{
              transform: `translate(${questionOffset.x}px, ${questionOffset.y}px) scale(${magneticScale})`,
              transition: 'all 25ms linear',
            }}
          >
            <MdQuestionMark />
          </div>
          <div
            className='absolute left-0 top-0 w-full h-full flex justify-center items-center'
            style={{
              opacity: eyeOpacity,
              transition: 'opacity 100ms linear',
            }}
          >
            <div
              className='flex justify-center items-center'
              style={{
                transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                transition: 'all 25ms linear',
              }}
            >
              {isBlinking ? (
                <LuEyeClosed className='absolute' />
              ) : (
                <LuEye className='absolute' />
              )}
            </div>
          </div>
        </div>
        {isQuestionClicked && <TextIntroduction />}
        <MatrixBackground isQuestionClicked={isQuestionClicked} />
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

  const [matrix, setMatrix] = useState<string[]>([]);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const canChangeRef = useRef(true);

  useEffect(() => {
    if (isQuestionClicked && !canChangeRef.current) return;

    const updateMatrix = () => {
      if (!canChangeRef.current) return;
      canChangeRef.current = false;
      setTimeout(() => (canChangeRef.current = true), 50);
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
  }, [isQuestionClicked]);

  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none duration-500 ${
        isQuestionClicked ? 'opacity-0' : ''
      }`}
    >
      <div
        className='text-green-500 font-mono absolute inset-0 whitespace-pre select-none text-sm overflow-hidden'
        ref={backgroundRef}
        style={{
          maskImage:
            'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 80%)',
          WebkitMaskImage:
            'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 80%)',
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
      delay: 0.75,
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
        delay: 2,
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
