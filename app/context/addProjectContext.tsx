/* import { NewProject } from "@/lib/schemas";
import { createContext, useState } from 'react';


const defaultProject: {} = {
  projectName: "",
  projectDescription: "",
  team: "",
  link: "",
  environment: undefined,
  model: "",
  launchDate: "",
  discontinuationDate: "",
  contextWindow: "",
  params: "",
  priceMlnInput: "",
  priceMlnOutput: "",
  apiKeyName: "",
  enabled: false,
    
}

type AddProjectContextType = {
    newProjectData: {}
    updateNewProjectDataDetails: (projectDetails: Partial<NewProject>) => void;
    dataLoaded: boolean;
    resetLocalStorage: () => void;
}


export const AddProjectContext = createContext<AddProjectContextType | null>(null);

export const AddProjectContextProvider = ({ children } : { children: React.ReactNode }) => {
    const [newProjectData, setNewProjectData] = useState<newProjectInitialValuesType>(defaultProject)

    return <AddProjectContext.Provider>
                {children}
            </AddProjectContext.Provider>
} */