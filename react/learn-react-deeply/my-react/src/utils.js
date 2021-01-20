import {REACT_TEXT} from './constants';

export function isText(obj) {
    return typeof obj === 'string' || typeof obj === 'number';
}

export function wrapToVdom(obj) {
    return isText(obj) ? {type: REACT_TEXT, props: {content: obj}} : obj;
}

export function isFunction(obj) {
    return typeof obj === 'function';
}
