import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Enemy, Question, BattleAction, PlayerCharacter } from './types';
import { questions as allQuestions } from './data/questions';
import { BattleArena } from './components/BattleArena';
import { QuestionBox } from './components/QuestionBox';
import { StartScreen, CharacterSelectScreen, BossSelectScreen, EndScreen } from './components/Screens';
import { useSound } from './hooks/useSound';
import { motion, AnimatePresence } from 'motion/react';

// Definitions
const CHARACTERS: PlayerCharacter[] = [
  { 
    id: 'hero', 
    name: 'Golden Tome Novice', 
    maxHp: 120, 
    description: 'A spirited youth holding an ancient scroll. Balanced stats and unyielding determination.', 
    imagePath: '/hero.png',
    attackImagePaths: [
      '/hero_attack_1.png', 
      '/hero_attack_2.png', 
      '/hero_attack_3.png'
    ],
    attackType: 'melee',
    winImagePath: '/hero_win.png',
    deathImagePath: '/hero_death.png'
  },
  { 
    id: 'frontend', 
    name: 'Qi Router Swift', 
    maxHp: 100, 
    description: 'A nimble swordmaster of the Frontend Sect. Relies on speed and precision strikes.',
    attackType: 'melee',
    winImagePath: '/frontend_win.png',
    deathImagePath: '/frontend_death.png'
  },
  { 
    id: 'backend', 
    name: 'Iron Body Node', 
    maxHp: 150, 
    description: 'A stalwart practitioner of the Backend Brawlers. Endures heavy damage to deliver crushing blows.',
    attackType: 'melee',
    winImagePath: '/backend_win.png',
    deathImagePath: '/backend_death.png'
  },
];

const BOSSES: Enemy[] = [
  { 
    id: 'disciple', 
    title: 'Null Pointer Disciple', 
    name: 'Junior Wei', 
    maxHp: 80, 
    currentHp: 80, 
    difficulty: 'easy',
    imagePath: '/villain_easy.png',
    attackImagePaths: ['/villain_easy_attack_1.png', '/villain_easy_attack_2.png', '/villain_easy_attack_3.png'],
    attackType: 'melee',
    winImagePath: '/villain_easy_win.png',
    deathImagePath: '/villain_easy_death.png'
  },
  { 
    id: 'demon', 
    title: 'Asynchronous Heavenly Demon', 
    name: 'Sect Leader Await', 
    maxHp: 150, 
    currentHp: 150, 
    difficulty: 'medium',
    imagePath: '/villain_medium.png',
    attackImagePaths: ['/villain_medium_attack_1.png', '/villain_medium_attack_2.png', '/villain_medium_attack_3.png'],
    attackType: 'ranged',
    winImagePath: '/villain_medium_win.png',
    deathImagePath: '/villain_medium_death.png'
  },
  { 
    id: 'grandmaster', 
    title: 'Legacy Code Grandmaster', 
    name: 'Elder Monolith', 
    maxHp: 200, 
    currentHp: 200, 
    difficulty: 'hard',
    imagePath: '/villain_hard.png',
    attackImagePaths: ['/villain_hard_attack_1.png', '/villain_hard_attack_2.png', '/villain_hard_attack_3.png'],
    attackType: 'ranged',
    winImagePath: '/villain_hard_win.png',
    deathImagePath: '/villain_hard_death.png'
  },
];

const DAMAGE_MAP = { easy: 20, medium: 25, hard: 30 };
const PLAYER_DAMAGE_MAP = { easy: 10, medium: 15, hard: 20 };
const TIMER_MAP = { easy: 20, medium: 16, hard: 12 };

