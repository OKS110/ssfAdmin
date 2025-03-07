import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Main() {
    const [customerData, setCustomerData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [guestsData, setGuestsData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [orderGData, setOrderGData] = useState([]);
    const [category, setCategory] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        axios.post("http://localhost:9001/admin/customers")
            .then(res => setCustomerData(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.post("http://localhost:9001/admin/guests")
            .then(res => setGuestsData(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.post("http://localhost:9001/admin/products")
            .then(res => setProductData(res.data))
            .catch(err => console.log(err));
    }, []);
    useEffect(() => {
        axios.post("http://localhost:9001/admin/orders")
            .then(res => setOrderData(res.data))
            .catch(err => console.log(err));
    }, []);
    useEffect(() => {
        axios.post("http://localhost:9001/admin/ordersG")
            .then(res => setOrderGData(res.data))
            .catch(err => console.log(err));
    }, []);

    const clickTab = (name) => {
        if (category === name) {
            setIsOpen(!isOpen);  // 같은 탭을 누르면 닫기
        } else {
            setCategory(name);
            setIsOpen(true);  // 다른 탭을 누르면 항상 열기
        }
    };
    return (
        <div className='adminMain-container'>
            <ul className='adminMain-menu-list'>
                <li className={category === "customers" ? 'adminMain-menu-select' : 'adminMain-menu'} onClick={() => clickTab("customers")}>
                    고객정보
                </li>
                <li className={category === "guests" ? 'adminMain-menu-select' : 'adminMain-menu'} onClick={() => clickTab("guests")}>
                    게스트 정보
                </li>
                <li className={category === "products" ? 'adminMain-menu-select' : 'adminMain-menu'} onClick={() => clickTab("products")}>
                    상품리스트
                </li>
                <li className={category === "orders" ? 'adminMain-menu-select' : 'adminMain-menu'} onClick={() => clickTab("orders")}>
                    회원 주문리스트
                </li>
                <li className={category === "ordersG" ? 'adminMain-menu-select' : 'adminMain-menu'} onClick={() => clickTab("ordersG")}>
                    비회원 주문리스트
                </li>

            </ul>
            { isOpen &&
                category === "customers" &&
                <table className='adminMain-table'>
                    <tr>
                        <th>회원번호</th>
                        <th>이름</th>
                        <th>아이디(닉네임)</th>
                        <th>이메일</th>
                        <th>전화번호</th>
                        <th>주소</th>
                        <th>생일</th>
                        <th>멤버십 등급</th>
                    </tr>
                    { customerData && customerData.map((list) => 
                        <tr>
                            <td>{list.customer_id}</td>
                            <td>{list.name}</td>
                            <td>{list.username}</td>
                            <td>{list.email}</td>
                            <td>{list.phone}</td>
                            <td>{list.address}</td>
                            <td>{list.birth_date}</td>
                            <td>{list.membership_level}</td>
                        </tr>
                    ) }
                </table>
            }

            { isOpen &&
                category === "guests" &&
                <table className='adminMain-table'>
                    <tr>
                        <th>비회원번호</th>
                        <th>이름</th>
                        <th>전화번호</th>
                        <th>이메일</th>
                        <th>주소</th>
                        <th>상세주소</th>
                        <th>우편번호</th>

                    </tr>
                    { guestsData && guestsData.map((list) =>
                        <tr>
                            <td>{list.gid}</td>
                            <td>{list.name}</td>
                            <td>{list.phone}</td>
                            <td>{list.email}</td>
                            <td>{list.address}</td>
                            <td>{list.detail_address}</td>
                            <td>{list.zipcode}</td>
                        </tr>
                    ) }
                </table>
            }

            { isOpen &&
                category === "products" &&
                <table className='adminMain-table'>
                    <tr>
                        <th>상품번호</th>
                        <th>대분류</th>
                        <th>소분류</th>
                        <th>상품명</th>
                        <th>색상</th>
                        <th>사이즈</th>
                        <th>좋아요 수</th>
                        <th>별점</th>
                        <th>재고</th>
                        <th>원가</th>
                        <th>할인률</th>
                        <th>판매가</th>
                    </tr>
                    { productData && productData.map((list) =>
                        <tr>
                            <td>{list.pid}</td>
                            <td>{list.category}</td>
                            <td>{list.sub_category}</td>
                            <td>{list.name}</td>
                            <td>{list.color.map((color) => <span>{color} </span>)}</td>
                            {/* <td>{list.color.map((list) => list.split(",").map(color => <span>{color}</span>))}</td> */}
                            <td>{list.size.map((option) => <span>{option.name ? option.name : option} </span>)}</td>
                            <td>{list.likes}</td>
                            <td>{list.star}</td>
                            <td>{list.stock}</td>
                            <td>{list.original_price}</td>
                            <td>{list.discount_rate}</td>
                            <td>{list.discounted_price}</td>
                        </tr>
                    ) }
                </table>
            }

            { isOpen &&
                category === "orders" &&
                <table className='adminMain-table'  style={{width:"90%"}}>
                    <tr>
                        <th>번호</th>
                        <th>회원번호</th>
                        <th>주문번호</th>
                        <th>브랜드</th>
                        <th>상품명</th>
                        <th>총 가격</th>
                        <th>사이즈</th>
                        <th>색상</th>
                        <th>수량</th>
                        <th>우편번호</th>
                        <th>주소</th>
                        <th>상세주소</th>
                        <th>배송메시지</th>
                        <th>주문날짜</th>
                        <th>결제수단</th>
                        <th>상태</th>
                    </tr>
                    { orderData && orderData.map((list) =>
                        <tr>
                            <td>{list.oid}</td>
                            <td>{list.customer_id}</td>
                            <td>{list.order_number}</td>
                            <td>{list.brand}</td>
                            <td>{list.title}</td>
                            <td>{list.total_price}</td>
                            <td>{list.size}</td>
                            <td>{list.color}</td>
                            <td>{list.quantity}</td>
                            <td>{list.zipcode}</td>
                            <td>{list.shipping_address}</td>
                            <td>{list.detail_address}</td>
                            <td>{list.delivery_message}</td>
                            <td>{list.order_date}</td>
                            <td>{list.payment_method}</td>
                            <td>{list.status}</td>
                        </tr>
                    ) }
                </table>
            }
            { isOpen &&
                category === "ordersG" &&
                <table className='adminMain-table' style={{width:"90%"}}>
                    <tr>
                        <th>번호</th>
                        <th>비회원번호</th>
                        <th>주문번호</th>
                        <th>브랜드</th>
                        <th>상품명</th>
                        <th>총 가격</th>
                        <th>사이즈</th>
                        <th>색상</th>
                        <th>수량</th>
                        <th>우편번호</th>
                        <th>주소</th>
                        <th>상세주소</th>
                        <th>배송메시지</th>
                        <th>주문날짜</th>
                        <th>결제수단</th>
                        <th>상태</th>
                    </tr>
                    { orderGData && orderGData.map((list) =>
                    <tr>
                        <td>{list.g_oid}</td>
                        <td>{list.guest_id}</td>
                        <td>{list.order_number}</td>
                        <td>{list.brand}</td>
                        <td>{list.title}</td>
                        <td>{list.total_price}</td>
                        <td>{list.size}</td>
                        <td>{list.color}</td>
                        <td>{list.quantity}</td>
                        <td>{list.zipcode}</td>
                        <td>{list.shipping_address}</td>
                        <td>{list.detail_address}</td>
                        <td>{list.delivery_message}</td>
                        <td>{list.order_date}</td>
                        <td>{list.payment_method}</td>
                        <td>{list.status}</td>
                    </tr>
                    ) }
                </table>
            }

           
        </div>
    );
}