
/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {performance} from "perf_hooks";


let testPaths = [
    "../ABTreeList/ABTreeList.test.js", 
    "../ABTreeMap/ABTreeMap.test.js", 
    "../ABTreeSet/ABTreeSet.test.js", 
    "../arrayTools/arrayTools.test.js", 
    "../AVLTreeList/AVLTreeList.test.js", 
    "../AVLTreeMap/AVLTreeMap.test.js", 
    "../AVLTreeSet/AVLTreeSet.test.js", 
    "../BinaryTreeMaxHeap/BinaryTreeMaxHeap.test.js", 
    "../BinaryTreeMinHeap/BinaryTreeMinHeap.test.js", 
    "../comparators/comparators.test.js", 
    "../LinkedList/LinkedList.test.js", 
    "../LinkedListQueue/LinkedListQueue.test.js", 
    "../LinkedListStack/LinkedListStack.test.js", 
    "../RBTreeList/RBTreeList.test.js", 
    "../RBTreeListImpl1/RBTreeListImpl1.test.js", 
    "../RBTreeListImpl2/RBTreeListImpl2.test.js", 
    "../RBTreeMap/RBTreeMap.test.js", 
    "../RBTreeMapImpl1/RBTreeMapImpl1.test.js", 
    "../RBTreeMapImpl2/RBTreeMapImpl2.test.js", 
    "../RBTreeSet/RBTreeSet.test.js", 
    "../RBTreeSetImpl1/RBTreeSetImpl1.test.js", 
    "../RBTreeSetImpl2/RBTreeSetImpl2.test.js", 
    "../testUtils/testUtils.test.js"
];

async function runTests() {
    for (let filePath of testPaths) {
        let module;

        try {
            module = await import(filePath);
        } catch (error) {
            console.error(`
[ERROR] Invalid Tests - ${filePath}
${error.message}
`
            );
            continue;
        }

        for (let testCaseName of Object.keys(module)) {
            runTest(new TestCase(filePath, testCaseName, () => module[testCaseName].call(null)));
        }
    }
}

async function runTest(testCase) {
    try {
        let startTime = performance.now();

        testCase.testMethod().call(null);
        console.log(`\
[PASS] ${testCase.filePath()} - ${testCase.testCaseName()} - ${performance.now() - startTime}ms\
`
        );
    } catch (error) {
        console.error(`\
[ERROR] Exception - ${testCase.filePath()} - ${testCase.testCaseName()}
${(error != null ? error.message : "null")}
`
        );
    }
}


class TestCase {
    _filePath;
    _testCaseName;
    _testMethod;

    constructor(filePath, testCaseName, testMethod) {
        this._filePath = filePath;
        this._testCaseName = testCaseName;
        this._testMethod = testMethod;
    }

    filePath() { return this._filePath; }
    testCaseName() { return this._testCaseName; }
    testMethod() { return this._testMethod; }
}

(async () => runTests())();