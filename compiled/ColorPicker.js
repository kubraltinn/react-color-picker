"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _color_palettes = require("./color_palettes");

var _color_palettes2 = _interopRequireDefault(_color_palettes);

require("./Color.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorPicker = function (_Component) {
	_inherits(ColorPicker, _Component);

	function ColorPicker(props) {
		_classCallCheck(this, ColorPicker);

		var _this = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this, props));

		_this.onColorSelect = _this.onColorSelect.bind(_this);
		var colorPalette = _color_palettes2.default[props.selectedPalette] ? _color_palettes2.default[props.selectedPalette] : _color_palettes2.default.default;
		if (props.customColorPalette) {

			colorPalette = props.customColorPalette;
		}

		_this.state = {
			currentColorPalette: colorPalette,
			selectedcolor: "#fff"
		};

		return _this;
	}

	_createClass(ColorPicker, [{
		key: "render",
		value: function render() {

			var pallettes = this.renderPalette();

			var colorBox = this.renderColorSelectionBox();

			return _react2.default.createElement(
				"div",
				{ className: "customColorPicker wine" },
				_react2.default.createElement(
					"div",
					null,
					_react2.default.createElement(
						"span",
						null,
						_react2.default.createElement(
							"b",
							null,
							"Main Colors"
						)
					)
				),
				pallettes,
				_react2.default.createElement(
					"div",
					null,
					_react2.default.createElement(
						"span",
						null,
						_react2.default.createElement(
							"b",
							null,
							"Second Colors"
						)
					)
				),
				colorBox
			);
		}
	}, {
		key: "slideRight",
		value: function slideRight(e) {}
	}, {
		key: "renderPalette",
		value: function renderPalette() {
			var _this2 = this;

			var rendered = this.state.currentColorPalette.map(function (item, index) {

				return _this2.renderPaletteItem(item, index);
			});
			return _react2.default.createElement(
				"div",
				{ id: "slider" },
				_react2.default.createElement(
					"div",
					{ className: "colorPicker-palettes" },
					rendered
				)
			);
		}
	}, {
		key: "renderPaletteItem",
		value: function renderPaletteItem(colorCode, index) {
			var _this3 = this;

			return _react2.default.createElement("div", {
				className: "colorpicker-color",

				key: "color_" + index,

				"data-colorCode": colorCode,

				style: { backgroundColor: colorCode, height: 30 },

				onClick: function onClick() {
					_this3.onColorSelect(colorCode);
				} });
		}
	}, {
		key: "renderColorSelectionBox",
		value: function renderColorSelectionBox() {
			var _this4 = this;

			var tone1 = Color(this.state.selectedcolor, 80);
			var tone2 = Color(this.state.selectedcolor, 60);
			var tone3 = Color(this.state.selectedcolor, 40);
			var tone4 = Color(this.state.selectedcolor, 20);
			var tone5 = Color(this.state.selectedcolor, 0);
			var tone6 = Color(this.state.selectedcolor, -20);
			var tone7 = Color(this.state.selectedcolor, -40);
			var tone8 = Color(this.state.selectedcolor, -60);
			var tone9 = Color(this.state.selectedcolor, -80);

			var result = [tone1, tone2, tone3, tone4, tone5, tone6, tone7, tone8, tone9];

			var resultcolor = result.map(function (item, index) {

				return _this4.rendercolor(item, index);
			});
			return _react2.default.createElement(
				"div",
				{ className: "colortones" },
				resultcolor
			);
		}
	}, {
		key: "rendercolor",
		value: function rendercolor(colorCode, index) {
			var _this5 = this;

			return _react2.default.createElement("div", {
				className: "tone",

				key: "color_" + index,

				"data-colorCode": colorCode,

				style: { backgroundColor: colorCode, transition: "background-color 1s" },

				onClick: function onClick() {
					_this5.props.onColorSelect(colorCode);
				} });
		}
	}, {
		key: "onColorSelect",
		value: function onColorSelect(colorCode) {
			this.setState({ selectedcolor: colorCode });
		}
	}]);

	return ColorPicker;
}(_react.Component);

exports.default = ColorPicker;


function Color(color, percent) {
	var num = parseInt(color.slice(1), 16),
	    amt = Math.round(2.55 * percent),
	    R = (num >> 16) + amt,
	    G = (num >> 8 & 0x00FF) + amt,
	    B = (num & 0x0000FF) + amt;
	return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

ColorPicker.defaultProps = {};

ColorPicker.propTypes = {

	selectedPalette: _react.PropTypes.string,

	onColorSelect: _react.PropTypes.func,

	onColorRemove: _react.PropTypes.func,

	customColorPalette: _react.PropTypes.arrayOf(_react.PropTypes.string)

};