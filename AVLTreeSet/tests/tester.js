/*
Author: Quade Jones
Email: Gquadej96@live.com
*/


import {AVLTreeSet} from "../AVLTreeSet.js";


function assert_truth(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

function assert_error(func, message) {
	try {
		func();
	} 
	catch (error) {
		return;
	}

	throw new Error(message);
}


// test set #1.

{
	let set = new AVLTreeSet();


	set.debug_verify_integrity();
	assert_truth(set.get_size() == 0, "unexpected size of the set.");


	set.rebalance();
	set.debug_verify_integrity();


	set.add(1);
	set.debug_verify_integrity();

	assert_truth(set.get_size() == 1, "unexpected size of the set.");

	assert_truth(set.has(1), "there is an item missing from the set.");

	assert_truth(set.get_item_by_rank(0) == 1, "unexpected item from rank.");
	assert_truth(set.get_rank_of_item(1) == 0, "unexpected rank of an item.");

	assert_truth(set.get_LUB(0) == 1, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(1) == 1, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(2) == null, "unexpected upper bound for an item.");

	assert_truth(set.get_GLB(0) == null, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(1) == 1, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(2) == 1, "unexpected lower bound for an item.");


	set.add(2);
	set.debug_verify_integrity();

	assert_truth(set.get_size() == 2, "unexpected size of the set.");

	assert_truth(set.has(2), "there is an item missing from the set.");

	assert_truth(set.get_item_by_rank(1) == 2, "unexpected item from rank.");
	assert_truth(set.get_rank_of_item(2) == 1, "unexpected rank of an item.");

	assert_truth(set.get_LUB(1) == 1, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(2) == 2, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(3) == null, "unexpected upper bound for an item.");

	assert_truth(set.get_GLB(1) == 1, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(2) == 2, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(3) == 2, "unexpected lower bound for an item.");


	set.add(1);
	set.debug_verify_integrity();

	assert_truth(set.get_size() == 2, "unexpected size of the set.");

	assert_truth(set.has(1), "there is an item missing from the set.");

	assert_truth(set.get_item_by_rank(0) == 1, "unexpected item from rank.");
	assert_truth(set.get_rank_of_item(1) == 0, "unexpected rank of an item.");


	set.add(4);
	set.debug_verify_integrity();

	assert_truth(set.get_size() == 3, "unexpected size of the set.");

	assert_truth(set.has(4), "there is an item missing from the set.");

	assert_truth(set.get_item_by_rank(2) == 4, "unexpected item from rank.");
	assert_truth(set.get_rank_of_item(4) == 2, "unexpected rank of an item.");

	assert_truth(set.get_LUB(3) == 4, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(4) == 4, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(5) == null, "unexpected upper bound for an item.");

	assert_truth(set.get_GLB(3) == 2, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(4) == 4, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(5) == 4, "unexpected lower bound for an item.");


	set.add(2);
	set.debug_verify_integrity();

	assert_truth(set.get_size() == 3, "unexpected size of the set.");

	assert_truth(set.has(2), "there is an item missing from the set.");

	assert_truth(set.get_item_by_rank(1) == 2, "unexpected item from rank.");
	assert_truth(set.get_rank_of_item(2) == 1, "unexpected rank of an item.");


	set.add(3);
	set.debug_verify_integrity();

	assert_truth(set.get_size() == 4, "unexpected size of the set.");

	assert_truth(set.has(3), "there is an item missing from the set.");

	assert_truth(set.get_item_by_rank(2) == 3, "unexpected item from rank.");
	assert_truth(set.get_rank_of_item(3) == 2, "unexpected rank of an item.");

	assert_truth(set.get_item_by_rank(3) == 4, "unexpected item from rank.");
	assert_truth(set.get_rank_of_item(4) == 3, "unexpected rank of an item.");

	assert_truth(set.get_LUB(2) == 2, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(3) == 3, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(4) == 4, "unexpected upper bound for an item.");

	assert_truth(set.get_GLB(2) == 2, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(3) == 3, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(4) == 4, "unexpected lower bound for an item.");


	set.add(3);
	set.debug_verify_integrity();

	assert_truth(set.get_size() == 4, "unexpected size of the set.");

	assert_truth(set.has(3), "there is an item missing from the set.");

	assert_truth(set.get_item_by_rank(2) == 3, "unexpected item from rank.");
	assert_truth(set.get_rank_of_item(3) == 2, "unexpected rank of an item.");


	set.rebalance();
	set.debug_verify_integrity();
	

	set = set.clone();
	set.debug_verify_integrity();

	assert_truth(set.get_size() == 4, "unexpected size of the set.");

	assert_truth(set.has(1), "there is an item missing from the set.");
	assert_truth(set.has(2), "there is an item missing from the set.");
	assert_truth(set.has(3), "there is an item missing from the set.");
	assert_truth(set.has(4), "there is an item missing from the set.");

	assert_truth(!set.has(0), "there is an unexpected item in the set.");
	assert_truth(!set.has(5), "there is an unexpected item in the set.");

	assert_truth(set.get_item_by_rank(0) == 1, "unexpected item from rank.");
	assert_truth(set.get_item_by_rank(1) == 2, "unexpected item from rank.");
	assert_truth(set.get_item_by_rank(2) == 3, "unexpected item from rank.");
	assert_truth(set.get_item_by_rank(3) == 4, "unexpected item from rank.");

	assert_error(set.get_item_by_rank.bind(set, -1), "no error thrown when attempting to get the item of a rank which is out of bounds in the set.");
	assert_error(set.get_item_by_rank.bind(set, 4), "no error thrown when attempting to get the item of a rank which is out of bounds in the set.");

	assert_truth(set.get_rank_of_item(-1) == 0, "unexpected rank of an item.");
	assert_truth(set.get_rank_of_item(1) == 0, "unexpected rank of an item.");
	assert_truth(set.get_rank_of_item(2) == 1, "unexpected rank of an item.");
	assert_truth(set.get_rank_of_item(3) == 2, "unexpected rank of an item.");
	assert_truth(set.get_rank_of_item(4) == 3, "unexpected rank of an item.");
	assert_truth(set.get_rank_of_item(5) == 4, "unexpected rank of an item.");

	//assert_error(set.get_rank_of_item.bind(set, 5), "no error thrown when attempting to get the rank a missing item from the set.");

	assert_truth(set.get_LUB(0) == 1, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(1) == 1, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(2) == 2, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(3) == 3, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(4) == 4, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(5) == null, "unexpected upper bound for an item.");

	assert_truth(set.get_GLB(0) == null, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(1) == 1, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(2) == 2, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(3) == 3, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(4) == 4, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(5) == 4, "unexpected lower bound for an item.");

	{
		let array = set.to_array();

		assert_truth(array.length == 4, "the array form of the set is incorrect.");

		for (let i = 0; 
			i < array.length; 
			++i) {
			
			assert_truth(array[i] == i + 1, "the array form of the set is incorrect.");
		}
	}

	{
		let array = new Array();

		set.do_for_each_item_in_order((i) => array.push(i));

		assert_truth(array.length == 4, "the iteration of the set is incorrect.");

		for (let i = 0; 
			i < array.length; 
			++i) {
			
			assert_truth(array[i] == i + 1, "the iteration of the set is incorrect.");
		}
	}


	set.remove(1);
	set.debug_verify_integrity();

	assert_truth(set.get_size() == 3, "unexpected size of the set.");

	assert_truth(!set.has(1), "there is an unexpected item in the set.");

	assert_truth(set.get_item_by_rank(0) == 2, "unexpected item from rank.");
	assert_truth(set.get_rank_of_item(2) == 0, "unexpected rank of an item.");

	assert_truth(set.get_item_by_rank(1) == 3, "unexpected item from rank.");
	assert_truth(set.get_rank_of_item(3) == 1, "unexpected rank of an item.");

	assert_truth(set.get_item_by_rank(2) == 4, "unexpected item from rank.");
	assert_truth(set.get_rank_of_item(4) == 2, "unexpected rank of an item.");

	assert_truth(set.get_LUB(0) == 2, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(1) == 2, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(3) == 3, "unexpected upper bound for an item.");

	assert_truth(set.get_GLB(0) == null, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(1) == null, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(3) == 3, "unexpected lower bound for an item.");

	//assert_error(set.remove.bind(set, 1), "no error thrown when attempting to remove a missing item from the set.");


	set.remove(3);
	set.debug_verify_integrity();

	assert_truth(set.get_size() == 2, "unexpected size of the set.");

	assert_truth(!set.has(3), "there is an unexpected item in the set.");

	assert_truth(set.get_item_by_rank(0) == 2, "unexpected item from rank.");
	assert_truth(set.get_rank_of_item(2) == 0, "unexpected rank of an item.");

	assert_truth(set.get_item_by_rank(1) == 4, "unexpected item from rank.");
	assert_truth(set.get_rank_of_item(4) == 1, "unexpected rank of an item.");

	assert_truth(set.get_LUB(1) == 2, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(2) == 2, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(3) == 4, "unexpected upper bound for an item.");

	assert_truth(set.get_GLB(1) == null, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(2) == 2, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(3) == 2, "unexpected lower bound for an item.");

	//assert_error(set.remove.bind(set, 3), "no error thrown when attempting to remove a missing item from the set.");


	set.remove(2);
	set.debug_verify_integrity();

	assert_truth(set.get_size() == 1, "unexpected size of the set.");

	assert_truth(!set.has(2), "there is an unexpected item in the set.");

	assert_truth(set.get_item_by_rank(0) == 4, "unexpected item from rank.");
	assert_truth(set.get_rank_of_item(4) == 0, "unexpected rank of an item.");

	assert_truth(set.get_LUB(2) == 4, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(3) == 4, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(4) == 4, "unexpected upper bound for an item.");

	assert_truth(set.get_GLB(3) == null, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(4) == 4, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(5) == 4, "unexpected lower bound for an item.");

	//assert_error(set.remove.bind(set, 2), "no error thrown when attempting to remove a missing item from the set.");


	set.remove(4);
	set.debug_verify_integrity();

	assert_truth(set.get_size() == 0, "unexpected size of the set.");

	assert_truth(!set.has(4), "there is an unexpected item in the set.");

	assert_truth(set.get_LUB(0) == null, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(1) == null, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(3) == null, "unexpected upper bound for an item.");

	assert_truth(set.get_GLB(0) == null, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(1) == null, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(2) == null, "unexpected lower bound for an item.");

	//assert_error(set.remove.bind(set, 4), "no error thrown when attempting to remove a missing item from the set.");
}


// test set #2.

{
	let size_of_tests = 1000;

	let set = new AVLTreeSet();

	for (let i = 0; 
		i < size_of_tests; 
		++i) {

		set.add(i);
		set.debug_verify_integrity();

		assert_truth(set.get_size() == i + 1, "unexpected size of set.");
	}

	set = set.clone();

	set.rebalance();
	set.debug_verify_integrity();

	for (let i = 0; 
		i < size_of_tests; 
		++i) {
		
		assert_truth(set.has(i), "there is an item missing from the set.");
	}

	assert_truth(!set.has(-1), "there is an unexpected item in the set.");
	assert_truth(!set.has(size_of_tests), "there is an unexpected item in the set.");

	for (let i = 0; 
		i < size_of_tests; 
		++i) {
		
		assert_truth(set.get_item_by_rank(i) == i, "unexpected item from rank.");
	}

	assert_error(set.get_item_by_rank.bind(set, -1), "no error thrown when attempting to get the item of a rank which is out of bounds in the set.");
	assert_error(set.get_item_by_rank.bind(set, size_of_tests), "no error thrown when attempting to get the item of a rank which is out of bounds in the set.");

	for (let i = 0; 
		i < size_of_tests; 
		++i) {
		
		assert_truth(set.get_rank_of_item(i) == i, "unexpected rank of an item.");
	}

	assert_truth(set.get_rank_of_item(-1) == 0, "unexpected rank of an item.");
	assert_truth(set.get_rank_of_item(size_of_tests) == size_of_tests, "unexpected rank of an item.");

	for (let i = 0; 
		i < size_of_tests; 
		++i) {
		
		assert_truth(set.get_LUB(i) == i, "unexpected upper bound for an item.");
	}

	assert_truth(set.get_LUB(-1) == 0, "unexpected upper bound for an item.");
	assert_truth(set.get_LUB(size_of_tests) == null, "unexpected upper bound for an item.");

	for (let i = 0; 
		i < size_of_tests; 
		++i) {
		
			assert_truth(set.get_GLB(i) == i, "unexpected lower bound for an item.");
	}

	assert_truth(set.get_GLB(-1) == null, "unexpected lower bound for an item.");
	assert_truth(set.get_GLB(size_of_tests) == size_of_tests - 1, "unexpected lower bound for an item.");

	for (let i = 0; 
		i < size_of_tests; 
		++i) {
		
		set.remove(i);
		set.debug_verify_integrity();

		assert_truth(!set.has(i), "this is an unexpected item in the set.");
		assert_truth(set.get_size() == size_of_tests - i - 1, "unexpected size of the set.");
	}

	set.rebalance();
	set.debug_verify_integrity();

	for (let i = size_of_tests - 1; 
		i >= 0; 
		--i) {
		
		set.add(i);
		set.debug_verify_integrity();

		assert_truth(set.get_size() == size_of_tests - i, "unexpected size of the set.");
	}

	set.rebalance();
	set.debug_verify_integrity();

	for (let i = 0; 
		i < Math.floor(size_of_tests / 2); 
		++i) {
		
		set.remove(i);
		set.debug_verify_integrity();

		assert_truth(set.get_size() == size_of_tests - i - 1, "unexpected size of the set.");
	}

	set.rebalance();
	set.debug_verify_integrity();

	for (let i = Math.floor(size_of_tests / 2) - 1; 
		i >= 0; 
		--i) {

		set.add(i);
		set.debug_verify_integrity();

		assert_truth(set.get_size() == size_of_tests - i, "unexpected size of the set.");
	}

	set.rebalance();
	set.debug_verify_integrity();

	for (let i = size_of_tests - 1; 
		i >= 0; 
		--i) {
		
		set.remove(i);
		set.debug_verify_integrity();

		assert_truth(set.get_size() == i, "unexpected size of the set.");
	}
}


// test set #3.

{
	let size_of_tests = 1000;

	let set = new AVLTreeSet();
	let ref = new Set();

	for (let i = 0; 
		i < size_of_tests; 
		++i) {
		
		let item = Math.floor(size_of_tests * Math.random());

		set.add(item);
		set.debug_verify_integrity();

		ref.add(item);

		assert_truth(set.has(item) == ref.has(item), "there is incorrect membership in the set.");
		assert_truth(set.get_size() == ref.size, "unexpected size of the set.");
	}

	set.rebalance();
	set.debug_verify_integrity();

	for (let i = 0; 
		i < size_of_tests; 
		++i) {
		
		let item = Math.floor(size_of_tests * Math.random());

		if (ref.has(item)) {
			set.remove(item);
			set.debug_verify_integrity();

			ref.delete(item);
		} 
		else {
			//assert_error(set.remove.bind(set), "no error thrown when attempting to remove a missing item from the set.");
		}

		assert_truth(set.has(item) == ref.has(item), "there is incorrect membership in the set.");
		assert_truth(set.get_size() == ref.size, "unexpected size of the set.");
	}
}

