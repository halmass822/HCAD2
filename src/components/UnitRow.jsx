import { useEffect, useState } from "react";
import { getMMSS } from "../utils/utilityFunctions";

export default function UnitRow(props) {

    const [pending, setPending] = useState("--:--");

    useEffect(() => {
        const intervalid = setInterval(() => {
            setPending(getMMSS(Date.now() - props.unitDetails.idle));
        }, 1000);
        return () => clearInterval(intervalid);
    }, []);

    return <tr className={`hcad_unitrow hcad_unitrow_status${props.unitDetails.status}`}>
        <td className="hcad_unitrow_td_unit">{props.unitDetails.unit}</td>
        <td className="hcad_unitrow_td_idle">{[pending]}</td>
        <td className="hcad_unitrow_td_status">{props.unitDetails.status}</td>
        <td className="hcad_unitrow_td_officer">{props.unitDetails.officer2 === "" ? props.unitDetails.officer1 : `${props.unitDetails.officer1}, ${props.unitDetails.officer2}`}</td>
        <td className="hcad_unitrow_td_badge">{props.unitDetails.badge2 === "" ? props.unitDetails.badge1 : `${props.unitDetails.badge1}, ${props.unitDetails.badge2}`}</td>
        <td className="hcad_unitrow_td_location">{props.unitDetails.location}</td>
        <td className="hcad_unitrow_td_calltype">{props.unitDetails.incidentType}</td>
        <td className="hcad_unitrow_td_incnum">{props.unitDetails.incidentNumber}</td>
        <td className="hcad_unitrow_td_actions">
            <button id="hcad_dispatchunitbtn">DP</button>
            <button id="hcad_clearunitbtn">CL</button>
        </td>
    </tr>
}