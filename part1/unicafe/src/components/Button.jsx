
const Button = ({value, handlerFunc}) => {
    return(
    <>
    <button onClick={handlerFunc}>{value}</button>
    </>
    )
}

export default Button;
