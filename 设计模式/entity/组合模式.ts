export {}
type menuItem = Folder | File
type methodsReturnThis<T extends object> = { [K in keyof T]: T[K] extends Function ? (...args: any[]) => T : T[K] }

class Folder implements methodsReturnThis<Folder> {
    constructor(public name: string, public parent?: Folder, public children: Array<menuItem> = []) {
        this.name = name;
        this.children = children;
        this!.parent = parent || undefined;
    }

    add(item: menuItem): Folder {
        this.children!.push(item);
        item.parent = this;
        return this;
    }

    show(): Folder {
        console.log(`文件夹: ${this.name}`);
        this.children.forEach(child=>child.show());
        return this;
    }

    remove(): Folder {
        if (this.parent) {
            this.parent.children!.forEach((child, index) => {
                if (child === this) {
                    this.parent!.children!.splice(index, 1);
                }
            })
        } else {
            console.log('cannot delete the root Folder');
        }
        return this;
    }
}


class File implements methodsReturnThis<File> {
    constructor(public name: string, public parent?: Folder) {
        this.name = name;
        this.parent = parent;
    }

    show(): File {
        console.log(`文件: ${this.name}`);

        return this;
    }
}

let root = new Folder('root');

let myInfo = new Folder('myInfo');
let myPhoto = new File('myPhoto');
myInfo.add(myPhoto);

let other = new Folder('other');
let otherFile = new File('otherFile');
other.add(otherFile);

root.add(myInfo);
root.add(other);

root.show();


