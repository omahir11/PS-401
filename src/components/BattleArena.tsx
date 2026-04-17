import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Enemy, PlayerCharacter } from '../types';

interface BattleArenaProps {
  enemy: Enemy | null;
  player: PlayerCharacter | null;
  playerHp: number;
  playerMaxHp: number;
  isPlayerAttacking: boolean;
  isEnemyAttacking: boolean;
  damageTakenByEnemy: number | null;
  damageTakenByPlayer: number | null;
}

// ----------------------------------------------------
// PLAYER SVG SPRITES
// ----------------------------------------------------
const FrontendSwordsman = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
    {/* Aura */}
    <motion.circle cx="50" cy="50" r="40" fill="rgba(56, 189, 248, 0.2)" animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
    {/* Body */}
    <path d="M40 90 L40 60 L30 50 L50 30 L60 40 L50 60 L50 90" fill="#0ea5e9" stroke="#0284c7" strokeWidth="2" />
    <circle cx="50" cy="20" r="10" fill="#bae6fd" />
    {/* Cape */}
    <motion.path d="M50 30 Q20 50 20 80 Q50 60 45 35" fill="#0284c7" animate={{ d: ["M50 30 Q20 50 20 80 Q50 60 45 35", "M50 30 Q15 60 25 85 Q50 60 45 35"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
    {/* Sword */}
    <path d="M60 40 L90 10 L85 5 L55 35 Z" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" />
  </svg>
);

const BackendBrawler = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
    {/* Aura */}
    <motion.circle cx="50" cy="50" r="40" fill="rgba(249, 115, 22, 0.2)" animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 1.8, repeat: Infinity }} />
    {/* Legs & Torso */}
    <path d="M30 90 L40 60 L60 60 L70 90 M40 60 L50 35 L60 60" fill="#ea580c" stroke="#c2410c" strokeWidth="3" fillRule="evenodd" />
    <circle cx="50" cy="20" r="12" fill="#fdba74" />
    {/* Massive Gauntlets */}
    <motion.circle cx="75" cy="45" r="14" fill="#9a3412" animate={{ y: [0, -3, 0] }} transition={{ duration: 1, repeat: Infinity }} />
    <motion.circle cx="25" cy="45" r="14" fill="#9a3412" animate={{ y: [0, 3, 0] }} transition={{ duration: 1, repeat: Infinity }} />
  </svg>
);

