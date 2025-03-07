import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return(
    <div className='adminLogin-footer'>
      <div className='adminLogin-footer-contents1'>
        <p className='adminLogin-footer-text'>삼성물산(주) 패션부문</p>
        <p className='adminLogin-footer-text'>고객센터: 02-3702-7991 | 입점계약.프로모션 담당: MD</p>
        <p className='adminLogin-footer-text'>본 시스템은 승인된 계정의 관리자만 사용할 수 있습니다. 불법적인 접근 및 사용 시 관계법규에 의해 처벌될 수 있습니다.</p>
        <p className='adminLogin-footer-text'>COPYRIGHTⓒ 2022 SSF SHOP ALL RIGHTS RESERVED</p>
      </div>
      <div className='adminLogin-footer-contents2'>
        <Link to={'/'} className='adminLogin-footer-text'>개인정보처리방침</Link>
      </div>
    </div>
  );
}