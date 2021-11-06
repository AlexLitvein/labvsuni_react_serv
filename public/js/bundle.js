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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: Cannot find module '@babel/core'\nRequire stack:\n- D:\\Work\\message-board\\node_modules\\@babel\\plugin-transform-react-jsx\\lib\\create-plugin.js\n- D:\\Work\\message-board\\node_modules\\@babel\\plugin-transform-react-jsx\\lib\\index.js\n- D:\\Work\\message-board\\node_modules\\@babel\\preset-react\\lib\\index.js\n- D:\\Work\\message-board\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js\n- D:\\Work\\message-board\\node_modules\\babel-core\\lib\\transformation\\file\\index.js\n- D:\\Work\\message-board\\node_modules\\babel-core\\lib\\api\\node.js\n- D:\\Work\\message-board\\node_modules\\babel-core\\index.js\n- D:\\Work\\message-board\\node_modules\\babel-loader\\lib\\index.js\n- D:\\Work\\message-board\\node_modules\\loader-runner\\lib\\loadLoader.js\n- D:\\Work\\message-board\\node_modules\\loader-runner\\lib\\LoaderRunner.js\n- D:\\Work\\message-board\\node_modules\\webpack\\lib\\NormalModule.js\n- D:\\Work\\message-board\\node_modules\\webpack\\lib\\NormalModuleFactory.js\n- D:\\Work\\message-board\\node_modules\\webpack\\lib\\Compiler.js\n- D:\\Work\\message-board\\node_modules\\webpack\\lib\\webpack.js\n- D:\\Work\\message-board\\node_modules\\webpack\\bin\\webpack.js (While processing preset: \"D:\\\\Work\\\\message-board\\\\node_modules\\\\@babel\\\\preset-react\\\\lib\\\\index.js\")\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:965:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:841:27)\n    at Module.require (internal/modules/cjs/loader.js:1025:19)\n    at require (internal/modules/cjs/helpers.js:72:18)\n    at Object.<anonymous> (D:\\Work\\message-board\\node_modules\\@babel\\plugin-transform-react-jsx\\lib\\create-plugin.js:12:13)\n    at Module._compile (internal/modules/cjs/loader.js:1137:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1157:10)\n    at Module.load (internal/modules/cjs/loader.js:985:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:878:14)\n    at Module.require (internal/modules/cjs/loader.js:1025:19)\n    at require (internal/modules/cjs/helpers.js:72:18)\n    at Object.<anonymous> (D:\\Work\\message-board\\node_modules\\@babel\\plugin-transform-react-jsx\\lib\\index.js:8:21)\n    at Module._compile (internal/modules/cjs/loader.js:1137:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1157:10)\n    at Module.load (internal/modules/cjs/loader.js:985:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:878:14)\n    at Module.require (internal/modules/cjs/loader.js:1025:19)\n    at require (internal/modules/cjs/helpers.js:72:18)\n    at Object.<anonymous> (D:\\Work\\message-board\\node_modules\\@babel\\preset-react\\lib\\index.js:6:25)\n    at Module._compile (internal/modules/cjs/loader.js:1137:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1157:10)\n    at Module.load (internal/modules/cjs/loader.js:985:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:878:14)\n    at Module.require (internal/modules/cjs/loader.js:1025:19)\n    at require (internal/modules/cjs/helpers.js:72:18)\n    at D:\\Work\\message-board\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:296:17\n    at Array.map (<anonymous>)\n    at OptionManager.resolvePresets (D:\\Work\\message-board\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:275:20)\n    at OptionManager.mergePresets (D:\\Work\\message-board\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:264:10)\n    at OptionManager.mergeOptions (D:\\Work\\message-board\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:249:14)");

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map