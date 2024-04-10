import PropTypes from "prop-types";

const Input = ({
  type = "text",
  className = "w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500",
  ...otherProps
}) => {
  return <input type={type} className={className} {...otherProps} />;
};

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
