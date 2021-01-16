declare class Base {
    invoke<This extends Base & Record<Property, This[Property]>, Property extends string>(this: This, property: Property, ...args: Parameters<This[Property]>): void;
}
