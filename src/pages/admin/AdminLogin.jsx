import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useShop } from '../../context/ShopContext';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, enableDemoLogin, isSupabaseConfigured } = useAuth();
  const { shop } = useShop();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async () => {
    setEmail('admin@stylezone.com');
    setPassword('admin123');
    setErrorMsg('');
    setLoading(true);

    try {
      await login('admin@stylezone.com', 'admin123');
      navigate('/admin');
    } catch (err) {
      setErrorMsg(err.message || 'Demo login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0d0d10',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        color: '#ffffff'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: '#16161c',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid #282834',
          padding: 'clamp(2rem, 5vw, 3rem)',
          boxShadow: 'var(--shadow-xl)'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'rgba(197, 157, 95, 0.15)',
              border: '1px solid rgba(197, 157, 95, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}
          >
            <ShieldCheck size={28} color="var(--accent)" />
          </div>

          <h1 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.4rem' }}>
            Boutique Admin Portal
          </h1>
          <p style={{ color: '#8c8c9a', fontSize: '0.88rem' }}>
            {shop.name || 'Style Zone'} Store Management Console
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              color: '#fca5a5',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              marginBottom: '1.5rem'
            }}
          >
            <AlertCircle size={16} color="#ef4444" style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label" style={{ color: '#d0d0dc' }}>
              Admin Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#777" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@stylezone.com"
                className="form-input"
                style={{
                  background: '#0d0d12',
                  border: '1px solid #2f2f3e',
                  color: '#fff',
                  paddingLeft: '2.75rem'
                }}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <label className="form-label" style={{ color: '#d0d0dc' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#777" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                style={{
                  background: '#0d0d12',
                  border: '1px solid #2f2f3e',
                  color: '#fff',
                  paddingLeft: '2.75rem'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-accent btn-block btn-lg"
            style={{ marginBottom: '1.25rem' }}
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Demo Fast Login Helper */}
        {enableDemoLogin && (
          <div style={{ borderTop: '1px solid #282834', paddingTop: '1.25rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.78rem', color: '#888', marginBottom: '0.75rem' }}>
              Demo / Test Mode Active (admin@stylezone.com / admin123)
            </p>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              disabled={loading}
              className="btn btn-outline btn-block btn-sm"
              style={{ color: '#c59d5f', borderColor: '#483c2a' }}
            >
              <Sparkles size={14} />
              <span>One-Click Demo Login</span>
            </button>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/" style={{ color: '#777', fontSize: '0.82rem' }}>
            ← Return to Store Front
          </Link>
        </div>
      </div>
    </div>
  );
}
