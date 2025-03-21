import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext.js';

// 아이디 저장 체크박스 로직 추가하기

export default function Login() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const initForm = { 'id': '', 'pwd': '' };
  const refs = {
    idRef: useRef(null),
    pwdRef: useRef(null)
  };

  const [formData, setFormData] = useState(initForm);
  const [saveIdFlag, setSaveIdFlag] = useState(false);
  const [saveId, setSaveId] = useState(null);

  const token = localStorage.getItem("token");
  
  useEffect(() => {
    if (token) {
      alert("잘못된 접근입니다.");
      navigate("/");
    }
  }, []);

  /** onChange : 폼 데이터 관리 **/
  const handleChangeForm = (event) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
  }

  /** onSubmit : 버튼 클릭 이벤트 **/
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    
    if (validate()) {
      console.log('send data --> ', formData);
    }

    saveIdFlag && localStorage.setItem("user_id", formData.id);

    // 서버 전송
    axios.post('http://localhost:9001/admin/login', formData)
        .then(res => {
          // console.log('res.data --> ', res.data);
          if (res.data.result_rows === 1) {
            alert('로그인 성공!');
            localStorage.setItem("token", res.data.token);
            saveIdFlag && localStorage.setItem("user_id", formData.id);
            setIsLoggedIn(true);
            navigate('/');
          } else if (refs.idRef.current.value !== '' && refs.pwdRef.current.value !== '' && res.data.result_rows === 0) {
            alert('아이디 또는 비밀번호가 일치하지 않습니다.');
            // setErrMsg({...errMsg, ['err']: "아이디 또는 비밀번호가 일치하지 않습니다."});
            refs.idRef.current.focus();
          }
        })
        .catch(err => console.log(err));
  }
  
  /** validate : 유효성 체크 **/
  const validate = () => {
    if (refs.idRef.current.value === '') {
      alert('아이디를 입력해주세요.');
      refs.idRef.current.focus();
      return false;
    } else if (refs.pwdRef.current.value === '') {
      alert('비밀번호를 입력해주세요.');
      refs.pwdRef.current.focus();
      return false;
    }
    return true;
  }

  // 아이디 저장 체크박스 활성화 이벤트
  const handleRememberId = () => {
    localStorage.setItem("KEY_SAVE_ID_FLAG", !saveIdFlag);
    setSaveIdFlag(!saveIdFlag);
  }

  useEffect(() => {
    // 저장 활성화 버튼 여부 확인
    let idFlag = JSON.parse(localStorage.getItem("KEY_SAVE_ID_FLAG"));

    // 저장 여부x -> 현재 저장 여부 저장
    idFlag !== null && setSaveIdFlag(saveIdFlag);

    // 저장x -> false이면 빈값 저장
    idFlag === false && localStorage.setItem("user_id", "");

    // 로컬스토리지에서 id값 호출
    let data = localStorage.getItem("user_id");

    // 저장o
    data !== null && setSaveId(data);
  });

  return(
    <div className='adminLogin-container'>
      <div className='adminLogin-contents-wrap'>
        <p className='adminLogin-content-title'>로그인</p>
        <div className='adminLogin-content-box'>
          <form className='adminLogin-form' onSubmit={handleLoginSubmit}>
            <div className='adminLogin-form-content1'>
              <ul className='adminLogin-form-ul'>
                <li>
                  <input type='text' 
                        name='id' 
                        ref={refs.idRef}
                        onChange={handleChangeForm} 
                        placeholder='아이디'
                        defaultValue={saveId}
                        />
                </li>
                <li>
                  <input type='password' 
                        name='pwd'
                        ref={refs.pwdRef}
                        onChange={handleChangeForm} 
                        placeholder='비밀번호' />
                </li>
              </ul>
              <div>
                  <button type='submit' className='adminLogin-btn'>로그인</button>
              </div>
            </div>

            <div className='adminLogin-form-content2'>
              <input type="checkbox" checked={saveIdFlag} onClick={handleRememberId} />아이디 저장
            </div>
            <div className='adminLogin-form-content3'>
              <a href=""><span>아이디 찾기</span></a>
              <a href=""><span>비밀번호 재설정</span></a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}