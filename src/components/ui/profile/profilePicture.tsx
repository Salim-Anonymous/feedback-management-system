"use client"
import { CameraIcon } from 'lucide-react';
import React, { useState, type ChangeEvent, useRef } from 'react';

const ProfilePicture = () => {
  const defaultImage = 'https://media.istockphoto.com/id/878477204/photo/australian-parliament-house-canberra-at-night.jpg?b=1&s=170667a&w=0&k=20&c=q_MMSj4d6pqUmCMd4FZdeBtmcZZVAza92FRs1kcjIoE=';
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="w-48 h-48 relative mx-auto mb-4">
        <div className="rounded-full overflow-hidden w-full h-full">
          <img src={selectedImage || defaultImage} alt="Profile" className="w-full h-full object-cover" />
          <div
            className="absolute bottom-3 right-3 p-1 bg-white rounded-full text-gray-500  shadow cursor-pointer"
            onClick={handleCameraClick}
          >
            <CameraIcon className="w-4 h-4 p-0 rounded-full" />
          </div>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default ProfilePicture;