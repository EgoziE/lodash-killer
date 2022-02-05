const simpleFunct = [
    'concat',
    'compact',
    'drop',
    'dropRight',
    'fill',
    'find', // from index not supported
    'findIndex', // from index not supported
    'first',
    'flatten',
    'flattenDeep',
    'flattenDepth',
    'fromPairs',
    'indexOf',
    'intersection',
    'isArray',
    'join',
    'last',
    'lastIndexOf',
    'reverse',
    'slice',
    'without',
    'initial',
    'map',
    'some',
];

const notSupported = [
    'takeRight',
    'isArrayBuffer',
    'pull',
    'unionBy'
];

const depth = p => p ? 1 + depth(p.parentPath) : 0;

// eslint-disable-next-line no-extend-native
Array.prototype.sortByDepth = function () {
    return this.map(p => ({ p, d: depth(p) }))
        .sort((p1, p2) => p1.d < p2.d ? 1 : -1)
        .map(({ p }) => p);
};

// eslint-disable-next-line no-extend-native
Array.prototype.filterWithRest = function (rest) {
    return this.filter(path => {
        if (simpleFunct.includes(path.value.callee.property.name)) {
            return true;
        }

        rest.push(path);
        return false;
    });
};

const rules = {};
rules.compact = {
    func: 'Boolean',
    args: (j, func, args) => [j.identifier('true')],
};
rules.drop = {
    func: 'slice',
    args: (j, func, args) => {
        if (args.length === 0) {
            return [j.identifier('1')];
        }
        return args;
    },
};
rules.dropRight = {
    func: 'slice',
    args: (j, func, args) => {
        if (args.length === 0) {
            return ['0', '-1'].map(j.identifier);
        }
        const _args = args.map(a => `-1 * ${a.value}`);
        return ['0', ..._args].map(j.identifier);
    },
};
rules.first = {
    func: 'shift',
    callee: (j, func, args) =>
        j.callExpression(j.memberExpression(j.identifier('[]'), j.identifier('concat')), [
            args.shift(),
        ]),
};
rules.flatten = {
    func: 'flat',
};
rules.flattenDeep = {
    ...rules.flatten,
    args: (j, func, args) => {
        if (args.length === 0) {
            return [j.identifier('Infinity')];
        }
        return args;
    },
};
rules.flattenDepth = rules.flattenDeep;
rules.fromPairs = {
    custom: (j, func, args) =>
        j.callExpression(
            j.memberExpression(j.identifier('Object'), j.identifier('fromEntries')),
            args,
        ),
};
rules.intersection = {
    callee: (j, func, args) => j.arrayExpression(args),
    func: 'reduce',
    args: (j, func, args) => [j.identifier('(a, b) => a.filter(c => b.includes(c))')],
};
rules.isArray = {
    custom: (j, func, args) =>
        j.callExpression(
            j.memberExpression(j.identifier('Array'), j.identifier('isArray')),
            args,
        ),
};
rules.last = {
    func: 'pop',
    callee: rules.first.callee,
};
rules.without = {
    func: 'filter',
    args: (j, func, args) => [
        j.arrowFunctionExpression(
            [j.identifier('v')],
            j.unaryExpression(
                '!',
                j.callExpression(
                    j.memberExpression(j.arrayExpression(args), j.identifier('includes')),
                    [j.identifier('v')],
                ),
            ),
        ),
    ],
};
rules.initial = rules.dropRight;

const transformSimpleFunctions = (j, lodashExpressions) => {
    const rest = [];
    const paths = lodashExpressions.filterWithRest(rest).sortByDepth();

    j(paths).replaceWith(path => {
        let func = path.value.callee.property;
        let args = path.value.arguments;
        const { name } = func;
        const rule = rules[name] || {};

        if (rule.custom) {
            return rule.custom(j, func, args);
        }

        const callee = rule.callee ? rule.callee(j, func, args) : args.shift();

        if (rule.func) {
            func = j.identifier(rule.func);
        }

        if (rule.args) {
            args = rule.args(j, func, args);
        }

        return j.callExpression(j.memberExpression(callee, func), args);
    });

    return rest;
};

const transform = (file, api) => {
    const j = api.jscodeshift;
    const root = j(file.source);

    let lodashExpressions = root
        .find(j.CallExpression, { callee: { object: { name: '_' } } })
        .paths();

    // Simple binary functions which are implemented in native JS
    lodashExpressions = transformSimpleFunctions(j, lodashExpressions);

    // console.log(lodashExpressions);

    return root.toSource({
        quote: 'single',
        reuseWhitespace: true,
    });
};

export default transform;