export default function App() {
  // Game State
  const [gameState, setGameState] = useState<GameState>({
    playerHp: 100,
    playerMaxHp: 100,
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    enemiesDefeated: 0,
    status: 'start',
  });

  const [playerChar, setPlayerChar] = useState<PlayerCharacter | null>(null);
  const [enemy, setEnemy] = useState<Enemy | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionPool, setQuestionPool] = useState<Question[]>([]);
  
  // Battle UI State
  const [timeLeft, setTimeLeft] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [battleLog, setBattleLog] = useState<BattleAction[]>([]);
  
  // Animations
  const [isPlayerAttacking, setIsPlayerAttacking] = useState(false);
  const [isEnemyAttacking, setIsEnemyAttacking] = useState(false);
  const [damageTakenByEnemy, setDamageTakenByEnemy] = useState<number | null>(null);
  const [damageTakenByPlayer, setDamageTakenByPlayer] = useState<number | null>(null);

  // Settings & Storage
  const [bestScore, setBestScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { playSuccess, playError, playClick } = useSound();

  const timerRef = useRef<number | null>(null);

  // Initialize
  useEffect(() => {
    const saved = localStorage.getItem('murim_best_score');
    if (saved) setBestScore(parseInt(saved, 10));
  }, []);

  // Update Best Score
  useEffect(() => {
    if ((gameState.status === 'win' || gameState.status === 'game-over') && gameState.score > bestScore) {
      setBestScore(gameState.score);
      localStorage.setItem('murim_best_score', gameState.score.toString());
    }
  }, [gameState.status, gameState.score, bestScore]);

  const addToLog = useCallback((text: string, type: 'player' | 'enemy' | 'system') => {
    setBattleLog(prev => [{ id: Math.random().toString(), text, type }, ...prev].slice(0, 5));
  }, []);

  const getNewQuestion = useCallback((pool: Question[], diff: 'easy' | 'medium' | 'hard') => {
    const available = pool.filter(q => q.difficulty === diff);
    const targetPool = available.length > 0 ? available : pool;
    if (targetPool.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * targetPool.length);
    return targetPool[randomIndex];
  }, []);

  const handleStart = () => {
    if(soundEnabled) playClick();
    setGameState(prev => ({ ...prev, status: 'character-select' }));
  };

  const handleSelectCharacter = (char: PlayerCharacter) => {
    if(soundEnabled) playClick();
    setPlayerChar(char);
    setGameState(prev => ({
      ...prev,
      playerHp: char.maxHp,
      playerMaxHp: char.maxHp,
      status: 'boss-select'
    }));
  };

  const handleSelectBoss = (selectedBoss: Enemy) => {
    if(soundEnabled) playClick();
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setQuestionPool(shuffled);
    
    // Setup fresh boss instance
    const freshBoss = { ...selectedBoss, currentHp: selectedBoss.maxHp };
    setEnemy(freshBoss);
    
    // Reset battle stats
    setGameState(prev => ({
      ...prev,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      playerHp: playerChar?.maxHp || 100, // heal before fight
      status: 'battle'
    }));
    
    setBattleLog([]);
    const nextQ = getNewQuestion(shuffled, freshBoss.difficulty);
    setCurrentQuestion(nextQ);
    if(nextQ) setQuestionPool(shuffled.filter(q => q.id !== nextQ.id));
    setTimeLeft(TIMER_MAP[freshBoss.difficulty]);
    
    addToLog(`You approached ${freshBoss.title} ${freshBoss.name}. Prepare yourself!`, 'system');
  };

  const returnToSelect = () => {
    if(soundEnabled) playClick();
    setGameState(prev => ({ ...prev, status: 'boss-select' }));
  };

  // Timer Effect
  useEffect(() => {
    if (gameState.status !== 'battle' || isAnswering || !currentQuestion || timeLeft <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState.status, isAnswering, currentQuestion, timeLeft]);

  // Store a ref to nextTurn so our timeout always grabs the freshest state
  const nextTurnRef = useRef<() => void>(() => {});

  // Update the ref to the latest nextTurn every render
  useEffect(() => {
    nextTurnRef.current = nextTurn;
  });

  // Handle auto-proceed when showFeedback is true
  useEffect(() => {
    let timeoutId: number;
    if (showFeedback && gameState.status === 'battle') {
      timeoutId = window.setTimeout(() => {
        nextTurnRef.current();
      }, 3000);
    }
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [showFeedback, gameState.status]);

  // Handle timeout when timeLeft reaches 0
  useEffect(() => {
    if (timeLeft === 0 && !isAnswering && gameState.status === 'battle') {
      handleTimeOut();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isAnswering, gameState.status]);

  const handleTimeOut = () => {
    setIsAnswering(true);
    setSelectedAnswer(-1); // Special value for timeout
    setShowFeedback(true);
    processAnswerResult(false, true);
  };

  const handleAnswer = (index: number) => {
    if (isAnswering || gameState.status !== 'battle' || !currentQuestion) return;
    
    setIsAnswering(true);
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    const isCorrect = index === currentQuestion.correctAnswerIndex;
    processAnswerResult(isCorrect, false);
  };

  const processAnswerResult = (isCorrect: boolean, isTimeout: boolean) => {
    if (!currentQuestion || !enemy) return;

    if (isCorrect) {
      if(soundEnabled) playSuccess();
      const dmg = DAMAGE_MAP[currentQuestion.difficulty];
      setIsPlayerAttacking(true);
      
      setTimeout(() => {
        setDamageTakenByEnemy(dmg);
        setEnemy(prev => prev ? { ...prev, currentHp: Math.max(0, prev.currentHp - dmg) } : null);
        setIsPlayerAttacking(false);
      }, 400);

      const timeBonus = Math.floor(timeLeft * 2);
      const scoreGain = (dmg * 10) + timeBonus;

      setGameState(prev => ({
        ...prev,
        score: prev.score + scoreGain,
        correctAnswers: prev.correctAnswers + 1
      }));
      addToLog(`Perfect strike! Dealt ${dmg} damage to ${enemy.name}.`, 'player');

    } else {
      if(soundEnabled) playError();
      const dmg = PLAYER_DAMAGE_MAP[currentQuestion.difficulty];
      
      setTimeout(() => {
        setIsEnemyAttacking(true);
        setTimeout(() => {
          setDamageTakenByPlayer(dmg);
          setGameState(prev => ({
            ...prev,
            playerHp: Math.max(0, prev.playerHp - dmg),
            wrongAnswers: prev.wrongAnswers + 1
          }));
          setIsEnemyAttacking(false);
        }, 400);
      }, 200);

      addToLog(isTimeout ? `Time passed. ${enemy.name} counters for ${dmg} damage!` : `Flawed logic. ${enemy.name} exploits the opening for ${dmg} damage!`, 'enemy');
    }
  };

  const nextTurn = () => {
    if (!enemy || !currentQuestion) return;

    setDamageTakenByEnemy(null);
    setDamageTakenByPlayer(null);
    setIsAnswering(false);
    setShowFeedback(false);
    setSelectedAnswer(null);

    // Check Win/Loss conditions
    if (gameState.playerHp <= 0) {
      setGameState(prev => ({ ...prev, status: 'game-over' }));
      return;
    }

    if (enemy.currentHp <= 0) {
      // Enemy defeated
      setGameState(prev => {
        const newDefeated = prev.enemiesDefeated + 1;
        if (newDefeated >= 3) {
          addToLog(`${enemy.name} defeated! You have conquered the Arena!`, 'system');
          return {
            ...prev,
            score: prev.score + 1000, // Grand Defeat bonus
            enemiesDefeated: newDefeated,
            status: 'win'
          };
        } else {
          addToLog(`${enemy.name} defeated! Choose your next opponent.`, 'system');
          return {
            ...prev,
            score: prev.score + 500, // Defeat bonus
            enemiesDefeated: newDefeated,
            status: 'boss-select'
          };
        }
      });
      // We don't setEnemy(null) immediately so it can be passed to EndScreen 
      // It gets overwritten safely anyway when the player picks a new boss!
      return;
    }

    // Proceed to next question
    const nextQ = getNewQuestion(questionPool, enemy.difficulty);
    if (!nextQ) {
      // Out of questions? Force win for this scope
      addToLog('You survived all techniques.', 'system');
      setGameState(prev => ({ ...prev, status: 'win' }));
      return;
    }

    setQuestionPool(prev => prev.filter(q => q.id !== nextQ.id));
    setCurrentQuestion(nextQ);
    setTimeLeft(TIMER_MAP[enemy.difficulty]);
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.status === 'battle') {
        if (!isAnswering && !showFeedback && currentQuestion) {
          const key = e.key;
          if (['1', '2', '3', '4'].includes(key)) {
            const idx = parseInt(key) - 1;
            if (idx < currentQuestion.options.length) {
              handleAnswer(idx);
            }
          }
        }
      } else if ((gameState.status === 'start') && e.key === 'Enter') {
        handleStart();
      } else if ((gameState.status === 'game-over' || gameState.status === 'win') && e.key === 'Enter') {
        returnToSelect();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.status, isAnswering, showFeedback, currentQuestion]);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Global Header/Nav */}
      <header className="absolute top-0 w-full p-4 flex justify-between items-center z-50">
        <div className="font-black italic text-xl tracking-tighter text-slate-400">
          Murim<span className="text-cyan-500">Codex</span>
        </div>
        <button 
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="w-10 h-10 rounded-none bg-slate-900 border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors"
          title="Toggle Sound"
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
      </header>

      {/* Screen Routing */}
      {gameState.status === 'start' && (
        <StartScreen onStart={handleStart} bestScore={bestScore} />
      )}

      {gameState.status === 'character-select' && (
        <CharacterSelectScreen characters={CHARACTERS} onSelect={handleSelectCharacter} />
      )}

      {gameState.status === 'boss-select' && (
        <BossSelectScreen bosses={BOSSES} onSelect={handleSelectBoss} />
      )}

      {(gameState.status === 'win' || gameState.status === 'game-over') && (
        <EndScreen gameState={gameState} player={playerChar} enemy={enemy} onRestart={returnToSelect} bestScore={bestScore} />
      )}

      {gameState.status === 'battle' && (
        <div className="max-w-5xl mx-auto p-4 pt-16 min-h-screen flex flex-col">
          
          {/* Top Bar Stats */}
          <div className="flex justify-between items-center bg-slate-900/50 border border-slate-800 p-3 rounded-none mb-6 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Score <span className="text-cyan-400 ml-2 text-lg">{gameState.score}</span>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Adversary <span className="text-red-400 ml-2 text-lg">{enemy?.name}</span>
            </div>
          </div>

          <BattleArena 
            enemy={enemy}
            player={playerChar}
            playerHp={gameState.playerHp}
            playerMaxHp={gameState.playerMaxHp}
            isPlayerAttacking={isPlayerAttacking}
            isEnemyAttacking={isEnemyAttacking}
            damageTakenByEnemy={damageTakenByEnemy}
            damageTakenByPlayer={damageTakenByPlayer}
          />

          <div className="flex-1 mt-6 relative">
            {currentQuestion && (
              <QuestionBox 
                question={currentQuestion}
                timeLeft={timeLeft}
                totalTime={TIMER_MAP[enemy?.difficulty || 'easy']}
                onAnswer={handleAnswer}
                disabled={isAnswering}
                selectedAnswer={selectedAnswer}
                showFeedback={showFeedback}
              />
            )}
          </div>

          {/* Next Turn Button / Battle Log */}
          <div className="mt-6 flex flex-col md:flex-row gap-4 items-end justify-between">
            {/* Battle Log */}
            <div className="w-full h-24 overflow-hidden relative bg-black/40 p-3 border border-slate-800">
              <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-black/60 to-transparent z-10"/>
              <div className="flex flex-col justify-end h-full font-mono text-xs opacity-80 gap-1">
                <AnimatePresence initial={false}>
                  {battleLog.slice().reverse().map((log, i) => (
                    <motion.div 
                      key={log.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: Math.max(0.2, 1 - (i * 0.2)), x: 0 }}
                      className={`${
                        log.type === 'player' ? 'text-cyan-400' : 
                        log.type === 'enemy' ? 'text-red-400' : 'text-slate-400'
                      }`}
                    >
                      {'>'} {log.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            {/* Auto-proceed logic is handled centrally via useEffect hooks above */}
          </div>

        </div>
      )}
    </div>
  );
}

