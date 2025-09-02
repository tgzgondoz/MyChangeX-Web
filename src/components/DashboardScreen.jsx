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
  faHistory
} from '@fortawesome/free-solid-svg-icons';
import './DashboardScreen.css';

const DashboardScreen = ({ users, coupons, transactions, dataLoading }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [detailView, setDetailView] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Calculate statistics
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

  if (dataLoading) {
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
                  onClick={() => setDetailView('transactions')}
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
                        {transaction.userName || `User ${index + 1}`}
                      </div>
                      <div className="transaction-date">
                        {transaction.date || 'Aug 30, 2025'}
                      </div>
                    </div>
                    <div className="transaction-amount">${transaction.amount || '0.00'}</div>
                    <div className="status-badge">
                      <div className="status-text">Completed</div>
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
                  onClick={() => setDetailView('coupons')}
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
                onClick={() => setDetailView('users')}
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
                {detailView === 'users' && 'All Users'}
                {detailView === 'coupons' && 'All Coupons'}
                {detailView === 'transactions' && 'All Transactions'}
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
                      <span className="info-label">Created At:</span>
                      <span className="info-value">{formatDateTime(selectedItem.createdAt) || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Status:</span>
                      <span className="info-value">
                        <span className="status-badge active">Active</span>
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
                      <span className="info-label">User:</span>
                      <span className="info-value">{selectedItem.userName || 'User 1'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Amount:</span>
                      <span className="info-value">${selectedItem.amount || '0.00'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Date:</span>
                      <span className="info-value">{selectedItem.date || 'Aug 30, 2023'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Status:</span>
                      <span className="info-value">
                        <span className="status-badge completed">Completed</span>
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Payment Method:</span>
                      <span className="info-value">Credit Card</span>
                    </div>
                  </div>
                </div>
              )}

              {/* All Users View */}
              {detailView === 'users' && (
                <div className="all-items-view">
                  <h3>All Users ({users.length})</h3>
                  <div className="items-list">
                    {users.map((user, index) => (
                      <div 
                        key={index} 
                        className="item-row"
                        onClick={() => openDetailView('user', user)}
                      >
                        <div className="user-avatar small">
                          <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div className="item-info">
                          <div className="item-name">{user.fullName || user.name || `User ${index + 1}`}</div>
                          <div className="item-sub">{user.phoneNumber || user.email || `user${index + 1}@example.com`}</div>
                        </div>
                        <div className="item-action">
                          <FontAwesomeIcon icon={faEye} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Coupons View */}
              {detailView === 'coupons' && (
                <div className="all-items-view">
                  <h3>All Coupons ({coupons.length})</h3>
                  <div className="items-list">
                    {coupons.map((coupon, index) => (
                      <div 
                        key={index} 
                        className="item-row"
                        onClick={() => openDetailView('coupon', coupon)}
                      >
                        <div className="item-icon">
                          <FontAwesomeIcon icon={faTicketAlt} />
                        </div>
                        <div className="item-info">
                          <div className="item-name">{coupon.code || `CODE${index + 1}`}</div>
                          <div className="item-sub">${coupon.value || coupon.originalAmount || '10.00'}</div>
                        </div>
                        <div className="item-status">
                          {coupon.status === 'redeemed' ? (
                            <span className="status-badge redeemed">Redeemed</span>
                          ) : coupon.status === 'transferred' ? (
                            <span className="status-badge transferred">Transferred</span>
                          ) : coupon.status === 'active' ? (
                            <span className="status-badge active">Active</span>
                          ) : (
                            <span className="status-badge inactive">Inactive</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Transactions View */}
              {detailView === 'transactions' && (
                <div className="all-items-view">
                  <h3>All Transactions ({transactions.length})</h3>
                  <div className="items-list">
                    {transactions.map((transaction, index) => (
                      <div 
                        key={index} 
                        className="item-row"
                        onClick={() => openDetailView('transaction', transaction)}
                      >
                        <div className="item-icon">
                          <FontAwesomeIcon icon={faCreditCard} />
                        </div>
                        <div className="item-info">
                          <div className="item-name">Transaction #{index + 1}</div>
                          <div className="item-sub">{transaction.userName || `User ${index + 1}`}</div>
                        </div>
                        <div className="item-amount">${transaction.amount || '0.00'}</div>
                      </div>
                    ))}
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