"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = require("./App");

var _App2 = _interopRequireDefault(_App);

var _ColorPicker = require("./../Component/ColorPicker");

var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Color = _react2.default.createClass({
	displayName: "Color",
	backColor: function backColor(color) {
		document.body.style.backgroundColor = color;
	},
	render: function render() {
		return _react2.default.createElement(_ColorPicker2.default, { onChange: this.handleChange, onColorSelect: this.backColor });
	}
});

_reactDom2.default.render(_react2.default.createElement(Color, null), document.querySelector("#app"));