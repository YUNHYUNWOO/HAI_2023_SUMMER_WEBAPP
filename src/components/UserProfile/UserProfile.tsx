import { UserAvatar } from "./UserAvatar";
import {useEffect, useCallback} from 'react'
import { useNavigate } from "react-router-dom";
import {User} from '../../pages'

interface props {
    id : string,
    name : string,
    handleUser : (user: User | null) => void;
}
export function UserProfile({id, name, handleUser} : props){

    const navigate = useNavigate();

    useEffect(()=>{
        console.log(name);
        console.log(name[0]);
        console.log(name.charAt(0));
    }, []);

    const handleLogout = useCallback(()=>{
        localStorage.removeItem('User');
        handleUser(null);
        navigate('/');
    }, []);

    const handleHistoryClick = useCallback(()=>{
        navigate('/Histories');
    }, []);
    return <div className="dropdown dropdown-end">
                <label tabIndex={0} className="m-1">
                    <UserAvatar initial={name[0]} />
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li onClick={handleHistoryClick}><a>히스토리</a></li>
                    <li onClick={handleLogout}><a>로그아웃</a></li>
                </ul>
            </div>
};