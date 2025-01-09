function getObject() {
    return "string"; // string 반환
}
const result: object = getObject(); // 타입스크립트: 에러 
// (Type 'string' is not assignable to type 'object')