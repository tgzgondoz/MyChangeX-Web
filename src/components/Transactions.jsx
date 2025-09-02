import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

const Transactions = ({ transactions, searchQuery, isSearching, openDetailView, formatDateTime, getTransactionTypeLabel }) => {
  const filteredTransactions = transactions.filter(transaction => 
    transaction.from?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.coupon_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.amount?.toString().includes(searchQuery)
  );

  return (
    <div className="scroll-view">
      <div className="content-card">
        <h2>Transactions History</h2>
        {(isSearching ? filteredTransactions : transactions).map((transaction, index) => (
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
        {isSearching && filteredTransactions.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-text">No transactions found</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;