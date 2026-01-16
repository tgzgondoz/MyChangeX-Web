import React, { useState, useEffect } from 'react';

// Simple icon components
const BarChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 20V10M18 20V4M6 20v-4"/>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m23 6-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/>
  </svg>
);

const DollarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const PackageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
    <path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);

const DashboardScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeUsers: 0,
    totalOrders: 0,
    growthRate: 0
  });

  // Mock data loading
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalRevenue: 45231.89,
        activeUsers: 5432,
        totalOrders: 1289,
        growthRate: 23.5
      });
    }, 1000);
  }, []);

  const menuItems = [
    { id: 'overview', icon: <BarChartIcon />, label: 'Overview' },
    { id: 'users', icon: <UsersIcon />, label: 'Users' },
    { id: 'revenue', icon: <DollarIcon />, label: 'Revenue' },
    { id: 'products', icon: <PackageIcon />, label: 'Products' },
    { id: 'analytics', icon: <TrendingUpIcon />, label: 'Analytics' },
    { id: 'settings', icon: <SettingsIcon />, label: 'Settings' },
  ];

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'placed a new order', time: '2 min ago' },
    { id: 2, user: 'Sarah Smith', action: 'updated profile', time: '15 min ago' },
    { id: 3, user: 'Mike Johnson', action: 'made a payment', time: '1 hour ago' },
    { id: 4, user: 'Emma Wilson', action: 'subscribed to premium', time: '3 hours ago' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300`}>
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h1 className="text-2xl font-bold text-gray-800">MYCHANGEX</h1>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center ${sidebarOpen ? 'justify-start px-4' : 'justify-center'} py-3 mb-2 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              {sidebarOpen && <span className="ml-3">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search analytics, reports, users..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-lg hover:bg-gray-100">
                <BellIcon />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                {sidebarOpen && (
                  <div>
                    <p className="font-medium">Admin User</p>
                    <p className="text-sm text-gray-500">admin@mychangex.com</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold mt-2">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <DollarIcon style={{ color: '#2563eb' }} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUpIcon style={{ color: '#10b981', marginRight: '0.25rem' }} />
              <span className="text-green-500 text-sm">+12.5% from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Users</p>
                <p className="text-2xl font-bold mt-2">{stats.activeUsers.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <UsersIcon style={{ color: '#059669' }} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUpIcon style={{ color: '#10b981', marginRight: '0.25rem' }} />
              <span className="text-green-500 text-sm">+8.2% from last week</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Orders</p>
                <p className="text-2xl font-bold mt-2">{stats.totalOrders.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <PackageIcon style={{ color: '#7c3aed' }} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUpIcon style={{ color: '#10b981', marginRight: '0.25rem' }} />
              <span className="text-green-500 text-sm">+23.1% from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray500 text-sm">Growth Rate</p>
                <p className="text-2xl font-bold mt-2">{stats.growthRate}%</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <TrendingUpIcon style={{ color: '#ea580c' }} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUpIcon style={{ color: '#10b981', marginRight: '0.25rem' }} />
              <span className="text-green-500 text-sm">+5.4% from last quarter</span>
            </div>
          </div>
        </div>

        {/* Charts and Recent Activity */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart Container */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Revenue Overview</h3>
              <div className="flex space-x-2">
                <button className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FilterIcon style={{ marginRight: '0.5rem' }} />
                  Filter
                </button>
                <button className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  <DownloadIcon style={{ marginRight: '0.5rem' }} />
                  Export
                </button>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Chart visualization would appear here</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <UsersIcon style={{ color: '#2563eb', width: '18', height: '18' }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">
                      <span className="text-gray-800">{activity.user}</span>{' '}
                      <span className="text-gray-600">{activity.action}</span>
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              View all activities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;