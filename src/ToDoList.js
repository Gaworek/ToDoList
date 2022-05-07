import ToDo from './ToDo'

export default function ToDoList( {listOfToDos, toggle} ){
    let i = 1
    return (
        listOfToDos.map( toDo => {
            return <ToDo key={toDo.id} toDo = {toDo} num = {i++} toggle = {toggle}/>
        })
    )
}