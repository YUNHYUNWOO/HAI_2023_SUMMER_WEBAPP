import React, {useState, useCallback, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BlobOptions } from 'buffer';

export function Join(){

    useEffect(()=>{
        if(localStorage.getItem("User") != null){
            navigate('/');
        }
    },[]);
    const [id, setId] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const [pwdChk, setPwdChk] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [isIdVaild, setIsIdVaild] = useState<boolean>(false);
    
    const [] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleIdInput = useCallback((e : React.ChangeEvent<HTMLInputElement>)=>{
        setId(e.target.value);
    }, [id]);
    const handleUserNameInput = useCallback((e : React.ChangeEvent<HTMLInputElement>)=>{
        setUserName(e.target.value);
    }, [userName]);
    const handlePwdInput = useCallback((e : React.ChangeEvent<HTMLInputElement>)=>{
        setPwd(e.target.value);
    }, [pwd]);
    const handlePwdChkInput = useCallback((e : React.ChangeEvent<HTMLInputElement>)=>{
        setPwdChk(e.target.value);
    }, [pwdChk]);
    const handleSubmit = useCallback(()=>{
        if(pwd === pwdChk){
            axios.post('http://localhost:80/users', { id:id, pwd:pwd, userName: userName })
            .then((res)=>{
                if(res.status == 200){
                    navigate('/login');
                }
                else if(res.status == 300){
                    
                }
            })
            .catch((err) =>{
                console.log(err);
            });
        }
        
    } , [id, pwd, pwdChk, userName]);

    return <div className="min-h-screen bg-white hero">
                <div className="flex-col hero-content lg:flex-row-reverse">
                    <div className="pl-8 text-center lg:text-left">
                        <h1 className="text-4xl font-bold text-HAI_blue-light">회원가입</h1>
                        <p className="py-6 text-HAI_blue-heavy">HAI 2023 여름 webapp 과제 사진 요약기</p>
                    </div>
                    <div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">id</span>
                                </label>
                                <input onChange = {handleIdInput} type="text" placeholder="id" className="input input-bordered" />
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">name</span>
                                </label>
                                <input onChange = {handleUserNameInput} type="text" placeholder="name" className="input input-bordered" />
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input onChange = {handlePwdInput} type="password" placeholder="password" className="input input-bordered" />
                                
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password 확인</span>
                                </label>
                                <input onChange = {handlePwdChkInput} type="password" placeholder="password 확인" className="input input-bordered" />
                                <label className="label">
                                    <a href="http://localhost:3000/login" className="label-text-alt link link-hover">로그인 하러가기</a>
                                </label>
                            </div>
                            <div className="mt-6 form-control">
                                <button className="btn btn-primary" onClick={handleSubmit}>Join</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>;
}