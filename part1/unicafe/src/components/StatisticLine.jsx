
const StatisticLine = ({text, value})=>{
    return(
    <tr>
        <td style={{border: '1px solid blue'}}>{text}</td>
        <td style={{border: '1px solid blue'}}>{value}</td>
    </tr>
    )
}

export default StatisticLine;