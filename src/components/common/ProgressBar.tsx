import React from 'react';

interface ProgressBarProps {
    progress: number; // Progress value between 0 and 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div style={{ width: '100%', backgroundColor: '#e0e0df', borderRadius: '5px' }}>
            <div
                style={{
                    width: `${progress}%`,
                    backgroundColor: '#3b5998',
                    height: '20px',
                    borderRadius: '5px',
                    transition: 'width 0.3s ease-in-out'
                }}
            />
        </div>
    );
};

export default ProgressBar;