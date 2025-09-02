// Transactions.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faEye, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import './DashboardScreen.css';

const Transactions = ({ dataLoading, setDataLoading }) => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [detailView, setDetailView] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    const filtered = transactions.filter(transaction => 
      transaction.from?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.coupon_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id?.toString().includes(searchTerm)
    );
    setFilteredTransactions(filtered);
  }, [searchTerm, transactions]);

  const fetchTransactions = async () => {
    setDataLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        const mockTransactions = [
          { 
            id: 1, 
            from: 'John Doe', 
            amount: 25, 
            coupon_code: 'SUMMER25',
            coupon_value: 25,
            transaction_type: 'coupon_generated',
            timestamp: new Date().toISOString(),
            status: 'completed'
          },
          { 
            id: 2, 
            from: 'Jane Smith', 
            amount: 50, 
            coupon_code: 'WINTER50',
            coupon_value: 50,
            transaction_type: 'coupon_transferred',
            timestamp: new Date().toISOString(),
            status: 'completed'
          },
          { 
            id: 3, 
            from: 'Bob Johnson', 
            amount: 10, 
            coupon_code: 'FALL10',
            coupon_value: 10,
            transaction_type: 'coupon_redeemed',
            timestamp: new Date().toISOString(),
            status: 'completed'
          },
        ];
        setTransactions(mockTransactions);
        setFilteredTransactions(mockTransactions);
        setDataLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setDataLoading(false);
    }
  };

  const openTransactionDetail = (transaction) => {
    setSelectedTransaction(transaction);
    setDetailView(true);
  };

  const closeDetailView = () => {
    setDetailView(false);
    setSelectedTransaction(null);
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

  if (dataLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <div className="loading-text">Loading transactions...</div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="header">
        <div className="page-title">Transactions</div>
        <div className="header-actions">
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} size="sm" className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="icon-button">
            <FontAwesomeIcon icon={faFilter} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="content-card">
        <div className="card-header">
          <h2>All Transactions ({filteredTransactions.length})</h2>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>From</th>
                <th>Amount</th>
                <th>Coupon Code</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>#{transaction.id}</td>
                  <td>{transaction.from}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.coupon_code}</td>
                  <td>{getTransactionTypeLabel(transaction.transaction_type)}</td>
                  <td>{formatDateTime(transaction.timestamp)}</td>
                  <td>
                    <span className={`status-badge ${transaction.status}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="icon-button"
                      onClick={() => openTransactionDetail(transaction)}
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

      {detailView && selectedTransaction && (
        <div className="detail-overlay">
          <div className="detail-content">
            <div className="detail-header">
              <h2>Transaction Details</h2>
              <button className="close-detail" onClick={closeDetailView}>
                &times;
              </button>
            </div>
            <div className="detail-body">
              <div className="transaction-detail">
                <div className="detail-icon">
                  <FontAwesomeIcon icon={faCreditCard} size="3x" />
                </div>
                <div className="detail-info">
                  <div className="info-row">
                    <span className="info-label">Transaction ID:</span>
                    <span className="info-value">#{selectedTransaction.id}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">From:</span>
                    <span className="info-value">{selectedTransaction.from}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Amount:</span>
                    <span className="info-value">${selectedTransaction.amount}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Coupon Code:</span>
                    <span className="info-value">{selectedTransaction.coupon_code}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Coupon Value:</span>
                    <span className="info-value">${selectedTransaction.coupon_value}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Transaction Type:</span>
                    <span className="info-value">{getTransactionTypeLabel(selectedTransaction.transaction_type)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Timestamp:</span>
                    <span className="info-value">{formatDateTime(selectedTransaction.timestamp)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Status:</span>
                    <span className="info-value">
                      {selectedTransaction.status === 'completed' ? (
                        <span className="status-badge completed">Completed</span>
                      ) : selectedTransaction.status === 'active' ? (
                        <span className="status-badge active">Active</span>
                      ) : selectedTransaction.status === 'failed' ? (
                        <span className="status-badge inactive">Failed</span>
                      ) : (
                        <span className="status-badge inactive">Pending</span>
                      )}
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

export default Transactions;