import { error } from "node:console";

export type  UserRole = "ADMIN"| "CUSTOMER";

export class User{
    constructor(
        public readonly Id:string,
        public name:string,
        public email: string,
        public role: UserRole, 
        public createdAt: Date
    ){
        this.validate();

    }
    private validate():void{
        if (!this.name || this.name.trim().length === 0) {
            throw new Error("o nome nao pode ser vazio preencha por gentileza")
        }
        if(this.name.trim().length < 3){
            throw new Error("o nome nao pode ter ser menor do que 3 caracteres")
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
            throw new Error("o email nao possui formato de email ");
            
        }
    }
}