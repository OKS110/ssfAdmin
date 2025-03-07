import { db } from './db.js';

/** 관리자 페이지 로그인 - select **/
export const checkAdminLogin = async({id, pwd}) => { // 수정 필요 : 테이블명, 컬럼명
    const sql = `
        select count(*) as result_rows
        from admins
        where username = ? and password = ?
    `;

    const values = [
        id, pwd
    ];

    const [result] = await db.execute(sql, values);

    return result[0];
}

/** 관리자 페이지 고객 정보 호출 **/
export const getCustomerData = async() => {
    const sql = `
        select customer_id,
                name,
                username,
                email,
                phone,
                address,
                left(birth_date, 10) as birth_date,
                membership_level
        from customers
    `;

    const [result] = await db.execute(sql);

    return result;
}

/** 관리자 페이지 상품 정보 호출**/
export const getProductData = async() => {
    const sql = `
        select pid,
                category,
                sub_category,
                name,
                brand,
                color,
                size,
                likes,
                star,
                stock,
                original_price,
                discount_rate,
                discounted_price
        from products
    `;

    const [result] = await db.execute(sql);

    return result;
}

/** 관리자 페이지 상품 정보 호출**/
export const getGuestsData = async() => {
    const sql = `
        select 
            gid, name, phone, email, address, detail_address, zipcode
        from guests
    `;

    const [result] = await db.execute(sql);

    return result;
}

//  회원 주문 정보
export const getOrdersData = async() => {
    const sql = `
        select 
            oid, customer_id, order_number, brand, title, 
            total_price, size, color, quantity, 
            zipcode, 
            shipping_address,
            detail_address, delivery_message,
             order_date, payment_method, status  
        from orders;
    `;

    const [result] = await db.execute(sql);

    return result;
}

//  비회원 주문 정보
export const getOrdersGData = async() => {
    const sql = `
        select 
            g_oid, guest_id, order_number, brand, title, 
            total_price, size, color, quantity, 
            zipcode, 
            shipping_address,
            detail_address, delivery_message,
             order_date, payment_method, status  
        from guest_orders;
    `;

    const [result] = await db.execute(sql);

    return result;
}