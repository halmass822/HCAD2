import './App.css';
import CallForm from './components/CallForm';
import CallList from './components/CallList';
import EditUnitOverlay from './components/EditUnitOverlay';
import { UnitList } from './components/UnitList';


function App() {
  return <div id="hcad_app">
    <EditUnitOverlay />
    <div id="hcad_topdiv">
      <CallForm />
      <CallList />
    </div>
    <div id="hcad_bottomdiv">
      <UnitList />
    </div>
    </div>
}

export default App;
