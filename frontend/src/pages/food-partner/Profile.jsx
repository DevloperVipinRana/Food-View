import React, { useState, useEffect } from 'react'
import '../../styles/profile.css'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPin, Package, Phone, User, ArrowLeft } from 'lucide-react'
import axios from 'axios'
import API_BASE_URL from '../../config'

const Profile = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [profile, setProfile] = useState(null)
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedVideo, setSelectedVideo] = useState(null)

    useEffect(() => {
        setLoading(true)
        axios.get(`${API_BASE_URL}/api/food-partner/${id}`, { withCredentials: true })
            .then(response => {
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [id])

    const handleVideoClick = (video) => {
        setSelectedVideo(video)
    }

    const closeModal = () => {
        setSelectedVideo(null)
    }

    if (loading) {
        return (
            <main className="profile-page">
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    minHeight: '50vh',
                    color: 'var(--color-text-secondary)'
                }}>
                    Loading...
                </div>
            </main>
        )
    }

    return (
        <main className="profile-page">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                style={{
                    position: 'absolute',
                    top: 'calc(env(safe-area-inset-top, 0) + 16px)',
                    left: '16px',
                    zIndex: 100,
                    width: '44px',
                    height: '44px',
                    borderRadius: '999px',
                    display: 'grid',
                    placeItems: 'center',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                }}
                onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'translateY(1px)'
                }}
                onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                }}
                aria-label="Go back"
            >
                <ArrowLeft size={20} strokeWidth={2.5} color="var(--color-text)" />
            </button>

            <section className="profile-header">
                <div className="profile-meta">
                    <div style={{ position: 'relative' }}>
                        <img 
                            className="profile-avatar" 
                            src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D" 
                            alt={`${profile?.name} avatar`}
                            style={{
                                border: '3px solid var(--color-accent)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: '4px',
                            right: '4px',
                            width: '20px',
                            height: '20px',
                            borderRadius: '999px',
                            background: '#10b981',
                            border: '3px solid var(--color-surface)',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }} title="Active" />
                    </div>

                    <div className="profile-info">
                        <h1 className="profile-business" title="Business name">
                            {profile?.name}
                        </h1>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <MapPin size={16} color="var(--color-text-secondary)" />
                                <p className="profile-address" title="Address">
                                    {profile?.address}
                                </p>
                            </div>
                            {profile?.phone && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Phone size={16} color="var(--color-text-secondary)" />
                                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                        {profile.phone}
                                    </span>
                                </div>
                            )}
                            {profile?.contactName && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <User size={16} color="var(--color-text-secondary)" />
                                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                        {profile.contactName}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="profile-stats" role="list" aria-label="Stats">
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">
                            <Package size={18} style={{ marginRight: '6px' }} />
                            total meals
                        </span>
                        <span className="profile-stat-value">{videos.length}</span>
                    </div>
                </div>
            </section>

            <hr className="profile-sep" />

            <section className="profile-grid" aria-label="Videos">
                {videos.length === 0 ? (
                    <div style={{
                        gridColumn: '1 / -1',
                        textAlign: 'center',
                        padding: '48px 24px',
                        color: 'var(--color-text-secondary)'
                    }}>
                        <Package size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
                        <p>No meals posted yet</p>
                    </div>
                ) : (
                    videos.map((v) => (
                        <div 
                            key={v._id} 
                            className="profile-grid-item"
                            onClick={() => handleVideoClick(v)}
                            style={{
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={(e) => {
                                const overlay = e.currentTarget.querySelector('.video-overlay')
                                if (overlay) overlay.style.opacity = '1'
                            }}
                            onMouseLeave={(e) => {
                                const overlay = e.currentTarget.querySelector('.video-overlay')
                                if (overlay) overlay.style.opacity = '0'
                            }}
                        >
                            <video
                                className="profile-grid-video"
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                src={v.video}
                                muted
                            />
                            <div 
                                className="video-overlay"
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'rgba(0,0,0,0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: 0,
                                    transition: 'opacity 0.2s ease'
                                }}
                            >
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="white" opacity="0.9">
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                            </div>
                        </div>
                    ))
                )}
            </section>

            {/* Video Modal */}
            {selectedVideo && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.9)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}
                    onClick={closeModal}
                >
                    <button
                        onClick={closeModal}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            width: '44px',
                            height: '44px',
                            borderRadius: '999px',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'grid',
                            placeItems: 'center'
                        }}
                        aria-label="Close"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                    
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: '90vw',
                            maxHeight: '90vh',
                            position: 'relative'
                        }}
                    >
                        <video
                            src={selectedVideo.video}
                            controls
                            autoPlay
                            style={{
                                maxWidth: '100%',
                                maxHeight: '90vh',
                                borderRadius: '8px'
                            }}
                        />
                        {selectedVideo.description && (
                            <div style={{
                                marginTop: '12px',
                                color: 'white',
                                textAlign: 'center',
                                fontSize: '0.95rem'
                            }}>
                                {selectedVideo.description}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    )
}

export default Profile

