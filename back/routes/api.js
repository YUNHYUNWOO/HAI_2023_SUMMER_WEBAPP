const express = require('express');
const { v4 } = require('uuid');
const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios');

const router = express.Router();
const ocr_url = "https://cxl3q4nzrt.apigw.ntruss.com/custom/v1/23717/d7931b0cf28602762bbfd6fcfd3e42b141bd7a4c5c0bad5dbec4ca350644ac01/general";
const ocr_key = process.env.NCLOUD_OCR_API_KEY;
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const ParseOcrResponse = function(ocrResponse){
    res = "";
    for(let field of ocrResponse.images[0].fields){
        res += field.inferText;
        if(field.lineBreak)
            res += '\n';
        else 
            res += ' ';
    }

    return res;
};

router.post('/image2text', function(req, res, next){

   
    const data = req.body.data;
    const request_json = {
      images: [
          {
            format : 'png',
            name : 'demo',
            data : data
          }
      ],
      requestId: v4(),
      version: 'V2',
      timestamp: Date.now()
    };

    
    axios.post(ocr_url, request_json ,{
      headers: {
        'X-OCR-SECRET': ocr_key// Secret Key
      }
    })
    .then(response => {
      const aa = ParseOcrResponse(response.data);
      console.log(aa);
      res.status(200).send(aa);
    })
    .catch(e => {
      console.log(JSON.stringify(e));   
    })
    
    console.log(2);
      
});

router.post('/summarizeText', async function(req, res, next){
  try {
    const prompt = `다음 OCR 결과에 적절한 제목을 붙이고 4줄 이내로 요약하세요.
    항상 한국어로 답변해 주세요.

    ### OCR 결과:

    ${req.body.input_text}

    제목: 다음에 본문의 제목을, 요약 결과: 다음에 요약 결과를 입력하세요.
    요약 결과의 각 줄은 1. 2. 3. 과 같이 숫자로 시작해야 합니다.
    각 줄 사이에는 줄바꿈이 반드시 있어야합니다. 
    `;

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: prompt}],
    });
    console.log(completion.data.choices[0].message);

    console.log(2);
    res.status(200).send(completion.data.choices[0].message);
  } catch (error) {
    console.log(error);
  }
    
})
module.exports = router;