import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './UserPage.module.scss';
import { memo } from 'react';

interface UserPageProps {
    className?: string;
}

export const UserPage = memo((props: UserPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    
    return (
        <div className={classNames(cls.UserPage, {}, [className])}>
           
        </div>
    );
});