import React from "react";

function Request(props) {
    return (
        <div
            onClick={() => {
                props.onChecked(props.id);
            }}
        >
            <h3>{props.title}</h3>
            <p>{props.text}</p>
        </div>
    );
}

export default Request;
