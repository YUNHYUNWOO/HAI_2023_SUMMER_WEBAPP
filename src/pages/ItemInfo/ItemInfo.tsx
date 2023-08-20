import React, {useState, useCallback, useEffect} from 'react';
import axios from 'axios';
import { Div } from '../../components';
import { useLocation } from 'react-router-dom';
import {User} from '../';
import { UserProfile } from '../../components/UserProfile';
import {LoginButton, Header} from '../../components'

const ItemInfo = () => {
    const location = useLocation();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);

    useEffect(()=>{
        const userStr = localStorage.getItem('User');
        if(userStr != null)
            setUser(JSON.parse(userStr) as User);
        console.log(user);
    }, []);


    const handleRegenerate = useCallback(() => {
        axios.post('http://localhost:80/api/summarizeText', {
            input_text : location.state.ocrTexts[0]
        })
        .then((res)=>{
             
            let textArr = res.data.content.split('\n', 1)[0];
            const content = res.data.content.substring(textArr.length + 1);
            setTitle(textArr);
            setContent(content); 
            if(user != null)
                return axios.put(`http://localhost:80/users/${user?.id}/history/${location.state._id}`, {title, content});
        });
    }, [user]);

    const handleDownloadOcr = useCallback(()=>{
        let fileName = `${title} ocr 결과.txt`;
        let output = location.state.ocrTexts[0];
        const element = document.createElement('a');
        const file = new Blob([output], {
        type: 'text/plain',
        });
        console.log(title);
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        element.click();
    }, [location]);

    const handleDownloadSummarize = useCallback(()=>{
        let fileName = `${title} ocr 결과.txt`;
        console.log(title);
        let output = `${title}\n${content}`;
        const element = document.createElement('a');
        const file = new Blob([output], {
        type: 'text/plain',
        });
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        element.click();
    }, [title, content]);
    
    useEffect(()=>{
        setTitle(location.state.title);
        setContent(location.state.content);
    }, [location]);
    
    

    return <Div className= "relative bg-white">
                <Header/>
                <section className ="max-w-3xl mx-auto bg-white max-h-fit sm:px-6">
                    <div className='relative flex flex-col h-screen pl-4 pr-4 max-h-fit'>
                        <div className='absolute mt-4 right-4'>
                            {   
                                user ? <UserProfile id = {user.id} name = {user.userName} handleUser={setUser}/> : <LoginButton/>
                            }
                        </div>
                        <div className= 'px-16 mt-32 h-30'>
                            <p className='text-4xl text-center text-HAI_blue-light'>요약 완료!</p>
                            <p className='mt-2 text-lg text-center text-HAI_blue-heavy'>이후 history 탭에서도 확인할 수 있습니다</p>
                            <div className="w-full mt-10 shadow-xl card bg-base-100">
                                <div className="items-center text-center card-body">
                                    <h2 className="card-title"> {title}</h2>
                                    <p className='text-left'> {content}</p>
                                    <div className="card-actions">
                                        <ul className=" text-bg_gray menu menu-horizontal bg-primary rounded-box">
                                            <li ><a className='font-semibold hover:text-white hover:bg-HAI_blue-middle' onClick={handleRegenerate}>REGENERATE</a></li>
                                            <li><a className='font-semibold hover:text-white hover:bg-HAI_blue-middle' onClick={handleDownloadSummarize}>DOWNLOAD</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full shadow-xl mt-14 card bg-base-100">
                                <figure className="px-10 pt-10">
                                    <img src= {location.state.images[0]} alt="Shoes" className="rounded-xl" />
                                </figure>
                                <div className="items-center text-center card-body">
                                    <h2 className="card-title">ocr 결과:</h2>
                                    <p className='text-left'> {location.state.ocrTexts[0]}</p>
                                    <div className="card-actions">
                                        <button className="btn btn-primary hover:bg-HAI_blue-middle" onClick={handleDownloadOcr}>Download</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Div>;
};

export default ItemInfo;