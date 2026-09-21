import React, { useState } from 'react';
import { ShieldCheck, User, Lock, Check, AlertCircle, Save, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export function AdminProfile() {
  const { user, logout, isSupabaseConfigured: isSupabaseActive } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });

    if (newPassword.length < 6) {
      setMsg({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMsg({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setLoading(true);

    if (isSupabaseActive && supabase) {
      try {
        const { error } = await supabase.auth.updateUser({
          password: newPassword
        });
        if (error) throw error;
        setMsg({ type: 'success', text: 'Password updated successfully in Supabase Auth!' });
        setNewPassword('');
        setConfirmPassword('');
      } catch (err) {
        setMsg({ type: 'error', text: err.message || 'Failed to update password.' });
      } finally {
        setLoading(false);
      }
    } else {
      // Local demo mode
      setTimeout(() => {
        setMsg({ type: 'success', text: 'Demo admin password simulated update.' });
        setNewPassword('');
        setConfirmPassword('');
        setLoading(false);
      }, 500);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Admin Account & Security</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Manage authorized credentials, authentication credentials, and session tokens.
          </p>
        </div>

        <button onClick={handleLogout} className="btn btn-outline btn-sm" style={{ color: '#ef4444' }}>
          <LogOut size={14} />
          <span>Log Out</span>
        </button>
      </div>

      {msg.text && (
        <div
          style={{
            background: msg.type === 'error' ? '#fef2f2' : '#f0fdf4',
            border: `1px solid ${msg.type === 'error' ? '#fca5a5' : '#86efac'}`,
            borderRadius: '8px',
            padding: '0.75rem 1.25rem',
            color: msg.type === 'error' ? '#b91c1c' : '#15803d',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginBottom: '1.5rem'
          }}
        >
          {msg.type === 'error' ? <AlertCircle size={16} /> : <Check size={16} />}
          <span>{msg.text}</span>
        </div>
      )}

      {/* Account Info */}
      <div className="admin-card">
        <div className="admin-card-header">
          <span className="admin-card-title">1. Administrator Profile</span>
        </div>
        <div className="admin-card-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--accent)',
                color: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.6rem'
              }}
            >
              {user?.email ? user.email.charAt(0).toUpperCase() : 'A'}
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>
                {user?.user_metadata?.full_name || 'Boutique Store Administrator'}
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', margin: 0 }}>
                {user?.email || 'admin@stylezone.com'}
              </p>
              <span className="badge badge-stock-in" style={{ marginTop: '0.4rem' }}>
                Super Admin Role
              </span>
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.82rem', color: '#64748b' }}>
            <p style={{ margin: '0 0 0.35rem 0' }}>
              <strong>Authentication Mode:</strong> {isSupabaseActive ? 'Supabase PostgreSQL Auth' : 'Local Developer Demo Session'}
            </p>
            <p style={{ margin: 0 }}>
              <strong>User ID:</strong> {user?.id || 'demo-admin-session'}
            </p>
          </div>
        </div>
      </div>

      {/* Update Password Form */}
      <div className="admin-card">
        <div className="admin-card-header">
          <span className="admin-card-title">2. Change Password</span>
        </div>
        <div className="admin-card-body">
          <form onSubmit={handleUpdatePassword}>
            <div className="form-group">
              <label className="form-label">New Password (Min. 6 characters)</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                style={{ maxWidth: '400px' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                style={{ maxWidth: '400px' }}
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
              <Save size={16} />
              <span>{loading ? 'Updating...' : 'Update Password'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
