import React from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import HomePage from './pages/HomePage';  //Layout that will be displayed on home page
import MainLayout from './layouts/MainLayout'; //Layout on every page like navbar
import JobsPage from './pages/JobsPage'; //Show all jobs of page
import NotFoundPage from './pages/NotFoundPage'; //In case of error page not found
import JobPage,{jobLoader} from './pages/JobPage';//Inside wach page of a Job
import AddJobPage from './pages/AddJobPage'; //For Adding/Editing jobs
import EditJobPage from './pages/EditJobPage';


const App = () => {
  
  const addJob = async (newJob)=>{ //Adding Job in also adding it in the Api
    const res=await fetch('/api/jobs',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(newJob),
    });
    return;
  } 
  const deleteJob = async (id) => { //Delete
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    return;
  };

    // Update Job
    const updateJob = async (job) => {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });
      return;
    };
  
  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<HomePage/>}/>
        <Route path='/jobs' element={<JobsPage/>}/>
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob}/>}/> 
        <Route path='*' element={<NotFoundPage/>}/> 
        {/* Asterick likes like a catcher for all pages | ":id" To add dynamism */}
        <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob}/>} loader={jobLoader}/> 
        <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob}/>} loader={jobLoader}/> 
        
      </Route>
    )
  )
  return   <RouterProvider router={router} />
}

export default App
