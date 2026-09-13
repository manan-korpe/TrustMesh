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
  notify: (
    msg: string,
    type?: "success" | "error" | "info",
  ) => void;
  setCurrentUserId: (id: string | null) => void;
  toastMessage: ToastMessage | null;
  setToastMessage: React.Dispatch<React.SetStateAction<ToastMessage | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);