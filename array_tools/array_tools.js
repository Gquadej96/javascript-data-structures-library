/*
Author: Quade Jones
Email: Gquadej96@live.com
*/


import * as comparators from "../comparators/comparators.js";


export function is_in_sort_order(
	array, 
	comparator) {

	comparator = comparator || new comparators.UniversalComparator();

	for (let i = 1; 
		i < array.length; 
		++i) {
		
		if (comparator.compare(array[i - 1], array[i]) > 0) {
			return false;
		}
	}

	return true;
}


export function heap_sort(
	array, 
	comparator) {

	comparator = comparator || new comparators.UniversalComparator();


	let get_left_child_of_item = (i) => 2 * i + 1;
	let get_right_child_of_item = (i) => 2 * i + 2;
	let get_parent_of_item = (i) => Math.floor((i + 1) / 2) - 1;

	let swap = (i, j) => {
		let temp = array[i];

		array[i] = array[j];
		array[j] = temp;
	};

	let shift_item_down = (i, length) => {
		while (get_right_child_of_item(i) < length) {
			let largest = [get_left_child_of_item(i), get_right_child_of_item(i), i].sort((i, j) => comparator.compare(array[i], array[j])).reverse()[0];

			if (i == largest) {
				break;
			}

			swap(i, largest);
			i = largest;
		}

		if (get_left_child_of_item(i) < length) {
			let largest = [get_left_child_of_item(i), i].sort((i, j) => comparator.compare(array[i], array[j])).reverse()[0];

			if (i != largest) {
				swap(i, largest);
				//i = largest;
			}
		}
	};

	
	for (let i = get_parent_of_item(array.length - 1); 
		i >= 0; 
		--i) {
		
		shift_item_down(i, array.length);
	}


	let unsorted_length = array.length;

	while (unsorted_length >= 2) {
		unsorted_length = unsorted_length - 1;
		swap(0, unsorted_length);
		shift_item_down(0, unsorted_length);
	}
}


export function binary_search_get_first(
	array, 
	target, 
	comparator) {
	
	comparator = comparator || new comparators.UniversalComparator();

	
	let L = 0;
	let R = array.length;

	while (L < R) {
		let m = Math.floor((L + R) / 2);

		if (comparator.compare(target, array[m]) <= 0) {
			R = m;
		} 
		else {
			L = m + 1;
		}
	}

	return R;
}


export function binary_search_get_last(
	array, 
	target, 
	comparator) {
	
	comparator = comparator || new comparators.UniversalComparator();


	let successor = binary_search_get_first_successor(array, target, comparator);
	
	if (successor > 0 
		&& comparator.compare(target, array[successor - 1]) == 0) {
		
		return successor - 1;
	}

	return successor;
}


export function binary_search_get_first_successor(
	array, 
	target, 
	comparator) {
	
	comparator = comparator || new comparators.UniversalComparator();


	let L = 0;
	let R = array.length;

	while (L < R) {
		let m = Math.floor((L + R) / 2);

		if (comparator.compare(target, array[m]) < 0) {
			R = m;
		} 
		else {
			L = m + 1;
		}
	}

	return L;
}


export function insert_sort(
	array, 
	comparator) {
	
	comparator = comparator || new comparators.UniversalComparator();

	for (let i = 1; 
		i < array.length; 
		++i) {
		let temp = array[i];
		let j = i;

		while (j > 0 
			&& comparator.compare(array[j - 1], temp) > 0) {
			
			array[j] = array[j - 1];
			j = j - 1;
		}

		array[j] = temp;
	}
}


export function quick_select(
	array, 
	k, 
	comparator) {
	
	comparator = comparator || new comparators.UniversalComparator();


	function helper(a, b, length, k) {
		let get_index = (i) => a * i + b;

		let partially_sort = (i, j) => { // a special implementation of insertion sort.
			for (let k = i + 1; 
				k < j; 
				++k) {
				let temp = array[get_index(k)];
				let l = k;

				while (l > i 
					&& comparator.compare(array[get_index(l - 1)], temp) > 0) {
					
					array[get_index(l)] = array[get_index(l - 1)];
					l = l - 1;
				}

				array[get_index(l)] = temp;
			}
		};

		let swap = (i, j) => {
			let temp = array[get_index(i)];

			array[get_index(i)] = array[get_index(j)];
			array[get_index(j)] = temp;
		};

		if (length <= 5) {
			partially_sort(0, length);
			return array[get_index(k)];
		}

		for (let i = 0; 
			i + 5 <= length; 
			i = i + 5) {
			
			partially_sort(i, i + 5);
		}


		let median = helper(5 * a, b + 2 * a, Math.floor(length / 5), Math.floor(length / 5 / 2));
		let center = 0;

		let is_left_heavy = false;

		for (let i = 0; 
			i < length; 
			++i) {
			if (comparator.compare(array[get_index(i)], median) == 0) {
				if (!is_left_heavy) {
					swap(i, center);
					center = center + 1;
				}

				is_left_heavy = !is_left_heavy;
			} 
			else if (comparator.compare(array[get_index(i)], median) < 0) {
				swap(i, center);
				center = center + 1;
			}
		}
	
		/*if (k == center) {
			return median; 
		} else */if (k < center) {
			return helper(a, b, center, k);
		} 
		else {
			return helper(a, b + center, length - center, k - center);
		}
	}

	if (k < 0 
		|| k > array.length) {
		
		throw new Error("the item does not exist.");
	}

	return helper(1, 0, array.length, k);
}

