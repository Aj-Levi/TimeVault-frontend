import { useZustandStore } from "../ZustandStore.js";
import { useEffect } from "react";

export default function ThemeProvider({
  children,
}) {
  const { currentTheme } = useZustandStore();
  
  useEffect(() => {
    document.body.dataset.theme = currentTheme;
  }, [currentTheme]);
  
  return <>{children}</>;
}
