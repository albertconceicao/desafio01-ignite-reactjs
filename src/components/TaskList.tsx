import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {

    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(!newTaskTitle) {
      return;//Criando validação para não permitir criar tasks com títulos vazios.
    }

   const newTask = {
     id: Math.random(),
     title: newTaskTitle,
     isComplete: false
   }

   setTasks(oldstate => [...oldstate, newTask]);//Recupera o estado atual do Array sem alterar o array original e adiciona uma nova tarefa em um novo Array.
   setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const newTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    }: task);

    setTasks(newTasks);//chama o método para alteração.
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
  
    const filteredTasks = tasks.filter(task => task.id !== id)// Função que filtratodas as ocorrências que forem diferentes da id passada

    setTasks(filteredTasks);//Aqui estamos enviando todas as as tasks que tem uma id diferente da id selecionada, no caso, apagando a task.
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}