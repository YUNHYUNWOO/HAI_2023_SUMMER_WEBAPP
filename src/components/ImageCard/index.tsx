import {Div} from '../';
import React, {useEffect} from 'react'

interface Props {
    className: any;
    imageURL : string;
    file : File | null;
}
export const ImageCard = ({ className, imageURL, file }: Props): JSX.Element => {
    useEffect(()=>{
        console.log(imageURL);
    }, []);
    return (
        <div className= "w-40 overflow-hidden divide-y rounded shadow-sm shadow-black/25 bg-white/100 hover:shadow-lg hover:shadow-black/50" >
            <img className="h-40" src={imageURL} alt={file?.name} />
            <div className="px-6 pt-3 pb-1">
                <div className="mb-2 text-sm font-bold line-clamp-1 text-text_gray">{file?.name}</div>
                <div className='text-xs text-right text-text_gray'>{file?.size}</div>
            </div>
        </div>
    );
};
