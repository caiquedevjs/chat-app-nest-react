import './App.css';
import ChatInterface from './interfaces/chat.interface';
import UserInterface from './interfaces/user.interface';
import HomeInterface from './interfaces/home.interface';
import ChatPage from './Pages/chat.page';
import UserPage from './Pages/user.page';
import HomePage from './Pages/home.page';
import FormCreateUserPage from './Pages/form.create.user.page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormCreateUserInterface from './interfaces/form.create.user.interface';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Definindo rotas corretamente com `element` */}
          <Route path='/chat' element={<ChatPage Component={ChatInterface} />} />
          <Route path='/user' element={ <UserPage Component={UserInterface} />} />
          <Route path='/home' element={<HomePage Component={HomeInterface} />}/>
          <Route path='/singin' element={<FormCreateUserPage Component={FormCreateUserInterface}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
