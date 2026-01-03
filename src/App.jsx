import { useState, useRef, useEffect } from 'react'

// SVG Icons as components
const Icons = {
    pill: () => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="10" width="18" height="8" rx="4" fill="#3b82f6" />
            <rect x="12" y="10" width="9" height="8" rx="4" fill="#60a5fa" />
        </svg>
    ),
    menu: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
    ),
    user: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#6366f1">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
        </svg>
    ),
    camera: () => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" fill="#3b82f6" />
        </svg>
    ),
    home: () => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
    ),
    // Blue pill icon for Quick Count tab
    pillScan: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <ellipse cx="12" cy="12" rx="8" ry="4" fill="currentColor" transform="rotate(-45 12 12)" />
            <ellipse cx="12" cy="12" rx="8" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(-45 12 12)" />
            <line x1="12" y1="12" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    ),
    settings: () => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    ),
    back: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
        </svg>
    ),
    chevron: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
        </svg>
    ),
    gallery: () => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" fill="#374151" />
            <circle cx="8" cy="8" r="2" fill="#9ca3af" />
            <path d="M21 15l-5-5L5 21h14a2 2 0 0 0 2-2v-4z" fill="#6b7280" />
        </svg>
    ),
    flash: () => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    ),
    notification: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#3b82f6">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
    ),
    support: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#3b82f6">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    ),
    document: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#3b82f6">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" fill="none" stroke="white" strokeWidth="1" />
        </svg>
    )
}

