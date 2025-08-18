import GreetingScreen from '@/components/GreetingScreen';
import WorkExperience from '@/components/WorkExperienceScreen';
import GetInTouchScreen from './components/GetInTouchScreen';
import FunFactSection from './components/FunFactSection';
import ThemeSwitch from './components/ThemeSwitch';

const App = () => {
  return (
    <div className='font-mono'>
      <ThemeSwitch />
      <GreetingScreen />
      <WorkExperience />
      <FunFactSection />
      <GetInTouchScreen />
    </div>
  );
};

export default App;
