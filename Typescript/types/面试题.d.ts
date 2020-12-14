interface Action<T> {
    payload?: T;
    type: string;
}
declare type Connected = {
    delay(input: number): Action<string>;
    setMessage(action: Date): Action<number>;
};
export declare const connected: Connected;
export {};
