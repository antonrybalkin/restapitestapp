import React, {useEffect, useState} from 'react';
import ComponentRadioBTN from './ComponentRadioBTN';
import ComponentPreloader from "./ComponentPreloader";
/**
 * Component what render group with radio btn and same name
 * @param {*} props 
 * @returns 
 */
const ComponentRadioGroup = (props) => {
    /**
     * const positions - store data from server
     */
    const [positions,
        setPositions] = useState([]);

    /**
     * Hook what get content for radio btn and store it
     */
    useEffect(() => {
        if(positions.length==0)
        {
            fetch(import.meta.env.VITE_APP_URL+"/api/v1/positions").then(response => {
            return response.json()
        }).then(data => {
            if (data.success) {
                setPositions(data.positions)
            }
        })
        }
    })
    if(positions.length>0)
    {
        return (
            <fieldset id={props.id} className={"registration_fieldset"}>
                {positions.map(el=>{
                    return <ComponentRadioBTN key={el.id} reqired={true} text={el.name} name={props.name} value={el.id}></ComponentRadioBTN>
                })}
                <span className={"input_error hide"}></span>
            </fieldset>
        );
       
    }
    else
    {
        return <ComponentPreloader></ComponentPreloader>
    }
}

export default ComponentRadioGroup;