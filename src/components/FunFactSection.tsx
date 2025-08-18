import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FunFactSection = () => {
  // Steve Jobs ASCII portraits as arrays of strings
  const steveJobsPortraitLarge = [
    '░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░░░░░░░░░░░░▓████████▒░░░░░░░░░░░░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░░░░░░░░█████████████████░░░░░░░░░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░░░░░▒█████████████████████░░░░░░░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░░░░▓███▓▓▓█████████████████▓░░░░░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░░░████▒▒▒▒▒▒▒▒░░▒▓▓▓▓▓███████░░░░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░░████▒░░░░░░░░░░░░▒▒▓▓███████▓░░░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░▓███▓░░░░░░░░░░░░░░░▒▓▓████████░░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░████▒░░░░░░░░░░░░░░░▒▒▓████████░░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░▓███▓░░░░░░░░░░░░░░░▒▓▓████████░░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░▒██▓▒▒░░░░░░░░░░░░░░░▒▓▓███████▒░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░▒██▓▓▒▒░░░░░░░░░░░░░░░░▒▓█████████░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░█████▒▒▒▒░░░░░░░░░░░░▒▒▒▒▓████████░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░▓▓███▒▒▒▒▓███▓▓▒░░▒▓██████████████░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░▒██▓▒▒░▒▓▒▒█▓█▒░░░▓███▓██████████▓░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░▓▓▓▒░▒░░░░░▒▒░▒░░▒██▓▒░░▒▓▓█████░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░░▒▓▒░░░░░░░░░░░░░▒█▓▓▒░░░▒▒█████░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░░▒▒▓▒▒░░░░░░░░░░░▒███▒▒▒▒▓█████▓░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░░░░▒▓▒▒░░░░░░░░░░▒███▓▒▒▓█████░░░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░░░░░▒▒▒▒░░░░░░░░░▓████▓▓██████░░░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░░░░░▒░▒▒░░▒▒░▒▒▓██████████████░░░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░░░░░░░░▒▓███▓▓▓▓▓███████████▓░░░░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░░░░░░▒▒▓▒██▒░░░░░░▒▓█████████░░░░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░░░░░░░▒█▓█▓▒░▒▓██████████████▓░░░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░░░░░░░░▒▓▓▓▓▒░░▒░▒██▓▒▓████████░░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░░░░░░░░██▓▒░░▒▓▓▓██▓█▓██████████████░░░░░░░░░░░',
    '░░░░░░░░░░░░░░░░░░░▒█▓▓███▓░░▒▒██████████████████████▓░░░░░░',
    '░░░░░░░░░░░░░░░░░▓█████▓▓█▒░░░░▒█████████████████████████▒░░',
    '░░░░░░░░░░░░░░███████████▓░░░░░░░▒██████████████████████████',
    '░░░░░░░░░░▒██████████████░░░░░░░░░██████████████████████████',
    '░░░░░░░▓████████████████▓░░░░░░░▒▓██████████████████████████',
    '░░░░████████████████████░░░░░▒▓▓▓▓██████████████████████████',
    '▒█████████████████████░░░░░░▒▓▓▓████████████████████████████',
    '████████████████████▓░░░░▒▒▒▓▓▓▓████████████████████████████',
    '█████████████████████░░▒▒▓▓▒▓▓▓▓████████████████████████████',
    '██████████████████████▓▓▓▓▓▓▓▓▓▓▓▓▓█████████████████████████',
  ];

  const portraitRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (
      portraitRef.current &&
      lineRefs.current.length === steveJobsPortraitLarge.length
    ) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: portraitRef.current,
          start: 'top 90%',
          end: 'top 10%',
          scrub: true,
        },
      });
      lineRefs.current.forEach((line, i) => {
        tl.fromTo(
          line,
          { opacity: 0 },
          { opacity: 1, duration: 0.1 },
          i * 0.01
        );
      });
    }
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [steveJobsPortraitLarge.length]);

  return (
    <section className='min-h-dvh w-dvw flex items-center justify-center flex-col bg-black text-green-500 py-12'>
      <h2
        className='font-black text-4xl mb-6'
        style={{
          background: 'linear-gradient(to top left,#0fd850,#f9f047)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Fun Fact
      </h2>
      <div className='w-full h-full flex flex-col-reverse gap-4 text-center px-12'>
        <div className='text-[6px] sm:text-xs md:text-base lg:text-lg select-none'>
          <pre
            style={{
              whiteSpace: 'pre',
              lineHeight: '1',
            }}
          >
            <div ref={portraitRef}>
              {steveJobsPortraitLarge.map((line, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    lineRefs.current[idx] = el;
                  }}
                  style={{ opacity: 0 }}
                >
                  {line}
                </div>
              ))}
            </div>
          </pre>
        </div>
        <div className=''>
          <p className='leading-10'>
            I started coding when I was 12 after being inspired by the movie
            "Jobs" just to learn a couple of years later that Steve Jobs didn't
            write a single line of code for Apple
          </p>
        </div>
      </div>
    </section>
  );
};

export default FunFactSection;
