webpackHotUpdate(0,{

/***/ 253:
/*!****************************************************************!*\
  !*** ./src/client/prototype-test-Flux/components/MainPage.jsx ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(/*! ./~/react-hot-loader/~/react-hot-api/modules/index.js */ 77), RootInstanceProvider = __webpack_require__(/*! ./~/react-hot-loader/RootInstanceProvider.js */ 85), ReactMount = __webpack_require__(/*! react/lib/ReactMount */ 87), React = __webpack_require__(/*! react */ 146); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 146);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _FlotChart = __webpack_require__(/*! ./FlotChart */ 254);
	
	var _FlotChart2 = _interopRequireDefault(_FlotChart);
	
	var _Timer = __webpack_require__(/*! ./Timer */ 270);
	
	var _Timer2 = _interopRequireDefault(_Timer);
	
	var _OptionsDefinition = __webpack_require__(/*! ../constants/charts/OptionsDefinition */ 271);
	
	var _main = __webpack_require__(/*! ../constants/css-styles/main */ 264);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MainPage = function (_Component) {
	    _inherits(MainPage, _Component);
	
	    function MainPage(props) {
	        _classCallCheck(this, MainPage);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(MainPage).call(this, props));
	    }
	
	    _createClass(MainPage, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'p',
	                    { style: _main.titleStyle },
	                    'This is a React.js test !'
	                ),
	                _react2.default.createElement(_FlotChart2.default, { options: _OptionsDefinition.options }),
	                _react2.default.createElement(_Timer2.default, { start: Date.now() })
	            );
	        }
	    }]);
	
	    return MainPage;
	}(_react.Component);
	
	exports.default = MainPage;
	
	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(/*! ./~/react-hot-loader/makeExportsHot.js */ 260); if (makeExportsHot(module, __webpack_require__(/*! react */ 146))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "MainPage.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../../../~/webpack/buildin/module.js */ 4)(module)))

/***/ }

})
//# sourceMappingURL=0.a4c393cd601c5af57612.hot-update.js.map