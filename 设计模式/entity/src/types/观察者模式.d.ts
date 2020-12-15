declare class Teacher {
    name: string;
    students: Student[];
    private state;
    constructor(name: string);
    attach(student: Student): void;
    notify(): void;
    getState(): string;
    setState(val: string): void;
}
declare class Student {
    teacher: Teacher;
    constructor(teacher: Teacher);
    update(): void;
}
declare class Xueba extends Student {
    constructor(teacher: Teacher);
    update(): void;
}
declare class Xuezha extends Student {
    constructor(teacher: Teacher);
    update(): void;
}
declare let teacher: Teacher;
declare let xueba: Xueba;
declare let xuezha: Xuezha;
