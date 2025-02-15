import { useEffect, useState } from "react"
import { ReactComponent as HeartIcon } from "../img/heart.svg";
import { ReactComponent as HeartFillIcon } from "../img/heart_fill.svg";

const IconToggleButton = ({value = false, onChangeValue}: {value?: boolean, onChangeValue?: (value: boolean) => void }) => {
    const [on, setOn] = useState(value);
    const toggle = () => {
        const newValue = !on;
        setOn(newValue);
        onChangeValue?.(newValue);
    }

    useEffect(()=>setOn(value),[value])
    return (
        <button
            onClick={toggle} 
            style={{
                padding: 4,
                outline:'none',
                border:'none',
                backgroundColor:'transparent'
            }}
        >
            {on ? <HeartFillIcon color='red'/> : <HeartIcon color='gray'/>}
        </button>
    )
}

export default IconToggleButton;