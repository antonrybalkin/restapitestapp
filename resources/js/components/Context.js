import React from "react";
/**
 * Create context
 */
export const LocalContext = React.createContext({
    re_render: false,
    setRe_Render: (state) => {}
});