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

	var fails$b = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$a = fails$b;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$a(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
	});

	var fails$9 = fails$b;

	var functionBindNative = !fails$9(function () {
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
	var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$1(this, V);
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

	var uncurryThis$b = functionUncurryThis;

	var toString$2 = uncurryThis$b({}.toString);
	var stringSlice$1 = uncurryThis$b(''.slice);

	var classofRaw$2 = function (it) {
	  return stringSlice$1(toString$2(it), 8, -1);
	};

	var uncurryThis$a = functionUncurryThis;
	var fails$8 = fails$b;
	var classof$4 = classofRaw$2;

	var $Object$3 = Object;
	var split = uncurryThis$a(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$8(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object$3('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$4(it) === 'String' ? split(it, '') : $Object$3(it);
	} : $Object$3;

	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	var isNullOrUndefined$2 = function (it) {
	  return it === null || it === undefined;
	};

	var isNullOrUndefined$1 = isNullOrUndefined$2;

	var $TypeError$5 = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$2 = function (it) {
	  if (isNullOrUndefined$1(it)) throw new $TypeError$5("Can't call method on " + it);
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

	var isObject$6 = function (it) {
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

	var uncurryThis$9 = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$9({}.isPrototypeOf);

	var globalThis$b = globalThis_1;

	var navigator = globalThis$b.navigator;
	var userAgent$1 = navigator && navigator.userAgent;

	var environmentUserAgent = userAgent$1 ? String(userAgent$1) : '';

	var globalThis$a = globalThis_1;
	var userAgent = environmentUserAgent;

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
	if (!version && userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var environmentV8Version = version;

	/* eslint-disable es/no-symbol -- required for testing */
	var V8_VERSION$1 = environmentV8Version;
	var fails$7 = fails$b;
	var globalThis$9 = globalThis_1;

	var $String$3 = globalThis$9.String;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$7(function () {
	  var symbol = Symbol('symbol detection');
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
	  // of course, fail.
	  return !$String$3(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
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

	var $String$2 = String;

	var tryToString$1 = function (argument) {
	  try {
	    return $String$2(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var isCallable$8 = isCallable$c;
	var tryToString = tryToString$1;

	var $TypeError$4 = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$2 = function (argument) {
	  if (isCallable$8(argument)) return argument;
	  throw new $TypeError$4(tryToString(argument) + ' is not a function');
	};

	var aCallable$1 = aCallable$2;
	var isNullOrUndefined = isNullOrUndefined$2;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$1 = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined(func) ? undefined : aCallable$1(func);
	};

	var call$2 = functionCall;
	var isCallable$7 = isCallable$c;
	var isObject$5 = isObject$6;

	var $TypeError$3 = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$7(fn = input.toString) && !isObject$5(val = call$2(fn, input))) return val;
	  if (isCallable$7(fn = input.valueOf) && !isObject$5(val = call$2(fn, input))) return val;
	  if (pref !== 'string' && isCallable$7(fn = input.toString) && !isObject$5(val = call$2(fn, input))) return val;
	  throw new $TypeError$3("Can't convert object to primitive value");
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
	var toObject$2 = function (argument) {
	  return $Object$1(requireObjectCoercible(argument));
	};

	var uncurryThis$8 = functionUncurryThis;
	var toObject$1 = toObject$2;

	var hasOwnProperty = uncurryThis$8({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$1(it), key);
	};

	var uncurryThis$7 = functionUncurryThis;

	var id = 0;
	var postfix = Math.random();
	var toString$1 = uncurryThis$7(1.1.toString);

	var uid$2 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$1(++id + postfix, 36);
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

	var wellKnownSymbol$6 = function (name) {
	  if (!hasOwn$6(WellKnownSymbolsStore, name)) {
	    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$6(Symbol$1, name)
	      ? Symbol$1[name]
	      : createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var call$1 = functionCall;
	var isObject$4 = isObject$6;
	var isSymbol$1 = isSymbol$2;
	var getMethod = getMethod$1;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$5 = wellKnownSymbol$6;

	var $TypeError$2 = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol$5('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$1 = function (input, pref) {
	  if (!isObject$4(input) || isSymbol$1(input)) return input;
	  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$1(exoticToPrim, input, pref);
	    if (!isObject$4(result) || isSymbol$1(result)) return result;
	    throw new $TypeError$2("Can't convert object to primitive value");
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
	var isObject$3 = isObject$6;

	var document$1 = globalThis$5.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$3(document$1) && isObject$3(document$1.createElement);

	var documentCreateElement$2 = function (it) {
	  return EXISTS$1 ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$8 = descriptors;
	var fails$6 = fails$b;
	var createElement = documentCreateElement$2;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$8 && !fails$6(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a !== 7;
	});

	var DESCRIPTORS$7 = descriptors;
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
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$7 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$3(O);
	  P = toPropertyKey$1(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$5(O, P)) return createPropertyDescriptor$2(!call(propertyIsEnumerableModule.f, O, P), O[P]);
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$6 = descriptors;
	var fails$5 = fails$b;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$6 && fails$5(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype !== 42;
	});

	var isObject$2 = isObject$6;

	var $String$1 = String;
	var $TypeError$1 = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$4 = function (argument) {
	  if (isObject$2(argument)) return argument;
	  throw new $TypeError$1($String$1(argument) + ' is not an object');
	};

	var DESCRIPTORS$5 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$3 = anObject$4;
	var toPropertyKey = toPropertyKey$2;

	var $TypeError = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$5 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
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
	  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$4 = descriptors;
	var definePropertyModule$4 = objectDefineProperty;
	var createPropertyDescriptor$1 = createPropertyDescriptor$3;

	var createNonEnumerableProperty$3 = DESCRIPTORS$4 ? function (object, key, value) {
	  return definePropertyModule$4.f(object, key, createPropertyDescriptor$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var makeBuiltIn$2 = {exports: {}};

	var DESCRIPTORS$3 = descriptors;
	var hasOwn$4 = hasOwnProperty_1;

	var FunctionPrototype = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$3 && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$4(FunctionPrototype, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && function something() { /* empty */ }.name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$3 || (DESCRIPTORS$3 && getDescriptor(FunctionPrototype, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var uncurryThis$6 = functionUncurryThis;
	var isCallable$6 = isCallable$c;
	var store$1 = sharedStore.exports;

	var functionToString = uncurryThis$6(Function.toString);

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
	var isObject$1 = isObject$6;
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
	    if (!isObject$1(it) || (state = get(it)).type !== TYPE) {
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

	var uncurryThis$5 = functionUncurryThis;
	var fails$4 = fails$b;
	var isCallable$4 = isCallable$c;
	var hasOwn$2 = hasOwnProperty_1;
	var DESCRIPTORS$2 = descriptors;
	var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
	var inspectSource$1 = inspectSource$2;
	var InternalStateModule = internalState;

	var enforceInternalState = InternalStateModule.enforce;
	var getInternalState = InternalStateModule.get;
	var $String = String;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$1 = Object.defineProperty;
	var stringSlice = uncurryThis$5(''.slice);
	var replace = uncurryThis$5(''.replace);
	var join = uncurryThis$5([].join);

	var CONFIGURABLE_LENGTH = DESCRIPTORS$2 && !fails$4(function () {
	  return defineProperty$1(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
	});

	var TEMPLATE = String(String).split('String');

	var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
	  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
	    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
	  }
	  if (options && options.getter) name = 'get ' + name;
	  if (options && options.setter) name = 'set ' + name;
	  if (!hasOwn$2(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
	    if (DESCRIPTORS$2) defineProperty$1(value, 'name', { value: name, configurable: true });
	    else value.name = name;
	  }
	  if (CONFIGURABLE_LENGTH && options && hasOwn$2(options, 'arity') && value.length !== options.arity) {
	    defineProperty$1(value, 'length', { value: options.arity });
	  }
	  try {
	    if (options && hasOwn$2(options, 'constructor') && options.constructor) {
	      if (DESCRIPTORS$2) defineProperty$1(value, 'prototype', { writable: false });
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
	var floor = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor : ceil)(n);
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
	var lengthOfArrayLike$2 = function (obj) {
	  return toLength(obj.length);
	};

	var toIndexedObject$2 = toIndexedObject$4;
	var toAbsoluteIndex = toAbsoluteIndex$1;
	var lengthOfArrayLike$1 = lengthOfArrayLike$2;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$1 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$2($this);
	    var length = lengthOfArrayLike$1(O);
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

	var uncurryThis$4 = functionUncurryThis;
	var hasOwn$1 = hasOwnProperty_1;
	var toIndexedObject$1 = toIndexedObject$4;
	var indexOf = arrayIncludes.indexOf;
	var hiddenKeys$2 = hiddenKeys$4;

	var push = uncurryThis$4([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$1(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$1(hiddenKeys$2, key) && hasOwn$1(O, key) && push(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$1(O, key = names[i++])) {
	    ~indexOf(result, key) || push(result, key);
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
	var uncurryThis$3 = functionUncurryThis;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var anObject$2 = anObject$4;

	var concat = uncurryThis$3([].concat);

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

	var fails$3 = fails$b;
	var isCallable$2 = isCallable$c;

	var replacement = /#|\.prototype\./;

	var isForced$1 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value === POLYFILL ? true
	    : value === NATIVE ? false
	    : isCallable$2(detection) ? fails$3(detection)
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
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
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
	      descriptor = getOwnPropertyDescriptor(target, key);
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
	var uncurryThis$2 = functionUncurryThis;

	var functionUncurryThisClause = function (fn) {
	  // Nashorn bug:
	  //   https://github.com/zloirock/core-js/issues/1128
	  //   https://github.com/zloirock/core-js/issues/1130
	  if (classofRaw$1(fn) === 'Function') return uncurryThis$2(fn);
	};

	var uncurryThis$1 = functionUncurryThisClause;
	var aCallable = aCallable$2;
	var NATIVE_BIND = functionBindNative;

	var bind$1 = uncurryThis$1(uncurryThis$1.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable(fn);
	  return that === undefined ? fn : NATIVE_BIND ? bind$1(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var classof$3 = classofRaw$2;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$1 = Array.isArray || function isArray(argument) {
	  return classof$3(argument) === 'Array';
	};

	var wellKnownSymbol$4 = wellKnownSymbol$6;

	var TO_STRING_TAG$1 = wellKnownSymbol$4('toStringTag');
	var test = {};
	// eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var isCallable$1 = isCallable$c;
	var classofRaw = classofRaw$2;
	var wellKnownSymbol$3 = wellKnownSymbol$6;

	var TO_STRING_TAG = wellKnownSymbol$3('toStringTag');
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
	var classof$2 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) === 'Object' && isCallable$1(O.callee) ? 'Arguments' : result;
	};

	var uncurryThis = functionUncurryThis;
	var fails$2 = fails$b;
	var isCallable = isCallable$c;
	var classof$1 = classof$2;
	var getBuiltIn$1 = getBuiltIn$4;
	var inspectSource = inspectSource$2;

	var noop = function () { /* empty */ };
	var construct = getBuiltIn$1('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec = uncurryThis(constructorRegExp.exec);
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
	  switch (classof$1(argument)) {
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
	var isConstructor$1 = !construct || fails$2(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var isArray = isArray$1;
	var isConstructor = isConstructor$1;
	var isObject = isObject$6;
	var wellKnownSymbol$2 = wellKnownSymbol$6;

	var SPECIES$1 = wellKnownSymbol$2('species');
	var $Array = Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$1 = function (originalArray) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES$1];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? $Array : C;
	};

	var arraySpeciesConstructor = arraySpeciesConstructor$1;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$1 = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var DESCRIPTORS$1 = descriptors;
	var definePropertyModule$1 = objectDefineProperty;
	var createPropertyDescriptor = createPropertyDescriptor$3;

	var createProperty$1 = function (object, key, value) {
	  if (DESCRIPTORS$1) definePropertyModule$1.f(object, key, createPropertyDescriptor(0, value));
	  else object[key] = value;
	};

	var bind = functionBindContext;
	var IndexedObject = indexedObject;
	var toObject = toObject$2;
	var lengthOfArrayLike = lengthOfArrayLike$2;
	var arraySpeciesCreate = arraySpeciesCreate$1;
	var createProperty = createProperty$1;

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
	    var O = toObject($this);
	    var self = IndexedObject(O);
	    var length = lengthOfArrayLike(self);
	    var boundFunction = bind(callbackfn, that);
	    var index = 0;
	    var resIndex = 0;
	    var target = IS_MAP ? arraySpeciesCreate($this, length) : IS_FILTER || IS_FILTER_REJECT ? arraySpeciesCreate($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) createProperty(target, index, result);    // map
	        else if (result) switch (TYPE) {
	          case 3: return true;                                // some
	          case 5: return value;                               // find
	          case 6: return index;                               // findIndex
	          case 2: createProperty(target, resIndex++, value);  // filter
	        } else switch (TYPE) {
	          case 4: return false;                               // every
	          case 7: createProperty(target, resIndex++, value);  // filterReject
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

	var fails$1 = fails$b;
	var wellKnownSymbol$1 = wellKnownSymbol$6;
	var V8_VERSION = environmentV8Version;

	var SPECIES = wellKnownSymbol$1('species');

	var arrayMethodHasSpeciesSupport$1 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION >= 51 || !fails$1(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $$3 = _export;
	var $filter = arrayIteration.filter;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	$$3({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var objectDefineProperties = {};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$1 = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys$1);
	};

	var DESCRIPTORS = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule = objectDefineProperty;
	var anObject$1 = anObject$4;
	var toIndexedObject = toIndexedObject$4;
	var objectKeys = objectKeys$1;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
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

	var wellKnownSymbol = wellKnownSymbol$6;
	var create = objectCreate;
	var defineProperty = objectDefineProperty.f;

	var UNSCOPABLES = wellKnownSymbol('unscopables');
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

	var $$2 = _export;
	var $find = arrayIteration.find;
	var addToUnscopables = addToUnscopables$1;

	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	// eslint-disable-next-line es/no-array-prototype-find -- testing
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.es/ecma262/#sec-array.prototype.find
	$$2({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

	var fails = fails$b;

	var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call -- required for testing
	    method.call(null, argument || function () { return 1; }, 1);
	  });
	};

	var $forEach = arrayIteration.forEach;
	var arrayMethodIsStrict = arrayMethodIsStrict$1;

	var STRICT_METHOD = arrayMethodIsStrict('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	} : [].forEach;

	var $$1 = _export;
	var forEach$1 = arrayForEach;

	// `Array.prototype.forEach` method
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	$$1({ target: 'Array', proto: true, forced: [].forEach !== forEach$1 }, {
	  forEach: forEach$1
	});

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof = classof$2;

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

	function Component(object) {
	  var html = Lampa.Template.js('client_dlna_main'),
	    head = html.find('.client-dlna-main__head'),
	    body = html.find('.client-dlna-main__body');
	  var listener_id, deviceFinder, scroll, tree;
	  this.create = function () {
	    this.activity.loader(true);
	    if (window.serviceProvider) {
	      scroll = new Lampa.Scroll({
	        mask: true,
	        over: true
	      });
	      scroll.minus(head);
	      body.append(scroll.render(true));
	      try {
	        deviceFinder = serviceProvider.getDeviceFinder();
	        listener_id = deviceFinder.addDeviceDiscoveryListener({
	          ondeviceadded: this.drawDevices.bind(this),
	          ondeviceremoved: this.drawDevices.bind(this)
	        });
	      } catch (e) {
	        console.log('DLNA', 'getDeviceFinder error: ', e.message);
	      }
	      this.drawDevices();
	    } else {
	      var empty = new Lampa.Empty({
	        descr: Lampa.Lang.translate('client_dlna_nosuport')
	      });
	      html.empty();
	      html.append(empty.render(true));
	      this.start = empty.start.bind(empty);
	    }
	    this.activity.loader(false);
	  };
	  this.drawDevices = function () {
	    var _this = this;
	    var devices = [];
	    try {
	      devices = deviceFinder.getDeviceList("MEDIAPROVIDER");
	    } catch (e) {
	      console.log('DLNA', 'getDeviceList error: ', e.message);
	    }
	    scroll.clear();
	    scroll.reset();
	    if (devices.length) {
	      devices.forEach(function (element) {
	        var item = Lampa.Template.js('client_dlna_device');
	        item.find('.client-dlna-device__name').text(element.name);
	        item.find('.client-dlna-device__ip').text(element.ipAddress);
	        item.on('hover:enter', function () {
	          tree = {
	            device: element,
	            tree: [element.rootFolder]
	          };
	          _this.displayFolder();
	        });
	        item.on('hover:focus', function () {
	          scroll.update(item);
	        });
	        scroll.append(item);
	      });
	    } else {
	      this.drawLoading(Lampa.Lang.translate('client_dlna_search_device'));
	    }
	    this.drawHead();
	    this.activity.toggle();
	  };
	  this.drawLoading = function (text) {
	    scroll.clear();
	    scroll.reset();
	    Lampa.Controller.clear();
	    var load = Lampa.Template.js('client_dlna_loading');
	    load.find('.client-dlna-loading__title').text(text);
	    scroll.append(load);
	  };
	  this.drawFolder = function (elems) {
	    var _this2 = this;
	    scroll.clear();
	    scroll.reset();
	    var folders = elems.filter(function (a) {
	      return a.itemType == 'FOLDER';
	    });
	    var files = elems.filter(function (a) {
	      return a.itemType == 'VIDEO';
	    });
	    folders.forEach(function (element) {
	      var item = Lampa.Template.js('client_dlna_folder');
	      item.find('.client-dlna-device__name').text(element.title);
	      item.on('hover:enter', function () {
	        tree.tree.push(element);
	        _this2.displayFolder();
	      });
	      item.on('hover:focus', function () {
	        scroll.update(item);
	      });
	      scroll.append(item);
	    });
	    if (files.length) {
	      var spl = document.createElement('div');
	      spl.addClass('client-dlna-main__split');
	      spl.text(Lampa.Lang.translate('title_files'));
	      scroll.append(spl);
	      files.forEach(function (element) {
	        var item = Lampa.Template.js('client_dlna_file');
	        item.find('.client-dlna-file__name').text(element.title);
	        item.find('.client-dlna-file__size').text(Lampa.Utils.bytesToSize(element.fileSize));
	        item.on('hover:enter', function () {
	          var video = {
	            title: element.title,
	            url: element.itemUri
	          };
	          Lampa.Player.play(video);
	          Lampa.Player.playlist([video]);
	        });
	        item.on('hover:focus', function () {
	          scroll.update(item);
	        });
	        scroll.append(item);
	      });
	    }
	    this.drawHead();
	    this.activity.toggle();
	  };
	  this.drawHead = function () {
	    head.empty();
	    var nav = [];
	    if (tree) {
	      var device_item = document.createElement('div');
	      device_item.addClass('client-dlna-head__device');
	      var icon = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 128 128\" xml:space=\"preserve\">\n                <path d=\"M111.7 57.1V22.2c0-1.1-.5-2.3-1.4-2.9h-.1c-.6-.4-1.2-.6-2-.6H30.9c-2 0-3.5 1.5-3.5 3.5v31.9h34.9c2.8 0 5.1 2.4 5.1 5.2v15.5h27.5V61.4c0-2.4 1.9-4.2 4.2-4.2h12.6z\" fill=\"currentColor\"></path>\n                <path d=\"M96.8 67.6H128v33.2H96.8zM67.3 86.1h27.5v-9.2H67.3zM65.1 59.3c0-1.8-1.3-3.1-3-3.1h-56c-1.7 0-3 1.4-3 3.1v41.9h62zM0 106.1c0 1.7 1.3 3.1 3.1 3.1h62.2c1.7 0 3.1-1.3 3.1-3.1v-2.9H0zM125.8 59.3H99c-1.2 0-2.2.9-2.2 2.2v4.1H128v-4.1c0-1.3-.9-2.2-2.2-2.2zm-9.4 4.1h-7.9c-.6 0-1-.4-1-1s.4-1 1-1h7.9c.6 0 1 .4 1 1 .1.6-.3 1-1 1zm3.8 0h-.4c-.6 0-1-.4-1-1s.4-1 1-1h.4c.6 0 1 .4 1 1s-.4 1-1 1zM96.8 107.1c0 1.2.9 2.2 2.2 2.2h26.8c1.2 0 2.2-1 2.2-2.2V103H96.8zm11.6-2h7.9c.6 0 1 .4 1 1s-.4 1-1 1h-7.9c-.6 0-1-.4-1-1s.4-1 1-1zM81.7 93.7H78v-5.6H67.3v7.6h14.3c.6 0 1-.4 1-1 .1-.6-.3-1-.9-1z\" fill=\"currentColor\"></path>\n            </svg>";
	      icon += '<span>' + tree.device.name + '</span>';
	      device_item.html(icon);
	      nav.push(device_item);
	      tree.tree.forEach(function (folder) {
	        if (folder.isRootFolder) return;
	        var folder_item = document.createElement('div');
	        folder_item.text(folder.title);
	        folder_item.addClass('client-dlna-head__folder');
	        nav.push(folder_item);
	      });
	    } else {
	      var empty_item = document.createElement('div');
	      empty_item.addClass('client-dlna-head__device');
	      var _icon = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 128 128\" xml:space=\"preserve\">\n                <path d=\"M111.7 57.1V22.2c0-1.1-.5-2.3-1.4-2.9h-.1c-.6-.4-1.2-.6-2-.6H30.9c-2 0-3.5 1.5-3.5 3.5v31.9h34.9c2.8 0 5.1 2.4 5.1 5.2v15.5h27.5V61.4c0-2.4 1.9-4.2 4.2-4.2h12.6z\" fill=\"currentColor\"></path>\n                <path d=\"M96.8 67.6H128v33.2H96.8zM67.3 86.1h27.5v-9.2H67.3zM65.1 59.3c0-1.8-1.3-3.1-3-3.1h-56c-1.7 0-3 1.4-3 3.1v41.9h62zM0 106.1c0 1.7 1.3 3.1 3.1 3.1h62.2c1.7 0 3.1-1.3 3.1-3.1v-2.9H0zM125.8 59.3H99c-1.2 0-2.2.9-2.2 2.2v4.1H128v-4.1c0-1.3-.9-2.2-2.2-2.2zm-9.4 4.1h-7.9c-.6 0-1-.4-1-1s.4-1 1-1h7.9c.6 0 1 .4 1 1 .1.6-.3 1-1 1zm3.8 0h-.4c-.6 0-1-.4-1-1s.4-1 1-1h.4c.6 0 1 .4 1 1s-.4 1-1 1zM96.8 107.1c0 1.2.9 2.2 2.2 2.2h26.8c1.2 0 2.2-1 2.2-2.2V103H96.8zm11.6-2h7.9c.6 0 1 .4 1 1s-.4 1-1 1h-7.9c-.6 0-1-.4-1-1s.4-1 1-1zM81.7 93.7H78v-5.6H67.3v7.6h14.3c.6 0 1-.4 1-1 .1-.6-.3-1-.9-1z\" fill=\"currentColor\"></path>\n            </svg>";
	      _icon += '<span>' + Lampa.Lang.translate('client_dlna_all_device') + '</span>';
	      empty_item.html(_icon);
	      nav.push(empty_item);
	    }
	    for (var i = 0; i < nav.length; i++) {
	      if (i > 0) {
	        var spl = document.createElement('div');
	        spl.addClass('client-dlna-head__split');
	        head.append(spl);
	      }
	      head.append(nav[i]);
	    }
	  };
	  this.displayFolder = function () {
	    var _this3 = this;
	    var device = tree.device;
	    var folder = tree.tree[tree.tree.length - 1];
	    this.drawLoading(Lampa.Lang.translate('loading'));
	    device.browse(folder, 0, 10, this.drawFolder.bind(this), function () {
	      Lampa.Noty.show(Lampa.Lang.translate('torrent_parser_empty'));
	      tree.tree.pop();
	      _this3.displayFolder();
	    });
	  };
	  this.back = function () {
	    if (tree) {
	      if (tree.tree.length > 1) {
	        tree.tree.pop();
	        this.displayFolder();
	      } else {
	        tree = false;
	        this.drawDevices();
	      }
	    } else {
	      Lampa.Activity.backward();
	    }
	  };
	  this.background = function () {
	    Lampa.Background.immediately('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAZCAYAAABD2GxlAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHASURBVHgBlZaLrsMgDENXxAf3/9XHFdXNZLm2YZHQymPk4CS0277v9+ffrut62nEcn/M8nzb69cxj6le1+75f/RqrZ9fatm3F9wwMR7yhawilNke4Gis/7j9srQbdaVFBnkcQ1WrfgmIIBcTrvgqqsKiTzvpOQbUnAykVW4VVqZXyyDllYFSKx9QaVrO7nGJIB63g+FAq/xhcHWBYdwCsmAtvFZUKE0MlVZWCT4idOlyhTp3K35R/6Nzlq0uBnsKWlEzgSh1VGJxv6rmpXMO7EK+XWUPnDFRWqitQFeY2UyZVryuWlI8ulLgGf19FooAUwC9gCWLcwzWPb7Wa60qdlZxjx6ooUuUqVQsK+y1VoAJyBeJAVsLJeYmg/RIXdG2kPhwYPBUQQyYF0XC8lwP3MTCrYAXB88556peCbUUZV7WccwkUQfCZC4PXdA5hKhSVhythZqjZM0J39w5m8BRadKAcrsIpNZsLIYdOqcZ9hExhZ1MH+QL+ciFzXzmYhZr/M6yUUwp2dp5U4naZDwAF5JRSefdScJZ3SkU0nl8xpaAy+7ml1EqvMXSs1HRrZ9bc3eZUSXmGa/mdyjbmqyX7A9RaYQa9IRJ0AAAAAElFTkSuQmCC');
	  };
	  this.start = function () {
	    if (Lampa.Activity.active() && Lampa.Activity.active().activity !== this.activity) return;
	    this.background();
	    Lampa.Controller.add('content', {
	      invisible: true,
	      toggle: function toggle() {
	        Lampa.Controller.collectionSet(html);
	        Lampa.Controller.collectionFocus(false, html);
	      },
	      left: function left() {
	        if (Navigator.canmove('left')) Navigator.move('left');else Lampa.Controller.toggle('menu');
	      },
	      up: function up() {
	        if (Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
	      },
	      right: function right() {
	        Navigator.move('right');
	      },
	      down: function down() {
	        Navigator.move('down');
	      },
	      back: this.back.bind(this)
	    });
	    Lampa.Controller.toggle('content');
	  };
	  this.pause = function () {};
	  this.stop = function () {};
	  this.render = function () {
	    return html;
	  };
	  this.destroy = function () {
	    if (deviceFinder) deviceFinder.removeDeviceDiscoveryListener(listener_id);
	    if (scroll) scroll.destroy();
	    html.remove();
	  };
	}

	// window.webapis = {
	//     allshare: {
	//         serviceconnector: {
	//             createServiceProvider: function(good, err){
	//                 good()
	//             },
	//             getServiceProvider: function(){
	//                 return window.webapis.allshare.serviceconnector
	//             },
	//             getDeviceFinder: function(){
	//                 return {
	//                     getDeviceList: function(){
	//                         return [{
	//                             browse: (where, index, max, call)=>{
	//                                 let root = [{
	//                                     contentBuildType: "PROVIDER",
	//                                     date: "2023-06-14",
	//                                     duration: 0,
	//                                     extension: "avi",
	//                                     fileSize: 781084672,
	//                                     height: 0,
	//                                     isRootFolder: false,
	//                                     itemType: "FOLDER",
	//                                     title: "Следствие ведут знатоки (малые рипы)/Следствие ведут знатоки фильм 01 Черный маклер 745"
	//                                 }]

	//                                 let folder = [{
	//                                     contentBuildType: "PROVIDER",
	//                                     date: "2023-06-14",
	//                                     duration: 0,
	//                                     extension: "avi",
	//                                     fileSize: 781084672,
	//                                     height: 0,
	//                                     isRootFolder: false,
	//                                     itemType: "FOLDER",
	//                                     title: "Moviews"
	//                                 },
	//                                 {
	//                                     contentBuildType: "PROVIDER",
	//                                     date: "2023-06-14",
	//                                     duration: 0,
	//                                     extension: "avi",
	//                                     fileSize: 781084672,
	//                                     height: 0,
	//                                     isRootFolder: false,
	//                                     itemType: "FOLDER",
	//                                     title: "Moviews"
	//                                 },
	//                                 {
	//                                     contentBuildType: "PROVIDER",
	//                                     date: "2023-06-14",
	//                                     duration: 0,
	//                                     extension: "avi",
	//                                     fileSize: 781084672,
	//                                     height: 0,
	//                                     isRootFolder: false,
	//                                     itemType: "VIDEO",
	//                                     title: "Super_Mario_Brosers.avi"
	//                                 },{
	//                                     contentBuildType: "PROVIDER",
	//                                     date: "2023-06-14",
	//                                     duration: 0,
	//                                     extension: "avi",
	//                                     fileSize: 781084672,
	//                                     height: 0,
	//                                     isRootFolder: false,
	//                                     itemType: "VIDEO",
	//                                     title: "Super_Mario_Brosers.avi"
	//                                 },{
	//                                     contentBuildType: "PROVIDER",
	//                                     date: "2023-06-14",
	//                                     duration: 0,
	//                                     extension: "avi",
	//                                     fileSize: 781084672,
	//                                     height: 0,
	//                                     isRootFolder: false,
	//                                     itemType: "VIDEO",
	//                                     title: "Super_Mario_Brosers.avi"
	//                                 },{
	//                                     contentBuildType: "PROVIDER",
	//                                     date: "2023-06-14",
	//                                     duration: 0,
	//                                     extension: "avi",
	//                                     fileSize: 781084672,
	//                                     height: 0,
	//                                     isRootFolder: false,
	//                                     itemType: "VIDEO",
	//                                     title: "Super_Mario_Brosers.avi"
	//                                 },{
	//                                     contentBuildType: "PROVIDER",
	//                                     date: "2023-06-14",
	//                                     duration: 0,
	//                                     extension: "avi",
	//                                     fileSize: 781084672,
	//                                     height: 0,
	//                                     isRootFolder: false,
	//                                     itemType: "VIDEO",
	//                                     title: "Super_Mario_Brosers.avi"
	//                                 }]

	//                                 call(where.isRootFolder ? root : folder)
	//                             },
	//                             deviceDomain: "LOCAL_NETWORK",
	//                             deviceType: "MEDIAPROVIDER",
	//                             iconArray: [],
	//                             id: "uuid:cb14b8a3-c25f-e43b-596b-49b4643ff223+wlan0",
	//                             ipAddress: "192.168.0.103",
	//                             isSearchable: true,
	//                             modelName: "dms 1.4",
	//                             name: "Tor",
	//                             nic: "192.168.0.102",
	//                             rootFolder: {
	//                                 isRootFolder: true,
	//                                 title: 'Root',
	//                             },
	//                             search: ()=>{},
	//                             subtype: ""
	//                         }]
	//                     },
	//                     addDeviceDiscoveryListener: function(){
	//                         return 23334
	//                     },
	//                     removeDeviceDiscoveryListener: function(){

	//                     }
	//                 }
	//             }
	//         }
	//     }
	// }

	function startPlugin() {
	  window.plugin_client_dnla = true;
	  Lampa.Lang.add({
	    client_dlna_search_device: {
	      ru: 'Поиск устройств',
	      en: 'Device search',
	      uk: 'Пошук пристроїв',
	      be: 'Пошук прылад',
	      zh: '设备搜索',
	      pt: 'Pesquisa de dispositivos'
	    },
	    client_dlna_nosuport: {
	      ru: 'Ваш виджет не поддерживается, обновите виджет на новую версию',
	      en: 'Your widget is not supported, update the widget to a newer version',
	      uk: 'Віджет не підтримується, оновіть віджет на нову версію',
	      be: 'Ваш віджэт не падтрымліваецца, абнавіце віджэт на новую версію',
	      zh: '不支持您的小部件，请将小部件更新到较新版本',
	      pt: 'Seu widget não é compatível, atualize o widget para uma versão mais recente'
	    },
	    client_dlna_all_device: {
	      ru: 'Все устройства',
	      en: 'All devices',
	      uk: 'Усі пристрої',
	      be: 'Усе прылады',
	      zh: '所有设备',
	      pt: 'Todos os dispositivos'
	    }
	  });
	  var manifest = {
	    type: 'plugin',
	    version: '1.1.1',
	    name: 'DLNA',
	    description: '',
	    component: 'client_dnla'
	  };
	  Lampa.Manifest.plugins = manifest;
	  Lampa.Template.add('client_dlna_main', "\n        <div class=\"client-dlna-main\">\n            <div class=\"client-dlna-main__head client-dlna-head\"></div>\n            <div class=\"client-dlna-main__body\"></div>\n        </div>\n    ");
	  Lampa.Template.add('client_dlna_loading', "\n        <div class=\"client-dlna-loading\">\n            <div class=\"client-dlna-loading__title\"></div>\n            <div class=\"client-dlna-loading__loader\">\n                <div class=\"broadcast__scan\"><div></div></div>\n            </div>\n        </div>\n    ");
	  Lampa.Template.add('client_dlna_device', "\n        <div class=\"client-dlna-device selector\">\n            <div class=\"client-dlna-device__body\">\n                <div class=\"client-dlna-device__icon\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 128 128\" xml:space=\"preserve\">\n                        <path d=\"M111.7 57.1V22.2c0-1.1-.5-2.3-1.4-2.9h-.1c-.6-.4-1.2-.6-2-.6H30.9c-2 0-3.5 1.5-3.5 3.5v31.9h34.9c2.8 0 5.1 2.4 5.1 5.2v15.5h27.5V61.4c0-2.4 1.9-4.2 4.2-4.2h12.6z\" fill=\"currentColor\"></path>\n                        <path d=\"M96.8 67.6H128v33.2H96.8zM67.3 86.1h27.5v-9.2H67.3zM65.1 59.3c0-1.8-1.3-3.1-3-3.1h-56c-1.7 0-3 1.4-3 3.1v41.9h62zM0 106.1c0 1.7 1.3 3.1 3.1 3.1h62.2c1.7 0 3.1-1.3 3.1-3.1v-2.9H0zM125.8 59.3H99c-1.2 0-2.2.9-2.2 2.2v4.1H128v-4.1c0-1.3-.9-2.2-2.2-2.2zm-9.4 4.1h-7.9c-.6 0-1-.4-1-1s.4-1 1-1h7.9c.6 0 1 .4 1 1 .1.6-.3 1-1 1zm3.8 0h-.4c-.6 0-1-.4-1-1s.4-1 1-1h.4c.6 0 1 .4 1 1s-.4 1-1 1zM96.8 107.1c0 1.2.9 2.2 2.2 2.2h26.8c1.2 0 2.2-1 2.2-2.2V103H96.8zm11.6-2h7.9c.6 0 1 .4 1 1s-.4 1-1 1h-7.9c-.6 0-1-.4-1-1s.4-1 1-1zM81.7 93.7H78v-5.6H67.3v7.6h14.3c.6 0 1-.4 1-1 .1-.6-.3-1-.9-1z\" fill=\"currentColor\"></path>\n                    </svg>\n                </div>\n                <div class=\"client-dlna-device__name\"></div>\n                <div class=\"client-dlna-device__ip\"></div>\n            </div>\n        </div>\n    ");
	  Lampa.Template.add('client_dlna_folder', "\n        <div class=\"client-dlna-device selector\">\n            <div class=\"client-dlna-device__body\">\n                <div class=\"client-dlna-device__icon\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 408 408\" style=\"enable-background:new 0 0 512 512\" xml:space=\"preserve\">\n                        <path d=\"M372 88.661H206.32l-33-39.24a5.001 5.001 0 0 0-4-1.8H36c-19.956.198-36.023 16.443-36 36.4v240c-.001 19.941 16.06 36.163 36 36.36h336c19.94-.197 36.001-16.419 36-36.36v-199c.001-19.941-16.06-36.162-36-36.36z\" fill=\"currentColor\"></path>\n                    </svg>\n                </div>\n                <div class=\"client-dlna-device__name\"></div>\n            </div>\n        </div>\n    ");
	  Lampa.Template.add('client_dlna_file', "\n        <div class=\"client-dlna-file selector\">\n            <div class=\"client-dlna-file__body\">\n                <div class=\"client-dlna-file__icon\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 477.867 477.867\" xml:space=\"preserve\">\n                        <path d=\"M238.933 0C106.974 0 0 106.974 0 238.933s106.974 238.933 238.933 238.933 238.933-106.974 238.933-238.933C477.726 107.033 370.834.141 238.933 0zm100.624 246.546a17.068 17.068 0 0 1-7.662 7.662v.085L195.362 322.56c-8.432 4.213-18.682.794-22.896-7.638a17.061 17.061 0 0 1-1.8-7.722V170.667c-.004-9.426 7.633-17.07 17.059-17.075a17.068 17.068 0 0 1 7.637 1.8l136.533 68.267c8.436 4.204 11.867 14.451 7.662 22.887z\" fill=\"currentColor\"></path>\n                    </svg>\n                </div>\n                <div class=\"client-dlna-file__name\"></div>\n                <div class=\"client-dlna-file__size\"></div>\n            </div>\n        </div>\n    ");
	  Lampa.Template.add(manifest.component + '_style', "\n        <style>\n        .client-dlna-main__wrap::after{content:'';display:block;clear:both}.client-dlna-main__split{clear:both;padding:1.2em;font-size:1.4em}.client-dlna-head{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;line-height:1.4;font-size:1.2em;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;min-height:4.1em;padding:.7em;padding-bottom:0}.client-dlna-head>*{margin:.5em;-webkit-border-radius:.3em;border-radius:.3em;padding:.4em 1em;-o-text-overflow:ellipsis;text-overflow:ellipsis;max-width:20em;overflow:hidden;white-space:nowrap;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.client-dlna-head__device{background-color:#404040;font-weight:600;margin-right:1.4em}.client-dlna-head__device>svg{width:1.5em !important;height:1.5em !important;margin-right:1em;vertical-align:middle;opacity:.5}.client-dlna-head__split{padding:0;margin:0;overflow:inherit}.client-dlna-head__split::before{content:'';display:block;width:.3em;height:.3em;border-right:.2em solid #fff;border-bottom:.2em solid #fff;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg);opacity:.5;margin-top:.15em}.client-dlna-device{float:left;width:33.3%;padding:1.5em;line-height:1.4}.client-dlna-device__body{background-color:#404040;-webkit-border-radius:1em;border-radius:1em;padding:1.5em;position:relative;min-height:12.5em}.client-dlna-device__name{font-weight:600;font-size:1.4em;margin-bottom:.4em;overflow:hidden;-o-text-overflow:'.';text-overflow:'.';display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical}.client-dlna-device__ip{opacity:.5}.client-dlna-device__icon{opacity:.5;margin-bottom:1em}.client-dlna-device__icon svg{width:4em !important;height:4em !important}.client-dlna-device.focus .client-dlna-device__body::after,.client-dlna-device.hover .client-dlna-device__body::after{content:'';position:absolute;top:-0.5em;left:-0.5em;right:-0.5em;bottom:-0.5em;border:.3em solid #fff;-webkit-border-radius:1.4em;border-radius:1.4em;z-index:-1;pointer-events:none}.client-dlna-loading{margin:0 auto;padding:1.5em;text-align:center}.client-dlna-loading__title{font-size:1.4em;margin-bottom:2em}.client-dlna-file{padding:1.5em;line-height:1.4;padding-bottom:0}.client-dlna-file__body{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;background-color:#404040;-webkit-border-radius:1em;border-radius:1em;padding:1.5em;position:relative}.client-dlna-file__icon{opacity:.5;margin-right:2em}.client-dlna-file__icon svg{width:3em !important;height:3em !important}.client-dlna-file__name{font-weight:600;font-size:1.4em;overflow:hidden;-o-text-overflow:'.';text-overflow:'.';display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical}.client-dlna-file__size{padding-left:2em;margin-left:auto}.client-dlna-file.focus .client-dlna-file__body::after,.client-dlna-file.hover .client-dlna-file__body::after{content:'';position:absolute;top:-0.5em;left:-0.5em;right:-0.5em;bottom:-0.5em;border:.3em solid #fff;-webkit-border-radius:1.4em;border-radius:1.4em;z-index:-1;pointer-events:none}\n        </style>\n    ");
	  try {
	    webapis.allshare.serviceconnector.createServiceProvider(function () {
	      console.log('DLNA', 'connected');
	      window.serviceProvider = webapis.allshare.serviceconnector.getServiceProvider();
	    }, function (e) {
	      console.log('DLNA', 'connect error:', e.message);
	    });
	  } catch (e) {}
	  function add() {
	    //if(!Lampa.Platform.is('tizen')) return

	    var button = $("<li class=\"menu__item selector\">\n            <div class=\"menu__ico\">\n                <svg viewBox=\"0 0 512 512\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path fill=\"currentColor\" d=\"M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.833 256-256S397.167 0 256 0Zm0 472.341c-119.275 0-216.341-97.066-216.341-216.341S136.725 39.659 256 39.659c119.295 0 216.341 97.066 216.341 216.341S375.275 472.341 256 472.341z\"/>\n                    <circle cx=\"160\" cy=\"250\" r=\"60\" fill=\"currentColor\"/>\n                    <circle cx=\"320\" cy=\"150\" r=\"60\" fill=\"currentColor\"/>\n                    <circle cx=\"320\" cy=\"350\" r=\"60\" fill=\"currentColor\"/>\n                    <path fill=\"currentColor\" d=\"M35 135h270v30H35zm175.782 100h270v30h-270zM35 335h270v30H35z\"/>\n                </svg>\n            </div>\n            <div class=\"menu__text\">".concat(manifest.name, "</div>\n        </li>"));
	    button.on('hover:enter', function () {
	      Lampa.Activity.push({
	        url: '',
	        title: manifest.name,
	        component: manifest.component,
	        page: 1
	      });
	    });
	    $('.menu .menu__list').eq(0).append(button);
	    $('body').append(Lampa.Template.get(manifest.component + '_style', {}, true));
	  }
	  Lampa.Component.add(manifest.component, Component);
	  if (window.appready) add();else {
	    Lampa.Listener.follow('app', function (e) {
	      if (e.type == 'ready') add();
	    });
	  }
	}
	if (!window.plugin_client_dnla) startPlugin();

})();
