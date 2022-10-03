/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!***********************************!*\
  !*** ./src/icon-heading/index.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);


/**
 * WordPress dependencies
 */



const icon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 48 48"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Path, {
  d: "m19.25 27.4 1.8-5.75-4.75-3.7h5.8L24 12l1.85 5.95h5.85l-4.75 3.7 1.75 5.75-4.7-3.55ZM12.2 46V30.8q-2.25-2.35-3.225-5.15Q8 22.85 8 20q0-6.8 4.6-11.4Q17.2 4 24 4q6.8 0 11.4 4.6Q40 13.2 40 20q0 2.85-.975 5.65-.975 2.8-3.225 5.15V46L24 42.05ZM24 33q5.45 0 9.225-3.775Q37 25.45 37 20q0-5.45-3.775-9.225Q29.45 7 24 7q-5.45 0-9.225 3.775Q11 14.55 11 20q0 5.45 3.775 9.225Q18.55 33 24 33Zm-8.8 8.8 8.8-2.75 8.8 2.75v-8.55q-2 1.45-4.3 2.1-2.3.65-4.5.65t-4.5-.65q-2.3-.65-4.3-2.1Zm8.8-4.3Z"
}));
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.registerBlockVariation)('core/group', {
  name: 'themezee/icon-heading',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Icon Heading'),
  icon,
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Arrange icon and heading horizontally.'),
  category: 'design',
  attributes: {
    layout: {
      type: 'flex',
      flexWrap: 'nowrap'
    },
    style: {
      spacing: {
        blockGap: '12px'
      }
    }
  },
  scope: ['inserter'],
  isActive: blockAttributes => {
    var _blockAttributes$layo, _blockAttributes$layo2, _blockAttributes$layo3;

    return ((_blockAttributes$layo = blockAttributes.layout) === null || _blockAttributes$layo === void 0 ? void 0 : _blockAttributes$layo.type) === 'flex' && (!((_blockAttributes$layo2 = blockAttributes.layout) !== null && _blockAttributes$layo2 !== void 0 && _blockAttributes$layo2.orientation) || ((_blockAttributes$layo3 = blockAttributes.layout) === null || _blockAttributes$layo3 === void 0 ? void 0 : _blockAttributes$layo3.orientation) === 'horizontal');
  },
  innerBlocks: [['themezee/icon', {
    iconName: "cover",
    iconLibrary: "wordpress",
    iconWidth: "36px",
    iconHeight: "36px"
  }], ['core/heading', {
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Icon Heading')
  }]],
  example: {
    attributes: {
      style: {
        color: {
          text: '#000000',
          background: '#ffffff'
        }
      }
    },
    innerBlocks: [{
      name: 'themezee/icon',
      attributes: {
        iconName: "cover",
        iconLibrary: "wordpress",
        iconWidth: "36px",
        iconHeight: "36px"
      }
    }, {
      name: 'core/heading',
      attributes: {
        content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Icon Heading')
      }
    }]
  }
});
}();
/******/ })()
;
//# sourceMappingURL=index.js.map