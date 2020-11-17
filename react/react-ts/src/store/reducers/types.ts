export interface IActionTypes {
  readonly SETBANNERLIST: Symbol;
  readonly SETPLAYLIST: Symbol;
}

const actionTypes: IActionTypes = {
  SETBANNERLIST: Symbol(),
  SETPLAYLIST: Symbol(),
};

export { actionTypes };
