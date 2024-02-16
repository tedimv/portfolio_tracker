import { createSlice } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

const LsKey = "theme";

function readCache() {
    const saved = localStorage.getItem(LsKey);

    if (saved === "dark") {
        document.documentElement.classList.add("dark");
        return saved;
    }

    if (saved === "light") return saved;

    // Bad cache
    localStorage.removeItem(LsKey);
    return "dark";
}

export const themeSlice = createSlice({
    name: "theme",
    initialState: {
        value: readCache(),
    } as { value: Theme },
    reducers: {
        toggleTheme: (state) => {
            if (state.value === "light") {
                document.documentElement.classList.add("dark");
                localStorage.setItem(LsKey, "dark");
                state.value = "dark";
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem(LsKey, "light");
                state.value = "light";
            }
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
