import { useState } from "react";
import cls from './trackbar.module.scss';

const Trackbar = ({inputRef, max, step, state, onChange}) => {

    console.log(state);

    return (
        <input
            max={max}
            step={step}
            type="range"
            value={state}
            ref={inputRef}
            onChange={onChange}
            className={`player__progressbar ${cls["player__volume-range"]}`}
            style={{background: `linear-gradient(to right, #5EA694 ${(state / max * 100)}%, #fff ${(state / max * 100)}%)`}}
        />
    )
}

export default Trackbar;