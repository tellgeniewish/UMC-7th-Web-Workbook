const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// CORS 미들웨어 사용 (모든 요청을 허용)
app.use(cors());

// JSON 요청 본문을 파싱하기 위한 미들웨어
app.use(express.json());

// 임시 사용자 데이터 (실제 환경에서는 데이터베이스에서 조회해야 함)
let users = [];

// 회원가입 처리 라우트
app.post('/auth/register', (req, res) => {
  const { email, password } = req.body;
  
  // 이메일과 비밀번호가 제공되지 않았을 때
  if (!email || !password) {
    return res.status(400).json({ message: '이메일과 비밀번호를 모두 입력해야 합니다.' });
  }
  
  // 이미 동일한 이메일을 가진 사용자가 있는지 확인
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: '이미 등록된 이메일입니다.' });
  }
  
  // 임시로 사용자 데이터에 저장
  users.push({ email, password });
  
  return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
});

// 로그인 처리 라우트
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // 이메일과 비밀번호 확인
  const user = users.find(user => user.email === email && user.password === password);
  
  if (user) {
    // 로그인 성공: JWT 토큰 생성 (토큰 유효기간 1시간 설정)
    const token = jwt.sign({ email: user.email }, 'your-secret-key', { expiresIn: '1h' });
    return res.status(200).json({ message: '로그인 성공', token });
  } else {
    return res.status(401).json({ message: '잘못된 이메일 또는 비밀번호' });
  }
});

// 사용자 정보 요청 API (로그인한 사용자의 정보 반환)
app.get('/user/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Authorization 헤더에서 토큰 추출
  
  if (!token) {
    return res.status(401).json({ message: '토큰이 없습니다. 로그인 후 다시 시도하세요.' });
  }
  
  // 토큰 검증
  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
    
    // 토큰이 유효한 경우 사용자의 이메일 반환
    res.json({ email: decoded.email });
  });
});

// 💖 Todos 관련 라우트 추가 💖
// 임시로 저장할 Todos 데이터 배열
let todos = []; // 💖 Todos 데이터 배열 추가

// Todos 조회 API
app.get('/todo', (req, res) => { // 💖
  res.status(200).json(todos); // Todos 데이터를 JSON으로 반환
}); // 💖

// Todos 생성 API
app.post('/todo', (req, res) => { // 💖
  const { id, text } = req.body;

  if (!id || !text) {
    return res.status(400).json({ message: 'ID와 텍스트를 모두 입력해야 합니다.' });
  }

  // 새로운 todo 항목 추가
  todos.push({ id, text });
  return res.status(201).json({ message: 'Todo가 성공적으로 추가되었습니다.', todos });
}); // 💖

// Todos 삭제 API
app.delete('/todo/:id', (req, res) => { // 💖
  const { id } = req.params;

  // ID에 해당하는 todo 항목 삭제
  const index = todos.findIndex(todo => todo.id === parseInt(id, 10));

  if (index === -1) {
    return res.status(404).json({ message: '삭제할 Todo를 찾을 수 없습니다.' });
  }

  todos.splice(index, 1);
  return res.status(200).json({ message: 'Todo가 성공적으로 삭제되었습니다.', todos });
}); // 💖

// 서버 실행 (3000 포트)
app.listen(3000, () => {
  console.log('서버가 3000 포트에서 실행 중입니다.');
});