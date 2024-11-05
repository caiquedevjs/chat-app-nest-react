import React, { createContext, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';


const NotificationContext = createContext<{ notify: (message: string) => void } | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const notify = (message: string) => {
      
        // Mostrar a notificação
        toast(message);
    };

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}
            <Toaster position="top-right" />
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
