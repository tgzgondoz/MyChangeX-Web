// Users.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faPlus, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import './DashboardScreen.css';

const Users = ({ dataLoading, setDataLoading }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [detailView, setDetailView] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user => 
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber?.includes(searchTerm) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    setDataLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        const mockUsers = [
          { id: 1, fullName: 'John Doe', phoneNumber: '+1234567890', email: 'john@example.com', createdAt: new Date().toISOString(), status: 'active' },
          { id: 2, fullName: 'Jane Smith', phoneNumber: '+0987654321', email: 'jane@example.com', createdAt: new Date().toISOString(), status: 'active' },
          { id: 3, fullName: 'Bob Johnson', phoneNumber: '+1122334455', email: 'bob@example.com', createdAt: new Date().toISOString(), status: 'inactive' },
        ];
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
        setDataLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching users:', error);
      setDataLoading(false);
    }
  };

  const openUserDetail = (user) => {
    setSelectedUser(user);
    setDetailView(true);
  };

  const closeDetailView = () => {
    setDetailView(false);
    setSelectedUser(null);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  if (dataLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <div className="loading-text">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="header">
        <div className="page-title">Users</div>
        <div className="header-actions">
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} size="sm" className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="primary-button">
            <FontAwesomeIcon icon={faPlus} size="sm" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      <div className="content-card">
        <div className="card-header">
          <h2>All Users ({filteredUsers.length})</h2>
          <button className="icon-button">
            <FontAwesomeIcon icon={faFilter} />
            <span>Filter</span>
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">
                        <FontAwesomeIcon icon={faUser} />
                      </div>
                      <div className="user-info">
                        <div className="user-name">{user.fullName}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>{user.phoneNumber}</div>
                    <div className="text-muted">{user.email}</div>
                  </td>
                  <td>{formatDateTime(user.createdAt)}</td>
                  <td>
                    <span className={`status-badge ${user.status}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="icon-button"
                      onClick={() => openUserDetail(user)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {detailView && selectedUser && (
        <div className="detail-overlay">
          <div className="detail-content">
            <div className="detail-header">
              <h2>User Details</h2>
              <button className="close-detail" onClick={closeDetailView}>
                &times;
              </button>
            </div>
            <div className="detail-body">
              <div className="user-detail">
                <div className="detail-avatar">
                  <FontAwesomeIcon icon={faUser} size="3x" />
                </div>
                <div className="detail-info">
                  <div className="info-row">
                    <span className="info-label">Full Name:</span>
                    <span className="info-value">{selectedUser.fullName}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone Number:</span>
                    <span className="info-value">{selectedUser.phoneNumber}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{selectedUser.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Joined:</span>
                    <span className="info-value">{formatDateTime(selectedUser.createdAt)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Status:</span>
                    <span className="info-value">
                      <span className={`status-badge ${selectedUser.status}`}>
                        {selectedUser.status}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;