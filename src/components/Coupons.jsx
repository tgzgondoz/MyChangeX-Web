// Coupons.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt, faEye, faPlus, faSearch, faFilter, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './DashboardScreen.css';

const Coupons = ({ dataLoading, setDataLoading }) => {
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [detailView, setDetailView] = useState(false);

  useEffect(() => {
    fetchCoupons();
  }, []);

  useEffect(() => {
    const filtered = coupons.filter(coupon => 
      coupon.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.senderNumber?.includes(searchTerm) ||
      coupon.receiverNumber?.includes(searchTerm)
    );
    setFilteredCoupons(filtered);
  }, [searchTerm, coupons]);

  const fetchCoupons = async () => {
    setDataLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        const mockCoupons = [
          { 
            id: 1, 
            code: 'SUMMER25', 
            value: 25, 
            senderNumber: '+1234567890', 
            receiverNumber: '+0987654321', 
            generated_at: new Date().toISOString(),
            status: 'active',
            expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          },
          { 
            id: 2, 
            code: 'WINTER50', 
            value: 50, 
            senderNumber: '+1122334455', 
            receiverNumber: null, 
            generated_at: new Date().toISOString(),
            status: 'transferred',
            transferred_at: new Date().toISOString(),
            expiry_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString()
          },
          { 
            id: 3, 
            code: 'FALL10', 
            value: 10, 
            senderNumber: '+0987654321', 
            receiverNumber: '+1234567890', 
            generated_at: new Date().toISOString(),
            status: 'redeemed',
            redeemed_at: new Date().toISOString(),
            expiry_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString()
          },
        ];
        setCoupons(mockCoupons);
        setFilteredCoupons(mockCoupons);
        setDataLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching coupons:', error);
      setDataLoading(false);
    }
  };

  const openCouponDetail = (coupon) => {
    setSelectedCoupon(coupon);
    setDetailView(true);
  };

  const closeDetailView = () => {
    setDetailView(false);
    setSelectedCoupon(null);
  };

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
        <div className="loading-text">Loading coupons...</div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="header">
        <div className="page-title">Coupons</div>
        <div className="header-actions">
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} size="sm" className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search coupons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="primary-button">
            <FontAwesomeIcon icon={faPlus} size="sm" />
            <span>Create Coupon</span>
          </button>
        </div>
      </div>

      <div className="content-card">
        <div className="card-header">
          <h2>All Coupons ({filteredCoupons.length})</h2>
          <button className="icon-button">
            <FontAwesomeIcon icon={faFilter} />
            <span>Filter</span>
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Value</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoupons.map(coupon => (
                <tr key={coupon.id}>
                  <td>
                    <div className="coupon-code">{coupon.code}</div>
                  </td>
                  <td>${coupon.value}</td>
                  <td>{coupon.senderNumber}</td>
                  <td>{coupon.receiverNumber || 'N/A'}</td>
                  <td>{formatDate(coupon.expiry_date)}</td>
                  <td>
                    <span className={`status-badge ${coupon.status}`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="icon-button"
                      onClick={() => openCouponDetail(coupon)}
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

      {detailView && selectedCoupon && (
        <div className="detail-overlay">
          <div className="detail-content">
            <div className="detail-header">
              <h2>Coupon Details</h2>
              <button className="close-detail" onClick={closeDetailView}>
                &times;
              </button>
            </div>
            <div className="detail-body">
              <div className="coupon-detail">
                <div className="detail-icon">
                  <FontAwesomeIcon icon={faTicketAlt} size="3x" />
                </div>
                <div className="detail-info">
                  <div className="info-row">
                    <span className="info-label">Code:</span>
                    <span className="info-value">{selectedCoupon.code}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Value:</span>
                    <span className="info-value">${selectedCoupon.value}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Sender:</span>
                    <span className="info-value">{selectedCoupon.senderNumber}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Receiver:</span>
                    <span className="info-value">{selectedCoupon.receiverNumber || 'N/A'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Generated At:</span>
                    <span className="info-value">{formatDateTime(selectedCoupon.generated_at)}</span>
                  </div>
                  {selectedCoupon.transferred_at && (
                    <div className="info-row">
                      <span className="info-label">Transferred At:</span>
                      <span className="info-value">{formatDateTime(selectedCoupon.transferred_at)}</span>
                    </div>
                  )}
                  {selectedCoupon.redeemed_at && (
                    <div className="info-row">
                      <span className="info-label">Redeemed At:</span>
                      <span className="info-value">{formatDateTime(selectedCoupon.redeemed_at)}</span>
                    </div>
                  )}
                  <div className="info-row">
                    <span className="info-label">Expiry Date:</span>
                    <span className="info-value">{formatDate(selectedCoupon.expiry_date)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Status:</span>
                    <span className="info-value">
                      {selectedCoupon.status === 'redeemed' ? (
                        <span className="status-badge redeemed">Redeemed</span>
                      ) : selectedCoupon.status === 'transferred' ? (
                        <span className="status-badge transferred">Transferred</span>
                      ) : selectedCoupon.status === 'active' ? (
                        <span className="status-badge active">Active</span>
                      ) : (
                        <span className="status-badge inactive">Inactive</span>
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

export default Coupons;