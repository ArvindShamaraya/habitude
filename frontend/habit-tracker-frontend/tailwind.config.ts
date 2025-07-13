import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            borderRadius: {
                lg: "var(--radius-lg)",
                md: "var(--radius-md)",
                sm: "var(--radius-sm)",
            },
            colors: {
                background: "oklch(var(--background))",
                foreground: "oklch(var(--foreground))",
                card: "oklch(var(--card))",
                "card-foreground": "oklch(var(--card-foreground))",
                popover: "oklch(var(--popover))",
                "popover-foreground": "oklch(var(--popover-foreground))",
                primary: "oklch(var(--primary))",
                "primary-foreground": "oklch(var(--primary-foreground))",
                secondary: "oklch(var(--secondary))",
                "secondary-foreground": "oklch(var(--secondary-foreground))",
                muted: "oklch(var(--muted))",
                "muted-foreground": "oklch(var(--muted-foreground))",
                accent: "oklch(var(--accent))",
                "accent-foreground": "oklch(var(--accent-foreground))",
                destructive: "oklch(var(--destructive))",
                border: "oklch(var(--border))",
                input: "oklch(var(--input))",
                ring: "oklch(var(--ring))",
            },
            fontFamily: {
                sans: ["var(--font-sans)"],
                mono: ["var(--font-mono)"],
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
    ],
};
export default config;
