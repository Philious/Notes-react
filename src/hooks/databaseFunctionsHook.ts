import { databaseDispatchers } from "@/redux/customDispatchers";
import store, { DatabaseDispatch } from "@/redux/store";
import { DatabaseActions } from "@/slices/databaseSlice";
import { databaseFunctions } from "@/utils/databaseFunctions";
import { useDispatch } from "react-redux";
import { useLoginState } from "./providerHooks";
import { isFirebase } from "@/utils/sharedUtils";

export const useDatabaseFunctions = () => {
  const dispatch = useDispatch<DatabaseDispatch>();
  const { user } = useLoginState()
  const database = store.getState().database.database;
  const databaseFn = databaseDispatchers(dispatch) as DatabaseActions;
  if (isFirebase() && user?.uid || !isFirebase()) {
    return databaseFunctions(databaseFn, database, user?.uid);
  }
}