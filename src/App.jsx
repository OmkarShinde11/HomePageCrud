import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import HomePage from './Page/HomePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LoginPage from './Page/LoginPage';
import SignUpPage from './Page/SignUpPage';
import CrudLayout from './ui/CrudLayout';
import BannerFormPage from './Page/BannerFormPage';
import KeyDifferenciators from './ui/keyDifferenciators';
import KeyDifferenciatorsFormPage from './Page/KeyDifferenciatorsFormPage';
import CoreUspFormPage from './Page/CoreUspFormPage';
import AwardFormPage from './Page/AwardFormPage';
import InsurancePartnerFormPage from './Page/InsurancePartnerFormPage';
import ExpertiesFormPage from './Page/ExpertiesFormPage';
import FaqFormPage from './Page/FaqFormPage';
import { Toaster } from 'react-hot-toast';
import CreateAdminPage from './Page/CreateAdminPage';

// here we create a query config
const queryClient=new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 0 // here stale time is a time till data is fresh one thistime done data is stale and if we leave the page then it automatically re-fetch.
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools/>
    <BrowserRouter>
    <Routes>
      <Route element={<AppLayout/>}>
        <Route index element={<Navigate replace to='/home'></Navigate>}></Route>
        <Route path='/home' element={<HomePage/>}/>
      </Route>

      <Route element={<CrudLayout/>}>
        <Route index element={<Navigate replace to='/banners'></Navigate>}></Route>
        <Route path='/banners' element={<BannerFormPage/>}></Route>
        <Route path='/keyDifferenciators' element={<KeyDifferenciatorsFormPage/>}></Route>
        <Route path='/core-usp' element={<CoreUspFormPage/>}></Route>
        <Route path='/awards' element={<AwardFormPage/>}></Route>
        <Route path='/insurance-partner' element={<InsurancePartnerFormPage/>}></Route>
        <Route path='/faq' element={<FaqFormPage/>}></Route>
        <Route path='/experties' element={<ExpertiesFormPage/>}></Route>
        <Route path='/createAdmin' element={<CreateAdminPage/>}></Route>
      </Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/signUp' element={<SignUpPage/>}></Route>
    </Routes>
    </BrowserRouter>
    <Toaster position='top-center' gutter={12} containerStyle={{marginTop:'50px',zIndex: 999999}} toastOptions={{
      success:{duration:2000},
      error:{duration:5000},
      style:{
        fontSize:"16px",
        maxWidth:"500px",
        padding:"16px 24px",
        background:"oklch(66.6% 0.179 58.318)",
        color:"oklch(98.7% 0.022 95.277)"
      }
    }}
    />
    </QueryClientProvider>
  )
}

export default App
