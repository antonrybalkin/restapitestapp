import React from 'react';
/**
 * Component what render tool tip when hover children
 * @param {object} props text and children
 * @returns 
 */
const ComponentTooltip = (props) => {
    return (
        <div className={'tooltip '}>
            {props.children}
            <div className={"tooltip_body"}>{props.text}</div>
        </div>
    );
}

export default ComponentTooltip;