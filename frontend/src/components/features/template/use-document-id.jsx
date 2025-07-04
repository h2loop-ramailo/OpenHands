import { createContext, useContext } from "react";

export const DocumentIdContext = createContext(null);

export const useDocumentId = () => useContext(DocumentIdContext);
