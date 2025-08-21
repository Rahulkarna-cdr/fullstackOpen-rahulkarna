import Part from "./part"

const Content = ({parts})=>{
    
    
    return(
        <>
        {
            parts.map( (item) => {
                return <Part key={item.id} name={item.name} exercises={item.exercises} />
            })
        }
        </>
    )

}

export default Content