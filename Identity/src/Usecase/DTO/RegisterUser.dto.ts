export interface RegisterUserInputDto {
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "CUSTOMER";
}

export interface RegisterUserOutputDto {
    id: string;
    name: string;
    email: string;
}