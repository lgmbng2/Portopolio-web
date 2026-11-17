/* eslint-disable react/no-unknown-property */
import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiArrowRight, FiMessageCircle, FiMinus, FiSend, FiX } from 'react-icons/fi';
import { aiKnowledge, answerPortfolioQuestion } from '../data/aiKnowledge';

const createMessageId = () => window.crypto.randomUUID();

function MascotModel({ active = false }) {
  const groupRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    if (reduceMotion) {
      groupRef.current.position.y = 0;
      groupRef.current.rotation.y = 0;
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.z = 0.35;
        rightArmRef.current.rotation.z = -0.35;
      }
      return;
    }

    const elapsed = clock.getElapsedTime();
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
        <meshStandardMaterial color="#8f8f8f" roughness={0.42} metalness={0.28} />
      </mesh>

      <mesh position={[0, 0.58, 0]}>
        <sphereGeometry args={[0.54, 48, 48]} />
        <meshStandardMaterial color="#c4c4c4" roughness={0.34} metalness={0.08} />
      </mesh>

      <mesh position={[0, 0.58, 0.49]}>
        <sphereGeometry args={[0.39, 48, 48]} />
        <meshStandardMaterial color="#262626" roughness={0.22} metalness={0.18} />
      </mesh>

      <mesh position={[-0.15, 0.66, 0.82]}>
        <sphereGeometry args={[0.055, 24, 24]} />
        <meshStandardMaterial color="#6b6b6b" emissive="#1a1a1a" emissiveIntensity={active ? 1.5 : 0.8} />
      </mesh>
      <mesh position={[0.15, 0.66, 0.82]}>
        <sphereGeometry args={[0.055, 24, 24]} />
        <meshStandardMaterial color="#6b6b6b" emissive="#1a1a1a" emissiveIntensity={active ? 1.5 : 0.8} />
      </mesh>

      <mesh position={[0, 0.47, 0.82]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.2, 0.035, 0.035]} />
        <meshStandardMaterial color="#6b6b6b" emissive="#1a1a1a" emissiveIntensity={0.65} />
      </mesh>

      <group ref={leftArmRef} position={[-0.66, -0.18, 0.02]}>
        <mesh rotation={[0, 0, -0.2]}>
          <capsuleGeometry args={[0.09, 0.58, 8, 18]} />
          <meshStandardMaterial color="#a8a8a8" roughness={0.38} />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.66, -0.18, 0.02]}>
        <mesh rotation={[0, 0, 0.2]}>
          <capsuleGeometry args={[0.09, 0.58, 8, 18]} />
          <meshStandardMaterial color="#a8a8a8" roughness={0.38} />
        </mesh>
      </group>

      <mesh position={[-0.24, -0.98, 0.1]}>
        <capsuleGeometry args={[0.1, 0.34, 8, 18]} />
        <meshStandardMaterial color="#c4c4c4" roughness={0.4} />
      </mesh>
      <mesh position={[0.24, -0.98, 0.1]}>
        <capsuleGeometry args={[0.1, 0.34, 8, 18]} />
        <meshStandardMaterial color="#c4c4c4" roughness={0.4} />
      </mesh>

      <mesh position={[0, 1.12, 0]} rotation={[0.12, 0, 0]}>
        <capsuleGeometry args={[0.035, 0.36, 8, 16]} />
        <meshStandardMaterial color="#6b6b6b" emissive="#1a1a1a" emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[0, 1.34, 0.04]}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color="#ffffff" emissive="#9a9a9a" emissiveIntensity={active ? 1.2 : 0.6} />
      </mesh>
    </group>
  );
}

function MascotCanvas({ active }) {
  return (
    <Canvas camera={{ position: [0, 0.08, 5.25], fov: 34 }} dpr={[1, 1.6]}>
      <ambientLight intensity={0.75} />
      <directionalLight position={[2.5, 3.5, 4]} intensity={1.9} />
      <pointLight position={[-2, 1, 2]} color="#ffffff" intensity={1.6} />
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
    window.location.hash = target;
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
    <>
      <AnimatePresence>
        {isOpen ? (
          <motion.button
            type="button"
            className="fixed inset-0 z-[55] bg-neutral-100 backdrop-blur-md sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={() => setIsOpen(false)}
            aria-label="Tutup AditBot"
          />
        ) : null}
      </AnimatePresence>

      <div className="fixed bottom-4 right-3 z-[60] flex max-w-[calc(100vw-1.5rem)] flex-col items-end gap-3 sm:bottom-7 sm:right-5 md:bottom-10 md:right-10">
        <AnimatePresence>
          {isOpen ? (
          <motion.section
            className="fixed inset-x-3 bottom-3 max-h-[calc(100dvh-1.5rem)] overflow-hidden rounded-2xl border border-neutral-300 bg-panel/95 backdrop-blur-xl sm:static sm:w-[min(24rem,calc(100vw-2rem))]"
            initial={{ opacity: 0, y: 34, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            aria-label="AI portfolio assistant"
          >
            <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-neutral-200 bg-white text-sm font-black text-neutral-500">
                  AB
                </div>
                <div>
                  <p className="text-sm font-black text-neutral-900">Adit AI</p>
                  <p className="text-xs text-neutral-500">Portfolio guide</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-neutral-200 text-neutral-700 transition hover:bg-neutral-200"
                aria-label="Minimize assistant"
              >
                <FiMinus />
              </button>
            </div>

            <div className="max-h-[min(24rem,48dvh)] space-y-3 overflow-y-auto px-4 py-4 sm:max-h-[23rem]">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.role === 'user'
                        ? 'bg-neutral-900 text-white'
                        : 'border border-neutral-200 bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    <p>{message.message}</p>
                    {message.action ? (
                      <button
                        type="button"
                        onClick={() => scrollToSection(message.action.target)}
                        className="mt-3 inline-flex items-center gap-2 rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-bold text-neutral-700 transition hover:bg-neutral-100/10"
                      >
                        {message.action.label}
                        <FiArrowRight />
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-200 p-4">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => askQuestion(prompt)}
                    className="shrink-0 rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-100/10"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-100 p-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Tanya seputar portfolio..."
                  className="min-w-0 flex-1 bg-transparent px-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-500"
                />
                <button
                  type="submit"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-neutral-900 text-white transition hover:bg-neutral-800"
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
          className="group relative grid h-16 w-16 place-items-center rounded-2xl border border-neutral-300 bg-panel/90 p-1 backdrop-blur-xl transition hover:border-neutral-400 sm:h-20 sm:w-20 md:h-24 md:w-24"
          whileHover={{ y: -4, scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          aria-label={isOpen ? 'Tutup AI assistant' : 'Buka AI assistant'}
        >
          <span className="absolute -left-28 top-1/2 hidden -translate-y-1/2 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-2 text-xs font-bold text-neutral-700 shadow-soft backdrop-blur transition group-hover:-translate-x-1 group-hover:text-neutral-700 md:block">
            Tanya AditBot
          </span>
          <span className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-neutral-900 text-sm text-white shadow-soft sm:right-2 sm:top-2 sm:h-7 sm:w-7 sm:text-base">
            {isOpen ? <FiX /> : <FiMessageCircle />}
          </span>
          <div className="h-full w-full overflow-hidden rounded-2xl">
            <MascotCanvas active={isOpen} />
          </div>
        </motion.button>
      </div>
    </>
  );
}
