import { createContext } from "react";

// Instead of calling Firebase in each component that uses Firebase, create a context and use Provider and consumers.

const FirebaseContext = createContext(null);

export default FirebaseContext;
