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

	var fails$r = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$q = fails$r;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$q(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
	});

	var fails$p = fails$r;

	var functionBindNative = !fails$p(function () {
	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
	  var test = function () { /* empty */ }.bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$3 = functionBindNative;

	var call$d = Function.prototype.call;
	// eslint-disable-next-line es/no-function-prototype-bind -- safe
	var functionCall = NATIVE_BIND$3 ? call$d.bind(call$d) : function () {
	  return call$d.apply(call$d, arguments);
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

	var NATIVE_BIND$2 = functionBindNative;

	var FunctionPrototype$2 = Function.prototype;
	var call$c = FunctionPrototype$2.call;
	// eslint-disable-next-line es/no-function-prototype-bind -- safe
	var uncurryThisWithBind = NATIVE_BIND$2 && FunctionPrototype$2.bind.bind(call$c, call$c);

	var functionUncurryThis = NATIVE_BIND$2 ? uncurryThisWithBind : function (fn) {
	  return function () {
	    return call$c.apply(fn, arguments);
	  };
	};

	var uncurryThis$t = functionUncurryThis;

	var toString$f = uncurryThis$t({}.toString);
	var stringSlice$8 = uncurryThis$t(''.slice);

	var classofRaw$2 = function (it) {
	  return stringSlice$8(toString$f(it), 8, -1);
	};

	var uncurryThis$s = functionUncurryThis;
	var fails$o = fails$r;
	var classof$8 = classofRaw$2;

	var $Object$3 = Object;
	var split = uncurryThis$s(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$o(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object$3('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$8(it) === 'String' ? split(it, '') : $Object$3(it);
	} : $Object$3;

	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	var isNullOrUndefined$3 = function (it) {
	  return it === null || it === undefined;
	};

	var isNullOrUndefined$2 = isNullOrUndefined$3;

	var $TypeError$c = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$a = function (it) {
	  if (isNullOrUndefined$2(it)) throw new $TypeError$c("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$3 = indexedObject;
	var requireObjectCoercible$9 = requireObjectCoercible$a;

	var toIndexedObject$7 = function (it) {
	  return IndexedObject$3(requireObjectCoercible$9(it));
	};

	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
	var documentAll = typeof document == 'object' && document.all;

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
	var isCallable$f = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
	  return typeof argument == 'function' || argument === documentAll;
	} : function (argument) {
	  return typeof argument == 'function';
	};

	var isCallable$e = isCallable$f;

	var isObject$g = function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$e(it);
	};

	var globalThis$k = globalThis_1;
	var isCallable$d = isCallable$f;

	var aFunction = function (argument) {
	  return isCallable$d(argument) ? argument : undefined;
	};

	var getBuiltIn$5 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(globalThis$k[namespace]) : globalThis$k[namespace] && globalThis$k[namespace][method];
	};

	var uncurryThis$r = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$r({}.isPrototypeOf);

	var globalThis$j = globalThis_1;

	var navigator = globalThis$j.navigator;
	var userAgent$4 = navigator && navigator.userAgent;

	var environmentUserAgent = userAgent$4 ? String(userAgent$4) : '';

	var globalThis$i = globalThis_1;
	var userAgent$3 = environmentUserAgent;

	var process = globalThis$i.process;
	var Deno$1 = globalThis$i.Deno;
	var versions = process && process.versions || Deno$1 && Deno$1.version;
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
	if (!version && userAgent$3) {
	  match = userAgent$3.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent$3.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var environmentV8Version = version;

	/* eslint-disable es/no-symbol -- required for testing */
	var V8_VERSION$2 = environmentV8Version;
	var fails$n = fails$r;
	var globalThis$h = globalThis_1;

	var $String$6 = globalThis$h.String;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$n(function () {
	  var symbol = Symbol('symbol detection');
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
	  // of course, fail.
	  return !$String$6(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */
	var NATIVE_SYMBOL$1 = symbolConstructorDetection;

	var useSymbolAsUid = NATIVE_SYMBOL$1 &&
	  !Symbol.sham &&
	  typeof Symbol.iterator == 'symbol';

	var getBuiltIn$4 = getBuiltIn$5;
	var isCallable$c = isCallable$f;
	var isPrototypeOf$2 = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var $Object$2 = Object;

	var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$4('Symbol');
	  return isCallable$c($Symbol) && isPrototypeOf$2($Symbol.prototype, $Object$2(it));
	};

	var $String$5 = String;

	var tryToString$3 = function (argument) {
	  try {
	    return $String$5(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var isCallable$b = isCallable$f;
	var tryToString$2 = tryToString$3;

	var $TypeError$b = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$5 = function (argument) {
	  if (isCallable$b(argument)) return argument;
	  throw new $TypeError$b(tryToString$2(argument) + ' is not a function');
	};

	var aCallable$4 = aCallable$5;
	var isNullOrUndefined$1 = isNullOrUndefined$3;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$5 = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined$1(func) ? undefined : aCallable$4(func);
	};

	var call$b = functionCall;
	var isCallable$a = isCallable$f;
	var isObject$f = isObject$g;

	var $TypeError$a = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$a(fn = input.toString) && !isObject$f(val = call$b(fn, input))) return val;
	  if (isCallable$a(fn = input.valueOf) && !isObject$f(val = call$b(fn, input))) return val;
	  if (pref !== 'string' && isCallable$a(fn = input.toString) && !isObject$f(val = call$b(fn, input))) return val;
	  throw new $TypeError$a("Can't convert object to primitive value");
	};

	var sharedStore = {exports: {}};

	var globalThis$g = globalThis_1;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$4 = Object.defineProperty;

	var defineGlobalProperty$3 = function (key, value) {
	  try {
	    defineProperty$4(globalThis$g, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    globalThis$g[key] = value;
	  } return value;
	};

	var globalThis$f = globalThis_1;
	var defineGlobalProperty$2 = defineGlobalProperty$3;

	var SHARED = '__core-js_shared__';
	var store$3 = sharedStore.exports = globalThis$f[SHARED] || defineGlobalProperty$2(SHARED, {});

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

	var requireObjectCoercible$8 = requireObjectCoercible$a;

	var $Object$1 = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$7 = function (argument) {
	  return $Object$1(requireObjectCoercible$8(argument));
	};

	var uncurryThis$q = functionUncurryThis;
	var toObject$6 = toObject$7;

	var hasOwnProperty = uncurryThis$q({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$6(it), key);
	};

	var uncurryThis$p = functionUncurryThis;

	var id = 0;
	var postfix = Math.random();
	var toString$e = uncurryThis$p(1.1.toString);

	var uid$2 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$e(++id + postfix, 36);
	};

	var globalThis$e = globalThis_1;
	var shared$3 = shared$4;
	var hasOwn$8 = hasOwnProperty_1;
	var uid$1 = uid$2;
	var NATIVE_SYMBOL = symbolConstructorDetection;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var Symbol$3 = globalThis$e.Symbol;
	var WellKnownSymbolsStore = shared$3('wks');
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$3['for'] || Symbol$3 : Symbol$3 && Symbol$3.withoutSetter || uid$1;

	var wellKnownSymbol$e = function (name) {
	  if (!hasOwn$8(WellKnownSymbolsStore, name)) {
	    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$8(Symbol$3, name)
	      ? Symbol$3[name]
	      : createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var call$a = functionCall;
	var isObject$e = isObject$g;
	var isSymbol$1 = isSymbol$2;
	var getMethod$4 = getMethod$5;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$d = wellKnownSymbol$e;

	var $TypeError$9 = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol$d('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$1 = function (input, pref) {
	  if (!isObject$e(input) || isSymbol$1(input)) return input;
	  var exoticToPrim = getMethod$4(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$a(exoticToPrim, input, pref);
	    if (!isObject$e(result) || isSymbol$1(result)) return result;
	    throw new $TypeError$9("Can't convert object to primitive value");
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

	var globalThis$d = globalThis_1;
	var isObject$d = isObject$g;

	var document$1 = globalThis$d.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$d(document$1) && isObject$d(document$1.createElement);

	var documentCreateElement$2 = function (it) {
	  return EXISTS$1 ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$b = descriptors;
	var fails$m = fails$r;
	var createElement = documentCreateElement$2;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$b && !fails$m(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a !== 7;
	});

	var DESCRIPTORS$a = descriptors;
	var call$9 = functionCall;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var createPropertyDescriptor$2 = createPropertyDescriptor$3;
	var toIndexedObject$6 = toIndexedObject$7;
	var toPropertyKey$1 = toPropertyKey$2;
	var hasOwn$7 = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$a ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$6(O);
	  P = toPropertyKey$1(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$7(O, P)) return createPropertyDescriptor$2(!call$9(propertyIsEnumerableModule.f, O, P), O[P]);
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$9 = descriptors;
	var fails$l = fails$r;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$9 && fails$l(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype !== 42;
	});

	var isObject$c = isObject$g;

	var $String$4 = String;
	var $TypeError$8 = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$c = function (argument) {
	  if (isObject$c(argument)) return argument;
	  throw new $TypeError$8($String$4(argument) + ' is not an object');
	};

	var DESCRIPTORS$8 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$b = anObject$c;
	var toPropertyKey = toPropertyKey$2;

	var $TypeError$7 = TypeError;
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
	  anObject$b(O);
	  P = toPropertyKey(P);
	  anObject$b(Attributes);
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
	  anObject$b(O);
	  P = toPropertyKey(P);
	  anObject$b(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError$7('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$7 = descriptors;
	var definePropertyModule$4 = objectDefineProperty;
	var createPropertyDescriptor$1 = createPropertyDescriptor$3;

	var createNonEnumerableProperty$5 = DESCRIPTORS$7 ? function (object, key, value) {
	  return definePropertyModule$4.f(object, key, createPropertyDescriptor$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var makeBuiltIn$3 = {exports: {}};

	var DESCRIPTORS$6 = descriptors;
	var hasOwn$6 = hasOwnProperty_1;

	var FunctionPrototype$1 = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$6 && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$6(FunctionPrototype$1, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && function something() { /* empty */ }.name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$6 || (DESCRIPTORS$6 && getDescriptor(FunctionPrototype$1, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var uncurryThis$o = functionUncurryThis;
	var isCallable$9 = isCallable$f;
	var store$1 = sharedStore.exports;

	var functionToString = uncurryThis$o(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$9(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	var inspectSource$2 = store$1.inspectSource;

	var globalThis$c = globalThis_1;
	var isCallable$8 = isCallable$f;

	var WeakMap$1 = globalThis$c.WeakMap;

	var weakMapBasicDetection = isCallable$8(WeakMap$1) && /native code/.test(String(WeakMap$1));

	var shared$2 = shared$4;
	var uid = uid$2;

	var keys$1 = shared$2('keys');

	var sharedKey$2 = function (key) {
	  return keys$1[key] || (keys$1[key] = uid(key));
	};

	var hiddenKeys$4 = {};

	var NATIVE_WEAK_MAP = weakMapBasicDetection;
	var globalThis$b = globalThis_1;
	var isObject$b = isObject$g;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
	var hasOwn$5 = hasOwnProperty_1;
	var shared$1 = sharedStore.exports;
	var sharedKey$1 = sharedKey$2;
	var hiddenKeys$3 = hiddenKeys$4;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$1 = globalThis$b.TypeError;
	var WeakMap = globalThis$b.WeakMap;
	var set, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$b(it) || (state = get(it)).type !== TYPE) {
	      throw new TypeError$1('Incompatible receiver, ' + TYPE + ' required');
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
	    if (hasOwn$5(it, STATE)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$4(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return hasOwn$5(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$5(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var uncurryThis$n = functionUncurryThis;
	var fails$k = fails$r;
	var isCallable$7 = isCallable$f;
	var hasOwn$4 = hasOwnProperty_1;
	var DESCRIPTORS$5 = descriptors;
	var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
	var inspectSource$1 = inspectSource$2;
	var InternalStateModule = internalState;

	var enforceInternalState$1 = InternalStateModule.enforce;
	var getInternalState$1 = InternalStateModule.get;
	var $String$3 = String;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$3 = Object.defineProperty;
	var stringSlice$7 = uncurryThis$n(''.slice);
	var replace$4 = uncurryThis$n(''.replace);
	var join = uncurryThis$n([].join);

	var CONFIGURABLE_LENGTH = DESCRIPTORS$5 && !fails$k(function () {
	  return defineProperty$3(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
	});

	var TEMPLATE = String(String).split('String');

	var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
	  if (stringSlice$7($String$3(name), 0, 7) === 'Symbol(') {
	    name = '[' + replace$4($String$3(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
	  }
	  if (options && options.getter) name = 'get ' + name;
	  if (options && options.setter) name = 'set ' + name;
	  if (!hasOwn$4(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
	    if (DESCRIPTORS$5) defineProperty$3(value, 'name', { value: name, configurable: true });
	    else value.name = name;
	  }
	  if (CONFIGURABLE_LENGTH && options && hasOwn$4(options, 'arity') && value.length !== options.arity) {
	    defineProperty$3(value, 'length', { value: options.arity });
	  }
	  try {
	    if (options && hasOwn$4(options, 'constructor') && options.constructor) {
	      if (DESCRIPTORS$5) defineProperty$3(value, 'prototype', { writable: false });
	    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
	    } else if (value.prototype) value.prototype = undefined;
	  } catch (error) { /* empty */ }
	  var state = enforceInternalState$1(value);
	  if (!hasOwn$4(state, 'source')) {
	    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
	  } return value;
	};

	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	// eslint-disable-next-line no-extend-native -- required
	Function.prototype.toString = makeBuiltIn$2(function toString() {
	  return isCallable$7(this) && getInternalState$1(this).source || inspectSource$1(this);
	}, 'toString');

	var isCallable$6 = isCallable$f;
	var definePropertyModule$3 = objectDefineProperty;
	var makeBuiltIn$1 = makeBuiltIn$3.exports;
	var defineGlobalProperty$1 = defineGlobalProperty$3;

	var defineBuiltIn$5 = function (O, key, value, options) {
	  if (!options) options = {};
	  var simple = options.enumerable;
	  var name = options.name !== undefined ? options.name : key;
	  if (isCallable$6(value)) makeBuiltIn$1(value, name, options);
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
	var floor$4 = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor$4 : ceil)(n);
	};

	var trunc = mathTrunc;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$7 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};

	var toIntegerOrInfinity$6 = toIntegerOrInfinity$7;

	var max$2 = Math.max;
	var min$4 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$2 = function (index, length) {
	  var integer = toIntegerOrInfinity$6(index);
	  return integer < 0 ? max$2(integer + length, 0) : min$4(integer, length);
	};

	var toIntegerOrInfinity$5 = toIntegerOrInfinity$7;

	var min$3 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$4 = function (argument) {
	  var len = toIntegerOrInfinity$5(argument);
	  return len > 0 ? min$3(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength$3 = toLength$4;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$7 = function (obj) {
	  return toLength$3(obj.length);
	};

	var toIndexedObject$5 = toIndexedObject$7;
	var toAbsoluteIndex$1 = toAbsoluteIndex$2;
	var lengthOfArrayLike$6 = lengthOfArrayLike$7;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$4 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$5($this);
	    var length = lengthOfArrayLike$6(O);
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
	  includes: createMethod$4(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$4(false)
	};

	var uncurryThis$m = functionUncurryThis;
	var hasOwn$3 = hasOwnProperty_1;
	var toIndexedObject$4 = toIndexedObject$7;
	var indexOf$1 = arrayIncludes.indexOf;
	var hiddenKeys$2 = hiddenKeys$4;

	var push$3 = uncurryThis$m([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$4(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$3(hiddenKeys$2, key) && hasOwn$3(O, key) && push$3(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$3(O, key = names[i++])) {
	    ~indexOf$1(result, key) || push$3(result, key);
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

	var getBuiltIn$3 = getBuiltIn$5;
	var uncurryThis$l = functionUncurryThis;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var anObject$a = anObject$c;

	var concat$1 = uncurryThis$l([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$1 = getBuiltIn$3('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject$a(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  return getOwnPropertySymbols ? concat$1(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn$2 = hasOwnProperty_1;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule$2 = objectDefineProperty;

	var copyConstructorProperties$1 = function (target, source, exceptions) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule$2.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn$2(target, key) && !(exceptions && hasOwn$2(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var fails$j = fails$r;
	var isCallable$5 = isCallable$f;

	var replacement = /#|\.prototype\./;

	var isForced$2 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value === POLYFILL ? true
	    : value === NATIVE ? false
	    : isCallable$5(detection) ? fails$j(detection)
	    : !!detection;
	};

	var normalize = isForced$2.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$2.data = {};
	var NATIVE = isForced$2.NATIVE = 'N';
	var POLYFILL = isForced$2.POLYFILL = 'P';

	var isForced_1 = isForced$2;

	var globalThis$a = globalThis_1;
	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
	var defineBuiltIn$4 = defineBuiltIn$5;
	var defineGlobalProperty = defineGlobalProperty$3;
	var copyConstructorProperties = copyConstructorProperties$1;
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
	    target = globalThis$a;
	  } else if (STATIC) {
	    target = globalThis$a[TARGET] || defineGlobalProperty(TARGET, {});
	  } else {
	    target = globalThis$a[TARGET] && globalThis$a[TARGET].prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$3(sourceProperty, 'sham', true);
	    }
	    defineBuiltIn$4(target, key, sourceProperty, options);
	  }
	};

	var classofRaw$1 = classofRaw$2;
	var uncurryThis$k = functionUncurryThis;

	var functionUncurryThisClause = function (fn) {
	  // Nashorn bug:
	  //   https://github.com/zloirock/core-js/issues/1128
	  //   https://github.com/zloirock/core-js/issues/1130
	  if (classofRaw$1(fn) === 'Function') return uncurryThis$k(fn);
	};

	var uncurryThis$j = functionUncurryThisClause;
	var aCallable$3 = aCallable$5;
	var NATIVE_BIND$1 = functionBindNative;

	var bind$1 = uncurryThis$j(uncurryThis$j.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable$3(fn);
	  return that === undefined ? fn : NATIVE_BIND$1 ? bind$1(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var classof$7 = classofRaw$2;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$5 = Array.isArray || function isArray(argument) {
	  return classof$7(argument) === 'Array';
	};

	var wellKnownSymbol$c = wellKnownSymbol$e;

	var TO_STRING_TAG$1 = wellKnownSymbol$c('toStringTag');
	var test$2 = {};
	// eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
	test$2[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test$2) === '[object z]';

	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var isCallable$4 = isCallable$f;
	var classofRaw = classofRaw$2;
	var wellKnownSymbol$b = wellKnownSymbol$e;

	var TO_STRING_TAG = wellKnownSymbol$b('toStringTag');
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
	var classof$6 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) === 'Object' && isCallable$4(O.callee) ? 'Arguments' : result;
	};

	var uncurryThis$i = functionUncurryThis;
	var fails$i = fails$r;
	var isCallable$3 = isCallable$f;
	var classof$5 = classof$6;
	var getBuiltIn$2 = getBuiltIn$5;
	var inspectSource = inspectSource$2;

	var noop = function () { /* empty */ };
	var construct = getBuiltIn$2('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec$3 = uncurryThis$i(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable$3(argument)) return false;
	  try {
	    construct(noop, [], argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable$3(argument)) return false;
	  switch (classof$5(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec$3(constructorRegExp, inspectSource(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$3 = !construct || fails$i(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var isArray$4 = isArray$5;
	var isConstructor$2 = isConstructor$3;
	var isObject$a = isObject$g;
	var wellKnownSymbol$a = wellKnownSymbol$e;

	var SPECIES$5 = wellKnownSymbol$a('species');
	var $Array$1 = Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$1 = function (originalArray) {
	  var C;
	  if (isArray$4(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor$2(C) && (C === $Array$1 || isArray$4(C.prototype))) C = undefined;
	    else if (isObject$a(C)) {
	      C = C[SPECIES$5];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? $Array$1 : C;
	};

	var arraySpeciesConstructor = arraySpeciesConstructor$1;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$2 = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var DESCRIPTORS$4 = descriptors;
	var definePropertyModule$1 = objectDefineProperty;
	var createPropertyDescriptor = createPropertyDescriptor$3;

	var createProperty$3 = function (object, key, value) {
	  if (DESCRIPTORS$4) definePropertyModule$1.f(object, key, createPropertyDescriptor(0, value));
	  else object[key] = value;
	};

	var bind = functionBindContext;
	var IndexedObject$2 = indexedObject;
	var toObject$5 = toObject$7;
	var lengthOfArrayLike$5 = lengthOfArrayLike$7;
	var arraySpeciesCreate$1 = arraySpeciesCreate$2;
	var createProperty$2 = createProperty$3;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod$3 = function (TYPE) {
	  var IS_MAP = TYPE === 1;
	  var IS_FILTER = TYPE === 2;
	  var IS_SOME = TYPE === 3;
	  var IS_EVERY = TYPE === 4;
	  var IS_FIND_INDEX = TYPE === 6;
	  var IS_FILTER_REJECT = TYPE === 7;
	  var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that) {
	    var O = toObject$5($this);
	    var self = IndexedObject$2(O);
	    var length = lengthOfArrayLike$5(self);
	    var boundFunction = bind(callbackfn, that);
	    var index = 0;
	    var resIndex = 0;
	    var target = IS_MAP ? arraySpeciesCreate$1($this, length) : IS_FILTER || IS_FILTER_REJECT ? arraySpeciesCreate$1($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) createProperty$2(target, index, result);    // map
	        else if (result) switch (TYPE) {
	          case 3: return true;                                // some
	          case 5: return value;                               // find
	          case 6: return index;                               // findIndex
	          case 2: createProperty$2(target, resIndex++, value);  // filter
	        } else switch (TYPE) {
	          case 4: return false;                               // every
	          case 7: createProperty$2(target, resIndex++, value);  // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$3(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$3(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$3(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$3(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$3(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$3(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$3(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod$3(7)
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

	var DESCRIPTORS$3 = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule = objectDefineProperty;
	var anObject$9 = anObject$c;
	var toIndexedObject$3 = toIndexedObject$7;
	var objectKeys = objectKeys$1;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS$3 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$9(O);
	  var props = toIndexedObject$3(Properties);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn$1 = getBuiltIn$5;

	var html$1 = getBuiltIn$1('document', 'documentElement');

	/* global ActiveXObject -- old IE, WSH */
	var anObject$8 = anObject$c;
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
	    EmptyConstructor[PROTOTYPE] = anObject$8(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
	};

	var wellKnownSymbol$9 = wellKnownSymbol$e;
	var create$2 = objectCreate;
	var defineProperty$2 = objectDefineProperty.f;

	var UNSCOPABLES = wellKnownSymbol$9('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] === undefined) {
	  defineProperty$2(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: create$2(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables$1 = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var $$i = _export;
	var $find = arrayIteration.find;
	var addToUnscopables = addToUnscopables$1;

	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	// eslint-disable-next-line es/no-array-prototype-find -- testing
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.es/ecma262/#sec-array.prototype.find
	$$i({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof$4 = classof$6;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof$4(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var defineBuiltIn$3 = defineBuiltIn$5;
	var toString$d = objectToString;

	// `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	if (!TO_STRING_TAG_SUPPORT) {
	  defineBuiltIn$3(Object.prototype, 'toString', toString$d, { unsafe: true });
	}

	var classof$3 = classof$6;

	var $String$2 = String;

	var toString$c = function (argument) {
	  if (classof$3(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
	  return $String$2(argument);
	};

	// a string of all valid unicode whitespaces
	var whitespaces$4 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var uncurryThis$h = functionUncurryThis;
	var requireObjectCoercible$7 = requireObjectCoercible$a;
	var toString$b = toString$c;
	var whitespaces$3 = whitespaces$4;

	var replace$3 = uncurryThis$h(''.replace);
	var ltrim = RegExp('^[' + whitespaces$3 + ']+');
	var rtrim = RegExp('(^|[^' + whitespaces$3 + '])[' + whitespaces$3 + ']+$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$2 = function (TYPE) {
	  return function ($this) {
	    var string = toString$b(requireObjectCoercible$7($this));
	    if (TYPE & 1) string = replace$3(string, ltrim, '');
	    if (TYPE & 2) string = replace$3(string, rtrim, '$1');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$2(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
	  end: createMethod$2(2),
	  // `String.prototype.trim` method
	  // https://tc39.es/ecma262/#sec-string.prototype.trim
	  trim: createMethod$2(3)
	};

	var globalThis$9 = globalThis_1;
	var fails$h = fails$r;
	var uncurryThis$g = functionUncurryThis;
	var toString$a = toString$c;
	var trim$1 = stringTrim.trim;
	var whitespaces$2 = whitespaces$4;

	var $parseInt$1 = globalThis$9.parseInt;
	var Symbol$2 = globalThis$9.Symbol;
	var ITERATOR$1 = Symbol$2 && Symbol$2.iterator;
	var hex = /^[+-]?0x/i;
	var exec$2 = uncurryThis$g(hex.exec);
	var FORCED$8 = $parseInt$1(whitespaces$2 + '08') !== 8 || $parseInt$1(whitespaces$2 + '0x16') !== 22
	  // MS Edge 18- broken with boxed symbols
	  || (ITERATOR$1 && !fails$h(function () { $parseInt$1(Object(ITERATOR$1)); }));

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	var numberParseInt = FORCED$8 ? function parseInt(string, radix) {
	  var S = trim$1(toString$a(string));
	  return $parseInt$1(S, (radix >>> 0) || (exec$2(hex, S) ? 16 : 10));
	} : $parseInt$1;

	var $$h = _export;
	var $parseInt = numberParseInt;

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	$$h({ global: true, forced: parseInt !== $parseInt }, {
	  parseInt: $parseInt
	});

	var fails$g = fails$r;
	var wellKnownSymbol$8 = wellKnownSymbol$e;
	var V8_VERSION$1 = environmentV8Version;

	var SPECIES$4 = wellKnownSymbol$8('species');

	var arrayMethodHasSpeciesSupport$4 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$1 >= 51 || !fails$g(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$4] = function () {
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

	var fails$f = fails$r;

	var arrayMethodIsStrict$6 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$f(function () {
	    // eslint-disable-next-line no-useless-call -- required for testing
	    method.call(null, argument || function () { return 1; }, 1);
	  });
	};

	var $forEach = arrayIteration.forEach;
	var arrayMethodIsStrict$5 = arrayMethodIsStrict$6;

	var STRICT_METHOD$2 = arrayMethodIsStrict$5('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD$2 ? function forEach(callbackfn /* , thisArg */) {
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

	/* eslint-disable es/no-array-prototype-indexof -- required for testing */
	var $$e = _export;
	var uncurryThis$f = functionUncurryThisClause;
	var $indexOf = arrayIncludes.indexOf;
	var arrayMethodIsStrict$4 = arrayMethodIsStrict$6;

	var nativeIndexOf = uncurryThis$f([].indexOf);

	var NEGATIVE_ZERO$1 = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
	var FORCED$7 = NEGATIVE_ZERO$1 || !arrayMethodIsStrict$4('indexOf');

	// `Array.prototype.indexOf` method
	// https://tc39.es/ecma262/#sec-array.prototype.indexof
	$$e({ target: 'Array', proto: true, forced: FORCED$7 }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
	    return NEGATIVE_ZERO$1
	      // convert -0 to +0
	      ? nativeIndexOf(this, searchElement, fromIndex) || 0
	      : $indexOf(this, searchElement, fromIndex);
	  }
	});

	var $$d = _export;
	var uncurryThis$e = functionUncurryThis;
	var IndexedObject$1 = indexedObject;
	var toIndexedObject$2 = toIndexedObject$7;
	var arrayMethodIsStrict$3 = arrayMethodIsStrict$6;

	var nativeJoin = uncurryThis$e([].join);

	var ES3_STRINGS = IndexedObject$1 !== Object;
	var FORCED$6 = ES3_STRINGS || !arrayMethodIsStrict$3('join', ',');

	// `Array.prototype.join` method
	// https://tc39.es/ecma262/#sec-array.prototype.join
	$$d({ target: 'Array', proto: true, forced: FORCED$6 }, {
	  join: function join(separator) {
	    return nativeJoin(toIndexedObject$2(this), separator === undefined ? ',' : separator);
	  }
	});

	var $$c = _export;
	var $map = arrayIteration.map;
	var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$4;

	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$2('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	$$c({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var DESCRIPTORS$2 = descriptors;
	var isArray$3 = isArray$5;

	var $TypeError$6 = TypeError;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

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
	  if (isArray$3(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
	    throw new $TypeError$6('Cannot set read only .length');
	  } return O.length = length;
	} : function (O, length) {
	  return O.length = length;
	};

	var uncurryThis$d = functionUncurryThis;

	var arraySlice$1 = uncurryThis$d([].slice);

	var $$b = _export;
	var isArray$2 = isArray$5;
	var isConstructor$1 = isConstructor$3;
	var isObject$9 = isObject$g;
	var toAbsoluteIndex = toAbsoluteIndex$2;
	var lengthOfArrayLike$4 = lengthOfArrayLike$7;
	var toIndexedObject$1 = toIndexedObject$7;
	var createProperty$1 = createProperty$3;
	var setArrayLength$1 = arraySetLength;
	var wellKnownSymbol$7 = wellKnownSymbol$e;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$4;
	var nativeSlice = arraySlice$1;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$1('slice');

	var SPECIES$3 = wellKnownSymbol$7('species');
	var $Array = Array;
	var max$1 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	$$b({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject$1(this);
	    var length = lengthOfArrayLike$4(O);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray$2(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (isConstructor$1(Constructor) && (Constructor === $Array || isArray$2(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject$9(Constructor)) {
	        Constructor = Constructor[SPECIES$3];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === $Array || Constructor === undefined) {
	        return nativeSlice(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? $Array : Constructor)(max$1(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty$1(result, n, O[k]);
	    setArrayLength$1(result, n);
	    return result;
	  }
	});

	var uncurryThis$c = functionUncurryThis;

	// `thisNumberValue` abstract operation
	// https://tc39.es/ecma262/#sec-thisnumbervalue
	var thisNumberValue$1 = uncurryThis$c(1.1.valueOf);

	var toIntegerOrInfinity$4 = toIntegerOrInfinity$7;
	var toString$9 = toString$c;
	var requireObjectCoercible$6 = requireObjectCoercible$a;

	var $RangeError$1 = RangeError;
	var floor$3 = Math.floor;

	// `String.prototype.repeat` method implementation
	// https://tc39.es/ecma262/#sec-string.prototype.repeat
	var stringRepeat = function repeat(count) {
	  var str = toString$9(requireObjectCoercible$6(this));
	  var result = '';
	  var n = toIntegerOrInfinity$4(count);
	  if (n < 0 || n === Infinity) throw new $RangeError$1('Wrong number of repetitions');
	  for (;n > 0; (n = floor$3(n / 2)) && (str += str)) if (n % 2) result += str;
	  return result;
	};

	var $$a = _export;
	var uncurryThis$b = functionUncurryThis;
	var toIntegerOrInfinity$3 = toIntegerOrInfinity$7;
	var thisNumberValue = thisNumberValue$1;
	var $repeat = stringRepeat;
	var fails$e = fails$r;

	var $RangeError = RangeError;
	var $String$1 = String;
	var floor$2 = Math.floor;
	var repeat = uncurryThis$b($repeat);
	var stringSlice$6 = uncurryThis$b(''.slice);
	var nativeToFixed = uncurryThis$b(1.1.toFixed);

	var pow = function (x, n, acc) {
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};

	var log = function (x) {
	  var n = 0;
	  var x2 = x;
	  while (x2 >= 4096) {
	    n += 12;
	    x2 /= 4096;
	  }
	  while (x2 >= 2) {
	    n += 1;
	    x2 /= 2;
	  } return n;
	};

	var multiply = function (data, n, c) {
	  var index = -1;
	  var c2 = c;
	  while (++index < 6) {
	    c2 += n * data[index];
	    data[index] = c2 % 1e7;
	    c2 = floor$2(c2 / 1e7);
	  }
	};

	var divide = function (data, n) {
	  var index = 6;
	  var c = 0;
	  while (--index >= 0) {
	    c += data[index];
	    data[index] = floor$2(c / n);
	    c = (c % n) * 1e7;
	  }
	};

	var dataToString = function (data) {
	  var index = 6;
	  var s = '';
	  while (--index >= 0) {
	    if (s !== '' || index === 0 || data[index] !== 0) {
	      var t = $String$1(data[index]);
	      s = s === '' ? t : s + repeat('0', 7 - t.length) + t;
	    }
	  } return s;
	};

	var FORCED$5 = fails$e(function () {
	  return nativeToFixed(0.00008, 3) !== '0.000' ||
	    nativeToFixed(0.9, 0) !== '1' ||
	    nativeToFixed(1.255, 2) !== '1.25' ||
	    nativeToFixed(1000000000000000128.0, 0) !== '1000000000000000128';
	}) || !fails$e(function () {
	  // V8 ~ Android 4.3-
	  nativeToFixed({});
	});

	// `Number.prototype.toFixed` method
	// https://tc39.es/ecma262/#sec-number.prototype.tofixed
	$$a({ target: 'Number', proto: true, forced: FORCED$5 }, {
	  toFixed: function toFixed(fractionDigits) {
	    var number = thisNumberValue(this);
	    var fractDigits = toIntegerOrInfinity$3(fractionDigits);
	    var data = [0, 0, 0, 0, 0, 0];
	    var sign = '';
	    var result = '0';
	    var e, z, j, k;

	    // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation
	    if (fractDigits < 0 || fractDigits > 20) throw new $RangeError('Incorrect fraction digits');
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (number !== number) return 'NaN';
	    if (number <= -1e21 || number >= 1e21) return $String$1(number);
	    if (number < 0) {
	      sign = '-';
	      number = -number;
	    }
	    if (number > 1e-21) {
	      e = log(number * pow(2, 69, 1)) - 69;
	      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if (e > 0) {
	        multiply(data, 0, z);
	        j = fractDigits;
	        while (j >= 7) {
	          multiply(data, 1e7, 0);
	          j -= 7;
	        }
	        multiply(data, pow(10, j, 1), 0);
	        j = e - 1;
	        while (j >= 23) {
	          divide(data, 1 << 23);
	          j -= 23;
	        }
	        divide(data, 1 << j);
	        multiply(data, 1, 1);
	        divide(data, 2);
	        result = dataToString(data);
	      } else {
	        multiply(data, 0, z);
	        multiply(data, 1 << -e, 0);
	        result = dataToString(data) + repeat('0', fractDigits);
	      }
	    }
	    if (fractDigits > 0) {
	      k = result.length;
	      result = sign + (k <= fractDigits
	        ? '0.' + repeat('0', fractDigits - k) + result
	        : stringSlice$6(result, 0, k - fractDigits) + '.' + stringSlice$6(result, k - fractDigits));
	    } else {
	      result = sign + result;
	    } return result;
	  }
	});

	var globalThis$8 = globalThis_1;
	var fails$d = fails$r;
	var uncurryThis$a = functionUncurryThis;
	var toString$8 = toString$c;
	var trim = stringTrim.trim;
	var whitespaces$1 = whitespaces$4;

	var charAt$5 = uncurryThis$a(''.charAt);
	var $parseFloat$1 = globalThis$8.parseFloat;
	var Symbol$1 = globalThis$8.Symbol;
	var ITERATOR = Symbol$1 && Symbol$1.iterator;
	var FORCED$4 = 1 / $parseFloat$1(whitespaces$1 + '-0') !== -Infinity
	  // MS Edge 18- broken with boxed symbols
	  || (ITERATOR && !fails$d(function () { $parseFloat$1(Object(ITERATOR)); }));

	// `parseFloat` method
	// https://tc39.es/ecma262/#sec-parsefloat-string
	var numberParseFloat = FORCED$4 ? function parseFloat(string) {
	  var trimmedString = trim(toString$8(string));
	  var result = $parseFloat$1(trimmedString);
	  return result === 0 && charAt$5(trimmedString, 0) === '-' ? -0 : result;
	} : $parseFloat$1;

	var $$9 = _export;
	var $parseFloat = numberParseFloat;

	// `parseFloat` method
	// https://tc39.es/ecma262/#sec-parsefloat-string
	$$9({ global: true, forced: parseFloat !== $parseFloat }, {
	  parseFloat: $parseFloat
	});

	var anObject$7 = anObject$c;

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags$1 = function () {
	  var that = anObject$7(this);
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

	var fails$c = fails$r;
	var globalThis$7 = globalThis_1;

	// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	var $RegExp$2 = globalThis$7.RegExp;

	var UNSUPPORTED_Y$3 = fails$c(function () {
	  var re = $RegExp$2('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') !== null;
	});

	// UC Browser bug
	// https://github.com/zloirock/core-js/issues/1008
	var MISSED_STICKY$1 = UNSUPPORTED_Y$3 || fails$c(function () {
	  return !$RegExp$2('a', 'y').sticky;
	});

	var BROKEN_CARET = UNSUPPORTED_Y$3 || fails$c(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = $RegExp$2('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') !== null;
	});

	var regexpStickyHelpers = {
	  BROKEN_CARET: BROKEN_CARET,
	  MISSED_STICKY: MISSED_STICKY$1,
	  UNSUPPORTED_Y: UNSUPPORTED_Y$3
	};

	var fails$b = fails$r;
	var globalThis$6 = globalThis_1;

	// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
	var $RegExp$1 = globalThis$6.RegExp;

	var regexpUnsupportedDotAll = fails$b(function () {
	  var re = $RegExp$1('.', 's');
	  return !(re.dotAll && re.test('\n') && re.flags === 's');
	});

	var fails$a = fails$r;
	var globalThis$5 = globalThis_1;

	// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
	var $RegExp = globalThis$5.RegExp;

	var regexpUnsupportedNcg = fails$a(function () {
	  var re = $RegExp('(?<a>b)', 'g');
	  return re.exec('b').groups.a !== 'b' ||
	    'b'.replace(re, '$<a>c') !== 'bc';
	});

	/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
	/* eslint-disable regexp/no-useless-quantifier -- testing */
	var call$8 = functionCall;
	var uncurryThis$9 = functionUncurryThis;
	var toString$7 = toString$c;
	var regexpFlags = regexpFlags$1;
	var stickyHelpers$2 = regexpStickyHelpers;
	var shared = shared$4;
	var create$1 = objectCreate;
	var getInternalState = internalState.get;
	var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;

	var nativeReplace = shared('native-string-replace', String.prototype.replace);
	var nativeExec = RegExp.prototype.exec;
	var patchedExec = nativeExec;
	var charAt$4 = uncurryThis$9(''.charAt);
	var indexOf = uncurryThis$9(''.indexOf);
	var replace$2 = uncurryThis$9(''.replace);
	var stringSlice$5 = uncurryThis$9(''.slice);

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  call$8(nativeExec, re1, 'a');
	  call$8(nativeExec, re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y$2 = stickyHelpers$2.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2 || UNSUPPORTED_DOT_ALL$1 || UNSUPPORTED_NCG$1;

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
	    var state = getInternalState(re);
	    var str = toString$7(string);
	    var raw = state.raw;
	    var result, reCopy, lastIndex;

	    if (raw) {
	      raw.lastIndex = re.lastIndex;
	      result = call$8(patchedExec, raw, str);
	      re.lastIndex = raw.lastIndex;

	      if (result && state.groups) setGroups(result, state.groups);

	      return result;
	    }

	    var groups = state.groups;
	    var sticky = UNSUPPORTED_Y$2 && re.sticky;
	    var flags = call$8(regexpFlags, re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = replace$2(flags, 'y', '');
	      if (indexOf(flags, 'g') === -1) {
	        flags += 'g';
	      }

	      strCopy = stringSlice$5(str, re.lastIndex);
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

	    var match = call$8(nativeExec, sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = str;
	        match[0] = stringSlice$5(match[0], charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
	      call$8(nativeReplace, match[0], reCopy, function () {
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

	var $$8 = _export;
	var exec$1 = regexpExec$2;

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	$$8({ target: 'RegExp', proto: true, forced: /./.exec !== exec$1 }, {
	  exec: exec$1
	});

	var NATIVE_BIND = functionBindNative;

	var FunctionPrototype = Function.prototype;
	var apply$2 = FunctionPrototype.apply;
	var call$7 = FunctionPrototype.call;

	// eslint-disable-next-line es/no-function-prototype-bind, es/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call$7.bind(apply$2) : function () {
	  return call$7.apply(apply$2, arguments);
	});

	// TODO: Remove from `core-js@4` since it's moved to entry points

	var call$6 = functionCall;
	var defineBuiltIn$2 = defineBuiltIn$5;
	var regexpExec$1 = regexpExec$2;
	var fails$9 = fails$r;
	var wellKnownSymbol$6 = wellKnownSymbol$e;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;

	var SPECIES$2 = wellKnownSymbol$6('species');
	var RegExpPrototype$3 = RegExp.prototype;

	var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
	  var SYMBOL = wellKnownSymbol$6(KEY);

	  var DELEGATES_TO_SYMBOL = !fails$9(function () {
	    // String methods call symbol-named RegExp methods
	    var O = {};
	    // eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) !== 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$9(function () {
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
	      constructor[SPECIES$2] = function () { return re; };
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
	      if ($exec === regexpExec$1 || $exec === RegExpPrototype$3.exec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: call$6(nativeRegExpMethod, regexp, str, arg2) };
	        }
	        return { done: true, value: call$6(nativeMethod, str, regexp, arg2) };
	      }
	      return { done: false };
	    });

	    defineBuiltIn$2(String.prototype, KEY, methods[0]);
	    defineBuiltIn$2(RegExpPrototype$3, SYMBOL, methods[1]);
	  }

	  if (SHAM) createNonEnumerableProperty$2(RegExpPrototype$3[SYMBOL], 'sham', true);
	};

	var uncurryThis$8 = functionUncurryThis;
	var toIntegerOrInfinity$2 = toIntegerOrInfinity$7;
	var toString$6 = toString$c;
	var requireObjectCoercible$5 = requireObjectCoercible$a;

	var charAt$3 = uncurryThis$8(''.charAt);
	var charCodeAt = uncurryThis$8(''.charCodeAt);
	var stringSlice$4 = uncurryThis$8(''.slice);

	var createMethod$1 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString$6(requireObjectCoercible$5($this));
	    var position = toIntegerOrInfinity$2(pos);
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
	          ? stringSlice$4(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$1(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$1(true)
	};

	var charAt$2 = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex$3 = function (S, index, unicode) {
	  return index + (unicode ? charAt$2(S, index).length || 1 : 1);
	};

	var uncurryThis$7 = functionUncurryThis;
	var toObject$4 = toObject$7;

	var floor$1 = Math.floor;
	var charAt$1 = uncurryThis$7(''.charAt);
	var replace$1 = uncurryThis$7(''.replace);
	var stringSlice$3 = uncurryThis$7(''.slice);
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
	  return replace$1(replacement, symbols, function (match, ch) {
	    var capture;
	    switch (charAt$1(ch, 0)) {
	      case '$': return '$';
	      case '&': return matched;
	      case '`': return stringSlice$3(str, 0, position);
	      case "'": return stringSlice$3(str, tailPos);
	      case '<':
	        capture = namedCaptures[stringSlice$3(ch, 1, -1)];
	        break;
	      default: // \d\d?
	        var n = +ch;
	        if (n === 0) return match;
	        if (n > m) {
	          var f = floor$1(n / 10);
	          if (f === 0) return match;
	          if (f <= m) return captures[f - 1] === undefined ? charAt$1(ch, 1) : captures[f - 1] + charAt$1(ch, 1);
	          return match;
	        }
	        capture = captures[n - 1];
	    }
	    return capture === undefined ? '' : capture;
	  });
	};

	var globalThis$4 = globalThis_1;
	var fails$8 = fails$r;

	// babel-minify and Closure Compiler transpiles RegExp('.', 'd') -> /./d and it causes SyntaxError
	var RegExp$1 = globalThis$4.RegExp;

	var FLAGS_GETTER_IS_CORRECT = !fails$8(function () {
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

	var call$5 = functionCall;
	var hasOwn$1 = hasOwnProperty_1;
	var isPrototypeOf$1 = objectIsPrototypeOf;
	var regExpFlagsDetection = regexpFlagsDetection;
	var regExpFlagsGetterImplementation = regexpFlags$1;

	var RegExpPrototype$2 = RegExp.prototype;

	var regexpGetFlags = regExpFlagsDetection.correct ? function (it) {
	  return it.flags;
	} : function (it) {
	  return (!regExpFlagsDetection.correct && isPrototypeOf$1(RegExpPrototype$2, it) && !hasOwn$1(it, 'flags'))
	    ? call$5(regExpFlagsGetterImplementation, it)
	    : it.flags;
	};

	var call$4 = functionCall;
	var anObject$6 = anObject$c;
	var isCallable$2 = isCallable$f;
	var classof$2 = classofRaw$2;
	var regexpExec = regexpExec$2;

	var $TypeError$5 = TypeError;

	// `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (isCallable$2(exec)) {
	    var result = call$4(exec, R, S);
	    if (result !== null) anObject$6(result);
	    return result;
	  }
	  if (classof$2(R) === 'RegExp') return call$4(regexpExec, R, S);
	  throw new $TypeError$5('RegExp#exec called on incompatible receiver');
	};

	var apply$1 = functionApply;
	var call$3 = functionCall;
	var uncurryThis$6 = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic$3 = fixRegexpWellKnownSymbolLogic;
	var fails$7 = fails$r;
	var anObject$5 = anObject$c;
	var isCallable$1 = isCallable$f;
	var isObject$8 = isObject$g;
	var toIntegerOrInfinity$1 = toIntegerOrInfinity$7;
	var toLength$2 = toLength$4;
	var toString$5 = toString$c;
	var requireObjectCoercible$4 = requireObjectCoercible$a;
	var advanceStringIndex$2 = advanceStringIndex$3;
	var getMethod$3 = getMethod$5;
	var getSubstitution = getSubstitution$1;
	var getRegExpFlags$4 = regexpGetFlags;
	var regExpExec$3 = regexpExecAbstract;
	var wellKnownSymbol$5 = wellKnownSymbol$e;

	var REPLACE = wellKnownSymbol$5('replace');
	var max = Math.max;
	var min$2 = Math.min;
	var concat = uncurryThis$6([].concat);
	var push$2 = uncurryThis$6([].push);
	var stringIndexOf$3 = uncurryThis$6(''.indexOf);
	var stringSlice$2 = uncurryThis$6(''.slice);

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

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$7(function () {
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
	fixRegExpWellKnownSymbolLogic$3('replace', function (_, nativeReplace, maybeCallNative) {
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

	  return [
	    // `String.prototype.replace` method
	    // https://tc39.es/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible$4(this);
	      var replacer = isObject$8(searchValue) ? getMethod$3(searchValue, REPLACE) : undefined;
	      return replacer
	        ? call$3(replacer, searchValue, O, replaceValue)
	        : call$3(nativeReplace, toString$5(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
	    function (string, replaceValue) {
	      var rx = anObject$5(this);
	      var S = toString$5(string);

	      var functionalReplace = isCallable$1(replaceValue);
	      if (!functionalReplace) replaceValue = toString$5(replaceValue);
	      var flags = toString$5(getRegExpFlags$4(rx));

	      if (
	        typeof replaceValue == 'string' &&
	        !~stringIndexOf$3(replaceValue, UNSAFE_SUBSTITUTE) &&
	        !~stringIndexOf$3(replaceValue, '$<') &&
	        !~stringIndexOf$3(flags, 'y')
	      ) {
	        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
	        if (res.done) return res.value;
	      }

	      var global = !!~stringIndexOf$3(flags, 'g');
	      var fullUnicode;
	      if (global) {
	        fullUnicode = !!~stringIndexOf$3(flags, 'u') || !!~stringIndexOf$3(flags, 'v');
	        rx.lastIndex = 0;
	      }

	      var results = [];
	      var result;
	      while (true) {
	        result = regExpExec$3(rx, S);
	        if (result === null) break;

	        push$2(results, result);
	        if (!global) break;

	        var matchStr = toString$5(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex$2(S, toLength$2(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = toString$5(result[0]);
	        var position = max(min$2(toIntegerOrInfinity$1(result.index), S.length), 0);
	        var captures = [];
	        var replacement;
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) push$2(captures, maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = concat([matched], captures, position, S);
	          if (namedCaptures !== undefined) push$2(replacerArgs, namedCaptures);
	          replacement = toString$5(apply$1(replaceValue, undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += stringSlice$2(S, nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }

	      return accumulatedResult + stringSlice$2(S, nextSourcePosition);
	    }
	  ];
	}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

	// `SameValue` abstract operation
	// https://tc39.es/ecma262/#sec-samevalue
	// eslint-disable-next-line es/no-object-is -- safe
	var sameValue$1 = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return x === y ? x !== 0 || 1 / x === 1 / y : x !== x && y !== y;
	};

	var call$2 = functionCall;
	var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
	var anObject$4 = anObject$c;
	var isObject$7 = isObject$g;
	var requireObjectCoercible$3 = requireObjectCoercible$a;
	var sameValue = sameValue$1;
	var toString$4 = toString$c;
	var getMethod$2 = getMethod$5;
	var regExpExec$2 = regexpExecAbstract;

	// @@search logic
	fixRegExpWellKnownSymbolLogic$2('search', function (SEARCH, nativeSearch, maybeCallNative) {
	  return [
	    // `String.prototype.search` method
	    // https://tc39.es/ecma262/#sec-string.prototype.search
	    function search(regexp) {
	      var O = requireObjectCoercible$3(this);
	      var searcher = isObject$7(regexp) ? getMethod$2(regexp, SEARCH) : undefined;
	      return searcher ? call$2(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString$4(O));
	    },
	    // `RegExp.prototype[@@search]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
	    function (string) {
	      var rx = anObject$4(this);
	      var S = toString$4(string);
	      var res = maybeCallNative(nativeSearch, rx, S);

	      if (res.done) return res.value;

	      var previousLastIndex = rx.lastIndex;
	      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
	      var result = regExpExec$2(rx, S);
	      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
	      return result === null ? -1 : result.index;
	    }
	  ];
	});

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

	var globalThis$3 = globalThis_1;
	var DOMIterables = domIterables;
	var DOMTokenListPrototype = domTokenListPrototype;
	var forEach = arrayForEach;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;

	var handlePrototype = function (CollectionPrototype) {
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
	    createNonEnumerableProperty$1(CollectionPrototype, 'forEach', forEach);
	  } catch (error) {
	    CollectionPrototype.forEach = forEach;
	  }
	};

	for (var COLLECTION_NAME in DOMIterables) {
	  if (DOMIterables[COLLECTION_NAME]) {
	    handlePrototype(globalThis$3[COLLECTION_NAME] && globalThis$3[COLLECTION_NAME].prototype);
	  }
	}

	handlePrototype(DOMTokenListPrototype);

	var tryToString$1 = tryToString$3;

	var $TypeError$4 = TypeError;

	var deletePropertyOrThrow$1 = function (O, P) {
	  if (!delete O[P]) throw new $TypeError$4('Cannot delete property ' + tryToString$1(P) + ' of ' + tryToString$1(O));
	};

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

	var userAgent$2 = environmentUserAgent;

	var firefox = userAgent$2.match(/firefox\/(\d+)/i);

	var environmentFfVersion = !!firefox && +firefox[1];

	var UA = environmentUserAgent;

	var environmentIsIeOrEdge = /MSIE|Trident/.test(UA);

	var userAgent$1 = environmentUserAgent;

	var webkit = userAgent$1.match(/AppleWebKit\/(\d+)\./);

	var environmentWebkitVersion = !!webkit && +webkit[1];

	var $$7 = _export;
	var uncurryThis$5 = functionUncurryThis;
	var aCallable$2 = aCallable$5;
	var toObject$3 = toObject$7;
	var lengthOfArrayLike$3 = lengthOfArrayLike$7;
	var deletePropertyOrThrow = deletePropertyOrThrow$1;
	var toString$3 = toString$c;
	var fails$6 = fails$r;
	var internalSort = arraySort;
	var arrayMethodIsStrict$2 = arrayMethodIsStrict$6;
	var FF = environmentFfVersion;
	var IE_OR_EDGE = environmentIsIeOrEdge;
	var V8 = environmentV8Version;
	var WEBKIT = environmentWebkitVersion;

	var test$1 = [];
	var nativeSort = uncurryThis$5(test$1.sort);
	var push$1 = uncurryThis$5(test$1.push);

	// IE8-
	var FAILS_ON_UNDEFINED = fails$6(function () {
	  test$1.sort(undefined);
	});
	// V8 bug
	var FAILS_ON_NULL = fails$6(function () {
	  test$1.sort(null);
	});
	// Old WebKit
	var STRICT_METHOD$1 = arrayMethodIsStrict$2('sort');

	var STABLE_SORT = !fails$6(function () {
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
	      test$1.push({ k: chr + index, v: value });
	    }
	  }

	  test$1.sort(function (a, b) { return b.v - a.v; });

	  for (index = 0; index < test$1.length; index++) {
	    chr = test$1[index].k.charAt(0);
	    if (result.charAt(result.length - 1) !== chr) result += chr;
	  }

	  return result !== 'DGBEFHACIJK';
	});

	var FORCED$3 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$1 || !STABLE_SORT;

	var getSortCompare = function (comparefn) {
	  return function (x, y) {
	    if (y === undefined) return -1;
	    if (x === undefined) return 1;
	    if (comparefn !== undefined) return +comparefn(x, y) || 0;
	    var xString = toString$3(x);
	    var yString = toString$3(y);
	    return xString === yString ? 0 : xString > yString ? 1 : -1;
	  };
	};

	// `Array.prototype.sort` method
	// https://tc39.es/ecma262/#sec-array.prototype.sort
	$$7({ target: 'Array', proto: true, forced: FORCED$3 }, {
	  sort: function sort(comparefn) {
	    if (comparefn !== undefined) aCallable$2(comparefn);

	    var array = toObject$3(this);

	    if (STABLE_SORT) return comparefn === undefined ? nativeSort(array) : nativeSort(array, comparefn);

	    var items = [];
	    var arrayLength = lengthOfArrayLike$3(array);
	    var itemsLength, index;

	    for (index = 0; index < arrayLength; index++) {
	      if (index in array) push$1(items, array[index]);
	    }

	    internalSort(items, getSortCompare(comparefn));

	    itemsLength = lengthOfArrayLike$3(items);
	    index = 0;

	    while (index < itemsLength) array[index] = items[index++];
	    while (index < arrayLength) deletePropertyOrThrow(array, index++);

	    return array;
	  }
	});

	var call$1 = functionCall;
	var uncurryThis$4 = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
	var anObject$3 = anObject$c;
	var isObject$6 = isObject$g;
	var toLength$1 = toLength$4;
	var toString$2 = toString$c;
	var requireObjectCoercible$2 = requireObjectCoercible$a;
	var getMethod$1 = getMethod$5;
	var advanceStringIndex$1 = advanceStringIndex$3;
	var getRegExpFlags$3 = regexpGetFlags;
	var regExpExec$1 = regexpExecAbstract;

	var stringIndexOf$2 = uncurryThis$4(''.indexOf);

	// @@match logic
	fixRegExpWellKnownSymbolLogic$1('match', function (MATCH, nativeMatch, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.es/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = requireObjectCoercible$2(this);
	      var matcher = isObject$6(regexp) ? getMethod$1(regexp, MATCH) : undefined;
	      return matcher ? call$1(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString$2(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
	    function (string) {
	      var rx = anObject$3(this);
	      var S = toString$2(string);
	      var res = maybeCallNative(nativeMatch, rx, S);

	      if (res.done) return res.value;

	      var flags = toString$2(getRegExpFlags$3(rx));

	      if (!~stringIndexOf$2(flags, 'g')) return regExpExec$1(rx, S);

	      var fullUnicode = !!~stringIndexOf$2(flags, 'u') || !!~stringIndexOf$2(flags, 'v');
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = regExpExec$1(rx, S)) !== null) {
	        var matchStr = toString$2(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$1(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	function videocdn(component, _object) {
	  var network = new Lampa.Reguest();
	  var extract = {};
	  var results = [];
	  var object = _object;
	  var get_links_wait = false;
	  var filter_items = {};
	  var choice = {
	    season: 0,
	    voice: 0,
	    voice_name: ''
	  };
	  this.search = function (_object, data) {
	    object = _object;
	    get_links_wait = true;
	    var url = component.proxy('videocdn') + 'https://videocdn.tv/api/';
	    var itm = data[0];
	    if (!itm.iframe_src) return component.doesNotAnswer();
	    var type = itm.iframe_src.split('/').slice(-2)[0];
	    if (type == 'movie') type = 'movies';
	    url += type;
	    url = Lampa.Utils.addUrlComponent(url, 'api_token=3i40G5TSECmLF77oAqnEgbx61ZWaOYaE');
	    url = Lampa.Utils.addUrlComponent(url, 'query=' + encodeURIComponent(itm.imdb_id ? itm.imdb_id : itm.title));
	    url = Lampa.Utils.addUrlComponent(url, 'field=' + encodeURIComponent(itm.imdb_id ? 'imdb_id' : 'title'));
	    network.silent(url, function (found) {
	      results = found.data.filter(function (elem) {
	        return elem.id == itm.id;
	      });
	      if (!results.length) component.doesNotAnswer();else {
	        try {
	          success(results);
	        } catch (e) {
	          component.doesNotAnswer();
	        }
	      }
	      component.loading(false);
	    }, function (a, c) {
	      component.doesNotAnswer();
	    });
	  };
	  this.extendChoice = function (saved) {
	    Lampa.Arrays.extend(choice, saved, true);
	  };
	  this.reset = function () {
	    component.reset();
	    choice = {
	      season: 0,
	      voice: 0,
	      voice_name: ''
	    };
	    filter();
	    append(filtred());
	  };
	  this.filter = function (type, a, b) {
	    choice[a.stype] = b.index;
	    if (a.stype == 'voice') {
	      choice.voice_name = filter_items.voice[b.index];
	    }
	    component.reset();
	    filter();
	    append(filtred());
	  };
	  this.destroy = function () {
	    network.clear();
	    results = null;
	  };
	  function success(json) {
	    results = json;
	    extractData(json);
	    filter();
	    append(filtred());
	  }
	  function extractItems(str, max_quality) {
	    try {
	      var items = str.split(',').map(function (item) {
	        return {
	          quality: parseInt(item.match(/\[(\d+)p\]/)[1]),
	          file: 'http:' + item.replace(/\[\d+p\]/, '').split(' or ')[0]
	        };
	      }).filter(function (item) {
	        return item.quality <= max_quality;
	      });
	      items.sort(function (a, b) {
	        return b.quality - a.quality;
	      });
	      return items;
	    } catch (e) {}
	    return [];
	  }
	  function extractData(results) {
	    network.timeout(20000);
	    var movie = results.slice(0, 1)[0];
	    extract = {};
	    if (movie) {
	      var src = movie.iframe_src;
	      var meta = $('head meta[name="referrer"]');
	      var referrer = meta.attr('content') || 'never';
	      meta.attr('content', 'unsafe-url');
	      network.silent('https:' + src, function (raw) {
	        meta.attr('content', referrer);
	        get_links_wait = false;
	        component.render().find('.online-prestige__scan-file').remove();
	        var math = raw.replace(/\n/g, '').match(/id="files" value="(.*?)"/);
	        if (!math) math = raw.replace(/\n/g, '').match(/id="files" value='(.*?)'/);
	        if (math) {
	          var json = Lampa.Arrays.decodeJson(math[1].replace(/&quot;/g, '"'), {});
	          var text = document.createElement("textarea");
	          var _loop = function _loop(i) {
	            var _movie$media;
	            if (0 === i - 0) {
	              return 1; // continue
	            }
	            text.innerHTML = json[i];
	            var max_quality = (_movie$media = movie.media) === null || _movie$media === void 0 || (_movie$media = _movie$media.filter(function (obj) {
	              return obj.translation_id === i - 0;
	            })[0]) === null || _movie$media === void 0 ? void 0 : _movie$media.max_quality;
	            if (!max_quality) {
	              var _movie$translations;
	              max_quality = (_movie$translations = movie.translations) === null || _movie$translations === void 0 || (_movie$translations = _movie$translations.filter(function (obj) {
	                return obj.id === i - 0;
	              })[0]) === null || _movie$translations === void 0 ? void 0 : _movie$translations.max_quality;
	            }
	            extract[i] = {
	              json: Lampa.Arrays.decodeJson(text.value, {}),
	              items: extractItems(json[i], max_quality)
	            };
	            for (var a in extract[i].json) {
	              var elem = extract[i].json[a];
	              if (elem.folder) {
	                for (var f in elem.folder) {
	                  var folder = elem.folder[f];
	                  folder.items = extractItems(folder.file, max_quality);
	                }
	              } else elem.items = extractItems(elem.file, max_quality);
	            }
	          };
	          for (var i in json) {
	            if (_loop(i)) continue;
	          }
	        }
	      }, function () {
	        meta.attr('content', referrer);
	        get_links_wait = false;
	        component.render().find('.online-prestige__scan-file').remove();
	      }, false, {
	        dataType: 'text'
	      });
	    }
	  }
	  function getFile(element) {
	    var translat = extract[element.translation];
	    var id = element.season + '_' + element.episode;
	    var file = '';
	    var items = [];
	    var quality = false;
	    if (translat) {
	      if (element.season) {
	        for (var i in translat.json) {
	          var elem = translat.json[i];
	          if (elem.folder) {
	            for (var f in elem.folder) {
	              var folder = elem.folder[f];
	              if (folder.id == id) {
	                items = folder.items;
	                break;
	              }
	            }
	          } else if (elem.id == id) {
	            items = elem.items;
	            break;
	          }
	        }
	      } else {
	        items = translat.items;
	      }
	    }
	    if (items && items.length) {
	      quality = {};
	      var mass = [720, 480, 360];
	      if (Lampa.Account.hasPremium()) Lampa.Arrays.insert(mass, 0, 1080);
	      mass.forEach(function (n) {
	        var exes = items.find(function (a) {
	          return a.quality == n;
	        });
	        if (exes) {
	          if (!file) file = exes.file;
	          quality[n + 'p'] = exes.file;
	        }
	      });
	      var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
	      if (quality[preferably]) file = quality[preferably];
	    }
	    return {
	      file: file,
	      quality: quality
	    };
	  }
	  function filter() {
	    filter_items = {
	      season: [],
	      voice: [],
	      voice_info: []
	    };
	    results.slice(0, 1).forEach(function (movie) {
	      var seasons = movie.season_count || object.movie.number_of_seasons;
	      if (seasons) {
	        var s = seasons;
	        while (s--) {
	          filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + (seasons - s));
	        }
	      }
	      if (filter_items.season.length) {
	        movie.episodes.forEach(function (episode) {
	          if (episode.season_num == choice.season + 1) {
	            episode.media.forEach(function (media) {
	              if (!filter_items.voice_info.find(function (v) {
	                return v.id == media.translation.id;
	              })) {
	                filter_items.voice.push(media.translation.shorter_title || media.translation.short_title);
	                filter_items.voice_info.push({
	                  id: media.translation.id
	                });
	              }
	            });
	          }
	        });
	      }
	    });
	    if (choice.voice_name) {
	      var inx = filter_items.voice.map(function (v) {
	        return v.toLowerCase();
	      }).indexOf(choice.voice_name.toLowerCase());
	      if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
	        choice.voice = inx;
	      }
	    }
	    component.filter(filter_items, choice);
	  }
	  function filtred() {
	    var filtred = [];
	    if (object.movie.name) {
	      results.slice(0, 1).forEach(function (movie) {
	        movie.episodes.forEach(function (episode) {
	          if (episode.season_num == choice.season + 1) {
	            var temp = episode.media.map(function (m) {
	              return m;
	            });
	            var unique = [];
	            temp.sort(function (a, b) {
	              return b.max_quality - a.max_quality;
	            });
	            temp.forEach(function (m) {
	              if (!unique.find(function (a) {
	                return a.translation.id == m.translation.id;
	              })) {
	                unique.push(m);
	              }
	            });
	            episode.media.forEach(function (media) {
	              if (media.translation.id == filter_items.voice_info[choice.voice].id && unique.indexOf(media) !== -1) {
	                filtred.push({
	                  episode: parseInt(episode.num),
	                  season: episode.season_num,
	                  title: episode.ru_title,
	                  quality: (media.source_quality && window.innerWidth > 480 ? media.source_quality.toUpperCase() + ' - ' : '') + media.max_quality + 'p',
	                  translation: media.translation_id,
	                  info: filter_items.voice[choice.voice],
	                  voice_name: filter_items.voice[choice.voice]
	                });
	              }
	            });
	          }
	        });
	      });
	    } else {
	      results.slice(0, 1).forEach(function (movie) {
	        movie.media.forEach(function (element) {
	          filtred.push({
	            title: element.translation.shorter_title || element.translation.short_title,
	            quality: (element.source_quality && window.innerWidth > 480 ? element.source_quality.toUpperCase() + ' - ' : '') + element.max_quality + 'p',
	            translation: element.translation_id,
	            voice_name: element.translation.shorter_title || element.translation.short_title
	          });
	        });
	      });
	    }
	    return filtred;
	  }
	  function toPlayElement(element) {
	    var extra = getFile(element, element.quality);
	    var play = {
	      title: element.title,
	      url: extra.file,
	      quality: extra.quality,
	      timeline: element.timeline,
	      callback: element.mark
	    };
	    return play;
	  }
	  function append(items) {
	    component.reset();
	    component.draw(items, {
	      onRender: function onRender(item, html) {
	        if (get_links_wait) html.find('.online-prestige__body').append($('<div class="online-prestige__scan-file"><div class="broadcast__scan"><div></div></div></div>'));
	      },
	      onEnter: function onEnter(item, html) {
	        var extra = getFile(item, item.quality);
	        if (extra.file) {
	          var playlist = [];
	          var first = toPlayElement(item);
	          if (item.season) {
	            items.forEach(function (elem) {
	              playlist.push(toPlayElement(elem));
	            });
	          } else {
	            playlist.push(first);
	          }
	          if (playlist.length > 1) first.playlist = playlist;
	          Lampa.Player.play(first);
	          Lampa.Player.playlist(playlist);
	          item.mark();
	        } else Lampa.Noty.show(Lampa.Lang.translate(get_links_wait ? 'online_waitlink' : 'online_nolink'));
	      },
	      onContextMenu: function onContextMenu(item, html, data, call) {
	        call(getFile(item, item.quality));
	      }
	    });
	  }
	}

	var $TypeError$3 = TypeError;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

	var doesNotExceedSafeInteger$1 = function (it) {
	  if (it > MAX_SAFE_INTEGER) throw new $TypeError$3('Maximum allowed index exceeded');
	  return it;
	};

	var $$6 = _export;
	var fails$5 = fails$r;
	var isArray$1 = isArray$5;
	var isObject$5 = isObject$g;
	var toObject$2 = toObject$7;
	var lengthOfArrayLike$2 = lengthOfArrayLike$7;
	var doesNotExceedSafeInteger = doesNotExceedSafeInteger$1;
	var createProperty = createProperty$3;
	var setArrayLength = arraySetLength;
	var arraySpeciesCreate = arraySpeciesCreate$2;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$4;
	var wellKnownSymbol$4 = wellKnownSymbol$e;
	var V8_VERSION = environmentV8Version;

	var IS_CONCAT_SPREADABLE = wellKnownSymbol$4('isConcatSpreadable');

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$5(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var isConcatSpreadable = function (O) {
	  if (!isObject$5(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray$1(O);
	};

	var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport('concat');

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	$$6({ target: 'Array', proto: true, arity: 1, forced: FORCED$2 }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject$2(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = lengthOfArrayLike$2(E);
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

	var aCallable$1 = aCallable$5;
	var toObject$1 = toObject$7;
	var IndexedObject = indexedObject;
	var lengthOfArrayLike$1 = lengthOfArrayLike$7;

	var $TypeError$2 = TypeError;

	var REDUCE_EMPTY = 'Reduce of empty array with no initial value';

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    var O = toObject$1(that);
	    var self = IndexedObject(O);
	    var length = lengthOfArrayLike$1(O);
	    aCallable$1(callbackfn);
	    if (length === 0 && argumentsLength < 2) throw new $TypeError$2(REDUCE_EMPTY);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw new $TypeError$2(REDUCE_EMPTY);
	      }
	    }
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduce
	  left: createMethod(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
	  right: createMethod(true)
	};

	/* global Bun, Deno -- detection */
	var globalThis$2 = globalThis_1;
	var userAgent = environmentUserAgent;
	var classof$1 = classofRaw$2;

	var userAgentStartsWith = function (string) {
	  return userAgent.slice(0, string.length) === string;
	};

	var environment = (function () {
	  if (userAgentStartsWith('Bun/')) return 'BUN';
	  if (userAgentStartsWith('Cloudflare-Workers')) return 'CLOUDFLARE';
	  if (userAgentStartsWith('Deno/')) return 'DENO';
	  if (userAgentStartsWith('Node.js/')) return 'NODE';
	  if (globalThis$2.Bun && typeof Bun.version == 'string') return 'BUN';
	  if (globalThis$2.Deno && typeof Deno.version == 'object') return 'DENO';
	  if (classof$1(globalThis$2.process) === 'process') return 'NODE';
	  if (globalThis$2.window && globalThis$2.document) return 'BROWSER';
	  return 'REST';
	})();

	var ENVIRONMENT = environment;

	var environmentIsNode = ENVIRONMENT === 'NODE';

	var $$5 = _export;
	var $reduce = arrayReduce.left;
	var arrayMethodIsStrict$1 = arrayMethodIsStrict$6;
	var CHROME_VERSION = environmentV8Version;
	var IS_NODE = environmentIsNode;

	// Chrome 80-82 has a critical bug
	// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
	var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;
	var FORCED$1 = CHROME_BUG || !arrayMethodIsStrict$1('reduce');

	// `Array.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-array.prototype.reduce
	$$5({ target: 'Array', proto: true, forced: FORCED$1 }, {
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    var length = arguments.length;
	    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
	  }
	});

	var uncurryThis$3 = functionUncurryThis;
	var aCallable = aCallable$5;

	var functionUncurryThisAccessor = function (object, key, method) {
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    return uncurryThis$3(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
	  } catch (error) { /* empty */ }
	};

	var isObject$4 = isObject$g;

	var isPossiblePrototype$1 = function (argument) {
	  return isObject$4(argument) || argument === null;
	};

	var isPossiblePrototype = isPossiblePrototype$1;

	var $String = String;
	var $TypeError$1 = TypeError;

	var aPossiblePrototype$1 = function (argument) {
	  if (isPossiblePrototype(argument)) return argument;
	  throw new $TypeError$1("Can't set " + $String(argument) + ' as a prototype');
	};

	/* eslint-disable no-proto -- safe */
	var uncurryThisAccessor = functionUncurryThisAccessor;
	var isObject$3 = isObject$g;
	var requireObjectCoercible$1 = requireObjectCoercible$a;
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
	    requireObjectCoercible$1(O);
	    aPossiblePrototype(proto);
	    if (!isObject$3(O)) return O;
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var isCallable = isCallable$f;
	var isObject$2 = isObject$g;
	var setPrototypeOf = objectSetPrototypeOf;

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired$1 = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    setPrototypeOf &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    isCallable(NewTarget = dummy.constructor) &&
	    NewTarget !== Wrapper &&
	    isObject$2(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) setPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};

	var isObject$1 = isObject$g;
	var classof = classofRaw$2;
	var wellKnownSymbol$3 = wellKnownSymbol$e;

	var MATCH$1 = wellKnownSymbol$3('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject$1(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof(it) === 'RegExp');
	};

	var defineProperty$1 = objectDefineProperty.f;

	var proxyAccessor$1 = function (Target, Source, key) {
	  key in Target || defineProperty$1(Target, key, {
	    configurable: true,
	    get: function () { return Source[key]; },
	    set: function (it) { Source[key] = it; }
	  });
	};

	var makeBuiltIn = makeBuiltIn$3.exports;
	var defineProperty = objectDefineProperty;

	var defineBuiltInAccessor$1 = function (target, name, descriptor) {
	  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
	  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
	  return defineProperty.f(target, name, descriptor);
	};

	var getBuiltIn = getBuiltIn$5;
	var defineBuiltInAccessor = defineBuiltInAccessor$1;
	var wellKnownSymbol$2 = wellKnownSymbol$e;
	var DESCRIPTORS$1 = descriptors;

	var SPECIES$1 = wellKnownSymbol$2('species');

	var setSpecies$1 = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);

	  if (DESCRIPTORS$1 && Constructor && !Constructor[SPECIES$1]) {
	    defineBuiltInAccessor(Constructor, SPECIES$1, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var DESCRIPTORS = descriptors;
	var globalThis$1 = globalThis_1;
	var uncurryThis$2 = functionUncurryThis;
	var isForced = isForced_1;
	var inheritIfRequired = inheritIfRequired$1;
	var createNonEnumerableProperty = createNonEnumerableProperty$5;
	var create = objectCreate;
	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var isPrototypeOf = objectIsPrototypeOf;
	var isRegExp = isRegexp;
	var toString$1 = toString$c;
	var getRegExpFlags$2 = regexpGetFlags;
	var stickyHelpers$1 = regexpStickyHelpers;
	var proxyAccessor = proxyAccessor$1;
	var defineBuiltIn$1 = defineBuiltIn$5;
	var fails$4 = fails$r;
	var hasOwn = hasOwnProperty_1;
	var enforceInternalState = internalState.enforce;
	var setSpecies = setSpecies$1;
	var wellKnownSymbol$1 = wellKnownSymbol$e;
	var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG = regexpUnsupportedNcg;

	var MATCH = wellKnownSymbol$1('match');
	var NativeRegExp = globalThis$1.RegExp;
	var RegExpPrototype$1 = NativeRegExp.prototype;
	var SyntaxError = globalThis$1.SyntaxError;
	var exec = uncurryThis$2(RegExpPrototype$1.exec);
	var charAt = uncurryThis$2(''.charAt);
	var replace = uncurryThis$2(''.replace);
	var stringIndexOf$1 = uncurryThis$2(''.indexOf);
	var stringSlice$1 = uncurryThis$2(''.slice);
	// TODO: Use only proper RegExpIdentifierName
	var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
	var re1 = /a/g;
	var re2 = /a/g;

	// "new" should create a new object, old webkit bug
	var CORRECT_NEW = new NativeRegExp(re1) !== re1;

	var MISSED_STICKY = stickyHelpers$1.MISSED_STICKY;
	var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y;

	var BASE_FORCED = DESCRIPTORS &&
	  (!CORRECT_NEW || MISSED_STICKY || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails$4(function () {
	    re2[MATCH] = false;
	    // RegExp constructor can alter flags and IsRegExp works correct with @@match
	    // eslint-disable-next-line sonarjs/inconsistent-function-call -- required for testing
	    return NativeRegExp(re1) !== re1 || NativeRegExp(re2) === re2 || String(NativeRegExp(re1, 'i')) !== '/a/i';
	  }));

	var handleDotAll = function (string) {
	  var length = string.length;
	  var index = 0;
	  var result = '';
	  var brackets = false;
	  var chr;
	  for (; index < length; index++) {
	    chr = charAt(string, index);
	    if (chr === '\\') {
	      result += chr + charAt(string, ++index);
	      continue;
	    }
	    if (!brackets && chr === '.') {
	      result += '[\\s\\S]';
	    } else {
	      if (chr === '[') {
	        brackets = true;
	      } else if (chr === ']') {
	        brackets = false;
	      } result += chr;
	    }
	  } return result;
	};

	var handleNCG = function (string) {
	  var length = string.length;
	  var index = 0;
	  var result = '';
	  var named = [];
	  var names = create(null);
	  var brackets = false;
	  var ncg = false;
	  var groupid = 0;
	  var groupname = '';
	  var chr;
	  for (; index < length; index++) {
	    chr = charAt(string, index);
	    if (chr === '\\') {
	      chr += charAt(string, ++index);
	      // use `\x5c` for escaped backslash to avoid corruption by `\k<name>` to `\N` replacement below
	      if (!ncg && charAt(chr, 1) === '\\') {
	        result += '\\x5c';
	        continue;
	      }
	    } else if (chr === ']') {
	      brackets = false;
	    } else if (!brackets) switch (true) {
	      case chr === '[':
	        brackets = true;
	        break;
	      case chr === '(':
	        result += chr;
	        if (exec(IS_NCG, stringSlice$1(string, index + 1))) {
	          index += 2;
	          ncg = true;
	          groupid++;
	        } else if (charAt(string, index + 1) !== '?') {
	          groupid++;
	        }
	        continue;
	      case chr === '>' && ncg:
	        if (groupname === '' || hasOwn(names, groupname)) {
	          throw new SyntaxError('Invalid capture group name');
	        }
	        names[groupname] = true;
	        named[named.length] = [groupname, groupid];
	        ncg = false;
	        groupname = '';
	        continue;
	    }
	    if (ncg) groupname += chr;
	    else result += chr;
	  }
	  // convert `\k<name>` backreferences to numbered backreferences
	  for (var ni = 0; ni < named.length; ni++) {
	    var backref = '\\k<' + named[ni][0] + '>';
	    var numRef = '\\' + named[ni][1];
	    while (stringIndexOf$1(result, backref) > -1) {
	      result = replace(result, backref, numRef);
	    }
	  } return [result, named];
	};

	// `RegExp` constructor
	// https://tc39.es/ecma262/#sec-regexp-constructor
	if (isForced('RegExp', BASE_FORCED)) {
	  var RegExpWrapper = function RegExp(pattern, flags) {
	    var thisIsRegExp = isPrototypeOf(RegExpPrototype$1, this);
	    var patternIsRegExp = isRegExp(pattern);
	    var flagsAreUndefined = flags === undefined;
	    var groups = [];
	    var rawPattern = pattern;
	    var rawFlags, dotAll, sticky, handled, result, state;

	    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
	      return pattern;
	    }

	    if (patternIsRegExp || isPrototypeOf(RegExpPrototype$1, pattern)) {
	      pattern = pattern.source;
	      if (flagsAreUndefined) flags = getRegExpFlags$2(rawPattern);
	    }

	    pattern = pattern === undefined ? '' : toString$1(pattern);
	    flags = flags === undefined ? '' : toString$1(flags);
	    rawPattern = pattern;

	    if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
	      dotAll = !!flags && stringIndexOf$1(flags, 's') > -1;
	      if (dotAll) flags = replace(flags, /s/g, '');
	    }

	    rawFlags = flags;

	    if (MISSED_STICKY && 'sticky' in re1) {
	      sticky = !!flags && stringIndexOf$1(flags, 'y') > -1;
	      if (sticky && UNSUPPORTED_Y$1) flags = replace(flags, /y/g, '');
	    }

	    if (UNSUPPORTED_NCG) {
	      handled = handleNCG(pattern);
	      pattern = handled[0];
	      groups = handled[1];
	    }

	    result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$1, RegExpWrapper);

	    if (dotAll || sticky || groups.length) {
	      state = enforceInternalState(result);
	      if (dotAll) {
	        state.dotAll = true;
	        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
	      }
	      if (sticky) state.sticky = true;
	      if (groups.length) state.groups = groups;
	    }

	    if (pattern !== rawPattern) try {
	      // fails in old engines, but we have no alternatives for unsupported regex syntax
	      createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
	    } catch (error) { /* empty */ }

	    return result;
	  };

	  for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
	    proxyAccessor(RegExpWrapper, NativeRegExp, keys[index++]);
	  }

	  RegExpPrototype$1.constructor = RegExpWrapper;
	  RegExpWrapper.prototype = RegExpPrototype$1;
	  defineBuiltIn$1(globalThis$1, 'RegExp', RegExpWrapper, { constructor: true });
	}

	// https://tc39.es/ecma262/#sec-get-regexp-@@species
	setSpecies('RegExp');

	var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
	var defineBuiltIn = defineBuiltIn$5;
	var anObject$2 = anObject$c;
	var $toString = toString$c;
	var fails$3 = fails$r;
	var getRegExpFlags$1 = regexpGetFlags;

	var TO_STRING = 'toString';
	var RegExpPrototype = RegExp.prototype;
	var nativeToString = RegExpPrototype[TO_STRING];

	var NOT_GENERIC = fails$3(function () { return nativeToString.call({ source: 'a', flags: 'b' }) !== '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = PROPER_FUNCTION_NAME$1 && nativeToString.name !== TO_STRING;

	// `RegExp.prototype.toString` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  defineBuiltIn(RegExpPrototype, TO_STRING, function toString() {
	    var R = anObject$2(this);
	    var pattern = $toString(R.source);
	    var flags = $toString(getRegExpFlags$1(R));
	    return '/' + pattern + '/' + flags;
	  }, { unsafe: true });
	}

	var isConstructor = isConstructor$3;
	var tryToString = tryToString$3;

	var $TypeError = TypeError;

	// `Assert: IsConstructor(argument) is true`
	var aConstructor$1 = function (argument) {
	  if (isConstructor(argument)) return argument;
	  throw new $TypeError(tryToString(argument) + ' is not a constructor');
	};

	var anObject$1 = anObject$c;
	var aConstructor = aConstructor$1;
	var isNullOrUndefined = isNullOrUndefined$3;
	var wellKnownSymbol = wellKnownSymbol$e;

	var SPECIES = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor$1 = function (O, defaultConstructor) {
	  var C = anObject$1(O).constructor;
	  var S;
	  return C === undefined || isNullOrUndefined(S = anObject$1(C)[SPECIES]) ? defaultConstructor : aConstructor(S);
	};

	var call = functionCall;
	var uncurryThis$1 = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
	var anObject = anObject$c;
	var isObject = isObject$g;
	var requireObjectCoercible = requireObjectCoercible$a;
	var speciesConstructor = speciesConstructor$1;
	var advanceStringIndex = advanceStringIndex$3;
	var toLength = toLength$4;
	var toString = toString$c;
	var getMethod = getMethod$5;
	var getRegExpFlags = regexpGetFlags;
	var regExpExec = regexpExecAbstract;
	var stickyHelpers = regexpStickyHelpers;
	var fails$2 = fails$r;

	var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
	var MAX_UINT32 = 0xFFFFFFFF;
	var min$1 = Math.min;
	var push = uncurryThis$1([].push);
	var stringSlice = uncurryThis$1(''.slice);
	var stringIndexOf = uncurryThis$1(''.indexOf);

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$2(function () {
	  // eslint-disable-next-line regexp/no-empty-group -- required for testing
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	var BUGGY = 'abbc'.split(/(b)*/)[1] === 'c' ||
	  // eslint-disable-next-line regexp/no-empty-group -- required for testing
	  'test'.split(/(?:)/, -1).length !== 4 ||
	  'ab'.split(/(?:ab)*/).length !== 2 ||
	  '.'.split(/(.?)(.?)/).length !== 4 ||
	  // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
	  '.'.split(/()()/).length > 1 ||
	  ''.split(/.?/).length;

	// @@split logic
	fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit = '0'.split(undefined, 0).length ? function (separator, limit) {
	    return separator === undefined && limit === 0 ? [] : call(nativeSplit, this, separator, limit);
	  } : nativeSplit;

	  return [
	    // `String.prototype.split` method
	    // https://tc39.es/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = requireObjectCoercible(this);
	      var splitter = isObject(separator) ? getMethod(separator, SPLIT) : undefined;
	      return splitter
	        ? call(splitter, separator, O, limit)
	        : call(internalSplit, toString(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (string, limit) {
	      var rx = anObject(this);
	      var S = toString(string);

	      if (!BUGGY) {
	        var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);
	        if (res.done) return res.value;
	      }

	      var C = speciesConstructor(rx, RegExp);
	      var flags = toString(getRegExpFlags(rx));
	      var unicodeMatching = !!~stringIndexOf(flags, 'u') || !!~stringIndexOf(flags, 'v');
	      if (UNSUPPORTED_Y) {
	        if (!~stringIndexOf(flags, 'g')) flags += 'g';
	      } else if (!~stringIndexOf(flags, 'y')) flags += 'y';
	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return regExpExec(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
	        var z = regExpExec(splitter, UNSUPPORTED_Y ? stringSlice(S, q) : S);
	        var e;
	        if (
	          z === null ||
	          (e = min$1(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
	        ) {
	          q = advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          push(A, stringSlice(S, p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            push(A, z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      push(A, stringSlice(S, p));
	      return A;
	    }
	  ];
	}, BUGGY || !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

	var PROPER_FUNCTION_NAME = functionName.PROPER;
	var fails$1 = fails$r;
	var whitespaces = whitespaces$4;

	var non = '\u200B\u0085\u180E';

	// check that a method works with the correct list
	// of whitespaces and has a correct name
	var stringTrimForced = function (METHOD_NAME) {
	  return fails$1(function () {
	    return !!whitespaces[METHOD_NAME]()
	      || non[METHOD_NAME]() !== non
	      || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
	  });
	};

	var $$4 = _export;
	var $trim = stringTrim.trim;
	var forcedStringTrimMethod = stringTrimForced;

	// `String.prototype.trim` method
	// https://tc39.es/ecma262/#sec-string.prototype.trim
	$$4({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	function rezka(component, _object) {
	  var network = new Lampa.Reguest();
	  var extract = {};
	  var embed = component.proxy('rezka') + 'https://voidboost.net/';
	  var object = _object;
	  var select_id = '';
	  var filter_items = {};
	  var choice = {
	    season: 0,
	    voice: 0,
	    voice_name: ''
	  };
	  this.searchByKinopoisk = function (_object, id) {
	    object = _object;
	    select_id = id;
	    getFirstTranlate(id, function (voice) {
	      getFilm(id, voice);
	    });
	  };
	  this.searchByImdbID = function (_object, id) {
	    object = _object;
	    select_id = id;
	    getFirstTranlate(id, function (voice) {
	      getFilm(id, voice);
	    });
	  };
	  this.extendChoice = function (saved) {
	    Lampa.Arrays.extend(choice, saved, true);
	  };
	  this.reset = function () {
	    component.reset();
	    choice = {
	      season: 0,
	      voice: 0,
	      voice_name: ''
	    };
	    component.loading(true);
	    getFilm(select_id);
	    component.saveChoice(choice);
	  };
	  this.filter = function (type, a, b) {
	    choice[a.stype] = b.index;
	    if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
	    component.reset();
	    filter();
	    component.loading(true);
	    getFilm(select_id, extract.voice[choice.voice].token);
	    component.saveChoice(choice);
	    setTimeout(component.closeFilter, 10);
	  };
	  this.destroy = function () {
	    network.clear();
	    extract = null;
	  };
	  function getSeasons(voice, call) {
	    var url = embed + 'serial/' + voice + '/iframe?h=gidonline.io';
	    network.clear();
	    network.timeout(10000);
	    network.native(url, function (str) {
	      extractData(str);
	      call();
	    }, function (a, c) {
	      component.doesNotAnswer();
	    }, false, {
	      dataType: 'text'
	    });
	  }
	  function getFirstTranlate(id, call) {
	    network.clear();
	    network.timeout(10000);
	    network.native(embed + 'embed/' + id + '?s=1', function (str) {
	      extractData(str);
	      if (extract.voice.length) call(extract.voice[0].token);else component.doesNotAnswer();
	    }, function (a, c) {
	      component.doesNotAnswer();
	    }, false, {
	      dataType: 'text'
	    });
	  }
	  function getEmbed(url) {
	    network.clear();
	    network.timeout(10000);
	    network.native(url, function (str) {
	      component.loading(false);
	      extractData(str);
	      filter();
	      append();
	    }, function (a, c) {
	      component.doesNotAnswer();
	    }, false, {
	      dataType: 'text'
	    });
	  }
	  function getFilm(id, voice) {
	    network.clear();
	    network.timeout(10000);
	    var url = embed;
	    if (voice) {
	      if (extract.season.length) {
	        var ses = extract.season[Math.min(extract.season.length - 1, choice.season)].id;
	        url += 'serial/' + voice + '/iframe?s=' + ses + '&h=gidonline.io';
	        return getSeasons(voice, function () {
	          var check = extract.season.filter(function (s) {
	            return s.id == ses;
	          });
	          if (!check.length) {
	            choice.season = extract.season.length - 1;
	            url = embed + 'serial/' + voice + '/iframe?s=' + extract.season[Math.min(extract.season.length - 1, choice.season)].id + '&h=gidonline.io';
	          }
	          getEmbed(url);
	        });
	      } else {
	        url += 'movie/' + voice + '/iframe?h=gidonline.io';
	        getEmbed(url);
	      }
	    } else {
	      url += 'embed/' + id;
	      url += '?s=1';
	      getEmbed(url);
	    }
	  }
	  function filter() {
	    filter_items = {
	      season: extract.season.map(function (v) {
	        return v.name;
	      }),
	      voice: extract.season.length ? extract.voice.map(function (v) {
	        return v.name;
	      }) : []
	    };
	    if (choice.voice_name) {
	      var inx = filter_items.voice.map(function (v) {
	        return v.toLowerCase();
	      }).indexOf(choice.voice_name.toLowerCase());
	      if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
	        choice.voice = inx;
	      }
	    }
	    if (!extract.season[choice.season]) choice.season = 0;
	    component.filter(filter_items, choice);
	  }
	  function parseSubtitles(str) {
	    var subtitle = str.match("subtitle': '(.*?)'");
	    if (subtitle) {
	      var index = -1;
	      return subtitle[1].split(',').map(function (sb) {
	        var sp = sb.split(']');
	        index++;
	        return {
	          label: sp[0].slice(1),
	          url: sp.pop(),
	          index: index
	        };
	      });
	    }
	  }
	  function getStream(element, call, error) {
	    if (element.stream) return call(element.stream);
	    var url = embed;
	    if (element.season) {
	      url += 'serial/' + extract.voice[choice.voice].token + '/iframe?s=' + element.season + '&e=' + element.episode + '&h=gidonline.io';
	    } else {
	      url += 'movie/' + element.voice.token + '/iframe?h=gidonline.io';
	    }
	    network.clear();
	    network.timeout(3000);
	    network.native(url, function (str) {
	      var videos = str.match("file': '(.*?)'");
	      if (videos) {
	        var video = decode(videos[1]),
	          qused = '',
	          first = '',
	          mass = ['2160p', '1440p', '1080p Ultra', '1080p', '720p', '480p', '360p'];
	        video = video.slice(1).split(/,\[/).map(function (s) {
	          return s.split(']')[0] + ']' + (s.indexOf(' or ') > -1 ? s.split(' or').pop().trim() : s.split(']').pop());
	        }).join('[');
	        element.qualitys = {};
	        var preferably = Lampa.Storage.get('video_quality_default', '1080');
	        mass.forEach(function (n) {
	          var link = video.match(new RegExp(n + "](.*?)mp4"));
	          if (link) {
	            if (!first) first = link[1] + 'mp4';
	            element.qualitys[n] = link[1] + 'mp4';
	            if (n.indexOf(preferably) >= 0) {
	              qused = link[1] + 'mp4';
	              first = qused;
	            }
	          }
	        });
	        if (!first) element.qualitys = false;
	        if (first) {
	          element.stream = qused || first;
	          element.subtitles = parseSubtitles(str);
	          call(element.stream);
	        } else error();
	      } else error();
	    }, error, false, {
	      dataType: 'text'
	    });
	  }
	  function decode(data) {
	    function product(iterables, repeat) {
	      var argv = Array.prototype.slice.call(arguments),
	        argc = argv.length;
	      if (argc === 2 && !isNaN(argv[argc - 1])) {
	        var copies = [];
	        for (var i = 0; i < argv[argc - 1]; i++) {
	          copies.push(argv[0].slice()); // Clone
	        }
	        argv = copies;
	      }
	      return argv.reduce(function tl(accumulator, value) {
	        var tmp = [];
	        accumulator.forEach(function (a0) {
	          value.forEach(function (a1) {
	            tmp.push(a0.concat(a1));
	          });
	        });
	        return tmp;
	      }, [[]]);
	    }
	    function unite(arr) {
	      var final = [];
	      arr.forEach(function (e) {
	        final.push(e.join(""));
	      });
	      return final;
	    }
	    var trashList = ["@", "#", "!", "^", "$"];
	    var two = unite(product(trashList, 2));
	    var tree = unite(product(trashList, 3));
	    var trashCodesSet = two.concat(tree);
	    var arr = data.replace("#h", "").split("//_//");
	    var trashString = arr.join('');
	    trashCodesSet.forEach(function (i) {
	      trashString = trashString.replace(new RegExp(btoa(i), 'g'), '');
	    });
	    var result = '';
	    try {
	      result = atob(trashString.substr(2));
	    } catch (e) {}
	    return result;
	  }
	  function extractData(str) {
	    extract.voice = [];
	    extract.season = [];
	    extract.episode = [];
	    str = str.replace(/\n/g, '');
	    var voices = str.match('<select name="translator"[^>]+>(.*?)</select>');
	    var sesons = str.match('<select name="season"[^>]+>(.*?)</select>');
	    var episod = str.match('<select name="episode"[^>]+>(.*?)</select>');
	    if (sesons) {
	      var select = $('<select>' + sesons[1] + '</select>');
	      $('option', select).each(function () {
	        extract.season.push({
	          id: $(this).attr('value'),
	          name: $(this).text()
	        });
	      });
	    }
	    if (voices) {
	      var _select = $('<select>' + voices[1] + '</select>');
	      $('option', _select).each(function () {
	        var token = $(this).attr('data-token');
	        if (token) {
	          extract.voice.push({
	            token: token,
	            name: $(this).text(),
	            id: $(this).val()
	          });
	        }
	      });
	    }
	    if (episod) {
	      var _select2 = $('<select>' + episod[1] + '</select>');
	      $('option', _select2).each(function () {
	        extract.episode.push({
	          id: $(this).attr('value'),
	          name: $(this).text()
	        });
	      });
	    }
	  }
	  function append() {
	    component.reset();
	    var items = [];
	    if (extract.season.length) {
	      extract.episode.forEach(function (episode) {
	        items.push({
	          title: episode.name,
	          quality: '720p ~ 1080p',
	          season: extract.season[Math.min(extract.season.length - 1, choice.season)].id,
	          episode: parseInt(episode.id),
	          info: extract.voice[choice.voice].name,
	          voice: extract.voice[choice.voice],
	          voice_name: extract.voice[choice.voice].name
	        });
	      });
	    } else {
	      extract.voice.forEach(function (voice) {
	        items.push({
	          title: voice.name.length > 3 ? voice.name : object.movie.title,
	          quality: '720p ~ 1080p',
	          voice: voice,
	          info: '',
	          voice_name: voice.name
	        });
	      });
	    }
	    component.draw(items, {
	      onEnter: function onEnter(item, html) {
	        getStream(item, function (stream) {
	          var first = {
	            url: stream,
	            timeline: item.timeline,
	            quality: item.qualitys,
	            title: item.title,
	            subtitles: item.subtitles
	          };
	          Lampa.Player.play(first);
	          if (item.season) {
	            var playlist = [];
	            items.forEach(function (elem) {
	              var cell = {
	                url: function url(call) {
	                  getStream(elem, function (stream) {
	                    cell.url = stream;
	                    cell.quality = elem.qualitys;
	                    elem.mark();
	                    call();
	                  }, function () {
	                    cell.url = '';
	                    call();
	                  });
	                },
	                timeline: elem.timeline,
	                title: elem.title,
	                subtitles: elem.subtitles
	              };
	              if (elem == item) cell.url = stream;
	              playlist.push(cell);
	            });
	            Lampa.Player.playlist(playlist);
	          } else {
	            Lampa.Player.playlist([first]);
	          }
	          item.mark();
	        }, function () {
	          Lampa.Noty.show(Lampa.Lang.translate('online_nolink'));
	        });
	      },
	      onContextMenu: function onContextMenu(item, html, data, call) {
	        getStream(item, function (stream) {
	          call({
	            file: stream,
	            quality: item.qualitys
	          });
	        });
	      }
	    });
	  }
	}

	var $$3 = _export;
	var uncurryThis = functionUncurryThis;
	var isArray = isArray$5;

	var nativeReverse = uncurryThis([].reverse);
	var test = [1, 2];

	// `Array.prototype.reverse` method
	// https://tc39.es/ecma262/#sec-array.prototype.reverse
	// fix for Safari 12.0 bug
	// https://bugs.webkit.org/show_bug.cgi?id=188794
	$$3({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
	  reverse: function reverse() {
	    // eslint-disable-next-line no-self-assign -- dirty hack
	    if (isArray(this)) this.length = this.length;
	    return nativeReverse(this);
	  }
	});

	function kinobase(component, _object) {
	  var network = new Lampa.Reguest();
	  var extract = {};
	  var embed = component.proxy('kinobase') + 'https://kinobase.org/';
	  var object = _object;
	  var select_title = '';
	  var select_id = '';
	  var is_playlist = false;
	  var translation = '';
	  var quality_type = '';
	  var filter_items = {};
	  var wait_similars;
	  var choice = {
	    season: 0,
	    voice: -1
	  };
	  this.search = function (_object, sim) {
	    if (wait_similars && sim) return getPage(sim[0].link);
	  };
	  this.searchByTitle = function (_object, query) {
	    object = _object;
	    select_title = query;
	    var url = embed + "search?query=" + encodeURIComponent(cleanTitle(select_title));
	    network.native(url, function (str) {
	      str = str.replace(/\n/, '');
	      var links = object.movie.number_of_seasons ? str.match(/<a href="\/serial\/(.*?)">(.*?)<\/a>/g) : str.match(/<a href="\/film\/(.*?)" class="link"[^>]+>(.*?)<\/a>/g);
	      var relise = object.search_date || (object.movie.number_of_seasons ? object.movie.first_air_date : object.movie.release_date) || '0000';
	      var need_year = parseInt((relise + '').slice(0, 4));
	      var found_url = '';
	      if (links) {
	        var cards = [];
	        links.filter(function (l) {
	          var link = $(l),
	            titl = link.attr('title') || link.text() || '';
	          var year = parseInt(titl.split('(').pop().slice(0, -1));
	          if (year > need_year - 2 && year < need_year + 2) cards.push({
	            year: year,
	            title: titl.split(/\(\d{4}\)/)[0].trim(),
	            link: link.attr('href')
	          });
	        });
	        var card = cards.find(function (c) {
	          return c.year == need_year;
	        });
	        if (!card) card = cards.find(function (c) {
	          return c.title == select_title;
	        });
	        if (!card && cards.length == 1) card = cards[0];
	        if (card) found_url = cards[0].link;
	        if (found_url) getPage(found_url);else if (links.length) {
	          wait_similars = true;
	          var similars = [];
	          links.forEach(function (l) {
	            var link = $(l),
	              titl = link.attr('title') || link.text();
	            similars.push({
	              title: titl,
	              link: link.attr('href'),
	              filmId: 'similars'
	            });
	          });
	          component.similars(similars);
	          component.loading(false);
	        } else component.doesNotAnswer();
	      } else component.doesNotAnswer();
	    }, function (a, c) {
	      component.doesNotAnswer();
	    }, false, {
	      dataType: 'text'
	    });
	  };
	  this.extendChoice = function (saved) {
	    Lampa.Arrays.extend(choice, saved, true);
	  };
	  this.reset = function () {
	    component.reset();
	    choice = {
	      season: 0,
	      voice: -1
	    };
	    filter();
	    append(filtred());
	  };
	  this.filter = function (type, a, b) {
	    choice[a.stype] = b.index;
	    component.reset();
	    filter();
	    append(filtred());
	  };
	  this.destroy = function () {
	    network.clear();
	    extract = null;
	  };
	  function cleanTitle(str) {
	    return str.replace('.', '').replace(':', '');
	  }
	  function parsePlaylist(str) {
	    var pl = [];
	    try {
	      if (str.charAt(0) === '[') {
	        str.substring(1).split(',[').forEach(function (item) {
	          var label_end = item.indexOf(']');
	          if (label_end >= 0) {
	            var label = item.substring(0, label_end);
	            if (item.charAt(label_end + 1) === '{') {
	              item.substring(label_end + 2).split(';{').forEach(function (voice_item) {
	                var voice_end = voice_item.indexOf('}');
	                if (voice_end >= 0) {
	                  var voice = voice_item.substring(0, voice_end);
	                  pl.push({
	                    label: label,
	                    voice: voice,
	                    links: voice_item.substring(voice_end + 1).split(' or ')
	                  });
	                }
	              });
	            } else {
	              pl.push({
	                label: label,
	                links: item.substring(label_end + 1).split(' or ')
	              });
	            }
	          }
	          return null;
	        });
	      }
	    } catch (e) {}
	    return pl;
	  }
	  function filter() {
	    filter_items = {
	      season: [],
	      voice: []
	    };
	    if (is_playlist) {
	      extract.forEach(function (item, i) {
	        if (item.playlist) {
	          filter_items.season.push(item.comment);
	          if (i == choice.season) {
	            item.playlist.forEach(function (eps) {
	              if (eps.file) {
	                parsePlaylist(eps.file).forEach(function (el) {
	                  if (el.voice && filter_items.voice.indexOf(el.voice) == -1) {
	                    filter_items.voice.push(el.voice);
	                  }
	                });
	              }
	            });
	          }
	        } else if (item.file) {
	          parsePlaylist(item.file).forEach(function (el) {
	            if (el.voice && filter_items.voice.indexOf(el.voice) == -1) {
	              filter_items.voice.push(el.voice);
	            }
	          });
	        }
	      });
	    }
	    if (!filter_items.season[choice.season]) choice.season = 0;
	    if (!filter_items.voice[choice.voice]) choice.voice = 0;
	    component.filter(filter_items, choice);
	  }
	  function filtred() {
	    var filtred = [];
	    if (is_playlist) {
	      var playlist = extract;
	      var season = object.movie.number_of_seasons && 1;
	      if (extract[choice.season] && extract[choice.season].playlist) {
	        playlist = extract[choice.season].playlist;
	        season = parseInt(extract[choice.season].comment);
	        if (isNaN(season)) season = 1;
	      }
	      playlist.forEach(function (eps, episode) {
	        var items = extractItems(eps.file, filter_items.voice[choice.voice]);
	        if (items.length) {
	          var alt_voice = eps.comment.match(/\d+ серия (.*)$/i);
	          var info = items[0].voice || alt_voice && alt_voice[1].trim() || translation;
	          if (info == eps.comment) info = '';
	          filtred.push({
	            file: eps.file,
	            title: eps.comment,
	            quality: (quality_type && window.innerWidth > 480 ? quality_type + ' - ' : '') + items[0].quality + 'p',
	            season: season,
	            episode: episode + 1,
	            info: info,
	            voice: items[0].voice,
	            voice_name: info,
	            subtitles: parseSubs(eps.subtitle || '')
	          });
	        }
	      });
	    } else {
	      filtred = extract;
	    }
	    return filtred;
	  }
	  function extractItems(str, voice) {
	    try {
	      var list = parsePlaylist(str);
	      if (voice) {
	        var tmp = list.filter(function (el) {
	          return el.voice == voice;
	        });
	        if (tmp.length) {
	          list = tmp;
	        } else {
	          list = list.filter(function (el) {
	            return typeof el.voice == 'undefined';
	          });
	        }
	      }
	      var items = list.map(function (item) {
	        var quality = item.label.match(/(\d\d\d+)p/);
	        return {
	          label: item.label,
	          voice: item.voice,
	          quality: quality ? parseInt(quality[1]) : NaN,
	          file: item.links[0]
	        };
	      });
	      items.sort(function (a, b) {
	        if (b.quality > a.quality) return 1;
	        if (b.quality < a.quality) return -1;
	        if (b.label > a.label) return 1;
	        if (b.label < a.label) return -1;
	        return 0;
	      });
	      return items;
	    } catch (e) {}
	    return [];
	  }
	  function parseSubs(vod) {
	    var subtitles = [];
	    vod.split(',').forEach(function (s) {
	      var nam = s.match("\\[(.*?)]");
	      if (nam) {
	        var url = s.replace(/\[.*?\]/, '').split(' or ')[0];
	        if (url) {
	          subtitles.push({
	            label: nam[1],
	            url: url
	          });
	        }
	      }
	    });
	    return subtitles.length ? subtitles : false;
	  }
	  function extractData(str, page) {
	    var quality_match = page.match(/<li><b>Качество:<\/b>([^<,]+)<\/li>/i);
	    var translation_match = page.match(/<li><b>Перевод:<\/b>([^<,]+)<\/li>/i);
	    quality_type = quality_match ? quality_match[1].trim() : '';
	    translation = translation_match ? translation_match[1].trim() : '';
	    var vod = str.split('|');
	    if (vod[0] == 'file') {
	      var file = vod[1];
	      var found = [];
	      var subtiles = parseSubs(vod[2]);
	      if (file) {
	        var voices = {};
	        parsePlaylist(file).forEach(function (item) {
	          var prev = voices[item.voice || ''];
	          var quality_str = item.label.match(/(\d\d\d+)p/);
	          var quality = quality_str ? parseInt(quality_str[1]) : NaN;
	          if (!prev || quality > prev.quality) {
	            voices[item.voice || ''] = {
	              quality: quality
	            };
	          }
	        });
	        for (var voice in voices) {
	          var el = voices[voice];
	          found.push({
	            file: file,
	            title: voice || translation || object.movie.title,
	            quality: (quality_type && window.innerWidth > 480 ? quality_type + ' - ' : '') + el.quality + 'p',
	            info: '',
	            voice: voice,
	            subtitles: subtiles,
	            voice_name: voice || translation || ''
	          });
	        }
	      }
	      extract = found;
	      is_playlist = false;
	    } else if (vod[0] == 'pl') {
	      extract = Lampa.Arrays.decodeJson(vod[1], []);
	      is_playlist = true;
	    } else component.emptyForQuery(select_title);
	  }
	  function getPage(url) {
	    network.clear();
	    network.timeout(1000 * 10);
	    network.native(embed + url, function (str) {
	      str = str.replace(/\n/g, '');
	      var MOVIE_ID = str.match('var MOVIE_ID = ([^;]+);');
	      var IDENTIFIER = str.match('var IDENTIFIER = "([^"]+)"');
	      var PLAYER_CUID = str.match('var PLAYER_CUID = "([^"]+)"');
	      if (MOVIE_ID && IDENTIFIER && PLAYER_CUID) {
	        select_id = MOVIE_ID[1];
	        var identifier = IDENTIFIER[1];
	        var player_cuid = PLAYER_CUID[1];
	        var data_url = "user_data";
	        data_url = Lampa.Utils.addUrlComponent(data_url, "page=movie");
	        data_url = Lampa.Utils.addUrlComponent(data_url, "movie_id=" + select_id);
	        data_url = Lampa.Utils.addUrlComponent(data_url, "cuid=" + player_cuid);
	        data_url = Lampa.Utils.addUrlComponent(data_url, "device=DESKTOP");
	        data_url = Lampa.Utils.addUrlComponent(data_url, "_=" + Date.now());
	        network.clear();
	        network.timeout(1000 * 10);
	        network.native(embed + data_url, function (user_data) {
	          if (typeof user_data.vod_hash == "string") {
	            var file_url = "vod/" + select_id;
	            file_url = Lampa.Utils.addUrlComponent(file_url, "identifier=" + identifier);
	            file_url = Lampa.Utils.addUrlComponent(file_url, "player_type=new");
	            file_url = Lampa.Utils.addUrlComponent(file_url, "file_type=mp4");
	            file_url = Lampa.Utils.addUrlComponent(file_url, "st=" + user_data.vod_hash);
	            file_url = Lampa.Utils.addUrlComponent(file_url, "e=" + user_data.vod_time);
	            file_url = Lampa.Utils.addUrlComponent(file_url, "_=" + Date.now());
	            network.clear();
	            network.timeout(1000 * 10);
	            network.native(embed + file_url, function (files) {
	              component.loading(false);
	              extractData(files, str);
	              filter();
	              append(filtred());
	            }, function (a, c) {
	              component.doesNotAnswer();
	            }, false, {
	              dataType: 'text'
	            });
	          } else component.doesNotAnswer(L);
	        }, function (a, c) {
	          component.doesNotAnswer();
	        });
	      } else component.doesNotAnswer();
	    }, function (a, c) {
	      component.doesNotAnswer();
	    }, false, {
	      dataType: 'text'
	    });
	  }
	  function getFile(element) {
	    var quality = {},
	      first = '';
	    var preferably = Lampa.Storage.get('video_quality_default', '1080');
	    element.file.split(',').reverse().forEach(function (file) {
	      var q = file.match("\\[(\\d+)p");
	      if (q) {
	        quality[q[1] + 'p'] = file.replace(/\[\d+p\]/, '').replace(/{([^}]+)}/, '').split(' or ')[0];
	        if (!first || q[1] == preferably) first = quality[q[1] + 'p'];
	      }
	    });
	    element.stream = first;
	    element.qualitys = quality;
	    return {
	      file: first,
	      quality: quality
	    };
	  }
	  function toPlayElement(element) {
	    getFile(element);
	    var play = {
	      url: element.stream,
	      timeline: element.timeline,
	      title: element.title,
	      subtitles: element.subtitles,
	      quality: element.qualitys,
	      callback: element.mark
	    };
	    return play;
	  }
	  function append(items) {
	    component.reset();
	    component.draw(items, {
	      similars: wait_similars,
	      onEnter: function onEnter(item, html) {
	        getFile(item);
	        if (item.stream) {
	          var playlist = [];
	          var first = toPlayElement(item);
	          if (item.season) {
	            items.forEach(function (elem) {
	              playlist.push(toPlayElement(elem));
	            });
	          } else {
	            playlist.push(first);
	          }
	          if (playlist.length > 1) first.playlist = playlist;
	          Lampa.Player.play(first);
	          Lampa.Player.playlist(playlist);
	          item.mark();
	        } else Lampa.Noty.show(Lampa.Lang.translate('online_nolink'));
	      },
	      onContextMenu: function onContextMenu(item, html, data, call) {
	        call(getFile(item));
	      }
	    });
	  }
	}

	function collaps(component, _object) {
	  var network = new Lampa.Reguest();
	  var extract = {};
	  var embed = component.proxy('collaps') + 'https://api.delivembd.ws/embed/';
	  var filter_items = {};
	  var choice = {
	    season: 0,
	    voice: 0
	  };
	  this.searchByKinopoisk = function (_object, id) {
	    this.searchIn('kp', id);
	  };
	  this.searchByImdbID = function (_object, id) {
	    this.searchIn('imdb', id);
	  };
	  this.searchIn = function (where, id) {
	    var url = embed + where + '/' + id;
	    network.silent(url, function (str) {
	      if (str) {
	        parse(str);
	      } else component.doesNotAnswer();
	      component.loading(false);
	    }, function (a, c) {
	      component.doesNotAnswer();
	    }, false, {
	      dataType: 'text'
	    });
	  };
	  this.extendChoice = function (saved) {
	    Lampa.Arrays.extend(choice, saved, true);
	  };
	  this.reset = function () {
	    component.reset();
	    choice = {
	      season: 0,
	      voice: 0
	    };
	    filter();
	    append(filtred());
	    component.saveChoice(choice);
	  };
	  this.filter = function (type, a, b) {
	    choice[a.stype] = b.index;
	    component.reset();
	    filter();
	    append(filtred());
	    component.saveChoice(choice);
	  };
	  this.destroy = function () {
	    network.clear();
	    extract = null;
	  };
	  function parse(str) {
	    str = str.replace(/\n/g, '');
	    var find = str.match('makePlayer\\({(.*?)}\\);');
	    if (find) {
	      var json;
	      try {
	        json = eval('({' + find[1] + '})');
	      } catch (e) {}
	      if (json) {
	        extract = json;
	        filter();
	        append(filtred());
	      } else component.doesNotAnswer();
	    }
	  }
	  function filter() {
	    filter_items = {
	      season: [],
	      voice: [],
	      quality: []
	    };
	    if (extract.playlist) {
	      if (extract.playlist.seasons) {
	        extract.playlist.seasons.forEach(function (season) {
	          filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + season.season);
	        });
	      }
	    }
	    filter_items.season.sort(function (a, b) {
	      var n_a = parseInt(a.replace(/\D/g, ''));
	      var n_b = parseInt(b.replace(/\D/g, ''));
	      if (n_a > n_b) return 1;else if (n_a < n_b) return -1;else return 0;
	    });
	    component.filter(filter_items, choice);
	  }
	  function filtred() {
	    var filtred = [];
	    if (extract.playlist) {
	      extract.playlist.seasons.forEach(function (season, i) {
	        if (season.season - 1 == choice.season) {
	          season.episodes.forEach(function (episode) {
	            filtred.push({
	              file: episode.hls,
	              episode: parseInt(episode.episode),
	              season: season.season,
	              title: episode.title,
	              quality: '',
	              info: episode.audio.names.slice(0, 5).join(', '),
	              subtitles: episode.cc ? episode.cc.map(function (c) {
	                return {
	                  label: c.name,
	                  url: c.url
	                };
	              }) : false
	            });
	          });
	        }
	      });
	    } else if (extract.source) {
	      var resolution = Lampa.Arrays.getKeys(extract.qualityByWidth).pop();
	      var max_quality = extract.qualityByWidth ? extract.qualityByWidth[resolution] || 0 : 0;
	      filtred.push({
	        file: extract.source.hls,
	        title: extract.title,
	        quality: max_quality ? max_quality + 'p' : '',
	        info: extract.source.audio.names.slice(0, 4).join(', '),
	        subtitles: extract.source.cc ? extract.source.cc.map(function (c) {
	          return {
	            label: c.name,
	            url: c.url
	          };
	        }) : false
	      });
	    }
	    return filtred;
	  }
	  function append(items) {
	    component.reset();
	    component.draw(items, {
	      onEnter: function onEnter(item, html) {
	        if (item.file) {
	          var playlist = [];
	          var first = {
	            url: item.file,
	            timeline: item.timeline,
	            title: item.title,
	            subtitles: item.subtitles
	          };
	          if (item.season) {
	            items.forEach(function (elem) {
	              playlist.push({
	                title: elem.title,
	                url: elem.file,
	                timeline: elem.timeline,
	                subtitles: elem.subtitles,
	                callback: function callback() {
	                  elem.mark();
	                }
	              });
	            });
	          } else {
	            playlist.push(first);
	          }
	          if (playlist.length > 1) first.playlist = playlist;
	          Lampa.Player.play(first);
	          Lampa.Player.playlist(playlist);
	          item.mark();
	        } else Lampa.Noty.show(Lampa.Lang.translate('online_nolink'));
	      },
	      onContextMenu: function onContextMenu(item, html, data, call) {
	        call({
	          file: item.file
	        });
	      }
	    });
	  }
	}

	/* eslint-disable es/no-array-prototype-lastindexof -- safe */
	var apply = functionApply;
	var toIndexedObject = toIndexedObject$7;
	var toIntegerOrInfinity = toIntegerOrInfinity$7;
	var lengthOfArrayLike = lengthOfArrayLike$7;
	var arrayMethodIsStrict = arrayMethodIsStrict$6;

	var min = Math.min;
	var $lastIndexOf = [].lastIndexOf;
	var NEGATIVE_ZERO = !!$lastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
	var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
	var FORCED = NEGATIVE_ZERO || !STRICT_METHOD;

	// `Array.prototype.lastIndexOf` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
	var arrayLastIndexOf = FORCED ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
	  // convert -0 to +0
	  if (NEGATIVE_ZERO) return apply($lastIndexOf, this, arguments) || 0;
	  var O = toIndexedObject(this);
	  var length = lengthOfArrayLike(O);
	  if (length === 0) return -1;
	  var index = length - 1;
	  if (arguments.length > 1) index = min(index, toIntegerOrInfinity(arguments[1]));
	  if (index < 0) index = length + index;
	  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
	  return -1;
	} : $lastIndexOf;

	var $$2 = _export;
	var lastIndexOf = arrayLastIndexOf;

	// `Array.prototype.lastIndexOf` method
	// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
	// eslint-disable-next-line es/no-array-prototype-lastindexof -- required for testing
	$$2({ target: 'Array', proto: true, forced: lastIndexOf !== [].lastIndexOf }, {
	  lastIndexOf: lastIndexOf
	});

	var $$1 = _export;
	var toObject = toObject$7;
	var nativeKeys = objectKeys$1;
	var fails = fails$r;

	var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	$$1({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return nativeKeys(toObject(it));
	  }
	});

	function filmix(component, _object) {
	  var network = new Lampa.Reguest();
	  var extract = {};
	  var results = [];
	  var object = _object;
	  var embed = 'http://filmixapp.cyou/api/v2/';
	  var wait_similars;
	  var filter_items = {};
	  var choice = {
	    season: 0,
	    voice: 0,
	    voice_name: ''
	  };
	  var token = Lampa.Storage.get('filmix_token', '');
	  var dev_token = 'user_dev_apk=2.0.1&user_dev_id=&user_dev_name=Xiaomi&user_dev_os=11&user_dev_token=' + token + '&user_dev_vendor=Xiaomi';
	  this.search = function (_object, sim) {
	    if (wait_similars) this.find(sim[0].id);
	  };
	  this.searchByTitle = function (_object, query) {
	    var _this = this;
	    object = _object;
	    var year = parseInt((object.movie.release_date || object.movie.first_air_date || '0000').slice(0, 4));
	    var orig = object.movie.original_title || object.movie.original_name;
	    var url = embed + 'search';
	    url = Lampa.Utils.addUrlComponent(url, 'story=' + encodeURIComponent(query));
	    url = Lampa.Utils.addUrlComponent(url, dev_token);
	    network.clear();
	    network.silent(url, function (json) {
	      var cards = json.filter(function (c) {
	        c.year = parseInt(c.alt_name.split('-').pop());
	        return c.year > year - 2 && c.year < year + 2;
	      });
	      var card = cards.find(function (c) {
	        return c.year == year;
	      });
	      if (!card) {
	        card = cards.find(function (c) {
	          return c.original_title == orig;
	        });
	      }
	      if (!card && cards.length == 1) card = cards[0];
	      if (card) _this.find(card.id);else if (json.length) {
	        wait_similars = true;
	        component.similars(json);
	        component.loading(false);
	      } else component.doesNotAnswer();
	    }, function (a, c) {
	      component.doesNotAnswer();
	    });
	  };
	  this.find = function (filmix_id) {
	    var url = embed;
	    if (!window.filmix.is_max_qualitie && token) {
	      window.filmix.is_max_qualitie = true;
	      network.clear();
	      network.timeout(10000);
	      network.silent(url + 'user_profile?' + dev_token, function (found) {
	        if (found && found.user_data) {
	          if (found.user_data.is_pro) window.filmix.max_qualitie = 1080;
	          if (found.user_data.is_pro_plus) window.filmix.max_qualitie = 2160;
	        }
	        end_search(filmix_id);
	      });
	    } else end_search(filmix_id);
	    function end_search(filmix_id) {
	      network.clear();
	      network.timeout(10000);
	      network.silent((window.filmix.is_max_qualitie ? url + 'post/' + filmix_id : url + 'post/' + filmix_id) + '?' + dev_token, function (found) {
	        if (found && Object.keys(found).length) {
	          success(found);
	          component.loading(false);
	        } else component.doesNotAnswer();
	      }, function (a, c) {
	        component.doesNotAnswer();
	      });
	    }
	  };
	  this.extendChoice = function (saved) {
	    Lampa.Arrays.extend(choice, saved, true);
	  };
	  this.reset = function () {
	    component.reset();
	    choice = {
	      season: 0,
	      voice: 0,
	      voice_name: ''
	    };
	    extractData(results);
	    filter();
	    append(filtred());
	  };
	  this.filter = function (type, a, b) {
	    choice[a.stype] = b.index;
	    if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
	    component.reset();
	    extractData(results);
	    filter();
	    append(filtred());
	  };
	  this.destroy = function () {
	    network.clear();
	    results = null;
	  };
	  function success(json) {
	    results = json;
	    extractData(json);
	    filter();
	    append(filtred());
	  }
	  function extractData(data) {
	    extract = {};
	    var pl_links = data.player_links;
	    if (pl_links.playlist && Object.keys(pl_links.playlist).length > 0) {
	      var seas_num = 0;
	      for (var season in pl_links.playlist) {
	        var episode = pl_links.playlist[season];
	        ++seas_num;
	        var transl_id = 0;
	        for (var voice in episode) {
	          var episode_voice = episode[voice];
	          ++transl_id;
	          var items = [];
	          for (var ID in episode_voice) {
	            var file_episod = episode_voice[ID];
	            var quality_eps = file_episod.qualities.filter(function (qualitys) {
	              return qualitys <= window.filmix.max_qualitie;
	            });
	            var max_quality = Math.max.apply(null, quality_eps);
	            var stream_url = file_episod.link.replace('%s.mp4', max_quality + '.mp4');
	            var s_e = stream_url.slice(0 - stream_url.length + stream_url.lastIndexOf('/'));
	            var str_s_e = s_e.match(/s(\d+)e(\d+?)_\d+\.mp4/i);
	            if (str_s_e) {
	              var _seas_num = parseInt(str_s_e[1]);
	              var _epis_num = parseInt(str_s_e[2]);
	              items.push({
	                id: _seas_num + '_' + _epis_num,
	                comment: _epis_num + ' ' + Lampa.Lang.translate('torrent_serial_episode') + ' <i>' + ID + '</i>',
	                file: stream_url,
	                episode: _epis_num,
	                season: _seas_num,
	                quality: max_quality,
	                qualities: quality_eps,
	                translation: transl_id
	              });
	            }
	          }
	          if (!extract[transl_id]) extract[transl_id] = {
	            json: [],
	            file: ''
	          };
	          extract[transl_id].json.push({
	            id: seas_num,
	            comment: seas_num + ' ' + Lampa.Lang.translate('torrent_serial_season'),
	            folder: items,
	            translation: transl_id
	          });
	        }
	      }
	    } else if (pl_links.movie && pl_links.movie.length > 0) {
	      var _transl_id = 0;
	      for (var _ID in pl_links.movie) {
	        var _file_episod = pl_links.movie[_ID];
	        ++_transl_id;
	        var _quality_eps = _file_episod.link.match(/.+\[(.+[\d]),?\].+/i);
	        if (_quality_eps) _quality_eps = _quality_eps[1].split(',').filter(function (quality_) {
	          return quality_ <= window.filmix.max_qualitie;
	        });
	        var _max_quality = Math.max.apply(null, _quality_eps);
	        var file_url = _file_episod.link.replace(/\[(.+[\d]),?\]/i, _max_quality);
	        extract[_transl_id] = {
	          file: file_url,
	          translation: _file_episod.translation,
	          quality: _max_quality,
	          qualities: _quality_eps
	        };
	      }
	    }
	  }
	  function getFile(element, max_quality) {
	    var translat = extract[element.translation];
	    var id = element.season + '_' + element.episode;
	    var file = '';
	    var quality = false;
	    if (translat) {
	      if (element.season) for (var i in translat.json) {
	        var elem = translat.json[i];
	        if (elem.folder) for (var f in elem.folder) {
	          var folder = elem.folder[f];
	          if (folder.id == id) {
	            file = folder.file;
	            break;
	          }
	        } else {
	          if (elem.id == id) {
	            file = elem.file;
	            break;
	          }
	        }
	      } else file = translat.file;
	    }
	    max_quality = parseInt(max_quality);
	    if (file) {
	      var link = file.slice(0, file.lastIndexOf('_')) + '_';
	      var orin = file.split('?');
	      orin = orin.length > 1 ? '?' + orin.slice(1).join('?') : '';
	      if (file.split('_').pop().replace('.mp4', '') !== max_quality) {
	        file = link + max_quality + '.mp4' + orin;
	      }
	      quality = {};
	      var mass = [2160, 1440, 1080, 720, 480, 360];
	      mass = mass.slice(mass.indexOf(max_quality));
	      mass.forEach(function (n) {
	        quality[n + 'p'] = link + n + '.mp4' + orin;
	      });
	      var preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
	      if (quality[preferably]) file = quality[preferably];
	    }
	    return {
	      file: file,
	      quality: quality
	    };
	  }
	  function filter() {
	    filter_items = {
	      season: [],
	      voice: [],
	      voice_info: []
	    };
	    if (results.last_episode && results.last_episode.season) {
	      var s = results.last_episode.season;
	      while (s--) {
	        filter_items.season.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + (results.last_episode.season - s));
	      }
	    }
	    for (var Id in results.player_links.playlist) {
	      var season = results.player_links.playlist[Id];
	      var d = 0;
	      for (var voic in season) {
	        ++d;
	        if (filter_items.voice.indexOf(voic) == -1) {
	          filter_items.voice.push(voic);
	          filter_items.voice_info.push({
	            id: d
	          });
	        }
	      }
	    }
	    if (choice.voice_name) {
	      var inx = filter_items.voice.map(function (v) {
	        return v.toLowerCase();
	      }).indexOf(choice.voice_name.toLowerCase());
	      if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
	        choice.voice = inx;
	      }
	    }
	    component.filter(filter_items, choice);
	  }
	  function filtred() {
	    var filtred = [];
	    if (Object.keys(results.player_links.playlist).length) {
	      for (var transl in extract) {
	        var element = extract[transl];
	        for (var season_id in element.json) {
	          var episode = element.json[season_id];
	          if (episode.id == choice.season + 1) {
	            episode.folder.forEach(function (media) {
	              if (media.translation == filter_items.voice_info[choice.voice].id) {
	                filtred.push({
	                  episode: parseInt(media.episode),
	                  season: media.season,
	                  title: Lampa.Lang.translate('torrent_serial_episode') + ' ' + media.episode + (media.title ? ' - ' + media.title : ''),
	                  quality: media.quality + 'p ',
	                  translation: media.translation,
	                  voice_name: filter_items.voice[choice.voice],
	                  info: filter_items.voice[choice.voice]
	                });
	              }
	            });
	          }
	        }
	      }
	    } else if (Object.keys(results.player_links.movie).length) {
	      for (var transl_id in extract) {
	        var _element = extract[transl_id];
	        filtred.push({
	          title: _element.translation,
	          quality: _element.quality + 'p ',
	          qualitys: _element.qualities,
	          translation: transl_id,
	          voice_name: _element.translation
	        });
	      }
	    }
	    return filtred;
	  }
	  function toPlayElement(element) {
	    var extra = getFile(element, element.quality);
	    var play = {
	      title: element.title,
	      url: extra.file,
	      quality: extra.quality,
	      timeline: element.timeline,
	      callback: element.mark
	    };
	    return play;
	  }
	  function append(items) {
	    component.reset();
	    component.draw(items, {
	      similars: wait_similars,
	      onEnter: function onEnter(item, html) {
	        var extra = getFile(item, item.quality);
	        if (extra.file) {
	          var playlist = [];
	          var first = toPlayElement(item);
	          if (item.season) {
	            items.forEach(function (elem) {
	              playlist.push(toPlayElement(elem));
	            });
	          } else {
	            playlist.push(first);
	          }
	          if (playlist.length > 1) first.playlist = playlist;
	          Lampa.Player.play(first);
	          Lampa.Player.playlist(playlist);
	          item.mark();
	        } else Lampa.Noty.show(Lampa.Lang.translate('online_nolink'));
	      },
	      onContextMenu: function onContextMenu(item, html, data, call) {
	        call(getFile(item, item.quality));
	      }
	    });
	  }
	}

	function component(object) {
	  var network = new Lampa.Reguest();
	  var scroll = new Lampa.Scroll({
	    mask: true,
	    over: true
	  });
	  var files = new Lampa.Explorer(object);
	  var filter = new Lampa.Filter(object);
	  var sources = {
	    videocdn: videocdn,
	    rezka: rezka,
	    kinobase: kinobase,
	    collaps: collaps,
	    filmix: filmix
	  };
	  var last;
	  var extended;
	  var selected_id;
	  var source;
	  var balanser;
	  var initialized;
	  var balanser_timer;
	  var images = [];
	  var filter_sources = Lampa.Arrays.getKeys(sources);
	  var filter_translate = {
	    season: Lampa.Lang.translate('torrent_serial_season'),
	    voice: Lampa.Lang.translate('torrent_parser_voice'),
	    source: Lampa.Lang.translate('settings_rest_source')
	  };
	  this.initialize = function () {
	    var _this = this;
	    source = this.createSource();
	    filter.onSearch = function (value) {
	      Lampa.Activity.replace({
	        search: value,
	        clarification: true
	      });
	    };
	    filter.onBack = function () {
	      _this.start();
	    };
	    filter.render().find('.selector').on('hover:enter', function () {
	      clearInterval(balanser_timer);
	    });
	    filter.onSelect = function (type, a, b) {
	      if (type == 'filter') {
	        if (a.reset) {
	          if (extended) source.reset();else _this.start();
	        } else {
	          source.filter(type, a, b);
	        }
	      } else if (type == 'sort') {
	        Lampa.Select.close();
	        _this.changeBalanser(a.source);
	      }
	    };
	    if (filter.addButtonBack) filter.addButtonBack();
	    filter.render().find('.filter--sort span').text(Lampa.Lang.translate('online_balanser'));
	    files.appendFiles(scroll.render());
	    files.appendHead(filter.render());
	    scroll.body().addClass('torrent-list');
	    scroll.minus(files.render().find('.explorer__files-head'));
	    this.search();
	  };
	  this.changeBalanser = function (balanser_name) {
	    var last_select_balanser = Lampa.Storage.cache('online_last_balanser', 3000, {});
	    last_select_balanser[object.movie.id] = balanser_name;
	    Lampa.Storage.set('online_last_balanser', last_select_balanser);
	    Lampa.Storage.set('online_balanser', balanser_name);
	    var to = this.getChoice(balanser_name);
	    var from = this.getChoice();
	    if (from.voice_name) to.voice_name = from.voice_name;
	    this.saveChoice(to, balanser_name);
	    Lampa.Activity.replace();
	  };
	  this.createSource = function () {
	    var last_select_balanser = Lampa.Storage.cache('online_last_balanser', 3000, {});
	    if (last_select_balanser[object.movie.id]) {
	      balanser = last_select_balanser[object.movie.id];
	      Lampa.Storage.set('online_last_balanser', last_select_balanser);
	    } else {
	      balanser = Lampa.Storage.get('online_balanser', 'filmix');
	    }
	    if (!sources[balanser]) {
	      balanser = 'filmix';
	    }
	    return new sources[balanser](this, object);
	  };
	  this.proxy = function (name) {
	    var prox = Lampa.Storage.get('online_proxy_all');
	    var need = Lampa.Storage.get('online_proxy_' + name);
	    if (need) prox = need;
	    if (prox && prox.slice(-1) !== '/') {
	      prox += '/';
	    }
	    return prox;
	  };

	  /**
	   * Подготовка
	   */
	  this.create = function () {
	    return this.render();
	  };

	  /**
	   * Начать поиск
	   */
	  this.search = function () {
	    this.activity.loader(true);
	    this.filter({
	      source: filter_sources
	    }, this.getChoice());
	    this.find();
	  };
	  this.find = function () {
	    var _this2 = this;
	    var url = this.proxy('videocdn') + 'https://videocdn.tv/api/short';
	    var query = object.search;
	    url = Lampa.Utils.addUrlComponent(url, 'api_token=3i40G5TSECmLF77oAqnEgbx61ZWaOYaE');
	    var display = function display(json) {
	      if (object.movie.imdb_id) {
	        var imdb = json.data.filter(function (elem) {
	          return elem.imdb_id == object.movie.imdb_id;
	        });
	        if (imdb.length) json.data = imdb;
	      }
	      if (json.data && json.data.length) {
	        if (json.data.length == 1 || object.clarification) {
	          _this2.extendChoice();
	          var kinopoisk_id = json.data[0].kp_id || json.data[0].filmId;
	          if (kinopoisk_id && source.searchByKinopoisk) {
	            source.searchByKinopoisk(object, kinopoisk_id);
	          } else if (json.data[0].imdb_id && source.searchByImdbID) {
	            source.searchByImdbID(object, json.data[0].imdb_id);
	          } else if (source.search) {
	            source.search(object, json.data);
	          } else {
	            _this2.doesNotAnswer();
	          }
	        } else {
	          _this2.similars(json.data);
	          _this2.loading(false);
	        }
	      } else _this2.doesNotAnswer(query);
	    };
	    var pillow = function pillow(a, c) {
	      network.timeout(1000 * 15);
	      network.native('https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=' + encodeURIComponent(query), function (json) {
	        json.data = json.films;
	        display(json);
	      }, function (a, c) {
	        _this2.doesNotAnswer();
	      }, false, {
	        headers: {
	          'X-API-KEY': '2d55adfd-019d-4567-bbf7-67d503f61b5a'
	        }
	      });
	    };
	    var letgo = function letgo(imdb_id) {
	      if (imdb_id && source.searchByImdbID) {
	        _this2.extendChoice();
	        source.searchByImdbID(object, imdb_id);
	      } else {
	        var url_end = Lampa.Utils.addUrlComponent(url, imdb_id ? 'imdb_id=' + encodeURIComponent(imdb_id) : 'title=' + encodeURIComponent(query));
	        network.timeout(1000 * 15);
	        network.native(url_end, function (json) {
	          if (json.data && json.data.length) display(json);else {
	            network.native(Lampa.Utils.addUrlComponent(url, 'title=' + encodeURIComponent(query)), display.bind(_this2), pillow.bind(_this2));
	          }
	        }, pillow.bind(_this2));
	      }
	    };
	    if (source.searchByTitle) {
	      this.extendChoice();
	      source.searchByTitle(object, object.movie.title || object.movie.name);
	    } else if (object.movie.kinopoisk_id && source.searchByKinopoisk) {
	      this.extendChoice();
	      source.searchByKinopoisk(object, object.movie.kinopoisk_id);
	    } else if (object.movie.imdb_id) {
	      letgo(object.movie.imdb_id);
	    } else if (object.movie.source == 'tmdb' || object.movie.source == 'cub') {
	      var tmdburl = (object.movie.name ? 'tv' : 'movie') + '/' + object.movie.id + '/external_ids?api_key=4ef0d7355d9ffb5151e987764708ce96&language=ru';
	      var baseurl = Lampa.TMDB.api(tmdburl);
	      network.timeout(1000 * 10);
	      network.native(baseurl, function (ttid) {
	        letgo(ttid.imdb_id);
	      }, function (a, c) {
	        letgo();
	      });
	    } else {
	      letgo();
	    }
	  };
	  this.getChoice = function (for_balanser) {
	    var data = Lampa.Storage.cache('online_choice_' + (for_balanser || balanser), 3000, {});
	    var save = data[selected_id || object.movie.id] || {};
	    Lampa.Arrays.extend(save, {
	      season: 0,
	      voice: 0,
	      voice_name: '',
	      voice_id: 0,
	      episodes_view: {},
	      movie_view: ''
	    });
	    return save;
	  };
	  this.extendChoice = function () {
	    extended = true;
	    source.extendChoice(this.getChoice());
	  };
	  this.saveChoice = function (choice, for_balanser) {
	    var data = Lampa.Storage.cache('online_choice_' + (for_balanser || balanser), 3000, {});
	    data[selected_id || object.movie.id] = choice;
	    Lampa.Storage.set('online_choice_' + (for_balanser || balanser), data);
	  };

	  /**
	   * Есть похожие карточки
	   * @param {Object} json 
	   */
	  this.similars = function (json) {
	    var _this3 = this;
	    json.forEach(function (elem) {
	      var info = [];
	      var year = ((elem.start_date || elem.year || '') + '').slice(0, 4);
	      if (elem.rating && elem.rating !== 'null' && elem.filmId) info.push(Lampa.Template.get('online_prestige_rate', {
	        rate: elem.rating
	      }, true));
	      if (year) info.push(year);
	      if (elem.countries && elem.countries.length) {
	        info.push((elem.filmId ? elem.countries.map(function (c) {
	          return c.country;
	        }) : elem.countries).join(', '));
	      }
	      if (elem.categories && elem.categories.length) {
	        info.push(elem.categories.slice(0, 4).join(', '));
	      }
	      var name = elem.title || elem.ru_title || elem.en_title || elem.nameRu || elem.nameEn;
	      var orig = elem.orig_title || elem.nameEn || '';
	      elem.title = name + (orig && orig !== name ? ' / ' + orig : '');
	      elem.time = elem.filmLength || '';
	      elem.info = info.join('<span class="online-prestige-split">●</span>');
	      var item = Lampa.Template.get('online_prestige_folder', elem);
	      item.on('hover:enter', function () {
	        _this3.activity.loader(true);
	        _this3.reset();
	        object.search_date = year;
	        selected_id = elem.id;
	        _this3.extendChoice();
	        var kinopoisk_id = elem.kp_id || elem.filmId;
	        if (kinopoisk_id && source.searchByKinopoisk) {
	          source.searchByKinopoisk(object, kinopoisk_id);
	        } else if (source.search) {
	          source.search(object, [elem]);
	        } else {
	          _this3.doesNotAnswer();
	        }
	      }).on('hover:focus', function (e) {
	        last = e.target;
	        scroll.update($(e.target), true);
	      });
	      scroll.append(item);
	    });
	  };
	  this.clearImages = function () {
	    images.forEach(function (img) {
	      img.onerror = function () {};
	      img.onload = function () {};
	      img.src = '';
	    });
	    images = [];
	  };

	  /**
	   * Очистить список файлов
	   */
	  this.reset = function () {
	    last = false;
	    clearInterval(balanser_timer);
	    network.clear();
	    this.clearImages();
	    scroll.render().find('.empty').remove();
	    scroll.clear();
	  };

	  /**
	   * Загрузка
	   */
	  this.loading = function (status) {
	    if (status) this.activity.loader(true);else {
	      this.activity.loader(false);
	      this.activity.toggle();
	    }
	  };

	  /**
	   * Построить фильтр
	   */
	  this.filter = function (filter_items, choice) {
	    var _this4 = this;
	    var select = [];
	    var add = function add(type, title) {
	      var need = _this4.getChoice();
	      var items = filter_items[type];
	      var subitems = [];
	      var value = need[type];
	      items.forEach(function (name, i) {
	        subitems.push({
	          title: name,
	          selected: value == i,
	          index: i
	        });
	      });
	      select.push({
	        title: title,
	        subtitle: items[value],
	        items: subitems,
	        stype: type
	      });
	    };
	    filter_items.source = filter_sources;
	    select.push({
	      title: Lampa.Lang.translate('torrent_parser_reset'),
	      reset: true
	    });
	    this.saveChoice(choice);
	    if (filter_items.voice && filter_items.voice.length) add('voice', Lampa.Lang.translate('torrent_parser_voice'));
	    if (filter_items.season && filter_items.season.length) add('season', Lampa.Lang.translate('torrent_serial_season'));
	    filter.set('filter', select);
	    filter.set('sort', filter_sources.map(function (e) {
	      return {
	        title: e,
	        source: e,
	        selected: e == balanser
	      };
	    }));
	    this.selected(filter_items);
	  };

	  /**
	   * Закрыть фильтр
	   */
	  this.closeFilter = function () {
	    if ($('body').hasClass('selectbox--open')) Lampa.Select.close();
	  };

	  /**
	   * Показать что выбрано в фильтре
	   */
	  this.selected = function (filter_items) {
	    var need = this.getChoice(),
	      select = [];
	    for (var i in need) {
	      if (filter_items[i] && filter_items[i].length) {
	        if (i == 'voice') {
	          select.push(filter_translate[i] + ': ' + filter_items[i][need[i]]);
	        } else if (i !== 'source') {
	          if (filter_items.season.length >= 1) {
	            select.push(filter_translate.season + ': ' + filter_items[i][need[i]]);
	          }
	        }
	      }
	    }
	    filter.chosen('filter', select);
	    filter.chosen('sort', [balanser]);
	  };
	  this.getEpisodes = function (season, call) {
	    var episodes = [];
	    if (typeof object.movie.id == 'number' && object.movie.name) {
	      Lampa.Api.sources.tmdb.get('tv/' + object.movie.id + '/season/' + season, {}, function (data) {
	        episodes = data.episodes || [];
	        call(episodes);
	      }, function () {
	        call(episodes);
	      });
	    } else call(episodes);
	  };

	  /**
	   * Добавить элементы в список
	   */
	  this.append = function (item) {
	    item.on('hover:focus', function (e) {
	      last = e.target;
	      scroll.update($(e.target), true);
	    });
	    scroll.append(item);
	  };
	  this.watched = function (set) {
	    var file_id = Lampa.Utils.hash(object.movie.number_of_seasons ? object.movie.original_name : object.movie.original_title);
	    var watched = Lampa.Storage.cache('online_watched_last', 5000, {});
	    if (set) {
	      if (!watched[file_id]) watched[file_id] = {};
	      Lampa.Arrays.extend(watched[file_id], set, true);
	      Lampa.Storage.set('online_watched_last', watched);
	      this.updateWatched();
	    } else {
	      return watched[file_id];
	    }
	  };
	  this.updateWatched = function () {
	    var watched = this.watched();
	    var body = scroll.body().find('.online-prestige-watched .online-prestige-watched__body').empty();
	    if (watched) {
	      var line = [];
	      if (watched.balanser_name) line.push(watched.balanser_name);
	      if (watched.voice_name) line.push(watched.voice_name);
	      if (watched.season) line.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + watched.season);
	      if (watched.episode) line.push(Lampa.Lang.translate('torrent_serial_episode') + ' ' + watched.episode);
	      line.forEach(function (n) {
	        body.append('<span>' + n + '</span>');
	      });
	    } else body.append('<span>' + Lampa.Lang.translate('online_no_watch_history') + '</span>');
	  };

	  /**
	   * Отрисовка файлов
	   */
	  this.draw = function (items) {
	    var _this5 = this;
	    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    if (!items.length) return this.empty();
	    scroll.append(Lampa.Template.get('online_prestige_watched', {}));
	    this.updateWatched();
	    this.getEpisodes(items[0].season, function (episodes) {
	      var viewed = Lampa.Storage.cache('online_view', 5000, []);
	      var serial = object.movie.name ? true : false;
	      var choice = _this5.getChoice();
	      var fully = window.innerWidth > 480;
	      var scroll_to_element = false;
	      var scroll_to_mark = false;
	      items.forEach(function (element, index) {
	        var episode = serial && episodes.length && !params.similars ? episodes.find(function (e) {
	          return e.episode_number == element.episode;
	        }) : false;
	        var episode_num = element.episode || index + 1;
	        var episode_last = choice.episodes_view[element.season];
	        Lampa.Arrays.extend(element, {
	          info: '',
	          quality: '',
	          time: Lampa.Utils.secondsToTime((episode ? episode.runtime : object.movie.runtime) * 60, true)
	        });
	        var hash_timeline = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title].join('') : object.movie.original_title);
	        var hash_behold = Lampa.Utils.hash(element.season ? [element.season, element.episode, object.movie.original_title, element.voice_name].join('') : object.movie.original_title + element.voice_name);
	        var data = {
	          hash_timeline: hash_timeline,
	          hash_behold: hash_behold
	        };
	        var info = [];
	        if (element.season) {
	          element.translate_episode_end = _this5.getLastEpisode(items);
	          element.translate_voice = element.voice_name;
	        }
	        element.timeline = Lampa.Timeline.view(hash_timeline);
	        if (episode) {
	          element.title = episode.name;
	          if (element.info.length < 30 && episode.vote_average) info.push(Lampa.Template.get('online_prestige_rate', {
	            rate: parseFloat(episode.vote_average + '').toFixed(1)
	          }, true));
	          if (episode.air_date && fully) info.push(Lampa.Utils.parseTime(episode.air_date).full);
	        } else if (object.movie.release_date && fully) {
	          info.push(Lampa.Utils.parseTime(object.movie.release_date).full);
	        }
	        if (!serial && object.movie.tagline && element.info.length < 30) info.push(object.movie.tagline);
	        if (element.info) info.push(element.info);
	        if (info.length) element.info = info.map(function (i) {
	          return '<span>' + i + '</span>';
	        }).join('<span class="online-prestige-split">●</span>');
	        var html = Lampa.Template.get('online_prestige_full', element);
	        var loader = html.find('.online-prestige__loader');
	        var image = html.find('.online-prestige__img');
	        if (!serial) {
	          if (choice.movie_view == hash_behold) scroll_to_element = html;
	        } else if (typeof episode_last !== 'undefined' && episode_last == episode_num) {
	          scroll_to_element = html;
	        }
	        if (serial && !episode) {
	          image.append('<div class="online-prestige__episode-number">' + ('0' + (element.episode || index + 1)).slice(-2) + '</div>');
	          loader.remove();
	        } else {
	          var img = html.find('img')[0];
	          img.onerror = function () {
	            img.src = './img/img_broken.svg';
	          };
	          img.onload = function () {
	            image.addClass('online-prestige__img--loaded');
	            loader.remove();
	            if (serial) image.append('<div class="online-prestige__episode-number">' + ('0' + (element.episode || index + 1)).slice(-2) + '</div>');
	          };
	          img.src = Lampa.TMDB.image('t/p/w300' + (episode ? episode.still_path : object.movie.backdrop_path));
	          images.push(img);
	        }
	        html.find('.online-prestige__timeline').append(Lampa.Timeline.render(element.timeline));
	        if (viewed.indexOf(hash_behold) !== -1) {
	          scroll_to_mark = html;
	          html.find('.online-prestige__img').append('<div class="online-prestige__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
	        }
	        element.mark = function () {
	          viewed = Lampa.Storage.cache('online_view', 5000, []);
	          if (viewed.indexOf(hash_behold) == -1) {
	            viewed.push(hash_behold);
	            Lampa.Storage.set('online_view', viewed);
	            if (html.find('.online-prestige__viewed').length == 0) {
	              html.find('.online-prestige__img').append('<div class="online-prestige__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
	            }
	          }
	          choice = _this5.getChoice();
	          if (!serial) {
	            choice.movie_view = hash_behold;
	          } else {
	            choice.episodes_view[element.season] = episode_num;
	          }
	          _this5.saveChoice(choice);
	          _this5.watched({
	            balanser: balanser,
	            balanser_name: Lampa.Utils.capitalizeFirstLetter(balanser),
	            voice_id: choice.voice_id,
	            voice_name: choice.voice_name || element.voice_name,
	            episode: element.episode,
	            season: element.season
	          });
	        };
	        element.unmark = function () {
	          viewed = Lampa.Storage.cache('online_view', 5000, []);
	          if (viewed.indexOf(hash_behold) !== -1) {
	            Lampa.Arrays.remove(viewed, hash_behold);
	            Lampa.Storage.set('online_view', viewed);
	            if (Lampa.Manifest.app_digital >= 177) Lampa.Storage.remove('online_view', hash_behold);
	            html.find('.online-prestige__viewed').remove();
	          }
	        };
	        element.timeclear = function () {
	          element.timeline.percent = 0;
	          element.timeline.time = 0;
	          element.timeline.duration = 0;
	          Lampa.Timeline.update(element.timeline);
	        };
	        html.on('hover:enter', function () {
	          if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
	          if (params.onEnter) params.onEnter(element, html, data);
	        }).on('hover:focus', function (e) {
	          last = e.target;
	          if (params.onFocus) params.onFocus(element, html, data);
	          scroll.update($(e.target), true);
	        });
	        if (params.onRender) params.onRender(element, html, data);
	        _this5.contextMenu({
	          html: html,
	          element: element,
	          onFile: function onFile(call) {
	            if (params.onContextMenu) params.onContextMenu(element, html, data, call);
	          },
	          onClearAllMark: function onClearAllMark() {
	            items.forEach(function (elem) {
	              elem.unmark();
	            });
	          },
	          onClearAllTime: function onClearAllTime() {
	            items.forEach(function (elem) {
	              elem.timeclear();
	            });
	          }
	        });
	        scroll.append(html);
	      });
	      if (serial && episodes.length > items.length && !params.similars) {
	        var left = episodes.slice(items.length);
	        left.forEach(function (episode) {
	          var info = [];
	          if (episode.vote_average) info.push(Lampa.Template.get('online_prestige_rate', {
	            rate: parseFloat(episode.vote_average + '').toFixed(1)
	          }, true));
	          if (episode.air_date) info.push(Lampa.Utils.parseTime(episode.air_date).full);
	          var air = new Date((episode.air_date + '').replace(/-/g, '/'));
	          var now = Date.now();
	          var day = Math.round((air.getTime() - now) / (24 * 60 * 60 * 1000));
	          var txt = Lampa.Lang.translate('full_episode_days_left') + ': ' + day;
	          var html = Lampa.Template.get('online_prestige_full', {
	            time: Lampa.Utils.secondsToTime((episode ? episode.runtime : object.movie.runtime) * 60, true),
	            info: info.length ? info.map(function (i) {
	              return '<span>' + i + '</span>';
	            }).join('<span class="online-prestige-split">●</span>') : '',
	            title: episode.name,
	            quality: day > 0 ? txt : ''
	          });
	          var loader = html.find('.online-prestige__loader');
	          var image = html.find('.online-prestige__img');
	          var season = items[0] ? items[0].season : 1;
	          html.find('.online-prestige__timeline').append(Lampa.Timeline.render(Lampa.Timeline.view(Lampa.Utils.hash([season, episode.episode_number, object.movie.original_title].join('')))));
	          var img = html.find('img')[0];
	          if (episode.still_path) {
	            img.onerror = function () {
	              img.src = './img/img_broken.svg';
	            };
	            img.onload = function () {
	              image.addClass('online-prestige__img--loaded');
	              loader.remove();
	              image.append('<div class="online-prestige__episode-number">' + ('0' + episode.episode_number).slice(-2) + '</div>');
	            };
	            img.src = Lampa.TMDB.image('t/p/w300' + episode.still_path);
	            images.push(img);
	          } else {
	            loader.remove();
	            image.append('<div class="online-prestige__episode-number">' + ('0' + episode.episode_number).slice(-2) + '</div>');
	          }
	          html.on('hover:focus', function (e) {
	            last = e.target;
	            scroll.update($(e.target), true);
	          });
	          scroll.append(html);
	        });
	      }
	      if (scroll_to_element) {
	        last = scroll_to_element[0];
	      } else if (scroll_to_mark) {
	        last = scroll_to_mark[0];
	      }
	      Lampa.Controller.enable('content');
	    });
	  };

	  /**
	   * Меню
	   */
	  this.contextMenu = function (params) {
	    params.html.on('hover:long', function () {
	      function show(extra) {
	        var enabled = Lampa.Controller.enabled().name;
	        var menu = [];
	        if (Lampa.Platform.is('webos')) {
	          menu.push({
	            title: Lampa.Lang.translate('player_lauch') + ' - Webos',
	            player: 'webos'
	          });
	        }
	        if (Lampa.Platform.is('android')) {
	          menu.push({
	            title: Lampa.Lang.translate('player_lauch') + ' - Android',
	            player: 'android'
	          });
	        }
	        menu.push({
	          title: Lampa.Lang.translate('player_lauch') + ' - Lampa',
	          player: 'lampa'
	        });
	        menu.push({
	          title: Lampa.Lang.translate('online_video'),
	          separator: true
	        });
	        menu.push({
	          title: Lampa.Lang.translate('torrent_parser_label_title'),
	          mark: true
	        });
	        menu.push({
	          title: Lampa.Lang.translate('torrent_parser_label_cancel_title'),
	          unmark: true
	        });
	        menu.push({
	          title: Lampa.Lang.translate('time_reset'),
	          timeclear: true
	        });
	        if (extra) {
	          menu.push({
	            title: Lampa.Lang.translate('copy_link'),
	            copylink: true
	          });
	        }
	        menu.push({
	          title: Lampa.Lang.translate('more'),
	          separator: true
	        });
	        if (Lampa.Account.logged() && params.element && typeof params.element.season !== 'undefined' && params.element.translate_voice) {
	          menu.push({
	            title: Lampa.Lang.translate('online_voice_subscribe'),
	            subscribe: true
	          });
	        }
	        menu.push({
	          title: Lampa.Lang.translate('online_clear_all_marks'),
	          clearallmark: true
	        });
	        menu.push({
	          title: Lampa.Lang.translate('online_clear_all_timecodes'),
	          timeclearall: true
	        });
	        Lampa.Select.show({
	          title: Lampa.Lang.translate('title_action'),
	          items: menu,
	          onBack: function onBack() {
	            Lampa.Controller.toggle(enabled);
	          },
	          onSelect: function onSelect(a) {
	            if (a.mark) params.element.mark();
	            if (a.unmark) params.element.unmark();
	            if (a.timeclear) params.element.timeclear();
	            if (a.clearallmark) params.onClearAllMark();
	            if (a.timeclearall) params.onClearAllTime();
	            Lampa.Controller.toggle(enabled);
	            if (a.player) {
	              Lampa.Player.runas(a.player);
	              params.html.trigger('hover:enter');
	            }
	            if (a.copylink) {
	              if (extra.quality) {
	                var qual = [];
	                for (var i in extra.quality) {
	                  qual.push({
	                    title: i,
	                    file: extra.quality[i]
	                  });
	                }
	                Lampa.Select.show({
	                  title: Lampa.Lang.translate('settings_server_links'),
	                  items: qual,
	                  onBack: function onBack() {
	                    Lampa.Controller.toggle(enabled);
	                  },
	                  onSelect: function onSelect(b) {
	                    Lampa.Utils.copyTextToClipboard(b.file, function () {
	                      Lampa.Noty.show(Lampa.Lang.translate('copy_secuses'));
	                    }, function () {
	                      Lampa.Noty.show(Lampa.Lang.translate('copy_error'));
	                    });
	                  }
	                });
	              } else {
	                Lampa.Utils.copyTextToClipboard(extra.file, function () {
	                  Lampa.Noty.show(Lampa.Lang.translate('copy_secuses'));
	                }, function () {
	                  Lampa.Noty.show(Lampa.Lang.translate('copy_error'));
	                });
	              }
	            }
	            if (a.subscribe) {
	              Lampa.Account.subscribeToTranslation({
	                card: object.movie,
	                season: params.element.season,
	                episode: params.element.translate_episode_end,
	                voice: params.element.translate_voice
	              }, function () {
	                Lampa.Noty.show(Lampa.Lang.translate('online_voice_success'));
	              }, function () {
	                Lampa.Noty.show(Lampa.Lang.translate('online_voice_error'));
	              });
	            }
	          }
	        });
	      }
	      params.onFile(show);
	    }).on('hover:focus', function () {
	      if (Lampa.Helper) Lampa.Helper.show('online_file', Lampa.Lang.translate('helper_online_file'), params.html);
	    });
	  };

	  /**
	   * Показать пустой результат
	   */
	  this.empty = function (msg) {
	    var html = Lampa.Template.get('online_does_not_answer', {});
	    html.find('.online-empty__buttons').remove();
	    html.find('.online-empty__title').text(Lampa.Lang.translate('empty_title_two'));
	    html.find('.online-empty__time').text(Lampa.Lang.translate('empty_text'));
	    scroll.append(html);
	    this.loading(false);
	  };
	  this.doesNotAnswer = function () {
	    var _this6 = this;
	    this.reset();
	    var html = Lampa.Template.get('online_does_not_answer', {
	      balanser: balanser
	    });
	    var tic = 10;
	    html.find('.cancel').on('hover:enter', function () {
	      clearInterval(balanser_timer);
	    });
	    html.find('.change').on('hover:enter', function () {
	      clearInterval(balanser_timer);
	      filter.render().find('.filter--sort').trigger('hover:enter');
	    });
	    scroll.append(html);
	    this.loading(false);
	    balanser_timer = setInterval(function () {
	      tic--;
	      html.find('.timeout').text(tic);
	      if (tic == 0) {
	        clearInterval(balanser_timer);
	        var keys = Lampa.Arrays.getKeys(sources);
	        var indx = keys.indexOf(balanser);
	        var next = keys[indx + 1];
	        if (!next) next = keys[0];
	        balanser = next;
	        if (Lampa.Activity.active().activity == _this6.activity) _this6.changeBalanser(balanser);
	      }
	    }, 1000);
	  };
	  this.getLastEpisode = function (items) {
	    var last_episode = 0;
	    items.forEach(function (e) {
	      if (typeof e.episode !== 'undefined') last_episode = Math.max(last_episode, parseInt(e.episode));
	    });
	    return last_episode;
	  };

	  /**
	   * Начать навигацию по файлам
	   */
	  this.start = function () {
	    if (Lampa.Activity.active().activity !== this.activity) return;
	    if (!initialized) {
	      initialized = true;
	      this.initialize();
	    }
	    Lampa.Background.immediately(Lampa.Utils.cardImgBackgroundBlur(object.movie));
	    Lampa.Controller.add('content', {
	      toggle: function toggle() {
	        Lampa.Controller.collectionSet(scroll.render(), files.render());
	        Lampa.Controller.collectionFocus(last || false, scroll.render());
	      },
	      up: function up() {
	        if (Navigator.canmove('up')) {
	          Navigator.move('up');
	        } else Lampa.Controller.toggle('head');
	      },
	      down: function down() {
	        Navigator.move('down');
	      },
	      right: function right() {
	        if (Navigator.canmove('right')) Navigator.move('right');else filter.show(Lampa.Lang.translate('title_filter'), 'filter');
	      },
	      left: function left() {
	        if (Navigator.canmove('left')) Navigator.move('left');else Lampa.Controller.toggle('menu');
	      },
	      gone: function gone() {
	        clearInterval(balanser_timer);
	      },
	      back: this.back
	    });
	    Lampa.Controller.toggle('content');
	  };
	  this.render = function () {
	    return files.render();
	  };
	  this.back = function () {
	    Lampa.Activity.backward();
	  };
	  this.pause = function () {};
	  this.stop = function () {};
	  this.destroy = function () {
	    network.clear();
	    this.clearImages();
	    files.destroy();
	    scroll.destroy();
	    clearInterval(balanser_timer);
	    if (source) source.destroy();
	  };
	}

	function startPlugin() {
	  window.online_prestige = true;
	  var manifest = {
	    type: 'video',
	    version: '1.0.9',
	    name: 'Онлайн - Prestige',
	    description: 'Плагин для просмотра онлайн сериалов и фильмов',
	    component: 'online_prestige',
	    onContextMenu: function onContextMenu(object) {
	      return {
	        name: Lampa.Lang.translate('online_watch'),
	        description: ''
	      };
	    },
	    onContextLauch: function onContextLauch(object) {
	      resetTemplates();
	      Lampa.Component.add('online_prestige', component);
	      Lampa.Activity.push({
	        url: '',
	        title: Lampa.Lang.translate('title_online'),
	        component: 'online_prestige',
	        search: object.title,
	        search_one: object.title,
	        search_two: object.original_title,
	        movie: object,
	        page: 1
	      });
	    }
	  };
	  Lampa.Manifest.plugins = manifest;
	  Lampa.Lang.add({
	    online_watch: {
	      ru: 'Смотреть онлайн',
	      en: 'Watch online',
	      ua: 'Дивитися онлайн',
	      zh: '在线观看'
	    },
	    online_no_watch_history: {
	      ru: 'Нет истории просмотра',
	      en: 'No browsing history',
	      ua: 'Немає історії перегляду',
	      zh: '没有浏览历史'
	    },
	    online_video: {
	      ru: 'Видео',
	      en: 'Video',
	      ua: 'Відео',
	      zh: '视频'
	    },
	    online_nolink: {
	      ru: 'Не удалось извлечь ссылку',
	      uk: 'Неможливо отримати посилання',
	      en: 'Failed to fetch link',
	      zh: '获取链接失败'
	    },
	    online_waitlink: {
	      ru: 'Работаем над извлечением ссылки, подождите...',
	      uk: 'Працюємо над отриманням посилання, зачекайте...',
	      en: 'Working on extracting the link, please wait...',
	      zh: '正在提取链接，请稍候...'
	    },
	    online_balanser: {
	      ru: 'Балансер',
	      uk: 'Балансер',
	      en: 'Balancer',
	      zh: '平衡器'
	    },
	    helper_online_file: {
	      ru: 'Удерживайте клавишу "ОК" для вызова контекстного меню',
	      uk: 'Утримуйте клавішу "ОК" для виклику контекстного меню',
	      en: 'Hold the "OK" key to bring up the context menu',
	      zh: '按住“确定”键调出上下文菜单'
	    },
	    online_query_start: {
	      ru: 'По запросу',
	      uk: 'На запит',
	      en: 'On request',
	      zh: '根据要求'
	    },
	    online_query_end: {
	      ru: 'нет результатов',
	      uk: 'немає результатів',
	      en: 'no results',
	      zh: '没有结果'
	    },
	    title_online: {
	      ru: 'Онлайн',
	      uk: 'Онлайн',
	      en: 'Online',
	      zh: '在线的'
	    },
	    title_proxy: {
	      ru: 'Прокси',
	      uk: 'Проксі',
	      en: 'Proxy',
	      zh: '代理人'
	    },
	    online_proxy_title: {
	      ru: 'Основной прокси',
	      uk: 'Основний проксі',
	      en: 'Main proxy',
	      zh: '主要代理'
	    },
	    online_proxy_descr: {
	      ru: 'Будет использоваться для всех балансеров',
	      uk: 'Використовуватиметься для всіх балансерів',
	      en: 'Will be used for all balancers',
	      zh: '将用于所有平衡器'
	    },
	    online_proxy_placeholder: {
	      ru: 'Например: http://proxy.com',
	      uk: 'Наприклад: http://proxy.com',
	      en: 'For example: http://proxy.com',
	      zh: '例如：http://proxy.com'
	    },
	    filmix_param_add_title: {
	      ru: 'Добавить ТОКЕН от Filmix',
	      uk: 'Додати ТОКЕН від Filmix',
	      en: 'Add TOKEN from Filmix',
	      zh: '从 Filmix 添加 TOKEN'
	    },
	    filmix_param_add_descr: {
	      ru: 'Добавьте ТОКЕН для подключения подписки',
	      uk: 'Додайте ТОКЕН для підключення передплати',
	      en: 'Add a TOKEN to connect a subscription',
	      zh: '添加 TOKEN 以连接订阅'
	    },
	    filmix_param_placeholder: {
	      ru: 'Например: nxjekeb57385b..',
	      uk: 'Наприклад: nxjekeb57385b..',
	      en: 'For example: nxjekeb57385b..',
	      zh: '例如：nxjekeb57385b..'
	    },
	    filmix_param_add_device: {
	      ru: 'Добавить устройство на Filmix',
	      uk: 'Додати пристрій на Filmix',
	      en: 'Add Device to Filmix',
	      zh: '将设备添加到 Filmix'
	    },
	    filmix_modal_text: {
	      ru: 'Введите его на странице https://filmix.ac/consoles в вашем авторизованном аккаунте!',
	      uk: 'Введіть його на сторінці https://filmix.ac/consoles у вашому авторизованому обліковому записі!',
	      en: 'Enter it at https://filmix.ac/consoles in your authorized account!',
	      zh: '在您的授权帐户中的 https://filmix.ac/consoles 中输入！'
	    },
	    filmix_modal_wait: {
	      ru: 'Ожидаем код',
	      uk: 'Очікуємо код',
	      en: 'Waiting for the code',
	      zh: '我们正在等待代码'
	    },
	    filmix_copy_secuses: {
	      ru: 'Код скопирован в буфер обмена',
	      uk: 'Код скопійовано в буфер обміну',
	      en: 'Code copied to clipboard',
	      zh: '代码复制到剪贴板'
	    },
	    filmix_copy_fail: {
	      ru: 'Ошибка при копировании',
	      uk: 'Помилка при копіюванні',
	      en: 'Copy error',
	      zh: '复制错误'
	    },
	    filmix_nodevice: {
	      ru: 'Устройство не авторизовано',
	      uk: 'Пристрій не авторизований',
	      en: 'Device not authorized',
	      zh: '设备未授权'
	    },
	    title_status: {
	      ru: 'Статус',
	      uk: 'Статус',
	      en: 'Status',
	      zh: '地位'
	    },
	    online_voice_subscribe: {
	      ru: 'Подписаться на перевод',
	      uk: 'Підписатися на переклад',
	      en: 'Subscribe to translation',
	      zh: '订阅翻译'
	    },
	    online_voice_success: {
	      ru: 'Вы успешно подписались',
	      uk: 'Ви успішно підписалися',
	      en: 'You have successfully subscribed',
	      zh: '您已成功订阅'
	    },
	    online_voice_error: {
	      ru: 'Возникла ошибка',
	      uk: 'Виникла помилка',
	      en: 'An error has occurred',
	      zh: '发生了错误'
	    },
	    online_clear_all_marks: {
	      ru: 'Очистить все метки',
	      uk: 'Очистити всі мітки',
	      en: 'Clear all labels',
	      zh: '清除所有标签'
	    },
	    online_clear_all_timecodes: {
	      ru: 'Очистить все тайм-коды',
	      uk: 'Очистити всі тайм-коди',
	      en: 'Clear all timecodes',
	      zh: '清除所有时间代码'
	    },
	    online_change_balanser: {
	      ru: 'Изменить балансер',
	      uk: 'Змінити балансер',
	      en: 'Change balancer',
	      zh: '更改平衡器'
	    },
	    online_balanser_dont_work: {
	      ru: 'Балансер ({balanser}) не отвечает на запрос.',
	      uk: 'Балансер ({balanser}) не відповідає на запит.',
	      en: 'Balancer ({balanser}) does not respond to the request.',
	      zh: '平衡器（{balanser}）未响应请求。'
	    },
	    online_balanser_timeout: {
	      ru: 'Балансер будет переключен автоматически через <span class="timeout">10</span> секунд.',
	      uk: 'Балансер буде переключено автоматично через <span class="timeout">10</span> секунд.',
	      en: 'Balancer will be switched automatically in <span class="timeout">10</span> seconds.',
	      zh: '平衡器将在<span class="timeout">10</span>秒内自动切换。'
	    }
	  });
	  Lampa.Template.add('online_prestige_css', "\n        <style>\n        @charset 'UTF-8';.online-prestige{position:relative;-webkit-border-radius:.3em;border-radius:.3em;background-color:rgba(0,0,0,0.3);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;will-change:transform}.online-prestige__body{padding:1.2em;line-height:1.3;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;position:relative}@media screen and (max-width:480px){.online-prestige__body{padding:.8em 1.2em}}.online-prestige__img{position:relative;width:13em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;min-height:8.2em}.online-prestige__img>img{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;-webkit-border-radius:.3em;border-radius:.3em;opacity:0;-webkit-transition:opacity .3s;-o-transition:opacity .3s;transition:opacity .3s}.online-prestige__img--loaded>img{opacity:1}@media screen and (max-width:480px){.online-prestige__img{width:7em;min-height:6em}}.online-prestige__folder{padding:1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.online-prestige__folder>svg{width:4.4em !important;height:4.4em !important}.online-prestige__viewed{position:absolute;top:1em;left:1em;background:rgba(0,0,0,0.45);-webkit-border-radius:100%;border-radius:100%;padding:.25em;font-size:.76em}.online-prestige__viewed>svg{width:1.5em !important;height:1.5em !important}.online-prestige__episode-number{position:absolute;top:0;left:0;right:0;bottom:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;font-size:2em}.online-prestige__loader{position:absolute;top:50%;left:50%;width:2em;height:2em;margin-left:-1em;margin-top:-1em;background:url(./img/loader.svg) no-repeat center center;background-size:contain}.online-prestige__head,.online-prestige__footer{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.online-prestige__timeline{margin:.8em 0}.online-prestige__timeline>.time-line{display:block !important}.online-prestige__title{font-size:1.7em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}@media screen and (max-width:480px){.online-prestige__title{font-size:1.4em}}.online-prestige__time{padding-left:2em}.online-prestige__info{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.online-prestige__info>*{overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}.online-prestige__quality{padding-left:1em;white-space:nowrap}.online-prestige__scan-file{position:absolute;bottom:0;left:0;right:0}.online-prestige__scan-file .broadcast__scan{margin:0}.online-prestige .online-prestige-split{font-size:.8em;margin:0 1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.online-prestige.focus::after{content:'';position:absolute;top:-0.6em;left:-0.6em;right:-0.6em;bottom:-0.6em;-webkit-border-radius:.7em;border-radius:.7em;border:solid .3em #fff;z-index:-1;pointer-events:none}.online-prestige+.online-prestige{margin-top:1.5em}.online-prestige--folder .online-prestige__footer{margin-top:.8em}.online-prestige-watched{padding:1em}.online-prestige-watched__icon>svg{width:1.5em;height:1.5em}.online-prestige-watched__body{padding-left:1em;padding-top:.1em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.online-prestige-watched__body>span+span::before{content:' ● ';vertical-align:top;display:inline-block;margin:0 .5em}.online-prestige-rate{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.online-prestige-rate>svg{width:1.3em !important;height:1.3em !important}.online-prestige-rate>span{font-weight:600;font-size:1.1em;padding-left:.7em}.online-empty{line-height:1.4}.online-empty__title{font-size:1.8em;margin-bottom:.3em}.online-empty__time{font-size:1.2em;font-weight:300;margin-bottom:1.6em}.online-empty__buttons{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.online-empty__buttons>*+*{margin-left:1em}.online-empty__button{background:rgba(0,0,0,0.3);font-size:1.2em;padding:.5em 1.2em;-webkit-border-radius:.2em;border-radius:.2em;margin-bottom:2.4em}.online-empty__button.focus{background:#fff;color:black}.online-empty__templates .online-empty-template:nth-child(2){opacity:.5}.online-empty__templates .online-empty-template:nth-child(3){opacity:.2}.online-empty-template{background-color:rgba(255,255,255,0.3);padding:1em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-border-radius:.3em;border-radius:.3em}.online-empty-template>*{background:rgba(0,0,0,0.3);-webkit-border-radius:.3em;border-radius:.3em}.online-empty-template__ico{width:4em;height:4em;margin-right:2.4em}.online-empty-template__body{height:1.7em;width:70%}.online-empty-template+.online-empty-template{margin-top:1em}\n        </style>\n    ");
	  $('body').append(Lampa.Template.get('online_prestige_css', {}, true));
	  function resetTemplates() {
	    Lampa.Template.add('online_prestige_full', "<div class=\"online-prestige online-prestige--full selector\">\n            <div class=\"online-prestige__img\">\n                <img alt=\"\">\n                <div class=\"online-prestige__loader\"></div>\n            </div>\n            <div class=\"online-prestige__body\">\n                <div class=\"online-prestige__head\">\n                    <div class=\"online-prestige__title\">{title}</div>\n                    <div class=\"online-prestige__time\">{time}</div>\n                </div>\n\n                <div class=\"online-prestige__timeline\"></div>\n\n                <div class=\"online-prestige__footer\">\n                    <div class=\"online-prestige__info\">{info}</div>\n                    <div class=\"online-prestige__quality\">{quality}</div>\n                </div>\n            </div>\n        </div>");
	    Lampa.Template.add('online_does_not_answer', "<div class=\"online-empty\">\n            <div class=\"online-empty__title\">\n                #{online_balanser_dont_work}\n            </div>\n            <div class=\"online-empty__time\">\n                #{online_balanser_timeout}\n            </div>\n            <div class=\"online-empty__buttons\">\n                <div class=\"online-empty__button selector cancel\">#{cancel}</div>\n                <div class=\"online-empty__button selector change\">#{online_change_balanser}</div>\n            </div>\n            <div class=\"online-empty__templates\">\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n            </div>\n        </div>");
	    Lampa.Template.add('online_prestige_rate', "<div class=\"online-prestige-rate\">\n            <svg width=\"17\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M8.39409 0.192139L10.99 5.30994L16.7882 6.20387L12.5475 10.4277L13.5819 15.9311L8.39409 13.2425L3.20626 15.9311L4.24065 10.4277L0 6.20387L5.79819 5.30994L8.39409 0.192139Z\" fill=\"#fff\"></path>\n            </svg>\n            <span>{rate}</span>\n        </div>");
	    Lampa.Template.add('online_prestige_folder', "<div class=\"online-prestige online-prestige--folder selector\">\n            <div class=\"online-prestige__folder\">\n                <svg viewBox=\"0 0 128 112\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect y=\"20\" width=\"128\" height=\"92\" rx=\"13\" fill=\"white\"></rect>\n                    <path d=\"M29.9963 8H98.0037C96.0446 3.3021 91.4079 0 86 0H42C36.5921 0 31.9555 3.3021 29.9963 8Z\" fill=\"white\" fill-opacity=\"0.23\"></path>\n                    <rect x=\"11\" y=\"8\" width=\"106\" height=\"76\" rx=\"13\" fill=\"white\" fill-opacity=\"0.51\"></rect>\n                </svg>\n            </div>\n            <div class=\"online-prestige__body\">\n                <div class=\"online-prestige__head\">\n                    <div class=\"online-prestige__title\">{title}</div>\n                    <div class=\"online-prestige__time\">{time}</div>\n                </div>\n\n                <div class=\"online-prestige__footer\">\n                    <div class=\"online-prestige__info\">{info}</div>\n                </div>\n            </div>\n        </div>");
	    Lampa.Template.add('online_prestige_watched', "<div class=\"online-prestige online-prestige-watched selector\">\n            <div class=\"online-prestige-watched__icon\">\n                <svg width=\"21\" height=\"21\" viewBox=\"0 0 21 21\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <circle cx=\"10.5\" cy=\"10.5\" r=\"9\" stroke=\"currentColor\" stroke-width=\"3\"/>\n                    <path d=\"M14.8477 10.5628L8.20312 14.399L8.20313 6.72656L14.8477 10.5628Z\" fill=\"currentColor\"/>\n                </svg>\n            </div>\n            <div class=\"online-prestige-watched__body\">\n                \n            </div>\n        </div>");
	  }
	  var button = "<div class=\"full-start__button selector view--online\" data-subtitle=\"Prestige v".concat(manifest.version, "\">\n        <svg width=\"135\" height=\"147\" viewBox=\"0 0 135 147\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M121.5 96.8823C139.5 86.49 139.5 60.5092 121.5 50.1169L41.25 3.78454C23.25 -6.60776 0.750004 6.38265 0.750001 27.1673L0.75 51.9742C4.70314 35.7475 23.6209 26.8138 39.0547 35.7701L94.8534 68.1505C110.252 77.0864 111.909 97.8693 99.8725 109.369L121.5 96.8823Z\" fill=\"currentColor\"/>\n            <path d=\"M63 84.9836C80.3333 94.991 80.3333 120.01 63 130.017L39.75 143.44C22.4167 153.448 0.749999 140.938 0.75 120.924L0.750001 94.0769C0.750002 74.0621 22.4167 61.5528 39.75 71.5602L63 84.9836Z\" fill=\"currentColor\"/>\n        </svg>\n\n        <span>#{title_online}</span>\n    </div>");

	  // нужна заглушка, а то при страте лампы говорит пусто
	  Lampa.Component.add('online_prestige', component);

	  //то же самое
	  resetTemplates();
	  Lampa.Listener.follow('full', function (e) {
	    if (e.type == 'complite') {
	      var btn = $(Lampa.Lang.translate(button));
	      btn.on('hover:enter', function () {
	        resetTemplates();
	        Lampa.Component.add('online_prestige', component);
	        Lampa.Activity.push({
	          url: '',
	          title: Lampa.Lang.translate('title_online'),
	          component: 'online_prestige',
	          search: e.data.movie.title,
	          search_one: e.data.movie.title,
	          search_two: e.data.movie.original_title,
	          movie: e.data.movie,
	          page: 1
	        });
	      });
	      e.object.activity.render().find('.view--torrent').after(btn);
	    }
	  });

	  ///////ONLINE/////////

	  Lampa.Params.select('online_proxy_all', '', '');
	  Lampa.Params.select('online_proxy_videocdn', '', '');
	  Lampa.Params.select('online_proxy_rezka', '', '');
	  Lampa.Params.select('online_proxy_kinobase', '', '');
	  Lampa.Params.select('online_proxy_collaps', '', '');
	  Lampa.Template.add('settings_proxy', "<div>\n        <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_all\" placeholder=\"#{online_proxy_placeholder}\">\n            <div class=\"settings-param__name\">#{online_proxy_title}</div>\n            <div class=\"settings-param__value\"></div>\n            <div class=\"settings-param__descr\">#{online_proxy_descr}</div>\n        </div>\n\n        <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_videocdn\" placeholder=\"#{online_proxy_placeholder}\">\n            <div class=\"settings-param__name\">Videocdn</div>\n            <div class=\"settings-param__value\"></div>\n        </div>\n\n        <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_rezka\" placeholder=\"#{online_proxy_placeholder}\">\n            <div class=\"settings-param__name\">Rezka</div>\n            <div class=\"settings-param__value\"></div>\n        </div>\n\n        <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_kinobase\" placeholder=\"#{online_proxy_placeholder}\">\n            <div class=\"settings-param__name\">Kinobase</div>\n            <div class=\"settings-param__value\"></div>\n        </div>\n\n        <div class=\"settings-param selector\" data-type=\"input\" data-name=\"online_proxy_collaps\" placeholder=\"#{online_proxy_placeholder}\">\n            <div class=\"settings-param__name\">Collaps</div>\n            <div class=\"settings-param__value\"></div>\n        </div>\n    </div>");
	  function addSettingsProxy() {
	    if (Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="proxy"]').length) {
	      var field = $(Lampa.Lang.translate("<div class=\"settings-folder selector\" data-component=\"proxy\">\n                <div class=\"settings-folder__icon\">\n                    <svg height=\"46\" viewBox=\"0 0 42 46\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"1.5\" y=\"26.5\" width=\"39\" height=\"18\" rx=\"1.5\" stroke=\"white\" stroke-width=\"3\"/>\n                    <circle cx=\"9.5\" cy=\"35.5\" r=\"3.5\" fill=\"white\"/>\n                    <circle cx=\"26.5\" cy=\"35.5\" r=\"2.5\" fill=\"white\"/>\n                    <circle cx=\"32.5\" cy=\"35.5\" r=\"2.5\" fill=\"white\"/>\n                    <circle cx=\"21.5\" cy=\"5.5\" r=\"5.5\" fill=\"white\"/>\n                    <rect x=\"31\" y=\"4\" width=\"11\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                    <rect y=\"4\" width=\"11\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                    <rect x=\"20\" y=\"14\" width=\"3\" height=\"7\" rx=\"1.5\" fill=\"white\"/>\n                    </svg>\n                </div>\n                <div class=\"settings-folder__name\">#{title_proxy}</div>\n            </div>"));
	      Lampa.Settings.main().render().find('[data-component="more"]').after(field);
	      Lampa.Settings.main().update();
	    }
	  }
	  if (window.appready) addSettingsProxy();else {
	    Lampa.Listener.follow('app', function (e) {
	      if (e.type == 'ready') addSettingsProxy();
	    });
	  }

	  ///////FILMIX/////////

	  var network = new Lampa.Reguest();
	  var api_url = 'http://filmixapp.cyou/api/v2/';
	  var user_dev = '?user_dev_apk=1.1.3&user_dev_id=' + Lampa.Utils.uid(16) + '&user_dev_name=Xiaomi&user_dev_os=11&user_dev_vendor=Xiaomi&user_dev_token=';
	  var ping_auth;
	  Lampa.Params.select('filmix_token', '', '');
	  Lampa.Template.add('settings_filmix', "<div>\n        <div class=\"settings-param selector\" data-name=\"filmix_token\" data-type=\"input\" placeholder=\"#{filmix_param_placeholder}\">\n            <div class=\"settings-param__name\">#{filmix_param_add_title}</div>\n            <div class=\"settings-param__value\"></div>\n            <div class=\"settings-param__descr\">#{filmix_param_add_descr}</div>\n        </div>\n        <div class=\"settings-param selector\" data-name=\"filmix_add\" data-static=\"true\">\n            <div class=\"settings-param__name\">#{filmix_param_add_device}</div>\n        </div>\n    </div>");
	  Lampa.Storage.listener.follow('change', function (e) {
	    if (e.name == 'filmix_token') {
	      if (e.value) checkPro(e.value);else {
	        Lampa.Storage.set("filmix_status", {});
	        showStatus();
	      }
	    }
	  });
	  function setFilmixQuality() {
	    var timeZone = 'Europe/Kiev';
	    var quality = 480;
	    try {
	      var formatter = new Intl.DateTimeFormat('uk-UA', {
	        hour: 'numeric',
	        timeZone: timeZone
	      });
	      var currentTime = formatter.format(new Date());
	      quality = parseInt(currentTime) >= 19 && parseInt(currentTime) <= 23 ? 480 : 720;
	    } catch (e) {}
	    if (!window.filmix) {
	      window.filmix = {
	        max_qualitie: quality,
	        is_max_qualitie: false
	      };
	    } else {
	      if (window.filmix.max_qualitie == 720 || window.filmix.max_qualitie == 480) window.filmix.max_qualitie = quality;
	    }
	  }
	  setInterval(setFilmixQuality, 10000);
	  function addSettingsFilmix() {
	    if (Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="filmix"]').length) {
	      var field = $("<div class=\"settings-folder selector\" data-component=\"filmix\">\n                <div class=\"settings-folder__icon\">\n                    <svg height=\"57\" viewBox=\"0 0 58 57\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M20 20.3735V45H26.8281V34.1262H36.724V26.9806H26.8281V24.3916C26.8281 21.5955 28.9062 19.835 31.1823 19.835H39V13H26.8281C23.6615 13 20 15.4854 20 20.3735Z\" fill=\"white\"/>\n                    <rect x=\"2\" y=\"2\" width=\"54\" height=\"53\" rx=\"5\" stroke=\"white\" stroke-width=\"4\"/>\n                    </svg>\n                </div>\n                <div class=\"settings-folder__name\">Filmix</div>\n            </div>");
	      Lampa.Settings.main().render().find('[data-component="more"]').after(field);
	      Lampa.Settings.main().update();
	    }
	  }
	  if (window.appready) addSettingsFilmix();else {
	    Lampa.Listener.follow('app', function (e) {
	      if (e.type == 'ready') addSettingsFilmix();
	    });
	  }
	  setFilmixQuality();
	  Lampa.Settings.listener.follow('open', function (e) {
	    if (e.name == 'filmix') {
	      e.body.find('[data-name="filmix_add"]').unbind('hover:enter').on('hover:enter', function () {
	        var user_code = '';
	        var user_token = '';
	        var modal = $('<div><div class="broadcast__text">' + Lampa.Lang.translate('filmix_modal_text') + '</div><div class="broadcast__device selector" style="text-align: center">' + Lampa.Lang.translate('filmix_modal_wait') + '...</div><br><div class="broadcast__scan"><div></div></div></div></div>');
	        Lampa.Modal.open({
	          title: '',
	          html: modal,
	          onBack: function onBack() {
	            Lampa.Modal.close();
	            Lampa.Controller.toggle('settings_component');
	            clearInterval(ping_auth);
	          },
	          onSelect: function onSelect() {
	            Lampa.Utils.copyTextToClipboard(user_code, function () {
	              Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_secuses'));
	            }, function () {
	              Lampa.Noty.show(Lampa.Lang.translate('filmix_copy_fail'));
	            });
	          }
	        });
	        ping_auth = setInterval(function () {
	          checkPro(user_token, function () {
	            Lampa.Modal.close();
	            clearInterval(ping_auth);
	            Lampa.Storage.set("filmix_token", user_token);
	            e.body.find('[data-name="filmix_token"] .settings-param__value').text(user_token);
	            Lampa.Controller.toggle('settings_component');
	          });
	        }, 10000);
	        network.clear();
	        network.timeout(10000);
	        network.quiet(api_url + 'token_request' + user_dev, function (found) {
	          if (found.status == 'ok') {
	            user_token = found.code;
	            user_code = found.user_code;
	            modal.find('.selector').text(user_code);
	          } else {
	            Lampa.Noty.show(found);
	          }
	        }, function (a, c) {
	          Lampa.Noty.show(network.errorDecode(a, c));
	        });
	      });
	      showStatus();
	    }
	  });
	  function showStatus() {
	    var status = Lampa.Storage.get("filmix_status", '{}');
	    var info = Lampa.Lang.translate('filmix_nodevice');
	    if (status.login) {
	      if (status.is_pro) info = status.login + ' - PRO ' + Lampa.Lang.translate('filter_rating_to') + ' - ' + status.pro_date;else if (status.is_pro_plus) info = status.login + ' - PRO_PLUS ' + Lampa.Lang.translate('filter_rating_to') + ' - ' + status.pro_date;else info = status.login + ' - NO PRO';
	    }
	    var field = $(Lampa.Lang.translate("\n            <div class=\"settings-param\" data-name=\"filmix_status\" data-static=\"true\">\n                <div class=\"settings-param__name\">#{title_status}</div>\n                <div class=\"settings-param__value\">".concat(info, "</div>\n            </div>")));
	    $('.settings [data-name="filmix_status"]').remove();
	    $('.settings [data-name="filmix_add"]').after(field);
	  }
	  function checkPro(token, call) {
	    network.clear();
	    network.timeout(8000);
	    network.silent(api_url + 'user_profile' + user_dev + token, function (json) {
	      if (json) {
	        if (json.user_data) {
	          Lampa.Storage.set("filmix_status", json.user_data);
	          if (call) call();
	        } else {
	          Lampa.Storage.set("filmix_status", {});
	        }
	        showStatus();
	      }
	    }, function (a, c) {
	      Lampa.Noty.show(network.errorDecode(a, c));
	    });
	  }
	  if (Lampa.Manifest.app_digital >= 177) {
	    Lampa.Storage.sync('online_choice_videocdn', 'object_object');
	    Lampa.Storage.sync('online_choice_rezka', 'object_object');
	    Lampa.Storage.sync('online_choice_kinobase', 'object_object');
	    Lampa.Storage.sync('online_choice_collaps', 'object_object');
	    Lampa.Storage.sync('online_choice_filmix', 'object_object');
	    Lampa.Storage.sync('online_watched_last', 'object_object');
	  }
	}
	if (!window.online_prestige && Lampa.Manifest.app_digital >= 155) startPlugin();

})();
