import React, {useRef, useState} from "react";
/**
 * Component FileLoader who render file input
 * @param {*} props 
 * @returns 
 */
const ComponentFileLoader = (props) => {
    const [name,
        setName] = useState(props.placeholer);
    const [error,
        setError] = useState([]);
    let filename = useRef();
    let input = useRef();

    async function handlerChange(e) {
        e.preventDefault();
        let status = await props.validator(e.target.files[0])
        if (status.valid) {
            filename.current.innerText = e.target.files[0].name.length > 20
                ? e
                    .target
                    .files[0]
                    .name
                    .substring(0, 20) + "..."
                : e.target.files[0].name;
            setName(filename.current.innerText);
            filename.current.classList.remove("error")
            document.querySelector(".file_error").classList.add("hide")
            setError(status.error)

        } else {
            filename.current.classList.add("error");
            document.querySelector(".file_error").classList.remove("hide")
            setError(status.error)
            input.current.value="";
        }
    }

    if (props.reqired) {
        return (

            <label className={"file_block"}>
                <input
                    ref={input}
                    type="file"
                    onChange={handlerChange}
                    required
                    className={"hide"}
                    name={props.name}
                    accept="image/jpeg, image/jpg"
                    />
                <span ref={filename} className={"file_input"}>{name}</span>
                <span className={"file_error hide"}>{error.length!=0?error.map(el=>{
                    return <div key={el[0]}>{el}</div>
                }):""}</span>
            </label>

        )
    } else {
        return (
            <label className={"fileblock"}>
                <input
                    ref={input}
                    type="file"
                    className={"hide"}
                    onChange={handlerChange}
                    name={props.name}
                    accept="image/jpeg, image/jpg"/>
                <span ref={filename} className={"file_input"}>{name}</span>
                <span className={"file_error hide"}>{error.length!=0?error.map(el=>{
                    return <div key={el[0]}>{el}</div>
                }):""}</span>
            </label>
        )
    }
}
export default ComponentFileLoader;