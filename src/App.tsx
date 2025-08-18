import GreetingScreen from '@/components/GreetingScreen';
import WorkExperience from '@/components/WorkExperienceScreen';
import GetInTouchScreen from './components/GetInTouchScreen';

const App = () => {
  return (
    <div className='font-mono'>
      <GreetingScreen />
      <WorkExperience />
      <GetInTouchScreen />
    </div>
  );
};

export default App;
