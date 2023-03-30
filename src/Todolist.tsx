import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';
import styles from './Todolist.module.css'


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeIsDone: (id: string, newIsDone: boolean) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>('')
    let [buttonName, setButtonName] = useState<FilterValuesType>('all')

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError('Title is reqired')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(' ')

        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter("all")
        setButtonName("all")
    };
    const onActiveClickHandler = () => {
        props.changeFilter("active")
        setButtonName("active")
    };
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
        setButtonName("completed")
    };

    const changeIsDoneHandler = (tID: string, newIsDone:boolean) => {
        props.changeIsDone(tID, newIsDone)
        // console.log(event.currentTarget.checked)
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                className={error ? styles.error : ''}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    // const changeIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    //     props.changeIsDone(t.id, event.currentTarget.checked)
                    //     // console.log(event.currentTarget.checked)
                    // }



                    return <li key={t.id} className={t.isDone ? styles.isDone : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={(event: ChangeEvent<HTMLInputElement>) => changeIsDoneHandler(t.id, event.currentTarget.checked)} />
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={buttonName === 'all' ? styles.activeFilter : ''} onClick={onAllClickHandler}>All</button>
            <button className={buttonName === 'active' ? styles.activeFilter : ''} onClick={onActiveClickHandler}>Active</button>
            <button className={buttonName === 'completed' ? styles.activeFilter : ''} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div >
}
