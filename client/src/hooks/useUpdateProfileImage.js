// 📌 Hook para atualização de foto de perfil do usuario

import { useState } from "react";

const useUpdateProfileImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProfileImage = async (userId, file) => {
    try {
      setLoading(true);

      const formData = new FormData(); // 💡 formato de do dado a ser enviado ao back end.
      formData.append("profileImage", file); // 💡 campo da imagem no model user.

      const response = await fetch(`http://localhost:3334/user/${userId}/profile-image`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`, // 💡 usa o token gerado com o jwt.
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar a imagem");
      }

      console.log("Imagem atualizada com sucesso!");
    } catch (error) {
      setError(error.message);
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateProfileImage, error };
};

export default useUpdateProfileImage;
