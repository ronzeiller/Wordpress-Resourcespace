/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 1 */
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ 69);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {
		return null;
	}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = normalizeComponent;
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 5 */
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 6 */
/*!*****************************************************!*\
  !*** ./src/block/edit.vue?vue&type=script&lang=js& ***!
  \*****************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_script_lang_js___ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--0!../../node_modules/vue-loader/lib??vue-loader-options!./edit.vue?vue&type=script&lang=js& */ 7);
/* unused harmony namespace reexport */
 /* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_script_lang_js___["a" /* default */]); 

/***/ }),
/* 7 */
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/block/edit.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__admin_js_src_search_form_src_components_Modal_vue__ = __webpack_require__(/*! ../../../admin/js/src/search-form/src/components/Modal.vue */ 55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(/*! jquery */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
//
//
//
//
//
//
//
//
//
//
//

/*
    <block-controls>
      <block-alignment-toolbar :value="attributes.align"
          :onChange="align => setAttributes( { align } )"
          :controls="[ 'wide', 'full' ]"
       />
    </block-controls>
import { ReactInVue } from 'vuera';
const {
  BlockControls,
  BlockAlignmentToolbar,
} = wp.editor;
*/
//import Modal from './resourcespace-adra-search-form.js';


//import Modal from './tmp.vue';
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      showModal: false,
      onSelect: 'blockEditor',
      redered: 'waiting',
      resourceId: '',
      resourceSize: ''
    };
  },

  components: { Modal: __WEBPACK_IMPORTED_MODULE_0__admin_js_src_search_form_src_components_Modal_vue__["a" /* default */] },
  mounted: function mounted() {
    this.resourceId = this.attributes.attributes.resourceId;
    this.resourceSize = this.attributes.attributes.resourceSize;
    this.renderResource();
  },
  props: ['attributes'],
  //   components: {
  //     'block-controls': ReactInVue(BlockControls),
  //     'block-alignment-toolbar': ReactInVue(BlockAlignmentToolbar),
  //   },
  methods: {
    renderResource: function renderResource() {
      var attributes = { id: this.resourceId, size_id: this.resourceSize };
      if (this.resourceId != '') {
        var that = this;
        __WEBPACK_IMPORTED_MODULE_1_jquery___default.a.ajax({
          url: "/wp-admin/admin-ajax.php?action=resourcespace_get_rendered_shortcode",
          async: false,
          data: attributes,
          success: function success(result) {
            that.redered = JSON.parse(result).html;
            that.saveAttributes();
          }
        });
      } else {
        this.redered = "&nbsp;";
        this.saveAttributes();
      }
    },
    saveAttributes: function saveAttributes() {
      this.attributes['setAttributes']({ 'resourceId': this.resourceId, 'resourceSize': this.resourceSize, 'htmlSource': this.redered });
    },
    doOnClose: function doOnClose() {
      this.showModal = false;
    },
    showHide: function showHide() {
      this.showModal = !this.showModal;
    },
    resourceSelected: function resourceSelected(value) {
      if (typeof value.id != 'undefined') {
        //this.attributes['setAttributes']({'resourceId':value.id,'resourceSize':value.size,htmlSource:''});
        this.resourceId = value.id;
        this.resourceSize = value.size;
        this.renderResource();
      }
    }
  }
});

/***/ }),
/* 8 */
/*!*************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/Modal.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_script_lang_js___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/babel-loader/lib??ref--0!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./Modal.vue?vue&type=script&lang=js& */ 9);
/* unused harmony namespace reexport */
 /* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_script_lang_js___["a" /* default */]); 

/***/ }),
/* 9 */
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/Modal.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SearchForm_vue__ = __webpack_require__(/*! ./SearchForm.vue */ 58);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'VueModal',
    components: { SearchForm: __WEBPACK_IMPORTED_MODULE_0__SearchForm_vue__["a" /* default */] },
    data: () => ({
        resourceDetails: false,
        resourceFields: [],
        resourceImages: []

    }),
    props: ['show', 'onSelect'],
    methods: {
        close(value) {
            this.$emit('close');
            //if(value && this.onSelect.indexOf('widgetInsert')!==0){
            if (value && this.onSelect.indexOf('widgetInsert') !== 0) {
                this.$emit('resourceSelected', value);
            }
        }
    },
    mounted: function () {
        document.addEventListener("keydown", e => {
            if (this.show && e.keyCode == 27) {
                this.close(false);
            }
        });
    },
    watch: {
        show: function (newVal, oldVal) {
            var wpAdminBar = document.getElementsByClassName("edit-post-header");
            if (wpAdminBar.length) {
                if (newVal) {
                    wpAdminBar[0].style.zIndex = "auto";
                } else {
                    wpAdminBar[0].style.zIndex = "30";
                }
            }
        }
    }
});

/***/ }),
/* 10 */
/*!******************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/SearchForm.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchForm_vue_vue_type_script_lang_js___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/babel-loader/lib??ref--0!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./SearchForm.vue?vue&type=script&lang=js& */ 11);
/* unused harmony namespace reexport */
 /* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchForm_vue_vue_type_script_lang_js___["a" /* default */]); 

/***/ }),
/* 11 */
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/SearchForm.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ResourceList_vue__ = __webpack_require__(/*! ./ResourceList.vue */ 61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ResourceTypeInput_vue__ = __webpack_require__(/*! ./ResourceTypeInput.vue */ 72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AdvancedSearch_vue__ = __webpack_require__(/*! ./AdvancedSearch.vue */ 77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Paginator_vue__ = __webpack_require__(/*! ./Paginator.vue */ 105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(/*! jquery */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jquery__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'SearchForm',
  props: ['onSelect', 'showTitle', 'clean'],
  components: { ResourceList: __WEBPACK_IMPORTED_MODULE_0__ResourceList_vue__["a" /* default */], ResourceTypeInput: __WEBPACK_IMPORTED_MODULE_1__ResourceTypeInput_vue__["a" /* default */], AdvancedSearch: __WEBPACK_IMPORTED_MODULE_2__AdvancedSearch_vue__["a" /* default */], Paginator: __WEBPACK_IMPORTED_MODULE_3__Paginator_vue__["a" /* default */] },
  data: () => ({
    resultsOffset: 0,
    offsetStep: 20,
    searchedTerm: '',
    formFields: [],
    searchFormSelectedValues: {},
    searchResults: [],
    searchResultsCounter: 0,
    currentResource: 0,
    showAdvancedForm: false,
    advancedSerchFormIsExpanded: false,
    searchValue: '',
    showNoResults: false,
    containerWidth: 0,
    displayOnIndex: -1,
    selectedIndex: -1,
    selectedResourceDetails: false,
    defaultResources: false
  }),
  watch: {
    clean: function (val) {
      if (val) {
        this.searchValue = '';
        this.searchResults = false;
        this.searchFormSelectedValues = {};
      }
    }
  },
  mounted: function () {
    this.getSerchForm();
    window.addEventListener('resize', this.getContainerWidth);
  },
  methods: {
    doPaginate(value) {
      this.resultsOffset += value * this.offsetStep;
      if (this.resultsOffset < 0) {
        this.resultsOffset = 0;
      }
      this.getSearchResults();
    },
    resetSearchForm() {
      this.searchValue = '';
      this.searchResults = '';

      if (this.showAdvancedForm) {
        let idx = 0;
        for (idx = 0; idx < this.formFields.second_tab.length; idx++) {
          this.formFields.second_tab[idx].value = this.formFields.second_tab[idx].default_value;
        }
        for (idx = 0; idx < this.formFields.first_tab.length; idx++) {
          this.formFields.first_tab[idx].value = this.formFields.first_tab[idx].default_value;
        }
        this.defaultResources.push([]);
        this.formFields.main_form = this.defaultResources;
      }
      this.searchFormSelectedValues = [];
    },
    getContainerWidth() {
      var container = document.getElementsByClassName("resourcespace-adra-search-results");
      if (container[0]) {
        this.containerWidth = container[0].offsetWidth;
      }
      this.onResizeSetContainer();
    },
    update(objValue) {
      this.searchFormSelectedValues[objValue.fieldName] = objValue.value;
      if (this.formFields.hasOwnProperty('first_tab')) {
        for (let i = 0; i < this.formFields.first_tab.length; i++) {
          if (this.formFields.first_tab[i].name == objValue.fieldName) {
            this.formFields.first_tab[i].value = objValue.value;
          }
        }
        for (let i = 0; i < this.formFields.second_tab.length; i++) {
          if (this.formFields.second_tab[i].name == objValue.fieldName) {
            this.formFields.second_tab[i].value = objValue.value;
          }
        }
      }
    },
    getSerchForm() {
      var queryString = '?action=resourcespace_get_form_fields';
      var that = this;
      fetch(window.ajaxurl + queryString).then(response => {
        return response.json();
      }).then(data => {
        that.formFields = data;
        if (!this.defaultResources) {
          that.defaultResources = [];
          for (let i = 0; i < data.main_form.length; i++) {
            that.defaultResources.push(data.main_form[i]);
          }
        }
        that.showAdvancedForm = true;
      });
    },
    getSearchResults() {
      this.selectedResourceDetails = false;
      this.selectedIndex = -1;
      this.advancedSerchFormIsExpanded = false;
      this.searchResults = [];
      var data = {
        'action': 'resourcespace_get_search_results',
        'offset': this.resultsOffset
      };
      for (var p in this.searchFormSelectedValues) {
        if (this.searchFormSelectedValues.hasOwnProperty(p)) {
          if (p == 'limit') {
            this.offsetStep = this.searchFormSelectedValues[p];
          }
          data[p] = this.searchFormSelectedValues[p];
        }
      }
      this.showNoResults = false;
      var that = this;
      __WEBPACK_IMPORTED_MODULE_4_jquery___default.a.post(window.ajaxurl, data).then(data => {
        that.searchResults = JSON.parse(data);
        if (that.searchResults.length == 0) {
          that.showNoResults = true;
        }
      });
    },
    getSearchResultsCounter() {
      this.searchResults = [];
      var data = {
        'action': 'resourcespace_get_search_results_counter'
      };
      for (var p in this.searchFormSelectedValues) {
        if (this.searchFormSelectedValues.hasOwnProperty(p)) {
          if (p != 'limit') {
            data[p] = this.searchFormSelectedValues[p];
          }
        }
      }
      var that = this;
      that.searchResultsCounter = 0;
      __WEBPACK_IMPORTED_MODULE_4_jquery___default.a.post(window.ajaxurl, data).then(data => {
        that.searchResultsCounter = JSON.parse(data);
      });
    },
    setSearchValues() {
      //this.formFields.forEach( this.setSearchValue );
    },
    setSearchValue(fieldDef, _index) {
      this.searchFormSelectedValues[fieldDef.name] = fieldDef.default_value;
    },
    submitSearch() {
      this.resultsOffset = 0;
      this.getSearchResults();
      this.getSearchResultsCounter();
    },
    onResizeSetContainer() {
      if (this.selectedResourceId > 0 && this.containerWidth > 0) {
        var colsPerRow = Math.floor(this.containerWidth / 197);
        var selectedRow = Math.floor(this.selectedIndex / colsPerRow) + 1;
        var containterDetailIndex = selectedRow * colsPerRow;
        if (containterDetailIndex > this.searchResults.length) {
          containterDetailIndex = this.searchResults.length;
        }
        this.displayOnIndex = containterDetailIndex - 1;
      }
    },
    setSelectedResource(value) {
      this.selectedIndex = value.selectedIndex;

      var colsPerRow = Math.floor(this.containerWidth / 197);
      var selectedRow = Math.floor(value.selectedIndex / colsPerRow) + 1;
      var containterDetailIndex = selectedRow * colsPerRow;
      if (containterDetailIndex > this.searchResults.length) {
        containterDetailIndex = this.searchResults.length;
      }
      if (this.selectedResourceId != value.resourceId) {
        this.selectedResourceId = value.resourceId;
        this.displayOnIndex = containterDetailIndex - 1;
        this.getResourceDetails();
      } else {
        this.selectedResourceId = 0;
        this.displayOnIndex = -1;
      }
    },
    hideDetails(value) {
      this.currentResource = 0;
    },
    selectedDate(value) {
      if (value) {
        this.searchFormSelectedValues['month_interval'] = value.format('YYYY|MM') + '|01';
      } else {
        this.searchFormSelectedValues['month_interval'] = null;
      }
    },
    resourceSelected(value) {
      this.currentResource = 0;
      this.$emit('resourceSelected', value);
    },
    getResourceDetails() {
      if (this.displayOnIndex >= 0) {
        this.selectedResourceDetails = false;
        var queryString = '?action=resourcespace_get_resource_details&resource_id=' + this.selectedResourceId;
        var that = this;
        fetch(window.ajaxurl + queryString).then(response => {
          return response.json();
        }).then(data => {
          if (this.onSelect != 'mediaLibrary') {
            that.selectedResourceDetails = data;
          } else {
            var queryString = '?action=resourcespace_check_media_library&resource_id=' + this.selectedResourceId;
            fetch(window.ajaxurl + queryString).then(response => {
              return response.json();
            }).then(checkData => {
              data.imported = checkData;
              that.selectedResourceDetails = data;
            }).catch(error => {
              data.imported = 0;
              that.selectedResourceDetails = data;
            });
          }
        });
      }
    }
  }
});

/***/ }),
/* 12 */
/*!********************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/ResourceList.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceList_vue_vue_type_script_lang_js___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/babel-loader/lib??ref--0!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./ResourceList.vue?vue&type=script&lang=js& */ 13);
/* unused harmony namespace reexport */
 /* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceList_vue_vue_type_script_lang_js___["a" /* default */]); 

/***/ }),
/* 13 */
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/ResourceList.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ResourceDetails_vue__ = __webpack_require__(/*! ./ResourceDetails.vue */ 64);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'ResourceList',
  props: ['resource', 'onSelect', 'selectedResourceId', 'index', 'displayOnIndex', 'selectedResourceDetails', 'selectedIndex'],
  components: { ResourceDetails: __WEBPACK_IMPORTED_MODULE_0__ResourceDetails_vue__["a" /* default */] },
  data: () => ({}),
  mounted() {
    this.$emit('resourceMounted', {});
  },
  methods: {
    getDetais() {
      this.$emit('selectResource', { resourceId: this.resource.ref, selectedIndex: this.index });
    },
    resourceSelected(value) {
      this.$emit('resourceSelected', value);
    }
  },
  computed: {
    setBorderColor: function () {
      var color = '1px solid #ccc';
      if (this.selectedIndex == this.index) {
        color = '1px solid #ff0000';
      }
      return color;
    }
  }
});

/***/ }),
/* 14 */
/*!***********************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/ResourceDetails.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceDetails_vue_vue_type_script_lang_js___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/babel-loader/lib??ref--0!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./ResourceDetails.vue?vue&type=script&lang=js& */ 15);
/* unused harmony namespace reexport */
 /* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceDetails_vue_vue_type_script_lang_js___["a" /* default */]); 

