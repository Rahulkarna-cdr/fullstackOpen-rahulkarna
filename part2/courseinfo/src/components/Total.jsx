
const Total = ({parts}) => {
    const total = parts.reduce((total,currVal)=>{
        return total+currVal.exercises;
    },0)
    return(
        <>
        <p style={{fontWeight:"bold"}}>Total of exercises {total}</p>
        </>
    )

}

export default Total