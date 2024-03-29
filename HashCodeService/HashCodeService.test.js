/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertEquals} from "../testUtils/testUtils.js";
import {HashCodeService} from "./HashCodeService.js";


export function whenGetHashCodeIsCalledRepeatedly_andObjectIsIdentical_thenResultIsConsistent() {
    let hashCodeService = HashCodeService.getInstance();
    let object = new Object();
    let hashCode = hashCodeService.getHashCode(object);

    assertEquals(hashCode, hashCodeService.getHashCode(object));
    assertEquals(hashCode, hashCodeService.getHashCode(object));
}