/***/ }),
/* 15 */
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/ResourceDetails.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'ResourceDetails',
    props: ['resourceId', 'onSelect', 'resourceDetails'],
    data: () => ({
        disableImport: false,
        importing: false
    }),
    computed: {
        buttonText() {
            if (this.onSelect == 'copyClipboard') {
                return 'copy shortcode';
            } else if (this.onSelect == 'mediaLibrary') {
                return 'insert into media library';
            } else {
                return 'insert shortcode';
            }
        }
    },
    watch: {
        resourceDetails: function (val) {}
    },
    mounted() {},
    methods: {
        selectSize(resourceId, resourceSize) {
            if (this.onSelect == 'copyClipboard') {
                this.copyToClipboard(resourceId, resourceSize);
            }
            if (this.onSelect == 'classicInsert') {
                this.insertInClassicEditor(resourceId, resourceSize);
                //this.$emit('resourceSelected', {id:resourceId,size:resourceSize} );
            }
            if (this.onSelect == 'mediaLibrary') {
                this.inserInMediaLibrary(resourceId, resourceSize);
            }
            if (this.onSelect.indexOf('widgetInsert') === 0) {
                var timestamp = this.onSelect.substring(13);
                this.widgetInsert(resourceId, resourceSize, timestamp);
            }
            this.$emit('resourceSelected', { id: resourceId, size: resourceSize });
        },
        inserInMediaLibrary(resourceId, resourceSize) {

            var data = {
                'action': 'resourcespace_insert_into_media_library',
                'resource': this.resourceDetails,
                'resourceId': resourceId,
                'resourceSize': resourceSize
            };

            var that = this;
            this.disableImport = true;
            this.importing = true;
            __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.post(window.ajaxurl, data).then(data => {
                //that.searchResults = JSON.parse(data);
                if (JSON.parse(data)['uploaded']) {
                    this.resourceDetails.imported = 1;
                } else {
                    this.resourceDetails.imported = 0;
                }
                //console.log( data );
                that.disableImport = false;
                that.importing = false;
            });
        },
        insertInClassicEditor(resourceId, resourceSize) {
            var str = '[resourcespace id=' + resourceId + ']';
            if (resourceSize != '') {
                str = '[resourcespace id=' + resourceId + ' size_id=' + resourceSize + ']';
            }
            wp.media.editor.insert(str);
        },
        widgetInsert(resourceId, resourceSize, timestamp) {
            var input = document.getElementsByClassName("resource-id-" + timestamp);
            input[0].value = resourceId;
            input = document.getElementsByClassName("resource-size-" + timestamp);
            input[0].value = resourceSize;
            // if ("createEvent" in document) {
            //     var evt = document.createEvent("HTMLEvents");
            //     evt.initEvent("change", false, true);
            //     input[0].dispatchEvent(evt);
            // }
            // else{
            //     input[0].fireEvent("onchange");
            // }
            var keyboardEvent = new KeyboardEvent('keydown', {
                code: 'Enter',
                key: 'Enter',
                charKode: 13,
                keyCode: 13,
                view: window
            });
            input[0].dispatchEvent(keyboardEvent);
        },
        copyToClipboard(resourceId, resourceSize) {
            var str = '[resourcespace id=' + resourceId + ']';
            if (resourceSize != '') {
                str = '[resourcespace id=' + resourceId + ' size_id=' + resourceSize + ']';
            }
            var el = document.createElement('textarea');
            el.value = str;
            el.setAttribute('readonly', '');
            el.style = { position: 'absolute', left: '-9999px' };
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            alert("Copied the text: " + str);
        }
    }

});

/***/ }),
/* 16 */
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/ResourceDetails.vue?vue&type=style&index=0&id=5df0fca9&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./ResourceDetails.vue?vue&type=style&index=0&id=5df0fca9&scoped=true&lang=css& */ 68);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../block-editor/node_modules/style-loader/lib/addStyles.js */ 1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./ResourceDetails.vue?vue&type=style&index=0&id=5df0fca9&scoped=true&lang=css&", function() {
		var newContent = require("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./ResourceDetails.vue?vue&type=style&index=0&id=5df0fca9&scoped=true&lang=css&");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 17 */
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/ResourceList.vue?vue&type=style&index=0&id=557c1e4d&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./ResourceList.vue?vue&type=style&index=0&id=557c1e4d&scoped=true&lang=css& */ 71);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../block-editor/node_modules/style-loader/lib/addStyles.js */ 1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./ResourceList.vue?vue&type=style&index=0&id=557c1e4d&scoped=true&lang=css&", function() {
		var newContent = require("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./ResourceList.vue?vue&type=style&index=0&id=557c1e4d&scoped=true&lang=css&");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 18 */
/*!*************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/ResourceTypeInput.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceTypeInput_vue_vue_type_script_lang_js___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/babel-loader/lib??ref--0!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./ResourceTypeInput.vue?vue&type=script&lang=js& */ 19);
/* unused harmony namespace reexport */
 /* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceTypeInput_vue_vue_type_script_lang_js___["a" /* default */]); 

/***/ }),
/* 19 */
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/ResourceTypeInput.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'ResourceTypeInput',
    props: ['fieldDef'],
    mounted: function () {
        for (var i in this.fieldDef) {
            this.selectedResources[this.fieldDef[i].resourceId] = this.fieldDef[i].checked;
        }
        this.$emit('input', { fieldName: 'resource_id', value: this.selectedResources });
    },
    watch: {
        fieldDef(newVal) {
            for (let i = 0; i < newVal.length; i++) {
                if (newVal[i].hasOwnProperty('checked')) {
                    document.getElementById("_" + newVal[i].resourceId).checked = newVal[i].checked;
                }
            }
        }
    },
    methods: {
        onChange(obj) {
            this.selectedResources[obj] = document.getElementById("_" + obj).checked;
            this.$emit('input', { fieldName: 'resource_id', value: this.selectedResources });
        }
    },

    data: () => ({
        selectedResources: {}
    })
});

/***/ }),
/* 20 */
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/ResourceTypeInput.vue?vue&type=style&index=0&id=64a35838&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./ResourceTypeInput.vue?vue&type=style&index=0&id=64a35838&scoped=true&lang=css& */ 76);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../block-editor/node_modules/style-loader/lib/addStyles.js */ 1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./ResourceTypeInput.vue?vue&type=style&index=0&id=64a35838&scoped=true&lang=css&", function() {
		var newContent = require("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./ResourceTypeInput.vue?vue&type=style&index=0&id=64a35838&scoped=true&lang=css&");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 21 */
/*!**********************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/AdvancedSearch.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_AdvancedSearch_vue_vue_type_script_lang_js___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/babel-loader/lib??ref--0!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./AdvancedSearch.vue?vue&type=script&lang=js& */ 22);
/* unused harmony namespace reexport */
 /* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_AdvancedSearch_vue_vue_type_script_lang_js___["a" /* default */]); 

/***/ }),
/* 22 */
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/AdvancedSearch.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_slim_tabs__ = __webpack_require__(/*! vue-slim-tabs */ 80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CustomInput_vue__ = __webpack_require__(/*! ./CustomInput.vue */ 81);
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'AdvancedSearch',
    components: { Tabs: __WEBPACK_IMPORTED_MODULE_0_vue_slim_tabs__["b" /* Tabs */], Tab: __WEBPACK_IMPORTED_MODULE_0_vue_slim_tabs__["a" /* Tab */], CustomInput: __WEBPACK_IMPORTED_MODULE_1__CustomInput_vue__["a" /* default */] },
    props: ['formFields'],
    mounted: function () {},
    methods: {
        update(key, keyValue) {
            this.$emit('input', { fieldName: key, value: keyValue });
        }
    }
});

/***/ }),
/* 23 */
/*!*******************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/CustomInput.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomInput_vue_vue_type_script_lang_js___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/babel-loader/lib??ref--0!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./CustomInput.vue?vue&type=script&lang=js& */ 24);
/* unused harmony namespace reexport */
 /* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomInput_vue_vue_type_script_lang_js___["a" /* default */]); 

/***/ }),
/* 24 */
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/CustomInput.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TextInput_vue__ = __webpack_require__(/*! ./TextInput.vue */ 84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CustomSelect_vue__ = __webpack_require__(/*! ./CustomSelect.vue */ 89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CustomMonthlyPicker_vue__ = __webpack_require__(/*! ./CustomMonthlyPicker.vue */ 94);
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'CustomInput',
    components: { CustomSelect: __WEBPACK_IMPORTED_MODULE_1__CustomSelect_vue__["a" /* default */], TextInput: __WEBPACK_IMPORTED_MODULE_0__TextInput_vue__["a" /* default */], CustomMonthlyPicker: __WEBPACK_IMPORTED_MODULE_2__CustomMonthlyPicker_vue__["a" /* default */] },
    props: ['fieldDef', 'index'],
    methods: {
        update(_key, value) {
            this.$emit('input', value);
        },
        updateDate(_key, value) {
            this.$emit('inputDate', { 'value': value, 'type': 'date' });
        }

    },
    data: () => ({
        selectedMonth: moment(),
        tmp: moment(null)
    })
});

/***/ }),
/* 25 */
/*!*****************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/TextInput.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_TextInput_vue_vue_type_script_lang_js___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/babel-loader/lib??ref--0!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./TextInput.vue?vue&type=script&lang=js& */ 26);
/* unused harmony namespace reexport */
 /* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_TextInput_vue_vue_type_script_lang_js___["a" /* default */]); 

/***/ }),
/* 26 */
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/TextInput.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'TextInput',
    props: ['fieldDef', 'value'],
    mounted: function () {
        this.fieldDef.value = this.value;
    },

    methods: {
        update(key, value) {
            this.value = value;
            this.$emit('input', value);
        }
    }
});

/***/ }),
/* 27 */
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/TextInput.vue?vue&type=style&index=0&id=eaaaff32&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./TextInput.vue?vue&type=style&index=0&id=eaaaff32&scoped=true&lang=css& */ 88);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../block-editor/node_modules/style-loader/lib/addStyles.js */ 1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./TextInput.vue?vue&type=style&index=0&id=eaaaff32&scoped=true&lang=css&", function() {
		var newContent = require("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./TextInput.vue?vue&type=style&index=0&id=eaaaff32&scoped=true&lang=css&");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 28 */
/*!********************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/CustomSelect.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomSelect_vue_vue_type_script_lang_js___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/babel-loader/lib??ref--0!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./CustomSelect.vue?vue&type=script&lang=js& */ 29);
/* unused harmony namespace reexport */
 /* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomSelect_vue_vue_type_script_lang_js___["a" /* default */]); 

/***/ }),
/* 29 */
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/CustomSelect.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'CustomSelect',
    props: ['fieldDef', 'value'],
    methods: {
        update(key, value) {
            this.$emit('input', value);
        }
    },
    watch: {
        value(newVal, oldVal) {
            this.$refs.selectBox.value = newVal;
        }
    },
    data: () => ({
        hasBeenSelected: false
    })
});

/***/ }),
/* 30 */
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/CustomSelect.vue?vue&type=style&index=0&id=edc8b4cc&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./CustomSelect.vue?vue&type=style&index=0&id=edc8b4cc&scoped=true&lang=css& */ 93);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../block-editor/node_modules/style-loader/lib/addStyles.js */ 1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomSelect.vue?vue&type=style&index=0&id=edc8b4cc&scoped=true&lang=css&", function() {
		var newContent = require("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomSelect.vue?vue&type=style&index=0&id=edc8b4cc&scoped=true&lang=css&");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 31 */
/*!***************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/CustomMonthlyPicker.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomMonthlyPicker_vue_vue_type_script_lang_js___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/babel-loader/lib??ref--0!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./CustomMonthlyPicker.vue?vue&type=script&lang=js& */ 32);
/* unused harmony namespace reexport */
 /* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomMonthlyPicker_vue_vue_type_script_lang_js___["a" /* default */]); 

/***/ }),
/* 32 */
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/CustomMonthlyPicker.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'CustomMonthlyPicker',
  props: {
    fieldDef: {},
    'value': {
      default: null
    },
    'disabled': {
      type: Boolean,
      default: false
    },
    'inputClass': {
      default: 'input'
    },
    'placeHolder': {
      type: String,
      default: ''
    },
    'alignment': {
      type: String,
      default: 'left',
      validator: function (value) {
        // The value must match one of these strings
        return ['left', 'right', 'center'].indexOf(value) !== -1;
      }
    },
    'selectedBackgroundColor': {
      type: String,
      default: '#007bff'
    },
    monthLabels: {
      type: Array,
      default: function () {
        return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
      }
    },
    min: {
      default: null
    },
    max: {
      default: null
    },
    dateFormat: {
      type: String,
      default: 'YYYY/MM'
    },
    clearOption: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showMenu: false,
      year: moment().format('YYYY'),
      month: moment().format('MM'),
      selected: false
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    value: function (value) {
      this.setValue(value);
    }
  },
  computed: {
    menuClass() {
      return {
        visible: this.showMenu,
        hidden: !this.showMenu
      };
    },
    menuStyle() {
      return {
        display: this.showMenu ? 'block' : 'none',
        'left': this.alignment === 'right' ? '100%' : this.alignment === 'center' ? '50%' : '',
        'transform': this.alignment === 'right' ? 'translate(-100%,0)' : this.alignment === 'center' ? 'translate(-50%,0)' : ''
      };
    },
    displayText() {
      var tmpText = '';
      if (this.selected) {
        tmpText = this.year + '/' + this.month;
      } else {
        tmpText = '';
      }
      return tmpText;
    },
    canBack() {
      if (!this.min) return true;
      const currentVal = this.internalMomentValue.clone().startOf('year');
      return this.min.isBefore(currentVal);
    },
    canNext() {
      if (!this.max) return true;
      const currentVal = this.internalMomentValue.clone().endOf('year');
      return currentVal.isBefore(this.max);
    },
    internalMomentValue() {
      var yrMonth = this.year + '-0' + this.month;
      if (this.month.length > 1) {
        yrMonth = this.year + '-' + this.month;
      }
      return moment(yrMonth, 'YYYY-MM');
    }
  },
  methods: {
    init() {
      document.addEventListener('click', e => {
        if (this.$el && !this.$el.contains(e.target)) {
          this.closeMenu();
        }
      }, false);
      this.setValue(this.value);
    },
    openMenu() {
      if (!this.disabled) {
        this.showMenu = true;
      }
    },
    closeMenu() {
      this.showMenu = false;
    },
    prevYear() {
      if (!this.canBack) return;
      let newYear = parseInt(this.year) - 1;
      this.year = newYear.toString();
    },
    nextYear() {
      if (!this.canNext) return;
      let newYear = parseInt(this.year) + 1;
      this.year = newYear.toString();
    },
    selectMonth(idx) {
      this.selected = true;
      this.month = (parseInt(idx) + 1).toString();
      this.selectPicker();
      this.closeMenu();
    },
    selectPicker() {
      this.$emit('input', this.internalMomentValue.clone()._i);
      this.$emit('selected', this.internalMomentValue.clone());
    },
    setValue(value) {
      if (typeof value === 'string') {
        value = moment(value);
      }
      if (value && value.isValid()) {
        this.month = value.format('MM');
        this.year = value.format('YYYY');
      }
    },
    isActive(idx) {
      let realMonth = idx + 1;
      const yrMonth = this.year + '/' + (realMonth < 10 ? '0' + realMonth : realMonth);
      if (this.min && moment(yrMonth, 'YYYY/MM').isBefore(this.min)) {
        return false;
      }
      if (this.max && moment(yrMonth, 'YYYY/MM').isAfter(this.max)) {
        return false;
      }
      return true;
    },
    isCurrentSelected(year, monthIdx) {
      if (!this.value) {
        return false;
      }
      let checkValue = this.value;
      if (typeof this.value === 'string') {
        checkValue = moment(this.value);
      } else {
        checkValue = moment();
      }
      if (checkValue && checkValue.isValid()) {
        const currentMonth = checkValue.format('MM');
        const currentYear = checkValue.format('YYYY');
        return Number(currentMonth) === Number(monthIdx + 1) && Number(currentYear) === Number(year);
      }
      return false;
    },
    getBackgroundColor(year, monthIdx) {
      if (this.isCurrentSelected(year, monthIdx)) {
        return this.selectedBackgroundColor;
      }
    },
    clearSelect() {
      this.selected = false;
      this.$emit('input', '');
      this.$emit('selected', null);
    }
  }

});

