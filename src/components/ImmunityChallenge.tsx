import React, { useEffect, useRef, useState } from 'react';
import { Trophy, Play, RotateCcw, Users } from 'lucide-react';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speedX: number;
  speedY: number;
  active: boolean;
}

interface SurvivorPlayer extends GameObject {
  team: 'A' | 'B';
  isUser: boolean;
  hasCoconut: boolean;
  targetX: number;
  targetY: number;
  color: string;
  name: string;
  lastThrowTime: number;
  invulnerableUntil: number;
}

interface Coconut extends GameObject {
  state: 'thrown' | 'ground';
  ownerTeam: 'A' | 'B' | null;
}

export default function ImmunityChallenge() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');
  const [tribeACount, setTribeACount] = useState(8);
  const [tribeBCount, setTribeBCount] = useState(8);

  const playersRef = useRef<SurvivorPlayer[]>([]);
  const coconutsRef = useRef<Coconut[]>([]);
  const requestRef = useRef<number>(0);
  const mouseVelocityRef = useRef({ vx: 0, vy: 0 });
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const initGame = () => {
    const players: SurvivorPlayer[] = [];
    
    // Tribe A (Bottom)
    for (let i = 0; i < 8; i++) {
      players.push({
        x: 50 + i * 90,
        y: 500,
        width: 40,
        height: 40,
        speedX: 0,
        speedY: 0,
        active: true,
        team: 'A',
        isUser: i === 3,
        hasCoconut: false,
        targetX: 0,
        targetY: 0,
        color: i === 3 ? '#5A5A40' : '#8B8B6B',
        name: i === 3 ? 'You' : `Ally ${i}`,
        lastThrowTime: 0,
        invulnerableUntil: 0,
      });
    }

    // Tribe B (Top)
    for (let i = 0; i < 8; i++) {
      players.push({
        x: 50 + i * 90,
        y: 60,
        width: 40,
        height: 40,
        speedX: 0,
        speedY: 0,
        active: true,
        team: 'B',
        isUser: false,
        hasCoconut: false,
        targetX: 0,
        targetY: 0,
        color: '#8B0000',
        name: `Rival ${i}`,
        lastThrowTime: 0,
        invulnerableUntil: 0,
      });
    }

    const coconuts: Coconut[] = [];
    // 8 Coconuts in the middle
    for (let i = 0; i < 8; i++) {
      coconuts.push({
        x: 100 + i * 85,
        y: 290,
        width: 24,
        height: 18,
        speedX: 0,
        speedY: 0,
        active: true,
        state: 'ground',
        ownerTeam: null,
      });
    }

    playersRef.current = players;
    coconutsRef.current = coconuts;
    setTribeACount(8);
    setTribeBCount(8);
  };

  const startGame = () => {
    initGame();
    setGameState('playing');
    requestRef.current = requestAnimationFrame(gameLoop);
  };

  const drawCoconut = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    
    // Main shell - Oval and Brown (Higher contrast)
    ctx.fillStyle = '#4e342e'; 
    ctx.beginPath();
    ctx.ellipse(0, 0, width / 2, height / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Highlight for contrast
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.ellipse(-width * 0.15, -height * 0.15, width * 0.2, height * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Texture lines
    ctx.strokeStyle = '#26140f';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, width * 0.35, height * 0.45, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Three eyes (Darker for contrast)
    ctx.fillStyle = '#000000';
    const eyeSize = width * 0.12;
    ctx.beginPath();
    ctx.arc(-width * 0.15, -height * 0.1, eyeSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(width * 0.15, -height * 0.1, eyeSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, height * 0.15, eyeSize, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  };

  const gameLoop = (time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Wood-like background (Darker for overall background)
    ctx.fillStyle = '#2d1b15'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Gameplay floor (Light sand/wood color)
    ctx.fillStyle = '#e8d5b5';
    ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Wood grain texture on the dark border
    ctx.strokeStyle = '#3e2723';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.height; i += 30) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(20, i);
      ctx.moveTo(canvas.width - 20, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
    
    // Court lines (Brighter for contrast)
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 300);
    ctx.lineTo(800, 300);
    ctx.stroke();

    // Safety check for "dying" coconuts
    const heldCount = playersRef.current.filter(p => p.active && p.hasCoconut).length;
    const activeCount = coconutsRef.current.filter(c => c.active).length;
    if (heldCount + activeCount < 8) {
      const missing = 8 - (heldCount + activeCount);
      for (let i = 0; i < missing; i++) {
        const deadCoco = coconutsRef.current.find(c => !c.active);
        if (deadCoco) {
          deadCoco.active = true;
          deadCoco.state = 'ground';
          deadCoco.x = 100 + Math.random() * 600;
          deadCoco.y = 250 + Math.random() * 100;
          deadCoco.speedX = 0;
          deadCoco.speedY = 0;
        }
      }
    }

    playersRef.current.forEach(p => {
      if (!p.active) return;

      if (!p.isUser) {
        // --- AI LOGIC IMPROVEMENT ---
        
        // 1. Dodging
        const incomingCoconuts = coconutsRef.current.filter(c => c.state === 'thrown' && c.active && c.ownerTeam !== p.team);
        let dodging = false;
        for (const coco of incomingCoconuts) {
          const dx = (p.x + 20) - (coco.x + 12);
          const dy = (p.y + 20) - (coco.y + 9);
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 120) {
            // Move away from coconut
            const angle = Math.atan2(dy, dx);
            const dodgeSpeed = p.team === 'B' ? 5.5 : 2.5; // Rival tribe dodges much faster
            p.x += Math.cos(angle) * dodgeSpeed;
            p.y += Math.sin(angle) * dodgeSpeed;
            dodging = true;
          }
        }

        if (!dodging) {
          if (!p.hasCoconut) {
            const availableCoconuts = coconutsRef.current.filter(c => c.state === 'ground');
            if (availableCoconuts.length > 0) {
              // Find closest coconut
              let closest = availableCoconuts[0];
              let minDist = Infinity;
              availableCoconuts.forEach(c => {
                const d = Math.sqrt(Math.pow(c.x - p.x, 2) + Math.pow(c.y - p.y, 2));
                if (d < minDist) {
                  minDist = d;
                  closest = c;
                }
              });

              const dx = closest.x - p.x;
              const dy = closest.y - p.y;
              const dist = Math.sqrt(dx*dx + dy*dy);
              if (dist > 5) {
                const moveSpeed = p.team === 'B' ? 3.5 : 2.5; // Rivals move faster to coconuts
                p.x += (dx/dist) * moveSpeed;
                p.y += (dy/dist) * moveSpeed;
              }
            } else {
              const homeY = p.team === 'A' ? 500 : 60;
              p.y += (homeY - p.y) * 0.05;
              // Constant jitter/movement
              p.x += Math.sin(time / 300 + p.x) * 3;
              p.y += Math.cos(time / 400 + p.x) * 2;
            }
          } else {
            const lineY = (p.team === 'A' ? 350 : 210) + Math.sin(time / 1000 + p.x) * 20;
            const dy = lineY - p.y;
            
            // AI Strafing while holding coconut
            p.x += Math.sin(time / 400 + p.y) * 4;
            p.y += Math.cos(time / 500 + p.x) * 2;

            if (Math.abs(dy) > 30) {
              const advanceSpeed = p.team === 'B' ? 3 : 2;
              p.y += (dy/Math.abs(dy)) * advanceSpeed;
            } else {
              const targets = playersRef.current.filter(opp => opp.team !== p.team && opp.active);
              if (targets.length > 0) {
                // AI Throw Cooldown
                const now = Date.now();
                const cooldown = p.team === 'B' ? 800 : 2500; // Rivals throw much more often
                if (now - p.lastThrowTime > cooldown) {
                  // Aim at closest target
                  let closestTarget = targets[0];
                  let minDist = Infinity;
                  targets.forEach(t => {
                    const d = Math.sqrt(Math.pow(t.x - p.x, 2) + Math.pow(t.y - p.y, 2));
                    if (d < minDist) {
                      minDist = d;
                      closestTarget = t;
                    }
                  });
                  
                  // Add a bit of lead prediction or randomness
                  const tx = closestTarget.x + 20 + (Math.random() - 0.5) * 15;
                  const ty = closestTarget.y + 20 + (Math.random() - 0.5) * 15;
                  throwCoconut(p, tx, ty);
                  p.lastThrowTime = now;
                }
              }
            }
          }
        }

        // Keep in bounds
        p.x = Math.max(0, Math.min(760, p.x));
        if (p.team === 'A') {
          p.y = Math.max(310, Math.min(560, p.y));
        } else {
          p.y = Math.max(0, Math.min(290, p.y));
        }
      }

      if (!p.hasCoconut) {
        coconutsRef.current.forEach(c => {
          if (c.state === 'ground' && c.active) {
            const dx = (p.x + 20) - (c.x + 10);
            const dy = (p.y + 20) - (c.y + 10);
            if (Math.sqrt(dx*dx + dy*dy) < 35) {
              c.active = false;
              p.hasCoconut = true;
            }
          }
        });
      }

      // Draw Player with Stroke for contrast
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      
      const isInvulnerable = Date.now() < p.invulnerableUntil;
      if (isInvulnerable) {
        ctx.globalAlpha = 0.5 + Math.sin(time / 100) * 0.3;
        ctx.strokeStyle = '#fbbf24'; // Golden glow
        ctx.lineWidth = 4;
      }

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.roundRect(p.x, p.y, p.width, p.height, 8);
      ctx.fill();
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(p.x + 20, p.y - 10, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.globalAlpha = 1.0;
      ctx.lineWidth = 2;

      if (p.hasCoconut) {
        drawCoconut(ctx, p.x + 10, p.y + 10, 24, 18);
      }
    });

    coconutsRef.current.forEach(c => {
      if (c.state === 'thrown' && c.active) {
        c.x += c.speedX;
        c.y += c.speedY;

        playersRef.current.forEach(p => {
          if (p.active && p.team !== c.ownerTeam && Date.now() > p.invulnerableUntil) {
            const dx = (p.x + 20) - (c.x + 12);
            const dy = (p.y + 20) - (c.y + 9);
            if (Math.sqrt(dx*dx + dy*dy) < 25) {
              p.active = false;
              
              // If they had a coconut, drop it
              if (p.hasCoconut) {
                const droppedCoco = coconutsRef.current.find(coco => !coco.active && coco !== c);
                if (droppedCoco) {
                  droppedCoco.active = true;
                  droppedCoco.state = 'ground';
                  droppedCoco.x = p.x + 10;
                  droppedCoco.y = p.y + 10;
                  droppedCoco.speedX = 0;
                  droppedCoco.speedY = 0;
                }
              }

              p.hasCoconut = false; 
              c.active = true; // The coconut that hit them becomes ground again
              c.state = 'ground';
              c.speedX = 0;
              c.speedY = 0;
              c.x = p.x + 10;
              c.y = p.y + 10;
              updateCounts();
            }
          }
        });

        if (c.x < 0 || c.x > 780) c.speedX *= -1;
        if (c.y < 20 || c.y > 580) {
          c.y = Math.max(25, Math.min(575, c.y));
          c.state = 'ground';
          c.active = true;
          c.speedX = 0;
          c.speedY = 0;
        }
      }

      if (c.state === 'ground') {
        drawCoconut(ctx, c.x, c.y, 24, 18);
      } else if (c.state === 'thrown' && c.active) {
        drawCoconut(ctx, c.x, c.y, 24, 18);
      }
    });

    const activeA = playersRef.current.filter(p => p.team === 'A' && p.active);
    const activeB = playersRef.current.filter(p => p.team === 'B' && p.active);

    if (activeB.length === 0) {
      setGameState('won');
      cancelAnimationFrame(requestRef.current);
      return;
    }
    if (activeA.length === 0) {
      setGameState('lost');
      cancelAnimationFrame(requestRef.current);
      return;
    }

    requestRef.current = requestAnimationFrame(gameLoop);
  };

  const updateCounts = () => {
    setTribeACount(playersRef.current.filter(p => p.team === 'A' && p.active).length);
    setTribeBCount(playersRef.current.filter(p => p.team === 'B' && p.active).length);
  };

  const throwCoconut = (p: SurvivorPlayer, tx: number, ty: number) => {
    if (!p.hasCoconut) return;
    
    // Find an inactive coconut to reuse
    const coco = coconutsRef.current.find(c => !c.active);
    if (!coco) return;

    p.hasCoconut = false;
    
    let vx, vy;
    const speed = 10;

    if (p.isUser) {
      // Use mouse velocity with forward bias
      const mv = mouseVelocityRef.current;
      const forwardY = p.team === 'A' ? -1 : 1;
      
      // Calculate magnitude of mouse velocity
      const mag = Math.sqrt(mv.vx * mv.vx + mv.vy * mv.vy);
      
      if (mag < 1) {
        // If mouse is still, go straight forward
        vx = 0;
        vy = forwardY * speed;
      } else {
        // Blend mouse direction with forward direction
        // Normalize mouse velocity
        const nvx = mv.vx / mag;
        const nvy = mv.vy / mag;
        
        // Bias towards forward (0, forwardY)
        // 70% mouse direction, 30% forward bias
        const finalVx = nvx * 0.7;
        const finalVy = nvy * 0.7 + forwardY * 0.3;
        
        // Re-normalize and apply speed
        const finalMag = Math.sqrt(finalVx * finalVx + finalVy * finalVy);
        vx = (finalVx / finalMag) * speed;
        vy = (finalVy / finalMag) * speed;
      }
    } else {
      // AI aiming
      const dx = tx - (p.x + 20);
      const dy = ty - (p.y + 20);
      const angle = Math.atan2(dy, dx);
      vx = Math.cos(angle) * 8;
      vy = Math.sin(angle) * 8;
    }

    coco.x = p.x + 10;
    coco.y = p.y + (p.team === 'A' ? -30 : 50);
    coco.speedX = vx;
    coco.speedY = vy;
    coco.active = true;
    coco.state = 'thrown';
    coco.ownerTeam = p.team;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing') return;
    const user = playersRef.current.find(p => p.isUser);
    if (!user || !user.active || !user.hasCoconut) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    throwCoconut(user, x, y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing') return;
    const user = playersRef.current.find(p => p.isUser);
    if (!user || !user.active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate mouse velocity
    const dx = x - lastMousePosRef.current.x;
    const dy = y - lastMousePosRef.current.y;
    mouseVelocityRef.current = { vx: dx, vy: dy };
    lastMousePosRef.current = { x, y };

    user.x = Math.max(0, Math.min(760, x - 20));
    user.y = Math.max(310, Math.min(560, y - 20));
  };

  return (
    <div className="flex flex-col items-center space-y-6 min-h-screen bg-[#2d1b15] p-8 text-white">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-amber-50">Immunity Dodgeball</h2>
        <p className="text-amber-50/60">Stand over a coconut to pick it up. Click to throw!</p>
      </div>

      <div className="relative group">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          className="bg-[#e8d5b5] rounded-[40px] shadow-2xl border-8 border-[#3e2723] cursor-crosshair"
        />

        {gameState === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-[40px]">
            <div className="bg-[#3e2723] p-10 rounded-[32px] shadow-2xl text-center space-y-6 max-w-sm border-4 border-[#2d1b15] text-amber-50">
              <div className="w-20 h-20 bg-amber-700 rounded-full flex items-center justify-center text-white mx-auto shadow-lg border-2 border-amber-900">
                <Users size={40} />
              </div>
              <h3 className="text-2xl font-bold">Tribe vs Tribe</h3>
              <p className="text-sm text-amber-50/70">
                8 vs 8 Dodgeball. Stand over coconuts to pick them up. 
                Move to dodge, click to throw. Last tribe standing wins!
              </p>
              <button
                onClick={startGame}
                className="w-full bg-amber-700 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-amber-600 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Play size={20} />
                Start Challenge
              </button>
            </div>
          </div>
        )}

        {(gameState === 'won' || gameState === 'lost') && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-[40px]">
            <div className="bg-[#3e2723] p-10 rounded-[32px] shadow-2xl text-center space-y-6 max-w-sm border-4 border-[#2d1b15] text-amber-50">
              <div className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center text-white mx-auto shadow-lg border-2",
                gameState === 'won' ? "bg-amber-500 border-amber-700" : "bg-red-900 border-red-950"
              )}>
                <Trophy size={40} />
              </div>
              <h3 className="text-3xl font-bold">{gameState === 'won' ? "Immunity is Yours!" : "The Tribe has Spoken"}</h3>
              <p className="text-lg text-amber-50/70">
                {gameState === 'won' ? "Your tribe is safe from tribal council." : "Your tribe must head to tribal council."}
              </p>
              <button
                onClick={startGame}
                className="w-full bg-amber-700 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-amber-600 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} />
                Play Again
              </button>
            </div>
          </div>
        )}

        <div className="absolute top-6 left-6 flex items-center gap-4">
          <div className="bg-[#3e2723]/90 backdrop-blur px-6 py-2 rounded-full shadow-lg border border-amber-900/20">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-50/40 block">Your Tribe</span>
            <span className="text-xl font-bold text-amber-50">{tribeACount} / 8</span>
          </div>
          <div className="bg-[#3e2723]/90 backdrop-blur px-6 py-2 rounded-full shadow-lg border border-amber-900/20">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-50/40 block">Opponents</span>
            <span className="text-xl font-bold text-red-400">{tribeBCount} / 8</span>
          </div>
          {gameState === 'playing' && (
            <button 
              onClick={() => {
                cancelAnimationFrame(requestRef.current);
                initGame();
                requestRef.current = requestAnimationFrame(gameLoop);
              }}
              className="bg-[#3e2723]/90 backdrop-blur p-3 rounded-full shadow-lg border border-amber-900/20 hover:bg-amber-900/40 transition-all hover:scale-110 active:scale-95"
              title="Reset Game"
            >
              <RotateCcw size={20} className="text-amber-50" />
            </button>
          )}
          {!playersRef.current.find(p => p.isUser)?.active && gameState === 'playing' && (
            <div className="bg-red-900/90 backdrop-blur px-6 py-2 rounded-full shadow-lg border border-red-500/20 animate-pulse">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 block">Status</span>
              <span className="text-xl font-bold text-white">Spectating</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
