/* eslint-disable react/no-unknown-property */
import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowRight, FiMessageCircle, FiMinus, FiSend, FiX } from 'react-icons/fi';
import { aiKnowledge, answerPortfolioQuestion } from '../data/aiKnowledge';

const createMessageId = () => window.crypto.randomUUID();

function MascotModel({ active = false }) {
  const groupRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (!groupRef.current) return;

    groupRef.current.position.y = Math.sin(elapsed * 1.6) * 0.08;
    groupRef.current.rotation.y = Math.sin(elapsed * 0.9) * 0.18;

    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.z = 0.35 + Math.sin(elapsed * 2.2) * 0.18;
      rightArmRef.current.rotation.z = -0.35 - Math.sin(elapsed * 2.2) * 0.18;
    }
  });

  return (
    <group ref={groupRef} scale={active ? 0.88 : 0.82}>
      <mesh position={[0, -0.28, 0]}>
        <sphereGeometry args={[0.74, 48, 48]} />
        <meshStandardMaterial color="#1dd4e8" roughness={0.42} metalness={0.28} />
      </mesh>

      <mesh position={[0, 0.58, 0]}>
        <sphereGeometry args={[0.54, 48, 48]} />
        <meshStandardMaterial color="#f8fbff" roughness={0.34} metalness={0.08} />
      </mesh>

      <mesh position={[0, 0.58, 0.49]}>
        <sphereGeometry args={[0.39, 48, 48]} />
        <meshStandardMaterial color="#08111f" roughness={0.22} metalness={0.18} />
      </mesh>

      <mesh position={[-0.15, 0.66, 0.82]}>
        <sphereGeometry args={[0.055, 24, 24]} />
        <meshStandardMaterial color="#67e8f9" emissive="#0ea5e9" emissiveIntensity={active ? 1.5 : 0.8} />
      </mesh>
      <mesh position={[0.15, 0.66, 0.82]}>
        <sphereGeometry args={[0.055, 24, 24]} />
        <meshStandardMaterial color="#67e8f9" emissive="#0ea5e9" emissiveIntensity={active ? 1.5 : 0.8} />
      </mesh>

      <mesh position={[0, 0.47, 0.82]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.2, 0.035, 0.035]} />
        <meshStandardMaterial color="#67e8f9" emissive="#0ea5e9" emissiveIntensity={0.65} />
      </mesh>

      <group ref={leftArmRef} position={[-0.66, -0.18, 0.02]}>
        <mesh rotation={[0, 0, -0.2]}>
          <capsuleGeometry args={[0.09, 0.58, 8, 18]} />
          <meshStandardMaterial color="#e8fbff" roughness={0.38} />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.66, -0.18, 0.02]}>
        <mesh rotation={[0, 0, 0.2]}>
          <capsuleGeometry args={[0.09, 0.58, 8, 18]} />
          <meshStandardMaterial color="#e8fbff" roughness={0.38} />
        </mesh>
      </group>

      <mesh position={[-0.24, -0.98, 0.1]}>
        <capsuleGeometry args={[0.1, 0.34, 8, 18]} />
        <meshStandardMaterial color="#f8fbff" roughness={0.4} />
      </mesh>
      <mesh position={[0.24, -0.98, 0.1]}>
        <capsuleGeometry args={[0.1, 0.34, 8, 18]} />
        <meshStandardMaterial color="#f8fbff" roughness={0.4} />
      </mesh>

      <mesh position={[0, 1.12, 0]} rotation={[0.12, 0, 0]}>
        <capsuleGeometry args={[0.035, 0.36, 8, 16]} />
        <meshStandardMaterial color="#67e8f9" emissive="#0891b2" emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[0, 1.34, 0.04]}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color="#facc15" emissive="#f59e0b" emissiveIntensity={active ? 1.2 : 0.6} />
      </mesh>
    </group>
  );
}

function MascotCanvas({ active }) {
  return (
    <Canvas camera={{ position: [0, 0.08, 5.25], fov: 34 }} dpr={[1, 1.6]}>
      <ambientLight intensity={0.75} />
      <directionalLight position={[2.5, 3.5, 4]} intensity={1.9} />
      <pointLight position={[-2, 1, 2]} color="#22d3ee" intensity={1.6} />
      <Suspense fallback={null}>
        <MascotModel active={active} />
      </Suspense>
    </Canvas>
  );
}

