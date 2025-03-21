import * as repository from '../repository/adminRepository.js';
import { notifyOrderUpdate } from "../server.js";
import jwt from 'jsonwebtoken';

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
    
    res.json(result);
    res.end();
}
/** 관리자 페이지 게스트 정보 호출**/
export const getOrdersData = async(req, res) => {
    const result = await repository.getOrdersData(req.body);
    
    res.json(result);
    res.end();
}
/** 관리자 페이지 게스트 정보 호출**/
export const getOrdersGData = async(req, res) => {
    const result = await repository.getOrdersGData(req.body);
    
    res.json(result);
    res.end();
}


export const updateOrderStatus = async (req, res) => {

    const { oid, status, isGuest } = req.body;
    
    if (!oid || !status) {
        console.error("요청 데이터 누락:", { oid, status, isGuest });
        return res.status(400).json({ error: "주문 ID와 상태 값이 필요합니다." });
    }
    try {
        let updated;
        if (isGuest) {
            updated = await repository.updateGuestOrderStatusDB(oid, status);
        } else {
            updated = await repository.updateOrderStatusDB(oid, status);
        }

        if (updated) {
            //  주문 상태 변경 후 WebSocket 메시지 전송
            notifyOrderUpdate(oid, status, isGuest);

            res.json({ success: true, message: "주문 상태가 업데이트되었습니다." });
        } else {
            res.status(404).json({ error: "주문을 찾을 수 없습니다." });
        }
    } catch (error) {
        console.error(" 주문 상태 업데이트 오류:", error);
        res.status(500).json({ error: "주문 상태 변경 실패" });
    }
};