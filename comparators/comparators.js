


export class BasicComparator {
	compare(a, b) {
		if (a == b) {
			return 0;
		} 
		else if (a < b) {
			return -1;
		} 
		else {
			return 1;
		}
	}
}


export class ObjectReferenceComparator {
	_refs = new Map();
	_next_ref = 0;

	
	_get_object_reference(object) {
		let ref = this.refs.get(object);

		if (ref == null) {
			ref = this._next_ref;

			this._next_ref = this._next_ref + 1;
			refs.set(object, ref);
		}

		return ref;
	}


	compare(a, b) {
		return get_object_ref(a) - get_object_ref(b);
	}
}


export class ArrayElementComparator {
	_element_comparator = new BasicComparator();


	constructor(element_comparator) {
		this._element_comparator = element_comparator || this._element_comparator;
	}


	compare(a, b) {
		let length = Math.min(a.length, b.length);

		for (let i = 0; 
			i < length; 
			++i) {
			let res = this._element_comparator.compare(a[i], b[i]);

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
		super(new class {
			compare(a, b) {
				return a.codePointAt(0) - b.codePointAt(0);
			}
		});
	}
}


export class ObjectFieldComparator {
	_string_comparator = new StringComparator();
	_value_comparator = new BasicComparator();
	_entry_array_comparator = null;


	constructor(value_comparator) {
		let self = this;

		this._value_comparator = value_comparator || this._value_comparator;
		this._entry_array_comparator = new ArrayElementComparator(new class {
			compare(a, b) {
				let res = self._string_comparator.compare(a.name, b.name);
	
				if (res != 0) {
					return res;
				}
	
				res = self._value_comparator.compare(a.value, b.value);
				return res;
			}
		});
	}


	compare(a, b) {
		let a_entry_array = Object.getOwnPropertyNames(a).map((name) => {return {name: name, value: a[name]};});
		let b_entry_array = Object.getOwnPropertyNames(b).map((name) => {return {name: name, value: b[name]};});

		a_entry_array.sort((a, b) => this._string_comparator.compare(a.name, b.name));
		b_entry_array.sort((a, b) => this._string_comparator.compare(a.name, b.name));

		return this._entry_array_comparator.compare(a_entry_array, b_entry_array);
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
	static _string_comparator = new StringComparator();
	static _comparators = {
		"string": new StringComparator(), 
		"number": new BasicComparator(), 
		"object": new ObjectReferenceComparator()
	};


	compare(a, b) {
		let res = UniversalComparator._string_comparator.compare(typeof(a), typeof(b));

		if (res != 0) {
			return res;
		}

		if (UniversalComparator._comparators[typeof(a)] == null) {
			return UniversalComparator._comparators["object"].compare(a, b);
		}

		return UniversalComparator._comparators[typeof(a)].compare(a, b);
	}
}

