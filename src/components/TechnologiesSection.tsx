import { useState, useRef, useEffect } from 'react';
import { IoLogoJavascript } from 'react-icons/io';
import {
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiMysql,
  SiMongodb,
} from 'react-icons/si';
import { FaReact, FaHtml5, FaCss3, FaNode } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { IconType } from 'react-icons';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const TechnologiesSection = () => {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dockRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  // Refs for the three rings
  const ringRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const getScale = (index: number) => {
    if (mouseX === null || !dockRef.current) return 1;
    const item = itemsRef.current[index];
    if (!item) return 1;

    const rect = item.getBoundingClientRect();
    const itemCenterX = rect.left + rect.width / 2;

    const distance = Math.abs(mouseX - itemCenterX);
    const maxDistance = 100;

    if (distance > maxDistance) return 1;

    return 1 + 0.4 * (1 - distance / maxDistance);
  };

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
    };

    const handleMouseLeave = () => {
      setMouseX(null);
    };

    dock.addEventListener('mousemove', handleMouseMove);
    dock.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      dock.removeEventListener('mousemove', handleMouseMove);
      dock.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useGSAP(() => {
    const icons = itemsRef.current.filter(
      (item): item is HTMLLIElement => item !== null
    );
    icons.forEach((icon) => {
      icon.style.filter = 'blur(10px)';
    });
    gsap.fromTo(
      icons,
      {
        opacity: 0,
        y: 30,
        scale: 0.5,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        stagger: {
          each: 0.1,
          from: 'random',
        },
        ease: 'none',
        scrollTrigger: {
          trigger: dockRef.current,
          start: 'top 100%',
          end: 'top 80%',
          scrub: true,
          markers: true,
        },
      }
    );
  }, []);

  useGSAP(() => {
    ringRefs.forEach((ringRef, index) => {
      const ring = ringRef.current;
      if (!ring) return;
      const icons = ring.querySelectorAll('.atom-icon');

      gsap.to(icons, {
        rotation: -360,
        duration: Math.floor(50 / (index + 1)),
        repeat: -1,
        ease: 'linear',
      });

      gsap.to(ring, {
        rotation: 360,
        duration: Math.floor(50 / (index + 1)),
        repeat: -1,
        ease: 'linear',
      });
    });
  }, []);

  // Icon order for dock and rings
  const dockIcons = [
    { Icon: IoLogoJavascript, title: 'JavaScript' },
    { Icon: SiTypescript, title: 'TypeScript' },
    { Icon: FaReact, title: 'React' },
    { Icon: FaNode, title: 'Node.js' },
    { Icon: SiTailwindcss, title: 'Tailwind CSS' },
    { Icon: FaHtml5, title: 'HTML' },
    { Icon: FaCss3, title: 'CSS' },
    { Icon: SiExpress, title: 'Express' },
    { Icon: SiMysql, title: 'MySQL' },
    { Icon: SiMongodb, title: 'MongoDB' },
  ];

  // Helper to get dock index for a given Icon
  const getDockIndex = (Icon: IconType) =>
    dockIcons.findIndex((item) => item.Icon === Icon);

  return (
    <section
      ref={sectionRef}
      className='w-dvw lg:min-h-dvh dark:bg-black dark:text-white flex flex-col items-center py-12'
    >
      <h2 className='blue-gradient-text dark:green-gradient-text font-black text-4xl mb-12'>
        My Skills
      </h2>
      <div className='hidden w-1/3 aspect-square relative lg:flex justify-center items-center mb-8 dark:text-black text-white'>
        <div
          ref={ringRefs[0]}
          className='absolute w-full h-full md:border-2 dark:border-green-500 border-blue-400 rounded-full flex items-center justify-center'
        >
          <div className='absolute left-0 -translate-x-1/2 atom-icon'>
            <Atom
              Icon={FaNode}
              highlighted={hoveredIndex === getDockIndex(FaNode)}
            />
          </div>
          <div className='absolute right-0 translate-x-1/2 atom-icon'>
            <Atom
              Icon={SiExpress}
              highlighted={hoveredIndex === getDockIndex(SiExpress)}
            />
          </div>
          <div className='absolute top-0 -translate-y-1/2 atom-icon'>
            <Atom
              Icon={SiMysql}
              highlighted={hoveredIndex === getDockIndex(SiMysql)}
            />
          </div>
          <div className='absolute bottom-0 translate-y-1/2 atom-icon'>
            <Atom
              Icon={SiMongodb}
              highlighted={hoveredIndex === getDockIndex(SiMongodb)}
            />
          </div>
        </div>
        <div
          ref={ringRefs[1]}
          className='absolute w-2/3 h-2/3 border-2 dark:border-green-500 border-blue-400 rounded-full flex justify-center items-center'
        >
          <div className='absolute top-0 -translate-y-1/2 atom-icon'>
            <Atom
              Icon={SiTailwindcss}
              highlighted={hoveredIndex === getDockIndex(SiTailwindcss)}
            />
          </div>
          <div className='absolute bottom-0 left-0 translate-x-1/3 -translate-y-1/3 atom-icon'>
            <Atom
              Icon={FaCss3}
              highlighted={hoveredIndex === getDockIndex(FaCss3)}
            />
          </div>
          <div className='absolute bottom-0 right-0 -translate-x-1/3 -translate-y-1/3 atom-icon'>
            <Atom
              Icon={FaHtml5}
              highlighted={hoveredIndex === getDockIndex(FaHtml5)}
            />
          </div>
        </div>
        <div
          ref={ringRefs[2]}
          className='absolute w-1/3 h-1/3 border-2 dark:border-green-500 border-blue-400 rounded-full flex items-center justify-center'
        >
          <div className='absolute left-0 -translate-x-1/2 atom-icon'>
            <Atom
              Icon={IoLogoJavascript}
              highlighted={hoveredIndex === getDockIndex(IoLogoJavascript)}
            />
          </div>
          <div className='absolute right-0 translate-x-1/2 atom-icon'>
            <Atom
              Icon={SiTypescript}
              highlighted={hoveredIndex === getDockIndex(SiTypescript)}
            />
          </div>
        </div>
        <div className='absolute'>
          <Atom
            Icon={FaReact}
            highlighted={hoveredIndex === getDockIndex(FaReact)}
          />
        </div>
      </div>
      <ul
        ref={dockRef}
        className='flex flex-wrap gap-6 justify-center dark:text-black text-white p-8 relative'
      >
        {dockIcons.map(({ Icon, title }, index) => (
          <li
            key={title}
            ref={(el: HTMLLIElement | null) => {
              itemsRef.current[index] = el;
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative dark:bg-green-500 bg-blue-400 p-3 rounded-lg transition-all duration-75 ease-linear origin-bottom
              ${
                hoveredIndex === index
                  ? 'ring-2 dark:ring-white ring-black'
                  : ''
              }`}
            style={{
              transform: `scale(${getScale(index)})`,
              zIndex: dockIcons.length - index,
            }}
          >
            <Icon size={32} className='icon z-0' />
            {hoveredIndex === index && (
              <div
                className='absolute top-[100%] left-1/2 -translate-x-1/2 translate-y-1.5 text-xs bg-black dark:bg-white 
                            text-white dark:text-black px-2 py-1 rounded whitespace-nowrap z-10'
              >
                {title}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

const Atom = ({
  Icon,
  highlighted,
}: {
  Icon: IconType;
  highlighted?: boolean;
}) => {
  return (
    <div
      className={`dark:bg-green-500 bg-blue-400 p-2 rounded-full border-8 transition-all duration-150 relative
        ${
          highlighted
            ? 'dark:border-white border-black'
            : 'dark:border-black border-white'
        }`}
    >
      <Icon size={24} />
    </div>
  );
};

export default TechnologiesSection;
