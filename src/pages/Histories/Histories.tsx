import React, {useState,useEffect , useCallback} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User } from '../Login';
import {LoginButton, Div, UserProfile, HistoryItem, historyItemProps, Header} from '../../components';


export function Histories(){

    const [user, setUser] = useState<User | null>(null);
    const [historyArr, setHistoryArr] = useState<historyItemProps[]>([]);
    const navigate = useNavigate();
    

    useEffect(()=>{
        const userStr = localStorage.getItem('User');
        if(userStr == null)
            navigate('/')
        else{
            const user = JSON.parse(userStr) as User;
            setUser(user);
            axios.get(`http://localhost:80/users/${user?.id}/history`)
            .then((res)=>{
                setHistoryArr(res.data as historyItemProps[]);
                console.log(res.data as historyItemProps[]);
            });
        }
        console.log(user);
    }, []);

    return <Div className= "relative bg-white">
                <Header/>   
                <section className ="max-w-3xl mx-auto bg-white max-h-fit sm:px-6">
                    <div className='relative flex flex-col h-screen pl-4 pr-4 max-h-fit'>
                        <div className='absolute mt-4 right-4'>
                            {   
                                user ? <UserProfile id = {user.id} name = {user.userName} handleUser={setUser}/> : null
                            }
                        </div>
                        <div className='flex-col px-16 divide-black'>
                            {
                                historyArr.map((historyItem, index) => {
                                return (
                                    <HistoryItem _id = {historyItem._id} ocrText = {historyItem.ocrText} timestamp={historyItem.timestamp} title = {historyItem.title} content={historyItem.content} images={historyItem.images}/>
                                )
                            })
                            }
                        </div>
                    </div>
                </section>
            </Div>;
}