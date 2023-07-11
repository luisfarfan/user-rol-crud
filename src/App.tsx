import { CssBaseline } from "@mui/material";
import { useRoutes } from "react-router-dom";
import router from "./router.tsx";

function App() {
    const content = useRoutes(router);

    return (
            <>
                <CssBaseline/>
                <div>
                    {content}
                </div>
            </>
    )
}

export default App
