import React from 'react';
import css from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { useDispatch } from 'react-redux';
import { deleteContacts } from 'redux/operations';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const visibleContacts = contacts.filter(client =>
    client.name.toLowerCase().includes(filter)
  );

  return (
    <ul className={css.list}>
      {visibleContacts.map(el => {
        return (
          <li key={el.id} className={css.listItem}>
            {el.name}: {el.number}
            <button
              type="button"
              className={css.deleteButton}
              onClick={() => dispatch(deleteContacts(el.id))}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
