import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const WorkExperience = () => {
  const [mouse, setMouse] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const squaresRefs = useRef<(HTMLDivElement | null)[][]>([]);
  const squareSize = 50;
  const numRows = Math.floor(window.innerHeight / squareSize);
  const numCols = Math.floor(window.innerWidth / squareSize);

  if (squaresRefs.current.length !== numRows) {
    squaresRefs.current = Array(numRows)
      .fill(null)
      .map(() => Array(numCols).fill(null));
  }

  const blocksRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const squaresContainerRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ref = sectionRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    ref.addEventListener('mousemove', handleMouseMove);
    return () => ref.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useGSAP(() => {
    if (blocksRef.current.length) {
      blocksRef.current.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 50, filter: 'blur(16px)', scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            ease: 'power2.out',
            scale: 1,
            scrollTrigger: {
              trigger: block,
              start: 'top 90%',
              end: 'top 60%',
              scrub: true,
            },
          }
        );
      });
    }
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.8, y: 20, filter: 'blur(16px)' },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 95%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    }

    if (squaresContainerRef.current) {
      gsap.set(squaresContainerRef.current, { filter: 'blur(16px)' });
      gsap.to(squaresContainerRef.current, {
        scale: 1,
        filter: 'blur(2px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: squaresContainerRef.current,
          start: 'top 30%',
        },
      });
    }
  }, []);

  return (
    <section
      className='relative w-dvw min-h-dvh flex justify-center dark:bg-black overflow-hidden'
      ref={sectionRef}
    >
      <div
        className='absolute w-full h-full flex flex-col'
        ref={squaresContainerRef}
      >
        {Array.from({ length: numRows }).map((_, rowIdx) => (
          <div key={rowIdx} className='flex-1 flex opacity-40'>
            {Array.from({ length: numCols }).map((_, colIdx) => {
              const x = (colIdx + 0.5) * squareSize;
              const y = (rowIdx + 0.5) * squareSize;
              const dx = mouse.x - x;
              const dy = mouse.y - y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const minScale = 0.2;
              const maxScale = 1;
              const scale = Math.max(minScale, maxScale - dist / 400);

              return (
                <div
                  key={colIdx}
                  className='flex-1 flex justify-center items-center'
                >
                  <div
                    ref={(el) => {
                      squaresRefs.current[rowIdx][colIdx] = el;
                    }}
                    className='square w-3 h-3 dark:bg-green-500 bg-blue-400 rounded-sm duration-150 ease-linear'
                    style={{
                      transform: `scale(${scale})`,
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className='w-full flex flex-col dark:text-white text-black z-10 relative'>
        <h2
          ref={titleRef}
          className='blue-gradient-text dark:green-gradient-text text-center my-12 font-bold text-3xl'
        >
          My Work Experience
        </h2>
        <div className='flex flex-1 gap-4 md:gap-12 w-full px-4 md:w-10/12 mx-auto mb-12 relative'>
          <div className='flex-1 flex flex-col items-center justify-around text-right'>
            <div
              ref={(el) => {
                if (el) blocksRef.current[0] = el;
              }}
            >
              <header className='mb-2'>
                <h3 className='blue-gradient-text dark:green-gradient-text font-bold text-xl'>
                  Fullstack Software Engineer Internship
                </h3>
                <div>Apr 2025 - Aug 2025</div>
              </header>
              <p className='hidden md:block'>
                Built investor-facing dashboards with dynamic charts and
                animations, improving usability and accelerating VC outreach
                while refining UI consistency with Tailwind.
              </p>
            </div>
            <div
              ref={(el) => {
                if (el) blocksRef.current[1] = el;
              }}
            >
              <header className='mb-2'>
                <h3 className='blue-gradient-text dark:green-gradient-text font-bold text-xl'>
                  Founder & Indie Game Developer
                </h3>
                <div>Jan 2022 - Sep 2022</div>
              </header>
              <p className='hidden md:block'>
                Created and shipped a 2D platformer on Steam with 10k+ sales and
                90% positive reviews, later selling the IP for multi-platform
                release.
              </p>
            </div>
          </div>
          <div className='w-[1px] h-auto dark:bg-green-400 bg-black'></div>
          <div className='flex-1 flex flex-col items-center justify-around'>
            <div
              ref={(el) => {
                if (el) blocksRef.current[2] = el;
              }}
            >
              <header className='mb-2'>
                <h3 className='blue-gradient-text dark:green-gradient-text font-bold text-xl'>
                  Software Engineer - Volna Studios
                </h3>
                <div>Nov 2022 - Dec 2023</div>
              </header>
              <p className='hidden md:block'>
                Developed 40+ Unity prototypes with AI pathfinding and
                procedural generation, cutting development time by 50% through
                reusable C# gameplay systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
