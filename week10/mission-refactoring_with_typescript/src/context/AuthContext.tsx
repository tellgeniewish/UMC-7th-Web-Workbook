// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../apis/api';
// import { useQuery } from "@tanstack/react-query";
// import PropTypes from 'prop-types'; // PropTypes를 import

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  // 사용자 데이터의 타입을 정의
  [key: string]: any; // 임시로 모든 속성을 허용
}

interface AuthContextType {
  user: User | null;
  handleLogin: (userData: User) => void;
  handleLogout: () => void;
  fetchUser: () => Promise<void>;
}

// export const AuthContext = createContext();
// 초기값을 제공하여 createContext 호출
export const AuthContext = createContext<AuthContextType>({
  user: null,
  handleLogin: () => {},
  handleLogout: () => {},
  fetchUser: async () => {},
});

// export const AuthProvider = ({ children }) => {
  export const AuthProvider = ({ children }: AuthProviderProps) => {
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      fetchUser(); // 첫 로드 시 사용자 정보 가져오기
    }
  }, []);

  const fetchUser = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const response = await api.get('/user/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUser(response.data); // 사용자 정보 상태에 저장
        localStorage.setItem('user', JSON.stringify(response.data)); // 로컬스토리지에 사용자 정보 저장
      } catch (error) {
        console.error('유저 정보 불러오기 실패', error);
      }
    }
  };

  const handleLogin = (userData) => {
    setUser(userData); // user 업데이트
    localStorage.setItem('user', JSON.stringify(userData)); // 로컬에 저장
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// PropTypes로 children 검증 추가
// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired, // children은 반드시 React 노드이어야 함
// };