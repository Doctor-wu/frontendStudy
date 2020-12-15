interface IState {
    show(): void;
}
declare class Buttery implements IState {
    amount: string;
    state: IState;
    constructor();
    show(): void;
}
declare class SuccessState implements IState {
    show(): void;
}
declare class WarnState implements IState {
    show(): void;
}
declare class ErrorState implements IState {
    show(): void;
}
declare class WorstState implements IState {
    show(): void;
}
declare let buttery: Buttery;
