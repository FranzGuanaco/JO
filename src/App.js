import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage'; 
import './App.css';
import OfferPage from './OfferPage';
import PaymentPage from './PaymentPage';
import AdminPage from './AdminPage';
import Login from './Login';
import CreateAccount from './CreateAccount';
import AdminLogin from './AdminLogin';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
                <Routes>
          
                <Route path='/' element={<Homepage/>} />
                <Route path='/offer' element={<OfferPage/>} />
                <Route path='/payment' element={<PaymentPage />} />
                <Route path='/admin' element={<AdminPage />} /> 
                <Route path='/login' element={<Login />} /> 
                <Route path='/create_account' element={<CreateAccount />} /> 
                <Route path='/adminLogin' element={<AdminLogin />} /> 
            
            </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
