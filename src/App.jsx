import { useState, useRef, useEffect } from 'react'

function App() {
    const [screen, setScreen] = useState('home') // 'home', 'camera', 'results'
    const [isCapturing, setIsCapturing] = useState(false)
    const [isCounting, setIsCounting] = useState(false)
    const [pillCount, setPillCount] = useState(0)
    const [predictions, setPredictions] = useState([])
    const [previewImage, setPreviewImage] = useState(null)
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
    const [error, setError] = useState('')

    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const fileInputRef = useRef(null)
    const streamRef = useRef(null)

    // Start camera
    const startCamera = async () => {
        try {
            setError('')
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
            })
            streamRef.current = stream
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
            setIsCapturing(true)
            setScreen('camera')
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

    // Capture photo from camera
    const capturePhoto = () => {
        if (!videoRef.current) return

        const video = videoRef.current
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext('2d')
        ctx.drawImage(video, 0, 0)

        const base64 = canvas.toDataURL('image/jpeg', 0.9)
        stopCamera()
        countPills(base64, video.videoWidth, video.videoHeight)
    }

    // Handle file upload
    const handleFileUpload = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            const base64 = event.target.result
            const img = new Image()
            img.onload = () => {
                countPills(base64, img.width, img.height)
            }
            img.src = base64
        }
        reader.readAsDataURL(file)
    }

    // Count pills using Roboflow API (same as CTMS)
    const countPills = async (base64Image, width, height) => {
        setIsCounting(true)
        setError('')
        setPreviewImage(base64Image)
        setImageSize({ width, height })
        setScreen('results')

        try {
            // Remove data:image/...;base64, prefix
            const base64Data = base64Image.split(',')[1] || base64Image

            // Call Roboflow API (same endpoint as CTMS)
            const response = await fetch('https://serverless.roboflow.com/pill-detection-eye/1?api_key=us5nPRXtK3HK3V4fF1DC', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: base64Data
            })

            const data = await response.json()
            console.log('🔬 Roboflow Response:', data)

            // Filter by confidence >= 50% (same as CTMS)
            let filteredPredictions = []
            if (data?.predictions && Array.isArray(data.predictions)) {
                filteredPredictions = data.predictions.filter(p => p.confidence >= 0.50)
                console.log(`📊 Filtered: ${data.predictions.length} → ${filteredPredictions.length} (≥50% confidence)`)
            }

            setPredictions(filteredPredictions)
            setPillCount(filteredPredictions.length)

            // Update image size from API response if available
            if (data?.image?.width && data?.image?.height) {
                setImageSize({ width: data.image.width, height: data.image.height })
            }

        } catch (err) {
            console.error('❌ Pill counting error:', err)
            setError('Failed to count pills. Please try again.')
            setPillCount(0)
            setPredictions([])
        } finally {
            setIsCounting(false)
        }
    }

    // Draw numbered pills on canvas (same visualization as CTMS)
    useEffect(() => {
        if (!canvasRef.current || !previewImage || predictions.length === 0) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const img = new Image()
        img.onload = () => {
            // Scale to fit container (max 400px width)
            const maxWidth = 400
            const scale = Math.min(1, maxWidth / img.width)
            canvas.width = img.width * scale
            canvas.height = img.height * scale

            // Draw image
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

            // Draw green numbers for each pill (same as CTMS)
            predictions.forEach((pill, index) => {
                const x = pill.x * scale
                const y = pill.y * scale

                // Font size based on scale
                const fontSize = Math.max(24 * scale, 16)
                ctx.font = `bold ${fontSize}px Arial`
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'

                // Black outline for visibility
                ctx.strokeStyle = '#000000'
                ctx.lineWidth = 3 * scale
                ctx.strokeText((index + 1).toString(), x, y)

                // Green number
                ctx.fillStyle = '#10b981'
                ctx.fillText((index + 1).toString(), x, y)
            })
        }
        img.src = previewImage
    }, [previewImage, predictions])

    // Reset and go home
    const goHome = () => {
        stopCamera()
        setScreen('home')
        setPillCount(0)
        setPredictions([])
        setPreviewImage(null)
        setError('')
    }

    return (
        <div className="app">
            {/* Header */}
            <header className="header">
                <div className="logo" onClick={goHome}>
                    <span className="logo-icon">💊</span>
                    <span className="logo-text">Count<span className="logo-rx">Rx</span></span>
                </div>
                {screen !== 'home' && (
                    <button className="back-btn" onClick={goHome}>✕</button>
                )}
            </header>

            {/* Home Screen */}
            {screen === 'home' && (
                <main className="home-screen">
                    <h1 className="tagline">Count pills instantly with AI</h1>

                    <div className="action-cards">
                        <button className="action-card" onClick={startCamera}>
                            <div className="card-icon">📷</div>
                            <div className="card-title">Take Photo</div>
                            <div className="card-desc">Use camera to capture pills</div>
                        </button>

                        <button className="action-card" onClick={() => fileInputRef.current?.click()}>
                            <div className="card-icon">🖼️</div>
                            <div className="card-title">Upload Image</div>
                            <div className="card-desc">Select from gallery</div>
                        </button>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                    />

                    {error && <div className="error-message">{error}</div>}
                </main>
            )}

            {/* Camera Screen */}
            {screen === 'camera' && (
                <main className="camera-screen">
                    <div className="camera-container">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="camera-video"
                        />
                        <div className="camera-overlay">
                            <p>Position pills in frame</p>
                        </div>
                    </div>

                    <div className="camera-controls">
                        <button className="capture-btn" onClick={capturePhoto}>
                            <div className="capture-btn-inner"></div>
                        </button>
                    </div>
                </main>
            )}

            {/* Results Screen */}
            {screen === 'results' && (
                <main className="results-screen">
                    {isCounting ? (
                        <div className="loading">
                            <div className="spinner"></div>
                            <p>Counting pills...</p>
                        </div>
                    ) : (
                        <>
                            <div className="count-result">
                                <span className="count-number">{pillCount}</span>
                                <span className="count-label">pills detected</span>
                            </div>

                            <div className="preview-container">
                                <canvas ref={canvasRef} className="preview-canvas" />
                            </div>

                            {error && <div className="error-message">{error}</div>}

                            <div className="result-actions">
                                <button className="btn-primary" onClick={goHome}>
                                    Count Again
                                </button>
                            </div>
                        </>
                    )}
                </main>
            )}

            {/* Footer */}
            <footer className="footer">
                <p>Powered by AI Vision</p>
            </footer>
        </div>
    )
}

export default App
