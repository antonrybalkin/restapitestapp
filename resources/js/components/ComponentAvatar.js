import React from "react";

/**
 * Component Image who render img avatar
 * @param {string} param0 url from props 
 * @returns 
 */
const Avatar = ({url}) => {
    if(url=='')
    {
        url='https://placehold.co/70x70';
    }
    return (
        <div className={"user_avatar"}>
            <img
                src={url}
                className={"user_img"}
                alt=""/></div>
    )
}
export default Avatar;