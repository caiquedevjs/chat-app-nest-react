import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/realMap.styles.css"
import L from "leaflet"; // Importando Leaflet para poder usar a classe L.icon
import { jwtDecode } from 'jwt-decode';
import useGetUser from '../hooks/useGetUser.hook.js';

const RealTimeMap = () => {
  const [position, setPosition] = useState({ lat: -23.55052, lng: -46.633308 }); // Fallback para São Paulo
  const { loading, getUserId, userData } = useGetUser();
  const [nickNameLocalization, setNickNameLocalization] = useState('');
  const [image, setImage] = useState('');

  // Criação do ícone personalizado com a imagem do usuário
  useEffect(() => {
    if (userData) {
      setImage(userData.profileImage || 'default-avatar.png');
      setNickNameLocalization(userData.nickname || 'Usuário');
    }
  }, [userData]);

  const myIcon = L.icon({
    iconUrl: image || 'default-avatar.png',
    iconSize: [50, 50], // Ajuste do tamanho do ícone
    iconAnchor: [50, 50], // Ajuste para ancorar corretamente o ícone
    popupAnchor: [-3, -76],
    shadowUrl: 'my-icon-shadow.png', // Sombra do ícone, se necessário
    shadowSize: [50, 50], 
    shadowAnchor: [50, 50],
     className: 'custom-icon'
  });

  // Função para obter a localização do usuário
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
        }
      );
    } else {
      console.error("Geolocalização não suportada pelo navegador.");
    }
  }, []);

  // Função para decodificar o token e obter o ID do usuário
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

  return (
    <MapContainer center={position} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={myIcon}> {/* Correção: "Icon" para "icon" */}
        <Popup>📍 {nickNameLocalization}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default RealTimeMap;
