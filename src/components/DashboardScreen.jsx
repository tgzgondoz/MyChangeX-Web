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
  faCog
} from '@fortawesome/free-solid-svg-icons';
import './DashboardScreen.css';

const DashboardScreen = ({ users, coupons, transactions, dataLoading }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Calculate statistics
  const totalRevenue = transactions.reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
  const activeCoupons = coupons.filter(coupon => coupon && coupon.isActive).length;
  const recentTransactions = transactions.slice(0, 5);

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
                <div className="view-all-text">View All</div>
              </div>
              
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction, index) => (
                  <div key={index} className="transaction-item">
                    <div>
                      <div className="transaction-user">User {index + 1}</div>
                      <div className="transaction-date">Aug 30, 2025</div>
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
                <div className="view-all-text">View Report</div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;