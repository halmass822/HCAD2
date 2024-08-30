export default function UnitRow(props) {
    return <tr className="hcad_unitrow">
        <td className="hcad_unitrow_td_unit">{props.unitDetails.unit}</td>
        <td className="hcad_unitrow_td_idle">{/*props.unitDetails.idle*/}</td>
        <td className="hcad_unitrow_td_status">{props.unitDetails.status}</td>
        <td className="hcad_unitrow_td_officer">{props.unitDetails.officer2 === "" ? props.unitDetails.officer1 : `${props.unitDetails.officer1}, ${props.unitDetails.officer2}`}</td>
        <td className="hcad_unitrow_td_badge">{props.unitDetails.badge2 === "" ? props.unitDetails.badge1 : `${props.unitDetails.badge1}, ${props.unitDetails.badge2}`}</td>
        <td className="hcad_unitrow_td_location">{props.unitDetails.location}</td>
        {/* <td className="hcad_unitrow_td_unit">{props.unitDetails.unit}</td> */}
    </tr>
}