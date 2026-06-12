(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check$1 = function (it) {
	  return it && it.Math === Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var globalThis_1 =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check$1(typeof globalThis == 'object' && globalThis) ||
	  check$1(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check$1(typeof self == 'object' && self) ||
	  check$1(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  check$1(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$p = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$o = fails$p;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$o(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
	});

	var fails$n = fails$p;

	var functionBindNative = !fails$n(function () {
	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
	  var test = function () { /* empty */ }.bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$3 = functionBindNative;

	var call$f = Function.prototype.call;
	// eslint-disable-next-line es/no-function-prototype-bind -- safe
	var functionCall = NATIVE_BIND$3 ? call$f.bind(call$f) : function () {
	  return call$f.apply(call$f, arguments);
	};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$3 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$3(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;

	var createPropertyDescriptor$4 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var NATIVE_BIND$2 = functionBindNative;

	var FunctionPrototype$2 = Function.prototype;
	var call$e = FunctionPrototype$2.call;
	// eslint-disable-next-line es/no-function-prototype-bind -- safe
	var uncurryThisWithBind = NATIVE_BIND$2 && FunctionPrototype$2.bind.bind(call$e, call$e);

	var functionUncurryThis = NATIVE_BIND$2 ? uncurryThisWithBind : function (fn) {
	  return function () {
	    return call$e.apply(fn, arguments);
	  };
	};

	var uncurryThis$p = functionUncurryThis;

	var toString$a = uncurryThis$p({}.toString);
	var stringSlice$6 = uncurryThis$p(''.slice);

	var classofRaw$2 = function (it) {
	  return stringSlice$6(toString$a(it), 8, -1);
	};

	var uncurryThis$o = functionUncurryThis;
	var fails$m = fails$p;
	var classof$7 = classofRaw$2;

	var $Object$4 = Object;
	var split = uncurryThis$o(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$m(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object$4('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$7(it) === 'String' ? split(it, '') : $Object$4(it);
	} : $Object$4;

	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	var isNullOrUndefined$3 = function (it) {
	  return it === null || it === undefined;
	};

	var isNullOrUndefined$2 = isNullOrUndefined$3;

	var $TypeError$b = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$6 = function (it) {
	  if (isNullOrUndefined$2(it)) throw new $TypeError$b("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$3 = indexedObject;
	var requireObjectCoercible$5 = requireObjectCoercible$6;

	var toIndexedObject$6 = function (it) {
	  return IndexedObject$3(requireObjectCoercible$5(it));
	};

	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
	var documentAll = typeof document == 'object' && document.all;

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
	var isCallable$i = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
	  return typeof argument == 'function' || argument === documentAll;
	} : function (argument) {
	  return typeof argument == 'function';
	};

	var isCallable$h = isCallable$i;

	var isObject$d = function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$h(it);
	};

	var globalThis$j = globalThis_1;
	var isCallable$g = isCallable$i;

	var aFunction = function (argument) {
	  return isCallable$g(argument) ? argument : undefined;
	};

	var getBuiltIn$4 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(globalThis$j[namespace]) : globalThis$j[namespace] && globalThis$j[namespace][method];
	};

	var uncurryThis$n = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$n({}.isPrototypeOf);

	var globalThis$i = globalThis_1;

	var navigator = globalThis$i.navigator;
	var userAgent$3 = navigator && navigator.userAgent;

	var environmentUserAgent = userAgent$3 ? String(userAgent$3) : '';

	var globalThis$h = globalThis_1;
	var userAgent$2 = environmentUserAgent;

	var process = globalThis$h.process;
	var Deno = globalThis$h.Deno;
	var versions = process && process.versions || Deno && Deno.version;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version && userAgent$2) {
	  match = userAgent$2.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent$2.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var environmentV8Version = version;

	/* eslint-disable es/no-symbol -- required for testing */
	var V8_VERSION$2 = environmentV8Version;
	var fails$l = fails$p;
	var globalThis$g = globalThis_1;

	var $String$5 = globalThis$g.String;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$l(function () {
	  var symbol = Symbol('symbol detection');
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
	  // of course, fail.
	  return !$String$5(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */
	var NATIVE_SYMBOL$1 = symbolConstructorDetection;

	var useSymbolAsUid = NATIVE_SYMBOL$1 &&
	  !Symbol.sham &&
	  typeof Symbol.iterator == 'symbol';

	var getBuiltIn$3 = getBuiltIn$4;
	var isCallable$f = isCallable$i;
	var isPrototypeOf$2 = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var $Object$3 = Object;

	var isSymbol$3 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$3('Symbol');
	  return isCallable$f($Symbol) && isPrototypeOf$2($Symbol.prototype, $Object$3(it));
	};

	var $String$4 = String;

	var tryToString$3 = function (argument) {
	  try {
	    return $String$4(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var isCallable$e = isCallable$i;
	var tryToString$2 = tryToString$3;

	var $TypeError$a = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$5 = function (argument) {
	  if (isCallable$e(argument)) return argument;
	  throw new $TypeError$a(tryToString$2(argument) + ' is not a function');
	};

	var aCallable$4 = aCallable$5;
	var isNullOrUndefined$1 = isNullOrUndefined$3;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$4 = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined$1(func) ? undefined : aCallable$4(func);
	};

	var call$d = functionCall;
	var isCallable$d = isCallable$i;
	var isObject$c = isObject$d;

	var $TypeError$9 = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$d(fn = input.toString) && !isObject$c(val = call$d(fn, input))) return val;
	  if (isCallable$d(fn = input.valueOf) && !isObject$c(val = call$d(fn, input))) return val;
	  if (pref !== 'string' && isCallable$d(fn = input.toString) && !isObject$c(val = call$d(fn, input))) return val;
	  throw new $TypeError$9("Can't convert object to primitive value");
	};

	var sharedStore = {exports: {}};

	var isPure = false;

	var globalThis$f = globalThis_1;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$5 = Object.defineProperty;

	var defineGlobalProperty$3 = function (key, value) {
	  try {
	    defineProperty$5(globalThis$f, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    globalThis$f[key] = value;
	  } return value;
	};

	var globalThis$e = globalThis_1;
	var defineGlobalProperty$2 = defineGlobalProperty$3;

	var SHARED = '__core-js_shared__';
	var store$3 = sharedStore.exports = globalThis$e[SHARED] || defineGlobalProperty$2(SHARED, {});

	(store$3.versions || (store$3.versions = [])).push({
	  version: '3.49.0',
	  mode: 'global',
	  copyright: '© 2013–2025 Denis Pushkarev (zloirock.ru), 2025–2026 CoreJS Company (core-js.io). All rights reserved.',
	  license: 'https://github.com/zloirock/core-js/blob/v3.49.0/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var store$2 = sharedStore.exports;

	var shared$4 = function (key, value) {
	  return store$2[key] || (store$2[key] = value || {});
	};

	var requireObjectCoercible$4 = requireObjectCoercible$6;

	var $Object$2 = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$8 = function (argument) {
	  return $Object$2(requireObjectCoercible$4(argument));
	};

	var uncurryThis$m = functionUncurryThis;
	var toObject$7 = toObject$8;

	var hasOwnProperty = uncurryThis$m({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$7(it), key);
	};

	var uncurryThis$l = functionUncurryThis;

	var id = 0;
	var postfix = Math.random();
	var toString$9 = uncurryThis$l(1.1.toString);

	var uid$2 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$9(++id + postfix, 36);
	};

	var globalThis$d = globalThis_1;
	var shared$3 = shared$4;
	var hasOwn$a = hasOwnProperty_1;
	var uid$1 = uid$2;
	var NATIVE_SYMBOL = symbolConstructorDetection;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var Symbol$2 = globalThis$d.Symbol;
	var WellKnownSymbolsStore = shared$3('wks');
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$2['for'] || Symbol$2 : Symbol$2 && Symbol$2.withoutSetter || uid$1;

	var wellKnownSymbol$g = function (name) {
	  if (!hasOwn$a(WellKnownSymbolsStore, name)) {
	    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$a(Symbol$2, name)
	      ? Symbol$2[name]
	      : createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var call$c = functionCall;
	var isObject$b = isObject$d;
	var isSymbol$2 = isSymbol$3;
	var getMethod$3 = getMethod$4;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$f = wellKnownSymbol$g;

	var $TypeError$8 = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol$f('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$2 = function (input, pref) {
	  if (!isObject$b(input) || isSymbol$2(input)) return input;
	  var exoticToPrim = getMethod$3(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$c(exoticToPrim, input, pref);
	    if (!isObject$b(result) || isSymbol$2(result)) return result;
	    throw new $TypeError$8("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive$1 = toPrimitive$2;
	var isSymbol$1 = isSymbol$3;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$2 = function (argument) {
	  var key = toPrimitive$1(argument, 'string');
	  return isSymbol$1(key) ? key : key + '';
	};

	var globalThis$c = globalThis_1;
	var isObject$a = isObject$d;

	var document$1 = globalThis$c.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$a(document$1) && isObject$a(document$1.createElement);

	var documentCreateElement$2 = function (it) {
	  return EXISTS$1 ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$b = descriptors;
	var fails$k = fails$p;
	var createElement = documentCreateElement$2;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$b && !fails$k(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a !== 7;
	});

	var DESCRIPTORS$a = descriptors;
	var call$b = functionCall;
	var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
	var createPropertyDescriptor$3 = createPropertyDescriptor$4;
	var toIndexedObject$5 = toIndexedObject$6;
	var toPropertyKey$1 = toPropertyKey$2;
	var hasOwn$9 = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$a ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$5(O);
	  P = toPropertyKey$1(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$9(O, P)) return createPropertyDescriptor$3(!call$b(propertyIsEnumerableModule$1.f, O, P), O[P]);
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$9 = descriptors;
	var fails$j = fails$p;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$9 && fails$j(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype !== 42;
	});

	var isObject$9 = isObject$d;

	var $String$3 = String;
	var $TypeError$7 = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$a = function (argument) {
	  if (isObject$9(argument)) return argument;
	  throw new $TypeError$7($String$3(argument) + ' is not an object');
	};

	var DESCRIPTORS$8 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$9 = anObject$a;
	var toPropertyKey = toPropertyKey$2;

	var $TypeError$6 = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$8 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
	  anObject$9(O);
	  P = toPropertyKey(P);
	  anObject$9(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty(O, P, Attributes);
	} : $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject$9(O);
	  P = toPropertyKey(P);
	  anObject$9(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError$6('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$7 = descriptors;
	var definePropertyModule$4 = objectDefineProperty;
	var createPropertyDescriptor$2 = createPropertyDescriptor$4;

	var createNonEnumerableProperty$5 = DESCRIPTORS$7 ? function (object, key, value) {
	  return definePropertyModule$4.f(object, key, createPropertyDescriptor$2(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var makeBuiltIn$2 = {exports: {}};

	var DESCRIPTORS$6 = descriptors;
	var hasOwn$8 = hasOwnProperty_1;

	var FunctionPrototype$1 = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$6 && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$8(FunctionPrototype$1, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && function something() { /* empty */ }.name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$6 || (DESCRIPTORS$6 && getDescriptor(FunctionPrototype$1, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var uncurryThis$k = functionUncurryThis;
	var isCallable$c = isCallable$i;
	var store$1 = sharedStore.exports;

	var functionToString = uncurryThis$k(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$c(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	var inspectSource$2 = store$1.inspectSource;

	var globalThis$b = globalThis_1;
	var isCallable$b = isCallable$i;

	var WeakMap$1 = globalThis$b.WeakMap;

	var weakMapBasicDetection = isCallable$b(WeakMap$1) && /native code/.test(String(WeakMap$1));

	var shared$2 = shared$4;
	var uid = uid$2;

	var keys = shared$2('keys');

	var sharedKey$3 = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys$4 = {};

	var NATIVE_WEAK_MAP = weakMapBasicDetection;
	var globalThis$a = globalThis_1;
	var isObject$8 = isObject$d;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
	var hasOwn$7 = hasOwnProperty_1;
	var shared$1 = sharedStore.exports;
	var sharedKey$2 = sharedKey$3;
	var hiddenKeys$3 = hiddenKeys$4;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$2 = globalThis$a.TypeError;
	var WeakMap = globalThis$a.WeakMap;
	var set, get$3, has;

	var enforce = function (it) {
	  return has(it) ? get$3(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$8(it) || (state = get$3(it)).type !== TYPE) {
	      throw new TypeError$2('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared$1.state) {
	  var store = shared$1.state || (shared$1.state = new WeakMap());
	  /* eslint-disable no-self-assign -- prototype methods protection */
	  store.get = store.get;
	  store.has = store.has;
	  store.set = store.set;
	  /* eslint-enable no-self-assign -- prototype methods protection */
	  set = function (it, metadata) {
	    if (store.has(it)) throw new TypeError$2(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    store.set(it, metadata);
	    return metadata;
	  };
	  get$3 = function (it) {
	    return store.get(it) || {};
	  };
	  has = function (it) {
	    return store.has(it);
	  };
	} else {
	  var STATE = sharedKey$2('state');
	  hiddenKeys$3[STATE] = true;
	  set = function (it, metadata) {
	    if (hasOwn$7(it, STATE)) throw new TypeError$2(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$4(it, STATE, metadata);
	    return metadata;
	  };
	  get$3 = function (it) {
	    return hasOwn$7(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$7(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get$3,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var uncurryThis$j = functionUncurryThis;
	var fails$i = fails$p;
	var isCallable$a = isCallable$i;
	var hasOwn$6 = hasOwnProperty_1;
	var DESCRIPTORS$5 = descriptors;
	var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
	var inspectSource$1 = inspectSource$2;
	var InternalStateModule$1 = internalState;

	var enforceInternalState = InternalStateModule$1.enforce;
	var getInternalState$2 = InternalStateModule$1.get;
	var $String$2 = String;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$4 = Object.defineProperty;
	var stringSlice$5 = uncurryThis$j(''.slice);
	var replace$3 = uncurryThis$j(''.replace);
	var join = uncurryThis$j([].join);

	var CONFIGURABLE_LENGTH = DESCRIPTORS$5 && !fails$i(function () {
	  return defineProperty$4(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
	});

	var TEMPLATE = String(String).split('String');

	var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
	  if (stringSlice$5($String$2(name), 0, 7) === 'Symbol(') {
	    name = '[' + replace$3($String$2(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
	  }
	  if (options && options.getter) name = 'get ' + name;
	  if (options && options.setter) name = 'set ' + name;
	  if (!hasOwn$6(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
	    if (DESCRIPTORS$5) defineProperty$4(value, 'name', { value: name, configurable: true });
	    else value.name = name;
	  }
	  if (CONFIGURABLE_LENGTH && options && hasOwn$6(options, 'arity') && value.length !== options.arity) {
	    defineProperty$4(value, 'length', { value: options.arity });
	  }
	  try {
	    if (options && hasOwn$6(options, 'constructor') && options.constructor) {
	      if (DESCRIPTORS$5) defineProperty$4(value, 'prototype', { writable: false });
	    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
	    } else if (value.prototype) value.prototype = undefined;
	  } catch (error) { /* empty */ }
	  var state = enforceInternalState(value);
	  if (!hasOwn$6(state, 'source')) {
	    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
	  } return value;
	};

	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	// eslint-disable-next-line no-extend-native -- required
	Function.prototype.toString = makeBuiltIn$1(function toString() {
	  return isCallable$a(this) && getInternalState$2(this).source || inspectSource$1(this);
	}, 'toString');

	var isCallable$9 = isCallable$i;
	var definePropertyModule$3 = objectDefineProperty;
	var makeBuiltIn = makeBuiltIn$2.exports;
	var defineGlobalProperty$1 = defineGlobalProperty$3;

	var defineBuiltIn$5 = function (O, key, value, options) {
	  if (!options) options = {};
	  var simple = options.enumerable;
	  var name = options.name !== undefined ? options.name : key;
	  if (isCallable$9(value)) makeBuiltIn(value, name, options);
	  if (options.global) {
	    if (simple) O[key] = value;
	    else defineGlobalProperty$1(key, value);
	  } else {
	    try {
	      if (!options.unsafe) delete O[key];
	      else if (O[key]) simple = true;
	    } catch (error) { /* empty */ }
	    if (simple) O[key] = value;
	    else definePropertyModule$3.f(O, key, {
	      value: value,
	      enumerable: false,
	      configurable: !options.nonConfigurable,
	      writable: !options.nonWritable
	    });
	  } return O;
	};

	var objectGetOwnPropertyNames = {};

	var ceil = Math.ceil;
	var floor$2 = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor$2 : ceil)(n);
	};

	var trunc = mathTrunc;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$4 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};

	var toIntegerOrInfinity$3 = toIntegerOrInfinity$4;

	var max$2 = Math.max;
	var min$2 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$2 = function (index, length) {
	  var integer = toIntegerOrInfinity$3(index);
	  return integer < 0 ? max$2(integer + length, 0) : min$2(integer, length);
	};

	var toIntegerOrInfinity$2 = toIntegerOrInfinity$4;

	var min$1 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$2 = function (argument) {
	  var len = toIntegerOrInfinity$2(argument);
	  return len > 0 ? min$1(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength$1 = toLength$2;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$6 = function (obj) {
	  return toLength$1(obj.length);
	};

	var toIndexedObject$4 = toIndexedObject$6;
	var toAbsoluteIndex$1 = toAbsoluteIndex$2;
	var lengthOfArrayLike$5 = lengthOfArrayLike$6;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$3 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$4($this);
	    var length = lengthOfArrayLike$5(O);
	    if (length === 0) return !IS_INCLUDES && -1;
	    var index = toAbsoluteIndex$1(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el !== el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value !== value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod$3(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$3(false)
	};

	var uncurryThis$i = functionUncurryThis;
	var hasOwn$5 = hasOwnProperty_1;
	var toIndexedObject$3 = toIndexedObject$6;
	var indexOf$1 = arrayIncludes.indexOf;
	var hiddenKeys$2 = hiddenKeys$4;

	var push$2 = uncurryThis$i([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$3(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$5(hiddenKeys$2, key) && hasOwn$5(O, key) && push$2(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$5(O, key = names[i++])) {
	    ~indexOf$1(result, key) || push$2(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$3 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$2 = enumBugKeys$3;

	var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys$1(O, hiddenKeys$1);
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn$2 = getBuiltIn$4;
	var uncurryThis$h = functionUncurryThis;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
	var anObject$8 = anObject$a;

	var concat$2 = uncurryThis$h([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$2 = getBuiltIn$2('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject$8(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
	  return getOwnPropertySymbols ? concat$2(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn$4 = hasOwnProperty_1;
	var ownKeys$1 = ownKeys$2;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule$2 = objectDefineProperty;

	var copyConstructorProperties$2 = function (target, source, exceptions) {
	  var keys = ownKeys$1(source);
	  var defineProperty = definePropertyModule$2.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn$4(target, key) && !(exceptions && hasOwn$4(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var fails$h = fails$p;
	var isCallable$8 = isCallable$i;

	var replacement = /#|\.prototype\./;

	var isForced$2 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value === POLYFILL ? true
	    : value === NATIVE ? false
	    : isCallable$8(detection) ? fails$h(detection)
	    : !!detection;
	};

	var normalize = isForced$2.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$2.data = {};
	var NATIVE = isForced$2.NATIVE = 'N';
	var POLYFILL = isForced$2.POLYFILL = 'P';

	var isForced_1 = isForced$2;

	var globalThis$9 = globalThis_1;
	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
	var defineBuiltIn$4 = defineBuiltIn$5;
	var defineGlobalProperty = defineGlobalProperty$3;
	var copyConstructorProperties$1 = copyConstructorProperties$2;
	var isForced$1 = isForced_1;

	/*
	  options.target         - name of the target object
	  options.global         - target is the global object
	  options.stat           - export as static methods of target
	  options.proto          - export as prototype methods of target
	  options.real           - real prototype method for the `pure` version
	  options.forced         - export even if the native feature is available
	  options.bind           - bind methods to the target, required for the `pure` version
	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
	  options.sham           - add a flag to not completely full polyfills
	  options.enumerable     - export as enumerable property
	  options.dontCallGetSet - prevent calling a getter on target
	  options.name           - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = globalThis$9;
	  } else if (STATIC) {
	    target = globalThis$9[TARGET] || defineGlobalProperty(TARGET, {});
	  } else {
	    target = globalThis$9[TARGET] && globalThis$9[TARGET].prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor$2(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties$1(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$3(sourceProperty, 'sham', true);
	    }
	    defineBuiltIn$4(target, key, sourceProperty, options);
	  }
	};

	var classofRaw$1 = classofRaw$2;
	var uncurryThis$g = functionUncurryThis;

	var functionUncurryThisClause = function (fn) {
	  // Nashorn bug:
	  //   https://github.com/zloirock/core-js/issues/1128
	  //   https://github.com/zloirock/core-js/issues/1130
	  if (classofRaw$1(fn) === 'Function') return uncurryThis$g(fn);
	};

	var uncurryThis$f = functionUncurryThisClause;
	var aCallable$3 = aCallable$5;
	var NATIVE_BIND$1 = functionBindNative;

	var bind$2 = uncurryThis$f(uncurryThis$f.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable$3(fn);
	  return that === undefined ? fn : NATIVE_BIND$1 ? bind$2(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var classof$6 = classofRaw$2;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$4 = Array.isArray || function isArray(argument) {
	  return classof$6(argument) === 'Array';
	};

	var wellKnownSymbol$e = wellKnownSymbol$g;

	var TO_STRING_TAG$2 = wellKnownSymbol$e('toStringTag');
	var test$1 = {};
	// eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
	test$1[TO_STRING_TAG$2] = 'z';

	var toStringTagSupport = String(test$1) === '[object z]';

	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var isCallable$7 = isCallable$i;
	var classofRaw = classofRaw$2;
	var wellKnownSymbol$d = wellKnownSymbol$g;

	var TO_STRING_TAG$1 = wellKnownSymbol$d('toStringTag');
	var $Object$1 = Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$5 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = $Object$1(it), TO_STRING_TAG$1)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) === 'Object' && isCallable$7(O.callee) ? 'Arguments' : result;
	};

	var uncurryThis$e = functionUncurryThis;
	var fails$g = fails$p;
	var isCallable$6 = isCallable$i;
	var classof$4 = classof$5;
	var getBuiltIn$1 = getBuiltIn$4;
	var inspectSource = inspectSource$2;

	var noop = function () { /* empty */ };
	var construct = getBuiltIn$1('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec$2 = uncurryThis$e(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable$6(argument)) return false;
	  try {
	    construct(noop, [], argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable$6(argument)) return false;
	  switch (classof$4(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec$2(constructorRegExp, inspectSource(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$3 = !construct || fails$g(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var isArray$3 = isArray$4;
	var isConstructor$2 = isConstructor$3;
	var isObject$7 = isObject$d;
	var wellKnownSymbol$c = wellKnownSymbol$g;

	var SPECIES$3 = wellKnownSymbol$c('species');
	var $Array$2 = Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$1 = function (originalArray) {
	  var C;
	  if (isArray$3(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor$2(C) && (C === $Array$2 || isArray$3(C.prototype))) C = undefined;
	    else if (isObject$7(C)) {
	      C = C[SPECIES$3];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? $Array$2 : C;
	};

	var arraySpeciesConstructor = arraySpeciesConstructor$1;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$2 = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var DESCRIPTORS$4 = descriptors;
	var definePropertyModule$1 = objectDefineProperty;
	var createPropertyDescriptor$1 = createPropertyDescriptor$4;

	var createProperty$4 = function (object, key, value) {
	  if (DESCRIPTORS$4) definePropertyModule$1.f(object, key, createPropertyDescriptor$1(0, value));
	  else object[key] = value;
	};

	var bind$1 = functionBindContext;
	var IndexedObject$2 = indexedObject;
	var toObject$6 = toObject$8;
	var lengthOfArrayLike$4 = lengthOfArrayLike$6;
	var arraySpeciesCreate$1 = arraySpeciesCreate$2;
	var createProperty$3 = createProperty$4;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod$2 = function (TYPE) {
	  var IS_MAP = TYPE === 1;
	  var IS_FILTER = TYPE === 2;
	  var IS_SOME = TYPE === 3;
	  var IS_EVERY = TYPE === 4;
	  var IS_FIND_INDEX = TYPE === 6;
	  var IS_FILTER_REJECT = TYPE === 7;
	  var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that) {
	    var O = toObject$6($this);
	    var self = IndexedObject$2(O);
	    var length = lengthOfArrayLike$4(self);
	    var boundFunction = bind$1(callbackfn, that);
	    var index = 0;
	    var resIndex = 0;
	    var target = IS_MAP ? arraySpeciesCreate$1($this, length) : IS_FILTER || IS_FILTER_REJECT ? arraySpeciesCreate$1($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) createProperty$3(target, index, result);    // map
	        else if (result) switch (TYPE) {
	          case 3: return true;                                // some
	          case 5: return value;                               // find
	          case 6: return index;                               // findIndex
	          case 2: createProperty$3(target, resIndex++, value);  // filter
	        } else switch (TYPE) {
	          case 4: return false;                               // every
	          case 7: createProperty$3(target, resIndex++, value);  // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$2(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$2(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$2(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$2(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$2(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$2(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$2(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod$2(7)
	};

	var fails$f = fails$p;
	var wellKnownSymbol$b = wellKnownSymbol$g;
	var V8_VERSION$1 = environmentV8Version;

	var SPECIES$2 = wellKnownSymbol$b('species');

	var arrayMethodHasSpeciesSupport$4 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$1 >= 51 || !fails$f(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$2] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $$g = _export;
	var $filter = arrayIteration.filter;
	var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$4;

	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$3('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	$$g({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var fails$e = fails$p;

	var arrayMethodIsStrict$4 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$e(function () {
	    // eslint-disable-next-line no-useless-call -- required for testing
	    method.call(null, argument || function () { return 1; }, 1);
	  });
	};

	var $forEach = arrayIteration.forEach;
	var arrayMethodIsStrict$3 = arrayMethodIsStrict$4;

	var STRICT_METHOD$1 = arrayMethodIsStrict$3('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD$1 ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	} : [].forEach;

	var $$f = _export;
	var forEach$1 = arrayForEach;

	// `Array.prototype.forEach` method
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	$$f({ target: 'Array', proto: true, forced: [].forEach !== forEach$1 }, {
	  forEach: forEach$1
	});

	var $$e = _export;
	var uncurryThis$d = functionUncurryThis;
	var IndexedObject$1 = indexedObject;
	var toIndexedObject$2 = toIndexedObject$6;
	var arrayMethodIsStrict$2 = arrayMethodIsStrict$4;

	var nativeJoin = uncurryThis$d([].join);

	var ES3_STRINGS = IndexedObject$1 !== Object;
	var FORCED$5 = ES3_STRINGS || !arrayMethodIsStrict$2('join', ',');

	// `Array.prototype.join` method
	// https://tc39.es/ecma262/#sec-array.prototype.join
	$$e({ target: 'Array', proto: true, forced: FORCED$5 }, {
	  join: function join(separator) {
	    return nativeJoin(toIndexedObject$2(this), separator === undefined ? ',' : separator);
	  }
	});

	var $$d = _export;
	var $map = arrayIteration.map;
	var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$4;

	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$2('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	$$d({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof$3 = classof$5;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof$3(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var defineBuiltIn$3 = defineBuiltIn$5;
	var toString$8 = objectToString;

	// `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	if (!TO_STRING_TAG_SUPPORT) {
	  defineBuiltIn$3(Object.prototype, 'toString', toString$8, { unsafe: true });
	}

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
	var documentCreateElement$1 = documentCreateElement$2;

	var classList = documentCreateElement$1('span').classList;
	var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

	var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

	var globalThis$8 = globalThis_1;
	var DOMIterables = domIterables;
	var DOMTokenListPrototype = domTokenListPrototype;
	var forEach = arrayForEach;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;

	var handlePrototype = function (CollectionPrototype) {
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
	    createNonEnumerableProperty$2(CollectionPrototype, 'forEach', forEach);
	  } catch (error) {
	    CollectionPrototype.forEach = forEach;
	  }
	};

	for (var COLLECTION_NAME in DOMIterables) {
	  if (DOMIterables[COLLECTION_NAME]) {
	    handlePrototype(globalThis$8[COLLECTION_NAME] && globalThis$8[COLLECTION_NAME].prototype);
	  }
	}

	handlePrototype(DOMTokenListPrototype);

	function init$7() {
	  Lampa.Lang.add({
	    empty: {
	      ru: '',
	      en: '',
	      uk: '',
	      be: '',
	      zh: '',
	      pt: '',
	      bg: '',
	      ro: ''
	    }
	  });
	  Lampa.Lang.add({
	    shots_modal_before_recording_txt_1: {
	      ru: 'Сохраняйте свои любимые моменты и делитесь ими с другими!',
	      en: 'Save your favorite moments and share them with others!',
	      uk: 'Зберігайте свої улюблені моменти та діліться ними з іншими!',
	      be: 'Захоўвайце свае любімыя моманты і дзяліцеся імі з іншымі!',
	      zh: '保存您喜爱的时刻并与他人分享！',
	      pt: 'Salve seus momentos favoritos e compartilhe-os com outras pessoas!',
	      bg: 'Запазвайте любимите си моменти и ги споделяйте с други!',
	      ro: 'Salvează-ți momentele preferate și împărtășește-le cu ceilalți!'
	    },
	    shots_modal_before_recording_txt_2: {
	      ru: 'Выберите интересующий момент в видео и нажмите кнопку "Начать запись".',
	      en: 'Choose the moment of interest in the video and press the "Start Recording" button.',
	      uk: 'Виберіть цікавий момент у відео та натисніть кнопку "Почати запис".',
	      be: 'Выберыце цікавы момант у відэа і націсніце кнопку "Пачаць запіс".',
	      zh: '选择视频中的感兴趣时刻，然后按“开始录制”按钮。',
	      pt: 'Escolha o momento de interesse no vídeo e pressione o botão "Iniciar Gravação".',
	      bg: 'Изберете интересния момент във видеото и натиснете бутона "Започни запис".',
	      ro: 'Alegeți momentul de interes din videoclip și apăsați butonul "Începeți înregistrarea".'
	    },
	    shots_step: {
	      ru: 'Шаг',
	      en: 'Step',
	      uk: 'Крок',
	      be: 'Крок',
	      zh: '步骤',
	      pt: 'Passo',
	      bg: 'Стъпка',
	      ro: 'Pas'
	    },
	    shots_start_recording: {
	      ru: 'Начать запись',
	      en: 'Start recording',
	      uk: 'Почати запис',
	      be: 'Пачаць запіс',
	      zh: '开始录制',
	      pt: 'Iniciar gravação',
	      bg: 'Започни запис',
	      ro: 'Începe înregistrarea'
	    },
	    shots_choice_start_point: {
	      ru: 'Выбрать позицию',
	      en: 'Choose position',
	      uk: 'Вибрати позицію',
	      be: 'Выбраць пазіцыю',
	      zh: '选择位置',
	      pt: 'Escolher posição',
	      bg: 'Изберете позиция',
	      ro: 'Alegeți poziția'
	    },
	    shots_modal_button_upload_start: {
	      ru: 'Загрузить и сохранить запись',
	      en: 'Upload and save recording',
	      uk: 'Завантажити та зберегти запис',
	      be: 'Загрузіць і захаваць запіс',
	      zh: '上传并保存录音',
	      pt: 'Carregar e salvar gravação',
	      bg: 'Качи и запази записа',
	      ro: 'Încărcați și salvați înregistrarea'
	    },
	    shots_modal_button_upload_cancel: {
	      ru: 'Отменить и удалить запись',
	      en: 'Cancel and delete recording',
	      uk: 'Скасувати та видалити запис',
	      be: 'Адмяніць і видаліць запіс',
	      zh: '取消并删除录音',
	      pt: 'Cancelar e excluir gravação',
	      bg: 'Отмени и изтрий записа',
	      ro: 'Anulează și șterge înregistrarea'
	    },
	    shots_modal_button_upload_again: {
	      ru: 'Не удалось загрузить. Попробовать снова',
	      en: 'Failed to upload. Try again',
	      uk: 'Не вдалося завантажити. Спробуйте ще раз',
	      be: 'Не ўдалося загрузіць. Паспрабуйце яшчэ раз',
	      zh: '上传失败。 再试一次',
	      pt: 'Falha ao carregar. Tente novamente',
	      bg: 'Неуспешен ъплоуд. Опитай отново',
	      ro: 'Încărcarea a eșuat. Încearcă din nou'
	    },
	    shots_modal_button_upload_complete: {
	      ru: 'Хорошо',
	      en: 'Done',
	      uk: 'Готово',
	      be: 'Гатова',
	      zh: '完成',
	      pt: 'Concluído',
	      bg: 'Готово',
	      ro: 'Finalizat'
	    },
	    shots_modal_short_recording_txt: {
	      ru: 'Запись слишком короткая. Минимальная длина записи должна быть не менее 10 секунд.',
	      en: 'The recording is too short. The minimum recording length must be at least 10 seconds.',
	      uk: 'Запис занадто короткий. Мінімальна довжина запису повинна бути не менше 10 секунд.',
	      be: 'Запіс занадта кароткі. Мінімальная даўжыня запісу павінна быць не менш за 10 секунд.',
	      zh: '录音时间太短。 最短录音长度必须至少为10秒。',
	      pt: 'A gravação é muito curta. O comprimento mínimo da gravação deve ser de pelo menos 10 segundos.',
	      bg: 'Записът е твърде кратък. Минималната дължина на записа трябва да бъде поне 10 секунди.',
	      ro: 'Înregistrarea este prea scurtă. Lungimea minimă a înregistrării trebuie să fie de cel puțin 10 secunde.'
	    },
	    shots_upload_progress_start: {
	      ru: 'Получение ссылки для загрузки...',
	      en: 'Getting upload link...',
	      uk: 'Отримання посилання для завантаження...',
	      be: 'Атрыманне спасылкі для загрузкі...',
	      zh: '获取上传链接...',
	      pt: 'Obtendo link de upload...',
	      bg: 'Получаване на връзка за качване...',
	      ro: 'Se obține link-ul de upload...'
	    },
	    shots_upload_progress_uploading: {
	      ru: 'Загрузка записи...',
	      en: 'Uploading recording...',
	      uk: 'Завантаження запису...',
	      be: 'Загрузка запісу...',
	      zh: '正在上传录音...',
	      pt: 'Carregando gravação...',
	      bg: 'Качване на записа...',
	      ro: 'Se încarcă înregistrarea...'
	    },
	    shots_upload_progress_notify: {
	      ru: 'Оповещение сервиса...',
	      en: 'Notifying service...',
	      uk: 'Повідомлення сервісу...',
	      be: 'Апавяшчэнне сэрвісу...',
	      zh: '通知服务...',
	      pt: 'Notificando serviço...',
	      bg: 'Уведомяване на услугата...',
	      ro: 'Se notifică serviciul...'
	    },
	    shots_upload_complete_text: {
	      ru: 'Запись успешно загружена и отправлена на обработку. Вы получите уведомление, когда она будет готова.',
	      en: 'The recording has been successfully uploaded and sent for processing. You will receive a notification when it is ready.',
	      uk: 'Запис успішно завантажено та надіслано на обробку. Ви отримаєте повідомлення, коли він буде готовий.',
	      be: 'Запіс паспяхова загружаны і адпраўлены на апрацоўку. Вы атрымаеце апавяшчэнне, калі ён будзе гатовы.',
	      zh: '录音已成功上传并发送以进行处理。 准备好后，您将收到通知。',
	      pt: 'A gravação foi carregada com sucesso e enviada para processamento. Você receberá uma notificação quando estiver pronta.',
	      bg: 'Записът е успешно качен и изпратен за обработка. Ще получите известие, когато е готов.',
	      ro: 'Înregistrarea a fost încărcată cu succes și trimisă spre procesare. Veți primi o notificare când este gata.'
	    },
	    shots_upload_complete_notify: {
	      ru: 'Запись успешно обработана и готова к просмотру!',
	      en: 'The recording has been successfully processed and is ready for viewing!',
	      uk: 'Запис успішно оброблено і готовий до перегляду!',
	      be: 'Запіс паспяхова апрацаваны і гатовы да прагляду!',
	      zh: '录音已成功处理，可以观看！',
	      pt: 'A gravação foi processada com sucesso e está pronta para visualização!',
	      bg: 'Записът е успешно обработен и готов за гледане!',
	      ro: 'Înregistrarea a fost procesată cu succes și este gata pentru vizionare!'
	    },
	    shots_upload_error_notify: {
	      ru: 'Не удалось обработать запись.',
	      en: 'Failed to process the recording.',
	      uk: 'Не вдалося обробити запис.',
	      be: 'Не ўдалося апрацаваць запіс.',
	      zh: '无法处理录音。',
	      pt: 'Falha ao processar a gravação.',
	      bg: 'Неуспешна обработка на записа.',
	      ro: 'Procesarea înregistrării a eșuat.'
	    },
	    shots_upload_notice_text: {
	      ru: 'Обратите внимание, что после публикации запись станет доступна для просмотра всем пользователям сервиса.',
	      en: 'Please note that after publication, the recording will be available for viewing by all users of the service.',
	      uk: 'Зверніть увагу, що після публікації запис стане доступний для перегляду всім користувачам сервісу.',
	      be: 'Звярніце ўвагу, што пасля публікації запіс стане даступны для прагляду ўсім карыстальнікам сэрвісу.',
	      zh: '请注意，发布后，录音将对所有服务用户可见。',
	      pt: 'Observe que, após a publicação, a gravação estará disponível para visualização por todos os usuários do serviço.',
	      bg: 'Обърнете внимание, че след публикуването записа ще бъде достъпен за преглед от всички потребители на услугата.',
	      ro: 'Rețineți că, după publicare, înregistrarea va fi disponibilă pentru vizionare tuturor utilizatorilor serviciului.'
	    },
	    shots_title_favorite: {
	      ru: 'Сохраненные',
	      en: 'Favorites',
	      uk: 'Збережені',
	      be: 'Захаваныя',
	      zh: '收藏夹',
	      pt: 'Favoritos',
	      bg: 'Любими',
	      ro: 'Favorite'
	    },
	    shots_title_created: {
	      ru: 'Созданные',
	      en: 'Created',
	      uk: 'Створені',
	      be: 'Створаныя',
	      zh: '已创建',
	      pt: 'Criado',
	      bg: 'Създадени',
	      ro: 'Create'
	    },
	    shots_title_likes: {
	      ru: 'Нравится',
	      en: 'Likes',
	      uk: 'Подобається',
	      be: 'Падабаецца',
	      zh: '喜欢',
	      pt: 'Curtidas',
	      bg: 'Харесвания',
	      ro: 'Aprecieri'
	    },
	    shots_title_saved: {
	      ru: 'Сохранено',
	      en: 'Saved',
	      uk: 'Збережено',
	      be: 'Захавана',
	      zh: '已保存',
	      pt: 'Salvo',
	      bg: 'Запазено',
	      ro: 'Salvate'
	    },
	    shots_status_error: {
	      ru: 'Ошибка',
	      en: 'Error',
	      uk: 'Помилка',
	      be: 'Памылка',
	      zh: '错误',
	      pt: 'Erro',
	      bg: 'Грешка',
	      ro: 'Eroare'
	    },
	    shots_status_processing: {
	      ru: 'Обработка',
	      en: 'Processing',
	      uk: 'Обробка',
	      be: 'Апрацоўка',
	      zh: '处理中',
	      pt: 'Processando',
	      bg: 'Обработка',
	      ro: 'Se procesează'
	    },
	    shots_status_ready: {
	      ru: 'Загружено',
	      en: 'Ready',
	      uk: 'Завантажено',
	      be: 'Загружана',
	      zh: '已就绪',
	      pt: 'Carregado',
	      bg: 'Качено',
	      ro: 'Gata'
	    },
	    shots_status_blocked: {
	      ru: 'Заблокировано',
	      en: 'Blocked',
	      uk: 'Заблоковано',
	      be: 'Заблакіравана',
	      zh: '已封锁',
	      pt: 'Bloqueado',
	      bg: 'Блокирано',
	      ro: 'Blocat'
	    },
	    shots_status_deleted: {
	      ru: 'Удалено',
	      en: 'Deleted',
	      uk: 'Видалено',
	      be: 'Выдалена',
	      zh: '已删除',
	      pt: 'Excluído',
	      bg: 'Изтрито',
	      ro: 'Șters'
	    },
	    shots_modal_error_recording_txt_1: {
	      ru: 'Не удалось начать запись.',
	      en: 'Failed to start recording.',
	      uk: 'Не вдалося почати запис.',
	      be: 'Не ўдалося пачаць запіс.',
	      zh: '无法开始录制。',
	      pt: 'Falha ao iniciar a gravação.',
	      bg: 'Неуспешно стартиране на записа.',
	      ro: 'Pornirea înregistrării a eșuat.'
	    },
	    shots_modal_error_recording_txt_2: {
	      ru: 'Попробуйте сменить источник видео на другой и повторить попытку.',
	      en: 'Try changing the video source to another and try again.',
	      uk: 'Спробуйте змінити джерело відео на інше та повторіть спробу.',
	      be: 'Паспрабуйце змяніць крыніцу відэа на іншую і паспрабуйце яшчэ раз.',
	      zh: '尝试将视频源更改为另一个并重试。',
	      pt: 'Tente alterar a fonte de vídeo para outra e tente novamente.',
	      bg: 'Опитайте да смените видео източника на друг и опитайте отново.',
	      ro: 'Încercați să schimbați sursa video și reîncercați.'
	    },
	    shots_button_good: {
	      ru: 'Хорошо',
	      en: 'Done',
	      uk: 'Готово',
	      be: 'Гатова',
	      zh: '完成',
	      pt: 'Concluído',
	      bg: 'Готово',
	      ro: 'Gata'
	    },
	    shots_button_report: {
	      ru: 'Подать жалобу',
	      en: 'Report',
	      uk: 'Поскаржитися',
	      be: 'Паскардзіцца',
	      zh: '举报',
	      pt: 'Denunciar',
	      bg: 'Докладвай',
	      ro: 'Raportează'
	    },
	    shots_button_delete_video: {
	      ru: 'Удалить запись',
	      en: 'Delete recording',
	      uk: 'Видалити запис',
	      be: 'Видаліць запіс',
	      zh: '删除录音',
	      pt: 'Excluir gravação',
	      bg: 'Изтрий записа',
	      ro: 'Șterge înregistrarea'
	    },
	    shots_modal_report_txt_1: {
	      ru: 'Вы уверены, что хотите подать жалобу на это video?',
	      en: 'Are you sure you want to report this video?',
	      uk: 'Ви впевнені, що хочете подати скаргу на це відео?',
	      be: 'Вы ўпэўненыя, што хочаце паскардзіцца на гэта відэа?',
	      zh: '您确定要举报此视频吗？',
	      pt: 'Tem certeza de que deseja denunciar este vídeo?',
	      bg: 'Сигурни ли сте, че искате да докладвате това видео?',
	      ro: 'Sigur doriți să raportați acest videoclip?'
	    },
	    shots_modal_report_txt_2: {
	      ru: 'Видео имеет нецензурное содержание, насилие или другие неприемлемые материалы.',
	      en: 'The video contains obscene content, violence, or other unacceptable materials.',
	      uk: 'Відео містить непристойний контент, насильство або інші неприйнятні матеріали.',
	      be: 'Відэа змяшчае непрыстойны кантэнт, гвалт або іншыя непрымальныя матэрыялы.',
	      zh: '该视频包含淫秽内容、暴力或其他不可接受的材料。',
	      pt: 'O vídeo contém conteúdo obsceno, violência ou outros materiais inaceitáveis.',
	      bg: 'Видеото съдържа непристойно съдържание, насилие или други неприемливи материали.',
	      ro: 'Videoclipul conține limbaj obscen, violență sau alte materiale inacceptabile.'
	    },
	    shots_modal_report_txt_3: {
	      ru: 'После подачи жалобы данное видео получит штрафные баллы. При накоплении определенного количества штрафных баллов видео будет удалено.',
	      en: 'After reporting, this video will receive penalty points. Upon accumulating a certain number of penalty points, the video will be deleted.',
	      uk: 'Після подання скарги це відео отримає штрафні бали. При накопиченні певної кількості штрафних балів відео буде видалено.',
	      be: 'Пасля падачы скаргі гэта відэа атрымае штрафныя балы. Пры назапашванні пэўнай колькасці штрафных балаў відэа будзе выдалена.',
	      zh: '举报后，该视频将获得处罚分数。 累积一定数量的处罚分数后，视频将被删除。',
	      pt: 'Após a denúncia, este vídeo receberá pontos de penalidade. Ao acumular um certo número de pontos de penalidade, o vídeo será excluído.',
	      bg: 'След докладването това видео ще получи наказателни точки. При натрупване на определен брой наказателни точки видеото ще бъде изтрито.',
	      ro: 'După raportare, acest videoclip va primi puncte de penalizare. La acumularea unui anumit număr de puncte, videoclipul va fi șters.'
	    },
	    shots_modal_report_bell: {
	      ru: 'Жалоба отправлена',
	      en: 'Report submitted',
	      uk: 'Скарга надіслана',
	      be: 'Скарга адпраўлена',
	      zh: '举报已提交',
	      pt: 'Denúncia enviada',
	      bg: 'Докладът е изпратен',
	      ro: 'Raportul a fost trimis'
	    },
	    shots_modal_report_bell_alreadyed: {
	      ru: 'Вы уже подавали жалобу на это видео',
	      en: 'You have already reported this video',
	      uk: 'Ви вже подавали скаргу на це відео',
	      be: 'Вы ўжо падавалі скаргу на гэта відэа',
	      zh: '您已举报此视频',
	      pt: 'Você já denunciou este vídeo',
	      bg: 'Вече сте докладвали това видео',
	      ro: 'Ați raportat deja acest videoclip'
	    },
	    shots_modal_deleted_bell: {
	      ru: 'Запись успешно удалена',
	      en: 'Recording successfully deleted',
	      uk: 'Запис успішно видалено',
	      be: 'Запіс паспяхова выдалены',
	      zh: '录音已成功删除',
	      pt: 'Gravação excluída com sucesso',
	      bg: 'Записът е успешно изтрит',
	      ro: 'Înregistrarea a fost ștearsă cu succes'
	    },
	    shots_modal_delete_txt_1: {
	      ru: 'Вы уверены, что хотите удалить эту запись?',
	      en: 'Are you sure you want to delete this recording?',
	      uk: 'Ви впевнені, що хочете видалити цей запис?',
	      be: 'Вы ўпэўненыя, што хочаце выдаліць гэты запіс?',
	      zh: '您确定要删除此录音吗？',
	      pt: 'Tem certeza de que deseja excluir esta gravação?',
	      bg: 'Сигурни ли сте, че искате да изтриете този запис?',
	      ro: 'Sigur doriți să ștergeți această înregistrare?'
	    },
	    shots_modal_delete_txt_2: {
	      ru: 'Запись будет удалена навсегда и не сможет быть восстановлена.',
	      en: 'The recording will be permanently deleted and cannot be recovered.',
	      uk: 'Запис буде назавжди видалено і не може бути відновлено.',
	      be: 'Запіс будзе назаўжды выдалены і не можа быць адноўлены.',
	      zh: '录音将被永久删除，无法恢复。',
	      pt: 'A gravação será excluída permanentemente e não poderá ser recuperada.',
	      bg: 'Записът ще бъде изтрит завинаги и не може да бъде възстановен.',
	      ro: 'Înregistrarea va fi ștearsă definitiv și nu poate fi recuperată.'
	    },
	    shots_modal_quota_txt_1: {
	      ru: 'Не торопитесь записывать новый момент!',
	      en: 'Don\'t rush to record a new moment!',
	      uk: 'Не поспішайте записувати новий момент!',
	      be: 'Не спяшайцеся запісваць новы момант!',
	      zh: '不要急于记录新时刻！',
	      pt: 'Não se apresse para gravar um novo momento!',
	      bg: 'Не бързайте да записвате нов момент!',
	      ro: 'Nu vă grăbiți să înregistrați un moment nou!'
	    },
	    shots_modal_quota_txt_2: {
	      ru: 'Действуются ограничения на частоту записи, чтобы избежать перегрузки сервиса. Вам нужно подождать еще {time}',
	      en: 'There are restrictions on the frequency of recording to avoid overloading the service. You need to wait another {time}',
	      uk: 'Існують обмеження на частоту запису, щоб уникнути перевантаження сервісу. Вам потрібно почекати ще {time}',
	      be: 'Існуюць абмежаванні на частату запісу, каб пазбегнуць перагрузкі сэрвісу. Вам трэба пачакаць яшчэ {time}',
	      zh: '对录音频率有一定限制，以避免服务过载。 您需要再等 {time}',
	      pt: 'Existem restrições na frequência de gravação para evitar sobrecarregar o serviço. Você precisa esperar mais {time}',
	      bg: 'Има ограничения за честотата на запис, за да се избегне претоварване на услугата. Трябва да изчакате още {time}',
	      ro: 'Există restricții privind frecvența înregistrărilor. Trebuie să mai așteptați {time}'
	    },
	    shots_modal_before_upload_recording_txt_1: {
	      ru: 'Будьте ориганальны!',
	      en: 'Be original!',
	      uk: 'Будьте оригінальними!',
	      be: 'Будзьце арыгінальнымі!',
	      zh: '要有创意！',
	      pt: 'Seja original!',
	      bg: 'Бъдете оригинални!',
	      ro: 'Fii original!'
	    },
	    shots_modal_before_upload_recording_txt_2: {
	      ru: 'Похоже, вы записали "титры" в начале или в конце фильма. Если это так, то пожалуйста, выберите другой фрагмент видео для записи.',
	      en: 'It looks like you recorded the "credits" at the beginning or end of the movie. If so, please choose another video fragment to record.',
	      uk: 'Схоже, ви записали "титри" на початку або в кінці фільму. Якщо так, будь ласка, виберіть інший фрагмент відео для запису.',
	      be: 'Падаецца, вы запісалі "трэйлер" на пачатку або ў канцы фільма. Калі так, калі ласка, выберыце іншы фрагмент відэа для запісу.',
	      zh: '看起来您在电影的开头或结尾录制了“片尾字幕”。 如果是这样，请选择另一个视频片段进行录制。',
	      pt: 'Parece que você gravou os "créditos" no início ou no final do filme. Se for esse o caso, escolha outro fragmento de vídeo para gravar.',
	      bg: 'Изглежда сте записали "титрите" в началото или в края на филма. Ако е така, моля изберете друг фрагмент от видеото за запис.',
	      ro: 'Se pare că ați înregistrat „creditele” la începutul sau sfârșitul filmului. Dacă da, vă rugăm să alegeți un alt fragment video pentru înregistrare.'
	    },
	    shots_button_choice_fragment: {
	      ru: 'Выбрать другой фрагмент',
	      en: 'Choose another fragment',
	      uk: 'Вибрати інший фрагмент',
	      be: 'Выбраць іншы фрагмент',
	      zh: '选择另一个片段',
	      pt: 'Escolher outro fragmento',
	      bg: 'Избери друг фрагмент',
	      ro: 'Alege un alt fragment'
	    },
	    shots_button_continue_upload: {
	      ru: 'Продолжить загрузку',
	      en: 'Continue uploading',
	      uk: 'Продовжити завантаження',
	      be: 'Працягнуць загрузку',
	      zh: '继续上传',
	      pt: 'Continuar enviando',
	      bg: 'Продължи качването',
	      ro: 'Continuați încărcarea'
	    },
	    shots_recording_text: {
	      ru: 'Идет запись',
	      en: 'Recording in progress',
	      uk: 'Йде запис',
	      be: 'Ідзе запіс',
	      zh: '正在录制',
	      pt: 'Gravação em andamento',
	      bg: 'Записът е в ход',
	      ro: 'Înregistrare în curs'
	    },
	    shots_watch: {
	      ru: 'Смотреть нарезки',
	      en: 'Watch shots',
	      uk: 'Дивитися нарізки',
	      be: 'Глядзець нарэзкі',
	      zh: '观看片段',
	      pt: 'Assistir trechos',
	      bg: 'Гледайте нарязки',
	      ro: 'Vizionează clipuri'
	    },
	    shots_down: {
	      ru: 'Нажми вниз',
	      en: 'Press down',
	      uk: 'Натисни вниз',
	      be: 'Націсні ўніз',
	      zh: '按下',
	      pt: 'Pressione para baixo',
	      bg: 'Натисни надолу',
	      ro: 'Apasă jos'
	    },
	    shots_how_create_video_title: {
	      ru: 'Как создать видео',
	      en: 'How to create a video',
	      uk: 'Як створити відео',
	      be: 'Як стварыць відэа',
	      zh: '如何创建视频',
	      pt: 'Como criar um vídeo',
	      bg: 'Как да създадете видео',
	      ro: 'Cum să creezi un videoclip'
	    },
	    shots_how_create_video_subtitle: {
	      ru: 'Посмотреть инструкцию по созданию видео',
	      en: 'View instructions for creating a video',
	      uk: 'Переглянути інструкцію зі створення відео',
	      be: 'Паглядзець інструкцію па стварэнні відэа',
	      zh: '查看创建视频的说明',
	      pt: 'Ver instrucciones para criar um vídeo',
	      bg: 'Вижте инструкциите за създаване на видео',
	      ro: 'Vezi instrucțiunile pentru crearea unui videoclip'
	    },
	    shots_card_empty_descr: {
	      ru: 'Здесь пока нет шотов, но вы можете создать первый!',
	      en: 'There are no shots here yet, but you can create the first one!',
	      uk: 'Тут поки немає шотів, але ви можете створити перший!',
	      be: 'Тут пакуль няма шотаў, але вы можете стварыць першы!',
	      zh: '这里还没有镜头，但您可以创建第一个！',
	      pt: 'Ainda não há trechos aqui, mas você pode criar o primeiro!',
	      bg: 'Тук все още няма нарязки, но можете да създадете първия!',
	      ro: 'Nu există clipuri aici, dar poți să-l creezi pe primul!'
	    },
	    shots_alert_noshots: {
	      ru: 'Шотов пока нет',
	      en: 'No shots yet',
	      uk: 'Шотів поки немає',
	      be: 'Шотаў пакуль няма',
	      zh: '还没有镜头',
	      pt: 'Ainda não há trechos',
	      bg: 'Все още няма нарязки',
	      ro: 'Niciun clip încă'
	    },
	    shots_choice_tags: {
	      ru: 'Вы можете выбрать теги:',
	      en: 'You can choose tags:',
	      uk: 'Ви можете вибрати теги:',
	      be: 'Вы можаце выбраць тэгаў:',
	      zh: '您可以选择标签：',
	      pt: 'Você pode escolher tags:',
	      bg: 'Можете да изберете тагове:',
	      ro: 'Puteți alege etichete:'
	    },
	    shots_tag_action: {
	      ru: 'Экшен',
	      en: 'Action',
	      uk: 'Екшен',
	      be: 'Экшн',
	      zh: '动作',
	      pt: 'Ação',
	      bg: 'Екшън',
	      ro: 'Acțiune'
	    },
	    shots_tag_comedy: {
	      ru: 'Юмор',
	      en: 'Humor',
	      uk: 'Гумор',
	      be: 'Гумар',
	      zh: '幽默',
	      pt: 'Humor',
	      bg: 'Хумор',
	      ro: 'Umor'
	    },
	    shots_tag_drama: {
	      ru: 'Драма',
	      en: 'Drama',
	      uk: 'Драма',
	      be: 'Драма',
	      zh: '戏剧',
	      pt: 'Drama',
	      bg: 'Драма',
	      ro: 'Dramă'
	    },
	    shots_tag_horror: {
	      ru: 'Ужасы',
	      en: 'Horror',
	      uk: 'Ужаси',
	      be: 'Ужасы',
	      zh: '恐怖',
	      pt: 'Horror',
	      bg: 'Ужас',
	      ro: 'Groază'
	    },
	    shots_tag_thriller: {
	      ru: 'Триллер',
	      en: 'Thriller',
	      uk: 'Трилер',
	      be: 'Трылер',
	      zh: '惊悚',
	      pt: 'Thriller',
	      bg: 'Трилър',
	      ro: 'Thriller'
	    },
	    shots_tag_anime: {
	      ru: 'Аниме',
	      en: 'Anime',
	      uk: 'Аніме',
	      be: 'Анімэ',
	      zh: '动漫',
	      pt: 'Anime',
	      bg: 'Аниме',
	      ro: 'Anime'
	    },
	    shots_tag_fantasy: {
	      ru: 'Фэнтези',
	      en: 'Fantasy',
	      uk: 'Фентезі',
	      be: 'Фэнтэзі',
	      zh: '奇幻',
	      pt: 'Fantasia',
	      bg: 'Фентъзи',
	      ro: 'Fantezie'
	    },
	    shots_tag_sci_fi: {
	      ru: 'Фантастика',
	      en: 'Sci-Fi',
	      uk: 'Фантастика',
	      be: 'Фантастыка',
	      zh: '科幻',
	      pt: 'Ficção Científica',
	      bg: 'Фантастика',
	      ro: 'Ficțiune Științifică'
	    },
	    shots_settings_in_player: {
	      ru: 'Показывать моменты в плеере',
	      en: 'Show moments in player',
	      uk: 'Показувати моменти в плеєрі',
	      be: 'Паказваць моманты ў плееры',
	      zh: '在播放器中显示镜头',
	      pt: 'Mostrar momentos no player',
	      bg: 'Показване на моменти в плейъра',
	      ro: 'Afișați momentele în player'
	    },
	    shots_settings_in_card: {
	      ru: 'Показывать кнопку Shots в карточках',
	      en: 'Show Shots button in cards',
	      uk: 'Показувати кнопку Shots в картках',
	      be: 'Паказваць кнопку Shots у картках',
	      zh: '在卡片中显示 Shots 按钮',
	      pt: 'Mostrar botão Shots em cartões',
	      bg: 'Показване на бутон Shots в картите',
	      ro: 'Afișați butonul Shots în carduri'
	    },
	    shots_watch_roll: {
	      ru: 'Смотреть ленту',
	      en: 'Watch roll',
	      uk: 'Дивитися стрічку',
	      be: 'Глядзець стужку',
	      zh: '观看卷',
	      pt: 'Assistir rolo',
	      bg: 'Гледайте ролка',
	      ro: 'Vizionați ruloul'
	    },
	    shots_choose_tags_select: {
	      ru: 'Или выберите теги',
	      en: 'Or choose tags',
	      uk: 'Або виберіть теги',
	      be: 'Або выберите теги',
	      zh: '或者选择标签',
	      pt: 'Ou escolha tags',
	      bg: 'Или выберите теги',
	      ro: 'Sau alegeți etichete'
	    },
	    shots_watch_tags: {
	      ru: 'Смотреть по тегам',
	      en: 'Watch by tags',
	      uk: 'Дивитися за тегами',
	      be: 'Глядзець па тэгах',
	      zh: '按标签观看',
	      pt: 'Assistir por tags',
	      bg: 'Гледайте по тагове',
	      ro: 'Vizionați după etichete'
	    },
	    shots_alert_no_tags: {
	      ru: 'Выберите хотя бы один тег',
	      en: 'Please select at least one tag',
	      uk: 'Будь ласка, виберіть хоча б один тег',
	      be: 'Калі ласка, выберыце хаця б адзін тэг',
	      zh: '请至少选择一个标签',
	      pt: 'Por favor, selecione pelo menos uma tag',
	      bg: 'Моля, изберете поне един таг',
	      ro: 'Vă rugăm să selectați cel puțin un eticheta'
	    },
	    shots_player_recorder_rewind_text: {
	      ru: 'Перемотать назад',
	      en: 'Rewind',
	      uk: 'Перемотати назад',
	      be: 'Пераматаць назад',
	      zh: '倒带',
	      pt: 'Rebobinar',
	      bg: 'Върни назад',
	      ro: 'Derulați înapoi'
	    },
	    shots_player_recorder_forward_text: {
	      ru: 'Перемотать вперед',
	      en: 'Fast forward',
	      uk: 'Перемотати вперед',
	      be: 'Пераматаць наперад',
	      zh: '快进',
	      pt: 'Avançar',
	      bg: 'Напред',
	      ro: 'Derulați înainte'
	    },
	    shots_player_recorder_stop_text: {
	      ru: 'Остановить запись',
	      en: 'Stop recording',
	      uk: 'Зупинити запис',
	      be: 'Спыніць запіс',
	      zh: '停止录制',
	      pt: 'Parar gravação',
	      bg: 'Спиране на записа',
	      ro: 'Opriți înregistrarea'
	    }
	  });
	}
	var Lang = {
	  init: init$7
	};

	function init$6() {
	  Lampa.Template.add('shots_player_record_button', "\n        <div class=\"button selector shots-player-button\" data-controller=\"player_panel\">\n            <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <circle cx=\"11.718\" cy=\"11.718\" r=\"10.718\" stroke=\"white\" stroke-width=\"2\"/>\n                <circle cx=\"11.718\" cy=\"11.718\" r=\"5.92621\" fill=\"white\" class=\"rec\"/>\n            </svg>\n        </div>\n    ");
	  Lampa.Template.add('shots_modal_before_recording', "\n        <div class=\"about\">\n            <div style=\"font-size: 1.2em;\">\n                #{shots_modal_before_recording_txt_1}\n            </div>\n            <div>\n                <svg class=\"shots-svg-auto shots-svg-auto--helmet\"><use xlink:href=\"#sprite-shots-howneed\"></use></svg>\n            </div>\n            <div>\n                #{shots_modal_before_recording_txt_2}\n            </div>\n        </div>\n    ");
	  Lampa.Template.add('shots_modal_before_upload_recording', "\n        <div class=\"about\">\n            <div style=\"font-size: 1.2em;\">\n                #{shots_modal_before_upload_recording_txt_1}\n            </div>\n            <div>\n                <svg class=\"shots-svg-auto shots-svg-auto--helmet\"><use xlink:href=\"#sprite-shots-notitles\"></use></svg>\n            </div>\n            <div>\n                #{shots_modal_before_upload_recording_txt_2}\n            </div>\n        </div>\n    ");
	  Lampa.Template.add('shots_modal_error_recording', "\n        <div class=\"about\">\n            <div style=\"font-size: 1.2em;\">\n                #{shots_modal_error_recording_txt_1}\n            </div>\n            <div>\n                #{shots_modal_error_recording_txt_2}\n            </div>\n        </div>\n    ");
	  Lampa.Template.add('shots_modal_report', "\n        <div class=\"about\">\n            <div style=\"font-size: 1.2em;\">\n                #{shots_modal_report_txt_1}\n            </div>\n            <div>\n                #{shots_modal_report_txt_2}\n            </div>\n            <div>\n                #{shots_modal_report_txt_3}\n            </div>\n        </div>\n    ");
	  Lampa.Template.add('shots_modal_delete', "\n        <div class=\"about\">\n            <div style=\"font-size: 1.2em;\">\n                #{shots_modal_delete_txt_1}\n            </div>\n            <div>\n                #{shots_modal_delete_txt_2}\n            </div>\n        </div>\n    ");
	  Lampa.Template.add('shots_modal_quota_limit', "\n        <div class=\"about\">\n            <div style=\"font-size: 1.2em;\">\n                #{shots_modal_quota_txt_1}\n            </div>\n            <div>\n                #{shots_modal_quota_txt_2}\n            </div>\n        </div>\n    ");
	  Lampa.Template.add('shots_modal_short_recording', "\n        <div class=\"about\">\n            <div>\n                #{shots_modal_short_recording_txt}\n            </div>\n        </div>\n    ");
	  Lampa.Template.add('shots_player_recorder', "\n        <div class=\"shots-player-recorder\">\n            <div class=\"shots-player-recorder__body\">\n                <div class=\"shots-player-recorder__plate\">\n                    <div class=\"shots-player-recorder__text\">#{shots_recording_text} <span></span></div>\n                    <div class=\"shots-player-recorder__button selector shots-player-recorder__rewind\">\n                        <svg width=\"35\" height=\"24\" viewBox=\"0 0 35 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path d=\"M14.75 10.2302C13.4167 11 13.4167 12.9245 14.75 13.6943L32 23.6536C33.3333 24.4234 35 23.4612 35 21.9216L35 2.00298C35 0.463381 33.3333 -0.498867 32 0.270933L14.75 10.2302Z\" fill=\"currentColor\"/>\n                            <path d=\"M1.75 10.2302C0.416665 11 0.416667 12.9245 1.75 13.6943L19 23.6536C20.3333 24.4234 22 23.4612 22 21.9216L22 2.00298C22 0.463381 20.3333 -0.498867 19 0.270933L1.75 10.2302Z\" fill=\"currentColor\"/>\n                            <rect width=\"6\" height=\"24\" rx=\"2\" transform=\"matrix(-1 0 0 1 6 0)\" fill=\"currentColor\"/>\n                        </svg>\n                        <div>#{shots_player_recorder_rewind_text}</div>\n                    </div>\n                    <div class=\"shots-player-recorder__button selector shots-player-recorder__forward\">\n                        <svg width=\"35\" height=\"24\" viewBox=\"0 0 35 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path d=\"M20.25 10.2302C21.5833 11 21.5833 12.9245 20.25 13.6943L3 23.6536C1.66666 24.4234 -6.72981e-08 23.4612 0 21.9216L8.70669e-07 2.00298C9.37967e-07 0.463381 1.66667 -0.498867 3 0.270933L20.25 10.2302Z\" fill=\"currentColor\"/>\n                            <path d=\"M33.25 10.2302C34.5833 11 34.5833 12.9245 33.25 13.6943L16 23.6536C14.6667 24.4234 13 23.4612 13 21.9216L13 2.00298C13 0.463381 14.6667 -0.498867 16 0.270933L33.25 10.2302Z\" fill=\"currentColor\"/>\n                            <rect x=\"29\" width=\"6\" height=\"24\" rx=\"2\" fill=\"currentColor\"/>\n                        </svg>\n                        <div>#{shots_player_recorder_forward_text}</div>\n                    </div>\n                    <div class=\"shots-player-recorder__button selector shots-player-recorder__stop\">\n                        <svg width=\"19\" height=\"25\" viewBox=\"0 0 19 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <rect width=\"6\" height=\"25\" rx=\"2\" fill=\"currentColor\"/>\n                            <rect x=\"13\" width=\"6\" height=\"25\" rx=\"2\" fill=\"currentColor\"/>\n                        </svg>\n                        <div>#{shots_player_recorder_stop_text}</div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ");
	  Lampa.Template.add('shots_modal_upload', "\n        <div class=\"shots-modal-upload\">\n            <div class=\"shots-modal-upload__preview\"></div>\n            <div class=\"shots-modal-upload__body\"></div>\n        </div>\n    ");
	  Lampa.Template.add('shots_checkbox', "\n        <div class=\"shots-selector shots-checkbox selector\">\n            <div class=\"shots-checkbox__icon\"></div>\n            <div class=\"shots-checkbox__text\">{text}</div>\n        </div>\n    ");
	  Lampa.Template.add('shots_button', "\n        <div class=\"shots-selector shots-button selector\">{text}</div>\n    ");
	  Lampa.Template.add('shots_progress', "\n        <div class=\"shots-selector shots-progress selector\">\n            <div class=\"shots-progress__text\">{text}</div>\n            <div class=\"shots-progress__bar\"><div></div></div>\n        </div>\n    ");
	  Lampa.Template.add('shots_preview', "\n        <div class=\"shots-preview\">\n            <div class=\"shots-preview__left\">\n                <div class=\"shots-preview__screenshot\">\n                    <img>\n                </div>\n            </div>\n            <div class=\"shots-preview__body\">\n                <div class=\"shots-preview__year\">{year}</div>\n                <div class=\"shots-preview__title\">{title}</div>\n            </div>\n        </div>\n    ");
	  Lampa.Template.add('shots_tags', "\n        <div class=\"shots-tags\"></div>\n    ");
	  Lampa.Template.add('shots_upload_complete_text', "\n        <div class=\"about\">\n            <div style=\"padding-bottom: 1em;\">\n                #{shots_upload_complete_text}\n            </div>\n        </div>\n    ");
	  Lampa.Template.add('shots_upload_notice_text', "\n        <div class=\"about\">\n            <div style=\"padding-bottom: 1em;\">\n                #{shots_upload_notice_text}\n            </div>\n        </div>\n    ");
	  Lampa.Template.add('shots_lenta', "\n        <div class=\"shots-lenta\">\n            <div class=\"shots-lenta__video\"></div>\n            <div class=\"shots-lenta__panel\"></div>\n        </div>\n    ");
	  Lampa.Template.add('shots_lenta_video', "\n        <div class=\"shots-lenta-video\">\n            <video class=\"shots-lenta-video__video-element\" autoplay loop poster=\"./img/video_poster.png\"></video>\n            <div class=\"shots-lenta-video__progress-bar\">\n                <div></div>\n            </div>\n            <div class=\"player-video__loader shots-lenta-video__loader\"></div>\n            <div class=\"shots-lenta-video__layer\"></div>\n        </div>\n    ");
	  Lampa.Template.add('shots_lenta_panel', "\n        <div class=\"shots-lenta-panel\">\n            <div class=\"explorer-card__head shots-lenta-panel__card loading\">\n                <div class=\"explorer-card__head-left\">\n                    <div class=\"explorer-card__head-img selector shots-lenta-panel__card-img\">\n                        <img>\n                    </div>\n                </div>\n                <div class=\"explorer-card__head-body selector\">\n                    <div class=\"shots-lenta-panel__info\">\n                        <div class=\"explorer-card__head-create shots-lenta-panel__card-year\"></div>\n                        <div class=\"shots-lenta-panel__card-title\"></div>\n                        <div class=\"shots-lenta-panel__recorder hide\"></div>\n                        <div class=\"shots-lenta-panel__tags\"></div>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"shots-lenta-panel__right\">\n                <div class=\"shots-lenta-panel__author\"></div>\n\n                <div class=\"shots-lenta-panel__buttons\">\n                    <div class=\"selector action-liked\">\n                        <svg width=\"39\" height=\"35\" viewBox=\"0 0 39 35\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path d=\"M26.6504 1.50977C29.2617 1.38597 32.2036 2.36705 34.7168 5.42676C37.1567 8.39737 37.1576 11.3625 36.2148 14.002C35.2408 16.7288 33.2538 19.0705 31.834 20.4238C31.8295 20.4281 31.8247 20.4322 31.8203 20.4365L19.1484 32.8271L6.47754 20.4365C5.03099 18.9847 3.053 16.646 2.08203 13.9443C1.14183 11.3282 1.13938 8.39959 3.58105 5.42676C6.09429 2.36705 9.03613 1.38597 11.6475 1.50977C14.3299 1.63693 16.7044 2.92997 17.9932 4.4873C18.2781 4.83167 18.7024 5.03125 19.1494 5.03125C19.5962 5.03113 20.0198 4.83157 20.3047 4.4873C21.5934 2.92997 23.968 1.63697 26.6504 1.50977Z\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linejoin=\"round\" fill=\"currentColor\" class=\"icon-fill\"/>\n                        </svg>\n                    </div>\n                    <div class=\"selector action-favorite\">\n                        <svg width=\"21\" height=\"32\" viewBox=\"0 0 21 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path d=\"M2 1.5H19C19.2761 1.5 19.5 1.72386 19.5 2V27.9618C19.5 28.3756 19.0261 28.6103 18.697 28.3595L12.6212 23.7303C11.3682 22.7757 9.63183 22.7757 8.37885 23.7303L2.30302 28.3595C1.9739 28.6103 1.5 28.3756 1.5 27.9618V2C1.5 1.72386 1.72386 1.5 2 1.5Z\" stroke=\"currentColor\" stroke-width=\"2.5\" fill=\"currentColor\" class=\"icon-fill\"></path>\n                        </svg>\n                    </div>\n                    <div class=\"selector action-more\">\n                        <svg><use xlink:href=\"#sprite-dots\"></use></svg>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ");
	  Lampa.Template.add('shots_counter', "\n        <div class=\"shots-counter\">\n            <span></span>\n            <div></div>\n        </div>\n    ");
	  Lampa.Template.add('shots_author', "\n        <div class=\"shots-author\">\n            <div class=\"shots-author__img\">\n                <img>\n            </div>\n            <div class=\"shots-author__name\"></div>\n        </div>\n    ");
	  var sprites = "\n        <symbol id=\"sprite-love\" viewBox=\"0 0 39 35\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M26.6504 1.50977C29.2617 1.38597 32.2036 2.36705 34.7168 5.42676C37.1567 8.39737 37.1576 11.3625 36.2148 14.002C35.2408 16.7288 33.2538 19.0705 31.834 20.4238C31.8295 20.4281 31.8247 20.4322 31.8203 20.4365L19.1484 32.8271L6.47754 20.4365C5.03099 18.9847 3.053 16.646 2.08203 13.9443C1.14183 11.3282 1.13938 8.39959 3.58105 5.42676C6.09429 2.36705 9.03613 1.38597 11.6475 1.50977C14.3299 1.63693 16.7044 2.92997 17.9932 4.4873C18.2781 4.83167 18.7024 5.03125 19.1494 5.03125C19.5962 5.03113 20.0198 4.83157 20.3047 4.4873C21.5934 2.92997 23.968 1.63697 26.6504 1.50977Z\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linejoin=\"round\"/>\n        </symbol>\n\n        <symbol id=\"sprite-shots\" viewBox=\"0 0 512 512\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M253.266 512a19.166 19.166 0 0 1-19.168-19.168V330.607l-135.071-.049a19.164 19.164 0 0 1-16.832-28.32L241.06 10.013a19.167 19.167 0 0 1 36.005 9.154v162.534h135.902a19.167 19.167 0 0 1 16.815 28.363L270.078 502.03a19.173 19.173 0 0 1-16.812 9.97z\" fill=\"currentColor\"></path>\n        </symbol>\n\n        <symbol id=\"sprite-shots-notitles\" viewBox=\"0 0 474 138\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect x=\"1.5\" y=\"1.5\" width=\"216.196\" height=\"121.309\" rx=\"9.5\" stroke=\"white\" stroke-width=\"3\"/>\n            <rect x=\"255.49\" y=\"1.5\" width=\"216.196\" height=\"121.309\" rx=\"9.5\" stroke=\"white\" stroke-width=\"3\"/>\n            <rect x=\"77.9692\" y=\"49.6289\" width=\"63.2581\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"51.4348\" y=\"64.8156\" width=\"116.327\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"302.813\" y=\"27.8919\" width=\"58.0774\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"345.485\" y=\"10.1938\" width=\"36.2068\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"319.336\" y=\"44.1069\" width=\"41.5542\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"312.751\" y=\"60.3219\" width=\"48.1394\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.66\" x=\"316.25\" y=\"76.5368\" width=\"44.6411\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.38\" x=\"342.385\" y=\"92.7517\" width=\"18.5054\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.28\" x=\"308.429\" y=\"108.967\" width=\"52.4612\" height=\"4.04266\" rx=\"2.02133\" fill=\"white\"/>\n            <rect x=\"371.113\" y=\"27.8919\" width=\"38.2129\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"371.113\" y=\"44.1069\" width=\"47.8267\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"371.113\" y=\"60.3219\" width=\"29.3054\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.66\" x=\"371.113\" y=\"76.5368\" width=\"44.3281\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.38\" x=\"371.113\" y=\"92.7517\" width=\"29.3054\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.28\" x=\"371.113\" y=\"108.967\" width=\"30.9517\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"99.001\" y=\"80.0025\" width=\"21.1946\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"169.168\" y=\"88.6869\" width=\"62.5064\" height=\"6.28762\" rx=\"3.14381\" transform=\"rotate(45 169.168 88.6869)\" fill=\"#FF3F3F\"/>\n            <rect width=\"62.5064\" height=\"6.28762\" rx=\"3.14381\" transform=\"matrix(-0.707107 0.707107 0.707107 0.707107 208.921 88.6869)\" fill=\"#FF3F3F\"/>\n            <rect x=\"423.386\" y=\"88.6869\" width=\"62.5064\" height=\"6.28762\" rx=\"3.14381\" transform=\"rotate(45 423.386 88.6869)\" fill=\"#FF3F3F\"/>\n            <rect width=\"62.5064\" height=\"6.28762\" rx=\"3.14381\" transform=\"matrix(-0.707107 0.707107 0.707107 0.707107 463.138 88.6869)\" fill=\"#FF3F3F\"/>\n        </symbol>\n\n        <symbol id=\"sprite-shots-howneed\" viewBox=\"0 0 474 138\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect x=\"1.5\" y=\"1.5\" width=\"216.196\" height=\"121.309\" rx=\"9.5\" stroke=\"white\" stroke-width=\"3\"/>\n            <rect x=\"255.49\" y=\"1.5\" width=\"216.196\" height=\"121.309\" rx=\"9.5\" stroke=\"white\" stroke-width=\"3\"/>\n            <rect x=\"54.1262\" y=\"103.818\" width=\"47.7241\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.28\" x=\"16.4497\" y=\"103.818\" width=\"186.409\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"302.813\" y=\"27.8919\" width=\"58.0774\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"345.485\" y=\"10.1938\" width=\"36.2068\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"319.336\" y=\"44.1069\" width=\"41.5542\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"312.751\" y=\"60.3219\" width=\"48.1394\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.66\" x=\"316.25\" y=\"76.5368\" width=\"44.6411\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.38\" x=\"342.385\" y=\"92.7517\" width=\"18.5054\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.28\" x=\"308.429\" y=\"108.967\" width=\"52.4612\" height=\"4.04266\" rx=\"2.02133\" fill=\"white\"/>\n            <rect x=\"371.113\" y=\"27.8919\" width=\"38.2129\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"371.113\" y=\"44.1069\" width=\"47.8267\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"371.113\" y=\"60.3219\" width=\"29.3054\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.66\" x=\"371.113\" y=\"76.5368\" width=\"44.3281\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect opacity=\"0.28\" x=\"371.113\" y=\"108.967\" width=\"30.9517\" height=\"5.14891\" rx=\"2.57446\" fill=\"white\"/>\n            <rect x=\"59.2751\" y=\"100.74\" width=\"11.3044\" height=\"5.14891\" rx=\"2.57446\" transform=\"rotate(90 59.2751 100.74)\" fill=\"white\"/>\n            <rect x=\"101.85\" y=\"100.74\" width=\"11.3044\" height=\"5.14891\" rx=\"2.57446\" transform=\"rotate(90 101.85 100.74)\" fill=\"white\"/>\n            <rect x=\"423.386\" y=\"88.6869\" width=\"62.5064\" height=\"6.28762\" rx=\"3.14381\" transform=\"rotate(45 423.386 88.6869)\" fill=\"#FF3F3F\"/>\n            <rect width=\"62.5064\" height=\"6.28762\" rx=\"3.14381\" transform=\"matrix(-0.707107 0.707107 0.707107 0.707107 463.138 88.6869)\" fill=\"#FF3F3F\"/>\n        </symbol>\n    ";
	  document.querySelector('#sprites').innerHTML += sprites;
	}
	var Templates = {
	  init: init$6
	};

	var objectDefineProperties = {};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$2 = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys$1);
	};

	var DESCRIPTORS$3 = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule = objectDefineProperty;
	var anObject$7 = anObject$a;
	var toIndexedObject$1 = toIndexedObject$6;
	var objectKeys$1 = objectKeys$2;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS$3 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$7(O);
	  var props = toIndexedObject$1(Properties);
	  var keys = objectKeys$1(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn = getBuiltIn$4;

	var html$1 = getBuiltIn('document', 'documentElement');

	/* global ActiveXObject -- old IE, WSH */
	var anObject$6 = anObject$a;
	var definePropertiesModule = objectDefineProperties;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys = hiddenKeys$4;
	var html = html$1;
	var documentCreateElement = documentCreateElement$2;
	var sharedKey$1 = sharedKey$3;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey$1('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  // eslint-disable-next-line no-useless-assignment -- avoid memory leak
	  activeXDocument = null;
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    activeXDocument = new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = typeof document != 'undefined'
	    ? document.domain && activeXDocument
	      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
	      : NullProtoObjectViaIFrame()
	    : NullProtoObjectViaActiveX(activeXDocument); // WSH
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO$1] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	// eslint-disable-next-line es/no-object-create -- safe
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject$6(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
	};

	var wellKnownSymbol$a = wellKnownSymbol$g;
	var create$2 = objectCreate;
	var defineProperty$3 = objectDefineProperty.f;

	var UNSCOPABLES = wellKnownSymbol$a('unscopables');
	var ArrayPrototype$1 = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype$1[UNSCOPABLES] === undefined) {
	  defineProperty$3(ArrayPrototype$1, UNSCOPABLES, {
	    configurable: true,
	    value: create$2(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables$1 = function (key) {
	  ArrayPrototype$1[UNSCOPABLES][key] = true;
	};

	var $$c = _export;
	var $find = arrayIteration.find;
	var addToUnscopables = addToUnscopables$1;

	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	// eslint-disable-next-line es/no-array-prototype-find -- testing
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.es/ecma262/#sec-array.prototype.find
	$$c({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

	var DESCRIPTORS$2 = descriptors;
	var isArray$2 = isArray$4;

	var $TypeError$5 = TypeError;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// Safari < 13 does not throw an error in this case
	var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS$2 && !function () {
	  // makes no sense without proper strict mode support
	  if (this !== undefined) return true;
	  try {
	    // eslint-disable-next-line es/no-object-defineproperty -- safe
	    Object.defineProperty([], 'length', { writable: false }).length = 1;
	  } catch (error) {
	    return error instanceof TypeError;
	  }
	}();

	var arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
	  if (isArray$2(O) && !getOwnPropertyDescriptor$1(O, 'length').writable) {
	    throw new $TypeError$5('Cannot set read only .length');
	  } return O.length = length;
	} : function (O, length) {
	  return O.length = length;
	};

	var uncurryThis$c = functionUncurryThis;

	var arraySlice$1 = uncurryThis$c([].slice);

	var $$b = _export;
	var isArray$1 = isArray$4;
	var isConstructor$1 = isConstructor$3;
	var isObject$6 = isObject$d;
	var toAbsoluteIndex = toAbsoluteIndex$2;
	var lengthOfArrayLike$3 = lengthOfArrayLike$6;
	var toIndexedObject = toIndexedObject$6;
	var createProperty$2 = createProperty$4;
	var setArrayLength$2 = arraySetLength;
	var wellKnownSymbol$9 = wellKnownSymbol$g;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$4;
	var nativeSlice = arraySlice$1;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$1('slice');

	var SPECIES$1 = wellKnownSymbol$9('species');
	var $Array$1 = Array;
	var max$1 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	$$b({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = lengthOfArrayLike$3(O);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray$1(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (isConstructor$1(Constructor) && (Constructor === $Array$1 || isArray$1(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject$6(Constructor)) {
	        Constructor = Constructor[SPECIES$1];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === $Array$1 || Constructor === undefined) {
	        return nativeSlice(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? $Array$1 : Constructor)(max$1(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty$2(result, n, O[k]);
	    setArrayLength$2(result, n);
	    return result;
	  }
	});

	var tryToString$1 = tryToString$3;

	var $TypeError$4 = TypeError;

	var deletePropertyOrThrow$1 = function (O, P) {
	  if (!delete O[P]) throw new $TypeError$4('Cannot delete property ' + tryToString$1(P) + ' of ' + tryToString$1(O));
	};

	var classof$2 = classof$5;

	var $String$1 = String;

	var toString$7 = function (argument) {
	  if (classof$2(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
	  return $String$1(argument);
	};

	var arraySlice = arraySlice$1;

	var floor$1 = Math.floor;

	var sort = function (array, comparefn) {
	  var length = array.length;

	  if (length < 8) {
	    // insertion sort
	    var i = 1;
	    var element, j;

	    while (i < length) {
	      j = i;
	      element = array[i];
	      while (j && comparefn(array[j - 1], element) > 0) {
	        array[j] = array[--j];
	      }
	      if (j !== i++) array[j] = element;
	    }
	  } else {
	    // merge sort
	    var middle = floor$1(length / 2);
	    var left = sort(arraySlice(array, 0, middle), comparefn);
	    var right = sort(arraySlice(array, middle), comparefn);
	    var llength = left.length;
	    var rlength = right.length;
	    var lindex = 0;
	    var rindex = 0;

	    while (lindex < llength || rindex < rlength) {
	      array[lindex + rindex] = (lindex < llength && rindex < rlength)
	        ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
	        : lindex < llength ? left[lindex++] : right[rindex++];
	    }
	  }

	  return array;
	};

	var arraySort = sort;

	var userAgent$1 = environmentUserAgent;

	var firefox = userAgent$1.match(/firefox\/(\d+)/i);

	var environmentFfVersion = !!firefox && +firefox[1];

	var UA = environmentUserAgent;

	var environmentIsIeOrEdge = /MSIE|Trident/.test(UA);

	var userAgent = environmentUserAgent;

	var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

	var environmentWebkitVersion = !!webkit && +webkit[1];

	var $$a = _export;
	var uncurryThis$b = functionUncurryThis;
	var aCallable$2 = aCallable$5;
	var toObject$5 = toObject$8;
	var lengthOfArrayLike$2 = lengthOfArrayLike$6;
	var deletePropertyOrThrow = deletePropertyOrThrow$1;
	var toString$6 = toString$7;
	var fails$d = fails$p;
	var internalSort = arraySort;
	var arrayMethodIsStrict$1 = arrayMethodIsStrict$4;
	var FF = environmentFfVersion;
	var IE_OR_EDGE = environmentIsIeOrEdge;
	var V8 = environmentV8Version;
	var WEBKIT = environmentWebkitVersion;

	var test = [];
	var nativeSort = uncurryThis$b(test.sort);
	var push$1 = uncurryThis$b(test.push);

	// IE8-
	var FAILS_ON_UNDEFINED = fails$d(function () {
	  test.sort(undefined);
	});
	// V8 bug
	var FAILS_ON_NULL = fails$d(function () {
	  test.sort(null);
	});
	// Old WebKit
	var STRICT_METHOD = arrayMethodIsStrict$1('sort');

	var STABLE_SORT = !fails$d(function () {
	  // feature detection can be too slow, so check engines versions
	  if (V8) return V8 < 70;
	  if (FF && FF > 3) return;
	  if (IE_OR_EDGE) return true;
	  if (WEBKIT) return WEBKIT < 603;

	  var result = '';
	  var code, chr, value, index;

	  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
	  for (code = 65; code < 76; code++) {
	    chr = String.fromCharCode(code);

	    switch (code) {
	      case 66: case 69: case 70: case 72: value = 3; break;
	      case 68: case 71: value = 4; break;
	      default: value = 2;
	    }

	    for (index = 0; index < 47; index++) {
	      test.push({ k: chr + index, v: value });
	    }
	  }

	  test.sort(function (a, b) { return b.v - a.v; });

	  for (index = 0; index < test.length; index++) {
	    chr = test[index].k.charAt(0);
	    if (result.charAt(result.length - 1) !== chr) result += chr;
	  }

	  return result !== 'DGBEFHACIJK';
	});

	var FORCED$4 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

	var getSortCompare = function (comparefn) {
	  return function (x, y) {
	    if (y === undefined) return -1;
	    if (x === undefined) return 1;
	    if (comparefn !== undefined) return +comparefn(x, y) || 0;
	    var xString = toString$6(x);
	    var yString = toString$6(y);
	    return xString === yString ? 0 : xString > yString ? 1 : -1;
	  };
	};

	// `Array.prototype.sort` method
	// https://tc39.es/ecma262/#sec-array.prototype.sort
	$$a({ target: 'Array', proto: true, forced: FORCED$4 }, {
	  sort: function sort(comparefn) {
	    if (comparefn !== undefined) aCallable$2(comparefn);

	    var array = toObject$5(this);

	    if (STABLE_SORT) return comparefn === undefined ? nativeSort(array) : nativeSort(array, comparefn);

	    var items = [];
	    var arrayLength = lengthOfArrayLike$2(array);
	    var itemsLength, index;

	    for (index = 0; index < arrayLength; index++) {
	      if (index in array) push$1(items, array[index]);
	    }

	    internalSort(items, getSortCompare(comparefn));

	    itemsLength = lengthOfArrayLike$2(items);
	    index = 0;

	    while (index < itemsLength) array[index] = items[index++];
	    while (index < arrayLength) deletePropertyOrThrow(array, index++);

	    return array;
	  }
	});

	var globalThis$7 = globalThis_1;

	var path$1 = globalThis$7;

	var uncurryThis$a = functionUncurryThis;
	var aCallable$1 = aCallable$5;

	var functionUncurryThisAccessor = function (object, key, method) {
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    return uncurryThis$a(aCallable$1(Object.getOwnPropertyDescriptor(object, key)[method]));
	  } catch (error) { /* empty */ }
	};

	var isObject$5 = isObject$d;

	var isPossiblePrototype$1 = function (argument) {
	  return isObject$5(argument) || argument === null;
	};

	var isPossiblePrototype = isPossiblePrototype$1;

	var $String = String;
	var $TypeError$3 = TypeError;

	var aPossiblePrototype$1 = function (argument) {
	  if (isPossiblePrototype(argument)) return argument;
	  throw new $TypeError$3("Can't set " + $String(argument) + ' as a prototype');
	};

	/* eslint-disable no-proto -- safe */
	var uncurryThisAccessor = functionUncurryThisAccessor;
	var isObject$4 = isObject$d;
	var requireObjectCoercible$3 = requireObjectCoercible$6;
	var aPossiblePrototype = aPossiblePrototype$1;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es/no-object-setprototypeof -- safe
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    requireObjectCoercible$3(O);
	    aPossiblePrototype(proto);
	    if (!isObject$4(O)) return O;
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var isCallable$5 = isCallable$i;
	var isObject$3 = isObject$d;
	var setPrototypeOf$1 = objectSetPrototypeOf;

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired$1 = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    setPrototypeOf$1 &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    isCallable$5(NewTarget = dummy.constructor) &&
	    NewTarget !== Wrapper &&
	    isObject$3(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) setPrototypeOf$1($this, NewTargetPrototype);
	  return $this;
	};

	var uncurryThis$9 = functionUncurryThis;

	// `thisNumberValue` abstract operation
	// https://tc39.es/ecma262/#sec-thisnumbervalue
	var thisNumberValue$1 = uncurryThis$9(1.1.valueOf);

	// a string of all valid unicode whitespaces
	var whitespaces$3 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var uncurryThis$8 = functionUncurryThis;
	var requireObjectCoercible$2 = requireObjectCoercible$6;
	var toString$5 = toString$7;
	var whitespaces$2 = whitespaces$3;

	var replace$2 = uncurryThis$8(''.replace);
	var ltrim = RegExp('^[' + whitespaces$2 + ']+');
	var rtrim = RegExp('(^|[^' + whitespaces$2 + '])[' + whitespaces$2 + ']+$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$1 = function (TYPE) {
	  return function ($this) {
	    var string = toString$5(requireObjectCoercible$2($this));
	    if (TYPE & 1) string = replace$2(string, ltrim, '');
	    if (TYPE & 2) string = replace$2(string, rtrim, '$1');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$1(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
	  end: createMethod$1(2),
	  // `String.prototype.trim` method
	  // https://tc39.es/ecma262/#sec-string.prototype.trim
	  trim: createMethod$1(3)
	};

	var $$9 = _export;
	var IS_PURE = isPure;
	var DESCRIPTORS$1 = descriptors;
	var globalThis$6 = globalThis_1;
	var path = path$1;
	var uncurryThis$7 = functionUncurryThis;
	var isForced = isForced_1;
	var hasOwn$3 = hasOwnProperty_1;
	var inheritIfRequired = inheritIfRequired$1;
	var isPrototypeOf$1 = objectIsPrototypeOf;
	var isSymbol = isSymbol$3;
	var toPrimitive = toPrimitive$2;
	var fails$c = fails$p;
	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var defineProperty$2 = objectDefineProperty.f;
	var thisNumberValue = thisNumberValue$1;
	var trim$1 = stringTrim.trim;

	var NUMBER = 'Number';
	var NativeNumber = globalThis$6[NUMBER];
	path[NUMBER];
	var NumberPrototype = NativeNumber.prototype;
	var TypeError$1 = globalThis$6.TypeError;
	var stringSlice$4 = uncurryThis$7(''.slice);
	var charCodeAt$1 = uncurryThis$7(''.charCodeAt);

	// `ToNumeric` abstract operation
	// https://tc39.es/ecma262/#sec-tonumeric
	var toNumeric = function (value) {
	  var primValue = toPrimitive(value, 'number');
	  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
	};

	// `ToNumber` abstract operation
	// https://tc39.es/ecma262/#sec-tonumber
	var toNumber = function (argument) {
	  var it = toPrimitive(argument, 'number');
	  var first, third, radix, maxCode, digits, length, index, code;
	  if (isSymbol(it)) throw new TypeError$1('Cannot convert a Symbol value to a number');
	  if (typeof it == 'string' && it.length > 2) {
	    it = trim$1(it);
	    first = charCodeAt$1(it, 0);
	    if (first === 43 || first === 45) {
	      third = charCodeAt$1(it, 2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (charCodeAt$1(it, 1)) {
	        // fast equal of /^0b[01]+$/i
	        case 66:
	        case 98:
	          radix = 2;
	          maxCode = 49;
	          break;
	        // fast equal of /^0o[0-7]+$/i
	        case 79:
	        case 111:
	          radix = 8;
	          maxCode = 55;
	          break;
	        default:
	          return +it;
	      }
	      digits = stringSlice$4(it, 2);
	      length = digits.length;
	      for (index = 0; index < length; index++) {
	        code = charCodeAt$1(digits, index);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	var FORCED$3 = isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'));

	var calledWithNew = function (dummy) {
	  // includes check on 1..constructor(foo) case
	  return isPrototypeOf$1(NumberPrototype, dummy) && fails$c(function () { thisNumberValue(dummy); });
	};

	// `Number` constructor
	// https://tc39.es/ecma262/#sec-number-constructor
	var NumberWrapper = function Number(value) {
	  var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
	  return calledWithNew(this) ? inheritIfRequired(Object(n), this, NumberWrapper) : n;
	};

	NumberWrapper.prototype = NumberPrototype;
	if (FORCED$3 && !IS_PURE) NumberPrototype.constructor = NumberWrapper;

	$$9({ global: true, constructor: true, wrap: true, forced: FORCED$3 }, {
	  Number: NumberWrapper
	});

	// Use `internal/copy-constructor-properties` helper in `core-js@4`
	var copyConstructorProperties = function (target, source) {
	  for (var keys = DESCRIPTORS$1 ? getOwnPropertyNames(source) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES2015 (in case, if modules with ES2015 Number statics required before):
	    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
	    // ESNext
	    'fromString,range'
	  ).split(','), j = 0, key; keys.length > j; j++) {
	    if (hasOwn$3(source, key = keys[j]) && !hasOwn$3(target, key)) {
	      defineProperty$2(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};
	if (FORCED$3 || IS_PURE) copyConstructorProperties(path[NUMBER], NativeNumber);

	var globalThis$5 = globalThis_1;
	var fails$b = fails$p;
	var uncurryThis$6 = functionUncurryThis;
	var toString$4 = toString$7;
	var trim = stringTrim.trim;
	var whitespaces$1 = whitespaces$3;

	var $parseInt$1 = globalThis$5.parseInt;
	var Symbol$1 = globalThis$5.Symbol;
	var ITERATOR$5 = Symbol$1 && Symbol$1.iterator;
	var hex = /^[+-]?0x/i;
	var exec$1 = uncurryThis$6(hex.exec);
	var FORCED$2 = $parseInt$1(whitespaces$1 + '08') !== 8 || $parseInt$1(whitespaces$1 + '0x16') !== 22
	  // MS Edge 18- broken with boxed symbols
	  || (ITERATOR$5 && !fails$b(function () { $parseInt$1(Object(ITERATOR$5)); }));

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	var numberParseInt = FORCED$2 ? function parseInt(string, radix) {
	  var S = trim(toString$4(string));
	  return $parseInt$1(S, (radix >>> 0) || (exec$1(hex, S) ? 16 : 10));
	} : $parseInt$1;

	var $$8 = _export;
	var $parseInt = numberParseInt;

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	$$8({ global: true, forced: parseInt !== $parseInt }, {
	  parseInt: $parseInt
	});

	var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
	var fails$a = fails$p;
	var whitespaces = whitespaces$3;

	var non = '\u200B\u0085\u180E';

	// check that a method works with the correct list
	// of whitespaces and has a correct name
	var stringTrimForced = function (METHOD_NAME) {
	  return fails$a(function () {
	    return !!whitespaces[METHOD_NAME]()
	      || non[METHOD_NAME]() !== non
	      || (PROPER_FUNCTION_NAME$1 && whitespaces[METHOD_NAME].name !== METHOD_NAME);
	  });
	};

	var $$7 = _export;
	var $trim = stringTrim.trim;
	var forcedStringTrimMethod = stringTrimForced;

	// `String.prototype.trim` method
	// https://tc39.es/ecma262/#sec-string.prototype.trim
	$$7({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	/* eslint-disable es/no-array-prototype-indexof -- required for testing */
	var $$6 = _export;
	var uncurryThis$5 = functionUncurryThisClause;
	var $indexOf = arrayIncludes.indexOf;
	var arrayMethodIsStrict = arrayMethodIsStrict$4;

	var nativeIndexOf = uncurryThis$5([].indexOf);

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
	var FORCED$1 = NEGATIVE_ZERO || !arrayMethodIsStrict('indexOf');

	// `Array.prototype.indexOf` method
	// https://tc39.es/ecma262/#sec-array.prototype.indexof
	$$6({ target: 'Array', proto: true, forced: FORCED$1 }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf(this, searchElement, fromIndex) || 0
	      : $indexOf(this, searchElement, fromIndex);
	  }
	});

	var anObject$5 = anObject$a;

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags$1 = function () {
	  var that = anObject$5(this);
	  var result = '';
	  if (that.hasIndices) result += 'd';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.unicodeSets) result += 'v';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var fails$9 = fails$p;
	var globalThis$4 = globalThis_1;

	// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	var $RegExp$2 = globalThis$4.RegExp;

	var UNSUPPORTED_Y$1 = fails$9(function () {
	  var re = $RegExp$2('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') !== null;
	});

	// UC Browser bug
	// https://github.com/zloirock/core-js/issues/1008
	var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$9(function () {
	  return !$RegExp$2('a', 'y').sticky;
	});

	var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$9(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = $RegExp$2('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') !== null;
	});

	var regexpStickyHelpers = {
	  BROKEN_CARET: BROKEN_CARET,
	  MISSED_STICKY: MISSED_STICKY,
	  UNSUPPORTED_Y: UNSUPPORTED_Y$1
	};

	var fails$8 = fails$p;
	var globalThis$3 = globalThis_1;

	// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
	var $RegExp$1 = globalThis$3.RegExp;

	var regexpUnsupportedDotAll = fails$8(function () {
	  var re = $RegExp$1('.', 's');
	  return !(re.dotAll && re.test('\n') && re.flags === 's');
	});

	var fails$7 = fails$p;
	var globalThis$2 = globalThis_1;

	// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
	var $RegExp = globalThis$2.RegExp;

	var regexpUnsupportedNcg = fails$7(function () {
	  var re = $RegExp('(?<a>b)', 'g');
	  return re.exec('b').groups.a !== 'b' ||
	    'b'.replace(re, '$<a>c') !== 'bc';
	});

	/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
	/* eslint-disable regexp/no-useless-quantifier -- testing */
	var call$a = functionCall;
	var uncurryThis$4 = functionUncurryThis;
	var toString$3 = toString$7;
	var regexpFlags = regexpFlags$1;
	var stickyHelpers = regexpStickyHelpers;
	var shared = shared$4;
	var create$1 = objectCreate;
	var getInternalState$1 = internalState.get;
	var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG = regexpUnsupportedNcg;

	var nativeReplace = shared('native-string-replace', String.prototype.replace);
	var nativeExec = RegExp.prototype.exec;
	var patchedExec = nativeExec;
	var charAt$4 = uncurryThis$4(''.charAt);
	var indexOf = uncurryThis$4(''.indexOf);
	var replace$1 = uncurryThis$4(''.replace);
	var stringSlice$3 = uncurryThis$4(''.slice);

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  call$a(nativeExec, re1, 'a');
	  call$a(nativeExec, re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

	var setGroups = function (re, groups) {
	  var object = re.groups = create$1(null);
	  for (var i = 0; i < groups.length; i++) {
	    var group = groups[i];
	    object[group[0]] = re[group[1]];
	  }
	};

	if (PATCH) {
	  patchedExec = function exec(string) {
	    var re = this;
	    var state = getInternalState$1(re);
	    var str = toString$3(string);
	    var raw = state.raw;
	    var result, reCopy, lastIndex;

	    if (raw) {
	      raw.lastIndex = re.lastIndex;
	      result = call$a(patchedExec, raw, str);
	      re.lastIndex = raw.lastIndex;

	      if (result && state.groups) setGroups(result, state.groups);

	      return result;
	    }

	    var groups = state.groups;
	    var sticky = UNSUPPORTED_Y && re.sticky;
	    var flags = call$a(regexpFlags, re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = replace$1(flags, 'y', '');
	      if (indexOf(flags, 'g') === -1) {
	        flags += 'g';
	      }

	      strCopy = stringSlice$3(str, re.lastIndex);
	      // Support anchored sticky behavior.
	      var prevChar = re.lastIndex > 0 && charAt$4(str, re.lastIndex - 1);
	      if (re.lastIndex > 0 &&
	        (!re.multiline || re.multiline && prevChar !== '\n' && prevChar !== '\r' && prevChar !== '\u2028' && prevChar !== '\u2029')) {
	        source = '(?: (?:' + source + '))';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    var match = call$a(nativeExec, sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = str;
	        match[0] = stringSlice$3(match[0], charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
	      call$a(nativeReplace, match[0], reCopy, function () {
	        for (var i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    if (match && groups) setGroups(match, groups);

	    return match;
	  };
	}

	var regexpExec$2 = patchedExec;

	var $$5 = _export;
	var exec = regexpExec$2;

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	$$5({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
	  exec: exec
	});

	var NATIVE_BIND = functionBindNative;

	var FunctionPrototype = Function.prototype;
	var apply$1 = FunctionPrototype.apply;
	var call$9 = FunctionPrototype.call;

	// eslint-disable-next-line es/no-function-prototype-bind, es/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call$9.bind(apply$1) : function () {
	  return call$9.apply(apply$1, arguments);
	});

	// TODO: Remove from `core-js@4` since it's moved to entry points

	var call$8 = functionCall;
	var defineBuiltIn$2 = defineBuiltIn$5;
	var regexpExec$1 = regexpExec$2;
	var fails$6 = fails$p;
	var wellKnownSymbol$8 = wellKnownSymbol$g;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;

	var SPECIES = wellKnownSymbol$8('species');
	var RegExpPrototype$1 = RegExp.prototype;

	var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
	  var SYMBOL = wellKnownSymbol$8(KEY);

	  var DELEGATES_TO_SYMBOL = !fails$6(function () {
	    // String methods call symbol-named RegExp methods
	    var O = {};
	    // eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) !== 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$6(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      var constructor = {};
	      // eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
	      constructor[SPECIES] = function () { return re; };
	      re = { constructor: constructor, flags: '' };
	      // eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () {
	      execCalled = true;
	      return null;
	    };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    FORCED
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      var $exec = regexp.exec;
	      if ($exec === regexpExec$1 || $exec === RegExpPrototype$1.exec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: call$8(nativeRegExpMethod, regexp, str, arg2) };
	        }
	        return { done: true, value: call$8(nativeMethod, str, regexp, arg2) };
	      }
	      return { done: false };
	    });

	    defineBuiltIn$2(String.prototype, KEY, methods[0]);
	    defineBuiltIn$2(RegExpPrototype$1, SYMBOL, methods[1]);
	  }

	  if (SHAM) createNonEnumerableProperty$1(RegExpPrototype$1[SYMBOL], 'sham', true);
	};

	var uncurryThis$3 = functionUncurryThis;
	var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
	var toString$2 = toString$7;
	var requireObjectCoercible$1 = requireObjectCoercible$6;

	var charAt$3 = uncurryThis$3(''.charAt);
	var charCodeAt = uncurryThis$3(''.charCodeAt);
	var stringSlice$2 = uncurryThis$3(''.slice);

	var createMethod = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString$2(requireObjectCoercible$1($this));
	    var position = toIntegerOrInfinity$1(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt$3(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice$2(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod(true)
	};

	var charAt$2 = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex$1 = function (S, index, unicode) {
	  return index + (unicode ? charAt$2(S, index).length || 1 : 1);
	};

	var uncurryThis$2 = functionUncurryThis;
	var toObject$4 = toObject$8;

	var floor = Math.floor;
	var charAt$1 = uncurryThis$2(''.charAt);
	var replace = uncurryThis$2(''.replace);
	var stringSlice$1 = uncurryThis$2(''.slice);
	// eslint-disable-next-line redos/no-vulnerable -- safe
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

	// `GetSubstitution` abstract operation
	// https://tc39.es/ecma262/#sec-getsubstitution
	var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
	  var tailPos = position + matched.length;
	  var m = captures.length;
	  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	  if (namedCaptures !== undefined) {
	    namedCaptures = toObject$4(namedCaptures);
	    symbols = SUBSTITUTION_SYMBOLS;
	  }
	  return replace(replacement, symbols, function (match, ch) {
	    var capture;
	    switch (charAt$1(ch, 0)) {
	      case '$': return '$';
	      case '&': return matched;
	      case '`': return stringSlice$1(str, 0, position);
	      case "'": return stringSlice$1(str, tailPos);
	      case '<':
	        capture = namedCaptures[stringSlice$1(ch, 1, -1)];
	        break;
	      default: // \d\d?
	        var n = +ch;
	        if (n === 0) return match;
	        if (n > m) {
	          var f = floor(n / 10);
	          if (f === 0) return match;
	          if (f <= m) return captures[f - 1] === undefined ? charAt$1(ch, 1) : captures[f - 1] + charAt$1(ch, 1);
	          return match;
	        }
	        capture = captures[n - 1];
	    }
	    return capture === undefined ? '' : capture;
	  });
	};

	var globalThis$1 = globalThis_1;
	var fails$5 = fails$p;

	// babel-minify and Closure Compiler transpiles RegExp('.', 'd') -> /./d and it causes SyntaxError
	var RegExp$1 = globalThis$1.RegExp;

	var FLAGS_GETTER_IS_CORRECT = !fails$5(function () {
	  var INDICES_SUPPORT = true;
	  try {
	    RegExp$1('.', 'd');
	  } catch (error) {
	    INDICES_SUPPORT = false;
	  }

	  var O = {};
	  // modern V8 bug
	  var calls = '';
	  var expected = INDICES_SUPPORT ? 'dgimsy' : 'gimsy';

	  var addGetter = function (key, chr) {
	    // eslint-disable-next-line es/no-object-defineproperty -- safe
	    Object.defineProperty(O, key, { get: function () {
	      calls += chr;
	      return true;
	    } });
	  };

	  var pairs = {
	    dotAll: 's',
	    global: 'g',
	    ignoreCase: 'i',
	    multiline: 'm',
	    sticky: 'y'
	  };

	  if (INDICES_SUPPORT) pairs.hasIndices = 'd';

	  for (var key in pairs) addGetter(key, pairs[key]);

	  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	  var result = Object.getOwnPropertyDescriptor(RegExp$1.prototype, 'flags').get.call(O);

	  return result !== expected || calls !== expected;
	});

	var regexpFlagsDetection = { correct: FLAGS_GETTER_IS_CORRECT };

	var call$7 = functionCall;
	var hasOwn$2 = hasOwnProperty_1;
	var isPrototypeOf = objectIsPrototypeOf;
	var regExpFlagsDetection = regexpFlagsDetection;
	var regExpFlagsGetterImplementation = regexpFlags$1;

	var RegExpPrototype = RegExp.prototype;

	var regexpGetFlags = regExpFlagsDetection.correct ? function (it) {
	  return it.flags;
	} : function (it) {
	  return (!regExpFlagsDetection.correct && isPrototypeOf(RegExpPrototype, it) && !hasOwn$2(it, 'flags'))
	    ? call$7(regExpFlagsGetterImplementation, it)
	    : it.flags;
	};

	var call$6 = functionCall;
	var anObject$4 = anObject$a;
	var isCallable$4 = isCallable$i;
	var classof$1 = classofRaw$2;
	var regexpExec = regexpExec$2;

	var $TypeError$2 = TypeError;

	// `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (isCallable$4(exec)) {
	    var result = call$6(exec, R, S);
	    if (result !== null) anObject$4(result);
	    return result;
	  }
	  if (classof$1(R) === 'RegExp') return call$6(regexpExec, R, S);
	  throw new $TypeError$2('RegExp#exec called on incompatible receiver');
	};

	var apply = functionApply;
	var call$5 = functionCall;
	var uncurryThis$1 = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
	var fails$4 = fails$p;
	var anObject$3 = anObject$a;
	var isCallable$3 = isCallable$i;
	var isObject$2 = isObject$d;
	var toIntegerOrInfinity = toIntegerOrInfinity$4;
	var toLength = toLength$2;
	var toString$1 = toString$7;
	var requireObjectCoercible = requireObjectCoercible$6;
	var advanceStringIndex = advanceStringIndex$1;
	var getMethod$2 = getMethod$4;
	var getSubstitution = getSubstitution$1;
	var getRegExpFlags = regexpGetFlags;
	var regExpExec = regexpExecAbstract;
	var wellKnownSymbol$7 = wellKnownSymbol$g;

	var REPLACE = wellKnownSymbol$7('replace');
	var max = Math.max;
	var min = Math.min;
	var concat$1 = uncurryThis$1([].concat);
	var push = uncurryThis$1([].push);
	var stringIndexOf = uncurryThis$1(''.indexOf);
	var stringSlice = uncurryThis$1(''.slice);

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }
	  return false;
	})();

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$4(function () {
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
	  return ''.replace(re, '$<a>') !== '7';
	});

	// @@replace logic
	fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

	  return [
	    // `String.prototype.replace` method
	    // https://tc39.es/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible(this);
	      var replacer = isObject$2(searchValue) ? getMethod$2(searchValue, REPLACE) : undefined;
	      return replacer
	        ? call$5(replacer, searchValue, O, replaceValue)
	        : call$5(nativeReplace, toString$1(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
	    function (string, replaceValue) {
	      var rx = anObject$3(this);
	      var S = toString$1(string);

	      var functionalReplace = isCallable$3(replaceValue);
	      if (!functionalReplace) replaceValue = toString$1(replaceValue);
	      var flags = toString$1(getRegExpFlags(rx));

	      if (
	        typeof replaceValue == 'string' &&
	        !~stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) &&
	        !~stringIndexOf(replaceValue, '$<') &&
	        !~stringIndexOf(flags, 'y')
	      ) {
	        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
	        if (res.done) return res.value;
	      }

	      var global = !!~stringIndexOf(flags, 'g');
	      var fullUnicode;
	      if (global) {
	        fullUnicode = !!~stringIndexOf(flags, 'u') || !!~stringIndexOf(flags, 'v');
	        rx.lastIndex = 0;
	      }

	      var results = [];
	      var result;
	      while (true) {
	        result = regExpExec(rx, S);
	        if (result === null) break;

	        push(results, result);
	        if (!global) break;

	        var matchStr = toString$1(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = toString$1(result[0]);
	        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
	        var captures = [];
	        var replacement;
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = concat$1([matched], captures, position, S);
	          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
	          replacement = toString$1(apply(replaceValue, undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }

	      return accumulatedResult + stringSlice(S, nextSourcePosition);
	    }
	  ];
	}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

	function videoScreenShot(video) {
	  var screen_width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 320;
	  var canvas = document.createElement('canvas');
	  var context = canvas.getContext('2d');
	  var scale = screen_width / video.videoWidth;
	  var width = Math.round(video.videoWidth * scale);
	  var height = Math.round(video.videoHeight * scale);
	  canvas.width = width;
	  canvas.height = height;
	  try {
	    context.drawImage(video, 0, 0, width, height);
	  } catch (e) {
	    console.error('Shots', 'video screenshot error:', e.message);
	  }
	  return canvas.toDataURL('image/png');
	}
	function videoReplaceStatus(from, to) {
	  to.status = from.status;
	  to.screen = from.screen;
	  to.file = from.file;
	}
	function getBalanser(card) {
	  var history_data = Lampa.Storage.get('online_watched_last', '{}');
	  var history_key = Lampa.Utils.hash(card.name ? card.original_name : card.original_title);
	  var history_item = history_data[history_key];
	  return history_item && history_item.balanser ? history_item.balanser : '';
	}
	function shortVoice(voice) {
	  return (voice || '').replace(/\s[^a-zA-Zа-яА-Я0-9].*$/, '').trim();
	}
	function isTSQuality(str) {
	  return str.toLowerCase().indexOf(' ts') > -1 || str.toLowerCase().indexOf(' ad') > -1;
	}
	function modal(html, buttons, back) {
	  var body = $('<div></div>');
	  var footer = $('<div class="shots-modal-footer"></div>');
	  body.append(html);
	  body.append(footer);
	  buttons.forEach(function (button) {
	    var btn = Lampa.Template.get('shots_button', {
	      text: button.name
	    });
	    btn.on('hover:enter', function () {
	      if (button.onSelect) button.onSelect();
	    });
	    if (button.cancel) btn.addClass('shots-selector--transparent');
	    footer.append(btn);
	  });
	  Lampa.Modal.open({
	    html: body,
	    size: 'small',
	    scroll: {
	      nopadding: true
	    },
	    onBack: back
	  });
	}
	var Utils = {
	  videoScreenShot: videoScreenShot,
	  videoReplaceStatus: videoReplaceStatus,
	  getBalanser: getBalanser,
	  shortVoice: shortVoice,
	  isTSQuality: isTSQuality,
	  modal: modal
	};

	var Defined = {
	  quota_next_record: 1000 * 60 * 10,
	  // 10 минут
	  video_size: 1280,
	  screen_size: 500,
	  recorder_max_duration: 60 * 5,
	  // 5 минут
	  cdn: 'https://cdn.cub.rip/shots/'
	};

	function counter(method, v1, v2, v3) {
	  $.ajax({
	    dataType: 'json',
	    url: Lampa.Utils.protocol() + Lampa.Manifest.cub_domain + '/api/metric/stat?method=' + method + '&value_one=' + (v1 || '') + '&value_two=' + (v2 || '') + '&value_three=' + (v3 || '')
	  });
	}
	var Metric = {
	  counter: counter
	};

	function Recorder(video) {
	  this.html = Lampa.Template.get('shots_player_recorder');
	  var start_point = video.currentTime;
	  this.start = function () {
	    Metric.counter('shots_recorder_start');
	    try {
	      this.screenshot = Utils.videoScreenShot(video, Defined.screen_size);
	      this.run();
	    } catch (e) {
	      console.error('Recorder', e.message);
	      this.error(e);
	    }
	  };
	  this.run = function () {
	    var _this = this;
	    $('body').append(this.html);
	    var button_stop = this.html.find('.shots-player-recorder__stop');
	    var button_forward = this.html.find('.shots-player-recorder__forward');
	    var button_rewind = this.html.find('.shots-player-recorder__rewind');
	    button_stop.on('hover:enter', this.stop.bind(this));
	    button_forward.on('hover:enter', function () {
	      if (video.currentTime < start_point + Defined.recorder_max_duration) {
	        video.currentTime += 5;
	        _this.tik();
	      }
	    });
	    button_rewind.on('hover:enter', function () {
	      if (video.currentTime - 10 > start_point) {
	        video.currentTime -= 5;
	        _this.tik();
	      }
	    });
	    Lampa.Controller.add('recorder', {
	      toggle: function toggle() {
	        Lampa.Controller.collectionSet(_this.html);
	        Lampa.Controller.collectionFocus(button_stop, _this.html);
	      },
	      left: function left() {
	        Navigator.move('left');
	      },
	      right: function right() {
	        Navigator.move('right');
	      },
	      back: this.stop.bind(this)
	    });
	    Lampa.Controller.toggle('recorder');
	    this.interval = setInterval(this.tik.bind(this), 1000);
	    this.tik();
	    this.onRun();
	  };
	  this.tik = function () {
	    var seconds = Math.round(video.currentTime - start_point);
	    var progress = Lampa.Utils.secondsToTime(seconds).split(':');
	    progress = progress[1] + ':' + progress[2];
	    this.html.find('.shots-player-recorder__text span').text(progress + ' / ' + Lampa.Utils.secondsToTimeHuman(Defined.recorder_max_duration));
	    if (seconds >= Defined.recorder_max_duration) this.stop();
	  };
	  this.error = function (e) {
	    this.destroy();
	    this.onError(e);
	    Metric.counter('shots_recorder_error');
	  };
	  this.stop = function () {
	    var elapsed = video.currentTime - start_point;
	    if (elapsed < 1) {
	      this.error(new Error('Stoped too early, maybe codecs not supported'));
	    } else {
	      this.destroy();
	      this.onStop({
	        duration: Math.round(elapsed),
	        screenshot: this.screenshot,
	        start_point: Math.round(start_point),
	        end_point: Math.round(video.currentTime)
	      });
	      Metric.counter('shots_recorder_end');
	    }
	  };
	  this.destroy = function () {
	    clearInterval(this.interval);
	    this.html.remove();
	  };
	}

	function Tags$1() {
	  var tags_data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	  this.html = Lampa.Template.get('shots_tags');
	  this.create = function () {
	    if (tags_data) this.update(tags_data);
	  };
	  this.update = function (data) {
	    var tags = [];
	    this.html.empty();
	    data.season && tags.push('S-' + data.season);
	    data.episode && tags.push('E-' + data.episode);
	    var voice = Utils.shortVoice(data.voice_name);
	    if (data.voice_name && voice !== data.card_title) tags.push(voice);
	    this.html.append(tags.map(function (tag) {
	      return '<div>' + tag + '</div>';
	    }).join(''));
	  };
	  this.render = function () {
	    return this.html;
	  };
	  this.destroy = function () {
	    this.html.remove();
	  };
	}

	function Preview(data) {
	  this.data = data;
	  this.html = Lampa.Template.get('shots_preview');
	  this.create = function () {
	    if (this.data.recording.screenshot) {
	      this.html.find('.shots-preview__screenshot img').css({
	        opacity: 1
	      }).eq(0)[0].src = this.data.recording.screenshot;
	    }
	    var release_date = this.data.play_data.card.release_date || this.data.play_data.card.first_air_date || '';
	    var year = release_date.slice(0, 4);
	    this.html.find('.shots-preview__year').html(year || '----');
	    this.html.find('.shots-preview__title').html(this.data.play_data.card.name || this.data.play_data.card.title || '');
	    this.tags = new Tags$1(this.data.play_data);
	    this.tags.create();
	    this.html.find('.shots-preview__body').append(this.tags.render());
	  };
	  this.render = function () {
	    return this.html;
	  };
	  this.destroy = function () {
	    this.html.remove();
	  };
	}

	function Checkbox() {
	  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  this.html = Lampa.Template.get('shots_checkbox');
	  this.state = params.state || false;
	  this.create = function () {
	    var _this = this;
	    this.setText(params.text || '');
	    this.setState(this.state);
	    this.html.on('hover:enter', function () {
	      _this.setState(!_this.state);
	    });
	  };
	  this.setText = function (text) {
	    this.html.find('.shots-checkbox__text').html(text);
	  };
	  this.setState = function (state) {
	    this.state = state;
	    this.html.toggleClass('shots-checkbox--checked', state);
	  };
	  this.render = function () {
	    return this.html;
	  };
	  this.destroy = function () {
	    this.html.remove();
	  };
	}

	function url(u) {
	  //return 'http://localhost:3100/api/shots/' + u
	  return Lampa.Utils.protocol() + Lampa.Manifest.cub_domain + '/api/shots/' + u;
	}
	function params() {
	  var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 15000;
	  if (!Lampa.Account.Permit.account.token) return {
	    timeout: timeout
	  };
	  return {
	    headers: {
	      token: Lampa.Account.Permit.account.token,
	      profile: Lampa.Account.Permit.account.profile.id
	    },
	    timeout: timeout
	  };
	}
	function uploadRequest(data, onsuccess, onerror) {
	  Lampa.Network.silent(url('upload-request'), onsuccess, onerror, data, params());
	}
	function uploadStatus(id, onsuccess, onerror) {
	  Lampa.Network.silent(url('upload-status/' + id), onsuccess, onerror, null, params(5000));
	}
	function shotsVideo(id, onsuccess, onerror) {
	  Lampa.Network.silent(url('video/' + id), onsuccess, onerror, null, params(5000));
	}
	function shotsList(type) {
	  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	  var onsuccess = arguments.length > 2 ? arguments[2] : undefined;
	  var onerror = arguments.length > 3 ? arguments[3] : undefined;
	  Lampa.Network.silent(url('list/' + type + '?page=' + page), onsuccess, onerror, null, params(5000));
	}
	function shotsCard(card) {
	  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	  var onsuccess = arguments.length > 2 ? arguments[2] : undefined;
	  var onerror = arguments.length > 3 ? arguments[3] : undefined;
	  Lampa.Network.silent(url('card/' + card.id + '/' + (card.original_name ? 'tv' : 'movie') + '?page=' + page), onsuccess, onerror, null, params(5000));
	}
	function shotsChannel(id) {
	  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	  var onsuccess = arguments.length > 2 ? arguments[2] : undefined;
	  var onerror = arguments.length > 3 ? arguments[3] : undefined;
	  Lampa.Network.silent(url('channel/' + id + '?page=' + page), onsuccess, onerror, null, params(10000));
	}
	function shotsLiked(id, type, onsuccess, onerror) {
	  var uid = Lampa.Storage.get('lampa_uid', '');
	  Lampa.Network.silent(url('liked?uid=' + uid), onsuccess, onerror, {
	    id: id,
	    type: type
	  }, params(5000));
	}
	function shotsBlock(id, onsuccess, onerror) {
	  Lampa.Network.silent(url('block'), onsuccess, onerror, {
	    id: id
	  }, params());
	}
	function shotsReport$1(id, onsuccess, onerror) {
	  Lampa.Network.silent(url('report'), onsuccess, onerror, {
	    id: id
	  }, params());
	}
	function shotsDelete$1(id, onsuccess, onerror) {
	  Lampa.Network.silent(url('delete'), onsuccess, onerror, {
	    id: id
	  }, params());
	}
	function shotsFavorite(action, shot, onsuccess, onerror) {
	  Lampa.Network.silent(url('favorite'), onsuccess, onerror, {
	    sid: shot.id,
	    card_title: shot.card_title,
	    card_poster: shot.card_poster,
	    action: action
	  }, params(5000));
	}
	function lenta() {
	  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var onsuccess = arguments.length > 1 ? arguments[1] : undefined;
	  var uid = Lampa.Storage.get('lampa_uid', '');
	  Lampa.Arrays.extend(query, {
	    page: 1,
	    sort: 'id',
	    uid: uid,
	    limit: 20
	  });
	  var path = [];
	  for (var key in query) {
	    path.push(key + '=' + encodeURIComponent(query[key]));
	  }
	  Lampa.Network.silent(url('lenta?' + path.join('&')), function (result) {
	    onsuccess(result.results);
	  }, function () {
	    onsuccess([]);
	  }, null, params(10000));
	}
	function shotsViewed(id, onsuccess, onerror) {
	  var uid = Lampa.Storage.get('lampa_uid', '');
	  Lampa.Network.silent(url('viewed?uid=' + uid), onsuccess, onerror, {
	    id: id
	  }, params(5000));
	}
	var Api = {
	  uploadRequest: uploadRequest,
	  uploadStatus: uploadStatus,
	  shotsList: shotsList,
	  shotsLiked: shotsLiked,
	  shotsFavorite: shotsFavorite,
	  shotsVideo: shotsVideo,
	  shotsBlock: shotsBlock,
	  shotsReport: shotsReport$1,
	  shotsDelete: shotsDelete$1,
	  shotsCard: shotsCard,
	  shotsChannel: shotsChannel,
	  shotsViewed: shotsViewed,
	  lenta: lenta
	};

	function Progress() {
	  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  this.html = Lampa.Template.get('shots_progress');
	  this.text = params.text || '';
	  this.create = function () {
	    this.setText(this.text);
	    this.setProgress(0);
	    this.setState('waiting');
	  };
	  this.setText = function (text) {
	    this.text = text;
	    this.html.find('.shots-progress__text').text(this.text);
	  };
	  this.setProgress = function (percent) {
	    this.html.find('.shots-progress__bar div').css('width', percent + '%');
	  };
	  this.setState = function (state) {
	    this.html.removeClass('state--waiting state--uploading state--done');
	    this.html.addClass('state--' + state);
	  };
	  this.render = function () {
	    return this.html;
	  };
	  this.destroy = function () {
	    this.html.remove();
	  };
	}

	function _defineProperty(e, r, t) {
	  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
	    value: t,
	    enumerable: !0,
	    configurable: !0,
	    writable: !0
	  }) : e[r] = t, e;
	}
	function ownKeys(e, r) {
	  var t = Object.keys(e);
	  if (Object.getOwnPropertySymbols) {
	    var o = Object.getOwnPropertySymbols(e);
	    r && (o = o.filter(function (r) {
	      return Object.getOwnPropertyDescriptor(e, r).enumerable;
	    })), t.push.apply(t, o);
	  }
	  return t;
	}
	function _objectSpread2(e) {
	  for (var r = 1; r < arguments.length; r++) {
	    var t = null != arguments[r] ? arguments[r] : {};
	    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
	      _defineProperty(e, r, t[r]);
	    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
	      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
	    });
	  }
	  return e;
	}
	function _toPrimitive(t, r) {
	  if ("object" != typeof t || !t) return t;
	  var e = t[Symbol.toPrimitive];
	  if (void 0 !== e) {
	    var i = e.call(t, r || "default");
	    if ("object" != typeof i) return i;
	    throw new TypeError("@@toPrimitive must return a primitive value.");
	  }
	  return ("string" === r ? String : Number)(t);
	}
	function _toPropertyKey(t) {
	  var i = _toPrimitive(t, "string");
	  return "symbol" == typeof i ? i : i + "";
	}

	var shots$1 = {};
	function init$5() {
	  Lampa.Timer.add(1000 * 60, function () {
	    for (var i in shots$1) {
	      check(shots$1[i]);
	    }
	  });
	}
	function check(shot) {
	  if (shot.status == 'ready' || shot.status == 'error') return stop(shot);
	  Api.uploadStatus(shot.id, function (json) {
	    if (json.status == 'ready') {
	      Lampa.Bell.push({
	        icon: '<svg><use xlink:href="#sprite-shots"></use></svg>',
	        text: Lampa.Lang.translate('shots_upload_complete_notify')
	      });
	    }
	    if (json.status == 'error') {
	      Lampa.Bell.push({
	        icon: '<svg><use xlink:href="#sprite-shots"></use></svg>',
	        text: Lampa.Lang.translate('shots_upload_error_notify')
	      });
	    }
	    if (json.status == 'ready' || json.status == 'error') stop(shot);
	    Lampa.Listener.send('shots_status', _objectSpread2({}, json));
	  });
	}
	function add$3(shot) {
	  if (!shots$1[shot.id]) shots$1[shot.id] = shot;
	}
	function stop(shot) {
	  delete shots$1[shot.id];
	}
	var Handler = {
	  init: init$5,
	  add: add$3,
	  stop: stop
	};

	var DESCRIPTORS = descriptors;
	var uncurryThis = functionUncurryThis;
	var call$4 = functionCall;
	var fails$3 = fails$p;
	var objectKeys = objectKeys$2;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var toObject$3 = toObject$8;
	var IndexedObject = indexedObject;

	// eslint-disable-next-line es/no-object-assign -- safe
	var $assign = Object.assign;
	// eslint-disable-next-line es/no-object-defineproperty -- required for testing
	var defineProperty$1 = Object.defineProperty;
	var concat = uncurryThis([].concat);

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	var objectAssign = !$assign || fails$3(function () {
	  // should have correct order of operations (Edge bug)
	  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty$1({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$1(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line es/no-symbol -- safe
	  var symbol = Symbol('assign detection');
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  // eslint-disable-next-line es/no-array-prototype-foreach -- safe
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join('') !== alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
	  var T = toObject$3(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  var propertyIsEnumerable = propertyIsEnumerableModule.f;
	  while (argumentsLength > index) {
	    var S = IndexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!DESCRIPTORS || call$4(propertyIsEnumerable, S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;

	var $$4 = _export;
	var assign = objectAssign;

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	// eslint-disable-next-line es/no-object-assign -- required for testing
	$$4({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign }, {
	  assign: assign
	});

	var created = [];
	function init$4() {
	  created = Lampa.Storage.get('shots_created', '[]');
	  update$1();
	  Lampa.Listener.follow('shots_status', updateStatus$1);
	  Lampa.Listener.follow('shots_update', updateData$1);
	  Lampa.Listener.follow('state:changed', function (e) {
	    if (e.target == 'favorite' && (e.reason == 'profile' || e.reason == 'read')) {
	      created = [];
	      update$1();
	    }
	  });
	  Lampa.Socket.listener.follow('message', function (result) {
	    if (result.method == 'update' && result.data.from == 'shots' && result.data.list == 'created') {
	      update$1();
	    }
	  });
	}
	function updateStatus$1(shot) {
	  var find = created.find(function (a) {
	    return a.id == shot.id;
	  });
	  if (find) {
	    find.status = shot.status;
	    find.screen = shot.screen;
	    find.file = shot.file;
	    Lampa.Storage.set('shots_created', created);
	  }
	}
	function updateData$1(shot) {
	  var find = created.find(function (a) {
	    return a.id == shot.id;
	  });
	  if (find) {
	    find.liked = shot.liked;
	    find.saved = shot.saved;
	    Lampa.Storage.set('shots_created', created);
	  }
	}
	function update$1() {
	  Api.shotsList('created', 1, function (shots) {
	    created = shots.results;
	    Lampa.Storage.set('shots_created', created);
	  });
	}
	function add$2(shot) {
	  var clone = {};
	  Object.assign(clone, shot);
	  delete clone.params;
	  Lampa.Arrays.insert(created, 0, clone);
	  if (created.length > 20) {
	    created = created.slice(0, 20);
	  }
	  Lampa.Storage.set('shots_created', created);
	  Lampa.Socket.send('update', {
	    params: {
	      from: 'shots',
	      list: 'created'
	    }
	  });
	}
	function remove$3(shot) {
	  var find_in = created.find(function (a) {
	    return a.id == shot.id;
	  });
	  if (find_in) Lampa.Arrays.remove(created, find_in);
	  Lampa.Storage.set('shots_created', created);
	  Lampa.Listener.send('shots_status', {
	    id: shot.id,
	    status: 'deleted',
	    file: shot.file,
	    screen: shot.screen
	  });
	  Lampa.Socket.send('update', {
	    params: {
	      from: 'shots',
	      list: 'created'
	    }
	  });
	}
	function page$1(page, callback) {
	  Api.shotsList('created', page, function (shots) {
	    callback(shots.results);
	  }, function () {
	    callback([]);
	  });
	}
	function get$2() {
	  return Lampa.Arrays.clone(created);
	}
	function find$2(id) {
	  return Boolean(created.find(function (a) {
	    return a.id == id;
	  }));
	}
	var Created = {
	  init: init$4,
	  remove: remove$3,
	  add: add$2,
	  get: get$2,
	  find: find$2,
	  page: page$1
	};

	function Selector(list) {
	  this.html = $('<div class="shots-selector-tags"></div>');
	  this.list = list || [];
	  this.selected = [];
	  this.create = function () {
	    var _this = this;
	    this.list.forEach(function (t) {
	      var tag = $('<div class="shots-selector-tags__tag selector"><span>' + t.title + '</span></div>');
	      tag.on('hover:enter', function (e) {
	        tag.toggleClass('active');
	        if (_this.selected.indexOf(t) == -1) {
	          _this.selected.push(t);
	        } else {
	          Lampa.Arrays.remove(_this.selected, t);
	        }
	      });
	      _this.html.append(tag);
	    });
	  };
	  this.get = function () {
	    return this.selected;
	  };
	  this.render = function () {
	    return this.html;
	  };
	  this.destroy = function () {
	    this.html.remove();
	  };
	}

	var tags = [{
	  id: 1,
	  slug: 'action'
	}, {
	  id: 2,
	  slug: 'comedy'
	}, {
	  id: 3,
	  slug: 'drama'
	}, {
	  id: 4,
	  slug: 'fantasy'
	}, {
	  id: 5,
	  slug: 'horror'
	}, {
	  id: 6,
	  slug: 'thriller'
	}, {
	  id: 7,
	  slug: 'anime'
	}, {
	  id: 8,
	  slug: 'sci_fi'
	}];
	function load$1() {
	  tags = translate(tags);
	}
	function translate(list) {
	  return list.map(function (t) {
	    t.title = Lampa.Lang.translate('shots_tag_' + t.slug);
	    return t;
	  });
	}
	function list() {
	  return tags;
	}
	var Tags = {
	  load: load$1,
	  list: list,
	  translate: translate
	};

	function Upload(data) {
	  this.data = data;
	  this.html = Lampa.Template.get('shots_modal_upload');
	  this.start = function () {
	    var _this = this;
	    this.preview = new Preview(this.data);
	    this.checkbox = new Checkbox({
	      text: Lampa.Lang.translate('Сделать публичной'),
	      state: true
	    });
	    this.progress = new Progress({
	      text: Lampa.Lang.translate('shots_upload_progress_start')
	    });
	    this.selector_title = $('<div class="shots-line-title">' + Lampa.Lang.translate('shots_choice_tags') + '</div>');
	    this.selector = new Selector(Tags.list());
	    this.checkbox.create();
	    this.preview.create();
	    this.progress.create();
	    this.progress.render().addClass('hide');
	    this.selector.create();
	    this.button_upload = Lampa.Template.get('shots_button', {
	      text: Lampa.Lang.translate('shots_modal_button_upload_start')
	    });
	    this.button_cancel = Lampa.Template.get('shots_button', {
	      text: Lampa.Lang.translate('shots_modal_button_upload_cancel')
	    });
	    this.button_again = Lampa.Template.get('shots_button', {
	      text: Lampa.Lang.translate('shots_modal_button_upload_again')
	    });
	    this.button_complete = Lampa.Template.get('shots_button', {
	      text: Lampa.Lang.translate('shots_modal_button_upload_complete')
	    });
	    this.text_complete = Lampa.Template.get('shots_upload_complete_text');
	    this.text_notice = Lampa.Template.get('shots_upload_notice_text');
	    this.button_again.addClass('hide').on('hover:enter', this.startUpload.bind(this));
	    this.button_upload.on('hover:enter', this.startUpload.bind(this));
	    this.button_complete.addClass('hide').on('hover:enter', function () {
	      _this.destroy();
	      _this.onComplete(_this.shot_ready);
	    });
	    this.text_complete.addClass('hide');
	    this.button_cancel.addClass('shots-selector--transparent');
	    this.button_cancel.on('hover:enter', this.cancelUpload.bind(this));
	    this.html.find('.shots-modal-upload__preview').append(this.preview.render());
	    this.html.find('.shots-modal-upload__body').append(this.text_notice).append(this.selector_title).append(this.selector.render()).append(this.button_upload).append(this.progress.render()).append(this.button_again).append(this.button_cancel).append(this.text_complete).append(this.button_complete);
	    Lampa.Modal.open({
	      html: this.html,
	      size: 'small',
	      scroll: {
	        nopadding: true
	      },
	      onBack: function onBack() {}
	    });
	  };
	  this.setFocus = function (target) {
	    Lampa.Controller.clear();
	    Lampa.Controller.collectionSet(this.html);
	    Lampa.Controller.collectionFocus(target, this.html);
	  };
	  this.startUpload = function () {
	    this.button_again.addClass('hide');
	    this.button_upload.addClass('hide');
	    this.progress.render().removeClass('hide');
	    this.setFocus(this.progress.render());
	    this.progress.setText(Lampa.Lang.translate('shots_upload_progress_start'));
	    this.progress.setState('waiting');
	    var play = this.data.play_data;
	    var card = play.card;
	    Api.uploadRequest({
	      card_id: card.id,
	      card_type: card.original_name ? 'tv' : 'movie',
	      card_title: card.title || card.name || card.original_title || card.original_name || 'Unknown',
	      card_year: (card.release_date || card.first_air_date || '----').slice(0, 4),
	      card_poster: card.poster_path || '',
	      start_point: this.data.recording.start_point,
	      end_point: this.data.recording.end_point,
	      season: play.season || 0,
	      episode: play.episode || 0,
	      voice_name: play.voice_name || '',
	      balanser: play.balanser || '',
	      tags: this.selector.get().map(function (t) {
	        return t.id;
	      }),
	      recorder: 'new'
	    }, this.endUpload.bind(this), this.errorUpload.bind(this));
	  };
	  this.errorUpload = function (e) {
	    this.progress.render().addClass('hide');
	    this.button_again.removeClass('hide');
	    this.setFocus(this.button_again);
	  };
	  this.endUpload = function (upload) {
	    this.progress.render().addClass('hide');
	    this.button_cancel.addClass('hide');
	    this.button_complete.removeClass('hide');
	    this.text_complete.removeClass('hide');
	    this.text_notice.addClass('hide');
	    this.selector_title.remove();
	    this.selector.destroy();
	    Lampa.Storage.set('shots_last_record', Date.now());
	    Api.shotsVideo(upload.id, function (result) {
	      Created.add(result.video);
	      Handler.add(result.video);
	    });
	    this.setFocus(this.button_complete);
	  };
	  this.cancelUpload = function () {
	    if (this.uploading) this.uploading.abort();
	    this.destroy();
	    this.onCancel();
	  };
	  this.destroy = function () {
	    Lampa.Modal.close();
	    this.preview.destroy();
	    this.checkbox.destroy();
	    this.html.remove();
	    this.runUpload = function () {};
	    this.endUpload = function () {};
	    this.cancelUpload = function () {};
	    this.notifyUpload = function () {};
	  };
	}

	var loaded_shots = {};
	function init$3() {
	  var button = "<div class=\"full-start__button shots-view-button selector view--online\" data-subtitle=\"#{shots_watch}\">\n        <svg><use xlink:href=\"#sprite-shots\"></use></svg>\n\n        <span class=\"shots-view-button__title\">Shots</span>\n    </div>";
	  Lampa.Listener.follow('full', function (e) {
	    if (e.type == 'complite' && (Lampa.Storage.field('shots_in_card') || Lampa.Storage.field('shots_in_player'))) {
	      var btn = $(Lampa.Lang.translate(button));
	      var mov = e.data.movie;
	      btn.on('hover:enter', function () {
	        Lampa.Activity.push({
	          url: '',
	          title: 'Shots',
	          component: 'shots_card',
	          card: mov,
	          page: 1
	        });
	      });
	      load(mov, function (shots) {
	        if (shots.length) {
	          console.log('Shots', 'load for full view:', shots.length, 'items;', 'card id:', mov.id, mov.original_name ? 'tv' : 'movie');
	          btn.attr('data-subtitle', Lampa.Lang.translate('shots_watch') + ' <span class="shots-view-button__count">' + (shots.length > 99 ? '99+' : shots.length) + '</span>');
	        }
	      });
	      if (Lampa.Storage.field('shots_in_card')) e.object.activity.render().find('.view--torrent').last().after(btn);
	    }
	  });
	}
	function load(card, call) {
	  var key = card.id + '_' + (card.original_name ? 'tv' : 'movie');
	  if (loaded_shots[key]) {
	    call(loaded_shots[key]);
	  } else {
	    Api.shotsCard(card, 1, function (data) {
	      loaded_shots[key] = data.results;
	      call(data.results);
	    });
	  }
	}
	function clear() {
	  loaded_shots = {};
	}
	function remove$2(card) {
	  var key = card.id + '_' + (card.original_name ? 'tv' : 'movie');
	  delete loaded_shots[key];
	}
	function get$1(card) {
	  var key = card.id + '_' + (card.original_name ? 'tv' : 'movie');
	  return loaded_shots[key];
	}
	var View = {
	  init: init$3,
	  load: load,
	  clear: clear,
	  remove: remove$2,
	  get: get$1
	};

	var button_record = null;
	var play_data = {};
	var player_shots = null;
	function init$2() {
	  Lampa.Player.listener.follow('ready', startPlayer);
	  Lampa.Player.listener.follow('destroy', stopPlayer);
	  button_record = Lampa.Template.get('shots_player_record_button');
	  button_record.on('hover:enter', beforeRecording);
	  button_record.addClass('hide');
	  Lampa.PlayerPanel.render().find('.player-panel__settings').after(button_record);
	  Lampa.Controller.listener.follow('toggle', function (e) {
	    if (player_shots) player_shots.toggleClass('focus', e.name == 'player_rewind' || Lampa.Platform.mouse() || Lampa.Utils.isTouchDevice());
	  });
	}
	function playerPanel(status) {
	  Lampa.Player.render().toggleClass('shots-player--recording', !status);
	}
	function startPlayer(data) {
	  var _play_data$card;
	  play_data = {};
	  if (data.card) play_data.card = data.card;else if (Lampa.Activity.active().movie) {
	    play_data.card = Lampa.Activity.active().movie;
	  }
	  var possibly = true;
	  var type = (_play_data$card = play_data.card) !== null && _play_data$card !== void 0 && _play_data$card.original_name ? 'tv' : 'movie';
	  if (data.iptv || data.youtube) possibly = false;else if (!Lampa.Account.Permit.token) possibly = false;else if (type == 'tv' && (!data.season || !data.episode)) possibly = false;
	  if (possibly) {
	    play_data.season = data.season || 0;
	    play_data.episode = data.episode || 0;
	    play_data.voice_name = (data.voice_name || '').trim();
	    setTimeout(function () {
	      play_data.balanser = Utils.getBalanser(play_data.card || {});
	    }, 1000);
	    if (play_data.card) {
	      var year = parseInt((play_data.card.release_date || play_data.card.first_air_date || '----').slice(0, 4));
	      if (type == 'movie') {
	        var player_title = Lampa.Player.playdata().title || '';
	        play_data.voice_name = (play_data.voice_name || player_title || '').trim();
	        if (play_data.voice_name == play_data.card.title || play_data.torrent_hash) play_data.voice_name = '';
	      }
	      if (!(Utils.isTSQuality(play_data.voice_name) || Utils.isTSQuality(Lampa.Player.playdata().title)) && year >= 1985) button_record.removeClass('hide');
	    }
	  }
	  if (play_data.card && (play_data.card.source == 'tmdb' || play_data.card.source == 'cub')) {
	    if (Lampa.Storage.field('shots_in_player')) playerShotsSegments();
	  }
	}
	function stopPlayer() {
	  button_record.addClass('hide');
	  if (player_shots) {
	    player_shots.remove();
	    player_shots = null;
	  }
	  playerPanel(true);
	  if (play_data.need_tocontent) {
	    setTimeout(function () {
	      Lampa.Controller.toggle('content');
	    }, 100);
	  }
	}
	function playerShotsSegments() {
	  var type = play_data.card.original_name ? 'tv' : 'movie';
	  var video = Lampa.PlayerVideo.video();
	  if (type == 'tv' && (!play_data.season || !play_data.episode)) return;
	  video.addEventListener('loadeddata', function () {
	    View.load(play_data.card, function (shots) {
	      if (!Lampa.Player.opened()) return;
	      if (type == 'tv' && play_data.season && play_data.episode) {
	        shots = shots.filter(function (e) {
	          return e.season == play_data.season && e.episode == play_data.episode;
	        });
	      }
	      if (shots.length) {
	        player_shots = $('<div class="shots-player-segments"></div>');
	        player_shots.toggleClass('focus', Lampa.Platform.mouse() || Lampa.Utils.isTouchDevice());
	        shots = shots.filter(function (s) {
	          // сортируем по start_point один раз и используем временные поля на массиве
	          if (!shots._sorted) {
	            shots.sort(function (a, b) {
	              return (Number(a.start_point) || 0) - (Number(b.start_point) || 0);
	            });
	            shots._sorted = true;
	            shots._last_end = -Infinity;
	          }
	          var start = Number(s.start_point || 0);
	          var end = Number(s.end_point || start);

	          // если перекрывается с предыдущим включённым — исключаем
	          if (start < shots._last_end) return false;

	          // обновляем край текущего включённого сегмента
	          shots._last_end = Math.max(shots._last_end, end);
	          return true;
	        });
	        shots.forEach(function (elem) {
	          var segment = $('<div class="shots-player-segments__time"></div>');
	          var picture = $('<div class="shots-player-segments__picture"><img src="' + elem.img + '"></div>');
	          var img = picture.find('img')[0];
	          img.on('load', function () {
	            picture.addClass('shots-player-segments__picture--loaded');
	          });
	          segment.css({
	            left: elem.start_point / video.duration * 100 + '%',
	            width: (elem.end_point - elem.start_point) / video.duration * 100 + '%'
	          });
	          picture.css({
	            left: elem.start_point / video.duration * 100 + '%'
	          });
	          player_shots.append(segment);
	          player_shots.append(picture);
	          img.src = elem.screen;
	          picture.on('click', function () {
	            console.log('click shot', elem, elem.start_point);
	            Lampa.PlayerVideo.to(elem.start_point);
	          });
	        });
	        Lampa.PlayerPanel.render().find('.player-panel__timeline').before(player_shots);
	      }
	    });
	  });
	}
	function playPlayer() {
	  Lampa.PlayerVideo.play();
	  Lampa.PlayerPanel.visible(false);
	  Lampa.PlayerPanel.hide();
	  playerPanel(false);
	}
	function pausePlayer() {
	  Lampa.PlayerVideo.pause();
	  Lampa.PlayerPanel.visible(false);
	  Lampa.PlayerPanel.hide();
	  playerPanel(true);
	}
	function closeModal() {
	  Lampa.Modal.close();
	  Lampa.Controller.toggle('player');
	  Lampa.PlayerVideo.pause();
	  playerPanel(true);
	}
	function beforeRecording() {
	  if (Lampa.Modal.opened()) {
	    Lampa.Modal.close();
	    play_data.need_tocontent = true;
	  }
	  pausePlayer();
	  var left = Date.now() - Lampa.Storage.get('shots_last_record', '0');
	  if (left < Defined.quota_next_record) {
	    return Lampa.Modal.open({
	      html: Lampa.Template.get('shots_modal_quota_limit', {
	        time: Lampa.Utils.secondsToTimeHuman((Defined.quota_next_record - left) / 1000)
	      }),
	      size: 'small',
	      scroll: {
	        nopadding: true
	      },
	      buttons: [{
	        name: Lampa.Lang.translate('shots_button_good'),
	        onSelect: closeModal
	      }],
	      onBack: closeModal
	    });
	  }
	  Utils.modal(Lampa.Template.get('shots_modal_before_recording'), [{
	    name: Lampa.Lang.translate('shots_start_recording'),
	    onSelect: function onSelect() {
	      Lampa.Modal.close();
	      startRecording();
	    }
	  }, {
	    name: Lampa.Lang.translate('shots_choice_start_point'),
	    cancel: true,
	    onSelect: function onSelect() {
	      Lampa.Modal.close();
	      Lampa.Controller.toggle('player_rewind');
	      Lampa.PlayerPanel.visible(true);
	      playerPanel(true);
	    }
	  }], closeModal);
	}
	function startRecording() {
	  var recorder = new Recorder(Lampa.PlayerVideo.video());
	  recorder.onStop = stopRecording;
	  recorder.onError = errorRecording;
	  recorder.onRun = playPlayer;
	  recorder.start();
	}
	function errorRecording(e) {
	  Utils.modal(Lampa.Template.get('shots_modal_error_recording'), [{
	    name: Lampa.Lang.translate('shots_button_good'),
	    onSelect: closeModal
	  }], closeModal);
	}
	function stopRecording(recording) {
	  pausePlayer();
	  if (recording.duration > 10) {
	    if (recording.start_point < 60 || recording.end_point > Lampa.PlayerVideo.video().duration - 60 * 5) {
	      recording.near_border = true;
	      Utils.modal(Lampa.Template.get('shots_modal_before_upload_recording'), [{
	        name: Lampa.Lang.translate('shots_button_choice_fragment'),
	        onSelect: closeModal
	      }, {
	        name: Lampa.Lang.translate('shots_button_continue_upload'),
	        onSelect: function onSelect() {
	          Lampa.Modal.close();
	          startUploadRecording(recording);
	        }
	      }], closeModal);
	    } else startUploadRecording(recording);
	  } else shortRecording();
	}
	function startUploadRecording(recording) {
	  var upload = new Upload({
	    recording: recording,
	    play_data: play_data
	  });
	  upload.onCancel = function () {
	    Lampa.Controller.toggle('player');
	    Lampa.PlayerVideo.pause();
	  };
	  upload.onComplete = function () {
	    Lampa.Controller.toggle('player');
	    Lampa.PlayerVideo.pause();
	  };
	  upload.start();
	}
	function shortRecording() {
	  Utils.modal(Lampa.Template.get('shots_modal_short_recording'), [{
	    name: Lampa.Lang.translate('shots_button_good'),
	    onSelect: closeModal
	  }], closeModal);
	}
	var Player = {
	  init: init$2
	};

	var shots = {
	  favorite: [],
	  map: []
	};
	function init$1() {
	  shots.favorite = Lampa.Storage.get('shots_favorite', '[]');
	  createMap(Lampa.Storage.get('shots_map', '[]'));
	  update();
	  Lampa.Listener.follow('shots_status', updateStatus);
	  Lampa.Listener.follow('shots_update', updateData);
	  Lampa.Listener.follow('state:changed', function (e) {
	    if (e.target == 'favorite' && (e.reason == 'profile' || e.reason == 'read')) {
	      shots.favorite = [];
	      createMap([]);
	      update();
	    }
	  });
	  Lampa.Socket.listener.follow('message', function (result) {
	    if (result.method == 'update' && result.data.from == 'shots' && result.data.list == 'favorite') {
	      update();
	    }
	  });
	}
	function createMap(arr) {
	  shots.map = {};
	  arr.forEach(function (id) {
	    shots.map[id] = 1;
	  });
	}
	function updateStatus(shot) {
	  if (!shots.map[shot.id]) return;
	  var find = shots.favorite.find(function (a) {
	    return a.id == shot.id;
	  });
	  if (find) {
	    find.status = shot.status;
	    find.screen = shot.screen;
	    find.file = shot.file;
	    Lampa.Storage.set('shots_favorite', shots.favorite);
	  }
	}
	function updateData(shot) {
	  if (!shots.map[shot.id]) return;
	  var find = shots.favorite.find(function (a) {
	    return a.id == shot.id;
	  });
	  if (find) {
	    find.liked = shot.liked;
	    find.saved = shot.saved;
	    Lampa.Storage.set('shots_favorite', shots.favorite);
	  }
	}
	function update() {
	  Api.shotsList('favorite', 1, function (shots) {
	    shots.favorite = shots.results;
	    Lampa.Storage.set('shots_favorite', shots.favorite);
	  });
	  Api.shotsList('map', 1, function (map) {
	    createMap(map.results);
	    Lampa.Storage.set('shots_map', map.results);
	  });
	}
	function add$1(shot) {
	  var clone = {};
	  Object.assign(clone, shot);
	  delete clone.params;
	  Lampa.Arrays.insert(shots.favorite, 0, clone);
	  if (shots.favorite.length > 20) {
	    shots.favorite = shots.favorite.slice(0, 20);
	  }
	  shots.map[clone.id] = 1;
	  Lampa.Storage.set('shots_favorite', shots.favorite);
	  Lampa.Storage.add('shots_map', clone.id);
	}
	function remove$1(shot) {
	  var find_in = shots.favorite.find(function (a) {
	    return a.id == shot.id;
	  });
	  if (find_in) Lampa.Arrays.remove(shots.favorite, find_in);
	  delete shots.map[shot.id];
	  Lampa.Storage.set('shots_favorite', shots.favorite);
	  var map = Lampa.Storage.get('shots_map', '[]');
	  Lampa.Arrays.remove(map, shot.id);
	  Lampa.Storage.set('shots_map', map);
	}
	function page(page, callback) {
	  Api.shotsList('favorite', page, function (shots) {
	    callback(shots.results);
	  }, function () {
	    callback([]);
	  });
	}
	function get() {
	  return Lampa.Arrays.clone(shots.favorite);
	}
	function find$1(shot_id) {
	  return Boolean(shots.map[shot_id]);
	}
	function toggle$1(shot, onsuccess, onerror) {
	  var finded = find$1(shot.id);
	  Api.shotsFavorite(finded ? 'remove' : 'add', shot, function () {
	    if (finded) {
	      remove$1(shot);
	    } else {
	      add$1(shot);
	    }
	    if (onsuccess) onsuccess(finded);
	    Lampa.Socket.send('update', {
	      params: {
	        from: 'shots',
	        list: 'favorite'
	      }
	    });
	  }, onerror);
	  return !finded;
	}
	var Favorite = {
	  init: init$1,
	  update: update,
	  remove: remove$1,
	  add: add$1,
	  get: get,
	  find: find$1,
	  toggle: toggle$1,
	  page: page
	};

	var $TypeError$1 = TypeError;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

	var doesNotExceedSafeInteger$1 = function (it) {
	  if (it > MAX_SAFE_INTEGER) throw new $TypeError$1('Maximum allowed index exceeded');
	  return it;
	};

	var $$3 = _export;
	var fails$2 = fails$p;
	var isArray = isArray$4;
	var isObject$1 = isObject$d;
	var toObject$2 = toObject$8;
	var lengthOfArrayLike$1 = lengthOfArrayLike$6;
	var doesNotExceedSafeInteger = doesNotExceedSafeInteger$1;
	var createProperty$1 = createProperty$4;
	var setArrayLength$1 = arraySetLength;
	var arraySpeciesCreate = arraySpeciesCreate$2;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$4;
	var wellKnownSymbol$6 = wellKnownSymbol$g;
	var V8_VERSION = environmentV8Version;

	var IS_CONCAT_SPREADABLE = wellKnownSymbol$6('isConcatSpreadable');

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$2(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var isConcatSpreadable = function (O) {
	  if (!isObject$1(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport('concat');

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	$$3({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject$2(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = lengthOfArrayLike$1(E);
	        doesNotExceedSafeInteger(n + len);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty$1(A, n, E[k]);
	      } else {
	        doesNotExceedSafeInteger(n + 1);
	        createProperty$1(A, n++, E);
	      }
	    }
	    setArrayLength$1(A, n);
	    return A;
	  }
	});

	var loaded_last = {};
	function start(call) {
	  var status = new Lampa.Status(3);
	  status.onComplite = function () {
	    // Сохраняем последние загруженные шоты для фильтрации релевантных
	    loaded_last.new = status.data.new;
	    loaded_last.popular = status.data.popular;

	    // Фильтруем просмотренные шоты
	    status.data.new = filterViewed(status.data.new);
	    status.data.popular = filterViewed(status.data.popular);
	    console.log('Shots', 'roll items', 'new', status.data.new.length, 'popular', status.data.popular.length, 'old', status.data.old.length);

	    // Убираем дубли между новыми и популярными и старыми
	    status.data.popular = status.data.popular.filter(function (a) {
	      return !status.data.new.find(function (b) {
	        return b.id == a.id;
	      });
	    });
	    status.data.old = status.data.old.filter(function (a) {
	      return !(status.data.new.find(function (b) {
	        return b.id == a.id;
	      }) || status.data.popular.find(function (b) {
	        return b.id == a.id;
	      }));
	    });
	    console.log('Shots', 'after filter roll items', 'new', status.data.new.length, 'popular', status.data.popular.length, 'old', status.data.old.length);

	    // Собираем итоговый список
	    var items = [].concat(status.data.new, status.data.popular);

	    // Перемешиваем новые и популярные
	    items = Lampa.Arrays.shuffle(items);

	    // Добавляем метку from_id для старых шотов
	    status.data.old.forEach(function (a) {
	      return a.from_id = a.id;
	    });

	    // Добавляем релевантные старые шоты
	    items = items.concat(filterViewed(filterRelevant(status.data.old)));
	    console.log('Shots', 'relevant roll items', items.length);

	    // Если нет шотов, добавляем несколько старых
	    if (!items.length) items = status.data.old.slice(-5);
	    call(items);
	  };
	  Api.lenta({
	    sort: 'new',
	    limit: 50
	  }, status.append.bind(status, 'new'));
	  Api.lenta({
	    sort: 'popular',
	    limit: 50
	  }, status.append.bind(status, 'popular'));
	  Api.lenta({
	    sort: 'from_id',
	    id: Lampa.Storage.get('shots_lenta_last_id', '0'),
	    limit: 50
	  }, status.append.bind(status, 'old'));
	}
	function filterRelevant(items) {
	  return items.filter(function (a) {
	    return !(loaded_last.new.find(function (b) {
	      return b.id == a.id;
	    }) || loaded_last.popular.find(function (b) {
	      return b.id == a.id;
	    }));
	  });
	}
	function filterViewed(items) {
	  var viewed = Lampa.Storage.cache('shots_viewed', 2000, []);
	  var filtred = items.filter(function (a) {
	    return viewed.indexOf(a.id) == -1;
	  });
	  return filtred;
	}
	function next(call) {
	  Api.lenta({
	    sort: 'from_id',
	    id: Lampa.Storage.get('shots_lenta_last_id', '0'),
	    limit: 50
	  }, function (items) {
	    return call(filterRelevant(items));
	  });
	}
	function viewedRegister(shot) {
	  if (!shot.from_id) Lampa.Storage.add('shots_viewed', shot.id);
	  Api.shotsViewed(shot.id);
	}
	function saveFromId(id) {
	  Lampa.Storage.set('shots_lenta_last_id', id);
	}
	var Roll = {
	  start: start,
	  next: next,
	  viewedRegister: viewedRegister,
	  saveFromId: saveFromId
	};

	function Video() {
	  this.html = Lampa.Template.js('shots_lenta_video');
	  this.video = this.html.find('video');
	  this.progress = this.html.find('.shots-lenta-video__progress-bar div');
	  this.layer = this.html.find('.shots-lenta-video__layer');
	  this.loader = this.html.find('.shots-lenta-video__loader');
	  this.viewed = {};
	  this.create = function () {
	    var _this = this;
	    this.video.addEventListener('timeupdate', function () {
	      _this.progress.style.width = _this.video.currentTime / _this.video.duration * 100 + '%';
	      if ((_this.video.currentTime / _this.video.duration > 0.1 || _this.video.currentTime > 2) && !_this.viewed[_this.shot.id]) {
	        _this.viewed[_this.shot.id] = true;
	        Roll.viewedRegister(_this.shot);
	      }
	      Lampa.Screensaver.resetTimer();
	    });
	    this.video.addEventListener('waiting', function () {
	      _this.showLoading();
	    });
	    this.video.addEventListener('playing', function () {
	      _this.hideLoading();
	    });
	    this.layer.on('click', function () {
	      _this.video.paused ? _this.play() : _this.pause();
	    });
	    if (Lampa.Platform.is('apple')) this.video.setAttribute('playsinline', 'true');
	  };
	  this.change = function (shot) {
	    this.shot = shot;
	    if (shot.from_id) Roll.saveFromId(shot.from_id);
	    this.video.setAttribute('poster', shot.img || './img/video_poster.png');
	    this.progress.style.width = '0%';
	    this.pause();
	    this.load();
	    this.play();
	  };
	  this.play = function () {
	    var playPromise;
	    try {
	      playPromise = this.video.play();
	    } catch (e) {}
	    if (playPromise !== undefined) {
	      playPromise.then(function () {
	        console.log('Lenta', 'start plaining');
	      }).catch(function (e) {
	        console.log('Lenta', 'play promise error:', e.message);
	      });
	    }
	  };
	  this.pause = function () {
	    var pausePromise;
	    try {
	      pausePromise = this.video.pause();
	    } catch (e) {}
	    if (pausePromise !== undefined) {
	      pausePromise.then(function () {
	        console.log('Lenta', 'pause');
	      }).catch(function (e) {
	        console.log('Lenta', 'pause promise error:', e.message);
	      });
	    }
	  };
	  this.load = function () {
	    this.video.src = '';
	    this.video.load();
	    this.video.src = this.shot.file;
	    this.video.load();
	  };
	  this.showLoading = function () {
	    var _this2 = this;
	    this.timer_loading = setTimeout(function () {
	      _this2.loader.addClass('show');
	    }, 2000);
	  };
	  this.hideLoading = function () {
	    clearTimeout(this.timer_loading);
	    this.loader.removeClass('show');
	  };
	  this.render = function () {
	    return this.html;
	  };
	  this.destroy = function () {
	    clearTimeout(this.timer_loading);
	    this.html.remove();
	    this.viewed = {};
	  };
	}

	var call$3 = functionCall;
	var anObject$2 = anObject$a;
	var getMethod$1 = getMethod$4;

	var iteratorClose$2 = function (iterator, kind, value) {
	  var innerResult, innerError;
	  anObject$2(iterator);
	  try {
	    innerResult = getMethod$1(iterator, 'return');
	    if (!innerResult) {
	      if (kind === 'throw') throw value;
	      return value;
	    }
	    innerResult = call$3(innerResult, iterator);
	  } catch (error) {
	    innerError = true;
	    innerResult = error;
	  }
	  if (kind === 'throw') throw value;
	  if (innerError) throw innerResult;
	  anObject$2(innerResult);
	  return value;
	};

	var anObject$1 = anObject$a;
	var iteratorClose$1 = iteratorClose$2;

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject$1(value)[0], value[1]) : fn(value);
	  } catch (error) {
	    iteratorClose$1(iterator, 'throw', error);
	  }
	};

	var iterators = {};

	var wellKnownSymbol$5 = wellKnownSymbol$g;
	var Iterators$3 = iterators;

	var ITERATOR$4 = wellKnownSymbol$5('iterator');
	var ArrayPrototype = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod$1 = function (it) {
	  return it !== undefined && (Iterators$3.Array === it || ArrayPrototype[ITERATOR$4] === it);
	};

	var classof = classof$5;
	var getMethod = getMethod$4;
	var isNullOrUndefined = isNullOrUndefined$3;
	var Iterators$2 = iterators;
	var wellKnownSymbol$4 = wellKnownSymbol$g;

	var ITERATOR$3 = wellKnownSymbol$4('iterator');

	var getIteratorMethod$2 = function (it) {
	  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR$3)
	    || getMethod(it, '@@iterator')
	    || Iterators$2[classof(it)];
	};

	var call$2 = functionCall;
	var aCallable = aCallable$5;
	var anObject = anObject$a;
	var tryToString = tryToString$3;
	var getIteratorMethod$1 = getIteratorMethod$2;

	var $TypeError = TypeError;

	var getIterator$1 = function (argument, usingIterator) {
	  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
	  if (aCallable(iteratorMethod)) return anObject(call$2(iteratorMethod, argument));
	  throw new $TypeError(tryToString(argument) + ' is not iterable');
	};

	var bind = functionBindContext;
	var call$1 = functionCall;
	var toObject$1 = toObject$8;
	var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
	var isArrayIteratorMethod = isArrayIteratorMethod$1;
	var isConstructor = isConstructor$3;
	var lengthOfArrayLike = lengthOfArrayLike$6;
	var createProperty = createProperty$4;
	var setArrayLength = arraySetLength;
	var getIterator = getIterator$1;
	var getIteratorMethod = getIteratorMethod$2;
	var iteratorClose = iteratorClose$2;

	var $Array = Array;

	// `Array.from` method implementation
	// https://tc39.es/ecma262/#sec-array.from
	var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	  var IS_CONSTRUCTOR = isConstructor(this);
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
	  var O = toObject$1(arrayLike);
	  var iteratorMethod = getIteratorMethod(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  // if the target is not iterable or it's an array with the default iterator - use a simple case
	  if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
	    result = IS_CONSTRUCTOR ? new this() : [];
	    iterator = getIterator(O, iteratorMethod);
	    next = iterator.next;
	    for (;!(step = call$1(next, iterator)).done; index++) {
	      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
	      try {
	        createProperty(result, index, value);
	      } catch (error) {
	        iteratorClose(iterator, 'throw', error);
	      }
	    }
	  } else {
	    length = lengthOfArrayLike(O);
	    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
	    for (;length > index; index++) {
	      value = mapping ? mapfn(O[index], index) : O[index];
	      createProperty(result, index, value);
	    }
	  }
	  setArrayLength(result, index);
	  return result;
	};

	var wellKnownSymbol$3 = wellKnownSymbol$g;

	var ITERATOR$2 = wellKnownSymbol$3('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  // eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
	  iteratorWithReturn[ITERATOR$2] = function () {
	    return this;
	  };
	  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
	  try {
	    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  } catch (error) { return false; } // workaround of old WebKit + `eval` bug
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    // eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
	    object[ITERATOR$2] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) { /* empty */ }
	  return ITERATION_SUPPORT;
	};

	var $$2 = _export;
	var from = arrayFrom;
	var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;

	var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
	  // eslint-disable-next-line es/no-array-from -- required for testing
	  Array.from(iterable);
	});

	// `Array.from` method
	// https://tc39.es/ecma262/#sec-array.from
	$$2({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
	  from: from
	});

	var fails$1 = fails$p;

	var correctPrototypeGetter = !fails$1(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var hasOwn$1 = hasOwnProperty_1;
	var isCallable$2 = isCallable$i;
	var toObject = toObject$8;
	var sharedKey = sharedKey$3;
	var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

	var IE_PROTO = sharedKey('IE_PROTO');
	var $Object = Object;
	var ObjectPrototype = $Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	// eslint-disable-next-line es/no-object-getprototypeof -- safe
	var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
	  var object = toObject(O);
	  if (hasOwn$1(object, IE_PROTO)) return object[IE_PROTO];
	  var constructor = object.constructor;
	  if (isCallable$2(constructor) && object instanceof constructor) {
	    return constructor.prototype;
	  } return object instanceof $Object ? ObjectPrototype : null;
	};

	var fails = fails$p;
	var isCallable$1 = isCallable$i;
	var isObject = isObject$d;
	var getPrototypeOf$1 = objectGetPrototypeOf;
	var defineBuiltIn$1 = defineBuiltIn$5;
	var wellKnownSymbol$2 = wellKnownSymbol$g;

	var ITERATOR$1 = wellKnownSymbol$2('iterator');
	var BUGGY_SAFARI_ITERATORS$1 = false;

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

	/* eslint-disable es/no-array-prototype-keys -- safe */
	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype$2) || fails(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$2[ITERATOR$1].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

	// `%IteratorPrototype%[@@iterator]()` method
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
	if (!isCallable$1(IteratorPrototype$2[ITERATOR$1])) {
	  defineBuiltIn$1(IteratorPrototype$2, ITERATOR$1, function () {
	    return this;
	  });
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$2,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var defineProperty = objectDefineProperty.f;
	var hasOwn = hasOwnProperty_1;
	var wellKnownSymbol$1 = wellKnownSymbol$g;

	var TO_STRING_TAG = wellKnownSymbol$1('toStringTag');

	var setToStringTag$2 = function (target, TAG, STATIC) {
	  if (target && !STATIC) target = target.prototype;
	  if (target && !hasOwn(target, TO_STRING_TAG)) {
	    defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
	  }
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
	var create = objectCreate;
	var createPropertyDescriptor = createPropertyDescriptor$4;
	var setToStringTag$1 = setToStringTag$2;
	var Iterators$1 = iterators;

	var returnThis$1 = function () { return this; };

	var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create(IteratorPrototype$1, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
	  setToStringTag$1(IteratorConstructor, TO_STRING_TAG, false);
	  Iterators$1[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var $$1 = _export;
	var call = functionCall;
	var FunctionName = functionName;
	var isCallable = isCallable$i;
	var createIteratorConstructor = iteratorCreateConstructor;
	var getPrototypeOf = objectGetPrototypeOf;
	var setPrototypeOf = objectSetPrototypeOf;
	var setToStringTag = setToStringTag$2;
	var createNonEnumerableProperty = createNonEnumerableProperty$5;
	var defineBuiltIn = defineBuiltIn$5;
	var wellKnownSymbol = wellKnownSymbol$g;
	var Iterators = iterators;
	var IteratorsCore = iteratorsCore;

	var PROPER_FUNCTION_NAME = FunctionName.PROPER;
	var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
	var IteratorPrototype = IteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis = function () { return this; };

	var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];

	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    }

	    return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
	        if (setPrototypeOf) {
	          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
	        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
	          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
	  if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    if (CONFIGURABLE_FUNCTION_NAME) {
	      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
	    } else {
	      INCORRECT_VALUES_NAME = true;
	      defaultIterator = function values() { return call(nativeIterator, this); };
	    }
	  }

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else $$1({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  // define iterator
	  if (IterablePrototype[ITERATOR] !== defaultIterator) {
	    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
	  }
	  Iterators[NAME] = defaultIterator;

	  return methods;
	};

	// `CreateIterResultObject` abstract operation
	// https://tc39.es/ecma262/#sec-createiterresultobject
	var createIterResultObject$1 = function (value, done) {
	  return { value: value, done: done };
	};

	var charAt = stringMultibyte.charAt;
	var toString = toString$7;
	var InternalStateModule = internalState;
	var defineIterator = iteratorDefine;
	var createIterResultObject = createIterResultObject$1;

	var STRING_ITERATOR = 'String Iterator';
	var setInternalState = InternalStateModule.set;
	var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState(this, {
	    type: STRING_ITERATOR,
	    string: toString(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return createIterResultObject(undefined, true);
	  point = charAt(string, index);
	  state.index += point.length;
	  return createIterResultObject(point, false);
	});

	function Author() {
	  var _this = this;
	  var author_data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	  this.html = Lampa.Template.js('shots_author');
	  this.img = this.html.find('img');
	  this.box = this.html.find('.shots-author__img');
	  this.img.onload = function () {
	    _this.box.addClass('loaded');
	  };
	  this.img.onerror = function () {
	    _this.img.src = './img/img_broken.svg';
	  };
	  this.create = function () {
	    if (author_data) this.update(author_data);
	  };
	  this.update = function (data) {
	    this.box.removeClass('loaded');
	    var email = data.email;
	    var icon = data.icon;
	    if (!email) {
	      email = Lampa.Account.Permit.account.email;
	      icon = Lampa.Account.Permit.account.profile ? Lampa.Account.Permit.account.profile.icon : '';
	    }
	    this.img.src = Lampa.Utils.protocol() + Lampa.Manifest.cub_domain + '/img/profiles/' + (icon || 'l_1') + '.png';
	    this.html.find('.shots-author__name').text(Lampa.Utils.capitalizeFirstLetter((email || 'Unknown').split('@')[0]));
	  };
	  this.render = function () {
	    return this.html;
	  };
	  this.destroy = function () {
	    this.img.onload = null;
	    this.img.onerror = null;
	    this.html.remove();
	  };
	}

	function find(shot_id) {
	  return Boolean(Lampa.Storage.get('shots_likes', '[]').find(function (id) {
	    return shot_id == id;
	  }));
	}
	function add(shot_id) {
	  var arr = Lampa.Storage.cache('shots_likes', 100, '[]');
	  arr.push(shot_id);
	  Lampa.Storage.set('shots_likes', arr);
	}
	function remove(shot_id) {
	  var arr = Lampa.Storage.get('shots_likes', '[]');
	  Lampa.Arrays.remove(arr, shot_id);
	  Lampa.Storage.set('shots_likes', arr);
	}
	function toggle(shot_id, onsuccess, onerror) {
	  var finded = find(shot_id);
	  Api.shotsLiked(shot_id, finded ? 'unlike' : 'like', function () {
	    if (finded) {
	      remove(shot_id);
	    } else {
	      add(shot_id);
	    }
	    if (onsuccess) onsuccess(finded);
	  }, onerror);
	  return !finded;
	}
	var Likes = {
	  find: find,
	  add: add,
	  remove: remove,
	  toggle: toggle
	};

	function shotsReport(id, callback) {
	  Lampa.Modal.open({
	    html: Lampa.Template.get('shots_modal_report'),
	    size: 'small',
	    scroll: {
	      nopadding: true
	    },
	    buttons: [{
	      name: Lampa.Lang.translate('shots_button_report'),
	      onSelect: function onSelect() {
	        Lampa.Modal.close();
	        callback && callback();
	        var reports = Lampa.Storage.get('shots_reports', '[]');
	        if (reports.indexOf(id) == -1) {
	          Api.shotsReport(id, function () {
	            reports.push(id);
	            Lampa.Storage.set('shots_reports', reports);
	            Lampa.Bell.push({
	              icon: '<svg><use xlink:href="#sprite-shots"></use></svg>',
	              text: Lampa.Lang.translate('shots_modal_report_bell')
	            });
	          });
	        } else {
	          Lampa.Bell.push({
	            icon: '<svg><use xlink:href="#sprite-shots"></use></svg>',
	            text: Lampa.Lang.translate('shots_modal_report_bell_alreadyed')
	          });
	        }
	      }
	    }],
	    onBack: function onBack() {
	      Lampa.Modal.close();
	      callback && callback();
	    }
	  });
	}
	function shotsDelete(id, callback) {
	  Lampa.Modal.open({
	    html: Lampa.Template.get('shots_modal_delete'),
	    size: 'small',
	    scroll: {
	      nopadding: true
	    },
	    buttons: [{
	      name: Lampa.Lang.translate('shots_button_delete_video'),
	      onSelect: function onSelect() {
	        Lampa.Modal.close();
	        callback && callback();
	        var deleted = Lampa.Storage.get('shots_deleted', '[]');
	        if (deleted.indexOf(id) == -1) {
	          Api.shotsDelete(id, function () {
	            deleted.push(id);
	            Lampa.Storage.set('shots_deleted', deleted);
	            Lampa.Bell.push({
	              icon: '<svg><use xlink:href="#sprite-shots"></use></svg>',
	              text: Lampa.Lang.translate('shots_modal_deleted_bell')
	            });
	          });
	        } else {
	          Lampa.Bell.push({
	            icon: '<svg><use xlink:href="#sprite-shots"></use></svg>',
	            text: Lampa.Lang.translate('shots_modal_deleted_bell')
	          });
	        }
	      }
	    }],
	    onBack: function onBack() {
	      Lampa.Modal.close();
	      callback && callback();
	    }
	  });
	}
	var Modals = {
	  shotsReport: shotsReport,
	  shotsDelete: shotsDelete
	};

	function backward$1() {
	  var head = Lampa.Template.get('head_backward', {
	    title: ''
	  });
	  head.find('.head-backward__button').on('click', function () {
	    Lampa.Controller.back();
	  });
	  return head;
	}
	function Slides(params) {
	  var html = $("<div class=\"shots-slides\">\n        <div class=\"shots-slides__slides\"></div>\n        <div class=\"shots-slides__install\">".concat(Lampa.Lang.translate(params.button_text), "</div>\n        <div class=\"shots-slides__down\">").concat(Lampa.Lang.translate('shots_down'), "</div>\n    </div>"));
	  params.slides.forEach(function (slide_data, slide_index) {
	    html.find('.shots-slides__slides').append($("<img class=\"shots-slides__slide slide-".concat(slide_index + 1, "\">")));
	  });
	  var slide = 0;
	  var total = params.slides.length;
	  var timeload;
	  var cancel = false;
	  var down = html.find('.shots-slides__down');
	  var install = html.find('.shots-slides__install');
	  if (Lampa.Platform.mouse() || Lampa.Utils.isTouchDevice()) {
	    html.append(backward$1());
	  }
	  $('body').append(html);
	  var push = function push() {
	    if (slide == total) {
	      destroy();
	      params.onInstall && params.onInstall();
	    }
	  };
	  var next = function next() {
	    if (slide >= total) return;
	    if (slide > 0) {
	      html.find('.slide-' + slide).addClass('up');
	    }
	    slide++;
	    html.find('.slide-' + slide).addClass('active');
	    if (slide === total) {
	      down.removeClass('active');
	      setTimeout(function () {
	        install.addClass('active');
	      }, 500);
	    }
	  };
	  var start = function start() {
	    Lampa.Loading.stop();
	    setTimeout(function () {
	      down.addClass('active');
	    }, 600);
	    next();
	    Lampa.Controller.add('shots_present', {
	      toggle: function toggle() {
	        Lampa.Controller.clear();
	        Lampa.Background.theme('#08090D');
	      },
	      enter: push,
	      down: next,
	      back: stop
	    });
	    Lampa.Controller.toggle('shots_present');
	  };
	  var stop = function stop() {
	    destroy();
	    Lampa.Loading.stop();
	    params.onBack && params.onBack();
	  };
	  var preload = function preload() {
	    var slides_loaded = 0;
	    for (var i = 1; i <= total; i++) {
	      var img = html.find('.slide-' + i)[0];
	      img.src = params.slides[i - 1];
	      img.onload = function () {
	        slides_loaded++;
	        if (slides_loaded === total && !cancel) {
	          params.onLoad && params.onLoad();
	          start();
	          clearTimeout(timeload);
	        }
	      };
	    }
	    timeload = setTimeout(stop, 10000);
	  };
	  var destroy = function destroy() {
	    start = function start() {};
	    cancel = true;
	    clearTimeout(timeload);
	    html.remove();
	    Lampa.Background.theme('reset');
	  };
	  down.on('click', next);
	  install.on('click', push);
	  Lampa.Loading.start(stop);
	  preload();
	}

	function Panel() {
	  this.html = Lampa.Template.js('shots_lenta_panel');
	  this.network = new Lampa.Reguest();
	  this.cache = {};
	  this.image = this.html.find('.shots-lenta-panel__card-img');
	  this.title = this.html.find('.shots-lenta-panel__card-title');
	  this.recorder = this.html.find('.shots-lenta-panel__recorder');
	  this.year = this.html.find('.shots-lenta-panel__card-year');
	  this.cardbox = this.html.find('.shots-lenta-panel__card');
	  this.body = this.html.find('.explorer-card__head-body');
	  this.last = this.html.find('.selector');
	  this.poster = this.image.find('img');
	  this.create = function () {
	    var _this = this;
	    this.tags = new Tags$1();
	    this.author = new Author();
	    var waite_like = false,
	      waite_fav = false;
	    this.author.render().addClass('selector');
	    this.html.find('.shots-lenta-panel__tags').append(this.tags.render());
	    this.html.find('.shots-lenta-panel__author').append(this.author.render());
	    this.poster.onload = function () {
	      _this.image.addClass('loaded');
	    };
	    this.poster.onerror = function () {
	      _this.poster.src = './img/img_broken.svg';
	    };
	    Array.from(this.html.querySelectorAll('.selector')).forEach(function (button) {
	      button.on('hover:focus hover:hover hover:touch', function () {
	        _this.last = button;
	      });
	    });
	    this.html.find('.action-liked').on('hover:enter', function () {
	      if (waite_like) return;
	      waite_like = true;
	      Likes.toggle(_this.shot.id, function (ready) {
	        _this.shot.liked += ready ? -1 : 1;
	        Lampa.Listener.send('shots_update', _objectSpread2({}, _this.shot));
	        _this.update();
	        waite_like = false;
	      });
	    });
	    this.html.find('.action-favorite').on('hover:enter', function () {
	      if (waite_fav) return;
	      waite_fav = true;
	      Favorite.toggle(_this.shot, function (ready) {
	        _this.shot.saved += ready ? -1 : 1;
	        Lampa.Listener.send('shots_update', _objectSpread2({}, _this.shot));
	        _this.update();
	        waite_fav = false;
	      });
	    });
	    this.html.find('.shots-author').on('hover:enter', function () {
	      Lampa.Controller.back();
	      Lampa.Activity.push({
	        url: '',
	        component: 'shots_channel',
	        title: 'Shots - ' + Lampa.Utils.capitalizeFirstLetter(_this.shot.email),
	        id: _this.shot.cid,
	        name: _this.shot.email,
	        page: 1
	      });
	    });
	    this.html.find('.action-more').on('hover:enter', this.menu.bind(this));
	    this.image.on('hover:enter', function () {
	      Lampa.Controller.back();
	      Lampa.Activity.push({
	        url: '',
	        component: 'full',
	        source: 'tmdb',
	        id: _this.shot.card_id,
	        method: _this.shot.card_type,
	        card: {
	          id: _this.shot.card_id
	        }
	      });
	    });
	  };
	  this.menu = function () {
	    var _this2 = this;
	    var menu = [];
	    var controller = Lampa.Controller.enabled().controller.link;
	    var back = function back() {
	      controller.html.removeClass('hide');
	      Lampa.Controller.toggle('shots_lenta');
	      controller.video.play();
	      Lampa.Background.theme('black');
	    };
	    menu.push({
	      title: Lampa.Lang.translate('shots_button_report'),
	      onSelect: function onSelect() {
	        Modals.shotsReport(_this2.shot.id, back);
	      }
	    });
	    if (Lampa.Account.Permit.account.id == this.shot.cid || Lampa.Account.Permit.account.id == 1) {
	      menu.push({
	        title: Lampa.Lang.translate('shots_button_delete_video'),
	        onSelect: function onSelect() {
	          Modals.shotsDelete(_this2.shot.id, function () {
	            back();
	            Created.remove(_this2.shot);
	          });
	        }
	      });
	    }
	    menu.push({
	      title: Lampa.Lang.translate('more'),
	      separator: true
	    });
	    menu.push({
	      title: Lampa.Lang.translate('shots_how_create_video_title'),
	      subtitle: Lampa.Lang.translate('shots_how_create_video_subtitle'),
	      onSelect: function onSelect() {
	        Slides({
	          slides: [1, 2, 3, 4].map(function (i) {
	            return Defined.cdn + 'record/slide-' + i + '.jpg';
	          }),
	          button_text: 'shots_button_good',
	          onLoad: function onLoad() {
	            controller.html.addClass('hide');
	          },
	          onInstall: back,
	          onBack: back
	        });
	      }
	    });
	    controller.video.pause();
	    Lampa.Select.show({
	      title: Lampa.Lang.translate('title_action'),
	      items: menu,
	      onBack: function onBack() {
	        Lampa.Controller.toggle('shots_lenta');
	        controller.video.play();
	      }
	    });
	  };
	  this.update = function () {
	    this.html.find('.action-liked').toggleClass('active', Likes.find(this.shot.id));
	    this.html.find('.action-favorite').toggleClass('active', Favorite.find(this.shot.id));
	    this.tags.update(this.shot);
	    if (this.shot.tags && this.shot.tags.length) {
	      var elem_tags = $('<div>' + this.shot.tags.slice(0, 3).map(function (t) {
	        return '#' + Lampa.Lang.translate('shots_tag_' + t.slug);
	      }).join(' ') + '</div>');
	      this.tags.render().append(elem_tags);
	    }
	    var elem_likes = $('<div><svg><use xlink:href="#sprite-love"></use></svg> ' + Lampa.Utils.bigNumberToShort(this.shot.liked || 0) + '</div>');
	    var elem_saved = $('<div><svg><use xlink:href="#sprite-favorite"></use></svg> ' + Lampa.Utils.bigNumberToShort(this.shot.saved || 0) + '</div>');
	    elem_likes.toggleClass('hide', (this.shot.liked || 0) == 0);
	    elem_saved.toggleClass('hide', (this.shot.saved || 0) == 0);
	    this.tags.render().append(elem_likes);
	    this.tags.render().append(elem_saved);
	    if (Lampa.Account.Permit.account.id == 1) this.recorder.text(this.shot.recorder || '').toggleClass('hide', !this.shot.recorder);
	  };
	  this.change = function (shot) {
	    this.shot = shot;
	    this.author.update(shot);
	    this.network.clear();
	    this.load();
	    this.update();
	  };
	  this.load = function () {
	    this.image.removeClass('loaded');
	    this.cardbox.addClass('loading');
	    if (this.cache[this.shot.id]) return this.loadDone(this.cache[this.shot.id]);
	    var url = Lampa.TMDB.api(this.shot.card_type + '/' + this.shot.card_id + '?api_key=' + Lampa.TMDB.key() + '&language=' + Lampa.Storage.field('tmdb_lang'));
	    this.network.silent(url, this.loadDone.bind(this));
	  };
	  this.loadDone = function (card) {
	    this.shot.card_title = card.title || card.name || card.original_title || card.original_name;
	    this.shot.card_poster = card.poster_path || card.backdrop_path;
	    this.shot.card_year = (card.release_date || card.first_air_date || '----').slice(0, 4);
	    this.title.text(this.shot.card_title);
	    this.year.text(this.shot.card_year);
	    this.poster.src = Lampa.TMDB.image('t/p/w300/' + this.shot.card_poster);
	    this.cardbox.removeClass('loading');
	    this.cache[this.shot.id] = card;
	  };
	  this.render = function () {
	    return this.html;
	  };
	  this.destroy = function () {
	    clearTimeout(this.show_timeout);
	    this.html.remove();
	    this.cache = {};
	    this.network.clear();
	  };
	}

	function Lenta(first, playlist) {
	  this.html = Lampa.Template.js('shots_lenta');
	  this.current = first;
	  this.playlist = playlist || [];
	  this.position = playlist.indexOf(playlist.find(function (i) {
	    return i.id == first.id;
	  }));
	  this.page = 1;
	  this.start = function () {
	    this.video = new Video(this.current);
	    this.panel = new Panel(this.current);
	    this.video.create();
	    this.panel.create();
	    if (Lampa.Platform.mouse() || Lampa.Utils.isTouchDevice()) {
	      var head = Lampa.Template.js('head_backward', {
	        title: ''
	      });
	      head.find('.head-backward__button').on('click', Lampa.Controller.back.bind(Lampa.Controller));
	      this.html.append(head);
	    }
	    this.html.find('.shots-lenta__video').append(this.video.render());
	    this.html.find('.shots-lenta__panel').append(this.panel.render());
	    $('body').addClass('ambience--enable').append(this.html);
	    this.video.change(this.current, 'next');
	    this.panel.change(this.current, 'next');
	    this.controller();
	    this.scroll();
	    this.html.on('mousemove', this.focus.bind(this));
	    Lampa.Background.theme('black');
	    Metric.counter('shots_lenta_launch');
	  };
	  this.scroll = function () {
	    var _self = this;
	    if (Lampa.Utils.isTouchDevice()) {
	      var movestart = function movestart(e) {
	        start_position = e.clientY;
	        end_position = start_position;
	        move_position = start_position;
	        time_scroll = Date.now();
	      };
	      var move = function move(e) {
	        move_position = e.clientY;
	        end_position = e.clientY;
	        var delta = move_position - start_position;
	        elemmove.style.transform = 'translateY(' + delta + 'px)';
	      };
	      var moveend = function moveend(e) {
	        elemmove.style.transform = 'translateY(0px)';
	        var threshold = window.innerHeight / 2.5;
	        var csroll_speed = Date.now() - time_scroll;
	        if (csroll_speed < 200) {
	          threshold = threshold / 6;
	        }
	        if (start_position - end_position > threshold) {
	          _self.move('next');
	        } else if (end_position - start_position > threshold) {
	          _self.move('prev');
	        }
	        end_position = 0;
	        start_position = 0;
	        move_position = 0;
	      };
	      var start_position = 0;
	      var move_position = 0;
	      var end_position = 0;
	      var time_scroll = 0;
	      var elemmove = this.html.find('.shots-lenta-video__video-element');
	      this.html.addEventListener('touchstart', function (e) {
	        movestart(e.touches[0] || e.changedTouches[0]);
	      });
	      this.html.addEventListener('touchmove', function (e) {
	        move(e.touches[0] || e.changedTouches[0]);
	      });
	      this.html.addEventListener('touchend', moveend);
	    } else {
	      var wheel = function wheel(e) {
	        if (Date.now() - time > 500) {
	          time = Date.now();
	          if (e.wheelDelta / 120 > 0) {
	            _self.move('prev');
	          } else {
	            _self.move('next');
	          }
	        }
	      }; // Обрабатываем скролл колесом мыши
	      var time = 0;
	      this.html.addEventListener('mousewheel', wheel);
	      this.html.addEventListener('wheel', wheel);
	    }
	  };
	  this.focus = function () {
	    var _this = this;
	    if (Lampa.Utils.isTouchDevice()) return;
	    clearTimeout(this.focus_timeout);
	    this.html.toggleClass('shots-lenta--hide-panel', false);
	    this.focus_timeout = setTimeout(function () {
	      if (Lampa.Controller.enabled().name !== 'shots_lenta') return;
	      _this.html.toggleClass('shots-lenta--hide-panel', true);
	      Lampa.Controller.add('shots_lenta_idle', {
	        link: _this.video,
	        toggle: function toggle() {
	          Lampa.Controller.clear();
	        },
	        left: _this.controller.bind(_this),
	        right: _this.controller.bind(_this),
	        up: function up() {
	          _this.move('prev');
	          _this.focus();
	        },
	        down: function down() {
	          _this.move('next');
	          _this.focus();
	        },
	        enter: _this.controller.bind(_this),
	        back: _this.controller.bind(_this)
	      });
	      Lampa.Controller.toggle('shots_lenta_idle');
	    }, 7000);
	  };
	  this.controller = function () {
	    var _this2 = this;
	    Lampa.Controller.add('shots_lenta', {
	      link: this,
	      toggle: function toggle() {
	        Lampa.Controller.clear();
	        Lampa.Controller.collectionSet(_this2.html);
	        Lampa.Controller.collectionFocus(_this2.panel.body, _this2.html);
	        _this2.focus();
	      },
	      left: function left() {
	        if (Navigator.canmove('left')) Navigator.move('left');
	        _this2.focus();
	      },
	      right: function right() {
	        if (Navigator.canmove('right')) Navigator.move('right');
	        _this2.focus();
	      },
	      up: function up() {
	        _this2.move('prev');
	        _this2.focus();
	      },
	      down: function down() {
	        _this2.move('next');
	        _this2.focus();
	      },
	      back: this.back.bind(this)
	    });
	    Lampa.Controller.toggle('shots_lenta');
	  };
	  this.move = function (direction) {
	    var start_position = this.position;
	    if (direction == 'next') {
	      this.position++;
	      if (this.position >= this.playlist.length) {
	        this.position = this.playlist.length - 1;
	      }
	    } else if (direction == 'prev') {
	      this.position--;
	      if (this.position < 0) {
	        this.position = 0;
	      }
	    }
	    if (start_position !== this.position) {
	      this.current = this.playlist[this.position];
	      this.video.change(this.current, direction);
	      this.panel.change(this.current, direction);
	      Lampa.Controller.toggle('shots_lenta');
	      Metric.counter('shots_lenta_next');
	    }
	    if (this.position >= this.playlist.length - 3) {
	      this.nextPart();
	    }
	  };
	  this.nextPart = function () {
	    var _this3 = this;
	    if (this.onNext) {
	      this.loading_part = true;
	      this.page++;
	      this.onNext(this.page, function (results) {
	        _this3.loading_part = false;
	        if (results && results.length) {
	          results.forEach(function (i) {
	            if (!_this3.playlist.find(function (p) {
	              return p.id == i.id;
	            })) _this3.playlist.push(i);
	          });
	        }
	      });
	    }
	  };
	  this.back = function () {
	    this.destroy();
	    Lampa.Controller.toggle('content');
	  };
	  this.destroy = function () {
	    clearTimeout(this.focus_timeout);
	    this.video.destroy();
	    this.panel.destroy();
	    this.html.remove();
	    Lampa.Background.theme('reset');
	  };
	}

	function Shot(item_data) {
	  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var clone = Lampa.Arrays.clone(item_data);
	  item_data.card = {
	    id: item_data.card_id,
	    type: item_data.card_type,
	    title: item_data.card_title,
	    release_date: item_data.card_year,
	    poster_path: item_data.card_poster
	  };
	  item_data.img = item_data.screen;
	  var item = Lampa.Maker.make('Episode', item_data, function (module) {
	    return module.only('Card', 'Callback');
	  });
	  item.use({
	    onCreate: function onCreate() {
	      var _this = this;
	      this.html.find('.full-episode__name').remove();
	      this.html.find('.full-episode__num').remove();
	      if (params.without_card) this.html.find('.card-episode__footer').addClass('hide');
	      var tags = new Tags$1(this.data);
	      tags.create();
	      this.html.find('.full-episode__date').empty().append(tags.render());
	      this.html.addClass('full-episode--shot');
	      this.liked = $("\n                <div class=\"full-episode__liked\">\n                    <svg><use xlink:href=\"#sprite-love\"></use></svg>\n                    <span>".concat(Lampa.Utils.bigNumberToShort(this.data.liked), "</span>\n                </div>\n            "));
	      this.html.find('.full-episode__date').append(this.liked);
	      this.status = Lampa.Template.elem('div', {
	        class: 'shots-status hide'
	      });
	      this.html.find('.card__left').append(this.status);
	      this.html.find('.full-episode').append($('<div class="full-episode__shot-icon"><svg><use xlink:href="#sprite-shots"></use></svg></div>'));
	      this.updateStatusHandler = function (e) {
	        if (e.id !== _this.data.id) return;
	        _this.status.toggleClass('hide', e.status == 'ready');
	        _this.status.toggleClass('shots-status--error', e.status == 'error');
	        _this.status.toggleClass('shots-status--processing', e.status == 'processing' || e.status == 'converting');
	        _this.status.toggleClass('shots-status--ready', e.status == 'ready');
	        _this.status.toggleClass('shots-status--deleted', e.status == 'deleted');
	        _this.status.toggleClass('shots-status--blocked', e.status == 'blocked');
	        _this.status.text(e.status == 'error' ? Lampa.Lang.translate('shots_status_error') : e.status == 'processing' || e.status == 'converting' ? Lampa.Lang.translate('shots_status_processing') : e.status == 'blocked' ? Lampa.Lang.translate('shots_status_blocked') : e.status == 'deleted' ? Lampa.Lang.translate('shots_status_deleted') : e.status == 'ready' ? Lampa.Lang.translate('shots_status_ready') : '');
	        Utils.videoReplaceStatus(e, _this.data);
	        Utils.videoReplaceStatus(e, clone);
	        _this.data.img = e.screen;
	        if (e.screen) _this.emit('visible');
	      };
	      this.updateDataHandler = function (e) {
	        if (e.id !== _this.data.id) return;
	        _this.liked.find('span').text(Lampa.Utils.bigNumberToShort(e.liked || _this.data.liked));
	      };
	      Lampa.Listener.follow('shots_status', this.updateStatusHandler);
	      Lampa.Listener.follow('shots_update', this.updateDataHandler);
	      this.updateStatusHandler(this.data);
	      if (this.data.status == 'processing' && Lampa.Account.Permit.account.id == this.data.cid) Handler.add(clone);
	    },
	    onlyEnter: function onlyEnter() {
	      var lenta = new Lenta(clone, params.playlist || [this.data]);
	      lenta.onNext = params.onNext;
	      lenta.start();
	    },
	    onlyFocus: function onlyFocus() {
	      Lampa.Background.change(this.data.img || '');
	    },
	    onRemove: function onRemove() {
	      Lampa.Listener.remove('shots_status', this.updateStatusHandler);
	      Lampa.Listener.remove('shots_update', this.updateDataHandler);
	    }
	  });
	  return item;
	}

	function component$3(object) {
	  Lampa.Utils.extendParams(object, {
	    items: {
	      cols: 4
	    }
	  });
	  var comp = Lampa.Maker.make('Category', object, function (module) {
	    return module.toggle(Lampa.Maker.module('Category').MASK.base, 'Pagination');
	  });
	  var playlist = [];
	  comp.use({
	    onCreate: function onCreate() {
	      var _this = this;
	      Api.shotsList(object.url, object.page, function (result) {
	        playlist = Lampa.Arrays.clone(result.results);
	        _this.build(result);
	      }, this.empty.bind(this));
	    },
	    onNext: function onNext(resolve, reject) {
	      Api.shotsList(object.url, object.page, function (result) {
	        playlist = playlist.concat(result.results);
	        resolve(result);
	      }, reject.bind(this));
	    },
	    onlyCreateAndAppend: function onlyCreateAndAppend(element) {
	      try {
	        var item = new Shot(element, {
	          playlist: playlist
	        });
	        this.emit('instance', item, element);
	        item.create();
	        this.emit('append', item, element);
	      } catch (e) {
	        console.warn('Warning', 'onCreateAndAppend error:', e.message, e.stack);
	      }
	    },
	    onDestroy: function onDestroy() {
	      playlist = null;
	    }
	  });
	  return comp;
	}

	function component$2(object) {
	  Lampa.Utils.extendParams(object, {
	    items: {
	      cols: Lampa.Storage.field('interface_size') == 'bigger' ? 4 : 3
	    },
	    empty: {
	      descr: Lampa.Lang.translate('shots_card_empty_descr'),
	      buttons: [{
	        title: Lampa.Lang.translate('shots_how_create_video_title'),
	        onEnter: function onEnter() {
	          Slides({
	            slides: [1, 2, 3, 4].map(function (i) {
	              return Defined.cdn + 'record/slide-' + i + '.jpg';
	            }),
	            button_text: 'shots_button_good',
	            onLoad: function onLoad() {},
	            onInstall: function onInstall() {
	              Lampa.Controller.toggle('content');
	            },
	            onBack: function onBack() {
	              Lampa.Controller.toggle('content');
	            }
	          });
	        }
	      }]
	    }
	  });
	  var comp = Lampa.Maker.make('Category', object, function (module) {
	    return module.toggle(Lampa.Maker.module('Category').MASK.base, 'Pagination', 'Explorer');
	  });
	  var playlist = [];
	  comp.use({
	    onCreate: function onCreate() {
	      var _this = this;
	      Api.shotsCard(object.card, object.page, function (result) {
	        playlist = Lampa.Arrays.clone(result.results);
	        _this.build(result);
	      }, this.empty.bind(this));
	    },
	    onNext: function onNext(resolve, reject) {
	      Api.shotsCard(object.card, object.page, function (result) {
	        playlist = playlist.concat(result.results);
	        resolve(result);
	      }, reject.bind(this));
	    },
	    onlyCreateAndAppend: function onlyCreateAndAppend(element) {
	      try {
	        var item = new Shot(element, {
	          playlist: playlist,
	          without_card: true
	        });
	        this.emit('instance', item, element);
	        item.create();
	        this.emit('append', item, element);
	      } catch (e) {
	        console.warn('Warning', 'onCreateAndAppend error:', e.message, e.stack);
	      }
	    },
	    onDestroy: function onDestroy() {
	      playlist = null;
	    }
	  });
	  return comp;
	}

	function component$1(object) {
	  Lampa.Utils.extendParams(object, {
	    items: {
	      cols: 4
	    }
	  });
	  var comp = Lampa.Maker.make('Category', object, function (module) {
	    return module.toggle(Lampa.Maker.module('Category').MASK.base, 'Pagination');
	  });
	  var playlist = [];
	  comp.use({
	    onCreate: function onCreate() {
	      var _this = this;
	      Api.shotsChannel(object.id, object.page, function (result) {
	        playlist = Lampa.Arrays.clone(result.results);
	        _this.build(result);
	      }, this.empty.bind(this));
	    },
	    onNext: function onNext(resolve, reject) {
	      Api.shotsChannel(object.id, object.page, function (result) {
	        playlist = playlist.concat(result.results);
	        resolve(result);
	      }, reject.bind(this));
	    },
	    onlyCreateAndAppend: function onlyCreateAndAppend(element) {
	      try {
	        var item = new Shot(element, {
	          playlist: playlist
	        });
	        this.emit('instance', item, element);
	        item.create();
	        this.emit('append', item, element);
	      } catch (e) {
	        console.warn('Warning', 'onCreateAndAppend error:', e.message, e.stack);
	      }
	    },
	    onDestroy: function onDestroy() {
	      playlist = null;
	    }
	  });
	  return comp;
	}

	function backward() {
	  var head = Lampa.Template.get('head_backward', {
	    title: ''
	  });
	  head.find('.head-backward__button').on('click', function () {
	    Lampa.Controller.back();
	  });
	  return head;
	}
	function Present() {
	  this.onComplete = function () {};
	  this.onBack = function () {};
	  this.start = function () {
	    var _this = this;
	    var last_time_watched = Lampa.Storage.get('shots_present_watched', '0');
	    var wait_time = 1000 * 60 * 60 * 24 * 30; // 5 дней

	    if (Date.now() - last_time_watched < wait_time) {
	      return this.onComplete();
	    }
	    Lampa.Background.theme('black');
	    this.html = $("<div class=\"shots-video-present\">\n            <video autoplay poster=\"./img/video_poster.png\"></video>\n        </div>");
	    if (Lampa.Platform.mouse() || Lampa.Utils.isTouchDevice()) {
	      this.html.append(backward());
	    }
	    this.video = this.html.find('video')[0];
	    if (Lampa.Platform.is('apple')) this.video.setAttribute('playsinline', 'true');
	    this.video.src = 'https://cdn.cub.rip/shots_present/present.mp4';
	    this.video.load();
	    this.video.addEventListener('ended', this.stop.bind(this));
	    this.video.addEventListener('error', this.stop.bind(this));
	    this.video.addEventListener('timeupdate', function () {
	      clearTimeout(_this.timer_waite);
	    });
	    this.timer_waite = setTimeout(this.stop.bind(this), 6000);
	    $('body').append(this.html);
	    Lampa.Controller.add('shots_video_present', {
	      toggle: function toggle() {
	        Lampa.Controller.clear();
	      },
	      back: this.back.bind(this)
	    });
	    Lampa.Controller.toggle('shots_video_present');
	  };
	  this.stop = function () {
	    this.onComplete();
	    Lampa.Storage.set('shots_present_watched', Date.now());
	  };
	  this.back = function () {
	    this.onBack();
	  };
	  this.destroy = function () {
	    this.stop = function () {};
	    this.onComplete = function () {};
	    this.onBack = function () {};
	    if (!this.video) return;
	    this.video.pause();
	    this.video.src = '';
	    clearTimeout(this.timer_waite);
	    this.html.remove();
	    Lampa.Background.theme('reset');
	  };
	}

	var component = 'shots';
	var icon = "<svg id=\"sprite-shots\" viewBox=\"0 0 512 512\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M253.266 512a19.166 19.166 0 0 1-19.168-19.168V330.607l-135.071-.049a19.164 19.164 0 0 1-16.832-28.32L241.06 10.013a19.167 19.167 0 0 1 36.005 9.154v162.534h135.902a19.167 19.167 0 0 1 16.815 28.363L270.078 502.03a19.173 19.173 0 0 1-16.812 9.97z\" fill=\"white\"></path>\n</svg>";
	function init() {
	  Lampa.SettingsApi.addComponent({
	    component: component,
	    icon: icon,
	    name: Lampa.Lang.translate('Shots')
	  });
	  Lampa.SettingsApi.addParam({
	    component: component,
	    param: {
	      name: 'shots_in_player',
	      type: 'trigger',
	      default: true
	    },
	    field: {
	      name: Lampa.Lang.translate('shots_settings_in_player')
	    }
	  });
	  Lampa.SettingsApi.addParam({
	    component: component,
	    param: {
	      name: 'shots_in_card',
	      type: 'trigger',
	      default: true
	    },
	    field: {
	      name: Lampa.Lang.translate('shots_settings_in_card')
	    }
	  });
	}
	var Settings = {
	  init: init
	};

	function startPlugin() {
	  window.plugin_shots_ready = true;
	  function init() {
	    Lang.init();
	    Templates.init();
	    Player.init();
	    Handler.init();
	    Settings.init();
	    Favorite.init();
	    Created.init();
	    View.init();
	    Tags.load();
	    $('body').append("\n            <style>\n            @-webkit-keyframes shots-recorder-blink{0%,50%,100%{opacity:1}25%,75%{opacity:.2}}@keyframes shots-recorder-blink{0%,50%,100%{opacity:1}25%,75%{opacity:.2}}@-webkit-keyframes shots-progress-waiting{0%{width:0;left:0}50%{width:50%;left:25%}100%{width:0;left:100%}}@keyframes shots-progress-waiting{0%{width:0;left:0}50%{width:50%;left:25%}100%{width:0;left:100%}}@-webkit-keyframes shots-placeholder-shimmer{0%{background-position:-150% 0}100%{background-position:150% 0}}@keyframes shots-placeholder-shimmer{0%{background-position:-150% 0}100%{background-position:150% 0}}@-webkit-keyframes shots-animate-down{0%{-webkit-transform:translateY(-50%);transform:translateY(-50%)}100%{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes shots-animate-down{0%{-webkit-transform:translateY(-50%);transform:translateY(-50%)}100%{-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes shots-animate-up{0%{-webkit-transform:translateY(50%);transform:translateY(50%)}100%{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes shots-animate-up{0%{-webkit-transform:translateY(50%);transform:translateY(50%)}100%{-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes shots-push-button{0%{-webkit-transform:scale(1);transform:scale(1)}25%{-webkit-transform:scale(1.35);transform:scale(1.35)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes shots-push-button{0%{-webkit-transform:scale(1);transform:scale(1)}25%{-webkit-transform:scale(1.35);transform:scale(1.35)}100%{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes shots-slides-slide-up{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}100%{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes shots-slides-slide-up{0%{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}100%{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@-webkit-keyframes shots-slides-slide-out{0%{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}100%{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@keyframes shots-slides-slide-out{0%{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}100%{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}.shots-player-recorder{position:fixed;left:0;top:0;width:100%;height:100%;z-index:50}.shots-player-recorder__body{position:fixed;left:0;right:0;bottom:1.5em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.shots-player-recorder__plate{background-color:rgba(0,0,0,0.6);-webkit-border-radius:3em;border-radius:3em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.shots-player-recorder__text{padding:0 1.2em;line-height:1.4}.shots-player-recorder__button{padding:.9em;width:3em;height:3em;-webkit-border-radius:100%;border-radius:100%;position:relative;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.shots-player-recorder__button.animate-trigger-enter{-webkit-animation:animation-trigger-enter .2s forwards;animation:animation-trigger-enter .2s forwards}.shots-player-recorder__button>svg{width:1.2em;height:1.2em}.shots-player-recorder__button>div{position:absolute;bottom:100%;left:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);margin-bottom:1em;text-wrap:nowrap;display:none;text-shadow:0 0 .2em rgba(0,0,0,0.5);color:#fff}.shots-player-recorder__button.focus{background:#fff;color:#000}.shots-player-recorder__button.focus>div{display:block}.shots-preview{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.shots-preview__left{width:45%;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.shots-preview__screenshot{-webkit-border-radius:1em;border-radius:1em;padding-bottom:64%;position:relative;background:#222;overflow:hidden}.shots-preview__screenshot>img{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;opacity:0}.shots-preview__body{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;padding-left:2em;line-height:1.4}.shots-preview__year{font-size:.8em;margin-bottom:.5em}.shots-preview__title{font-size:1.3em;margin-bottom:.5em;overflow:hidden;-o-text-overflow:'.';text-overflow:'.';display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical}.shots-selector{padding:1.3em;-webkit-border-radius:.7em;border-radius:.7em;font-size:1.1em}.shots-selector:not(.shots-selector--transparent){background:rgba(255,255,255,0.1)}.shots-selector.focus{background:#fff;color:#000}.shots-checkbox{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.shots-checkbox__icon{width:1.3em;height:1.3em;margin-right:1em;border:.1em solid #fff;-webkit-border-radius:.3em;border-radius:.3em;position:relative}.shots-checkbox--checked .shots-checkbox__icon::after{content:'';position:absolute;left:.2em;top:.2em;right:.2em;bottom:.2em;background:#fff;-webkit-border-radius:.2em;border-radius:.2em}.shots-checkbox.focus .shots-checkbox__icon{border-color:#000}.shots-checkbox.focus .shots-checkbox__icon::after{background:#000}.shots-button{text-align:center}.shots-button+.shots-button{margin-top:.2em}.shots-modal-footer{padding-top:1em}.shots-view-button__title{position:relative}.shots-view-button__count{position:absolute;top:1.9em;left:12em;background:rgba(255,255,255,0.4);color:#fff;font-size:.7em;padding:.1em .4em;-webkit-border-radius:1.1em;border-radius:1.1em;text-align:center;min-width:2em;display:block;font-weight:700}.selectbox-item.focus .shots-view-button__count{background:rgba(0,0,0,0.4);color:#fff}.shots-modal-upload__body{margin-top:1.5em}.shots-modal-upload__body>*+*{margin-top:.2em}.shots-modal-upload__video{-webkit-border-radius:1em;border-radius:1em;overflow:hidden;margin-top:1.5em;background:#000}.shots-modal-upload__video video{background:#000;width:100%;display:block;aspect-ratio:16/9;-o-object-fit:contain;object-fit:contain}.shots-tags{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;margin:-0.25em}.shots-tags>div{padding:.3em .6em;-webkit-border-radius:.5em;border-radius:.5em;background:rgba(0,0,0,0.2);margin:.25em}.shots-tags>div>svg{width:1em !important;height:1em !important;margin-right:.6em;vertical-align:bottom}.shots-progress__text{font-size:.8em;margin-bottom:.8em}.shots-progress__bar{background:rgba(255,255,255,0.17);position:relative;-webkit-border-radius:1em;border-radius:1em;height:.4em;overflow:hidden}.shots-progress__bar>div{height:.4em;-webkit-border-radius:1em;border-radius:1em;background:#fff;position:absolute;left:0;top:0}.shots-progress.focus{background:rgba(255,255,255,0.1);color:#fff}.shots-progress.state--waiting .shots-progress__bar>div{width:10%;-webkit-animation:shots-progress-waiting 1s infinite;animation:shots-progress-waiting 1s infinite}.shots-lenta{position:absolute;left:0;top:0;width:100%;height:100%;z-index:50;background:#000}.shots-lenta--hide-panel .shots-lenta__panel{opacity:0;pointer-events:none;-webkit-transform:translate3d(0,2em,0);transform:translate3d(0,2em,0)}.shots-lenta--hide-panel .shots-lenta-video__progress-bar{opacity:.2;pointer-events:none}.shots-lenta__video{position:absolute;left:0;top:0;width:100%;height:100%;background:#000}.shots-lenta__panel{position:absolute;bottom:0;left:0;right:0;padding:1em;padding-bottom:2em;background:-webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,0)),to(rgba(0,0,0,0.54)));background:-webkit-linear-gradient(top,rgba(0,0,0,0) 0,rgba(0,0,0,0.54) 100%);background:-o-linear-gradient(top,rgba(0,0,0,0) 0,rgba(0,0,0,0.54) 100%);background:linear-gradient(to bottom,rgba(0,0,0,0) 0,rgba(0,0,0,0.54) 100%);-webkit-transition:opacity .3s ease,-webkit-transform .3s ease;transition:opacity .3s ease,-webkit-transform .3s ease;-o-transition:transform .3s ease,opacity .3s ease;transition:transform .3s ease,opacity .3s ease;transition:transform .3s ease,opacity .3s ease,-webkit-transform .3s ease}.shots-lenta .head-backward__button{top:1em}.shots-lenta-video__video-element{position:absolute;left:0;top:0;width:100%;height:100%;-o-object-fit:contain;object-fit:contain;background:#000}.shots-lenta-video__progress-bar{position:absolute;z-index:1;left:1em;right:1em;bottom:1em;background:rgba(255,255,255,0.3);-webkit-border-radius:1em;border-radius:1em;-webkit-transition:opacity .3s ease,-webkit-transform .3s ease;transition:opacity .3s ease,-webkit-transform .3s ease;-o-transition:transform .3s ease,opacity .3s ease;transition:transform .3s ease,opacity .3s ease;transition:transform .3s ease,opacity .3s ease,-webkit-transform .3s ease}.shots-lenta-video__progress-bar>div{height:.3em;-webkit-border-radius:1em;border-radius:1em;background:#fff;-webkit-transition:width .3s linear;-o-transition:width .3s linear;transition:width .3s linear}.shots-lenta-video__loader.show{display:block}.shots-lenta-video__layer{position:absolute;left:0;top:0;width:100%;height:100%}.shots-lenta-panel{position:relative}.shots-lenta-panel .explorer-card__head-body{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1}@media screen and (max-width:400px){.shots-lenta-panel .explorer-card__head-left{font-size:.8em}}.shots-lenta-panel__card{width:50%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;align-items:flex-end;margin-bottom:0}@media screen and (max-width:580px){.shots-lenta-panel__card{width:80%}}.shots-lenta-panel__card-title{font-size:1.8em;margin-top:.3em;line-height:1.4;text-shadow:0 0 .2em rgba(0,0,0,0.5);overflow:hidden;-o-text-overflow:'.';text-overflow:'.';display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical}.shots-lenta-panel__card-year{font-size:1em;display:inline-block}.shots-lenta-panel__card-img{background:rgba(255,255,255,0.1);-webkit-border-radius:.3em;border-radius:.3em}.shots-lenta-panel__card-img img{opacity:0}.shots-lenta-panel__card-img.loaded{background:transparent}.shots-lenta-panel__card-img.loaded img{opacity:1}.shots-lenta-panel__card-img.focus:after{z-index:1;right:0;left:0;bottom:0;top:0;-webkit-border-radius:.3em;border-radius:.3em}.shots-lenta-panel__card.loading .shots-lenta-panel__card-title,.shots-lenta-panel__card.loading .shots-lenta-panel__card-year,.shots-lenta-panel__card.loading .shots-lenta-panel__card-img{background:rgba(255,255,255,0.1);-webkit-border-radius:.3em;border-radius:.3em;color:transparent;background-image:-webkit-gradient(linear,left top,right top,from(rgba(255,255,255,0)),color-stop(50%,rgba(255,255,255,0.25)),to(rgba(255,255,255,0)));background-image:-webkit-linear-gradient(left,rgba(255,255,255,0) 0,rgba(255,255,255,0.25) 50%,rgba(255,255,255,0) 100%);background-image:-o-linear-gradient(left,rgba(255,255,255,0) 0,rgba(255,255,255,0.25) 50%,rgba(255,255,255,0) 100%);background-image:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,0.25) 50%,rgba(255,255,255,0) 100%);background-size:300% 100%;background-repeat:no-repeat;-webkit-animation:shots-placeholder-shimmer 1.5s ease-in-out infinite;animation:shots-placeholder-shimmer 1.5s ease-in-out infinite}.shots-lenta-panel__card.loading .shots-lenta-panel__card-img img{opacity:0}.shots-lenta-panel__tags{margin-top:1em}.shots-lenta-panel__counters{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.shots-lenta-panel__recorder{line-height:1.6}.shots-lenta-panel__author{display:inline-block}@media screen and (max-width:580px){.shots-lenta-panel__author{margin-bottom:1em}.shots-lenta-panel__author .shots-author__name{display:none}}.shots-lenta-panel__right{position:absolute;right:0;bottom:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding-left:2em}@media screen and (max-width:580px){.shots-lenta-panel__right{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}}@media screen and (max-width:400px){.shots-lenta-panel__right{font-size:1.1em}}.shots-lenta-panel__buttons{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.shots-lenta-panel__buttons>div{width:3em;height:3em;-webkit-border-radius:100%;border-radius:100%;background:rgba(0,0,0,0.2);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;margin-left:.5em}.shots-lenta-panel__buttons>div>svg{width:1.5em !important;height:1.5em !important}.shots-lenta-panel__buttons>div.focus{background:#fff;color:#000}.shots-lenta-panel__buttons>div.focus.active.action-liked{color:#ea4e4e}.shots-lenta-panel__buttons>div.focus.active.action-favorite{color:#ffc34b}.shots-lenta-panel__buttons>div:not(.active) .icon-fill{fill:transparent}.shots-lenta-panel__buttons>div.active svg{-webkit-animation:shots-push-button .2s ease forwards;animation:shots-push-button .2s ease forwards}@media screen and (max-width:580px){.shots-lenta-panel__buttons{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.shots-lenta-panel__buttons>div{margin-left:0;margin-top:1em}}.shots-counter div{font-size:1.6em;margin-top:.3em}.shots-author{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.shots-author__img{width:3em;height:3em;-webkit-border-radius:100%;border-radius:100%;background:rgba(255,255,255,0.1);overflow:hidden;position:relative}.shots-author__img img{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;opacity:0}.shots-author__img.loaded{background:transparent}.shots-author__img.loaded img{opacity:1}.shots-author__name{font-size:1.3em;padding-left:1em;padding-right:1em}.shots-author.focus{background:#fff;-webkit-border-radius:3em;border-radius:3em;color:#000}.shots-author.focus .shots-author__img{-webkit-transform:scale(0.8);-ms-transform:scale(0.8);transform:scale(0.8)}.shots-status{background:rgba(0,0,0,0.5);padding:.3em .8em;-webkit-border-radius:1em;border-radius:.6em;display:inline-block;font-size:.9em;line-height:1.4;padding-top:0}.shots-status--ready{background:#8ab75b}.shots-status--error{background:#d9534f}.shots-status--processing{background:#f0ad4e}.shots-status--blocked{background:#5b7c9c}.shots-status--deleted{background:#d04545}.full-episode--shot .shots-tags>div{background:rgba(0,0,0,0.5)}.full-episode--shot .full-episode__body{background:-webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,0.5)),color-stop(40%,rgba(0,0,0,0)));background:-webkit-linear-gradient(bottom,rgba(0,0,0,0.5) 0,rgba(0,0,0,0) 40%);background:-o-linear-gradient(bottom,rgba(0,0,0,0.5) 0,rgba(0,0,0,0) 40%);background:linear-gradient(0,rgba(0,0,0,0.5) 0,rgba(0,0,0,0) 40%)}.full-episode--shot .full-episode__date{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.full-episode--shot .full-episode__liked{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.full-episode--shot .full-episode__liked svg{width:1em !important;height:1em !important;margin-right:.3em}.full-episode--shot .full-episode__shot-icon{position:absolute;top:1em;left:1em}.full-episode--shot .full-episode__shot-icon svg{width:2em !important;height:2em !important}.full-episode--shot .shots-status{margin-top:.7em}.shots-player--recording .player-panel,.shots-player--recording .player-info,.shots-player--recording .player-footer{display:none}.shots-player-card{padding:0;width:16em}.shots-player-card .card__view{margin-bottom:0}.shots-player-segments{position:relative;z-index:1}.shots-player-segments__time{position:absolute;top:0;background:#b995ff;height:100%;height:.4em;pointer-events:none}.shots-player-segments__picture{position:absolute;bottom:1em;display:none;cursor:pointer}.shots-player-segments__picture img{width:7em;height:4em;-o-object-fit:cover;object-fit:cover;opacity:0;-webkit-transition:opacity .3s ease;-o-transition:opacity .3s ease;transition:opacity .3s ease;-webkit-border-radius:.3em;border-radius:.3em}.shots-player-segments__picture--loaded img{opacity:1}.shots-player-segments.focus .shots-player-segments__picture{display:block}.shots-video-present{position:fixed;left:0;top:0;width:100%;height:100%;background:#000;z-index:50}.shots-video-present video{position:fixed;left:0;top:0;width:100%;height:100%;-o-object-fit:contain;object-fit:contain}.shots-video-present .head-backward{position:absolute;top:.65em}.shots-svg-auto{height:auto !important}.shots-svg-auto--helmet{max-height:6em}.shots-selector-tags{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-border-radius:.7em;border-radius:.7em;background:rgba(255,255,255,0.1);padding:.2em}.shots-selector-tags__tag{display:inline-block;background:rgba(0,0,0,0.2);padding:0 1em;-webkit-border-radius:.6em;border-radius:.6em;margin:.2em;position:relative}.shots-selector-tags__tag span{font-size:1.1em;display:inline-block;padding:.6em 0}.shots-selector-tags__tag svg{width:1.2em !important;height:1.2em !important;margin-right:1em}.shots-selector-tags__tag.active::after{content:'';display:block;position:absolute;right:.4em;top:50%;height:.5em;width:.5em;-webkit-border-radius:1em;border-radius:1em;background:#ffb509;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%)}.shots-selector-tags__tag.active span{-webkit-transform:translateX(-0.3em);-ms-transform:translateX(-0.3em);transform:translateX(-0.3em)}.shots-selector-tags__tag.focus{background:#fff;color:#000}.shots-selector-tags__tag.focus::after{background:#000}.shots-line-title{font-size:1.1em;margin-bottom:.7em}.shots-slides{position:absolute;top:0;left:0;width:100%;height:100%;z-index:50}.shots-slides .head-backward{position:absolute;top:.65em}.shots-slides__slide{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);-o-object-fit:contain;object-fit:contain;background:#08090d}.shots-slides__slide.active{-webkit-animation:shots-slides-slide-up .5s forwards;animation:shots-slides-slide-up .5s forwards}.shots-slides__slide.up{-webkit-animation:shots-slides-slide-out .5s forwards;animation:shots-slides-slide-out .5s forwards}.shots-slides__down{position:absolute;left:50%;bottom:2em;background:rgba(255,255,255,0.3);padding:.7em 1.3em;-webkit-border-radius:3em;border-radius:3em;-webkit-transform:translate3d(-50%,1em,0);transform:translate3d(-50%,1em,0);opacity:0;-webkit-transition:opacity .5s,-webkit-transform .5s;transition:opacity .5s,-webkit-transform .5s;-o-transition:opacity .5s,transform .5s;transition:opacity .5s,transform .5s;transition:opacity .5s,transform .5s,-webkit-transform .5s}.shots-slides__down.active{opacity:1;-webkit-transform:translate3d(-50%,0,0);transform:translate3d(-50%,0,0)}.shots-slides__install{position:absolute;left:50%;bottom:2em;background:#fff;color:#000;padding:.7em 1.3em;-webkit-border-radius:3em;border-radius:3em;-webkit-transform:translate3d(-50%,3em,0);transform:translate3d(-50%,3em,0);opacity:0;-webkit-transition:opacity .5s,-webkit-transform .5s;transition:opacity .5s,-webkit-transform .5s;-o-transition:opacity .5s,transform .5s;transition:opacity .5s,transform .5s;transition:opacity .5s,transform .5s,-webkit-transform .5s;font-size:1.7em}.shots-slides__install.active{opacity:1;-webkit-transform:translate3d(-50%,0,0);transform:translate3d(-50%,0,0)}.shots-player-button.focus .rec{fill:#ff0101}body.true--mobile .shots-lenta__panel,body.true--mobile .shots-player-recorder__body{bottom:4em}body.true--mobile .shots-lenta-video__progress-bar{bottom:3em}\n            </style>\n        ");

	    // Добавляем компоненты

	    Lampa.Component.add('shots_list', component$3);
	    Lampa.Component.add('shots_card', component$2);
	    Lampa.Component.add('shots_channel', component$1);

	    // Экран закладок - шоты

	    Lampa.ContentRows.add({
	      index: 1,
	      screen: ['bookmarks'],
	      call: function call(params, screen) {
	        var favotite = Favorite.get();
	        var created = Created.get();
	        var lines = [];
	        var onmore = {
	          emit: {
	            onMore: function onMore() {
	              Lampa.Activity.push({
	                url: this.data.type,
	                title: this.data.title,
	                component: 'shots_list',
	                page: 2
	              });
	            }
	          }
	        };
	        Lampa.Utils.extendItemsParams(favotite, {
	          createInstance: function createInstance(item_data) {
	            return Shot(item_data, {
	              playlist: favotite,
	              onNext: function onNext(page, call) {
	                Favorite.page(page, call);
	              }
	            });
	          }
	        });
	        Lampa.Utils.extendItemsParams(created, {
	          createInstance: function createInstance(item_data) {
	            return Shot(item_data, {
	              playlist: created,
	              onNext: function onNext(page, call) {
	                Created.page(page, call);
	              }
	            });
	          }
	        });
	        if (favotite.length) {
	          lines.push({
	            title: Lampa.Lang.translate('shots_title_favorite'),
	            results: favotite,
	            type: 'favorite',
	            total_pages: favotite.length >= 20 ? 2 : 1,
	            params: onmore
	          });
	        }
	        if (created.length) {
	          lines.push({
	            title: Lampa.Lang.translate('shots_title_created'),
	            results: created,
	            type: 'created',
	            total_pages: created.length >= 20 ? 2 : 1,
	            params: onmore
	          });
	        }
	        if (lines.length) return lines;
	      }
	    });

	    // Главный экран - шоты

	    Lampa.ContentRows.add({
	      name: 'shots_main',
	      title: 'Shots',
	      index: 2,
	      screen: ['main'],
	      call: function call(params, screen) {
	        if (Lampa.Account.Permit.child) return;
	        return function (call) {
	          Api.lenta({
	            sort: 'new'
	          }, function (shots) {
	            Lampa.Utils.extendItemsParams(shots, {
	              createInstance: function createInstance(item_data) {
	                return Shot(item_data, {
	                  playlist: shots,
	                  onNext: function onNext(page, call) {
	                    Api.lenta({
	                      sort: 'new',
	                      page: page
	                    }, call);
	                  }
	                });
	              }
	            });
	            call({
	              title: 'Shots',
	              results: shots,
	              type: 'favorite',
	              total_pages: 1,
	              icon_svg: '<svg><use xlink:href="#sprite-shots"></use></svg>',
	              icon_bgcolor: '#fff',
	              icon_color: '#fd4518',
	              params: {
	                module: Lampa.Maker.module('Line').toggle(Lampa.Maker.module('Line').MASK.base, 'Icon')
	              }
	            });
	          });
	        };
	      }
	    });

	    // Кнопка в меню

	    var waiting = false;
	    Lampa.Menu.addButton('<svg><use xlink:href="#sprite-shots"></use></svg>', 'Shots', function () {
	      var present = new Present();
	      present.onComplete = function () {
	        present.onBack = function () {};
	        if (waiting) return;
	        var items = [{
	          title: Lampa.Lang.translate('shots_watch_roll'),
	          onSelect: function onSelect() {
	            Lampa.Controller.toggle('content');
	            waiting = true;
	            var call = function call(shots) {
	              Lampa.Loading.stop();
	              present.destroy();
	              waiting = false;
	              if (shots.length == 0) {
	                return Lampa.Bell.push({
	                  icon: '<svg><use xlink:href="#sprite-shots"></use></svg>',
	                  text: Lampa.Lang.translate('shots_alert_noshots')
	                });
	              }
	              var lenta = new Lenta(shots[0], shots);
	              lenta.onNext = function (page, call) {
	                Roll.next(call);
	              };
	              lenta.start();
	            };
	            Lampa.Loading.start(function () {
	              waiting = false;
	              present.destroy();
	              call = function call() {};
	              Lampa.Loading.stop();
	            });
	            Roll.start(call);
	          }
	        }, {
	          title: Lampa.Lang.translate('shots_choose_tags_select'),
	          separator: true
	        }];
	        Tags.list().forEach(function (tag) {
	          items.push({
	            title: tag.title,
	            tag: tag,
	            checkbox: true
	          });
	        });
	        items.push({
	          title: Lampa.Lang.translate('shots_watch_tags'),
	          onSelect: function onSelect() {
	            Lampa.Controller.toggle('content');
	            var selected_tags = items.filter(function (a) {
	              return a.checked && a.tag;
	            }).map(function (a) {
	              return a.tag;
	            });
	            var tags_slug = selected_tags.map(function (t) {
	              return t.slug;
	            }).join(',');
	            if (selected_tags.length == 0) return Lampa.Bell.push({
	              icon: '<svg><use xlink:href="#sprite-shots"></use></svg>',
	              text: Lampa.Lang.translate('shots_alert_no_tags')
	            });
	            Api.lenta({
	              tags: tags_slug
	            }, function (shots) {
	              if (shots.length == 0) {
	                return Lampa.Bell.push({
	                  icon: '<svg><use xlink:href="#sprite-shots"></use></svg>',
	                  text: Lampa.Lang.translate('shots_alert_noshots')
	                });
	              }
	              var lenta = new Lenta(shots[0], shots);
	              lenta.onNext = function (page, call) {
	                Api.lenta({
	                  tags: tags_slug,
	                  page: page
	                }, call);
	              };
	              lenta.start();
	            });
	          }
	        });
	        Lampa.Select.show({
	          title: Lampa.Lang.translate('Shots'),
	          items: items,
	          onBack: function onBack() {
	            Lampa.Controller.toggle('content');
	          }
	        });
	      };
	      present.onBack = function () {
	        present.destroy();
	        Lampa.Controller.toggle('content');
	      };
	      present.start();
	    });
	  }
	  if (Lampa.Manifest.app_digital >= 307) {
	    if (window.appready) init();else {
	      Lampa.Listener.follow('app', function (e) {
	        if (e.type == 'ready') init();
	      });
	    }
	  }
	}
	if (!window.plugin_shots_ready && Lampa.Lang.selected(['ru', 'uk', 'be'])) startPlugin();

})();
