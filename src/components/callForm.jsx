import { useState } from "react";
import { callTypesDefault } from "../utils/initialStates";

export default function CallForm(props) {
    
    const [isNewCall, setIsNewCall] = useState(true);
    const [incidentNumber, setIncidentNumber] = useState("");
    const [hasNewDetails, setHasNewDetails] = useState(false);

    const [address, setAddress] = useState("");
    const [callType, setCallType] = useState("");
    const [callTypeOptions, setCallTypeOptions] = useState(callTypesDefault);
    const [priority, setPriority] = useState(1);
    const [remarks, setRemarks] = useState([]);
    const [callerName, setCallerName] = useState("");
    const [callerPhone, setCallerPhone] = useState("");
    const [callerAddress, setCallerAddress] = useState("");

    const changeStateThunk = (value, targetStateFunction) => {
        setHasNewDetails(true);
        targetStateFunction(value);
    }

    const changeCallType = (e) => {
        console.log(e.target.value);
        setHasNewDetails(true);
        const defaultPriority = callTypeOptions.find(x => x.name === e.target.value).priority
        console.log(defaultPriority);
        setCallType(e.target.value);
        setPriority(defaultPriority);
    }

    const addRemark = (input) => {
        setRemarks((prev) => [...prev, input]);
    }    

    const clearForm = (input) => {
        setAddress("");
        setCallType("");
        setPriority("");
        setRemarks([]);
        setCallerName("");
        setCallerPhone("");
        setCallerAddress("");
    }

    const submitForm = () => { //send details, recieve incident number, get call details

    }

    return <form id="hcad_callForm"> 
        <div id="hcad_callForm_topdiv">
            <input id="hcad_callForm_addressinput" type="text" placeholder="address" value={address} onChange={(e) => changeStateThunk(e.target.value, setAddress)}></input>
        </div>
        <div id="hcad_callform_typeprioritywrapper">
            <select id="hcad_callForm_calltypeselect" value={callType} onChange={changeCallType}>
                {[...callTypeOptions].map((x, i) => {
                    return <option key={i} value={x.name}>{x.name}</option>
                })}
            </select>
            <select id="hcad_callForm_priorityselect" value={priority} onChange={e => changeStateThunk(e.target.value, setPriority)}>
                {["0", "1", "2", "3"].map((x, i) => {
                    return <option key={i} value={x}>{x}</option>
                })}
            </select>
        </div>
    </form>
}