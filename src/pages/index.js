import React from 'react'
import { homeObjOne } from './HomeElements'
import InfoSection from '../components/InfoSection/InfoSection';

const Home = () => {
    return (
      <>
        <InfoSection {...homeObjOne} />
      </>
    );
  };
  
  export default Home;