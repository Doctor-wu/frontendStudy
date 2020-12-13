// setDifference
export type SetDifference<A, B> = A extends B ? never : A;

type A = string | number;
type B = number | boolean;
type AB = SetDifference<A, B>; // string


// Omit
export type Omit<T, K extends keyof any> = Pick<T, SetDifference<keyof T, K>>;

type Props = { name: string, age: number, visible: boolean };
type OmitAgeProps = Omit<Props, 'age'>;


// Diff
namespace Diff {
    type Props = { name: string, age: number, visible: boolean };
    type DefaultProps = { age: number };

    export type Diff<T extends object, U extends object> = Pick<T, SetDifference<keyof T, keyof U>>;
    type DiffProps = Diff<Props, DefaultProps>;
    // let obj: DiffProps = {}
}

// InterSection
namespace InterSection {
    type Props = { name: string, age: number, visible: boolean };
    type DefaultProps = { age: number };


    export type InterSection<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U>>
    type DuplicateProps = InterSection<Props, DefaultProps>
    let obj: DuplicateProps = {
        age: 20
    }
}

// Overwrite
namespace Overwrite {
    type OldProps = { name: string, age: number, visible: boolean };
    type NewProps = { age: string, other: string };

    type Overwrite<T extends object,
        U extends object,
        I = Diff.Diff<T, U> & U> = Pick<I, keyof I>
    type ReplacedProps = Overwrite<OldProps, NewProps>;
    // let obj: ReplacedProps = {}
}
