export default function CallFormOverlay(props) {
    return props.overlayState && <div id="hcad_callformoverlay_wrapper">
        <div id="hcad_callformoverlay">
            <h2>Form Data Will Be Lost!</h2>
            <div id="hcad_callformoverlay_buttonwrapper">
                <button onClick={props.cancelButton}>Cancel</button>
                <button onClick={props.proceedButton}>Proceed</button>
            </div>
        </div>
    </div> 
}