// import React, { useEffect, useRef } from "react"

// export default function Lanyard3D() {
//   const canvasRef = useRef(null)

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return
//     const ctx = canvas.getContext("2d")
    
//     let width = canvas.width = canvas.offsetWidth
//     let height = canvas.height = canvas.offsetHeight
    
//     // Titik tumpu gantungan atas (Model V lebar)
//     const pinOffset = 80 
//     let pinLeftX = width / 2 - pinOffset
//     let pinRightX = width / 2 + pinOffset
//     let pinY = 40 
    
//     // Parameter Fisika Mulus & Lembut
//     const totalNodes = 10 
//     const spacing = 18    
//     const gravity = 0.25 
//     const constraintIterations = 12

//     const leftNodes = []
//     const rightNodes = []

//     for (let i = 0; i < totalNodes; i++) {
//       leftNodes.push({ x: pinLeftX, y: pinY + i * spacing, oldX: pinLeftX, oldY: pinY + i * spacing })
//       rightNodes.push({ x: pinRightX, y: pinY + i * spacing, oldX: pinRightX, oldY: pinY + i * spacing })
//     }
    
//     const cardWidth = 110
//     const cardHeight = 160
    
//     // Titik pusat atas kartu tempat bertemunya tali V
//     let cardX = width / 2
//     let cardY = pinY + totalNodes * spacing
//     let cardOldX = cardX
//     let cardOldY = cardY
//     let cardAngle = 0

//     let isDragging = false
//     let mouseX = 0
//     let mouseY = 0
    
//     const handleResize = () => {
//       if (!canvas) return
//       width = canvas.width = canvas.offsetWidth
//       height = canvas.height = canvas.offsetHeight
//       pinLeftX = width / 2 - pinOffset
//       pinRightX = width / 2 + pinOffset
//     }
//     window.addEventListener("resize", handleResize)

//     const getMousePos = (e) => {
//       const rect = canvas.getBoundingClientRect()
//       const clientX = e.touches ? e.touches[0].clientX : e.clientX
//       const clientY = e.touches ? e.touches[0].clientY : e.clientY
//       return { x: clientX - rect.left, y: clientY - rect.top }
//     }

//     const onStart = (e) => {
//       const pos = getMousePos(e)
//       if (
//         pos.x > cardX - cardWidth / 2 &&
//         pos.x < cardX + cardWidth / 2 &&
//         pos.y > cardY &&
//         pos.y < cardY + cardHeight
//       ) {
//         isDragging = true
//         mouseX = pos.x
//         mouseY = pos.y
//       }
//     }

//     const onMove = (e) => {
//       if (!isDragging) return
//       const pos = getMousePos(e)
//       mouseX = pos.x
//       mouseY = pos.y
//     }

//     const onEnd = () => { isDragging = false }

//     canvas.addEventListener("mousedown", onStart)
//     canvas.addEventListener("mousemove", onMove)
//     window.addEventListener("mouseup", onEnd)
//     canvas.addEventListener("touchstart", onStart)
//     canvas.addEventListener("touchmove", onMove)
//     window.addEventListener("touchend", onEnd)

//     const satisfyLink = (n1, n2, targetDist, softFactor = 0.2) => {
//       const dx = n2.x - n1.x
//       const dy = n2.y - n1.y
//       const dist = Math.sqrt(dx * dx + dy * dy)
//       if (dist === 0) return { offsetX: 0, offsetY: 0 }
//       const diff = targetDist - dist
//       const percent = (diff / dist) * softFactor
//       return { offsetX: dx * percent, offsetY: dy * percent }
//     }

//     const updatePhysics = () => {
//       // 1. Fisika Tali Kiri
//       for (let i = 1; i < totalNodes; i++) {
//         const n = leftNodes[i]
//         const vx = (n.x - n.oldX) * 0.96
//         const vy = (n.y - n.oldY) * 0.96
//         n.oldX = n.x; n.oldY = n.y
//         n.x += vx; n.y += vy + gravity
//       }

//       // 2. Fisika Tali Kanan
//       for (let i = 1; i < totalNodes; i++) {
//         const n = rightNodes[i]
//         const vx = (n.x - n.oldX) * 0.96
//         const vy = (n.y - n.oldY) * 0.96
//         n.oldX = n.x; n.oldY = n.y
//         n.x += vx; n.y += vy + gravity
//       }

//       // 3. Fisika ID Card
//       const cvx = (cardX - cardOldX) * 0.95
//       const cvy = (cardY - cardOldY) * 0.95
//       cardOldX = cardX; cardOldY = cardY
//       cardX += cvx
//       cardY += cvy + gravity

//       if (isDragging) {
//         cardX = mouseX
//         cardY = mouseY 
//       }

//       // 4. Koreksi Jarak Tali dan Pertemuan V
//       for (let sim = 0; sim < constraintIterations; sim++) {
//         leftNodes[0].x = pinLeftX; leftNodes[0].y = pinY
//         rightNodes[0].x = pinRightX; rightNodes[0].y = pinY

//         for (let i = 0; i < totalNodes - 1; i++) {
//           const res = satisfyLink(leftNodes[i], leftNodes[i+1], spacing)
//           if (i !== 0) { leftNodes[i].x -= res.offsetX; leftNodes[i].y -= res.offsetY }
//           leftNodes[i+1].x += res.offsetX; leftNodes[i+1].y += res.offsetY
//         }

