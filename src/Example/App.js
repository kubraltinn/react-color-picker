import React from "react";
import ReactDOM from "react-dom";
import ColorPicker from "./../Component/color-picker";

const Color = React.createClass({
	backColor(color)
	{
		document.body.style.backgroundColor = color;
	},
	render() {
		return (
			<ColorPicker onChange={this.handleChange} onColorSelect={this.backColor}/>
		);
	},
});

ReactDOM.render(<Color />, document.querySelector("#app"));
