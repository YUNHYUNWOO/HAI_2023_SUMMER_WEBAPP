import PropTypes from "prop-types";
import React, {useRef, useEffect, useCallback} from "react";
import { ImageCard } from "../ImageCard";

export interface Props {

  handleFileInput : (file : File[]) => void;
  imageURL: string,
  files: File[]
}

export const UploadBoard = ( {handleFileInput, imageURL, files} : Props):JSX.Element => {

    const dragRef = useRef<HTMLLabelElement | null>(null);
    
    const handleDragIn = useCallback((event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);
    const handleDragOver = useCallback((event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {

        const files = event.target.files;
        if(files)
        {
            console.log(files.item(0));
            const file: (File | null)[] = []
            file[0] = files.item(0);
                
            if(file[0])
                handleFileInput(file as File[]);
        }
            
    }, []);

    const handleDrop = useCallback(
        (event: DragEvent): void => {
            event.preventDefault();
            event.stopPropagation();

            if(event.dataTransfer != null)
                {
                    let tmpFiles : (File | null)[] = [];
                    let i = 0;
                    for(i = 0; i < event.dataTransfer.files.length; i++){
                        tmpFiles[i] = event.dataTransfer.files.item(i);
                    }

                    handleFileInput(tmpFiles as File[]);
                }      
        },
        [handleFileInput]
    );
    

    const initDragEvents = useCallback((): void => {
    // 앞서 말했던 4개의 이벤트에 Listener를 등록합니다. (마운트 될때)
    
        if (dragRef.current !== null) {
            dragRef.current.addEventListener("dragenter", handleDragIn);
            dragRef.current.addEventListener("dragover", handleDragOver);
            dragRef.current.addEventListener("drop", handleDrop);
        }
    }, [handleDragIn]);
    

    const resetDragEvents = useCallback((): void => {
    // 앞서 말했던 4개의 이벤트에 Listener를 삭제합니다. (언마운트 될때)
        if (dragRef.current !== null) {
        dragRef.current.removeEventListener("dragenter", handleDragIn);
        dragRef.current.removeEventListener("dragover", handleDragOver);
        dragRef.current.removeEventListener("drop", handleDrop);
        }
    }, [handleDragIn, handleDragOver, handleDrop]);
    
    useEffect(() => {
        initDragEvents();

        return () => resetDragEvents();
    }, [initDragEvents, resetDragEvents]);
    

    
    return <div className="p-2 rounded-lg bg-HAI_blue-middle">
            <div className="flex-col items-center justify-center w-full rounded-lg">
                <label htmlFor="dropzone-file" ref = {dragRef} className="flex flex-col items-center justify-center w-full border-4 border-white border-dashed rounded-lg cursor-pointer bg-HAI_blue-light bg-gray-50 hover:bg-HAI_blue-light/70"
                style={{
                    height: files.length == 0 ? '22rem' : 'auto'
                }}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        
                        <div className= "flex flex-col items-center justify-center">
                            <div> 
                                <svg className="w-12 h-12 mx-auto mb-4 overflow-auto text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-lg text-white mx auto dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="mx-auto text-sm text-white dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            {
                                files.length != 0 ? <div className="mt-12"> <ImageCard className = "preview" imageURL= {imageURL} file = {files[0]} /> </div> : null
                            }
                        </div>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" multiple={true} onChange={handleChange} accept="image/png" />
                </label>
            </div>
        </div>;
};