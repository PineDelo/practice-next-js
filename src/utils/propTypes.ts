// Pages
export interface DataProps {
  page: number;
  results: Object[];
  total_pages: number;
  total_results: number;
}

// Components
export interface ModalProps  {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Deprecated
export interface AuthProps {
  setAuthState: React.Dispatch<React.SetStateAction<string>>;
}