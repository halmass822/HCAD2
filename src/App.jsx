import './App.css';
import CallForm from './components/CallForm';
import CallList from './components/CallList';


function App() {
  return <div id="hcad_app">
    <div id="hcad_topdiv">
      <CallForm />
      <CallList />
    </div>
    <div id="hcad_bottomdiv">

    </div>
    </div>
}

export default App;
