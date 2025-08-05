import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets.js'
import { AuthContext } from '../context/AuthContext.jsx';

const ProfilePages = () => {
    const { authUser ,updateProfile } = useContext(AuthContext)
    const [selectedImage, setSelectedImage] = useState(null)
    const navigate = useNavigate()
    const [name, setName] = useState(authUser.fillName)
    const [bio, setBio] = useState(authUser.bio)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!selectedImg){
            await updateProfile({fullName: name,bio})
            navigate('/');
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(selectedImg);
        reader.onload = async ()=>{
            const base64Image = reader.result;
            await updateProfile({profilePic: base64Image, fullName: name, bio});
            navigate('/');
        }
        
    }

    return (
        <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
            <div className='w-5/6 max-w-2xl backdrop-blur-2x1 text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
                    <h3 className='text-lg'>Profile details</h3>
                    <label htmlFor="avatar" className='flex items-center gap-2 cursor-pointer'>
                        <input
                            onChange={(e) => setSelectedImage(e.target.files[0])}
                            type='file'
                            id='avatar'
                            className='hidden'
                            accept='.png,.jpeg,.jpg'
                        />
                        <img
                            src={selectedImage ? URL.createObjectURL(selectedImage) : assets.avatar_icon}
                            alt=""
                            className={`w-12 h-12 ${selectedImage ? 'rounded-full' : ''}`}
                        />
                        upload profile picture
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Full Name'
                        className='p-2 border border-gray-500 rounded-md bg-transparent focus:outline-none focus:border-blue-500'
                    />
                    <textarea
                        type="text"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder='Bio...'
                        rows={4}
                        className='p-2 border border-gray-500 rounded-md bg-transparent focus:outline-none focus:border-blue-500'
                    ></textarea>
                    <button
                        type='submit'
                        className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'
                    >
                        Save
                    </button>
                </form>
                <img
                    src={authUser?.profilePicf || assets.logo_icon}
                    alt=""
                    className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImage && 'rounded-full'}`}
                />
            </div>
        </div>
    )
}

export default ProfilePages
