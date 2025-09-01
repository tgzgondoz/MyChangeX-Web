import React, { useState } from 'react';

const DashboardScreen = ({ users, coupons, transactions, dataLoading }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Calculate statistics
  const totalRevenue = transactions.reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
  const activeCoupons = coupons.filter(coupon => coupon && coupon.isActive).length;
  const recentTransactions = transactions.slice(0, 5);

  if (dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          <p className="mt-4 text-lg text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-0`}>
        <div className="flex items-center justify-center h-16 bg-gray-800">
          <h1 className="text-white text-xl font-bold">Coupon Manager</h1>
        </div>
        <nav className="mt-6">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
            { id: 'users', label: 'Users', icon: 'users' },
            { id: 'coupons', label: 'Coupons', icon: 'tag' },
            { id: 'transactions', label: 'Transactions', icon: 'exchange-alt' },
            { id: 'settings', label: 'Settings', icon: 'cog' }
          ].map(item => (
            <button
              key={item.id}
              className={`flex items-center w-full px-4 py-3 text-gray-300 transition-colors duration-200 ${activeTab === item.id ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'}`}
              onClick={() => setActiveTab(item.id)}
            >
              <i className={`fas fa-${item.icon} w-5 mr-3 text-center`}></i>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-0">
        {/* Header */}
        <header className="flex items-center justify-between h-16 bg-white shadow-sm px-4">
          <button 
            className="md:hidden text-gray-500 focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
          <div className="relative flex-1 max-w-xs mx-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
          <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <i className="fas fa-bell text-gray-600"></i>
          </button>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Security Warning */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-shield-alt text-red-500"></i>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-red-700">Security Alert</h3>
                <p className="text-red-600 mt-1">Your Firebase security rules are set to public. This means anyone can read, modify, or delete your data.</p>
                <div className="mt-3">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Update Security Rules</button>
                  <button className="ml-3 text-red-600 hover:text-red-800 font-medium text-sm">Learn More</button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 transition-transform duration-200 hover:transform hover:-translate-y-1">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Total Users</p>
                  <h3 className="text-2xl font-bold mt-1">{users.length}</h3>
                  <p className="text-green-500 text-xs mt-2"><i className="fas fa-arrow-up"></i> 12% from last month</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <i className="fas fa-users text-green-500"></i>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 transition-transform duration-200 hover:transform hover:-translate-y-1">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Active Coupons</p>
                  <h3 className="text-2xl font-bold mt-1">{activeCoupons}</h3>
                  <p className="text-green-500 text-xs mt-2"><i className="fas fa-arrow-up"></i> 5% from last week</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <i className="fas fa-ticket-alt text-blue-500"></i>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 transition-transform duration-200 hover:transform hover:-translate-y-1">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Transactions</p>
                  <h3 className="text-2xl font-bold mt-1">{transactions.length}</h3>
                  <p className="text-red-500 text-xs mt-2"><i className="fas fa-arrow-down"></i> 3% from yesterday</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <i className="fas fa-exchange-alt text-purple-500"></i>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 transition-transform duration-200 hover:transform hover:-translate-y-1">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">${totalRevenue.toFixed(2)}</h3>
                  <p className="text-green-500 text-xs mt-2"><i className="fas fa-arrow-up"></i> 20% from last month</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <i className="fas fa-dollar-sign text-yellow-500"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Charts and Data Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold">Recent Transactions</h3>
                <button className="text-green-500 text-sm font-medium">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500 text-sm border-b">
                      <th className="pb-3">User</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.length > 0 ? (
                      recentTransactions.map((transaction, index) => (
                        <tr key={index} className="text-sm border-b border-gray-100">
                          <td className="py-3">User {index + 1}</td>
                          <td className="py-3">Aug 30, 2025</td>
                          <td className="py-3">${transaction.amount || '0.00'}</td>
                          <td className="py-3">
                            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                              Completed
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="py-4 text-center text-gray-500">
                          No transactions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Coupon Usage */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold">Coupon Usage</h3>
                <button className="text-green-500 text-sm font-medium">View Report</button>
              </div>
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#eee"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeDasharray="70, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">90%</span>
                    </div>
                  </div>
                  <p className="text-gray-600">of coupons are being used</p>
                  <p className="text-sm text-gray-500 mt-2">Total coupons: {coupons.length}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardScreen;