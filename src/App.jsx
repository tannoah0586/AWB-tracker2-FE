import { Routes, Route } from 'react-router'; 

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import { UserContext } from './contexts/UserContext';
import { useContext } from 'react';
import AWBDetail from './components/AWBDetail/AWBDetail';
import ShortlistedAwbs from './components/ShortlistedAwbs/ShortlistedAwbs';

const App = () => {
      const { user } = useContext(UserContext);

      
  return (
    <>
      <NavBar />
      {/* Add the Routes component to wrap our individual routes*/}
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path='/awb/:awbId' element={<AWBDetail/>} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/shortlisted' element= {<ShortlistedAwbs/>}/>
      </Routes>
    </>
  );
};

export default App;

