import PropTypes from 'prop-types';
import css from './Contacts.module.css';
export const Contacts = ({ contacts, onDelete }) => {
  return (
    <>
      <ul>
        {contacts.map(({ name, id, number }) => {
          return (
            <li key={id}>
              {name}: {number}
              <button
                className={css.deleteBtn}
                key={id}
                type="button"
                onClick={() => onDelete(id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

Contacts.propTypes = {
  onDelete: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};