/***/ }),
/* 33 */
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/CustomMonthlyPicker.vue?vue&type=style&index=0&id=e56f777c&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./CustomMonthlyPicker.vue?vue&type=style&index=0&id=e56f777c&scoped=true&lang=css& */ 98);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../block-editor/node_modules/style-loader/lib/addStyles.js */ 1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomMonthlyPicker.vue?vue&type=style&index=0&id=e56f777c&scoped=true&lang=css&", function() {
		var newContent = require("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomMonthlyPicker.vue?vue&type=style&index=0&id=e56f777c&scoped=true&lang=css&");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 34 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/CustomInput.vue?vue&type=style&index=0&id=a048b3fa&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./CustomInput.vue?vue&type=style&index=0&id=a048b3fa&scoped=true&lang=css& */ 100);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../block-editor/node_modules/style-loader/lib/addStyles.js */ 1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomInput.vue?vue&type=style&index=0&id=a048b3fa&scoped=true&lang=css&", function() {
		var newContent = require("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomInput.vue?vue&type=style&index=0&id=a048b3fa&scoped=true&lang=css&");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 35 */
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!../admin/js/src/search-form/node_modules/vue-slim-tabs/themes/default.css?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./default.css?vue&type=style&index=0&lang=css& */ 102);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../block-editor/node_modules/style-loader/lib/addStyles.js */ 1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./default.css?vue&type=style&index=0&lang=css&", function() {
		var newContent = require("!!../../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./default.css?vue&type=style&index=0&lang=css&");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 36 */
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/AdvancedSearch.vue?vue&type=style&index=1&id=22e415f1&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./AdvancedSearch.vue?vue&type=style&index=1&id=22e415f1&scoped=true&lang=css& */ 104);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../block-editor/node_modules/style-loader/lib/addStyles.js */ 1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./AdvancedSearch.vue?vue&type=style&index=1&id=22e415f1&scoped=true&lang=css&", function() {
		var newContent = require("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./AdvancedSearch.vue?vue&type=style&index=1&id=22e415f1&scoped=true&lang=css&");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 37 */
/*!*****************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/Paginator.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_Paginator_vue_vue_type_script_lang_js___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/babel-loader/lib??ref--0!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./Paginator.vue?vue&type=script&lang=js& */ 38);
/* unused harmony namespace reexport */
 /* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_babel_loader_lib_index_js_ref_0_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_Paginator_vue_vue_type_script_lang_js___["a" /* default */]); 

/***/ }),
/* 38 */
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/Paginator.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    props: ['resultsOffset', 'offsetStep', 'searchResultsCounter'],
    data: () => ({
        showPaginator: true
    }),
    methods: {
        prev() {
            if (this.resultsOffset != 0) {
                this.$emit('paginate', -1);
            }
        },
        next() {
            if (this.resultsOffset * 1 + this.offsetStep * 1 < this.searchResultsCounter * 1) {
                this.$emit('paginate', 1);
            }
        },
        prevButtonStatus() {
            let style = {};
            if (this.resultsOffset == 0) {
                style['background-color'] = '#d1d1d1';
            }
            return style;
        },
        nextButtonStatus() {
            let style = {};
            if (this.resultsOffset * 1 + this.offsetStep * 1 >= this.searchResultsCounter * 1) {
                style['background-color'] = '#d1d1d1';
            }
            return style;
        },
        doPaginate(event) {
            let currentPage = this.$refs.pagInput.value.trim();
            if (!Number.isInteger(currentPage * 1) || currentPage * 1 < 0 || currentPage * 1 > Math.round(this.searchResultsCounter / this.offsetStep + 1)) {
                this.$refs.pagInput.value = Math.round(this.resultsOffset / this.offsetStep) + 1;
            } else {
                let newPageOffset = currentPage - Math.round(this.resultsOffset / this.offsetStep) - 1;
                this.$emit('paginate', newPageOffset);
            }
        }
    }
});

/***/ }),
/* 39 */
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/Paginator.vue?vue&type=style&index=0&id=5f114f26&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./Paginator.vue?vue&type=style&index=0&id=5f114f26&scoped=true&lang=css& */ 109);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../block-editor/node_modules/style-loader/lib/addStyles.js */ 1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./Paginator.vue?vue&type=style&index=0&id=5f114f26&scoped=true&lang=css&", function() {
		var newContent = require("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./Paginator.vue?vue&type=style&index=0&id=5f114f26&scoped=true&lang=css&");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 40 */
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/SearchForm.vue?vue&type=style&index=0&id=34a2e59a&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./SearchForm.vue?vue&type=style&index=0&id=34a2e59a&scoped=true&lang=css& */ 111);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../block-editor/node_modules/style-loader/lib/addStyles.js */ 1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./SearchForm.vue?vue&type=style&index=0&id=34a2e59a&scoped=true&lang=css&", function() {
		var newContent = require("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./SearchForm.vue?vue&type=style&index=0&id=34a2e59a&scoped=true&lang=css&");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 41 */
/*!**************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/Modal.vue?vue&type=style&index=0&id=2a0cb46e&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./Modal.vue?vue&type=style&index=0&id=2a0cb46e&scoped=true&lang=css& */ 113);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../block-editor/node_modules/style-loader/lib/addStyles.js */ 1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./Modal.vue?vue&type=style&index=0&id=2a0cb46e&scoped=true&lang=css&", function() {
		var newContent = require("!!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib/index.js??vue-loader-options!./Modal.vue?vue&type=style&index=0&id=2a0cb46e&scoped=true&lang=css&");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 42 */
/*!***********************!*\
  !*** ./src/blocks.js ***!
  \***********************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_block_js__ = __webpack_require__(/*! ./block/block.js */ 43);
/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */



/***/ }),
/* 43 */
/*!****************************!*\
  !*** ./src/block/block.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__editor_scss__ = __webpack_require__(/*! ./editor.scss */ 44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__editor_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__editor_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_scss__ = __webpack_require__(/*! ./style.scss */ 45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuera__ = __webpack_require__(/*! vuera */ 46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuera___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vuera__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__edit_vue__ = __webpack_require__(/*! ./edit.vue */ 52);
/**
 * BLOCK: vuetenberg
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.



var __ = wp.i18n.__; // Import __() from wp.i18n

var registerBlockType = wp.blocks.registerBlockType; // Import registerBlockType() from wp.blocks



var Edit = Object(__WEBPACK_IMPORTED_MODULE_2_vuera__["VueInReact"])(__WEBPACK_IMPORTED_MODULE_3__edit_vue__["a" /* default */]);
//import PVueViewComponent from './view.vue';
//const PVueView = VueInReact(PVueViewComponent);
var smileIcon = wp.element.createElement('svg', {
	width: 20,
	height: 20
}, wp.element.createElement('path', {
	d: "M10 0.4c-5.302 0-9.6 4.298-9.6 9.6s4.298 9.6 9.6 9.6c5.301 0 9.6-4.298 9.6-9.601 0-5.301-4.299-9.599-9.6-9.599zM10 17.599c-4.197 0-7.6-3.402-7.6-7.6s3.402-7.599 7.6-7.599c4.197 0 7.601 3.402 7.601 7.6s-3.404 7.599-7.601 7.599zM7.501 9.75c0.828 0 1.499-0.783 1.499-1.75s-0.672-1.75-1.5-1.75-1.5 0.783-1.5 1.75 0.672 1.75 1.501 1.75zM12.5 9.75c0.829 0 1.5-0.783 1.5-1.75s-0.672-1.75-1.5-1.75-1.5 0.784-1.5 1.75 0.672 1.75 1.5 1.75zM14.341 11.336c-0.363-0.186-0.815-0.043-1.008 0.32-0.034 0.066-0.869 1.593-3.332 1.593-2.451 0-3.291-1.513-3.333-1.592-0.188-0.365-0.632-0.514-1.004-0.329-0.37 0.186-0.52 0.636-0.335 1.007 0.050 0.099 1.248 2.414 4.672 2.414 3.425 0 4.621-2.316 4.67-2.415 0.184-0.367 0.036-0.81-0.33-0.998z"
}));
var _wp$editor = wp.editor,
    BlockControls = _wp$editor.BlockControls,
    BlockAlignmentToolbar = _wp$editor.BlockAlignmentToolbar;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType('resourcespace/block-search', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('Resourcespace - Search Block'), // Block title.
	icon: smileIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	className: 'resourcespace-block-search',
	attributes: {
		resourceId: {
			type: 'string',
			default: '-'
		},
		resourceSize: {
			type: 'string',
			default: ''
		},
		htmlSource: {
			type: 'string',
			default: '&nbsp;'
		}
	},
	onChange: function onChange(i) {
		console.log('clicked');
		console.log(i);
		//console.log(e);
	},

	/**
  * The edit function describes the structure of your block in the context of the editor.
  * This represents what the editor will render when the block is used.
  *
  * The "edit" property must be a valid function.
  *
  * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
  *
  * @param {Object} props Props.
  * @returns {Mixed} JSX Component.
  */
	/*
 	edit: ( props ) => {
 		// Creates a <p class='wp-block-cgb-block-vuetenberg'></p>.
 		return (
 			<div className={ props.className }>
 				<p>— Hello from the backend.</p>
 				<p>
 					CGB BLOCK: <code>vuetenberg</code> is a new Gutenberg block
 				</p>
 				<p>
 					It was created via{ ' ' }
 					<code>
 						<a href="https://github.com/ahmadawais/create-guten-block">
 							create-guten-block
 						</a>
 					</code>.
 				</p>
 			</div>
 		);
 	},
 */
	//edit: Edit,
	/**
  * The save function defines the way in which the different attributes should be combined
  * into the final markup, which is then serialized by Gutenberg into post_content.~
  * <!-- <Edit message={props.attributes} handleReset={props.handleReset} /> -->
  *
  * The "save" property must be specified and must be a valid function.
  *
  * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
  *
  * @param {Object} props Props.
  * @returns {Mixed} JSX Frontend HTML.
  */

	edit: function edit(props) {
		return wp.element.createElement(
			'div',
			null,
			wp.element.createElement(Edit, { attributes: props })
		);
	},

	save: function save(props) {
		return wp.element.createElement(
			'div',
			{ className: props.className },
			wp.element.createElement('span', { dangerouslySetInnerHTML: { __html: props.attributes.htmlSource } })
		);
	}
});

/***/ }),
/* 44 */
/*!*******************************!*\
  !*** ./src/block/editor.scss ***!
  \*******************************/
/*! dynamic exports provided */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 45 */
/*!******************************!*\
  !*** ./src/block/style.scss ***!
  \******************************/
/*! dynamic exports provided */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 46 */
/*!**************************************************!*\
  !*** ./src/node_modules/vuera/dist/vuera.cjs.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! exports used: VueInReact */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(__webpack_require__(/*! react */ 47));
var ReactDOM = _interopDefault(__webpack_require__(/*! react-dom */ 48));
var Vue = _interopDefault(__webpack_require__(/*! vue */ 49));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var VUE_COMPONENT_NAME = 'vuera-internal-component-name';

var wrapReactChildren = function wrapReactChildren(createElement, children) {
  return createElement('vuera-internal-react-wrapper', {
    props: {
      component: function component() {
        return React.createElement(
          'div',
          null,
          children
        );
      }
    }
  });
};

var VueContainer = function (_React$Component) {
  inherits(VueContainer, _React$Component);

  function VueContainer(props) {
    classCallCheck(this, VueContainer);

    /**
     * We have to track the current Vue component so that we can reliably catch updates to the
     * `component` prop.
     */
    var _this = possibleConstructorReturn(this, (VueContainer.__proto__ || Object.getPrototypeOf(VueContainer)).call(this, props));

    _this.currentVueComponent = props.component;

    /**
     * Modify createVueInstance function to pass this binding correctly. Doing this in the
     * constructor to avoid instantiating functions in render.
     */
    var createVueInstance = _this.createVueInstance;
    var self = _this;
    _this.createVueInstance = function (element, component, prevComponent) {
      createVueInstance(element, self, component, prevComponent);
    };
    return _this;
  }

  createClass(VueContainer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var component = nextProps.component,
          props = objectWithoutProperties(nextProps, ['component']);


      if (this.currentVueComponent !== component) {
        this.updateVueComponent(this.props.component, component);
      }
      /**
       * NOTE: we're not comparing this.props and nextProps here, because I didn't want to write a
       * function for deep object comparison. I don't know if this hurts performance a lot, maybe
       * we do need to compare those objects.
       */
      Object.assign(this.vueInstance.$data, props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.vueInstance.$destroy();
    }

    /**
     * Creates and mounts the Vue instance.
     * NOTE: since we need to access the current instance of VueContainer, as well as the Vue instance
     * inside of the Vue constructor, we cannot bind this function to VueContainer, and we need to
     * pass VueContainer's binding explicitly.
     * @param {HTMLElement} targetElement - element to attact the Vue instance to
     * @param {ReactInstance} reactThisBinding - current instance of VueContainer
     */

  }, {
    key: 'createVueInstance',
    value: function createVueInstance(targetElement, reactThisBinding) {
      var _components;

      var _reactThisBinding$pro = reactThisBinding.props,
          component = _reactThisBinding$pro.component,
          on = _reactThisBinding$pro.on,
          props = objectWithoutProperties(_reactThisBinding$pro, ['component', 'on']);

      // `this` refers to Vue instance in the constructor

      reactThisBinding.vueInstance = new Vue(_extends({
        el: targetElement,
        data: props
      }, config.vueInstanceOptions, {
        render: function render(createElement) {
          return createElement(VUE_COMPONENT_NAME, {
            props: this.$data,
            on: on
          }, [wrapReactChildren(createElement, this.children)]);
        },

        components: (_components = {}, defineProperty(_components, VUE_COMPONENT_NAME, component), defineProperty(_components, 'vuera-internal-react-wrapper', ReactWrapper), _components)
      }));
    }
  }, {
    key: 'updateVueComponent',
    value: function updateVueComponent(prevComponent, nextComponent) {
      this.currentVueComponent = nextComponent;

      /**
       * Replace the component in the Vue instance and update it.
       */
      this.vueInstance.$options.components[VUE_COMPONENT_NAME] = nextComponent;
      this.vueInstance.$forceUpdate();
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('div', { ref: this.createVueInstance });
    }
  }]);
  return VueContainer;
}(React.Component);

var makeReactContainer = function makeReactContainer(Component) {
  var _class, _temp;

  return _temp = _class = function (_React$Component) {
    inherits(ReactInVue, _React$Component);

    function ReactInVue(props) {
      classCallCheck(this, ReactInVue);

      /**
       * We create a stateful component in order to attach a ref on it. We will use that ref to
       * update component's state, which seems better than re-rendering the whole thing with
       * ReactDOM.
       */
      var _this = possibleConstructorReturn(this, (ReactInVue.__proto__ || Object.getPrototypeOf(ReactInVue)).call(this, props));

      _this.state = _extends({}, props);
      return _this;
    }

    createClass(ReactInVue, [{
      key: 'wrapVueChildren',
      value: function wrapVueChildren(children) {
        return {
          render: function render(createElement) {
            return createElement('div', children);
          }
        };
      }
    }, {
      key: 'render',
      value: function render() {
        var _state = this.state,
            children = _state.children,
            _invoker = _state[''],
            rest = objectWithoutProperties(_state, ['children', '']);

        var wrappedChildren = this.wrapVueChildren(children);

        return React.createElement(
          Component,
          rest,
          children && React.createElement(VueContainer, { component: wrappedChildren })
        );
      }
    }]);
    return ReactInVue;
  }(React.Component), _class.displayName = 'ReactInVue' + (Component.displayName || Component.name || 'Component'), _temp;
};

var ReactWrapper = {
  props: ['component', 'passedProps'],
  render: function render(createElement) {
    return createElement('div', { ref: 'react' });
  },

  methods: {
    mountReactComponent: function mountReactComponent(component) {
      var _this2 = this;

      var Component = makeReactContainer(component);
      var children = this.$slots.default !== undefined ? { children: this.$slots.default } : {};
      ReactDOM.render(React.createElement(Component, _extends({}, this.$props.passedProps, this.$attrs, this.$listeners, children, {
        ref: function ref(_ref) {
          return _this2.reactComponentRef = _ref;
        }
      })), this.$refs.react);
    }
  },
  mounted: function mounted() {
    this.mountReactComponent(this.$props.component);
  },
  beforeDestroy: function beforeDestroy() {
    ReactDOM.unmountComponentAtNode(this.$refs.react);
  },
  updated: function updated() {
    /**
     * AFAIK, this is the only way to update children. It doesn't seem to be possible to watch
     * `$slots` or `$children`.
     */
    if (this.$slots.default !== undefined) {
      this.reactComponentRef.setState({ children: this.$slots.default });
    } else {
      this.reactComponentRef.setState({ children: null });
    }
  },

  inheritAttrs: false,
  watch: {
    $attrs: {
      handler: function handler() {
        this.reactComponentRef.setState(_extends({}, this.$attrs));
      },

      deep: true
    },
    '$props.component': {
      handler: function handler(newValue) {
        this.mountReactComponent(newValue);
      }
    },
    $listeners: {
      handler: function handler() {
        this.reactComponentRef.setState(_extends({}, this.$listeners));
      },

      deep: true
    },
    '$props.passedProps': {
      handler: function handler() {
        this.reactComponentRef.setState(_extends({}, this.$props.passedProps));
      },

      deep: true
    }
  }
};

function isReactComponent(component) {
  if ((typeof component === 'undefined' ? 'undefined' : _typeof(component)) === 'object' && !isReactForwardReference(component)) {
    return false;
  }

  return !(typeof component === 'function' && component.prototype && (component.prototype.constructor.super && component.prototype.constructor.super.isVue || component.prototype instanceof Vue));
}

function isReactForwardReference(component) {
  return component.$$typeof && component.$$typeof.toString() === 'Symbol(react.forward_ref)';
}

function VueResolver$$1(component) {
  return {
    components: { ReactWrapper: ReactWrapper },
    props: ['passedProps'],
    inheritAttrs: false,
    render: function render(createElement) {
      return createElement('react-wrapper', {
        props: {
          component: component,
          passedProps: this.$props.passedProps
        },
        attrs: this.$attrs,
        on: this.$listeners
      }, this.$slots.default);
    }
  };
}

/**
 * This mixin automatically wraps all React components into Vue.
 */
var VuePlugin = {
  install: function install(Vue$$1, options) {
    /**
     * We define a custom merging strategy for the `components` field. This strategy really just
     * wraps all the React components while leaving Vue components as is.
     */
    var originalComponentsMergeStrategy = Vue$$1.config.optionMergeStrategies.components;
    Vue$$1.config.optionMergeStrategies.components = function (parent) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var mergedValue = originalComponentsMergeStrategy.apply(undefined, [parent].concat(args));
      var wrappedComponents = mergedValue ? Object.entries(mergedValue).reduce(function (acc, _ref) {
        var _ref2 = slicedToArray(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        return _extends({}, acc, defineProperty({}, k, isReactComponent(v) ? VueResolver$$1(v) : v));
      }, {}) : mergedValue;
      return Object.assign(mergedValue, wrappedComponents);
    };
    Vue$$1.prototype.constructor.isVue = true;
  }
};

/* eslint-disable prefer-object-spread/prefer-object-spread */
function ReactResolver$$1(component) {
  return isReactComponent(component) ? component : function (props) {
    return React.createElement(VueContainer, _extends({}, props, { component: component }));
  };
}

/**
 * This function gets imported by the babel plugin. It wraps a suspected React element and, if it
 * isn't a valid React element, wraps it into a Vue container.
 */
function babelReactResolver$$1(component, props, children) {
  return isReactComponent(component) ? React.createElement(component, props, children) : React.createElement(VueContainer, Object.assign({ component: component }, props), children);
}

function defaultConfig() {
  return {
    vueInstanceOptions: {}
  };
}

var config = defaultConfig();

exports.ReactWrapper = ReactWrapper;
exports.VueWrapper = VueContainer;
exports.__vueraReactResolver = babelReactResolver$$1;
exports.VuePlugin = VuePlugin;
exports.VueInReact = ReactResolver$$1;
exports.ReactInVue = VueResolver$$1;
exports.config = config;


/***/ }),
/* 47 */
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 48 */
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 49 */
/*!******************************************************!*\
  !*** ./src/node_modules/vue/dist/vue.runtime.esm.js ***!
  \******************************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if (process.env.NODE_ENV !== 'production' && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    process.env.NODE_ENV !== 'production' &&
    // skip validation for weex recycle-list child component props
    !(false)
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var isUsingMicroTask = false;

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if (process.env.NODE_ENV !== 'production' && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (process.env.NODE_ENV !== 'production') {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if (process.env.NODE_ENV !== 'production' && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                process.env.NODE_ENV !== 'production'
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if (process.env.NODE_ENV !== 'production' && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false'
    ? 'false'
    // allow arbitrary string value for contenteditable
    : key === 'contenteditable' && isValidContentEditableValue(value)
      ? value
      : 'true'
};

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (process.env.NODE_ENV !== 'production') {
          checkDuplicateKeys(ch);
        }
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && value !== '' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

/*  */

/*  */

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1 (event, handler, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1 (
  name,
  handler,
  capture,
  passive
) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;
    handler = original._wrapper = function (e) {
      if (
        // no bubbling, should always fire.
        // this is just a safety net in case event.timeStamp is unreliable in
        // certain weird environments...
        e.target === e.currentTarget ||
        // event is fired after handler attachment
        e.timeStamp >= attachedTimestamp ||
        // bail for environments that have buggy event.timeStamp implementations
        // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
        // #9681 QtWebEngine event.timeStamp is negative value
        e.timeStamp <= 0 ||
        // #9448 bail if event is fired in another document in a multi-page
        // electron/nw.js app, since event.timeStamp will be using a different
        // starting reference
        e.target.ownerDocument !== document
      ) {
        return original.apply(this, arguments)
      }
    };
  }
  target$1.addEventListener(
    name,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  name,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    name,
    handler._wrapper || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

var svgContainer;

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (
      // skip the update if old and new VDOM state is the same.
      // `value` is handled separately because the DOM value may be temporarily
      // out of sync with VDOM state due to focus, composition and modifiers.
      // This  #4521 by skipping the unnecesarry `checked` update.
      cur !== oldProps[key]
    ) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

var whitespaceRE = /\s+/;

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs (s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

var isVShowDirective = function (d) { return d.name === 'show'; };

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode);
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  beforeMount: function beforeMount () {
    var this$1 = this;

    var update = this._update;
    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1);
      // force removing pass
      this$1.__patch__(
        this$1._vnode,
        this$1.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      );
      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (e && e.target !== el) {
            return
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test'
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if (process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! ./../../../../node_modules/process/browser.js */ 5), __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ 3), __webpack_require__(/*! ./../../../../node_modules/timers-browserify/main.js */ 50).setImmediate))

/***/ }),
/* 50 */
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ 51);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 3)))

/***/ }),
/* 51 */
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 3), __webpack_require__(/*! ./../process/browser.js */ 5)))

/***/ }),
/* 52 */
/*!****************************!*\
  !*** ./src/block/edit.vue ***!
  \****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__edit_vue_vue_type_template_id_fad2f178___ = __webpack_require__(/*! ./edit.vue?vue&type=template&id=fad2f178& */ 53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__edit_vue_vue_type_script_lang_js___ = __webpack_require__(/*! ./edit.vue?vue&type=script&lang=js& */ 6);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 2);





/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__edit_vue_vue_type_script_lang_js___["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_0__edit_vue_vue_type_template_id_fad2f178___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__edit_vue_vue_type_template_id_fad2f178___["b" /* staticRenderFns */],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 53 */
/*!***********************************************************!*\
  !*** ./src/block/edit.vue?vue&type=template&id=fad2f178& ***!
  \***********************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_template_id_fad2f178___ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./edit.vue?vue&type=template&id=fad2f178& */ 54);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_template_id_fad2f178___["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_vue_vue_type_template_id_fad2f178___["b"]; });


/***/ }),
/* 54 */
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/block/edit.vue?vue&type=template&id=fad2f178& ***!
  \*****************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.attributes.attributes.resourceId=='-')?_c('div',[_c('button',{on:{"click":_vm.showHide}},[_vm._v("Search ResourceSpace")]),_vm._v(" "),_c('modal',{attrs:{"show":_vm.showModal,"onSelect":_vm.onSelect},on:{"close":_vm.doOnClose,"resourceSelected":function($event){return _vm.resourceSelected($event)}}})],1):_c('div',{domProps:{"innerHTML":_vm._s(_vm.redered)}})])}
var staticRenderFns = []



/***/ }),
/* 55 */
/*!************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/Modal.vue ***!
  \************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Modal_vue_vue_type_template_id_2a0cb46e_scoped_true___ = __webpack_require__(/*! ./Modal.vue?vue&type=template&id=2a0cb46e&scoped=true& */ 56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Modal_vue_vue_type_script_lang_js___ = __webpack_require__(/*! ./Modal.vue?vue&type=script&lang=js& */ 8);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Modal_vue_vue_type_style_index_0_id_2a0cb46e_scoped_true_lang_css___ = __webpack_require__(/*! ./Modal.vue?vue&type=style&index=0&id=2a0cb46e&scoped=true&lang=css& */ 112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 2);






/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_3__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__Modal_vue_vue_type_script_lang_js___["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_0__Modal_vue_vue_type_template_id_2a0cb46e_scoped_true___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__Modal_vue_vue_type_template_id_2a0cb46e_scoped_true___["b" /* staticRenderFns */],
  false,
  null,
  "2a0cb46e",
  null
  
)

/* harmony default export */ __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 56 */
/*!*******************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/Modal.vue?vue&type=template&id=2a0cb46e&scoped=true& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_template_id_2a0cb46e_scoped_true___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./Modal.vue?vue&type=template&id=2a0cb46e&scoped=true& */ 57);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_template_id_2a0cb46e_scoped_true___["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_template_id_2a0cb46e_scoped_true___["b"]; });


/***/ }),
/* 57 */
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/Modal.vue?vue&type=template&id=2a0cb46e&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('transition',{attrs:{"name":"modal"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"modal-mask",on:{"click1":_vm.close}},[_c('div',{staticClass:"modal-container",on:{"click":function($event){$event.stopPropagation();}}},[_c('div',{staticClass:"modal-header"},[_c('div',{staticClass:"modal-title"},[_c('h1',[_vm._v("Search ResourceSpace")])]),_vm._v(" "),_c('div',{staticClass:"modal-close"},[_c('i',{staticClass:"fas fa-times",on:{"click":function($event){return _vm.close(false)}}})])]),_vm._v(" "),_c('div',{staticClass:"modal-body"},[_c('SearchForm',{attrs:{"onSelect":_vm.onSelect,"showTitle":false,"clean":_vm.show},on:{"resourceSelected":function($event){return _vm.close($event)}}})],1)])])])],1)}
var staticRenderFns = []



/***/ }),
/* 58 */
/*!*****************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/SearchForm.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SearchForm_vue_vue_type_template_id_34a2e59a_scoped_true___ = __webpack_require__(/*! ./SearchForm.vue?vue&type=template&id=34a2e59a&scoped=true& */ 59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SearchForm_vue_vue_type_script_lang_js___ = __webpack_require__(/*! ./SearchForm.vue?vue&type=script&lang=js& */ 10);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SearchForm_vue_vue_type_style_index_0_id_34a2e59a_scoped_true_lang_css___ = __webpack_require__(/*! ./SearchForm.vue?vue&type=style&index=0&id=34a2e59a&scoped=true&lang=css& */ 110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 2);






/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_3__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__SearchForm_vue_vue_type_script_lang_js___["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_0__SearchForm_vue_vue_type_template_id_34a2e59a_scoped_true___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__SearchForm_vue_vue_type_template_id_34a2e59a_scoped_true___["b" /* staticRenderFns */],
  false,
  null,
  "34a2e59a",
  null
  
)

