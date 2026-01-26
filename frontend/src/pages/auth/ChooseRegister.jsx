import React from 'react';
import { Link } from 'react-router-dom';
import { User, Store, ArrowRight } from 'lucide-react';
import '../../styles/auth-shared.css';

const ChooseRegister = () => {
  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="choose-register-title">
        <header>
          <h1 id="choose-register-title" className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Choose your account type to get started</p>
        </header>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {/* Primary Option - Normal User */}
          <Link 
            to="/user/register" 
            className="auth-submit" 
            style={{
              textDecoration: 'none',
              padding: 'var(--space-4)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              textAlign: 'left',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <User size={22} strokeWidth={2.5} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, marginBottom: '2px', fontSize: '1rem' }}>
                Personal Account
              </div>
              <div style={{ 
                fontSize: '0.8rem', 
                opacity: 0.9, 
                fontWeight: 400,
                letterSpacing: '0.3px'
              }}>
                For individual users and customers
              </div>
            </div>
            <ArrowRight size={20} strokeWidth={2.5} style={{ flexShrink: 0, opacity: 0.8 }} />
          </Link>

          {/* Secondary Option - Food Partner */}
          <Link 
            to="/food-partner/register" 
            className="auth-submit" 
            style={{
              textDecoration: 'none',
              background: 'var(--color-surface-alt)',
              color: 'var(--color-text)',
              border: '2px solid var(--color-border)',
              padding: 'var(--space-4)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              textAlign: 'left',
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color var(--transition-base), background var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.background = 'var(--color-surface)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.background = 'var(--color-surface-alt)';
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              background: 'var(--color-accent)',
              color: '#fff',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Store size={22} strokeWidth={2.5} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, marginBottom: '2px', fontSize: '1rem' }}>
                Business Account
              </div>
              <div style={{ 
                fontSize: '0.8rem', 
                color: 'var(--color-text-secondary)',
                fontWeight: 400,
                letterSpacing: '0.3px'
              }}>
                For restaurants and food vendors
              </div>
            </div>
            <ArrowRight size={20} strokeWidth={2.5} style={{ flexShrink: 0, opacity: 0.5 }} />
          </Link>
        </div>

        <div className="auth-alt-action" style={{ 
          marginTop: 'var(--space-3)', 
          paddingTop: 'var(--space-4)', 
          borderTop: '1px solid var(--color-border)' 
        }}>
          Already have an account? <Link to="/user/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseRegister;
