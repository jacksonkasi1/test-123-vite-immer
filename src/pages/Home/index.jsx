import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ChangeMode } from '../../store/slice/themeConfig';

const Home = () => {
  const dispatch = useDispatch();
  const toggleDarkMode = () => {
    dispatch(ChangeMode());
  };

  return (
    <div>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      <div className={`w-[400px] h-[400px] bg-red-400 dark:bg-black`}></div>
    </div>
  );
};

export default Home;
