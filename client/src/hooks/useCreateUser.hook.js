// src/hooks/useCreateUser.js
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
const useCreateUser = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        setLoading(true);

        const Data = {
            name,
            mail,
            bio,
            password,
            age: age.toString()
        };

        try {
            const response = await fetch('http://localhost:3334/user/create_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Data)
            });

            if (response.ok) {
                console.log("User created.");
                navigate('/chat');
                
            } else {
                const data = await response.json();
                setError(data.message || 'Erro ao criar usuário');
            }
        } catch (error) {
            setError('Erro ao enviar dados para o backend');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        name, setName,
        mail, setMail,
        bio, setBio,
        password, setPassword,
        age, setAge,
        loading,
        error,
        handleSubmit,
    };
};

export default useCreateUser;
