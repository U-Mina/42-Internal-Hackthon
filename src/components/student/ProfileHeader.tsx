import React from 'react';
import CoalitionFlag from '../ui/CoalitionFlag';
import NotificationsIcon from '../ui/NotificationsIcon';

interface ProfileHeaderProps {
    user: {
        displayname: string;
        login: string;
    };
    level: number;
    paceStatus: 'ahead' | 'on-track' | 'behind';
    hasNotifications: boolean;
}

const PaceIndicator: React.FC<{ status: ProfileHeaderProps['paceStatus'] }> = ({ status }) => {
    const icons = {
        ahead: { symbol: '✓', color: 'green', text: 'Ahead of Pace' },
        'on-track': { symbol: '!', color: 'orange', text: 'On Track' },
        behind: { symbol: '×', color: 'red', text: 'Behind Pace' },
    };
    const current = icons[status];

    return (
        <div className="pace-alert" title={current.text}>
            <span style={{ color: current.color }}>{current.symbol}</span>
        </div>
    );
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, level, paceStatus, hasNotifications }) => {
    const levelInteger = Math.floor(level);
    const levelDecimal = Math.round((level % 1) * 100);

    return (
        <header className="profile-header">
            <div className="profile-left">
                <img src="https://i.pinimg.com/1200x/2f/51/08/2f5108c82f97032402063c03072e3b0c.jpg" alt="Profile" className="profile-picture" />
                <div className="profile-info">
                    <h1>{user.displayname}</h1>
                    <p>@{user.login}</p>
                </div>
                <CoalitionFlag />
                <div className="xp-tracker">
                    <div className="level-text">
                        Level {levelInteger} <span className="level-decimal">.{levelDecimal}%</span>
                    </div>
                    <div className="xp-bar-container">
                        <div className="xp-bar" style={{ width: `${levelDecimal}%` }}></div>
                    </div>
                </div>
            </div>

            <div className="profile-right">
                <PaceIndicator status={paceStatus} />
                <button className="notification-button" onClick={() => alert('Notifications clicked!')}>
                    <NotificationsIcon hasNotifications={hasNotifications} />
                </button>
            </div>
        </header>
    );
};

export default ProfileHeader;
