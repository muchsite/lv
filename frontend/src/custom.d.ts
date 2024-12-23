declare module "*.svg" {
    const content: any;
    export default content;
}
declare namespace NodeJS {
    interface ProcessEnv {
        REACT_APP_API_URL: string;
    }
}
interface ImportMetaEnv {
    VITE_API_URL: string; // Define the environment variables you use
    // Add more variables here if necessary
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}