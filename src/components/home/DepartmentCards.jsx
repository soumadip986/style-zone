import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { DEPARTMENT_METADATA } from '../../lib/initialData';

export function DepartmentCards() {
  const departments = [
    {
      key: 'kids',
      name: 'Kids (0–16Y)',
      desc: 'Soft organic rompers, festive frocks & playful casuals.',
      image: DEPARTMENT_METADATA.kids.image,
      path: '/department/kids',
      tag: 'BABY & KIDS'
    },
    {
      key: 'boys',
      name: 'Boys Collection',
      desc: 'Checked Oxford shirts, utility cargos & ethnic kurtas.',
      image: DEPARTMENT_METADATA.boys.image,
      path: '/department/boys',
      tag: 'JUNIOR'
    },
    {
      key: 'girls',
      name: 'Girls Collection',
      desc: 'Tulle ballroom dresses, lehengas & chic separates.',
      image: DEPARTMENT_METADATA.girls.image,
      path: '/department/girls',
      tag: 'FAIRYTALE'
    },
    {
      key: 'men',
      name: 'Men’s Apparel',
      desc: 'French linen shirts, wide leg trousers & bespoke sherwanis.',
      image: DEPARTMENT_METADATA.men.image,
      path: '/department/men',
      tag: 'TAILORED'
    },
    {
      key: 'women',
      name: 'Women’s Couture',
      desc: 'Handloom Kanjivarams, Banarasi silks & satin gowns.',
      image: DEPARTMENT_METADATA.women.image,
      path: '/department/women',
      tag: 'ROYAL HERITAGE'
    }
  ];

  return (
    <section className="section-spacing" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">5 CORE DEPARTMENTS</span>
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">
            Explore carefully crafted wardrobes for every generation and special occasion.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {departments.map((dept) => (
            <Link
              key={dept.key}
              to={dept.path}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                aspectRatio: '3/4',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.5rem',
                textDecoration: 'none',
                color: '#fff',
                boxShadow: 'var(--shadow-md)',
                transition: 'transform var(--transition-base), box-shadow var(--transition-base)'
              }}
              className="dept-card"
            >
              {/* Background Image */}
              <img
                src={dept.image}
                alt={dept.name}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  zIndex: 0
                }}
              />

              {/* Dark Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10, 10, 12, 0.92) 0%, rgba(10, 10, 12, 0.4) 50%, rgba(10, 10, 12, 0.1) 100%)',
                  zIndex: 1
                }}
              />

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    letterSpacing: '0.15em',
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.35rem'
                  }}
                >
                  {dept.tag}
                </span>

                <h3
                  style={{
                    color: '#fff',
                    fontSize: '1.4rem',
                    marginBottom: '0.4rem',
                    lineHeight: 1.2
                  }}
                >
                  {dept.name}
                </h3>

                <p
                  style={{
                    color: '#ccc',
                    fontSize: '0.82rem',
                    lineHeight: 1.4,
                    marginBottom: '1rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {dept.desc}
                </p>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#fff',
                    borderBottom: '2px solid var(--accent)',
                    paddingBottom: '2px'
                  }}
                >
                  <span>Explore Collection</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
