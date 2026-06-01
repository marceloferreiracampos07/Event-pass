export interface LoginUserInputDto {
    email: string;
    password: string;
}

export interface LoginUserOutputDto {
    id: string;
    name: string;
    email: string;
}