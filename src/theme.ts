export interface Theme {
    name: string;
    properties: any;
}

export const light: Theme = {
    name: "light",
    properties: {
        "$background-color": "#1b1b1b;",
        "$navigation-background": "#2b2b2b;",
        "$white": "#e1e1e1;",
        "$accent-color": "#508ec5;",
        "$grey": "#b1b1b1;",
        "$accent-color-hover": "#447fb3;"
    }
};

export const dark: Theme = {
    name: "dark",
    properties: {
        "$background-color": "#000;",
        "$navigation-background": "#000;",
        "$white":"000;",
        "$accent-color": "#000;",
        "$grey": "#000;",
        "$accent-color-hover": "#000;"
    }
};