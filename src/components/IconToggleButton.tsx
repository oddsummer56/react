import { ButtonHTMLAttributes, useEffect, useState } from "react"
import { ReactComponent as HeartIcon } from "../img/heart.svg";
import { ReactComponent as HeartFillIcon } from "../img/heart_fill.svg";

const IconToggleButton = ({initialValue = false, onChangeValue, ...props}
    : {initialValue?: boolean, onChangeValue?: (value: boolean) => void } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'| 'onClick' | 'children'>) => {
    const [on, setOn] = useState<boolean>(initialValue);
    const toggle = () => {
        const newValue = !on;
        onChangeValue?.(newValue);
        setOn(newValue);
    }
    return (
        <button
            {...props}
            onClick={toggle} 
            style={{
                ...props?.style,
                width: 'fit-content',
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