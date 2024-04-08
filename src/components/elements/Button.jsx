const Button = (props) => {
  return (
    <button
      style={{
        padding: "10px",
        backgroundColor: "#16a3b7",
        border: "none",
        borderRadius: "5px",
        color: "white",
        ...props.style,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
