export declare class MapQueue {
    private queue;
    private accuTime;
    constructor(queue?: Map<number, Function>, accuTime?: number);
    addTask(task: Function, time: number): this;
    start(): void;
}
