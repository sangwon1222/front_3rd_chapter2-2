import { AdminContextType } from 'src';
import { createContext } from 'react';

export const AdminContext = createContext<AdminContextType | null>(null);
