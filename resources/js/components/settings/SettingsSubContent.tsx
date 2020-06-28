import * as React from 'react';
import { Link } from 'react-router-dom';

const SettingsSubContent: React.FC = () => {
    const settings = [
        { link: '/settings/profile', title: 'アカウント' },
        { link: '/auth/email/verify', title: 'Email検証' },
    ];

    return (
        <div className="list-group sub-content">
            {settings.map((setting, i) => (
                <Link
                    to={setting.link}
                    className={`list-group-item list-group-item-action ${location.pathname ===
                        setting.link && 'active'}`}
                    key={i}
                >
                    {setting.title}
                </Link>
            ))}
        </div>
    );
};

export default SettingsSubContent;
