import React from "react";
import Chat from "../components/Chat.js";
import NavBarUser from '../components/navbar.user.component.js';
import SwipeableEdgeDrawerUser from '../components/drawer.user.component.js'
import RealTimeMap from "../components/map.component";

const ChatInterface = ()=>{
    return(
        <div className="chat-interface-conteiner">
        <Chat/>
       
        <NavBarUser/>
        <SwipeableEdgeDrawerUser/>
        <RealTimeMap/>
        </div>

    )
}

export default ChatInterface;