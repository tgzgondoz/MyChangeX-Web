import './App.css';
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import LoadingScreen from './components/LoadingScreen';
import DashboardScreen from './components/DashboardScreen';

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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const database = firebase.database();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Simulate initial loading process
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Fetch data from Firebase
  useEffect(() => {
    if (isLoading) return; // Don't fetch data until initial loading is complete
    
    const fetchData = async () => {
      try {
        setDataLoading(true);
        
        // Fetch users data
        const usersRef = database.ref('users');
        usersRef.on('value', (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUsers(Object.values(data));
          }
        });

        // Fetch coupons data
        const couponsRef = database.ref('coupons');
        couponsRef.on('value', (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setCoupons(Object.values(data));
          }
        });

        // Fetch transactions data
        const transactionsRef = database.ref('transactions');
        transactionsRef.on('value', (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setTransactions(Object.values(data));
          }
          setDataLoading(false);
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
        setDataLoading(false);
      }
    };

    fetchData();

    // Cleanup function to remove listeners
    return () => {
      database.ref('users').off();
      database.ref('coupons').off();
      database.ref('transactions').off();
    };
  }, [isLoading]);

  return (
    <div className="App">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <DashboardScreen 
          users={users}
          coupons={coupons}
          transactions={transactions}
          dataLoading={dataLoading}
        />
      )}
    </div>
  );
}

export default App;