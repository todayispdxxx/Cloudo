import React from 'react';
import { PetState } from '../types';

interface NuonuoProps {
  state: PetState;
  onClick: () => void;
}

export const Nuonuo: React.FC<NuonuoProps> = ({ state, onClick }) => {
  return (
    <div 
      className={`relative w-40 h-28 mx-auto cursor-pointer transition-transform duration-300 ${state.isEating ? 'animate-eat' : 'animate-float'}`}
      onClick={onClick}
    >
      {/* Cloud Body - Using multiple circles to form a cloud shape */}
      <div className="absolute bottom-0 left-4 w-16 h-16 bg-white rounded-full shadow-sm z-10"></div>
      <div className="absolute bottom-0 right-4 w-16 h-16 bg-white rounded-full shadow-sm z-10"></div>
      <div className="absolute bottom-4 left-8 w-24 h-20 bg-white rounded-full shadow-sm z-20"></div>
      
      {/* Face */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center pt-4">
        <div className="flex space-x-6 mb-2">
          {/* Eyes */}
          <div className={`w-3 h-3 bg-gray-700 rounded-full transition-all duration-200 ${state.isEating ? 'h-1 scale-x-110' : ''}`}></div>
          <div className={`w-3 h-3 bg-gray-700 rounded-full transition-all duration-200 ${state.isEating ? 'h-1 scale-x-110' : ''}`}></div>
        </div>
        
        {/* Mouth */}
        <div 
          className={`bg-gray-700 rounded-full transition-all duration-200 ${
            state.isEating 
              ? 'w-4 h-4 rounded-full' // Open mouth "Ah-wu"
              : 'w-4 h-2 rounded-b-full' // Smile
          }`}
        ></div>
      </div>

      {/* Accessories based on level (Simple implementation) */}
      {state.level >= 2 && (
        <div className="absolute -top-2 left-10 z-30 transform -rotate-12 text-2xl animate-bounce">
           🌱
        </div>
      )}
       {state.level >= 5 && (
        <div className="absolute top-6 right-2 z-30 text-2xl">
           👓
        </div>
      )}
    </div>
  );
};