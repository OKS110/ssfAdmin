import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        try{
          const tokens = localStorage.getItem('token');
          return tokens ? true : false;
    
        }catch(error){
            console.log('로컬스토리지 JSON 파싱 오류', error);
            return []; // 오류 발생 시 빈 배열 반환
        }});

    // 토큰이 있으면 로그인 상태 유지
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); //token이 null이면 false, 값이 있으면 true - !!는 불리언(Boolean) 값으로 변환
    }, []);
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}