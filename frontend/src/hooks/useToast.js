/**
 * useToast Hook
 * Manage toast notifications globally
 */

import { useState, useCallback } from 'react';

let toastId = 0;

export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', options = {}) => {
        const id = ++toastId;
        const toast = {
            id,
            message,
            type,
            duration: options.duration ?? 5000,
            action: options.action,
        };

        setToasts((prev) => [...prev, toast]);

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const success = useCallback((message, options) =>
        addToast(message, 'success', options), [addToast]);

    const error = useCallback((message, options) =>
        addToast(message, 'error', options), [addToast]);

    const warning = useCallback((message, options) =>
        addToast(message, 'warning', options), [addToast]);

    const info = useCallback((message, options) =>
        addToast(message, 'info', options), [addToast]);

    return {
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info,
    };
};

export default useToast;
