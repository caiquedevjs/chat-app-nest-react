import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { io } from 'socket.io-client';
import "leaflet/dist/leaflet.css";
import "../styles/realMap.styles.css"
import L from "leaflet"; // 💡Importando Leaflet para poder usar a classe L.icon
import { jwtDecode } from 'jwt-decode';
import useGetUser from '../hooks/useGetUser.hook.js';


const socket = io('http://localhost:3333');

const RealTimeMap = () => {
  const [position, setPosition] = useState({ lat: -23.55052, lng: -46.633308 }); // 💡Fallback para São Paulo
  const { loading, getUserId, userData } = useGetUser();
  const [nickNameLocalization, setNickNameLocalization] = useState('');
  const [image, setImage] = useState('');
   const [users, setUsers] = useState([]); //💡 Armazena usuários conectados e suas posições


  

  

  useEffect(() => {
    if ("geolocation" in navigator) {

      //💡 função para atualizar as coordenadas da posição do usuario no mapa
      const updatePosition = () => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const newPosition = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            setPosition(newPosition);
            socket.emit('updatePosition', newPosition);
          },
          (error) => {
            console.error("Erro ao obter localização:", error);
          }
        );
      };
  
      updatePosition();
      const interval = setInterval(updatePosition, 5000); // 💡 Atualiza a cada 5 segundos a posição do usuario no mapa
  
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado ao WebSocket');
    });
  
    socket.on('connect_error', (error) => {
      console.error('Erro de conexão:', error);
    });
  
    // 💡 Atualiza usuários quando recebem mensagens
    socket.on('msgToClient', ({ senderImage, senderNickname }) => {
      setUsers((prevUsers) => {
        const userExists = prevUsers.some(user => user.nickname === senderNickname);
        if (!userExists) {
          return [...prevUsers, { 
            nickname: senderNickname,
            image: senderImage || 'default-avatar.png'
          }];
        }
        return prevUsers;
      });
    });
  
    // 💡 Atualiza posição dos usuários para o socket
    socket.on('updatePosition', ({ nickname, image, position }) => {
      if (!position || typeof position.lat !== 'number' || typeof position.lng !== 'number') {
        console.error(`Erro: Posição inválida recebida para ${nickname}`, position);
        return;
      }
    
      setUsers((prevUsers) => {
        const userExists = prevUsers.some(user => user.nickname === nickname);
        
        if (userExists) {
          return prevUsers.map(user => 
            user.nickname === nickname ? { ...user, position, image } : user
          );
        } else {
          return [...prevUsers, { nickname, image, position }];
        }
      });
    });
  
    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('msgToClient');
      socket.off('updatePosition');
    };
  }, []);
   

  //💡 Função para decodificar o token e obter o ID do usuário
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token de autenticação não encontrado');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub; // ID do usuário no token
      if (userId) {
        getUserId(userId);
      }
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
    }
  }, [getUserId]);


  // Criação do ícone personalizado com a imagem do usuário
  useEffect(() => {
    if (userData) {
      setImage(userData.profileImage || 'default-avatar.png');
      setNickNameLocalization(userData.nickname || 'Usuário');
  
      socket.emit('setNickname', {
        nickname: userData.nickname,
        image: userData.profileImage || 'default-avatar.png',
        colorNickname: userData.colorNickname
      });
    }
  }, [userData]);
  
  //💡 Criar o ícone dinamicamente para garantir atualização correta
  const myIcon = L.icon({
    iconUrl: image || 'default-avatar.png',
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50]
  });
  

  return (
    <MapContainer center={position} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png" />
      {users.map((user, index) => (
     user.position && typeof user.position.lat === 'number' && typeof user.position.lng === 'number' && (
    <Marker 
      key={index} 
      position={[user.position.lat, user.position.lng]} 
      icon={L.icon({
        iconUrl: user.image || 'default-avatar.png',
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50],
        className: 'custom-icon'
      })}
    >
      <Popup>📍 {user.nickname}</Popup>
    </Marker>
  )
))}

    </MapContainer>
  );
};

export default RealTimeMap;
