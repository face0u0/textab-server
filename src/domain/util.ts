export const copyArrayShallow = function<T>(array: ReadonlyArray<T>): ReadonlyArray<T> {
    return array.concat()
}