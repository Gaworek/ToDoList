import FormCheck from 'react-bootstrap/FormCheck'
import Stack from 'react-bootstrap/Stack'
export default function ToDo({toDo, num, toggle}){
    function handleChange(){
        toggle(toDo.id)
    }
    return (
        <div>
            <Stack direction='horizontal'>
                {num}. &nbsp;
                <div className='toDo'>
                    {toDo.name}
                </div>
                <FormCheck inline className='ms-auto' label='Zakonczono' onChange={handleChange}/>
            </Stack>
            
        </div>
    )
}