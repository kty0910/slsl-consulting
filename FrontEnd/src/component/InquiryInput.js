import React, { useState }  from 'react';
import '../css/InquiryInput.css';
import emailjs from 'emailjs-com';

const InquiryInput = () => {
   const [InputData, setInputData] = useState({
        inputModel: '',
        inputName: '',
        emailId:'',
        emailDomain: '',
        inputNumber1: '',
        inputNumber2: '',
        inputNumber3: '',
        localAddress: '',
        inputAsk: '',
        inputCheck: false,
    });

  
    // 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();

        //이름에 특수문자 포함 못하게 
        const regex1 = /^[a-zA-Z가-힣]*$/;
        const isNameValid = regex1.test(InputData.inputName);

        //이메일 아이디 : 알파벳과 숫자만 가능
        const regex2 = /^[a-zA-Z0-9]+$/;
        const isEmailValid = regex2.test(InputData.emailId);
        
        //이메일 도메인: 알파벳과 특수문자 . 만 가능 
        const regex3 = /^[a-zA-Z.]*$/;
        const isDomainValid = regex3.test(InputData.emailDomain);

        // 성함이 유효하지 않으면 경고 메시지 출력
        if (!isNameValid) {
            alert('이름에는 특수문자를 사용할 수 없습니다.');
            return;
        }

        // //이메일 아이디에 특수문자 포함했을때
        // if(!isEmailValid){
        //     alert('이메일에는 특수문자를 사용할 수 없습니다.')
        //     return;
        // }
        // //이메일 도메인 특수문자 포함했을때 (.은 입력가능)
        // if(!isDomainValid){
        //     alert('이메일 도메인 형식을 확인해주세요.')
        //     return;
        // }
    
        // 개인정보 수집 이용동의 안했을때 알림 
        if(!InputData.inputCheck){
            alert('개인정보 수집 및 이용동의 후 제출해주세요');
            return;
        }

        if(InputData.inputNumber1.length<3){
            alert("첫번째 연락처 3자리 입력해주세요");
            return;
        }
        if(InputData.inputNumber2.length<4){
            alert("두번째 연락처 4자리 입력해주세요");
            return;
        }
        if(InputData.inputNumber3.length<4){
            alert("세번째 연락처 4자리 입력해주세요");
            return;
        }

       
    
        // 저장된 상태 출력 (실제로 서버에 전송하거나 다른 로직으로 대체)
        console.log('Form Data:',InputData);

        // EmailJS로 이메일 전송
        emailjs
        .send(
            'service_xdktqu9', // EmailJS에서 생성한 서비스 ID
            'template_1nfbjye', // EmailJS에서 생성한 템플릿 ID
            InputData,
            'qmT2G7bE_9SeWMpQ-' // EmailJS에서 생성한 사용자 PublicKey
        )
        .then(
        (result) => {
            console.log('Email sent successfully:', result.text);
            alert(`문의가 정상적으로 등록되었습니다.`);
        },
        (error) => {
            console.error('Failed to send email:', error.text);
            alert(`문의 등록이 실패 하였습니다.`);
        }
        );
    };

    //  입력값 변경, check 박스 체크 되어있는지 확인
    const handleChange = (e) => {
        // 이벤트 객체에서 필요한 값들을 추출
        const { id, value, type, checked } = e.target;
    
        // setFormData를 사용하여 상태 업데이트
        setInputData((prevData) => ({
        ...prevData,
        [id]: type === 'checkbox' ? checked : value,
        }));
        console.log(e.target);

    };

    // 이메일 직접입력
    const handlecustomEmailDomain = (e)=>{
        const { value } = e.target;
        console.log(value);
        setInputData((prevData) => ({
          ...prevData,
     
          emailDomain: value === 'userinput' ? '': value,
        }));
    };

    const handleBlur = (e) => {
        console.log(e.target.value);
        console.log(e.target.id);

        const maxLength = e.target.maxLength;
        
        // if (e.target.id === 'inputNumber1') {
        
        //     if (!/^\d+$/.test(e.target.value)) {
        //         e.target.value = '';
        //         alert("숫자만 입력이 가능합니다.");
        //         return;
        //     }
        //     if (e.target.value.length < maxLength) {
        //         e.target.value =''; 
        //         alert("입력값이 너무 짧습니다. " + maxLength + "자 입력해주세요.");
        //         return;
        //     }
        // }
        // else if (e.target.id === 'inputNumber2') {
        
        //     if (!/^\d+$/.test(e.target.value)) {
        //         e.target.value = '';
        //         alert("숫자만 입력이 가능합니다.");
        //         return;
        //     }
        //     if (e.target.value.length < maxLength) {
        //         e.target.value =''; 
        //         alert("입력값이 너무 짧습니다. " + maxLength + "자 입력해주세요.");
        //         return;
        //     }
        // }
        // else if (e.target.id === 'inputNumber3') {
        
        //     if (!/^\d+$/.test(e.target.value)) {
        //         e.target.value ='';
        //         alert("숫자만 입력이 가능합니다.");
        //         return;
        //     }
        //     if (e.target.value.length < maxLength) {
        //         e.target.value = ''; 
        //         alert("입력값이 너무 짧습니다. " + maxLength + "자 입력해주세요.");
        //         return;
        //     }
        // }

        // if(e.target.id === 'emailDomain'){
        //     if (!(/^[a-zA-Z.]+$/).test(e.target.value)){
        //         e.target.value = ''; 
        //         alert('이메일 도메인 형식을 확인해주세요.')
        //         return;
        //     }
        // }

        // if(e.target.id === 'emailId'){
        //     if (!(/^[a-zA-Z0-9]+$/).test(e.target.value)){
        //         e.target.value = ''; 
        //         alert('이메일 아이디에는 알파벳과 숫자만 입력 가능합니다.');
        //         return;
        //     }
        // }

        if(e.target.id === 'inputName'){
            if (!(/^[a-zA-Z가-힣]*$/).test(e.target.value)){
                e.target.value = ''; 
                alert('이름에는 특수문자를 입력하실 수 없습니다.');
                return;
            }
        }
    };

    
  return (
    <article className="InquiryInputPages">

        <section>
            <img src="images/Photo4.jpg" className="InquiryImg"/>
        </section>

        <section className='inquiryBox'>
            <div className="inquiryTitle">
                
                <span>문의 등록&nbsp;</span>
            </div>
                
            <div id = "inquirySection">
                <form id = "inquiryForm"  onSubmit={handleSubmit}>
                    <table>
                        <tr>
                            <td>
                                모듈 선택 <span className="red_span">*</span>
                            </td>
                            <td colSpan="3">
                                <select id= "inputModel" required onChange={handleChange}>
                                    <option value=""disabled selected hidden>모듈을 선택하세요</option>
                                    <option value="한국 HANWHA Q.PEAK DUO XL G11.7 (570Wp)">한국 HANWHA Q.PEAK DUO XL G11.7 (570Wp)</option>
                                    <option value="미국 AMERISOLAR AS-8M120-HC (580Wp)">미국 AMERISOLAR AS-8M120-HC (580Wp)</option>
                                    <option value="중국 JINKO SOLAR PANEL 58W N-TYPE (580Wp)">중국 JINKO SOLAR PANEL 58W N-TYPE (580Wp)</option>
                                </select>
                            </td>
                        </tr>
                        
                        <tr>
                            <td>
                                성함<span className="red_span">*</span>
                            </td>
                            <td>
                                <input  type='text' 
                                        id= "inputName"
                                        maxLength="20" 
                                        required
                                        align = "middle"
                                        title="특수문자, 숫자는 입력이 불가능합니다."
                                        placeholder='성함을 입력하세요'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                이메일<span  className="red_span">*</span>
                            </td>
                            <td colSpan="3">
                                <input  type="text" 
                                        id= "emailId"
                                        maxLength="20"
                                        placeholder="이메일 아이디" 
                                        required 
                                        title="특수문자는 입력이 불가능합니다."
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                />
                                <span>&nbsp;@&nbsp;&nbsp;</span>
                            
                                <input  type="text" 
                                        id= "emailDomain"
                                        maxLength="20"
                                        placeholder="이메일 도메인" 
                                        required 
                                        onChange={(e)=>{
                                            handleChange(e);
                                            handlecustomEmailDomain(e);
                                        }}
                                        value={InputData.emailDomain}
                                        readOnly={
                                            InputData.emailDomain==='naver.com'||InputData.emailDomain==='gmail.com'||InputData.emailDomain==='hanmail.net'
                                            ||InputData.emailDomain==='korea.com'||InputData.emailDomain==='nate.com'||InputData.emailDomain==='yahoo.com'
                                        }
                                        onBlur={handleBlur}
                                />
                                <span>&nbsp;&nbsp;</span>

                                <select id="selectDomain"
                                        title="이메일 도메인 주소 선택"
                                        value={InputData.emailDomain}
                                        onChange={(e)=>{
                                            handleChange(e);
                                            handlecustomEmailDomain(e);
                                        }}
                                >
                                    <option value=""disabled selected hidden>도메인 선택</option>
                                    <option value="userinput">직접입력</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="gmail.com">gmail.com</option>
                                    <option value="hanmail.net">hanmail.net</option>
                                    <option value="korea.com">korea.com</option>
                                    <option value="nate.com">nate.com</option>
                                    <option value="yahoo.com">yahoo.com</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                연락처<span className="red_span">*</span>
                            </td>
                            <td colSpan="3">
                                <input type='tel'  
                                    pattern="[0-9]*" 
                                    id = "inputNumber1" 
                                    maxLength="3"
                                    placeholder='010' 
                                    required 
                                    onChange={handleChange}
                                    title="숫자만 입력해주세요"
                                />

                                <span>&nbsp;-&nbsp;&nbsp;</span>
                                <input type='tel'  
                                    pattern="[0-9]+" 
                                    id = "inputNumber2" 
                                    maxLength="4"
                                    placeholder='1234' 
                                    required 
                                    onChange={handleChange}
                                    title="숫자만 입력해주세요"
                                />

                                <span>&nbsp;-&nbsp;&nbsp;</span>
                                <input type='tel'
                                    pattern="[0-9]*"
                                    id = "inputNumber3" 
                                    maxLength="4" 
                                    placeholder='5678' 
                                    required 
                                    onChange={handleChange}
                                    title="숫자만 입력해주세요"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>발전소 설치 지역<span className="red_span">*</span></td>
                            <td>
                                <select name = "LocalAddress" id = "localAddress" required  onChange={handleChange}>
                                        <option value=""disabled selected hidden>지역을 선택하세요</option>
                                        <option value="서울특별시" >서울특별시</option>
                                        <option value="대전광역시">대전광역시</option>
                                        <option value="대구광역시">대구광역시</option>
                                        <option value="부산광역시">부산광역시</option>
                                        <option value="광주광역시">광주광역시</option>
                                        <option value="인천광역시">인천광역시</option>
                                        <option value="울산광역시">울산광역시</option>
                                        <option value="세종특별자치시">세종특별자치시</option>
                                        <option value="경기도">경기도</option>
                                        <option value="강원도">강원도</option>
                                        <option value="충청북도">충청북도</option>
                                        <option value="충청남도">충청남도</option>
                                        <option value="경상북도">경상북도</option>
                                        <option value="경상남도">경상남도</option>
                                        <option value="전라북도">전라북도</option>
                                        <option value="전라남도">전라남도</option>
                                        <option value="제주특별자치도">제주특별자치도</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>문의 상세 내용</td>
                        </tr>
                        <tr>
                            <td colSpan="4">
                                <textarea type='text' id = "inputAsk" onChange={handleChange} placeholder='문의할 내용을 입력하세요'/>
                            </td>
                        </tr>
                    </table>

                    <div className='InputCheckBox'>
                        개인정보 수집 및 이용 동의 (필수)
                        <span className="red_span">&nbsp;*&nbsp;&nbsp;</span>
                        <input type='checkbox' id = "inputCheck" onChange={handleChange} checked={InputData.inputCheck}/>
                    </div>
                    
                    <button id="inquiry_Btn" type='submit'>제출</button>
                </form>
            </div>
        </section>

    </article>
  );
};

export default InquiryInput;