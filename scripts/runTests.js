
/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import * as process from "process";
import * as fs from "fs/promises";
import * as path from "path";
import {performance} from "perf_hooks";


async function findAllTests(rootDirEntPath) {
    console.log(`
======== Searching for Tests ========
`   );

    let testFilePaths = new Array();

    await findTests(rootDirEntPath, testFilePaths);
    console.log(`Found ${testFilePaths.length} test files.`);

    return testFilePaths;
}


async function findTests(dirEntPath, resultPaths) {
    if (await shouldIgnoreDirEntPath(dirEntPath)) {
        console.log(`\
Skipping ${dirEntPath} while searching for tests.\
`       );
        return;
    }

    let stats = await fs.stat(dirEntPath);

    if (stats.isDirectory()) {
        for (let dirEntName of await fs.readdir(dirEntPath)) {
            await findTests(path.join(dirEntPath, dirEntName), resultPaths);
        }
    } else if (stats.isFile() && /^[^]*\.\s*test\s*\.\s*js\s*$/.test(path.basename(dirEntPath))) {
        resultPaths.push(dirEntPath);
    }
}


async function shouldIgnoreDirEntPath(dirEntPath) {
    let absolutePath = path.resolve(dirEntPath);
    let stats = await fs.stat(dirEntPath);

    for (let ignoreDirEntRule of [
        () => /^\s*\.[^]*$/.test(path.basename(absolutePath)), // Ignore dot files/directories (ex: ".git" directory).
        () => /^node_modules$/.test(path.basename(absolutePath)) && stats.isDirectory() // Ignore the "node_modules" directory.
    ]) {
        if (ignoreDirEntRule()) {
            return true;
        }
    }

    return false;
}


async function runAllTests(testFilePaths) {
    let didAllTestsPass = true;

    console.log(`
======== Beginning Tests ========
`   );

    for (let testFilePath of testFilePaths) {
        let module;

        try {
            module = await import(path.resolve(testFilePath));
        } catch (error) {
            console.error(`\
Error: Invalid Tests - ${testFilePath}
${error.message}\
`
            );
            didAllTestsPass = false;
            continue;
        }

        for (let testCaseName of Object.keys(module)) {
            didAllTestsPass = await runTest(new TestCase(testFilePath, testCaseName, () => module[testCaseName].call(null))) && didAllTestsPass;
        }
    }

    console.log();

    if (!didAllTestsPass) {
        console.log("Failed tests!");
        process.exit(-1);
    } else {
        console.log("All tests passed!");
        process.exit(0);
    }
}


async function runTest(testCase) {
    try {
        let startTime = performance.now();

        testCase.testMethod().call(null);
        console.log(`\
Pass: ${testCase.filePath()} - ${testCase.testCaseName()} - ${performance.now() - startTime}ms\
`
        );
        return true;
    } catch (error) {
        if (error.stack) {
            console.error(error.stack);
        } else {
            console.error(`\
Error: Exception - ${testCase.filePath()} - ${testCase.testCaseName()}
${(error != null ? error.message : "null")}\
`
            );
        }
        return false;
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


(async () => await runAllTests(await findAllTests("./")))(); // Search for tests starting in the project root directory.
