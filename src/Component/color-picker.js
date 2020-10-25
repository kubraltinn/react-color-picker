import React, {PropTypes, Component } from "react";
import ColorPalettes from "./color-palettes";
import "./color.css";

export default class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.onColorSelect = this.onColorSelect.bind(this);
    
    let colorPalette = ColorPalettes[props.selectedPalette]
      ? ColorPalettes[props.selectedPalette]
      : ColorPalettes.default;
    
    if (props.customColorPalette) {
      colorPalette = props.customColorPalette;
    }

    this.state = {
      currentColorPalette: colorPalette,
      selectedColor: "#fff",
    };
  }

  render() {
    const pallettes = this.renderPalette();
    const colorBox = this.renderColorSelectionBox();

    return (
      <div className="custom-color-picker">
        <div className="colors-wrapper">
          <span><b>Main Colors</b></span>
        </div>
        {pallettes}
        <div className="colors-wrapper">
          <span><b>Second Colors</b></span>
        </div>
        {colorBox}
      </div>
    );
  }

  renderPalette() {
    const rendered = this.state.currentColorPalette.map((item, index) => {
      return this.renderPaletteItem(item, index);
    });

    return (
      <div id="slider">
        <div className="color-picker-palettes">{rendered}</div>
      </div>
    );
  }

  renderPaletteItem(colorCode, index) {
    return (
      <div
        className="color-picker-color"
        key={`color_${index}`}
        data-colorCode={colorCode}
        style={{ backgroundColor: colorCode, height: 30 }}
        onClick={() => {
          this.onColorSelect(colorCode);
        }}
      >
      </div>
    );
  }

  renderColorSelectionBox() {
    const tone1 = Color(this.state.selectedColor, 80);
    const tone2 = Color(this.state.selectedColor, 60);
    const tone3 = Color(this.state.selectedColor, 40);
    const tone4 = Color(this.state.selectedColor, 20);
    const tone5 = Color(this.state.selectedColor, 0);
    const tone6 = Color(this.state.selectedColor, -20);
    const tone7 = Color(this.state.selectedColor, -40);
    const tone8 = Color(this.state.selectedColor, -60);
    const tone9 = Color(this.state.selectedColor, -80);

    const result = [
      tone1,
      tone2,
      tone3,
      tone4,
      tone5,
      tone6,
      tone7,
      tone8,
      tone9,
    ];

    const renderedColors = result.map((item, index) => {
      return this.renderColor(item, index);
    });

    return <div className="color-tones">{renderedColors}</div>;
  }

  renderColor(colorCode, index) {
    return (
      <div
        className="tone"
        key={`color_${index}`}
        data-colorCode={colorCode}
        style={{
          backgroundColor: colorCode,
          transition: "background-color 1s",
        }}
        onClick={() => {
          this.props.onColorSelect(colorCode);
        }}
      ></div>
    );
  }

  onColorSelect(colorCode) {
    this.setState({ selectedColor: colorCode });
  }

  slideRight(e) {}
}

function Color(color, percent) {
  let num = parseInt(color.slice(1), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = ((num >> 8) & 0x00ff) + amt,
    B = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

ColorPicker.defaultProps = {};

ColorPicker.propTypes = {
  selectedPalette: PropTypes.string,

  onColorSelect: PropTypes.func,

  onColorRemove: PropTypes.func,

  customColorPalette: PropTypes.arrayOf(PropTypes.string),
};
