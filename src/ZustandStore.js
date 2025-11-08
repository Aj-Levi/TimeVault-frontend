import { create } from "zustand";

export const useZustandStore = create((set)=>({
    currentTheme: "abyss",
    toggleTheme: ()=>{set((state)=>{
        return state.currentTheme==="abyss"?{currentTheme: "bumblebee"}:{currentTheme: "abyss"}
    })},
    isSidebarOpen: false,
    toggleSidebar: ()=>{set((state)=>({
        isSidebarOpen: !state.isSidebarOpen
    }))}
}))