'use client';

import { useState, useEffect } from 'react';
import { orderApi, branchApi } from '@/lib/api';
import { Order, Branch } from '@/types';

export default function Home() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [ordersData, branchesData] = await Promise.all([
          orderApi.getAll(),
          branchApi.getAll()
        ]);
        setOrders(ordersData);
        setBranches(branchesData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data. Make sure backend is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">BranchFlow Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Orders Section */}
        <section className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            <ul className="space-y-2">
              {orders.map((order) => (
                <li key={order.id} className="border-b pb-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{order.customerName}</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      order.status === 'PENDING' ? 'bg-yellow-100' :
                      order.status === 'PREPARING' ? 'bg-blue-100' :
                      order.status === 'READY' ? 'bg-green-100' :
                      'bg-gray-100'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Total: ${order.total} • Items: {order.items.length}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Branches Section */}
        <section className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Branches</h2>
          {branches.length === 0 ? (
            <p>No branches found</p>
          ) : (
            <ul className="space-y-2">
              {branches.map((branch) => (
                <li key={branch.id} className="border-b pb-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{branch.name}</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      branch.status === 'OPEN' ? 'bg-green-100' :
                      branch.status === 'BUSY' ? 'bg-orange-100' :
                      'bg-gray-100'
                    }`}>
                      {branch.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {branch.address} • {branch.phone}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}