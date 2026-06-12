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

	var fails$G = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$F = fails$G;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$F(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
	});

	var fails$E = fails$G;

	var functionBindNative = !fails$E(function () {
	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
	  var test = function () { /* empty */ }.bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$3 = functionBindNative;

	var call$s = Function.prototype.call;
	// eslint-disable-next-line es/no-function-prototype-bind -- safe
	var functionCall = NATIVE_BIND$3 ? call$s.bind(call$s) : function () {
	  return call$s.apply(call$s, arguments);
	};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$4 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$4 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$4(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable$1;

	var createPropertyDescriptor$6 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var NATIVE_BIND$2 = functionBindNative;

	var FunctionPrototype$2 = Function.prototype;
	var call$r = FunctionPrototype$2.call;
	// eslint-disable-next-line es/no-function-prototype-bind -- safe
	var uncurryThisWithBind = NATIVE_BIND$2 && FunctionPrototype$2.bind.bind(call$r, call$r);

	var functionUncurryThis = NATIVE_BIND$2 ? uncurryThisWithBind : function (fn) {
	  return function () {
	    return call$r.apply(fn, arguments);
	  };
	};

	var uncurryThis$G = functionUncurryThis;

	var toString$g = uncurryThis$G({}.toString);
	var stringSlice$b = uncurryThis$G(''.slice);

	var classofRaw$2 = function (it) {
	  return stringSlice$b(toString$g(it), 8, -1);
	};

	var uncurryThis$F = functionUncurryThis;
	var fails$D = fails$G;
	var classof$e = classofRaw$2;

	var $Object$4 = Object;
	var split$3 = uncurryThis$F(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$D(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object$4('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$e(it) === 'String' ? split$3(it, '') : $Object$4(it);
	} : $Object$4;

	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	var isNullOrUndefined$4 = function (it) {
	  return it === null || it === undefined;
	};

	var isNullOrUndefined$3 = isNullOrUndefined$4;

	var $TypeError$j = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$b = function (it) {
	  if (isNullOrUndefined$3(it)) throw new $TypeError$j("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$3 = indexedObject;
	var requireObjectCoercible$a = requireObjectCoercible$b;

	var toIndexedObject$9 = function (it) {
	  return IndexedObject$3(requireObjectCoercible$a(it));
	};

	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
	var documentAll = typeof document == 'object' && document.all;

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
	var isCallable$p = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
	  return typeof argument == 'function' || argument === documentAll;
	} : function (argument) {
	  return typeof argument == 'function';
	};

	var isCallable$o = isCallable$p;

	var isObject$n = function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$o(it);
	};

	var globalThis$D = globalThis_1;
	var isCallable$n = isCallable$p;

	var aFunction = function (argument) {
	  return isCallable$n(argument) ? argument : undefined;
	};

	var getBuiltIn$9 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(globalThis$D[namespace]) : globalThis$D[namespace] && globalThis$D[namespace][method];
	};

	var uncurryThis$E = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$E({}.isPrototypeOf);

	var globalThis$C = globalThis_1;

	var navigator = globalThis$C.navigator;
	var userAgent$7 = navigator && navigator.userAgent;

	var environmentUserAgent = userAgent$7 ? String(userAgent$7) : '';

	var globalThis$B = globalThis_1;
	var userAgent$6 = environmentUserAgent;

	var process$3 = globalThis$B.process;
	var Deno$1 = globalThis$B.Deno;
	var versions = process$3 && process$3.versions || Deno$1 && Deno$1.version;
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
	if (!version && userAgent$6) {
	  match = userAgent$6.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent$6.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var environmentV8Version = version;

	/* eslint-disable es/no-symbol -- required for testing */
	var V8_VERSION$3 = environmentV8Version;
	var fails$C = fails$G;
	var globalThis$A = globalThis_1;

	var $String$6 = globalThis$A.String;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$C(function () {
	  var symbol = Symbol('symbol detection');
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
	  // of course, fail.
	  return !$String$6(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */
	var NATIVE_SYMBOL$1 = symbolConstructorDetection;

	var useSymbolAsUid = NATIVE_SYMBOL$1 &&
	  !Symbol.sham &&
	  typeof Symbol.iterator == 'symbol';

	var getBuiltIn$8 = getBuiltIn$9;
	var isCallable$m = isCallable$p;
	var isPrototypeOf$6 = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var $Object$3 = Object;

	var isSymbol$3 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$8('Symbol');
	  return isCallable$m($Symbol) && isPrototypeOf$6($Symbol.prototype, $Object$3(it));
	};

	var $String$5 = String;

	var tryToString$6 = function (argument) {
	  try {
	    return $String$5(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var isCallable$l = isCallable$p;
	var tryToString$5 = tryToString$6;

	var $TypeError$i = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$c = function (argument) {
	  if (isCallable$l(argument)) return argument;
	  throw new $TypeError$i(tryToString$5(argument) + ' is not a function');
	};

	var aCallable$b = aCallable$c;
	var isNullOrUndefined$2 = isNullOrUndefined$4;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$7 = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined$2(func) ? undefined : aCallable$b(func);
	};

	var call$q = functionCall;
	var isCallable$k = isCallable$p;
	var isObject$m = isObject$n;

	var $TypeError$h = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$k(fn = input.toString) && !isObject$m(val = call$q(fn, input))) return val;
	  if (isCallable$k(fn = input.valueOf) && !isObject$m(val = call$q(fn, input))) return val;
	  if (pref !== 'string' && isCallable$k(fn = input.toString) && !isObject$m(val = call$q(fn, input))) return val;
	  throw new $TypeError$h("Can't convert object to primitive value");
	};

	var sharedStore = {exports: {}};

	var isPure = false;

	var globalThis$z = globalThis_1;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$7 = Object.defineProperty;

	var defineGlobalProperty$3 = function (key, value) {
	  try {
	    defineProperty$7(globalThis$z, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    globalThis$z[key] = value;
	  } return value;
	};

	var globalThis$y = globalThis_1;
	var defineGlobalProperty$2 = defineGlobalProperty$3;

	var SHARED = '__core-js_shared__';
	var store$3 = sharedStore.exports = globalThis$y[SHARED] || defineGlobalProperty$2(SHARED, {});

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

	var requireObjectCoercible$9 = requireObjectCoercible$b;

	var $Object$2 = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$c = function (argument) {
	  return $Object$2(requireObjectCoercible$9(argument));
	};

	var uncurryThis$D = functionUncurryThis;
	var toObject$b = toObject$c;

	var hasOwnProperty = uncurryThis$D({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$b(it), key);
	};

	var uncurryThis$C = functionUncurryThis;

	var id = 0;
	var postfix = Math.random();
	var toString$f = uncurryThis$C(1.1.toString);

	var uid$3 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$f(++id + postfix, 36);
	};

	var globalThis$x = globalThis_1;
	var shared$3 = shared$4;
	var hasOwn$f = hasOwnProperty_1;
	var uid$2 = uid$3;
	var NATIVE_SYMBOL = symbolConstructorDetection;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var Symbol$2 = globalThis$x.Symbol;
	var WellKnownSymbolsStore = shared$3('wks');
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$2['for'] || Symbol$2 : Symbol$2 && Symbol$2.withoutSetter || uid$2;

	var wellKnownSymbol$r = function (name) {
	  if (!hasOwn$f(WellKnownSymbolsStore, name)) {
	    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$f(Symbol$2, name)
	      ? Symbol$2[name]
	      : createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var call$p = functionCall;
	var isObject$l = isObject$n;
	var isSymbol$2 = isSymbol$3;
	var getMethod$6 = getMethod$7;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$q = wellKnownSymbol$r;

	var $TypeError$g = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol$q('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$2 = function (input, pref) {
	  if (!isObject$l(input) || isSymbol$2(input)) return input;
	  var exoticToPrim = getMethod$6(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$p(exoticToPrim, input, pref);
	    if (!isObject$l(result) || isSymbol$2(result)) return result;
	    throw new $TypeError$g("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive$1 = toPrimitive$2;
	var isSymbol$1 = isSymbol$3;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$3 = function (argument) {
	  var key = toPrimitive$1(argument, 'string');
	  return isSymbol$1(key) ? key : key + '';
	};

	var globalThis$w = globalThis_1;
	var isObject$k = isObject$n;

	var document$3 = globalThis$w.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$k(document$3) && isObject$k(document$3.createElement);

	var documentCreateElement$2 = function (it) {
	  return EXISTS$1 ? document$3.createElement(it) : {};
	};

	var DESCRIPTORS$l = descriptors;
	var fails$B = fails$G;
	var createElement$1 = documentCreateElement$2;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$l && !fails$B(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement$1('div'), 'a', {
	    get: function () { return 7; }
	  }).a !== 7;
	});

	var DESCRIPTORS$k = descriptors;
	var call$o = functionCall;
	var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
	var createPropertyDescriptor$5 = createPropertyDescriptor$6;
	var toIndexedObject$8 = toIndexedObject$9;
	var toPropertyKey$2 = toPropertyKey$3;
	var hasOwn$e = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$k ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$8(O);
	  P = toPropertyKey$2(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$e(O, P)) return createPropertyDescriptor$5(!call$o(propertyIsEnumerableModule$1.f, O, P), O[P]);
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$j = descriptors;
	var fails$A = fails$G;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$j && fails$A(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype !== 42;
	});

	var isObject$j = isObject$n;

	var $String$4 = String;
	var $TypeError$f = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$j = function (argument) {
	  if (isObject$j(argument)) return argument;
	  throw new $TypeError$f($String$4(argument) + ' is not an object');
	};

	var DESCRIPTORS$i = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$i = anObject$j;
	var toPropertyKey$1 = toPropertyKey$3;

	var $TypeError$e = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$i ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
	  anObject$i(O);
	  P = toPropertyKey$1(P);
	  anObject$i(Attributes);
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
	  anObject$i(O);
	  P = toPropertyKey$1(P);
	  anObject$i(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError$e('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$h = descriptors;
	var definePropertyModule$5 = objectDefineProperty;
	var createPropertyDescriptor$4 = createPropertyDescriptor$6;

	var createNonEnumerableProperty$a = DESCRIPTORS$h ? function (object, key, value) {
	  return definePropertyModule$5.f(object, key, createPropertyDescriptor$4(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var makeBuiltIn$3 = {exports: {}};

	var DESCRIPTORS$g = descriptors;
	var hasOwn$d = hasOwnProperty_1;

	var FunctionPrototype$1 = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$g && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$d(FunctionPrototype$1, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && function something() { /* empty */ }.name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$g || (DESCRIPTORS$g && getDescriptor(FunctionPrototype$1, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var uncurryThis$B = functionUncurryThis;
	var isCallable$j = isCallable$p;
	var store$1 = sharedStore.exports;

	var functionToString = uncurryThis$B(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$j(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	var inspectSource$3 = store$1.inspectSource;

	var globalThis$v = globalThis_1;
	var isCallable$i = isCallable$p;

	var WeakMap$1 = globalThis$v.WeakMap;

	var weakMapBasicDetection = isCallable$i(WeakMap$1) && /native code/.test(String(WeakMap$1));

	var shared$2 = shared$4;
	var uid$1 = uid$3;

	var keys$1 = shared$2('keys');

	var sharedKey$3 = function (key) {
	  return keys$1[key] || (keys$1[key] = uid$1(key));
	};

	var hiddenKeys$4 = {};

	var NATIVE_WEAK_MAP = weakMapBasicDetection;
	var globalThis$u = globalThis_1;
	var isObject$i = isObject$n;
	var createNonEnumerableProperty$9 = createNonEnumerableProperty$a;
	var hasOwn$c = hasOwnProperty_1;
	var shared$1 = sharedStore.exports;
	var sharedKey$2 = sharedKey$3;
	var hiddenKeys$3 = hiddenKeys$4;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$5 = globalThis$u.TypeError;
	var WeakMap = globalThis$u.WeakMap;
	var set$2, get$1, has;

	var enforce = function (it) {
	  return has(it) ? get$1(it) : set$2(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$i(it) || (state = get$1(it)).type !== TYPE) {
	      throw new TypeError$5('Incompatible receiver, ' + TYPE + ' required');
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
	  set$2 = function (it, metadata) {
	    if (store.has(it)) throw new TypeError$5(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    store.set(it, metadata);
	    return metadata;
	  };
	  get$1 = function (it) {
	    return store.get(it) || {};
	  };
	  has = function (it) {
	    return store.has(it);
	  };
	} else {
	  var STATE = sharedKey$2('state');
	  hiddenKeys$3[STATE] = true;
	  set$2 = function (it, metadata) {
	    if (hasOwn$c(it, STATE)) throw new TypeError$5(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$9(it, STATE, metadata);
	    return metadata;
	  };
	  get$1 = function (it) {
	    return hasOwn$c(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$c(it, STATE);
	  };
	}

	var internalState = {
	  set: set$2,
	  get: get$1,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var uncurryThis$A = functionUncurryThis;
	var fails$z = fails$G;
	var isCallable$h = isCallable$p;
	var hasOwn$b = hasOwnProperty_1;
	var DESCRIPTORS$f = descriptors;
	var CONFIGURABLE_FUNCTION_NAME$2 = functionName.CONFIGURABLE;
	var inspectSource$2 = inspectSource$3;
	var InternalStateModule$8 = internalState;

	var enforceInternalState$3 = InternalStateModule$8.enforce;
	var getInternalState$5 = InternalStateModule$8.get;
	var $String$3 = String;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$6 = Object.defineProperty;
	var stringSlice$a = uncurryThis$A(''.slice);
	var replace$7 = uncurryThis$A(''.replace);
	var join$5 = uncurryThis$A([].join);

	var CONFIGURABLE_LENGTH = DESCRIPTORS$f && !fails$z(function () {
	  return defineProperty$6(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
	});

	var TEMPLATE = String(String).split('String');

	var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
	  if (stringSlice$a($String$3(name), 0, 7) === 'Symbol(') {
	    name = '[' + replace$7($String$3(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
	  }
	  if (options && options.getter) name = 'get ' + name;
	  if (options && options.setter) name = 'set ' + name;
	  if (!hasOwn$b(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$2 && value.name !== name)) {
	    if (DESCRIPTORS$f) defineProperty$6(value, 'name', { value: name, configurable: true });
	    else value.name = name;
	  }
	  if (CONFIGURABLE_LENGTH && options && hasOwn$b(options, 'arity') && value.length !== options.arity) {
	    defineProperty$6(value, 'length', { value: options.arity });
	  }
	  try {
	    if (options && hasOwn$b(options, 'constructor') && options.constructor) {
	      if (DESCRIPTORS$f) defineProperty$6(value, 'prototype', { writable: false });
	    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
	    } else if (value.prototype) value.prototype = undefined;
	  } catch (error) { /* empty */ }
	  var state = enforceInternalState$3(value);
	  if (!hasOwn$b(state, 'source')) {
	    state.source = join$5(TEMPLATE, typeof name == 'string' ? name : '');
	  } return value;
	};

	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	// eslint-disable-next-line no-extend-native -- required
	Function.prototype.toString = makeBuiltIn$2(function toString() {
	  return isCallable$h(this) && getInternalState$5(this).source || inspectSource$2(this);
	}, 'toString');

	var isCallable$g = isCallable$p;
	var definePropertyModule$4 = objectDefineProperty;
	var makeBuiltIn$1 = makeBuiltIn$3.exports;
	var defineGlobalProperty$1 = defineGlobalProperty$3;

	var defineBuiltIn$e = function (O, key, value, options) {
	  if (!options) options = {};
	  var simple = options.enumerable;
	  var name = options.name !== undefined ? options.name : key;
	  if (isCallable$g(value)) makeBuiltIn$1(value, name, options);
	  if (options.global) {
	    if (simple) O[key] = value;
	    else defineGlobalProperty$1(key, value);
	  } else {
	    try {
	      if (!options.unsafe) delete O[key];
	      else if (O[key]) simple = true;
	    } catch (error) { /* empty */ }
	    if (simple) O[key] = value;
	    else definePropertyModule$4.f(O, key, {
	      value: value,
	      enumerable: false,
	      configurable: !options.nonConfigurable,
	      writable: !options.nonWritable
	    });
	  } return O;
	};

	var objectGetOwnPropertyNames = {};

	var ceil = Math.ceil;
	var floor$a = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor$a : ceil)(n);
	};

	var trunc = mathTrunc;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$a = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};

	var toIntegerOrInfinity$9 = toIntegerOrInfinity$a;

	var max$2 = Math.max;
	var min$6 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$7 = function (index, length) {
	  var integer = toIntegerOrInfinity$9(index);
	  return integer < 0 ? max$2(integer + length, 0) : min$6(integer, length);
	};

	var toIntegerOrInfinity$8 = toIntegerOrInfinity$a;

	var min$5 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$8 = function (argument) {
	  var len = toIntegerOrInfinity$8(argument);
	  return len > 0 ? min$5(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength$7 = toLength$8;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$e = function (obj) {
	  return toLength$7(obj.length);
	};

	var toIndexedObject$7 = toIndexedObject$9;
	var toAbsoluteIndex$6 = toAbsoluteIndex$7;
	var lengthOfArrayLike$d = lengthOfArrayLike$e;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$5 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$7($this);
	    var length = lengthOfArrayLike$d(O);
	    if (length === 0) return !IS_INCLUDES && -1;
	    var index = toAbsoluteIndex$6(fromIndex, length);
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
	  includes: createMethod$5(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$5(false)
	};

	var uncurryThis$z = functionUncurryThis;
	var hasOwn$a = hasOwnProperty_1;
	var toIndexedObject$6 = toIndexedObject$9;
	var indexOf$1 = arrayIncludes.indexOf;
	var hiddenKeys$2 = hiddenKeys$4;

	var push$7 = uncurryThis$z([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$6(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$a(hiddenKeys$2, key) && hasOwn$a(O, key) && push$7(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$a(O, key = names[i++])) {
	    ~indexOf$1(result, key) || push$7(result, key);
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

	var getBuiltIn$7 = getBuiltIn$9;
	var uncurryThis$y = functionUncurryThis;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
	var anObject$h = anObject$j;

	var concat$2 = uncurryThis$y([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$1 = getBuiltIn$7('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject$h(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
	  return getOwnPropertySymbols ? concat$2(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn$9 = hasOwnProperty_1;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
	var definePropertyModule$3 = objectDefineProperty;

	var copyConstructorProperties$2 = function (target, source, exceptions) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule$3.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$1.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn$9(target, key) && !(exceptions && hasOwn$9(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var fails$y = fails$G;
	var isCallable$f = isCallable$p;

	var replacement = /#|\.prototype\./;

	var isForced$3 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value === POLYFILL ? true
	    : value === NATIVE ? false
	    : isCallable$f(detection) ? fails$y(detection)
	    : !!detection;
	};

	var normalize = isForced$3.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$3.data = {};
	var NATIVE = isForced$3.NATIVE = 'N';
	var POLYFILL = isForced$3.POLYFILL = 'P';

	var isForced_1 = isForced$3;

	var globalThis$t = globalThis_1;
	var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$8 = createNonEnumerableProperty$a;
	var defineBuiltIn$d = defineBuiltIn$e;
	var defineGlobalProperty = defineGlobalProperty$3;
	var copyConstructorProperties$1 = copyConstructorProperties$2;
	var isForced$2 = isForced_1;

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
	    target = globalThis$t;
	  } else if (STATIC) {
	    target = globalThis$t[TARGET] || defineGlobalProperty(TARGET, {});
	  } else {
	    target = globalThis$t[TARGET] && globalThis$t[TARGET].prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor$3(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced$2(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties$1(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$8(sourceProperty, 'sham', true);
	    }
	    defineBuiltIn$d(target, key, sourceProperty, options);
	  }
	};

	var classofRaw$1 = classofRaw$2;
	var uncurryThis$x = functionUncurryThis;

	var functionUncurryThisClause = function (fn) {
	  // Nashorn bug:
	  //   https://github.com/zloirock/core-js/issues/1128
	  //   https://github.com/zloirock/core-js/issues/1130
	  if (classofRaw$1(fn) === 'Function') return uncurryThis$x(fn);
	};

	var uncurryThis$w = functionUncurryThisClause;
	var aCallable$a = aCallable$c;
	var NATIVE_BIND$1 = functionBindNative;

	var bind$9 = uncurryThis$w(uncurryThis$w.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable$a(fn);
	  return that === undefined ? fn : NATIVE_BIND$1 ? bind$9(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var classof$d = classofRaw$2;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$5 = Array.isArray || function isArray(argument) {
	  return classof$d(argument) === 'Array';
	};

	var wellKnownSymbol$p = wellKnownSymbol$r;

	var TO_STRING_TAG$3 = wellKnownSymbol$p('toStringTag');
	var test$2 = {};
	// eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
	test$2[TO_STRING_TAG$3] = 'z';

	var toStringTagSupport = String(test$2) === '[object z]';

	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var isCallable$e = isCallable$p;
	var classofRaw = classofRaw$2;
	var wellKnownSymbol$o = wellKnownSymbol$r;

	var TO_STRING_TAG$2 = wellKnownSymbol$o('toStringTag');
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
	var classof$c = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = $Object$1(it), TO_STRING_TAG$2)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) === 'Object' && isCallable$e(O.callee) ? 'Arguments' : result;
	};

	var uncurryThis$v = functionUncurryThis;
	var fails$x = fails$G;
	var isCallable$d = isCallable$p;
	var classof$b = classof$c;
	var getBuiltIn$6 = getBuiltIn$9;
	var inspectSource$1 = inspectSource$3;

	var noop = function () { /* empty */ };
	var construct = getBuiltIn$6('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec$6 = uncurryThis$v(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable$d(argument)) return false;
	  try {
	    construct(noop, [], argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable$d(argument)) return false;
	  switch (classof$b(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec$6(constructorRegExp, inspectSource$1(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$4 = !construct || fails$x(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var isArray$4 = isArray$5;
	var isConstructor$3 = isConstructor$4;
	var isObject$h = isObject$n;
	var wellKnownSymbol$n = wellKnownSymbol$r;

	var SPECIES$6 = wellKnownSymbol$n('species');
	var $Array$3 = Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$1 = function (originalArray) {
	  var C;
	  if (isArray$4(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor$3(C) && (C === $Array$3 || isArray$4(C.prototype))) C = undefined;
	    else if (isObject$h(C)) {
	      C = C[SPECIES$6];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? $Array$3 : C;
	};

	var arraySpeciesConstructor = arraySpeciesConstructor$1;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$2 = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var DESCRIPTORS$e = descriptors;
	var definePropertyModule$2 = objectDefineProperty;
	var createPropertyDescriptor$3 = createPropertyDescriptor$6;

	var createProperty$4 = function (object, key, value) {
	  if (DESCRIPTORS$e) definePropertyModule$2.f(object, key, createPropertyDescriptor$3(0, value));
	  else object[key] = value;
	};

	var bind$8 = functionBindContext;
	var IndexedObject$2 = indexedObject;
	var toObject$a = toObject$c;
	var lengthOfArrayLike$c = lengthOfArrayLike$e;
	var arraySpeciesCreate$1 = arraySpeciesCreate$2;
	var createProperty$3 = createProperty$4;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod$4 = function (TYPE) {
	  var IS_MAP = TYPE === 1;
	  var IS_FILTER = TYPE === 2;
	  var IS_SOME = TYPE === 3;
	  var IS_EVERY = TYPE === 4;
	  var IS_FIND_INDEX = TYPE === 6;
	  var IS_FILTER_REJECT = TYPE === 7;
	  var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that) {
	    var O = toObject$a($this);
	    var self = IndexedObject$2(O);
	    var length = lengthOfArrayLike$c(self);
	    var boundFunction = bind$8(callbackfn, that);
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
	  forEach: createMethod$4(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$4(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$4(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$4(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$4(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$4(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$4(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod$4(7)
	};

	var fails$w = fails$G;

	var arrayMethodIsStrict$4 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$w(function () {
	    // eslint-disable-next-line no-useless-call -- required for testing
	    method.call(null, argument || function () { return 1; }, 1);
	  });
	};

	var $forEach$1 = arrayIteration.forEach;
	var arrayMethodIsStrict$3 = arrayMethodIsStrict$4;

	var STRICT_METHOD$2 = arrayMethodIsStrict$3('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD$2 ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	} : [].forEach;

	var $$v = _export;
	var forEach$2 = arrayForEach;

	// `Array.prototype.forEach` method
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	$$v({ target: 'Array', proto: true, forced: [].forEach !== forEach$2 }, {
	  forEach: forEach$2
	});

	var $$u = _export;
	var uncurryThis$u = functionUncurryThis;
	var isArray$3 = isArray$5;

	var nativeReverse = uncurryThis$u([].reverse);
	var test$1 = [1, 2];

	// `Array.prototype.reverse` method
	// https://tc39.es/ecma262/#sec-array.prototype.reverse
	// fix for Safari 12.0 bug
	// https://bugs.webkit.org/show_bug.cgi?id=188794
	$$u({ target: 'Array', proto: true, forced: String(test$1) === String(test$1.reverse()) }, {
	  reverse: function reverse() {
	    // eslint-disable-next-line no-self-assign -- dirty hack
	    if (isArray$3(this)) this.length = this.length;
	    return nativeReverse(this);
	  }
	});

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof$a = classof$c;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof$a(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var defineBuiltIn$c = defineBuiltIn$e;
	var toString$e = objectToString;

	// `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	if (!TO_STRING_TAG_SUPPORT) {
	  defineBuiltIn$c(Object.prototype, 'toString', toString$e, { unsafe: true });
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
	var DOMTokenListPrototype$2 = classList && classList.constructor && classList.constructor.prototype;

	var domTokenListPrototype = DOMTokenListPrototype$2 === Object.prototype ? undefined : DOMTokenListPrototype$2;

	var globalThis$s = globalThis_1;
	var DOMIterables$1 = domIterables;
	var DOMTokenListPrototype$1 = domTokenListPrototype;
	var forEach$1 = arrayForEach;
	var createNonEnumerableProperty$7 = createNonEnumerableProperty$a;

	var handlePrototype$1 = function (CollectionPrototype) {
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== forEach$1) try {
	    createNonEnumerableProperty$7(CollectionPrototype, 'forEach', forEach$1);
	  } catch (error) {
	    CollectionPrototype.forEach = forEach$1;
	  }
	};

	for (var COLLECTION_NAME$1 in DOMIterables$1) {
	  if (DOMIterables$1[COLLECTION_NAME$1]) {
	    handlePrototype$1(globalThis$s[COLLECTION_NAME$1] && globalThis$s[COLLECTION_NAME$1].prototype);
	  }
	}

	handlePrototype$1(DOMTokenListPrototype$1);

	var objectDefineProperties = {};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$3 = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys$1);
	};

	var DESCRIPTORS$d = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule$1 = objectDefineProperty;
	var anObject$g = anObject$j;
	var toIndexedObject$5 = toIndexedObject$9;
	var objectKeys$2 = objectKeys$3;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS$d && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$g(O);
	  var props = toIndexedObject$5(Properties);
	  var keys = objectKeys$2(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$1.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn$5 = getBuiltIn$9;

	var html$2 = getBuiltIn$5('document', 'documentElement');

	/* global ActiveXObject -- old IE, WSH */
	var anObject$f = anObject$j;
	var definePropertiesModule = objectDefineProperties;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys = hiddenKeys$4;
	var html$1 = html$2;
	var documentCreateElement = documentCreateElement$2;
	var sharedKey$1 = sharedKey$3;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE$1 = 'prototype';
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
	  html$1.appendChild(iframe);
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
	  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO$1] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	// eslint-disable-next-line es/no-object-create -- safe
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE$1] = anObject$f(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
	};

	var wellKnownSymbol$m = wellKnownSymbol$r;
	var create$5 = objectCreate;
	var defineProperty$5 = objectDefineProperty.f;

	var UNSCOPABLES = wellKnownSymbol$m('unscopables');
	var ArrayPrototype$1 = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype$1[UNSCOPABLES] === undefined) {
	  defineProperty$5(ArrayPrototype$1, UNSCOPABLES, {
	    configurable: true,
	    value: create$5(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables$2 = function (key) {
	  ArrayPrototype$1[UNSCOPABLES][key] = true;
	};

	var $$t = _export;
	var $find$1 = arrayIteration.find;
	var addToUnscopables$1 = addToUnscopables$2;

	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	// eslint-disable-next-line es/no-array-prototype-find -- testing
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.es/ecma262/#sec-array.prototype.find
	$$t({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables$1(FIND);

	function _arrayLikeToArray(r, a) {
	  (null == a || a > r.length) && (a = r.length);
	  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	  return n;
	}
	function _classCallCheck(a, n) {
	  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
	}
	function _defineProperties(e, r) {
	  for (var t = 0; t < r.length; t++) {
	    var o = r[t];
	    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
	  }
	}
	function _createClass(e, r, t) {
	  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
	    writable: !1
	  }), e;
	}
	function _createForOfIteratorHelper(r, e) {
	  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	  if (!t) {
	    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
	      t && (r = t);
	      var n = 0,
	        F = function () {};
	      return {
	        s: F,
	        n: function () {
	          return n >= r.length ? {
	            done: !0
	          } : {
	            done: !1,
	            value: r[n++]
	          };
	        },
	        e: function (r) {
	          throw r;
	        },
	        f: F
	      };
	    }
	    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	  }
	  var o,
	    a = !0,
	    u = !1;
	  return {
	    s: function () {
	      t = t.call(r);
	    },
	    n: function () {
	      var r = t.next();
	      return a = r.done, r;
	    },
	    e: function (r) {
	      u = !0, o = r;
	    },
	    f: function () {
	      try {
	        a || null == t.return || t.return();
	      } finally {
	        if (u) throw o;
	      }
	    }
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
	function _unsupportedIterableToArray(r, a) {
	  if (r) {
	    if ("string" == typeof r) return _arrayLikeToArray(r, a);
	    var t = {}.toString.call(r).slice(8, -1);
	    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
	  }
	}

	var iterators = {};

	var fails$v = fails$G;

	var correctPrototypeGetter = !fails$v(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var hasOwn$8 = hasOwnProperty_1;
	var isCallable$c = isCallable$p;
	var toObject$9 = toObject$c;
	var sharedKey = sharedKey$3;
	var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

	var IE_PROTO = sharedKey('IE_PROTO');
	var $Object = Object;
	var ObjectPrototype$2 = $Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	// eslint-disable-next-line es/no-object-getprototypeof -- safe
	var objectGetPrototypeOf$1 = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
	  var object = toObject$9(O);
	  if (hasOwn$8(object, IE_PROTO)) return object[IE_PROTO];
	  var constructor = object.constructor;
	  if (isCallable$c(constructor) && object instanceof constructor) {
	    return constructor.prototype;
	  } return object instanceof $Object ? ObjectPrototype$2 : null;
	};

	var fails$u = fails$G;
	var isCallable$b = isCallable$p;
	var isObject$g = isObject$n;
	var getPrototypeOf$3 = objectGetPrototypeOf$1;
	var defineBuiltIn$b = defineBuiltIn$e;
	var wellKnownSymbol$l = wellKnownSymbol$r;

	var ITERATOR$9 = wellKnownSymbol$l('iterator');
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
	    PrototypeOfArrayIteratorPrototype = getPrototypeOf$3(getPrototypeOf$3(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = !isObject$g(IteratorPrototype$2) || fails$u(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$2[ITERATOR$9].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

	// `%IteratorPrototype%[@@iterator]()` method
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
	if (!isCallable$b(IteratorPrototype$2[ITERATOR$9])) {
	  defineBuiltIn$b(IteratorPrototype$2, ITERATOR$9, function () {
	    return this;
	  });
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$2,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var defineProperty$4 = objectDefineProperty.f;
	var hasOwn$7 = hasOwnProperty_1;
	var wellKnownSymbol$k = wellKnownSymbol$r;

	var TO_STRING_TAG$1 = wellKnownSymbol$k('toStringTag');

	var setToStringTag$7 = function (target, TAG, STATIC) {
	  if (target && !STATIC) target = target.prototype;
	  if (target && !hasOwn$7(target, TO_STRING_TAG$1)) {
	    defineProperty$4(target, TO_STRING_TAG$1, { configurable: true, value: TAG });
	  }
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
	var create$4 = objectCreate;
	var createPropertyDescriptor$2 = createPropertyDescriptor$6;
	var setToStringTag$6 = setToStringTag$7;
	var Iterators$4 = iterators;

	var returnThis$1 = function () { return this; };

	var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create$4(IteratorPrototype$1, { next: createPropertyDescriptor$2(+!ENUMERABLE_NEXT, next) });
	  setToStringTag$6(IteratorConstructor, TO_STRING_TAG, false);
	  Iterators$4[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var uncurryThis$t = functionUncurryThis;
	var aCallable$9 = aCallable$c;

	var functionUncurryThisAccessor = function (object, key, method) {
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    return uncurryThis$t(aCallable$9(Object.getOwnPropertyDescriptor(object, key)[method]));
	  } catch (error) { /* empty */ }
	};

	var isObject$f = isObject$n;

	var isPossiblePrototype$1 = function (argument) {
	  return isObject$f(argument) || argument === null;
	};

	var isPossiblePrototype = isPossiblePrototype$1;

	var $String$2 = String;
	var $TypeError$d = TypeError;

	var aPossiblePrototype$1 = function (argument) {
	  if (isPossiblePrototype(argument)) return argument;
	  throw new $TypeError$d("Can't set " + $String$2(argument) + ' as a prototype');
	};

	/* eslint-disable no-proto -- safe */
	var uncurryThisAccessor = functionUncurryThisAccessor;
	var isObject$e = isObject$n;
	var requireObjectCoercible$8 = requireObjectCoercible$b;
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
	    requireObjectCoercible$8(O);
	    aPossiblePrototype(proto);
	    if (!isObject$e(O)) return O;
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var $$s = _export;
	var call$n = functionCall;
	var FunctionName$1 = functionName;
	var isCallable$a = isCallable$p;
	var createIteratorConstructor$1 = iteratorCreateConstructor;
	var getPrototypeOf$2 = objectGetPrototypeOf$1;
	var setPrototypeOf$5 = objectSetPrototypeOf;
	var setToStringTag$5 = setToStringTag$7;
	var createNonEnumerableProperty$6 = createNonEnumerableProperty$a;
	var defineBuiltIn$a = defineBuiltIn$e;
	var wellKnownSymbol$j = wellKnownSymbol$r;
	var Iterators$3 = iterators;
	var IteratorsCore = iteratorsCore;

	var PROPER_FUNCTION_NAME$3 = FunctionName$1.PROPER;
	var CONFIGURABLE_FUNCTION_NAME$1 = FunctionName$1.CONFIGURABLE;
	var IteratorPrototype = IteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$8 = wellKnownSymbol$j('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis = function () { return this; };

	var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor$1(IteratorConstructor, NAME, next);

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
	  var nativeIterator = IterablePrototype[ITERATOR$8]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = getPrototypeOf$2(anyNativeIterator.call(new Iterable()));
	    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      if (getPrototypeOf$2(CurrentIteratorPrototype) !== IteratorPrototype) {
	        if (setPrototypeOf$5) {
	          setPrototypeOf$5(CurrentIteratorPrototype, IteratorPrototype);
	        } else if (!isCallable$a(CurrentIteratorPrototype[ITERATOR$8])) {
	          defineBuiltIn$a(CurrentIteratorPrototype, ITERATOR$8, returnThis);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag$5(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
	  if (PROPER_FUNCTION_NAME$3 && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    if (CONFIGURABLE_FUNCTION_NAME$1) {
	      createNonEnumerableProperty$6(IterablePrototype, 'name', VALUES);
	    } else {
	      INCORRECT_VALUES_NAME = true;
	      defaultIterator = function values() { return call$n(nativeIterator, this); };
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
	        defineBuiltIn$a(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else $$s({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  // define iterator
	  if (IterablePrototype[ITERATOR$8] !== defaultIterator) {
	    defineBuiltIn$a(IterablePrototype, ITERATOR$8, defaultIterator, { name: DEFAULT });
	  }
	  Iterators$3[NAME] = defaultIterator;

	  return methods;
	};

	// `CreateIterResultObject` abstract operation
	// https://tc39.es/ecma262/#sec-createiterresultobject
	var createIterResultObject$3 = function (value, done) {
	  return { value: value, done: done };
	};

	var toIndexedObject$4 = toIndexedObject$9;
	var addToUnscopables = addToUnscopables$2;
	var Iterators$2 = iterators;
	var InternalStateModule$7 = internalState;
	var defineProperty$3 = objectDefineProperty.f;
	var defineIterator$1 = iteratorDefine;
	var createIterResultObject$2 = createIterResultObject$3;
	var DESCRIPTORS$c = descriptors;

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$6 = InternalStateModule$7.set;
	var getInternalState$4 = InternalStateModule$7.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.es/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.es/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.es/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.es/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator$1(Array, 'Array', function (iterated, kind) {
	  setInternalState$6(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject$4(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$4(this);
	  var target = state.target;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = null;
	    return createIterResultObject$2(undefined, true);
	  }
	  switch (state.kind) {
	    case 'keys': return createIterResultObject$2(index, false);
	    case 'values': return createIterResultObject$2(target[index], false);
	  } return createIterResultObject$2([index, target[index]], false);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.es/ecma262/#sec-createmappedargumentsobject
	var values = Iterators$2.Arguments = Iterators$2.Array;

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	// V8 ~ Chrome 45- bug
	if (DESCRIPTORS$c && values.name !== 'values') try {
	  defineProperty$3(values, 'name', { value: 'values' });
	} catch (error) { /* empty */ }

	/* global Bun, Deno -- detection */
	var globalThis$r = globalThis_1;
	var userAgent$5 = environmentUserAgent;
	var classof$9 = classofRaw$2;

	var userAgentStartsWith = function (string) {
	  return userAgent$5.slice(0, string.length) === string;
	};

	var environment = (function () {
	  if (userAgentStartsWith('Bun/')) return 'BUN';
	  if (userAgentStartsWith('Cloudflare-Workers')) return 'CLOUDFLARE';
	  if (userAgentStartsWith('Deno/')) return 'DENO';
	  if (userAgentStartsWith('Node.js/')) return 'NODE';
	  if (globalThis$r.Bun && typeof Bun.version == 'string') return 'BUN';
	  if (globalThis$r.Deno && typeof Deno.version == 'object') return 'DENO';
	  if (classof$9(globalThis$r.process) === 'process') return 'NODE';
	  if (globalThis$r.window && globalThis$r.document) return 'BROWSER';
	  return 'REST';
	})();

	var ENVIRONMENT$1 = environment;

	var environmentIsNode = ENVIRONMENT$1 === 'NODE';

	var globalThis$q = globalThis_1;

	var path$1 = globalThis$q;

	var makeBuiltIn = makeBuiltIn$3.exports;
	var defineProperty$2 = objectDefineProperty;

	var defineBuiltInAccessor$6 = function (target, name, descriptor) {
	  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
	  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
	  return defineProperty$2.f(target, name, descriptor);
	};

	var getBuiltIn$4 = getBuiltIn$9;
	var defineBuiltInAccessor$5 = defineBuiltInAccessor$6;
	var wellKnownSymbol$i = wellKnownSymbol$r;
	var DESCRIPTORS$b = descriptors;

	var SPECIES$5 = wellKnownSymbol$i('species');

	var setSpecies$4 = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn$4(CONSTRUCTOR_NAME);

	  if (DESCRIPTORS$b && Constructor && !Constructor[SPECIES$5]) {
	    defineBuiltInAccessor$5(Constructor, SPECIES$5, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var isPrototypeOf$5 = objectIsPrototypeOf;

	var $TypeError$c = TypeError;

	var anInstance$5 = function (it, Prototype) {
	  if (isPrototypeOf$5(Prototype, it)) return it;
	  throw new $TypeError$c('Incorrect invocation');
	};

	var isConstructor$2 = isConstructor$4;
	var tryToString$4 = tryToString$6;

	var $TypeError$b = TypeError;

	// `Assert: IsConstructor(argument) is true`
	var aConstructor$2 = function (argument) {
	  if (isConstructor$2(argument)) return argument;
	  throw new $TypeError$b(tryToString$4(argument) + ' is not a constructor');
	};

	var anObject$e = anObject$j;
	var aConstructor$1 = aConstructor$2;
	var isNullOrUndefined$1 = isNullOrUndefined$4;
	var wellKnownSymbol$h = wellKnownSymbol$r;

	var SPECIES$4 = wellKnownSymbol$h('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor$3 = function (O, defaultConstructor) {
	  var C = anObject$e(O).constructor;
	  var S;
	  return C === undefined || isNullOrUndefined$1(S = anObject$e(C)[SPECIES$4]) ? defaultConstructor : aConstructor$1(S);
	};

	var NATIVE_BIND = functionBindNative;

	var FunctionPrototype = Function.prototype;
	var apply$5 = FunctionPrototype.apply;
	var call$m = FunctionPrototype.call;

	// eslint-disable-next-line es/no-function-prototype-bind, es/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call$m.bind(apply$5) : function () {
	  return call$m.apply(apply$5, arguments);
	});

	var uncurryThis$s = functionUncurryThis;

	var arraySlice$6 = uncurryThis$s([].slice);

	var $TypeError$a = TypeError;

	var validateArgumentsLength$3 = function (passed, required) {
	  if (passed < required) throw new $TypeError$a('Not enough arguments');
	  return passed;
	};

	var userAgent$4 = environmentUserAgent;

	var environmentIsIos = /ipad|iphone|ipod/i.test(userAgent$4) && /applewebkit/i.test(userAgent$4);

	var globalThis$p = globalThis_1;
	var apply$4 = functionApply;
	var bind$7 = functionBindContext;
	var isCallable$9 = isCallable$p;
	var hasOwn$6 = hasOwnProperty_1;
	var fails$t = fails$G;
	var html = html$2;
	var arraySlice$5 = arraySlice$6;
	var createElement = documentCreateElement$2;
	var validateArgumentsLength$2 = validateArgumentsLength$3;
	var IS_IOS$1 = environmentIsIos;
	var IS_NODE$2 = environmentIsNode;

	var set$1 = globalThis$p.setImmediate;
	var clear = globalThis$p.clearImmediate;
	var process$2 = globalThis$p.process;
	var Dispatch = globalThis$p.Dispatch;
	var Function$1 = globalThis$p.Function;
	var MessageChannel = globalThis$p.MessageChannel;
	var String$1 = globalThis$p.String;
	var counter = 0;
	var queue$2 = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var $location, defer, channel$1, port;

	fails$t(function () {
	  // Deno throws a ReferenceError on `location` access without `--location` flag
	  $location = globalThis$p.location;
	});

	var run = function (id) {
	  if (hasOwn$6(queue$2, id)) {
	    var fn = queue$2[id];
	    delete queue$2[id];
	    fn();
	  }
	};

	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};

	var eventListener = function (event) {
	  run(event.data);
	};

	var globalPostMessageDefer = function (id) {
	  // old engines have not location.origin
	  globalThis$p.postMessage(String$1(id), $location.protocol + '//' + $location.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set$1 || !clear) {
	  set$1 = function setImmediate(handler) {
	    validateArgumentsLength$2(arguments.length, 1);
	    var fn = isCallable$9(handler) ? handler : Function$1(handler);
	    var args = arraySlice$5(arguments, 1);
	    queue$2[++counter] = function () {
	      apply$4(fn, undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue$2[id];
	  };
	  // Node.js 0.8-
	  if (IS_NODE$2) {
	    defer = function (id) {
	      process$2.nextTick(runner(id));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  // except iOS - https://github.com/zloirock/core-js/issues/624
	  } else if (MessageChannel && !IS_IOS$1) {
	    channel$1 = new MessageChannel();
	    port = channel$1.port2;
	    channel$1.port1.onmessage = eventListener;
	    defer = bind$7(port.postMessage, port);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (
	    globalThis$p.addEventListener &&
	    isCallable$9(globalThis$p.postMessage) &&
	    !globalThis$p.importScripts &&
	    $location && $location.protocol !== 'file:' &&
	    !fails$t(globalPostMessageDefer)
	  ) {
	    defer = globalPostMessageDefer;
	    globalThis$p.addEventListener('message', eventListener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in createElement('script')) {
	    defer = function (id) {
	      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}

	var task$1 = {
	  set: set$1,
	  clear: clear
	};

	var globalThis$o = globalThis_1;
	var DESCRIPTORS$a = descriptors;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// Avoid NodeJS experimental warning
	var safeGetBuiltIn$2 = function (name) {
	  if (!DESCRIPTORS$a) return globalThis$o[name];
	  var descriptor = getOwnPropertyDescriptor$2(globalThis$o, name);
	  return descriptor && descriptor.value;
	};

	var Queue$2 = function () {
	  this.head = null;
	  this.tail = null;
	};

	Queue$2.prototype = {
	  add: function (item) {
	    var entry = { item: item, next: null };
	    var tail = this.tail;
	    if (tail) tail.next = entry;
	    else this.head = entry;
	    this.tail = entry;
	  },
	  get: function () {
	    var entry = this.head;
	    if (entry) {
	      var next = this.head = entry.next;
	      if (next === null) this.tail = null;
	      return entry.item;
	    }
	  }
	};

	var queue$1 = Queue$2;

	var userAgent$3 = environmentUserAgent;

	var environmentIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$3) && typeof Pebble != 'undefined';

	var userAgent$2 = environmentUserAgent;

	var environmentIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent$2);

	var globalThis$n = globalThis_1;
	var safeGetBuiltIn$1 = safeGetBuiltIn$2;
	var bind$6 = functionBindContext;
	var macrotask = task$1.set;
	var Queue$1 = queue$1;
	var IS_IOS = environmentIsIos;
	var IS_IOS_PEBBLE = environmentIsIosPebble;
	var IS_WEBOS_WEBKIT = environmentIsWebosWebkit;
	var IS_NODE$1 = environmentIsNode;

	var MutationObserver = globalThis$n.MutationObserver || globalThis$n.WebKitMutationObserver;
	var document$2 = globalThis$n.document;
	var process$1 = globalThis$n.process;
	var Promise$1 = globalThis$n.Promise;
	var microtask$1 = safeGetBuiltIn$1('queueMicrotask');
	var notify$1, toggle, node, promise, then;

	// modern engines have queueMicrotask method
	if (!microtask$1) {
	  var queue = new Queue$1();

	  var flush = function () {
	    var parent, fn;
	    if (IS_NODE$1 && (parent = process$1.domain)) parent.exit();
	    while (fn = queue.get()) try {
	      fn();
	    } catch (error) {
	      if (queue.head) notify$1();
	      throw error;
	    }
	    if (parent) parent.enter();
	  };

	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
	  if (!IS_IOS && !IS_NODE$1 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
	    toggle = true;
	    node = document$2.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify$1 = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise$1.resolve(undefined);
	    // workaround of WebKit ~ iOS Safari 10.1 bug
	    promise.constructor = Promise$1;
	    then = bind$6(promise.then, promise);
	    notify$1 = function () {
	      then(flush);
	    };
	  // Node.js without promises
	  } else if (IS_NODE$1) {
	    notify$1 = function () {
	      process$1.nextTick(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessage
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    // `webpack` dev server bug on IE global methods - use bind(fn, global)
	    macrotask = bind$6(macrotask, globalThis$n);
	    notify$1 = function () {
	      macrotask(flush);
	    };
	  }

	  microtask$1 = function (fn) {
	    if (!queue.head) notify$1();
	    queue.add(fn);
	  };
	}

	var microtask_1 = microtask$1;

	var hostReportErrors$1 = function (a, b) {
	  try {
	    // eslint-disable-next-line no-console -- safe
	    arguments.length === 1 ? console.error(a) : console.error(a, b);
	  } catch (error) { /* empty */ }
	};

	var perform$3 = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var globalThis$m = globalThis_1;

	var promiseNativeConstructor = globalThis$m.Promise;

	var globalThis$l = globalThis_1;
	var NativePromiseConstructor$4 = promiseNativeConstructor;
	var isCallable$8 = isCallable$p;
	var isForced$1 = isForced_1;
	var inspectSource = inspectSource$3;
	var wellKnownSymbol$g = wellKnownSymbol$r;
	var ENVIRONMENT = environment;
	var V8_VERSION$2 = environmentV8Version;

	NativePromiseConstructor$4 && NativePromiseConstructor$4.prototype;
	var SPECIES$3 = wellKnownSymbol$g('species');
	var SUBCLASSING = false;
	var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$8(globalThis$l.PromiseRejectionEvent);

	var FORCED_PROMISE_CONSTRUCTOR$5 = isForced$1('Promise', function () {
	  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor$4);
	  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor$4);
	  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	  // We can't detect it synchronously, so just check versions
	  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION$2 === 66) return true;
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (!V8_VERSION$2 || V8_VERSION$2 < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
	    // Detect correctness of subclassing with @@species support
	    var promise = new NativePromiseConstructor$4(function (resolve) { resolve(1); });
	    var FakePromise = function (exec) {
	      exec(function () { /* empty */ }, function () { /* empty */ });
	    };
	    var constructor = promise.constructor = {};
	    constructor[SPECIES$3] = FakePromise;
	    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
	    if (!SUBCLASSING) return true;
	  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	  } return !GLOBAL_CORE_JS_PROMISE && (ENVIRONMENT === 'BROWSER' || ENVIRONMENT === 'DENO') && !NATIVE_PROMISE_REJECTION_EVENT$1;
	});

	var promiseConstructorDetection = {
	  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR$5,
	  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT$1,
	  SUBCLASSING: SUBCLASSING
	};

	var newPromiseCapability$2 = {};

	var aCallable$8 = aCallable$c;

	var $TypeError$9 = TypeError;

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw new $TypeError$9('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aCallable$8(resolve);
	  this.reject = aCallable$8(reject);
	};

	// `NewPromiseCapability` abstract operation
	// https://tc39.es/ecma262/#sec-newpromisecapability
	newPromiseCapability$2.f = function (C) {
	  return new PromiseCapability(C);
	};

	var $$r = _export;
	var IS_NODE = environmentIsNode;
	var globalThis$k = globalThis_1;
	var path = path$1;
	var call$l = functionCall;
	var defineBuiltIn$9 = defineBuiltIn$e;
	var setPrototypeOf$4 = objectSetPrototypeOf;
	var setToStringTag$4 = setToStringTag$7;
	var setSpecies$3 = setSpecies$4;
	var aCallable$7 = aCallable$c;
	var isCallable$7 = isCallable$p;
	var isObject$d = isObject$n;
	var anInstance$4 = anInstance$5;
	var speciesConstructor$2 = speciesConstructor$3;
	var task = task$1.set;
	var microtask = microtask_1;
	var hostReportErrors = hostReportErrors$1;
	var perform$2 = perform$3;
	var Queue = queue$1;
	var InternalStateModule$6 = internalState;
	var NativePromiseConstructor$3 = promiseNativeConstructor;
	var PromiseConstructorDetection = promiseConstructorDetection;
	var newPromiseCapabilityModule$3 = newPromiseCapability$2;

	var PROMISE = 'Promise';
	var FORCED_PROMISE_CONSTRUCTOR$4 = PromiseConstructorDetection.CONSTRUCTOR;
	var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
	var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
	var getInternalPromiseState = InternalStateModule$6.getterFor(PROMISE);
	var setInternalState$5 = InternalStateModule$6.set;
	var NativePromisePrototype$2 = NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
	var PromiseConstructor = NativePromiseConstructor$3;
	var PromisePrototype = NativePromisePrototype$2;
	var TypeError$4 = globalThis$k.TypeError;
	var document$1 = globalThis$k.document;
	var process = globalThis$k.process;
	var newPromiseCapability$1 = newPromiseCapabilityModule$3.f;
	var newGenericPromiseCapability = newPromiseCapability$1;

	var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && globalThis$k.dispatchEvent);
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;

	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject$d(it) && isCallable$7(then = it.then) ? then : false;
	};

	var callReaction = function (reaction, state) {
	  var value = state.value;
	  var ok = state.state === FULFILLED;
	  var handler = ok ? reaction.ok : reaction.fail;
	  var resolve = reaction.resolve;
	  var reject = reaction.reject;
	  var domain = reaction.domain;
	  var result, then, exited;
	  try {
	    if (handler) {
	      if (!ok) {
	        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
	        state.rejection = HANDLED;
	      }
	      if (handler === true) result = value;
	      else {
	        if (domain) domain.enter();
	        result = handler(value); // can throw
	        if (domain) {
	          domain.exit();
	          exited = true;
	        }
	      }
	      if (result === reaction.promise) {
	        reject(new TypeError$4('Promise-chain cycle'));
	      } else if (then = isThenable(result)) {
	        call$l(then, result, resolve, reject);
	      } else resolve(result);
	    } else reject(value);
	  } catch (error) {
	    if (domain && !exited) domain.exit();
	    reject(error);
	  }
	};

	var notify = function (state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  microtask(function () {
	    var reactions = state.reactions;
	    var reaction;
	    while (reaction = reactions.get()) {
	      callReaction(reaction, state);
	    }
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(state);
	  });
	};

	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$1.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    globalThis$k.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = globalThis$k['on' + name])) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (state) {
	  call$l(task, globalThis$k, function () {
	    var promise = state.facade;
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform$2(function () {
	        if (IS_NODE) {
	          process.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (state) {
	  call$l(task, globalThis$k, function () {
	    var promise = state.facade;
	    if (IS_NODE) {
	      process.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind$5 = function (fn, state, unwrap) {
	  return function (value) {
	    fn(state, value, unwrap);
	  };
	};

	var internalReject = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify(state, true);
	};

	var internalResolve = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (state.facade === value) throw new TypeError$4("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          call$l(then, value,
	            bind$5(internalResolve, wrapper, state),
	            bind$5(internalReject, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify(state, false);
	    }
	  } catch (error) {
	    internalReject({ done: false }, error, state);
	  }
	};

	// constructor polyfill
	if (FORCED_PROMISE_CONSTRUCTOR$4) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance$4(this, PromisePrototype);
	    aCallable$7(executor);
	    call$l(Internal, this);
	    var state = getInternalPromiseState(this);
	    try {
	      executor(bind$5(internalResolve, state), bind$5(internalReject, state));
	    } catch (error) {
	      internalReject(state, error);
	    }
	  };

	  PromisePrototype = PromiseConstructor.prototype;

	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  Internal = function Promise(executor) {
	    setInternalState$5(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: new Queue(),
	      rejection: false,
	      state: PENDING,
	      value: null
	    });
	  };

	  // `Promise.prototype.then` method
	  // https://tc39.es/ecma262/#sec-promise.prototype.then
	  Internal.prototype = defineBuiltIn$9(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
	    var state = getInternalPromiseState(this);
	    var reaction = newPromiseCapability$1(speciesConstructor$2(this, PromiseConstructor));
	    state.parent = true;
	    reaction.ok = isCallable$7(onFulfilled) ? onFulfilled : true;
	    reaction.fail = isCallable$7(onRejected) && onRejected;
	    reaction.domain = IS_NODE ? process.domain : undefined;
	    if (state.state === PENDING) state.reactions.add(reaction);
	    else microtask(function () {
	      callReaction(reaction, state);
	    });
	    return reaction.promise;
	  });

	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalPromiseState(promise);
	    this.promise = promise;
	    this.resolve = bind$5(internalResolve, state);
	    this.reject = bind$5(internalReject, state);
	  };

	  newPromiseCapabilityModule$3.f = newPromiseCapability$1 = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };

	  if (isCallable$7(NativePromiseConstructor$3) && NativePromisePrototype$2 !== Object.prototype) {
	    nativeThen = NativePromisePrototype$2.then;

	    if (!NATIVE_PROMISE_SUBCLASSING) {
	      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
	      defineBuiltIn$9(NativePromisePrototype$2, 'then', function then(onFulfilled, onRejected) {
	        var that = this;
	        return new PromiseConstructor(function (resolve, reject) {
	          call$l(nativeThen, that, resolve, reject);
	        }).then(onFulfilled, onRejected);
	      // https://github.com/zloirock/core-js/issues/640
	      }, { unsafe: true });
	    }

	    // make `.constructor === Promise` work for native promise-based APIs
	    try {
	      delete NativePromisePrototype$2.constructor;
	    } catch (error) { /* empty */ }

	    // make `instanceof Promise` work for native promise-based APIs
	    if (setPrototypeOf$4) {
	      setPrototypeOf$4(NativePromisePrototype$2, PromisePrototype);
	    }
	  }
	}

	// `Promise` constructor
	// https://tc39.es/ecma262/#sec-promise-executor
	$$r({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
	  Promise: PromiseConstructor
	});

	PromiseWrapper = path.Promise;

	setToStringTag$4(PromiseConstructor, PROMISE, false);
	setSpecies$3(PROMISE);

	var wellKnownSymbol$f = wellKnownSymbol$r;
	var Iterators$1 = iterators;

	var ITERATOR$7 = wellKnownSymbol$f('iterator');
	var ArrayPrototype = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod$3 = function (it) {
	  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$7] === it);
	};

	var classof$8 = classof$c;
	var getMethod$5 = getMethod$7;
	var isNullOrUndefined = isNullOrUndefined$4;
	var Iterators = iterators;
	var wellKnownSymbol$e = wellKnownSymbol$r;

	var ITERATOR$6 = wellKnownSymbol$e('iterator');

	var getIteratorMethod$5 = function (it) {
	  if (!isNullOrUndefined(it)) return getMethod$5(it, ITERATOR$6)
	    || getMethod$5(it, '@@iterator')
	    || Iterators[classof$8(it)];
	};

	var call$k = functionCall;
	var aCallable$6 = aCallable$c;
	var anObject$d = anObject$j;
	var tryToString$3 = tryToString$6;
	var getIteratorMethod$4 = getIteratorMethod$5;

	var $TypeError$8 = TypeError;

	var getIterator$4 = function (argument, usingIterator) {
	  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$4(argument) : usingIterator;
	  if (aCallable$6(iteratorMethod)) return anObject$d(call$k(iteratorMethod, argument));
	  throw new $TypeError$8(tryToString$3(argument) + ' is not iterable');
	};

	var call$j = functionCall;
	var anObject$c = anObject$j;
	var getMethod$4 = getMethod$7;

	var iteratorClose$3 = function (iterator, kind, value) {
	  var innerResult, innerError;
	  anObject$c(iterator);
	  try {
	    innerResult = getMethod$4(iterator, 'return');
	    if (!innerResult) {
	      if (kind === 'throw') throw value;
	      return value;
	    }
	    innerResult = call$j(innerResult, iterator);
	  } catch (error) {
	    innerError = true;
	    innerResult = error;
	  }
	  if (kind === 'throw') throw value;
	  if (innerError) throw innerResult;
	  anObject$c(innerResult);
	  return value;
	};

	var bind$4 = functionBindContext;
	var call$i = functionCall;
	var anObject$b = anObject$j;
	var tryToString$2 = tryToString$6;
	var isArrayIteratorMethod$2 = isArrayIteratorMethod$3;
	var lengthOfArrayLike$b = lengthOfArrayLike$e;
	var isPrototypeOf$4 = objectIsPrototypeOf;
	var getIterator$3 = getIterator$4;
	var getIteratorMethod$3 = getIteratorMethod$5;
	var iteratorClose$2 = iteratorClose$3;

	var $TypeError$7 = TypeError;

	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var ResultPrototype = Result.prototype;

	var iterate$2 = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_RECORD = !!(options && options.IS_RECORD);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = bind$4(unboundFunction, that);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    var $iterator = iterator;
	    iterator = undefined;
	    if ($iterator) iteratorClose$2($iterator, 'normal');
	    return new Result(true, condition);
	  };

	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject$b(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    } return INTERRUPTED ? fn(value, stop) : fn(value);
	  };

	  if (IS_RECORD) {
	    iterator = iterable.iterator;
	  } else if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod$3(iterable);
	    if (!iterFn) throw new $TypeError$7(tryToString$2(iterable) + ' is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod$2(iterFn)) {
	      for (index = 0, length = lengthOfArrayLike$b(iterable); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && isPrototypeOf$4(ResultPrototype, result)) return result;
	      } return new Result(false);
	    }
	    iterator = getIterator$3(iterable, iterFn);
	  }

	  next = IS_RECORD ? iterable.next : iterator.next;
	  while (!(step = call$i(next, iterator)).done) {
	    // `IteratorValue` errors should propagate without closing the iterator
	    var value = step.value;
	    try {
	      result = callFn(value);
	    } catch (error) {
	      if (iterator) iteratorClose$2(iterator, 'throw', error);
	      else throw error;
	    }
	    if (typeof result == 'object' && result && isPrototypeOf$4(ResultPrototype, result)) return result;
	  } return new Result(false);
	};

	var wellKnownSymbol$d = wellKnownSymbol$r;

	var ITERATOR$5 = wellKnownSymbol$d('iterator');
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
	  iteratorWithReturn[ITERATOR$5] = function () {
	    return this;
	  };
	  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration$2 = function (exec, SKIP_CLOSING) {
	  try {
	    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  } catch (error) { return false; } // workaround of old WebKit + `eval` bug
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    // eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
	    object[ITERATOR$5] = function () {
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

	var NativePromiseConstructor$2 = promiseNativeConstructor;
	var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$2;
	var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;

	var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$3 || !checkCorrectnessOfIteration$1(function (iterable) {
	  NativePromiseConstructor$2.all(iterable).then(undefined, function () { /* empty */ });
	});

	var $$q = _export;
	var call$h = functionCall;
	var aCallable$5 = aCallable$c;
	var newPromiseCapabilityModule$2 = newPromiseCapability$2;
	var perform$1 = perform$3;
	var iterate$1 = iterate$2;
	var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;

	// `Promise.all` method
	// https://tc39.es/ecma262/#sec-promise.all
	$$q({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$1 }, {
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapabilityModule$2.f(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform$1(function () {
	      var $promiseResolve = aCallable$5(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate$1(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        remaining++;
	        call$h($promiseResolve, C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var $$p = _export;
	var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
	var NativePromiseConstructor$1 = promiseNativeConstructor;
	var getBuiltIn$3 = getBuiltIn$9;
	var isCallable$6 = isCallable$p;
	var defineBuiltIn$8 = defineBuiltIn$e;

	var NativePromisePrototype$1 = NativePromiseConstructor$1 && NativePromiseConstructor$1.prototype;

	// `Promise.prototype.catch` method
	// https://tc39.es/ecma262/#sec-promise.prototype.catch
	$$p({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
	  'catch': function (onRejected) {
	    return this.then(undefined, onRejected);
	  }
	});

	// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
	if (isCallable$6(NativePromiseConstructor$1)) {
	  var method$1 = getBuiltIn$3('Promise').prototype['catch'];
	  if (NativePromisePrototype$1['catch'] !== method$1) {
	    defineBuiltIn$8(NativePromisePrototype$1, 'catch', method$1, { unsafe: true });
	  }
	}

	var $$o = _export;
	var call$g = functionCall;
	var aCallable$4 = aCallable$c;
	var newPromiseCapabilityModule$1 = newPromiseCapability$2;
	var perform = perform$3;
	var iterate = iterate$2;
	var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;

	// `Promise.race` method
	// https://tc39.es/ecma262/#sec-promise.race
	$$o({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapabilityModule$1.f(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aCallable$4(C.resolve);
	      iterate(iterable, function (promise) {
	        call$g($promiseResolve, C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var $$n = _export;
	var newPromiseCapabilityModule = newPromiseCapability$2;
	var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;

	// `Promise.reject` method
	// https://tc39.es/ecma262/#sec-promise.reject
	$$n({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
	  reject: function reject(r) {
	    var capability = newPromiseCapabilityModule.f(this);
	    var capabilityReject = capability.reject;
	    capabilityReject(r);
	    return capability.promise;
	  }
	});

	var anObject$a = anObject$j;
	var isObject$c = isObject$n;
	var newPromiseCapability = newPromiseCapability$2;

	var promiseResolve$2 = function (C, x) {
	  anObject$a(C);
	  if (isObject$c(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var $$m = _export;
	var getBuiltIn$2 = getBuiltIn$9;
	var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
	var promiseResolve$1 = promiseResolve$2;

	getBuiltIn$2('Promise');

	// `Promise.resolve` method
	// https://tc39.es/ecma262/#sec-promise.resolve
	$$m({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
	  resolve: function resolve(x) {
	    return promiseResolve$1(this, x);
	  }
	});

	var classof$7 = classof$c;

	var $String$1 = String;

	var toString$d = function (argument) {
	  if (classof$7(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
	  return $String$1(argument);
	};

	var uncurryThis$r = functionUncurryThis;
	var toIntegerOrInfinity$7 = toIntegerOrInfinity$a;
	var toString$c = toString$d;
	var requireObjectCoercible$7 = requireObjectCoercible$b;

	var charAt$7 = uncurryThis$r(''.charAt);
	var charCodeAt$1 = uncurryThis$r(''.charCodeAt);
	var stringSlice$9 = uncurryThis$r(''.slice);

	var createMethod$3 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString$c(requireObjectCoercible$7($this));
	    var position = toIntegerOrInfinity$7(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt$1(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt$1(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt$7(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice$9(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$3(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$3(true)
	};

	var charAt$6 = stringMultibyte.charAt;
	var toString$b = toString$d;
	var InternalStateModule$5 = internalState;
	var defineIterator = iteratorDefine;
	var createIterResultObject$1 = createIterResultObject$3;

	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$4 = InternalStateModule$5.set;
	var getInternalState$3 = InternalStateModule$5.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$4(this, {
	    type: STRING_ITERATOR,
	    string: toString$b(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$3(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return createIterResultObject$1(undefined, true);
	  point = charAt$6(string, index);
	  state.index += point.length;
	  return createIterResultObject$1(point, false);
	});

	var globalThis$j = globalThis_1;
	var DOMIterables = domIterables;
	var DOMTokenListPrototype = domTokenListPrototype;
	var ArrayIteratorMethods = es_array_iterator;
	var createNonEnumerableProperty$5 = createNonEnumerableProperty$a;
	var setToStringTag$3 = setToStringTag$7;
	var wellKnownSymbol$c = wellKnownSymbol$r;

	var ITERATOR$4 = wellKnownSymbol$c('iterator');
	var ArrayValues = ArrayIteratorMethods.values;

	var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR$4] !== ArrayValues) try {
	      createNonEnumerableProperty$5(CollectionPrototype, ITERATOR$4, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR$4] = ArrayValues;
	    }
	    setToStringTag$3(CollectionPrototype, COLLECTION_NAME, true);
	    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
	        createNonEnumerableProperty$5(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
	      }
	    }
	  }
	};

	for (var COLLECTION_NAME in DOMIterables) {
	  handlePrototype(globalThis$j[COLLECTION_NAME] && globalThis$j[COLLECTION_NAME].prototype, COLLECTION_NAME);
	}

	handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

	var $TypeError$6 = TypeError;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

	var doesNotExceedSafeInteger$1 = function (it) {
	  if (it > MAX_SAFE_INTEGER) throw new $TypeError$6('Maximum allowed index exceeded');
	  return it;
	};

	var DESCRIPTORS$9 = descriptors;
	var isArray$2 = isArray$5;

	var $TypeError$5 = TypeError;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// Safari < 13 does not throw an error in this case
	var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS$9 && !function () {
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

	var fails$s = fails$G;
	var wellKnownSymbol$b = wellKnownSymbol$r;
	var V8_VERSION$1 = environmentV8Version;

	var SPECIES$2 = wellKnownSymbol$b('species');

	var arrayMethodHasSpeciesSupport$4 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$1 >= 51 || !fails$s(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$2] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $$l = _export;
	var fails$r = fails$G;
	var isArray$1 = isArray$5;
	var isObject$b = isObject$n;
	var toObject$8 = toObject$c;
	var lengthOfArrayLike$a = lengthOfArrayLike$e;
	var doesNotExceedSafeInteger = doesNotExceedSafeInteger$1;
	var createProperty$2 = createProperty$4;
	var setArrayLength$2 = arraySetLength;
	var arraySpeciesCreate = arraySpeciesCreate$2;
	var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$4;
	var wellKnownSymbol$a = wellKnownSymbol$r;
	var V8_VERSION = environmentV8Version;

	var IS_CONCAT_SPREADABLE = wellKnownSymbol$a('isConcatSpreadable');

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$r(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var isConcatSpreadable = function (O) {
	  if (!isObject$b(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray$1(O);
	};

	var FORCED$7 = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport$3('concat');

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	$$l({ target: 'Array', proto: true, arity: 1, forced: FORCED$7 }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject$8(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = lengthOfArrayLike$a(E);
	        doesNotExceedSafeInteger(n + len);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty$2(A, n, E[k]);
	      } else {
	        doesNotExceedSafeInteger(n + 1);
	        createProperty$2(A, n++, E);
	      }
	    }
	    setArrayLength$2(A, n);
	    return A;
	  }
	});

	/* eslint-disable es/no-array-prototype-indexof -- required for testing */
	var $$k = _export;
	var uncurryThis$q = functionUncurryThisClause;
	var $indexOf$1 = arrayIncludes.indexOf;
	var arrayMethodIsStrict$2 = arrayMethodIsStrict$4;

	var nativeIndexOf = uncurryThis$q([].indexOf);

	var NEGATIVE_ZERO$1 = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
	var FORCED$6 = NEGATIVE_ZERO$1 || !arrayMethodIsStrict$2('indexOf');

	// `Array.prototype.indexOf` method
	// https://tc39.es/ecma262/#sec-array.prototype.indexof
	$$k({ target: 'Array', proto: true, forced: FORCED$6 }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
	    return NEGATIVE_ZERO$1
	      // convert -0 to +0
	      ? nativeIndexOf(this, searchElement, fromIndex) || 0
	      : $indexOf$1(this, searchElement, fromIndex);
	  }
	});

	var $$j = _export;
	var NativePromiseConstructor = promiseNativeConstructor;
	var fails$q = fails$G;
	var getBuiltIn$1 = getBuiltIn$9;
	var isCallable$5 = isCallable$p;
	var speciesConstructor$1 = speciesConstructor$3;
	var promiseResolve = promiseResolve$2;
	var defineBuiltIn$7 = defineBuiltIn$e;

	var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

	// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
	var NON_GENERIC = !!NativePromiseConstructor && fails$q(function () {
	  // eslint-disable-next-line unicorn/no-thenable -- required for testing
	  NativePromisePrototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
	});

	// `Promise.prototype.finally` method
	// https://tc39.es/ecma262/#sec-promise.prototype.finally
	$$j({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
	  'finally': function (onFinally) {
	    var C = speciesConstructor$1(this, getBuiltIn$1('Promise'));
	    var isFunction = isCallable$5(onFinally);
	    return this.then(
	      isFunction ? function (x) {
	        return promiseResolve(C, onFinally()).then(function () { return x; });
	      } : onFinally,
	      isFunction ? function (e) {
	        return promiseResolve(C, onFinally()).then(function () { throw e; });
	      } : onFinally
	    );
	  }
	});

	// makes sure that native promise-based APIs `Promise#finally` properly works with patched `Promise#then`
	if (isCallable$5(NativePromiseConstructor)) {
	  var method = getBuiltIn$1('Promise').prototype['finally'];
	  if (NativePromisePrototype['finally'] !== method) {
	    defineBuiltIn$7(NativePromisePrototype, 'finally', method, { unsafe: true });
	  }
	}

	var anObject$9 = anObject$j;

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags$1 = function () {
	  var that = anObject$9(this);
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

	var fails$p = fails$G;
	var globalThis$i = globalThis_1;

	// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	var $RegExp$2 = globalThis$i.RegExp;

	var UNSUPPORTED_Y$3 = fails$p(function () {
	  var re = $RegExp$2('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') !== null;
	});

	// UC Browser bug
	// https://github.com/zloirock/core-js/issues/1008
	var MISSED_STICKY$1 = UNSUPPORTED_Y$3 || fails$p(function () {
	  return !$RegExp$2('a', 'y').sticky;
	});

	var BROKEN_CARET = UNSUPPORTED_Y$3 || fails$p(function () {
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

	var fails$o = fails$G;
	var globalThis$h = globalThis_1;

	// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
	var $RegExp$1 = globalThis$h.RegExp;

	var regexpUnsupportedDotAll = fails$o(function () {
	  var re = $RegExp$1('.', 's');
	  return !(re.dotAll && re.test('\n') && re.flags === 's');
	});

	var fails$n = fails$G;
	var globalThis$g = globalThis_1;

	// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
	var $RegExp = globalThis$g.RegExp;

	var regexpUnsupportedNcg = fails$n(function () {
	  var re = $RegExp('(?<a>b)', 'g');
	  return re.exec('b').groups.a !== 'b' ||
	    'b'.replace(re, '$<a>c') !== 'bc';
	});

	/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
	/* eslint-disable regexp/no-useless-quantifier -- testing */
	var call$f = functionCall;
	var uncurryThis$p = functionUncurryThis;
	var toString$a = toString$d;
	var regexpFlags = regexpFlags$1;
	var stickyHelpers$2 = regexpStickyHelpers;
	var shared = shared$4;
	var create$3 = objectCreate;
	var getInternalState$2 = internalState.get;
	var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;

	var nativeReplace = shared('native-string-replace', String.prototype.replace);
	var nativeExec = RegExp.prototype.exec;
	var patchedExec = nativeExec;
	var charAt$5 = uncurryThis$p(''.charAt);
	var indexOf = uncurryThis$p(''.indexOf);
	var replace$6 = uncurryThis$p(''.replace);
	var stringSlice$8 = uncurryThis$p(''.slice);

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  call$f(nativeExec, re1, 'a');
	  call$f(nativeExec, re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y$2 = stickyHelpers$2.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2 || UNSUPPORTED_DOT_ALL$1 || UNSUPPORTED_NCG$1;

	var setGroups = function (re, groups) {
	  var object = re.groups = create$3(null);
	  for (var i = 0; i < groups.length; i++) {
	    var group = groups[i];
	    object[group[0]] = re[group[1]];
	  }
	};

	if (PATCH) {
	  patchedExec = function exec(string) {
	    var re = this;
	    var state = getInternalState$2(re);
	    var str = toString$a(string);
	    var raw = state.raw;
	    var result, reCopy, lastIndex;

	    if (raw) {
	      raw.lastIndex = re.lastIndex;
	      result = call$f(patchedExec, raw, str);
	      re.lastIndex = raw.lastIndex;

	      if (result && state.groups) setGroups(result, state.groups);

	      return result;
	    }

	    var groups = state.groups;
	    var sticky = UNSUPPORTED_Y$2 && re.sticky;
	    var flags = call$f(regexpFlags, re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = replace$6(flags, 'y', '');
	      if (indexOf(flags, 'g') === -1) {
	        flags += 'g';
	      }

	      strCopy = stringSlice$8(str, re.lastIndex);
	      // Support anchored sticky behavior.
	      var prevChar = re.lastIndex > 0 && charAt$5(str, re.lastIndex - 1);
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

	    var match = call$f(nativeExec, sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = str;
	        match[0] = stringSlice$8(match[0], charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
	      call$f(nativeReplace, match[0], reCopy, function () {
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

	var $$i = _export;
	var exec$5 = regexpExec$2;

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	$$i({ target: 'RegExp', proto: true, forced: /./.exec !== exec$5 }, {
	  exec: exec$5
	});

	// TODO: Remove from `core-js@4` since it's moved to entry points

	var call$e = functionCall;
	var defineBuiltIn$6 = defineBuiltIn$e;
	var regexpExec$1 = regexpExec$2;
	var fails$m = fails$G;
	var wellKnownSymbol$9 = wellKnownSymbol$r;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$a;

	var SPECIES$1 = wellKnownSymbol$9('species');
	var RegExpPrototype$3 = RegExp.prototype;

	var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
	  var SYMBOL = wellKnownSymbol$9(KEY);

	  var DELEGATES_TO_SYMBOL = !fails$m(function () {
	    // String methods call symbol-named RegExp methods
	    var O = {};
	    // eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) !== 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$m(function () {
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
	      constructor[SPECIES$1] = function () { return re; };
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
	          return { done: true, value: call$e(nativeRegExpMethod, regexp, str, arg2) };
	        }
	        return { done: true, value: call$e(nativeMethod, str, regexp, arg2) };
	      }
	      return { done: false };
	    });

	    defineBuiltIn$6(String.prototype, KEY, methods[0]);
	    defineBuiltIn$6(RegExpPrototype$3, SYMBOL, methods[1]);
	  }

	  if (SHAM) createNonEnumerableProperty$4(RegExpPrototype$3[SYMBOL], 'sham', true);
	};

	var charAt$4 = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex$3 = function (S, index, unicode) {
	  return index + (unicode ? charAt$4(S, index).length || 1 : 1);
	};

	var globalThis$f = globalThis_1;
	var fails$l = fails$G;

	// babel-minify and Closure Compiler transpiles RegExp('.', 'd') -> /./d and it causes SyntaxError
	var RegExp$1 = globalThis$f.RegExp;

	var FLAGS_GETTER_IS_CORRECT = !fails$l(function () {
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

	var call$d = functionCall;
	var hasOwn$5 = hasOwnProperty_1;
	var isPrototypeOf$3 = objectIsPrototypeOf;
	var regExpFlagsDetection = regexpFlagsDetection;
	var regExpFlagsGetterImplementation = regexpFlags$1;

	var RegExpPrototype$2 = RegExp.prototype;

	var regexpGetFlags = regExpFlagsDetection.correct ? function (it) {
	  return it.flags;
	} : function (it) {
	  return (!regExpFlagsDetection.correct && isPrototypeOf$3(RegExpPrototype$2, it) && !hasOwn$5(it, 'flags'))
	    ? call$d(regExpFlagsGetterImplementation, it)
	    : it.flags;
	};

	var call$c = functionCall;
	var anObject$8 = anObject$j;
	var isCallable$4 = isCallable$p;
	var classof$6 = classofRaw$2;
	var regexpExec = regexpExec$2;

	var $TypeError$4 = TypeError;

	// `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (isCallable$4(exec)) {
	    var result = call$c(exec, R, S);
	    if (result !== null) anObject$8(result);
	    return result;
	  }
	  if (classof$6(R) === 'RegExp') return call$c(regexpExec, R, S);
	  throw new $TypeError$4('RegExp#exec called on incompatible receiver');
	};

	var call$b = functionCall;
	var uncurryThis$o = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic$3 = fixRegexpWellKnownSymbolLogic;
	var anObject$7 = anObject$j;
	var isObject$a = isObject$n;
	var toLength$6 = toLength$8;
	var toString$9 = toString$d;
	var requireObjectCoercible$6 = requireObjectCoercible$b;
	var getMethod$3 = getMethod$7;
	var advanceStringIndex$2 = advanceStringIndex$3;
	var getRegExpFlags$4 = regexpGetFlags;
	var regExpExec$3 = regexpExecAbstract;

	var stringIndexOf$3 = uncurryThis$o(''.indexOf);

	// @@match logic
	fixRegExpWellKnownSymbolLogic$3('match', function (MATCH, nativeMatch, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.es/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = requireObjectCoercible$6(this);
	      var matcher = isObject$a(regexp) ? getMethod$3(regexp, MATCH) : undefined;
	      return matcher ? call$b(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString$9(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
	    function (string) {
	      var rx = anObject$7(this);
	      var S = toString$9(string);
	      var res = maybeCallNative(nativeMatch, rx, S);

	      if (res.done) return res.value;

	      var flags = toString$9(getRegExpFlags$4(rx));

	      if (!~stringIndexOf$3(flags, 'g')) return regExpExec$3(rx, S);

	      var fullUnicode = !!~stringIndexOf$3(flags, 'u') || !!~stringIndexOf$3(flags, 'v');
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = regExpExec$3(rx, S)) !== null) {
	        var matchStr = toString$9(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = advanceStringIndex$2(S, toLength$6(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	var uncurryThis$n = functionUncurryThis;
	var toObject$7 = toObject$c;

	var floor$9 = Math.floor;
	var charAt$3 = uncurryThis$n(''.charAt);
	var replace$5 = uncurryThis$n(''.replace);
	var stringSlice$7 = uncurryThis$n(''.slice);
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
	    namedCaptures = toObject$7(namedCaptures);
	    symbols = SUBSTITUTION_SYMBOLS;
	  }
	  return replace$5(replacement, symbols, function (match, ch) {
	    var capture;
	    switch (charAt$3(ch, 0)) {
	      case '$': return '$';
	      case '&': return matched;
	      case '`': return stringSlice$7(str, 0, position);
	      case "'": return stringSlice$7(str, tailPos);
	      case '<':
	        capture = namedCaptures[stringSlice$7(ch, 1, -1)];
	        break;
	      default: // \d\d?
	        var n = +ch;
	        if (n === 0) return match;
	        if (n > m) {
	          var f = floor$9(n / 10);
	          if (f === 0) return match;
	          if (f <= m) return captures[f - 1] === undefined ? charAt$3(ch, 1) : captures[f - 1] + charAt$3(ch, 1);
	          return match;
	        }
	        capture = captures[n - 1];
	    }
	    return capture === undefined ? '' : capture;
	  });
	};

	var apply$3 = functionApply;
	var call$a = functionCall;
	var uncurryThis$m = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
	var fails$k = fails$G;
	var anObject$6 = anObject$j;
	var isCallable$3 = isCallable$p;
	var isObject$9 = isObject$n;
	var toIntegerOrInfinity$6 = toIntegerOrInfinity$a;
	var toLength$5 = toLength$8;
	var toString$8 = toString$d;
	var requireObjectCoercible$5 = requireObjectCoercible$b;
	var advanceStringIndex$1 = advanceStringIndex$3;
	var getMethod$2 = getMethod$7;
	var getSubstitution = getSubstitution$1;
	var getRegExpFlags$3 = regexpGetFlags;
	var regExpExec$2 = regexpExecAbstract;
	var wellKnownSymbol$8 = wellKnownSymbol$r;

	var REPLACE = wellKnownSymbol$8('replace');
	var max$1 = Math.max;
	var min$4 = Math.min;
	var concat$1 = uncurryThis$m([].concat);
	var push$6 = uncurryThis$m([].push);
	var stringIndexOf$2 = uncurryThis$m(''.indexOf);
	var stringSlice$6 = uncurryThis$m(''.slice);

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

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$k(function () {
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
	fixRegExpWellKnownSymbolLogic$2('replace', function (_, nativeReplace, maybeCallNative) {
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

	  return [
	    // `String.prototype.replace` method
	    // https://tc39.es/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible$5(this);
	      var replacer = isObject$9(searchValue) ? getMethod$2(searchValue, REPLACE) : undefined;
	      return replacer
	        ? call$a(replacer, searchValue, O, replaceValue)
	        : call$a(nativeReplace, toString$8(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
	    function (string, replaceValue) {
	      var rx = anObject$6(this);
	      var S = toString$8(string);

	      var functionalReplace = isCallable$3(replaceValue);
	      if (!functionalReplace) replaceValue = toString$8(replaceValue);
	      var flags = toString$8(getRegExpFlags$3(rx));

	      if (
	        typeof replaceValue == 'string' &&
	        !~stringIndexOf$2(replaceValue, UNSAFE_SUBSTITUTE) &&
	        !~stringIndexOf$2(replaceValue, '$<') &&
	        !~stringIndexOf$2(flags, 'y')
	      ) {
	        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
	        if (res.done) return res.value;
	      }

	      var global = !!~stringIndexOf$2(flags, 'g');
	      var fullUnicode;
	      if (global) {
	        fullUnicode = !!~stringIndexOf$2(flags, 'u') || !!~stringIndexOf$2(flags, 'v');
	        rx.lastIndex = 0;
	      }

	      var results = [];
	      var result;
	      while (true) {
	        result = regExpExec$2(rx, S);
	        if (result === null) break;

	        push$6(results, result);
	        if (!global) break;

	        var matchStr = toString$8(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$5(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = toString$8(result[0]);
	        var position = max$1(min$4(toIntegerOrInfinity$6(result.index), S.length), 0);
	        var captures = [];
	        var replacement;
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) push$6(captures, maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = concat$1([matched], captures, position, S);
	          if (namedCaptures !== undefined) push$6(replacerArgs, namedCaptures);
	          replacement = toString$8(apply$3(replaceValue, undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += stringSlice$6(S, nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }

	      return accumulatedResult + stringSlice$6(S, nextSourcePosition);
	    }
	  ];
	}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

	// a string of all valid unicode whitespaces
	var whitespaces$3 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var uncurryThis$l = functionUncurryThis;
	var requireObjectCoercible$4 = requireObjectCoercible$b;
	var toString$7 = toString$d;
	var whitespaces$2 = whitespaces$3;

	var replace$4 = uncurryThis$l(''.replace);
	var ltrim = RegExp('^[' + whitespaces$2 + ']+');
	var rtrim = RegExp('(^|[^' + whitespaces$2 + '])[' + whitespaces$2 + ']+$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$2 = function (TYPE) {
	  return function ($this) {
	    var string = toString$7(requireObjectCoercible$4($this));
	    if (TYPE & 1) string = replace$4(string, ltrim, '');
	    if (TYPE & 2) string = replace$4(string, rtrim, '$1');
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

	var PROPER_FUNCTION_NAME$2 = functionName.PROPER;
	var fails$j = fails$G;
	var whitespaces$1 = whitespaces$3;

	var non = '\u200B\u0085\u180E';

	// check that a method works with the correct list
	// of whitespaces and has a correct name
	var stringTrimForced = function (METHOD_NAME) {
	  return fails$j(function () {
	    return !!whitespaces$1[METHOD_NAME]()
	      || non[METHOD_NAME]() !== non
	      || (PROPER_FUNCTION_NAME$2 && whitespaces$1[METHOD_NAME].name !== METHOD_NAME);
	  });
	};

	var $$h = _export;
	var $trim = stringTrim.trim;
	var forcedStringTrimMethod = stringTrimForced;

	// `String.prototype.trim` method
	// https://tc39.es/ecma262/#sec-string.prototype.trim
	$$h({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	var globalThis$e = globalThis_1;
	var fails$i = fails$G;
	var uncurryThis$k = functionUncurryThis;
	var toString$6 = toString$d;
	var trim = stringTrim.trim;
	var whitespaces = whitespaces$3;

	var $parseInt$2 = globalThis$e.parseInt;
	var Symbol$1 = globalThis$e.Symbol;
	var ITERATOR$3 = Symbol$1 && Symbol$1.iterator;
	var hex = /^[+-]?0x/i;
	var exec$4 = uncurryThis$k(hex.exec);
	var FORCED$5 = $parseInt$2(whitespaces + '08') !== 8 || $parseInt$2(whitespaces + '0x16') !== 22
	  // MS Edge 18- broken with boxed symbols
	  || (ITERATOR$3 && !fails$i(function () { $parseInt$2(Object(ITERATOR$3)); }));

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	var numberParseInt = FORCED$5 ? function parseInt(string, radix) {
	  var S = trim(toString$6(string));
	  return $parseInt$2(S, (radix >>> 0) || (exec$4(hex, S) ? 16 : 10));
	} : $parseInt$2;

	var $$g = _export;
	var $parseInt$1 = numberParseInt;

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	$$g({ global: true, forced: parseInt !== $parseInt$1 }, {
	  parseInt: $parseInt$1
	});

	var Utils = /*#__PURE__*/function () {
	  function Utils() {
	    _classCallCheck(this, Utils);
	  }
	  return _createClass(Utils, null, [{
	    key: "clear",
	    value: function clear(str) {
	      return str.replace(/\&quot;/g, '"').replace(/\&#039;/g, "'").replace(/\&amp;/g, "&").replace(/\&.+?;/g, '');
	    }
	  }, {
	    key: "isHD",
	    value: function isHD(name) {
	      var math = name.toLowerCase().match(' .hd$| .нd$| .hd | .нd | hd$| нd&| hd | нd ');
	      return math ? math[0].trim() : '';
	    }
	  }, {
	    key: "clearHDSD",
	    value: function clearHDSD(name) {
	      return name.replace(/ hd$| нd$| .hd$| .нd$/gi, '').replace(/ sd$/gi, '').replace(/ hd | нd | .hd | .нd /gi, ' ').replace(/ sd /gi, ' ');
	    }
	  }, {
	    key: "clearMenuName",
	    value: function clearMenuName(name) {
	      return name.replace(/^\d+\. /gi, '').replace(/^\d+ /gi, '');
	    }
	  }, {
	    key: "clearChannelName",
	    value: function clearChannelName(name) {
	      return this.clearHDSD(this.clear(name));
	    }
	  }, {
	    key: "hasArchive",
	    value: function hasArchive(channel) {
	      if (channel.catchup) {
	        var days = parseInt(channel.catchup.days);
	        if (!isNaN(days) && days > 0) return days;
	      }
	      return 0;
	    }
	  }, {
	    key: "canUseDB",
	    value: function canUseDB() {
	      return DB.db && Lampa.Storage.get('iptv_use_db', 'indexdb') == 'indexdb';
	    }
	  }]);
	}();

	var favorites = [];
	var Favorites = /*#__PURE__*/function () {
	  function Favorites() {
	    _classCallCheck(this, Favorites);
	  }
	  return _createClass(Favorites, null, [{
	    key: "load",
	    value: function load() {
	      var _this = this;
	      return new Promise(function (resolve, reject) {
	        if (Utils.canUseDB()) {
	          DB.getData('favorites').then(function (result) {
	            favorites = result || [];
	          }).finally(resolve);
	        } else {
	          _this.nosuport();
	          resolve();
	        }
	      });
	    }
	  }, {
	    key: "nosuport",
	    value: function nosuport() {
	      favorites = Lampa.Storage.get('iptv_favorite_channels', '[]');
	    }
	  }, {
	    key: "list",
	    value: function list() {
	      return favorites;
	    }
	  }, {
	    key: "key",
	    value: function key() {
	      return Lampa.Storage.get('iptv_favotite_save', 'url');
	    }
	  }, {
	    key: "find",
	    value: function find(favorite) {
	      var _this2 = this;
	      return favorites.find(function (a) {
	        return a[_this2.key()] == favorite[_this2.key()];
	      });
	    }
	  }, {
	    key: "remove",
	    value: function remove(favorite) {
	      var _this3 = this;
	      return new Promise(function (resolve, reject) {
	        var find = favorites.find(function (a) {
	          return a[_this3.key()] == favorite[_this3.key()];
	        });
	        if (find) {
	          if (Utils.canUseDB()) {
	            DB.deleteData('favorites', favorite[_this3.key()]).then(function () {
	              Lampa.Arrays.remove(favorites, find);
	              resolve();
	            }).catch(reject);
	          } else {
	            Lampa.Arrays.remove(favorites, find);
	            Lampa.Storage.set('iptv_favorite_channels', favorites);
	            resolve();
	          }
	        } else reject();
	      });
	    }
	  }, {
	    key: "add",
	    value: function add(favorite) {
	      var _this4 = this;
	      return new Promise(function (resolve, reject) {
	        if (!favorites.find(function (a) {
	          return a[_this4.key()] == favorite[_this4.key()];
	        })) {
	          Lampa.Arrays.extend(favorite, {
	            view: 0,
	            added: Date.now()
	          });
	          if (Utils.canUseDB()) {
	            DB.addData('favorites', favorite[_this4.key()], favorite).then(function () {
	              favorites.push(favorite);
	              resolve();
	            }).catch(reject);
	          } else {
	            favorites.push(favorite);
	            Lampa.Storage.set('iptv_favorite_channels', favorites);
	            resolve();
	          }
	        } else reject();
	      });
	    }
	  }, {
	    key: "update",
	    value: function update(favorite) {
	      var _this5 = this;
	      return new Promise(function (resolve, reject) {
	        if (favorites.find(function (a) {
	          return a[_this5.key()] == favorite[_this5.key()];
	        })) {
	          Lampa.Arrays.extend(favorite, {
	            view: 0,
	            added: Date.now()
	          });
	          if (Utils.canUseDB()) DB.updateData('favorites', favorite[_this5.key()], favorite).then(resolve).catch(reject);else {
	            Lampa.Storage.set('iptv_favorite_channels', favorites);
	            resolve();
	          }
	        } else reject();
	      });
	    }
	  }, {
	    key: "toggle",
	    value: function toggle(favorite) {
	      return this.find(favorite) ? this.remove(favorite) : this.add(favorite);
	    }
	  }]);
	}();

	var locked = [];
	var Locked = /*#__PURE__*/function () {
	  function Locked() {
	    _classCallCheck(this, Locked);
	  }
	  return _createClass(Locked, null, [{
	    key: "load",
	    value: function load() {
	      var _this = this;
	      return new Promise(function (resolve, reject) {
	        if (Utils.canUseDB()) {
	          DB.getData('locked').then(function (result) {
	            locked = result || [];
	          }).finally(resolve);
	        } else {
	          _this.nosuport();
	          resolve();
	        }
	      });
	    }
	  }, {
	    key: "nosuport",
	    value: function nosuport() {
	      locked = Lampa.Storage.get('iptv_locked_channels', '[]');
	    }
	  }, {
	    key: "list",
	    value: function list() {
	      return locked;
	    }
	  }, {
	    key: "find",
	    value: function find(key) {
	      return locked.find(function (a) {
	        return a == key;
	      });
	    }
	  }, {
	    key: "format",
	    value: function format(type, element) {
	      return type == 'channel' ? 'channel:' + element[Lampa.Storage.get('iptv_favotite_save', 'url')] : type == 'group' ? 'group:' + element : 'other:' + element;
	    }
	  }, {
	    key: "remove",
	    value: function remove(key) {
	      return new Promise(function (resolve, reject) {
	        var find = locked.find(function (a) {
	          return a == key;
	        });
	        if (find) {
	          if (Utils.canUseDB()) {
	            DB.deleteData('locked', key).then(function () {
	              Lampa.Arrays.remove(locked, find);
	              resolve();
	            }).catch(reject);
	          } else {
	            Lampa.Arrays.remove(locked, find);
	            Lampa.Storage.set('iptv_locked_channels', locked);
	            resolve();
	          }
	        } else reject();
	      });
	    }
	  }, {
	    key: "add",
	    value: function add(key) {
	      return new Promise(function (resolve, reject) {
	        if (!locked.find(function (a) {
	          return a == key;
	        })) {
	          if (Utils.canUseDB()) {
	            DB.addData('locked', key, key).then(function () {
	              locked.push(key);
	              resolve();
	            }).catch(reject);
	          } else {
	            locked.push(key);
	            Lampa.Storage.set('iptv_locked_channels', locked);
	            resolve();
	          }
	        } else reject();
	      });
	    }
	  }, {
	    key: "update",
	    value: function update(key) {
	      return new Promise(function (resolve, reject) {
	        if (locked.find(function (a) {
	          return a == key;
	        })) {
	          if (Utils.canUseDB()) DB.updateData('locked', key, key).then(resolve).catch(reject);else {
	            Lampa.Storage.set('iptv_locked_channels', locked);
	            resolve();
	          }
	        } else reject();
	      });
	    }
	  }, {
	    key: "toggle",
	    value: function toggle(key) {
	      return this.find(key) ? this.remove(key) : this.add(key);
	    }
	  }]);
	}();

	var DB = new Lampa.DB('cub_iptv', ['playlist', 'params', 'epg', 'favorites', 'other', 'epg_channels', 'locked'], 6);
	DB.logs = true;
	DB.openDatabase().then(function () {
	  Favorites.load();
	  Locked.load();
	}).catch(function () {
	  Favorites.nosuport();
	  Locked.nosuport();
	});

	function fixParams(params_data) {
	  var params = params_data || {};
	  Lampa.Arrays.extend(params, {
	    update: 'none',
	    update_time: Date.now(),
	    loading: 'cub'
	  });
	  return params;
	}
	var Params = /*#__PURE__*/function () {
	  function Params() {
	    _classCallCheck(this, Params);
	  }
	  return _createClass(Params, null, [{
	    key: "get",
	    value: function get(id) {
	      return new Promise(function (resolve) {
	        if (Utils.canUseDB()) {
	          DB.getDataAnyCase('params', id).then(function (params) {
	            resolve(fixParams(params));
	          });
	        } else {
	          resolve(fixParams(Lampa.Storage.get('iptv_playlist_params_' + id, '{}')));
	        }
	      });
	    }
	  }, {
	    key: "set",
	    value: function set(id, params) {
	      if (Utils.canUseDB()) {
	        return DB.rewriteData('params', id, fixParams(params));
	      } else {
	        return new Promise(function (resolve) {
	          Lampa.Storage.set('iptv_playlist_params_' + id, fixParams(params));
	          resolve();
	        });
	      }
	    }
	  }, {
	    key: "value",
	    value: function value(params, name) {
	      return Lampa.Lang.translate('iptv_params_' + params[name]);
	    }
	  }]);
	}();

	var $$f = _export;
	var $map$1 = arrayIteration.map;
	var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$4;

	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$2('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	$$f({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var DESCRIPTORS$8 = descriptors;
	var fails$h = fails$G;
	var uncurryThis$j = functionUncurryThis;
	var objectGetPrototypeOf = objectGetPrototypeOf$1;
	var objectKeys$1 = objectKeys$3;
	var toIndexedObject$3 = toIndexedObject$9;
	var $propertyIsEnumerable = objectPropertyIsEnumerable.f;

	var propertyIsEnumerable = uncurryThis$j($propertyIsEnumerable);
	var push$5 = uncurryThis$j([].push);

	// in some IE versions, `propertyIsEnumerable` returns incorrect result on integer keys
	// of `null` prototype objects
	var IE_BUG = DESCRIPTORS$8 && fails$h(function () {
	  // eslint-disable-next-line es/no-object-create -- safe
	  var O = Object.create(null);
	  O[2] = 2;
	  return !propertyIsEnumerable(O, 2);
	});

	// `Object.{ entries, values }` methods implementation
	var createMethod$1 = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject$3(it);
	    var keys = objectKeys$1(O);
	    var IE_WORKAROUND = IE_BUG && objectGetPrototypeOf(O) === null;
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!DESCRIPTORS$8 || (IE_WORKAROUND ? key in O : propertyIsEnumerable(O, key))) {
	        push$5(result, TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	var objectToArray = {
	  // `Object.entries` method
	  // https://tc39.es/ecma262/#sec-object.entries
	  entries: createMethod$1(true),
	  // `Object.values` method
	  // https://tc39.es/ecma262/#sec-object.values
	  values: createMethod$1(false)
	};

	var $$e = _export;
	var $values = objectToArray.values;

	// `Object.values` method
	// https://tc39.es/ecma262/#sec-object.values
	$$e({ target: 'Object', stat: true }, {
	  values: function values(O) {
	    return $values(O);
	  }
	});

	var isCallable$2 = isCallable$p;
	var isObject$8 = isObject$n;
	var setPrototypeOf$3 = objectSetPrototypeOf;

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired$3 = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    setPrototypeOf$3 &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    isCallable$2(NewTarget = dummy.constructor) &&
	    NewTarget !== Wrapper &&
	    isObject$8(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) setPrototypeOf$3($this, NewTargetPrototype);
	  return $this;
	};

	var isObject$7 = isObject$n;
	var classof$5 = classofRaw$2;
	var wellKnownSymbol$7 = wellKnownSymbol$r;

	var MATCH$2 = wellKnownSymbol$7('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject$7(it) && ((isRegExp = it[MATCH$2]) !== undefined ? !!isRegExp : classof$5(it) === 'RegExp');
	};

	var defineProperty$1 = objectDefineProperty.f;

	var proxyAccessor$1 = function (Target, Source, key) {
	  key in Target || defineProperty$1(Target, key, {
	    configurable: true,
	    get: function () { return Source[key]; },
	    set: function (it) { Source[key] = it; }
	  });
	};

	var DESCRIPTORS$7 = descriptors;
	var globalThis$d = globalThis_1;
	var uncurryThis$i = functionUncurryThis;
	var isForced = isForced_1;
	var inheritIfRequired$2 = inheritIfRequired$3;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$a;
	var create$2 = objectCreate;
	var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var isPrototypeOf$2 = objectIsPrototypeOf;
	var isRegExp$1 = isRegexp;
	var toString$5 = toString$d;
	var getRegExpFlags$2 = regexpGetFlags;
	var stickyHelpers$1 = regexpStickyHelpers;
	var proxyAccessor = proxyAccessor$1;
	var defineBuiltIn$5 = defineBuiltIn$e;
	var fails$g = fails$G;
	var hasOwn$4 = hasOwnProperty_1;
	var enforceInternalState$2 = internalState.enforce;
	var setSpecies$2 = setSpecies$4;
	var wellKnownSymbol$6 = wellKnownSymbol$r;
	var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG = regexpUnsupportedNcg;

	var MATCH$1 = wellKnownSymbol$6('match');
	var NativeRegExp = globalThis$d.RegExp;
	var RegExpPrototype$1 = NativeRegExp.prototype;
	var SyntaxError = globalThis$d.SyntaxError;
	var exec$3 = uncurryThis$i(RegExpPrototype$1.exec);
	var charAt$2 = uncurryThis$i(''.charAt);
	var replace$3 = uncurryThis$i(''.replace);
	var stringIndexOf$1 = uncurryThis$i(''.indexOf);
	var stringSlice$5 = uncurryThis$i(''.slice);
	// TODO: Use only proper RegExpIdentifierName
	var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
	var re1 = /a/g;
	var re2 = /a/g;

	// "new" should create a new object, old webkit bug
	var CORRECT_NEW = new NativeRegExp(re1) !== re1;

	var MISSED_STICKY = stickyHelpers$1.MISSED_STICKY;
	var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y;

	var BASE_FORCED = DESCRIPTORS$7 &&
	  (!CORRECT_NEW || MISSED_STICKY || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails$g(function () {
	    re2[MATCH$1] = false;
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
	    chr = charAt$2(string, index);
	    if (chr === '\\') {
	      result += chr + charAt$2(string, ++index);
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
	  var names = create$2(null);
	  var brackets = false;
	  var ncg = false;
	  var groupid = 0;
	  var groupname = '';
	  var chr;
	  for (; index < length; index++) {
	    chr = charAt$2(string, index);
	    if (chr === '\\') {
	      chr += charAt$2(string, ++index);
	      // use `\x5c` for escaped backslash to avoid corruption by `\k<name>` to `\N` replacement below
	      if (!ncg && charAt$2(chr, 1) === '\\') {
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
	        if (exec$3(IS_NCG, stringSlice$5(string, index + 1))) {
	          index += 2;
	          ncg = true;
	          groupid++;
	        } else if (charAt$2(string, index + 1) !== '?') {
	          groupid++;
	        }
	        continue;
	      case chr === '>' && ncg:
	        if (groupname === '' || hasOwn$4(names, groupname)) {
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
	      result = replace$3(result, backref, numRef);
	    }
	  } return [result, named];
	};

	// `RegExp` constructor
	// https://tc39.es/ecma262/#sec-regexp-constructor
	if (isForced('RegExp', BASE_FORCED)) {
	  var RegExpWrapper = function RegExp(pattern, flags) {
	    var thisIsRegExp = isPrototypeOf$2(RegExpPrototype$1, this);
	    var patternIsRegExp = isRegExp$1(pattern);
	    var flagsAreUndefined = flags === undefined;
	    var groups = [];
	    var rawPattern = pattern;
	    var rawFlags, dotAll, sticky, handled, result, state;

	    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
	      return pattern;
	    }

	    if (patternIsRegExp || isPrototypeOf$2(RegExpPrototype$1, pattern)) {
	      pattern = pattern.source;
	      if (flagsAreUndefined) flags = getRegExpFlags$2(rawPattern);
	    }

	    pattern = pattern === undefined ? '' : toString$5(pattern);
	    flags = flags === undefined ? '' : toString$5(flags);
	    rawPattern = pattern;

	    if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
	      dotAll = !!flags && stringIndexOf$1(flags, 's') > -1;
	      if (dotAll) flags = replace$3(flags, /s/g, '');
	    }

	    rawFlags = flags;

	    if (MISSED_STICKY && 'sticky' in re1) {
	      sticky = !!flags && stringIndexOf$1(flags, 'y') > -1;
	      if (sticky && UNSUPPORTED_Y$1) flags = replace$3(flags, /y/g, '');
	    }

	    if (UNSUPPORTED_NCG) {
	      handled = handleNCG(pattern);
	      pattern = handled[0];
	      groups = handled[1];
	    }

	    result = inheritIfRequired$2(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$1, RegExpWrapper);

	    if (dotAll || sticky || groups.length) {
	      state = enforceInternalState$2(result);
	      if (dotAll) {
	        state.dotAll = true;
	        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
	      }
	      if (sticky) state.sticky = true;
	      if (groups.length) state.groups = groups;
	    }

	    if (pattern !== rawPattern) try {
	      // fails in old engines, but we have no alternatives for unsupported regex syntax
	      createNonEnumerableProperty$3(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
	    } catch (error) { /* empty */ }

	    return result;
	  };

	  for (var keys = getOwnPropertyNames$1(NativeRegExp), index = 0; keys.length > index;) {
	    proxyAccessor(RegExpWrapper, NativeRegExp, keys[index++]);
	  }

	  RegExpPrototype$1.constructor = RegExpWrapper;
	  RegExpWrapper.prototype = RegExpPrototype$1;
	  defineBuiltIn$5(globalThis$d, 'RegExp', RegExpWrapper, { constructor: true });
	}

	// https://tc39.es/ecma262/#sec-get-regexp-@@species
	setSpecies$2('RegExp');

	var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
	var defineBuiltIn$4 = defineBuiltIn$e;
	var anObject$5 = anObject$j;
	var $toString$2 = toString$d;
	var fails$f = fails$G;
	var getRegExpFlags$1 = regexpGetFlags;

	var TO_STRING = 'toString';
	var RegExpPrototype = RegExp.prototype;
	var nativeToString = RegExpPrototype[TO_STRING];

	var NOT_GENERIC = fails$f(function () { return nativeToString.call({ source: 'a', flags: 'b' }) !== '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = PROPER_FUNCTION_NAME$1 && nativeToString.name !== TO_STRING;

	// `RegExp.prototype.toString` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  defineBuiltIn$4(RegExpPrototype, TO_STRING, function toString() {
	    var R = anObject$5(this);
	    var pattern = $toString$2(R.source);
	    var flags = $toString$2(getRegExpFlags$1(R));
	    return '/' + pattern + '/' + flags;
	  }, { unsafe: true });
	}

	var call$9 = functionCall;
	var uncurryThis$h = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
	var anObject$4 = anObject$j;
	var isObject$6 = isObject$n;
	var requireObjectCoercible$3 = requireObjectCoercible$b;
	var speciesConstructor = speciesConstructor$3;
	var advanceStringIndex = advanceStringIndex$3;
	var toLength$4 = toLength$8;
	var toString$4 = toString$d;
	var getMethod$1 = getMethod$7;
	var getRegExpFlags = regexpGetFlags;
	var regExpExec$1 = regexpExecAbstract;
	var stickyHelpers = regexpStickyHelpers;
	var fails$e = fails$G;

	var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
	var MAX_UINT32 = 0xFFFFFFFF;
	var min$3 = Math.min;
	var push$4 = uncurryThis$h([].push);
	var stringSlice$4 = uncurryThis$h(''.slice);
	var stringIndexOf = uncurryThis$h(''.indexOf);

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$e(function () {
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
	fixRegExpWellKnownSymbolLogic$1('split', function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit = '0'.split(undefined, 0).length ? function (separator, limit) {
	    return separator === undefined && limit === 0 ? [] : call$9(nativeSplit, this, separator, limit);
	  } : nativeSplit;

	  return [
	    // `String.prototype.split` method
	    // https://tc39.es/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = requireObjectCoercible$3(this);
	      var splitter = isObject$6(separator) ? getMethod$1(separator, SPLIT) : undefined;
	      return splitter
	        ? call$9(splitter, separator, O, limit)
	        : call$9(internalSplit, toString$4(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (string, limit) {
	      var rx = anObject$4(this);
	      var S = toString$4(string);

	      if (!BUGGY) {
	        var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);
	        if (res.done) return res.value;
	      }

	      var C = speciesConstructor(rx, RegExp);
	      var flags = toString$4(getRegExpFlags(rx));
	      var unicodeMatching = !!~stringIndexOf(flags, 'u') || !!~stringIndexOf(flags, 'v');
	      if (UNSUPPORTED_Y) {
	        if (!~stringIndexOf(flags, 'g')) flags += 'g';
	      } else if (!~stringIndexOf(flags, 'y')) flags += 'y';
	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return regExpExec$1(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
	        var z = regExpExec$1(splitter, UNSUPPORTED_Y ? stringSlice$4(S, q) : S);
	        var e;
	        if (
	          z === null ||
	          (e = min$3(toLength$4(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
	        ) {
	          q = advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          push$4(A, stringSlice$4(S, p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            push$4(A, z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      push$4(A, stringSlice$4(S, p));
	      return A;
	    }
	  ];
	}, BUGGY || !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

	var isRegExp = isRegexp;

	var $TypeError$3 = TypeError;

	var notARegexp = function (it) {
	  if (isRegExp(it)) {
	    throw new $TypeError$3("The method doesn't accept regular expressions");
	  } return it;
	};

	var wellKnownSymbol$5 = wellKnownSymbol$r;

	var MATCH = wellKnownSymbol$5('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (error1) {
	    try {
	      regexp[MATCH] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (error2) { /* empty */ }
	  } return false;
	};

	var $$d = _export;
	var uncurryThis$g = functionUncurryThisClause;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var toLength$3 = toLength$8;
	var toString$3 = toString$d;
	var notARegExp = notARegexp;
	var requireObjectCoercible$2 = requireObjectCoercible$b;
	var correctIsRegExpLogic = correctIsRegexpLogic;

	var stringSlice$3 = uncurryThis$g(''.slice);
	var min$2 = Math.min;

	var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
	// https://github.com/zloirock/core-js/pull/702
	var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function () {
	  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
	  return descriptor && !descriptor.writable;
	}();

	// `String.prototype.startsWith` method
	// https://tc39.es/ecma262/#sec-string.prototype.startswith
	$$d({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = toString$3(requireObjectCoercible$2(this));
	    notARegExp(searchString);
	    var search = toString$3(searchString);
	    var index = toLength$3(min$2(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    return stringSlice$3(that, index, index + search.length) === search;
	  }
	});

	var fails$d = fails$G;
	var wellKnownSymbol$4 = wellKnownSymbol$r;
	var DESCRIPTORS$6 = descriptors;
	var IS_PURE = isPure;

	var ITERATOR$2 = wellKnownSymbol$4('iterator');

	var urlConstructorDetection = !fails$d(function () {
	  // eslint-disable-next-line unicorn/relative-url-style -- required for testing
	  var url = new URL('b?a=1&b=2&c=3', 'https://a');
	  var params = url.searchParams;
	  var params2 = new URLSearchParams('a=1&a=2&b=3');
	  var result = '';
	  url.pathname = 'c%20d';
	  params.forEach(function (value, key) {
	    params['delete']('b');
	    result += key + value;
	  });
	  params2['delete']('a', 2);
	  // `undefined` case is a Chromium 117 bug
	  // https://bugs.chromium.org/p/v8/issues/detail?id=14222
	  params2['delete']('b', undefined);
	  return (IS_PURE && (!url.toJSON || !params2.has('a', 1) || params2.has('a', 2) || !params2.has('a', undefined) || params2.has('b')))
	    || (!params.size && (IS_PURE || !DESCRIPTORS$6))
	    || !params.sort
	    || url.href !== 'https://a/c%20d?a=1&c=3'
	    || params.get('c') !== '3'
	    || String(new URLSearchParams('?a=1')) !== 'a=1'
	    || !params[ITERATOR$2]
	    // throws in Edge
	    || new URL('https://a@b').username !== 'a'
	    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
	    // not punycoded in Edge
	    || new URL('https://тест').host !== 'xn--e1aybc'
	    // not escaped in Chrome 62-
	    || new URL('https://a#б').hash !== '#%D0%B1'
	    // fails in Chrome 66-
	    || result !== 'a1c3'
	    // throws in Safari
	    || new URL('https://x', undefined).host !== 'x';
	});

	var DESCRIPTORS$5 = descriptors;
	var uncurryThis$f = functionUncurryThis;
	var call$8 = functionCall;
	var fails$c = fails$G;
	var objectKeys = objectKeys$3;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var toObject$6 = toObject$c;
	var IndexedObject$1 = indexedObject;

	// eslint-disable-next-line es/no-object-assign -- safe
	var $assign = Object.assign;
	// eslint-disable-next-line es/no-object-defineproperty -- required for testing
	var defineProperty = Object.defineProperty;
	var concat = uncurryThis$f([].concat);

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	var objectAssign = !$assign || fails$c(function () {
	  // should have correct order of operations (Edge bug)
	  if (DESCRIPTORS$5 && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty(this, 'b', {
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
	  var T = toObject$6(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  var propertyIsEnumerable = propertyIsEnumerableModule.f;
	  while (argumentsLength > index) {
	    var S = IndexedObject$1(arguments[index++]);
	    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!DESCRIPTORS$5 || call$8(propertyIsEnumerable, S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;

	var anObject$3 = anObject$j;
	var iteratorClose$1 = iteratorClose$3;

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject$3(value)[0], value[1]) : fn(value);
	  } catch (error) {
	    iteratorClose$1(iterator, 'throw', error);
	  }
	};

	var bind$3 = functionBindContext;
	var call$7 = functionCall;
	var toObject$5 = toObject$c;
	var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
	var isArrayIteratorMethod$1 = isArrayIteratorMethod$3;
	var isConstructor$1 = isConstructor$4;
	var lengthOfArrayLike$9 = lengthOfArrayLike$e;
	var createProperty$1 = createProperty$4;
	var setArrayLength$1 = arraySetLength;
	var getIterator$2 = getIterator$4;
	var getIteratorMethod$2 = getIteratorMethod$5;
	var iteratorClose = iteratorClose$3;

	var $Array$2 = Array;

	// `Array.from` method implementation
	// https://tc39.es/ecma262/#sec-array.from
	var arrayFrom$1 = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	  var IS_CONSTRUCTOR = isConstructor$1(this);
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  if (mapping) mapfn = bind$3(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
	  var O = toObject$5(arrayLike);
	  var iteratorMethod = getIteratorMethod$2(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  // if the target is not iterable or it's an array with the default iterator - use a simple case
	  if (iteratorMethod && !(this === $Array$2 && isArrayIteratorMethod$1(iteratorMethod))) {
	    result = IS_CONSTRUCTOR ? new this() : [];
	    iterator = getIterator$2(O, iteratorMethod);
	    next = iterator.next;
	    for (;!(step = call$7(next, iterator)).done; index++) {
	      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
	      try {
	        createProperty$1(result, index, value);
	      } catch (error) {
	        iteratorClose(iterator, 'throw', error);
	      }
	    }
	  } else {
	    length = lengthOfArrayLike$9(O);
	    result = IS_CONSTRUCTOR ? new this(length) : $Array$2(length);
	    for (;length > index; index++) {
	      value = mapping ? mapfn(O[index], index) : O[index];
	      createProperty$1(result, index, value);
	    }
	  }
	  setArrayLength$1(result, index);
	  return result;
	};

	// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
	var uncurryThis$e = functionUncurryThis;

	var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
	var base = 36;
	var tMin = 1;
	var tMax = 26;
	var skew = 38;
	var damp = 700;
	var initialBias = 72;
	var initialN = 128; // 0x80
	var delimiter = '-'; // '\x2D'
	var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
	var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
	var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
	var baseMinusTMin = base - tMin;

	var $RangeError$6 = RangeError;
	var exec$2 = uncurryThis$e(regexSeparators.exec);
	var floor$8 = Math.floor;
	var fromCharCode$2 = String.fromCharCode;
	var charCodeAt = uncurryThis$e(''.charCodeAt);
	var join$4 = uncurryThis$e([].join);
	var push$3 = uncurryThis$e([].push);
	var replace$2 = uncurryThis$e(''.replace);
	var split$2 = uncurryThis$e(''.split);
	var toLowerCase$1 = uncurryThis$e(''.toLowerCase);

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 */
	var ucs2decode = function (string) {
	  var output = [];
	  var counter = 0;
	  var length = string.length;
	  while (counter < length) {
	    var value = charCodeAt(string, counter++);
	    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
	      // It's a high surrogate, and there is a next character.
	      var extra = charCodeAt(string, counter++);
	      if ((extra & 0xFC00) === 0xDC00) { // Low surrogate.
	        push$3(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
	      } else {
	        // It's an unmatched surrogate; only append this code unit, in case the
	        // next code unit is the high surrogate of a surrogate pair.
	        push$3(output, value);
	        counter--;
	      }
	    } else {
	      push$3(output, value);
	    }
	  }
	  return output;
	};

	/**
	 * Converts a digit/integer into a basic code point.
	 */
	var digitToBasic = function (digit) {
	  //  0..25 map to ASCII a..z or A..Z
	  // 26..35 map to ASCII 0..9
	  return digit + 22 + 75 * (digit < 26);
	};

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 */
	var adapt = function (delta, numPoints, firstTime) {
	  var k = 0;
	  delta = firstTime ? floor$8(delta / damp) : delta >> 1;
	  delta += floor$8(delta / numPoints);
	  while (delta > baseMinusTMin * tMax >> 1) {
	    delta = floor$8(delta / baseMinusTMin);
	    k += base;
	  }
	  return floor$8(k + (baseMinusTMin + 1) * delta / (delta + skew));
	};

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 */
	var encode = function (input) {
	  var output = [];

	  // Convert the input in UCS-2 to an array of Unicode code points.
	  input = ucs2decode(input);

	  // Cache the length.
	  var inputLength = input.length;

	  // Initialize the state.
	  var n = initialN;
	  var delta = 0;
	  var bias = initialBias;
	  var i, currentValue;

	  // Handle the basic code points.
	  for (i = 0; i < input.length; i++) {
	    currentValue = input[i];
	    if (currentValue < 0x80) {
	      push$3(output, fromCharCode$2(currentValue));
	    }
	  }

	  var basicLength = output.length; // number of basic code points.
	  var handledCPCount = basicLength; // number of code points that have been handled;

	  // Finish the basic string with a delimiter unless it's empty.
	  if (basicLength) {
	    push$3(output, delimiter);
	  }

	  // Main encoding loop:
	  while (handledCPCount < inputLength) {
	    // All non-basic code points < n have been handled already. Find the next larger one:
	    var m = maxInt;
	    for (i = 0; i < input.length; i++) {
	      currentValue = input[i];
	      if (currentValue >= n && currentValue < m) {
	        m = currentValue;
	      }
	    }

	    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
	    var handledCPCountPlusOne = handledCPCount + 1;
	    if (m - n > floor$8((maxInt - delta) / handledCPCountPlusOne)) {
	      throw new $RangeError$6(OVERFLOW_ERROR);
	    }

	    delta += (m - n) * handledCPCountPlusOne;
	    n = m;

	    for (i = 0; i < input.length; i++) {
	      currentValue = input[i];
	      if (currentValue < n && ++delta > maxInt) {
	        throw new $RangeError$6(OVERFLOW_ERROR);
	      }
	      if (currentValue === n) {
	        // Represent delta as a generalized variable-length integer.
	        var q = delta;
	        var k = base;
	        while (true) {
	          var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
	          if (q < t) break;
	          var qMinusT = q - t;
	          var baseMinusT = base - t;
	          push$3(output, fromCharCode$2(digitToBasic(t + qMinusT % baseMinusT)));
	          q = floor$8(qMinusT / baseMinusT);
	          k += base;
	        }

	        push$3(output, fromCharCode$2(digitToBasic(q)));
	        bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
	        delta = 0;
	        handledCPCount++;
	      }
	    }

	    delta++;
	    n++;
	  }
	  return join$4(output, '');
	};

	var stringPunycodeToAscii = function (input) {
	  var encoded = [];
	  var labels = split$2(replace$2(toLowerCase$1(input), regexSeparators, '\u002E'), '.');
	  var i, label;
	  for (i = 0; i < labels.length; i++) {
	    label = labels[i];
	    push$3(encoded, exec$2(regexNonASCII, label) ? 'xn--' + encode(label) : label);
	  }
	  return join$4(encoded, '.');
	};

	var $$c = _export;
	var uncurryThis$d = functionUncurryThis;
	var toAbsoluteIndex$5 = toAbsoluteIndex$7;

	var $RangeError$5 = RangeError;
	var fromCharCode$1 = String.fromCharCode;
	// eslint-disable-next-line es/no-string-fromcodepoint -- required for testing
	var $fromCodePoint = String.fromCodePoint;
	var join$3 = uncurryThis$d([].join);

	// length should be 1, old FF problem
	var INCORRECT_LENGTH = !!$fromCodePoint && $fromCodePoint.length !== 1;

	// `String.fromCodePoint` method
	// https://tc39.es/ecma262/#sec-string.fromcodepoint
	$$c({ target: 'String', stat: true, arity: 1, forced: INCORRECT_LENGTH }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  fromCodePoint: function fromCodePoint(x) {
	    var elements = [];
	    var length = arguments.length;
	    var i = 0;
	    var code;
	    while (length > i) {
	      code = +arguments[i];
	      if (toAbsoluteIndex$5(code, 0x10FFFF) !== code) throw new $RangeError$5(code + ' is not a valid code point');
	      elements[i++] = code < 0x10000
	        ? fromCharCode$1(code)
	        : fromCharCode$1(((code -= 0x10000) >> 10) + 0xD800, code % 0x400 + 0xDC00);
	    } return join$3(elements, '');
	  }
	});

	var defineBuiltIn$3 = defineBuiltIn$e;

	var defineBuiltIns$2 = function (target, src, options) {
	  for (var key in src) defineBuiltIn$3(target, key, src[key], options);
	  return target;
	};

	var arraySlice$4 = arraySlice$6;

	var floor$7 = Math.floor;

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
	    var middle = floor$7(length / 2);
	    var left = sort(arraySlice$4(array, 0, middle), comparefn);
	    var right = sort(arraySlice$4(array, middle), comparefn);
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

	var arraySort$1 = sort;

	// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`


	var $$b = _export;
	var globalThis$c = globalThis_1;
	var safeGetBuiltIn = safeGetBuiltIn$2;
	var getBuiltIn = getBuiltIn$9;
	var call$6 = functionCall;
	var uncurryThis$c = functionUncurryThis;
	var DESCRIPTORS$4 = descriptors;
	var USE_NATIVE_URL$1 = urlConstructorDetection;
	var defineBuiltIn$2 = defineBuiltIn$e;
	var defineBuiltInAccessor$4 = defineBuiltInAccessor$6;
	var defineBuiltIns$1 = defineBuiltIns$2;
	var setToStringTag$2 = setToStringTag$7;
	var createIteratorConstructor = iteratorCreateConstructor;
	var InternalStateModule$4 = internalState;
	var anInstance$3 = anInstance$5;
	var isCallable$1 = isCallable$p;
	var hasOwn$3 = hasOwnProperty_1;
	var bind$2 = functionBindContext;
	var classof$4 = classof$c;
	var anObject$2 = anObject$j;
	var isObject$5 = isObject$n;
	var $toString$1 = toString$d;
	var create$1 = objectCreate;
	var createPropertyDescriptor$1 = createPropertyDescriptor$6;
	var getIterator$1 = getIterator$4;
	var getIteratorMethod$1 = getIteratorMethod$5;
	var createIterResultObject = createIterResultObject$3;
	var validateArgumentsLength$1 = validateArgumentsLength$3;
	var wellKnownSymbol$3 = wellKnownSymbol$r;
	var arraySort = arraySort$1;

	var ITERATOR$1 = wellKnownSymbol$3('iterator');
	var URL_SEARCH_PARAMS = 'URLSearchParams';
	var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
	var setInternalState$3 = InternalStateModule$4.set;
	var getInternalParamsState = InternalStateModule$4.getterFor(URL_SEARCH_PARAMS);
	var getInternalIteratorState = InternalStateModule$4.getterFor(URL_SEARCH_PARAMS_ITERATOR);

	var nativeFetch = safeGetBuiltIn('fetch');
	var NativeRequest = safeGetBuiltIn('Request');
	var Headers = safeGetBuiltIn('Headers');
	var RequestPrototype = NativeRequest && NativeRequest.prototype;
	var HeadersPrototype = Headers && Headers.prototype;
	var TypeError$3 = globalThis$c.TypeError;
	var encodeURIComponent$2 = globalThis$c.encodeURIComponent;
	var fromCharCode = String.fromCharCode;
	var fromCodePoint = getBuiltIn('String', 'fromCodePoint');
	var $parseInt = parseInt;
	var charAt$1 = uncurryThis$c(''.charAt);
	var join$2 = uncurryThis$c([].join);
	var push$2 = uncurryThis$c([].push);
	var replace$1 = uncurryThis$c(''.replace);
	var shift$1 = uncurryThis$c([].shift);
	var splice = uncurryThis$c([].splice);
	var split$1 = uncurryThis$c(''.split);
	var stringSlice$2 = uncurryThis$c(''.slice);
	var exec$1 = uncurryThis$c(/./.exec);

	var plus = /\+/g;
	var FALLBACK_REPLACER = '\uFFFD';
	var VALID_HEX = /^[0-9a-f]+$/i;

	var parseHexOctet = function (string, start) {
	  var substr = stringSlice$2(string, start, start + 2);
	  if (!exec$1(VALID_HEX, substr)) return NaN;

	  return $parseInt(substr, 16);
	};

	var getLeadingOnes = function (octet) {
	  var count = 0;
	  for (var mask = 0x80; mask > 0 && (octet & mask) !== 0; mask >>= 1) {
	    count++;
	  }
	  return count;
	};

	var utf8Decode = function (octets) {
	  var codePoint = null;
	  var length = octets.length;

	  switch (length) {
	    case 1:
	      codePoint = octets[0];
	      break;
	    case 2:
	      codePoint = (octets[0] & 0x1F) << 6 | (octets[1] & 0x3F);
	      break;
	    case 3:
	      codePoint = (octets[0] & 0x0F) << 12 | (octets[1] & 0x3F) << 6 | (octets[2] & 0x3F);
	      break;
	    case 4:
	      codePoint = (octets[0] & 0x07) << 18 | (octets[1] & 0x3F) << 12 | (octets[2] & 0x3F) << 6 | (octets[3] & 0x3F);
	      break;
	  }

	  // reject surrogates, overlong encodings, and out-of-range codepoints
	  if (codePoint === null
	    || codePoint > 0x10FFFF
	    || (codePoint >= 0xD800 && codePoint <= 0xDFFF)
	    || codePoint < (length > 3 ? 0x10000 : length > 2 ? 0x800 : length > 1 ? 0x80 : 0)
	  ) return null;

	  return codePoint;
	};

	/* eslint-disable max-statements, max-depth -- ok */
	var decode = function (input) {
	  input = replace$1(input, plus, ' ');
	  var length = input.length;
	  var result = '';
	  var i = 0;

	  while (i < length) {
	    var decodedChar = charAt$1(input, i);

	    if (decodedChar === '%') {
	      if (charAt$1(input, i + 1) === '%' || i + 3 > length) {
	        result += '%';
	        i++;
	        continue;
	      }

	      var octet = parseHexOctet(input, i + 1);

	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (octet !== octet) {
	        result += decodedChar;
	        i++;
	        continue;
	      }

	      i += 2;
	      var byteSequenceLength = getLeadingOnes(octet);

	      if (byteSequenceLength === 0) {
	        decodedChar = fromCharCode(octet);
	      } else {
	        if (byteSequenceLength === 1 || byteSequenceLength > 4) {
	          result += FALLBACK_REPLACER;
	          i++;
	          continue;
	        }

	        var octets = [octet];
	        var sequenceIndex = 1;

	        while (sequenceIndex < byteSequenceLength) {
	          i++;
	          if (i + 3 > length || charAt$1(input, i) !== '%') break;

	          var nextByte = parseHexOctet(input, i + 1);

	          // eslint-disable-next-line no-self-compare -- NaN check
	          if (nextByte !== nextByte || nextByte > 191 || nextByte < 128) break;

	          // https://encoding.spec.whatwg.org/#utf-8-decoder - position-specific byte ranges
	          if (sequenceIndex === 1) {
	            if (octet === 0xE0 && nextByte < 0xA0) break;
	            if (octet === 0xED && nextByte > 0x9F) break;
	            if (octet === 0xF0 && nextByte < 0x90) break;
	            if (octet === 0xF4 && nextByte > 0x8F) break;
	          }

	          push$2(octets, nextByte);
	          i += 2;
	          sequenceIndex++;
	        }

	        if (octets.length !== byteSequenceLength) {
	          result += FALLBACK_REPLACER;
	          continue;
	        }

	        var codePoint = utf8Decode(octets);
	        if (codePoint === null) {
	          for (var replacement = 0; replacement < byteSequenceLength; replacement++) result += FALLBACK_REPLACER;
	          i++;
	          continue;
	        } else {
	          decodedChar = fromCodePoint(codePoint);
	        }
	      }
	    }

	    result += decodedChar;
	    i++;
	  }

	  return result;
	};
	/* eslint-enable max-statements, max-depth -- ok */

	var find = /[!'()~]|%20/g;

	var replacements = {
	  '!': '%21',
	  "'": '%27',
	  '(': '%28',
	  ')': '%29',
	  '~': '%7E',
	  '%20': '+'
	};

	var replacer = function (match) {
	  return replacements[match];
	};

	var serialize = function (it) {
	  return replace$1(encodeURIComponent$2(it), find, replacer);
	};

	var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
	  setInternalState$3(this, {
	    type: URL_SEARCH_PARAMS_ITERATOR,
	    target: getInternalParamsState(params).entries,
	    index: 0,
	    kind: kind
	  });
	}, URL_SEARCH_PARAMS, function next() {
	  var state = getInternalIteratorState(this);
	  var target = state.target;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = null;
	    return createIterResultObject(undefined, true);
	  }
	  var entry = target[index];
	  switch (state.kind) {
	    case 'keys': return createIterResultObject(entry.key, false);
	    case 'values': return createIterResultObject(entry.value, false);
	  } return createIterResultObject([entry.key, entry.value], false);
	}, true);

	var URLSearchParamsState = function (init) {
	  this.entries = [];
	  this.url = null;

	  if (init !== undefined) {
	    if (isObject$5(init)) this.parseObject(init);
	    else this.parseQuery(typeof init == 'string' ? charAt$1(init, 0) === '?' ? stringSlice$2(init, 1) : init : $toString$1(init));
	  }
	};

	URLSearchParamsState.prototype = {
	  type: URL_SEARCH_PARAMS,
	  bindURL: function (url) {
	    this.url = url;
	    this.update();
	  },
	  parseObject: function (object) {
	    var entries = this.entries;
	    var iteratorMethod = getIteratorMethod$1(object);
	    var iterator, next, step, entryIterator, entryNext, first, second;

	    if (iteratorMethod) {
	      iterator = getIterator$1(object, iteratorMethod);
	      next = iterator.next;
	      while (!(step = call$6(next, iterator)).done) {
	        entryIterator = getIterator$1(anObject$2(step.value));
	        entryNext = entryIterator.next;
	        if (
	          (first = call$6(entryNext, entryIterator)).done ||
	          (second = call$6(entryNext, entryIterator)).done ||
	          !call$6(entryNext, entryIterator).done
	        ) throw new TypeError$3('Expected sequence with length 2');
	        push$2(entries, { key: $toString$1(first.value), value: $toString$1(second.value) });
	      }
	    } else for (var key in object) if (hasOwn$3(object, key)) {
	      push$2(entries, { key: key, value: $toString$1(object[key]) });
	    }
	  },
	  parseQuery: function (query) {
	    if (query) {
	      var entries = this.entries;
	      var attributes = split$1(query, '&');
	      var index = 0;
	      var attribute, entry;
	      while (index < attributes.length) {
	        attribute = attributes[index++];
	        if (attribute.length) {
	          entry = split$1(attribute, '=');
	          push$2(entries, {
	            key: decode(shift$1(entry)),
	            value: decode(join$2(entry, '='))
	          });
	        }
	      }
	    }
	  },
	  serialize: function () {
	    var entries = this.entries;
	    var result = [];
	    var index = 0;
	    var entry;
	    while (index < entries.length) {
	      entry = entries[index++];
	      push$2(result, serialize(entry.key) + '=' + serialize(entry.value));
	    } return join$2(result, '&');
	  },
	  update: function () {
	    this.entries.length = 0;
	    this.parseQuery(this.url.query);
	  },
	  updateURL: function () {
	    if (this.url) this.url.update();
	  }
	};

	// `URLSearchParams` constructor
	// https://url.spec.whatwg.org/#interface-urlsearchparams
	var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
	  anInstance$3(this, URLSearchParamsPrototype);
	  var init = arguments.length > 0 ? arguments[0] : undefined;
	  var state = setInternalState$3(this, new URLSearchParamsState(init));
	  if (!DESCRIPTORS$4) this.size = state.entries.length;
	};

	var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

	defineBuiltIns$1(URLSearchParamsPrototype, {
	  // `URLSearchParams.prototype.append` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
	  append: function append(name, value) {
	    var state = getInternalParamsState(this);
	    validateArgumentsLength$1(arguments.length, 2);
	    push$2(state.entries, { key: $toString$1(name), value: $toString$1(value) });
	    if (!DESCRIPTORS$4) this.size++;
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.delete` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
	  'delete': function (name /* , value */) {
	    var state = getInternalParamsState(this);
	    var length = validateArgumentsLength$1(arguments.length, 1);
	    var entries = state.entries;
	    var key = $toString$1(name);
	    var $value = length < 2 ? undefined : arguments[1];
	    var value = $value === undefined ? $value : $toString$1($value);
	    var index = 0;
	    while (index < entries.length) {
	      var entry = entries[index];
	      if (entry.key === key && (value === undefined || entry.value === value)) {
	        splice(entries, index, 1);
	      } else index++;
	    }
	    if (!DESCRIPTORS$4) this.size = entries.length;
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.get` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
	  get: function get(name) {
	    var entries = getInternalParamsState(this).entries;
	    validateArgumentsLength$1(arguments.length, 1);
	    var key = $toString$1(name);
	    var index = 0;
	    for (; index < entries.length; index++) {
	      if (entries[index].key === key) return entries[index].value;
	    }
	    return null;
	  },
	  // `URLSearchParams.prototype.getAll` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
	  getAll: function getAll(name) {
	    var entries = getInternalParamsState(this).entries;
	    validateArgumentsLength$1(arguments.length, 1);
	    var key = $toString$1(name);
	    var result = [];
	    var index = 0;
	    for (; index < entries.length; index++) {
	      if (entries[index].key === key) push$2(result, entries[index].value);
	    }
	    return result;
	  },
	  // `URLSearchParams.prototype.has` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
	  has: function has(name /* , value */) {
	    var entries = getInternalParamsState(this).entries;
	    var length = validateArgumentsLength$1(arguments.length, 1);
	    var key = $toString$1(name);
	    var $value = length < 2 ? undefined : arguments[1];
	    var value = $value === undefined ? $value : $toString$1($value);
	    var index = 0;
	    while (index < entries.length) {
	      var entry = entries[index++];
	      if (entry.key === key && (value === undefined || entry.value === value)) return true;
	    }
	    return false;
	  },
	  // `URLSearchParams.prototype.set` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
	  set: function set(name, value) {
	    var state = getInternalParamsState(this);
	    validateArgumentsLength$1(arguments.length, 2);
	    var entries = state.entries;
	    var found = false;
	    var key = $toString$1(name);
	    var val = $toString$1(value);
	    var index = 0;
	    var entry;
	    for (; index < entries.length; index++) {
	      entry = entries[index];
	      if (entry.key === key) {
	        if (found) splice(entries, index--, 1);
	        else {
	          found = true;
	          entry.value = val;
	        }
	      }
	    }
	    if (!found) push$2(entries, { key: key, value: val });
	    if (!DESCRIPTORS$4) this.size = entries.length;
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.sort` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
	  sort: function sort() {
	    var state = getInternalParamsState(this);
	    arraySort(state.entries, function (a, b) {
	      return a.key > b.key ? 1 : -1;
	    });
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.forEach` method
	  forEach: function forEach(callback /* , thisArg */) {
	    var entries = getInternalParamsState(this).entries;
	    var boundFunction = bind$2(callback, arguments.length > 1 ? arguments[1] : undefined);
	    var index = 0;
	    var entry;
	    while (index < entries.length) {
	      entry = entries[index++];
	      boundFunction(entry.value, entry.key, this);
	    }
	  },
	  // `URLSearchParams.prototype.keys` method
	  keys: function keys() {
	    return new URLSearchParamsIterator(this, 'keys');
	  },
	  // `URLSearchParams.prototype.values` method
	  values: function values() {
	    return new URLSearchParamsIterator(this, 'values');
	  },
	  // `URLSearchParams.prototype.entries` method
	  entries: function entries() {
	    return new URLSearchParamsIterator(this, 'entries');
	  }
	}, { enumerable: true });

	// `URLSearchParams.prototype[@@iterator]` method
	defineBuiltIn$2(URLSearchParamsPrototype, ITERATOR$1, URLSearchParamsPrototype.entries, { name: 'entries' });

	// `URLSearchParams.prototype.toString` method
	// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
	defineBuiltIn$2(URLSearchParamsPrototype, 'toString', function toString() {
	  return getInternalParamsState(this).serialize();
	}, { enumerable: true });

	// `URLSearchParams.prototype.size` getter
	// https://url.spec.whatwg.org/#dom-urlsearchparams-size
	if (DESCRIPTORS$4) defineBuiltInAccessor$4(URLSearchParamsPrototype, 'size', {
	  get: function size() {
	    return getInternalParamsState(this).entries.length;
	  },
	  configurable: true,
	  enumerable: true
	});

	setToStringTag$2(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

	$$b({ global: true, constructor: true, forced: !USE_NATIVE_URL$1 }, {
	  URLSearchParams: URLSearchParamsConstructor
	});

	// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
	if (!USE_NATIVE_URL$1 && isCallable$1(Headers)) {
	  var headersHas = uncurryThis$c(HeadersPrototype.has);
	  var headersSet = uncurryThis$c(HeadersPrototype.set);

	  var wrapRequestOptions = function (init) {
	    if (isObject$5(init)) {
	      var body = init.body;
	      var headers;
	      if (classof$4(body) === URL_SEARCH_PARAMS) {
	        headers = init.headers ? new Headers(init.headers) : new Headers();
	        if (!headersHas(headers, 'content-type')) {
	          headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	        }
	        return create$1(init, {
	          body: createPropertyDescriptor$1(0, $toString$1(body)),
	          headers: createPropertyDescriptor$1(0, headers)
	        });
	      }
	    } return init;
	  };

	  if (isCallable$1(nativeFetch)) {
	    $$b({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, {
	      fetch: function fetch(input /* , init */) {
	        return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
	      }
	    });
	  }

	  if (isCallable$1(NativeRequest)) {
	    var RequestConstructor = function Request(input /* , init */) {
	      anInstance$3(this, RequestPrototype);
	      return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
	    };

	    RequestPrototype.constructor = RequestConstructor;
	    RequestConstructor.prototype = RequestPrototype;

	    $$b({ global: true, constructor: true, dontCallGetSet: true, forced: true }, {
	      Request: RequestConstructor
	    });
	  }
	}

	var web_urlSearchParams_constructor = {
	  URLSearchParams: URLSearchParamsConstructor,
	  getState: getInternalParamsState
	};

	// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

	var $$a = _export;
	var DESCRIPTORS$3 = descriptors;
	var USE_NATIVE_URL = urlConstructorDetection;
	var globalThis$b = globalThis_1;
	var bind$1 = functionBindContext;
	var uncurryThis$b = functionUncurryThis;
	var defineBuiltIn$1 = defineBuiltIn$e;
	var defineBuiltInAccessor$3 = defineBuiltInAccessor$6;
	var anInstance$2 = anInstance$5;
	var hasOwn$2 = hasOwnProperty_1;
	var assign = objectAssign;
	var arrayFrom = arrayFrom$1;
	var arraySlice$3 = arraySlice$6;
	var codeAt = stringMultibyte.codeAt;
	var toASCII = stringPunycodeToAscii;
	var $toString = toString$d;
	var setToStringTag$1 = setToStringTag$7;
	var validateArgumentsLength = validateArgumentsLength$3;
	var URLSearchParamsModule = web_urlSearchParams_constructor;
	var InternalStateModule$3 = internalState;

	var setInternalState$2 = InternalStateModule$3.set;
	var getInternalURLState = InternalStateModule$3.getterFor('URL');
	var URLSearchParams$1 = URLSearchParamsModule.URLSearchParams;
	var getInternalSearchParamsState = URLSearchParamsModule.getState;

	var NativeURL = globalThis$b.URL;
	var TypeError$2 = globalThis$b.TypeError;
	var encodeURIComponent$1 = globalThis$b.encodeURIComponent;
	var parseInt$1 = globalThis$b.parseInt;
	var floor$6 = Math.floor;
	var pow$2 = Math.pow;
	var charAt = uncurryThis$b(''.charAt);
	var exec = uncurryThis$b(/./.exec);
	var join$1 = uncurryThis$b([].join);
	var numberToString = uncurryThis$b(1.1.toString);
	var pop = uncurryThis$b([].pop);
	var push$1 = uncurryThis$b([].push);
	var replace = uncurryThis$b(''.replace);
	var shift = uncurryThis$b([].shift);
	var split = uncurryThis$b(''.split);
	var stringSlice$1 = uncurryThis$b(''.slice);
	var toLowerCase = uncurryThis$b(''.toLowerCase);
	var unshift = uncurryThis$b([].unshift);

	var INVALID_AUTHORITY = 'Invalid authority';
	var INVALID_SCHEME = 'Invalid scheme';
	var INVALID_HOST = 'Invalid host';
	var INVALID_PORT = 'Invalid port';

	var ALPHA = /[a-z]/i;
	var ALPHANUMERIC_PLUS_MINUS_DOT = /[\d+\-.a-z]/i;
	var DIGIT = /\d/;
	var HEX_START = /^0x/i;
	var OCT = /^[0-7]+$/;
	var DEC = /^\d+$/;
	var HEX = /^[\da-f]+$/i;
	/* eslint-disable regexp/no-control-character -- safe */
	var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
	var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
	var LEADING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+/;
	var TRAILING_C0_CONTROL_OR_SPACE = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/;
	var TAB_AND_NEW_LINE = /[\t\n\r]/g;
	/* eslint-enable regexp/no-control-character -- safe */
	// eslint-disable-next-line no-unassigned-vars -- expected `undefined` value
	var EOF;

	// https://url.spec.whatwg.org/#ends-in-a-number-checker
	var endsInNumber = function (input) {
	  var parts = split(input, '.');
	  var last, hexPart;
	  if (parts[parts.length - 1] === '') {
	    if (parts.length === 1) return false;
	    parts.length--;
	  }
	  last = parts[parts.length - 1];
	  if (exec(DEC, last)) return true;
	  if (exec(HEX_START, last)) {
	    hexPart = stringSlice$1(last, 2);
	    return hexPart === '' || !!exec(HEX, hexPart);
	  }
	  return false;
	};

	// https://url.spec.whatwg.org/#concept-ipv4-parser
	var parseIPv4 = function (input) {
	  var parts = split(input, '.');
	  var partsLength, numbers, index, part, radix, number, ipv4;
	  if (parts.length && parts[parts.length - 1] === '') {
	    parts.length--;
	  }
	  partsLength = parts.length;
	  if (partsLength > 4) return null;
	  numbers = [];
	  for (index = 0; index < partsLength; index++) {
	    part = parts[index];
	    if (part === '') return null;
	    radix = 10;
	    if (part.length > 1 && charAt(part, 0) === '0') {
	      radix = exec(HEX_START, part) ? 16 : 8;
	      part = stringSlice$1(part, radix === 8 ? 1 : 2);
	    }
	    if (part === '') {
	      number = 0;
	    } else {
	      if (!exec(radix === 10 ? DEC : radix === 8 ? OCT : HEX, part)) return null;
	      number = parseInt$1(part, radix);
	    }
	    push$1(numbers, number);
	  }
	  for (index = 0; index < partsLength; index++) {
	    number = numbers[index];
	    if (index === partsLength - 1) {
	      if (number >= pow$2(256, 5 - partsLength)) return null;
	    } else if (number > 255) return null;
	  }
	  ipv4 = pop(numbers);
	  for (index = 0; index < numbers.length; index++) {
	    ipv4 += numbers[index] * pow$2(256, 3 - index);
	  }
	  return ipv4;
	};

	// https://url.spec.whatwg.org/#concept-ipv6-parser
	// eslint-disable-next-line max-statements -- TODO
	var parseIPv6 = function (input) {
	  var address = [0, 0, 0, 0, 0, 0, 0, 0];
	  var pieceIndex = 0;
	  var compress = null;
	  var pointer = 0;
	  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

	  var chr = function () {
	    return charAt(input, pointer);
	  };

	  if (chr() === ':') {
	    if (charAt(input, 1) !== ':') return;
	    pointer += 2;
	    pieceIndex++;
	    compress = pieceIndex;
	  }
	  while (chr()) {
	    if (pieceIndex === 8) return;
	    if (chr() === ':') {
	      if (compress !== null) return;
	      pointer++;
	      pieceIndex++;
	      compress = pieceIndex;
	      continue;
	    }
	    value = length = 0;
	    while (length < 4 && exec(HEX, chr())) {
	      value = value * 16 + parseInt$1(chr(), 16);
	      pointer++;
	      length++;
	    }
	    if (chr() === '.') {
	      if (length === 0) return;
	      pointer -= length;
	      if (pieceIndex > 6) return;
	      numbersSeen = 0;
	      while (chr()) {
	        ipv4Piece = null;
	        if (numbersSeen > 0) {
	          if (chr() === '.' && numbersSeen < 4) pointer++;
	          else return;
	        }
	        if (!exec(DIGIT, chr())) return;
	        while (exec(DIGIT, chr())) {
	          number = parseInt$1(chr(), 10);
	          if (ipv4Piece === null) ipv4Piece = number;
	          else if (ipv4Piece === 0) return;
	          else ipv4Piece = ipv4Piece * 10 + number;
	          if (ipv4Piece > 255) return;
	          pointer++;
	        }
	        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
	        numbersSeen++;
	        if (numbersSeen === 2 || numbersSeen === 4) pieceIndex++;
	      }
	      if (numbersSeen !== 4) return;
	      break;
	    } else if (chr() === ':') {
	      pointer++;
	      if (!chr()) return;
	    } else if (chr()) return;
	    address[pieceIndex++] = value;
	  }
	  if (compress !== null) {
	    swaps = pieceIndex - compress;
	    pieceIndex = 7;
	    while (pieceIndex !== 0 && swaps > 0) {
	      swap = address[pieceIndex];
	      address[pieceIndex--] = address[compress + swaps - 1];
	      address[compress + --swaps] = swap;
	    }
	  } else if (pieceIndex !== 8) return;
	  return address;
	};

	var findLongestZeroSequence = function (ipv6) {
	  var maxIndex = null;
	  var maxLength = 1;
	  var currStart = null;
	  var currLength = 0;
	  var index = 0;
	  for (; index < 8; index++) {
	    if (ipv6[index] !== 0) {
	      if (currLength > maxLength) {
	        maxIndex = currStart;
	        maxLength = currLength;
	      }
	      currStart = null;
	      currLength = 0;
	    } else {
	      if (currStart === null) currStart = index;
	      ++currLength;
	    }
	  }
	  return currLength > maxLength ? currStart : maxIndex;
	};

	// https://url.spec.whatwg.org/#host-serializing
	var serializeHost = function (host) {
	  var result, index, compress, ignore0;

	  // ipv4
	  if (typeof host == 'number') {
	    result = [];
	    for (index = 0; index < 4; index++) {
	      unshift(result, host % 256);
	      host = floor$6(host / 256);
	    }
	    return join$1(result, '.');
	  }

	  // ipv6
	  if (typeof host == 'object') {
	    result = '';
	    compress = findLongestZeroSequence(host);
	    for (index = 0; index < 8; index++) {
	      if (ignore0 && host[index] === 0) continue;
	      if (ignore0) ignore0 = false;
	      if (compress === index) {
	        result += index ? ':' : '::';
	        ignore0 = true;
	      } else {
	        result += numberToString(host[index], 16);
	        if (index < 7) result += ':';
	      }
	    }
	    return '[' + result + ']';
	  }

	  return host;
	};

	var C0ControlPercentEncodeSet = {};
	var queryPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
	  ' ': 1, '"': 1, '#': 1, '<': 1, '>': 1
	});
	var specialQueryPercentEncodeSet = assign({}, queryPercentEncodeSet, {
	  "'": 1
	});
	var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
	  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
	});
	var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
	  '#': 1, '?': 1, '{': 1, '}': 1, '^': 1
	});
	var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
	  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
	});

	var percentEncode = function (chr, set) {
	  var code = codeAt(chr, 0);
	  // encodeURIComponent does not encode ', which is in the special-query percent-encode set
	  return code >= 0x20 && code < 0x7F && !hasOwn$2(set, chr) ? chr : chr === "'" && hasOwn$2(set, chr) ? '%27' : encodeURIComponent$1(chr);
	};

	// https://url.spec.whatwg.org/#special-scheme
	var specialSchemes = {
	  ftp: 21,
	  file: null,
	  http: 80,
	  https: 443,
	  ws: 80,
	  wss: 443
	};

	// https://url.spec.whatwg.org/#windows-drive-letter
	var isWindowsDriveLetter = function (string, normalized) {
	  var second;
	  return string.length === 2 && exec(ALPHA, charAt(string, 0))
	    && ((second = charAt(string, 1)) === ':' || (!normalized && second === '|'));
	};

	// https://url.spec.whatwg.org/#start-with-a-windows-drive-letter
	var startsWithWindowsDriveLetter = function (string) {
	  var third;
	  return string.length > 1 && isWindowsDriveLetter(stringSlice$1(string, 0, 2)) && (
	    string.length === 2 ||
	    ((third = charAt(string, 2)) === '/' || third === '\\' || third === '?' || third === '#')
	  );
	};

	// https://url.spec.whatwg.org/#single-dot-path-segment
	var isSingleDot = function (segment) {
	  return segment === '.' || toLowerCase(segment) === '%2e';
	};

	// https://url.spec.whatwg.org/#double-dot-path-segment
	var isDoubleDot = function (segment) {
	  segment = toLowerCase(segment);
	  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
	};

	// States:
	var SCHEME_START = {};
	var SCHEME = {};
	var NO_SCHEME = {};
	var SPECIAL_RELATIVE_OR_AUTHORITY = {};
	var PATH_OR_AUTHORITY = {};
	var RELATIVE = {};
	var RELATIVE_SLASH = {};
	var SPECIAL_AUTHORITY_SLASHES = {};
	var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
	var AUTHORITY = {};
	var HOST = {};
	var HOSTNAME = {};
	var PORT = {};
	var FILE = {};
	var FILE_SLASH = {};
	var FILE_HOST = {};
	var PATH_START = {};
	var PATH = {};
	var CANNOT_BE_A_BASE_URL_PATH = {};
	var QUERY = {};
	var FRAGMENT = {};

	var URLState = function (url, isBase, base) {
	  var urlString = $toString(url);
	  var baseState, failure, searchParams;
	  if (isBase) {
	    failure = this.parse(urlString);
	    if (failure) throw new TypeError$2(failure);
	    this.searchParams = null;
	  } else {
	    if (base !== undefined) baseState = new URLState(base, true);
	    failure = this.parse(urlString, null, baseState);
	    if (failure) throw new TypeError$2(failure);
	    searchParams = getInternalSearchParamsState(new URLSearchParams$1());
	    searchParams.bindURL(this);
	    this.searchParams = searchParams;
	  }
	};

	URLState.prototype = {
	  type: 'URL',
	  // https://url.spec.whatwg.org/#url-parsing
	  // eslint-disable-next-line max-statements -- TODO
	  parse: function (input, stateOverride, base) {
	    var url = this;
	    var state = stateOverride || SCHEME_START;
	    var pointer = 0;
	    var buffer = '';
	    var seenAt = false;
	    var seenBracket = false;
	    var seenPasswordToken = false;
	    var codePoints, chr, bufferCodePoints, failure;

	    input = $toString(input);

	    if (!stateOverride) {
	      url.scheme = '';
	      url.username = '';
	      url.password = '';
	      url.host = null;
	      url.port = null;
	      url.path = [];
	      url.query = null;
	      url.fragment = null;
	      url.cannotBeABaseURL = false;
	      input = replace(input, LEADING_C0_CONTROL_OR_SPACE, '');
	      input = replace(input, TRAILING_C0_CONTROL_OR_SPACE, '$1');
	    }

	    input = replace(input, TAB_AND_NEW_LINE, '');

	    codePoints = arrayFrom(input);

	    while (pointer <= codePoints.length) {
	      chr = codePoints[pointer];
	      switch (state) {
	        case SCHEME_START:
	          if (chr && exec(ALPHA, chr)) {
	            buffer += toLowerCase(chr);
	            state = SCHEME;
	          } else if (!stateOverride) {
	            state = NO_SCHEME;
	            continue;
	          } else return INVALID_SCHEME;
	          break;

	        case SCHEME:
	          if (chr && exec(ALPHANUMERIC_PLUS_MINUS_DOT, chr)) {
	            buffer += toLowerCase(chr);
	          } else if (chr === ':') {
	            if (stateOverride && (
	              (url.isSpecial() !== hasOwn$2(specialSchemes, buffer)) ||
	              (buffer === 'file' && (url.includesCredentials() || url.port !== null)) ||
	              (url.scheme === 'file' && url.host === '')
	            )) return;
	            url.scheme = buffer;
	            if (stateOverride) {
	              if (url.isSpecial() && specialSchemes[url.scheme] === url.port) url.port = null;
	              return;
	            }
	            buffer = '';
	            if (url.scheme === 'file') {
	              state = FILE;
	            } else if (url.isSpecial() && base && base.scheme === url.scheme) {
	              state = SPECIAL_RELATIVE_OR_AUTHORITY;
	            } else if (url.isSpecial()) {
	              state = SPECIAL_AUTHORITY_SLASHES;
	            } else if (codePoints[pointer + 1] === '/') {
	              state = PATH_OR_AUTHORITY;
	              pointer++;
	            } else {
	              url.cannotBeABaseURL = true;
	              push$1(url.path, '');
	              state = CANNOT_BE_A_BASE_URL_PATH;
	            }
	          } else if (!stateOverride) {
	            buffer = '';
	            state = NO_SCHEME;
	            pointer = 0;
	            continue;
	          } else return INVALID_SCHEME;
	          break;

	        case NO_SCHEME:
	          if (!base || (base.cannotBeABaseURL && chr !== '#')) return INVALID_SCHEME;
	          if (base.cannotBeABaseURL && chr === '#') {
	            url.scheme = base.scheme;
	            url.path = arraySlice$3(base.path);
	            url.query = base.query;
	            url.fragment = '';
	            url.cannotBeABaseURL = true;
	            state = FRAGMENT;
	            break;
	          }
	          state = base.scheme === 'file' ? FILE : RELATIVE;
	          continue;

	        case SPECIAL_RELATIVE_OR_AUTHORITY:
	          if (chr === '/' && codePoints[pointer + 1] === '/') {
	            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	            pointer++;
	          } else {
	            state = RELATIVE;
	            continue;
	          } break;

	        case PATH_OR_AUTHORITY:
	          if (chr === '/') {
	            state = AUTHORITY;
	            break;
	          } else {
	            state = PATH;
	            continue;
	          }

	        case RELATIVE:
	          url.scheme = base.scheme;
	          if (chr === EOF) {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            url.path = arraySlice$3(base.path);
	            url.query = base.query;
	          } else if (chr === '/' || (chr === '\\' && url.isSpecial())) {
	            state = RELATIVE_SLASH;
	          } else if (chr === '?') {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            url.path = arraySlice$3(base.path);
	            url.query = '';
	            state = QUERY;
	          } else if (chr === '#') {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            url.path = arraySlice$3(base.path);
	            url.query = base.query;
	            url.fragment = '';
	            state = FRAGMENT;
	          } else {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            url.path = arraySlice$3(base.path);
	            if (url.path.length) url.path.length--;
	            state = PATH;
	            continue;
	          } break;

	        case RELATIVE_SLASH:
	          if (url.isSpecial() && (chr === '/' || chr === '\\')) {
	            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	          } else if (chr === '/') {
	            state = AUTHORITY;
	          } else {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            state = PATH;
	            continue;
	          } break;

	        case SPECIAL_AUTHORITY_SLASHES:
	          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	          if (chr !== '/' || codePoints[pointer + 1] !== '/') continue;
	          pointer++;
	          break;

	        case SPECIAL_AUTHORITY_IGNORE_SLASHES:
	          if (chr !== '/' && chr !== '\\') {
	            state = AUTHORITY;
	            continue;
	          } break;

	        case AUTHORITY:
	          if (chr === '@') {
	            if (seenAt) buffer = '%40' + buffer;
	            seenAt = true;
	            bufferCodePoints = arrayFrom(buffer);
	            for (var i = 0; i < bufferCodePoints.length; i++) {
	              var codePoint = bufferCodePoints[i];
	              if (codePoint === ':' && !seenPasswordToken) {
	                seenPasswordToken = true;
	                continue;
	              }
	              var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
	              if (seenPasswordToken) url.password += encodedCodePoints;
	              else url.username += encodedCodePoints;
	            }
	            buffer = '';
	          } else if (
	            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
	            (chr === '\\' && url.isSpecial())
	          ) {
	            if (seenAt && buffer === '') return INVALID_AUTHORITY;
	            pointer -= arrayFrom(buffer).length + 1;
	            buffer = '';
	            state = HOST;
	          } else buffer += chr;
	          break;

	        case HOST:
	        case HOSTNAME:
	          if (stateOverride && url.scheme === 'file') {
	            state = FILE_HOST;
	            continue;
	          } else if (chr === ':' && !seenBracket) {
	            if (buffer === '') return INVALID_HOST;
	            if (stateOverride === HOSTNAME) return;
	            failure = url.parseHost(buffer);
	            if (failure) return failure;
	            buffer = '';
	            state = PORT;
	          } else if (
	            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
	            (chr === '\\' && url.isSpecial())
	          ) {
	            if (url.isSpecial() && buffer === '') return INVALID_HOST;
	            if (stateOverride && buffer === '' && (url.includesCredentials() || url.port !== null)) return;
	            failure = url.parseHost(buffer);
	            if (failure) return failure;
	            buffer = '';
	            state = PATH_START;
	            if (stateOverride) return;
	            continue;
	          } else {
	            if (chr === '[') seenBracket = true;
	            else if (chr === ']') seenBracket = false;
	            buffer += chr;
	          } break;

	        case PORT:
	          if (exec(DIGIT, chr)) {
	            buffer += chr;
	          } else if (
	            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
	            (chr === '\\' && url.isSpecial()) ||
	            stateOverride
	          ) {
	            if (buffer !== '') {
	              var port = parseInt$1(buffer, 10);
	              if (port > 0xFFFF) return INVALID_PORT;
	              url.port = (url.isSpecial() && port === specialSchemes[url.scheme]) ? null : port;
	              buffer = '';
	            }
	            if (stateOverride) return;
	            state = PATH_START;
	            continue;
	          } else return INVALID_PORT;
	          break;

	        case FILE:
	          url.scheme = 'file';
	          url.host = '';
	          if (chr === '/' || chr === '\\') state = FILE_SLASH;
	          else if (base && base.scheme === 'file') {
	            switch (chr) {
	              case EOF:
	                url.host = base.host;
	                url.path = arraySlice$3(base.path);
	                url.query = base.query;
	                break;
	              case '?':
	                url.host = base.host;
	                url.path = arraySlice$3(base.path);
	                url.query = '';
	                state = QUERY;
	                break;
	              case '#':
	                url.host = base.host;
	                url.path = arraySlice$3(base.path);
	                url.query = base.query;
	                url.fragment = '';
	                state = FRAGMENT;
	                break;
	              default:
	                url.host = base.host;
	                if (!startsWithWindowsDriveLetter(join$1(arraySlice$3(codePoints, pointer), ''))) {
	                  url.path = arraySlice$3(base.path);
	                  url.shortenPath();
	                }
	                state = PATH;
	                continue;
	            }
	          } else {
	            state = PATH;
	            continue;
	          } break;

	        case FILE_SLASH:
	          if (chr === '/' || chr === '\\') {
	            state = FILE_HOST;
	            break;
	          }
	          if (base && base.scheme === 'file') {
	            url.host = base.host;
	            if (!startsWithWindowsDriveLetter(join$1(arraySlice$3(codePoints, pointer), ''))
	              && isWindowsDriveLetter(base.path[0], true)) push$1(url.path, base.path[0]);
	          }
	          state = PATH;
	          continue;

	        case FILE_HOST:
	          if (chr === EOF || chr === '/' || chr === '\\' || chr === '?' || chr === '#') {
	            if (!stateOverride && isWindowsDriveLetter(buffer)) {
	              state = PATH;
	            } else if (buffer === '') {
	              url.host = '';
	              if (stateOverride) return;
	              state = PATH_START;
	            } else {
	              failure = url.parseHost(buffer);
	              if (failure) return failure;
	              if (url.host === 'localhost') url.host = '';
	              if (stateOverride) return;
	              buffer = '';
	              state = PATH_START;
	            } continue;
	          } else buffer += chr;
	          break;

	        case PATH_START:
	          if (url.isSpecial()) {
	            state = PATH;
	            if (chr !== '/' && chr !== '\\') continue;
	          } else if (!stateOverride && chr === '?') {
	            url.query = '';
	            state = QUERY;
	          } else if (!stateOverride && chr === '#') {
	            url.fragment = '';
	            state = FRAGMENT;
	          } else if (chr !== EOF) {
	            state = PATH;
	            if (chr !== '/') continue;
	          } break;

	        case PATH:
	          if (
	            chr === EOF || chr === '/' ||
	            (chr === '\\' && url.isSpecial()) ||
	            (!stateOverride && (chr === '?' || chr === '#'))
	          ) {
	            if (isDoubleDot(buffer)) {
	              url.shortenPath();
	              if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
	                push$1(url.path, '');
	              }
	            } else if (isSingleDot(buffer)) {
	              if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
	                push$1(url.path, '');
	              }
	            } else {
	              if (url.scheme === 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
	                if (url.host !== null && url.host !== '') url.host = '';
	                buffer = charAt(buffer, 0) + ':'; // normalize windows drive letter
	              }
	              push$1(url.path, buffer);
	            }
	            buffer = '';
	            if (url.scheme === 'file' && (chr === EOF || chr === '?' || chr === '#')) {
	              while (url.path.length > 1 && url.path[0] === '') {
	                shift(url.path);
	              }
	            }
	            if (chr === '?') {
	              url.query = '';
	              state = QUERY;
	            } else if (chr === '#') {
	              url.fragment = '';
	              state = FRAGMENT;
	            }
	          } else {
	            buffer += percentEncode(chr, pathPercentEncodeSet);
	          } break;

	        case CANNOT_BE_A_BASE_URL_PATH:
	          if (chr === '?') {
	            url.query = '';
	            state = QUERY;
	          } else if (chr === '#') {
	            url.fragment = '';
	            state = FRAGMENT;
	          } else if (chr !== EOF) {
	            url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
	          } break;

	        case QUERY:
	          if (!stateOverride && chr === '#') {
	            url.fragment = '';
	            state = FRAGMENT;
	          } else if (chr !== EOF) {
	            url.query += percentEncode(chr, url.isSpecial() ? specialQueryPercentEncodeSet : queryPercentEncodeSet);
	          } break;

	        case FRAGMENT:
	          if (chr !== EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
	          break;
	      }

	      pointer++;
	    }
	  },
	  // https://url.spec.whatwg.org/#host-parsing
	  parseHost: function (input) {
	    var result, codePoints, index;
	    if (charAt(input, 0) === '[') {
	      if (charAt(input, input.length - 1) !== ']') return INVALID_HOST;
	      result = parseIPv6(stringSlice$1(input, 1, -1));
	      if (!result) return INVALID_HOST;
	      this.host = result;
	    // opaque host
	    } else if (!this.isSpecial()) {
	      if (exec(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
	      result = '';
	      codePoints = arrayFrom(input);
	      for (index = 0; index < codePoints.length; index++) {
	        result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
	      }
	      this.host = result;
	    } else {
	      input = toASCII(input);
	      if (exec(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
	      if (endsInNumber(input)) {
	        result = parseIPv4(input);
	        if (result === null) return INVALID_HOST;
	        this.host = result;
	      } else {
	        this.host = input;
	      }
	    }
	  },
	  // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
	  cannotHaveUsernamePasswordPort: function () {
	    return this.host === null || this.host === '' || this.cannotBeABaseURL || this.scheme === 'file';
	  },
	  // https://url.spec.whatwg.org/#include-credentials
	  includesCredentials: function () {
	    return this.username !== '' || this.password !== '';
	  },
	  // https://url.spec.whatwg.org/#is-special
	  isSpecial: function () {
	    return hasOwn$2(specialSchemes, this.scheme);
	  },
	  // https://url.spec.whatwg.org/#shorten-a-urls-path
	  shortenPath: function () {
	    var path = this.path;
	    var pathSize = path.length;
	    if (pathSize && (this.scheme !== 'file' || pathSize !== 1 || !isWindowsDriveLetter(path[0], true))) {
	      path.length--;
	    }
	  },
	  // https://url.spec.whatwg.org/#concept-url-serializer
	  serialize: function () {
	    var url = this;
	    var scheme = url.scheme;
	    var username = url.username;
	    var password = url.password;
	    var host = url.host;
	    var port = url.port;
	    var path = url.path;
	    var query = url.query;
	    var fragment = url.fragment;
	    var output = scheme + ':';
	    if (host !== null) {
	      output += '//';
	      if (url.includesCredentials()) {
	        output += username + (password ? ':' + password : '') + '@';
	      }
	      output += serializeHost(host);
	      if (port !== null) output += ':' + port;
	    } else if (scheme === 'file') output += '//';
	    if (host === null && !url.cannotBeABaseURL && path.length > 1 && path[0] === '') output += '/.';
	    output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join$1(path, '/') : '';
	    if (query !== null) output += '?' + query;
	    if (fragment !== null) output += '#' + fragment;
	    return output;
	  },
	  // https://url.spec.whatwg.org/#dom-url-href
	  setHref: function (href) {
	    var failure = this.parse(href);
	    if (failure) throw new TypeError$2(failure);
	    this.searchParams.update();
	  },
	  // https://url.spec.whatwg.org/#dom-url-origin
	  getOrigin: function () {
	    var scheme = this.scheme;
	    var port = this.port;
	    if (scheme === 'blob') try {
	      return new URLConstructor(this.path[0]).origin;
	    } catch (error) {
	      return 'null';
	    }
	    if (scheme === 'file' || !this.isSpecial()) return 'null';
	    return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '');
	  },
	  // https://url.spec.whatwg.org/#dom-url-protocol
	  getProtocol: function () {
	    return this.scheme + ':';
	  },
	  setProtocol: function (protocol) {
	    this.parse($toString(protocol) + ':', SCHEME_START);
	  },
	  // https://url.spec.whatwg.org/#dom-url-username
	  getUsername: function () {
	    return this.username;
	  },
	  setUsername: function (username) {
	    var codePoints = arrayFrom($toString(username));
	    if (this.cannotHaveUsernamePasswordPort()) return;
	    this.username = '';
	    for (var i = 0; i < codePoints.length; i++) {
	      this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
	    }
	  },
	  // https://url.spec.whatwg.org/#dom-url-password
	  getPassword: function () {
	    return this.password;
	  },
	  setPassword: function (password) {
	    var codePoints = arrayFrom($toString(password));
	    if (this.cannotHaveUsernamePasswordPort()) return;
	    this.password = '';
	    for (var i = 0; i < codePoints.length; i++) {
	      this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
	    }
	  },
	  // https://url.spec.whatwg.org/#dom-url-host
	  getHost: function () {
	    var host = this.host;
	    var port = this.port;
	    return host === null ? ''
	      : port === null ? serializeHost(host)
	      : serializeHost(host) + ':' + port;
	  },
	  setHost: function (host) {
	    if (this.cannotBeABaseURL) return;
	    this.parse(host, HOST);
	  },
	  // https://url.spec.whatwg.org/#dom-url-hostname
	  getHostname: function () {
	    var host = this.host;
	    return host === null ? '' : serializeHost(host);
	  },
	  setHostname: function (hostname) {
	    if (this.cannotBeABaseURL) return;
	    this.parse(hostname, HOSTNAME);
	  },
	  // https://url.spec.whatwg.org/#dom-url-port
	  getPort: function () {
	    var port = this.port;
	    return port === null ? '' : $toString(port);
	  },
	  setPort: function (port) {
	    if (this.cannotHaveUsernamePasswordPort()) return;
	    port = $toString(port);
	    if (port === '') this.port = null;
	    else this.parse(port, PORT);
	  },
	  // https://url.spec.whatwg.org/#dom-url-pathname
	  getPathname: function () {
	    var path = this.path;
	    return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join$1(path, '/') : '';
	  },
	  setPathname: function (pathname) {
	    if (this.cannotBeABaseURL) return;
	    this.path = [];
	    this.parse(pathname, PATH_START);
	  },
	  // https://url.spec.whatwg.org/#dom-url-search
	  getSearch: function () {
	    var query = this.query;
	    return query ? '?' + query : '';
	  },
	  setSearch: function (search) {
	    search = $toString(search);
	    if (search === '') {
	      this.query = null;
	    } else {
	      if (charAt(search, 0) === '?') search = stringSlice$1(search, 1);
	      this.query = '';
	      this.parse(search, QUERY);
	    }
	    this.searchParams.update();
	  },
	  // https://url.spec.whatwg.org/#dom-url-searchparams
	  getSearchParams: function () {
	    return this.searchParams.facade;
	  },
	  // https://url.spec.whatwg.org/#dom-url-hash
	  getHash: function () {
	    var fragment = this.fragment;
	    return fragment ? '#' + fragment : '';
	  },
	  setHash: function (hash) {
	    hash = $toString(hash);
	    if (hash === '') {
	      this.fragment = null;
	      return;
	    }
	    if (charAt(hash, 0) === '#') hash = stringSlice$1(hash, 1);
	    this.fragment = '';
	    this.parse(hash, FRAGMENT);
	  },
	  update: function () {
	    this.query = this.searchParams.serialize() || null;
	  }
	};

	// `URL` constructor
	// https://url.spec.whatwg.org/#url-class
	var URLConstructor = function URL(url /* , base */) {
	  var that = anInstance$2(this, URLPrototype);
	  var base = validateArgumentsLength(arguments.length, 1) > 1 ? arguments[1] : undefined;
	  var state = setInternalState$2(that, new URLState(url, false, base));
	  if (!DESCRIPTORS$3) {
	    that.href = state.serialize();
	    that.origin = state.getOrigin();
	    that.protocol = state.getProtocol();
	    that.username = state.getUsername();
	    that.password = state.getPassword();
	    that.host = state.getHost();
	    that.hostname = state.getHostname();
	    that.port = state.getPort();
	    that.pathname = state.getPathname();
	    that.search = state.getSearch();
	    that.searchParams = state.getSearchParams();
	    that.hash = state.getHash();
	  }
	};

	var URLPrototype = URLConstructor.prototype;

	var accessorDescriptor = function (getter, setter) {
	  return {
	    get: function () {
	      return getInternalURLState(this)[getter]();
	    },
	    set: setter && function (value) {
	      return getInternalURLState(this)[setter](value);
	    },
	    configurable: true,
	    enumerable: true
	  };
	};

	if (DESCRIPTORS$3) {
	  // `URL.prototype.href` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-href
	  defineBuiltInAccessor$3(URLPrototype, 'href', accessorDescriptor('serialize', 'setHref'));
	  // `URL.prototype.origin` getter
	  // https://url.spec.whatwg.org/#dom-url-origin
	  defineBuiltInAccessor$3(URLPrototype, 'origin', accessorDescriptor('getOrigin'));
	  // `URL.prototype.protocol` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-protocol
	  defineBuiltInAccessor$3(URLPrototype, 'protocol', accessorDescriptor('getProtocol', 'setProtocol'));
	  // `URL.prototype.username` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-username
	  defineBuiltInAccessor$3(URLPrototype, 'username', accessorDescriptor('getUsername', 'setUsername'));
	  // `URL.prototype.password` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-password
	  defineBuiltInAccessor$3(URLPrototype, 'password', accessorDescriptor('getPassword', 'setPassword'));
	  // `URL.prototype.host` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-host
	  defineBuiltInAccessor$3(URLPrototype, 'host', accessorDescriptor('getHost', 'setHost'));
	  // `URL.prototype.hostname` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-hostname
	  defineBuiltInAccessor$3(URLPrototype, 'hostname', accessorDescriptor('getHostname', 'setHostname'));
	  // `URL.prototype.port` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-port
	  defineBuiltInAccessor$3(URLPrototype, 'port', accessorDescriptor('getPort', 'setPort'));
	  // `URL.prototype.pathname` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-pathname
	  defineBuiltInAccessor$3(URLPrototype, 'pathname', accessorDescriptor('getPathname', 'setPathname'));
	  // `URL.prototype.search` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-search
	  defineBuiltInAccessor$3(URLPrototype, 'search', accessorDescriptor('getSearch', 'setSearch'));
	  // `URL.prototype.searchParams` getter
	  // https://url.spec.whatwg.org/#dom-url-searchparams
	  defineBuiltInAccessor$3(URLPrototype, 'searchParams', accessorDescriptor('getSearchParams'));
	  // `URL.prototype.hash` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-hash
	  defineBuiltInAccessor$3(URLPrototype, 'hash', accessorDescriptor('getHash', 'setHash'));
	}

	// `URL.prototype.toJSON` method
	// https://url.spec.whatwg.org/#dom-url-tojson
	defineBuiltIn$1(URLPrototype, 'toJSON', function toJSON() {
	  return getInternalURLState(this).serialize();
	}, { enumerable: true });

	// `URL.prototype.toString` method
	// https://url.spec.whatwg.org/#URL-stringification-behavior
	defineBuiltIn$1(URLPrototype, 'toString', function toString() {
	  return getInternalURLState(this).serialize();
	}, { enumerable: true });

	if (NativeURL) {
	  var nativeCreateObjectURL = NativeURL.createObjectURL;
	  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
	  // `URL.createObjectURL` method
	  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
	  if (nativeCreateObjectURL) defineBuiltIn$1(URLConstructor, 'createObjectURL', bind$1(nativeCreateObjectURL, NativeURL));
	  // `URL.revokeObjectURL` method
	  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
	  if (nativeRevokeObjectURL) defineBuiltIn$1(URLConstructor, 'revokeObjectURL', bind$1(nativeRevokeObjectURL, NativeURL));
	}

	setToStringTag$1(URLConstructor, 'URL');

	$$a({ global: true, constructor: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS$3 }, {
	  URL: URLConstructor
	});

	var $$9 = _export;
	var call$5 = functionCall;

	// `URL.prototype.toJSON` method
	// https://url.spec.whatwg.org/#dom-url-tojson
	$$9({ target: 'URL', proto: true, enumerable: true }, {
	  toJSON: function toJSON() {
	    return call$5(URL.prototype.toString, this);
	  }
	});

	function isValidPath(string) {
	  var url;
	  try {
	    url = new URL(string);
	  } catch (_) {
	    return false;
	  }
	  return url.protocol === "http:" || url.protocol === "https:";
	}
	var Parser$1 = {};
	Parser$1.parse = function (content) {
	  var playlist = {
	    header: {},
	    items: []
	  };
	  var lines = content.split('\n').map(parseLine);
	  var firstLine = lines.find(function (l) {
	    return l.index === 0;
	  });
	  if (!firstLine || !/^#EXTM3U/.test(firstLine.raw)) throw new Error('Playlist is not valid');
	  playlist.header = parseHeader(firstLine);
	  var i = 0;
	  var items = {};
	  var _iterator = _createForOfIteratorHelper(lines),
	    _step;
	  try {
	    for (_iterator.s(); !(_step = _iterator.n()).done;) {
	      var line = _step.value;
	      if (line.index === 0) continue;
	      var string = line.raw.toString().trim();
	      if (string.startsWith('#EXTINF:')) {
	        var EXTINF = string;
	        items[i] = {
	          name: EXTINF.getName(),
	          tvg: {
	            id: EXTINF.getAttribute('tvg-id'),
	            name: EXTINF.getAttribute('tvg-name'),
	            logo: EXTINF.getAttribute('tvg-logo'),
	            url: EXTINF.getAttribute('tvg-url'),
	            rec: EXTINF.getAttribute('tvg-rec')
	          },
	          group: {
	            title: EXTINF.getAttribute('group-title')
	          },
	          http: {
	            referrer: '',
	            'user-agent': EXTINF.getAttribute('user-agent')
	          },
	          url: undefined,
	          raw: line.raw,
	          line: line.index + 1,
	          catchup: {
	            type: EXTINF.getAttribute('catchup'),
	            days: EXTINF.getAttribute('catchup-days'),
	            source: EXTINF.getAttribute('catchup-source')
	          },
	          timeshift: EXTINF.getAttribute('timeshift')
	        };
	      } else if (string.startsWith('#EXTVLCOPT:')) {
	        if (!items[i]) continue;
	        var EXTVLCOPT = string;
	        items[i].http.referrer = EXTVLCOPT.getOption('http-referrer') || items[i].http.referrer;
	        items[i].http['user-agent'] = EXTVLCOPT.getOption('http-user-agent') || items[i].http['user-agent'];
	        items[i].raw += "\r\n".concat(line.raw);
	      } else if (string.startsWith('#EXTGRP:')) {
	        if (!items[i]) continue;
	        var EXTGRP = string;
	        items[i].group.title = EXTGRP.getValue() || items[i].group.title;
	        items[i].raw += "\r\n".concat(line.raw);
	      } else {
	        if (!items[i]) continue;
	        var url = string.getURL();
	        var user_agent = string.getParameter('user-agent');
	        var referrer = string.getParameter('referer');
	        if (url && isValidPath(url)) {
	          items[i].url = url;
	          items[i].http['user-agent'] = user_agent || items[i].http['user-agent'];
	          items[i].http.referrer = referrer || items[i].http.referrer;
	          items[i].raw += "\r\n".concat(line.raw);
	          i++;
	        } else {
	          if (!items[i]) continue;
	          items[i].raw += "\r\n".concat(line.raw);
	        }
	      }
	    }
	  } catch (err) {
	    _iterator.e(err);
	  } finally {
	    _iterator.f();
	  }
	  playlist.items = Object.values(items);
	  return playlist;
	};
	function parseLine(line, index) {
	  return {
	    index: index,
	    raw: line
	  };
	}
	function parseHeader(line) {
	  var supportedAttrs = ['x-tvg-url', 'url-tvg'];
	  var attrs = {};
	  for (var _i = 0, _supportedAttrs = supportedAttrs; _i < _supportedAttrs.length; _i++) {
	    var attrName = _supportedAttrs[_i];
	    var tvgUrl = line.raw.getAttribute(attrName);
	    if (tvgUrl) {
	      attrs[attrName] = tvgUrl;
	    }
	  }
	  return {
	    attrs: attrs,
	    raw: line.raw
	  };
	}
	String.prototype.getName = function () {
	  var name = this.split(/[\r\n]+/).shift().split(',').pop();
	  return name || '';
	};
	String.prototype.getAttribute = function (name) {
	  var regex = new RegExp(name + '="(.*?)"', 'gi');
	  var match = regex.exec(this);
	  return match && match[1] ? match[1] : '';
	};
	String.prototype.getOption = function (name) {
	  var regex = new RegExp(':' + name + '=(.*)', 'gi');
	  var match = regex.exec(this);
	  return match && match[1] && typeof match[1] === 'string' ? match[1].replace(/\"/g, '') : '';
	};
	String.prototype.getValue = function (name) {
	  var regex = new RegExp(':(.*)', 'gi');
	  var match = regex.exec(this);
	  return match && match[1] && typeof match[1] === 'string' ? match[1].replace(/\"/g, '') : '';
	};
	String.prototype.getURL = function () {
	  return this.split('|')[0] || '';
	};
	String.prototype.getParameter = function (name) {
	  var params = this.replace(/^(.*)\|/, '');
	  var regex = new RegExp(name + '=(\\w[^&]*)', 'gi');
	  var match = regex.exec(params);
	  return match && match[1] ? match[1] : '';
	};

	var Api = /*#__PURE__*/function () {
	  function Api() {
	    _classCallCheck(this, Api);
	  }
	  return _createClass(Api, null, [{
	    key: "get",
	    value: function get(method, catch_error) {
	      var _this = this;
	      return new Promise(function (resolve, reject) {
	        var account = Lampa.Storage.get('account', '{}');
	        if (!account.token) return catch_error ? reject(Lang.translate('account_login_failed')) : resolve();
	        _this.network.silent(_this.api_url + method, resolve, catch_error ? reject : resolve, false, {
	          headers: {
	            token: account.token,
	            profile: account.profile.id
	          }
	        });
	      });
	    }
	  }, {
	    key: "time",
	    value: function time(call) {
	      this.network.silent(this.api_url + 'time', call, function () {
	        call({
	          time: Date.now()
	        });
	      });
	    }
	  }, {
	    key: "m3u",
	    value: function m3u(url) {
	      var _this2 = this;
	      return new Promise(function (resolve, reject) {
	        var account = Lampa.Storage.get('account', '{}');
	        if (!account.token) return reject(Lampa.Lang.translate('account_login_failed'));
	        _this2.network.timeout(20000);
	        _this2.network.native(url, function (str) {
	          try {
	            var file = new File([str], "playlist.m3u", {
	              type: "text/plain"
	            });
	            var formData = new FormData($('<form></form>')[0]);
	            formData.append("file", file, "playlist.m3u");
	            $.ajax({
	              url: _this2.api_url + 'lampa',
	              type: 'POST',
	              data: formData,
	              async: true,
	              cache: false,
	              contentType: false,
	              timeout: 20000,
	              enctype: 'multipart/form-data',
	              processData: false,
	              headers: {
	                token: account.token,
	                profile: account.profile.id
	              },
	              success: function success(j) {
	                if (j.secuses) resolve(j);else reject(Lampa.Lang.translate('account_export_fail_600') + ' (' + (j.text || j.message) + ')');
	              },
	              error: function error(e) {
	                e.from_error = 'M3U Function (Failed upload to CUB)';
	                reject(e);
	              }
	            });
	          } catch (e) {
	            e.from_error = 'M3U Function';
	            reject(e);
	          }
	        }, function (e) {
	          e.from_error = 'M3U Function (Failed to download file)';
	          reject(e);
	        }, false, {
	          dataType: 'text'
	        });
	      });
	    }
	  }, {
	    key: "list",
	    value: function list() {
	      var _this3 = this;
	      return new Promise(function (resolve, reject) {
	        Promise.all([_this3.get('list'), DB.getDataAnyCase('playlist', 'list')]).then(function (result) {
	          if (result[0]) DB.rewriteData('playlist', 'list', result[0]);
	          var playlist = result[0] || result[1] || {
	            list: []
	          };
	          playlist.list = playlist.list.concat(Lampa.Storage.get('iptv_playlist_custom', '[]'));
	          resolve(playlist);
	        }).catch(reject);
	      });
	    }
	  }, {
	    key: "m3uClient",
	    value: function m3uClient(url) {
	      var _this4 = this;
	      return new Promise(function (resolve, reject) {
	        _this4.network.timeout(20000);
	        _this4.network[window.god_enabled ? 'native' : 'silent'](url, function (str) {
	          if (typeof str != 'string' || str.substr(0, 7).toUpperCase() !== "#EXTM3U") {
	            return reject(Lampa.Lang.translate('torrent_parser_request_error') + ' [M3UClient Function (The file is not M3U)]');
	          }
	          var list;
	          var catchup;
	          try {
	            str = str.replace(/tvg-rec="(\d+)"/g, 'catchup="default" catchup-days="$1"');
	            list = Parser$1.parse(str);
	          } catch (e) {}
	          if (list && list.items) {
	            var channels = [];
	            if (list.header.raw.indexOf('catchup') >= 0) {
	              catchup = {
	                days: 0,
	                source: '',
	                type: ''
	              };
	              var m_days = list.header.raw.match(/catchup-days="(\d+)"/);
	              var m_type = list.header.raw.match(/catchup="([a-z]+)"/);
	              var m_source = list.header.raw.match(/catchup-source="(.*?)"/);
	              if (m_days) catchup.days = m_days[1];
	              if (m_type) catchup.type = m_type[1];
	              if (m_source) catchup.source = m_source[1];
	            }
	            for (var i = 0; i < list.items.length; i++) {
	              var item = list.items[i];
	              var name = item.name.trim();
	              var channel = {
	                id: item.tvg && item.tvg.id ? item.tvg.id : null,
	                name: name.replace(/ \((\+\d+)\)/g, ' $1').replace(/\s+(\s|ⓢ|ⓖ|ⓥ|ⓞ|Ⓢ|Ⓖ|Ⓥ|Ⓞ)/g, ' ').trim(),
	                logo: item.tvg && item.tvg.logo && item.tvg.logo.indexOf('http') == 0 ? item.tvg.logo : null,
	                group: item.group.title,
	                url: item.url,
	                catchup: item.catchup,
	                timeshift: item.timeshift,
	                tvg: item.tvg
	              };
	              if (!item.catchup.type && catchup && item.raw.indexOf('catchup-enable="1"') >= 0) {
	                channel.catchup = catchup;
	              }
	              channels.push(channel);
	            }
	            var result = {
	              menu: [],
	              channels: channels
	            };
	            result.menu.push({
	              name: '',
	              count: channels.length
	            });
	            var _loop = function _loop() {
	              var channel = channels[_i];
	              var group = channel.group;
	              var find = result.menu.find(function (item) {
	                return item.name === group;
	              });
	              if (find) {
	                find.count++;
	              } else {
	                result.menu.push({
	                  name: group,
	                  count: 1
	                });
	              }
	            };
	            for (var _i = 0; _i < channels.length; _i++) {
	              _loop();
	            }
	            resolve({
	              name: '',
	              playlist: result,
	              secuses: true
	            });
	          } else {
	            reject(Lampa.Lang.translate('torrent_parser_empty') + ' [M3UClient Function (Parsing m3u failed)]');
	          }
	        }, function (e) {
	          e.from_error = 'M3UClient Function (Failed to load)';
	          reject(e);
	        }, false, {
	          dataType: 'text'
	        });
	      });
	    }
	  }, {
	    key: "playlist",
	    value: function playlist(data) {
	      var _this5 = this;
	      var id = data.id;
	      return new Promise(function (resolve, reject) {
	        Promise.all([DB.getDataAnyCase('playlist', id), Params.get(id)]).then(function (result) {
	          var playlist = result[0];
	          var params = result[1];
	          if (playlist && params) {
	            var time = {
	              'always': 0,
	              'hour': 1000 * 60 * 60,
	              'hour12': 1000 * 60 * 60 * 12,
	              'day': 1000 * 60 * 60 * 24,
	              'week': 1000 * 60 * 60 * 24 * 7,
	              'none': 0
	            };
	            if (params.update_time + time[params.update] > Date.now() || params.update == 'none') return resolve(playlist);
	          }
	          var secuses = function secuses(result) {
	            DB.rewriteData('playlist', id, result).finally(function () {
	              if (params) params.update_time = Date.now();
	              Params.set(id, params).finally(resolve.bind(resolve, result));
	            });
	          };
	          var error = function error(e) {
	            playlist ? resolve(playlist) : reject(e);
	          };
	          if (params && params.loading == 'lampa' || data.custom) {
	            _this5[Lampa.Account.logged() ? 'm3u' : 'm3uClient'](data.url).then(secuses).catch(error);
	          } else {
	            _this5.get('playlist/' + id, true).then(secuses).catch(function () {
	              _this5.m3u(data.url).then(secuses).catch(error);
	            });
	          }
	        }).catch(function (e) {
	          e.from_error = 'Playlist Function (Something went wrong)';
	          reject(e);
	        });
	      });
	    }
	  }, {
	    key: "program",
	    value: function program(data) {
	      var _this6 = this;
	      return new Promise(function (resolve, reject) {
	        var days = Lampa.Storage.field('iptv_guide_custom') ? Lampa.Storage.field('iptv_guide_save') : 3;
	        var tvg_id = data.tvg && data.tvg.id ? data.tvg.id : data.channel_id;
	        var tvg_name = data.tvg && data.tvg.name ? data.tvg.name : '';
	        var loadCUB = function loadCUB() {
	          var id = Lampa.Storage.field('iptv_guide_custom') ? tvg_id : data.channel_id;
	          _this6.network.timeout(5000);
	          _this6.network.silent(_this6.api_url + 'program/' + data.channel_id + '/' + data.time + '?full=true', function (result) {
	            DB.rewriteData('epg', id, result.program).finally(resolve.bind(resolve, result.program));
	          }, function (a) {
	            if (a.status == 500) DB.rewriteData('epg', id, []).finally(resolve.bind(resolve, []));else reject();
	          });
	        };
	        var loadEPG = function loadEPG(id, call) {
	          DB.getDataAnyCase('epg', id, 60 * 24 * days).then(function (epg) {
	            if (epg) resolve(epg);else call();
	          });
	        };
	        if (tvg_id) {
	          loadEPG(tvg_id, function () {
	            DB.getDataAnyCase('epg_channels', (tvg_name || data.name).toLowerCase()).then(function (gu) {
	              if (gu) loadEPG(gu.id, loadCUB);else loadCUB();
	            });
	          });
	        } else reject();
	      });
	    }
	  }]);
	}();
	_defineProperty(Api, "network", new Lampa.Reguest());
	_defineProperty(Api, "api_url", Lampa.Utils.protocol() + Lampa.Manifest.cub_domain + '/api/iptv/');

	var $$8 = _export;
	var isArray = isArray$5;
	var isConstructor = isConstructor$4;
	var isObject$4 = isObject$n;
	var toAbsoluteIndex$4 = toAbsoluteIndex$7;
	var lengthOfArrayLike$8 = lengthOfArrayLike$e;
	var toIndexedObject$2 = toIndexedObject$9;
	var createProperty = createProperty$4;
	var setArrayLength = arraySetLength;
	var wellKnownSymbol$2 = wellKnownSymbol$r;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$4;
	var nativeSlice = arraySlice$6;

	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('slice');

	var SPECIES = wellKnownSymbol$2('species');
	var $Array$1 = Array;
	var max = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	$$8({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject$2(this);
	    var length = lengthOfArrayLike$8(O);
	    var k = toAbsoluteIndex$4(start, length);
	    var fin = toAbsoluteIndex$4(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (isConstructor(Constructor) && (Constructor === $Array$1 || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject$4(Constructor)) {
	        Constructor = Constructor[SPECIES];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === $Array$1 || Constructor === undefined) {
	        return nativeSlice(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? $Array$1 : Constructor)(max(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    setArrayLength(result, n);
	    return result;
	  }
	});

	var Pilot = /*#__PURE__*/function () {
	  function Pilot() {
	    _classCallCheck(this, Pilot);
	  }
	  return _createClass(Pilot, null, [{
	    key: "notebook",
	    value: function notebook(param_name, param_set) {
	      var book = Lampa.Storage.get('iptv_pilot_book', '{}');
	      Lampa.Arrays.extend(book, {
	        playlist: '',
	        channel: -1,
	        category: ''
	      });
	      if (typeof param_set !== 'undefined') {
	        book[param_name] = param_set;
	        Lampa.Storage.set('iptv_pilot_book', book);
	      } else return book[param_name];
	    }
	  }]);
	}();

	var PlaylistItem = /*#__PURE__*/function () {
	  function PlaylistItem(playlist) {
	    var _this = this;
	    _classCallCheck(this, PlaylistItem);
	    this.playlist = playlist;
	    this.item = Lampa.Template.js('cub_iptv_playlist_item');
	    this.footer = this.item.find('.iptv-playlist-item__footer');
	    this.params = {};
	    Params.get(playlist.id).then(function (params) {
	      _this.params = params;
	      _this.drawFooter();
	    });
	    var name = playlist.name || '---';
	    this.item.find('.iptv-playlist-item__url').text(playlist.url);
	    this.item.find('.iptv-playlist-item__name-text').text(name);
	    this.item.find('.iptv-playlist-item__name-ico span').text(name.slice(0, 1).toUpperCase());
	    this.item.on('hover:long', this.displaySettings.bind(this)).on('hover:enter', function () {
	      if (_this.deleted) return;
	      Pilot.notebook('playlist', playlist.id);
	      DB.rewriteData('playlist', 'active', playlist.id).finally(function () {
	        _this.listener.send('channels-load', playlist);
	      });
	    });
	    this.item.on('update', function () {
	      Params.get(playlist.id).then(function (params) {
	        _this.params = params;
	        _this.drawFooter();
	      });
	    });
	  }
	  return _createClass(PlaylistItem, [{
	    key: "displaySettings",
	    value: function displaySettings() {
	      var _this2 = this;
	      if (this.deleted) return;
	      var params = {
	        update: ['always', 'hour', 'hour12', 'day', 'week', 'none'],
	        loading: ['cub', 'lampa']
	      };
	      var menu = [];
	      menu = menu.concat([{
	        title: Lampa.Lang.translate('iptv_update'),
	        subtitle: Params.value(this.params, 'update'),
	        name: 'update'
	      }, {
	        title: Lampa.Lang.translate('iptv_loading'),
	        subtitle: Params.value(this.params, 'loading'),
	        name: 'loading'
	      }, {
	        title: Lampa.Lang.translate('iptv_remove_cache'),
	        subtitle: Lampa.Lang.translate('iptv_remove_cache_descr')
	      }]);
	      if (this.playlist.custom) {
	        menu = menu.concat([{
	          title: Lampa.Lang.translate('more'),
	          separator: true
	        }, {
	          title: Lampa.Lang.translate('iptv_playlist_change_name'),
	          name: 'change',
	          value: 'name'
	        }, {
	          title: Lampa.Lang.translate('extensions_change_link'),
	          name: 'change',
	          value: 'url'
	        }, {
	          title: Lampa.Lang.translate('extensions_remove'),
	          name: 'delete'
	        }]);
	      }
	      Lampa.Select.show({
	        title: Lampa.Lang.translate('title_settings'),
	        items: menu,
	        onSelect: function onSelect(a) {
	          if (a.name == 'change') {
	            Lampa.Input.edit({
	              title: Lampa.Lang.translate('iptv_playlist_add_set_' + a.value),
	              free: true,
	              nosave: true,
	              value: _this2.playlist[a.value]
	            }, function (value) {
	              if (value) {
	                var list = Lampa.Storage.get('iptv_playlist_custom', '[]');
	                var item = list.find(function (n) {
	                  return n.id == _this2.playlist.id;
	                });
	                if (item && item[a.value] !== value) {
	                  item[a.value] = value;
	                  _this2.playlist[a.value] = value;
	                  Lampa.Storage.set('iptv_playlist_custom', list);
	                  _this2.item.find('.iptv-playlist-item__' + (a.value == 'name' ? 'name-text' : 'url')).text(value);
	                  Lampa.Noty.show(Lampa.Lang.translate('iptv_playlist_' + a.value + '_changed'));
	                }
	              }
	              Lampa.Controller.toggle('content');
	            });
	          } else if (a.name == 'delete') {
	            Lampa.Modal.open({
	              title: '',
	              align: 'center',
	              html: $('<div class="about">' + Lampa.Lang.translate('iptv_confirm_delete_playlist') + '</div>'),
	              buttons: [{
	                name: Lampa.Lang.translate('settings_param_no'),
	                onSelect: function onSelect() {
	                  Lampa.Modal.close();
	                  Lampa.Controller.toggle('content');
	                }
	              }, {
	                name: Lampa.Lang.translate('settings_param_yes'),
	                onSelect: function onSelect() {
	                  var list = Lampa.Storage.get('iptv_playlist_custom', '[]');
	                  Lampa.Arrays.remove(list, list.find(function (n) {
	                    return n.id == _this2.playlist.id;
	                  }));
	                  Lampa.Storage.set('iptv_playlist_custom', list);
	                  Lampa.Noty.show(Lampa.Lang.translate('iptv_playlist_deleted'));
	                  Lampa.Modal.close();
	                  Lampa.Controller.toggle('content');
	                  _this2.item.style.opacity = 0.3;
	                  _this2.deleted = true;
	                }
	              }]
	            });
	          } else if (a.name) {
	            var keys = params[a.name];
	            var items = [];
	            keys.forEach(function (k) {
	              items.push({
	                title: Lampa.Lang.translate('iptv_params_' + k),
	                selected: _this2.params[a.name] == k,
	                value: k
	              });
	            });
	            Lampa.Select.show({
	              title: Lampa.Lang.translate('title_settings'),
	              items: items,
	              onSelect: function onSelect(b) {
	                _this2.params[a.name] = b.value;
	                Params.set(_this2.playlist.id, _this2.params).then(_this2.drawFooter.bind(_this2)).catch(function (e) {
	                  Lampa.Noty.show(e);
	                }).finally(_this2.displaySettings.bind(_this2));
	              },
	              onBack: _this2.displaySettings.bind(_this2)
	            });
	          } else {
	            DB.deleteData('playlist', _this2.playlist.id).finally(function () {
	              Lampa.Noty.show(Lampa.Lang.translate('iptv_cache_clear'));
	            });
	            Lampa.Controller.toggle('content');
	          }
	        },
	        onBack: function onBack() {
	          Lampa.Controller.toggle('content');
	        }
	      });
	    }
	  }, {
	    key: "drawFooter",
	    value: function drawFooter() {
	      var _this3 = this;
	      this.footer.removeClass('hide');
	      function label(where, name, value) {
	        var leb_div = document.createElement('div');
	        var leb_val = document.createElement('span');
	        leb_div.addClass('iptv-playlist-item__label');
	        if (name) leb_div.text(name + ' - ');
	        leb_val.text(value);
	        leb_div.append(leb_val);
	        where.append(leb_div);
	      }
	      DB.getDataAnyCase('playlist', 'active').then(function (active) {
	        var details_left = _this3.item.find('.details-left').empty();
	        var details_right = _this3.item.find('.details-right').empty();
	        if (active && active == _this3.playlist.id) label(details_left, '', Lampa.Lang.translate('iptv_active'));
	        label(details_left, Lampa.Lang.translate('iptv_update'), Params.value(_this3.params, 'update'));
	        label(details_left, Lampa.Lang.translate('iptv_loading'), Params.value(_this3.params, 'loading'));
	        label(details_right, Lampa.Lang.translate('iptv_updated'), Lampa.Utils.parseTime(_this3.params.update_time).briefly);
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return this.item;
	    }
	  }]);
	}();

	var Playlist = /*#__PURE__*/function () {
	  function Playlist(listener) {
	    _classCallCheck(this, Playlist);
	    this.listener = listener;
	    this.html = Lampa.Template.js('cub_iptv_list');
	    this.scroll = new Lampa.Scroll({
	      mask: true,
	      over: true
	    });
	    this.html.find('.iptv-list__title').text(Lampa.Lang.translate('iptv_select_playlist'));
	    this.html.find('.iptv-list__items').append(this.scroll.render(true));
	  }
	  return _createClass(Playlist, [{
	    key: "item",
	    value: function item(data) {
	      var _this = this;
	      var item = new PlaylistItem(data);
	      item.listener = this.listener;
	      var elem = item.render();
	      elem.on('hover:focus', function () {
	        _this.last = elem;
	        _this.scroll.update(_this.last);
	      }).on('hover:hover hover:touch', function () {
	        _this.last = elem;
	        Navigator.focused(elem);
	      });
	      return item;
	    }
	  }, {
	    key: "list",
	    value: function list(playlist) {
	      var _this2 = this;
	      this.scroll.clear();
	      this.scroll.reset();
	      this.html.find('.iptv-list__text').html(Lampa.Lang.translate('iptv_select_playlist_text'));
	      var add = Lampa.Template.js('cub_iptv_list_add_custom');
	      add.find('.iptv-playlist-item__title').text(Lampa.Lang.translate('iptv_playlist_add_new'));
	      add.on('hover:enter', function () {
	        Lampa.Input.edit({
	          title: Lampa.Lang.translate('iptv_playlist_add_set_url'),
	          free: true,
	          nosave: true,
	          value: ''
	        }, function (value) {
	          if (value) {
	            var data = {
	              id: Lampa.Utils.uid(),
	              custom: true,
	              url: value,
	              name: ''
	            };
	            Lampa.Storage.add('iptv_playlist_custom', data);
	            var item = _this2.item(data);
	            add.parentNode.insertBefore(item.render(), add.nextSibling);
	          }
	          Lampa.Controller.toggle('content');
	        });
	      });
	      add.on('hover:focus', function () {
	        _this2.last = add;
	        _this2.scroll.update(_this2.last);
	      });
	      this.scroll.append(add);
	      playlist.list.reverse().forEach(function (data) {
	        var item = _this2.item(data);
	        _this2.scroll.append(item.render());
	      });
	      this.listener.send('display', this);
	    }
	  }, {
	    key: "main",
	    value: function main() {
	      Api.list().then(this.list.bind(this)).catch(this.empty.bind(this));
	    }
	  }, {
	    key: "load",
	    value: function load() {
	      var _this3 = this;
	      Promise.all([Api.list(), DB.getDataAnyCase('playlist', 'active')]).then(function (result) {
	        var playlist = result[0];
	        var active = result[1] || Pilot.notebook('playlist');
	        if (playlist) {
	          if (active) {
	            var find = playlist.list.find(function (l) {
	              return l.id == active;
	            });
	            if (find) {
	              _this3.listener.send('channels-load', find);
	            } else _this3.list(playlist);
	          } else _this3.list(playlist);
	        } else _this3.empty();
	      }).catch(this.empty.bind(this));
	    }
	  }, {
	    key: "empty",
	    value: function empty() {
	      this.scroll.clear();
	      this.scroll.reset();
	      this.html.find('.iptv-list__text').html(Lampa.Lang.translate('iptv_playlist_empty'));
	      var empty = Lampa.Template.js('cub_iptv_list_empty');
	      empty.find('.iptv-list-empty__text').html(Lampa.Lang.translate('empty_title'));
	      this.scroll.append(empty);
	      this.listener.send('display', this);
	    }
	  }, {
	    key: "toggle",
	    value: function toggle() {
	      var _this4 = this;
	      Lampa.Controller.add('content', {
	        toggle: function toggle() {
	          Lampa.Controller.collectionSet(_this4.html);
	          Lampa.Controller.collectionFocus(_this4.last, _this4.html);
	        },
	        left: function left() {
	          Lampa.Controller.toggle('menu');
	        },
	        down: Navigator.move.bind(Navigator, 'down'),
	        up: function up() {
	          if (Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
	        },
	        back: function back() {
	          Lampa.Activity.backward();
	        }
	      });
	      Lampa.Controller.toggle('content');
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return this.html;
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.scroll.destroy();
	      this.html.remove();
	    }
	  }]);
	}();

	var tryToString$1 = tryToString$6;

	var $TypeError$2 = TypeError;

	var deletePropertyOrThrow$2 = function (O, P) {
	  if (!delete O[P]) throw new $TypeError$2('Cannot delete property ' + tryToString$1(P) + ' of ' + tryToString$1(O));
	};

	var userAgent$1 = environmentUserAgent;

	var firefox = userAgent$1.match(/firefox\/(\d+)/i);

	var environmentFfVersion = !!firefox && +firefox[1];

	var UA = environmentUserAgent;

	var environmentIsIeOrEdge = /MSIE|Trident/.test(UA);

	var userAgent = environmentUserAgent;

	var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

	var environmentWebkitVersion = !!webkit && +webkit[1];

	var $$7 = _export;
	var uncurryThis$a = functionUncurryThis;
	var aCallable$3 = aCallable$c;
	var toObject$4 = toObject$c;
	var lengthOfArrayLike$7 = lengthOfArrayLike$e;
	var deletePropertyOrThrow$1 = deletePropertyOrThrow$2;
	var toString$2 = toString$d;
	var fails$b = fails$G;
	var internalSort$1 = arraySort$1;
	var arrayMethodIsStrict$1 = arrayMethodIsStrict$4;
	var FF$1 = environmentFfVersion;
	var IE_OR_EDGE$1 = environmentIsIeOrEdge;
	var V8$1 = environmentV8Version;
	var WEBKIT$1 = environmentWebkitVersion;

	var test = [];
	var nativeSort$1 = uncurryThis$a(test.sort);
	var push = uncurryThis$a(test.push);

	// IE8-
	var FAILS_ON_UNDEFINED = fails$b(function () {
	  test.sort(undefined);
	});
	// V8 bug
	var FAILS_ON_NULL = fails$b(function () {
	  test.sort(null);
	});
	// Old WebKit
	var STRICT_METHOD$1 = arrayMethodIsStrict$1('sort');

	var STABLE_SORT$1 = !fails$b(function () {
	  // feature detection can be too slow, so check engines versions
	  if (V8$1) return V8$1 < 70;
	  if (FF$1 && FF$1 > 3) return;
	  if (IE_OR_EDGE$1) return true;
	  if (WEBKIT$1) return WEBKIT$1 < 603;

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

	var FORCED$4 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$1 || !STABLE_SORT$1;

	var getSortCompare$1 = function (comparefn) {
	  return function (x, y) {
	    if (y === undefined) return -1;
	    if (x === undefined) return 1;
	    if (comparefn !== undefined) return +comparefn(x, y) || 0;
	    var xString = toString$2(x);
	    var yString = toString$2(y);
	    return xString === yString ? 0 : xString > yString ? 1 : -1;
	  };
	};

	// `Array.prototype.sort` method
	// https://tc39.es/ecma262/#sec-array.prototype.sort
	$$7({ target: 'Array', proto: true, forced: FORCED$4 }, {
	  sort: function sort(comparefn) {
	    if (comparefn !== undefined) aCallable$3(comparefn);

	    var array = toObject$4(this);

	    if (STABLE_SORT$1) return comparefn === undefined ? nativeSort$1(array) : nativeSort$1(array, comparefn);

	    var items = [];
	    var arrayLength = lengthOfArrayLike$7(array);
	    var itemsLength, index;

	    for (index = 0; index < arrayLength; index++) {
	      if (index in array) push(items, array[index]);
	    }

	    internalSort$1(items, getSortCompare$1(comparefn));

	    itemsLength = lengthOfArrayLike$7(items);
	    index = 0;

	    while (index < itemsLength) array[index] = items[index++];
	    while (index < arrayLength) deletePropertyOrThrow$1(array, index++);

	    return array;
	  }
	});

	var Icons = /*#__PURE__*/function () {
	  function Icons(listener) {
	    var _this = this;
	    _classCallCheck(this, Icons);
	    this.listener = listener;
	    this.position = 0;
	    this.scroll = new Lampa.Scroll({
	      mask: !window.iptv_mobile,
	      over: true,
	      end_ratio: 2,
	      horizontal: window.iptv_mobile
	    });
	    this.html = document.createElement('div');
	    this.html.addClass('iptv-channels');
	    this.scroll.append(this.html);
	    if (!window.iptv_mobile) this.scroll.minus();
	    this.scroll.onEnd = function () {
	      _this.position++;
	      _this.next();
	    };
	    this.listener.follow('icons-load', function (data) {
	      _this.icons = data.icons;
	      if (data.menu.favorites) {
	        _this.icons.sort(function (a, b) {
	          var ta = a.added || 0;
	          var tb = b.added || 0;
	          return ta < tb ? -1 : ta > tb ? 1 : 0;
	        });
	        _this.sort();
	      }
	      _this.icons_clone = Lampa.Arrays.clone(_this.icons);
	      _this.html.empty();
	      _this.scroll.reset();
	      _this.position = 0;
	      _this.last = false;
	      _this.next();
	      var channel = Pilot.notebook('channel');
	      if (channel >= 0 && channel <= _this.icons.length && window.lampa_settings.iptv) {
	        setTimeout(function () {
	          _this.listener.send('play', {
	            position: channel,
	            total: _this.icons.length
	          });
	        }, 1000);
	      }
	    });
	  }
	  return _createClass(Icons, [{
	    key: "sort",
	    value: function sort() {
	      var sort_type = Lampa.Storage.field('iptv_favotite_sort');
	      if (Lampa.Account.hasPremium() && sort_type !== 'add') {
	        this.icons.sort(function (a, b) {
	          if (sort_type == 'name') {
	            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
	          } else if (sort_type == 'view') {
	            var va = a.view || 0;
	            var vb = b.view || 0;
	            return va < vb ? 1 : va > vb ? -1 : 0;
	          }
	        });
	      }
	    }
	  }, {
	    key: "active",
	    value: function active(item) {
	      var active = this.html.find('.active');
	      if (active) active.removeClass('active');
	      item.addClass('active');
	    }
	  }, {
	    key: "icon",
	    value: function icon(item, element) {
	      var icons = item.find('.iptv-channel__icons');
	      icons.empty();
	      if (Favorites.find(element)) icons.append(Lampa.Template.js('cub_iptv_icon_fav'));
	      if (Locked.find(Locked.format('channel', element))) icons.append(Lampa.Template.js('cub_iptv_icon_lock'));
	    }
	  }, {
	    key: "next",
	    value: function next() {
	      var _this2 = this;
	      var views = 10;
	      var start = this.position * views;
	      this.icons.slice(start, start + views).forEach(function (element, index) {
	        delete element.target;
	        var item = document.createElement('div');
	        var body = document.createElement('div');
	        var img = document.createElement('img');
	        var chn = document.createElement('div');
	        var icn = document.createElement('div');
	        var position = start + index;
	        chn.text((position + 1).pad(3));
	        item.addClass('iptv-channel selector layer--visible layer--render');
	        body.addClass('iptv-channel__body');
	        img.addClass('iptv-channel__ico');
	        chn.addClass('iptv-channel__chn');
	        icn.addClass('iptv-channel__icons');
	        body.append(img);
	        item.append(body);
	        item.append(chn);
	        item.append(icn);
	        _this2.icon(item, element);
	        _this2.listener.follow('update-channel-icon', function (channel) {
	          if (channel.name == element.name) _this2.icon(item, element);
	        });
	        item.on('visible', function () {
	          img.onerror = function () {
	            var simb = document.createElement('div');
	            simb.addClass('iptv-channel__simb');
	            simb.text(element.name.length <= 3 ? element.name.toUpperCase() : element.name.replace(/[^a-z|а-я|0-9]/gi, '').toUpperCase()[0]);
	            var text = document.createElement('div');
	            text.addClass('iptv-channel__name');
	            text.text(Utils.clear(element.name));
	            body.append(simb);
	            body.append(text);
	          };
	          img.onload = function () {
	            item.addClass('loaded');
	            if (element.logo.indexOf('epg.it999') == -1) {
	              item.addClass('small--icon');
	            }
	          };
	          if (element.logo) img.src = element.logo;else img.onerror();
	        });
	        item.on('hover:focus', function () {
	          _this2.active(item);
	          _this2.scroll.update(item);
	          if (_this2.last !== item) _this2.listener.send('details-load', element);
	          _this2.last = item;
	        }).on('hover:hover hover:touch', function () {
	          Navigator.focused(item);
	          _this2.active(item);
	          if (_this2.last !== item) _this2.listener.send('details-load', element);
	          _this2.last = item;
	        }).on('hover:long', function () {
	          Lampa.Select.show({
	            title: Lampa.Lang.translate('title_action'),
	            items: [{
	              title: Lampa.Lang.translate(Favorites.find(element) ? 'iptv_remove_fav' : 'iptv_add_fav'),
	              type: 'favorite'
	            }, {
	              title: Lampa.Lang.translate(Locked.find(Locked.format('channel', element)) ? 'iptv_channel_unlock' : 'iptv_channel_lock'),
	              type: 'locked'
	            }],
	            onSelect: function onSelect(a) {
	              _this2.toggle();
	              if (a.type == 'favorite') {
	                Favorites.toggle(element).finally(function () {
	                  _this2.icon(item, element);
	                  _this2.listener.send('update-favorites');
	                });
	              } else if (a.type == 'locked') {
	                if (Lampa.Manifest.app_digital >= 204) {
	                  if (Locked.find(Locked.format('channel', element))) {
	                    Lampa.ParentalControl.query(function () {
	                      _this2.toggle();
	                      Locked.remove(Locked.format('channel', element)).finally(function () {
	                        _this2.icon(item, element);
	                      });
	                    }, _this2.toggle.bind(_this2));
	                  } else {
	                    Locked.add(Locked.format('channel', element)).finally(function () {
	                      _this2.icon(item, element);
	                    });
	                  }
	                } else {
	                  Lampa.Noty.show(Lampa.Lang.translate('iptv_need_update_app'));
	                }
	              }
	            },
	            onBack: _this2.toggle.bind(_this2)
	          });
	        }).on('hover:enter', function () {
	          _this2.listener.send('play', {
	            position: position,
	            total: _this2.icons.length
	          });
	        });
	        _this2.html.append(item);
	        if (Lampa.Controller.own(_this2)) Lampa.Controller.collectionAppend(item);
	      });
	      setTimeout(function () {
	        Lampa.Layer.visible(_this2.html);
	      }, 300);
	    }
	  }, {
	    key: "toggle",
	    value: function toggle() {
	      var _this3 = this;
	      Lampa.Controller.add('content', {
	        link: this,
	        toggle: function toggle() {
	          if (_this3.html.find('.selector')) {
	            Lampa.Controller.collectionSet(_this3.html);
	            Lampa.Controller.collectionFocus(_this3.last, _this3.html);
	          } else _this3.listener.send('toggle', 'menu');
	        },
	        left: function left() {
	          _this3.listener.send('toggle', 'menu');
	        },
	        right: function right() {
	          _this3.listener.send('toggle', 'details');
	        },
	        up: function up() {
	          if (Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
	        },
	        down: function down() {
	          if (Navigator.canmove('down')) Navigator.move('down');
	        },
	        back: function back() {
	          _this3.listener.send('back');
	        }
	      });
	      Lampa.Controller.toggle('content');
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return this.scroll.render(true);
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.scroll.destroy();
	      this.html.remove();
	    }
	  }]);
	}();

	var EPG = /*#__PURE__*/function () {
	  function EPG() {
	    _classCallCheck(this, EPG);
	  }
	  return _createClass(EPG, null, [{
	    key: "init",
	    value: function init() {
	      var _this = this;
	      var ts = new Date().getTime();
	      Api.time(function (json) {
	        var te = new Date().getTime();
	        _this.time_offset = json.time < ts || json.time > te ? json.time - te : 0;
	      });
	    }
	  }, {
	    key: "time",
	    value: function time(channel) {
	      var timeshift = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	      var date = new Date(),
	        time = date.getTime() + this.time_offset,
	        ofst = parseInt((localStorage.getItem('time_offset') == null ? 'n0' : localStorage.getItem('time_offset')).replace('n', ''));
	      date = new Date(time + ofst * 1000 * 60 * 60);
	      var offset = channel.name.match(/([+|-]\d)$/);
	      if (offset) {
	        date.setHours(date.getHours() + parseInt(offset[1]));
	      }
	      var result = date.getTime();
	      result -= timeshift;
	      return result;
	    }
	  }, {
	    key: "position",
	    value: function position(channel, list, timeshift) {
	      var tim = this.time(channel, timeshift);
	      var now = list.find(function (p) {
	        return tim > p.start && tim < p.stop;
	      });
	      return now ? list.indexOf(now) : list.length - 1;
	    }
	  }, {
	    key: "timeline",
	    value: function timeline(channel, program, timeshift) {
	      var time = this.time(channel, timeshift);
	      var total = program.stop - program.start;
	      var less = program.stop - time;
	      return Math.min(100, Math.max(0, (1 - less / total) * 100));
	    }
	  }, {
	    key: "list",
	    value: function list(channel, _list) {
	      var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
	      var position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
	      var day_lst = '';
	      var day_prg = '';
	      var day_now = new Date(Date.now()).getDate();
	      var day_nam = {};
	      var display = [];
	      day_nam[day_now - 1] = Lampa.Lang.translate('iptv_yesterday');
	      day_nam[day_now] = Lampa.Lang.translate('iptv_today');
	      day_nam[day_now + 1] = Lampa.Lang.translate('iptv_tomorrow');
	      var watch = _list[this.position(channel, _list)];
	      _list.slice(position, position + size).forEach(function (elem) {
	        day_prg = new Date(elem.start).getDate();
	        if (day_lst !== day_prg) {
	          day_lst = day_prg;
	          display.push({
	            type: 'date',
	            date: day_nam[day_prg] ? day_nam[day_prg] : Lampa.Utils.parseTime(elem.start).short
	          });
	        }
	        display.push({
	          type: 'program',
	          program: elem,
	          watch: watch == elem
	        });
	      });
	      return display;
	    }
	  }]);
	}();
	_defineProperty(EPG, "time_offset", 0);

	var Details = /*#__PURE__*/function () {
	  function Details(listener) {
	    var _this = this;
	    _classCallCheck(this, Details);
	    this.listener = listener;
	    this.html = Lampa.Template.js('cub_iptv_details');
	    this.title = this.html.find('.iptv-details__title');
	    this.play = this.html.find('.iptv-details__play');
	    this.progm = this.html.find('.iptv-details__program');
	    this.progm_image = false;
	    this.empty_html = Lampa.Template.js('cub_iptv_details_empty');
	    this.listener.follow('details-load', this.draw.bind(this));
	    if (window.iptv_mobile) this.html.removeClass('layer--wheight');
	    this.timer = setInterval(function () {
	      if (_this.timeline) _this.timeline();
	    }, 1000 * 5);
	  }
	  return _createClass(Details, [{
	    key: "draw",
	    value: function draw(channel) {
	      var _this2 = this;
	      this.title.text(Utils.clearChannelName(channel.name));
	      this.group(channel, Utils.clearMenuName(channel.group || Lampa.Lang.translate('player_unknown')));
	      this.wait_for = channel.name;
	      if (channel.id) {
	        this.progm.text(Lampa.Lang.translate('loading') + '...');
	        Api.program({
	          name: channel.name,
	          channel_id: channel.id,
	          time: EPG.time(channel),
	          tvg: channel.tvg
	        }).then(function (program) {
	          if (_this2.wait_for == channel.name) {
	            if (program.length) _this2.program(channel, program);else _this2.empty();
	          }
	        }).catch(function (e) {
	          _this2.empty();
	        });
	      } else {
	        this.empty();
	      }
	    }
	  }, {
	    key: "group",
	    value: function group(channel, title) {
	      this.play.empty();
	      var group = document.createElement('span');
	      group.text(title);
	      if (Utils.hasArchive(channel)) {
	        var archive = document.createElement('span');
	        archive.addClass('lb').text('A');
	        this.play.append(archive);
	      }
	      var hd = Utils.isHD(channel.name);
	      if (hd) {
	        var hd_lb = document.createElement('span');
	        hd_lb.addClass('lb').text(hd.toUpperCase());
	        this.play.append(hd_lb);
	      }
	      this.play.append(group);
	    }
	  }, {
	    key: "empty",
	    value: function empty() {
	      this.timeline = false;
	      this.progm.empty().append(this.empty_html);
	    }
	  }, {
	    key: "buildProgramList",
	    value: function buildProgramList(channel, program, params) {
	      var _this3 = this;
	      var stime = EPG.time(channel);
	      var start = EPG.position(channel, program);
	      var archive = Utils.hasArchive(channel);
	      if (!params && program[start]) {
	        this.group(channel, Lampa.Utils.shortText(Utils.clear(program[start].title), 50));
	      }
	      return new Lampa.Endless(function (position) {
	        if (position >= program.length) return _this3.endless.to(position - 1);
	        var wrap = document.createElement('div');
	        var list = EPG.list(channel, program, 10, position);
	        wrap.addClass('iptv-details__list');
	        list.forEach(function (elem, index) {
	          var item = document.createElement('div');
	          if (elem.type == 'date') item.addClass('iptv-program-date').text(elem.date);else {
	            item.addClass('iptv-program selector');
	            var head, icon_wrap, icon_img, head_body;
	            var time = document.createElement('div');
	            time.addClass('iptv-program__time').text(Lampa.Utils.parseTime(elem.program.start).time);
	            var body = document.createElement('div');
	            body.addClass('iptv-program__body');
	            var title = document.createElement('div');
	            title.addClass('iptv-program__title').text(Utils.clear(elem.program.title));
	            if (elem.program.icon && index == 1) {
	              head = document.createElement('div');
	              head_body = document.createElement('div');
	              icon_wrap = document.createElement('div');
	              icon_img = document.createElement('img');
	              head.addClass('iptv-program__head');
	              head_body.addClass('iptv-program__head-body');
	              icon_wrap.addClass('iptv-program__icon-wrap');
	              icon_img.addClass('iptv-program__icon-img');
	              icon_wrap.append(icon_img);
	              head.append(icon_wrap);
	              head.append(head_body);
	              head_body.append(title);
	              body.append(head);
	              if (_this3.progm_image && _this3.progm_image.waiting) _this3.progm_image.src = '';
	              icon_img.onload = function () {
	                icon_img.waiting = false;
	                icon_wrap.addClass('loaded');
	              };
	              icon_img.error = function () {
	                icon_wrap.addClass('loaded-error');
	                icon_img.src = './img/img_broken.svg';
	              };
	              icon_img.waiting = true;
	              icon_img.src = elem.program.icon;
	              _this3.progm_image = icon_img;
	            } else {
	              body.append(title);
	            }
	            if (elem.watch) {
	              var timeline = document.createElement('div');
	              timeline.addClass('iptv-program__timeline');
	              var div = document.createElement('div');
	              div.style.width = EPG.timeline(channel, elem.program) + '%';
	              timeline.append(div);
	              if (!params) {
	                _this3.timeline = function () {
	                  var percent = EPG.timeline(channel, elem.program);
	                  div.style.width = percent + '%';
	                  if (percent == 100) {
	                    var next = EPG.position(channel, program);
	                    if (start !== next) _this3.program(channel, program);
	                  }
	                };
	              }
	              if (archive) {
	                item.on('hover:enter', function () {
	                  var data = {
	                    program: elem.program,
	                    position: position,
	                    channel: channel,
	                    playlist: program.slice(Math.max(0, position - 40), start)
	                  };
	                  if (params) params.onPlay(data);else _this3.listener.send('play-archive', data);
	                });
	              }
	              item.addClass('played');
	              if (elem.program.icon && head_body) {
	                head_body.append(timeline);
	              } else {
	                body.append(timeline);
	              }
	            }
	            if (index == 1 && elem.program.desc) {
	              var text = Utils.clear(elem.program.desc);
	              if (text.length > 300) text = text.slice(0, 300) + '...';
	              var descr = document.createElement('div');
	              descr.addClass('iptv-program__descr').text(text);
	              body.append(descr);
	            }
	            if (archive) {
	              var minus = stime - archive * 1000 * 60 * 60 * 24;
	              if (elem.program.start > minus && elem.program.stop < stime) {
	                item.addClass('archive');
	                item.on('hover:enter', function () {
	                  var data = {
	                    program: elem.program,
	                    position: position,
	                    channel: channel,
	                    timeshift: stime - elem.program.start,
	                    playlist: program.slice(Math.max(0, position - 40), start)
	                  };
	                  if (params) params.onPlay(data);else _this3.listener.send('play-archive', data);
	                });
	              }
	            }
	            item.append(time);
	            item.append(body);
	          }
	          wrap.append(item);
	        });
	        return wrap;
	      }, {
	        position: start
	      });
	    }

	    /**
	     * Программа в плеере
	     */
	  }, {
	    key: "playlist",
	    value: function playlist(channel, program) {
	      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	      return this.buildProgramList(channel, program, params);
	    }

	    /**
	     * Программа в главном интерфейсе
	     */
	  }, {
	    key: "program",
	    value: function program(channel, _program) {
	      if (this.endless) this.endless.destroy();
	      this.timeline = false;
	      this.endless = this.buildProgramList(channel, _program);
	      this.progm.empty().append(this.endless.render());
	    }
	  }, {
	    key: "toggle",
	    value: function toggle() {
	      var _this4 = this;
	      Lampa.Controller.add('content', {
	        link: this,
	        toggle: function toggle() {
	          if (_this4.html.find('.selector')) {
	            Lampa.Controller.collectionSet(_this4.html);
	            Lampa.Controller.collectionFocus(false, _this4.html);
	          } else _this4.listener.send('toggle', 'icons');
	        },
	        left: function left() {
	          _this4.listener.send('toggle', 'icons');
	        },
	        up: function up() {
	          if (_this4.endless) {
	            _this4.endless.move(-1);
	            Lampa.Controller.collectionSet(_this4.html);
	            Lampa.Controller.collectionFocus(false, _this4.html);
	          }
	        },
	        down: function down() {
	          if (_this4.endless) {
	            _this4.endless.move(1);
	            Lampa.Controller.collectionSet(_this4.html);
	            Lampa.Controller.collectionFocus(false, _this4.html);
	          }
	        },
	        back: function back() {
	          _this4.listener.send('back');
	        }
	      });
	      Lampa.Controller.toggle('content');
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return this.html;
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.html.remove();
	      clearInterval(this.timer);
	      this.wait_for = false;
	    }
	  }]);
	}();

	var $$6 = _export;
	var $filter$1 = arrayIteration.filter;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$4;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	$$6({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// `SameValue` abstract operation
	// https://tc39.es/ecma262/#sec-samevalue
	// eslint-disable-next-line es/no-object-is -- safe
	var sameValue$1 = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return x === y ? x !== 0 || 1 / x === 1 / y : x !== x && y !== y;
	};

	var call$4 = functionCall;
	var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
	var anObject$1 = anObject$j;
	var isObject$3 = isObject$n;
	var requireObjectCoercible$1 = requireObjectCoercible$b;
	var sameValue = sameValue$1;
	var toString$1 = toString$d;
	var getMethod = getMethod$7;
	var regExpExec = regexpExecAbstract;

	// @@search logic
	fixRegExpWellKnownSymbolLogic('search', function (SEARCH, nativeSearch, maybeCallNative) {
	  return [
	    // `String.prototype.search` method
	    // https://tc39.es/ecma262/#sec-string.prototype.search
	    function search(regexp) {
	      var O = requireObjectCoercible$1(this);
	      var searcher = isObject$3(regexp) ? getMethod(regexp, SEARCH) : undefined;
	      return searcher ? call$4(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString$1(O));
	    },
	    // `RegExp.prototype[@@search]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
	    function (string) {
	      var rx = anObject$1(this);
	      var S = toString$1(string);
	      var res = maybeCallNative(nativeSearch, rx, S);

	      if (res.done) return res.value;

	      var previousLastIndex = rx.lastIndex;
	      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
	      var result = regExpExec(rx, S);
	      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
	      return result === null ? -1 : result.index;
	    }
	  ];
	});

	var last_query = '';
	var Search = /*#__PURE__*/function () {
	  function Search() {
	    _classCallCheck(this, Search);
	  }
	  return _createClass(Search, null, [{
	    key: "find",
	    value: function find(channels, call) {
	      var controller = Lampa.Controller.enabled().name;
	      Lampa.Input.edit({
	        value: last_query,
	        free: true,
	        nosave: true
	      }, function (new_value) {
	        last_query = new_value;
	        Lampa.Controller.toggle(controller);
	        call({
	          channels: channels.filter(function (c) {
	            return c.name.toLowerCase().indexOf(new_value.toLowerCase()) >= 0;
	          }),
	          query: new_value
	        });
	      });
	    }
	  }]);
	}();

	var Menu = /*#__PURE__*/function () {
	  function Menu(listener) {
	    _classCallCheck(this, Menu);
	    this.listener = listener;
	    this.html = Lampa.Template.js('cub_iptv_menu');
	    this.menu = this.html.find('.iptv-menu__list');
	    this.scroll = new Lampa.Scroll({
	      mask: !window.iptv_mobile,
	      over: true,
	      horizontal: window.iptv_mobile
	    });
	    if (!window.iptv_mobile) this.scroll.minus();
	    this.scroll.append(this.html);
	  }
	  return _createClass(Menu, [{
	    key: "favorites",
	    value: function favorites(channels) {
	      var favorites = Favorites.list();
	      if (Lampa.Storage.get('iptv_favotite_save', 'url') == 'name') {
	        favorites = favorites.filter(function (f) {
	          return channels.find(function (c) {
	            return c.name == f.name;
	          });
	        });
	        favorites.forEach(function (f) {
	          f.url = channels.find(function (c) {
	            return c.name == f.name;
	          }).url;
	        });
	      }
	      return favorites;
	    }
	  }, {
	    key: "build",
	    value: function build(data) {
	      var _this = this;
	      this.menu.empty();
	      var search_item = {
	        name: Lampa.Lang.translate('search'),
	        count: 0,
	        search: true
	      };
	      this.html.find('.iptv-menu__title').text(data.name || Lampa.Lang.translate('player_playlist'));
	      this.html.find('.iptv-menu__search').on('hover:enter', function () {
	        Search.find(data.playlist.channels, search_item.update);
	      });
	      Lampa.Arrays.insert(data.playlist.menu, 0, search_item);
	      var favorites = this.favorites(data.playlist.channels);
	      var category = Pilot.notebook('category');
	      Lampa.Arrays.insert(data.playlist.menu, 0, {
	        name: Lampa.Lang.translate('settings_input_links'),
	        count: favorites.length,
	        favorites: true
	      });
	      var first;
	      var first_item;
	      var pilot;
	      if (window.iptv_mobile) {
	        var mobile_seacrh_button = Lampa.Template.js('iptv_menu_mobile_button_search');
	        mobile_seacrh_button.on('hover:enter', function () {
	          Search.find(data.playlist.channels, search_item.update);
	        });
	        this.menu.append(mobile_seacrh_button);
	      }
	      data.playlist.menu.forEach(function (menu) {
	        if (menu.count == 0 && !(menu.favorites || menu.search)) return;
	        var li = document.createElement('div');
	        var co = document.createElement('span');
	        var nm = document.createElement('div');
	        var ic = document.createElement('div');
	        li.addClass('iptv-menu__list-item selector');
	        ic.addClass('iptv-menu__list-item-icon');
	        nm.text(Utils.clearMenuName(menu.name || Lampa.Lang.translate('iptv_all_channels')));
	        co.text(menu.count);
	        li.append(ic);
	        li.append(nm);
	        li.append(co);
	        var icon_name = 'group';
	        if (menu.favorites) icon_name = 'fav';
	        if (menu.search) icon_name = 'searched';
	        if (!menu.name) icon_name = 'all';
	        ic.append(Lampa.Template.js('cub_iptv_icon_' + icon_name));
	        if (menu.favorites) {
	          li.addClass('favorites--menu-item');
	          _this.listener.follow('update-favorites', function () {
	            favorites = Favorites.list();
	            menu.count = favorites.length;
	            co.text(menu.count);
	          });
	        } else if (menu.search) {
	          li.addClass('search--menu-item');
	          menu.update = function (result) {
	            menu.find = result.channels;
	            menu.count = result.channels.length;
	            co.text(result.channels.length);
	            if (menu.count) Lampa.Utils.trigger(li, 'hover:enter');else {
	              Lampa.Noty.show(Lampa.Lang.translate('iptv_search_no_result') + ' (' + result.query + ')');
	              if (first_item) Lampa.Utils.trigger(first_item, 'hover:enter');
	            }
	          };
	        } else {
	          if (!first_item) {
	            first_item = li;
	          }
	          if (menu.name) {
	            var updateIcon = function updateIcon() {
	              ic.empty();
	              ic.append(Lampa.Template.js('cub_iptv_icon_' + (Locked.find(Locked.format('group', menu.name)) ? 'lock' : 'group')));
	            };
	            updateIcon();
	            li.on('hover:long', function () {
	              Lampa.Select.show({
	                title: Lampa.Lang.translate('title_action'),
	                items: [{
	                  title: Lampa.Lang.translate(Locked.find(Locked.format('group', menu.name)) ? 'iptv_channel_unlock' : 'iptv_channel_lock'),
	                  type: 'locked'
	                }],
	                onSelect: function onSelect(a) {
	                  _this.toggle();
	                  if (a.type == 'locked') {
	                    if (Lampa.Manifest.app_digital >= 204) {
	                      if (Locked.find(Locked.format('group', menu.name))) {
	                        Lampa.ParentalControl.query(function () {
	                          _this.toggle();
	                          Locked.remove(Locked.format('group', menu.name)).finally(updateIcon);
	                        }, _this.toggle.bind(_this));
	                      } else {
	                        Locked.add(Locked.format('group', menu.name)).finally(updateIcon);
	                      }
	                    } else {
	                      Lampa.Noty.show(Lampa.Lang.translate('iptv_need_update_app'));
	                    }
	                  }
	                },
	                onBack: _this.toggle.bind(_this)
	              });
	            });
	          }
	        }
	        li.on('hover:enter', function () {
	          if (menu.count == 0) return;
	          var load = function load() {
	            Pilot.notebook('category', menu.name || 'all');
	            _this.listener.send('icons-load', {
	              menu: menu,
	              icons: menu.name ? data.playlist.channels.filter(function (a) {
	                return a.group == menu.name;
	              }) : data.playlist.channels
	            });
	          };
	          var toggle = function toggle() {
	            var active = _this.menu.find('.active');
	            if (active) active.removeClass('active');
	            li.addClass('active');
	            _this.last = li;
	            _this.listener.send('toggle', 'icons');
	          };
	          if (menu.favorites) {
	            Pilot.notebook('category', '');
	            _this.listener.send('icons-load', {
	              menu: menu,
	              icons: favorites
	            });
	          } else if (menu.search) {
	            Pilot.notebook('category', '');
	            _this.listener.send('icons-load', {
	              menu: menu,
	              icons: menu.find
	            });
	          } else {
	            if (Lampa.Manifest.app_digital >= 204 && Locked.find(Locked.format('group', menu.name))) {
	              return Lampa.ParentalControl.query(function () {
	                load();
	                toggle();
	              }, _this.toggle.bind(_this));
	            } else load();
	          }
	          toggle();
	        });
	        li.on('hover:focus', function () {
	          _this.scroll.update(li, true);
	          _this.last = li;
	        });
	        if (!first && menu.count !== 0) first = li;
	        if (menu.name == category && category || !menu.name && category == 'all') pilot = li;
	        _this.menu.append(li);
	      });
	      if (pilot) Lampa.Utils.trigger(pilot, 'hover:enter');else if (first) Lampa.Utils.trigger(first, 'hover:enter');
	    }
	  }, {
	    key: "toggle",
	    value: function toggle() {
	      var _this2 = this;
	      Lampa.Controller.add('content', {
	        toggle: function toggle() {
	          Lampa.Controller.collectionSet(_this2.html);
	          Lampa.Controller.collectionFocus(_this2.last, _this2.html);
	        },
	        left: function left() {
	          Lampa.Controller.toggle('menu');
	        },
	        right: function right() {
	          _this2.listener.send('toggle', 'icons');
	        },
	        up: function up() {
	          if (Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
	        },
	        down: function down() {
	          if (Navigator.canmove('down')) Navigator.move('down');
	        },
	        back: function back() {
	          _this2.listener.send('back');
	        }
	      });
	      Lampa.Controller.toggle('content');
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return this.scroll.render(true);
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.scroll.destroy();
	      this.html.remove();
	    }
	  }]);
	}();

	function strReplace(str, key2val) {
	  for (var key in key2val) {
	    str = str.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), key2val[key]);
	  }
	  return str;
	}
	function tf(t, format, u, tz) {
	  format = format || '';
	  tz = parseInt(tz || '0');
	  var thisOffset = EPG.time_offset;
	  thisOffset += tz;
	  if (!u) thisOffset += parseInt(Lampa.Storage.get('time_offset', 'n0').replace('n', '')) * 60 - new Date().getTimezoneOffset();
	  var d = new Date((t + thisOffset) * 1000);
	  var r = {
	    yyyy: d.getUTCFullYear(),
	    MM: ('0' + (d.getUTCMonth() + 1)).substr(-2),
	    dd: ('0' + d.getUTCDate()).substr(-2),
	    HH: ('0' + d.getUTCHours()).substr(-2),
	    mm: ('0' + d.getUTCMinutes()).substr(-2),
	    ss: ('0' + d.getUTCSeconds()).substr(-2),
	    UTF: t
	  };
	  return strReplace(format, r);
	}
	function unixtime$1() {
	  return Math.floor((new Date().getTime() + EPG.time_offset) / 1000);
	}
	var Url = /*#__PURE__*/function () {
	  function Url() {
	    _classCallCheck(this, Url);
	  }
	  return _createClass(Url, null, [{
	    key: "prepareUrl",
	    value: function prepareUrl(url, program) {
	      var m = [],
	        val = '',
	        r = {
	          start: unixtime$1,
	          offset: 0
	        };
	      if (program) {
	        var start = Math.floor(program.start / 1000);
	        var end = Math.floor(program.stop / 1000);
	        var duration = end - start;
	        r = {
	          start: start,
	          utc: start,
	          end: end,
	          utcend: end,
	          offset: unixtime$1() - start,
	          duration: duration,
	          durationfs: end > unixtime$1() ? 'now' : duration,
	          now: unixtime$1,
	          lutc: unixtime$1,
	          timestamp: unixtime$1,
	          d: function d(m) {
	            return strReplace(m[6] || '', {
	              M: Math.floor(duration / 60),
	              S: duration,
	              h: Math.floor(duration / 60 / 60),
	              m: ('0' + Math.floor(duration / 60) % 60).substr(-2),
	              s: '00'
	            });
	          },
	          b: function b(m) {
	            return tf(start, m[6], m[4], m[5]);
	          },
	          e: function e(m) {
	            return tf(end, m[6], m[4], m[5]);
	          },
	          n: function n(m) {
	            return tf(unixtime$1(), m[6], m[4], m[5]);
	          }
	        };
	      }
	      while (!!(m = url.match(/\${(\((([a-zA-Z\d]+?)(u)?)([+-]\d+)?\))?([^${}]+)}/))) {
	        if (!!m[2] && typeof r[m[2]] === "function") val = r[m[2]](m);else if (!!m[3] && typeof r[m[3]] === "function") val = r[m[3]](m);else if (m[6] in r) val = typeof r[m[6]] === "function" ? r[m[6]]() : r[m[6]];else val = m[1];
	        url = url.replace(m[0], encodeURIComponent(val));
	      }
	      return url;
	    }
	  }, {
	    key: "catchupUrl",
	    value: function catchupUrl(url, type, source) {
	      type = (type || '').toLowerCase();
	      source = source || '';
	      if (!type) {
	        if (!!source) {
	          if (source.search(/^https?:\/\//i) === 0) type = 'default';else if (source.search(/^[?&/][^/]/) === 0) type = 'append';else type = 'default';
	        } else if (url.indexOf('${') < 0) type = 'shift';else type = 'default';
	        console.log('IPTV', 'Autodetect catchup-type "' + type + '"');
	      }
	      var newUrl = '';
	      switch (type) {
	        case 'append':
	          if (source) {
	            newUrl = (source.search(/^https?:\/\//i) === 0 ? '' : url) + source;
	            break; // так и задумано
	          }
	        case 'timeshift': // @deprecated
	        case 'shift':
	          // + append
	          newUrl = source || url;
	          newUrl += (newUrl.indexOf('?') >= 0 ? '&' : '?') + 'utc=${start}&lutc=${timestamp}';
	          return newUrl;
	        case 'flussonic':
	        case 'flussonic-hls':
	        case 'flussonic-ts':
	        case 'fs':
	          // Example stream and catchup URLs
	          // stream:  http://ch01.spr24.net/151/mpegts?token=my_token
	          // catchup: http://ch01.spr24.net/151/timeshift_abs-{utc}.ts?token=my_token
	          // stream:  http://list.tv:8888/325/index.m3u8?token=secret
	          // catchup: http://list.tv:8888/325/timeshift_rel-{offset:1}.m3u8?token=secret
	          // stream:  http://list.tv:8888/325/mono.m3u8?token=secret
	          // catchup: http://list.tv:8888/325/mono-timeshift_rel-{offset:1}.m3u8?token=secret
	          // stream:  http://list.tv:8888/325/live?token=my_token
	          // catchup: http://list.tv:8888/325/{utc}.ts?token=my_token
	          // See doc: https://flussonic.ru/doc/proigryvanie/vosproizvedenie-hls/
	          return url.replace(/\/(video\d*|mono\d*)\.(m3u8|ts)(\?|$)/, '/$1-\${start}-\${durationfs}.$2$3').replace(/\/(index|playlist)\.(m3u8|ts)(\?|$)/, '/archive-\${start}-\${durationfs}.$2$3').replace(/\/mpegts(\?|$)/, '/timeshift_abs-\${start}.ts$1').replace(/\/live(\?|$)/, '/\${start}.ts$1');
	        case 'xc':
	          // Example stream and catchup URLs
	          // stream:  http://list.tv:8080/my@account.xc/my_password/1477
	          // catchup: http://list.tv:8080/timeshift/my@account.xc/my_password/{duration}/{Y}-{m}-{d}:{H}-{M}/1477.ts
	          // stream:  http://list.tv:8080/live/my@account.xc/my_password/1477.m3u8
	          // catchup: http://list.tv:8080/timeshift/my@account.xc/my_password/{duration}/{Y}-{m}-{d}:{H}-{M}/1477.m3u8
	          newUrl = url.replace(/^(https?:\/\/[^/]+)(\/live)?(\/[^/]+\/[^/]+\/)([^/.]+)\.m3u8?$/, '$1/timeshift$3\${(d)M}/\${(b)yyyy-MM-dd:HH-mm}/$4.m3u8').replace(/^(https?:\/\/[^/]+)(\/live)?(\/[^/]+\/[^/]+\/)([^/.]+)(\.ts|)$/, '$1/timeshift$3\${(d)M}/\${(b)yyyy-MM-dd:HH-mm}/$4.ts');
	          break;
	        case 'default':
	          newUrl = source || url;
	          break;
	        case 'disabled':
	          return false;
	        default:
	          console.log('IPTV', 'Err: no support catchup-type="' + type + '"');
	          return false;
	      }
	      if (newUrl.indexOf('${') < 0) return this.catchupUrl(newUrl, 'shift');
	      return newUrl;
	    }
	  }]);
	}();

	var HUDMenu = /*#__PURE__*/function () {
	  function HUDMenu(listener, channel) {
	    _classCallCheck(this, HUDMenu);
	    this.listener = listener;
	    this.channel = channel;
	    this.original = channel.original;
	    this.html = document.createElement('div');
	  }
	  return _createClass(HUDMenu, [{
	    key: "create",
	    value: function create() {
	      var _this = this;
	      var info = $("\n            <div class=\"iptv-hud-menu-info\">\n                <div class=\"iptv-hud-menu-info__group\">".concat(this.channel.group, "</div>\n                <div class=\"iptv-hud-menu-info__name\">").concat(this.channel.name, "</div>\n            </div>\n        "))[0];
	      var favorite = this.button(Lampa.Template.get('cub_iptv_icon_favorite', {}, true), Lampa.Lang.translate('settings_input_links'), function () {
	        Favorites.toggle(_this.original).finally(function () {
	          favorite.toggleClass('active', Boolean(Favorites.find(_this.original)));
	          _this.listener.send('action-favorite', _this.original);
	        });
	      });
	      var locked = this.button(Lampa.Template.get('cub_iptv_icon_lock', {}, true), Lampa.Lang.translate(Locked.find(Locked.format('channel', this.original)) ? 'iptv_channel_unlock' : 'iptv_channel_lock'), function () {
	        var name = Lampa.Controller.enabled().name;
	        if (Lampa.Manifest.app_digital >= 204) {
	          if (Locked.find(Locked.format('channel', _this.original))) {
	            Lampa.ParentalControl.query(function () {
	              Lampa.Controller.toggle(name);
	              Locked.remove(Locked.format('channel', _this.original)).finally(function () {
	                locked.toggleClass('active', Boolean(Locked.find(Locked.format('channel', _this.original))));
	                _this.listener.send('action-locked', _this.original);
	              });
	            }, function () {
	              Lampa.Controller.toggle(name);
	            });
	          } else {
	            Locked.add(Locked.format('channel', _this.original)).finally(function () {
	              locked.toggleClass('active', Boolean(Locked.find(Locked.format('channel', _this.original))));
	              _this.listener.send('action-locked', _this.original);
	            });
	          }
	        } else {
	          Lampa.Noty.show(Lampa.Lang.translate('iptv_need_update_app'));
	        }
	      });
	      favorite.toggleClass('active', Boolean(Favorites.find(this.original)));
	      locked.toggleClass('active', Boolean(Locked.find(Locked.format('channel', this.original))));
	      this.html.append(info);
	      this.html.append(favorite);
	      this.html.append(locked);
	    }
	  }, {
	    key: "button",
	    value: function button(icon, text, call) {
	      var button = $("\n            <div class=\"iptv-hud-menu-button selector\">\n                <div class=\"iptv-hud-menu-button__icon\">".concat(icon, "</div>\n                <div class=\"iptv-hud-menu-button__text\">").concat(text, "</div>\n            </div>\n        "));
	      button.on('hover:enter', call);
	      return button[0];
	    }
	  }, {
	    key: "toggle",
	    value: function toggle() {
	      var _this2 = this;
	      Lampa.Controller.add('player_iptv_hud_menu', {
	        toggle: function toggle() {
	          Lampa.Controller.collectionSet(_this2.render());
	          Lampa.Controller.collectionFocus(false, _this2.render());
	        },
	        up: function up() {
	          Navigator.move('up');
	        },
	        down: function down() {
	          Navigator.move('down');
	        },
	        right: function right() {
	          _this2.listener.send('toggle_program');
	        },
	        gone: function gone() {
	          var focus = _this2.html.find('.focus');
	          if (focus) focus.removeClass('focus');
	        },
	        back: function back() {
	          _this2.listener.send('close');
	        }
	      });
	      Lampa.Controller.toggle('player_iptv_hud_menu');
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return this.html;
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {}
	  }]);
	}();

	var HUDProgram = /*#__PURE__*/function () {
	  function HUDProgram(listener, channel, program) {
	    _classCallCheck(this, HUDProgram);
	    this.listener = listener;
	    this.channel = channel;
	    this.html = document.createElement('div');
	  }
	  return _createClass(HUDProgram, [{
	    key: "create",
	    value: function create() {
	      var _this = this;
	      this.listener.follow('set_program_endless', function (event) {
	        _this.endless = event.endless;
	        _this.html.append(event.endless.render());
	      });
	      this.listener.send('get_program_endless');
	    }
	  }, {
	    key: "toggle",
	    value: function toggle() {
	      var _this2 = this;
	      Lampa.Controller.add('player_iptv_hud_program', {
	        toggle: function toggle() {
	          Lampa.Controller.collectionSet(_this2.render());
	          Lampa.Controller.collectionFocus(false, _this2.render());
	        },
	        up: function up() {
	          _this2.endless.move(-1);
	          Lampa.Controller.collectionSet(_this2.render());
	          Lampa.Controller.collectionFocus(false, _this2.render());
	        },
	        down: function down() {
	          _this2.endless.move(1);
	          Lampa.Controller.collectionSet(_this2.render());
	          Lampa.Controller.collectionFocus(false, _this2.render());
	        },
	        left: function left() {
	          _this2.listener.send('toggle_menu');
	        },
	        gone: function gone() {
	          var focus = _this2.html.find('.focus');
	          if (focus) focus.removeClass('focus');
	        },
	        back: function back() {
	          _this2.listener.send('close');
	        }
	      });
	      Lampa.Controller.toggle('player_iptv_hud_program');
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return this.html;
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {}
	  }]);
	}();

	var HUD = /*#__PURE__*/function () {
	  function HUD(channel, program) {
	    _classCallCheck(this, HUD);
	    this.listener = Lampa.Subscribe();
	    this.menu = new HUDMenu(this.listener, channel, program);
	    this.program = new HUDProgram(this.listener, channel, program);
	    this.hud = Lampa.Template.js('cub_iptv_hud');
	    this.hud.find('.iptv-hud__menu').append(this.menu.render());
	    this.hud.find('.iptv-hud__program').append(this.program.render());
	    document.body.find('.player').append(this.hud);
	    this.listen();
	  }
	  return _createClass(HUD, [{
	    key: "create",
	    value: function create() {
	      this.menu.create();
	      this.program.create();
	      this.menu.toggle();
	    }
	  }, {
	    key: "listen",
	    value: function listen() {
	      var _this = this;
	      this.listener.follow('toggle_menu', function () {
	        _this.menu.toggle();
	      });
	      this.listener.follow('toggle_program', function () {
	        _this.program.toggle();
	      });
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.menu.destroy();
	      this.program.destroy();
	      this.hud.remove();
	    }
	  }]);
	}();

	var Channels = /*#__PURE__*/function () {
	  function Channels(listener) {
	    var _this = this;
	    _classCallCheck(this, Channels);
	    this.listener = listener;
	    this.html = Lampa.Template.js('cub_iptv_content');
	    this.inner_listener = Lampa.Subscribe();
	    this.menu = new Menu(this.inner_listener);
	    this.icons = new Icons(this.inner_listener);
	    this.details = new Details(this.inner_listener);
	    this.inner_listener.follow('toggle', function (name) {
	      _this[name].toggle();
	      _this.active = _this[name];
	    });
	    this.inner_listener.follow('back', function () {
	      _this.listener.send('playlist-main');
	    });
	    this.inner_listener.follow('play', this.playChannel.bind(this));
	    this.inner_listener.follow('play-archive', this.playArchive.bind(this));
	    this.active = this.menu;
	    this.html.find('.iptv-content__menu').append(this.menu.render());
	    this.html.find('.iptv-content__channels').append(this.icons.render());
	    this.html.find('.iptv-content__details').append(this.details.render());
	  }
	  return _createClass(Channels, [{
	    key: "build",
	    value: function build(data) {
	      this.empty = false;
	      this.menu.build(data);
	      this.listener.send('display', this);
	    }
	  }, {
	    key: "addToHistory",
	    value: function addToHistory(channel) {
	      var board = Lampa.Storage.cache('iptv_play_history_main_board', 20, []);
	      var find = board.find(function (a) {
	        return a.url == channel.url;
	      });
	      if (find) Lampa.Arrays.remove(board, find);
	      board.push(channel);
	      Lampa.Storage.set('iptv_play_history_main_board', board);
	    }
	  }, {
	    key: "playArchive",
	    value: function playArchive(data) {
	      var convert = function convert(p) {
	        var item = {
	          title: Lampa.Utils.parseTime(p.start).time + ' - ' + Lampa.Utils.capitalizeFirstLetter(p.title)
	        };
	        item.url = Url.catchupUrl(data.channel.url, data.channel.catchup.type, data.channel.catchup.source);
	        item.url = Url.prepareUrl(item.url, p);
	        item.need_check_live_stream = true;
	        return item;
	      };
	      Lampa.Player.runas(Lampa.Storage.field('player_iptv'));
	      Lampa.Player.play(convert(data.program));
	      Lampa.Player.playlist(data.playlist.map(convert));
	    }
	  }, {
	    key: "playChannel",
	    value: function playChannel(data) {
	      var _this2 = this;
	      var cache = {};
	      cache.none = [];
	      var time;
	      var update;
	      var start_channel = Lampa.Arrays.clone(this.icons.icons_clone[data.position]);
	      start_channel.original = this.icons.icons_clone[data.position];
	      data.url = Url.prepareUrl(start_channel.url);
	      if (this.archive && this.archive.channel == start_channel.original) {
	        data.url = Url.catchupUrl(this.archive.channel.url, this.archive.channel.catchup.type, this.archive.channel.catchup.source);
	        data.url = Url.prepareUrl(data.url, this.archive.program);
	      } else {
	        this.addToHistory(Lampa.Arrays.clone(start_channel));
	      }
	      data.locked = Boolean(Locked.find(Locked.format('channel', start_channel.original)));
	      data.onGetChannel = function (position) {
	        var original = _this2.icons.icons_clone[position];
	        var channel = Lampa.Arrays.clone(original);
	        var timeshift = _this2.archive && _this2.archive.channel == original ? _this2.archive.timeshift : 0;
	        channel.name = Utils.clearChannelName(channel.name);
	        channel.group = Utils.clearMenuName(channel.group);
	        channel.url = Url.prepareUrl(channel.url);
	        channel.icons = [];
	        channel.original = original;
	        if (timeshift) {
	          channel.shift = timeshift;
	          channel.url = Url.catchupUrl(original.url, channel.catchup.type, channel.catchup.source);
	          channel.url = Url.prepareUrl(channel.url, _this2.archive.program);
	        }
	        if (Locked.find(Locked.format('channel', original))) {
	          channel.locked = true;
	        }
	        if (Boolean(Favorites.find(channel))) {
	          channel.icons.push(Lampa.Template.get('cub_iptv_icon_fav', {}, true));
	        }
	        if (Boolean(Locked.find(Locked.format('channel', channel)))) {
	          channel.icons.push(Lampa.Template.get('cub_iptv_icon_lock', {}, true));
	        }
	        update = false;
	        if (channel.id) {
	          if (!cache[channel.id]) {
	            cache[channel.id] = [];
	            Api.program({
	              name: channel.name,
	              channel_id: channel.id,
	              tvg: channel.tvg,
	              time: EPG.time(channel, timeshift)
	            }).then(function (program) {
	              cache[channel.id] = program;
	            }).finally(function () {
	              Lampa.Player.programReady({
	                channel: channel,
	                position: EPG.position(channel, cache[channel.id], timeshift),
	                total: cache[channel.id].length
	              });
	            });
	          } else {
	            Lampa.Player.programReady({
	              channel: channel,
	              position: EPG.position(channel, cache[channel.id], timeshift),
	              total: cache[channel.id].length
	            });
	          }
	        } else {
	          Lampa.Player.programReady({
	            channel: channel,
	            position: 0,
	            total: 0
	          });
	        }
	        return channel;
	      };
	      data.onMenu = function (channel) {
	        _this2.hud = new HUD(channel);
	        _this2.hud.listener.follow('close', function () {
	          _this2.hud = _this2.hud.destroy();
	          Lampa.Controller.toggle('player_tv');
	        });
	        _this2.hud.listener.follow('get_program_endless', function () {
	          var program = cache[channel.id || 'none'];
	          var endless = _this2.details.playlist(channel, program, {
	            onPlay: function onPlay(param) {
	              Lampa.Player.close();
	              _this2.playArchive(param);
	            }
	          });
	          _this2.hud.listener.send('set_program_endless', {
	            endless: endless
	          });
	        });
	        _this2.hud.listener.follow('action-favorite', function (orig) {
	          Lampa.PlayerIPTV.redrawChannel();
	          _this2.inner_listener.send('update-favorites');
	          _this2.inner_listener.send('update-channel-icon', orig);
	        });
	        _this2.hud.listener.follow('action-locked', function (orig) {
	          Lampa.PlayerIPTV.redrawChannel();
	          _this2.inner_listener.send('update-channel-icon', orig);
	        });
	        _this2.hud.create();
	      };

	      //устарело, потом удалить
	      data.onPlaylistProgram = function (channel) {
	        var program = cache[channel.id || 'none'];
	        if (!program.length) return;
	        var html = document.createElement('div');
	        html.style.lineHeight = '1.4';
	        Lampa.Modal.open({
	          title: '',
	          size: 'medium',
	          html: $(html)
	        });
	        var endless = _this2.details.playlist(channel, program, {
	          onPlay: function onPlay(param) {
	            Lampa.Modal.close();
	            Lampa.Player.close();
	            _this2.playArchive(param);
	          }
	        });
	        html.append(endless.render());
	        Lampa.Controller.add('modal', {
	          invisible: true,
	          toggle: function toggle() {
	            Lampa.Controller.collectionSet(html);
	            Lampa.Controller.collectionFocus(false, html);
	          },
	          up: function up() {
	            endless.move(-1);
	            Lampa.Controller.collectionSet(html);
	            Lampa.Controller.collectionFocus(false, html);
	          },
	          down: function down() {
	            endless.move(1);
	            Lampa.Controller.collectionSet(html);
	            Lampa.Controller.collectionFocus(false, html);
	          },
	          back: function back() {
	            Lampa.Modal.close();
	            Lampa.Controller.toggle('player_tv');
	          }
	        });
	        Lampa.Controller.toggle('modal');
	      };
	      data.onPlay = function (channel) {
	        Pilot.notebook('channel', _this2.icons.icons_clone.indexOf(channel.original));
	        if (channel.original.added) {
	          channel.original.view++;
	          Favorites.update(channel.original);
	        }
	      };
	      data.onGetProgram = function (channel, position, container) {
	        update = false;
	        var timeshift = channel.shift || 0;
	        var program = cache[channel.id || 'none'];
	        var noprog = document.createElement('div');
	        noprog.addClass('player-panel-iptv-item__prog-load');
	        noprog.text(Lampa.Lang.translate('iptv_noprogram'));
	        container[0].empty().append(noprog);
	        if (program.length) {
	          var start = EPG.position(channel, program, timeshift);
	          var list = program.slice(position, position + 2);
	          var now = program[start];
	          if (list.length) container[0].empty();
	          list.forEach(function (prog) {
	            var item = document.createElement('div');
	            item.addClass('player-panel-iptv-item__prog-item');
	            var span = document.createElement('span');
	            span.html(Lampa.Utils.parseTime(prog.start).time + (now == prog ? ' - ' + Lampa.Utils.parseTime(prog.stop).time : '') + ' &nbsp; ' + Utils.clear(prog.title));
	            item.append(span);
	            if (now == prog) {
	              item.addClass('watch');
	              var timeline = document.createElement('div');
	              timeline.addClass('player-panel-iptv-item__prog-timeline');
	              var div = document.createElement('div');
	              div.style.width = EPG.timeline(channel, prog, timeshift) + '%';
	              timeline.append(div);
	              update = function update() {
	                var percent = EPG.timeline(channel, prog, timeshift);
	                div.style.width = percent + '%';
	                if (percent == 100) {
	                  var next = EPG.position(channel, program, timeshift);
	                  if (start !== next) {
	                    Lampa.Player.programReady({
	                      channel: channel,
	                      position: next,
	                      total: cache[channel.id].length
	                    });
	                  }
	                }
	              };
	              item.append(timeline);
	            }
	            container[0].append(item);
	          });
	        }
	      };
	      Lampa.Player.iptv(data);
	      time = setInterval(function () {
	        if (update) update();
	      }, 1000 * 10);
	      var _destroy = function destroy() {
	        Lampa.Player.listener.remove('destroy', _destroy);
	        cache = null;
	        update = null;
	        _this2.archive = false;
	        if (_this2.hud) _this2.hud = _this2.hud.destroy();
	        Pilot.notebook('channel', -1);
	        clearInterval(time);
	      };
	      Lampa.Player.listener.follow('destroy', _destroy);
	    }
	  }, {
	    key: "toggle",
	    value: function toggle() {
	      var _this3 = this;
	      if (this.empty) {
	        Lampa.Controller.add('content', {
	          invisible: true,
	          toggle: function toggle() {
	            Lampa.Controller.clear();
	          },
	          left: function left() {
	            Lampa.Controller.toggle('menu');
	          },
	          up: function up() {
	            Lampa.Controller.toggle('head');
	          },
	          back: function back() {
	            _this3.listener.send('playlist-main');
	          }
	        });
	        Lampa.Controller.toggle('content');
	      } else this.active.toggle();
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return this.empty ? this.empty.render(true) : this.html;
	    }
	  }, {
	    key: "load",
	    value: function load(playlist) {
	      var _this4 = this;
	      this.listener.send('loading');
	      Api.playlist(playlist).then(this.build.bind(this)).catch(function (e) {
	        var msg = '';
	        if (typeof e == 'string') msg = e;else if (typeof e.responseJSON !== 'undefined' && e.responseJSON.text) msg = Lampa.Lang.translate('torrent_error_connect') + ': ' + e.responseJSON.text + (e.responseJSON.code ? ' [' + e.responseJSON.code + ']' : '');else if (typeof e.status !== 'undefined') msg = Lampa.Lang.translate('torrent_error_connect') + ': [' + e.status + ']' + (e.from_error ? ' [' + e.from_error + ']' : '');else if (typeof e.message !== 'undefined') msg = e.message;
	        _this4.empty = new Lampa.Empty({
	          descr: '<div style="width: 60%; margin:0 auto; line-height: 1.4">' + Lampa.Lang.translate('iptv_noload_playlist') + (msg ? '<br><br>' + msg : '') + '</div>'
	        });
	        _this4.listener.send('display', _this4);
	      });
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.menu.destroy();
	      this.icons.destroy();
	      this.details.destroy();
	      this.inner_listener.destroy();
	      this.active = false;
	      this.epg_cache = null;
	      this.html.remove();
	    }
	  }]);
	}();

	function Component() {
	  var html = document.createElement('div');
	  var listener;
	  var playlist;
	  var channels;
	  var initialized;
	  window.iptv_mobile = window.innerWidth < 768;
	  if (Lampa.Manifest.app_digital >= 185) {
	    listener = Lampa.Subscribe();
	    playlist = new Playlist(listener);
	    channels = new Channels(listener);
	  }
	  this.create = function () {
	    return this.render();
	  };
	  this.initialize = function () {
	    var _this = this;
	    this.activity.loader(true);
	    if (Lampa.Manifest.app_digital >= 185) {
	      listener.follow('display', function (controller) {
	        _this.active = controller;
	        _this.display(controller.render());
	      });
	      listener.follow('loading', this.loading.bind(this));
	      listener.follow('channels-load', channels.load.bind(channels));
	      listener.follow('playlist-main', playlist.main.bind(playlist));
	      playlist.load();
	    } else {
	      var old = Lampa.Template.get('cub_iptv_list');
	      old.find('.iptv-list__title').text(Lampa.Lang.translate('iptv_update_app_title'));
	      old.find('.iptv-list__text').text(Lampa.Lang.translate('iptv_update_app_text'));
	      $(html).append(old);
	      this.activity.loader(false);
	    }
	    if (window.iptv_mobile) html.addClass('iptv-mobile');
	  };
	  this.playlist = function () {
	    playlist.main();
	  };
	  this.loading = function () {
	    this.activity.loader(true);
	    this.active = false;
	    this.start();
	  };
	  this.display = function (render) {
	    html.empty().append(render);
	    Lampa.Layer.update(html);
	    Lampa.Layer.visible(html);
	    this.activity.loader(false);
	    this.start();
	  };
	  this.background = function () {
	    Lampa.Background.immediately('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAZCAYAAABD2GxlAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHASURBVHgBlZaLrsMgDENXxAf3/9XHFdXNZLm2YZHQymPk4CS0277v9+ffrut62nEcn/M8nzb69cxj6le1+75f/RqrZ9fatm3F9wwMR7yhawilNke4Gis/7j9srQbdaVFBnkcQ1WrfgmIIBcTrvgqqsKiTzvpOQbUnAykVW4VVqZXyyDllYFSKx9QaVrO7nGJIB63g+FAq/xhcHWBYdwCsmAtvFZUKE0MlVZWCT4idOlyhTp3K35R/6Nzlq0uBnsKWlEzgSh1VGJxv6rmpXMO7EK+XWUPnDFRWqitQFeY2UyZVryuWlI8ulLgGf19FooAUwC9gCWLcwzWPb7Wa60qdlZxjx6ooUuUqVQsK+y1VoAJyBeJAVsLJeYmg/RIXdG2kPhwYPBUQQyYF0XC8lwP3MTCrYAXB88556peCbUUZV7WccwkUQfCZC4PXdA5hKhSVhythZqjZM0J39w5m8BRadKAcrsIpNZsLIYdOqcZ9hExhZ1MH+QL+ciFzXzmYhZr/M6yUUwp2dp5U4naZDwAF5JRSefdScJZ3SkU0nl8xpaAy+7ml1EqvMXSs1HRrZ9bc3eZUSXmGa/mdyjbmqyX7A9RaYQa9IRJ0AAAAAElFTkSuQmCC');
	  };
	  this.start = function () {
	    var _this2 = this;
	    if (Lampa.Activity.active() && Lampa.Activity.active().activity !== this.activity) return;
	    if (!initialized) {
	      initialized = true;
	      this.initialize();
	    }
	    this.background();
	    Lampa.Controller.add('content', {
	      invisible: true,
	      toggle: function toggle() {
	        if (_this2.active) _this2.active.toggle();else {
	          Lampa.Controller.collectionSet(html);
	          Lampa.Controller.collectionFocus(false, html);
	        }
	      },
	      left: function left() {
	        Lampa.Controller.toggle('menu');
	      },
	      up: function up() {
	        Lampa.Controller.toggle('head');
	      },
	      back: function back() {
	        Lampa.Activity.backward();
	      }
	    });
	    Lampa.Controller.toggle('content');
	  };
	  this.pause = function () {};
	  this.stop = function () {};
	  this.render = function () {
	    return html;
	  };
	  this.destroy = function () {
	    if (playlist) playlist.destroy();
	    if (channels) channels.destroy();
	    listener.destroy();
	    html.remove();
	  };
	}

	// eslint-disable-next-line es/no-typed-arrays -- safe
	var arrayBufferBasicDetection = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';

	var toIntegerOrInfinity$5 = toIntegerOrInfinity$a;
	var toLength$2 = toLength$8;

	var $RangeError$4 = RangeError;

	// `ToIndex` abstract operation
	// https://tc39.es/ecma262/#sec-toindex
	var toIndex$2 = function (it) {
	  if (it === undefined) return 0;
	  var number = toIntegerOrInfinity$5(it);
	  var length = toLength$2(number);
	  if (number !== length) throw new $RangeError$4('Wrong length or index');
	  return length;
	};

	// `Math.sign` method implementation
	// https://tc39.es/ecma262/#sec-math.sign
	// eslint-disable-next-line es/no-math-sign -- safe
	var mathSign = Math.sign || function sign(x) {
	  var n = +x;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return n === 0 || n !== n ? n : n < 0 ? -1 : 1;
	};

	var EPSILON$1 = 2.220446049250313e-16; // Number.EPSILON
	var INVERSE_EPSILON = 1 / EPSILON$1;

	var mathRoundTiesToEven = function (n) {
	  return n + INVERSE_EPSILON - INVERSE_EPSILON;
	};

	var sign = mathSign;
	var roundTiesToEven = mathRoundTiesToEven;

	var abs$1 = Math.abs;

	var EPSILON = 2.220446049250313e-16; // Number.EPSILON

	var mathFloatRound = function (x, FLOAT_EPSILON, FLOAT_MAX_VALUE, FLOAT_MIN_VALUE) {
	  var n = +x;
	  var absolute = abs$1(n);
	  var s = sign(n);
	  if (absolute < FLOAT_MIN_VALUE) return s * roundTiesToEven(absolute / FLOAT_MIN_VALUE / FLOAT_EPSILON) * FLOAT_MIN_VALUE * FLOAT_EPSILON;
	  var a = (1 + FLOAT_EPSILON / EPSILON) * absolute;
	  var result = a - (a - absolute);
	  // eslint-disable-next-line no-self-compare -- NaN check
	  if (result > FLOAT_MAX_VALUE || result !== result) return s * Infinity;
	  return s * result;
	};

	var floatRound = mathFloatRound;

	var FLOAT32_EPSILON = 1.1920928955078125e-7; // 2 ** -23;
	var FLOAT32_MAX_VALUE = 3.4028234663852886e+38; // 2 ** 128 - 2 ** 104
	var FLOAT32_MIN_VALUE = 1.1754943508222875e-38; // 2 ** -126;

	// `Math.fround` method implementation
	// https://tc39.es/ecma262/#sec-math.fround
	// eslint-disable-next-line es/no-math-fround -- safe
	var mathFround = Math.fround || function fround(x) {
	  return floatRound(x, FLOAT32_EPSILON, FLOAT32_MAX_VALUE, FLOAT32_MIN_VALUE);
	};

	// IEEE754 conversions based on https://github.com/feross/ieee754
	var $Array = Array;
	var abs = Math.abs;
	var pow$1 = Math.pow;
	var floor$5 = Math.floor;
	var log$1 = Math.log;
	var LN2 = Math.LN2;

	var pack = function (number, mantissaLength, bytes) {
	  var buffer = $Array(bytes);
	  var exponentLength = bytes * 8 - mantissaLength - 1;
	  var eMax = (1 << exponentLength) - 1;
	  var eBias = eMax >> 1;
	  var rt = mantissaLength === 23 ? pow$1(2, -24) - pow$1(2, -77) : 0;
	  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
	  var index = 0;
	  var exponent, mantissa, c;
	  number = abs(number);
	  // eslint-disable-next-line no-self-compare -- NaN check
	  if (number !== number || number === Infinity) {
	    // eslint-disable-next-line no-self-compare -- NaN check
	    mantissa = number !== number ? 1 : 0;
	    exponent = eMax;
	  } else {
	    exponent = floor$5(log$1(number) / LN2);
	    c = pow$1(2, -exponent);
	    if (number * c < 1) {
	      exponent--;
	      c *= 2;
	    }
	    if (exponent + eBias >= 1) {
	      number += rt / c;
	    } else {
	      number += rt * pow$1(2, 1 - eBias);
	    }
	    if (number * c >= 2) {
	      exponent++;
	      c /= 2;
	    }
	    if (exponent + eBias >= eMax) {
	      mantissa = 0;
	      exponent = eMax;
	    } else if (exponent + eBias >= 1) {
	      mantissa = (number * c - 1) * pow$1(2, mantissaLength);
	      exponent += eBias;
	    } else {
	      mantissa = number * pow$1(2, eBias - 1) * pow$1(2, mantissaLength);
	      exponent = 0;
	    }
	  }
	  while (mantissaLength >= 8) {
	    buffer[index++] = mantissa & 255;
	    mantissa /= 256;
	    mantissaLength -= 8;
	  }
	  exponent = exponent << mantissaLength | mantissa;
	  exponentLength += mantissaLength;
	  while (exponentLength > 0) {
	    buffer[index++] = exponent & 255;
	    exponent /= 256;
	    exponentLength -= 8;
	  }
	  buffer[index - 1] |= sign * 128;
	  return buffer;
	};

	var unpack = function (buffer, mantissaLength) {
	  var bytes = buffer.length;
	  var exponentLength = bytes * 8 - mantissaLength - 1;
	  var eMax = (1 << exponentLength) - 1;
	  var eBias = eMax >> 1;
	  var nBits = exponentLength - 7;
	  var index = bytes - 1;
	  var sign = buffer[index--];
	  var exponent = sign & 127;
	  var mantissa;
	  sign >>= 7;
	  while (nBits > 0) {
	    exponent = exponent * 256 + buffer[index--];
	    nBits -= 8;
	  }
	  mantissa = exponent & (1 << -nBits) - 1;
	  exponent >>= -nBits;
	  nBits += mantissaLength;
	  while (nBits > 0) {
	    mantissa = mantissa * 256 + buffer[index--];
	    nBits -= 8;
	  }
	  if (exponent === 0) {
	    exponent = 1 - eBias;
	  } else if (exponent === eMax) {
	    return mantissa ? NaN : sign ? -Infinity : Infinity;
	  } else {
	    mantissa += pow$1(2, mantissaLength);
	    exponent -= eBias;
	  } return (sign ? -1 : 1) * mantissa * pow$1(2, exponent - mantissaLength);
	};

	var ieee754 = {
	  pack: pack,
	  unpack: unpack
	};

	var toObject$3 = toObject$c;
	var toAbsoluteIndex$3 = toAbsoluteIndex$7;
	var lengthOfArrayLike$6 = lengthOfArrayLike$e;

	// `Array.prototype.fill` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.fill
	var arrayFill$1 = function fill(value /* , start = 0, end = @length */) {
	  var O = toObject$3(this);
	  var length = lengthOfArrayLike$6(O);
	  var argumentsLength = arguments.length;
	  var index = toAbsoluteIndex$3(argumentsLength > 1 ? arguments[1] : undefined, length);
	  var end = argumentsLength > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : toAbsoluteIndex$3(end, length);
	  while (endPos > index) O[index++] = value;
	  return O;
	};

	var globalThis$a = globalThis_1;
	var uncurryThis$9 = functionUncurryThis;
	var DESCRIPTORS$2 = descriptors;
	var NATIVE_ARRAY_BUFFER$2 = arrayBufferBasicDetection;
	var FunctionName = functionName;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$a;
	var defineBuiltInAccessor$2 = defineBuiltInAccessor$6;
	var defineBuiltIns = defineBuiltIns$2;
	var fails$a = fails$G;
	var anInstance$1 = anInstance$5;
	var toIntegerOrInfinity$4 = toIntegerOrInfinity$a;
	var toIndex$1 = toIndex$2;
	var fround = mathFround;
	var IEEE754 = ieee754;
	var getPrototypeOf$1 = objectGetPrototypeOf$1;
	var setPrototypeOf$2 = objectSetPrototypeOf;
	var arrayFill = arrayFill$1;
	var arraySlice$2 = arraySlice$6;
	var inheritIfRequired$1 = inheritIfRequired$3;
	var copyConstructorProperties = copyConstructorProperties$2;
	var setToStringTag = setToStringTag$7;
	var InternalStateModule$2 = internalState;

	var PROPER_FUNCTION_NAME = FunctionName.PROPER;
	var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
	var ARRAY_BUFFER$1 = 'ArrayBuffer';
	var DATA_VIEW = 'DataView';
	var PROTOTYPE = 'prototype';
	var WRONG_LENGTH$1 = 'Wrong length';
	var WRONG_INDEX = 'Wrong index';
	var getInternalArrayBufferState = InternalStateModule$2.getterFor(ARRAY_BUFFER$1);
	var getInternalDataViewState = InternalStateModule$2.getterFor(DATA_VIEW);
	var setInternalState$1 = InternalStateModule$2.set;
	var NativeArrayBuffer$1 = globalThis$a[ARRAY_BUFFER$1];
	var $ArrayBuffer = NativeArrayBuffer$1;
	var ArrayBufferPrototype$1 = $ArrayBuffer && $ArrayBuffer[PROTOTYPE];
	var $DataView = globalThis$a[DATA_VIEW];
	var DataViewPrototype$1 = $DataView && $DataView[PROTOTYPE];
	var ObjectPrototype$1 = Object.prototype;
	var Array$1 = globalThis$a.Array;
	var RangeError$3 = globalThis$a.RangeError;
	var fill = uncurryThis$9(arrayFill);
	var reverse = uncurryThis$9([].reverse);

	var packIEEE754 = IEEE754.pack;
	var unpackIEEE754 = IEEE754.unpack;

	var packInt8 = function (number) {
	  return [number & 0xFF];
	};

	var packInt16 = function (number) {
	  return [number & 0xFF, number >> 8 & 0xFF];
	};

	var packInt32 = function (number) {
	  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
	};

	var unpackInt32 = function (buffer) {
	  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
	};

	var packFloat32 = function (number) {
	  return packIEEE754(fround(number), 23, 4);
	};

	var packFloat64 = function (number) {
	  return packIEEE754(number, 52, 8);
	};

	var addGetter$1 = function (Constructor, key, getInternalState) {
	  defineBuiltInAccessor$2(Constructor[PROTOTYPE], key, {
	    configurable: true,
	    get: function () {
	      return getInternalState(this)[key];
	    }
	  });
	};

	var get = function (view, count, index, isLittleEndian) {
	  var store = getInternalDataViewState(view);
	  var intIndex = toIndex$1(index);
	  var boolIsLittleEndian = !!isLittleEndian;
	  if (intIndex + count > store.byteLength) throw new RangeError$3(WRONG_INDEX);
	  var bytes = store.bytes;
	  var start = intIndex + store.byteOffset;
	  var pack = arraySlice$2(bytes, start, start + count);
	  return boolIsLittleEndian ? pack : reverse(pack);
	};

	var set = function (view, count, index, conversion, value, isLittleEndian) {
	  var store = getInternalDataViewState(view);
	  var intIndex = toIndex$1(index);
	  var pack = conversion(+value);
	  var boolIsLittleEndian = !!isLittleEndian;
	  if (intIndex + count > store.byteLength) throw new RangeError$3(WRONG_INDEX);
	  var bytes = store.bytes;
	  var start = intIndex + store.byteOffset;
	  for (var i = 0; i < count; i++) bytes[start + i] = pack[boolIsLittleEndian ? i : count - i - 1];
	};

	if (!NATIVE_ARRAY_BUFFER$2) {
	  $ArrayBuffer = function ArrayBuffer(length) {
	    anInstance$1(this, ArrayBufferPrototype$1);
	    var byteLength = toIndex$1(length);
	    setInternalState$1(this, {
	      type: ARRAY_BUFFER$1,
	      bytes: fill(Array$1(byteLength), 0),
	      byteLength: byteLength
	    });
	    if (!DESCRIPTORS$2) {
	      this.byteLength = byteLength;
	      this.detached = false;
	    }
	  };

	  ArrayBufferPrototype$1 = $ArrayBuffer[PROTOTYPE];

	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    anInstance$1(this, DataViewPrototype$1);
	    anInstance$1(buffer, ArrayBufferPrototype$1);
	    var bufferState = getInternalArrayBufferState(buffer);
	    var bufferLength = bufferState.byteLength;
	    var offset = toIntegerOrInfinity$4(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw new RangeError$3('Wrong offset');
	    byteLength = byteLength === undefined ? bufferLength - offset : toIndex$1(byteLength);
	    if (offset + byteLength > bufferLength) throw new RangeError$3(WRONG_LENGTH$1);
	    setInternalState$1(this, {
	      type: DATA_VIEW,
	      buffer: buffer,
	      byteLength: byteLength,
	      byteOffset: offset,
	      bytes: bufferState.bytes
	    });
	    if (!DESCRIPTORS$2) {
	      this.buffer = buffer;
	      this.byteLength = byteLength;
	      this.byteOffset = offset;
	    }
	  };

	  DataViewPrototype$1 = $DataView[PROTOTYPE];

	  if (DESCRIPTORS$2) {
	    addGetter$1($ArrayBuffer, 'byteLength', getInternalArrayBufferState);
	    addGetter$1($DataView, 'buffer', getInternalDataViewState);
	    addGetter$1($DataView, 'byteLength', getInternalDataViewState);
	    addGetter$1($DataView, 'byteOffset', getInternalDataViewState);
	  }

	  defineBuiltIns(DataViewPrototype$1, {
	    getInt8: function getInt8(byteOffset) {
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset) {
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /* , littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : false);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /* , littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : false);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /* , littleEndian */) {
	      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false));
	    },
	    getUint32: function getUint32(byteOffset /* , littleEndian */) {
	      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false)) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false), 23);
	    },
	    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : false), 52);
	    },
	    setInt8: function setInt8(byteOffset, value) {
	      set(this, 1, byteOffset, packInt8, value);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      set(this, 1, byteOffset, packInt8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
	      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : false);
	    },
	    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
	      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : false);
	    },
	    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : false);
	    },
	    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : false);
	    },
	    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : false);
	    },
	    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
	      set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : false);
	    }
	  });
	} else {
	  var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME && NativeArrayBuffer$1.name !== ARRAY_BUFFER$1;
	  /* eslint-disable no-new, sonarjs/inconsistent-function-call -- required for testing */
	  if (!fails$a(function () {
	    NativeArrayBuffer$1(1);
	  }) || !fails$a(function () {
	    new NativeArrayBuffer$1(-1);
	  }) || fails$a(function () {
	    new NativeArrayBuffer$1();
	    new NativeArrayBuffer$1(1.5);
	    new NativeArrayBuffer$1(NaN);
	    return NativeArrayBuffer$1.length !== 1 || INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
	  })) {
	    /* eslint-enable no-new, sonarjs/inconsistent-function-call -- required for testing */
	    $ArrayBuffer = function ArrayBuffer(length) {
	      anInstance$1(this, ArrayBufferPrototype$1);
	      return inheritIfRequired$1(new NativeArrayBuffer$1(toIndex$1(length)), this, $ArrayBuffer);
	    };

	    $ArrayBuffer[PROTOTYPE] = ArrayBufferPrototype$1;

	    ArrayBufferPrototype$1.constructor = $ArrayBuffer;

	    copyConstructorProperties($ArrayBuffer, NativeArrayBuffer$1);
	  } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
	    createNonEnumerableProperty$2(NativeArrayBuffer$1, 'name', ARRAY_BUFFER$1);
	  }

	  // WebKit bug - the same parent prototype for typed arrays and data view
	  if (setPrototypeOf$2 && getPrototypeOf$1(DataViewPrototype$1) !== ObjectPrototype$1) {
	    setPrototypeOf$2(DataViewPrototype$1, ObjectPrototype$1);
	  }

	  // iOS Safari 7.x bug
	  var testView = new $DataView(new $ArrayBuffer(2));
	  var $setInt8 = uncurryThis$9(DataViewPrototype$1.setInt8);
	  testView.setInt8(0, 2147483648);
	  testView.setInt8(1, 2147483649);
	  if (testView.getInt8(0) || !testView.getInt8(1)) defineBuiltIns(DataViewPrototype$1, {
	    setInt8: function setInt8(byteOffset, value) {
	      $setInt8(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      $setInt8(this, byteOffset, value << 24 >> 24);
	    }
	  }, { unsafe: true });
	}

	setToStringTag($ArrayBuffer, ARRAY_BUFFER$1);
	setToStringTag($DataView, DATA_VIEW);

	var arrayBuffer = {
	  ArrayBuffer: $ArrayBuffer,
	  DataView: $DataView
	};

	var $$5 = _export;
	var globalThis$9 = globalThis_1;
	var arrayBufferModule = arrayBuffer;
	var setSpecies$1 = setSpecies$4;

	var ARRAY_BUFFER = 'ArrayBuffer';
	var ArrayBuffer$4 = arrayBufferModule[ARRAY_BUFFER];
	var NativeArrayBuffer = globalThis$9[ARRAY_BUFFER];

	// `ArrayBuffer` constructor
	// https://tc39.es/ecma262/#sec-arraybuffer-constructor
	$$5({ global: true, constructor: true, forced: NativeArrayBuffer !== ArrayBuffer$4 }, {
	  ArrayBuffer: ArrayBuffer$4
	});

	setSpecies$1(ARRAY_BUFFER);

	var $$4 = _export;
	var uncurryThis$8 = functionUncurryThisClause;
	var fails$9 = fails$G;
	var ArrayBufferModule$2 = arrayBuffer;
	var anObject = anObject$j;
	var toAbsoluteIndex$2 = toAbsoluteIndex$7;
	var toLength$1 = toLength$8;

	var ArrayBuffer$3 = ArrayBufferModule$2.ArrayBuffer;
	var DataView$2 = ArrayBufferModule$2.DataView;
	var DataViewPrototype = DataView$2.prototype;
	var nativeArrayBufferSlice = uncurryThis$8(ArrayBuffer$3.prototype.slice);
	var getUint8 = uncurryThis$8(DataViewPrototype.getUint8);
	var setUint8 = uncurryThis$8(DataViewPrototype.setUint8);

	var INCORRECT_SLICE = fails$9(function () {
	  return !new ArrayBuffer$3(2).slice(1, undefined).byteLength;
	});

	// `ArrayBuffer.prototype.slice` method
	// https://tc39.es/ecma262/#sec-arraybuffer.prototype.slice
	$$4({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
	  slice: function slice(start, end) {
	    if (nativeArrayBufferSlice && end === undefined) {
	      return nativeArrayBufferSlice(anObject(this), start); // FF fix
	    }
	    var length = anObject(this).byteLength;
	    var first = toAbsoluteIndex$2(start, length);
	    var fin = toAbsoluteIndex$2(end === undefined ? length : end, length);
	    var result = new ArrayBuffer$3(toLength$1(fin - first));
	    var viewSource = new DataView$2(this);
	    var viewTarget = new DataView$2(result);
	    var index = 0;
	    while (first < fin) {
	      setUint8(viewTarget, index++, getUint8(viewSource, first++));
	    } return result;
	  }
	});

	var $$3 = _export;
	var ArrayBufferModule$1 = arrayBuffer;
	var NATIVE_ARRAY_BUFFER$1 = arrayBufferBasicDetection;

	// `DataView` constructor
	// https://tc39.es/ecma262/#sec-dataview-constructor
	$$3({ global: true, constructor: true, forced: !NATIVE_ARRAY_BUFFER$1 }, {
	  DataView: ArrayBufferModule$1.DataView
	});

	var typedArrayConstructor = {exports: {}};

	var NATIVE_ARRAY_BUFFER = arrayBufferBasicDetection;
	var DESCRIPTORS$1 = descriptors;
	var globalThis$8 = globalThis_1;
	var isCallable = isCallable$p;
	var isObject$2 = isObject$n;
	var hasOwn$1 = hasOwnProperty_1;
	var classof$3 = classof$c;
	var tryToString = tryToString$6;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$a;
	var defineBuiltIn = defineBuiltIn$e;
	var defineBuiltInAccessor$1 = defineBuiltInAccessor$6;
	var isPrototypeOf$1 = objectIsPrototypeOf;
	var getPrototypeOf = objectGetPrototypeOf$1;
	var setPrototypeOf$1 = objectSetPrototypeOf;
	var wellKnownSymbol$1 = wellKnownSymbol$r;
	var uid = uid$3;
	var InternalStateModule$1 = internalState;

	var enforceInternalState$1 = InternalStateModule$1.enforce;
	var getInternalState$1 = InternalStateModule$1.get;
	var Int8Array$4 = globalThis$8.Int8Array;
	var Int8ArrayPrototype$1 = Int8Array$4 && Int8Array$4.prototype;
	var Uint8ClampedArray$1 = globalThis$8.Uint8ClampedArray;
	var Uint8ClampedArrayPrototype = Uint8ClampedArray$1 && Uint8ClampedArray$1.prototype;
	var TypedArray$1 = Int8Array$4 && getPrototypeOf(Int8Array$4);
	var TypedArrayPrototype$2 = Int8ArrayPrototype$1 && getPrototypeOf(Int8ArrayPrototype$1);
	var ObjectPrototype = Object.prototype;
	var TypeError$1 = globalThis$8.TypeError;

	var TO_STRING_TAG = wellKnownSymbol$1('toStringTag');
	var TYPED_ARRAY_TAG$1 = uid('TYPED_ARRAY_TAG');
	var TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor';
	// Fixing native typed arrays in Opera Presto crashes the browser, see #595
	var NATIVE_ARRAY_BUFFER_VIEWS$2 = NATIVE_ARRAY_BUFFER && !!setPrototypeOf$1 && classof$3(globalThis$8.opera) !== 'Opera';
	var TYPED_ARRAY_TAG_REQUIRED = false;
	var NAME, Constructor, Prototype;

	var TypedArrayConstructorsList = {
	  Int8Array: 1,
	  Uint8Array: 1,
	  Uint8ClampedArray: 1,
	  Int16Array: 2,
	  Uint16Array: 2,
	  Int32Array: 4,
	  Uint32Array: 4,
	  Float32Array: 4,
	  Float64Array: 8
	};

	var BigIntArrayConstructorsList = {
	  BigInt64Array: 8,
	  BigUint64Array: 8
	};

	var isView = function isView(it) {
	  if (!isObject$2(it)) return false;
	  var klass = classof$3(it);
	  return klass === 'DataView'
	    || hasOwn$1(TypedArrayConstructorsList, klass)
	    || hasOwn$1(BigIntArrayConstructorsList, klass);
	};

	var getTypedArrayConstructor$3 = function (it) {
	  var proto = getPrototypeOf(it);
	  if (!isObject$2(proto)) return;
	  var state = getInternalState$1(proto);
	  return (state && hasOwn$1(state, TYPED_ARRAY_CONSTRUCTOR)) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor$3(proto);
	};

	var isTypedArray$1 = function (it) {
	  if (!isObject$2(it)) return false;
	  var klass = classof$3(it);
	  return hasOwn$1(TypedArrayConstructorsList, klass)
	    || hasOwn$1(BigIntArrayConstructorsList, klass);
	};

	var aTypedArray$m = function (it) {
	  if (isTypedArray$1(it)) return it;
	  throw new TypeError$1('Target is not a typed array');
	};

	var aTypedArrayConstructor$1 = function (C) {
	  if (isCallable(C) && (!setPrototypeOf$1 || isPrototypeOf$1(TypedArray$1, C))) return C;
	  throw new TypeError$1(tryToString(C) + ' is not a typed array constructor');
	};

	var exportTypedArrayMethod$n = function (KEY, property, forced, options) {
	  if (!DESCRIPTORS$1) return;
	  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
	    var TypedArrayConstructor = globalThis$8[ARRAY];
	    if (TypedArrayConstructor && hasOwn$1(TypedArrayConstructor.prototype, KEY)) try {
	      delete TypedArrayConstructor.prototype[KEY];
	    } catch (error) {
	      // old WebKit bug - some methods are non-configurable
	      try {
	        TypedArrayConstructor.prototype[KEY] = property;
	      } catch (error2) { /* empty */ }
	    }
	  }
	  if (!TypedArrayPrototype$2[KEY] || forced) {
	    defineBuiltIn(TypedArrayPrototype$2, KEY, forced ? property
	      : NATIVE_ARRAY_BUFFER_VIEWS$2 && Int8ArrayPrototype$1[KEY] || property, options);
	  }
	};

	var exportTypedArrayStaticMethod = function (KEY, property, forced) {
	  var ARRAY, TypedArrayConstructor;
	  if (!DESCRIPTORS$1) return;
	  if (setPrototypeOf$1) {
	    if (forced) for (ARRAY in TypedArrayConstructorsList) {
	      TypedArrayConstructor = globalThis$8[ARRAY];
	      if (TypedArrayConstructor && hasOwn$1(TypedArrayConstructor, KEY)) try {
	        delete TypedArrayConstructor[KEY];
	      } catch (error) { /* empty */ }
	    }
	    if (!TypedArray$1[KEY] || forced) {
	      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
	      try {
	        return defineBuiltIn(TypedArray$1, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$2 && TypedArray$1[KEY] || property);
	      } catch (error) { /* empty */ }
	    } else return;
	  }
	  for (ARRAY in TypedArrayConstructorsList) {
	    TypedArrayConstructor = globalThis$8[ARRAY];
	    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
	      defineBuiltIn(TypedArrayConstructor, KEY, property);
	    }
	  }
	};

	for (NAME in TypedArrayConstructorsList) {
	  Constructor = globalThis$8[NAME];
	  Prototype = Constructor && Constructor.prototype;
	  if (Prototype) enforceInternalState$1(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
	  else NATIVE_ARRAY_BUFFER_VIEWS$2 = false;
	}

	for (NAME in BigIntArrayConstructorsList) {
	  Constructor = globalThis$8[NAME];
	  Prototype = Constructor && Constructor.prototype;
	  if (Prototype) enforceInternalState$1(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
	}

	// WebKit bug - typed arrays constructors prototype is Object.prototype
	if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !isCallable(TypedArray$1) || TypedArray$1 === Function.prototype) {
	  // eslint-disable-next-line no-shadow -- safe
	  TypedArray$1 = function TypedArray() {
	    throw new TypeError$1('Incorrect invocation');
	  };
	  if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME in TypedArrayConstructorsList) {
	    if (globalThis$8[NAME]) setPrototypeOf$1(globalThis$8[NAME], TypedArray$1);
	  }
	}

	if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !TypedArrayPrototype$2 || TypedArrayPrototype$2 === ObjectPrototype) {
	  TypedArrayPrototype$2 = TypedArray$1.prototype;
	  if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME in TypedArrayConstructorsList) {
	    if (globalThis$8[NAME]) setPrototypeOf$1(globalThis$8[NAME].prototype, TypedArrayPrototype$2);
	  }
	}

	// WebKit bug - one more object in Uint8ClampedArray prototype chain
	if (NATIVE_ARRAY_BUFFER_VIEWS$2 && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype$2) {
	  setPrototypeOf$1(Uint8ClampedArrayPrototype, TypedArrayPrototype$2);
	}

	if (DESCRIPTORS$1 && !hasOwn$1(TypedArrayPrototype$2, TO_STRING_TAG)) {
	  TYPED_ARRAY_TAG_REQUIRED = true;
	  defineBuiltInAccessor$1(TypedArrayPrototype$2, TO_STRING_TAG, {
	    configurable: true,
	    get: function () {
	      return isObject$2(this) ? this[TYPED_ARRAY_TAG$1] : undefined;
	    }
	  });
	  for (NAME in TypedArrayConstructorsList) if (globalThis$8[NAME]) {
	    createNonEnumerableProperty$1(globalThis$8[NAME].prototype, TYPED_ARRAY_TAG$1, NAME);
	  }
	}

	var arrayBufferViewCore = {
	  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS$2,
	  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG$1,
	  aTypedArray: aTypedArray$m,
	  aTypedArrayConstructor: aTypedArrayConstructor$1,
	  exportTypedArrayMethod: exportTypedArrayMethod$n,
	  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
	  getTypedArrayConstructor: getTypedArrayConstructor$3,
	  isView: isView,
	  isTypedArray: isTypedArray$1,
	  TypedArray: TypedArray$1,
	  TypedArrayPrototype: TypedArrayPrototype$2
	};

	/* eslint-disable no-new, sonarjs/inconsistent-function-call -- required for testing */
	var globalThis$7 = globalThis_1;
	var fails$8 = fails$G;
	var checkCorrectnessOfIteration = checkCorrectnessOfIteration$2;
	var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

	var ArrayBuffer$2 = globalThis$7.ArrayBuffer;
	var Int8Array$3 = globalThis$7.Int8Array;

	var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails$8(function () {
	  Int8Array$3(1);
	}) || !fails$8(function () {
	  new Int8Array$3(-1);
	}) || !checkCorrectnessOfIteration(function (iterable) {
	  new Int8Array$3();
	  new Int8Array$3(null);
	  new Int8Array$3(1.5);
	  new Int8Array$3(iterable);
	}, true) || fails$8(function () {
	  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
	  return new Int8Array$3(new ArrayBuffer$2(2), 1, undefined).length !== 1;
	});

	var isObject$1 = isObject$n;

	var floor$4 = Math.floor;

	// `IsIntegralNumber` abstract operation
	// https://tc39.es/ecma262/#sec-isintegralnumber
	// eslint-disable-next-line es/no-number-isinteger -- safe
	var isIntegralNumber$1 = Number.isInteger || function isInteger(it) {
	  return !isObject$1(it) && isFinite(it) && floor$4(it) === it;
	};

	var toIntegerOrInfinity$3 = toIntegerOrInfinity$a;

	var $RangeError$3 = RangeError;

	var toPositiveInteger$1 = function (it) {
	  var result = toIntegerOrInfinity$3(it);
	  if (result < 0) throw new $RangeError$3("The argument can't be less than 0");
	  return result;
	};

	var toPositiveInteger = toPositiveInteger$1;

	var $RangeError$2 = RangeError;

	var toOffset$2 = function (it, BYTES) {
	  var offset = toPositiveInteger(it);
	  if (offset % BYTES) throw new $RangeError$2('Wrong offset');
	  return offset;
	};

	var floor$3 = Math.floor;

	// https://tc39.es/ecma262/#sec-touint8clamp
	var toUint8Clamped$1 = function (it) {
	  var number = +it;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  if (number !== number || number <= 0) return 0;
	  if (number >= 0xFF) return 0xFF;
	  var f = floor$3(number);
	  if (f + 0.5 < number) return f + 1;
	  if (number < f + 0.5) return f;
	  // round-half-to-even (banker's rounding)
	  return f % 2 === 0 ? f : f + 1;
	};

	var classof$2 = classof$c;

	var isBigIntArray$1 = function (it) {
	  var klass = classof$2(it);
	  return klass === 'BigInt64Array' || klass === 'BigUint64Array';
	};

	var toPrimitive = toPrimitive$2;

	var $TypeError$1 = TypeError;

	// `ToBigInt` abstract operation
	// https://tc39.es/ecma262/#sec-tobigint
	var toBigInt$2 = function (argument) {
	  var prim = toPrimitive(argument, 'number');
	  if (typeof prim == 'number') throw new $TypeError$1("Can't convert number to bigint");
	  // eslint-disable-next-line es/no-bigint -- safe
	  return BigInt(prim);
	};

	var bind = functionBindContext;
	var call$3 = functionCall;
	var aCallable$2 = aCallable$c;
	var aConstructor = aConstructor$2;
	var toObject$2 = toObject$c;
	var lengthOfArrayLike$5 = lengthOfArrayLike$e;
	var getIterator = getIterator$4;
	var getIteratorMethod = getIteratorMethod$5;
	var isArrayIteratorMethod = isArrayIteratorMethod$3;
	var isBigIntArray = isBigIntArray$1;
	var aTypedArrayConstructor = arrayBufferViewCore.aTypedArrayConstructor;
	var toBigInt$1 = toBigInt$2;

	var typedArrayFrom$1 = function from(source /* , mapfn, thisArg */) {
	  var C = aConstructor(this);
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  if (mapping) aCallable$2(mapfn);
	  var O = toObject$2(source);
	  var iteratorMethod = getIteratorMethod(O);
	  var i, length, result, thisIsBigIntArray, value, step, iterator, next;
	  if (iteratorMethod && !isArrayIteratorMethod(iteratorMethod)) {
	    iterator = getIterator(O, iteratorMethod);
	    next = iterator.next;
	    O = [];
	    while (!(step = call$3(next, iterator)).done) {
	      O.push(step.value);
	    }
	  }
	  if (mapping && argumentsLength > 2) {
	    mapfn = bind(mapfn, arguments[2]);
	  }
	  length = lengthOfArrayLike$5(O);
	  result = new (aTypedArrayConstructor(C))(length);
	  thisIsBigIntArray = isBigIntArray(result);
	  for (i = 0; length > i; i++) {
	    value = mapping ? mapfn(O[i], i) : O[i];
	    // FF30- typed arrays doesn't properly convert objects to typed array values
	    result[i] = thisIsBigIntArray ? toBigInt$1(value) : +value;
	  }
	  return result;
	};

	var lengthOfArrayLike$4 = lengthOfArrayLike$e;

	var arrayFromConstructorAndList$2 = function (Constructor, list, $length) {
	  var index = 0;
	  var length = arguments.length > 2 ? $length : lengthOfArrayLike$4(list);
	  var result = new Constructor(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	};

	var $$2 = _export;
	var globalThis$6 = globalThis_1;
	var call$2 = functionCall;
	var DESCRIPTORS = descriptors;
	var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = typedArrayConstructorsRequireWrappers;
	var ArrayBufferViewCore$m = arrayBufferViewCore;
	var ArrayBufferModule = arrayBuffer;
	var anInstance = anInstance$5;
	var createPropertyDescriptor = createPropertyDescriptor$6;
	var createNonEnumerableProperty = createNonEnumerableProperty$a;
	var isIntegralNumber = isIntegralNumber$1;
	var toIndex = toIndex$2;
	var toOffset$1 = toOffset$2;
	var toUint8Clamped = toUint8Clamped$1;
	var toPropertyKey = toPropertyKey$3;
	var hasOwn = hasOwnProperty_1;
	var classof$1 = classof$c;
	var isObject = isObject$n;
	var isSymbol = isSymbol$3;
	var create = objectCreate;
	var isPrototypeOf = objectIsPrototypeOf;
	var setPrototypeOf = objectSetPrototypeOf;
	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var typedArrayFrom = typedArrayFrom$1;
	var forEach = arrayIteration.forEach;
	var setSpecies = setSpecies$4;
	var defineBuiltInAccessor = defineBuiltInAccessor$6;
	var definePropertyModule = objectDefineProperty;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var arrayFromConstructorAndList$1 = arrayFromConstructorAndList$2;
	var InternalStateModule = internalState;
	var inheritIfRequired = inheritIfRequired$3;

	var getInternalState = InternalStateModule.get;
	var setInternalState = InternalStateModule.set;
	var enforceInternalState = InternalStateModule.enforce;
	var nativeDefineProperty = definePropertyModule.f;
	var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	var RangeError$2 = globalThis$6.RangeError;
	var ArrayBuffer$1 = ArrayBufferModule.ArrayBuffer;
	var ArrayBufferPrototype = ArrayBuffer$1.prototype;
	var DataView$1 = ArrayBufferModule.DataView;
	var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore$m.NATIVE_ARRAY_BUFFER_VIEWS;
	var TYPED_ARRAY_TAG = ArrayBufferViewCore$m.TYPED_ARRAY_TAG;
	var TypedArray = ArrayBufferViewCore$m.TypedArray;
	var TypedArrayPrototype$1 = ArrayBufferViewCore$m.TypedArrayPrototype;
	var isTypedArray = ArrayBufferViewCore$m.isTypedArray;
	var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	var WRONG_LENGTH = 'Wrong length';

	var addGetter = function (it, key) {
	  defineBuiltInAccessor(it, key, {
	    configurable: true,
	    get: function () {
	      return getInternalState(this)[key];
	    }
	  });
	};

	var isArrayBuffer = function (it) {
	  var klass;
	  return isPrototypeOf(ArrayBufferPrototype, it) || (klass = classof$1(it)) === 'ArrayBuffer' || klass === 'SharedArrayBuffer';
	};

	var isTypedArrayIndex = function (target, key) {
	  return isTypedArray(target)
	    && !isSymbol(key)
	    && key in target
	    && isIntegralNumber(+key)
	    && key >= 0;
	};

	var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
	  key = toPropertyKey(key);
	  return isTypedArrayIndex(target, key)
	    ? createPropertyDescriptor(2, target[key])
	    : nativeGetOwnPropertyDescriptor(target, key);
	};

	var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
	  key = toPropertyKey(key);
	  if (isTypedArrayIndex(target, key)
	    && isObject(descriptor)
	    && hasOwn(descriptor, 'value')
	    && !hasOwn(descriptor, 'get')
	    && !hasOwn(descriptor, 'set')
	    // TODO: add validation descriptor w/o calling accessors
	    && !descriptor.configurable
	    && (!hasOwn(descriptor, 'writable') || descriptor.writable)
	    && (!hasOwn(descriptor, 'enumerable') || descriptor.enumerable)
	  ) {
	    target[key] = descriptor.value;
	    return target;
	  } return nativeDefineProperty(target, key, descriptor);
	};

	if (DESCRIPTORS) {
	  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
	    definePropertyModule.f = wrappedDefineProperty;
	    addGetter(TypedArrayPrototype$1, 'buffer');
	    addGetter(TypedArrayPrototype$1, 'byteOffset');
	    addGetter(TypedArrayPrototype$1, 'byteLength');
	    addGetter(TypedArrayPrototype$1, 'length');
	  }

	  $$2({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
	    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
	    defineProperty: wrappedDefineProperty
	  });

	  typedArrayConstructor.exports = function (TYPE, wrapper, CLAMPED) {
	    var BYTES = TYPE.match(/\d+/)[0] / 8;
	    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
	    var GETTER = 'get' + TYPE;
	    var SETTER = 'set' + TYPE;
	    var NativeTypedArrayConstructor = globalThis$6[CONSTRUCTOR_NAME];
	    var TypedArrayConstructor = NativeTypedArrayConstructor;
	    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
	    var exported = {};

	    var getter = function (that, index) {
	      var data = getInternalState(that);
	      return data.view[GETTER](index * BYTES + data.byteOffset, true);
	    };

	    var setter = function (that, index, value) {
	      var data = getInternalState(that);
	      data.view[SETTER](index * BYTES + data.byteOffset, CLAMPED ? toUint8Clamped(value) : value, true);
	    };

	    var addElement = function (that, index) {
	      nativeDefineProperty(that, index, {
	        get: function () {
	          return getter(this, index);
	        },
	        set: function (value) {
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };

	    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
	        anInstance(that, TypedArrayConstructorPrototype);
	        var index = 0;
	        var byteOffset = 0;
	        var buffer, byteLength, length;
	        if (!isObject(data)) {
	          length = toIndex(data);
	          byteLength = length * BYTES;
	          buffer = new ArrayBuffer$1(byteLength);
	        } else if (isArrayBuffer(data)) {
	          buffer = data;
	          byteOffset = toOffset$1(offset, BYTES);
	          var $len = data.byteLength;
	          if ($length === undefined) {
	            if ($len % BYTES) throw new RangeError$2(WRONG_LENGTH);
	            byteLength = $len - byteOffset;
	            if (byteLength < 0) throw new RangeError$2(WRONG_LENGTH);
	          } else {
	            byteLength = toIndex($length) * BYTES;
	            if (byteLength + byteOffset > $len) throw new RangeError$2(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if (isTypedArray(data)) {
	          return arrayFromConstructorAndList$1(TypedArrayConstructor, data);
	        } else {
	          return call$2(typedArrayFrom, TypedArrayConstructor, data);
	        }
	        setInternalState(that, {
	          buffer: buffer,
	          byteOffset: byteOffset,
	          byteLength: byteLength,
	          length: length,
	          view: new DataView$1(buffer)
	        });
	        while (index < length) addElement(that, index++);
	      });

	      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
	      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype$1);
	    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
	      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
	        anInstance(dummy, TypedArrayConstructorPrototype);
	        return inheritIfRequired(function () {
	          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
	          if (isArrayBuffer(data)) return $length !== undefined
	            ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES), $length)
	            : typedArrayOffset !== undefined
	              ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES))
	              : new NativeTypedArrayConstructor(data);
	          if (isTypedArray(data)) return arrayFromConstructorAndList$1(TypedArrayConstructor, data);
	          return call$2(typedArrayFrom, TypedArrayConstructor, data);
	        }(), dummy, TypedArrayConstructor);
	      });

	      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
	      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
	        if (!(key in TypedArrayConstructor)) {
	          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
	        }
	      });
	      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
	    }

	    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
	      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
	    }

	    enforceInternalState(TypedArrayConstructorPrototype).TypedArrayConstructor = TypedArrayConstructor;

	    if (TYPED_ARRAY_TAG) {
	      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
	    }

	    var FORCED = TypedArrayConstructor !== NativeTypedArrayConstructor;

	    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

	    $$2({ global: true, constructor: true, forced: FORCED, sham: !NATIVE_ARRAY_BUFFER_VIEWS }, exported);

	    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
	      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
	    }

	    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
	      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
	    }

	    setSpecies(CONSTRUCTOR_NAME);
	  };
	} else typedArrayConstructor.exports = function () { /* empty */ };

	var createTypedArrayConstructor$2 = typedArrayConstructor.exports;

	// `Uint8Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor$2('Uint8', function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var toObject$1 = toObject$c;
	var toAbsoluteIndex$1 = toAbsoluteIndex$7;
	var lengthOfArrayLike$3 = lengthOfArrayLike$e;
	var deletePropertyOrThrow = deletePropertyOrThrow$2;

	var min$1 = Math.min;

	// `Array.prototype.copyWithin` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.copywithin
	// eslint-disable-next-line es/no-array-prototype-copywithin -- safe
	var arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
	  var O = toObject$1(this);
	  var len = lengthOfArrayLike$3(O);
	  var to = toAbsoluteIndex$1(target, len);
	  var from = toAbsoluteIndex$1(start, len);
	  var end = arguments.length > 2 ? arguments[2] : undefined;
	  var count = min$1((end === undefined ? len : toAbsoluteIndex$1(end, len)) - from, len - to);
	  var inc = 1;
	  if (from < to && to < from + count) {
	    inc = -1;
	    from += count - 1;
	    to += count - 1;
	  }
	  while (count-- > 0) {
	    if (from in O) O[to] = O[from];
	    else deletePropertyOrThrow(O, to);
	    to += inc;
	    from += inc;
	  } return O;
	};

	var uncurryThis$7 = functionUncurryThis;
	var ArrayBufferViewCore$l = arrayBufferViewCore;
	var $ArrayCopyWithin = arrayCopyWithin;

	var u$ArrayCopyWithin = uncurryThis$7($ArrayCopyWithin);
	var aTypedArray$l = ArrayBufferViewCore$l.aTypedArray;
	var exportTypedArrayMethod$m = ArrayBufferViewCore$l.exportTypedArrayMethod;

	// `%TypedArray%.prototype.copyWithin` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.copywithin
	exportTypedArrayMethod$m('copyWithin', function copyWithin(target, start /* , end */) {
	  return u$ArrayCopyWithin(aTypedArray$l(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	});

	var ArrayBufferViewCore$k = arrayBufferViewCore;
	var $every = arrayIteration.every;

	var aTypedArray$k = ArrayBufferViewCore$k.aTypedArray;
	var exportTypedArrayMethod$l = ArrayBufferViewCore$k.exportTypedArrayMethod;

	// `%TypedArray%.prototype.every` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.every
	exportTypedArrayMethod$l('every', function every(callbackfn /* , thisArg */) {
	  return $every(aTypedArray$k(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$j = arrayBufferViewCore;
	var $fill = arrayFill$1;
	var toBigInt = toBigInt$2;
	var classof = classof$c;
	var call$1 = functionCall;
	var uncurryThis$6 = functionUncurryThis;
	var fails$7 = fails$G;

	var aTypedArray$j = ArrayBufferViewCore$j.aTypedArray;
	var exportTypedArrayMethod$k = ArrayBufferViewCore$j.exportTypedArrayMethod;
	var slice = uncurryThis$6(''.slice);

	// V8 ~ Chrome < 59, Safari < 14.1, FF < 55, Edge <=18
	var CONVERSION_BUG = fails$7(function () {
	  var count = 0;
	  // eslint-disable-next-line es/no-typed-arrays -- safe
	  new Int8Array(2).fill({ valueOf: function () { return count++; } });
	  return count !== 1;
	});

	// `%TypedArray%.prototype.fill` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
	exportTypedArrayMethod$k('fill', function fill(value /* , start, end */) {
	  var length = arguments.length;
	  aTypedArray$j(this);
	  var actualValue = slice(classof(this), 0, 3) === 'Big' ? toBigInt(value) : +value;
	  return call$1($fill, this, actualValue, length > 1 ? arguments[1] : undefined, length > 2 ? arguments[2] : undefined);
	}, CONVERSION_BUG);

	var arrayFromConstructorAndList = arrayFromConstructorAndList$2;
	var getTypedArrayConstructor$2 = arrayBufferViewCore.getTypedArrayConstructor;

	var typedArrayFromSameTypeAndList = function (instance, list) {
	  return arrayFromConstructorAndList(getTypedArrayConstructor$2(instance), list);
	};

	var ArrayBufferViewCore$i = arrayBufferViewCore;
	var $filter = arrayIteration.filter;
	var fromSameTypeAndList$1 = typedArrayFromSameTypeAndList;

	var aTypedArray$i = ArrayBufferViewCore$i.aTypedArray;
	var exportTypedArrayMethod$j = ArrayBufferViewCore$i.exportTypedArrayMethod;

	// `%TypedArray%.prototype.filter` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.filter
	exportTypedArrayMethod$j('filter', function filter(callbackfn /* , thisArg */) {
	  var list = $filter(aTypedArray$i(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  return fromSameTypeAndList$1(this, list);
	});

	var ArrayBufferViewCore$h = arrayBufferViewCore;
	var $find = arrayIteration.find;

	var aTypedArray$h = ArrayBufferViewCore$h.aTypedArray;
	var exportTypedArrayMethod$i = ArrayBufferViewCore$h.exportTypedArrayMethod;

	// `%TypedArray%.prototype.find` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.find
	exportTypedArrayMethod$i('find', function find(predicate /* , thisArg */) {
	  return $find(aTypedArray$h(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$g = arrayBufferViewCore;
	var $findIndex = arrayIteration.findIndex;

	var aTypedArray$g = ArrayBufferViewCore$g.aTypedArray;
	var exportTypedArrayMethod$h = ArrayBufferViewCore$g.exportTypedArrayMethod;

	// `%TypedArray%.prototype.findIndex` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findindex
	exportTypedArrayMethod$h('findIndex', function findIndex(predicate /* , thisArg */) {
	  return $findIndex(aTypedArray$g(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$f = arrayBufferViewCore;
	var $forEach = arrayIteration.forEach;

	var aTypedArray$f = ArrayBufferViewCore$f.aTypedArray;
	var exportTypedArrayMethod$g = ArrayBufferViewCore$f.exportTypedArrayMethod;

	// `%TypedArray%.prototype.forEach` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.foreach
	exportTypedArrayMethod$g('forEach', function forEach(callbackfn /* , thisArg */) {
	  $forEach(aTypedArray$f(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$e = arrayBufferViewCore;
	var $includes = arrayIncludes.includes;

	var aTypedArray$e = ArrayBufferViewCore$e.aTypedArray;
	var exportTypedArrayMethod$f = ArrayBufferViewCore$e.exportTypedArrayMethod;

	// `%TypedArray%.prototype.includes` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.includes
	exportTypedArrayMethod$f('includes', function includes(searchElement /* , fromIndex */) {
	  return $includes(aTypedArray$e(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$d = arrayBufferViewCore;
	var $indexOf = arrayIncludes.indexOf;

	var aTypedArray$d = ArrayBufferViewCore$d.aTypedArray;
	var exportTypedArrayMethod$e = ArrayBufferViewCore$d.exportTypedArrayMethod;

	// `%TypedArray%.prototype.indexOf` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.indexof
	exportTypedArrayMethod$e('indexOf', function indexOf(searchElement /* , fromIndex */) {
	  return $indexOf(aTypedArray$d(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var globalThis$5 = globalThis_1;
	var fails$6 = fails$G;
	var uncurryThis$5 = functionUncurryThis;
	var ArrayBufferViewCore$c = arrayBufferViewCore;
	var ArrayIterators = es_array_iterator;
	var wellKnownSymbol = wellKnownSymbol$r;

	var ITERATOR = wellKnownSymbol('iterator');
	var Uint8Array$2 = globalThis$5.Uint8Array;
	var arrayValues = uncurryThis$5(ArrayIterators.values);
	var arrayKeys = uncurryThis$5(ArrayIterators.keys);
	var arrayEntries = uncurryThis$5(ArrayIterators.entries);
	var aTypedArray$c = ArrayBufferViewCore$c.aTypedArray;
	var exportTypedArrayMethod$d = ArrayBufferViewCore$c.exportTypedArrayMethod;
	var TypedArrayPrototype = Uint8Array$2 && Uint8Array$2.prototype;

	var GENERIC = !fails$6(function () {
	  TypedArrayPrototype[ITERATOR].call([1]);
	});

	var ITERATOR_IS_VALUES = !!TypedArrayPrototype
	  && TypedArrayPrototype.values
	  && TypedArrayPrototype[ITERATOR] === TypedArrayPrototype.values
	  && TypedArrayPrototype.values.name === 'values';

	var typedArrayValues = function values() {
	  return arrayValues(aTypedArray$c(this));
	};

	// `%TypedArray%.prototype.entries` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.entries
	exportTypedArrayMethod$d('entries', function entries() {
	  return arrayEntries(aTypedArray$c(this));
	}, GENERIC);
	// `%TypedArray%.prototype.keys` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.keys
	exportTypedArrayMethod$d('keys', function keys() {
	  return arrayKeys(aTypedArray$c(this));
	}, GENERIC);
	// `%TypedArray%.prototype.values` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.values
	exportTypedArrayMethod$d('values', typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' });
	// `%TypedArray%.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype-@@iterator
	exportTypedArrayMethod$d(ITERATOR, typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' });

	var ArrayBufferViewCore$b = arrayBufferViewCore;
	var uncurryThis$4 = functionUncurryThis;

	var aTypedArray$b = ArrayBufferViewCore$b.aTypedArray;
	var exportTypedArrayMethod$c = ArrayBufferViewCore$b.exportTypedArrayMethod;
	var $join = uncurryThis$4([].join);

	// `%TypedArray%.prototype.join` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.join
	exportTypedArrayMethod$c('join', function join(separator) {
	  return $join(aTypedArray$b(this), separator);
	});

	/* eslint-disable es/no-array-prototype-lastindexof -- safe */
	var apply$2 = functionApply;
	var toIndexedObject$1 = toIndexedObject$9;
	var toIntegerOrInfinity$2 = toIntegerOrInfinity$a;
	var lengthOfArrayLike$2 = lengthOfArrayLike$e;
	var arrayMethodIsStrict = arrayMethodIsStrict$4;

	var min = Math.min;
	var $lastIndexOf$1 = [].lastIndexOf;
	var NEGATIVE_ZERO = !!$lastIndexOf$1 && 1 / [1].lastIndexOf(1, -0) < 0;
	var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
	var FORCED$3 = NEGATIVE_ZERO || !STRICT_METHOD;

	// `Array.prototype.lastIndexOf` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
	var arrayLastIndexOf = FORCED$3 ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
	  // convert -0 to +0
	  if (NEGATIVE_ZERO) return apply$2($lastIndexOf$1, this, arguments) || 0;
	  var O = toIndexedObject$1(this);
	  var length = lengthOfArrayLike$2(O);
	  if (length === 0) return -1;
	  var index = length - 1;
	  if (arguments.length > 1) index = min(index, toIntegerOrInfinity$2(arguments[1]));
	  if (index < 0) index = length + index;
	  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
	  return -1;
	} : $lastIndexOf$1;

	var ArrayBufferViewCore$a = arrayBufferViewCore;
	var apply$1 = functionApply;
	var $lastIndexOf = arrayLastIndexOf;

	var aTypedArray$a = ArrayBufferViewCore$a.aTypedArray;
	var exportTypedArrayMethod$b = ArrayBufferViewCore$a.exportTypedArrayMethod;

	// `%TypedArray%.prototype.lastIndexOf` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.lastindexof
	exportTypedArrayMethod$b('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
	  var length = arguments.length;
	  return apply$1($lastIndexOf, aTypedArray$a(this), length > 1 ? [searchElement, arguments[1]] : [searchElement]);
	});

	var ArrayBufferViewCore$9 = arrayBufferViewCore;
	var $map = arrayIteration.map;
	var fromSameTypeAndList = typedArrayFromSameTypeAndList;

	var aTypedArray$9 = ArrayBufferViewCore$9.aTypedArray;
	var exportTypedArrayMethod$a = ArrayBufferViewCore$9.exportTypedArrayMethod;

	// `%TypedArray%.prototype.map` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.map
	exportTypedArrayMethod$a('map', function map(mapfn /* , thisArg */) {
	  var list = $map(aTypedArray$9(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	  return fromSameTypeAndList(this, list);
	});

	var aCallable$1 = aCallable$c;
	var toObject = toObject$c;
	var IndexedObject = indexedObject;
	var lengthOfArrayLike$1 = lengthOfArrayLike$e;

	var $TypeError = TypeError;

	var REDUCE_EMPTY = 'Reduce of empty array with no initial value';

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    var O = toObject(that);
	    var self = IndexedObject(O);
	    var length = lengthOfArrayLike$1(O);
	    aCallable$1(callbackfn);
	    if (length === 0 && argumentsLength < 2) throw new $TypeError(REDUCE_EMPTY);
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
	        throw new $TypeError(REDUCE_EMPTY);
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

	var ArrayBufferViewCore$8 = arrayBufferViewCore;
	var $reduce = arrayReduce.left;

	var aTypedArray$8 = ArrayBufferViewCore$8.aTypedArray;
	var exportTypedArrayMethod$9 = ArrayBufferViewCore$8.exportTypedArrayMethod;

	// `%TypedArray%.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduce
	exportTypedArrayMethod$9('reduce', function reduce(callbackfn /* , initialValue */) {
	  var length = arguments.length;
	  return $reduce(aTypedArray$8(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$7 = arrayBufferViewCore;
	var $reduceRight = arrayReduce.right;

	var aTypedArray$7 = ArrayBufferViewCore$7.aTypedArray;
	var exportTypedArrayMethod$8 = ArrayBufferViewCore$7.exportTypedArrayMethod;

	// `%TypedArray%.prototype.reduceRight` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduceright
	exportTypedArrayMethod$8('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
	  var length = arguments.length;
	  return $reduceRight(aTypedArray$7(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$6 = arrayBufferViewCore;

	var aTypedArray$6 = ArrayBufferViewCore$6.aTypedArray;
	var exportTypedArrayMethod$7 = ArrayBufferViewCore$6.exportTypedArrayMethod;
	var floor$2 = Math.floor;

	// `%TypedArray%.prototype.reverse` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reverse
	exportTypedArrayMethod$7('reverse', function reverse() {
	  var that = this;
	  var length = aTypedArray$6(that).length;
	  var middle = floor$2(length / 2);
	  var index = 0;
	  var value;
	  while (index < middle) {
	    value = that[index];
	    that[index++] = that[--length];
	    that[length] = value;
	  } return that;
	});

	var globalThis$4 = globalThis_1;
	var call = functionCall;
	var ArrayBufferViewCore$5 = arrayBufferViewCore;
	var lengthOfArrayLike = lengthOfArrayLike$e;
	var toOffset = toOffset$2;
	var toIndexedObject = toObject$c;
	var fails$5 = fails$G;

	var RangeError$1 = globalThis$4.RangeError;
	var Int8Array$2 = globalThis$4.Int8Array;
	var Int8ArrayPrototype = Int8Array$2 && Int8Array$2.prototype;
	var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
	var aTypedArray$5 = ArrayBufferViewCore$5.aTypedArray;
	var exportTypedArrayMethod$6 = ArrayBufferViewCore$5.exportTypedArrayMethod;

	var WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS = !fails$5(function () {
	  // eslint-disable-next-line es/no-typed-arrays -- required for testing
	  var array = new Uint8ClampedArray(2);
	  call($set, array, { length: 1, 0: 3 }, 1);
	  return array[1] !== 3;
	});

	// https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other
	var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore$5.NATIVE_ARRAY_BUFFER_VIEWS && fails$5(function () {
	  var array = new Int8Array$2(2);
	  array.set(1);
	  array.set('2', 1);
	  return array[0] !== 0 || array[1] !== 2;
	});

	// `%TypedArray%.prototype.set` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
	exportTypedArrayMethod$6('set', function set(arrayLike /* , offset */) {
	  aTypedArray$5(this);
	  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
	  var src = toIndexedObject(arrayLike);
	  if (WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS) return call($set, this, src, offset);
	  var length = this.length;
	  var len = lengthOfArrayLike(src);
	  var index = 0;
	  if (len + offset > length) throw new RangeError$1('Wrong length');
	  while (index < len) this[offset + index] = src[index++];
	}, !WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);

	var ArrayBufferViewCore$4 = arrayBufferViewCore;
	var fails$4 = fails$G;
	var arraySlice$1 = arraySlice$6;

	var aTypedArray$4 = ArrayBufferViewCore$4.aTypedArray;
	var getTypedArrayConstructor$1 = ArrayBufferViewCore$4.getTypedArrayConstructor;
	var exportTypedArrayMethod$5 = ArrayBufferViewCore$4.exportTypedArrayMethod;

	var FORCED$2 = fails$4(function () {
	  // eslint-disable-next-line es/no-typed-arrays -- required for testing
	  new Int8Array(1).slice();
	});

	// `%TypedArray%.prototype.slice` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.slice
	exportTypedArrayMethod$5('slice', function slice(start, end) {
	  var list = arraySlice$1(aTypedArray$4(this), start, end);
	  var C = getTypedArrayConstructor$1(this);
	  var index = 0;
	  var length = list.length;
	  var result = new C(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	}, FORCED$2);

	var ArrayBufferViewCore$3 = arrayBufferViewCore;
	var $some = arrayIteration.some;

	var aTypedArray$3 = ArrayBufferViewCore$3.aTypedArray;
	var exportTypedArrayMethod$4 = ArrayBufferViewCore$3.exportTypedArrayMethod;

	// `%TypedArray%.prototype.some` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.some
	exportTypedArrayMethod$4('some', function some(callbackfn /* , thisArg */) {
	  return $some(aTypedArray$3(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var globalThis$3 = globalThis_1;
	var uncurryThis$3 = functionUncurryThisClause;
	var fails$3 = fails$G;
	var aCallable = aCallable$c;
	var internalSort = arraySort$1;
	var ArrayBufferViewCore$2 = arrayBufferViewCore;
	var FF = environmentFfVersion;
	var IE_OR_EDGE = environmentIsIeOrEdge;
	var V8 = environmentV8Version;
	var WEBKIT = environmentWebkitVersion;

	var aTypedArray$2 = ArrayBufferViewCore$2.aTypedArray;
	var exportTypedArrayMethod$3 = ArrayBufferViewCore$2.exportTypedArrayMethod;
	var Uint16Array$1 = globalThis$3.Uint16Array;
	var nativeSort = Uint16Array$1 && uncurryThis$3(Uint16Array$1.prototype.sort);

	// WebKit
	var ACCEPT_INCORRECT_ARGUMENTS = !!nativeSort && !(fails$3(function () {
	  nativeSort(new Uint16Array$1(2), null);
	}) && fails$3(function () {
	  nativeSort(new Uint16Array$1(2), {});
	}));

	var STABLE_SORT = !!nativeSort && !fails$3(function () {
	  // feature detection can be too slow, so check engines versions
	  if (V8) return V8 < 74;
	  if (FF) return FF < 67;
	  if (IE_OR_EDGE) return true;
	  if (WEBKIT) return WEBKIT < 602;

	  var array = new Uint16Array$1(516);
	  var expected = Array(516);
	  var index, mod;

	  for (index = 0; index < 516; index++) {
	    mod = index % 4;
	    array[index] = 515 - index;
	    expected[index] = index - 2 * mod + 3;
	  }

	  nativeSort(array, function (a, b) {
	    return (a / 4 | 0) - (b / 4 | 0);
	  });

	  for (index = 0; index < 516; index++) {
	    if (array[index] !== expected[index]) return true;
	  }
	});

	var getSortCompare = function (comparefn) {
	  return function (x, y) {
	    if (comparefn !== undefined) return +comparefn(x, y) || 0;
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (y !== y) return x !== x ? 0 : -1;
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (x !== x) return 1;
	    if (x === 0 && y === 0) return 1 / x > 0 ? (1 / y > 0 ? 0 : 1) : (1 / y > 0 ? -1 : 0);
	    return x > y ? 1 : x < y ? -1 : 0;
	  };
	};

	// `%TypedArray%.prototype.sort` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort
	exportTypedArrayMethod$3('sort', function sort(comparefn) {
	  if (comparefn !== undefined) aCallable(comparefn);
	  if (STABLE_SORT) return nativeSort(this, comparefn);

	  return internalSort(aTypedArray$2(this), getSortCompare(comparefn));
	}, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);

	var ArrayBufferViewCore$1 = arrayBufferViewCore;
	var toLength = toLength$8;
	var toAbsoluteIndex = toAbsoluteIndex$7;

	var aTypedArray$1 = ArrayBufferViewCore$1.aTypedArray;
	var getTypedArrayConstructor = ArrayBufferViewCore$1.getTypedArrayConstructor;
	var exportTypedArrayMethod$2 = ArrayBufferViewCore$1.exportTypedArrayMethod;

	// `%TypedArray%.prototype.subarray` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.subarray
	exportTypedArrayMethod$2('subarray', function subarray(begin, end) {
	  var O = aTypedArray$1(this);
	  var length = O.length;
	  var beginIndex = toAbsoluteIndex(begin, length);
	  var C = getTypedArrayConstructor(O);
	  return new C(
	    O.buffer,
	    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
	    toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
	  );
	});

	var globalThis$2 = globalThis_1;
	var apply = functionApply;
	var ArrayBufferViewCore = arrayBufferViewCore;
	var fails$2 = fails$G;
	var arraySlice = arraySlice$6;

	var Int8Array$1 = globalThis$2.Int8Array;
	var aTypedArray = ArrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$1 = ArrayBufferViewCore.exportTypedArrayMethod;
	var $toLocaleString = [].toLocaleString;

	// iOS Safari 6.x fails here
	var TO_LOCALE_STRING_BUG = !!Int8Array$1 && fails$2(function () {
	  $toLocaleString.call(new Int8Array$1(1));
	});

	var FORCED$1 = fails$2(function () {
	  return [1, 2].toLocaleString() !== new Int8Array$1([1, 2]).toLocaleString();
	}) || !fails$2(function () {
	  Int8Array$1.prototype.toLocaleString.call([1, 2]);
	});

	// `%TypedArray%.prototype.toLocaleString` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring
	exportTypedArrayMethod$1('toLocaleString', function toLocaleString() {
	  return apply(
	    $toLocaleString,
	    TO_LOCALE_STRING_BUG ? arraySlice(aTypedArray(this)) : aTypedArray(this),
	    arraySlice(arguments)
	  );
	}, FORCED$1);

	var exportTypedArrayMethod = arrayBufferViewCore.exportTypedArrayMethod;
	var fails$1 = fails$G;
	var globalThis$1 = globalThis_1;
	var uncurryThis$2 = functionUncurryThis;

	var Uint8Array$1 = globalThis$1.Uint8Array;
	var Uint8ArrayPrototype = Uint8Array$1 && Uint8Array$1.prototype || {};
	var arrayToString = [].toString;
	var join = uncurryThis$2([].join);

	if (fails$1(function () { arrayToString.call({}); })) {
	  arrayToString = function toString() {
	    return join(this);
	  };
	}

	var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString !== arrayToString;

	// `%TypedArray%.prototype.toString` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tostring
	exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);

	var createTypedArrayConstructor$1 = typedArrayConstructor.exports;

	// `Uint16Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor$1('Uint16', function (init) {
	  return function Uint16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var createTypedArrayConstructor = typedArrayConstructor.exports;

	// `Uint32Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor('Uint32', function (init) {
	  return function Uint32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var UnpackStream = function () {
	  var t = {},
	    n = Uint8Array,
	    i = Uint16Array,
	    e = Uint32Array,
	    r = new n(0),
	    a = new n([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]),
	    s = new n([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]),
	    o = new n([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
	    h = function h(t, n) {
	      for (var r = new i(31), a = 0; a < 31; ++a) r[a] = n += 1 << t[a - 1];
	      for (var s = new e(r[30]), o = 1; o < 30; ++o) for (var h = r[o]; h < r[o + 1]; ++h) s[h] = h - r[o] << 5 | o;
	      return [r, s];
	    },
	    f = h(a, 2),
	    l = f[0],
	    p = f[1];
	  l[28] = 258, p[258] = 28;
	  var v,
	    u = h(s, 0)[0],
	    d = new i(32768);
	  for (v = 0; v < 32768; ++v) {
	    var c = (43690 & v) >>> 1 | (21845 & v) << 1;
	    c = (61680 & (c = (52428 & c) >>> 2 | (13107 & c) << 2)) >>> 4 | (3855 & c) << 4, d[v] = ((65280 & c) >>> 8 | (255 & c) << 8) >>> 1;
	  }
	  var g = function g(t, n, e) {
	      for (var r = t.length, a = 0, s = new i(n); a < r; ++a) t[a] && ++s[t[a] - 1];
	      var o,
	        h = new i(n);
	      for (a = 0; a < n; ++a) h[a] = h[a - 1] + s[a - 1] << 1;
	      if (e) {
	        o = new i(1 << n);
	        var f = 15 - n;
	        for (a = 0; a < r; ++a) if (t[a]) for (var l = a << 4 | t[a], p = n - t[a], v = h[t[a] - 1]++ << p, u = v | (1 << p) - 1; v <= u; ++v) o[d[v] >>> f] = l;
	      } else for (o = new i(r), a = 0; a < r; ++a) t[a] && (o[a] = d[h[t[a] - 1]++] >>> 15 - t[a]);
	      return o;
	    },
	    w = new n(288);
	  for (v = 0; v < 144; ++v) w[v] = 8;
	  for (v = 144; v < 256; ++v) w[v] = 9;
	  for (v = 256; v < 280; ++v) w[v] = 7;
	  for (v = 280; v < 288; ++v) w[v] = 8;
	  var y = new n(32);
	  for (v = 0; v < 32; ++v) y[v] = 5;
	  var m = g(w, 9, 1),
	    b = g(y, 5, 1),
	    T = function T(t) {
	      for (var n = t[0], i = 1; i < t.length; ++i) t[i] > n && (n = t[i]);
	      return n;
	    },
	    E = function E(t, n, i) {
	      var e = n / 8 | 0;
	      return (t[e] | t[e + 1] << 8) >> (7 & n) & i;
	    },
	    k = function k(t, n) {
	      var i = n / 8 | 0;
	      return (t[i] | t[i + 1] << 8 | t[i + 2] << 16) >> (7 & n);
	    },
	    C = function C(t, r, a) {
	      (null == r || r < 0) && (r = 0), (null == a || a > t.length) && (a = t.length);
	      var s = new (2 === t.BYTES_PER_ELEMENT ? i : 4 === t.BYTES_PER_ELEMENT ? e : n)(a - r);
	      return s.set(t.subarray(r, a)), s;
	    };
	  t.FlateErrorCode = {
	    UnexpectedEOF: 0,
	    InvalidBlockType: 1,
	    InvalidLengthLiteral: 2,
	    InvalidDistance: 3,
	    StreamFinished: 4,
	    NoStreamHandler: 5,
	    InvalidHeader: 6,
	    NoCallback: 7,
	    InvalidUTF8: 8,
	    ExtraFieldTooLong: 9,
	    InvalidDate: 10,
	    FilenameTooLong: 11,
	    StreamFinishing: 12,
	    InvalidZipData: 13,
	    UnknownCompressionMethod: 14
	  };
	  var F = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", "invalid header", "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data", "determined by unknown compression method"],
	    S = function S(t, n, i) {
	      var e = new Error(n || F[t]);
	      if (e.code = t, !i) throw e;
	      return e;
	    },
	    x = function () {
	      function t(t) {
	        this.s = {}, this.p = new n(0), this.ondata = t;
	      }
	      return t.prototype.e = function (t) {
	        this.ondata || S(5), this.d && S(4);
	        var i = this.p.length,
	          e = new n(i + t.length);
	        e.set(this.p), e.set(t, i), this.p = e;
	      }, t.prototype.c = function (t) {
	        this.d = this.s.i = t || !1;
	        var i = this.s.b,
	          e = function (t, i, e) {
	            var r = t.length;
	            if (!r || e && e.f && !e.l) return i || new n(0);
	            var h = !i || e,
	              f = !e || e.i;
	            e || (e = {}), i || (i = new n(3 * r));
	            var p = function p(t) {
	                var e = i.length;
	                if (t > e) {
	                  var r = new n(Math.max(2 * e, t));
	                  r.set(i), i = r;
	                }
	              },
	              v = e.f || 0,
	              d = e.p || 0,
	              c = e.b || 0,
	              w = e.l,
	              y = e.d,
	              F = e.m,
	              x = e.n,
	              I = 8 * r;
	            do {
	              if (!w) {
	                v = E(t, d, 1);
	                var U = E(t, d + 1, 3);
	                if (d += 3, !U) {
	                  var D = 4 + ((d + 7) / 8 | 0),
	                    L = t[D - 4] | t[D - 3] << 8,
	                    z = D + L;
	                  if (z > r) {
	                    f && S(0);
	                    break;
	                  }
	                  h && p(c + L), i.set(t.subarray(D, z), c), e.b = c += L, e.p = d = 8 * z, e.f = v;
	                  continue;
	                }
	                if (1 === U) w = m, y = b, F = 9, x = 5;else if (2 === U) {
	                  var B = E(t, d, 31) + 257,
	                    M = E(t, d + 10, 15) + 4,
	                    N = B + E(t, d + 5, 31) + 1;
	                  d += 14;
	                  var _,
	                    A = new n(N),
	                    G = new n(19);
	                  for (_ = 0; _ < M; ++_) G[o[_]] = E(t, d + 3 * _, 7);
	                  d += 3 * M;
	                  var H = T(G),
	                    O = (1 << H) - 1,
	                    P = g(G, H, 1);
	                  for (_ = 0; _ < N;) {
	                    var R = P[E(t, d, O)];
	                    d += 15 & R;
	                    var Y = R >>> 4;
	                    if (Y < 16) A[_++] = Y;else {
	                      var Z = 0,
	                        j = 0;
	                      for (16 === Y ? (j = 3 + E(t, d, 3), d += 2, Z = A[_ - 1]) : 17 === Y ? (j = 3 + E(t, d, 7), d += 3) : 18 === Y && (j = 11 + E(t, d, 127), d += 7); j--;) A[_++] = Z;
	                    }
	                  }
	                  var q = A.subarray(0, B),
	                    J = A.subarray(B);
	                  F = T(q), x = T(J), w = g(q, F, 1), y = g(J, x, 1);
	                } else S(1);
	                if (d > I) {
	                  f && S(0);
	                  break;
	                }
	              }
	              h && p(c + 131072);
	              for (var K = (1 << F) - 1, Q = (1 << x) - 1, V = d;; V = d) {
	                var W = w[k(t, d) & K],
	                  X = W >>> 4;
	                if ((d += 15 & W) > I) {
	                  f && S(0);
	                  break;
	                }
	                if (W || S(2), X < 256) i[c++] = X;else {
	                  if (256 === X) {
	                    V = d, w = null;
	                    break;
	                  }
	                  var $ = X - 254;
	                  if (X > 264) {
	                    var tt = X - 257,
	                      nt = a[tt];
	                    $ = E(t, d, (1 << nt) - 1) + l[tt], d += nt;
	                  }
	                  var it = y[k(t, d) & Q],
	                    et = it >>> 4;
	                  it || S(3), d += 15 & it;
	                  var rt = u[et];
	                  if (et > 3) {
	                    var at = s[et];
	                    rt += k(t, d) & (1 << at) - 1, d += at;
	                  }
	                  if (d > I) {
	                    f && S(0);
	                    break;
	                  }
	                  h && p(c + 131072);
	                  for (var st = c + $; c < st; c += 4) i[c] = i[c - rt], i[c + 1] = i[c + 1 - rt], i[c + 2] = i[c + 2 - rt], i[c + 3] = i[c + 3 - rt];
	                  c = st;
	                }
	              }
	              e.l = w, e.p = V, e.b = c, e.f = v, w && (v = 1, e.m = F, e.d = y, e.n = x);
	            } while (!v);
	            return c === i.length ? i : C(i, 0, c);
	          }(this.p, this.o, this.s);
	        this.ondata(C(e, i, this.s.b), this.d), this.o = C(e, this.s.b - 32768), this.s.b = this.o.length, this.p = C(this.p, this.s.p / 8 | 0), this.s.p &= 7;
	      }, t.prototype.push = function (t, n) {
	        this.e(t), this.c(n);
	      }, t;
	    }();
	  t.Inflate = x;
	  var I = function () {
	    function t(t) {
	      this.ondata = t;
	    }
	    return t.prototype.push = function (t, n) {
	      this.ondata(t, n);
	    }, t;
	  }();
	  t.TextBytes = I;
	  var U = function () {
	    function t(t) {
	      this.v = 1, x.call(this, t);
	    }
	    return t.prototype.push = function (t, n) {
	      if (x.prototype.e.call(this, t), this.v) {
	        var i = this.p.length > 3 ? function (t) {
	          31 === t[0] && 139 === t[1] && 8 === t[2] || S(6, "invalid gzip data");
	          var n = t[3],
	            i = 10;
	          4 & n && (i += t[10] | 2 + (t[11] << 8));
	          for (var e = (n >> 3 & 1) + (n >> 4 & 1); e > 0;) e -= !t[i++];
	          return i + (2 & n);
	        }(this.p) : 4;
	        if (i >= this.p.length && !n) return;
	        this.p = this.p.subarray(i), this.v = 0;
	      }
	      n && (this.p.length < 8 && S(6, "invalid gzip data"), this.p = this.p.subarray(0, -8)), x.prototype.c.call(this, n);
	    }, t;
	  }();
	  t.Gunzip = U, t.Decompress = function () {
	    function t(t) {
	      this.G = U, this.I = x, this.T = I, this.ondata = t;
	    }
	    return t.prototype.push = function (t, i) {
	      if (this.ondata || S(5), this.s) this.s.push(t, i);else {
	        if (this.p && this.p.length) {
	          var e = new n(this.p.length + t.length);
	          e.set(this.p), e.set(t, this.p.length);
	        } else this.p = t;
	        if (this.p.length > 2) {
	          var r = this,
	            a = function a() {
	              r.ondata.apply(r, arguments);
	            };
	          this.s = 31 === this.p[0] && 139 === this.p[1] && 8 === this.p[2] ? new this.G(a) : new this.T(a), this.s.push(this.p, i), this.p = null;
	        }
	      }
	    }, t;
	  }();
	  var D = "undefined" != typeof TextDecoder && new TextDecoder(),
	    L = 0;
	  try {
	    D.decode(r, {
	      stream: !0
	    }), L = 1;
	  } catch (t) {}
	  return t.DecodeUTF8 = function () {
	    function t(t) {
	      this.ondata = t, L ? this.t = new TextDecoder() : this.p = r;
	    }
	    return t.prototype.push = function (t, i) {
	      if (this.ondata || S(5), i = !!i, this.t) return this.ondata(this.t.decode(t, {
	        stream: !0
	      }), i), void (i && (this.t.decode().length && S(8), this.t = null));
	      this.p || S(4);
	      var e = new n(this.p.length + t.length);
	      e.set(this.p), e.set(t, this.p.length);
	      var r = function (t) {
	          for (var n = "", i = 0;;) {
	            var e = t[i++],
	              r = (e > 127) + (e > 223) + (e > 239);
	            if (i + r > t.length) return [n, C(t, i - 1)];
	            r ? 3 === r ? (e = ((15 & e) << 18 | (63 & t[i++]) << 12 | (63 & t[i++]) << 6 | 63 & t[i++]) - 65536, n += String.fromCharCode(55296 | e >> 10, 56320 | 1023 & e)) : n += 1 & r ? String.fromCharCode((31 & e) << 6 | 63 & t[i++]) : String.fromCharCode((15 & e) << 12 | (63 & t[i++]) << 6 | 63 & t[i++]) : n += String.fromCharCode(e);
	          }
	        }(e),
	        a = r[0],
	        s = r[1];
	      i ? (s.length && S(8), this.p = null) : this.p = s, this.ondata(a, i);
	    }, t;
	  }(), t;
	}();

	var cur_time = 0;
	var channel = {};
	// Распаковываем по 32 КБ gzip, обычно при сжатии чанк по умолчанию 16 КБ, поэтому меньше нет смысла ставить.
	var maxChunkSize = 4 * 1024;
	var string_data = '';
	var percent = -1;
	var this_res = null;
	var load_end = false;
	var chunk_parse = false;
	var dcmpStrm = function dcmpStrm() {};
	var content_type = '';
	var cur_pos = 0;
	var content_length = 0;
	var listener = Lampa.Subscribe();
	function nextChunk() {
	  if (chunk_parse || this_res === null) return;
	  chunk_parse = true;
	  var len = this_res.responseText.length;
	  var maxPos = Math.min(cur_pos + maxChunkSize, len);
	  if (maxPos > cur_pos) {
	    var finish = load_end && maxPos === len;
	    dcmpStrm.push(str2ab(this_res.responseText.substring(cur_pos, maxPos)), finish);
	    cur_pos = maxPos;
	    percent = content_length ? cur_pos * 100 / content_length : load_end ? cur_pos * 100 / len : -1;
	    listener.send('percent', {
	      percent: percent
	    });
	    if (finish) {
	      parseFinish();
	      listener.send('end', {
	        time: unixtime() - cur_time,
	        channel: channel
	      });
	      channel = {};
	    }
	  }
	  chunk_parse = false;
	  requestFrame();
	}
	function parseChannel(attr, string) {
	  if (!attr['id']) return; // todo не парсить каналы которых нет в листе

	  string = string.replace(/\n/g, '');
	  var names = [];
	  var m_name = string.match(/<display-name[^>]+>(.*?)</g);
	  var m_icon = string.match(/<icon src="(.*?)"/);
	  if (m_name) {
	    names = m_name.map(function (n) {
	      return n.slice(0, -1).split('>')[1];
	    });
	  }
	  channel[attr.id] = {
	    id: attr.id,
	    names: names,
	    icon: m_icon ? m_icon[1] : '',
	    program: []
	  };
	  listener.send('channel', {
	    channel: channel[attr.id]
	  });
	}
	function parseProgramme(attr, string) {
	  if (!attr['channel'] || !attr['start'] || !attr['stop'] || !channel[attr.channel]) return;
	  var start = parseDate(attr.start);
	  var stop = parseDate(attr.stop);
	  string = string.replace(/\n/g, '');
	  var m_title = string.match(/<title\s+lang="ru">(.*?)</);
	  var m_category = string.match(/<category\s+lang="ru">(.*?)</);
	  var m_desc = string.match(/<desc\s+lang="ru">(.*?)</);
	  var m_icon = string.match(/<icon src="(.*?)"/);
	  if (!m_title) m_title = string.match(/<title[^>]+>(.*?)</);
	  if (!m_category) m_category = string.match(/<category[^>]+>(.*?)</);
	  if (!m_desc) m_desc = string.match(/<desc[^>]+>(.*?)</);
	  var title = m_title ? m_title[1] : '';
	  var category = m_category ? m_category[1] : '';
	  var desc = m_desc ? m_desc[1] : '';
	  var icon = m_icon ? m_icon[1] : '';
	  var prog = {
	    start: start * 1000,
	    stop: stop * 1000,
	    title: title,
	    category: category,
	    desc: desc,
	    icon: icon
	  };
	  listener.send('program', {
	    program: prog,
	    id: attr.channel,
	    channel: channel[attr.channel]
	  });
	}
	function parseDate(s) {
	  return Date.parse(s.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})\s+([+-]\d{2})(\d{2})$/, '$1-$2-$3T$4:$5:$6$7:$8')) / 1000;
	}
	function parseParams(s) {
	  var o = {},
	    m,
	    mm;
	  if (!!(m = s.match(/([^\s=]+)=((["'])(.*?)\3|\S+)/g))) {
	    for (var i = 0; i < m.length; i++) {
	      if (!!(mm = m[i].match(/([^\s=]+)=((["'])(.*?)\3|\S+)/))) {
	        o[mm[1].toLowerCase()] = mm[4] || mm[2];
	      }
	    }
	  }
	  return o;
	}
	function unixtime() {
	  return Math.floor(new Date().getTime() / 1000);
	}
	function str2ab(str) {
	  var buf = new ArrayBuffer(str.length),
	    bufView = new Uint8Array(buf),
	    i = 0;
	  for (; i < str.length; i++) bufView[i] = str.charCodeAt(i) & 0xff;
	  return bufView;
	}
	function parseFinish() {
	  //clearInterval(interval)

	  string_data = '';
	  percent = -1;
	  this_res = null;
	  load_end = false;
	  chunk_parse = false;
	  dcmpStrm = function dcmpStrm() {};
	  content_type = '';
	  cur_pos = 0;
	  content_length = 0;
	}
	function requestFrame() {
	  requestAnimationFrame(nextChunk);
	}
	function parseStart(url) {
	  parseFinish();
	  channel = {};
	  var chOrProgRegExp;
	  try {
	    chOrProgRegExp = new RegExp('\\s*<(programme|channel)(\\s+([^>]+)?)?>(.*?)<\\/\\1\\s*>\\s*', 'gs');
	  } catch (e) {
	    chOrProgRegExp = new RegExp('\\s*<(programme|channel)(\\s+([^>]+)?)?>((.|\\n)*?)<\\/\\1\\s*>\\s*', 'g');
	  }
	  cur_time = unixtime();
	  listener.send('start');
	  var xhr = new XMLHttpRequest();
	  var utfDecode = new UnpackStream.DecodeUTF8(function (data, final) {
	    string_data += data;
	    var lenStart = string_data.length;
	    string_data = string_data.replace(chOrProgRegExp, function (match, p1, p2, p3, p4) {
	      if (p1 === 'channel') parseChannel(parseParams(p3), p4);else parseProgramme(parseParams(p3), p4);
	      return '';
	    });
	    if (lenStart === string_data.length && lenStart > 204800) {
	      var text = 'Bad xml.gz file';
	      console.log('IPTV', text, string_data.substring(0, 4096) + '...');
	      if (!load_end) xhr.abort();
	      parseFinish();
	      listener.send('error', {
	        text: text
	      });
	    }
	  });
	  dcmpStrm = new UnpackStream.Decompress(function (chunk, final) {
	    utfDecode.push(chunk, final);
	  });
	  xhr.open('get', url);
	  xhr.responseType = 'text';
	  xhr.overrideMimeType('text\/plain; charset=x-user-defined');
	  xhr.onreadystatechange = function () {
	    if (xhr.readyState === 2) {
	      // получаем заголовки
	      content_type = xhr.getResponseHeader('content-type') || content_type;
	      content_length = xhr.getResponseHeader('content-length') || content_length;
	      console.log('IPTV', 'Content-Type', content_type);
	      console.log('IPTV', 'Content-Length', content_length);
	      requestFrame();
	      //interval = setInterval(nextChunk, intervalTime)
	    }
	  };
	  xhr.onload = xhr.onprogress = function (e) {
	    this_res = this;
	    load_end = e.type === 'load';
	  };
	  xhr.onerror = function () {
	    // происходит, только когда запрос совсем не получилось выполнить
	    parseFinish();
	    listener.send('error', {
	      text: 'Error connect (CORS or bad URL)'
	    });
	  };
	  xhr.onabort = function () {
	    parseFinish();
	    listener.send('error', {
	      text: 'Load abort'
	    });
	  };
	  xhr.ontimeout = function () {
	    parseFinish();
	    listener.send('error', {
	      text: 'Load timeout'
	    });
	  };
	  xhr.send();
	}
	var Parser = {
	  listener: listener,
	  start: parseStart
	};

	var Guide = /*#__PURE__*/function () {
	  function Guide() {
	    _classCallCheck(this, Guide);
	  }
	  return _createClass(Guide, null, [{
	    key: "init",
	    value: function init() {
	      var _this = this;
	      if (Lampa.Storage.field('iptv_guide_update_after_start')) this.update();
	      setInterval(function () {
	        var lastupdate = Lampa.Storage.get('iptv_guide_updated_status', '{}').time || 0;
	        if (Lampa.Storage.field('iptv_guide_interval') > 0 && lastupdate + 1000 * 60 * 60 * Lampa.Storage.field('iptv_guide_interval') < Date.now()) _this.update();
	      }, 1000 * 60);
	    }
	  }, {
	    key: "update",
	    value: function update(status_elem) {
	      var url = Lampa.Storage.get('iptv_guide_url');
	      if (Lampa.Storage.field('iptv_guide_custom') && url) {
	        if (!window.iptv_guide_update_process) {
	          window.iptv_guide_update_process = Parser.listener;
	          var last_id = -1;
	          var program = [];
	          Parser.listener.follow('program', function (data) {
	            if (last_id == data.id) program.push(data.program);else {
	              DB.rewriteData('epg', last_id, program).finally(function () {});
	              last_id = data.id;
	              program = [data.program];
	            }
	          });
	          Parser.listener.follow('channel', function (data) {
	            data.channel.names.forEach(function (name) {
	              DB.addData('epg_channels', name.toLowerCase(), {
	                id: data.channel.id,
	                ic: data.channel.icon
	              }).catch(function () {});
	            });
	          });
	          if (Lampa.Processing) {
	            Parser.listener.follow('percent', function (data) {
	              Lampa.Processing.push('iptv', data.percent);
	            });
	          }
	          Parser.listener.follow('end', function (data) {
	            program = [];
	            var count = Lampa.Arrays.getKeys(data.channel).length;
	            Lampa.Storage.set('iptv_guide_updated_status', {
	              type: 'finish',
	              channels: count,
	              time: Date.now()
	            });
	            Parser.listener.send('finish', {
	              count: count,
	              time: Date.now()
	            });
	            window.iptv_guide_update_process.destroy();
	            window.iptv_guide_update_process = false;
	          });
	          Parser.listener.follow('error', function (data) {
	            window.iptv_guide_update_process.destroy();
	            window.iptv_guide_update_process = false;
	            Lampa.Storage.set('iptv_guide_updated_status', {
	              type: 'error',
	              text: data.text,
	              time: Date.now()
	            });
	          });
	          if (DB.clearTable) {
	            DB.clearTable('epg').finally(function () {});
	            DB.clearTable('epg_channels').finally(function () {});
	          }
	          setTimeout(function () {
	            Parser.start(url);
	          }, 100);
	        }
	      } else if (status_elem) {
	        Lampa.Noty.show(Lampa.Lang.translate('iptv_guide_error_link'));
	      }
	    }
	  }]);
	}();

	function init$2() {
	  Lampa.Template.add('cub_iptv_content', "\n        <div class=\"iptv-content\">\n            <div class=\"iptv-content__menu\"></div>\n            <div class=\"iptv-content__channels\"></div>\n            <div class=\"iptv-content__details\"></div>\n        </div>\n    ");
	  Lampa.Template.add('cub_iptv_menu', "\n        <div class=\"iptv-menu\">\n            <div class=\"iptv-menu__body\">\n                <div class=\"iptv-menu__head\">\n                    <div class=\"iptv-menu__title\"></div>\n                    <div class=\"iptv-menu__search selector\">\n                        <svg width=\"23\" height=\"22\" viewBox=\"0 0 23 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <circle cx=\"9.9964\" cy=\"9.63489\" r=\"8.43556\" stroke=\"currentColor\" stroke-width=\"2.4\"></circle>\n                            <path d=\"M20.7768 20.4334L18.2135 17.8701\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"></path>\n                        </svg>\n                    </div>\n                </div>\n                <div class=\"iptv-menu__list\"></div>\n            </div>\n        </div>\n    ");
	  Lampa.Template.add('iptv_menu_mobile_button_search', "\n        <div class=\"iptv-menu__search-mobile selector\">\n            <svg width=\"23\" height=\"22\" viewBox=\"0 0 23 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <circle cx=\"9.9964\" cy=\"9.63489\" r=\"8.43556\" stroke=\"currentColor\" stroke-width=\"2.4\"></circle>\n                <path d=\"M20.7768 20.4334L18.2135 17.8701\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"></path>\n            </svg>\n        </div>\n    ");
	  Lampa.Template.add('cub_iptv_channels', "\n        <div class=\"iptv-channels\">\n            \n        </div>\n    ");
	  Lampa.Template.add('cub_iptv_details', "\n        <div class=\"iptv-details layer--wheight\">\n            <div class=\"iptv-details__play\"></div>\n            <div class=\"iptv-details__title\"></div>\n\n            <div class=\"iptv-details__program\">\n\n            </div>\n        </div>\n    ");
	  Lampa.Template.add('cub_iptv_details_empty', "\n        <div class=\"iptv-details-epmty endless endless-up\">\n            <div><span></span><span style=\"width: 60%\"></span></div>\n            <div><span></span><span style=\"width: 70%\"></span></div>\n            <div><span></span><span style=\"width: 40%\"></span></div>\n            <div><span></span><span style=\"width: 55%\"></span></div>\n            <div><span></span><span style=\"width: 30%\"></span></div>\n            <div><span></span><span style=\"width: 55%\"></span></div>\n            <div><span></span><span style=\"width: 30%\"></span></div>\n        </div>\n    ");
	  Lampa.Template.add('cub_iptv_playlist_item', "\n        <div class=\"iptv-playlist-item selector layer--visible layer--render\">\n            <div class=\"iptv-playlist-item__body\">\n                <div class=\"iptv-playlist-item__name\">\n                    <div class=\"iptv-playlist-item__name-ico\"><span></span></div>\n                    <div class=\"iptv-playlist-item__name-text\">est</div>\n                </div>\n                <div class=\"iptv-playlist-item__url\"></div>\n            </div>\n\n            <div class=\"iptv-playlist-item__footer hide\">\n                <div class=\"iptv-playlist-item__details details-left\"></div>\n                <div class=\"iptv-playlist-item__details details-right\"></div>\n            </div>\n        </div>\n    ");
	  Lampa.Template.add('cub_iptv_list_add_custom', "\n        <div class=\"iptv-playlist-item selector layer--visible\">\n            <div class=\"iptv-playlist-item__title\">\n                \n            </div>\n        </div>\n    ");
	  Lampa.Template.add('cub_iptv_list', "\n        <div class=\"iptv-list layer--wheight\">\n            <div class=\"iptv-list__ico\">\n                <svg height=\"36\" viewBox=\"0 0 38 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"2\" y=\"8\" width=\"34\" height=\"21\" rx=\"3\" stroke=\"white\" stroke-width=\"3\"/>\n                    <line x1=\"13.0925\" y1=\"2.34874\" x2=\"16.3487\" y2=\"6.90754\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                    <line x1=\"1.5\" y1=\"-1.5\" x2=\"9.31665\" y2=\"-1.5\" transform=\"matrix(-0.757816 0.652468 0.652468 0.757816 26.197 2)\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                    <line x1=\"9.5\" y1=\"34.5\" x2=\"29.5\" y2=\"34.5\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                </svg>\n            </div>\n            <div class=\"iptv-list__title\"></div>\n            <div class=\"iptv-list__text\"></div>\n            <div class=\"iptv-list__items\"></div>\n        </div>\n    ");
	  Lampa.Template.add('cub_iptv_list_empty', "\n        <div class=\"iptv-list-empty selector\">\n            <div class=\"iptv-list-empty__text\"></div>\n        </div>\n    ");
	  Lampa.Template.add('cub_iptv_param_lock', "\n        <div class=\"iptv-param-lock\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"512\" height=\"512\" viewBox=\"0 0 401.998 401.998\" xml:space=\"preserve\"><path d=\"M357.45 190.721c-5.331-5.33-11.8-7.993-19.417-7.993h-9.131v-54.821c0-35.022-12.559-65.093-37.685-90.218C266.093 12.563 236.025 0 200.998 0c-35.026 0-65.1 12.563-90.222 37.688-25.126 25.126-37.685 55.196-37.685 90.219v54.821h-9.135c-7.611 0-14.084 2.663-19.414 7.993-5.33 5.326-7.994 11.799-7.994 19.417V374.59c0 7.611 2.665 14.086 7.994 19.417 5.33 5.325 11.803 7.991 19.414 7.991H338.04c7.617 0 14.085-2.663 19.417-7.991 5.325-5.331 7.994-11.806 7.994-19.417V210.135c.004-7.612-2.669-14.084-8.001-19.414zm-83.363-7.993H127.909v-54.821c0-20.175 7.139-37.402 21.414-51.675 14.277-14.275 31.501-21.411 51.678-21.411 20.179 0 37.399 7.135 51.677 21.411 14.271 14.272 21.409 31.5 21.409 51.675v54.821z\" fill=\"currentColor\"></path></svg>\n        </div>\n    ");
	  Lampa.Template.add('cub_iptv_icon_favorite', "\n        <svg width=\"65\" height=\"87\" viewBox=\"0 0 65 87\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M36.1884 47.9221L32.5 42.6448L28.8116 47.9221L5.40983 81.4046C5.33938 81.5054 5.28461 81.5509 5.25807 81.5702C5.23028 81.5904 5.2049 81.6024 5.17705 81.611C5.11471 81.6301 4.99693 81.6414 4.84985 81.5951C4.70278 81.5488 4.61273 81.472 4.57257 81.4207C4.55463 81.3977 4.54075 81.3733 4.52953 81.3408C4.51882 81.3098 4.5 81.2411 4.5 81.1182V13C4.5 8.30558 8.30558 4.5 13 4.5H52C56.6944 4.5 60.5 8.30558 60.5 13V81.1182C60.5 81.2411 60.4812 81.3098 60.4705 81.3408C60.4593 81.3733 60.4454 81.3977 60.4274 81.4207C60.3873 81.472 60.2972 81.5488 60.1502 81.5951C60.0031 81.6414 59.8853 81.6301 59.8229 81.611C59.7951 81.6024 59.7697 81.5904 59.7419 81.5702C59.7154 81.5509 59.6606 81.5054 59.5902 81.4046L36.1884 47.9221Z\" stroke=\"currentColor\" stroke-width=\"9\"/>\n            <path class=\"active-layer\" d=\"M0 13C0 5.8203 5.8203 0 13 0H52C59.1797 0 65 5.8203 65 13V81.1182C65 86.0086 58.7033 87.9909 55.9018 83.9825L32.5 50.5L9.09823 83.9825C6.29666 87.9909 0 86.0086 0 81.1182V13Z\" fill=\"currentColor\"/>\n        </svg>\n    ");
	  Lampa.Template.add('cub_iptv_icon_lock', "\n        <svg width=\"420\" height=\"512\" viewBox=\"0 0 420 512\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M384.532 232.729C394.233 232.729 402.472 236.121 409.262 242.91C416.053 249.698 419.457 257.941 419.452 267.636V477.092C419.452 486.786 416.053 495.033 409.271 501.822C402.48 508.608 394.242 512 384.541 512H35.4568C25.7632 512 17.5189 508.604 10.7304 501.822C3.9432 495.033 0.54895 486.786 0.54895 477.092V267.64C0.54895 257.937 3.94192 249.693 10.7304 242.91C17.5189 236.121 25.7632 232.729 35.4568 232.729H47.0915V162.907C47.0915 118.301 63.0871 80.0023 95.0886 48.0009C127.085 16.0007 165.388 0 209.999 0C254.61 0 292.906 16.0007 324.905 48.0021C356.907 80.0023 372.902 118.302 372.902 162.907V232.729H384.532ZM116.91 162.907V232.729H303.088V162.907C303.088 137.212 293.996 115.269 275.82 97.092C257.635 78.9095 235.703 69.8221 210.003 69.8221C184.304 69.8221 162.367 78.9108 144.183 97.092C126.002 115.271 116.91 137.212 116.91 162.907ZM62 293C53.7157 293 47 299.716 47 308V445C47 453.284 53.7157 460 62 460H358C366.284 460 373 453.284 373 445V308C373 299.716 366.284 293 358 293H62Z\" fill=\"currentColor\"/>\n        <rect class=\"active-layer\" x=\"33\" y=\"275\" width=\"354\" height=\"203\" rx=\"15\" fill=\"currentColor\"/>\n        </svg>\n    ");
	  Lampa.Template.add('cub_iptv_icon_fav', "\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 512 512\" xml:space=\"preserve\">\n            <path fill=\"currentColor\" d=\"M391.416,0H120.584c-17.778,0-32.242,14.464-32.242,32.242v460.413c0,7.016,3.798,13.477,9.924,16.895\n            c2.934,1.638,6.178,2.45,9.421,2.45c3.534,0,7.055-0.961,10.169-2.882l138.182-85.312l138.163,84.693\n            c5.971,3.669,13.458,3.817,19.564,0.387c6.107-3.418,9.892-9.872,9.892-16.875V32.242C423.657,14.464,409.194,0,391.416,0z\n            M384.967,457.453l-118.85-72.86c-6.229-3.817-14.07-3.798-20.28,0.032l-118.805,73.35V38.69h257.935V457.453z\"></path>\n        </svg>\n    ");
	  Lampa.Template.add('cub_iptv_icon_all', "\n        <svg height=\"30\" viewBox=\"0 0 38 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect x=\"1.5\" y=\"1.5\" width=\"35\" height=\"27\" rx=\"1.5\" stroke=\"currentColor\" stroke-width=\"3\"></rect>\n            <rect x=\"6\" y=\"7\" width=\"25\" height=\"3\" fill=\"currentColor\"></rect>\n            <rect x=\"6\" y=\"13\" width=\"13\" height=\"3\" fill=\"currentColor\"></rect>\n            <rect x=\"6\" y=\"19\" width=\"19\" height=\"3\" fill=\"currentColor\"></rect>\n        </svg>\n    ");
	  Lampa.Template.add('cub_iptv_icon_group', "\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 512 512\" xml:space=\"preserve\">\n            <path fill=\"currentColor\" d=\"M478.354,146.286H33.646c-12.12,0-21.943,9.823-21.943,21.943v321.829c0,12.12,9.823,21.943,21.943,21.943h444.709\n                c12.12,0,21.943-9.823,21.943-21.943V168.229C500.297,156.109,490.474,146.286,478.354,146.286z M456.411,468.114H55.589V190.171\n                h400.823V468.114z\"></path>\n            <path fill=\"currentColor\" d=\"M441.783,73.143H70.217c-12.12,0-21.943,9.823-21.943,21.943c0,12.12,9.823,21.943,21.943,21.943h371.566\n                c12.12,0,21.943-9.823,21.943-21.943C463.726,82.966,453.903,73.143,441.783,73.143z\"></path>\n            <path fill=\"currentColor\" d=\"M405.211,0H106.789c-12.12,0-21.943,9.823-21.943,21.943c0,12.12,9.823,21.943,21.943,21.943h298.423\n                c12.12,0,21.943-9.823,21.943-21.943C427.154,9.823,417.331,0,405.211,0z\"></path>\n        </svg>\n    ");
	  Lampa.Template.add('cub_iptv_icon_searched', "\n        <svg height=\"34\" viewBox=\"0 0 28 34\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect x=\"1.5\" y=\"1.5\" width=\"25\" height=\"31\" rx=\"2.5\" stroke=\"currentColor\" stroke-width=\"3\"></rect>\n            <rect x=\"6\" y=\"7\" width=\"16\" height=\"3\" rx=\"1.5\" fill=\"currentColor\"></rect>\n            <rect x=\"6\" y=\"13\" width=\"16\" height=\"3\" rx=\"1.5\" fill=\"currentColor\"></rect>\n        </svg>\n    ");
	  Lampa.Template.add('cub_iptv_hud', "\n        <div class=\"iptv-hud\">\n            <div class=\"iptv-hud__content\">\n                <div class=\"iptv-hud__menu\"></div>\n                <div class=\"iptv-hud__program\"></div>\n            </div>\n        </div>\n    ");
	  Lampa.Template.add('cub_iptv_channel_main_board', "\n        <div class=\"iptv-channel iptv-channel--main selector layer--visible layer--render\">\n            <div class=\"iptv-channel__body\">\n                <img class=\"iptv-channel__ico\">\n            </div>\n        </div>\n    ");
	  Lampa.Template.add('settings_iptv_guide', "<div>\n        <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"iptv_guide_custom\" data-children=\"use_custom_guide\">\n            <div class=\"settings-param__name\">#{iptv_param_guide_custom_title}</div>\n            <div class=\"settings-param__value\"></div>\n            <div class=\"settings-param__descr\">#{iptv_param_guide_custom_descr}</div>\n        </div>\n        <div data-parent=\"use_custom_guide\">\n            <div class=\"settings-param selector\" data-type=\"input\" data-name=\"iptv_guide_url\" placeholder=\"#{torrent_parser_set_link}\">\n                <div class=\"settings-param__name\">#{settings_parser_jackett_link}</div>\n                <div class=\"settings-param__value\"></div>\n                <div class=\"settings-param__descr\">#{iptv_param_guide_url_descr}</div>\n            </div>\n            <div class=\"settings-param selector\" data-type=\"select\" data-name=\"iptv_guide_save\">\n                <div class=\"settings-param__name\">#{iptv_param_guide_save_title}</div>\n                <div class=\"settings-param__value\"></div>\n                <div class=\"settings-param__descr\">#{iptv_param_guide_save_descr}</div>\n            </div>\n            <div class=\"settings-param selector\" data-type=\"select\" data-name=\"iptv_guide_interval\">\n                <div class=\"settings-param__name\">#{iptv_param_guide_interval_title}</div>\n                <div class=\"settings-param__value\"></div>\n                <div class=\"settings-param__descr\">#{iptv_param_guide_interval_descr}</div>\n            </div>\n            <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"iptv_guide_update_after_start\">\n                <div class=\"settings-param__name\">#{iptv_param_guide_update_after_start}</div>\n                <div class=\"settings-param__value\"></div>\n            </div>\n            <div class=\"settings-param selector settings-param--button update-guide-now\" data-static=\"true\">\n                <div class=\"settings-param__name\">#{iptv_param_guide_update_now}</div>\n            </div>\n            <div class=\"settings-param update-guide-status\" data-static=\"true\">\n                <div class=\"settings-param__name\">#{iptv_guide_status_finish}</div>\n                <div class=\"settings-param__value\">#{iptv_guide_status_noupdates}</div>\n            </div>\n        </div>\n    </div>");
	  if (window.lampa_settings.iptv) {
	    Lampa.Template.add('about', "<div class=\"about\">\n            <div>#{iptv_about_text}</div>\n        \n            <div class=\"overhide\">\n                <div class=\"about__contacts\">\n                    <div>\n                        <small>#{about_channel}</small><br>\n                        @lampa_channel\n                    </div>\n        \n                    <div>\n                        <small>#{about_group}</small><br>\n                        @lampa_group\n                    </div>\n        \n                    <div>\n                        <small>#{about_version}</small><br>\n                        <span class=\"version_app\"></span>\n                    </div>\n        \n                    <div class=\"hide platform_android\">\n                        <small>#{about_version} Android APK</small><br>\n                        <span class=\"version_android\"></span>\n                    </div>\n                </div>\n            </div>\n        </div>");
	  }
	  Lampa.Template.add('cub_iptv_style', "\n        <style>\n        .iptv-list{padding:1.5em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding-bottom:1em}.iptv-list__ico{width:4.5em;margin-bottom:2em;height:4.5em}.iptv-list__ico>svg{width:4.5em;height:4.5em}.iptv-list__title{font-size:1.9em;margin-bottom:1em}.iptv-list__text{font-size:1.2em;line-height:1.4;margin-bottom:1em;text-align:center;width:60%;margin:0 auto;margin-bottom:2em}@media screen and (max-width:767px){.iptv-list__text{width:100%}}.iptv-list__items{width:80%;margin:0 auto}.iptv-list__items .scroll{height:22em}@media screen and (max-width:767px){.iptv-list__items{width:100%}}.iptv-list__item{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:1em;background-color:rgba(255,255,255,0.1);font-size:1.3em;line-height:1.3;-webkit-border-radius:.3em;border-radius:.3em;margin:1em}.iptv-list__item-name{width:40%;padding-right:1em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;text-align:left}.iptv-list__item-url{width:60%;padding-left:1em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;text-align:right}.iptv-list__item.focus{background-color:#fff;color:black}.iptv-playlist-item{padding:1em;background-color:rgba(255,255,255,0.1);line-height:1.3;margin:1em;-webkit-border-radius:1em;border-radius:1em;position:relative}.iptv-playlist-item__body{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.iptv-playlist-item__url{width:60%;padding-left:1em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;text-align:right}.iptv-playlist-item__title{text-align:center;padding:1em;font-size:1.3em}.iptv-playlist-item__name{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:40%}.iptv-playlist-item__name-ico{background-color:#fff;-webkit-border-radius:.5em;border-radius:.5em;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:.3em .5em;color:#000;min-width:2.3em;text-align:center}.iptv-playlist-item__name-ico>span{font-size:1.2em;font-weight:900}.iptv-playlist-item__name-text{font-weight:600;padding-left:1em}.iptv-playlist-item__footer{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin-top:1em;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}@media screen and (max-width:480px){.iptv-playlist-item__footer{display:block}}.iptv-playlist-item__details{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.iptv-playlist-item__details+div{margin-left:2em}@media screen and (max-width:480px){.iptv-playlist-item__details+div{margin-left:0;margin-top:1em}}.iptv-playlist-item__label{color:rgba(255,255,255,0.5)}.iptv-playlist-item__label>span{color:#fff}.iptv-playlist-item__label+.iptv-playlist-item__label:before{content:'|';display:inline-block;margin:0 1em;font-size:.7em;margin-top:-0.4em}.iptv-playlist-item.focus::after,.iptv-playlist-item.hover::after{content:'';position:absolute;top:-0.5em;left:-0.5em;right:-0.5em;bottom:-0.5em;border:.3em solid #fff;-webkit-border-radius:1.4em;border-radius:1.4em;z-index:-1;pointer-events:none}.iptv-content{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:0 1.5em;line-height:1.3}.iptv-content>div{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.iptv-content__menu{width:30%;padding-right:4em}@media screen and (max-width:900px){.iptv-content__menu{width:28%}}.iptv-content__channels{width:25%}@media screen and (max-width:900px){.iptv-content__channels{width:27%}}.iptv-content__details{width:45%;padding-left:4em}.iptv-menu__head{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin-bottom:2.4em;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start}.iptv-menu__search{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;padding:.5em;margin-top:.6em;margin-right:.6em}.iptv-menu__search>svg{width:1.5em !important;height:1.5em !important}.iptv-menu__search.focus{-webkit-border-radius:100%;border-radius:100%;background-color:#fff;color:#000}.iptv-menu__search-mobile{padding:.5em}.iptv-menu__search-mobile>svg{width:1.5em !important;height:1.5em !important}.iptv-menu__title{font-size:2.4em;font-weight:300;padding-right:1em;margin-right:auto}.iptv-menu__list-item{font-size:1.4em;font-weight:300;position:relative;padding:.5em .8em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;opacity:.6}.iptv-menu__list-item>div{word-break:break-all}.iptv-menu__list-item-icon{margin-right:.5em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.iptv-menu__list-item-icon>svg{width:1em !important;height:1em !important}.iptv-menu__list-item>span{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;padding-left:1em;margin-left:auto}.iptv-menu__list-item.active{color:#fff;background-color:rgba(255,255,255,0.1);-webkit-border-radius:.8em;border-radius:.8em;opacity:1}.iptv-menu__list-item.focus{color:#000;background-color:#fff;-webkit-border-radius:.8em;border-radius:.8em;opacity:1}.iptv-menu__list>div+div{margin-top:.3em}.iptv-channels{padding:1em;padding-left:5em}.iptv-channel{background-color:#464646;-webkit-border-radius:1em;border-radius:1em;padding-bottom:72%;position:relative}.iptv-channel__body{position:absolute;top:0;left:0;right:0;bottom:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:1em;text-align:center}.iptv-channel__ico{width:80%;opacity:0;max-height:100%}.iptv-channel__icons{position:absolute;top:.6em;right:.6em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.iptv-channel__icons>svg{width:1.2em !important;height:1.2em !important;margin-left:.5em}.iptv-channel__name{text-align:center;font-size:1.2em;overflow:hidden;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical;max-height:1.4em}.iptv-channel__simb{font-size:4em;font-weight:900;line-height:.7;margin-bottom:.4em}.iptv-channel__chn{position:absolute;top:50%;right:100%;margin-right:.5em;font-size:1.9em;font-weight:600;margin-top:-0.7em;opacity:.5}.iptv-channel.loaded .iptv-channel__ico{opacity:1}.iptv-channel.full--icon .iptv-channel__body{padding:0;overflow:hidden;-webkit-border-radius:1em;border-radius:1em}.iptv-channel.full--icon .iptv-channel__ico{max-width:105%;width:105%;height:105%}.iptv-channel.small--icon .iptv-channel__ico{width:6em;-webkit-border-radius:.7em;border-radius:.7em}.iptv-channel.favorite::after{content:'';position:absolute;top:.3em;right:.2em;background-image:url(./img/icons/menu/like.svg);background-repeat:no-repeat;background-position:50% 50%;background-size:55%;-webkit-border-radius:100%;border-radius:100%;width:1.8em;height:1.8em;margin-left:-0.9em}.iptv-channel.focus::before,.iptv-channel.active::before{content:'';position:absolute;top:-0.5em;left:-0.5em;right:-0.5em;bottom:-0.5em;border:.3em solid #fff;-webkit-border-radius:1.4em;border-radius:1.4em;opacity:.4}.iptv-channel.focus::before{opacity:1}.iptv-channel+.iptv-channel{margin-top:1em}.iptv-channel--main{width:12.75em;padding-bottom:0;height:9em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.iptv-channel--main+.iptv-channel{margin-top:0;margin-left:1em}.iptv-details{padding-top:3.5em;-webkit-mask-image:-webkit-gradient(linear,left top,left bottom,from(white),color-stop(92%,white),to(rgba(255,255,255,0)));-webkit-mask-image:-webkit-linear-gradient(top,white 0,white 92%,rgba(255,255,255,0) 100%);mask-image:-webkit-gradient(linear,left top,left bottom,from(white),color-stop(92%,white),to(rgba(255,255,255,0)));mask-image:linear-gradient(to bottom,white 0,white 92%,rgba(255,255,255,0) 100%)}.iptv-details__play{font-size:1.3em;margin-bottom:.5em}.iptv-details__play .lb{background:rgba(255,255,255,0.3);-webkit-border-radius:.2em;border-radius:.2em;padding:0 .4em;margin-right:.7em}.iptv-details__play span:last-child{opacity:.5}.iptv-details__title{font-size:3.3em;font-weight:700}.iptv-details__program{padding-top:3em}.iptv-details__list>div+div{margin-top:1.6em}.iptv-details-epmty>div{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.iptv-details-epmty>div span{background-color:rgba(255,255,255,0.18);-webkit-border-radius:.2em;border-radius:.2em;height:1em}.iptv-details-epmty>div span:first-child{width:8%;margin-right:3.2em}.iptv-details-epmty>div+div{margin-top:2em}.iptv-program{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;font-size:1.2em;font-weight:300;position:relative}.iptv-program-date{font-size:1.2em;padding-left:4.9em;margin-bottom:1em;opacity:.5}.iptv-program__head{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.iptv-program__head-body{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;padding-left:1em}.iptv-program__title{overflow:hidden;-o-text-overflow:'.';text-overflow:'.';display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical}.iptv-program__icon-wrap{width:35%;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;-webkit-border-radius:1em;border-radius:1em;background-color:#464646;position:relative;padding-bottom:25%}.iptv-program__icon-wrap.loaded .iptv-program__icon-img{opacity:1}.iptv-program__icon-img{width:100%;height:100%;position:absolute;top:0;left:0;opacity:0;-webkit-transition:opacity .1s;-o-transition:opacity .1s;transition:opacity .1s;-webkit-border-radius:1em;border-radius:1em}.iptv-program__time{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;width:5em;position:relative}.iptv-program__descr{opacity:.5;margin-top:.7em}.iptv-program__timeline{-webkit-border-radius:1em;border-radius:1em;background:rgba(255,255,255,0.1);margin-top:.9em}.iptv-program__timeline>div{height:.1em;-webkit-border-radius:1em;border-radius:1em;background:#fff;min-height:2px}.iptv-program__body{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1}.iptv-program.archive::after{content:'';position:absolute;top:.2em;left:3.1em;width:1em;height:1em;background:url('./img/icons/menu/time.svg') no-repeat 50% 50%;background-size:contain}.iptv-program.played::after{content:'';position:absolute;top:.2em;left:3.1em;width:1em;height:1em;background:url('./img/icons/player/play.svg') no-repeat 50% 50%;background-size:contain}.iptv-program.focus .iptv-program__time::after{content:'';position:absolute;top:0;width:2.4em;left:0;background-color:rgba(255,255,255,0.2);height:1.4em;-webkit-border-radius:.2em;border-radius:.2em}.iptv-hud{position:absolute;top:0;left:0;width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;line-height:1.3}.iptv-hud__content{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding-left:1.5em;padding-right:1.5em;padding-top:7em;padding-bottom:14em}.iptv-hud__menu,.iptv-hud__program{background-color:rgba(0,0,0,0.6);-webkit-border-radius:.5em;border-radius:.5em;padding:1em;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.iptv-hud__menu>div,.iptv-hud__program>div{width:100%;overflow:hidden}.iptv-hud__menu{width:22%;margin-right:1.5em}.iptv-hud__program{width:40%}.iptv-hud-menu-info{margin-bottom:1em}.iptv-hud-menu-info__group{opacity:.5}.iptv-hud-menu-info__name{line-height:1.6;font-size:1.8em}.iptv-hud-menu-button{padding:1em;-webkit-border-radius:.3em;border-radius:.3em;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;background-color:rgba(255,255,255,0.06)}.iptv-hud-menu-button__icon{margin-right:1em}.iptv-hud-menu-button__icon>svg{width:1.6em !important;height:1.6em !important}.iptv-hud-menu-button__icon .active-layer{opacity:0}.iptv-hud-menu-button__text{font-size:1.3em}.iptv-hud-menu-button.focus{background-color:#fff;color:#000}.iptv-hud-menu-button.active .active-layer{opacity:1}.iptv-hud-menu-button+.iptv-hud-menu-button{margin-top:.5em}.iptv-list-empty{border:.2em dashed rgba(255,255,255,0.5);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;height:12em;-webkit-border-radius:1em;border-radius:1em}.iptv-link{display:inline-block;padding:.1em .5em;-webkit-border-radius:.2em;border-radius:.2em;background-color:rgba(255,255,255,0.1)}.iptv-param-lock{position:absolute;top:50%;right:1.5em;margin-top:-1em;opacity:.5}.iptv-param-lock>svg{width:2em;height:2em}body.platform--orsay .iptv-menu__list-item{padding-right:2.7em}body.platform--orsay .iptv-menu__list-item>span{position:absolute;top:.5em;right:1em}body.light--version .iptv-content{font-size:.9em}body.light--version .iptv-channel{-webkit-border-radius:.3em;border-radius:.3em}body.light--version .iptv-channel::before{-webkit-border-radius:.6em;border-radius:.6em}.iptv-mobile .iptv-content{display:block;padding:0}.iptv-mobile .iptv-content__menu,.iptv-mobile .iptv-content__channels,.iptv-mobile .iptv-content__details{width:100%;padding:0}.iptv-mobile .iptv-menu__list{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.iptv-mobile .iptv-menu__list>div+div{margin:0;margin-left:.5em}.iptv-mobile .iptv-menu__list-item{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.iptv-mobile .iptv-menu__head{display:none}.iptv-mobile .iptv-channels{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:0}.iptv-mobile .iptv-channel{padding-bottom:0;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;width:14em;height:10em}@media screen and (max-width:400px){.iptv-mobile .iptv-channel{width:11em;height:8em}.iptv-mobile .iptv-channel .iptv-channel__simb{font-size:3.2em}}.iptv-mobile .iptv-channel__chn{display:none}.iptv-mobile .iptv-channel+.iptv-channel{margin:0;margin-left:1em}.iptv-mobile .iptv-content__details{padding:0 1.5em}.iptv-mobile .iptv-details{padding-top:0;height:48vh}@media screen and (max-width:500px){.iptv-mobile .iptv-details__title{font-size:2.5em}}body.platform--browser .iptv-hud__menu,body.platform--browser .iptv-hud__program,body.platform--nw .iptv-hud__menu,body.platform--nw .iptv-hud__program{background-color:rgba(0,0,0,0.3);-webkit-backdrop-filter:blur(1em);backdrop-filter:blur(1em)}body.glass--style-opacity--medium .iptv-hud__menu,body.glass--style-opacity--medium .iptv-hud__program{background-color:rgba(0,0,0,0.6)}body.glass--style-opacity--blacked .iptv-hud__menu,body.glass--style-opacity--blacked .iptv-hud__program{background-color:rgba(0,0,0,0.85)}\n        </style>\n    ");
	}
	var Templates = {
	  init: init$2
	};

	var uncurryThis$1 = functionUncurryThis;

	// `thisNumberValue` abstract operation
	// https://tc39.es/ecma262/#sec-thisnumbervalue
	var thisNumberValue$1 = uncurryThis$1(1.1.valueOf);

	var toIntegerOrInfinity$1 = toIntegerOrInfinity$a;
	var toString = toString$d;
	var requireObjectCoercible = requireObjectCoercible$b;

	var $RangeError$1 = RangeError;
	var floor$1 = Math.floor;

	// `String.prototype.repeat` method implementation
	// https://tc39.es/ecma262/#sec-string.prototype.repeat
	var stringRepeat = function repeat(count) {
	  var str = toString(requireObjectCoercible(this));
	  var result = '';
	  var n = toIntegerOrInfinity$1(count);
	  if (n < 0 || n === Infinity) throw new $RangeError$1('Wrong number of repetitions');
	  for (;n > 0; (n = floor$1(n / 2)) && (str += str)) if (n % 2) result += str;
	  return result;
	};

	var $$1 = _export;
	var uncurryThis = functionUncurryThis;
	var toIntegerOrInfinity = toIntegerOrInfinity$a;
	var thisNumberValue = thisNumberValue$1;
	var $repeat = stringRepeat;
	var fails = fails$G;

	var $RangeError = RangeError;
	var $String = String;
	var floor = Math.floor;
	var repeat = uncurryThis($repeat);
	var stringSlice = uncurryThis(''.slice);
	var nativeToFixed = uncurryThis(1.1.toFixed);

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
	    c2 = floor(c2 / 1e7);
	  }
	};

	var divide = function (data, n) {
	  var index = 6;
	  var c = 0;
	  while (--index >= 0) {
	    c += data[index];
	    data[index] = floor(c / n);
	    c = (c % n) * 1e7;
	  }
	};

	var dataToString = function (data) {
	  var index = 6;
	  var s = '';
	  while (--index >= 0) {
	    if (s !== '' || index === 0 || data[index] !== 0) {
	      var t = $String(data[index]);
	      s = s === '' ? t : s + repeat('0', 7 - t.length) + t;
	    }
	  } return s;
	};

	var FORCED = fails(function () {
	  return nativeToFixed(0.00008, 3) !== '0.000' ||
	    nativeToFixed(0.9, 0) !== '1' ||
	    nativeToFixed(1.255, 2) !== '1.25' ||
	    nativeToFixed(1000000000000000128.0, 0) !== '1000000000000000128';
	}) || !fails(function () {
	  // V8 ~ Android 4.3-
	  nativeToFixed({});
	});

	// `Number.prototype.toFixed` method
	// https://tc39.es/ecma262/#sec-number.prototype.tofixed
	$$1({ target: 'Number', proto: true, forced: FORCED }, {
	  toFixed: function toFixed(fractionDigits) {
	    var number = thisNumberValue(this);
	    var fractDigits = toIntegerOrInfinity(fractionDigits);
	    var data = [0, 0, 0, 0, 0, 0];
	    var sign = '';
	    var result = '0';
	    var e, z, j, k;

	    // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation
	    if (fractDigits < 0 || fractDigits > 20) throw new $RangeError('Incorrect fraction digits');
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (number !== number) return 'NaN';
	    if (number <= -1e21 || number >= 1e21) return $String(number);
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
	        : stringSlice(result, 0, k - fractDigits) + '.' + stringSlice(result, k - fractDigits));
	    } else {
	      result = sign + result;
	    } return result;
	  }
	});

	function init$1() {
	  Lampa.Params.trigger('iptv_guide_update_after_start', false);
	  Lampa.Params.trigger('iptv_guide_custom', false);
	  Lampa.Params.select('iptv_guide_url', '', '');
	  Lampa.Params.select('iptv_guide_interval', {
	    '0': '#{iptv_param_guide_update_custom}',
	    '1': '1',
	    '2': '2',
	    '3': '3',
	    '5': '5',
	    '8': '8',
	    '12': '12',
	    '18': '18',
	    '24': '24 / 1',
	    '48': '48 / 2',
	    '72': '72 / 3',
	    '96': '96 / 4',
	    '120': '120 / 5',
	    '144': '144 / 6',
	    '168': '168 / 7'
	  }, '24');
	  Lampa.Params.select('iptv_guide_save', {
	    '1': '1',
	    '2': '2',
	    '3': '3',
	    '4': '4',
	    '5': '5',
	    '6': '6',
	    '7': '7',
	    '14': '14'
	  }, '3');
	  Lampa.Settings.listener.follow('open', function (e) {
	    if (e.name == 'iptv') {
	      if (!Lampa.Account.hasPremium()) {
	        var body = e.body.find('.scroll__body > div');
	        var info = $("<div class=\"settings-param selector\" data-type=\"button\" data-static=\"true\">\n                    <div class=\"settings-param__name\">".concat(Lampa.Lang.translate('account_premium_more'), "</div>\n                    <div class=\"settings-param__descr\">").concat(Lampa.Lang.translate('iptv_premium'), "</div>\n                </div>"));
	        info.on('hover:enter', Lampa.Account.showCubPremium);
	        body.prepend('<div class="settings-param-title"><span>' + Lampa.Lang.translate('title_settings') + '</span></div>');
	        body.prepend(info);
	      }
	    }
	    if (e.name == 'iptv_guide') {
	      var status = e.body.find('.update-guide-status');
	      var parser = window.iptv_guide_update_process;
	      var listen = function listen() {
	        if (!parser) return;
	        parser.follow('start', function () {
	          status.find('.settings-param__name').text(Lampa.Lang.translate('iptv_guide_status_update'));
	          status.find('.settings-param__value').text(Lampa.Lang.translate('iptv_guide_status_parsing') + ' 0%');
	        });
	        parser.follow('percent', function (data) {
	          status.find('.settings-param__value').text(Lampa.Lang.translate('iptv_guide_status_parsing') + ' ' + data.percent.toFixed(2) + '%');
	        });
	        parser.follow('finish', function (data) {
	          status.find('.settings-param__name').text(Lampa.Lang.translate('iptv_guide_status_finish'));
	          status.find('.settings-param__value').text(Lampa.Lang.translate('iptv_guide_status_channels') + ' - ' + data.count + ', ' + Lampa.Lang.translate('iptv_guide_status_date') + ' - ' + Lampa.Utils.parseTime(data.time).briefly);
	        });
	        parser.follow('error', function (data) {
	          status.find('.settings-param__name').text(Lampa.Lang.translate('title_error'));
	          status.find('.settings-param__value').text(data.text);
	        });
	      };
	      e.body.find('.update-guide-now').on('hover:enter', function () {
	        if (window.iptv_guide_update_process) return Lampa.Noty.show(Lampa.Lang.translate('iptv_guide_status_update_wait'));
	        Guide.update(status);
	        parser = window.iptv_guide_update_process;
	        listen();
	      });
	      var last_status = Lampa.Storage.get('iptv_guide_updated_status', '{}');
	      if (last_status.type) {
	        if (last_status.type == 'error') {
	          status.find('.settings-param__name').text(Lampa.Lang.translate('title_error'));
	          status.find('.settings-param__value').text(last_status.text);
	        }
	        if (last_status.type == 'finish') {
	          status.find('.settings-param__value').text(Lampa.Lang.translate('iptv_guide_status_channels') + ' - ' + last_status.channels + ', ' + Lampa.Lang.translate('iptv_guide_status_date') + ' - ' + Lampa.Utils.parseTime(last_status.time).briefly);
	        }
	      }
	      if (parser) listen();
	    }
	  });
	  Lampa.SettingsApi.addComponent({
	    component: 'iptv',
	    icon: "<svg height=\"36\" viewBox=\"0 0 38 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect x=\"2\" y=\"8\" width=\"34\" height=\"21\" rx=\"3\" stroke=\"white\" stroke-width=\"3\"/>\n            <line x1=\"13.0925\" y1=\"2.34874\" x2=\"16.3487\" y2=\"6.90754\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n            <line x1=\"1.5\" y1=\"-1.5\" x2=\"9.31665\" y2=\"-1.5\" transform=\"matrix(-0.757816 0.652468 0.652468 0.757816 26.197 2)\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n            <line x1=\"9.5\" y1=\"34.5\" x2=\"29.5\" y2=\"34.5\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n        </svg>",
	    name: 'IPTV'
	  });
	  if (Lampa.Manifest.app_digital >= 200) {
	    Lampa.SettingsApi.addParam({
	      component: 'iptv',
	      param: {
	        type: 'button'
	      },
	      field: {
	        name: Lampa.Lang.translate('iptv_param_guide')
	      },
	      onChange: function onChange() {
	        Lampa.Settings.create('iptv_guide', {
	          onBack: function onBack() {
	            Lampa.Settings.create('iptv');
	          }
	        });
	      }
	    });
	  }
	  Lampa.SettingsApi.addParam({
	    component: 'iptv',
	    param: {
	      type: 'title'
	    },
	    field: {
	      name: Lampa.Lang.translate('more')
	    }
	  });
	  Lampa.SettingsApi.addParam({
	    component: 'iptv',
	    param: {
	      name: 'iptv_view_in_main',
	      type: 'trigger',
	      default: true
	    },
	    field: {
	      name: Lampa.Lang.translate('iptv_param_view_in_main')
	    }
	  });
	  Lampa.SettingsApi.addParam({
	    component: 'iptv',
	    param: {
	      name: 'iptv_use_db',
	      type: 'select',
	      values: {
	        indexdb: 'IndexedDB',
	        storage: 'LocalStorage'
	      },
	      default: 'indexdb'
	    },
	    field: {
	      name: Lampa.Lang.translate('iptv_param_use_db')
	    },
	    onChange: function onChange() {
	      Favorites.load().then(function () {
	        document.querySelectorAll('.iptv-playlist-item').forEach(function (element) {
	          Lampa.Utils.trigger(element, 'update');
	        });
	      });
	    }
	  });
	  Lampa.SettingsApi.addParam({
	    component: 'iptv',
	    param: {
	      name: 'iptv_favotite_save',
	      type: 'select',
	      values: {
	        url: '#{iptv_param_save_favorite_url}',
	        name: '#{iptv_param_save_favorite_name}'
	      },
	      default: 'url'
	    },
	    field: {
	      name: Lampa.Lang.translate('iptv_param_save_favorite')
	    }
	  });
	  Lampa.SettingsApi.addParam({
	    component: 'iptv',
	    param: {
	      name: 'iptv_favotite_sort',
	      type: 'select',
	      values: {
	        add: '#{iptv_param_sort_add}',
	        name: '#{iptv_param_sort_name}',
	        view: '#{iptv_param_sort_view}'
	      },
	      default: 'add'
	    },
	    field: {
	      name: Lampa.Lang.translate('iptv_param_sort_favorite')
	    },
	    onRender: function onRender(item) {
	      if (!Lampa.Account.hasPremium()) {
	        item.removeClass('selector');
	        item.append(Lampa.Template.get('cub_iptv_param_lock'));
	      }
	    },
	    onChange: function onChange() {}
	  });
	}
	var Settings = {
	  init: init$1
	};

	function init() {
	  var domain = Lampa.Manifest.cub_site || 'cub.rip';
	  Lampa.Lang.add({
	    iptv_noprogram: {
	      ru: 'Нет программы',
	      en: 'No program',
	      uk: 'Немає програми',
	      be: 'Няма праграмы',
	      zh: '没有节目',
	      pt: 'Nenhum programa',
	      bg: 'Няма програми'
	    },
	    iptv_noload_playlist: {
	      ru: 'К сожалению, загрузка плейлиста не удалась. Возможно, ваш провайдер заблокировал загрузку из внешних источников.',
	      en: 'Unfortunately, the playlist download failed. Your ISP may have blocked downloads from external sources.',
	      uk: 'На жаль, завантаження плейлиста не вдалося. Можливо, ваш провайдер заблокував завантаження із зовнішніх джерел.',
	      be: 'Нажаль, загрузка плэйліста не атрымалася. Магчыма, ваш правайдэр заблакаваў загрузку са знешніх крыніц.',
	      zh: '不幸的是，播放列表下载失败。 您的 ISP 可能已阻止从外部来源下载。',
	      pt: 'Infelizmente, o download da lista de reprodução falhou. Seu ISP pode ter bloqueado downloads de fontes externas.',
	      bg: 'За съжаление, свалянето на плейлистата се провали. Вашият доставчик може да блокира сваляне от външни източници.'
	    },
	    iptv_select_playlist: {
	      ru: 'Выберите плейлист',
	      en: 'Choose a playlist',
	      uk: 'Виберіть плейлист',
	      be: 'Выберыце плэйліст',
	      zh: '选择一个播放列表',
	      pt: 'Escolha uma lista de reprodução',
	      bg: 'Изберете плейлист'
	    },
	    iptv_all_channels: {
	      ru: 'Все каналы',
	      en: 'All channels',
	      uk: 'Усі канали',
	      be: 'Усе каналы',
	      zh: '所有频道',
	      pt: 'Todos os canais',
	      bg: 'Всички канали'
	    },
	    iptv_add_fav: {
	      ru: 'Добавить в избранное',
	      en: 'Add to favorites',
	      uk: 'Додати в обране',
	      be: 'Дадаць у абранае',
	      zh: '添加到收藏夹',
	      pt: 'Adicionar aos favoritos',
	      bg: 'Добави в избрани'
	    },
	    iptv_remove_fav: {
	      ru: 'Убрать из избранного',
	      en: 'Remove from favorites',
	      uk: 'Прибрати з вибраного',
	      be: 'Прыбраць з абранага',
	      zh: '从收藏夹中删除',
	      pt: 'Remover dos favoritos',
	      bg: 'Премахни от избрани'
	    },
	    iptv_playlist_empty: {
	      ru: 'К сожалению, на данный момент вы не добавили ни одного плейлиста. Чтобы начать просмотр контента, пожалуйста, перейдите на страницу <span class="iptv-link">' + domain + '/iptv</span> и добавьте хотя бы один плейлист.',
	      en: 'Sorry, you haven\'t added any playlist yet. To start watching content, please go to <span class="iptv-link">' + domain + '/iptv</span> and add at least one playlist.',
	      uk: 'На жаль, на даний момент ви не додали жодного плейлиста. Щоб розпочати перегляд контенту, будь ласка, перейдіть на сторінку <span class="iptv-link">' + domain + '/iptv</span> і додайте хоча б один плейлист.',
	      be: 'Нажаль, на дадзены момант вы не дадалі ніводнага плэйліста. Каб пачаць прагляд кантэнту, калі ласка, перайдзіце на старонку <span class="iptv-link">' + domain + '/iptv</span> і дадайце хаця б адзін плэйліст.',
	      zh: '抱歉，您还没有添加任何播放列表。 要开始观看内容，请转到 <span class="iptv-link">' + domain + '/iptv</span> 并添加至少一个播放列表。',
	      pt: 'Desculpe, você ainda não adicionou nenhuma lista de reprodução. Para começar a assistir o conteúdo, acesse <span class="iptv-link">' + domain + '/iptv</span> e adicione pelo menos uma lista de reprodução.',
	      bg: 'Съжалявам, още не сте добавили никаква листа. За да почнете да гледате, моля идете на <span class="iptv-link">' + domain + '/iptv</span> и добавете поне една листа.'
	    },
	    iptv_select_playlist_text: {
	      ru: 'Для того чтобы добавить свой плейлист, вам необходимо перейти на сайт <span class="iptv-link">' + domain + '/iptv</span> и добавить плейлист от вашего провайдера.',
	      en: 'In order to add your playlist, you need to go to <span class="iptv-link">' + domain + '/iptv</span> and add a playlist from your provider.',
	      uk: 'Щоб додати свій плейлист, вам необхідно перейти на сайт <span class="iptv-link">' + domain + '/iptv</span> і додати плейлист від вашого провайдера.',
	      be: 'Для таго каб дадаць свой плэйліст, вам неабходна перайсці на сайт <span class="iptv-link">' + domain + '/iptv</span> і дадаць плэйліст ад вашага правайдэра.',
	      zh: '要添加您的播放列表，您需要前往 <span class="iptv-link">' + domain + '/iptv</span> 并添加来自您的提供商的播放列表。',
	      pt: 'Para adicionar sua lista de reprodução, você precisa acessar <span class="iptv-link">' + domain + '/iptv</span> e adicionar uma lista de reprodução do seu provedor.',
	      bg: 'За да добавите ваша листа, трябва да отидете на <span class="iptv-link">' + domain + '/iptv</span> и да добавите листа от вашият доставчик на телевизия.'
	    },
	    iptv_updated: {
	      ru: 'Обновлено',
	      en: 'Updated',
	      uk: 'Оновлено',
	      be: 'Абноўлена',
	      zh: '更新',
	      pt: 'Atualizada',
	      bg: 'Обновено'
	    },
	    iptv_update: {
	      ru: 'Обновление',
	      en: 'Update',
	      uk: 'Оновлення',
	      be: 'Абнаўленне',
	      zh: '更新',
	      pt: 'Atualizar',
	      bg: 'Обновяване'
	    },
	    iptv_active: {
	      ru: 'Активно',
	      en: 'Actively',
	      uk: 'Активно',
	      be: 'Актыўна',
	      zh: '积极地',
	      pt: 'Ativamente',
	      bg: 'Активно'
	    },
	    iptv_yesterday: {
	      ru: 'Вчера',
	      en: 'Yesterday',
	      uk: 'Вчора',
	      be: 'Учора',
	      zh: '昨天',
	      pt: 'Ontem',
	      bg: 'Вчера'
	    },
	    iptv_today: {
	      ru: 'Сегодня',
	      en: 'Today',
	      uk: 'Сьогодні',
	      be: 'Сёння',
	      zh: '今天',
	      pt: 'Hoje',
	      bg: 'Днес'
	    },
	    iptv_tomorrow: {
	      ru: 'Завтра',
	      en: 'Tomorrow',
	      uk: 'Завтра',
	      be: 'Заўтра',
	      zh: '明天',
	      pt: 'Amanhã',
	      bg: 'Утре'
	    },
	    iptv_loading: {
	      ru: 'Метод загрузки',
	      en: 'Download method',
	      uk: 'Метод завантаження',
	      be: 'Метад загрузкі',
	      zh: '下载方式',
	      pt: 'Método de download',
	      bg: 'Метод на зареждане'
	    },
	    iptv_params_cub: {
	      ru: 'CUB',
	      en: 'CUB',
	      uk: 'CUB',
	      be: 'CUB',
	      zh: 'CUB',
	      pt: 'CUB',
	      bg: 'CUB'
	    },
	    iptv_params_lampa: {
	      ru: 'Lampa',
	      en: 'Lampa',
	      uk: 'Lampa',
	      be: 'Lampa',
	      zh: 'Lampa',
	      pt: 'Lampa',
	      bg: 'Lampa'
	    },
	    iptv_remove_cache: {
	      ru: 'Удалить кеш',
	      en: 'Delete cache',
	      uk: 'Видалити кеш',
	      be: 'Выдаліць кэш',
	      zh: '删除缓存',
	      pt: 'Excluir cache',
	      bg: 'Изтриване на кеш'
	    },
	    iptv_remove_cache_descr: {
	      ru: 'Удалить плейлист из кеша',
	      en: 'Delete playlist from cache',
	      uk: 'Видалити плейлист з кешу',
	      be: 'Выдаліць плэйліст з кэшу',
	      zh: '从缓存中删除播放列表',
	      pt: 'Excluir lista de reprodução do cache',
	      bg: 'Изтрий плейлиста от кеша'
	    },
	    iptv_params_always: {
	      ru: 'Всегда',
	      en: 'Always',
	      uk: 'Завжди',
	      be: 'Заўсёды',
	      zh: '总是',
	      pt: 'Sempre',
	      bg: 'Винаги'
	    },
	    iptv_params_hour: {
	      ru: 'Каждый час',
	      en: 'Each hour',
	      uk: 'Кожну годину',
	      be: 'Кожную гадзіну',
	      zh: '每小时',
	      pt: 'Cada hora',
	      bg: 'Всеки час'
	    },
	    iptv_params_hour12: {
	      ru: 'Каждые 12 часов',
	      en: 'Every 12 hours',
	      uk: 'Кожні 12 годин',
	      be: 'Кожныя 12 гадзін',
	      zh: '每12小时',
	      pt: 'A cada 12 horas',
	      bg: 'Всеки 12 часа'
	    },
	    iptv_params_day: {
	      ru: 'Ежедневно',
	      en: 'Daily',
	      uk: 'Щодня',
	      be: 'Штодня',
	      zh: '日常的',
	      pt: 'Diário',
	      bg: 'Ежедневно'
	    },
	    iptv_params_week: {
	      ru: 'Еженедельно',
	      en: 'Weekly',
	      uk: 'Щотижня',
	      be: 'Штотыдзень',
	      zh: '每周',
	      pt: 'Semanalmente',
	      bg: 'Седмично'
	    },
	    iptv_params_none: {
	      ru: 'Никогда',
	      en: 'Never',
	      uk: 'Ніколи',
	      be: 'Ніколі',
	      zh: '绝不',
	      pt: 'Nunca',
	      bg: 'Никога'
	    },
	    iptv_update_app_title: {
	      ru: 'Обновите приложение',
	      en: 'Update the app',
	      uk: 'Оновлення програми',
	      be: 'Абнавіце дадатак',
	      zh: '更新应用程序',
	      pt: 'Atualize o aplicativo',
	      bg: 'Обновни приложение'
	    },
	    iptv_update_app_text: {
	      ru: 'К сожалению, для работы плагина необходимо обновить вашу лампу путем ее перезагрузки. Она устарела и без этой процедуры плагин не будет функционировать.',
	      en: 'Unfortunately, for the plugin to work, you need to update your lamp by rebooting it. It is outdated and without this procedure the plugin will not function.',
	      uk: 'На жаль, для роботи плагіна необхідно оновити лампу шляхом її перезавантаження. Вона застаріла і без цієї процедури плагін не функціонуватиме.',
	      be: 'Нажаль, для працы плагіна неабходна абнавіць вашу лямпу шляхам яе перазагрузкі. Яна састарэлая і без гэтай працэдуры плягін не будзе функцыянаваць.',
	      zh: '不幸的是，要使插件正常工作，您需要通过重新启动来更新灯泡。 它已过时，如果没有此程序，插件将无法运行。',
	      pt: 'Infelizmente, para que o plug-in funcione, você precisa atualizar sua lâmpada reiniciando-a. Está desatualizado e sem este procedimento o plugin não funcionará.',
	      bg: 'За съжаление, за да работи добавка, трябва да обновите вашата Lampa и да я рестартирате. Приложението не е актуално и без тази процедура добавката не може да работи'
	    },
	    iptv_param_sort_add: {
	      ru: 'По добавлению',
	      en: 'By addition',
	      uk: 'За додаванням',
	      be: 'Па даданні',
	      zh: '按添加时间',
	      pt: 'Por adição',
	      bg: 'По добавяне'
	    },
	    iptv_param_sort_name: {
	      ru: 'По названию',
	      en: 'By name',
	      uk: 'За назвою',
	      be: 'Па назве',
	      zh: '按名称',
	      pt: 'Por nome',
	      bg: 'По име'
	    },
	    iptv_param_sort_view: {
	      ru: 'По просмотрам',
	      en: 'By views',
	      uk: 'За переглядами',
	      be: 'Па праглядах',
	      zh: '按观看次数',
	      pt: 'Por visualizações',
	      bg: 'По прегледи'
	    },
	    iptv_param_sort_favorite: {
	      ru: 'Сортировать избранное',
	      en: 'Sort by favorite',
	      uk: 'Сортувати в обраному',
	      be: 'Сартаваць па выбраным',
	      zh: '按收藏排序',
	      pt: 'Classificar por favoritos',
	      bg: 'Сортиране по избрани'
	    },
	    iptv_premium: {
	      ru: 'Доступ к некоторым функциям возможен только при наличии подписки <b>CUB Premium</b>',
	      en: 'Some features are only available with a <b>CUB Premium</b> subscription',
	      uk: 'Доступ до деяких функцій можливий лише за наявності передплати <b>CUB Premium</b>',
	      be: 'Доступ да некаторых функцый магчымы толькі пры наяўнасці падпіскі <b>CUB Premium</b>',
	      zh: '某些功能仅适用于 <b>CUB Premium</b> 订阅',
	      pt: 'Alguns recursos estão disponíveis apenas com uma assinatura <b>CUB Premium</b>',
	      bg: 'Достъпът до някои функции е наличен само чрез <b>CUB Premium</b> абонамент'
	    },
	    iptv_param_save_favorite: {
	      ru: 'Метод хранения избранного',
	      en: 'Favorite storage method',
	      uk: 'Спосіб зберігання обраного',
	      be: 'Метад захоўвання абранага',
	      zh: '收藏存储方法',
	      pt: 'Método de armazenamento favorito',
	      bg: 'Начин на сърханение на фаворити'
	    },
	    iptv_param_save_favorite_url: {
	      ru: 'По адресу канала',
	      en: 'By channel URL',
	      uk: 'За URL-адресою каналу',
	      be: 'Па URL-адрэсе канала',
	      zh: '按频道网址',
	      pt: 'Por URL do canal',
	      bg: 'По URL на канала'
	    },
	    iptv_param_save_favorite_name: {
	      ru: 'По названию канала',
	      en: 'By channel name',
	      uk: 'За назвою каналу',
	      be: 'Па назве канала',
	      zh: '按频道名称',
	      pt: 'Por nome do canal',
	      bg: 'По име на канала'
	    },
	    iptv_param_use_db: {
	      ru: 'Использовать базу данных',
	      en: 'Use database',
	      uk: 'Використовувати базу даних',
	      be: 'Выкарыстоўваць базу дадзеных',
	      zh: '使用数据库',
	      pt: 'Utilizar banco de dados',
	      bg: 'Използвайки база данни'
	    },
	    iptv_param_guide: {
	      ru: 'Телегид',
	      en: 'TV Guide',
	      uk: 'Телегід',
	      be: 'Тэлегід',
	      zh: '电视指南',
	      pt: 'Guia de TV',
	      bg: 'Телевизионен справочник'
	    },
	    iptv_search_no_result: {
	      ru: 'Нет результатов по запросу',
	      en: 'No results found',
	      uk: 'Немає результатів за запитом',
	      be: 'Няма вынікаў па запыце',
	      zh: '未找到结果',
	      pt: 'Nenhum resultado encontrado',
	      bg: 'Няма намерени резултати'
	    },
	    iptv_guide_status_update_wait: {
	      ru: 'Идет процесс обновления, подождите...',
	      en: 'Updating process in progress, please wait...',
	      uk: 'Йде процес оновлення, зачекайте...',
	      be: 'Ідзе працэс абнаўлення, калі ласка, пачакайце...',
	      zh: '更新过程正在进行，请稍等...',
	      pt: 'Processo de atualização em andamento, aguarde...',
	      bg: 'Процесът на актуализация е в ход, моля изчакайте...'
	    },
	    iptv_guide_status_update: {
	      ru: 'Идет обновление',
	      en: 'Update in progress',
	      uk: 'Йде оновлення',
	      be: 'Ідзе абнаўленне',
	      zh: '更新进行中',
	      pt: 'Atualização em andamento',
	      bg: 'Актуализация в ход'
	    },
	    iptv_guide_status_parsing: {
	      ru: 'Парсинг',
	      en: 'Parsing',
	      uk: 'Аналіз',
	      be: 'Аналіз',
	      zh: '解析中',
	      pt: 'Analisando',
	      bg: 'Анализ'
	    },
	    iptv_guide_status_finish: {
	      ru: 'Статус последнего обновления',
	      en: 'Status of the last update',
	      uk: 'Статус останнього оновлення',
	      be: 'Статус апошняга абнаўлення',
	      zh: '最后更新状态',
	      pt: 'Estado da última atualização',
	      bg: 'Състояние на последното обновление'
	    },
	    iptv_guide_status_channels: {
	      ru: 'Каналов',
	      en: 'Channels',
	      uk: 'Каналів',
	      be: 'Каналаў',
	      zh: '频道',
	      pt: 'Canais',
	      bg: 'Канали'
	    },
	    iptv_guide_status_date: {
	      ru: 'обновлено',
	      en: 'updated',
	      uk: 'оновлено',
	      be: 'абноўлена',
	      zh: '已更新',
	      pt: 'atualizado',
	      bg: 'обновено'
	    },
	    iptv_guide_status_noupdates: {
	      ru: 'Еще нет обновлений',
	      en: 'No updates yet',
	      uk: 'Ще немає оновлень',
	      be: 'Яшчэ няма абнаўленняў',
	      zh: '暂无更新',
	      pt: 'Ainda sem atualizações',
	      bg: 'Все още няма актуализации'
	    },
	    iptv_guide_error_link: {
	      ru: 'Укажите ссылку на телегид',
	      en: 'Specify the TV guide link',
	      uk: 'Вкажіть посилання на телегід',
	      be: 'Пакажыце спасылку на тэлегід',
	      zh: '请指定电视指南链接',
	      pt: 'Indique o link do guia de TV',
	      bg: 'Посочете връзката към телегида'
	    },
	    iptv_param_guide_custom_title: {
	      ru: 'Использовать свою ссылку',
	      en: 'Use your own link',
	      uk: 'Використовуйте своє посилання',
	      be: 'Выкарыстоўвайце сваю спасылку',
	      zh: '使用您自己的链接',
	      pt: 'Use seu próprio link',
	      bg: 'Използвайте своята връзка'
	    },
	    iptv_param_guide_custom_descr: {
	      ru: 'Укажите свою ссылку на телегид, если не хотите использовать телегид от CUB',
	      en: 'Specify your TV guide link if you do not want to use the CUB TV guide',
	      uk: 'Вкажіть своє посилання на телегід, якщо ви не хочете використовувати телегід від CUB',
	      be: 'Пакажыце сваю спасылку на тэлегід, калі вы не хочаце выкарыстоўваць тэлегід ад CUB',
	      zh: '如果您不想使用CUB电视指南，请指定您的电视指南链接',
	      pt: 'Especifique seu link do guia de TV se não quiser usar o guia de TV da CUB',
	      bg: 'Уточнете своята връзка към телегида, ако не искате да използвате този на CUB'
	    },
	    iptv_param_guide_url_descr: {
	      ru: 'Укажите свою ссылку на телегид EPG',
	      en: 'Specify your EPG TV guide link',
	      uk: 'Вкажіть своє посилання на телегід EPG',
	      be: 'Пакажыце сваю спасылку на тэлегід EPG',
	      zh: '请指定您的电视指南EPG链接',
	      pt: 'Especifique seu link do guia de TV EPG',
	      bg: 'Уточнете своята връзка към телегида EPG'
	    },
	    iptv_param_guide_interval_title: {
	      ru: 'Интервал обновления',
	      en: 'Update Interval',
	      uk: 'Інтервал оновлення',
	      be: 'Інтэрвал абнаўлення',
	      zh: '更新间隔',
	      pt: 'Intervalo de atualização',
	      bg: 'Интервал за актуализация'
	    },
	    iptv_param_guide_interval_descr: {
	      ru: 'Через сколько часов обновлять телегид',
	      en: 'How many hours to update the TV guide',
	      uk: 'Через скільки годин оновлювати телегід',
	      be: 'Праз колькі гадзін абнаўляць тэлегід',
	      zh: '多少小时更新电视指南',
	      pt: 'Quantas horas para atualizar o guia de TV',
	      bg: 'През колко часа да актуализира телевизионния справочник'
	    },
	    iptv_param_guide_update_after_start: {
	      ru: 'Обновить при запуске приложения',
	      en: 'Update on application startup',
	      uk: 'Оновити при запуску додатка',
	      be: 'Абнавіць пры запуску прыкладання',
	      zh: '启动应用时更新',
	      pt: 'Atualizar ao iniciar o aplicativo',
	      bg: 'Актуализация при стартиране на приложението'
	    },
	    iptv_param_guide_update_now: {
	      ru: 'Обновить телегид',
	      en: 'Update TV Guide Now',
	      uk: 'Оновити телегід зараз',
	      be: 'Абнавіць тэлегід зараз',
	      zh: '立即更新电视指南',
	      pt: 'Atualizar guia de TV agora',
	      bg: 'Актуализирайте телевизионния справочник сега'
	    },
	    iptv_param_guide_save_title: {
	      ru: 'Число дней хранения',
	      en: 'Number of Days to Keep',
	      uk: 'Кількість днів зберігання',
	      be: 'Колькасць дзён захоўвання',
	      zh: '保存天数',
	      pt: 'Número de dias para manter',
	      bg: 'Брой дни за запазване'
	    },
	    iptv_param_guide_save_descr: {
	      ru: 'Сколько дней хранить телегид в кэше',
	      en: 'How many days to keep the TV guide in the cache',
	      uk: 'Скільки днів зберігати телегід у кеші',
	      be: 'Колькі дзён захоўваць тэлегід у кэшы',
	      zh: '在缓存中保存多少天的电视指南',
	      pt: 'Quantos dias manter o guia de TV no cache',
	      bg: 'За колко дни да се запази телевизионния справочник в кеша'
	    },
	    iptv_param_guide_update_custom: {
	      ru: 'Вручную',
	      en: 'Manual',
	      uk: 'Вручну',
	      be: 'Адзіначку',
	      zh: '手动',
	      pt: 'Manual',
	      bg: 'Ръчно'
	    },
	    iptv_need_update_app: {
	      ru: 'Обновите приложение до последней версии',
	      en: 'Update the application to the latest version',
	      uk: 'Оновіть програму до останньої версії',
	      be: 'Абновіце прыкладанне да апошняй версіі',
	      zh: '升级应用程序到最新版本',
	      pt: 'Atualize o aplicativo para a versão mais recente',
	      bg: 'Актуализирайте приложението до последната версия'
	    },
	    iptv_channel_lock: {
	      ru: 'Заблокировать',
	      en: 'Lock',
	      uk: 'Заблокувати',
	      be: 'Заблакаваць',
	      zh: '锁定',
	      pt: 'Bloquear',
	      bg: 'Заключване'
	    },
	    iptv_channel_unlock: {
	      ru: 'Разблокировать',
	      en: 'Unlock',
	      uk: 'Розблокувати',
	      be: 'Разблакаваць',
	      zh: '解锁',
	      pt: 'Desbloquear',
	      bg: 'Отключване'
	    },
	    iptv_about_text: {
	      ru: 'Удобное приложение IPTV – откройте доступ к множеству каналов, фильмам и сериалам прямо на вашем телевизоре. Интуитивный интерфейс, легкая навигация, и безграничные возможности развлечений на вашем большом экране. Ваш личный портал в мир цифрового телевидения!',
	      en: 'Convenient IPTV application - access a variety of channels, movies, and series directly on your television. Intuitive interface, easy navigation, and unlimited entertainment possibilities on your big screen. Your personal portal to the world of digital television!',
	      uk: 'Зручний додаток IPTV - отримайте доступ до безлічі каналів, фільмів і серіалів прямо на вашому телевізорі. Інтуїтивний інтерфейс, легка навігація та необмежені можливості розваг на вашому великому екрані. Ваш особистий портал у світ цифрового телебачення!',
	      be: 'Зручнае прыкладанне IPTV - атрымайце доступ да шматліканальнага тэлебачання, фільмаў і серыялаў проста на вашым тэлевізары. Інтуітыўны інтэрфейс, лёгкая навігацыя і неабмежаваныя магчымасці разваг на вашым вялікім экране. Ваш асабісты партал у свет цыфравага тэлебачання!',
	      zh: '方便的IPTV应用程序-直接在您的电视上访问各种频道，电影和系列。直观的界面，简单的导航以及在您的大屏幕上无限的娱乐可能性。您数字电视世界的个人门户！',
	      pt: 'Aplicativo IPTV conveniente - acesse uma variedade de canais, filmes e séries diretamente na sua televisão. Interface intuitiva, navegação fácil e possibilidades de entretenimento ilimitadas na sua tela grande. Seu portal pessoal para o mundo da televisão digital!',
	      bg: 'Удобно приложение за IPTV - отворете достъп до множество канали, филми и сериали директно на вашия телевизор. Интуитивен интерфейс, лесна навигация и неограничени възможности за забавления на големия ви екран. Вашият личен портал към света на цифровата телевизия!'
	    },
	    iptv_confirm_delete_playlist: {
	      ru: 'Вы точно хотите удалить плейлист?',
	      en: 'Are you sure you want to delete the playlist?',
	      uk: 'Ви точно хочете видалити плейлист?',
	      be: 'Вы ўпэўненыя, што хочаце выдаліць плейліст?',
	      zh: '您确定要删除播放列表吗？',
	      pt: 'Tem certeza de que deseja excluir a lista de reprodução?',
	      bg: 'Сигурни ли сте, че искате да изтриете списъка с канали?'
	    },
	    iptv_cache_clear: {
	      ru: 'Кеш удален',
	      en: 'Cache cleared',
	      uk: 'Кеш видалено',
	      be: 'Кеш выдалены',
	      zh: '缓存已清除',
	      pt: 'Cache limpo',
	      bg: 'Кешът е изчистен'
	    },
	    iptv_playlist_deleted: {
	      ru: 'Плейлист удален',
	      en: 'Playlist deleted',
	      uk: 'Плейлист видалено',
	      be: 'Плейліст выдалены',
	      zh: '播放列表已删除',
	      pt: 'Lista de reprodução excluída',
	      bg: 'Плейлистът е изтрит'
	    },
	    iptv_playlist_add_set_url: {
	      ru: 'Укажите URL плейлиста',
	      en: 'Enter the playlist URL',
	      uk: 'Вкажіть URL плейлиста',
	      be: 'Укажыце URL плейліста',
	      zh: '请输入播放列表的 URL',
	      pt: 'Insira o URL da lista de reprodução',
	      bg: 'Въведете URL адреса на плейлиста'
	    },
	    iptv_playlist_add_new: {
	      ru: 'Добавить новый плейлист',
	      en: 'Add new playlist',
	      uk: 'Додати новий плейлист',
	      be: 'Дадаць новы плейліст',
	      zh: '添加新播放列表',
	      pt: 'Adicionar nova lista de reprodução',
	      bg: 'Добавяне на нов списък с канали'
	    },
	    iptv_playlist_url_changed: {
	      ru: 'Ссылка изменена',
	      en: 'Link changed',
	      uk: 'Посилання змінено',
	      be: 'Спасылка зменена',
	      zh: '链接已更改',
	      pt: 'Link alterado',
	      bg: 'Връзката е променена'
	    },
	    iptv_playlist_add_set_name: {
	      ru: 'Укажите название плейлиста',
	      en: 'Enter the playlist name',
	      uk: 'Вкажіть назву плейлиста',
	      be: 'Укажыце назву плейліста',
	      zh: '请输入播放列表名称',
	      pt: 'Insira o nome da lista de reprodução',
	      bg: 'Въведете име на плейлиста'
	    },
	    iptv_playlist_name_changed: {
	      ru: 'Название изменено',
	      en: 'Name changed',
	      uk: 'Назва змінена',
	      be: 'Назва зменена',
	      zh: '名称已更改',
	      pt: 'Nome alterado',
	      bg: 'Името е променено'
	    },
	    iptv_playlist_change_name: {
	      ru: 'Изменить название',
	      en: 'Change name',
	      uk: 'Змінити назву',
	      be: 'Змяніць назву',
	      zh: '更改名称',
	      pt: 'Alterar nome',
	      bg: 'Промяна на името'
	    },
	    iptv_param_view_in_main: {
	      ru: 'Показывать каналы на главной',
	      en: 'Show channels on main page',
	      uk: 'Показувати канали на головній',
	      be: 'Паказваць каналы на галоўнай',
	      zh: '在主页上显示频道',
	      pt: 'Mostrar canais na página principal',
	      bg: 'Показване на канали на главната страница'
	    }
	  });
	}
	var Lang$1 = {
	  init: init
	};

	var Channel = /*#__PURE__*/function () {
	  function Channel(data, playlist) {
	    _classCallCheck(this, Channel);
	    this.data = data;
	    this.playlist = playlist;
	  }

	  /**
	   * Загрузить шаблон
	   */
	  return _createClass(Channel, [{
	    key: "build",
	    value: function build() {
	      this.card = Lampa.Template.js('cub_iptv_channel_main_board');
	      this.icon = this.card.querySelector('.iptv-channel__ico') || {};
	      this.card.addEventListener('visible', this.visible.bind(this));
	    }

	    /**
	     * Загрузить картинку
	     */
	  }, {
	    key: "image",
	    value: function image() {
	      var _this = this;
	      this.icon.onload = function () {
	        _this.card.classList.add('loaded');
	        if (_this.data.logo.indexOf('epg.it999') == -1) {
	          _this.card.addClass('small--icon');
	        }
	      };
	      this.icon.onerror = function () {
	        var simb = document.createElement('div');
	        simb.addClass('iptv-channel__simb');
	        simb.text(_this.data.name.length <= 3 ? _this.data.name.toUpperCase() : _this.data.name.replace(/[^a-z|а-я|0-9]/gi, '').toUpperCase()[0]);
	        var text = document.createElement('div');
	        text.addClass('iptv-channel__name');
	        text.text(Utils.clear(_this.data.name));
	        _this.card.querySelector('.iptv-channel__body').append(simb);
	        _this.card.querySelector('.iptv-channel__body').append(text);
	      };
	    }

	    /**
	     * Создать
	     */
	  }, {
	    key: "create",
	    value: function create() {
	      var _this2 = this;
	      this.build();
	      this.card.addEventListener('hover:focus', function () {
	        if (_this2.onFocus) _this2.onFocus(_this2.card, _this2.data);
	      });
	      this.card.addEventListener('hover:hover', function () {
	        if (_this2.onHover) _this2.onHover(_this2.card, _this2.data);
	      });
	      this.card.addEventListener('hover:enter', function () {
	        var play = {
	          title: _this2.data.name || '',
	          url: _this2.data.url,
	          tv: true
	        };
	        Lampa.Player.runas(Lampa.Storage.field('player_iptv'));
	        Lampa.Player.play(play);
	        Lampa.Player.playlist(_this2.playlist.map(function (a) {
	          return {
	            title: a.name,
	            url: a.url,
	            tv: true
	          };
	        }));
	      });
	      this.image();
	    }
	  }, {
	    key: "emit",
	    value: function emit() {}
	  }, {
	    key: "use",
	    value: function use() {}

	    /**
	     * Загружать картинку если видна карточка
	     */
	  }, {
	    key: "visible",
	    value: function visible() {
	      if (this.data.logo) this.icon.src = this.data.logo;else this.icon.onerror();
	      if (this.onVisible) this.onVisible(this.card, this.data);
	    }

	    /**
	     * Уничтожить
	     */
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.icon.onerror = function () {};
	      this.icon.onload = function () {};
	      this.icon.src = '';
	      this.card.remove();
	      this.card = null;
	      this.icon = null;
	    }

	    /**
	     * Рендер
	     * @returns {object}
	     */
	  }, {
	    key: "render",
	    value: function render(js) {
	      return js ? this.card : $(this.card);
	    }
	  }]);
	}();

	function startPlugin() {
	  window.plugin_iptv_ready = true;
	  var manifest = {
	    type: 'video',
	    version: '1.2.8',
	    name: 'IPTV',
	    description: '',
	    component: 'iptv',
	    onMain: function onMain(data) {
	      if (!Lampa.Storage.field('iptv_view_in_main')) return {
	        results: []
	      };
	      var playlist = Lampa.Arrays.clone(Lampa.Storage.get('iptv_play_history_main_board', '[]')).reverse();
	      return {
	        results: playlist,
	        title: Lampa.Lang.translate('title_continue'),
	        nomore: true,
	        line_type: 'iptv',
	        cardClass: function cardClass(item) {
	          return new Channel(item, playlist);
	        }
	      };
	    }
	  };
	  Lampa.Manifest.plugins = manifest;
	  if (Lampa.Manifest.app_digital >= 300) {
	    Lampa.ContentRows.add({
	      index: 1,
	      screen: ['main'],
	      call: function call(params, screen) {
	        if (!Lampa.Storage.field('iptv_view_in_main')) return;
	        var playlist = Lampa.Arrays.clone(Lampa.Storage.get('iptv_play_history_main_board', '[]')).reverse();

	        // возвращаем функцию с коллбеком
	        return function (call) {
	          playlist.forEach(function (item) {
	            item.params = {
	              createInstance: function createInstance(item) {
	                return new Channel(item, playlist);
	              }
	            };
	          });
	          call({
	            results: playlist,
	            title: Lampa.Lang.translate('title_continue')
	          });
	        };
	      }
	    });
	  }
	  function add() {
	    var button = $("<li class=\"menu__item selector\">\n            <div class=\"menu__ico\">\n                <svg height=\"36\" viewBox=\"0 0 38 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"2\" y=\"8\" width=\"34\" height=\"21\" rx=\"3\" stroke=\"currentColor\" stroke-width=\"3\"/>\n                    <line x1=\"13.0925\" y1=\"2.34874\" x2=\"16.3487\" y2=\"6.90754\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                    <line x1=\"1.5\" y1=\"-1.5\" x2=\"9.31665\" y2=\"-1.5\" transform=\"matrix(-0.757816 0.652468 0.652468 0.757816 26.197 2)\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                    <line x1=\"9.5\" y1=\"34.5\" x2=\"29.5\" y2=\"34.5\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                </svg>\n            </div>\n            <div class=\"menu__text\">".concat(window.lampa_settings.iptv ? Lampa.Lang.translate('player_playlist') : 'IPTV', "</div>\n        </li>"));
	    button.on('hover:enter', function () {
	      if (window.lampa_settings.iptv) {
	        if (Lampa.Activity.active().component == 'iptv') return Lampa.Activity.active().activity.component.playlist();
	      }
	      Lampa.Activity.push({
	        url: '',
	        title: 'IPTV',
	        component: 'iptv',
	        page: 1
	      });
	    });
	    $('.menu .menu__list').eq(0).append(button);
	    $('body').append(Lampa.Template.get('cub_iptv_style', {}, true));
	    if (window.lampa_settings.iptv) {
	      $('.head .head__action.open--search').addClass('hide');
	      $('.head .head__action.open--premium').remove();
	      $('.head .head__action.open--feed').remove();
	      $('.navigation-bar__body [data-action="main"]').unbind().on('click', function () {
	        Lampa.Activity.active().activity.component.playlist();
	      });
	      $('.navigation-bar__body [data-action="search"]').addClass('hide');
	    }
	  }
	  Lang$1.init();
	  Templates.init();
	  Settings.init();
	  EPG.init();
	  Guide.init();
	  Lampa.Component.add('iptv', Component);
	  if (window.lampa_settings.iptv) {
	    Lampa.Storage.set('start_page', 'last');
	    window.start_deep_link = {
	      component: 'iptv'
	    };
	  }
	  if (window.appready) add();else {
	    Lampa.Listener.follow('app', function (e) {
	      if (e.type == 'ready') add();
	    });
	  }
	}
	if (!window.plugin_iptv_ready) startPlugin();

})();
