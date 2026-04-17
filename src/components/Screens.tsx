import React from 'react';
import { motion } from 'motion/react';
import { GameState, PlayerCharacter, Enemy } from '../types';

interface StartScreenProps {
  onStart: () => void;
  bestScore: number;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart, bestScore }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CgkJPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSLCAyNTUsIDAuMSkiLz4KCQk8L3N2Zz4=')] opacity-30" />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="max-w-2xl w-full p-8 md:p-12 rounded-2xl relative z-10"
      >
        <div className="mb-4 text-cyan-500 font-mono text-sm tracking-[0.3em] uppercase">Murim Series</div>
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-400 mb-8 drop-shadow-lg tracking-tighter">
          DEV'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">ASCENSION</span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl mb-12 leading-relaxed max-w-lg mx-auto font-serif italic">
          Test your knowledge against the demonic sects. Master the code, cultivate your inner logic, and reach the apex of development.
        </p>

        {bestScore > 0 && (
          <div className="mb-10 inline-block bg-black/40 border-l-4 border-cyan-500 px-6 py-3">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mr-3">Highest Cultivation:</span>
            <span className="text-2xl font-black text-cyan-400">{bestScore} pts</span>
          </div>
        )}

        <div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="w-full md:w-64 px-8 py-5 bg-gradient-to-r from-cyan-600 to-blue-800 text-white font-black text-lg uppercase tracking-widest hover:brightness-110 border border-cyan-400/50 rounded-sm shadow-[0_0_30px_rgba(6,182,212,0.3)]"
          >
            Enter Realm
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

interface CharacterSelectScreenProps {
  characters: PlayerCharacter[];
  onSelect: (char: PlayerCharacter) => void;
}

