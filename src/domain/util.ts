export const copyArrayShallow = function<T>(array: ReadonlyArray<T>): Array<T> {
    return array.concat()
}