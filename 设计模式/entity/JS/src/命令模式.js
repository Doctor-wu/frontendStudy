"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Receiver = /** @class */ (function () {
    function Receiver() {
    }
    Receiver.prototype.cook = function () {
        console.log('cook');
    };
    Receiver.prototype.clean = function () {
        console.log('clean');
    };
    return Receiver;
}());
var CookCommand = /** @class */ (function () {
    function CookCommand(receiver) {
        this.receiver = receiver;
        this.receiver = receiver;
    }
    CookCommand.prototype.execute = function () {
        this.receiver.cook();
    };
    return CookCommand;
}());
var CleanCommand = /** @class */ (function () {
    function CleanCommand(receiver) {
        this.receiver = receiver;
        this.receiver = receiver;
    }
    CleanCommand.prototype.execute = function () {
        this.receiver.clean();
    };
    return CleanCommand;
}());
var Custom = /** @class */ (function () {
    function Custom(command) {
        this.command = command;
    }
    Custom.prototype.setCommand = function (command) {
        this.command = command;
    };
    Custom.prototype.invoke = function () {
        this.command.execute();
    };
    return Custom;
}());
var receiver = new Receiver();
var cookCommand = new CookCommand(receiver);
var cleanCommand = new CleanCommand(receiver);
var custom = new Custom(cookCommand);
custom.invoke();
custom.setCommand(cleanCommand);
custom.invoke();
