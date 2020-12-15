class Teacher {
    public students: Student[]
    private state: string

    constructor(public name: string) {
        this.students = [];
        this.state = "上课";
    }

    attach(student: Student) {
        this.students.push(student);
    }

    notify() {
        this.setState("提问");
        this.students.forEach(student => student.update());
    }

    getState() {
        return this.state;
    }

    setState(val: string) {
        this.state = val;
    }
}

class Student {
    constructor(public teacher: Teacher) {
    }

    update() {
    }
}

class Xueba extends Student {
    constructor(teacher: Teacher) {
        super(teacher);
    }

    update() {
        console.log(`${this.teacher.name}老师正在${this.teacher.getState()}, 学霸抬头举手`);
    }
}

class Xuezha extends Student {
    constructor(teacher: Teacher) {
        super(teacher);
    }

    update() {
        console.log(`${this.teacher.name}老师正在${this.teacher.getState()}, 学渣低头不敢看老师`);
    }
}

let teacher = new Teacher("doctorwu");
let xueba = new Xueba(teacher);
let xuezha = new Xuezha(teacher);

teacher.attach(xueba);
teacher.attach(xuezha);

teacher.notify();

// 观察者模式的特点，观察者与被观察者双方都能感知到对方的存在
