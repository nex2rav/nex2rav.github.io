(function () {
    'use strict';

    var garland = "\n    <svg width=\"83\" height=\"80\" viewBox=\"0 0 83 80\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <g id=\"wires\">\n            <path d=\"M51.6715 45.0593C51.3141 45.0593 50.9713 44.8993 50.7186 44.6146C50.4658 44.3299 50.3238 43.9438 50.3238 43.5412V1.9515C50.3238 1.11309 50.9271 0.433373 51.6715 0.433373C52.4159 0.433373 53.0192 1.11309 53.0192 1.9515V43.5412C53.0192 43.9438 52.8772 44.3299 52.6244 44.6146C52.3717 44.8993 52.0289 45.0593 51.6715 45.0593ZM30.8145 66.3189C30.457 66.3189 30.1143 66.1589 29.8615 65.8742C29.6088 65.5895 29.4668 65.2034 29.4668 64.8007V1.51812C29.4668 0.679714 30.07 0 30.8145 0C31.5589 0 32.1621 0.679714 32.1621 1.51812V64.8007C32.1621 65.2034 32.0201 65.5895 31.7674 65.8742C31.5147 66.1589 31.1719 66.3189 30.8145 66.3189Z\" fill=\"#4B4B4B\"/>\n            <path  d=\"M10.0703 28.3126C9.71289 28.3126 9.37011 28.1707 9.11738 27.9179C8.86464 27.6652 8.72266 27.3224 8.72266 26.965V1.34766C8.72266 0.603391 9.32587 0 10.0703 0C10.8148 0 11.418 0.603391 11.418 1.34766V26.965C11.418 27.3224 11.276 27.6652 11.0232 27.9179C10.7705 28.1707 10.4277 28.3126 10.0703 28.3126ZM72.4163 56.6404C72.0589 56.6404 71.7161 56.4984 71.4634 56.2457C71.2106 55.9929 71.0686 55.6501 71.0686 55.2927V1.34766C71.0686 0.603391 71.6719 0 72.4163 0C73.1607 0 73.764 0.603391 73.764 1.34766V55.2927C73.764 55.6501 73.622 55.9929 73.3692 56.2457C73.1165 56.4984 72.7737 56.6404 72.4163 56.6404Z\" fill=\"#4B4B4B\"/>\n        </g>\n        <g id=\"blue\">\n            <path class=\"lamp\" data-color=\"blue\" d=\"M10.0701 16.646C12.1481 16.646 13.8326 14.9615 13.8326 12.8836C13.8326 10.8056 12.1481 9.12109 10.0701 9.12109C7.99214 9.12109 6.30762 10.8056 6.30762 12.8836C6.30762 14.9615 7.99214 16.646 10.0701 16.646Z\" fill=\"#3DBEFF\"/>\n            <path class=\"lamp\" data-color=\"blue\" d=\"M51.6717 24.0865C53.7496 24.0865 55.4341 22.402 55.4341 20.324C55.4341 18.246 53.7496 16.5615 51.6717 16.5615C49.5937 16.5615 47.9092 18.246 47.9092 20.324C47.9092 22.402 49.5937 24.0865 51.6717 24.0865Z\" fill=\"#3DBEFF\"/>\n        </g>\n        <g id=\"red\">\n            <path class=\"lamp\" data-color=\"red\" d=\"M30.8142 38.3834C32.8922 38.3834 34.5767 36.6988 34.5767 34.6209C34.5767 32.5429 32.8922 30.8584 30.8142 30.8584C28.7363 30.8584 27.0518 32.5429 27.0518 34.6209C27.0518 36.6988 28.7363 38.3834 30.8142 38.3834Z\" fill=\"#FF4D36\"/>\n            <path class=\"lamp\" data-color=\"red\" d=\"M72.4158 30.9424C74.4938 30.9424 76.1783 29.2579 76.1783 27.18C76.1783 25.102 74.4938 23.4175 72.4158 23.4175C70.3378 23.4175 68.6533 25.102 68.6533 27.18C68.6533 29.2579 70.3378 30.9424 72.4158 30.9424Z\" fill=\"#FF4D36\"/>\n        </g>\n        <g id=\"green\">\n            <path class=\"lamp\" data-color=\"green\" d=\"M30.8142 52.6797C32.8922 52.6797 34.5767 50.9952 34.5767 48.9173C34.5767 46.8393 32.8922 45.1548 30.8142 45.1548C28.7363 45.1548 27.0518 46.8393 27.0518 48.9173C27.0518 50.9952 28.7363 52.6797 30.8142 52.6797Z\" fill=\"#57E34A\"/>\n            <path class=\"lamp\" data-color=\"green\" d=\"M30.8142 24.0865C32.8922 24.0865 34.5767 22.402 34.5767 20.324C34.5767 18.246 32.8922 16.5615 30.8142 16.5615C28.7363 16.5615 27.0518 18.246 27.0518 20.324C27.0518 22.402 28.7363 24.0865 30.8142 24.0865Z\" fill=\"#57E34A\"/>\n            <path class=\"lamp\" data-color=\"green\" d=\"M72.4158 45.2393C74.4938 45.2393 76.1783 43.5548 76.1783 41.4768C76.1783 39.3989 74.4938 37.7144 72.4158 37.7144C70.3378 37.7144 68.6533 39.3989 68.6533 41.4768C68.6533 43.5548 70.3378 45.2393 72.4158 45.2393Z\" fill=\"#57E34A\"/>\n            <path class=\"lamp\" data-color=\"green\" d=\"M72.4158 16.646C74.4938 16.646 76.1783 14.9615 76.1783 12.8836C76.1783 10.8056 74.4938 9.12109 72.4158 9.12109C70.3378 9.12109 68.6533 10.8056 68.6533 12.8836C68.6533 14.9615 70.3378 16.646 72.4158 16.646Z\" fill=\"#57E34A\"/>\n        </g>\n        <g id=\"yellow\">\n            <path class=\"lamp\" data-color=\"yellow\" d=\"M30.814 59.6504L33.4523 65.1506L39.5347 64.6853L36.0906 69.7202L39.5347 74.7551L33.4523 74.2899L30.814 79.79L28.1757 74.2899L22.0932 74.7551L25.5374 69.7202L22.0932 64.6853L28.1757 65.1506L30.814 59.6504Z\" fill=\"#FFCE2F\"/>\n            <path class=\"lamp\" data-color=\"yellow\" d=\"M72.4155 51.8037L75.0538 57.3039L81.1362 56.8386L77.6921 61.8735L81.1362 66.9084L75.0538 66.4432L72.4155 71.9434L69.7772 66.4432L63.6948 66.9084L67.1389 61.8735L63.6948 56.8386L69.7772 57.3039L72.4155 51.8037Z\" fill=\"#FFCE2F\"/>\n            <path class=\"lamp\" data-color=\"yellow\" d=\"M51.6714 30.8584L54.3097 36.3586L60.3921 35.8933L56.948 40.9282L60.3921 45.9631L54.3097 45.4979L51.6714 50.998L49.0331 45.4979L42.9507 45.9631L46.3948 40.9282L42.9507 35.8933L49.0331 36.3586L51.6714 30.8584Z\" fill=\"#FFCE2F\"/>\n            <path class=\"lamp\" data-color=\"yellow\" d=\"M10.0698 22.2222L12.7081 27.7223L18.7905 27.2571L15.3464 32.292L18.7905 37.3269L12.7081 36.8617L10.0698 42.3618L7.43153 36.8617L1.3491 37.3269L4.79324 32.292L1.3491 27.2571L7.43153 27.7223L10.0698 22.2222Z\" fill=\"#FFCE2F\"/>\n        </g>\n    </svg>\n";
    var cap = "\n    <svg width=\"59\" height=\"46\" viewBox=\"0 0 59 46\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M20.5361 36.4721V32.6155C17.1449 32.6154 13.808 33.4671 10.8317 35.0924L8.51766 33.1592L9.78554 30.4412C11.7856 26.1578 12.8223 21.488 12.8227 16.7606C12.8228 13.3305 14.1854 10.0409 16.6109 7.61542C20.9763 3.25022 26.8969 0.797852 33.0703 0.79776C39.2438 0.797852 45.1643 3.25022 49.5297 7.61542L50.4254 8.51114V15.2603L29.2136 36.4721H20.5361Z\" fill=\"#C52C37\"/>\n        <path d=\"M8.51958 33.1592L9.78747 30.4412C11.7869 26.1576 12.8229 21.4878 12.8227 16.7605C12.8227 13.3304 14.1854 10.0408 16.6109 7.61536C19.2135 5.01596 22.3951 3.07043 25.8949 1.93831C26.8241 1.82289 27.7595 1.76396 28.6959 1.76187C29.1627 1.76486 29.6288 1.80256 30.09 1.87468C38.9951 3.21295 42.5462 14.2113 36.4536 20.8467C31.7484 25.98 25.9354 31.6512 20.5361 35.1116V32.6154C17.1449 32.6153 13.808 33.4671 10.8317 35.0924L8.51958 33.1592Z\" fill=\"#ED4241\"/>\n        <path d=\"M20.5361 36.4721L22.4644 45.1496C30.8254 43.7082 38.6036 39.9177 44.8909 34.2208C51.1781 28.524 55.7147 21.1559 57.971 12.9771L58.1388 12.3678L50.4254 8.51108L49.4564 10.3613C43.2372 22.2342 32.9806 31.4943 20.5361 36.4721Z\" fill=\"#C1CFE8\"/>\n        <path d=\"M19.5719 32.6154H21.5003V30.0363C21.4991 26.1007 22.1334 22.1909 23.3785 18.4575L21.5465 17.8481C20.2363 21.778 19.5695 25.8937 19.5719 30.0363V32.6154Z\" fill=\"#C52C37\"/>\n        <path d=\"M6.07349 44.1855C2.8785 44.1855 0.28845 41.5954 0.28845 38.4005C0.28845 35.2055 2.8785 32.6154 6.07349 32.6154C9.26847 32.6154 11.8585 35.2055 11.8585 38.4005C11.8585 41.5954 9.26847 44.1855 6.07349 44.1855Z\" fill=\"#C1CFE8\"/>\n        <path d=\"M50.4254 8.51108L57.9392 12.2714C55.6184 18.7688 51.8258 24.6411 46.8579 29.429C41.8901 34.2168 35.8819 37.7903 29.3033 39.8698C28.5677 40.1008 27.7921 40.1764 27.0257 40.0919C26.2593 40.0073 25.5189 39.7644 24.8513 39.3786C24.1837 38.9928 23.6036 38.4725 23.1478 37.8506C22.6919 37.2288 22.3702 36.519 22.2031 35.7663C33.9115 30.6424 43.5242 21.6816 49.4564 10.3613L50.4254 8.51108ZM6.07347 32.6154C7.13506 32.6157 8.17586 32.9097 9.08073 33.4648C9.75727 34.5711 10.0419 35.8729 9.88893 37.1606C9.73591 38.4483 9.15411 39.6471 8.23715 40.5641C7.32018 41.4811 6.12139 42.0629 4.83367 42.2159C3.54594 42.3689 2.24419 42.0842 1.13787 41.4077C0.601807 40.5314 0.309057 39.5281 0.289791 38.5011C0.270524 37.474 0.525435 36.4604 1.02826 35.5647C1.53109 34.669 2.26364 33.9235 3.15045 33.4051C4.03726 32.8867 5.04626 32.6141 6.07347 32.6154Z\" fill=\"#D7E0EF\"/>\n    </svg>\n";
    var Template = {
      garland: garland,
      cap: cap
    };

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

    var fails$d = function (exec) {
      try {
        return !!exec();
      } catch (error) {
        return true;
      }
    };

    var fails$c = fails$d;

    // Detect IE8's incomplete defineProperty implementation
    var descriptors = !fails$c(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- required for testing
      return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
    });

    var fails$b = fails$d;

    var functionBindNative = !fails$b(function () {
      // eslint-disable-next-line es/no-function-prototype-bind -- safe
      var test = function () { /* empty */ }.bind();
      // eslint-disable-next-line no-prototype-builtins -- safe
      return typeof test != 'function' || test.hasOwnProperty('prototype');
    });

    var NATIVE_BIND$3 = functionBindNative;

    var call$b = Function.prototype.call;
    // eslint-disable-next-line es/no-function-prototype-bind -- safe
    var functionCall = NATIVE_BIND$3 ? call$b.bind(call$b) : function () {
      return call$b.apply(call$b, arguments);
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
    var call$a = FunctionPrototype$2.call;
    // eslint-disable-next-line es/no-function-prototype-bind -- safe
    var uncurryThisWithBind = NATIVE_BIND$2 && FunctionPrototype$2.bind.bind(call$a, call$a);

    var functionUncurryThis = NATIVE_BIND$2 ? uncurryThisWithBind : function (fn) {
      return function () {
        return call$a.apply(fn, arguments);
      };
    };

    var uncurryThis$f = functionUncurryThis;

    var toString$5 = uncurryThis$f({}.toString);
    var stringSlice$1 = uncurryThis$f(''.slice);

    var classofRaw$2 = function (it) {
      return stringSlice$1(toString$5(it), 8, -1);
    };

    var uncurryThis$e = functionUncurryThis;
    var fails$a = fails$d;
    var classof$7 = classofRaw$2;

    var $Object$3 = Object;
    var split = uncurryThis$e(''.split);

    // fallback for non-array-like ES3 and non-enumerable old V8 strings
    var indexedObject = fails$a(function () {
      // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
      // eslint-disable-next-line no-prototype-builtins -- safe
      return !$Object$3('z').propertyIsEnumerable(0);
    }) ? function (it) {
      return classof$7(it) === 'String' ? split(it, '') : $Object$3(it);
    } : $Object$3;

    // we can't use just `it == null` since of `document.all` special case
    // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
    var isNullOrUndefined$4 = function (it) {
      return it === null || it === undefined;
    };

    var isNullOrUndefined$3 = isNullOrUndefined$4;

    var $TypeError$c = TypeError;

    // `RequireObjectCoercible` abstract operation
    // https://tc39.es/ecma262/#sec-requireobjectcoercible
    var requireObjectCoercible$4 = function (it) {
      if (isNullOrUndefined$3(it)) throw new $TypeError$c("Can't call method on " + it);
      return it;
    };

    // toObject with fallback for non-array-like ES3 strings
    var IndexedObject$1 = indexedObject;
    var requireObjectCoercible$3 = requireObjectCoercible$4;

    var toIndexedObject$4 = function (it) {
      return IndexedObject$1(requireObjectCoercible$3(it));
    };

    // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
    var documentAll = typeof document == 'object' && document.all;

    // `IsCallable` abstract operation
    // https://tc39.es/ecma262/#sec-iscallable
    // eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
    var isCallable$g = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
      return typeof argument == 'function' || argument === documentAll;
    } : function (argument) {
      return typeof argument == 'function';
    };

    var isCallable$f = isCallable$g;

    var isObject$a = function (it) {
      return typeof it == 'object' ? it !== null : isCallable$f(it);
    };

    var globalThis$l = globalThis_1;
    var isCallable$e = isCallable$g;

    var aFunction = function (argument) {
      return isCallable$e(argument) ? argument : undefined;
    };

    var getBuiltIn$7 = function (namespace, method) {
      return arguments.length < 2 ? aFunction(globalThis$l[namespace]) : globalThis$l[namespace] && globalThis$l[namespace][method];
    };

    var uncurryThis$d = functionUncurryThis;

    var objectIsPrototypeOf = uncurryThis$d({}.isPrototypeOf);

    var globalThis$k = globalThis_1;

    var navigator = globalThis$k.navigator;
    var userAgent$5 = navigator && navigator.userAgent;

    var environmentUserAgent = userAgent$5 ? String(userAgent$5) : '';

    var globalThis$j = globalThis_1;
    var userAgent$4 = environmentUserAgent;

    var process$3 = globalThis$j.process;
    var Deno$1 = globalThis$j.Deno;
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
    if (!version && userAgent$4) {
      match = userAgent$4.match(/Edge\/(\d+)/);
      if (!match || match[1] >= 74) {
        match = userAgent$4.match(/Chrome\/(\d+)/);
        if (match) version = +match[1];
      }
    }

    var environmentV8Version = version;

    /* eslint-disable es/no-symbol -- required for testing */
    var V8_VERSION$2 = environmentV8Version;
    var fails$9 = fails$d;
    var globalThis$i = globalThis_1;

    var $String$5 = globalThis$i.String;

    // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
    var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$9(function () {
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

    var getBuiltIn$6 = getBuiltIn$7;
    var isCallable$d = isCallable$g;
    var isPrototypeOf$2 = objectIsPrototypeOf;
    var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

    var $Object$2 = Object;

    var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
      return typeof it == 'symbol';
    } : function (it) {
      var $Symbol = getBuiltIn$6('Symbol');
      return isCallable$d($Symbol) && isPrototypeOf$2($Symbol.prototype, $Object$2(it));
    };

    var $String$4 = String;

    var tryToString$4 = function (argument) {
      try {
        return $String$4(argument);
      } catch (error) {
        return 'Object';
      }
    };

    var isCallable$c = isCallable$g;
    var tryToString$3 = tryToString$4;

    var $TypeError$b = TypeError;

    // `Assert: IsCallable(argument) is true`
    var aCallable$8 = function (argument) {
      if (isCallable$c(argument)) return argument;
      throw new $TypeError$b(tryToString$3(argument) + ' is not a function');
    };

    var aCallable$7 = aCallable$8;
    var isNullOrUndefined$2 = isNullOrUndefined$4;

    // `GetMethod` abstract operation
    // https://tc39.es/ecma262/#sec-getmethod
    var getMethod$3 = function (V, P) {
      var func = V[P];
      return isNullOrUndefined$2(func) ? undefined : aCallable$7(func);
    };

    var call$9 = functionCall;
    var isCallable$b = isCallable$g;
    var isObject$9 = isObject$a;

    var $TypeError$a = TypeError;

    // `OrdinaryToPrimitive` abstract operation
    // https://tc39.es/ecma262/#sec-ordinarytoprimitive
    var ordinaryToPrimitive$1 = function (input, pref) {
      var fn, val;
      if (pref === 'string' && isCallable$b(fn = input.toString) && !isObject$9(val = call$9(fn, input))) return val;
      if (isCallable$b(fn = input.valueOf) && !isObject$9(val = call$9(fn, input))) return val;
      if (pref !== 'string' && isCallable$b(fn = input.toString) && !isObject$9(val = call$9(fn, input))) return val;
      throw new $TypeError$a("Can't convert object to primitive value");
    };

    var sharedStore = {exports: {}};

    var globalThis$h = globalThis_1;

    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var defineProperty$4 = Object.defineProperty;

    var defineGlobalProperty$3 = function (key, value) {
      try {
        defineProperty$4(globalThis$h, key, { value: value, configurable: true, writable: true });
      } catch (error) {
        globalThis$h[key] = value;
      } return value;
    };

    var globalThis$g = globalThis_1;
    var defineGlobalProperty$2 = defineGlobalProperty$3;

    var SHARED = '__core-js_shared__';
    var store$3 = sharedStore.exports = globalThis$g[SHARED] || defineGlobalProperty$2(SHARED, {});

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

    var requireObjectCoercible$2 = requireObjectCoercible$4;

    var $Object$1 = Object;

    // `ToObject` abstract operation
    // https://tc39.es/ecma262/#sec-toobject
    var toObject$2 = function (argument) {
      return $Object$1(requireObjectCoercible$2(argument));
    };

    var uncurryThis$c = functionUncurryThis;
    var toObject$1 = toObject$2;

    var hasOwnProperty = uncurryThis$c({}.hasOwnProperty);

    // `HasOwnProperty` abstract operation
    // https://tc39.es/ecma262/#sec-hasownproperty
    // eslint-disable-next-line es/no-object-hasown -- safe
    var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
      return hasOwnProperty(toObject$1(it), key);
    };

    var uncurryThis$b = functionUncurryThis;

    var id = 0;
    var postfix = Math.random();
    var toString$4 = uncurryThis$b(1.1.toString);

    var uid$2 = function (key) {
      return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$4(++id + postfix, 36);
    };

    var globalThis$f = globalThis_1;
    var shared$2 = shared$3;
    var hasOwn$8 = hasOwnProperty_1;
    var uid$1 = uid$2;
    var NATIVE_SYMBOL = symbolConstructorDetection;
    var USE_SYMBOL_AS_UID = useSymbolAsUid;

    var Symbol$2 = globalThis$f.Symbol;
    var WellKnownSymbolsStore = shared$2('wks');
    var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$2['for'] || Symbol$2 : Symbol$2 && Symbol$2.withoutSetter || uid$1;

    var wellKnownSymbol$d = function (name) {
      if (!hasOwn$8(WellKnownSymbolsStore, name)) {
        WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$8(Symbol$2, name)
          ? Symbol$2[name]
          : createWellKnownSymbol('Symbol.' + name);
      } return WellKnownSymbolsStore[name];
    };

    var call$8 = functionCall;
    var isObject$8 = isObject$a;
    var isSymbol$1 = isSymbol$2;
    var getMethod$2 = getMethod$3;
    var ordinaryToPrimitive = ordinaryToPrimitive$1;
    var wellKnownSymbol$c = wellKnownSymbol$d;

    var $TypeError$9 = TypeError;
    var TO_PRIMITIVE = wellKnownSymbol$c('toPrimitive');

    // `ToPrimitive` abstract operation
    // https://tc39.es/ecma262/#sec-toprimitive
    var toPrimitive$1 = function (input, pref) {
      if (!isObject$8(input) || isSymbol$1(input)) return input;
      var exoticToPrim = getMethod$2(input, TO_PRIMITIVE);
      var result;
      if (exoticToPrim) {
        if (pref === undefined) pref = 'default';
        result = call$8(exoticToPrim, input, pref);
        if (!isObject$8(result) || isSymbol$1(result)) return result;
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

    var globalThis$e = globalThis_1;
    var isObject$7 = isObject$a;

    var document$3 = globalThis$e.document;
    // typeof document.createElement is 'object' in old IE
    var EXISTS$1 = isObject$7(document$3) && isObject$7(document$3.createElement);

    var documentCreateElement$2 = function (it) {
      return EXISTS$1 ? document$3.createElement(it) : {};
    };

    var DESCRIPTORS$a = descriptors;
    var fails$8 = fails$d;
    var createElement$1 = documentCreateElement$2;

    // Thanks to IE8 for its funny defineProperty
    var ie8DomDefine = !DESCRIPTORS$a && !fails$8(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- required for testing
      return Object.defineProperty(createElement$1('div'), 'a', {
        get: function () { return 7; }
      }).a !== 7;
    });

    var DESCRIPTORS$9 = descriptors;
    var call$7 = functionCall;
    var propertyIsEnumerableModule = objectPropertyIsEnumerable;
    var createPropertyDescriptor$2 = createPropertyDescriptor$3;
    var toIndexedObject$3 = toIndexedObject$4;
    var toPropertyKey$1 = toPropertyKey$2;
    var hasOwn$7 = hasOwnProperty_1;
    var IE8_DOM_DEFINE$1 = ie8DomDefine;

    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
    objectGetOwnPropertyDescriptor.f = DESCRIPTORS$9 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject$3(O);
      P = toPropertyKey$1(P);
      if (IE8_DOM_DEFINE$1) try {
        return $getOwnPropertyDescriptor$1(O, P);
      } catch (error) { /* empty */ }
      if (hasOwn$7(O, P)) return createPropertyDescriptor$2(!call$7(propertyIsEnumerableModule.f, O, P), O[P]);
    };

    var objectDefineProperty = {};

    var DESCRIPTORS$8 = descriptors;
    var fails$7 = fails$d;

    // V8 ~ Chrome 36-
    // https://bugs.chromium.org/p/v8/issues/detail?id=3334
    var v8PrototypeDefineBug = DESCRIPTORS$8 && fails$7(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- required for testing
      return Object.defineProperty(function () { /* empty */ }, 'prototype', {
        value: 42,
        writable: false
      }).prototype !== 42;
    });

    var isObject$6 = isObject$a;

    var $String$3 = String;
    var $TypeError$8 = TypeError;

    // `Assert: Type(argument) is Object`
    var anObject$9 = function (argument) {
      if (isObject$6(argument)) return argument;
      throw new $TypeError$8($String$3(argument) + ' is not an object');
    };

    var DESCRIPTORS$7 = descriptors;
    var IE8_DOM_DEFINE = ie8DomDefine;
    var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
    var anObject$8 = anObject$9;
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
    objectDefineProperty.f = DESCRIPTORS$7 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
      anObject$8(O);
      P = toPropertyKey(P);
      anObject$8(Attributes);
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
      anObject$8(O);
      P = toPropertyKey(P);
      anObject$8(Attributes);
      if (IE8_DOM_DEFINE) try {
        return $defineProperty(O, P, Attributes);
      } catch (error) { /* empty */ }
      if ('get' in Attributes || 'set' in Attributes) throw new $TypeError$7('Accessors not supported');
      if ('value' in Attributes) O[P] = Attributes.value;
      return O;
    };

    var DESCRIPTORS$6 = descriptors;
    var definePropertyModule$4 = objectDefineProperty;
    var createPropertyDescriptor$1 = createPropertyDescriptor$3;

    var createNonEnumerableProperty$3 = DESCRIPTORS$6 ? function (object, key, value) {
      return definePropertyModule$4.f(object, key, createPropertyDescriptor$1(1, value));
    } : function (object, key, value) {
      object[key] = value;
      return object;
    };

    var makeBuiltIn$3 = {exports: {}};

    var DESCRIPTORS$5 = descriptors;
    var hasOwn$6 = hasOwnProperty_1;

    var FunctionPrototype$1 = Function.prototype;
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var getDescriptor = DESCRIPTORS$5 && Object.getOwnPropertyDescriptor;

    var EXISTS = hasOwn$6(FunctionPrototype$1, 'name');
    // additional protection from minified / mangled / dropped function names
    var PROPER = EXISTS && function something() { /* empty */ }.name === 'something';
    var CONFIGURABLE = EXISTS && (!DESCRIPTORS$5 || (DESCRIPTORS$5 && getDescriptor(FunctionPrototype$1, 'name').configurable));

    var functionName = {
      EXISTS: EXISTS,
      PROPER: PROPER,
      CONFIGURABLE: CONFIGURABLE
    };

    var uncurryThis$a = functionUncurryThis;
    var isCallable$a = isCallable$g;
    var store$1 = sharedStore.exports;

    var functionToString = uncurryThis$a(Function.toString);

    // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
    if (!isCallable$a(store$1.inspectSource)) {
      store$1.inspectSource = function (it) {
        return functionToString(it);
      };
    }

    var inspectSource$3 = store$1.inspectSource;

    var globalThis$d = globalThis_1;
    var isCallable$9 = isCallable$g;

    var WeakMap$1 = globalThis$d.WeakMap;

    var weakMapBasicDetection = isCallable$9(WeakMap$1) && /native code/.test(String(WeakMap$1));

    var shared$1 = shared$3;
    var uid = uid$2;

    var keys = shared$1('keys');

    var sharedKey$2 = function (key) {
      return keys[key] || (keys[key] = uid(key));
    };

    var hiddenKeys$4 = {};

    var NATIVE_WEAK_MAP = weakMapBasicDetection;
    var globalThis$c = globalThis_1;
    var isObject$5 = isObject$a;
    var createNonEnumerableProperty$2 = createNonEnumerableProperty$3;
    var hasOwn$5 = hasOwnProperty_1;
    var shared = sharedStore.exports;
    var sharedKey$1 = sharedKey$2;
    var hiddenKeys$3 = hiddenKeys$4;

    var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
    var TypeError$2 = globalThis$c.TypeError;
    var WeakMap = globalThis$c.WeakMap;
    var set$1, get, has;

    var enforce = function (it) {
      return has(it) ? get(it) : set$1(it, {});
    };

    var getterFor = function (TYPE) {
      return function (it) {
        var state;
        if (!isObject$5(it) || (state = get(it)).type !== TYPE) {
          throw new TypeError$2('Incompatible receiver, ' + TYPE + ' required');
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
      set$1 = function (it, metadata) {
        if (store.has(it)) throw new TypeError$2(OBJECT_ALREADY_INITIALIZED);
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
      set$1 = function (it, metadata) {
        if (hasOwn$5(it, STATE)) throw new TypeError$2(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        createNonEnumerableProperty$2(it, STATE, metadata);
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
      set: set$1,
      get: get,
      has: has,
      enforce: enforce,
      getterFor: getterFor
    };

    var uncurryThis$9 = functionUncurryThis;
    var fails$6 = fails$d;
    var isCallable$8 = isCallable$g;
    var hasOwn$4 = hasOwnProperty_1;
    var DESCRIPTORS$4 = descriptors;
    var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
    var inspectSource$2 = inspectSource$3;
    var InternalStateModule$1 = internalState;

    var enforceInternalState = InternalStateModule$1.enforce;
    var getInternalState = InternalStateModule$1.get;
    var $String$2 = String;
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var defineProperty$3 = Object.defineProperty;
    var stringSlice = uncurryThis$9(''.slice);
    var replace$1 = uncurryThis$9(''.replace);
    var join = uncurryThis$9([].join);

    var CONFIGURABLE_LENGTH = DESCRIPTORS$4 && !fails$6(function () {
      return defineProperty$3(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
    });

    var TEMPLATE = String(String).split('String');

    var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
      if (stringSlice($String$2(name), 0, 7) === 'Symbol(') {
        name = '[' + replace$1($String$2(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
      }
      if (options && options.getter) name = 'get ' + name;
      if (options && options.setter) name = 'set ' + name;
      if (!hasOwn$4(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
        if (DESCRIPTORS$4) defineProperty$3(value, 'name', { value: name, configurable: true });
        else value.name = name;
      }
      if (CONFIGURABLE_LENGTH && options && hasOwn$4(options, 'arity') && value.length !== options.arity) {
        defineProperty$3(value, 'length', { value: options.arity });
      }
      try {
        if (options && hasOwn$4(options, 'constructor') && options.constructor) {
          if (DESCRIPTORS$4) defineProperty$3(value, 'prototype', { writable: false });
        // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
        } else if (value.prototype) value.prototype = undefined;
      } catch (error) { /* empty */ }
      var state = enforceInternalState(value);
      if (!hasOwn$4(state, 'source')) {
        state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
      } return value;
    };

    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    // eslint-disable-next-line no-extend-native -- required
    Function.prototype.toString = makeBuiltIn$2(function toString() {
      return isCallable$8(this) && getInternalState(this).source || inspectSource$2(this);
    }, 'toString');

    var isCallable$7 = isCallable$g;
    var definePropertyModule$3 = objectDefineProperty;
    var makeBuiltIn$1 = makeBuiltIn$3.exports;
    var defineGlobalProperty$1 = defineGlobalProperty$3;

    var defineBuiltIn$4 = function (O, key, value, options) {
      if (!options) options = {};
      var simple = options.enumerable;
      var name = options.name !== undefined ? options.name : key;
      if (isCallable$7(value)) makeBuiltIn$1(value, name, options);
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
    var lengthOfArrayLike$3 = function (obj) {
      return toLength(obj.length);
    };

    var toIndexedObject$2 = toIndexedObject$4;
    var toAbsoluteIndex = toAbsoluteIndex$1;
    var lengthOfArrayLike$2 = lengthOfArrayLike$3;

    // `Array.prototype.{ indexOf, includes }` methods implementation
    var createMethod$2 = function (IS_INCLUDES) {
      return function ($this, el, fromIndex) {
        var O = toIndexedObject$2($this);
        var length = lengthOfArrayLike$2(O);
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
      includes: createMethod$2(true),
      // `Array.prototype.indexOf` method
      // https://tc39.es/ecma262/#sec-array.prototype.indexof
      indexOf: createMethod$2(false)
    };

    var uncurryThis$8 = functionUncurryThis;
    var hasOwn$3 = hasOwnProperty_1;
    var toIndexedObject$1 = toIndexedObject$4;
    var indexOf = arrayIncludes.indexOf;
    var hiddenKeys$2 = hiddenKeys$4;

    var push = uncurryThis$8([].push);

    var objectKeysInternal = function (object, names) {
      var O = toIndexedObject$1(object);
      var i = 0;
      var result = [];
      var key;
      for (key in O) !hasOwn$3(hiddenKeys$2, key) && hasOwn$3(O, key) && push(result, key);
      // Don't enum bug & hidden keys
      while (names.length > i) if (hasOwn$3(O, key = names[i++])) {
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

    var getBuiltIn$5 = getBuiltIn$7;
    var uncurryThis$7 = functionUncurryThis;
    var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
    var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
    var anObject$7 = anObject$9;

    var concat = uncurryThis$7([].concat);

    // all object keys, includes non-enumerable and symbols
    var ownKeys$1 = getBuiltIn$5('Reflect', 'ownKeys') || function ownKeys(it) {
      var keys = getOwnPropertyNamesModule.f(anObject$7(it));
      var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
      return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
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

    var fails$5 = fails$d;
    var isCallable$6 = isCallable$g;

    var replacement = /#|\.prototype\./;

    var isForced$2 = function (feature, detection) {
      var value = data[normalize(feature)];
      return value === POLYFILL ? true
        : value === NATIVE ? false
        : isCallable$6(detection) ? fails$5(detection)
        : !!detection;
    };

    var normalize = isForced$2.normalize = function (string) {
      return String(string).replace(replacement, '.').toLowerCase();
    };

    var data = isForced$2.data = {};
    var NATIVE = isForced$2.NATIVE = 'N';
    var POLYFILL = isForced$2.POLYFILL = 'P';

    var isForced_1 = isForced$2;

    var globalThis$b = globalThis_1;
    var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
    var createNonEnumerableProperty$1 = createNonEnumerableProperty$3;
    var defineBuiltIn$3 = defineBuiltIn$4;
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
        target = globalThis$b;
      } else if (STATIC) {
        target = globalThis$b[TARGET] || defineGlobalProperty(TARGET, {});
      } else {
        target = globalThis$b[TARGET] && globalThis$b[TARGET].prototype;
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
          createNonEnumerableProperty$1(sourceProperty, 'sham', true);
        }
        defineBuiltIn$3(target, key, sourceProperty, options);
      }
    };

    var classofRaw$1 = classofRaw$2;
    var uncurryThis$6 = functionUncurryThis;

    var functionUncurryThisClause = function (fn) {
      // Nashorn bug:
      //   https://github.com/zloirock/core-js/issues/1128
      //   https://github.com/zloirock/core-js/issues/1130
      if (classofRaw$1(fn) === 'Function') return uncurryThis$6(fn);
    };

    var uncurryThis$5 = functionUncurryThisClause;
    var aCallable$6 = aCallable$8;
    var NATIVE_BIND$1 = functionBindNative;

    var bind$5 = uncurryThis$5(uncurryThis$5.bind);

    // optional / simple context binding
    var functionBindContext = function (fn, that) {
      aCallable$6(fn);
      return that === undefined ? fn : NATIVE_BIND$1 ? bind$5(fn, that) : function (/* ...args */) {
        return fn.apply(that, arguments);
      };
    };

    var classof$6 = classofRaw$2;

    // `IsArray` abstract operation
    // https://tc39.es/ecma262/#sec-isarray
    // eslint-disable-next-line es/no-array-isarray -- safe
    var isArray$1 = Array.isArray || function isArray(argument) {
      return classof$6(argument) === 'Array';
    };

    var wellKnownSymbol$b = wellKnownSymbol$d;

    var TO_STRING_TAG$2 = wellKnownSymbol$b('toStringTag');
    var test = {};
    // eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
    test[TO_STRING_TAG$2] = 'z';

    var toStringTagSupport = String(test) === '[object z]';

    var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
    var isCallable$5 = isCallable$g;
    var classofRaw = classofRaw$2;
    var wellKnownSymbol$a = wellKnownSymbol$d;

    var TO_STRING_TAG$1 = wellKnownSymbol$a('toStringTag');
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
    var classof$5 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
      var O, tag, result;
      return it === undefined ? 'Undefined' : it === null ? 'Null'
        // @@toStringTag case
        : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG$1)) == 'string' ? tag
        // builtinTag case
        : CORRECT_ARGUMENTS ? classofRaw(O)
        // ES3 arguments fallback
        : (result = classofRaw(O)) === 'Object' && isCallable$5(O.callee) ? 'Arguments' : result;
    };

    var uncurryThis$4 = functionUncurryThis;
    var fails$4 = fails$d;
    var isCallable$4 = isCallable$g;
    var classof$4 = classof$5;
    var getBuiltIn$4 = getBuiltIn$7;
    var inspectSource$1 = inspectSource$3;

    var noop = function () { /* empty */ };
    var construct = getBuiltIn$4('Reflect', 'construct');
    var constructorRegExp = /^\s*(?:class|function)\b/;
    var exec = uncurryThis$4(constructorRegExp.exec);
    var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

    var isConstructorModern = function isConstructor(argument) {
      if (!isCallable$4(argument)) return false;
      try {
        construct(noop, [], argument);
        return true;
      } catch (error) {
        return false;
      }
    };

    var isConstructorLegacy = function isConstructor(argument) {
      if (!isCallable$4(argument)) return false;
      switch (classof$4(argument)) {
        case 'AsyncFunction':
        case 'GeneratorFunction':
        case 'AsyncGeneratorFunction': return false;
      }
      try {
        // we can't check .prototype since constructors produced by .bind haven't it
        // `Function#toString` throws on some built-it function in some legacy engines
        // (for example, `DOMQuad` and similar in FF41-)
        return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource$1(argument));
      } catch (error) {
        return true;
      }
    };

    isConstructorLegacy.sham = true;

    // `IsConstructor` abstract operation
    // https://tc39.es/ecma262/#sec-isconstructor
    var isConstructor$2 = !construct || fails$4(function () {
      var called;
      return isConstructorModern(isConstructorModern.call)
        || !isConstructorModern(Object)
        || !isConstructorModern(function () { called = true; })
        || called;
    }) ? isConstructorLegacy : isConstructorModern;

    var isArray = isArray$1;
    var isConstructor$1 = isConstructor$2;
    var isObject$4 = isObject$a;
    var wellKnownSymbol$9 = wellKnownSymbol$d;

    var SPECIES$4 = wellKnownSymbol$9('species');
    var $Array = Array;

    // a part of `ArraySpeciesCreate` abstract operation
    // https://tc39.es/ecma262/#sec-arrayspeciescreate
    var arraySpeciesConstructor$1 = function (originalArray) {
      var C;
      if (isArray(originalArray)) {
        C = originalArray.constructor;
        // cross-realm fallback
        if (isConstructor$1(C) && (C === $Array || isArray(C.prototype))) C = undefined;
        else if (isObject$4(C)) {
          C = C[SPECIES$4];
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

    var DESCRIPTORS$3 = descriptors;
    var definePropertyModule$1 = objectDefineProperty;
    var createPropertyDescriptor = createPropertyDescriptor$3;

    var createProperty$1 = function (object, key, value) {
      if (DESCRIPTORS$3) definePropertyModule$1.f(object, key, createPropertyDescriptor(0, value));
      else object[key] = value;
    };

    var bind$4 = functionBindContext;
    var IndexedObject = indexedObject;
    var toObject = toObject$2;
    var lengthOfArrayLike$1 = lengthOfArrayLike$3;
    var arraySpeciesCreate = arraySpeciesCreate$1;
    var createProperty = createProperty$1;

    // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
    var createMethod$1 = function (TYPE) {
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
        var length = lengthOfArrayLike$1(self);
        var boundFunction = bind$4(callbackfn, that);
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
      forEach: createMethod$1(0),
      // `Array.prototype.map` method
      // https://tc39.es/ecma262/#sec-array.prototype.map
      map: createMethod$1(1),
      // `Array.prototype.filter` method
      // https://tc39.es/ecma262/#sec-array.prototype.filter
      filter: createMethod$1(2),
      // `Array.prototype.some` method
      // https://tc39.es/ecma262/#sec-array.prototype.some
      some: createMethod$1(3),
      // `Array.prototype.every` method
      // https://tc39.es/ecma262/#sec-array.prototype.every
      every: createMethod$1(4),
      // `Array.prototype.find` method
      // https://tc39.es/ecma262/#sec-array.prototype.find
      find: createMethod$1(5),
      // `Array.prototype.findIndex` method
      // https://tc39.es/ecma262/#sec-array.prototype.findIndex
      findIndex: createMethod$1(6),
      // `Array.prototype.filterReject` method
      // https://github.com/tc39/proposal-array-filtering
      filterReject: createMethod$1(7)
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

    var DESCRIPTORS$2 = descriptors;
    var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
    var definePropertyModule = objectDefineProperty;
    var anObject$6 = anObject$9;
    var toIndexedObject = toIndexedObject$4;
    var objectKeys = objectKeys$1;

    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    // eslint-disable-next-line es/no-object-defineproperties -- safe
    objectDefineProperties.f = DESCRIPTORS$2 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
      anObject$6(O);
      var props = toIndexedObject(Properties);
      var keys = objectKeys(Properties);
      var length = keys.length;
      var index = 0;
      var key;
      while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
      return O;
    };

    var getBuiltIn$3 = getBuiltIn$7;

    var html$2 = getBuiltIn$3('document', 'documentElement');

    /* global ActiveXObject -- old IE, WSH */
    var anObject$5 = anObject$9;
    var definePropertiesModule = objectDefineProperties;
    var enumBugKeys = enumBugKeys$3;
    var hiddenKeys = hiddenKeys$4;
    var html$1 = html$2;
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
        EmptyConstructor[PROTOTYPE] = anObject$5(O);
        result = new EmptyConstructor();
        EmptyConstructor[PROTOTYPE] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO] = O;
      } else result = NullProtoObject();
      return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
    };

    var wellKnownSymbol$8 = wellKnownSymbol$d;
    var create = objectCreate;
    var defineProperty$2 = objectDefineProperty.f;

    var UNSCOPABLES = wellKnownSymbol$8('unscopables');
    var ArrayPrototype$1 = Array.prototype;

    // Array.prototype[@@unscopables]
    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    if (ArrayPrototype$1[UNSCOPABLES] === undefined) {
      defineProperty$2(ArrayPrototype$1, UNSCOPABLES, {
        configurable: true,
        value: create(null)
      });
    }

    // add a key to Array.prototype[@@unscopables]
    var addToUnscopables$1 = function (key) {
      ArrayPrototype$1[UNSCOPABLES][key] = true;
    };

    var $$a = _export;
    var $find = arrayIteration.find;
    var addToUnscopables = addToUnscopables$1;

    var FIND = 'find';
    var SKIPS_HOLES = true;

    // Shouldn't skip holes
    // eslint-disable-next-line es/no-array-prototype-find -- testing
    if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    $$a({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
      find: function find(callbackfn /* , that = undefined */) {
        return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    addToUnscopables(FIND);

    var fails$3 = fails$d;

    var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
      var method = [][METHOD_NAME];
      return !!method && fails$3(function () {
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

    var $$9 = _export;
    var forEach$1 = arrayForEach;

    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    // eslint-disable-next-line es/no-array-prototype-foreach -- safe
    $$9({ target: 'Array', proto: true, forced: [].forEach !== forEach$1 }, {
      forEach: forEach$1
    });

    var fails$2 = fails$d;
    var wellKnownSymbol$7 = wellKnownSymbol$d;
    var V8_VERSION$1 = environmentV8Version;

    var SPECIES$3 = wellKnownSymbol$7('species');

    var arrayMethodHasSpeciesSupport$1 = function (METHOD_NAME) {
      // We can't use this feature detection in V8 since it causes
      // deoptimization and serious performance degradation
      // https://github.com/zloirock/core-js/issues/677
      return V8_VERSION$1 >= 51 || !fails$2(function () {
        var array = [];
        var constructor = array.constructor = {};
        constructor[SPECIES$3] = function () {
          return { foo: 1 };
        };
        return array[METHOD_NAME](Boolean).foo !== 1;
      });
    };

    var $$8 = _export;
    var $map = arrayIteration.map;
    var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1;

    var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    // with adding support of @@species
    $$8({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
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
    var defineBuiltIn$2 = defineBuiltIn$4;
    var toString$3 = objectToString;

    // `Object.prototype.toString` method
    // https://tc39.es/ecma262/#sec-object.prototype.tostring
    if (!TO_STRING_TAG_SUPPORT) {
      defineBuiltIn$2(Object.prototype, 'toString', toString$3, { unsafe: true });
    }

    var classof$2 = classof$5;

    var $String$1 = String;

    var toString$2 = function (argument) {
      if (classof$2(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
      return $String$1(argument);
    };

    // a string of all valid unicode whitespaces
    var whitespaces$2 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
      '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

    var uncurryThis$3 = functionUncurryThis;
    var requireObjectCoercible$1 = requireObjectCoercible$4;
    var toString$1 = toString$2;
    var whitespaces$1 = whitespaces$2;

    var replace = uncurryThis$3(''.replace);
    var ltrim = RegExp('^[' + whitespaces$1 + ']+');
    var rtrim = RegExp('(^|[^' + whitespaces$1 + '])[' + whitespaces$1 + ']+$');

    // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
    var createMethod = function (TYPE) {
      return function ($this) {
        var string = toString$1(requireObjectCoercible$1($this));
        if (TYPE & 1) string = replace(string, ltrim, '');
        if (TYPE & 2) string = replace(string, rtrim, '$1');
        return string;
      };
    };

    var stringTrim = {
      // `String.prototype.{ trimLeft, trimStart }` methods
      // https://tc39.es/ecma262/#sec-string.prototype.trimstart
      start: createMethod(1),
      // `String.prototype.{ trimRight, trimEnd }` methods
      // https://tc39.es/ecma262/#sec-string.prototype.trimend
      end: createMethod(2),
      // `String.prototype.trim` method
      // https://tc39.es/ecma262/#sec-string.prototype.trim
      trim: createMethod(3)
    };

    var globalThis$a = globalThis_1;
    var fails$1 = fails$d;
    var uncurryThis$2 = functionUncurryThis;
    var toString = toString$2;
    var trim = stringTrim.trim;
    var whitespaces = whitespaces$2;

    var charAt = uncurryThis$2(''.charAt);
    var $parseFloat$1 = globalThis$a.parseFloat;
    var Symbol$1 = globalThis$a.Symbol;
    var ITERATOR$3 = Symbol$1 && Symbol$1.iterator;
    var FORCED = 1 / $parseFloat$1(whitespaces + '-0') !== -Infinity
      // MS Edge 18- broken with boxed symbols
      || (ITERATOR$3 && !fails$1(function () { $parseFloat$1(Object(ITERATOR$3)); }));

    // `parseFloat` method
    // https://tc39.es/ecma262/#sec-parsefloat-string
    var numberParseFloat = FORCED ? function parseFloat(string) {
      var trimmedString = trim(toString(string));
      var result = $parseFloat$1(trimmedString);
      return result === 0 && charAt(trimmedString, 0) === '-' ? -0 : result;
    } : $parseFloat$1;

    var $$7 = _export;
    var $parseFloat = numberParseFloat;

    // `parseFloat` method
    // https://tc39.es/ecma262/#sec-parsefloat-string
    $$7({ global: true, forced: parseFloat !== $parseFloat }, {
      parseFloat: $parseFloat
    });

    /* global Bun, Deno -- detection */
    var globalThis$9 = globalThis_1;
    var userAgent$3 = environmentUserAgent;
    var classof$1 = classofRaw$2;

    var userAgentStartsWith = function (string) {
      return userAgent$3.slice(0, string.length) === string;
    };

    var environment = (function () {
      if (userAgentStartsWith('Bun/')) return 'BUN';
      if (userAgentStartsWith('Cloudflare-Workers')) return 'CLOUDFLARE';
      if (userAgentStartsWith('Deno/')) return 'DENO';
      if (userAgentStartsWith('Node.js/')) return 'NODE';
      if (globalThis$9.Bun && typeof Bun.version == 'string') return 'BUN';
      if (globalThis$9.Deno && typeof Deno.version == 'object') return 'DENO';
      if (classof$1(globalThis$9.process) === 'process') return 'NODE';
      if (globalThis$9.window && globalThis$9.document) return 'BROWSER';
      return 'REST';
    })();

    var ENVIRONMENT$1 = environment;

    var environmentIsNode = ENVIRONMENT$1 === 'NODE';

    var globalThis$8 = globalThis_1;

    var path$1 = globalThis$8;

    var uncurryThis$1 = functionUncurryThis;
    var aCallable$5 = aCallable$8;

    var functionUncurryThisAccessor = function (object, key, method) {
      try {
        // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
        return uncurryThis$1(aCallable$5(Object.getOwnPropertyDescriptor(object, key)[method]));
      } catch (error) { /* empty */ }
    };

    var isObject$3 = isObject$a;

    var isPossiblePrototype$1 = function (argument) {
      return isObject$3(argument) || argument === null;
    };

    var isPossiblePrototype = isPossiblePrototype$1;

    var $String = String;
    var $TypeError$6 = TypeError;

    var aPossiblePrototype$1 = function (argument) {
      if (isPossiblePrototype(argument)) return argument;
      throw new $TypeError$6("Can't set " + $String(argument) + ' as a prototype');
    };

    /* eslint-disable no-proto -- safe */
    var uncurryThisAccessor = functionUncurryThisAccessor;
    var isObject$2 = isObject$a;
    var requireObjectCoercible = requireObjectCoercible$4;
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
        requireObjectCoercible(O);
        aPossiblePrototype(proto);
        if (!isObject$2(O)) return O;
        if (CORRECT_SETTER) setter(O, proto);
        else O.__proto__ = proto;
        return O;
      };
    }() : undefined);

    var defineProperty$1 = objectDefineProperty.f;
    var hasOwn$1 = hasOwnProperty_1;
    var wellKnownSymbol$6 = wellKnownSymbol$d;

    var TO_STRING_TAG = wellKnownSymbol$6('toStringTag');

    var setToStringTag$1 = function (target, TAG, STATIC) {
      if (target && !STATIC) target = target.prototype;
      if (target && !hasOwn$1(target, TO_STRING_TAG)) {
        defineProperty$1(target, TO_STRING_TAG, { configurable: true, value: TAG });
      }
    };

    var makeBuiltIn = makeBuiltIn$3.exports;
    var defineProperty = objectDefineProperty;

    var defineBuiltInAccessor$1 = function (target, name, descriptor) {
      if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
      if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
      return defineProperty.f(target, name, descriptor);
    };

    var getBuiltIn$2 = getBuiltIn$7;
    var defineBuiltInAccessor = defineBuiltInAccessor$1;
    var wellKnownSymbol$5 = wellKnownSymbol$d;
    var DESCRIPTORS$1 = descriptors;

    var SPECIES$2 = wellKnownSymbol$5('species');

    var setSpecies$1 = function (CONSTRUCTOR_NAME) {
      var Constructor = getBuiltIn$2(CONSTRUCTOR_NAME);

      if (DESCRIPTORS$1 && Constructor && !Constructor[SPECIES$2]) {
        defineBuiltInAccessor(Constructor, SPECIES$2, {
          configurable: true,
          get: function () { return this; }
        });
      }
    };

    var isPrototypeOf$1 = objectIsPrototypeOf;

    var $TypeError$5 = TypeError;

    var anInstance$1 = function (it, Prototype) {
      if (isPrototypeOf$1(Prototype, it)) return it;
      throw new $TypeError$5('Incorrect invocation');
    };

    var isConstructor = isConstructor$2;
    var tryToString$2 = tryToString$4;

    var $TypeError$4 = TypeError;

    // `Assert: IsConstructor(argument) is true`
    var aConstructor$1 = function (argument) {
      if (isConstructor(argument)) return argument;
      throw new $TypeError$4(tryToString$2(argument) + ' is not a constructor');
    };

    var anObject$4 = anObject$9;
    var aConstructor = aConstructor$1;
    var isNullOrUndefined$1 = isNullOrUndefined$4;
    var wellKnownSymbol$4 = wellKnownSymbol$d;

    var SPECIES$1 = wellKnownSymbol$4('species');

    // `SpeciesConstructor` abstract operation
    // https://tc39.es/ecma262/#sec-speciesconstructor
    var speciesConstructor$1 = function (O, defaultConstructor) {
      var C = anObject$4(O).constructor;
      var S;
      return C === undefined || isNullOrUndefined$1(S = anObject$4(C)[SPECIES$1]) ? defaultConstructor : aConstructor(S);
    };

    var NATIVE_BIND = functionBindNative;

    var FunctionPrototype = Function.prototype;
    var apply$1 = FunctionPrototype.apply;
    var call$6 = FunctionPrototype.call;

    // eslint-disable-next-line es/no-function-prototype-bind, es/no-reflect -- safe
    var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call$6.bind(apply$1) : function () {
      return call$6.apply(apply$1, arguments);
    });

    var uncurryThis = functionUncurryThis;

    var arraySlice$1 = uncurryThis([].slice);

    var $TypeError$3 = TypeError;

    var validateArgumentsLength$1 = function (passed, required) {
      if (passed < required) throw new $TypeError$3('Not enough arguments');
      return passed;
    };

    var userAgent$2 = environmentUserAgent;

    var environmentIsIos = /ipad|iphone|ipod/i.test(userAgent$2) && /applewebkit/i.test(userAgent$2);

    var globalThis$7 = globalThis_1;
    var apply = functionApply;
    var bind$3 = functionBindContext;
    var isCallable$3 = isCallable$g;
    var hasOwn = hasOwnProperty_1;
    var fails = fails$d;
    var html = html$2;
    var arraySlice = arraySlice$1;
    var createElement = documentCreateElement$2;
    var validateArgumentsLength = validateArgumentsLength$1;
    var IS_IOS$1 = environmentIsIos;
    var IS_NODE$2 = environmentIsNode;

    var set = globalThis$7.setImmediate;
    var clear = globalThis$7.clearImmediate;
    var process$2 = globalThis$7.process;
    var Dispatch = globalThis$7.Dispatch;
    var Function$1 = globalThis$7.Function;
    var MessageChannel = globalThis$7.MessageChannel;
    var String$1 = globalThis$7.String;
    var counter = 0;
    var queue$2 = {};
    var ONREADYSTATECHANGE = 'onreadystatechange';
    var $location, defer, channel, port;

    fails(function () {
      // Deno throws a ReferenceError on `location` access without `--location` flag
      $location = globalThis$7.location;
    });

    var run$1 = function (id) {
      if (hasOwn(queue$2, id)) {
        var fn = queue$2[id];
        delete queue$2[id];
        fn();
      }
    };

    var runner = function (id) {
      return function () {
        run$1(id);
      };
    };

    var eventListener = function (event) {
      run$1(event.data);
    };

    var globalPostMessageDefer = function (id) {
      // old engines have not location.origin
      globalThis$7.postMessage(String$1(id), $location.protocol + '//' + $location.host);
    };

    // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
    if (!set || !clear) {
      set = function setImmediate(handler) {
        validateArgumentsLength(arguments.length, 1);
        var fn = isCallable$3(handler) ? handler : Function$1(handler);
        var args = arraySlice(arguments, 1);
        queue$2[++counter] = function () {
          apply(fn, undefined, args);
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
        channel = new MessageChannel();
        port = channel.port2;
        channel.port1.onmessage = eventListener;
        defer = bind$3(port.postMessage, port);
      // Browsers with postMessage, skip WebWorkers
      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
      } else if (
        globalThis$7.addEventListener &&
        isCallable$3(globalThis$7.postMessage) &&
        !globalThis$7.importScripts &&
        $location && $location.protocol !== 'file:' &&
        !fails(globalPostMessageDefer)
      ) {
        defer = globalPostMessageDefer;
        globalThis$7.addEventListener('message', eventListener, false);
      // IE8-
      } else if (ONREADYSTATECHANGE in createElement('script')) {
        defer = function (id) {
          html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
            html.removeChild(this);
            run$1(id);
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
      set: set,
      clear: clear
    };

    var globalThis$6 = globalThis_1;
    var DESCRIPTORS = descriptors;

    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

    // Avoid NodeJS experimental warning
    var safeGetBuiltIn$1 = function (name) {
      if (!DESCRIPTORS) return globalThis$6[name];
      var descriptor = getOwnPropertyDescriptor(globalThis$6, name);
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

    var userAgent$1 = environmentUserAgent;

    var environmentIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$1) && typeof Pebble != 'undefined';

    var userAgent = environmentUserAgent;

    var environmentIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

    var globalThis$5 = globalThis_1;
    var safeGetBuiltIn = safeGetBuiltIn$1;
    var bind$2 = functionBindContext;
    var macrotask = task$1.set;
    var Queue$1 = queue$1;
    var IS_IOS = environmentIsIos;
    var IS_IOS_PEBBLE = environmentIsIosPebble;
    var IS_WEBOS_WEBKIT = environmentIsWebosWebkit;
    var IS_NODE$1 = environmentIsNode;

    var MutationObserver = globalThis$5.MutationObserver || globalThis$5.WebKitMutationObserver;
    var document$2 = globalThis$5.document;
    var process$1 = globalThis$5.process;
    var Promise$1 = globalThis$5.Promise;
    var microtask$1 = safeGetBuiltIn('queueMicrotask');
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
        then = bind$2(promise.then, promise);
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
        macrotask = bind$2(macrotask, globalThis$5);
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

    var globalThis$4 = globalThis_1;

    var promiseNativeConstructor = globalThis$4.Promise;

    var globalThis$3 = globalThis_1;
    var NativePromiseConstructor$3 = promiseNativeConstructor;
    var isCallable$2 = isCallable$g;
    var isForced = isForced_1;
    var inspectSource = inspectSource$3;
    var wellKnownSymbol$3 = wellKnownSymbol$d;
    var ENVIRONMENT = environment;
    var V8_VERSION = environmentV8Version;

    NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
    var SPECIES = wellKnownSymbol$3('species');
    var SUBCLASSING = false;
    var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$2(globalThis$3.PromiseRejectionEvent);

    var FORCED_PROMISE_CONSTRUCTOR$5 = isForced('Promise', function () {
      var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor$3);
      var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor$3);
      // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // We can't detect it synchronously, so just check versions
      if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
      // We can't use @@species feature detection in V8 since it causes
      // deoptimization and performance degradation
      // https://github.com/zloirock/core-js/issues/679
      if (!V8_VERSION || V8_VERSION < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
        // Detect correctness of subclassing with @@species support
        var promise = new NativePromiseConstructor$3(function (resolve) { resolve(1); });
        var FakePromise = function (exec) {
          exec(function () { /* empty */ }, function () { /* empty */ });
        };
        var constructor = promise.constructor = {};
        constructor[SPECIES] = FakePromise;
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

    var aCallable$4 = aCallable$8;

    var $TypeError$2 = TypeError;

    var PromiseCapability = function (C) {
      var resolve, reject;
      this.promise = new C(function ($$resolve, $$reject) {
        if (resolve !== undefined || reject !== undefined) throw new $TypeError$2('Bad Promise constructor');
        resolve = $$resolve;
        reject = $$reject;
      });
      this.resolve = aCallable$4(resolve);
      this.reject = aCallable$4(reject);
    };

    // `NewPromiseCapability` abstract operation
    // https://tc39.es/ecma262/#sec-newpromisecapability
    newPromiseCapability$2.f = function (C) {
      return new PromiseCapability(C);
    };

    var $$6 = _export;
    var IS_NODE = environmentIsNode;
    var globalThis$2 = globalThis_1;
    var path = path$1;
    var call$5 = functionCall;
    var defineBuiltIn$1 = defineBuiltIn$4;
    var setPrototypeOf = objectSetPrototypeOf;
    var setToStringTag = setToStringTag$1;
    var setSpecies = setSpecies$1;
    var aCallable$3 = aCallable$8;
    var isCallable$1 = isCallable$g;
    var isObject$1 = isObject$a;
    var anInstance = anInstance$1;
    var speciesConstructor = speciesConstructor$1;
    var task = task$1.set;
    var microtask = microtask_1;
    var hostReportErrors = hostReportErrors$1;
    var perform$2 = perform$3;
    var Queue = queue$1;
    var InternalStateModule = internalState;
    var NativePromiseConstructor$2 = promiseNativeConstructor;
    var PromiseConstructorDetection = promiseConstructorDetection;
    var newPromiseCapabilityModule$3 = newPromiseCapability$2;

    var PROMISE = 'Promise';
    var FORCED_PROMISE_CONSTRUCTOR$4 = PromiseConstructorDetection.CONSTRUCTOR;
    var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
    var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
    var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
    var setInternalState = InternalStateModule.set;
    var NativePromisePrototype$1 = NativePromiseConstructor$2 && NativePromiseConstructor$2.prototype;
    var PromiseConstructor = NativePromiseConstructor$2;
    var PromisePrototype = NativePromisePrototype$1;
    var TypeError$1 = globalThis$2.TypeError;
    var document$1 = globalThis$2.document;
    var process = globalThis$2.process;
    var newPromiseCapability$1 = newPromiseCapabilityModule$3.f;
    var newGenericPromiseCapability = newPromiseCapability$1;

    var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && globalThis$2.dispatchEvent);
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
      return isObject$1(it) && isCallable$1(then = it.then) ? then : false;
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
            reject(new TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            call$5(then, result, resolve, reject);
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
        globalThis$2.dispatchEvent(event);
      } else event = { promise: promise, reason: reason };
      if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = globalThis$2['on' + name])) handler(event);
      else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
    };

    var onUnhandled = function (state) {
      call$5(task, globalThis$2, function () {
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
      call$5(task, globalThis$2, function () {
        var promise = state.facade;
        if (IS_NODE) {
          process.emit('rejectionHandled', promise);
        } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
      });
    };

    var bind$1 = function (fn, state, unwrap) {
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
        if (state.facade === value) throw new TypeError$1("Promise can't be resolved itself");
        var then = isThenable(value);
        if (then) {
          microtask(function () {
            var wrapper = { done: false };
            try {
              call$5(then, value,
                bind$1(internalResolve, wrapper, state),
                bind$1(internalReject, wrapper, state)
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
        anInstance(this, PromisePrototype);
        aCallable$3(executor);
        call$5(Internal, this);
        var state = getInternalPromiseState(this);
        try {
          executor(bind$1(internalResolve, state), bind$1(internalReject, state));
        } catch (error) {
          internalReject(state, error);
        }
      };

      PromisePrototype = PromiseConstructor.prototype;

      // eslint-disable-next-line no-unused-vars -- required for `.length`
      Internal = function Promise(executor) {
        setInternalState(this, {
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
      Internal.prototype = defineBuiltIn$1(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var state = getInternalPromiseState(this);
        var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
        state.parent = true;
        reaction.ok = isCallable$1(onFulfilled) ? onFulfilled : true;
        reaction.fail = isCallable$1(onRejected) && onRejected;
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
        this.resolve = bind$1(internalResolve, state);
        this.reject = bind$1(internalReject, state);
      };

      newPromiseCapabilityModule$3.f = newPromiseCapability$1 = function (C) {
        return C === PromiseConstructor || C === PromiseWrapper
          ? new OwnPromiseCapability(C)
          : newGenericPromiseCapability(C);
      };

      if (isCallable$1(NativePromiseConstructor$2) && NativePromisePrototype$1 !== Object.prototype) {
        nativeThen = NativePromisePrototype$1.then;

        if (!NATIVE_PROMISE_SUBCLASSING) {
          // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
          defineBuiltIn$1(NativePromisePrototype$1, 'then', function then(onFulfilled, onRejected) {
            var that = this;
            return new PromiseConstructor(function (resolve, reject) {
              call$5(nativeThen, that, resolve, reject);
            }).then(onFulfilled, onRejected);
          // https://github.com/zloirock/core-js/issues/640
          }, { unsafe: true });
        }

        // make `.constructor === Promise` work for native promise-based APIs
        try {
          delete NativePromisePrototype$1.constructor;
        } catch (error) { /* empty */ }

        // make `instanceof Promise` work for native promise-based APIs
        if (setPrototypeOf) {
          setPrototypeOf(NativePromisePrototype$1, PromisePrototype);
        }
      }
    }

    // `Promise` constructor
    // https://tc39.es/ecma262/#sec-promise-executor
    $$6({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
      Promise: PromiseConstructor
    });

    PromiseWrapper = path.Promise;

    setToStringTag(PromiseConstructor, PROMISE, false);
    setSpecies(PROMISE);

    var iterators = {};

    var wellKnownSymbol$2 = wellKnownSymbol$d;
    var Iterators$1 = iterators;

    var ITERATOR$2 = wellKnownSymbol$2('iterator');
    var ArrayPrototype = Array.prototype;

    // check on default Array iterator
    var isArrayIteratorMethod$1 = function (it) {
      return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$2] === it);
    };

    var classof = classof$5;
    var getMethod$1 = getMethod$3;
    var isNullOrUndefined = isNullOrUndefined$4;
    var Iterators = iterators;
    var wellKnownSymbol$1 = wellKnownSymbol$d;

    var ITERATOR$1 = wellKnownSymbol$1('iterator');

    var getIteratorMethod$2 = function (it) {
      if (!isNullOrUndefined(it)) return getMethod$1(it, ITERATOR$1)
        || getMethod$1(it, '@@iterator')
        || Iterators[classof(it)];
    };

    var call$4 = functionCall;
    var aCallable$2 = aCallable$8;
    var anObject$3 = anObject$9;
    var tryToString$1 = tryToString$4;
    var getIteratorMethod$1 = getIteratorMethod$2;

    var $TypeError$1 = TypeError;

    var getIterator$1 = function (argument, usingIterator) {
      var iteratorMethod = arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
      if (aCallable$2(iteratorMethod)) return anObject$3(call$4(iteratorMethod, argument));
      throw new $TypeError$1(tryToString$1(argument) + ' is not iterable');
    };

    var call$3 = functionCall;
    var anObject$2 = anObject$9;
    var getMethod = getMethod$3;

    var iteratorClose$1 = function (iterator, kind, value) {
      var innerResult, innerError;
      anObject$2(iterator);
      try {
        innerResult = getMethod(iterator, 'return');
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

    var bind = functionBindContext;
    var call$2 = functionCall;
    var anObject$1 = anObject$9;
    var tryToString = tryToString$4;
    var isArrayIteratorMethod = isArrayIteratorMethod$1;
    var lengthOfArrayLike = lengthOfArrayLike$3;
    var isPrototypeOf = objectIsPrototypeOf;
    var getIterator = getIterator$1;
    var getIteratorMethod = getIteratorMethod$2;
    var iteratorClose = iteratorClose$1;

    var $TypeError = TypeError;

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
      var fn = bind(unboundFunction, that);
      var iterator, iterFn, index, length, result, next, step;

      var stop = function (condition) {
        var $iterator = iterator;
        iterator = undefined;
        if ($iterator) iteratorClose($iterator, 'normal');
        return new Result(true, condition);
      };

      var callFn = function (value) {
        if (AS_ENTRIES) {
          anObject$1(value);
          return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
        } return INTERRUPTED ? fn(value, stop) : fn(value);
      };

      if (IS_RECORD) {
        iterator = iterable.iterator;
      } else if (IS_ITERATOR) {
        iterator = iterable;
      } else {
        iterFn = getIteratorMethod(iterable);
        if (!iterFn) throw new $TypeError(tryToString(iterable) + ' is not iterable');
        // optimisation for array iterators
        if (isArrayIteratorMethod(iterFn)) {
          for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
            result = callFn(iterable[index]);
            if (result && isPrototypeOf(ResultPrototype, result)) return result;
          } return new Result(false);
        }
        iterator = getIterator(iterable, iterFn);
      }

      next = IS_RECORD ? iterable.next : iterator.next;
      while (!(step = call$2(next, iterator)).done) {
        // `IteratorValue` errors should propagate without closing the iterator
        var value = step.value;
        try {
          result = callFn(value);
        } catch (error) {
          if (iterator) iteratorClose(iterator, 'throw', error);
          else throw error;
        }
        if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    };

    var wellKnownSymbol = wellKnownSymbol$d;

    var ITERATOR = wellKnownSymbol('iterator');
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
      iteratorWithReturn[ITERATOR] = function () {
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
        object[ITERATOR] = function () {
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

    var NativePromiseConstructor$1 = promiseNativeConstructor;
    var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
    var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;

    var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$3 || !checkCorrectnessOfIteration(function (iterable) {
      NativePromiseConstructor$1.all(iterable).then(undefined, function () { /* empty */ });
    });

    var $$5 = _export;
    var call$1 = functionCall;
    var aCallable$1 = aCallable$8;
    var newPromiseCapabilityModule$2 = newPromiseCapability$2;
    var perform$1 = perform$3;
    var iterate$1 = iterate$2;
    var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;

    // `Promise.all` method
    // https://tc39.es/ecma262/#sec-promise.all
    $$5({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$1 }, {
      all: function all(iterable) {
        var C = this;
        var capability = newPromiseCapabilityModule$2.f(C);
        var resolve = capability.resolve;
        var reject = capability.reject;
        var result = perform$1(function () {
          var $promiseResolve = aCallable$1(C.resolve);
          var values = [];
          var counter = 0;
          var remaining = 1;
          iterate$1(iterable, function (promise) {
            var index = counter++;
            var alreadyCalled = false;
            remaining++;
            call$1($promiseResolve, C, promise).then(function (value) {
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

    var $$4 = _export;
    var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
    var NativePromiseConstructor = promiseNativeConstructor;
    var getBuiltIn$1 = getBuiltIn$7;
    var isCallable = isCallable$g;
    var defineBuiltIn = defineBuiltIn$4;

    var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    $$4({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
      'catch': function (onRejected) {
        return this.then(undefined, onRejected);
      }
    });

    // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
    if (isCallable(NativePromiseConstructor)) {
      var method = getBuiltIn$1('Promise').prototype['catch'];
      if (NativePromisePrototype['catch'] !== method) {
        defineBuiltIn(NativePromisePrototype, 'catch', method, { unsafe: true });
      }
    }

    var $$3 = _export;
    var call = functionCall;
    var aCallable = aCallable$8;
    var newPromiseCapabilityModule$1 = newPromiseCapability$2;
    var perform = perform$3;
    var iterate = iterate$2;
    var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;

    // `Promise.race` method
    // https://tc39.es/ecma262/#sec-promise.race
    $$3({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
      race: function race(iterable) {
        var C = this;
        var capability = newPromiseCapabilityModule$1.f(C);
        var reject = capability.reject;
        var result = perform(function () {
          var $promiseResolve = aCallable(C.resolve);
          iterate(iterable, function (promise) {
            call($promiseResolve, C, promise).then(capability.resolve, reject);
          });
        });
        if (result.error) reject(result.value);
        return capability.promise;
      }
    });

    var $$2 = _export;
    var newPromiseCapabilityModule = newPromiseCapability$2;
    var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;

    // `Promise.reject` method
    // https://tc39.es/ecma262/#sec-promise.reject
    $$2({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
      reject: function reject(r) {
        var capability = newPromiseCapabilityModule.f(this);
        var capabilityReject = capability.reject;
        capabilityReject(r);
        return capability.promise;
      }
    });

    var anObject = anObject$9;
    var isObject = isObject$a;
    var newPromiseCapability = newPromiseCapability$2;

    var promiseResolve$1 = function (C, x) {
      anObject(C);
      if (isObject(x) && x.constructor === C) return x;
      var promiseCapability = newPromiseCapability.f(C);
      var resolve = promiseCapability.resolve;
      resolve(x);
      return promiseCapability.promise;
    };

    var $$1 = _export;
    var getBuiltIn = getBuiltIn$7;
    var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
    var promiseResolve = promiseResolve$1;

    getBuiltIn('Promise');

    // `Promise.resolve` method
    // https://tc39.es/ecma262/#sec-promise.resolve
    $$1({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
      resolve: function resolve(x) {
        return promiseResolve(this, x);
      }
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

    var lamps = [];
    var colors = ['red', 'blue', 'yellow', 'green'];
    function resetLamps() {
      lamps.forEach(function (l) {
        l.opacity = 0.2;
      });
    }
    var mode = 0;
    var timer = null;
    var snakeHead = 0;
    var snakeLength = 5;
    var colorIndex = 0;
    function startMode(newMode) {
      mode = newMode;
      clearInterval(timer);
      if (mode === 0) timer = setInterval(treeMode, 120);
      if (mode === 1) timer = setInterval(colorCycle, 700);
      if (mode === 2) timer = setInterval(snake, 100);
    }
    function snake() {
      resetLamps();
      for (var i = 0; i < snakeLength; i++) {
        var index = (snakeHead - i + lamps.length) % lamps.length;
        lamps[index].opacity = 1 - i / snakeLength;
      }
      snakeHead = (snakeHead + 1) % lamps.length;
    }
    function colorCycle() {
      var activeColor = colors[colorIndex];
      lamps.forEach(function (lamp) {
        lamp.opacity = lamp.color === activeColor ? 1 : 0.2;
      });
      colorIndex = (colorIndex + 1) % colors.length;
    }
    function treeMode() {
      lamps.forEach(function (lamp) {
        // случайный старт вспышки
        if (lamp.state === 'idle' && Math.random() < 0.02) {
          lamp.state = 'up';
          lamp.speed = Math.random() * 0.15 + 0.08;
        }

        // рост яркости
        if (lamp.state === 'up') {
          lamp.opacity += lamp.speed;
          if (lamp.opacity >= 1) {
            lamp.opacity = 1;
            lamp.state = 'down';
          }
        }

        // затухание
        if (lamp.state === 'down') {
          lamp.opacity -= 0.05;
          if (lamp.opacity <= 0.2) {
            lamp.opacity = 0.2;
            lamp.state = 'idle';
          }
        }
      });
    }
    function run(garland) {
      lamps = garland.find('.lamp').toArray().map(function (el) {
        return {
          element: el,
          get color() {
            return el.attributes['data-color'].value;
          },
          set color(value) {
            el.setAttribute('data-color', value);
          },
          get opacity() {
            return parseFloat(el.style.opacity) || 0;
          },
          set opacity(value) {
            el.style.opacity = value;
          },
          speed: 0,
          state: 'down'
        };
      });
      startMode(0);
      setInterval(function () {
        startMode((mode + 1) % 3);
      }, 60000);
    }
    var Garland = {
      run: run
    };

    function pluginSnow() {
      window.plugin_snow_ready = true;
      function add() {
        var logo = $("<div class=\"head__logo-cap\">\n            ".concat(Template.cap, "\n        </div>"));
        var garland = $("<div class=\"garland\">\n            ".concat(Template.garland, "\n        </div>"));
        $('.head .head__logo-icon').append(logo);
        $('.head').prepend(garland);
        $('body').append("<style>.head__logo-cap{position:absolute;top:-0.95em;left:-1.25em}.head__logo-cap svg{width:3.2em !important;height:3.2em !important}.garland{position:absolute;top:0;left:0;width:7em !important;height:4.7em !important;pointer-events:none;z-index:-1}</style>");
        Garland.run(garland);
      }
      if (window.appready) add();else {
        Lampa.Listener.follow('app', function (e) {
          if (e.type == 'ready') add();
        });
      }
    }
    if (!window.plugin_snow_ready) pluginSnow();

})();
