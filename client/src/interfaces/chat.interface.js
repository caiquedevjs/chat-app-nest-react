import React from "react";
import Chat from "../components/Chat.js";
import NavBarUser from '../components/navbar.user.component.js';
import SwipeableEdgeDrawerUser from '../components/drawer.user.component.js'

const ChatInterface = ()=>{
    return(
        <div className="chat-interface-conteiner">
        <Chat/>
       
        <NavBarUser/>
        <SwipeableEdgeDrawerUser/>
        </div>

    )
}

export default ChatInterface;