import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';         
import 'primeicons/primeicons.css';                        
import 'primeflex/primeflex.css';    

import Carrental from './components/Carrental';


function App() {
  return (
    <div className="App" data-testid="home-page">
     <p>This is a Remote App for React</p>
     <Carrental/>
    </div>
  );
}

export default App;
