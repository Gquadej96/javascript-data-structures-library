
# A Simple Collection of Javascript Data Structures.

## **List\<T\> Interface**
| Return Type | Method Signature                         | Description                                                                  |
| ----------- | ---------------------------------------- | ---------------------------------------------------------------------------- |
| void        | add(int index, T item)                   | Add the given **item** to the list at the given **index** location.          |
| void        | remove(int index)                        | Remove the item at the **index** location.                                   |
| T           | get(int index)                           | Retrieve the item at the given **index** location.                           |
| void        | set(int index, T item)                   | Set the item at the given **index** location to the given **item**.          |
| int         | getSize()                                | Returns the number of elements in the list.                                  |
| void        | rebalance()                              | Optimizes the data structure for get/set operations.                         |
| void        | doForEachItemInOrder(Func\<T\> consumer) | Calls the given **consumer** function for each element in the list in order. |
| T[]         | toArray()                                | Converts the list into a primitive array.                                    |
| List\<T\>   | clone()                                  | Makes a shallow copy of this list.                                           |

---

## **Map\<K, V\> Interface**
| Return Type     | Method Signature                                       | Description                                                                |
| --------------- | ------------------------------------------------------ | -------------------------------------------------------------------------  |
| void            | set(K key, V value)                                    | Associate the given **value** with the given **key**.                      |
| V               | get(K key)                                             | Retrieve the value associated with the given **key**.                      |
| boolean         | has(K key)                                             | Returns true if the given **key** is present in the map.                   |
| int             | getSize()                                              | Returns the number of keys in the map.                                     |
| int             | getRankOfKey(K key)                                    | Returns the sequence number of the given **key** in the map.               |
| K               | getKeyByRank(int rank)                                 | Returns the key with the given **rank** as its sequence number among keys. |
| void            | doForEachItemInOrder(Func\<K, V\> biconsumer)          | Calls the given **biconsumer** function for each (key, value) entry.       |
| void            | rebalance()                                            | Optimizes the data structure for get/set operations.                       |
| Entry\<K, V\>[] | toArray()                                              | Converts the map into an array of entries.                                 |
| Map\<K, V\>     | clone()                                                | Makes a shallow copy of this map.                                          |

---

## **Set\<T\> Interface**
| Return Type | Method Signature                         | Description                                                                    |
| ----------- | ---------------------------------------- | ------------------------------------------------------------------------------ |
| void        | add(T item)                              | Add the given **item** to the set.                                             |
| void        | remove(T item)                           | Remove the given **item** from the set.                                        |
| boolean     | has(T item)                              | Returns true if the given **item** is in the set.                              |
| int         | getSize()                                | Returns the number of elements in the set.                                     |
| int         | getRankOfItem(T item)                    | Returns the sequence number of the given **item** in the set.                  |
| T           | getItemByRank(int rank)                  | Returns the item with the given **rank** as its sequence number among items.   |
| T           | getLeastUpperBoundItem(T item)           | Returns the item which is immediately larger than the given **item**.          |
| T           | getGreatestLowerBoundItem(T item)        | Returns the item which is immediately smaller than the given **item**.         |
| void        | rebalance()                              | Optimizes the data structure for get/set operations.                           |
| void        | doForEachItemInOrder(Func\<T\> consumer) | Calls the given **consumer** function for each element in the set in order.    |
| T[]         | toArray()                                | Converts the set into a primitive array.                                       |
| Set\<T\>    | clone()                                  | Makes a shallow copy of this set.                                              |
