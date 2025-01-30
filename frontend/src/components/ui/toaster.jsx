import { Toast, ToastProvider, ToastViewport } from "@radix-ui/react-toast";
import { useState, useEffect } from "react";

export function Toaster() {
  const [toasts, setToasts] = useState([]);

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <div className="text-sm font-semibold">{title}</div>}
              {description && (
                <div className="text-sm opacity-90">{description}</div>
              )}
            </div>
            {action}
          </Toast>
        );
      })}
      <ToastViewport className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
    </ToastProvider>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = ({ title, description, action }) => {
    setToasts((current) => [
      ...current,
      { id: crypto.randomUUID(), title, description, action },
    ]);
  };

  return { toast: addToast };
}