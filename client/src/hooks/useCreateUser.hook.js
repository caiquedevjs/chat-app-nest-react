import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const useCreateUser = () => {

    // 💡 States usados
    
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [bio, setBio] = useState(''); // 💡 Campo bio permanece como opcional
    const [nickname, setNickname] = useState(''); // 💡Novo estado para nickname
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        setLoading(true);

        // 💡 Montando o objeto de dados a ser enviado
        const Data = {
            name,
            mail,
            bio: bio || null, // 💡 Se bio não for preenchido, envia null
            nickname, // 💡 Incluindo nickname
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
            setError('Erro ao criar usuário');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        name, setName,
        mail, setMail,
        bio, setBio,
        nickname, setNickname, //💡 Retornando o estado do nickname
        password, setPassword,
        age, setAge,
        loading,
        error,
        handleSubmit,
    };
};

export default useCreateUser;
