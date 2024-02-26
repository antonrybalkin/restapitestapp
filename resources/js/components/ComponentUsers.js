import React, {useEffect, useRef, useState,useContext} from 'react';
import UserCard from './ComponentUser';
import Button from './ComponentButtton';
import {LocalContext} from './Context';
import ComponentPreloader from "./ComponentPreloader";

/**
 * Componet what render users section with users
 * 
 * @returns 
 */
const Users = () => {
    const [users,
        setUsers] = useState(null);
    const [page,
        setPage] = useState(1);
    const [pages,
        setPages] = useState(null);
    let btn = useRef()
    const { re_render,setRe_Render } = useContext(LocalContext);
        /**
         * Hook what get first data when did mount
         */
    useEffect(() => {
        if (users == null && (pages == null || pages > page)) {
            fetch(import.meta.env.VITE_APP_URL+"/api/v1/users?page=" + page + "&count=6").then(response => {
                return response.json()
            }).then(data => {
                setUsers(data.users);
                setPage(2)
                setPages(data.total_pages)
            })
        }
    })
    /**
     * Hook what reset data when created new user and get it again
     */
    useEffect(()=>{
        if (pages < page&&pages!=null) {
            btn.current.style.display = "none";
        }
        if(re_render)
        {
            setRe_Render(false);
            setPage(2);
            setUsers("");
            fetch(import.meta.env.VITE_APP_URL+"/api/v1/users?page=" + 1 + "&count=6").then(response => {
                return response.json()
            }).then(data => {
                setUsers(data.users);
                setPages(data.total_pages);
            })

        }
    });
/**
 * func callback on click what load more data users 
 */
    function showMore() {
        fetch(import.meta.env.VITE_APP_URL+"/api/v1/users?page=" + page + "&count=6").then(response => {
            return response.json()
        }).then(data => {
            setUsers([...users,...data.users]);
            setPage(page + 1)
        })
    }
    if (users != null&&users != "") {
        return (
            <section className={"users"}>
                <h2 className={"users_title"}>
                    Working with GET request
                </h2>
                <div className={"users_cards"}>
                    {users.map(el => {
                        return <UserCard key={el.id} data={el}></UserCard>
                    })}
                </div>
                <Button type={"users_button"} ref={btn} onClick={showMore}>Show more</Button>
            </section>
        )
    } else {
        return(
            <section className={"users"}>
                    <h2 className={"users_title"}>
                        Working with GET request
                    </h2>
                    <div className={"users_cards"}>
                        <ComponentPreloader/>
                    </div>
                    <Button type={"users_button"} ref={btn} onClick={showMore}>Show more</Button>
                </section>)
    }

}
export default Users;