//         for (let i = 0; i < totalNodes - 1; i++) {
//           const res = satisfyLink(rightNodes[i], rightNodes[i+1], spacing)
//           if (i !== 0) { rightNodes[i].x -= res.offsetX; rightNodes[i].y -= res.offsetY }
//           rightNodes[i+1].x += res.offsetX; rightNodes[i+1].y += res.offsetY
//         }

//         // Kunci ujung kedua tali di tengah atas kartu
//         const endL = leftNodes[totalNodes - 1]
//         const resL = satisfyLink(endL, { x: cardX, y: cardY }, 0, 0.2)
//         endL.x -= resL.offsetX; endL.y -= resL.offsetY
//         cardX += resL.offsetX; cardY += resL.offsetY

//         const endR = rightNodes[totalNodes - 1]
//         const resR = satisfyLink(endR, { x: cardX, y: cardY }, 0, 0.2)
//         endR.x -= resR.offsetX; endR.y -= resR.offsetY
//         cardX += resR.offsetX; cardY += resR.offsetY
//       }

//       // Hitung sudut kemiringan rotasi kartu saat berayun
//       const avgNodeX = (leftNodes[totalNodes - 2].x + rightNodes[totalNodes - 2].x) / 2
//       const avgNodeY = (leftNodes[totalNodes - 2].y + rightNodes[totalNodes - 2].y) / 2
//       cardAngle = Math.atan2(cardX - avgNodeX, cardY - avgNodeY)
//     }

//     const drawRope = (ropeNodes) => {
//       ctx.beginPath()
//       ctx.moveTo(ropeNodes[0].x, ropeNodes[0].y)
//       for (let i = 1; i < totalNodes - 1; i++) {
//         const xc = (ropeNodes[i].x + ropeNodes[i + 1].x) / 2
//         const yc = (ropeNodes[i].y + ropeNodes[i + 1].y) / 2
//         ctx.quadraticCurveTo(ropeNodes[i].x, ropeNodes[i].y, xc, yc)
//       }
//       ctx.lineTo(cardX, cardY)
//       ctx.stroke()
//     }

//     const render = () => {
//       ctx.clearRect(0, 0, width, height)
      
//       // Style Tali Neon Ungu
//       ctx.strokeStyle = "#6366f1"
//       ctx.lineWidth = 4
//       ctx.lineCap = "round"
//       ctx.lineJoin = "round"
//       ctx.shadowBlur = 15
//       ctx.shadowColor = "#6366f1"
      
//       // Gambar Tali model V kiri-kanan
//       drawRope(leftNodes)
//       drawRope(rightNodes)
//       ctx.shadowBlur = 0 
      
//       // Gambar ID Card Sisi Depan Saja
//       ctx.save()
//       ctx.translate(cardX, cardY)
//       ctx.rotate(-cardAngle * 0.8) 
      
//       ctx.fillStyle = "rgba(10, 8, 25, 0.9)"
//       ctx.strokeStyle = "rgba(99, 102, 241, 0.7)"
//       ctx.lineWidth = 2
      
//       ctx.beginPath()
//       ctx.rect(-cardWidth / 2, 0, cardWidth, cardHeight)
//       ctx.fill()
//       ctx.stroke()
      
//       // Lubang Tengah Atas Card
//       ctx.fillStyle = "#333"
//       ctx.beginPath()
//       ctx.arc(0, 10, 4.5, 0, Math.PI * 2)
//       ctx.fill()

//       // Teks Identitas Minimalis Lu
//       ctx.fillStyle = "#ffffff"
//       ctx.font = "bold 14px sans-serif"
//       ctx.textAlign = "center"
//       ctx.fillText("KYWX", 0, 95)
      
//       ctx.fillStyle = "#a855f7"
//       ctx.font = "bold 9px monospace"
//       ctx.fillText("DEV // INNOVATE", 0, 115)
      
//       // Garis Dekorasi Tengah
//       ctx.fillStyle = "rgba(168, 85, 247, 0.4)"
//       ctx.fillRect(-cardWidth / 2 + 15, 55, cardWidth - 30, 2)

//       ctx.restore()
      
//       requestAnimationFrame(render)
//     }

//     const animLoop = () => {
//       updatePhysics()
//       render()
//     }
    
//     let animId = requestAnimationFrame(function loop() {
//       animLoop()
//       animId = requestAnimationFrame(loop)
//     })

//     return () => {
//       cancelAnimationFrame(animId)
//       window.removeEventListener("resize", handleResize)
//       if (canvas) {
//         canvas.removeEventListener("mousedown", onStart)
//         canvas.removeEventListener("mousemove", onMove)
//         canvas.removeEventListener("touchstart", onStart)
//         canvas.removeEventListener("touchmove", onMove)
//       }
//       window.removeEventListener("mouseup", onEnd)
//       window.removeEventListener("touchend", onEnd)
//     }
//   }, [])

//   return (
//     <div className="w-full h-full min-h-[550px] relative flex items-center justify-center">
//       <canvas ref={canvasRef} className="w-full h-[600px] bg-transparent cursor-grab active:cursor-grabbing" />
//     </div>
//   )
// } 