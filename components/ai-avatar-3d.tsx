'use client'

import React, { useEffect, useRef } from 'react'

export function AIAvatar3D({ isThinking = false }: { isThinking?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let rotation = 0
    let particles: Array<{ x: number; y: number; vx: number; vy: number; life: number }> = []

    // Set canvas size
    canvas.width = 200
    canvas.height = 200

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    function drawHead(ctx: CanvasRenderingContext2D, rotation: number) {
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotation * 0.01)

      // Glow effect
      const gradient = ctx.createRadialGradient(0, 0, 30, 0, 0, 60)
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)')
      gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.2)')
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0)')
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(0, 0, 60, 0, Math.PI * 2)
      ctx.fill()

      // Main head circle with 3D effect
      const headGradient = ctx.createRadialGradient(-10, -10, 10, 0, 0, 45)
      headGradient.addColorStop(0, '#8b5cf6')
      headGradient.addColorStop(0.7, '#7c3aed')
      headGradient.addColorStop(1, '#6d28d9')
      
      ctx.fillStyle = headGradient
      ctx.beginPath()
      ctx.arc(0, 0, 45, 0, Math.PI * 2)
      ctx.fill()

      // Face features
      // Eyes
      ctx.fillStyle = isThinking ? '#06b6d4' : '#ffffff'
      ctx.beginPath()
      ctx.arc(-12, -5, 6, 0, Math.PI * 2)
      ctx.arc(12, -5, 6, 0, Math.PI * 2)
      ctx.fill()

      // Pupils
      if (!isThinking) {
        ctx.fillStyle = '#0a0d1a'
        ctx.beginPath()
        ctx.arc(-12 + Math.sin(rotation * 0.02) * 2, -5, 3, 0, Math.PI * 2)
        ctx.arc(12 + Math.sin(rotation * 0.02) * 2, -5, 3, 0, Math.PI * 2)
        ctx.fill()
      }

      // Smile/Mouth
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2
      ctx.beginPath()
      if (isThinking) {
        // Thinking expression - wavy line
        for (let i = 0; i < 20; i++) {
          const x = -10 + i
          const y = 12 + Math.sin(i * 0.5 + rotation * 0.1) * 2
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
      } else {
        // Happy smile
        ctx.arc(0, 5, 12, 0.2, Math.PI - 0.2)
      }
      ctx.stroke()

      // AI Neural network pattern
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)'
      ctx.lineWidth = 1
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + rotation * 0.02
        const x1 = Math.cos(angle) * 35
        const y1 = Math.sin(angle) * 35
        const x2 = Math.cos(angle + 0.5) * 40
        const y2 = Math.sin(angle + 0.5) * 40
        
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }

      ctx.restore()
    }

    function drawParticles(ctx: CanvasRenderingContext2D) {
      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life -= 0.01

        if (particle.life <= 0) {
          particles.splice(index, 1)
          return
        }

        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, 3
        )
        gradient.addColorStop(0, `rgba(139, 92, 246, ${particle.life})`)
        gradient.addColorStop(1, `rgba(6, 182, 212, 0)`)
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2)
        ctx.fill()
      })

      // Add new particles if thinking
      if (isThinking && Math.random() > 0.7) {
        particles.push({
          x: centerX + (Math.random() - 0.5) * 60,
          y: centerY + (Math.random() - 0.5) * 60,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1
        })
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      rotation += isThinking ? 0.5 : 0.2
      
      drawParticles(ctx)
      drawHead(ctx, rotation)
      
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isThinking])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="drop-shadow-2xl"
      />
      {isThinking && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-cyan-400 animate-pulse">
          Thinking...
        </div>
      )}
    </div>
  )
}
