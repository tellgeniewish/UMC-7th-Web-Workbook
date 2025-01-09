// 심볼 생성
const id1: symbol = Symbol('id'); // 'id'는 설명(description)
const id2: symbol = Symbol('id'); // 같은 설명이지만 서로 다른 심볼

console.log(id1 === id2); // false (고유함)

// 객체에 Symbol 키 사용
const user = {
  [id1]: 1234, // Symbol 키를 프로퍼티로 사용
  name: 'Genie'
};

console.log(user[id1]); // 1234
console.log(user['id']); // undefined (일반 문자열 키로 접근 불가)