function App() {
    const [activeTab, setActiveTab] = useState('home')
    const [countScreen, setCountScreen] = useState('camera')
    const [countMode, setCountMode] = useState('photo')
    const [isCapturing, setIsCapturing] = useState(false)
    const [isCounting, setIsCounting] = useState(false)
    const [pillCount, setPillCount] = useState(0)
    const [predictions, setPredictions] = useState([])
    const [previewImage, setPreviewImage] = useState(null)
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
    const [error, setError] = useState('')
    const [history, setHistory] = useState([])
    const [flashOn, setFlashOn] = useState(false)

    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const fileInputRef = useRef(null)
    const streamRef = useRef(null)

    // Load history from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('countrx-history')
        if (saved) {
            try {
                setHistory(JSON.parse(saved))
            } catch (e) {
                console.error('Failed to load history')
            }
        }
    }, [])

    // Save history to localStorage
    const saveToHistory = (image, count) => {
        const newEntry = {
            id: Date.now(),
            image: image,
            count: count,
            date: new Date().toLocaleDateString()
        }
        const newHistory = [newEntry, ...history].slice(0, 5)
        setHistory(newHistory)
        localStorage.setItem('countrx-history', JSON.stringify(newHistory))
    }

    // Clear history
    const clearHistory = () => {
        setHistory([])
        localStorage.removeItem('countrx-history')
    }

    // Start camera
    const startCamera = async () => {
        try {
            setError('')
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment',
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                }
            })
            streamRef.current = stream
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
            setIsCapturing(true)
        } catch (err) {
            setError('Camera access denied. Please allow camera permissions.')
            console.error('Camera error:', err)
        }
    }

    // Stop camera
    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop())
            streamRef.current = null
        }
        setIsCapturing(false)
    }

    // Handle tab change
    const handleTabChange = (tab) => {
        if (tab !== 'count') {
            stopCamera()
            setCountScreen('camera')
        }
        setActiveTab(tab)
        if (tab === 'count') {
            startCamera()
        }
    }

    // Capture photo - simple version
    const capturePhoto = () => {
        if (!videoRef.current) return
        const video = videoRef.current

        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        const ctx = canvas.getContext('2d')
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        const base64 = canvas.toDataURL('image/jpeg', 0.9)

        stopCamera()
        countPills(base64, canvas.width, canvas.height)
    }

    // Handle file upload
    const handleFileUpload = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (event) => {
            const base64 = event.target.result
            const img = new Image()
            img.onload = () => countPills(base64, img.width, img.height)
            img.src = base64
        }
        reader.readAsDataURL(file)
    }

    // Count pills using Roboflow API
    const countPills = async (base64Image, width, height) => {
        setIsCounting(true)
        setError('')
        setPreviewImage(base64Image)
        setImageSize({ width, height })
        setActiveTab('count')  // Switch to count tab to show results
        setCountScreen('results')

        try {
            const base64Data = base64Image.split(',')[1] || base64Image
            const response = await fetch('https://serverless.roboflow.com/pill-detection-eye/1?api_key=us5nPRXtK3HK3V4fF1DC', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: base64Data
            })
            const data = await response.json()
            console.log('🔬 Roboflow Response:', data)

            let filteredPredictions = []

            if (data?.predictions && Array.isArray(data.predictions)) {
                // 70% confidence threshold
                filteredPredictions = data.predictions.filter(p => p.confidence >= 0.70)
            }

            setPredictions(filteredPredictions)
            setPillCount(filteredPredictions.length)

            if (data?.image?.width && data?.image?.height) {
                setImageSize({ width: data.image.width, height: data.image.height })
            }

            // Save to history
            if (filteredPredictions.length > 0) {
                saveToHistory(base64Image, filteredPredictions.length)
            }
        } catch (err) {
            console.error('Pill counting error:', err)
            setError('Failed to count pills. Please try again.')
            setPillCount(0)
            setPredictions([])
        } finally {
            setIsCounting(false)
        }
    }

    // Draw numbered pills on canvas
    useEffect(() => {
        if (!canvasRef.current || !previewImage || predictions.length === 0) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const img = new Image()
        img.onload = () => {
            // FIX: Use full image dimensions, no scaling
            canvas.width = img.width
            canvas.height = img.height

            // Draw full image
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

            predictions.forEach((pill, index) => {
                const x = pill.x
                const y = pill.y
                const fontSize = Math.max(24, 18)

                ctx.font = `bold ${fontSize}px Arial`
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.strokeStyle = '#ffffff'
                ctx.lineWidth = 3
                ctx.strokeText((index + 1).toString(), x, y)
                ctx.fillStyle = '#2563eb'
                ctx.fillText((index + 1).toString(), x, y)
            })
        }
        img.src = previewImage
    }, [previewImage, predictions])

    const goBackToCamera = () => {
        setCountScreen('camera')
        setPillCount(0)
        setPredictions([])
        setPreviewImage(null)
        setError('')
        startCamera()
    }

    // Placeholder history items
    const displayHistory = history.length > 0 ? history : [
        { id: 1, placeholder: true },
        { id: 2, placeholder: true },
        { id: 3, placeholder: true }
    ]

    return (
        <div className="app">
            {/* HOME TAB */}
            {activeTab === 'home' && (
                <div className="page home-page">
                    <header className="header">
                        <div className="logo">
                            <Icons.pill />
                            <span className="logo-text">CountRx</span>
                        </div>
                        <button className="menu-btn"><Icons.menu /></button>
                    </header>

                    <main className="home-content">
                        <div className="user-card">
                            <Icons.user />
                            <span className="user-email">user@email.com</span>
                            <Icons.chevron />
                        </div>

                        <button className="start-btn" onClick={() => handleTabChange('count')}>
                            <Icons.camera />
                            <span>Start Counting</span>
                        </button>

                        {/* Only show history section if there's actual history */}
                        {history.length > 0 && (
                            <div className="history-section">
                                <div className="history-header">
                                    <h3>Recent History</h3>
                                    <button className="clear-btn" onClick={clearHistory}>Clear</button>
                                </div>
                                <div className="history-carousel">
                                    {history.map((item) => (
                                        <div key={item.id} className="history-item">
                                            <img src={item.image} alt={`${item.count} pills`} />
                                            <span className="history-count">{item.count}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="carousel-dots">
                                    {history.slice(0, 4).map((_, i) => (
                                        <span key={i} className={`dot ${i === 0 ? 'active' : ''}`} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Empty state when no history */}
                        {history.length === 0 && (
                            <div className="empty-state">
                                <div className="empty-icon">📷</div>
                                <p>No scans yet</p>
                                <p className="empty-hint">Tap Start Counting to begin</p>
                            </div>
                        )}
                    </main>
                </div>
            )}

            {/* COUNT TAB - FULL SCREEN DARK */}
            {activeTab === 'count' && (
                <div className="page count-page fullscreen-dark">
                    {countScreen === 'camera' && (
                        <>
                            <header className="camera-header">
                                <button className="close-btn" onClick={() => handleTabChange('home')}>✕</button>
                                <div className="mode-toggle">
                                    <button className={`mode-btn ${countMode === 'photo' ? 'active' : ''}`} onClick={() => setCountMode('photo')}>Photo</button>
                                    <button className={`mode-btn ${countMode === 'live' ? 'active' : ''}`} onClick={() => setCountMode('live')}>Live</button>
                                </div>
                                <div style={{ width: 40 }} />
                            </header>

                            <div className="camera-fullscreen">
                                <video ref={videoRef} autoPlay playsInline muted className="camera-video" />
                            </div>

                            <div className="camera-bottom">
                                <div className="gallery-thumb" onClick={() => fileInputRef.current?.click()}>
                                    {history.length > 0 && history[0].image && (
                                        <img src={history[0].image} alt="Gallery" />
                                    )}
                                </div>
                                <button className="capture-btn-dark" onClick={capturePhoto}>
                                    <div className="capture-ring" />
                                </button>
                                <div style={{ width: 50 }} />
                            </div>

                            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                        </>
                    )}

                    {countScreen === 'results' && (
                        <div className="results-fullscreen">
                            <header className="camera-header">
                                <button className="close-btn" onClick={goBackToCamera}>✕</button>
                                <h1 className="results-title">Results</h1>
                                <div style={{ width: 40 }} />
                            </header>

                            {isCounting ? (
                                <div className="loading-dark"><div className="spinner-dark" /><p>Analyzing pills...</p></div>
                            ) : (
                                <>
                                    <div className="result-card-dark">
                                        <div className="result-number-dark">{pillCount}</div>
                                        <div className="result-label-dark">Pills Detected</div>
                                    </div>
                                    <div className="preview-container-dark"><canvas ref={canvasRef} className="preview-canvas" /></div>
                                    {error && <div className="error-message">{error}</div>}
                                    <button className="count-again-btn" onClick={goBackToCamera}>Count Again</button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
                <div className="page settings-page">
                    <header className="header header-simple">
                        <button className="back-btn" onClick={() => handleTabChange('home')}><Icons.back /></button>
                        <h1 className="page-title">Settings</h1>
                        <div style={{ width: 40 }} />
                    </header>

                    <main className="settings-content">
                        <div className="profile-card">
                            <div className="avatar"><Icons.user /></div>
                            <div className="profile-info">
                                <div className="profile-name">Guest User</div>
                                <div className="profile-email">user@email.com</div>
                            </div>
                        </div>

                        <div className="settings-list">
                            <button className="settings-item">
                                <Icons.notification />
                                <span className="settings-label">Notification Settings</span>
                                <Icons.chevron />
                            </button>
                            <button className="settings-item">
                                <Icons.support />
                                <span className="settings-label">Customer Support</span>
                                <Icons.chevron />
                            </button>
                            <button className="settings-item">
                                <Icons.document />
                                <span className="settings-label">Terms and Conditions</span>
                                <Icons.chevron />
                            </button>
                        </div>

                        <div className="version">Ver. 1.0.0</div>
                    </main>
                </div>
            )}

            {/* BOTTOM TAB BAR */}
            <nav className="tab-bar">
                <button className={`tab ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleTabChange('home')}>
                    <Icons.home />
                    <span className="tab-label">Home</span>
                </button>
                <button className={`tab ${activeTab === 'count' ? 'active' : ''}`} onClick={() => handleTabChange('count')}>
                    <Icons.pillScan />
                    <span className="tab-label">Quick Count</span>
                </button>
                <button className={`tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => handleTabChange('settings')}>
                    <Icons.settings />
                    <span className="tab-label">Settings</span>
                </button>
            </nav>
        </div>
    )
}

export default App
