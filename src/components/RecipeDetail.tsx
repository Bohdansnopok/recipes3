import React from 'react';

interface Props {
  children: React.ReactNode;
}

const RecipeDetails: React.FC<Props> = ({ children }) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fadeIn duration-300 ease-in-out">
            <div className="bg-white rounded-[8px] max-w-[500px] w-[90%] p-5 relative boxShadowModal animate-scaleIn duration-300 ease-in-out">
                <button aria-label='Close modal' className='absolute top-3 right-4 bg-transparent border-none text-[1.75rem] cursor-pointer text-[#666666]'>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}