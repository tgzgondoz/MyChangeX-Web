import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Coupons = ({ coupons, searchQuery, isSearching, openDetailView, formatDateTime }) => {
  const filteredCoupons = coupons.filter(coupon => 
    coupon.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coupon.senderNumber?.includes(searchQuery) ||
    coupon.receiverNumber?.includes(searchQuery)
  );

  return (
    <div className="scroll-view">
      <div className="content-card">
        <h2>Coupons Management</h2>
        <div className="coupon-list">
          {(isSearching ? filteredCoupons : coupons).map((coupon, index) => (
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
          {isSearching && filteredCoupons.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-text">No coupons found</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coupons;