import GreetingScreen from '@/components/GreetingScreen';
import WorkExperience from '@/components/WorkExperienceScreen';
import GetInTouchScreen from './components/GetInTouchScreen';
import FunFactSection from './components/FunFactSection';
import ThemeSwitch from './components/ThemeSwitch';
import TechnologiesSection from './components/TechnologiesSection';

const App = () => {
  return (
    <div className='font-mono'>
      <ThemeSwitch />
      <GreetingScreen />
      <WorkExperience />
      <FunFactSection />
      <TechnologiesSection />
      <GetInTouchScreen />
    </div>
  );
};

export default App;
