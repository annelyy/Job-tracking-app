import React, { createContext, useContext, useState } from 'react';
import jobsData from './jobs';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [username, setUsername] = useState('USERNAME');
  const [jobs, setJobs] = useState(jobsData);
  const [page, setPage] = useState('');


  const addJob = (newJob) => {
    setJobs([...jobs, newJob]);
  };

  const deleteJob = (position, company) => {
    const updatedJobs = jobs.filter(job => {
      return job.position !== position || job.company !== company;
    });

    setJobs(updatedJobs);
  };


  return (
    <AppContext.Provider value={{
      isDarkTheme, setIsDarkTheme,
      username, setUsername,
      addJob, jobs, deleteJob,
      page, setPage
    }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };