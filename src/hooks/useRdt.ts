import { useContext } from "react";
import { RdtContext } from "../rdt-context";

export const useRdt = () => useContext(RdtContext)!