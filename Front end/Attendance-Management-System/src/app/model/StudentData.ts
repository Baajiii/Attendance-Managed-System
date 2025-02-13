export class StudentData{
    name:  string;
    rollno: string;
    year: number;
    dept: string;
    startYear:string;
    endYear: string;
    degree: string;
    gender: boolean;
    



constructor ( name:string,rollno:string, year:number, dept: string, startYear: string, endYear: string, degree: string, gender: boolean){
this.degree = degree;
this.rollno = rollno;
this.year = year;
this.name = name;
this.dept = dept;
this.startYear = startYear;
this.endYear = endYear;
this.gender = gender;
}

}