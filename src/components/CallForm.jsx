import { useState } from "react";
import { callTypesDefault } from "../utils/initialStates";
import { getMMSS } from "../utils/utilityFunctions";
import "./CallForm.css";
import { useDispatch } from "react-redux";
import { createCall } from "../features/callFormSlice";
import CallFormOverlay from "./CallFormOverlay";

export default function CallForm(props) {

    const dispatch = useDispatch();

    const [callFormState, setCallFormState] = useState(true);
    const [incidentNumber, setIncidentNumber] = useState("");
    const [hasNewDetails, setHasNewDetails] = useState(false);
    const [overlayState, setOverlayState] = useState(false);

    const [address, setAddress] = useState("");
    const [callTypeOptions, setCallTypeOptions] = useState(callTypesDefault);
    const [callType, setCallType] = useState("");
    const [priority, setPriority] = useState(1);
    const [remarks, setRemarks] = useState([]);
    const [remarkInProgress, setRemarkInProgress] = useState("");
    const [callerName, setCallerName] = useState("");
    const [callerPhone, setCallerPhone] = useState("");
    const [callerAddress, setCallerAddress] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if(address === "") {
            alert("Address required!");
        } else {
            dispatch(createCall({
                address: address,
                callType: callType,
                priority: priority,
                remarks: remarks,
                callerName: callerName,
                callerPhone: callerPhone,
                callerAddress: callerAddress
            }));
        }
    }

    function changeStateThunk(value, targetStateFunction) {
        setHasNewDetails(true);
        targetStateFunction(value.toUpperCase());
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
            setHasNewDetails(true);
        }
    }

    function addRemark(input) {
        setRemarks((prev) => [...prev, {text: input.trim(), time: getMMSS()}]); //potential timezone conflict
        setRemarkInProgress("");
    }

    function clearForm(input) {
        if(hasNewDetails) {

        }
        setAddress("");
        setCallType("");
        setPriority("");
        setRemarks([]);
        setCallerName("");
        setCallerPhone("");
        setCallerAddress("");
        setHasNewDetails(false);
    }

    return <div id="hcad_callForm" onSubmit={handleSubmit} className="newCall"> 

        <CallFormOverlay overlayState={overlayState} />

            {/* top section */}

        <div id="hcad_callForm_topdiv">
            <input autoComplete="off" pattern="/\S+/" id="hcad_callForm_addressinput" type="text" placeholder="Address" value={address} onChange={(e) => changeStateThunk(e.target.value, setAddress)} ></input>
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

            {/* remarks section */}

        <div id="hcad_callform_remarksdiv">
            <div id="hcad_callform_remarksinputwrapper">
              <input autoComplete="off" id="hcad_callform_remarksinput" type="text" value={remarkInProgress} onChange={e => changeStateThunk(e.target.value, setRemarkInProgress)} onKeyDown={handleRemarkEnter} placeholder="Enter Remark"></input>
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

            {/* caller section */}

        <div id="hcad_callform_callerdiv">
            <div id="hcad_callform_callerdiv_top">
                <input autoComplete="off" id="hcad_callform_callername" type="text" value={callerName} placeholder="Caller Name" onChange={(e) => changeStateThunk(e.target.value, setCallerName)}></input>
                <input autoComplete="off" id="hcad_callform_callerphone" type="text" value={callerPhone} placeholder="Caller Phone" onChange={(e) => changeStateThunk(e.target.value, setCallerPhone)}></input>
            </div>
            <input autoComplete="off" id="hcad_callform_calleraddress" type="text" value={callerAddress} placeholder="Caller Address" onChange={(e) => changeStateThunk(e.target.value, setCallerAddress)}></input>
            <button type="submit" onClick={handleSubmit} id="hcad_callform_submitbtn">ENTER CALL</button>
        </div>

    </div>
}