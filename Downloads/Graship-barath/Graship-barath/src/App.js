import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login  from './Pages/Login';
import NewUserForm from './Pages/NewUserForm';
import Announcement from './Pages/Announcement';

function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/adduser' element={<NewUserForm/>}/>
        <Route path='/announcement' element={<Announcement/>}/>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
