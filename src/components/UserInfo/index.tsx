import React, {FC} from 'react';
import styles from './UserInfo.module.scss';

type UserInfoType = {
    avatarUrl?: any
    fullName?: any
    additionalText: string | undefined
}

const UserInfo: FC<UserInfoType> = ({avatarUrl, fullName, additionalText}) => {
    return (
        <div className={styles.root}>
            <img className={styles.avatar}
                 src='https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png'
                 alt={fullName}/>
            <div className={styles.userDetails}>
                <span className={styles.userName}>{fullName}</span>
                <span className={styles.additional}>{additionalText}</span>
            </div>
        </div>
    );
};

export default UserInfo