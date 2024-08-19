import { useState } from "react";
import { callTypesDefault } from "../utils/initialStates";
import { getCurrentMMSS } from "../utils/utilityFunctions";

export default function CallForm(props) {
    
    const [isNewCall, setIsNewCall] = useState(true);
    const [incidentNumber, setIncidentNumber] = useState("");
    const [hasNewDetails, setHasNewDetails] = useState(false);

    const [address, setAddress] = useState("");
    const [callType, setCallType] = useState("");
    const [callTypeOptions, setCallTypeOptions] = useState(callTypesDefault);
    const [priority, setPriority] = useState(1);
    const [remarks, setRemarks] = useState([]);
    const [remarkInProgress, setRemarkInProgress] = useState("");
    const [callerName, setCallerName] = useState("");
    const [callerPhone, setCallerPhone] = useState("");
    const [callerAddress, setCallerAddress] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
    }

    function changeStateThunk(value, targetStateFunction) {
        setHasNewDetails(true);
        targetStateFunction(value);
    }

    function changeCallType(e) {
        setHasNewDetails(true);
        const defaultPriority = callTypeOptions.find(x => x.name === e.target.value).priority
        setCallType(e.target.value);
        setPriority(defaultPriority);
    }

    function handleRemarkEnter({key}) { //runs on buttonpress in the remarks input element
        if(/\S+/.test(remarkInProgress) && key === "Enter") {
            addRemark(remarkInProgress);
        }
    }

    function addRemark(input) {
        setRemarks((prev) => [...prev, {text: input.trim(), time: getCurrentMMSS()}]); //potential timezone conflict
        setRemarkInProgress("");
    }

    function clearForm(input) {
        setAddress("");
        setCallType("");
        setPriority("");
        setRemarks([]);
        setCallerName("");
        setCallerPhone("");
        setCallerAddress("");
    }

    function submitForm() { //send details, recieve incident number, get call details

    }

    return <div id="hcad_callForm" onSubmit={handleSubmit}> 
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
        <div id="hcad_callform_remarksdiv">
            <div id="hcad_callform_remarksinputwrapper">
              <input id="hcad_callform_remarksinput" type="text" value={remarkInProgress} onChange={e => changeStateThunk(e.target.value, setRemarkInProgress)} onKeyDown={handleRemarkEnter}></input>
              <button id="hcad_callform_remarksinputbtn" onClick={() => handleRemarkEnter({key :"Enter"})}>Add</button> {/*simulates an enter keypress*/}
            </div>
            <div id="hcad_callform_remarkslistwrapper">
                <ul id="hcad_callform_remarkslist">
                    {remarks.length === 0 ? null : remarks.map((x, i) => {
                        return <li className="hcad_callform_remarkli" key={i}>
                            <p className="hcad_callform_remarkli_text">{x.text}</p>
                            <p className="hcad_callform_remarkli_time"></p>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    </div>
}