import React from "react";
/**
 * Component button who render button
 */
const Button = React.forwardRef((props,ref) => {
    /**
     * func what scroll if has element from props or exec callback if has from props
     */
    function handlerClick()
    {
        if(props.scrollTo!==undefined)
        {
            document.querySelector(props.scrollTo).scrollIntoView({block: "start", behavior: "smooth"});
        }
        if(props.onClick)
        {
            props.onClick()
        }
    }

    if(props.scrollTo!==undefined||props.onClick!=undefined)
    {
        return (
            <button type="button" ref={ref} className={props.type} onClick={handlerClick}>{props.children}</button>
        )
    }
    return (
        <button type="button" ref={ref} className={props.type}>{props.children}</button>
    )
})
export default Button;