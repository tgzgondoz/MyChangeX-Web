// DashboardScreen.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faSearch, 
  faBell, 
  faShieldAlt,
  faUsers,
  faTicketAlt,
  faExchangeAlt,
  faDollarSign,
  faArrowUp,
  faArrowDown,
  faReceipt,
  faThLarge,
  faCog,
  faTimes,
  faEye,
  faUser,
  faTag,
  faCreditCard,
  faCalendar,
  faPercentage,
  faCheckCircle,
  faTimesCircle,
  faGift,
  faPaperPlane,
  faHistory,
  faQrcode
} from '@fortawesome/free-solid-svg-icons';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import './DashboardScreen.css';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQuU56yKb-BwlTE69gkCzHLaOdByt31nk",
  authDomain: "coupon-7094e.firebaseapp.com",
  databaseURL: "https://coupon-7094e-default-rtdb.firebaseio.com",
  projectId: "coupon-7094e",
  storageBucket: "coupon-7094e.firebasestorage.app",
  messagingSenderId: "487809263978",
  appId: "1:487809263978:web:b1a3859c96d111a4975d13",
  measurementId: "G-2BMZ50TCQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const DashboardScreen = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [detailView, setDetailView] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  
  // State for real-time data
  const [users, setUsers] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Fetch real-time data from Firebase
  useEffect(() => {
    setDataLoading(true);
    
    // References to Firebase database paths
    const usersRef = ref(db, 'users');
    const couponsRef = ref(db, 'coupons');
    const transactionsRef = ref(db, 'transactions');

    // Set up real-time listeners
    const unsubscribeUsers = onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      if (usersData) {
        const usersArray = Object.keys(usersData).map(key => ({
          id: key,
          ...usersData[key]
        }));
        setUsers(usersArray);
      } else {
        setUsers([]);
      }
    });

    const unsubscribeCoupons = onValue(couponsRef, (snapshot) => {
      const couponsData = snapshot.val();
      if (couponsData) {
        const couponsArray = Object.keys(couponsData).map(key => ({
          id: key,
          ...couponsData[key]
        }));
        setCoupons(couponsArray);
      } else {
        setCoupons([]);
      }
    });

    const unsubscribeTransactions = onValue(transactionsRef, (snapshot) => {
      const transactionsData = snapshot.val();
      if (transactionsData) {
        const transactionsArray = Object.keys(transactionsData).map(key => ({
          id: key,
          ...transactionsData[key]
        }));
        setTransactions(transactionsArray);
        setDataLoading(false);
      } else {
        setTransactions([]);
        setDataLoading(false);
      }
    });

    // Error handling for Firebase listeners
    const errorHandler = (error) => {
      console.error('Firebase real-time listener error:', error);
      setDataLoading(false);
    };

    // Cleanup function to remove listeners
    return () => {
      off(usersRef, 'value', unsubscribeUsers);
      off(couponsRef, 'value', unsubscribeCoupons);
      off(transactionsRef, 'value', unsubscribeTransactions);
    };
  }, []);

  // Calculate statistics for dashboard
  const totalRevenue = transactions.reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
  const activeCoupons = coupons.filter(coupon => coupon && coupon.status === 'active').length;
  const recentTransactions = transactions.slice(0, 5);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  // Format datetime for display
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

  // Get transaction type label
  const getTransactionTypeLabel = (type) => {
    const typeMap = {
      'coupon_generated': 'Coupon Generated',
      'coupon_transferred': 'Coupon Transferred',
      'coupon_redeemed': 'Coupon Redeemed',
      'payment': 'Payment',
      'refund': 'Refund'
    };
    return typeMap[type] || type || 'N/A';
  };

  // Open detail view
  const openDetailView = (type, item) => {
    setDetailView(type);
    setSelectedItem(item);
  };

  // Close detail view
  const closeDetailView = () => {
    setDetailView(null);
    setSelectedItem(null);
  };

  // Users component
  const Users = () => (
    <div className="scroll-view">
      <div className="content-card">
        <h2>Users Management</h2>
        <div className="user-list">
          {users.map((user, index) => (
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
        </div>
      </div>
    </div>
  );

  // Coupons component
  const Coupons = () => (
    <div className="scroll-view">
      <div className="content-card">
        <h2>Coupons Management</h2>
        <div className="coupon-list">
          {coupons.map((coupon, index) => (
            <div key={index} className="coupon-item" onClick={() => openDetailView('coupon', coupon)}>
              <div className="coupon-info">
                <div className="coupon-code">{coupon.code || `CODE${index + 1}`}</div>
                <div className="coupon-discount">${coupon.value || coupon.originalAmount || '10.00'}</div>
              </div>
              <div className="coupon-status">
                {coupon.status === 'redeemed' ? (
                  <FontAwesomeIcon icon={faCheckCircle} className="active-status" />
                ) : (
                  <FontAwesomeIcon icon={faTimesCircle} className="inactive-status" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Transactions component
  const Transactions = () => (
    <div className="scroll-view">
      <div className="content-card">
        <h2>Transactions History</h2>
        {transactions.map((transaction, index) => (
          <div key={index} className="transaction-item" onClick={() => openDetailView('transaction', transaction)}>
            <div>
              <div className="transaction-user">
                {transaction.from || `User ${index + 1}`}
              </div>
              <div className="transaction-date">
                {formatDateTime(transaction.timestamp) || 'N/A'}
              </div>
            </div>
            <div className="transaction-amount">${transaction.amount || '0.00'}</div>
            <div className="status-badge">
              <div className="status-text">
                {transaction.status === 'completed' ? 'Completed' : 
                transaction.status === 'active' ? 'Active' : 
                transaction.status || 'Pending'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (dataLoading && activeTab === 'dashboard') {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <div className="loading-text">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)}>
          <div className="overlay-touchable"></div>
        </div>
      )}
      
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">Coupon Manager</div>
        </div>
        
        <div className="sidebar-menu">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: faThLarge },
            { id: 'users', label: 'Users', icon: faUsers },
            { id: 'coupons', label: 'Coupons', icon: faTicketAlt },
            { id: 'transactions', label: 'Transactions', icon: faExchangeAlt },
            { id: 'settings', label: 'Settings', icon: faCog }
          ].map(item => (
            <div
              key={item.id}
              className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
            >
              <FontAwesomeIcon 
                icon={item.icon} 
                size="sm" 
                className="menu-icon" 
              />
              <div className="menu-text">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Header */}
        <div className="header">
          <div className="menu-button" onClick={() => setSidebarOpen(true)}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} size="sm" className="search-icon" />
            <div className="search-placeholder">Search...</div>
          </div>
          
          <div className="notification-button">
            <FontAwesomeIcon icon={faBell} />
          </div>
        </div>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div className="scroll-view">
            {/* Security Warning */}
            <div className="security-alert">
              <div className="alert-icon-container">
                <FontAwesomeIcon icon={faShieldAlt} size="sm" />
              </div>
              <div className="alert-content">
                <div className="alert-title">Security Alert</div>
                <div className="alert-text">
                  Your Firebase security rules are set to public. This means anyone can read, modify, or delete your data.
                </div>
                <div className="alert-buttons">
                  <div className="alert-primary-button">
                    <div className="alert-primary-button-text">Update Security Rules</div>
                  </div>
                  <div className="alert-secondary-button-text">Learn More</div>
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-content">
                  <div>
                    <div className="stat-label">Total Users</div>
                    <div className="stat-value">{users.length}</div>
                    <div className="stat-trend">
                      <FontAwesomeIcon icon={faArrowUp} size="xs" />
                      <div className="positive-trend">12% from last month</div>
                    </div>
                  </div>
                  <div className="stat-icon-container" style={{ backgroundColor: '#dcfce7' }}>
                    <FontAwesomeIcon icon={faUsers} style={{ color: '#16a34a' }} />
                  </div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-content">
                  <div>
                    <div className="stat-label">Active Coupons</div>
                    <div className="stat-value">{activeCoupons}</div>
                    <div className="stat-trend">
                      <FontAwesomeIcon icon={faArrowUp} size="xs" />
                      <div className="positive-trend">5% from last week</div>
                    </div>
                  </div>
                  <div className="stat-icon-container" style={{ backgroundColor: '#dbeafe' }}>
                    <FontAwesomeIcon icon={faTicketAlt} style={{ color: '#2563eb' }} />
                  </div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-content">
                  <div>
                    <div className="stat-label">Transactions</div>
                    <div className="stat-value">{transactions.length}</div>
                    <div className="stat-trend">
                      <FontAwesomeIcon icon={faArrowDown} size="xs" />
                      <div className="negative-trend">3% from yesterday</div>
                    </div>
                  </div>
                  <div className="stat-icon-container" style={{ backgroundColor: '#f3e8ff' }}>
                    <FontAwesomeIcon icon={faExchangeAlt} style={{ color: '#7c3aed' }} />
                  </div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-content">
                  <div>
                    <div className="stat-label">Revenue</div>
                    <div className="stat-value">${totalRevenue.toFixed(2)}</div>
                    <div className="stat-trend">
                      <FontAwesomeIcon icon={faArrowUp} size="xs" />
                      <div className="positive-trend">20% from last month</div>
                    </div>
                  </div>
                  <div className="stat-icon-container" style={{ backgroundColor: '#fef3c7' }}>
                    <FontAwesomeIcon icon={faDollarSign} style={{ color: '#ca8a04' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts and Data Section */}
            <div className="data-container">
              {/* Recent Transactions */}
              <div className="data-card">
                <div className="data-card-header">
                  <div className="data-card-title">Recent Transactions</div>
                  <div 
                    className="view-all-text"
                    onClick={() => setActiveTab('transactions')}
                  >
                    View All
                  </div>
                </div>
                
                {recentTransactions.length > 0 ? (
                  recentTransactions.map((transaction, index) => (
                    <div 
                      key={index} 
                      className="transaction-item"
                      onClick={() => openDetailView('transaction', transaction)}
                    >
                      <div>
                        <div className="transaction-user">
                          {transaction.from || `User ${index + 1}`}
                        </div>
                        <div className="transaction-date">
                          {formatDateTime(transaction.timestamp) || 'N/A'}
                        </div>
                      </div>
                      <div className="transaction-amount">${transaction.amount || '0.00'}</div>
                      <div className="status-badge">
                        <div className="status-text">
                          {transaction.status === 'completed' ? 'Completed' : 
                          transaction.status === 'active' ? 'Active' : 
                          transaction.status || 'Pending'}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <FontAwesomeIcon icon={faReceipt} size="2x" />
                    <div className="empty-state-text">No transactions found</div>
                  </div>
                )}
              </div>

              {/* Coupon Usage */}
              <div className="data-card">
                <div className="data-card-header">
                  <div className="data-card-title">Coupon Usage</div>
                  <div 
                    className="view-all-text"
                    onClick={() => setActiveTab('coupons')}
                  >
                    View Report
                  </div>
                </div>
                
                <div className="chart-container">
                  <div className="pie-chart">
                    <div className="chart-value-container">
                      <div className="chart-value">90%</div>
                    </div>
                  </div>
                  <div className="chart-label">of coupons are being used</div>
                  <div className="chart-sub-label">Total coupons: {coupons.length}</div>
                </div>
                
                <div className="coupon-list">
                  {coupons.slice(0, 3).map((coupon, index) => (
                    <div 
                      key={index} 
                      className="coupon-item"
                      onClick={() => openDetailView('coupon', coupon)}
                    >
                      <div className="coupon-info">
                        <div className="coupon-code">{coupon.code || `CODE${index + 1}`}</div>
                        <div className="coupon-discount">${coupon.value || coupon.originalAmount || '10.00'}</div>
                      </div>
                      <div className="coupon-status">
                        {coupon.status === 'redeemed' ? (
                          <FontAwesomeIcon icon={faCheckCircle} className="active-status" />
                        ) : (
                          <FontAwesomeIcon icon={faTimesCircle} className="inactive-status" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* User List */}
            <div className="data-card">
              <div className="data-card-header">
                <div className="data-card-title">Active Users</div>
                <div 
                  className="view-all-text"
                  onClick={() => setActiveTab('users')}
                >
                  View All
                </div>
              </div>
              
              <div className="user-list">
                {users.slice(0, 5).map((user, index) => (
                  <div 
                    key={index} 
                    className="user-item"
                    onClick={() => openDetailView('user', user)}
                  >
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
              </div>
            </div>
          </div>
        )}

        {/* Users Content */}
        {activeTab === 'users' && <Users />}

        {/* Coupons Content */}
        {activeTab === 'coupons' && <Coupons />}

        {/* Transactions Content */}
        {activeTab === 'transactions' && <Transactions />}

        {/* Settings Content */}
        {activeTab === 'settings' && (
          <div className="scroll-view">
            <div className="content-card">
              <h2>Settings</h2>
              <p>Settings content will go here.</p>
            </div>
          </div>
        )}
      </div>

      {/* Detail View Overlay */}
      {detailView && (
        <div className="detail-overlay">
          <div className="detail-content">
            <div className="detail-header">
              <h2>
                {detailView === 'user' && 'User Details'}
                {detailView === 'coupon' && 'Coupon Details'}
                {detailView === 'transaction' && 'Transaction Details'}
              </h2>
              <button className="close-detail" onClick={closeDetailView}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="detail-body">
              {/* User Detail View */}
              {detailView === 'user' && selectedItem && (
                <div className="user-detail">
                  <div className="detail-avatar">
                    <FontAwesomeIcon icon={faUser} size="3x" />
                  </div>
                  <div className="detail-info">
                    <div className="info-row">
                      <span className="info-label">Full Name:</span>
                      <span className="info-value">{selectedItem.fullName || selectedItem.name || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Phone Number:</span>
                      <span className="info-value">{selectedItem.phoneNumber || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Email:</span>
                      <span className="info-value">{selectedItem.email || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Created At:</span>
                      <span className="info-value">{formatDateTime(selectedItem.createdAt) || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Status:</span>
                      <span className="info-value">
                        <span className={`status-badge ${selectedItem.status || 'active'}`}>
                          {selectedItem.status || 'Active'}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Coupon Detail View */}
              {detailView === 'coupon' && selectedItem && (
                <div className="coupon-detail">
                  <div className="detail-icon">
                    <FontAwesomeIcon icon={faTicketAlt} size="3x" />
                  </div>
                  <div className="detail-info">
                    <div className="info-row">
                      <span className="info-label">Code:</span>
                      <span className="info-value">{selectedItem.code || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Value:</span>
                      <span className="info-value">${selectedItem.value || selectedItem.originalAmount || '0.00'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Sender:</span>
                      <span className="info-value">{selectedItem.senderNumber || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Receiver:</span>
                      <span className="info-value">{selectedItem.receiverNumber || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Generated At:</span>
                      <span className="info-value">{formatDateTime(selectedItem.generated_at) || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Transferred At:</span>
                      <span className="info-value">{formatDateTime(selectedItem.transferred_at) || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Redeemed At:</span>
                      <span className="info-value">{formatDateTime(selectedItem.redeemed_at) || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Redeemed By:</span>
                      <span className="info-value">{selectedItem.redeemed_by || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Expiry Date:</span>
                      <span className="info-value">{formatDate(selectedItem.expiry_date) || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Last Updated:</span>
                      <span className="info-value">{formatDateTime(selectedItem.last_updated) || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Status:</span>
                      <span className="info-value">
                        {selectedItem.status === 'redeemed' ? (
                          <span className="status-badge redeemed">Redeemed</span>
                        ) : selectedItem.status === 'transferred' ? (
                          <span className="status-badge transferred">Transferred</span>
                        ) : selectedItem.status === 'active' ? (
                          <span className="status-badge active">Active</span>
                        ) : (
                          <span className="status-badge inactive">Inactive</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Transaction Detail View */}
              {detailView === 'transaction' && selectedItem && (
                <div className="transaction-detail">
                  <div className="detail-icon">
                    <FontAwesomeIcon icon={faCreditCard} size="3x" />
                  </div>
                  <div className="detail-info">
                    <div className="info-row">
                      <span className="info-label">Transaction ID:</span>
                      <span className="info-value">{selectedItem.id || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">From:</span>
                      <span className="info-value">{selectedItem.from || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Amount:</span>
                      <span className="info-value">${selectedItem.amount || '0.00'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Coupon Code:</span>
                      <span className="info-value">{selectedItem.coupon_code || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Coupon Value:</span>
                      <span className="info-value">${selectedItem.coupon_value || '0.00'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Transaction Type:</span>
                      <span className="info-value">{getTransactionTypeLabel(selectedItem.transaction_type)}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Timestamp:</span>
                      <span className="info-value">{formatDateTime(selectedItem.timestamp) || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Coupon Generated:</span>
                      <span className="info-value">
                        {selectedItem.coupon_generated ? (
                          <span className="status-badge active">Yes</span>
                        ) : (
                          <span className="status-badge inactive">No</span>
                        )}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Status:</span>
                      <span className="info-value">
                        {selectedItem.status === 'completed' ? (
                          <span className="status-badge completed">Completed</span>
                        ) : selectedItem.status === 'active' ? (
                          <span className="status-badge active">Active</span>
                        ) : selectedItem.status === 'failed' ? (
                          <span className="status-badge inactive">Failed</span>
                        ) : (
                          <span className="status-badge inactive">Pending</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardScreen;