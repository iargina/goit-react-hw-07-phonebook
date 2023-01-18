import { createSlice } from '@reduxjs/toolkit';
import { deleteContacts, fetchContact, addContact } from './operations';

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const contactsInitialState = { items: [], isLoading: false, error: null };
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,

  extraReducers: {
    [fetchContact.pending]: handlePending,
    [fetchContact.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.error = null;
      state.items = payload;
    },
    [fetchContact.rejected]: handleRejected,
    [addContact.pending]: handlePending,
    [addContact.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.error = null;
      state.items.push(payload);
    },
    [addContact.rejected]: handleRejected,
    [deleteContacts.pending]: handlePending,
    [deleteContacts.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.filter(contact => contact.id !== payload.id);
    },
    [deleteContacts.rejected]: handleRejected,
  },
});
export const contactsReducer = contactsSlice.reducer;
