export {}

class Receiver {
    cook(){
        console.log('cook');
    }
    clean(){
        console.log('clean');
    }
}

interface Command{
    execute():void;
}

class CookCommand implements Command{
    constructor(public receiver:Receiver) {
        this.receiver = receiver;
    }
    execute(){
        this.receiver.cook();
    }
}

class CleanCommand implements Command{
    constructor(public receiver:Receiver) {
        this.receiver = receiver;
    }
    execute(){
        this.receiver.clean();
    }
}

class Custom{
    public command!:Command;
    constructor(command:Command) {
        this.command = command;
    }
    setCommand(command:Command){
        this.command = command;
    }
    invoke(){
        this.command.execute();
    }
}

let receiver:Receiver = new Receiver();
let cookCommand:Command = new CookCommand(receiver);
let cleanCommand:Command = new CleanCommand(receiver);
let custom:Custom = new Custom(cookCommand);
custom.invoke();
custom.setCommand(cleanCommand);
custom.invoke();
