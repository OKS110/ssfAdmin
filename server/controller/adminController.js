import * as repository from '../repository/adminRepository.js';

import jwt from 'jsonwebtoken';
// import multer from 'multer';
import fs from 'fs';
import path from 'path';

/** 관리자 페이지 로그인 - checkAdminLogin **/
export const checkAdminLogin = async(req, res) => {
    let result = await repository.checkAdminLogin(req.body);

    if(result.result_rows === 1) {
        const token = jwt.sign({"userId": req.body.id}, 'RFO55oDtOD');
        result = {...result, "token": token};
    }

    res.json(result);
    res.end();
}

/** 관리자 페이지 고객 정보 호출 **/
export const getCustomerData = async(req, res) => {
    const result = await repository.getCustomerData(req.body);
    res.json(result);
    res.end();
}

/** 관리자 페이지 상품 정보 호출**/
export const getProductData = async(req, res) => {
    const result = await repository.getProductData(req.body);
    
    res.json(result);
    res.end();
}

/** 관리자 페이지 게스트 정보 호출**/
export const getGuestsData = async(req, res) => {
    const result = await repository.getGuestsData(req.body);
    console.log("게스트",result);
    
    res.json(result);
    res.end();
}
/** 관리자 페이지 게스트 정보 호출**/
export const getOrdersData = async(req, res) => {
    const result = await repository.getOrdersData(req.body);
    console.log("회원 주문 정보",result);
    
    res.json(result);
    res.end();
}
/** 관리자 페이지 게스트 정보 호출**/
export const getOrdersGData = async(req, res) => {
    const result = await repository.getOrdersGData(req.body);
    console.log("게스트 주문 정보",result);
    
    res.json(result);
    res.end();
}