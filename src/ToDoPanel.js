import './ToDoPanel.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useRef, useEffect, useLayoutEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import ToDoList from './ToDoList'
import {v4} from 'uuid'
function ToDoPanel() {
  const [listOfToDos, setlistOfToDos] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const toDoRef = useRef()
  const [nothingToDeleteError, setNothingToDeleteError] = useState(false)

  const isFirstRender = useRef(true) // Required when using React.StrictMode
  const LOCAL_STORAGE_TODOS = 'local_storage_todos_cookie'

  useLayoutEffect(() => {
    const savedListToDos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS))    
    if(savedListToDos)
      setlistOfToDos(savedListToDos)
  }, [])

  useEffect(() => {
    if(isFirstRender.current){
      isFirstRender.current = false
      return
    }
    localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify(listOfToDos))
  }, [listOfToDos])

  function handleSubmit(e){
    e.preventDefault()
    let newToDo = toDoRef.current.value
    if(newToDo === "")
      return
    setlistOfToDos(prev => {
      return [...prev, {id:v4(), name:newToDo, complete:false}]
    })
  }

  function resetInput(e){
    e.preventDefault()
    toDoRef.current.value = ""

  }

  function deleteCompleted(e){
    e.preventDefault()
    setlistOfToDos(listOfToDos.filter(toDo => {
      return !toDo.complete
    }))
    hideModal()
  }

  useEffect(() => {
    if(nothingToDeleteError === false)
      return
    const timer = setTimeout(() => {
      setNothingToDeleteError(false)
    }, 5000);
  
    return () => clearTimeout(timer)
    
  }, [nothingToDeleteError])

  let setNothingToDeleteErrorFalse = () => setNothingToDeleteError(false)

  let hideModal = () => setShowConfirmation(false)
  let showModal = () => {
    if(listOfToDos.every(toDo => toDo.complete === false)){
      setNothingToDeleteError(true)
      return
    }
    setNothingToDeleteError(false)
    setShowConfirmation(true)
  }

  function toggleToDo(id){
    const newListOfToDos = [...listOfToDos]
    const toDo = newListOfToDos.find(toDo => toDo.id === id)
    toDo.complete = !toDo.complete
    setlistOfToDos(newListOfToDos)
  }



  
  return (
  <div className = 'ToDoPanel'>
    <Form onSubmit={handleSubmit}>
      <Stack gap={2} >
        <Form.Label className='text-center'>Nowe zadanie</Form.Label>
        <Form.Control ref={toDoRef} type='text' placeholder='Co dzis robimy'/>
      <Stack direction='horizontal' gap={3}>
        <div></div>
        <Button variant='secondary' type='submit'>
          Dodaj
        </Button>
        <Button variant='outline-danger' className='ms-auto' onClick={resetInput}>
          Resetuj wpis
        </Button>
        <div></div>
        </Stack>
      </Stack>
    </Form>


    <ToDoList listOfToDos={listOfToDos} toggle = {toggleToDo}/>

    <br/>
    <Button variant='primary' onClick={showModal}>
      Usun wykonane zadania
    </Button>

    <br/>
    <Alert show={nothingToDeleteError} variant='danger' onClose={setNothingToDeleteErrorFalse} dismissible>
      Nie ma zadnych zakonczonych zadan do usuniecia
    </Alert>
    <Modal show={showConfirmation} onHide={hideModal}>
      <Modal.Header closeButton>
        Potwierdzenie
      </Modal.Header>
      <Modal.Body>
        Czy na pewno chcesz usunac zakonczone zadania?
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={hideModal}>
          Anuluj
        </Button>
        <Button variant='primary' onClick={deleteCompleted}>
          Usun zakonczone zadania
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
  );
}

export default ToDoPanel;