/* harmony default export */ __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 59 */
/*!************************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/SearchForm.vue?vue&type=template&id=34a2e59a&scoped=true& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchForm_vue_vue_type_template_id_34a2e59a_scoped_true___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./SearchForm.vue?vue&type=template&id=34a2e59a&scoped=true& */ 60);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchForm_vue_vue_type_template_id_34a2e59a_scoped_true___["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchForm_vue_vue_type_template_id_34a2e59a_scoped_true___["b"]; });


/***/ }),
/* 60 */
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/SearchForm.vue?vue&type=template&id=34a2e59a&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"resourcespace-adra"},[_c('div',{staticClass:"resourcespace-adra-search-form"},[(_vm.showTitle)?_c('h1',[_vm._v("Search ResourceSpace")]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"adra-main-search-form"},[_c('div',{staticClass:"main-input"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.searchValue),expression:"searchValue"}],attrs:{"type":"text"},domProps:{"value":(_vm.searchValue)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.searchValue=$event.target.value},function($event){$event.preventDefault();return _vm.update( {fieldName:"resourcespace_search", value:$event.target.value} )}],"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.submitSearch($event)}}})]),_vm._v(" "),_c('div',{staticClass:"search-button-wrapper"},[_c('a',{staticClass:"button-primary1",attrs:{"href":"#"},on:{"click":_vm.submitSearch}},[_c('i',{staticClass:"fa fa-search search-button"})])]),_vm._v(" "),_c('div',{staticClass:"advanced-search-wrapper"},[(_vm.showAdvancedForm)?_c('a',{staticClass:"advanced-search",on:{"click":function($event){_vm.advancedSerchFormIsExpanded = !_vm.advancedSerchFormIsExpanded}}},[_vm._v("Advanced Search")]):_vm._e(),_vm._v(" "),(_vm.showAdvancedForm)?_c('a',{staticClass:"advanced-search advanced-search-reset",on:{"click":_vm.resetSearchForm}},[_vm._v("Reset")]):_vm._e()]),_vm._v(" "),_c('div',[(_vm.formFields["main_form"])?_c('ResourceTypeInput',{attrs:{"fieldDef":_vm.formFields["main_form"]},on:{"input":_vm.update}}):_vm._e()],1)]),_vm._v(" "),_c('div',{staticStyle:{"clear":"both"}}),_vm._v(" "),(_vm.advancedSerchFormIsExpanded)?_c('div',{staticClass:"adra-advanced-search-form"},[_c('AdvancedSearch',{attrs:{"formFields":_vm.formFields},on:{"input":_vm.update}})],1):_vm._e(),_vm._v(" "),_c('div',{staticStyle:{"clear":"both"}})]),_vm._v(" "),(_vm.searchResultsCounter>_vm.offsetStep)?_c('div',[_vm._v("\n    "+_vm._s((_vm.resultsOffset*1+1) + '-' + (_vm.resultsOffset*1+_vm.offsetStep*1) + ' of ' +  _vm.searchResultsCounter + 'results in ' + Math.ceil(_vm.searchResultsCounter/_vm.offsetStep) + 'pages')+"\n  ")]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"wrap resourcespace-adra-search-results"},[_vm._l((_vm.searchResults),function(resource,index){return _c('ResourceList',{key:'resourceList_'+resource.ref,attrs:{"resource":resource,"index":index,"selectedIndex":_vm.selectedIndex,"displayOnIndex":_vm.displayOnIndex,"selectedResourceDetails":_vm.selectedResourceDetails,"onSelect":_vm.onSelect,"selectedResourceId":_vm.selectedResourceId},on:{"selectResource":_vm.setSelectedResource,"resourceSelected":function($event){return _vm.resourceSelected($event)},"resourceMounted":_vm.getContainerWidth}})}),_vm._v(" "),(_vm.showNoResults)?_c('div',[_c('h2',{staticStyle:{"color":"red"}},[_vm._v("No results")])]):_vm._e()],2),_vm._v(" "),_c('div',{staticStyle:{"clear":"both"}}),_vm._v(" "),(_vm.searchResults.length>0)?_c('Paginator',{attrs:{"resultsOffset":_vm.resultsOffset,"offsetStep":_vm.offsetStep,"searchResultsCounter":_vm.searchResultsCounter},on:{"paginate":function($event){return _vm.doPaginate($event)}}}):_vm._e(),_vm._v(" "),_c('div',{staticStyle:{"clear":"both"}})],1)}
var staticRenderFns = []



/***/ }),
/* 61 */
/*!*******************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/ResourceList.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ResourceList_vue_vue_type_template_id_557c1e4d_scoped_true___ = __webpack_require__(/*! ./ResourceList.vue?vue&type=template&id=557c1e4d&scoped=true& */ 62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ResourceList_vue_vue_type_script_lang_js___ = __webpack_require__(/*! ./ResourceList.vue?vue&type=script&lang=js& */ 12);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResourceList_vue_vue_type_style_index_0_id_557c1e4d_scoped_true_lang_css___ = __webpack_require__(/*! ./ResourceList.vue?vue&type=style&index=0&id=557c1e4d&scoped=true&lang=css& */ 70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 2);






/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_3__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__ResourceList_vue_vue_type_script_lang_js___["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_0__ResourceList_vue_vue_type_template_id_557c1e4d_scoped_true___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__ResourceList_vue_vue_type_template_id_557c1e4d_scoped_true___["b" /* staticRenderFns */],
  false,
  null,
  "557c1e4d",
  null
  
)

/* harmony default export */ __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 62 */
/*!**************************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/ResourceList.vue?vue&type=template&id=557c1e4d&scoped=true& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceList_vue_vue_type_template_id_557c1e4d_scoped_true___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./ResourceList.vue?vue&type=template&id=557c1e4d&scoped=true& */ 63);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceList_vue_vue_type_template_id_557c1e4d_scoped_true___["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceList_vue_vue_type_template_id_557c1e4d_scoped_true___["b"]; });


/***/ }),
/* 63 */
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/ResourceList.vue?vue&type=template&id=557c1e4d&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',[(_vm.resource.url)?_c('div',{staticClass:"resource-listing",style:({border: _vm.setBorderColor })},[_c('a',{staticClass:"img",attrs:{"href":"#"},on:{"click":_vm.getDetais}},[_c('img',{attrs:{"src":_vm.resource.url}})])]):_vm._e(),_vm._v(" "),(_vm.displayOnIndex==_vm.index)?[_c('div',{staticStyle:{"clear":"both"}}),_vm._v(" "),_c('div',{staticStyle:{"width":"100%"}},[(_vm.index==_vm.displayOnIndex)?_c('ResourceDetails',{attrs:{"resourceDetails":_vm.selectedResourceDetails,"resourceId":_vm.selectedResourceId,"onSelect":_vm.onSelect},on:{"resourceSelected":function($event){return _vm.resourceSelected($event)}}}):_vm._e()],1)]:_vm._e()],2)}
var staticRenderFns = []



/***/ }),
/* 64 */
/*!**********************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/ResourceDetails.vue ***!
  \**********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ResourceDetails_vue_vue_type_template_id_5df0fca9_scoped_true___ = __webpack_require__(/*! ./ResourceDetails.vue?vue&type=template&id=5df0fca9&scoped=true& */ 65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ResourceDetails_vue_vue_type_script_lang_js___ = __webpack_require__(/*! ./ResourceDetails.vue?vue&type=script&lang=js& */ 14);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResourceDetails_vue_vue_type_style_index_0_id_5df0fca9_scoped_true_lang_css___ = __webpack_require__(/*! ./ResourceDetails.vue?vue&type=style&index=0&id=5df0fca9&scoped=true&lang=css& */ 67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 2);






/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_3__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__ResourceDetails_vue_vue_type_script_lang_js___["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_0__ResourceDetails_vue_vue_type_template_id_5df0fca9_scoped_true___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__ResourceDetails_vue_vue_type_template_id_5df0fca9_scoped_true___["b" /* staticRenderFns */],
  false,
  null,
  "5df0fca9",
  null
  
)

/* harmony default export */ __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 65 */
/*!*****************************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/ResourceDetails.vue?vue&type=template&id=5df0fca9&scoped=true& ***!
  \*****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceDetails_vue_vue_type_template_id_5df0fca9_scoped_true___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./ResourceDetails.vue?vue&type=template&id=5df0fca9&scoped=true& */ 66);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceDetails_vue_vue_type_template_id_5df0fca9_scoped_true___["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceDetails_vue_vue_type_template_id_5df0fca9_scoped_true___["b"]; });


/***/ }),
/* 66 */
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/ResourceDetails.vue?vue&type=template&id=5df0fca9&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"resource-details",attrs:{"id":'detail_container_'+_vm.resourceId}},[(!_vm.resourceDetails)?_c('div',[_c('div',{staticClass:"fa-3x"},[_c('center',[_c('i',{staticClass:"fas fa-spinner fa-spin"})])],1)]):_c('div',[(_vm.resourceDetails.hasOwnProperty('orig_file'))?_c('div',{staticClass:"row-details"},[_c('a',{staticClass:"link-details",attrs:{"href":_vm.resourceDetails.orig_file,"target":"_blank"}},[_c('b',[_vm._v("Original File")]),_vm._v("    "),_c('i',{staticClass:"fas fa-expand-arrows-alt"})]),_vm._v(" "),(_vm.importing && _vm.onSelect=='mediaLibrary')?_c('div',[_c('div',{staticClass:"fa-3x"},[_c('center',[_c('i',{staticClass:"fas fa-spinner fa-spin"})])],1)]):_vm._e(),_vm._v(" "),(_vm.onSelect!='mediaLibrary')?[_c('button',{staticClass:"button-details ",attrs:{"ref_id":_vm.resourceId,"size_id":""},on:{"click":function($event){$event.preventDefault();return _vm.selectSize(_vm.resourceId,'')}}},[_vm._v(_vm._s(_vm.buttonText))])]:[(_vm.resourceDetails.imported==0)?[_c('button',{staticClass:"button-details ",attrs:{"disabled":_vm.disableImport,"ref_id":_vm.resourceId,"size_id":""},on:{"click":function($event){$event.preventDefault();return _vm.selectSize(_vm.resourceId,'')}}},[_vm._v(_vm._s(_vm.buttonText))])]:[_c('span',{staticClass:"imported"},[_vm._v("imported")])]]],2):_vm._e(),_vm._v(" "),(_vm.onSelect!='mediaLibrary')?_vm._l((Object.entries(_vm.resourceDetails.images)),function(imageObj,index){return _c('div',{key:"image_"+index+"_"+_vm.resourceId,staticClass:"row-details"},[_c('a',{staticClass:"link-details",attrs:{"href":imageObj[1]['url'],"target":"_blank"}},[_vm._v(" "+_vm._s(imageObj[1]['name'])+"    "),_c('i',{staticClass:"fas fa-expand-arrows-alt"})]),_vm._v(" "),_c('button',{staticClass:"button-details",attrs:{"ref_id":_vm.resourceId,"size_id":imageObj[0]},on:{"click":function($event){$event.preventDefault();return _vm.selectSize(_vm.resourceId,imageObj[0])}}},[_vm._v(_vm._s(_vm.buttonText))])])}):_vm._e(),_vm._v(" "),_c('div',{staticStyle:{"clear":"both"}}),_vm._v(" "),_vm._l((Object.entries(_vm.resourceDetails.fields)),function(fieldArray,index){return [_c('div',{key:"field_"+index+"_"+_vm.resourceId,staticClass:"row-details"},[_c('b',[_vm._v(_vm._s(fieldArray[0])+":")]),_vm._v(" "+_vm._s(fieldArray[1])+"\n            ")])]})],2)])}
var staticRenderFns = []



/***/ }),
/* 67 */
/*!*******************************************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/ResourceDetails.vue?vue&type=style&index=0&id=5df0fca9&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************/
/*! dynamic exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceDetails_vue_vue_type_style_index_0_id_5df0fca9_scoped_true_lang_css___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/style-loader!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./ResourceDetails.vue?vue&type=style&index=0&id=5df0fca9&scoped=true&lang=css& */ 16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceDetails_vue_vue_type_style_index_0_id_5df0fca9_scoped_true_lang_css____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceDetails_vue_vue_type_style_index_0_id_5df0fca9_scoped_true_lang_css___);
/* unused harmony reexport namespace */
 /* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceDetails_vue_vue_type_style_index_0_id_5df0fca9_scoped_true_lang_css____default.a); 

/***/ }),
/* 68 */
/*!********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/ResourceDetails.vue?vue&type=style&index=0&id=5df0fca9&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/css-loader/dist/runtime/api.js */ 0);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.resource-details .row-details[data-v-5df0fca9] {\r\n    float:left;\r\n    width:95%;\r\n    padding:5px 15px 5px 15px;\r\n    border-top:1px solid #ccc;\n}\n.resource-details .row-details .link-details[data-v-5df0fca9]{\r\n    float:left;\n}\n.resource-details .row-details .button-details[data-v-5df0fca9]{\r\n    float:right;\n}\n.imported[data-v-5df0fca9]{\r\n    font-weight: bold;\r\n    color:red;\r\n    float:right;\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 69 */
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 70 */
/*!****************************************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/ResourceList.vue?vue&type=style&index=0&id=557c1e4d&scoped=true&lang=css& ***!
  \****************************************************************************************************************************/
/*! dynamic exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceList_vue_vue_type_style_index_0_id_557c1e4d_scoped_true_lang_css___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/style-loader!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./ResourceList.vue?vue&type=style&index=0&id=557c1e4d&scoped=true&lang=css& */ 17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceList_vue_vue_type_style_index_0_id_557c1e4d_scoped_true_lang_css____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceList_vue_vue_type_style_index_0_id_557c1e4d_scoped_true_lang_css___);
/* unused harmony reexport namespace */
 /* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceList_vue_vue_type_style_index_0_id_557c1e4d_scoped_true_lang_css____default.a); 

/***/ }),
/* 71 */
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/ResourceList.vue?vue&type=style&index=0&id=557c1e4d&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/css-loader/dist/runtime/api.js */ 0);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.resource-listing[data-v-557c1e4d]{\n  width:150px;\n  height:150px;\n  padding:10px;\n  margin:10px;\n  float:left;\n  overflow:hidden;\n}\n.resource-listing .img[data-v-557c1e4d]{\n  max-width:150px;\n  max-height:150px;\n  display:block;\n}\n.resource-listing .img img[data-v-557c1e4d]{\n  max-width:150px;\n  max-height:150px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 72 */
/*!************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/ResourceTypeInput.vue ***!
  \************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ResourceTypeInput_vue_vue_type_template_id_64a35838_scoped_true___ = __webpack_require__(/*! ./ResourceTypeInput.vue?vue&type=template&id=64a35838&scoped=true& */ 73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ResourceTypeInput_vue_vue_type_script_lang_js___ = __webpack_require__(/*! ./ResourceTypeInput.vue?vue&type=script&lang=js& */ 18);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResourceTypeInput_vue_vue_type_style_index_0_id_64a35838_scoped_true_lang_css___ = __webpack_require__(/*! ./ResourceTypeInput.vue?vue&type=style&index=0&id=64a35838&scoped=true&lang=css& */ 75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 2);






/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_3__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__ResourceTypeInput_vue_vue_type_script_lang_js___["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_0__ResourceTypeInput_vue_vue_type_template_id_64a35838_scoped_true___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__ResourceTypeInput_vue_vue_type_template_id_64a35838_scoped_true___["b" /* staticRenderFns */],
  false,
  null,
  "64a35838",
  null
  
)

/* harmony default export */ __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 73 */
/*!*******************************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/ResourceTypeInput.vue?vue&type=template&id=64a35838&scoped=true& ***!
  \*******************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceTypeInput_vue_vue_type_template_id_64a35838_scoped_true___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./ResourceTypeInput.vue?vue&type=template&id=64a35838&scoped=true& */ 74);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceTypeInput_vue_vue_type_template_id_64a35838_scoped_true___["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceTypeInput_vue_vue_type_template_id_64a35838_scoped_true___["b"]; });


/***/ }),
/* 74 */
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/ResourceTypeInput.vue?vue&type=template&id=64a35838&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"resource-type-input"}},[_c('div',{staticStyle:{"clear":"both"}}),_vm._v(" "),_c('div',{staticClass:"resource-type-input-wrapper"},[_vm._l((_vm.fieldDef),function(inputDef,index){return [(inputDef.hasOwnProperty('checked'))?_c('div',{key:index,staticClass:"resource-type-item"},[_c('input',{ref:'_' + inputDef.resourceId,refInFor:true,attrs:{"type":"checkbox","name":"resource_id[]","id":"_"+inputDef.resourceId},domProps:{"value":inputDef.resourceId,"checked":inputDef.checked},on:{"change":function($event){return _vm.onChange(inputDef.resourceId)}}}),_vm._v(" "),_c('label',{attrs:{"for":"_"+inputDef.resourceId}},[_vm._v(_vm._s(inputDef.label)+"\n                ")]),_vm._v(" "),_c('br')]):_vm._e()]})],2)])}
var staticRenderFns = []



