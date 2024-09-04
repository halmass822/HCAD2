import { useEffect, useRef, useState } from "react";
import { callTypesDefault } from "../utils/initialStates";
import { getMMSS } from "../utils/utilityFunctions";
import "./CallForm.css";
import { useDispatch, useSelector } from "react-redux";
import { createCall, editCall, selectFormState, selectLoadedCall, setFormState, setFormUIHeight } from "../features/callFormSlice";
import CallFormOverlay from "./CallFormOverlay";

export default function CallForm(props) {

    const dispatch = useDispatch();

    const [hasNewDetails, setHasNewDetails] = useState(false); //warns user before form data is lost and call abandoned
    const [overlayState, setOverlayState] = useState(false); 
    const formState = useSelector(selectFormState);
    const [updateRadioState, setUpdateRadioState] = useState(true);

    const [incidentNumber, setIncidentNumber] = useState("");
    const [address, setAddress] = useState("");
    const [callType, setCallType] = useState(callTypesDefault[0].name);
    const [priority, setPriority] = useState(1);
    const [remarks, setRemarks] = useState([]);
    const [remarkInProgress, setRemarkInProgress] = useState("");
    const [callerName, setCallerName] = useState("");
    const [callerPhone, setCallerPhone] = useState("");
    const [callerAddress, setCallerAddress] = useState("");

    const loadedCall = useSelector(selectLoadedCall);

    useEffect(() => {
        const UIHeight = document.getElementById("hcad_callForm").clientHeight;
        dispatch(setFormUIHeight(UIHeight));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        if(!address) {
            alert("Address required!");
        } else {
            setHasNewDetails(false);
            if(formState === "create") {
                dispatch(createCall({
                    address: address,
                    callType: callType,
                    priority: priority,
                    remarks: remarks,
                    callerName: callerName,
                    callerPhone: callerPhone,
                    callerAddress: callerAddress
                }));
                dispatch(setFormState("update"));
            } else if(formState === "update") {
                dispatch(editCall({
                    incidentNumber: incidentNumber,
                    address: address,
                    callType: callType,
                    priority: priority,
                    remarks: remarks,
                    callerName: callerName,
                    callerPhone: callerPhone,
                    callerAddress: callerAddress
                }))
            }
        }
    }

    function changeStateThunk(value, targetStateFunction) {
        setHasNewDetails(true);
        targetStateFunction(value.toUpperCase());
    }

    function changeCallType(e) {
        setHasNewDetails(true);
        const defaultPriority = callTypesDefault.find(x => x.name === e.target.value).priority
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

    function clearForm() {
        setAddress("");
        setIncidentNumber("");
        setCallType("ASSAULT");
        setPriority("1");
        setRemarks([]);
        setRemarkInProgress("");
        setCallerName("");
        setCallerPhone("");
        setCallerAddress("");
        setHasNewDetails(false);
    }

    function confirmFormChange() {
        setIncidentNumber(loadedCall.incidentNumber)
        setAddress(loadedCall.address);
        setCallType(loadedCall.callType);
        setPriority(loadedCall.priority);
        setRemarks(loadedCall.remarks);
        setCallerName(loadedCall.callerName);
        setCallerPhone(loadedCall.callerPhone);
        setCallerAddress(loadedCall.callerAddress);
        setOverlayState(false);
    }

    function handleRadioClick(e) {
        dispatch(setFormState(e.target.value));
        if(e.target.value === "create") clearForm();
    }

    useEffect(() => { 
        if(loadedCall.incidentNumber === incidentNumber) return;
        if(hasNewDetails) {
            setOverlayState(true);
        } else {
            clearForm();
            confirmFormChange();
        }
    }, [loadedCall])

    function cancelFormChange() {
        setOverlayState(false);
    }

    return <div id="hcad_callForm" onSubmit={handleSubmit} className="newCall"> 

        <CallFormOverlay overlayState={overlayState} proceedButton={confirmFormChange} cancelButton={cancelFormChange}/>

            {/* top section */}
        
        <div id="hcad_callForm_topdiv">
            <div id="hcad_callform_radiodiv">
                <label>Create</label>
                <input type="radio" className="hcad_callform_radio" value="create" checked={formState === "create"} onChange={handleRadioClick}></input>
                <label>Update</label>
                <input type="radio" className="hcad_callform_radio" value="update" checked={formState === "update"} onChange={handleRadioClick} disabled={formState === "create"}></input>
                <label>Select</label>
                <input type="radio" className="hcad_callform_radio" value="select" checked={formState === "select"} onChange={handleRadioClick} disabled={formState === "create"}></input>
                <input type="text" id="hcad_callform_incidentNumber" disabled={true} value={incidentNumber}></input>
            </div>

            <input disabled={formState === "select" ? "disabled" : ""} autoComplete="off" pattern="/\S+/" id="hcad_callForm_addressinput" type="text" placeholder="Address" value={address} onChange={(e) => changeStateThunk(e.target.value, setAddress)}></input>
        </div>

        <div id="hcad_callform_typeprioritywrapper">
            <select disabled={formState === "select" ? "disabled" : ""} id="hcad_callForm_calltypeselect" value={callType} onChange={changeCallType}>
                {<option key={1} value={callTypesDefault[0].name}>{callTypesDefault[0].name}</option>}
                {[...callTypesDefault].slice(1).map((x, i) => {
                    return <option key={i + 1} value={x.name}>{x.name}</option>
                })}
            </select>
            <select disabled={formState === "select" ? "disabled" : ""} id="hcad_callForm_priorityselect" value={priority} onChange={e => changeStateThunk(e.target.value, setPriority)}>
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
                <input disabled={formState === "select" ? "disabled" : ""} autoComplete="off" id="hcad_callform_callername" type="text" value={callerName} placeholder="Caller Name" onChange={(e) => changeStateThunk(e.target.value, setCallerName)}></input>
                <input disabled={formState === "select" ? "disabled" : ""} autoComplete="off" id="hcad_callform_callerphone" type="text" value={callerPhone} placeholder="Caller Phone" onChange={(e) => changeStateThunk(e.target.value, setCallerPhone)}></input>
            </div>
            <input disabled={formState === "select" ? "disabled" : ""} autoComplete="off" id="hcad_callform_calleraddress" type="text" value={callerAddress} placeholder="Caller Address" onChange={(e) => changeStateThunk(e.target.value, setCallerAddress)}></input>
            <button disabled={formState === "select" ? "disabled" : ""} type="submit" onClick={handleSubmit} id="hcad_callform_submitbtn">{formState === "update" ? "UPDATE" : "ENTER"} CALL</button>
        </div>

    </div>
}