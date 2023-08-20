import React, {useState, useCallback, useEffect} from 'react';
import { Navigate, NavigateOptions, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { time } from 'console';
import { v4 as uuidv4 } from 'uuid';
import { Div } from '../../components';
import { UploadBoard } from '../../components/UploadBoard';
import { ImageCard } from '../../components/ImageCard';
import loading from '../../assets/icon/PYh.gif';
import {LoginButton, Header} from '../../components';
import {User} from '../'
import { UserProfile } from '../../components/UserProfile';
const ALLOW_FILE_EXTENSION = "png";

function MainPage(){

  const [files, setFiles] = useState<File[]>(new Array<File>);     
  const [ocrText, setOcrText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  const [fileURL, setFileURL] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(()=>{
    const userStr = localStorage.getItem('User');
    if(userStr != null)
        setUser(JSON.parse(userStr) as User);
    console.log(user);
  }, []);

  useEffect(() => {

    if(title !== '' && content !== '' && !isSending){
      const props = {
        //  id : 
        //  userId : ,
        images : [fileURL],
        ocrTexts : [ocrText],
        title : title,
        content : content,
        isFirst : true
      };

      navigate(
        '/ItemInfo',
        {state : props}
        );
    }
  }, [title, content, isSending]);

  const handleFileChange = useCallback(async (filesParam : File[]) => {
    
    if(filesParam && filesParam[0] && fileExtensionValid(filesParam[0].name)){
        // let tmpFiles = [
        //     ...files,
        //     ...filesParam
        // ];
        await setFiles(filesParam);
        
        
        const reader = new FileReader();

        reader.onloadend = () => {
            if(reader.result == null) return;
            console.log(reader.result);
            setFileURL(reader.result as string);
        }

        reader.readAsDataURL(filesParam[0]);
    }
    
    console.log(files);
  }, [files]);


  const handleSubmit = () => {
    if(files.length == 0) return;

    console.log(files);
    const data : string = (fileURL as string).split(',')[1];
    let ocrTextTemp:string;
    let summarizedTextTemp: string;
    setIsSending(true);
    axios.post('http://localhost:80/api/image2text', {
      data : data
    })
    .then(function (res){
      console.log(res);
      ocrTextTemp = res.data;
      setOcrText(ocrTextTemp);
      return res.data;
    })
    .then(function (ocr_text){
      return axios.post('http://localhost:80/api/summarizeText', {
        input_text : ocr_text
      });
    })
    .then(function (res) {
      summarizedTextTemp = res.data.content;
      
      const title = summarizedTextTemp.split('\n', 1)[0]
      setTitle(title);
      const content = summarizedTextTemp.substring(title.length + 1);
      setContent(content);
      console.log(summarizedTextTemp);
      console.log(ocrTextTemp);
      if(user != null)
        return axios.post(`http://localhost:80/users/${user.id}/history/`,
      {
        images : [fileURL],
        ocrText : ocrTextTemp,
        summarizedText : summarizedTextTemp
      });
    })
    .then(function(res) {
      setIsSending(false);
    });
    
  };
  

  
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
                            <p className='text-4xl text-center text-HAI_blue-light'>이미지를 요약해주는 컨버터</p>
                            <p className='mt-2 text-lg text-center text-HAI_blue-heavy'>글 이미지를 업로드하여 짧게 요약해보세요</p>
                        </div>
                        <div className='mt-20'>
                            <UploadBoard handleFileInput ={handleFileChange} imageURL= {fileURL} files={files} />
                        </div>
                        {
                            isSending ?
                            <div className='fixed top-0 left-0 w-full h-full bg-black/20'>
                                <img className='w-auto h-full mx-auto ' src = {loading}></img>
                            </div> : null
                        }
                        
                        
                        <button className='w-full mt-16 text-2xl font-bold text-center text-white align-center btn btn-primary' onClick={handleSubmit} >요약하기</button>
                    </div>
                </section>
            </Div>;
}

const fileExtensionValid = (name : string) : boolean => {
  const extension = name.lastIndexOf(".") < 0 ? "" : name.substring(name.lastIndexOf(".") + 1).toLowerCase();
  return ALLOW_FILE_EXTENSION.indexOf(extension) > -1 && !(extension === '');
}

export default MainPage;