import {useCallback} from 'react';
import { useNavigate } from 'react-router-dom';

export function Header(){
    const navigate = useNavigate();
    const handleClick = useCallback(()=>{
        navigate('/');
    },[]);

    return <header className= "w-full p-6 text-3xl font-bold text-center text-white shadow-lg bg-HAI_blue-heavy/100" onClick={handleClick}>HAI 2023 여름프로젝트</header>;
}