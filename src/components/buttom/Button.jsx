import "./Button.css";

const Button = (props) => {
    let classes = props.type;
    classes = classes === undefined ? (classes = "number") : props.type;

    return (
        <div className={`Button ${classes}`}>
            <button onClick={(e) => props.click && props.click(props.label)}>
                {props.label}
            </button>
        </div>
    );
};
export default Button;
