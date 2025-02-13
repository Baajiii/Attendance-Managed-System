export class LoginDataAdmin{
    username:string;
    password: string;
    role: boolean


constructor (username:string, password:string, role:boolean){
this.username= username;
this.password= password;
this.role= role;
}

}