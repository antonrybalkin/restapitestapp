import React, {useState, useRef} from 'react';
/**
 * Component Input what render input and with props and validate by prps callback
 * @param {*} props 
 * @returns 
 */
const ComponentInput = (props) => {

    const [error,
        setError] = useState("");

    let input = useRef();

    function validator(e) {
        setTimeout(() => {
            let status = props.validator(e.target.value);
            if (status !== true&& e.target.value!=="") {
                input.current.classList.add("error")
                setError("Incorrect data")
            }
            else
            {
                input.current.classList.remove("error")
                document.querySelector(".input[name='"+props.name+"'] ~ .input_error").classList.add("hide")
                setError("")
            }
        }, 500)
    }

    if (props.reqired) {
        return (
            <label className='input_label'>
                <input
                    ref={input}
                    type={props.type}
                    className={"input"}
                    required
                    onBlur={validator}
                    placeholder={props.placeholder}
                    name={props.name}/>
                     <span className={"input_error hide"}>{error!==""?error:""}</span>
                    
            </label>
        );
    } else {
        return (
            <label className='input_label'><input
                ref={input}
                type={props.type}
                className={"input"}
                onChange={validator}
                placeholder={props.placeholder}
                name={props.name}/>
                <span className={"input_error hide"}>{error!==""?error:""}</span>
                </label>
        );
    }
}

export default ComponentInput;