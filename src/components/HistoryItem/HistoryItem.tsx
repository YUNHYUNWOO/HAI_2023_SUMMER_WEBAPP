import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export type historyItemProps = {
    _id : string
    timestamp : string
    title : string
    content : string
    images : string[]
    ocrText : string
}

export function HistoryItem({ _id, timestamp, images, title, content, ocrText} : historyItemProps){
    
    const navigate = useNavigate();
    useEffect(()=>{
        console.log(title);
    }, []);

    const handleClick = useCallback(()=>{
        navigate('/ItemInfo', {state : {
            _id : _id,
            timestamp : timestamp,
            images : images,
            title : title,
            content : content,
            ocrTexts : [ocrText]
        }})
    }, []);
    return <div className="relative overflow-hidden shadow-xl card card-side bg-base-100" onClick={handleClick}>
                <figure><img className="w-48 h-40"src= {images[0]} alt="Movie"/></figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p className="line-clamp-2">{content}</p>
                    <p className="text-right right-8"> {timestamp}</p>
                </div>
           </div>;
}