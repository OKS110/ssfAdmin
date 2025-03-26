import { fileURLToPath } from 'url';
import multer from 'multer'; //multer로 파일 받기
import fs from 'fs';
import path from 'path';
import { notifyCustomerUpdate } from '../server.js'; //  WebSocket 알림 함수 가져오기
import { db } from '../repository/db.js';

// ES 모듈에서 __dirname 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 업로드 폴더 설정
const uploadDir = path.join(__dirname, 'upload_files'); 
console.log(" 업로드 폴더 경로: ", uploadDir);

// Multer 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '..', 'upload_files'); // 루트 폴더에 업로드 경로 지정 - 저장할 경로

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath); // 저장 위치 지정
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '_' + file.originalname);  // 파일명 지정
    }
});

// multer 미들웨어 설정
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 파일 크기 10MB 제한
}).array("files", 9); // 최대 9개 파일 업로드


//  상품 등록 후 고객 페이지에 데이터 변경 알림
export const notifyCustomerServer = async () => {
    try {
        await axios.post('http://localhost:9000/product/update'); // 고객 서버에 변경 요청
        console.log(" 고객 서버에 상품 업데이트 알림 완료");
    } catch (error) {
        console.error("ERROR 고객 서버 업데이트 알림 실패:", error);
    }
};


export const fileUploadMultiple = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error("ERROR 파일 업로드 중 오류 발생:", err);
            return res.status(500).json({ message: "파일 업로드 실패", error: err.message });
        }

        //  요청 데이터 추출
        const { category, sub_category, name, color, size, original_price, star, stock, discount_rate, discounted_price, brand, delivery_fee, description } = req.body;
        // console.log("요청 데이터:", req.body);

        if (!category || !sub_category || !name || !color || !size || !original_price) {
            return res.status(400).json({ message: "필수 입력 값이 누락되었습니다." });
        }

        try {
            //  color JSON 변환 (오류 방지) "["red", "blue"]" 같은 JSON 형식으로 넘어온 데이터를 colorArray 배열로 변환
            let colorArray;
            try {
                colorArray = JSON.parse(color);
            } catch (e) {
                colorArray = []; // JSON 파싱 오류 시 기본값 설정
            }

            //  size JSON 변환 (대분류에 따라 변환 방식 다름)
            let sizeArray;
            try {
                sizeArray = JSON.parse(size);
            
                if (category === "shoes") {
                    //  신발
                    sizeArray = sizeArray.map(item => ({
                        name: item.name || "",
                        foot_length: item.foot_length ? parseInt(item.foot_length, 10) : null
                    }));
                } else if (category === "bottom") {
                    //  하의
                    sizeArray = sizeArray.map(item => ({
                        name: item.name || "",
                        waist_line: item.waist_line ? parseInt(item.waist_line, 10) : null,
                        total_length: item.total_length ? parseInt(item.total_length, 10) : null
                    }));
                } else {
                    //  상의, 아우터
                    sizeArray = sizeArray.map(item => ({
                        name: item.name || "",
                        total_length: item.total_length ? parseInt(item.total_length, 10) : null,
                        sleeve_length: item.sleeve_length ? parseInt(item.sleeve_length, 10) : null,
                        shoulder_width: item.shoulder_width ? parseInt(item.shoulder_width, 10) : null
                    }));
                }
            } catch (e) {
                sizeArray = [];
            }

            //  업로드된 파일 정보 저장
            let uploadFileName = [];
            for (const file of req.files) {
                uploadFileName.push(`http://3.34.134.163:9001/uploads/${file.filename}`);
                // 클라이언트에서 이미지를 표시할 때 사용할 URL을 미리 만들어줌 (ex: "http://3.34.134.163:9001/uploads/image1.jpg")
            }

            // console.log(" 업로드된 파일 경로:", uploadFileName);

            //  상품 정보 DB 저장
            const insertQuery = `
                INSERT INTO products (category, sub_category, name, color, size, original_price, image, star,
                 stock, discount_rate, discounted_price, brand, delivery_fee, description)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const imagePaths = JSON.stringify(uploadFileName);

            await db.execute(insertQuery, [
                category || null,
                sub_category || null,
                name || null,
                JSON.stringify(colorArray) || "[]",
                JSON.stringify(sizeArray) || "[]",
                original_price || 0,
                JSON.stringify(uploadFileName) || "[]",
                star || 0.0,
                stock || 0,
                discount_rate || 0,
                discounted_price || 0,
                brand || null,
                delivery_fee || "free",
                description || null
            ]);

            res.json({
                message: "파일 및 상품 정보 저장 완료",
                uploadFileName
            });
            //  상품 등록 후 WebSocket을 통해 고객 페이지에 업데이트 알림 전송
            notifyCustomerUpdate();

            console.log(" DB 저장 완료:", JSON.stringify(sizeArray));
        } catch (dbError) {
            console.error("ERROR DB 저장 실패:", dbError);
            res.status(500).json({ message: "DB 저장 실패", error: dbError.message });
        }
    });
};
