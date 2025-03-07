import axios from 'axios';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function RegiProduct() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileNames, setFileNames] = useState({ uploadFileName: [], sourceFileName: [] });

    // ✅ 상품 정보 입력 상태 (초기값 설정)
    const [category, setCategory] = useState("default");
    const [subCategory, setSubCategory] = useState("");
    const [pname, setPname] = useState("");
    const [color, setColor] = useState("");
    const [price, setPrice] = useState("");
    const [star, setStar] = useState("");
    const [stock, setStock] = useState("");
    const [saleRate, setSaleRate] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [brand, setBrand] = useState("");
    const [deliveryFee, setDeliveryFee] = useState("free");
    const [description, setDescription] = useState("");

    // ✅ 사이즈 정보 상태 (초기값 - 신발 기준)
    const [sizes, setSizes] = useState([
        { name: "", foot_length: "" }
    ]);

    // ✅ 대분류 변경 시 사이즈 초기화 (신발 vs 의류)
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);

        if (selectedCategory === "shoes") {
            setSizes([{ name: "", foot_length: "" }]); // 신발 사이즈 구조
        } else {
            setSizes([{ name: "", total_length: "", sleeve_length: "", shoulder_width: "" }]); // 의류 사이즈 구조
        }
    };

    // ✅ 사이즈 추가
    const addSize = () => {
        if (category === "shoes") {
            setSizes([...sizes, { name: "", foot_length: "" }]);
        } else {
            setSizes([...sizes, { name: "", total_length: "", sleeve_length: "", shoulder_width: "" }]);
        }
    };

    // ✅ 사이즈 삭제
    const removeSize = (index) => {
        setSizes(sizes.filter((_, i) => i !== index));
    };

    // ✅ 사이즈 변경 핸들러
    const handleSizeChange = (index, field, value) => {
        const updatedSizes = [...sizes];
        updatedSizes[index][field] = value;
        setSizes(updatedSizes);
    };

    // ✅ 파일 선택 핸들러
    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) {
            alert("파일을 선택해주세요!");
            return;
        }
        setSelectedFiles(files);
    };

    // ✅ 상품 등록 및 파일 업로드 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (category === "default") {
            alert("대분류를 선택해주세요.");
            return;
        } else if (!subCategory || !pname || !color || !price || !stock || !saleRate || !salePrice || !brand || !deliveryFee || !description) {
            alert("필수 입력값을 모두 입력해주세요.");
            return;
        } else if (selectedFiles.length === 0) {
            alert("사진을 업로드해주세요.");
            return;
        }

        // ✅ FormData 생성
        const formData = new FormData();
        formData.append("category", category);
        formData.append("sub_category", subCategory);
        formData.append("name", pname);
        formData.append("color", JSON.stringify(color.split(",").map(c => c.trim())));
        formData.append("size", JSON.stringify(sizes));
        formData.append("star", star || "0.0");
        formData.append("stock", stock || "0");
        formData.append("original_price", price);
        formData.append("discount_rate", saleRate || "0");
        formData.append("discounted_price", salePrice || "0");
        formData.append("brand", brand || "기본 브랜드");
        formData.append("delivery_fee", deliveryFee || "free");
        formData.append("description", description || "상품 설명 없음");

        // ✅ 파일 추가
        selectedFiles.forEach((file) => formData.append("files", file));

        try {
            const response = await axios.post("http://localhost:9001/upload/multiple", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            console.log("✅ 업로드 완료:", response.data);
            setFileNames(response.data);
            alert("상품 및 파일 업로드 완료!");
        } catch (error) {
            console.error("🚨 업로드 실패:", error);
            alert("업로드 실패. 다시 시도해주세요.");
        }
    };

    return (
        <div className='adminRegiProduct-container'>
            <h3>상품 등록 폼</h3>
            <Form onSubmit={handleSubmit}>
                <ul className='adminRegiProduct-form'>
                    <li>
                        <Form.Label>대분류</Form.Label>
                        <Form.Control as="select" value={category} onChange={handleCategoryChange}>
                            <option value="default">선택</option>
                            <option value="top">상의</option>
                            <option value="bottom">하의</option>
                            <option value="outer">아우터</option>
                            <option value="shoes">신발</option>
                        </Form.Control>
                    </li>
                    <li>
                        <Form.Label>소분류</Form.Label>
                        <Form.Control type="text" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} />
                    </li>
                    <li>
                        <Form.Label>상품명</Form.Label>
                        <Form.Control type="text" value={pname} onChange={(e) => setPname(e.target.value)} />
                    </li>
                    <li>
                        <Form.Label>색상</Form.Label>
                        <Form.Control type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="예: red, blue, black" />
                    </li>
                    {/* ✅ 사이즈 입력 필드 (대분류에 따라 다르게 표시) */}
                    <li>
                        <Form.Label>사이즈 정보</Form.Label>
                        {sizes.map((size, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <Form.Control
                                    type="text"
                                    placeholder={category === "shoes" ? "사이즈 (예: 230, 235)" : "사이즈 (예: S, M, L, XL)"}
                                    value={size.name}
                                    onChange={(e) => handleSizeChange(index, "name", e.target.value)}
                                />
                                {category === "shoes" ? (
                                    <Form.Control
                                        type="number"
                                        placeholder="발 길이 (mm)"
                                        value={size.foot_length}
                                        onChange={(e) => handleSizeChange(index, "foot_length", e.target.value)}
                                    />
                                ) : (
                                    <>
                                        <Form.Control
                                            type="number"
                                            placeholder="총장"
                                            value={size.total_length}
                                            onChange={(e) => handleSizeChange(index, "total_length", e.target.value)}
                                        />
                                        <Form.Control
                                            type="number"
                                            placeholder="소매 길이"
                                            value={size.sleeve_length}
                                            onChange={(e) => handleSizeChange(index, "sleeve_length", e.target.value)}
                                        />
                                        <Form.Control
                                            type="number"
                                            placeholder="어깨 너비"
                                            value={size.shoulder_width}
                                            onChange={(e) => handleSizeChange(index, "shoulder_width", e.target.value)}
                                        />
                                    </>
                                )}
                                <Button variant="danger" onClick={() => removeSize(index)}>삭제</Button>
                            </div>
                        ))}
                        <Button variant="success" onClick={addSize}>+ 사이즈 추가</Button>
                    </li>

                    <li>
                        <Form.Label>가격</Form.Label>
                        <Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </li>
                    <li>
                        <Form.Label>별점</Form.Label>
                        <Form.Control type="text" value={star} onChange={(e) => setStar(e.target.value)} />
                    </li>
                    <li>
                        <Form.Label>재고</Form.Label>
                        <Form.Control type="text" value={stock} onChange={(e) => setStock(e.target.value)} />
                    </li>
                    <li>
                        <Form.Label>할인율</Form.Label>
                        <Form.Control type="text" value={saleRate} onChange={(e) => setSaleRate(e.target.value)} />
                    </li>
                    <li>
                        <Form.Label>할인가</Form.Label>
                        <Form.Control type="text" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} />
                    </li>
                    <li>
                        <Form.Label>브랜드</Form.Label>
                        <Form.Control type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
                    </li>
                    <li>
                        <Form.Label>배송비</Form.Label>
                        <Form.Control type="text" value={deliveryFee} onChange={(e) => setDeliveryFee(e.target.value)} placeholder="미입력 시 'free' 자동 입력" />
                    </li>
                    <li>
                        <Form.Label>상품 설명</Form.Label>
                        <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </li>
                    <li>
                        <Form.Label>사진 업로드</Form.Label>
                        <Form.Control type="file" multiple onChange={handleFileSelect} />
                    </li>
                </ul>

                {/* 업로드 버튼 */}
                <Button type="submit" variant="primary">
                    상품 등록 및 사진 업로드
                </Button>
            </Form>
        </div>
    );
}


