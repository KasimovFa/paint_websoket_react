import Canvas from './component/Canvas';
import SettingBar from './component/SettingBar';
import Toolbar from './component/Toolbar';
import './styles/app.scss';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

function App() {
  return (
   <BrowserRouter>
      <Routes>
         <Route path = {"/:id"} element = {<Layout />} />
         <Route path = {"*"} element = {<Navigate to={`f${(+new Date).toString(16)}`}/>} />
       </Routes>
    </BrowserRouter>
  );
}


function Layout() {
  return (
         <div className="app">
            <Toolbar/>
            <SettingBar/>
            <Canvas/>
      </div>
  )
}



export default App;
