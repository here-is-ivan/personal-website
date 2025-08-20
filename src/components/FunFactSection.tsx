import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

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

  const steveJobsPortraitSmall = [
    '░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░░░░▓████▒░░░░░░░░░░░░░░░',
    '░░░░░░░░░░░███████████░░░░░░░░░░░░░',
    '░░░░░░░░░▓█▓▒▓▓▓▓▓▓▓████░░░░░░░░░░░',
    '░░░░░░░░██▓░░░░░░░▒▒▓████░░░░░░░░░░',
    '░░░░░░░░██▒░░░░░░░░▒▓████▓░░░░░░░░░',
    '░░░░░░░░██▒░░░░░░░░▒▓████▓░░░░░░░░░',
    '░░░░░░░▓█▓▒░░░░░░░░░▒▓████▓░░░░░░░░',
    '░░░░░░░▓██▒▒▓▓▓▒░░▓████████░░░░░░░░',
    '░░░░░░░▒▓▒░░░░▒▒░░█▓▒▓████▓░░░░░░░░',
    '░░░░░░░░▒▒░░░░░░░░█▓░░▒▓██░░░░░░░░░',
    '░░░░░░░░░▒▓▒░░░░░░██▓▒███░░░░░░░░░░',
    '░░░░░░░░░░▒▒░░░░▒▓███▓███░░░░░░░░░░',
    '░░░░░░░░░░░░▒▓▓▓▓▓██████▓░░░░░░░░░░',
    '░░░░░░░░░░░▒▓▓▒░▒▓▓█████▓░░░░░░░░░░',
    '░░░░░░░░░░░▒▓▓▒▒▒▓█▓▓█████▓░░░░░░░░',
    '░░░░░░░░░░░▓▓▓█▒░░█████████████▓░░░',
    '░░░░░░░░▓██████░░░░▒███████████████',
    '░░░░░▓████████▓░░░░▒███████████████',
    '░▒███████████▓░░░▓▓████████████████',
    '████████████▓░░▒▒▒▓▓███████████████',
    '█████████████▒▓▓▓▓▓▓▓██████████████',
  ];

  // separate refs for large and small portraits so we can animate either one
  const portraitRefLarge = useRef<HTMLDivElement>(null);
  const portraitRefSmall = useRef<HTMLDivElement>(null);
  const largeLineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const smallLineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (largeLineRefs.current) {
      gsap.set(largeLineRefs.current, { opacity: 0 });
      gsap.to(largeLineRefs.current, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: portraitRefLarge.current,
          start: 'top 100%',
          end: 'top 10%',
          scrub: true,
        },
      });
    }

    if (smallLineRefs.current) {
      gsap.set(smallLineRefs.current, { opacity: 0 });
      gsap.to(smallLineRefs.current, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: portraitRefSmall.current,
          start: 'top 100%',
          end: 'top 50%',
          scrub: true,
          markers: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className='min-h-dvh w-dvw flex items-center justify-center flex-col dark:bg-black dark:text-green-500 py-12'>
      <h2 className='blue-gradient-text dark:green-gradient-text font-black text-4xl mb-6'>
        Fun Fact
      </h2>
      <div className='w-full h-full flex flex-col-reverse gap-4 text-center px-12'>
        <div className='select-none'>
          {/* large portrait: visible on small screens (hidden from md up) */}
          <div className='text-base hidden md:block'>
            <pre style={{ whiteSpace: 'pre', lineHeight: '1' }}>
              <div ref={portraitRefLarge}>
                {steveJobsPortraitLarge.map((line, idx) => (
                  <div
                    key={idx}
                    ref={(el) => {
                      largeLineRefs.current[idx] = el;
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </pre>
          </div>

          {/* small portrait: hidden by default, shown from md and up */}
          <div className='block md:hidden text-xs sm:text-lg'>
            <pre style={{ whiteSpace: 'pre', lineHeight: '1' }}>
              <div ref={portraitRefSmall}>
                {steveJobsPortraitSmall.map((line, idx) => (
                  <div
                    key={idx}
                    ref={(el) => {
                      smallLineRefs.current[idx] = el;
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </pre>
          </div>
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
