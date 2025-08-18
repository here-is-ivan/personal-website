import GreetingScreen from '@/components/GreetingScreen';
import WorkExperience from '@/components/WorkExperienceScreen';
import GetInTouchScreen from './components/GetInTouchScreen';
import FunFactSection from './components/FunFactSection';

const App = () => {
  return (
    <div className='font-mono'>
      <GreetingScreen />
      <WorkExperience />
      <FunFactSection />
      <GetInTouchScreen />
    </div>
  );
};

export default App;
