import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import adminRouter from './router/adminRouter.js';
import uploadRouter from './router/uploadRouter.js';

const server = express();
const port = 9001;

server.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // 고객 & 관리자 페이지
    credentials: true
}));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// ✅ WebSocket 서버 (포트: 9002)
const wss = new WebSocketServer({ port: 9002 });

wss.on('connection', (ws) => {
    console.log("📡 WebSocket 연결됨 (관리자 ↔ 고객)");

    ws.on('message', (message) => {
        try {
            console.log(`📩 받은 메시지: ${message}`);  // ✅ 메시지 원본 확인

            // ✅ JSON 형식으로 변환
            const data = JSON.parse(message.toString());  

            if (data.type === "new_customer") {
                console.log("✅ 새로운 고객이 추가됨!");
                notifyAdminNewCustomer();
            }else if (data.type === "update_order_status") {
                console.log(`✅ 주문 상태 변경: ${data.oid} → ${data.status}`);
                notifyOrderUpdate(data.oid, data.status);
            }
        } catch (error) {
            console.error("❌ WebSocket 메시지 처리 오류:", error);
        }
    });
});


server.use('/admin', adminRouter);
server.use('/upload', uploadRouter);


// ✅ 신규 고객 추가 시 관리자 페이지에 알림
export const notifyAdminNewCustomer = () => {
    console.log("📡 WebSocket: 새로운 고객 추가 알림 전송! (관리자 서버)");

    if (wss.clients.size === 0) {
        console.log("❌ WebSocket: 연결된 클라이언트가 없습니다!");
        return;
    }

    wss.clients.forEach(client => {
        console.log("📡 WebSocket: 메시지 전송 대상 클라이언트 확인...");
        if (client.readyState === 1) {
            client.send(JSON.stringify({ type: "new_customer" }));
        } else {
            console.log("❌ WebSocket: 클라이언트가 준비되지 않음 (readyState: " + client.readyState + ")");
        }
    });
};


// ✅ 상품이 추가될 때 고객 페이지에 알림
export const notifyCustomerUpdate = () => {
    wss.clients.forEach(client => {
        if (client.readyState === 1) {
            client.send(JSON.stringify({ type: "update_products" })); // 메시지를 JSON 형태로 전송
        }
    });
};

// ✅ 주문 상태 변경 시 고객 페이지에 실시간 업데이트
export const notifyOrderUpdate = (oid, status, isGuest = false) => {
    console.log(`📡 WebSocket: 주문 상태 변경 알림 전송 (oid: ${oid}, status: ${status}, isGuest: ${isGuest})`);

    wss.clients.forEach(client => {
        if (client.readyState === 1) {
            client.send(JSON.stringify({ 
                type: "orderUpdate", 
                oid, 
                status, 
                isGuest // ✅ 추가: 비회원 주문인지 여부 전달
            }));
        }
    });
};


server.listen(port, () => {
    console.log(`관리자 서버 실행 중: http://localhost:${port}`);
});
