import classes from './hex2rgb.module.css'
import {ChangeEvent, useState} from "react";

export function Hex2rgb()  {
    const initialColor = '#000000'.toString();

    const [state, setColor] = useState({
        color: initialColor,
        rgbCaption: hexToRgbText(initialColor),
    });

    function hexIsValid(hex: string): RegExpExecArray | null {
        return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    }

    function onHexChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        const colorValue: string = e.target.value.trim();

        if (hexIsValid(colorValue)) {
            setColor({
                color: colorValue,
                rgbCaption: hexToRgbText(colorValue),
            });
        } else {
            setColor({...state,
                rgbCaption: hexToRgbText(colorValue),
            });
        }
    }

    function hexToRgbText(hex: string): string {
        const rgb = hexIsValid(hex);
        return rgb ?
            `rgb (${parseInt(rgb[1], 16)}, ${parseInt(rgb[2], 16)}, ${parseInt(rgb[3], 16)})`
            : 'Ошибка!';
    }

    return (
        <div className={classes["hex2rgbRoot"]} style={{'--background-color': state.color}}>
            <form className={classes["hex2rgbForm"]}>
                <input type="text" name="hex" defaultValue={initialColor} onChange={onHexChange}/>
                <input type="text" name="rgb" value={state.rgbCaption}/>
            </form>
        </div>
    )
}

export default Hex2rgb;
