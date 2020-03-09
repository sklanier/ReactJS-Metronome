import React from "react";
import { ReactComponent as SliderIcon } from '../img/slider.svg';

const Slider = () => {
  return (
    <SliderIcon>
      <label htmlFor="customRange1">Example range</label>
      <input type="range" className="custom-range" id="customRange1" />
    </SliderIcon>
  );
}

export default Slider;