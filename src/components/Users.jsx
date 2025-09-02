import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye } from '@fortawesome/free-solid-svg-icons';

const Users = ({ users, searchQuery, isSearching, openDetailView, formatDateTime }) => {
  const filteredUsers = users.filter(user => 
    user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phoneNumber?.includes(searchQuery)
  );

  return (
    <div className="scroll-view">
      <div className="content-card">
        <h2>Users Management</h2>
        <div className="user-list">
          {(isSearching ? filteredUsers : users).map((user, index) => (
            <div key={index} className="user-item" onClick={() => openDetailView('user', user)}>
              <div className="user-avatar">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="user-info">
                <div className="user-name">{user.fullName || user.name || `User ${index + 1}`}</div>
                <div className="user-email">{user.phoneNumber || user.email || `user${index + 1}@example.com`}</div>
              </div>
              <div className="user-view">
                <FontAwesomeIcon icon={faEye} />
              </div>
            </div>
          ))}
          {isSearching && filteredUsers.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-text">No users found</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;