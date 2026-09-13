"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Asset } from "@/types/asset";
import { Log } from "@/types/log";
import { User } from "@/types/user";
import { generateInitialData } from "@/utils/seed.util";
import { useRouter } from "next/navigation";

interface ToastMessage {
  msg: string;
  type: "success" | "error" | "info";
  id: number;
}

interface AppContextType {
  users: User[];
  assets: Asset[];
  auditLogs: Log[];
  currentUser: User | undefined;
  currentUserId: string | null;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
  addLog: (
    action: string,
    target: string,
    source: string,
    status: string,
    hash?: string,
  ) => void;
  onLogout: () => void;
  onLogin:(userId:string)=>void;
  notify: (msg: string, type?: "success" | "error" | "info") => void;
  setCurrentUserId: (id: string | null) => void;
  toastMessage: ToastMessage | null;
  setToastMessage: React.Dispatch<React.SetStateAction<ToastMessage | null>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [auditLogs, setAuditLogs] = useState<Log[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);
  console.log(users, currentUserId);
  useEffect(() => {
    const {
      users: initialUsers,
      assets: initialAssets,
      auditLogs: initialLogs,
    } = generateInitialData();

    setUsers(initialUsers);
    setAssets(initialAssets);
    setAuditLogs(initialLogs);
  }, []);

  const currentUser = useMemo(
    () => users.find((u) => u.id === currentUserId) ?? users[0],
    [users, currentUserId],
  );

  const addLog = (
    action: string,
    target: string,
    source: string,
    status: string,
    hash = "—",
  ) => {
    if (!currentUser) return;

    const newLog: Log = {
      id: Date.now().toString(),
      time: new Date().toLocaleString(),
      actor: currentUser.name,
      action,
      target,
      source,
      status,
      hash,
    };

    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const notify = (
    msg: string,
    type: "success" | "error" | "info" = "success",
  ) => {
    setToastMessage({
      msg,
      type,
      id: Date.now(),
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUserId(null);
  };

  const handleLogin = (userId:string) => {
    setCurrentUserId(userId);
    setIsAuthenticated(true);
    router.replace('/dashboard');
    addLog("Login Successful", "System Login", "Frontend", "Success");
  };

  return (
    <AppContext.Provider
      value={{
        users,
        assets,
        auditLogs,
        currentUser,
        currentUserId,
        setUsers,
        setAssets,
        setCurrentUserId,
        addLog,
        notify,
        toastMessage,
        setToastMessage,
        onLogout: handleLogout,
        onLogin:handleLogin
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
