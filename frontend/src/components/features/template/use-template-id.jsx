import { createContext, useContext } from "react";

export const TemplateIdContext = createContext(null);

export const useTemplateId = () => useContext(TemplateIdContext);
