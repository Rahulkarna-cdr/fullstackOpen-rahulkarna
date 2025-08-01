import StatisticLine from './StatisticLine'

const Statistics = ({good, bad, neutral})=>{
    const total = good+bad+neutral

    if(total===0){
        return(
        <>
        <h1>statistics</h1>
        <p>No Feedback given</p>
        </>
        )
    }
    const average = ((good-bad)/total).toFixed(2)
    const positive = `${((good/total)*100).toFixed(2)}%`

    return(
        <>
            <h1>statistics</h1>
            <table style={{border: '1px solid blue',borderCollapse:'collapse'}}>
            <tbody>
                <StatisticLine text = 'good' value={good} />
                <StatisticLine text = 'neutral' value={neutral} />
                <StatisticLine text = 'bad' value={bad} />
                <StatisticLine text = 'average' value={average} />
                <StatisticLine text = 'positive' value={positive} />
            </tbody>
        </table>
        </>
    )

}


export default Statistics