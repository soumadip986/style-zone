import React, { useState } from 'react';
import { MessageCircle, Search, CheckCircle2, Clock, Phone, ExternalLink, Trash2, Filter } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatCurrency } from '../../lib/formatters';

export function Enquiries() {
  const { shop, products } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample recorded enquiries with local storage persistence
  const [enquiries, setEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('sz_enquiries_log');
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    return [
      {
        id: 'enq-001',
        customer_name: 'Priyanka Sen',
        customer_phone: '+91 98311 22334',
        product_name: 'Pure Kanchipuram Gold Zari Bridal Silk Saree',
        product_price: 14499,
        size: 'Free Size (6.3m)',
        colour: 'Royal Crimson Red',
        quantity: 1,
        message: 'Is this piece available for in-store trial this Saturday?',
        status: 'pending',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        id: 'enq-002',
        customer_name: 'Rahul Mukherjee',
        customer_phone: '+91 98305 66778',
        product_name: 'Heritage Pure Linen Solid Shirt',
        product_price: 1999,
        size: 'L',
        colour: 'Ivory White',
        quantity: 2,
        message: 'Would like to confirm delivery to New Town area.',
        status: 'responded',
        created_at: new Date(Date.now() - 3600000 * 12).toISOString()
      },
      {
        id: 'enq-003',
        customer_name: 'Ananya Roy',
        customer_phone: '+91 98300 44556',
        product_name: 'Girls Sparkling Tulle Tiered Ballerina Frock',
        product_price: 1899,
        size: '6–8 Years',
        colour: 'Princess Blush Pink',
        quantity: 1,
        message: 'Looking for matching hair accessories as well.',
        status: 'completed',
        created_at: new Date(Date.now() - 3600000 * 28).toISOString()
      }
    ];
  });

  const handleUpdateStatus = (id, newStatus) => {
    const updated = enquiries.map((enq) => (enq.id === id ? { ...enq, status: newStatus } : enq));
    setEnquiries(updated);
    localStorage.setItem('sz_enquiries_log', JSON.stringify(updated));
  };

  const handleDeleteEnquiry = (id) => {
    if (window.confirm('Delete this enquiry record?')) {
      const updated = enquiries.filter((enq) => enq.id !== id);
      setEnquiries(updated);
      localStorage.setItem('sz_enquiries_log', JSON.stringify(updated));
    }
  };

  const handleReplyWhatsApp = (enq) => {
    const cleanPhone = enq.customer_phone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hello ${enq.customer_name}, thank you for contacting ${shop.name} regarding the ${enq.product_name} (${enq.size}, ${enq.colour}). We would love to assist you!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
    handleUpdateStatus(enq.id, 'responded');
  };

  const filtered = enquiries.filter((enq) => {
    if (statusFilter !== 'all' && enq.status !== statusFilter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const inName = enq.customer_name?.toLowerCase().includes(term);
      const inPhone = enq.customer_phone?.toLowerCase().includes(term);
      const inProd = enq.product_name?.toLowerCase().includes(term);
      if (!inName && !inPhone && !inProd) return false;
    }
    return true;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Customer WhatsApp Enquiries</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Track and manage product enquiries, customer callbacks, and fitting appointments.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <div className="admin-card-body" style={{ padding: '1rem 1.25rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['all', 'pending', 'responded', 'completed'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`size-pill-btn ${statusFilter === st ? 'selected' : ''}`}
                style={{ textTransform: 'capitalize', fontSize: '0.82rem', padding: '0.35rem 0.85rem' }}
              >
                {st}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
            <Search size={16} color="#888" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search customer, phone, product..."
              className="form-input"
              style={{ paddingLeft: '2.25rem', height: '38px', fontSize: '0.85rem' }}
            />
          </div>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Enquired Product</th>
                <th>Variant Specs</th>
                <th>Status</th>
                <th>Received</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                    No enquiry logs found.
                  </td>
                </tr>
              ) : (
                filtered.map((enq) => (
                  <tr key={enq.id}>
                    <td>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.92rem' }}>{enq.customer_name}</strong>
                        <a href={`tel:${enq.customer_phone}`} style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>
                          {enq.customer_phone}
                        </a>
                      </div>
                    </td>
                    <td>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.9rem' }}>{enq.product_name}</strong>
                        <span style={{ fontSize: '0.82rem', color: '#0f172a', fontWeight: 700 }}>
                          {formatCurrency(enq.product_price)}
                        </span>
                        {enq.message && (
                          <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '0.2rem 0 0 0', fontStyle: 'italic' }}>
                            "{enq.message}"
                          </p>
                        )}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.82rem', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginBottom: '2px' }}>
                        Size: <strong>{enq.size}</strong>
                      </span>
                      <br />
                      <span style={{ fontSize: '0.82rem', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px', display: 'inline-block' }}>
                        Colour: <strong>{enq.colour}</strong> (Qty: {enq.quantity})
                      </span>
                    </td>
                    <td>
                      <select
                        value={enq.status}
                        onChange={(e) => handleUpdateStatus(enq.id, e.target.value)}
                        className="form-select"
                        style={{
                          fontSize: '0.78rem',
                          padding: '0.3rem 0.6rem',
                          width: 'auto',
                          background:
                            enq.status === 'pending'
                              ? '#fffbeb'
                              : enq.status === 'responded'
                              ? '#eff6ff'
                              : '#f0fdf4',
                          color:
                            enq.status === 'pending'
                              ? '#b45309'
                              : enq.status === 'responded'
                              ? '#1d4ed8'
                              : '#15803d',
                          fontWeight: 700
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="responded">Responded</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {new Date(enq.created_at).toLocaleDateString()} {new Date(enq.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handleReplyWhatsApp(enq)}
                          className="btn btn-whatsapp btn-sm"
                          style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                          title="Reply on WhatsApp"
                        >
                          <MessageCircle size={14} />
                          <span>Reply</span>
                        </button>
                        <button
                          onClick={() => handleDeleteEnquiry(enq.id)}
                          className="btn btn-outline btn-sm"
                          style={{ color: '#ef4444' }}
                          title="Delete log"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