// ----------------------------------------------------
// ENEMY SVG SPRITES
// ----------------------------------------------------
const NullPointerDisciple = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
    <motion.path
      d="M30 90 L40 50 L20 40 L50 20 L80 40 L60 50 L70 90 Z"
      fill="#22c55e" stroke="#166534" strokeWidth="2"
      animate={{ skewX: [0, -5, 5, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <circle cx="50" cy="25" r="8" fill="#14532d" />
    {/* Dagger */}
    <path d="M20 40 L5 55 L3 53 L18 38 Z" fill="#bbf7d0" />
    <path d="M80 40 L95 55 L97 53 L82 38 Z" fill="#bbf7d0" />
  </svg>
);

const AsyncHeavenlyDemon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
    <motion.circle cx="50" cy="50" r="35" fill="none" stroke="#a855f7" strokeWidth="2" animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} strokeDasharray="10 10"/>
    <motion.path
      d="M50 15 L70 40 L50 90 L30 40 Z"
      fill="#7e22ce"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <circle cx="50" cy="35" r="10" fill="#f3e8ff" />
    <path d="M48 30 L52 30 L50 35 Z" fill="#581c87" />
    {/* Floating Hands */}
    <motion.circle cx="15" cy="40" r="6" fill="#c084fc" animate={{ y: [0, -15, 0] }} transition={{ duration: 2, repeat: Infinity }} />
    <motion.circle cx="85" cy="40" r="6" fill="#c084fc" animate={{ y: [0, 15, 0] }} transition={{ duration: 2.2, repeat: Infinity }} />
    <motion.circle cx="25" cy="20" r="6" fill="#c084fc" animate={{ y: [0, -10, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />
    <motion.circle cx="75" cy="20" r="6" fill="#c084fc" animate={{ y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity }} />
  </svg>
);

const LegacyCodeGrandmaster = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-2xl overflow-visible">
    <motion.path 
      d="M20 100 Q60 120 100 100 L90 50 Q60 30 30 50 Z" 
      fill="#b45309" stroke="#78350f" strokeWidth="3"
      animate={{ d: ["M20 100 Q60 120 100 100 L90 50 Q60 30 30 50 Z", "M25 100 Q60 110 95 100 L85 55 Q60 35 35 55 Z"] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <circle cx="60" cy="30" r="14" fill="#fcd34d" />
    {/* Giant Scroll containing "legacy code" */}
    <path d="M100 20 L110 20 L110 110 L100 110 Z" fill="#fef3c7" stroke="#d97706" />
    <path d="M105 30 L105 100" stroke="#b45309" strokeWidth="2" strokeDasharray="4 2" />
    <path d="M20 20 L10 20 L10 110 L20 110 Z" fill="#fef3c7" stroke="#d97706" />
    <path d="M15 30 L15 100" stroke="#b45309" strokeWidth="2" strokeDasharray="4 2" />
    {/* Third Eye */}
    <circle cx="60" cy="25" r="3" fill="#dc2626" />
  </svg>
);

// ----------------------------------------------------
// DYNAMIC SPRITE COMPONENT
// ----------------------------------------------------
const DynamicSprite = ({ imagePath, attackImagePaths, isAttacking, facingLeft, fallbackComponent }: { imagePath?: string, attackImagePaths?: string[], isAttacking: boolean, facingLeft: boolean, fallbackComponent: React.ReactNode }) => {
  const [imgErr, setImgErr] = React.useState(false);
  const [validAttacks, setValidAttacks] = React.useState<string[]>([]);
  const [attackIdx, setAttackIdx] = React.useState(0);

  // Preload and validate images on mount
  React.useEffect(() => {
    if (attackImagePaths && attackImagePaths.length > 0) {
      const valid: string[] = [];
      let checked = 0;
      
      attackImagePaths.forEach(src => {
        const img = new Image();
        img.onload = () => {
          valid.push(src);
          checked++;
          if (checked === attackImagePaths.length) setValidAttacks(valid);
        };
        img.onerror = () => {
          checked++;
          if (checked === attackImagePaths.length) setValidAttacks(valid);
        };
        img.src = src;
      });
    }
  }, [attackImagePaths]);

  React.useEffect(() => {
    if (isAttacking && validAttacks.length > 0) {
      setAttackIdx(Math.floor(Math.random() * validAttacks.length));
    }
  }, [isAttacking, validAttacks.length]);

  const attackPath = validAttacks.length > 0 ? validAttacks[attackIdx] : undefined;
  const mainPath = imagePath;

  const attackValid = isAttacking && attackPath;
  const mainValid = mainPath && !imgErr;

  const flipClass = facingLeft ? '-scale-x-100' : '';

  if (attackValid) {
    return <img src={attackPath} className={`w-full h-full object-contain drop-shadow-2xl ${flipClass}`} alt="Attacking" />;
  }
  
  if (mainValid) {
    return <img src={mainPath} className={`w-full h-full object-contain drop-shadow-2xl ${flipClass}`} alt="Idle" onError={() => setImgErr(true)} />;
  }

  return <>{fallbackComponent}</>;
};

export const BattleArena: React.FC<BattleArenaProps> = ({
  enemy,
  player,
  playerHp,
  playerMaxHp,
  isPlayerAttacking,
  isEnemyAttacking,
  damageTakenByEnemy,
  damageTakenByPlayer
}) => {
  const playerAttackType = player?.attackType || 'melee';
  const enemyAttackType = enemy?.attackType || 'melee';

  const playerAnim = isPlayerAttacking 
    ? (playerAttackType === 'melee' ? { x: [0, 250, -20, 0], scale: [1, 1.2, 0.9, 1], zIndex: 50 } : { x: [0, 20, -5, 0], scale: [1, 1.1, 0.95, 1], zIndex: 50 }) 
    : isEnemyAttacking 
    ? { x: [0, -20, 10, -5, 0], filter: ['brightness(1)', 'brightness(10) hue-rotate(90deg)', 'brightness(1)'] } 
    : { y: [0, -5, 0] };

  const enemyAnim = isEnemyAttacking 
    ? (enemyAttackType === 'melee' ? { x: [0, -250, 20, 0], scale: [1, 1.2, 0.9, 1], zIndex: 50 } : { x: [0, -20, 5, 0], scale: [1, 1.1, 0.95, 1], zIndex: 50 }) 
    : isPlayerAttacking 
    ? { x: [0, 20, -10, 5, 0], filter: ['brightness(1)', 'brightness(10) saturate(2)', 'brightness(1)'] } 
    : { y: [0, -5, 0] };
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border-4 border-slate-800 flex items-end justify-between px-8 md:px-24 pb-12">
      {/* ---------------- BACKGROUND LAYER ---------------- */}
      <div className="absolute inset-0 bg-slate-950 pointer-events-none z-0 overflow-hidden">
        {/* Custom Uploaded Background */}
        <img 
          src="/background.png" 
          alt="Battlefield"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        {/* Base Layer gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/40 to-black/90 mix-blend-multiply"></div>
        {/* Atmosphere layer */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Background Mountains (SVG) */}
        <svg preserveAspectRatio="none" viewBox="0 0 100 100" className="absolute bottom-0 w-full h-1/2 opacity-30">
          <path d="M0 100 L0 50 L20 30 L40 60 L70 10 L100 40 L100 100 Z" fill="#0f172a" />
          <path d="M0 100 L0 70 L30 40 L50 80 L80 30 L100 60 L100 100 Z" fill="#1e293b" />
        </svg>
        {/* Ground */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black to-transparent" />
      </div>
      </div>

      {/* ---------------- PLAYER SIDE ---------------- */}
      <div className="flex flex-col items-center z-10 w-1/3">
        {/* HP Bar */}
        <div className="w-full max-w-[160px] md:max-w-[200px] mb-8">
          <div className="flex justify-between items-end text-xs font-black text-white mb-1 uppercase tracking-wider drop-shadow-md">
            <span>{player?.name || 'Player'}</span>
            <span className="text-xl">{playerHp}/{playerMaxHp}</span>
          </div>
          <div className="h-4 bg-slate-900 rounded border-2 border-slate-700 overflow-hidden relative">
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: `${(playerHp / playerMaxHp) * 100}%` }}
              className={`absolute top-0 left-0 h-full ${playerHp < playerMaxHp * 0.3 ? 'bg-red-500' : 'bg-emerald-500'} transition-all duration-300`}
            />
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </div>

        {/* Character Visual */}
        <div className="w-32 h-32 md:w-48 md:h-48 relative flex items-center justify-center">
          <motion.div
            animate={playerAnim}
            transition={isPlayerAttacking ? { duration: 0.4 } : isEnemyAttacking ? { duration: 0.5 } : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <DynamicSprite 
              isAttacking={isPlayerAttacking}
              facingLeft={false}
              imagePath={player?.imagePath}
              attackImagePaths={player?.attackImagePaths}
              fallbackComponent={player?.id === 'frontend' ? <FrontendSwordsman /> : <BackendBrawler />}
            />
          </motion.div>
          
          <AnimatePresence>
            {damageTakenByPlayer && (
              <motion.div
                key="playerDamage"
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1.5, y: -80, rotate: Math.random() * 20 - 10 }}
                exit={{ opacity: 0, y: -100 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 text-red-500 font-black text-4xl md:text-5xl pointer-events-none drop-shadow-[0_0_10px_black] z-50 origin-bottom"
              >
                -{damageTakenByPlayer}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ---------------- ENEMY SIDE ---------------- */}
      {enemy && (
        <div className="flex flex-col items-center z-10 w-1/3">
          {/* HP Bar */}
          <div className="w-full max-w-[160px] md:max-w-[200px] mb-8">
            <div className="flex justify-between items-end text-xs font-black text-white mb-1 uppercase tracking-wider drop-shadow-md">
              <div className="flex flex-col text-right w-full">
                <span className="text-red-400 text-[10px] leading-tight">{enemy.title}</span>
                <span>{enemy.name}</span>
              </div>
            </div>
            <div className="h-4 bg-slate-900 rounded border-2 border-slate-700 overflow-hidden relative">
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: `${(Math.max(0, enemy.currentHp) / enemy.maxHp) * 100}%` }}
                className="absolute top-0 right-0 h-full bg-red-600 transition-all duration-300 origin-right"
                style={{ right: 0, left: 'auto' }}
              />
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
            </div>
          </div>

          {/* Enemy Visual */}
          <div className="w-32 h-32 md:w-56 md:h-56 relative">
            <motion.div
              animate={enemyAnim}
              transition={isEnemyAttacking ? { duration: 0.4 } : isPlayerAttacking ? { duration: 0.5 } : { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="w-full h-full"
            >
              <DynamicSprite 
                isAttacking={isEnemyAttacking}
                facingLeft={true}
                imagePath={enemy.imagePath}
                attackImagePaths={enemy.attackImagePaths}
                fallbackComponent={
                  enemy.id === 'disciple' ? <NullPointerDisciple /> :
                  enemy.id === 'demon' ? <AsyncHeavenlyDemon /> :
                  <LegacyCodeGrandmaster />
                }
              />
            </motion.div>

            <AnimatePresence>
              {damageTakenByEnemy && (
                <motion.div
                  key="enemyDamage"
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1.5, y: -80, rotate: Math.random() * 20 - 10 }}
                  exit={{ opacity: 0, y: -100 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 text-orange-400 font-black text-4xl md:text-6xl pointer-events-none drop-shadow-[0_0_10px_black] z-50 origin-bottom"
                >
                  -{damageTakenByEnemy}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* ---------------- PROJECTILES & HIT EFFECTS ---------------- */}
      <AnimatePresence>
        {/* Player Ranged Projectile */}
        {isPlayerAttacking && playerAttackType === 'ranged' && (
          <motion.div
            key="playerProjectile"
            initial={{ left: '20%', y: '-50%', opacity: 0, scale: 0.5 }}
            animate={{ left: '75%', opacity: 1, scale: 1.5 }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.3 }}
            className={`absolute top-[70%] -translate-y-1/2 z-40 w-24 h-24 ${player?.projectileImagePath ? '' : 'bg-cyan-400 rounded-full blur-[10px] mix-blend-screen'} pointer-events-none drop-shadow-[0_0_20px_rgba(6,182,212,1)]`}
          >
            {player?.projectileImagePath && (
              <img src={player.projectileImagePath} alt="Projectile" className="w-full h-full object-contain" />
            )}
          </motion.div>
        )}

        {/* Enemy Ranged Projectile */}
        {isEnemyAttacking && enemyAttackType === 'ranged' && (
          <motion.div
            key="enemyProjectile"
            initial={{ left: '75%', y: '-50%', opacity: 0, scale: 0.5 }}
            animate={{ left: '20%', opacity: 1, scale: 1.5 }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[70%] -translate-y-1/2 z-40 w-24 h-24 bg-red-500 rounded-full blur-[10px] mix-blend-screen pointer-events-none drop-shadow-[0_0_20px_rgba(239,68,68,1)]"
          />
        )}

        {/* Player Hit Effect (On Enemy side) */}
        {isPlayerAttacking && (
          <motion.div
            key="playerHit"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 2 }}
            exit={{ opacity: 0, scale: 3 }}
            className="absolute top-[70%] right-[20%] -translate-y-1/2 z-40 pointer-events-none w-32 h-32 bg-cyan-400 rounded-full blur-[20px] mix-blend-screen"
            transition={{ duration: 0.2, delay: playerAttackType === 'ranged' ? 0.2 : 0.1 }}
          />
        )}

        {/* Enemy Hit Effect (On Player side) */}
        {isEnemyAttacking && (
          <motion.div
            key="enemyHit"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 2 }}
            exit={{ opacity: 0, scale: 3 }}
            className="absolute top-[70%] left-[20%] -translate-y-1/2 z-40 pointer-events-none w-32 h-32 bg-red-600 rounded-full blur-[20px] mix-blend-screen"
            transition={{ duration: 0.2, delay: enemyAttackType === 'ranged' ? 0.2 : 0.1 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

