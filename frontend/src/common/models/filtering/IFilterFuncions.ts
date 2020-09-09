import { IBindingCallback1 } from './../callback/IBindingCallback1';
import { IBindingAction } from "../callback/IBindingActions";

export type IFilterFunctions = {
  [key: string]: IBindingAction;
};
