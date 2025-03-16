import { ButtonHTMLAttributes } from "react"
import { ReactComponent as HeartIcon } from "../img/heart.svg";
import { ReactComponent as HeartFillIcon } from "../img/heart_fill.svg";

type Props = { value?: boolean } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'children'>

const IconToggleButton = ({value = false, ...props}: Props) => {

    return (
        <button
            {...props} 
            style={{
                ...props?.style,
                width: 'fit-content',
                padding: 4,
                outline:'none',
                border:'none',
                backgroundColor:'transparent'
            }}
        >
            {value ? <HeartFillIcon color='red'/> : <HeartIcon color='gray'/>}
        </button>
    )
}

export default IconToggleButton;
export type { Props as IconToggleButtonProps }