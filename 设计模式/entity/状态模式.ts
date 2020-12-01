interface IState {
    show(): void
}

class Buttery implements IState {
    public amount: string;
    public state: IState;

    constructor() {
        this.amount = "high";
        this.state = new SuccessState();
    }

    show() {
        this.state.show();// 把显示的逻辑交给了对象

        // 要完成状态转换需要套if-else，可以通过监听state来改变状态
        if (this.amount === "high") {
            this.amount = "middle";
            this.state = new WarnState();
        } else if (this.amount === "middle") {
            this.amount = "low";
            this.state = new ErrorState();
        } else if (this.amount === "low") {
            this.amount = "worst";
            this.state = new WorstState();
        }
    }
}


class SuccessState implements IState {
    show() {
        console.log("绿色")
    }
}

class WarnState implements IState {
    show() {
        console.log("黄色")
    }
}

class ErrorState implements IState {
    show() {
        console.log("红色")
    }
}

class WorstState implements IState {
    show() {
        console.log("深红色")
    }
}

let buttery = new Buttery();
buttery.show();
buttery.show();
buttery.show();
buttery.show();
