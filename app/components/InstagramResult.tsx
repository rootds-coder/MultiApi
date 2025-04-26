'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaCheckCircle, FaLock, FaBriefcase, FaInstagram, FaUserFriends, FaUserPlus, FaImages, FaUser } from 'react-icons/fa';

interface InstagramResultProps {
  data: {
    status: boolean;
    user: {
      username: string;
      full_name: string;
      profile_pic_url: string;
      followers: number;
      following: number;
      posts: number;
      verified: boolean;
      private: boolean;
      business_account: boolean;
      bio: string;
    };
  };
}

const InstagramResult: React.FC<InstagramResultProps> = ({ data }) => {
  const [imageError, setImageError] = useState(false);
  const [enlarged, setEnlarged] = useState(false);

  if (!data || !data.status || !data.user) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        No Instagram data available
      </div>
    );
  }

  const { user } = data;

  return (
    <div className="instagram-result bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg p-6 shadow-lg backdrop-blur-sm">
      {/* Enlarged Image Lightbox */}
      {enlarged && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/80" onClick={() => setEnlarged(false)}>
          <img
            src={user.profile_pic_url}
            alt={user.username}
            className="rounded-full border-4 border-pink-500 shadow-2xl w-72 h-72 md:w-96 md:h-96 object-cover cursor-zoom-out"
            onClick={e => { e.stopPropagation(); setEnlarged(false); }}
          />
        </div>
      )}
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Profile Picture Section */}
        <div className="relative flex-shrink-0">
          {!imageError ? (
            <div className="relative w-32 h-32 cursor-zoom-in" onClick={() => setEnlarged(true)}>
              <Image
                src={user.profile_pic_url}
                alt={user.username}
                width={128}
                height={128}
                className="rounded-full border-4 border-pink-500"
                onError={() => setImageError(true)}
              />
              {user.verified && (
                <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2">
                  <FaCheckCircle className="text-white text-lg" />
                </div>
              )}
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-pink-500 bg-gray-700 flex items-center justify-center">
              <FaUser className="text-gray-400 text-5xl" />
            </div>
          )}
        </div>

        {/* User Info Section */}
        <div className="flex-grow">
          <h2 className="text-3xl font-bold text-white mb-2">{user.full_name}</h2>
          <div className="flex items-center mb-4">
            <FaInstagram className="text-pink-500 mr-2 text-xl" />
            <p className="text-pink-300 text-xl">@{user.username}</p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-indigo-800/50 p-3 rounded-lg text-center">
              <div className="flex items-center justify-center mb-1">
                <FaImages className="text-pink-300 mr-2" />
                <p className="text-white font-bold text-xl">{user.posts}</p>
              </div>
              <p className="text-pink-200 text-sm">Posts</p>
            </div>
            <div className="bg-indigo-800/50 p-3 rounded-lg text-center">
              <div className="flex items-center justify-center mb-1">
                <FaUserFriends className="text-pink-300 mr-2" />
                <p className="text-white font-bold text-xl">{user.followers}</p>
              </div>
              <p className="text-pink-200 text-sm">Followers</p>
            </div>
            <div className="bg-indigo-800/50 p-3 rounded-lg text-center">
              <div className="flex items-center justify-center mb-1">
                <FaUserPlus className="text-pink-300 mr-2" />
                <p className="text-white font-bold text-xl">{user.following}</p>
              </div>
              <p className="text-pink-200 text-sm">Following</p>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-indigo-800/30 p-4 rounded-lg mb-4">
            <h3 className="text-white font-semibold mb-2">Bio</h3>
            <p className="text-white whitespace-pre-line">{user.bio || 'No bio available'}</p>
          </div>

          {/* Account Status */}
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-sm flex items-center ${
              user.private ? 'bg-purple-500/50 text-white' : 'bg-green-500/50 text-white'
            }`}>
              {user.private ? (
                <>
                  <FaLock className="mr-2" /> Private Account
                </>
              ) : (
                <>
                  <FaUser className="mr-2" /> Public Account
                </>
              )}
            </span>
            {user.business_account && (
              <span className="bg-blue-500/50 text-white px-3 py-1 rounded-full text-sm flex items-center">
                <FaBriefcase className="mr-2" /> Business Account
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramResult; 