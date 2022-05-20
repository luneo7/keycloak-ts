export default class Deferred<T> {
    private promise;
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
    constructor();
    getPromise(): Promise<T>;
}
