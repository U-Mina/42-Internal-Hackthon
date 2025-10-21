import React from 'react';

interface ProfileHeaderProps {
    user: {
        displayname: string;
        login: string;
        image_url: string;
    };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
    return (
        <header className="profile-header">
            <div className="profile-picture">
                {/* <img src={user.image_url} alt="Profile" /> */}
            </div>
            <div className="profile-info">
                <h1>{user.displayname}</h1>
                <p>@{user.login}</p>
            </div>
        </header>
    );
};

export default ProfileHeader;
