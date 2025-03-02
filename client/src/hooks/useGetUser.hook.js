import { useState } from "react";

const useGetUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null); // Armazena os dados do usuário

    const getUserId = async (userId) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3334/user_id/${userId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`, 
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar dados do usuário");
            }

            const data = await response.json();
            setUserData(data); // Salva os dados do usuário no estado
            
        } catch (error) {
            setError(error.message);
            console.error("Erro:", error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, getUserId, userData, error };
};

export default useGetUser;
