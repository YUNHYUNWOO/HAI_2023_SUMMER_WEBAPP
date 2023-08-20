/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import "./style.css";

interface Props {
  className: any;
  text: string;
}

export const NumberCircle = ({ className, text = "2" }: Props): JSX.Element => {
  return (
    <div className={`number-circle ${className}`}>
      <div className="ellipse" />
      <div className="number">{text}</div>
    </div>
  );
};

NumberCircle.propTypes = {
  text: PropTypes.string,
};
