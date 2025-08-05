import Sidebar from '../components/Sidebar.jsx'
import ChatContainer from '../components/ChatContainer.jsx'
import RightSidebar from '../components/RightSidebar.jsx'
import React, { useState } from 'react'
import { ChatContext } from '../context/ChatContext.jsx'

// This is the HomePage component for the chat application
const HomePage = () => {

    const { selectedUser } = useContext(ChatContext);

  return (
    <div className = 'border wfull h-screen sm:px-[15%] sm:py-[5%]'>
      <div className={`backdrop-blur-xl border-2 border-grey-600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}`}>
        <Sidebar  />
        <ChatContainer  />
        <RightSidebar  />
      </div>
    </div>
  )
}

export default HomePage
