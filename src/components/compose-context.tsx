import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ComposeContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openCompose: () => void;
};

const ComposeContext = createContext<ComposeContextValue | null>(null);

export function ComposeProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openCompose = useCallback(() => setOpen(true), []);
  const value = useMemo(
    () => ({ open, setOpen, openCompose }),
    [open, openCompose],
  );
  return (
    <ComposeContext.Provider value={value}>{children}</ComposeContext.Provider>
  );
}

export function useCompose() {
  const ctx = useContext(ComposeContext);
  if (!ctx) {
    throw new Error("useCompose must be used within ComposeProvider");
  }
  return ctx;
}