export const CharacterSelectScreen: React.FC<CharacterSelectScreenProps> = ({ characters, onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-slate-950">
      <h2 className="text-3xl font-black text-white mb-2 tracking-widest uppercase">Choose Your Path</h2>
      <p className="text-slate-400 italic font-serif mb-10">Select a cultivator to represent you in battle.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {characters.map((char, i) => (
          <motion.div
            key={char.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-900 border border-slate-700 hover:border-cyan-500 rounded-xl p-8 cursor-pointer transition-colors group relative overflow-hidden flex flex-col items-center"
            onClick={() => onSelect(char)}
          >
            <div className="absolute right-0 top-0 opacity-5 text-9xl font-black -mt-4 -mr-4 group-hover:text-cyan-500 transition-colors pointer-events-none z-0">
              {i + 1}
            </div>
            
            {char.imagePath && (
              <div className="w-32 h-32 mb-4 relative z-10">
                <img src={char.imagePath} alt={char.name} className="w-full h-full object-contain drop-shadow-lg" />
              </div>
            )}

            <h3 className="text-2xl font-black text-cyan-400 mb-1 z-10">{char.name}</h3>
            <div className="text-slate-300 font-mono text-sm mb-4 z-10">HP Base: {char.maxHp}</div>
            <p className="text-slate-400 text-sm leading-relaxed z-10">{char.description}</p>
            
            <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <span className="text-cyan-400 font-bold uppercase text-xs tracking-widest border-b border-cyan-400 pb-1">Select Path</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

interface BossSelectScreenProps {
  bosses: Enemy[];
  onSelect: (boss: Enemy) => void;
}

export const BossSelectScreen: React.FC<BossSelectScreenProps> = ({ bosses, onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-slate-950">
      <h2 className="text-3xl font-black text-red-500 mb-2 tracking-widest uppercase">Challenge an Adversary</h2>
      <p className="text-slate-400 italic font-serif mb-10">Who will you test your might against?</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {bosses.map((boss, i) => (
          <motion.div
            key={boss.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-slate-900 border hover:border-red-500 p-6 cursor-pointer transition-colors group relative overflow-hidden ${
              boss.difficulty === 'easy' ? 'border-green-900/50' : 
              boss.difficulty === 'medium' ? 'border-purple-900/50' : 'border-red-900/50'
            }`}
            onClick={() => onSelect(boss)}
          >
            <div className="text-xs uppercase tracking-widest font-bold mb-2 opacity-60 flex justify-between z-10 relative">
              <span className={boss.difficulty === 'easy' ? 'text-green-400' : boss.difficulty === 'medium' ? 'text-purple-400' : 'text-red-400'}>
                {boss.difficulty}
              </span>
              <span className="text-slate-500">HP: {boss.maxHp}</span>
            </div>
            
            {boss.imagePath && (
              <div className="w-full h-32 mb-4 relative z-10">
                <img src={boss.imagePath} alt={boss.name} className="w-full h-full object-contain drop-shadow-lg" />
              </div>
            )}
            
            <h3 className="text-xl font-black text-white mb-1 leading-tight z-10 relative">{boss.title}</h3>
            <h4 className="text-sm font-serif italic text-slate-400 mb-6 z-10 relative">{boss.name}</h4>
            
            <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity z-10 relative">
              <span className="text-red-500 font-bold uppercase text-xs tracking-widest border-b border-red-500 pb-1">Begin Duel</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

interface EndScreenProps {
  gameState: GameState;
  player?: import('../types').PlayerCharacter | null;
  enemy?: import('../types').Enemy | null;
  onRestart: () => void;
  onContinue?: () => void;
  bestScore: number;
}

export const EndScreen: React.FC<EndScreenProps> = ({ gameState, player, enemy, onRestart, onContinue, bestScore }) => {
  const isBattleWin = gameState.status === 'battle-win';
  const isGameComplete = gameState.status === 'win';
  const isWin = isBattleWin || isGameComplete;
  const accuracy = Math.round((gameState.correctAnswers / Math.max(1, (gameState.correctAnswers + gameState.wrongAnswers))) * 100);
  const isNewBest = gameState.score > bestScore;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center relative overflow-hidden bg-slate-950">
      {/* Background Effect for Win */}
      {isWin && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="w-[200vw] h-[200vw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0deg 30deg, rgba(6, 182, 212, 0.2) 30deg 60deg, transparent 60deg 90deg, rgba(6, 182, 212, 0.2) 90deg 120deg, transparent 120deg 150deg, rgba(6, 182, 212, 0.2) 150deg 180deg, transparent 180deg 210deg, rgba(6, 182, 212, 0.2) 210deg 240deg, transparent 240deg 270deg, rgba(6, 182, 212, 0.2) 270deg 300deg, transparent 300deg 330deg, rgba(6, 182, 212, 0.2) 330deg 360deg)'
            }}
          />
        </div>
      )}

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className={`max-w-md w-full p-8 md:p-12 relative z-10 border-t-4 bg-slate-900 shadow-2xl ${
          isWin ? 'border-cyan-500 shadow-[0_20px_50px_rgba(6,182,212,0.1)]' : 'border-red-600 shadow-[0_20px_50px_rgba(220,38,38,0.2)]'
        }`}
      >
        {isWin ? (
          <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 flex items-center justify-center">
            {/* Dead villain (Back/Base layer) */}
            <motion.img 
              src={enemy?.deathImagePath || "/dead_villain.png"} 
              alt="Defeated Villain"
              className="absolute w-full h-full object-contain z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            {/* Hero winning (Front/Top layer) */}
            <motion.img 
              src={player?.winImagePath || "/hero_win.png"} 
              alt="Hero Victory"
              className="absolute w-3/4 h-3/4 object-contain z-20 drop-shadow-[0_0_30px_rgba(234,179,8,0.4)]"
              initial={{ y: -50, opacity: 0, scale: 1.2 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5, delay: 0.6 }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        ) : (
          <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 flex items-center justify-center">
            {/* Dead hero (Back/Base layer) */}
            <motion.img 
              src={player?.deathImagePath || "/hero_death.png"} 
              alt="Defeated Hero"
              className="absolute w-full h-full object-contain z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
             {/* Villain Win screen (Front/Top layer) */}
             <motion.img 
              src={enemy?.winImagePath || "/villain_win.png"} 
              alt="Villain Victory"
              className="absolute w-3/4 h-3/4 object-contain z-20 drop-shadow-[0_0_30px_rgba(220,38,38,0.4)]"
              initial={{ y: -50, opacity: 0, scale: 1.2 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5, delay: 0.6 }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        )}
        
        <h1 className={`text-3xl md:text-4xl font-black mb-2 uppercase tracking-tight ${
          isWin ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600' : 'text-red-500'
        }`}>
          {isGameComplete ? 'Arena Conquered' : (isBattleWin ? 'Adversary Defeated' : 'Qi Deviation')}
        </h1>
        
        <p className="text-slate-400 font-serif italic mb-8">
          {isGameComplete ? 'Your name is forged into legend.' : (isBattleWin ? 'Your cultivation has deepened.' : 'You succumbed to the inner demons.')}
        </p>

        <div className="bg-black/50 p-6 mb-8 border border-slate-800 flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <span className="text-slate-500 text-xs uppercase font-bold tracking-widest">Score</span>
            <span className={`font-black text-2xl ${isNewBest && isWin ? 'text-cyan-400 animate-pulse' : 'text-white'}`}>
              {gameState.score}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-xs uppercase font-bold tracking-widest">Accuracy</span>
            <span className="font-mono text-sm text-slate-300">{accuracy}%</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-xs uppercase font-bold tracking-widest">Strikes / Receives</span>
            <span className="font-mono text-sm text-slate-300">
              <span className="text-cyan-500">{gameState.correctAnswers}</span> / <span className="text-red-500">{gameState.wrongAnswers}</span>
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isBattleWin && onContinue ? onContinue : onRestart}
          className="w-full py-4 bg-slate-800 text-white font-bold text-sm uppercase tracking-widest hover:bg-slate-700 transition-colors border border-slate-700"
        >
          {isGameComplete ? 'Play Again' : (isBattleWin ? 'Face Next Adversary' : 'Return to Realm')}
        </motion.button>
      </motion.div>
    </div>
  );
};

