import React from "react";

export function toLines(str) {
    return str.split('\n').map((s, i) => (
        <div key={i}>
            {s}
            <br />
        </div>
    ));
}
