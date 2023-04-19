import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export const Filter = ({ value, onChange }) => {
  const filterID = nanoid();
  return (
    <>
      <label htmlFor={filterID}>
        Find contacts by name
        <input
          type="text"
          value={value}
          name="filter"
          onChange={onChange}
          id={filterID}
        />
      </label>
    </>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