/***/ }),
/* 75 */
/*!*********************************************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/ResourceTypeInput.vue?vue&type=style&index=0&id=64a35838&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************/
/*! dynamic exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceTypeInput_vue_vue_type_style_index_0_id_64a35838_scoped_true_lang_css___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/style-loader!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./ResourceTypeInput.vue?vue&type=style&index=0&id=64a35838&scoped=true&lang=css& */ 20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceTypeInput_vue_vue_type_style_index_0_id_64a35838_scoped_true_lang_css____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceTypeInput_vue_vue_type_style_index_0_id_64a35838_scoped_true_lang_css___);
/* unused harmony reexport namespace */
 /* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_ResourceTypeInput_vue_vue_type_style_index_0_id_64a35838_scoped_true_lang_css____default.a); 

/***/ }),
/* 76 */
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/ResourceTypeInput.vue?vue&type=style&index=0&id=64a35838&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/css-loader/dist/runtime/api.js */ 0);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.resource-type-input-wrapper[data-v-64a35838]{\n    float:left;\n    padding:5px;\n}\n.resource-type-item[data-v-64a35838]{\n    float:left;\n    padding:5px 15px 5px 5px;\n}\n.resource-type-item label[data-v-64a35838]{\n    position:relative;\n    top:-3px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 77 */
/*!*********************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/AdvancedSearch.vue ***!
  \*********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AdvancedSearch_vue_vue_type_template_id_22e415f1_scoped_true___ = __webpack_require__(/*! ./AdvancedSearch.vue?vue&type=template&id=22e415f1&scoped=true& */ 78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AdvancedSearch_vue_vue_type_script_lang_js___ = __webpack_require__(/*! ./AdvancedSearch.vue?vue&type=script&lang=js& */ 21);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_slim_tabs_themes_default_css_vue_type_style_index_0_lang_css___ = __webpack_require__(/*! vue-slim-tabs/themes/default.css?vue&type=style&index=0&lang=css& */ 101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__AdvancedSearch_vue_vue_type_style_index_1_id_22e415f1_scoped_true_lang_css___ = __webpack_require__(/*! ./AdvancedSearch.vue?vue&type=style&index=1&id=22e415f1&scoped=true&lang=css& */ 103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 2);







/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_4__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__AdvancedSearch_vue_vue_type_script_lang_js___["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_0__AdvancedSearch_vue_vue_type_template_id_22e415f1_scoped_true___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__AdvancedSearch_vue_vue_type_template_id_22e415f1_scoped_true___["b" /* staticRenderFns */],
  false,
  null,
  "22e415f1",
  null
  
)

/* harmony default export */ __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 78 */
/*!****************************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/AdvancedSearch.vue?vue&type=template&id=22e415f1&scoped=true& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_AdvancedSearch_vue_vue_type_template_id_22e415f1_scoped_true___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./AdvancedSearch.vue?vue&type=template&id=22e415f1&scoped=true& */ 79);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_AdvancedSearch_vue_vue_type_template_id_22e415f1_scoped_true___["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_AdvancedSearch_vue_vue_type_template_id_22e415f1_scoped_true___["b"]; });


/***/ }),
/* 79 */
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/AdvancedSearch.vue?vue&type=template&id=22e415f1&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"advanced-search"},[_c('tabs',[_c('tab',{attrs:{"title":"Main Fields"}},_vm._l((_vm.formFields.first_tab),function(field,index){return _c('CustomInput',{key:index,attrs:{"fieldDef":field,"index":index},on:{"input":function($event){return _vm.update(field.name, $event)},"inputDate":function($event){return _vm.update(field.name, $event)}}})}),1),_vm._v(" "),_c('tab',{attrs:{"title":"All Fields"}},_vm._l((_vm.formFields.second_tab),function(field,index){return _c('CustomInput',{key:index,attrs:{"fieldDef":field,"index":index},on:{"input":function($event){return _vm.update(field.name, $event)},"inputDate":function($event){return _vm.update(field.name, $event)}}})}),1)],1),_vm._v(" "),_c('div',{staticStyle:{"clear":"both"}})],1)}
var staticRenderFns = []



/***/ }),
/* 80 */
/*!****************************************************************************************!*\
  !*** ../admin/js/src/search-form/node_modules/vue-slim-tabs/dist/vue-slim-tabs.esm.js ***!
  \****************************************************************************************/
/*! exports provided: Tab, Tabs, install */
/*! exports used: Tab, Tabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Tabs; });
/* unused harmony export install */
/*!
 * vue-slim-tabs v0.4.0
 * (c) egoist <0x142857@gmail.com>
 * Released under the MIT License.
 */
var Tabs = {
  name: "tabs",
  props: {
    defaultIndex: {
      default: 0,
      type: Number
    },
    onSelect: {
      type: Function
    }
  },
  data: function data() {
    return {
      selectedIndex: this.defaultIndex
    };
  },
  methods: {
    switchTab: function switchTab(e, index, isDisabled) {
      if (!isDisabled) {
        this.selectedIndex = index;
        this.onSelect && this.onSelect(e, index);
      }
    }
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];
    var tabs = this.$slots.default.filter(function (component) {
      return component.componentOptions;
    });
    var tabList = [];
    tabs.forEach(function (child, index) {
      var _child$componentOptio = child.componentOptions.propsData,
          title = _child$componentOptio.title,
          titleSlot = _child$componentOptio.titleSlot,
          disabled = _child$componentOptio.disabled;
      var content = titleSlot ? _this.$slots[titleSlot] : title;
      var isDisabled = disabled === true || disabled === "";
      tabList.push(h("li", {
        "class": "vue-tab",
        attrs: {
          role: "tab",
          "aria-selected": _this.selectedIndex === index ? "true" : "false",
          "aria-disabled": isDisabled ? "true" : "false"
        },
        on: {
          "click": function click(e) {
            return _this.switchTab(e, index, isDisabled);
          }
        }
      }, [content]));
    });
    return h("div", {
      "class": "vue-tabs",
      attrs: {
        role: "tabs"
      }
    }, [h("ul", {
      "class": "vue-tablist",
      attrs: {
        role: "tablist"
      }
    }, [this.$slots.left, tabList, this.$slots.right]), tabs[this.selectedIndex]]);
  }
};
var Tab = {
  name: "tab",
  props: ["title", "titleSlot", "disabled"],
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": "vue-tabpanel",
      attrs: {
        role: "tabpanel"
      }
    }, [this.$slots.default]);
  }
};
function install(Vue) {
  Vue.component(Tabs.name, Tabs);
  Vue.component(Tab.name, Tab);
}




/***/ }),
/* 81 */
/*!******************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/CustomInput.vue ***!
  \******************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CustomInput_vue_vue_type_template_id_a048b3fa_scoped_true___ = __webpack_require__(/*! ./CustomInput.vue?vue&type=template&id=a048b3fa&scoped=true& */ 82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CustomInput_vue_vue_type_script_lang_js___ = __webpack_require__(/*! ./CustomInput.vue?vue&type=script&lang=js& */ 23);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CustomInput_vue_vue_type_style_index_0_id_a048b3fa_scoped_true_lang_css___ = __webpack_require__(/*! ./CustomInput.vue?vue&type=style&index=0&id=a048b3fa&scoped=true&lang=css& */ 99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 2);






/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_3__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__CustomInput_vue_vue_type_script_lang_js___["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_0__CustomInput_vue_vue_type_template_id_a048b3fa_scoped_true___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__CustomInput_vue_vue_type_template_id_a048b3fa_scoped_true___["b" /* staticRenderFns */],
  false,
  null,
  "a048b3fa",
  null
  
)

/* harmony default export */ __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 82 */
/*!*************************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/CustomInput.vue?vue&type=template&id=a048b3fa&scoped=true& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomInput_vue_vue_type_template_id_a048b3fa_scoped_true___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./CustomInput.vue?vue&type=template&id=a048b3fa&scoped=true& */ 83);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomInput_vue_vue_type_template_id_a048b3fa_scoped_true___["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomInput_vue_vue_type_template_id_a048b3fa_scoped_true___["b"]; });


/***/ }),
/* 83 */
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/CustomInput.vue?vue&type=template&id=a048b3fa&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',[_c('div',{staticClass:"custom-input"},[(_vm.fieldDef.type=='text')?_c('TextInput',{attrs:{"fieldDef":_vm.fieldDef,"value":_vm.fieldDef.value},on:{"input":function($event){return _vm.update(_vm.fieldDef.name, $event)}}}):_vm._e(),_vm._v(" "),(_vm.fieldDef.type=='select')?_c('CustomSelect',{attrs:{"fieldDef":_vm.fieldDef,"value":_vm.fieldDef.value},on:{"input":function($event){return _vm.update(_vm.fieldDef.name, $event)}}}):_vm._e(),_vm._v(" "),(_vm.fieldDef.type=='date')?_c('CustomMonthlyPicker',{attrs:{"fieldDef":_vm.fieldDef,"v-model":_vm.selectedMonth,"value":_vm.tmp},on:{"input":function($event){return _vm.updateDate(_vm.fieldDef.name, $event)}}}):_vm._e()],1),_vm._v(" "),(_vm.index % 2 == 1)?_c('div',{staticStyle:{"clear":"both"}}):_vm._e()])}
var staticRenderFns = []



/***/ }),
/* 84 */
/*!****************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/TextInput.vue ***!
  \****************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TextInput_vue_vue_type_template_id_eaaaff32_scoped_true___ = __webpack_require__(/*! ./TextInput.vue?vue&type=template&id=eaaaff32&scoped=true& */ 85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TextInput_vue_vue_type_script_lang_js___ = __webpack_require__(/*! ./TextInput.vue?vue&type=script&lang=js& */ 25);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TextInput_vue_vue_type_style_index_0_id_eaaaff32_scoped_true_lang_css___ = __webpack_require__(/*! ./TextInput.vue?vue&type=style&index=0&id=eaaaff32&scoped=true&lang=css& */ 87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 2);






/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_3__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__TextInput_vue_vue_type_script_lang_js___["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_0__TextInput_vue_vue_type_template_id_eaaaff32_scoped_true___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__TextInput_vue_vue_type_template_id_eaaaff32_scoped_true___["b" /* staticRenderFns */],
  false,
  null,
  "eaaaff32",
  null
  
)

/* harmony default export */ __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 85 */
/*!***********************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/TextInput.vue?vue&type=template&id=eaaaff32&scoped=true& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_TextInput_vue_vue_type_template_id_eaaaff32_scoped_true___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./TextInput.vue?vue&type=template&id=eaaaff32&scoped=true& */ 86);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_TextInput_vue_vue_type_template_id_eaaaff32_scoped_true___["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_TextInput_vue_vue_type_template_id_eaaaff32_scoped_true___["b"]; });


/***/ }),
/* 86 */
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/TextInput.vue?vue&type=template&id=eaaaff32&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"text-input"},[_c('label',[_vm._v(_vm._s(_vm.fieldDef.label))]),_vm._v(" "),_c('input',{attrs:{"type":"text"},domProps:{"value":_vm.value},on:{"input":function($event){return _vm.update('value', $event.target.value)}}})])}
var staticRenderFns = []



/***/ }),
/* 87 */
/*!*************************************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/TextInput.vue?vue&type=style&index=0&id=eaaaff32&scoped=true&lang=css& ***!
  \*************************************************************************************************************************/
/*! dynamic exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_TextInput_vue_vue_type_style_index_0_id_eaaaff32_scoped_true_lang_css___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/style-loader!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./TextInput.vue?vue&type=style&index=0&id=eaaaff32&scoped=true&lang=css& */ 27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_TextInput_vue_vue_type_style_index_0_id_eaaaff32_scoped_true_lang_css____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_TextInput_vue_vue_type_style_index_0_id_eaaaff32_scoped_true_lang_css___);
/* unused harmony reexport namespace */
 /* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_TextInput_vue_vue_type_style_index_0_id_eaaaff32_scoped_true_lang_css____default.a); 

/***/ }),
/* 88 */
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/TextInput.vue?vue&type=style&index=0&id=eaaaff32&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/css-loader/dist/runtime/api.js */ 0);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.text-input[data-v-eaaaff32]{\n    max-width:100%;\n    width:300px;\n}\n.text-input input[data-v-eaaaff32]{\n    max-width:98%;\n    width:280px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 89 */
/*!*******************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/CustomSelect.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CustomSelect_vue_vue_type_template_id_edc8b4cc_scoped_true___ = __webpack_require__(/*! ./CustomSelect.vue?vue&type=template&id=edc8b4cc&scoped=true& */ 90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CustomSelect_vue_vue_type_script_lang_js___ = __webpack_require__(/*! ./CustomSelect.vue?vue&type=script&lang=js& */ 28);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CustomSelect_vue_vue_type_style_index_0_id_edc8b4cc_scoped_true_lang_css___ = __webpack_require__(/*! ./CustomSelect.vue?vue&type=style&index=0&id=edc8b4cc&scoped=true&lang=css& */ 92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 2);






/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_3__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__CustomSelect_vue_vue_type_script_lang_js___["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_0__CustomSelect_vue_vue_type_template_id_edc8b4cc_scoped_true___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__CustomSelect_vue_vue_type_template_id_edc8b4cc_scoped_true___["b" /* staticRenderFns */],
  false,
  null,
  "edc8b4cc",
  null
  
)

/* harmony default export */ __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 90 */
/*!**************************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/CustomSelect.vue?vue&type=template&id=edc8b4cc&scoped=true& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomSelect_vue_vue_type_template_id_edc8b4cc_scoped_true___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./CustomSelect.vue?vue&type=template&id=edc8b4cc&scoped=true& */ 91);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomSelect_vue_vue_type_template_id_edc8b4cc_scoped_true___["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomSelect_vue_vue_type_template_id_edc8b4cc_scoped_true___["b"]; });


/***/ }),
/* 91 */
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/CustomSelect.vue?vue&type=template&id=edc8b4cc&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"custom-select"},[_c('label',[_vm._v(_vm._s(_vm.fieldDef.label)+" "+_vm._s(_vm.value))]),_vm._v(" "),_c('select',{ref:"selectBox",attrs:{"name":_vm.fieldDef.name},on:{"input":function($event){return _vm.update(_vm.fieldDef.name, $event.target.value)}}},[_vm._l((_vm.fieldDef.options),function(option,index){return [_c('option',{key:index,domProps:{"value":option.key,"selected":(option.key==_vm.value)}},[_vm._v(_vm._s(option.value))])]})],2)])}
var staticRenderFns = []



