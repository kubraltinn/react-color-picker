import React, { PropTypes, Component } from "react";
import ColorPalettes from "./color_palettes";
import "./Color.css";

export default class ColorPicker extends Component {

	constructor(props) {

		super(props);
		this.onColorSelect = this.onColorSelect.bind(this);
		let colorPalette = ColorPalettes[props.selectedPalette] ? ColorPalettes[props.selectedPalette] : ColorPalettes.default;
		if (props.customColorPalette) {

			colorPalette = props.customColorPalette;

		}

		this.state = {
			currentColorPalette: colorPalette,
			selectedcolor:"#fff",
		};

	}

	render() {

		const pallettes = this.renderPalette();

		const colorBox = this.renderColorSelectionBox();

		return (<div className="customColorPicker">

			{pallettes}

			{colorBox}

		</div>

		);

	}

	renderPalette() {

		const rendered = this.state.currentColorPalette.map((item, index) => {

			return this.renderPaletteItem(item, index);

		});
		return (<div className="colorPicker-palettes">
			{rendered}
		</div>);

	}

	renderPaletteItem(colorCode, index) {
		return (
			<div
				className='colorpicker-color'
				key={`color_${index}`}

				data-colorCode={colorCode}

				style={{ backgroundColor: colorCode, height: 30}}

				onClick={() => {this.onColorSelect(colorCode);}}>

			</div>
		);

	}

	renderColorSelectionBox() {
		const tone1 = Color(this.state.selectedcolor,80);
		const tone2 = Color(this.state.selectedcolor,60);
		const tone3 = Color(this.state.selectedcolor,40);
		const tone4 = Color(this.state.selectedcolor,20);
		const tone5 = Color(this.state.selectedcolor,0);
		const tone6 = Color(this.state.selectedcolor,-20);
		const tone7 = Color(this.state.selectedcolor,-40);
		const tone8 = Color(this.state.selectedcolor,-60);
		const tone9 = Color(this.state.selectedcolor,-80);


		const result = [tone1,tone2,tone3,tone4,tone5,tone6,tone7,tone8,tone9];

		const  resultcolor= result.map((item, index) => {

			return this.rendercolor(item, index);

		});
		return (<div className="colortones">
			{resultcolor}
		</div>);
	}

	rendercolor(colorCode, index) {
		const b=colorCode;
		return (<div
			className="tone"

			key={`color_${index}`}

			data-colorCode={colorCode}

			style={{ backgroundColor: colorCode, width: 400, height:20, transition: "background-color 2s"}}

			onClick={() => {this.props.onColorSelect(colorCode);}}>
			{b}
		</div>


		);
	}

	onColorSelect(colorCode){
		this.setState({selectedcolor:colorCode});
	}
}

function Color(color, percent) {
	var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
	return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

ColorPicker.defaultProps = {

};

ColorPicker.propTypes = {

	selectedPalette: PropTypes.string,

	onColorSelect: PropTypes.func,

	onColorRemove: PropTypes.func,

	customColorPalette: PropTypes.arrayOf(PropTypes.string)

};
