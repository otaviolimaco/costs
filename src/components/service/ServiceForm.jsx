import { useState } from 'react'

import styles from '../project/ProjectForm.module.css'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import Message from '../layout/Message'

function ServiceForm({ handleSubmit, btnText, projectData }) {

    const [service, setService] = useState({});
    const [message, setMessage] = useState();

    const validateForm = () => {
        if (!service.name || !service.cost || !service.description) {
            setMessage('Preencha todos os campos!');
            return false;
        }
        return true;
    };

    const submit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return false;
        }

        projectData.services.push(service);
        handleSubmit(projectData);
    };

    const handleChange = (e) => {
        setService({ ...service, [e.target.name]: e.target.value });
    };

    return  (
        <form onSubmit={submit} className={styles.form}>
            {message && <Message type="error" msg={message} setMsg={setMessage} />}
            <Input 
                type="text"
                text="Nome do serviço"
                name="name"
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChange}
                value={service.name || ''}
            />
            <Input 
                type="number"
                text="Custo do serviço"
                name="cost"
                placeholder="Insira o valor total"
                handleOnChange={handleChange}
                value={service.cost || ''}
            />
            <Input 
                type="text"
                text="Descrição do serviço"
                name="description"
                placeholder="Descreva o serviço"
                handleOnChange={handleChange}
                value={service.description || ''}
            />
            <SubmitButton text={btnText}/>
        </form>
    );
}

export default ServiceForm;