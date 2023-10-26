export interface User {
    UserName: string;
    Password: string;
}
export interface TokenDetails {
    accessToken: string,
    refreshToken: string
}
export interface Employee {
    EmpName: string;
    EmpDept: string;
}