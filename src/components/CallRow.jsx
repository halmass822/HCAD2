import { useEffect, useState } from "react";
import { getMMSS } from "../utils/utilityFunctions";

export default function CallRow(props) {

    const [pending, setPending] = useState("--:--");

    useEffect(() => {
        const intervalid = setInterval(() => {
            setPending(getMMSS(Date.now() - props.callDetails.dateCreated));
        }, 1000);
        return () => clearInterval(intervalid);
    }, [])

    return <tr key={props.incident_number}>
        <td>{props.callDetails.priority}</td>
        <td>{pending}</td>
        <td>{props.callDetails.callType}</td>
        <td className="hcad_callrow_td_address">{props.callDetails.address}</td>
        <td>{props.callDetails.incidentNumber}</td>
        <td className="hcad_callrow_td_units">{props.callDetails.assignedUnits.join(", ")}</td>
    </tr>
}