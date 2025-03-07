import express from 'express';
import cors from 'cors';
import adminRouter from './router/adminRouter.js';
import uploadRouter from './router/uploadRouter.js';

const server = express();
const port = 9001;

// ✅ CORS 설정 추가 (9000번 포트에서 접근 가능하도록 설정)
server.use(cors({
    origin: 'http://localhost:3000', // 고객 페이지에서 요청 가능하도록 허용
    credentials: true
}));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/admin', adminRouter);
server.use('/upload', uploadRouter);

server.listen(port, () => {
    console.log(`관리자 서버 실행 중: http://localhost:${port}`);
});
