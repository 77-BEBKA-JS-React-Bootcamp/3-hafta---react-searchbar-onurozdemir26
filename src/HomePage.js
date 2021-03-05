import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { loadUsers } from './users';
import UsersList from './UsersList';
import Header from './Header';


const HomePage = (props) => {
  const [users, setUsers] = useState(props.users);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  
  useEffect(() => {
    setIsLoading(true);
    props.dispatch(loadUsers());

    
    inputRef.current = _.debounce(onSearchText, 500);
  }, []);

  useEffect(() => {
    if (props.users.length > 0) {
      setUsers(props.users);
      setIsLoading(false);
    }
  }, [props.users]);

  function onSearchText(text, props) {
    let filtered;
    if (text) {
      filtered = props.users.filter((user) =>
        user.country.toLowerCase().includes(text.toLowerCase())
      );
    } else {
      filtered = props.users;
    }
    setUsers(filtered);
    
  }

  function handleSearch(event) {
    inputRef.current(event.target.value, props);
  }

 
  return (
    <React.Fragment>
      <Header handleSearch={handleSearch} />
      <UsersList users={users} isLoading={isLoading} />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps)(HomePage);