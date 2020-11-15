import Header from './components/header/Header';
import MainForm from './components/mainForm/MainForm'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className = 'container'>
        <MainForm/>
      </div>
    </div>
  );
}

export default App;
