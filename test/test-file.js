// _.compact
_.compact([0, 1, false, 2, '', 3]);
[0, 1, false, 2, '', 3].Boolean(true);

// _.concat
_.concat(array, 2, [3], [[4]]);
array.concat(2, [3], [[4]]);

// _.difference
_.difference([2, 1], [2, 3]);
[[2, 1], [2, 3]].reduce((a, b) => a.filter(c => !b.includes(c)));

// _.drop
_.drop([1, 2, 3]);
[1, 2, 3].slice(1);
_.drop([1, 2, 3], 2);
[1, 2, 3].slice(2);

// _.dropRight
_.dropRight([1, 2, 3]);
[1, 2, 3].slice(0, -1);
_.dropRight([1, 2, 3], 2);
[1, 2, 3].slice(0, -1 * 2);

// _.fill
_.fill(array, 'a');
array.fill('a');
_.fill(Array(3), 2);
Array(3).fill(2);
_.fill([4, 6, 8, 10], '*', 1, 3);
[4, 6, 8, 10].fill('*', 1, 3);

// _.find
_.find(array, u => u.age < 40);
array.find(u => u.age < 40);

// _.findIndex
_.findIndex(array, u => u.age < 40);
array.findIndex(u => u.age < 40);

// _.findLastIndex
_.findLastIndex(array, u => u.age < 40);
array.lastIndexOf(u => u.age < 40);
_.findLastIndex(array, u => u.age < 40, 3);
array.lastIndexOf(u => u.age < 40, 3);

// _.first
_.first([1, 2, 3, 4, 5]);
[].concat([1, 2, 3, 4, 5]).shift();

// _.flatten
_.flatten([1, [2, [3, [4]], 5]]);
[1, [2, [3, [4]], 5]].flat();

// _.flattenDeep
_.flattenDeep([1, [2, [3, [4]], 5]]);
[1, [2, [3, [4]], 5]].flat(Infinity);

// _.flattenDepth
_.flattenDepth([1, [2, [3, [4]], 5]], 2);
[1, [2, [3, [4]], 5]].flat(2);

// _.fromPairs
_.fromPairs([['a', 1], ['b', 2]]);
Object.fromEntries([['a', 1], ['b', 2]]);

// _.head
_.head([1, 2, 3, 4, 5]);
[].concat([1, 2, 3, 4, 5]).shift();

// _.indexOf
_.indexOf(array, 2);
array.indexOf(2);

// _.initial
_.initial(array, 2);
array.slice(0, -1 * 2);

// _.intersection
_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
[[1, 2, 3], [101, 2, 1, 10], [2, 1]].reduce((a, b) => a.filter(c => b.includes(c)));

// _.isArray
_.isArray(array);
Array.isArray(array);

// _.join
_.join(['one', 'two', 'three'], '--');
['one', 'two', 'three'].join('--');

// _.last
_.last([1, 2, 3, 4, 5]);
[].concat([1, 2, 3, 4, 5]).pop();

// _.lastIndexOf
_.lastIndexOf(array, 9);
array.lastIndexOf(9);

// _.map
_.map(array, x => x + 1);
array.map(x => x + 1);

// _.nth
_.nth(array, -1);
array.at(-1);

// _.reverse
_.reverse(array);
array.reverse();

// _.slice
_.slice(array, 1, 3);
array.slice(1, 3);

// _.some
_.some(array, x => x + 1);
array.some(x => x + 1);

// _.tail
_.tail(array);
array.slice(1);

// _.without
_.without(array, 1, 2);
array.filter(v => ![1, 2].includes(v));
