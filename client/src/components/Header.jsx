import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext.js';

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginState = () => {
    if (isLoggedIn) { // 로그아웃 버튼을 클릭할 때
      const select = window.confirm('로그아웃 하시겠습니까?');
      if (select) {
        setIsLoggedIn(false);
        navigate('/');
        localStorage.removeItem("token");
      }
      console.log('select --> ', select);
    } else { // 
      navigate('/');
    }
  }
console.log('isLoggedIn --> ', isLoggedIn);

  return(
    <>
      { isLoggedIn 
        ? (
          <div className='adminLogin-header-loggedin'>
            <div className='header-left-loggedin'>
              <Link to='/' className='header-logo-loggedin'>
                <img src="/images/ssfshop.png" alt="" />
                <span>관리자 페이지</span>
              </Link>
            </div>
            <nav className='header-right-loggedin'>
              <button type='button' onClick={handleLoginState}>
              로그아웃
              </button>
              <Link to='/admin/register' type='button'>
              상품등록
              </Link>
            </nav>
          </div>
        )
        : 
        <div className='adminLogin-header-loggedout'>
          <Link to='/' className='header-logo-loggedout'>
            <img src="/images/ssfshop.png" alt="" />
            <span>관리자 페이지</span>
          </Link>
        </div>
      }
    </>
  );
}