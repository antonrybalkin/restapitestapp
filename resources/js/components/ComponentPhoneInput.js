import React, {useRef, useEffect, useState} from 'react';
/**
 * Component
 * what render input type tel and validate and format phone in real time
 * @param {Object} props 
 * {
 * reqired bool - for set option require
 * placeholder string - for set placeholder in input 
 * }
 * @returns
 */
const ComponentPhoneInput = (props) => {

    let input = useRef();
    /**
     * Const what store if pressed Backspace
     */
    const [keyBackspace,
        setBackspace] = useState(false)
    /**
     * Const what store if pressed numbers
     */
    const [keyNumber,
        setNumber] = useState(false)
    /**
    * Hook what set onfocus and onblur callback
     */
    useEffect(() => {
        /**
         *  init value on focus with text: +38 (0XX) 
         */
        input.current.onfocus = () => {
            if (input.current.value.indexOf("+") === -1) {
                input.current.value = input
                    .current
                    .value
                    .indexOf("+38 (0XX)") == -1
                    ? "+38 (0XX)" + input.current.value
                    : input.current.value;

            }
        }
        /**
         * remove date form value if user nothing input
         */
        input.current.onblur = () => {
            if (input.current.value.length == 9) 
                input.current.value = input.current.value.indexOf("+38 (0XX)") == 0
                    ? ""
                    : input.current.value;
            }
        })
/**
 * Handler input format number in real time
 * @param {Event} e 
 */
    function onInput(e) {
        if (e.target.value !== "" && keyBackspace == false && keyNumber) {

            if (e.target.value.length > 19) {
                let Number = e
                    .target
                    .value
                    .replace(/[^\d]/g, '')
                    .match(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/);
                e.target.value = "+38 (" + Number[2] + ") " + Number[3] + " " + Number[4] + " " + Number[5];
            } else {
                let tmp = e
                    .target
                    .value
                    .replace(/[^\d]/g, '');

                tmp = tmp.substring(3, tmp.length)
                switch (true) {
                    case tmp.length <= 2 && tmp.length >= 1:
                        {
                            let Number = tmp.match(/(\d{1,2})/);
                            e.target.value = Number[1].length == 2
                                ? "+38 (0" + Number[1] + ") "
                                : "+38 (0" + Number[1] + "X) ";
                        }
                        break;
                    case tmp.length < 6 && tmp.length >= 3:
                        {
                            let Number = tmp.match(/(\d{2})(\d{1,3})/);
                            e.target.value = "+38 (0" + Number[1] + ") " + (Number[2].length == 3
                                ? Number[2] + " "
                                : Number[2]);
                        }
                        break;
                    case tmp.length < 8 && tmp.length >= 6:
                        {
                            let Number = tmp.match(/(\d{2})(\d{3})(\d{1,2})/);
                            e.target.value = "+38 (0" + Number[1] + ") " + Number[2] + " " + Number[3];
                        }
                        break;
                    case tmp.length < 10 && tmp.length >= 8:
                        {
                            let Number = tmp.match(/(\d{2})(\d{3})(\d{2})(\d{1,2})/);
                            e.target.value = "+38 (0" + Number[1] + ") " + Number[2] + " " + Number[3] + " " + Number[4];
                        }
                        break;

                }
            }
        }

    }
/**
 * Handler onblur format number when user switch focus
 * @param {*} e 
 */
    function blurHandler(e) {
        let errorSpan = document.querySelector(".input[name='" + props.name + "'] ~ .input_error");
        let helperSpan = document.querySelector(".input[name='" + props.name + "'] ~ .input_helper");
        let tmp = "+" + e
            .target
            .value
            .replace(/[^\d]/g, '');
        if (tmp.match(/^[\+]{0,1}380([0-9]{9})$/) == null) {
            helperSpan
                .classList
                .add("hide")
            errorSpan
                .classList
                .remove("hide")
            errorSpan.innerText = "Invalid number";
        } else {
            input
                .current
                .classList
                .remove("error");
            helperSpan
                .classList
                .remove("hide")
            errorSpan
                .classList
                .add("hide")
        }
    }

    if (props.reqired) {
        return (
            <label className='input_label'>
                <input
                    ref={input}
                    type="tel"
                    className={"input"}
                    required
                    onInput={onInput}
                    onPaste={onInput}
                    onBlur={blurHandler}
                    onKeyUp={(e) => {
                    if (e.key == "Backspace") {
                        setBackspace(false)
                    }
                }}
                    onKeyDown={(e) => {
                    if (e.key == "Backspace") {
                        setBackspace(true);
                        setNumber(false)
                    }
                    if (/([0-9])/.test(e.target.value)) {
                        setNumber(true)
                    }
                }}
                    placeholder={props.placeholder}
                    name={props.name}/>
                <span className={"input_helper"}>{"+38 (XXX) XXX - XX - XX"}</span>
                <span className={"input_error hide"}></span>
            </label>
        );
    } else {
        return (
            <label className='input_label'><input
                ref={input}
                type={"text"}
                className={"input"}
                onInput={onInput}
                placeholder={props.placeholder}
                name={props.name}/>
                <span className={"input_helper"}>{"+38 (XXX) XXX - XX - XX"}</span>
                <span className={"input_error hide"}></span>
            </label>
        );
    }
}

export default ComponentPhoneInput;