const createBotMessage = (question) => ({
  id: createMessageId(),
  role: 'assistant',
  ...answerPortfolioQuestion(question),
});

export default function AiMascotAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => [
    {
      id: createMessageId(),
      role: 'assistant',
      message: 'Halo, aku AditBot. Aku bisa bantu jelasin portfolio Aditya, ngobrol ringan, dan hitung matematika simpel.',
      action: { label: 'Mulai dari Projects', target: 'projects' },
    },
  ]);

  const quickPrompts = useMemo(() => aiKnowledge.quickPrompts, []);

  const scrollToSection = (target) => {
    const element = document.getElementById(target);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const askQuestion = (question) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    setMessages((current) => [
      ...current,
      { id: createMessageId(), role: 'user', message: trimmedQuestion },
      createBotMessage(trimmedQuestion),
    ]);
    setInput('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    askQuestion(input);
  };

  return (
    <div className="fixed bottom-4 right-3 z-[60] flex max-w-[calc(100vw-1.5rem)] flex-col items-end gap-3 sm:bottom-7 sm:right-5 md:bottom-10 md:right-10">
      <AnimatePresence>
        {isOpen ? (
          <motion.section
            className="w-[min(22rem,calc(100vw-1.5rem))] overflow-hidden rounded-3xl border border-cyan-300/20 bg-[#0b1220]/95 shadow-glass backdrop-blur-xl sm:w-[min(24rem,calc(100vw-2rem))]"
            initial={{ opacity: 0, y: 22, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            aria-label="AI portfolio assistant"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 overflow-hidden rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
                  <MascotCanvas active={isOpen} />
                </div>
                <div>
                  <p className="text-sm font-black text-white">Adit AI</p>
                  <p className="text-xs text-slate-400">Portfolio guide</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-slate-200 transition hover:bg-white/10"
                aria-label="Minimize assistant"
              >
                <FiMinus />
              </button>
            </div>

            <div className="max-h-[min(22rem,52vh)] space-y-3 overflow-y-auto px-4 py-4 sm:max-h-[23rem]">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.role === 'user'
                        ? 'bg-cyan-300 text-slate-950'
                        : 'border border-white/10 bg-slate-950/60 text-slate-200'
                    }`}
                  >
                    <p>{message.message}</p>
                    {message.action ? (
                      <button
                        type="button"
                        onClick={() => scrollToSection(message.action.target)}
                        className="mt-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 px-3 py-1.5 text-xs font-bold text-cyan-100 transition hover:bg-cyan-300/10"
                      >
                        {message.action.label}
                        <FiArrowRight />
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => askQuestion(prompt)}
                    className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-300/35 hover:bg-cyan-300/10"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 p-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Tanya seputar portfolio..."
                  className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-300 text-slate-950 transition hover:bg-cyan-200"
                  aria-label="Kirim pertanyaan"
                >
                  <FiSend />
                </button>
              </form>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="group relative grid h-16 w-16 place-items-center rounded-[1.25rem] border border-cyan-300/30 bg-[#0b1220]/90 p-1 shadow-glass backdrop-blur-xl transition hover:border-cyan-200/70 sm:h-20 sm:w-20 sm:rounded-[1.5rem] md:h-24 md:w-24"
        whileHover={{ y: -4, scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        aria-label={isOpen ? 'Tutup AI assistant' : 'Buka AI assistant'}
      >
        <span className="absolute -left-28 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/10 bg-slate-950/80 px-3 py-2 text-xs font-bold text-slate-200 shadow-soft backdrop-blur transition group-hover:-translate-x-1 group-hover:text-cyan-100 md:block">
          Tanya AditBot
        </span>
        <span className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-cyan-300 text-sm text-slate-950 shadow-soft sm:right-2 sm:top-2 sm:h-7 sm:w-7 sm:text-base">
          {isOpen ? <FiX /> : <FiMessageCircle />}
        </span>
        <div className="h-full w-full overflow-hidden rounded-[1.25rem]">
          <MascotCanvas active={isOpen} />
        </div>
      </motion.button>
    </div>
  );
}
