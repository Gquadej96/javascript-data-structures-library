/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


export class HashCodeService {

    static _instance = new HashCodeService();

    static getInstance() {
        return HashCodeService._instance;
    }


    _hashCodeMap = new WeakMap();
    _nextHashCode = 0;

    getHashCode(object) {
        let hashCode = this._hashCodeMap.get(object);

        if (hashCode == undefined) {
            hashCode = this._nextHashCode;
            ++this._nextHashCode;
            this._hashCodeMap.set(object, hashCode);
        }

        return hashCode;
    }
}