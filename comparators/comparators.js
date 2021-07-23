/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {HashCodeService} from "../HashCodeService/HashCodeService.js";


export class BasicComparator {
    compare(a, b) {
        if (a == b) {
            return 0;
        } else if (a < b) {
            return -1;
        } else {
            return 1;
        }
    }
}


export class ObjectReferenceComparator {
    _hashCodeService = HashCodeService.getInstance();


    compare(a, b) {
        return this._hashCodeService.getHashCode(a) - this._hashCodeService.getHashCode(b);
    }
}


export class ArrayElementComparator {
    _elementComparator = new BasicComparator();


    constructor(elementComparator) {
        this._elementComparator = elementComparator || this._elementComparator;
    }


    compare(a, b) {
        let length = Math.min(a.length, b.length);

        for (let i = 0; i < length; ++i) {
            let res = this._elementComparator.compare(a[i], b[i]);

            if (res != 0) {
                return res;
            }
        }

        return a.length - b.length;
    }
}


export class StringComparator 
    extends ArrayElementComparator {

    constructor() {
        super(
            new class {
                compare(a, b) {
                    return a.codePointAt(0) - b.codePointAt(0);
                }
            }
        );
    }
}


export class ObjectFieldComparator {
    _stringComparator = new StringComparator();
    _valueComparator = new BasicComparator();
    _entryArrayComparator = null;


    constructor(valueComparator) {
        let self = this;

        this._valueComparator = valueComparator || this._valueComparator;
        this._entryArrayComparator = new ArrayElementComparator(
            new class {
                compare(a, b) {
                    let res = self._stringComparator.compare(a.name, b.name);
        
                    if (res != 0) {
                        return res;
                    }
        
                    res = self._valueComparator.compare(a.value, b.value);
                    return res;
                }
            }
        );
    }


    compare(a, b) {
        let entryArray1 = Object.getOwnPropertyNames(a).map((name) => {return {name: name, value: a[name]};});
        let entryArray2 = Object.getOwnPropertyNames(b).map((name) => {return {name: name, value: b[name]};});

        entryArray1.sort((a, b) => this._stringComparator.compare(a.name, b.name));
        entryArray2.sort((a, b) => this._stringComparator.compare(a.name, b.name));

        return this._entryArrayComparator.compare(entryArray1, entryArray2);
    }
}


export class ReverseComparator {
    _comparator = new BasicComparator();


    constructor(comparator) {
        this._comparator = comparator || this._comparator;
    }


    compare(a, b) {
        return this._comparator.compare(b, a);
    }
}


export class UniversalComparator {
    static _stringComparator = new StringComparator();
    static _comparators = {
        "string": new StringComparator(), 
        "number": new BasicComparator(), 
        "object": new ObjectReferenceComparator()
    };


    compare(a, b) {
        let res = UniversalComparator._stringComparator.compare(typeof(a), typeof(b));

        if (res != 0) {
            return res;
        }

        if (UniversalComparator._comparators[typeof(a)] == null) {
            return UniversalComparator._comparators["object"].compare(a, b);
        }

        return UniversalComparator._comparators[typeof(a)].compare(a, b);
    }
}

