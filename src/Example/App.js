import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ColorPicker from "./../Component/ColorPicker";


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
