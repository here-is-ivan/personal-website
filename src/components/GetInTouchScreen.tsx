import React, { useRef, useState } from 'react';
import { FaArrowRight, FaGithub, FaLinkedin } from 'react-icons/fa6';
import { IoIosMail } from 'react-icons/io';

const GetInTouchScreen = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [maskPos, setMaskPos] = useState('50% 50%');

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMaskPos(`${x}% ${y}%`);
    }
  };

  return (
    <section
      ref={sectionRef}
      className='relative w-screen h-screen flex justify-center items-center dark:text-white dark:bg-black'
      onMouseMove={handleMouseMove}
    >
      <div
        className='absolute opacity-30 inset-0 h-full w-full dark:bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[linear-gradient(to_right,#60a5fa_1px,transparent_1px),linear-gradient(to_bottom,#60a5fa_1px,transparent_1px)] bg-[size:4rem_4rem]'
        style={{
          maskImage: `radial-gradient(ellipse 50% 50% at ${maskPos}, #000 50%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(ellipse 50% 50% at ${maskPos}, #000 50%, transparent 100%)`,
        }}
      ></div>
      <div className='flex flex-col items-center z-10'>
        <h2 className='blue-gradient-text dark:green-gradient-text font-black text-4xl mb-6'>
          Get In Touch
        </h2>
        <ul className='flex flex-col gap-4 mb-6 text-lg'>
          <li>
            <a
              href='https://github.com/here-is-ivan'
              target='_blank'
              className='flex items-center justify-center gap-2 dark:hover:text-green-500 hover:text-blue-400 duration-300'
            >
              <FaGithub />
              <h3>GitHub</h3>
            </a>
          </li>
          <li>
            <a
              href='https://www.linkedin.com/in/i-am-ivan/'
              target='_blank'
              className='flex items-center justify-center gap-2 dark:hover:text-green-500 hover:text-blue-400 duration-300'
            >
              <FaLinkedin />
              <h3>LinkedIn</h3>
            </a>
          </li>
          <li>
            <div className='flex items-center justify-center gap-2'>
              <IoIosMail />
              <h3>ivan.iv.buianov@gmail.com</h3>
            </div>
          </li>
        </ul>
        <a
          href='mailto:ivan.iv.buianov@gmail.com'
          className='flex items-center justify-center border gap-3 rounded-3xl px-4 py-2 cursor-pointer dark:bg-black bg-white group dark:hover:bg-white hover:bg-black dark:hover:text-black hover:text-white duration-300'
        >
          <FaArrowRight className='group-hover:translate-x-1 duration-300' />
          <span>say hi</span>
        </a>
      </div>
    </section>
  );
};

export default GetInTouchScreen;
