import React, {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
function LoginButton(){

    const navigate = useNavigate();
    const handleLoginClick = useCallback(()=>{
        navigate('/login');
    },[])

    const handleJoinClick = useCallback(()=>{
        navigate('/join');
    },[])

    return <div className='flex-row'>
                <button className='w-20 p-0 pt-0 text-base font-semibold text-white rounded-2xl btn btn-secondary' onClick={handleLoginClick}>로그인</button>
                <button className='w-20 p-0 pt-0 ml-4 font-semibold text-white ext-base rounded-2xl btn btn-primary' onClick={handleJoinClick}>회원가입</button>
         </div>;
}

export default LoginButton;