import { useEffect, useState } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'
import Message from '../layout/Message'

function ProjectForm({ btnText, handleSubmit, projectData }) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})
    const [message, setMessage] = useState()

    useEffect(() => {
        fetch("http://localhost:5000/categories",{
            method: "GET",
            headers: {
                'Content-Type': 'application.json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()

        if (!project.name || !project.budget || !project.category) {
            setMessage('Preencha todos os campos!');
            return false;
        }

        handleSubmit(project)
    }

    const handleChange = (e) => {
        setProject({...project, [e.target.name]: e.target.value})
    }

    const handleCategory = (e) => {
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }})
    }

    return (
            <form onSubmit={submit} className={styles.form}>
                {message && <Message type="error" msg={message} setMsg={setMessage}/>}
                <Input 
                    type="text"
                    text="Nome do Projeto"
                    name="name"
                    placeholder="Insira o nome do projeto"
                    handleOnChange={handleChange}
                    value={project.name ? project.name : ''}
                />
                <Input 
                    type="number"
                    text="Orçamento do Projeto"
                    name="budget"
                    placeholder="Insira o orçamento total"
                    handleOnChange={handleChange}
                    value={project.budget ? project.budget : ''}
                />
                <Select 
                name="category_id" 
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
                />
                <SubmitButton text={btnText}/>
            </form>
    )
}

export default ProjectForm