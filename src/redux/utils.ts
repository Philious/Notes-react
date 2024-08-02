import { NetworkStatus } from '@/types/enums';
import { ActionReducerMapBuilder, createAsyncThunk, Draft, PayloadAction } from '@reduxjs/toolkit';

export type BaseStateType = {
  status: NetworkStatus;
  error: string | null;
}

type Meta<A> = {
  arg: A;
  requestId: string;
  requestStatus: string;
};

const addCommonCases = <T, A, S extends BaseStateType>(
  builder: ActionReducerMapBuilder<S>,
  thunk: ReturnType<typeof createAsyncThunk<T, A, any>>,
  onFulfilled: (state: Draft<S>, action: PayloadAction<T, string, Meta<A>>) => void
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.status = NetworkStatus.LOADING;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.status = NetworkStatus.SUCCSESS;
      onFulfilled(state, action);
    })
    .addCase(thunk.rejected, (state, action) => {
      state.status = NetworkStatus.FAILED;
      state.error = action.error.message || 'Something went wrong';
    });
};

export default addCommonCases;