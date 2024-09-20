import './App.css';
import CallForm from './components/CallForm/CallForm';
import CallList from './components/CallList/CallList';
import DisclaimerOverlay from './components/DisclaimerOverlay';
import EditUnitOverlay from './components/UnitList/EditUnitOverlay';
import { UnitList } from './components/UnitList/UnitList';


function App() {
  return <div id="hcad_app">
    <EditUnitOverlay />
    <DisclaimerOverlay />
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
