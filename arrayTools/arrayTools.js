/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import * as comparators from "../comparators/comparators.js";


export function isInSortOrder(array, comparator) {
    comparator = comparator || new comparators.UniversalComparator();

    for (let i = 1; i < array.length; ++i) {
        if (comparator.compare(array[i - 1], array[i]) > 0) {
            return false;
        }
    }

    return true;
}


export function heapSort(array, comparator) {
    comparator = comparator || new comparators.UniversalComparator();

    let getLeftChildOfItem = i => 2 * i + 1;
    let getRightChildOfItem = i => 2 * i + 2;
    let getParentOfItem = i => Math.floor((i + 1) / 2) - 1;

    let swap = (i, j) => {
        let temp = array[i];

        array[i] = array[j];
        array[j] = temp;
    };

    let shiftItemDown = (i, length) => {
        while (getRightChildOfItem(i) < length) {
            let largest = [getLeftChildOfItem(i), getRightChildOfItem(i), i].sort((i, j) => comparator.compare(array[i], array[j])).reverse()[0];

            if (i == largest) {
                break;
            }

            swap(i, largest);
            i = largest;
        }

        if (getLeftChildOfItem(i) < length) {
            let largest = [getLeftChildOfItem(i), i].sort((i, j) => comparator.compare(array[i], array[j])).reverse()[0];

            if (i != largest) {
                swap(i, largest);
                //i = largest;
            }
        }
    };

    
    for (let i = getParentOfItem(array.length - 1); i >= 0; --i) {
        shiftItemDown(i, array.length);
    }


    let unsortedLength = array.length;

    while (unsortedLength >= 2) {
        unsortedLength = unsortedLength - 1;
        swap(0, unsortedLength);
        shiftItemDown(0, unsortedLength);
    }
}


export function binarySearchGetFirst(array, target, comparator) {
    comparator = comparator || new comparators.UniversalComparator();
    
    let leftInclusiveIndex = 0;
    let rightExclusiveIndex = array.length;

    while (leftInclusiveIndex < rightExclusiveIndex) {
        let m = Math.floor((leftInclusiveIndex + rightExclusiveIndex) / 2);

        if (comparator.compare(target, array[m]) <= 0) {
            rightExclusiveIndex = m;
        } else {
            leftInclusiveIndex = m + 1;
        }
    }

    return rightExclusiveIndex;
}


export function binarySearchGetLast(array, target, comparator) {
    comparator = comparator || new comparators.UniversalComparator();

    let successor = binarySearchGetFirstSuccessor(array, target, comparator);
    
    if (successor > 0 && comparator.compare(target, array[successor - 1]) == 0) {
        return successor - 1;
    }

    return successor;
}


export function binarySearchGetFirstSuccessor(array, target, comparator) {
    
    comparator = comparator || new comparators.UniversalComparator();


    let leftInclusiveIndex = 0;
    let rightExclusiveIndex = array.length;

    while (leftInclusiveIndex < rightExclusiveIndex) {
        let m = Math.floor((leftInclusiveIndex + rightExclusiveIndex) / 2);

        if (comparator.compare(target, array[m]) < 0) {
            rightExclusiveIndex = m;
        } else {
            leftInclusiveIndex = m + 1;
        }
    }

    return leftInclusiveIndex;
}


export function insertionSort(array, comparator) {
    comparator = comparator || new comparators.UniversalComparator();

    for (let i = 1; i < array.length; ++i) {
        let temp = array[i];
        let j = i;

        while (j > 0 && comparator.compare(array[j - 1], temp) > 0) {
            array[j] = array[j - 1];
            j = j - 1;
        }

        array[j] = temp;
    }
}


export function quickSelect(array, k, comparator) {
    comparator = comparator || new comparators.UniversalComparator();

    function recur(a, b, length, k) {
        let getIndex = (i) => a * i + b;

        let partiallySort = (i, j) => { // a special implementation of insertion sort.
            for (let k = i + 1; k < j; ++k) {
                let temp = array[getIndex(k)];
                let l = k;

                while (l > i && comparator.compare(array[getIndex(l - 1)], temp) > 0) {
                    array[getIndex(l)] = array[getIndex(l - 1)];
                    l = l - 1;
                }

                array[getIndex(l)] = temp;
            }
        };

        let swap = (i, j) => {
            let temp = array[getIndex(i)];

            array[getIndex(i)] = array[getIndex(j)];
            array[getIndex(j)] = temp;
        };

        if (length <= 5) {
            partiallySort(0, length);
            return array[getIndex(k)];
        }

        for (let i = 0; i + 5 <= length; i = i + 5) {
            partiallySort(i, i + 5);
        }


        let median = recur(5 * a, b + 2 * a, Math.floor(length / 5), Math.floor(length / 5 / 2));
        let center = 0;

        let isLeftHeavy = false;

        for (let i = 0; i < length; ++i) {
            if (comparator.compare(array[getIndex(i)], median) == 0) {
                if (!isLeftHeavy) {
                    swap(i, center);
                    center = center + 1;
                }

                isLeftHeavy = !isLeftHeavy;
            } else if (comparator.compare(array[getIndex(i)], median) < 0) {
                swap(i, center);
                center = center + 1;
            }
        }
    
        /*if (k == center) {
            return median; 
        } else */if (k < center) {
            return recur(a, b, center, k);
        } else {
            return recur(a, b + center, length - center, k - center);
        }
    }

    if (k < 0 || k > array.length) {
        throw new Error("the item does not exist.");
    }

    return recur(1, 0, array.length, k);
}

