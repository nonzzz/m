/**
 * base useage shared function.
 */

export const { isArray } = Array

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFn = (val: unknown): val is Function => typeof val === 'function'
