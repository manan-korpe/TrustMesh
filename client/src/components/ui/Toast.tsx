import { useEffect } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  XCircle,
} from "lucide-react";

type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
}

export const Toast = ({
  message,
  type = "success",
  onClose,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons: Record<ToastType, React.ReactNode> = {
    success: (
      <CheckCircle2 className="w-5 h-5 text-green-500" />
    ),
    error: (
      <AlertTriangle className="w-5 h-5 text-red-500" />
    ),
    info: (
      <AlertCircle className="w-5 h-5 text-blue-500" />
    ),
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-white border border-slate-200 shadow-lg rounded-lg p-4 flex items-start space-x-3 max-w-sm">
        {icons[type]}

        <div className="flex-1">
          <p className="text-sm font-medium text-slate-900">
            {message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600"
        >
          <XCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;