export class MapQueue {
    constructor(private queue: Map<number, Function> = new Map, private accuTime: number = 0) {
    }

    addTask(task: Function, time: number) {
        this.accuTime += time;
        this.queue.set(this.accuTime, task);
        return this;
    }

    start() {
        this.queue.forEach((task, time) => {
            setTimeout(() => {
                task();
            }, time*1000)
        })
    }
}


function log(msg: string | number) {
    console.log(msg)
}

new MapQueue().addTask(() => log(1), 1).addTask(() => log(3), 2).addTask(() => log(4), 3).start();