/***/ }),
/* 92 */
/*!****************************************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/CustomSelect.vue?vue&type=style&index=0&id=edc8b4cc&scoped=true&lang=css& ***!
  \****************************************************************************************************************************/
/*! dynamic exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomSelect_vue_vue_type_style_index_0_id_edc8b4cc_scoped_true_lang_css___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/style-loader!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./CustomSelect.vue?vue&type=style&index=0&id=edc8b4cc&scoped=true&lang=css& */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomSelect_vue_vue_type_style_index_0_id_edc8b4cc_scoped_true_lang_css____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomSelect_vue_vue_type_style_index_0_id_edc8b4cc_scoped_true_lang_css___);
/* unused harmony reexport namespace */
 /* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomSelect_vue_vue_type_style_index_0_id_edc8b4cc_scoped_true_lang_css____default.a); 

/***/ }),
/* 93 */
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/CustomSelect.vue?vue&type=style&index=0&id=edc8b4cc&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/css-loader/dist/runtime/api.js */ 0);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.custom-select[data-v-edc8b4cc]{\n    max-width:100%;\n    width:300px;\n}\n.custom-select select[data-v-edc8b4cc]{\n    max-width:98%;\n    width:280px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 94 */
/*!**************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/CustomMonthlyPicker.vue ***!
  \**************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CustomMonthlyPicker_vue_vue_type_template_id_e56f777c_scoped_true___ = __webpack_require__(/*! ./CustomMonthlyPicker.vue?vue&type=template&id=e56f777c&scoped=true& */ 95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CustomMonthlyPicker_vue_vue_type_script_lang_js___ = __webpack_require__(/*! ./CustomMonthlyPicker.vue?vue&type=script&lang=js& */ 31);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CustomMonthlyPicker_vue_vue_type_style_index_0_id_e56f777c_scoped_true_lang_css___ = __webpack_require__(/*! ./CustomMonthlyPicker.vue?vue&type=style&index=0&id=e56f777c&scoped=true&lang=css& */ 97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 2);






/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_3__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__CustomMonthlyPicker_vue_vue_type_script_lang_js___["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_0__CustomMonthlyPicker_vue_vue_type_template_id_e56f777c_scoped_true___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__CustomMonthlyPicker_vue_vue_type_template_id_e56f777c_scoped_true___["b" /* staticRenderFns */],
  false,
  null,
  "e56f777c",
  null
  
)

/* harmony default export */ __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 95 */
/*!*********************************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/CustomMonthlyPicker.vue?vue&type=template&id=e56f777c&scoped=true& ***!
  \*********************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomMonthlyPicker_vue_vue_type_template_id_e56f777c_scoped_true___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./CustomMonthlyPicker.vue?vue&type=template&id=e56f777c&scoped=true& */ 96);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomMonthlyPicker_vue_vue_type_template_id_e56f777c_scoped_true___["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomMonthlyPicker_vue_vue_type_template_id_e56f777c_scoped_true___["b"]; });


/***/ }),
/* 96 */
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/CustomMonthlyPicker.vue?vue&type=template&id=e56f777c&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-monthly-picker"},[_c('label',[_vm._v(_vm._s(_vm.fieldDef.label))]),_vm._v(" "),_c('div',{staticClass:"month-picker-wrapper",class:{ 'active visible':_vm.showMenu }},[_c('div',{staticClass:"month-year-label picker",attrs:{"type":"text","autocomplete":"off","tabindex":"0"},on:{"click":_vm.openMenu}},[_c('div',{staticClass:"month-year-display",class:[_vm.inputClass, {'placeholder': !_vm.value}],attrs:{"disabled":_vm.disabled},on:{"click":_vm.openMenu}},[_c('div',{staticClass:"display-text",class:'display-text-'+_vm.alignment,style:([{'text-align': _vm.alignment}])},[_vm._v(_vm._s(_vm.displayText))]),_vm._v(" "),(_vm.clearOption && _vm.value)?_c('span',{staticClass:"vmp-input-append",on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.clearSelect($event)}}},[_c('i',{staticClass:"vmp-clear-icon"})]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"text"}),_vm._v(" "),_c('div',{staticClass:"date-popover",class:_vm.menuClass,style:(_vm.menuStyle),attrs:{"tabindex":"-1"}},[_c('div',{staticClass:"picker",staticStyle:{"text-align":"center"}},[_c('div',{staticClass:"flexbox"},[_c('span',{staticClass:"prev",class:{deactive: !_vm.canBack},on:{"click":_vm.prevYear}}),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm.year))]),_vm._v(" "),_c('span',{staticClass:"next",class:{deactive: !_vm.canNext},on:{"click":_vm.nextYear}})]),_vm._v(" "),_c('div',{staticClass:"flexbox monthItem"},[_vm._l((_vm.monthLabels),function(month,idx){return [(_vm.isActive(idx))?_c('div',{key:idx,staticClass:"item active",class:{'selected': _vm.isCurrentSelected(_vm.year, idx)},style:([{'background-color': _vm.getBackgroundColor(_vm.year, idx)}]),on:{"click":function($event){return _vm.selectMonth(idx)}}},[_vm._v(_vm._s(month)+"\n                    ")]):_c('div',{key:idx,staticClass:"item deactive",class:{'selected': _vm.isCurrentSelected(_vm.year, idx)}},[_vm._v("\n                        "+_vm._s(month)+"\n                    ")])]})],2)])])])])}
var staticRenderFns = []



/***/ }),
/* 97 */
/*!***********************************************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/CustomMonthlyPicker.vue?vue&type=style&index=0&id=e56f777c&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************/
/*! dynamic exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomMonthlyPicker_vue_vue_type_style_index_0_id_e56f777c_scoped_true_lang_css___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/style-loader!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./CustomMonthlyPicker.vue?vue&type=style&index=0&id=e56f777c&scoped=true&lang=css& */ 33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomMonthlyPicker_vue_vue_type_style_index_0_id_e56f777c_scoped_true_lang_css____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomMonthlyPicker_vue_vue_type_style_index_0_id_e56f777c_scoped_true_lang_css___);
/* unused harmony reexport namespace */
 /* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomMonthlyPicker_vue_vue_type_style_index_0_id_e56f777c_scoped_true_lang_css____default.a); 

/***/ }),
/* 98 */
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/CustomMonthlyPicker.vue?vue&type=style&index=0&id=e56f777c&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/css-loader/dist/runtime/api.js */ 0);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.vue-monthly-picker[data-v-e56f777c]{\n        max-width:100%;\n        width:300px;\n}\n.vue-monthly-picker .month-picker-wrapper[data-v-e56f777c]{\n        max-width:98%;\n        width:280px;\n}\n.vue-monthly-picker .picker .next[data-v-e56f777c]:hover, .vue-monthly-picker .picker .prev[data-v-e56f777c]:hover {\n    cursor: pointer;\n}\n.vue-monthly-picker .picker .monthItem .item[data-v-e56f777c] {\n    border-top: 1px solid #d4d4d4;\n}\n.vue-monthly-picker .picker .monthItem .item.active[data-v-e56f777c]:hover {\n    cursor: pointer;\n    background-color: #d4d4d4;\n}\n.vue-monthly-picker .picker .flexbox[data-v-e56f777c] {\n    padding: 0px;\n    display: flex;\n    flex-wrap: wrap;\n}\n.vue-monthly-picker .picker .flexbox div[data-v-e56f777c] {\n    flex-grow: 1;\n    padding: 15px 0;\n}\n.vue-monthly-picker .picker .flexbox .item[data-v-e56f777c] {\n    flex: 1;\n    flex-basis: 25%;\n}\n.vue-monthly-picker .placeholder[data-v-e56f777c] {\n    color: #8b8b8b;\n}\n.vue-monthly-picker .date-popover[data-v-e56f777c] {\n    overflow-x: hidden;\n    overflow-y: hidden;\n    outline: none;\n    max-width: 350px;\n    width: 100%;\n    border-radius: 0 0 0.28571429rem 0.28571429rem;\n    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);\n    background: #fff;\n    transition: opacity 0.1s ease;\n    position: absolute;\n    margin: auto;\n    z-index: 10;\n    border: 1px solid #d4d4d4;\n    font-size: 1rem;\n    font-weight: 200;\n}\n.vue-monthly-picker .month-picker-wrapper[data-v-e56f777c] {\n    position: relative;\n    display: block;\n    min-width: 200px;\n}\n.vue-monthly-picker .month-year-label[data-v-e56f777c] {\n    outline: none;\n}\n.vue-monthly-picker .month-year-label .vmp-input-append[data-v-e56f777c] {\n    display: none;\n}\n.vue-monthly-picker .month-year-label:hover .vmp-input-append[data-v-e56f777c] {\n    display: block;\n}\n.vue-monthly-picker .text[data-v-e56f777c] {\n    position: relative;\n    z-index: 2;\n}\n.vue-monthly-picker .month-year-display[data-v-e56f777c]:hover {\n    cursor: pointer;\n}\n.vue-monthly-picker .next[data-v-e56f777c], .vue-monthly-picker .prev[data-v-e56f777c] {\n    width: 16%;\n    float: left;\n    text-indent: -10000px;\n    position: relative;\n}\n.vue-monthly-picker .next[data-v-e56f777c]:after, .vue-monthly-picker .prev[data-v-e56f777c]:after {\n    content: \"\";\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    -webkit-transform: translateX(-50%) translateY(-50%);\n    transform: translateX(-50%) translateY(-50%);\n    border: 6px solid transparent;\n}\n.vue-monthly-picker .next[data-v-e56f777c]:after {\n    border-left: 10px solid #000;\n    margin-left: 5px;\n}\n.vue-monthly-picker .next.deactive[data-v-e56f777c]:hover {\n    cursor: default;\n}\n.vue-monthly-picker .next.deactive[data-v-e56f777c]:after {\n    border-left: 10px solid #999999;\n}\n.vue-monthly-picker .prev[data-v-e56f777c]:after {\n    border-right: 10px solid #000;\n    margin-left: -5px;\n}\n.vue-monthly-picker .prev.deactive[data-v-e56f777c]:hover {\n    cursor: default;\n}\n.vue-monthly-picker .prev.deactive[data-v-e56f777c]:after {\n    border-right: 10px solid #999999;\n}\n.vue-monthly-picker .input[data-v-e56f777c] {\n    -moz-appearance: none;\n    -webkit-appearance: none;\n    align-items: center;\n    border: 1px solid transparent;\n    border-radius: 3px;\n    box-shadow: none;\n    display: inline-flex;\n    font-size: 18px;\n    height: 25px;\n    justify-content: flex-start;\n    line-height: 1.5;\n    padding: 2px calc(.625em - 1px);\n    position: relative;\n    vertical-align: top;\n    background-color: #fff;\n    border-color: #dbdbdb;\n    color: #363636;\n    box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);\n    max-width: 100%;\n    width: 91%;\n}\n.vue-monthly-picker .deactive[data-v-e56f777c] {\n    color: #999999;\n}\n.vue-monthly-picker .selected[data-v-e56f777c] {\n    color: #fff;\n    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\n    font-weight: bold;\n}\n.vue-monthly-picker .display-text[data-v-e56f777c] {\n    width: 100%;\n}\n.vue-monthly-picker .display-text-right[data-v-e56f777c] {\n    margin-right: 20px;\n}\n.vue-monthly-picker .vmp-input-append[data-v-e56f777c] {\n    position: absolute;\n    top: -10;\n    right: 0;\n    width: 30px;\n    height: 100%;\n    padding: 6px;\n}\n.vue-monthly-picker .vmp-clear-icon[data-v-e56f777c] {\n    display: inline-block;\n    width: 100%;\n    height: 100%;\n    font-style: normal;\n    color: #555;\n    text-align: center;\n    cursor: pointer;\n}\n.vue-monthly-picker .vmp-clear-icon[data-v-e56f777c]:before {\n    display: inline-block;\n    content: '\\2716';\n    vertical-align: middle;\n}\n  \n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 99 */
/*!***************************************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/CustomInput.vue?vue&type=style&index=0&id=a048b3fa&scoped=true&lang=css& ***!
  \***************************************************************************************************************************/
/*! dynamic exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomInput_vue_vue_type_style_index_0_id_a048b3fa_scoped_true_lang_css___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/style-loader!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./CustomInput.vue?vue&type=style&index=0&id=a048b3fa&scoped=true&lang=css& */ 34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomInput_vue_vue_type_style_index_0_id_a048b3fa_scoped_true_lang_css____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomInput_vue_vue_type_style_index_0_id_a048b3fa_scoped_true_lang_css___);
/* unused harmony reexport namespace */
 /* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomInput_vue_vue_type_style_index_0_id_a048b3fa_scoped_true_lang_css____default.a); 

/***/ }),
/* 100 */
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/CustomInput.vue?vue&type=style&index=0&id=a048b3fa&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/css-loader/dist/runtime/api.js */ 0);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.custom-input[data-v-a048b3fa]{\r\n    float:left;\r\n    height:50px;\r\n    margin:5px 10px 10px 0px;\n}\n.custom-input input[data-v-a048b3fa], .adra-advanced-search-form .custom-input select[data-v-a048b3fa]{\r\n    line-height:30px;\r\n    height:30px;\n}\n.custom-input label[data-v-a048b3fa]{\r\n    display: block;\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 101 */
/*!******************************************************************************************************************!*\
  !*** ../admin/js/src/search-form/node_modules/vue-slim-tabs/themes/default.css?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************/
/*! dynamic exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_default_css_vue_type_style_index_0_lang_css___ = __webpack_require__(/*! -!../../../../../../../block-editor/node_modules/style-loader!../../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./default.css?vue&type=style&index=0&lang=css& */ 35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_default_css_vue_type_style_index_0_lang_css____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_default_css_vue_type_style_index_0_lang_css___);
/* unused harmony reexport namespace */
 /* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_default_css_vue_type_style_index_0_lang_css____default.a); 

/***/ }),
/* 102 */
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!../admin/js/src/search-form/node_modules/vue-slim-tabs/themes/default.css?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../block-editor/node_modules/css-loader/dist/runtime/api.js */ 0);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".vue-tablist {\n  list-style: none;\n  display: flex;\n  padding-left: 0;\n  border-bottom: 1px solid #e2e2e2;\n}\n.vue-tab {\n  padding: 5px 10px;\n  cursor: pointer;\n  user-select: none;\n  border: 1px solid transparent;\n  border-bottom-color: #e2e2e2;\n  border-radius: 3px 3px 0 0;\n  background-color: white;\n  position: relative;\n  bottom: -1px;\n}\n.vue-tab[aria-selected=\"true\"] {\n  border-color: #e2e2e2;\n  border-bottom-color: transparent;\n}\n.vue-tab[aria-disabled=\"true\"] {\n  cursor: not-allowed;\n  color: #999;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 103 */
/*!******************************************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/AdvancedSearch.vue?vue&type=style&index=1&id=22e415f1&scoped=true&lang=css& ***!
  \******************************************************************************************************************************/
