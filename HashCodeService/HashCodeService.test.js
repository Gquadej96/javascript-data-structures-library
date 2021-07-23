/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertTruth} from "../testUtils/testUtils.js";
import {HashCodeService} from "./HashCodeService.js";


export function whenGetHashCodeIsCalledRepeatedly_andObjectIsIdentical_thenResultIsConsistent() {
    let hashCodeService = HashCodeService.getInstance();
    let object = new Object();
    let hashCode = hashCodeService.getHashCode(object);

    assertTruth(hashCode == hashCodeService.getHashCode(object));
    assertTruth(hashCode == hashCodeService.getHashCode(object));
}
