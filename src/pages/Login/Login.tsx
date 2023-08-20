import React, {useState, useCallback, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export type User = {
  id: string,
  userName: string
}  


export function Login(){

    useEffect(()=>{
        if(localStorage.getItem("User") != null){
            navigate('/');
        }
    },[]);

    const [id, setId] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const [] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleIdInput = useCallback((e : React.ChangeEvent<HTMLInputElement>)=>{
        setId(e.target.value);
    }, [id]);
    const handlePwdInput = useCallback((e : React.ChangeEvent<HTMLInputElement>)=>{
        setPwd(e.target.value);
    }, [pwd]);

    const handleSubmit = useCallback(()=>{
        axios.post('http://localhost:80/auth/login', { id:id, pwd:pwd })
        .then((res)=>{
            if(res.status == 200){
                localStorage.setItem('User', JSON.stringify(res.data));
                navigate('/');
            }
            else if(res.status == 300){
                
            }
        })
        .catch((err) =>{
            console.log(err);
        });
    } , [id, pwd]);

    return <div className="min-h-screen bg-white hero">
                <div className="flex-col hero-content lg:flex-row-reverse">
                    <div className="pl-8 text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-HAI_blue-light">로그인</h1>
                        <p className="py-6 text-HAI_blue-heavy">HAI 2023 여름 webapp 과제 사진 요약기 </p>
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
                                    <span className="label-text">Password</span>
                                </label>
                                <input onChange = {handlePwdInput} type="text" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="http://localhost:3000/join" className="label-text-alt link link-hover">회원가입 하러가기</a>
                                </label>
                            </div>
                            <div className="mt-6 form-control">
                                <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>;
}