/*! dynamic exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_AdvancedSearch_vue_vue_type_style_index_1_id_22e415f1_scoped_true_lang_css___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/style-loader!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./AdvancedSearch.vue?vue&type=style&index=1&id=22e415f1&scoped=true&lang=css& */ 36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_AdvancedSearch_vue_vue_type_style_index_1_id_22e415f1_scoped_true_lang_css____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_AdvancedSearch_vue_vue_type_style_index_1_id_22e415f1_scoped_true_lang_css___);
/* unused harmony reexport namespace */
 /* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_AdvancedSearch_vue_vue_type_style_index_1_id_22e415f1_scoped_true_lang_css____default.a); 

/***/ }),
/* 104 */
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/AdvancedSearch.vue?vue&type=style&index=1&id=22e415f1&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/css-loader/dist/runtime/api.js */ 0);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.advanced-search[data-v-22e415f1]{\r\n    height:300px;\n}\n.vue-tabs[data-v-22e415f1]{\r\n    height:100%;\n}\n.vue-tabpanel[data-v-22e415f1]{\r\n    overflow-y: scroll;\r\n    height:90%;\r\n    float:left;\r\n    width:100%;\n}\r\n\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 105 */
/*!****************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/Paginator.vue ***!
  \****************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Paginator_vue_vue_type_template_id_5f114f26_scoped_true___ = __webpack_require__(/*! ./Paginator.vue?vue&type=template&id=5f114f26&scoped=true& */ 106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Paginator_vue_vue_type_script_lang_js___ = __webpack_require__(/*! ./Paginator.vue?vue&type=script&lang=js& */ 37);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Paginator_vue_vue_type_style_index_0_id_5f114f26_scoped_true_lang_css___ = __webpack_require__(/*! ./Paginator.vue?vue&type=style&index=0&id=5f114f26&scoped=true&lang=css& */ 108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 2);






/* normalize component */

var component = Object(__WEBPACK_IMPORTED_MODULE_3__block_editor_node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__Paginator_vue_vue_type_script_lang_js___["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_0__Paginator_vue_vue_type_template_id_5f114f26_scoped_true___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__Paginator_vue_vue_type_template_id_5f114f26_scoped_true___["b" /* staticRenderFns */],
  false,
  null,
  "5f114f26",
  null
  
)

/* harmony default export */ __webpack_exports__["a"] = (component.exports);

/***/ }),
/* 106 */
/*!***********************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/Paginator.vue?vue&type=template&id=5f114f26&scoped=true& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_Paginator_vue_vue_type_template_id_5f114f26_scoped_true___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./Paginator.vue?vue&type=template&id=5f114f26&scoped=true& */ 107);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_Paginator_vue_vue_type_template_id_5f114f26_scoped_true___["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_Paginator_vue_vue_type_template_id_5f114f26_scoped_true___["b"]; });


/***/ }),
/* 107 */
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/Paginator.vue?vue&type=template&id=5f114f26&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"paginatorP"},[_c('div',{staticClass:"wrapperP",attrs:{"v-if":_vm.showPaginator}},[_c('div',{staticClass:"centerP"},[_c('a',{staticClass:"buttonP prev",style:(_vm.prevButtonStatus()),attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.prev()}}},[_vm._v("Prev")]),_vm._v(" "),(_vm.searchResultsCounter>_vm.offsetStep)?[_c('input',{ref:"pagInput",staticClass:"inputPaginator",domProps:{"value":Math.round(_vm.resultsOffset/_vm.offsetStep)+1},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.doPaginate()}}})]:_vm._e(),_vm._v(" "),_c('a',{staticClass:"buttonP next",style:(_vm.nextButtonStatus()),attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.next()}}},[_vm._v("Next")])],2)])])}
var staticRenderFns = []



/***/ }),
/* 108 */
/*!*************************************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/Paginator.vue?vue&type=style&index=0&id=5f114f26&scoped=true&lang=css& ***!
  \*************************************************************************************************************************/
/*! dynamic exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_Paginator_vue_vue_type_style_index_0_id_5f114f26_scoped_true_lang_css___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/style-loader!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./Paginator.vue?vue&type=style&index=0&id=5f114f26&scoped=true&lang=css& */ 39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_Paginator_vue_vue_type_style_index_0_id_5f114f26_scoped_true_lang_css____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_Paginator_vue_vue_type_style_index_0_id_5f114f26_scoped_true_lang_css___);
/* unused harmony reexport namespace */
 /* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_Paginator_vue_vue_type_style_index_0_id_5f114f26_scoped_true_lang_css____default.a); 

/***/ }),
/* 109 */
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/Paginator.vue?vue&type=style&index=0&id=5f114f26&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/css-loader/dist/runtime/api.js */ 0);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\ndiv.paginatorP[data-v-5f114f26]{\n    width:100%;\n    clear:both;\n    height:30px;\n}\n.wrapperP[data-v-5f114f26]{\n    width:100%;\n    height:30px;\n}\n.centerP[data-v-5f114f26]{\n    width:200px;\n    margin:auto;\n    height:30px;\n}\na.buttonP[data-v-5f114f26]{\n    display:block;\n    background-color:black;\n    color:white;\n    padding:5px;\n    width:70px;\n    text-align: center;\n}\na.prev[data-v-5f114f26]{\n    float:left;\n}\na.next[data-v-5f114f26]{\n    float:right;\n}\n.inputPaginator[data-v-5f114f26]{\n    width:30px;\n    margin-left:5px;\n    padding-left:5px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 110 */
/*!**************************************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/SearchForm.vue?vue&type=style&index=0&id=34a2e59a&scoped=true&lang=css& ***!
  \**************************************************************************************************************************/
/*! dynamic exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchForm_vue_vue_type_style_index_0_id_34a2e59a_scoped_true_lang_css___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/style-loader!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./SearchForm.vue?vue&type=style&index=0&id=34a2e59a&scoped=true&lang=css& */ 40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchForm_vue_vue_type_style_index_0_id_34a2e59a_scoped_true_lang_css____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchForm_vue_vue_type_style_index_0_id_34a2e59a_scoped_true_lang_css___);
/* unused harmony reexport namespace */
 /* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchForm_vue_vue_type_style_index_0_id_34a2e59a_scoped_true_lang_css____default.a); 

/***/ }),
/* 111 */
/*!***************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/SearchForm.vue?vue&type=style&index=0&id=34a2e59a&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/css-loader/dist/runtime/api.js */ 0);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.resourcespace-adra h1[data-v-34a2e59a]{\n    font-size:1.5em;\n    font-weight:bold;\n}\n.search-button-wrapper[data-v-34a2e59a]{\n      float:left;\n      padding-top:10px;\n      padding-left:5px;\n}\n.search-button[data-v-34a2e59a]{\n      font-size:25px;\n}\n.advanced-search-wrapper[data-v-34a2e59a]{\n      padding-top:7px;\n      float:left;\n      padding-left: 9px;\n}\n.advanced-search-wrapper a[data-v-34a2e59a]{\n      cursor: pointer;\n      font-size:20px;\n      margin-left:10px;\n}\n.adra-main-search-form .main-input[data-v-34a2e59a]{\n    float:left;\n    width:230px;\n}\n.adra-main-search-form .main-input input[data-v-34a2e59a]{\n    height:2.25em;\n    padding:2px 9px 2px 9px;\n    font-size: 18px;\n    max-width:230px;\n}\n.resourcespace-adra-search-results[data-v-34a2e59a]{\n    width:99%;\n    overflow-y: scroll;\n    float:left;\n}\n.resourcespace-adra[data-v-34a2e59a]{\n    max-height:92%;\n    display:flex;\n    flex-direction: column;\n}\n.resourcespace-adra-search-form[data-v-34a2e59a]{\n  margin-right:5px;\n}\n.resourcespace-adra-search-form h1[data-v-34a2e59a]::before {\n  content: none;\n}\na.advanced-search[data-v-34a2e59a]{\n  color:black;\n  font-size:14px;\n  line-height: 14px;\n  margin-bottom:5px;\n  display:block;\n}\na.advanced-search-reset[data-v-34a2e59a]{\n  color:black;\n  font-size:14px;\n  line-height: 14px;\n  display:block;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 112 */
/*!*********************************************************************************************************************!*\
  !*** ../admin/js/src/search-form/src/components/Modal.vue?vue&type=style&index=0&id=2a0cb46e&scoped=true&lang=css& ***!
  \*********************************************************************************************************************/
/*! dynamic exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_style_index_0_id_2a0cb46e_scoped_true_lang_css___ = __webpack_require__(/*! -!../../../../../../block-editor/node_modules/style-loader!../../../../../../block-editor/node_modules/css-loader/dist/cjs.js!../../../../../../block-editor/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../block-editor/node_modules/vue-loader/lib??vue-loader-options!./Modal.vue?vue&type=style&index=0&id=2a0cb46e&scoped=true&lang=css& */ 41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_style_index_0_id_2a0cb46e_scoped_true_lang_css____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_style_index_0_id_2a0cb46e_scoped_true_lang_css___);
/* unused harmony reexport namespace */
 /* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_0__block_editor_node_modules_style_loader_index_js_block_editor_node_modules_css_loader_dist_cjs_js_block_editor_node_modules_vue_loader_lib_loaders_stylePostLoader_js_block_editor_node_modules_vue_loader_lib_index_js_vue_loader_options_Modal_vue_vue_type_style_index_0_id_2a0cb46e_scoped_true_lang_css____default.a); 

/***/ }),
/* 113 */
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!../admin/js/src/search-form/src/components/Modal.vue?vue&type=style&index=0&id=2a0cb46e&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../block-editor/node_modules/css-loader/dist/runtime/api.js */ 0);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.modal-backdrop[data-v-2a0cb46e] {\r\n    position: fixed;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    right: 0;\r\n    background-color: rgba(0, 0, 0, 0.3);\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    z-index:100;\n}\n.modal[data-v-2a0cb46e] {\r\n    background: #FFFFFF;\r\n    box-shadow: 2px 2px 20px 1px;\r\n    overflow-x: auto;\r\n    display: flex;\r\n    flex-direction: column;\r\n    max-width:80%;\r\n    min-width:300px;\r\n    min-height:200px;\n}\n.modal-header[data-v-2a0cb46e], .modal-footer[data-v-2a0cb46e] {\r\n    padding: 0px 0px 0px 15px;\r\n    display: flex;\n}\n.modal-header[data-v-2a0cb46e] {\r\n    border-bottom: 1px solid #eeeeee;\r\n    color: #4AAE9B;\r\n    justify-content: space-between;\r\n    font-size:16px;\n}\n.modal-footer[data-v-2a0cb46e] {\r\n    border-top: 1px solid #eeeeee;\r\n    justify-content: flex-end;\n}\n.modal-body[data-v-2a0cb46e] {\r\n    position: relative;\r\n    max-height:100%;\r\n    height:100%;\r\n    font-size:16px;\r\n/*    padding: 20px 10px;*/\n}\n.modal-mask[data-v-2a0cb46e] {\r\n    position: fixed;\r\n    z-index: 99999;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: rgba(0, 0, 0, .5);\r\n    transition: opacity .3s ease;\n}\n.modal-wrapper[data-v-2a0cb46e]{\r\n    z-index: 99999;\r\n    display: block;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    width:100%;\r\n    height:100%;\r\n    background-color: rgba(0, 0, 0, .5);\n}\n.modal-container[data-v-2a0cb46e] {\r\n    z-index: 99999;\r\n    left: 420px;\r\n\r\n    width: 50%;\r\n    max-width:100%;\r\n    margin: 40px auto 0;\r\n    padding: 20px 30px;\r\n    background-color: #fff;\r\n    border-radius: 2px;\r\n    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);\r\n    transition: all .3s ease;\r\n    font-family: Helvetica, Arial, sans-serif;\r\n    height:85%;\r\n\r\n    border:5px solid black;\n}\n.modal-header h3[data-v-2a0cb46e] {\r\n    margin-top: 0;\r\n    color: #42b983;\n}\n.text-right[data-v-2a0cb46e] {\r\n    text-align: right;\n}\n.form-label[data-v-2a0cb46e] {\r\n    display: block;\r\n    margin-bottom: 1em;\n}\n.form-label > .form-control[data-v-2a0cb46e] {\r\n    margin-top: 0.5em;\n}\n.form-control[data-v-2a0cb46e] {\r\n    display: block;\r\n    width: 100%;\r\n    padding: 0.5em 1em;\r\n    line-height: 1.5;\r\n    border: 1px solid #ddd;\n}\r\n\r\n/*\r\n* The following styles are auto-applied to elements with\r\n* transition=\"modal\" when their visibility is toggled\r\n* by Vue.js.\r\n*\r\n* You can easily play with the modal transition by editing\r\n* these styles.\r\n*/\n.modal-enter[data-v-2a0cb46e] {\r\n  opacity: 0;\n}\n.modal-leave-active[data-v-2a0cb46e] {\r\n  opacity: 0;\n}\n.modal-enter .modal-container[data-v-2a0cb46e],\r\n.modal-leave-active .modal-container[data-v-2a0cb46e] {\r\n  -webkit-transform: scale(1.1);\r\n  transform: scale(1.1);\n}\n.modal-title[data-v-2a0cb46e]{\r\n    float:left;\n}\n.modal-close[data-v-2a0cb46e]{\r\n    float:right;\r\n    cursor: pointer;\n}\n.modal-title h1[data-v-2a0cb46e]{\r\n    font-size: 1.3em;\r\n    padding:0px;\r\n    margin-block-start: 0px;\r\n    margin-block-end: 0px;\n}\n.modal-title h1[data-v-2a0cb46e]::before {\r\n  content: none;\n}\n@media only screen and (max-width: 600px) {\n.modal-container[data-v-2a0cb46e] {\r\n        width: 70%;\n}\n}\r\n\r\n", ""]);
// Exports
module.exports = exports;


/***/ })
/******/ ]);