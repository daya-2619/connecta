import React, { useRef, useEffect } from 'react'
import assets, { messagesDummyData } from '../assets/assets.js'
import { formatMessageTime } from '../lib/utils.js'
import { ChatContext } from '../context/ChatContext.jsx'
import { AuthContext } from '../context/AuthContext.jsx'

const ChatContainer = ({}) => {
    const { messages,selectedUser,setSelectedUser,sendMessage , getMessages} = useContext(ChatContext);
    const { authUser,onlineUsers} = useContext(AuthContext);



    const scrollEnd = useRef()
    const [input,setInput] = useState(' ');
    const handelSendMessage = async (e)=>{
        e.preventDefault();
        if(input.trim() ===' ') return null;
        await sendMessage({text:input.trim()});
        setInput('');

    }

    const handleSendImage = async (e)=>{
        const file = e.target.files[0];
        if(!file || !file.type.stsrtWith('/image')){
            toast.error("select a valid image file");
            return;
        }
        const reader = new FileReader();
        reader.onLoadend =async ()=>{
            await sendMessage({image: reader.result});

            e.target.value =" ";
        }
        reader.readAsDataURL(file);
    }
    useEffect(()=>{
        if(selectedUser){
            getMessages(selectedUser._id);
        }

    },[selectedUser]);
    useEffect(() => {
        if (scrollEnd.current && messages) {
            scrollEnd.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return selectedUser ? (
        <div className='h-full relative overflow-y-scroll backdrop-blur-lg'>
            {/* Chat header */}
            <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
                <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className="w-8 rounded-full" />
                <p className='flex-1 text-lg text-white flex items-center gap-2'>
                    {selectedUser.fullName}
                    {onlineUsers.includes(selectedUser._id) && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
                </p>
                <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden max-w-7' />
                <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5' />
            </div>
            {/* Chat messages */}
            <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-24'>
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== authUser._id && 'flex-row-reverse'}`}>
                        {msg.image ? (
                            <img src={msg.image} alt="" className='max-w-[2300px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
                        ) : (
                            <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId === authUser._id ? 'rounded-br-none' : 'rounded-bl-none'}`}>{msg.text}</p>
                        )}
                        <div className='text-center text-xs'>
                            <img src={msg.senderId === authUser._id ? authUser?.profilrPic ||  assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon } alt="" className='w-7 rounded-full' />
                            <p className='text-gray-500'>{formatMessageTime(msg.createdAt)}</p>
                        </div>
                    </div>
                ))}
                <div ref={scrollEnd}></div>
            </div>
            {/* Chat input area */}
            <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3 bg-transparent'>
                <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
                    <input onChange={()=>setInput(e.target.value)} value = {input} onKeyDown ={(e)=> e.key === "Enter" ? handelSendMessage(e): null } type='text' placeholder='Type a message...' className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400 bg-transparent' />
                    <input onChange={handleSendImage} type='file' id='image' accept='image/png,image/jpeg,image/jpg' hidden />
                    <label htmlFor="image">
                        <img src={assets.gallery_icon} alt="" className='w-5 mr-2 cursor-pointer' />
                    </label>
                </div>
                <button type="button" className="flex items-center justify-center bg-violet-600 hover:bg-violet-700 rounded-full p-2 transition">
                    <img onClick = {handelSendMessage} src={assets.send_button} alt="" className='w-7 cursor-pointer' />
                </button>
            </div>
        </div>
    ) : (
        <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
            {/* Displaying a message when no user is selected */}
            <img src={assets.logo_icon} className='max-w-16' alt="" />
            <p className='text-lg font-medium text-white'>Select any User to Start a Chat</p>
        </div>
    )
}

export default ChatContainer
