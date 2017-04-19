webpackHotUpdate(0,{

/***/ 254:
/*!*****************************************************************!*\
  !*** ./src/client/prototype-test-Flux/components/FlotChart.jsx ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(/*! ./~/react-hot-loader/~/react-hot-api/modules/index.js */ 77), RootInstanceProvider = __webpack_require__(/*! ./~/react-hot-loader/RootInstanceProvider.js */ 85), ReactMount = __webpack_require__(/*! react/lib/ReactMount */ 87), React = __webpack_require__(/*! react */ 146); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 146);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ActionsHandler = __webpack_require__(/*! ../actions/ActionsHandler */ 255);
	
	var _main = __webpack_require__(/*! ../constants/css-styles/main */ 264);
	
	var _TimeSerieStore = __webpack_require__(/*! ../stores/TimeSerieStore */ 265);
	
	var _TimeSerieStore2 = _interopRequireDefault(_TimeSerieStore);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// import $ from 'jquery';
	var $ = __webpack_require__(/*! jquery */ 269);
	
	var FlotChart = function (_Component) {
	    _inherits(FlotChart, _Component);
	
	    function FlotChart(props) {
	        _classCallCheck(this, FlotChart);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FlotChart).call(this, props));
	
	        _this.renderChart = _this.renderChart.bind(_this);
	        _this._onChange = _this._onChange.bind(_this);
	        _this.state = _TimeSerieStore2.default.getSerie();
	        return _this;
	    }
	
	    _createClass(FlotChart, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _TimeSerieStore2.default.addChangeListener(this._onChange);
	            (0, _ActionsHandler.getTimeSerie)();
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            _TimeSerieStore2.default.removeChangeListener(this._onChange);
	        }
	    }, {
	        key: '_onChange',
	        value: function _onChange() {
	            this.setState(_TimeSerieStore2.default.getSerie());
	            this.renderChart();
	        }
	    }, {
	        key: 'renderChart',
	        value: function renderChart() {
	            console.log("RENDER CHART   : ", this.state.serie);
	            var chartDiv = this.refs.chartDiv;
	            var chartData = [this.state.serie[0]];
	            var chartOptions = this.props.options;
	            $.plot(chartDiv, chartData, chartOptions);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            // called to see if the component is receiving props
	            console.log("Component is receiving props");
	            console.log("nextProps: ", nextProps);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement('div', { className: 'flotChart', ref: 'chartDiv', style: _main.divStyle });
	        }
	    }]);
	
	    return FlotChart;
	}(_react.Component);
	
	//Add properties validation: only DEVELOPMENT MODE !
	
	
	FlotChart.propTypes = {
	    options: _react2.default.PropTypes.object
	};
	
	exports.default = FlotChart;
	
	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(/*! ./~/react-hot-loader/makeExportsHot.js */ 260); if (makeExportsHot(module, __webpack_require__(/*! react */ 146))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "FlotChart.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../../../~/webpack/buildin/module.js */ 4)(module)))

/***/ }

})
//# sourceMappingURL=0.2111d6c8a99ee6837630.hot-update.js.map