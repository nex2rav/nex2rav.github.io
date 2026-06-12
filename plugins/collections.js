(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math === Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var globalThis_1 =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$e = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$d = fails$e;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$d(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
	});

	var fails$c = fails$e;

	var functionBindNative = !fails$c(function () {
	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
	  var test = function () { /* empty */ }.bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$2 = functionBindNative;

	var call$4 = Function.prototype.call;
	// eslint-disable-next-line es/no-function-prototype-bind -- safe
	var functionCall = NATIVE_BIND$2 ? call$4.bind(call$4) : function () {
	  return call$4.apply(call$4, arguments);
	};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$2(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;

	var createPropertyDescriptor$3 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var NATIVE_BIND$1 = functionBindNative;

	var FunctionPrototype$1 = Function.prototype;
	var call$3 = FunctionPrototype$1.call;
	// eslint-disable-next-line es/no-function-prototype-bind -- safe
	var uncurryThisWithBind = NATIVE_BIND$1 && FunctionPrototype$1.bind.bind(call$3, call$3);

	var functionUncurryThis = NATIVE_BIND$1 ? uncurryThisWithBind : function (fn) {
	  return function () {
	    return call$3.apply(fn, arguments);
	  };
	};

	var uncurryThis$e = functionUncurryThis;

	var toString$4 = uncurryThis$e({}.toString);
	var stringSlice$1 = uncurryThis$e(''.slice);

	var classofRaw$2 = function (it) {
	  return stringSlice$1(toString$4(it), 8, -1);
	};

	var uncurryThis$d = functionUncurryThis;
	var fails$b = fails$e;
	var classof$5 = classofRaw$2;

	var $Object$3 = Object;
	var split = uncurryThis$d(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$b(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object$3('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$5(it) === 'String' ? split(it, '') : $Object$3(it);
	} : $Object$3;

	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	var isNullOrUndefined$2 = function (it) {
	  return it === null || it === undefined;
	};

	var isNullOrUndefined$1 = isNullOrUndefined$2;

	var $TypeError$8 = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$2 = function (it) {
	  if (isNullOrUndefined$1(it)) throw new $TypeError$8("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$1 = indexedObject;
	var requireObjectCoercible$1 = requireObjectCoercible$2;

	var toIndexedObject$4 = function (it) {
	  return IndexedObject$1(requireObjectCoercible$1(it));
	};

	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
	var documentAll = typeof document == 'object' && document.all;

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
	var isCallable$c = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
	  return typeof argument == 'function' || argument === documentAll;
	} : function (argument) {
	  return typeof argument == 'function';
	};

	var isCallable$b = isCallable$c;

	var isObject$7 = function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$b(it);
	};

	var globalThis$c = globalThis_1;
	var isCallable$a = isCallable$c;

	var aFunction = function (argument) {
	  return isCallable$a(argument) ? argument : undefined;
	};

	var getBuiltIn$4 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(globalThis$c[namespace]) : globalThis$c[namespace] && globalThis$c[namespace][method];
	};

	var uncurryThis$c = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$c({}.isPrototypeOf);

	var globalThis$b = globalThis_1;

	var navigator = globalThis$b.navigator;
	var userAgent$3 = navigator && navigator.userAgent;

	var environmentUserAgent = userAgent$3 ? String(userAgent$3) : '';

	var globalThis$a = globalThis_1;
	var userAgent$2 = environmentUserAgent;

	var process = globalThis$a.process;
	var Deno = globalThis$a.Deno;
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
	var fails$a = fails$e;
	var globalThis$9 = globalThis_1;

	var $String$4 = globalThis$9.String;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$a(function () {
	  var symbol = Symbol('symbol detection');
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
	  // of course, fail.
	  return !$String$4(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */
	var NATIVE_SYMBOL$1 = symbolConstructorDetection;

	var useSymbolAsUid = NATIVE_SYMBOL$1 &&
	  !Symbol.sham &&
	  typeof Symbol.iterator == 'symbol';

	var getBuiltIn$3 = getBuiltIn$4;
	var isCallable$9 = isCallable$c;
	var isPrototypeOf = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var $Object$2 = Object;

	var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$3('Symbol');
	  return isCallable$9($Symbol) && isPrototypeOf($Symbol.prototype, $Object$2(it));
	};

	var $String$3 = String;

	var tryToString$2 = function (argument) {
	  try {
	    return $String$3(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var isCallable$8 = isCallable$c;
	var tryToString$1 = tryToString$2;

	var $TypeError$7 = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$3 = function (argument) {
	  if (isCallable$8(argument)) return argument;
	  throw new $TypeError$7(tryToString$1(argument) + ' is not a function');
	};

	var aCallable$2 = aCallable$3;
	var isNullOrUndefined = isNullOrUndefined$2;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$1 = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined(func) ? undefined : aCallable$2(func);
	};

	var call$2 = functionCall;
	var isCallable$7 = isCallable$c;
	var isObject$6 = isObject$7;

	var $TypeError$6 = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$7(fn = input.toString) && !isObject$6(val = call$2(fn, input))) return val;
	  if (isCallable$7(fn = input.valueOf) && !isObject$6(val = call$2(fn, input))) return val;
	  if (pref !== 'string' && isCallable$7(fn = input.toString) && !isObject$6(val = call$2(fn, input))) return val;
	  throw new $TypeError$6("Can't convert object to primitive value");
	};

	var sharedStore = {exports: {}};

	var globalThis$8 = globalThis_1;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$2 = Object.defineProperty;

	var defineGlobalProperty$3 = function (key, value) {
	  try {
	    defineProperty$2(globalThis$8, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    globalThis$8[key] = value;
	  } return value;
	};

	var globalThis$7 = globalThis_1;
	var defineGlobalProperty$2 = defineGlobalProperty$3;

	var SHARED = '__core-js_shared__';
	var store$3 = sharedStore.exports = globalThis$7[SHARED] || defineGlobalProperty$2(SHARED, {});

	(store$3.versions || (store$3.versions = [])).push({
	  version: '3.49.0',
	  mode: 'global',
	  copyright: '© 2013–2025 Denis Pushkarev (zloirock.ru), 2025–2026 CoreJS Company (core-js.io). All rights reserved.',
	  license: 'https://github.com/zloirock/core-js/blob/v3.49.0/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var store$2 = sharedStore.exports;

	var shared$3 = function (key, value) {
	  return store$2[key] || (store$2[key] = value || {});
	};

	var requireObjectCoercible = requireObjectCoercible$2;

	var $Object$1 = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$5 = function (argument) {
	  return $Object$1(requireObjectCoercible(argument));
	};

	var uncurryThis$b = functionUncurryThis;
	var toObject$4 = toObject$5;

	var hasOwnProperty = uncurryThis$b({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$4(it), key);
	};

	var uncurryThis$a = functionUncurryThis;

	var id = 0;
	var postfix = Math.random();
	var toString$3 = uncurryThis$a(1.1.toString);

	var uid$2 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$3(++id + postfix, 36);
	};

	var globalThis$6 = globalThis_1;
	var shared$2 = shared$3;
	var hasOwn$6 = hasOwnProperty_1;
	var uid$1 = uid$2;
	var NATIVE_SYMBOL = symbolConstructorDetection;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var Symbol$1 = globalThis$6.Symbol;
	var WellKnownSymbolsStore = shared$2('wks');
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1['for'] || Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

	var wellKnownSymbol$7 = function (name) {
	  if (!hasOwn$6(WellKnownSymbolsStore, name)) {
	    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$6(Symbol$1, name)
	      ? Symbol$1[name]
	      : createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var call$1 = functionCall;
	var isObject$5 = isObject$7;
	var isSymbol$1 = isSymbol$2;
	var getMethod = getMethod$1;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$6 = wellKnownSymbol$7;

	var $TypeError$5 = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol$6('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$1 = function (input, pref) {
	  if (!isObject$5(input) || isSymbol$1(input)) return input;
	  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$1(exoticToPrim, input, pref);
	    if (!isObject$5(result) || isSymbol$1(result)) return result;
	    throw new $TypeError$5("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive = toPrimitive$1;
	var isSymbol = isSymbol$2;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$2 = function (argument) {
	  var key = toPrimitive(argument, 'string');
	  return isSymbol(key) ? key : key + '';
	};

	var globalThis$5 = globalThis_1;
	var isObject$4 = isObject$7;

	var document$1 = globalThis$5.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$4(document$1) && isObject$4(document$1.createElement);

	var documentCreateElement$2 = function (it) {
	  return EXISTS$1 ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$9 = descriptors;
	var fails$9 = fails$e;
	var createElement = documentCreateElement$2;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$9 && !fails$9(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a !== 7;
	});

	var DESCRIPTORS$8 = descriptors;
	var call = functionCall;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var createPropertyDescriptor$2 = createPropertyDescriptor$3;
	var toIndexedObject$3 = toIndexedObject$4;
	var toPropertyKey$1 = toPropertyKey$2;
	var hasOwn$5 = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$8 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$3(O);
	  P = toPropertyKey$1(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$5(O, P)) return createPropertyDescriptor$2(!call(propertyIsEnumerableModule.f, O, P), O[P]);
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$7 = descriptors;
	var fails$8 = fails$e;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$7 && fails$8(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype !== 42;
	});

	var isObject$3 = isObject$7;

	var $String$2 = String;
	var $TypeError$4 = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$4 = function (argument) {
	  if (isObject$3(argument)) return argument;
	  throw new $TypeError$4($String$2(argument) + ' is not an object');
	};

	var DESCRIPTORS$6 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$3 = anObject$4;
	var toPropertyKey = toPropertyKey$2;

	var $TypeError$3 = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$6 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
	  anObject$3(O);
	  P = toPropertyKey(P);
	  anObject$3(Attributes);
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
	  anObject$3(O);
	  P = toPropertyKey(P);
	  anObject$3(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError$3('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$5 = descriptors;
	var definePropertyModule$4 = objectDefineProperty;
	var createPropertyDescriptor$1 = createPropertyDescriptor$3;

	var createNonEnumerableProperty$3 = DESCRIPTORS$5 ? function (object, key, value) {
	  return definePropertyModule$4.f(object, key, createPropertyDescriptor$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var makeBuiltIn$2 = {exports: {}};

	var DESCRIPTORS$4 = descriptors;
	var hasOwn$4 = hasOwnProperty_1;

	var FunctionPrototype = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$4 && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$4(FunctionPrototype, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && function something() { /* empty */ }.name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$4 || (DESCRIPTORS$4 && getDescriptor(FunctionPrototype, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var uncurryThis$9 = functionUncurryThis;
	var isCallable$6 = isCallable$c;
	var store$1 = sharedStore.exports;

	var functionToString = uncurryThis$9(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$6(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	var inspectSource$2 = store$1.inspectSource;

	var globalThis$4 = globalThis_1;
	var isCallable$5 = isCallable$c;

	var WeakMap$1 = globalThis$4.WeakMap;

	var weakMapBasicDetection = isCallable$5(WeakMap$1) && /native code/.test(String(WeakMap$1));

	var shared$1 = shared$3;
	var uid = uid$2;

	var keys = shared$1('keys');

	var sharedKey$2 = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys$4 = {};

	var NATIVE_WEAK_MAP = weakMapBasicDetection;
	var globalThis$3 = globalThis_1;
	var isObject$2 = isObject$7;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$3;
	var hasOwn$3 = hasOwnProperty_1;
	var shared = sharedStore.exports;
	var sharedKey$1 = sharedKey$2;
	var hiddenKeys$3 = hiddenKeys$4;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$1 = globalThis$3.TypeError;
	var WeakMap = globalThis$3.WeakMap;
	var set, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$2(it) || (state = get(it)).type !== TYPE) {
	      throw new TypeError$1('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared.state) {
	  var store = shared.state || (shared.state = new WeakMap());
	  /* eslint-disable no-self-assign -- prototype methods protection */
	  store.get = store.get;
	  store.has = store.has;
	  store.set = store.set;
	  /* eslint-enable no-self-assign -- prototype methods protection */
	  set = function (it, metadata) {
	    if (store.has(it)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    store.set(it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return store.get(it) || {};
	  };
	  has = function (it) {
	    return store.has(it);
	  };
	} else {
	  var STATE = sharedKey$1('state');
	  hiddenKeys$3[STATE] = true;
	  set = function (it, metadata) {
	    if (hasOwn$3(it, STATE)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$2(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return hasOwn$3(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$3(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var uncurryThis$8 = functionUncurryThis;
	var fails$7 = fails$e;
	var isCallable$4 = isCallable$c;
	var hasOwn$2 = hasOwnProperty_1;
	var DESCRIPTORS$3 = descriptors;
	var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
	var inspectSource$1 = inspectSource$2;
	var InternalStateModule = internalState;

	var enforceInternalState = InternalStateModule.enforce;
	var getInternalState = InternalStateModule.get;
	var $String$1 = String;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$1 = Object.defineProperty;
	var stringSlice = uncurryThis$8(''.slice);
	var replace = uncurryThis$8(''.replace);
	var join = uncurryThis$8([].join);

	var CONFIGURABLE_LENGTH = DESCRIPTORS$3 && !fails$7(function () {
	  return defineProperty$1(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
	});

	var TEMPLATE = String(String).split('String');

	var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
	  if (stringSlice($String$1(name), 0, 7) === 'Symbol(') {
	    name = '[' + replace($String$1(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
	  }
	  if (options && options.getter) name = 'get ' + name;
	  if (options && options.setter) name = 'set ' + name;
	  if (!hasOwn$2(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
	    if (DESCRIPTORS$3) defineProperty$1(value, 'name', { value: name, configurable: true });
	    else value.name = name;
	  }
	  if (CONFIGURABLE_LENGTH && options && hasOwn$2(options, 'arity') && value.length !== options.arity) {
	    defineProperty$1(value, 'length', { value: options.arity });
	  }
	  try {
	    if (options && hasOwn$2(options, 'constructor') && options.constructor) {
	      if (DESCRIPTORS$3) defineProperty$1(value, 'prototype', { writable: false });
	    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
	    } else if (value.prototype) value.prototype = undefined;
	  } catch (error) { /* empty */ }
	  var state = enforceInternalState(value);
	  if (!hasOwn$2(state, 'source')) {
	    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
	  } return value;
	};

	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	// eslint-disable-next-line no-extend-native -- required
	Function.prototype.toString = makeBuiltIn$1(function toString() {
	  return isCallable$4(this) && getInternalState(this).source || inspectSource$1(this);
	}, 'toString');

	var isCallable$3 = isCallable$c;
	var definePropertyModule$3 = objectDefineProperty;
	var makeBuiltIn = makeBuiltIn$2.exports;
	var defineGlobalProperty$1 = defineGlobalProperty$3;

	var defineBuiltIn$2 = function (O, key, value, options) {
	  if (!options) options = {};
	  var simple = options.enumerable;
	  var name = options.name !== undefined ? options.name : key;
	  if (isCallable$3(value)) makeBuiltIn(value, name, options);
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
	var floor$1 = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor$1 : ceil)(n);
	};

	var trunc = mathTrunc;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$2 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};

	var toIntegerOrInfinity$1 = toIntegerOrInfinity$2;

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$1 = function (index, length) {
	  var integer = toIntegerOrInfinity$1(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	var toIntegerOrInfinity = toIntegerOrInfinity$2;

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$1 = function (argument) {
	  var len = toIntegerOrInfinity(argument);
	  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength = toLength$1;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$4 = function (obj) {
	  return toLength(obj.length);
	};

	var toIndexedObject$2 = toIndexedObject$4;
	var toAbsoluteIndex = toAbsoluteIndex$1;
	var lengthOfArrayLike$3 = lengthOfArrayLike$4;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$1 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$2($this);
	    var length = lengthOfArrayLike$3(O);
	    if (length === 0) return !IS_INCLUDES && -1;
	    var index = toAbsoluteIndex(fromIndex, length);
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
	  includes: createMethod$1(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$1(false)
	};

	var uncurryThis$7 = functionUncurryThis;
	var hasOwn$1 = hasOwnProperty_1;
	var toIndexedObject$1 = toIndexedObject$4;
	var indexOf = arrayIncludes.indexOf;
	var hiddenKeys$2 = hiddenKeys$4;

	var push$1 = uncurryThis$7([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$1(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$1(hiddenKeys$2, key) && hasOwn$1(O, key) && push$1(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$1(O, key = names[i++])) {
	    ~indexOf(result, key) || push$1(result, key);
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
	var uncurryThis$6 = functionUncurryThis;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var anObject$2 = anObject$4;

	var concat = uncurryThis$6([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$1 = getBuiltIn$2('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject$2(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn = hasOwnProperty_1;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule$2 = objectDefineProperty;

	var copyConstructorProperties$1 = function (target, source, exceptions) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule$2.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var fails$6 = fails$e;
	var isCallable$2 = isCallable$c;

	var replacement = /#|\.prototype\./;

	var isForced$1 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value === POLYFILL ? true
	    : value === NATIVE ? false
	    : isCallable$2(detection) ? fails$6(detection)
	    : !!detection;
	};

	var normalize = isForced$1.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$1.data = {};
	var NATIVE = isForced$1.NATIVE = 'N';
	var POLYFILL = isForced$1.POLYFILL = 'P';

	var isForced_1 = isForced$1;

	var globalThis$2 = globalThis_1;
	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$3;
	var defineBuiltIn$1 = defineBuiltIn$2;
	var defineGlobalProperty = defineGlobalProperty$3;
	var copyConstructorProperties = copyConstructorProperties$1;
	var isForced = isForced_1;

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
	    target = globalThis$2;
	  } else if (STATIC) {
	    target = globalThis$2[TARGET] || defineGlobalProperty(TARGET, {});
	  } else {
	    target = globalThis$2[TARGET] && globalThis$2[TARGET].prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$1(sourceProperty, 'sham', true);
	    }
	    defineBuiltIn$1(target, key, sourceProperty, options);
	  }
	};

	var classofRaw$1 = classofRaw$2;
	var uncurryThis$5 = functionUncurryThis;

	var functionUncurryThisClause = function (fn) {
	  // Nashorn bug:
	  //   https://github.com/zloirock/core-js/issues/1128
	  //   https://github.com/zloirock/core-js/issues/1130
	  if (classofRaw$1(fn) === 'Function') return uncurryThis$5(fn);
	};

	var uncurryThis$4 = functionUncurryThisClause;
	var aCallable$1 = aCallable$3;
	var NATIVE_BIND = functionBindNative;

	var bind$1 = uncurryThis$4(uncurryThis$4.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable$1(fn);
	  return that === undefined ? fn : NATIVE_BIND ? bind$1(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var classof$4 = classofRaw$2;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$3 = Array.isArray || function isArray(argument) {
	  return classof$4(argument) === 'Array';
	};

	var wellKnownSymbol$5 = wellKnownSymbol$7;

	var TO_STRING_TAG$1 = wellKnownSymbol$5('toStringTag');
	var test$1 = {};
	// eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
	test$1[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test$1) === '[object z]';

	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var isCallable$1 = isCallable$c;
	var classofRaw = classofRaw$2;
	var wellKnownSymbol$4 = wellKnownSymbol$7;

	var TO_STRING_TAG = wellKnownSymbol$4('toStringTag');
	var $Object = Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$3 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) === 'Object' && isCallable$1(O.callee) ? 'Arguments' : result;
	};

	var uncurryThis$3 = functionUncurryThis;
	var fails$5 = fails$e;
	var isCallable = isCallable$c;
	var classof$2 = classof$3;
	var getBuiltIn$1 = getBuiltIn$4;
	var inspectSource = inspectSource$2;

	var noop = function () { /* empty */ };
	var construct = getBuiltIn$1('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec = uncurryThis$3(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable(argument)) return false;
	  try {
	    construct(noop, [], argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable(argument)) return false;
	  switch (classof$2(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$1 = !construct || fails$5(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var isArray$2 = isArray$3;
	var isConstructor = isConstructor$1;
	var isObject$1 = isObject$7;
	var wellKnownSymbol$3 = wellKnownSymbol$7;

	var SPECIES$1 = wellKnownSymbol$3('species');
	var $Array = Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$1 = function (originalArray) {
	  var C;
	  if (isArray$2(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor(C) && (C === $Array || isArray$2(C.prototype))) C = undefined;
	    else if (isObject$1(C)) {
	      C = C[SPECIES$1];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? $Array : C;
	};

	var arraySpeciesConstructor = arraySpeciesConstructor$1;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$2 = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var DESCRIPTORS$2 = descriptors;
	var definePropertyModule$1 = objectDefineProperty;
	var createPropertyDescriptor = createPropertyDescriptor$3;

	var createProperty$2 = function (object, key, value) {
	  if (DESCRIPTORS$2) definePropertyModule$1.f(object, key, createPropertyDescriptor(0, value));
	  else object[key] = value;
	};

	var bind = functionBindContext;
	var IndexedObject = indexedObject;
	var toObject$3 = toObject$5;
	var lengthOfArrayLike$2 = lengthOfArrayLike$4;
	var arraySpeciesCreate$1 = arraySpeciesCreate$2;
	var createProperty$1 = createProperty$2;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod = function (TYPE) {
	  var IS_MAP = TYPE === 1;
	  var IS_FILTER = TYPE === 2;
	  var IS_SOME = TYPE === 3;
	  var IS_EVERY = TYPE === 4;
	  var IS_FIND_INDEX = TYPE === 6;
	  var IS_FILTER_REJECT = TYPE === 7;
	  var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that) {
	    var O = toObject$3($this);
	    var self = IndexedObject(O);
	    var length = lengthOfArrayLike$2(self);
	    var boundFunction = bind(callbackfn, that);
	    var index = 0;
	    var resIndex = 0;
	    var target = IS_MAP ? arraySpeciesCreate$1($this, length) : IS_FILTER || IS_FILTER_REJECT ? arraySpeciesCreate$1($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) createProperty$1(target, index, result);    // map
	        else if (result) switch (TYPE) {
	          case 3: return true;                                // some
	          case 5: return value;                               // find
	          case 6: return index;                               // findIndex
	          case 2: createProperty$1(target, resIndex++, value);  // filter
	        } else switch (TYPE) {
	          case 4: return false;                               // every
	          case 7: createProperty$1(target, resIndex++, value);  // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod(7)
	};

	var objectDefineProperties = {};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$1 = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys$1);
	};

	var DESCRIPTORS$1 = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule = objectDefineProperty;
	var anObject$1 = anObject$4;
	var toIndexedObject = toIndexedObject$4;
	var objectKeys = objectKeys$1;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS$1 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$1(O);
	  var props = toIndexedObject(Properties);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn = getBuiltIn$4;

	var html$1 = getBuiltIn('document', 'documentElement');

	/* global ActiveXObject -- old IE, WSH */
	var anObject = anObject$4;
	var definePropertiesModule = objectDefineProperties;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys = hiddenKeys$4;
	var html = html$1;
	var documentCreateElement$1 = documentCreateElement$2;
	var sharedKey = sharedKey$2;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

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
	  var iframe = documentCreateElement$1('iframe');
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

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	// eslint-disable-next-line es/no-object-create -- safe
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
	};

	var wellKnownSymbol$2 = wellKnownSymbol$7;
	var create = objectCreate;
	var defineProperty = objectDefineProperty.f;

	var UNSCOPABLES = wellKnownSymbol$2('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] === undefined) {
	  defineProperty(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: create(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables$1 = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var $$7 = _export;
	var $find = arrayIteration.find;
	var addToUnscopables = addToUnscopables$1;

	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	// eslint-disable-next-line es/no-array-prototype-find -- testing
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.es/ecma262/#sec-array.prototype.find
	$$7({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

	var fails$4 = fails$e;

	var arrayMethodIsStrict$3 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$4(function () {
	    // eslint-disable-next-line no-useless-call -- required for testing
	    method.call(null, argument || function () { return 1; }, 1);
	  });
	};

	var $forEach = arrayIteration.forEach;
	var arrayMethodIsStrict$2 = arrayMethodIsStrict$3;

	var STRICT_METHOD$1 = arrayMethodIsStrict$2('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD$1 ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	} : [].forEach;

	var $$6 = _export;
	var forEach$1 = arrayForEach;

	// `Array.prototype.forEach` method
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	$$6({ target: 'Array', proto: true, forced: [].forEach !== forEach$1 }, {
	  forEach: forEach$1
	});

	/* eslint-disable es/no-array-prototype-indexof -- required for testing */
	var $$5 = _export;
	var uncurryThis$2 = functionUncurryThisClause;
	var $indexOf = arrayIncludes.indexOf;
	var arrayMethodIsStrict$1 = arrayMethodIsStrict$3;

	var nativeIndexOf = uncurryThis$2([].indexOf);

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
	var FORCED$2 = NEGATIVE_ZERO || !arrayMethodIsStrict$1('indexOf');

	// `Array.prototype.indexOf` method
	// https://tc39.es/ecma262/#sec-array.prototype.indexof
	$$5({ target: 'Array', proto: true, forced: FORCED$2 }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf(this, searchElement, fromIndex) || 0
	      : $indexOf(this, searchElement, fromIndex);
	  }
	});

	var fails$3 = fails$e;
	var wellKnownSymbol$1 = wellKnownSymbol$7;
	var V8_VERSION$1 = environmentV8Version;

	var SPECIES = wellKnownSymbol$1('species');

	var arrayMethodHasSpeciesSupport$2 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$1 >= 51 || !fails$3(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $$4 = _export;
	var $map = arrayIteration.map;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$2;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$1('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	$$4({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var tryToString = tryToString$2;

	var $TypeError$2 = TypeError;

	var deletePropertyOrThrow$1 = function (O, P) {
	  if (!delete O[P]) throw new $TypeError$2('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
	};

	var classof$1 = classof$3;

	var $String = String;

	var toString$2 = function (argument) {
	  if (classof$1(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
	  return $String(argument);
	};

	var uncurryThis$1 = functionUncurryThis;

	var arraySlice$1 = uncurryThis$1([].slice);

	var arraySlice = arraySlice$1;

	var floor = Math.floor;

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
	    var middle = floor(length / 2);
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

	var $$3 = _export;
	var uncurryThis = functionUncurryThis;
	var aCallable = aCallable$3;
	var toObject$2 = toObject$5;
	var lengthOfArrayLike$1 = lengthOfArrayLike$4;
	var deletePropertyOrThrow = deletePropertyOrThrow$1;
	var toString$1 = toString$2;
	var fails$2 = fails$e;
	var internalSort = arraySort;
	var arrayMethodIsStrict = arrayMethodIsStrict$3;
	var FF = environmentFfVersion;
	var IE_OR_EDGE = environmentIsIeOrEdge;
	var V8 = environmentV8Version;
	var WEBKIT = environmentWebkitVersion;

	var test = [];
	var nativeSort = uncurryThis(test.sort);
	var push = uncurryThis(test.push);

	// IE8-
	var FAILS_ON_UNDEFINED = fails$2(function () {
	  test.sort(undefined);
	});
	// V8 bug
	var FAILS_ON_NULL = fails$2(function () {
	  test.sort(null);
	});
	// Old WebKit
	var STRICT_METHOD = arrayMethodIsStrict('sort');

	var STABLE_SORT = !fails$2(function () {
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

	var FORCED$1 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

	var getSortCompare = function (comparefn) {
	  return function (x, y) {
	    if (y === undefined) return -1;
	    if (x === undefined) return 1;
	    if (comparefn !== undefined) return +comparefn(x, y) || 0;
	    var xString = toString$1(x);
	    var yString = toString$1(y);
	    return xString === yString ? 0 : xString > yString ? 1 : -1;
	  };
	};

	// `Array.prototype.sort` method
	// https://tc39.es/ecma262/#sec-array.prototype.sort
	$$3({ target: 'Array', proto: true, forced: FORCED$1 }, {
	  sort: function sort(comparefn) {
	    if (comparefn !== undefined) aCallable(comparefn);

	    var array = toObject$2(this);

	    if (STABLE_SORT) return comparefn === undefined ? nativeSort(array) : nativeSort(array, comparefn);

	    var items = [];
	    var arrayLength = lengthOfArrayLike$1(array);
	    var itemsLength, index;

	    for (index = 0; index < arrayLength; index++) {
	      if (index in array) push(items, array[index]);
	    }

	    internalSort(items, getSortCompare(comparefn));

	    itemsLength = lengthOfArrayLike$1(items);
	    index = 0;

	    while (index < itemsLength) array[index] = items[index++];
	    while (index < arrayLength) deletePropertyOrThrow(array, index++);

	    return array;
	  }
	});

	var $$2 = _export;
	var toObject$1 = toObject$5;
	var nativeKeys = objectKeys$1;
	var fails$1 = fails$e;

	var FAILS_ON_PRIMITIVES = fails$1(function () { nativeKeys(1); });

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	$$2({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return nativeKeys(toObject$1(it));
	  }
	});

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof = classof$3;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var defineBuiltIn = defineBuiltIn$2;
	var toString = objectToString;

	// `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	if (!TO_STRING_TAG_SUPPORT) {
	  defineBuiltIn(Object.prototype, 'toString', toString, { unsafe: true });
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
	var documentCreateElement = documentCreateElement$2;

	var classList = documentCreateElement('span').classList;
	var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

	var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

	var globalThis$1 = globalThis_1;
	var DOMIterables = domIterables;
	var DOMTokenListPrototype = domTokenListPrototype;
	var forEach = arrayForEach;
	var createNonEnumerableProperty = createNonEnumerableProperty$3;

	var handlePrototype = function (CollectionPrototype) {
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
	    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
	  } catch (error) {
	    CollectionPrototype.forEach = forEach;
	  }
	};

	for (var COLLECTION_NAME in DOMIterables) {
	  if (DOMIterables[COLLECTION_NAME]) {
	    handlePrototype(globalThis$1[COLLECTION_NAME] && globalThis$1[COLLECTION_NAME].prototype);
	  }
	}

	handlePrototype(DOMTokenListPrototype);

	var $TypeError$1 = TypeError;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

	var doesNotExceedSafeInteger$1 = function (it) {
	  if (it > MAX_SAFE_INTEGER) throw new $TypeError$1('Maximum allowed index exceeded');
	  return it;
	};

	var DESCRIPTORS = descriptors;
	var isArray$1 = isArray$3;

	var $TypeError = TypeError;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Safari < 13 does not throw an error in this case
	var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
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
	  if (isArray$1(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
	    throw new $TypeError('Cannot set read only .length');
	  } return O.length = length;
	} : function (O, length) {
	  return O.length = length;
	};

	var $$1 = _export;
	var fails = fails$e;
	var isArray = isArray$3;
	var isObject = isObject$7;
	var toObject = toObject$5;
	var lengthOfArrayLike = lengthOfArrayLike$4;
	var doesNotExceedSafeInteger = doesNotExceedSafeInteger$1;
	var createProperty = createProperty$2;
	var setArrayLength = arraySetLength;
	var arraySpeciesCreate = arraySpeciesCreate$2;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$2;
	var wellKnownSymbol = wellKnownSymbol$7;
	var V8_VERSION = environmentV8Version;

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport('concat');

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	$$1({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = lengthOfArrayLike(E);
	        doesNotExceedSafeInteger(n + len);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        doesNotExceedSafeInteger(n + 1);
	        createProperty(A, n++, E);
	      }
	    }
	    setArrayLength(A, n);
	    return A;
	  }
	});

	function Collection(data) {
	  this.data = data;
	  function remove(elem) {
	    if (elem) elem.remove();
	  }
	  this.build = function () {
	    this.item = Lampa.Template.js('cub_collection');
	    this.img = this.item.find('.card__img');
	    this.icon = this.item.find('.cub-collection-card__user-icon img');
	    this.item.find('.card__title').text(Lampa.Utils.capitalizeFirstLetter(data.title));
	    this.item.find('.cub-collection-card__items').text(data.items_count);
	    this.item.find('.cub-collection-card__date').text(Lampa.Utils.parseTime(data.time).full);
	    this.item.find('.cub-collection-card__views').text(Lampa.Utils.bigNumberToShort(data.views));
	    this.item.find('.full-review__like-counter').text(Lampa.Utils.bigNumberToShort(data.liked));
	    this.item.find('.cub-collection-card__user-name').text(data.username);
	    this.item.addEventListener('visible', this.visible.bind(this));
	  };

	  /**
	   * Загрузить картинку
	   */
	  this.image = function () {
	    var _this = this;
	    this.img.onload = function () {
	      _this.item.classList.add('card--loaded');
	    };
	    this.img.onerror = function () {
	      _this.img.src = './img/img_broken.svg';
	    };
	    this.icon.onload = function () {
	      _this.item.find('.cub-collection-card__user-icon').classList.add('loaded');
	    };
	    this.icon.onerror = function () {
	      _this.icon.src = './img/img_broken.svg';
	    };
	  };

	  /**
	   * Создать
	   */
	  this.create = function () {
	    var _this2 = this;
	    this.build();
	    this.item.addEventListener('hover:focus', function () {
	      if (_this2.onFocus) _this2.onFocus(_this2.item, data);
	    });
	    this.item.addEventListener('hover:touch', function () {
	      if (_this2.onTouch) _this2.onTouch(_this2.item, data);
	    });
	    this.item.addEventListener('hover:hover', function () {
	      if (_this2.onHover) _this2.onHover(_this2.item, data);
	    });
	    this.item.addEventListener('hover:enter', function () {
	      Lampa.Activity.push({
	        url: data.id,
	        collection: data,
	        title: Lampa.Utils.capitalizeFirstLetter(data.title),
	        component: 'cub_collections_view',
	        page: 1
	      });
	    });
	    this.item.addEventListener('hover:long', function () {
	      Lampa.Loading.start(function () {
	        Api.clear();
	        Lampa.Loading.stop();
	        Lampa.Controller.toggle('content');
	      });
	      Api.status(data, function (status) {
	        Lampa.Loading.stop();
	        var items = [];
	        var voited = Lampa.Storage.cache('collections_voited', 100, []);
	        items.push({
	          title: 'Коллeкции @' + data.username,
	          onSelect: function onSelect() {
	            Lampa.Activity.push({
	              url: 'user_' + data.cid,
	              title: 'Коллeкции @' + data.username,
	              component: 'cub_collections_collection',
	              page: 1
	            });
	            Lampa.Controller.toggle('content');
	          }
	        });
	        items.push({
	          title: Lampa.Lang.translate(status.saved ? 'Убрать из сохраненных' : 'Добавить в сохраненные'),
	          onSelect: function onSelect() {
	            Lampa.Controller.toggle('content');
	            Api.save(data, function () {
	              Lampa.Bell.push({
	                text: Lampa.Lang.translate(status.saved ? 'Убрано из сохраненных' : 'Добавлено в сохраненные')
	              });
	            });
	          }
	        });
	        items.push({
	          title: Lampa.Lang.translate('more'),
	          separator: true
	        });
	        if (voited.indexOf(data.id) == -1) {
	          items = items.concat([{
	            title: '<span class="settings-param__label">+1</span> ' + Lampa.Lang.translate('title_like'),
	            like: 1
	          }, {
	            title: Lampa.Lang.translate('reactions_shit'),
	            like: -1
	          }]);
	        }
	        Lampa.Select.show({
	          title: Lampa.Lang.translate('title_action'),
	          items: items,
	          onSelect: function onSelect(item) {
	            Lampa.Controller.toggle('content');
	            Api.liked({
	              id: data.id,
	              dir: item.like
	            }, function () {
	              voited.push(data.id);
	              Lampa.Storage.set('collections_voited', voited);
	              data.liked += item.like;
	              _this2.item.find('.full-review__like-counter').text(Lampa.Utils.bigNumberToShort(data.liked));
	              Lampa.Bell.push({
	                text: Lampa.Lang.translate('discuss_voited')
	              });
	            });
	          },
	          onBack: function onBack() {
	            Lampa.Controller.toggle('content');
	          }
	        });
	      });
	    });
	    this.image();
	  };

	  /**
	   * Загружать картинку если видна карточка
	   */
	  this.visible = function () {
	    this.img.src = Lampa.Api.img(data.backdrop_path, 'w500');
	    this.icon.src = Lampa.Utils.protocol() + Lampa.Manifest.cub_domain + '/img/profiles/' + data.icon + '.png';
	    if (this.onVisible) this.onVisible(this.item, data);
	  };

	  /**
	   * Уничтожить
	   */
	  this.destroy = function () {
	    this.img.onerror = function () {};
	    this.img.onload = function () {};
	    this.img.src = '';
	    remove(this.item);
	    this.item = null;
	    this.img = null;
	  };

	  /**
	   * Рендер
	   * @returns {object}
	   */
	  this.render = function (js) {
	    return js ? this.item : $(this.item);
	  };
	}

	var network = new Lampa.Reguest();
	var api_url = Lampa.Utils.protocol() + Lampa.Manifest.cub_domain + '/api/collections/';
	var collections = [{
	  hpu: 'user',
	  title: 'Мои коллекции'
	}, {
	  hpu: 'saved',
	  title: 'Сохраненные'
	}, {
	  hpu: 'new',
	  title: 'Новинки'
	}, {
	  hpu: 'top',
	  title: 'В топе'
	}, {
	  hpu: 'week',
	  title: 'Популярные за неделю'
	}, {
	  hpu: 'month',
	  title: 'Популярные за месяц'
	}, {
	  hpu: 'big',
	  title: 'Большие коллекции'
	}, {
	  hpu: 'all',
	  title: 'Все коллекции'
	}];
	function header() {
	  var user = Lampa.Storage.get('account', '{}');
	  if (!user.token) return false;
	  return {
	    headers: {
	      token: user.token,
	      profile: user.id
	    }
	  };
	}
	function main(params, oncomplite, onerror) {
	  var user = Lampa.Storage.get('account', '{}');
	  var status = new Lampa.Status(collections.length);
	  status.onComplite = function () {
	    var keys = Object.keys(status.data);
	    var sort = collections.map(function (a) {
	      return a.hpu;
	    });
	    if (keys.length) {
	      var fulldata = [];
	      keys.sort(function (a, b) {
	        return sort.indexOf(a) - sort.indexOf(b);
	      });
	      keys.forEach(function (key) {
	        var data = status.data[key];
	        data.title = collections.find(function (item) {
	          return item.hpu == key;
	        }).title;
	        data.cardClass = function (elem, param) {
	          return new Collection(elem, param);
	        };
	        fulldata.push(data);
	      });
	      oncomplite(fulldata);
	    } else onerror();
	  };
	  collections.forEach(function (item) {
	    if (item.hpu == 'user' && !user.token) return status.error();
	    var url = api_url + 'list?category=' + item.hpu;
	    if (item.hpu == 'user') url = api_url + 'list?cid=' + user.id;
	    if (item.hpu == 'saved') url = api_url + 'saved-list';
	    network.silent(url, function (data) {
	      data.collection = true;
	      data.line_type = 'collection';
	      data.category = item.hpu;
	      status.append(item.hpu, data);
	    }, status.error.bind(status), false, header());
	  });
	}
	function collection(params, oncomplite, onerror) {
	  var url = api_url + 'list?category=' + params.url + '&page=' + params.page;
	  if (params.url.indexOf('user') >= 0) {
	    url = api_url + 'list?cid=' + params.url.split('_').pop() + '&page=' + params.page;
	  }
	  network.silent(url, function (data) {
	    data.collection = true;
	    data.total_pages = data.total_pages || 15;
	    data.cardClass = function (elem, param) {
	      return new Collection(elem, param);
	    };
	    oncomplite(data);
	  }, onerror, false, header());
	}
	function liked(params, callaback) {
	  network.silent(api_url + 'liked', callaback, function (a, e) {
	    Lampa.Noty.show(network.errorDecode(a, e));
	  }, params, header());
	}
	function full(params, oncomplite, onerror) {
	  network.silent(api_url + 'view/' + params.url + '?page=' + params.page, function (data) {
	    data.total_pages = data.total_pages || 15;
	    oncomplite(data);
	  }, onerror, false, header());
	}
	function status(params, callaback) {
	  network.silent(api_url + 'save-status?id=' + params.id, callaback, function (a, e) {
	    Lampa.Noty.show(network.errorDecode(a, e));
	  }, false, header());
	}
	function save(params, callaback) {
	  network.silent(api_url + 'save', callaback, function (a, e) {
	    Lampa.Noty.show(network.errorDecode(a, e));
	  }, {
	    id: params.id
	  }, header());
	}
	function clear() {
	  network.clear();
	}
	var Api = {
	  main: main,
	  collection: collection,
	  full: full,
	  clear: clear,
	  liked: liked,
	  status: status,
	  save: save
	};

	function component$2(object) {
	  var comp = new Lampa.InteractionMain(object);
	  comp.create = function () {
	    var _this = this;
	    this.activity.loader(true);
	    Api.main(object, function (data) {
	      _this.build(data);
	    }, this.empty.bind(this));
	    return this.render();
	  };
	  comp.onMore = function (data) {
	    Lampa.Activity.push({
	      url: data.category + (data.category == 'user' ? '_' + data.cid : ''),
	      title: data.title,
	      component: 'cub_collections_collection',
	      page: 1
	    });
	  };
	  return comp;
	}

	function component$1(object) {
	  var comp = new Lampa.InteractionCategory(object);
	  comp.create = function () {
	    var _this = this;
	    Api.full(object, function (data) {
	      _this.build(data);
	      comp.render().find('.category-full').addClass('mapping--grid cols--6');
	    }, this.empty.bind(this));
	  };
	  comp.nextPageReuest = function (object, resolve, reject) {
	    Api.full(object, resolve.bind(comp), reject.bind(comp));
	  };
	  return comp;
	}

	function component(object) {
	  var comp = new Lampa.InteractionCategory(object);
	  comp.create = function () {
	    Api.collection(object, this.build.bind(this), this.empty.bind(this));
	  };
	  comp.nextPageReuest = function (object, resolve, reject) {
	    Api.collection(object, resolve.bind(comp), reject.bind(comp));
	  };
	  comp.cardRender = function (object, element, card) {
	    card.onMenu = false;
	    card.onEnter = function () {
	      Lampa.Activity.push({
	        url: element.id,
	        title: element.title,
	        component: 'cub_collection',
	        page: 1
	      });
	    };
	  };
	  return comp;
	}

	function startPlugin() {
	  var manifest = {
	    type: 'video',
	    version: '1.1.2',
	    name: 'Коллекции',
	    description: '',
	    component: 'cub_collections'
	  };
	  Lampa.Manifest.plugins = manifest;
	  Lampa.Component.add('cub_collections_main', component$2);
	  Lampa.Component.add('cub_collections_collection', component);
	  Lampa.Component.add('cub_collections_view', component$1);
	  Lampa.Template.add('cub_collection', "<div class=\"card cub-collection-card selector layer--visible layer--render card--collection\">\n        <div class=\"card__view\">\n            <img src=\"./img/img_load.svg\" class=\"card__img\">\n            <div class=\"cub-collection-card__head\">\n                <div class=\"cub-collection-card__items\"></div>\n                <div class=\"cub-collection-card__date\"></div>\n            </div>\n            <div class=\"cub-collection-card__bottom\">\n                <div class=\"cub-collection-card__views\"></div>\n                <div class=\"cub-collection-card__liked\">\n                    <div class=\"full-review__like-icon\">\n                        <svg width=\"29\" height=\"27\" viewBox=\"0 0 29 27\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.0131 9.05733H3.75799C2.76183 9.05903 1.80696 9.45551 1.10257 10.1599C0.39818 10.8643 0.00170332 11.8192 0 12.8153V23.0778C0.00170332 24.074 0.39818 25.0289 1.10257 25.7333C1.80696 26.4377 2.76183 26.8341 3.75799 26.8358H23.394C24.2758 26.8354 25.1294 26.5252 25.8056 25.9594C26.4819 25.3936 26.9379 24.6082 27.094 23.7403L28.9408 13.4821C29.038 12.9408 29.0153 12.3849 28.8743 11.8534C28.7333 11.3218 28.4774 10.8277 28.1247 10.4058C27.7721 9.98391 27.3311 9.6445 26.833 9.41151C26.3349 9.17852 25.7918 9.05762 25.2419 9.05733H18.5043V3.63509C18.5044 2.90115 18.2824 2.18438 17.8673 1.57908C17.4522 0.973783 16.8636 0.508329 16.179 0.243966C15.4943 -0.0203976 14.7456 -0.0712821 14.0315 0.0980078C13.3173 0.267298 12.6712 0.648829 12.178 1.1924L12.1737 1.19669C10.5632 2.98979 9.70849 5.78681 8.79584 7.79142C8.6423 8.14964 8.45537 8.49259 8.23751 8.81574C8.16898 8.90222 8.09358 8.98301 8.01203 9.05733H8.0131ZM6.54963 23.6147H3.75799C3.68706 23.6147 3.61686 23.6005 3.55156 23.5728C3.48626 23.5452 3.42719 23.5046 3.37789 23.4536C3.32786 23.4047 3.28819 23.3463 3.26126 23.2817C3.23433 23.2171 3.22068 23.1478 3.22113 23.0778V12.8164C3.22068 12.7464 3.23433 12.6771 3.26126 12.6125C3.28819 12.548 3.32786 12.4895 3.37789 12.4406C3.42719 12.3896 3.48626 12.3491 3.55156 12.3214C3.61686 12.2937 3.68706 12.2795 3.75799 12.2795H6.54963V23.6147ZM9.77077 11.7599C10.3704 11.336 10.8649 10.7803 11.216 10.1353C11.8221 8.94289 12.3599 7.71687 12.8265 6.46324C13.2315 5.33852 13.818 4.28775 14.5627 3.3527C14.6197 3.29181 14.6935 3.24913 14.7747 3.23003C14.8559 3.21093 14.9409 3.21625 15.0191 3.24533C15.0976 3.27557 15.165 3.32913 15.2122 3.3988C15.2594 3.46848 15.2842 3.55093 15.2832 3.63509V10.6679C15.2831 10.8794 15.3246 11.0889 15.4055 11.2844C15.4864 11.4799 15.605 11.6575 15.7546 11.8071C15.9042 11.9566 16.0818 12.0753 16.2773 12.1562C16.4727 12.237 16.6822 12.2786 16.8938 12.2785H25.2419C25.3207 12.2784 25.3986 12.2961 25.4698 12.3301C25.5409 12.3641 25.6036 12.4136 25.6531 12.4749C25.7042 12.5345 25.7411 12.6049 25.7612 12.6807C25.7813 12.7566 25.784 12.836 25.7691 12.913L23.9223 23.1723C23.8993 23.296 23.834 23.4077 23.7376 23.4885C23.6412 23.5692 23.5197 23.6138 23.394 23.6147H9.77077V11.7599Z\" fill=\"currentColor\"></path>\n                        </svg>\n                    </div>\n                    <div class=\"full-review__like-counter\"></div>\n                </div>\n                <div class=\"cub-collection-card__user-name\"></div>\n                <div class=\"cub-collection-card__user-icon\">\n                    <img >\n                </div>\n            </div>\n        </div>\n        <div class=\"card__title\"></div>\n    </div>");
	  var style = "\n        <style>\n        .cub-collection-card__head{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;padding:.5em 1em;color:#fff;font-size:1em;font-weight:500;position:absolute;top:0;left:0;width:100%}.cub-collection-card__bottom{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:.5em 1em;background-color:rgba(0,0,0,0.5);color:#fff;font-size:1em;font-weight:400;-webkit-border-radius:1em;border-radius:1em;position:absolute;bottom:0;left:0;width:100%}.cub-collection-card__liked{padding-left:1em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.cub-collection-card__liked .full-review__like-icon{margin-top:-0.2em}.cub-collection-card__liked .full-review__like-counter{font-weight:600}.cub-collection-card__items{background:rgba(0,0,0,0.5);padding:.3em;-webkit-border-radius:.2em;border-radius:.2em}.cub-collection-card__user-name{padding:0 1em;margin-left:auto}.cub-collection-card__user-icon{width:2em;height:2em;-webkit-border-radius:100%;border-radius:100%;background-color:#fff;border:.2em solid #fff}.cub-collection-card__user-icon img{width:100%;height:100%;-webkit-border-radius:100%;border-radius:100%;opacity:0}.cub-collection-card__user-icon.loaded img{opacity:1}.category-full .cub-collection-card{padding-bottom:2em}body.glass--style .cub-collection-card__bottom,body.glass--style .cub-collection-card__items{background-color:rgba(0,0,0,0.3);-webkit-backdrop-filter:blur(1.6em);backdrop-filter:blur(1.6em)}body.light--version .cub-collection-card__bottom{-webkit-border-radius:0;border-radius:0}@media screen and (max-width:767px){.category-full .cub-collection-card{width:33.3%}}@media screen and (max-width:580px){.category-full .cub-collection-card{width:50%}}@media screen and (max-width:991px){body.light--version .category-full .cub-collection-card{width:33.3%}}@media screen and (max-width:580px){body.light--version .category-full .cub-collection-card{width:50%}}@media screen and (max-width:991px){body.light--version.size--bigger .category-full .cub-collection-card{width:50%}}\n        </style>\n    ";
	  Lampa.Template.add('cub_collections_css', style);
	  $('body').append(Lampa.Template.get('cub_collections_css', {}, true));
	  function add() {
	    var button = $("<li class=\"menu__item selector\">\n            <div class=\"menu__ico\">\n                <svg width=\"191\" height=\"239\" viewBox=\"0 0 191 239\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M35.3438 35.3414V26.7477C35.3438 19.9156 38.0594 13.3543 42.8934 8.51604C47.7297 3.68251 54.2874 0.967027 61.125 0.966431H164.25C171.086 0.966431 177.643 3.68206 182.482 8.51604C187.315 13.3524 190.031 19.91 190.031 26.7477V186.471C190.031 189.87 189.022 193.192 187.133 196.018C185.245 198.844 182.561 201.046 179.421 202.347C176.28 203.647 172.825 203.988 169.492 203.325C166.158 202.662 163.096 201.026 160.692 198.623L155.656 193.587V220.846C155.656 224.245 154.647 227.567 152.758 230.393C150.87 233.219 148.186 235.421 145.046 236.722C141.905 238.022 138.45 238.363 135.117 237.7C131.783 237.037 128.721 235.401 126.317 232.998L78.3125 184.993L30.3078 232.998C27.9041 235.401 24.8419 237.037 21.5084 237.7C18.1748 238.363 14.7195 238.022 11.5794 236.722C8.43922 235.421 5.75517 233.219 3.86654 230.393C1.9779 227.567 0.969476 224.245 0.96875 220.846V61.1227C0.96875 54.2906 3.68437 47.7293 8.51836 42.891C13.3547 38.0575 19.9124 35.342 26.75 35.3414H35.3438ZM138.469 220.846V61.1227C138.469 58.8435 137.563 56.6576 135.952 55.046C134.34 53.4343 132.154 52.5289 129.875 52.5289H26.75C24.4708 52.5289 22.2849 53.4343 20.6733 55.046C19.0617 56.6576 18.1562 58.8435 18.1562 61.1227V220.846L66.1609 172.841C69.3841 169.619 73.755 167.809 78.3125 167.809C82.87 167.809 87.2409 169.619 90.4641 172.841L138.469 220.846ZM155.656 169.284L172.844 186.471V26.7477C172.844 24.4685 171.938 22.2826 170.327 20.671C168.715 19.0593 166.529 18.1539 164.25 18.1539H61.125C58.8458 18.1539 56.6599 19.0593 55.0483 20.671C53.4367 22.2826 52.5312 24.4685 52.5312 26.7477V35.3414H129.875C136.711 35.3414 143.268 38.0571 148.107 42.891C152.94 47.7274 155.656 54.285 155.656 61.1227V169.284Z\" fill=\"currentColor\"/>\n                </svg>\n            </div>\n            <div class=\"menu__text\">".concat(manifest.name, "</div>\n        </li>"));
	    button.on('hover:enter', function () {
	      Lampa.Activity.push({
	        url: '',
	        title: manifest.name,
	        component: 'cub_collections_main',
	        page: 1
	      });
	    });
	    $('.menu .menu__list').eq(0).append(button);
	  }
	  if (window.appready) add();else {
	    Lampa.Listener.follow('app', function (e) {
	      if (e.type == 'ready') add();
	    });
	  }
	}
	if (!window.cub_collections_ready && Lampa.Manifest.app_digital >= 242) startPlugin();

})();
