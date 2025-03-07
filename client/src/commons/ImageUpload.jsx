import axios from 'axios';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function ImageUpload({ getFileName }) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [category, setCategory] = useState("default");
    const [subCategory, setSubCategory] = useState("");
    const [pname, setPname] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [saleRate, setSaleRate] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [brand, setBrand] = useState("");
    const [deliveryFee, setDeliveryFee] = useState("free");
    const [description, setDescription] = useState("");

    // ✅ 파일 선택 핸들러
    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) {
            alert("파일을 선택해주세요!");
            return;
        }
        setSelectedFiles(files);
    };

    // ✅ 파일 업로드 및 상품 데이터 전송
    const handleFileUploadMultiple = async () => {
        if (selectedFiles.length === 0) {
            alert("파일을 선택해주세요!");
            return;
        }

        // ✅ FormData 생성
        const formData = new FormData();
        formData.append("category", category);
        formData.append("sub_category", subCategory);
        formData.append("name", pname);
        formData.append("color", JSON.stringify(color.split(',').map(c => c.trim()))); // JSON 변환
        formData.append("size", JSON.stringify(size.split(',').map(s => s.trim())));
        formData.append("stock", stock);
        formData.append("original_price", price);
        formData.append("discount_rate", saleRate);
        formData.append("discounted_price", salePrice);
        formData.append("brand", brand);
        formData.append("delivery_fee", deliveryFee);
        formData.append("description", description);

        // ✅ 파일 추가
        selectedFiles.forEach((file) => formData.append("files", file));

        try {
            const response = await axios.post("http://localhost:9000/upload/multiple", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            console.log("✅ 업로드 완료:", response.data);
            getFileName(response.data);
            alert("상품 및 파일 업로드 완료!");
        } catch (error) {
            console.error("🚨 업로드 실패:", error);
            alert("업로드 실패. 다시 시도해주세요.");
        }
    };

    return (
        <div>
            {/* 입력 폼 */}
            <Form.Group>
                <Form.Label>대분류</Form.Label>
                <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="default">선택</option>
                    <option value="top">상의</option>
                    <option value="bottom">하의</option>
                    <option value="outer">아우터</option>
                    <option value="shoes">신발</option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>소분류</Form.Label>
                <Form.Control type="text" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>상품명</Form.Label>
                <Form.Control type="text" value={pname} onChange={(e) => setPname(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>색상</Form.Label>
                <Form.Control type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="예: red, blue, black" />
            </Form.Group>

            <Form.Group>
                <Form.Label>사이즈</Form.Label>
                <Form.Control type="text" value={size} onChange={(e) => setSize(e.target.value)} placeholder="예: S, M, L, XL" />
            </Form.Group>

            <Form.Group>
                <Form.Label>가격</Form.Label>
                <Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>재고</Form.Label>
                <Form.Control type="text" value={stock} onChange={(e) => setStock(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>브랜드</Form.Label>
                <Form.Control type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>배송비</Form.Label>
                <Form.Control type="text" value={deliveryFee} onChange={(e) => setDeliveryFee(e.target.value)} placeholder="미입력 시 'free' 자동 입력" />
            </Form.Group>

            <Form.Group>
                <Form.Label>상품 설명</Form.Label>
                <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>

            {/* 파일 선택 */}
            <Form.Group>
                <Form.Label>사진 업로드</Form.Label>
                <Form.Control type="file" multiple onChange={handleFileSelect} />
            </Form.Group>

            {/* 업로드 버튼 */}
            <Button variant="primary" onClick={handleFileUploadMultiple}>
                상품 등록 및 사진 업로드
            </Button>
        </div>
    );
}
