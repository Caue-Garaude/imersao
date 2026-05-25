/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CalmBackground } from './components/QuantumScene';
import {
  Play,
  Check,
  X as XIcon,
  Star,
  Heart,
  Shield,
  Sun,
  Users,
  BookOpen,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface FadeInSectionProps {
  children?: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  delay = 0,
  className = '',
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 1, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'text';
  className?: string;
}

const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
}: ButtonProps) => {
  const baseStyle =
    'px-8 md:px-10 py-4 uppercase tracking-[0.2em] text-xs font-semibold transition-all duration-500 ease-out flex items-center gap-3 justify-center relative overflow-hidden';
  const variants = {
    primary:
      'bg-terracotta text-white hover:bg-terracotta-dark shadow-lg hover:shadow-xl hover:shadow-terracotta/30',
    outline:
      'border border-terracotta text-terracotta hover:bg-terracotta hover:text-white',
    text: 'text-terracotta border-b border-transparent hover:border-terracotta px-0 py-2',
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {/* brilho sutil animado */}
      {variant === 'primary' && (
        <span className="pointer-events-none absolute inset-0 opacity-60">
          <span className="absolute -left-1/3 top-0 h-full w-1/3 bg-white/20 skew-x-[-20deg] animate-[shine_2.8s_ease-in-out_infinite]" />
        </span>
      )}
      <span className="relative z-10">{children}</span>

      <style>{`
        @keyframes shine {
          0% { transform: translateX(-120%) skewX(-20deg); opacity: 0; }
          20% { opacity: .45; }
          50% { opacity: .25; }
          100% { transform: translateX(320%) skewX(-20deg); opacity: 0; }
        }
      `}</style>
    </motion.button>
  );
};

// Data for the 6 Steps of the Method
const methodSteps = [
  {
    title: 'Reconhecer',
    desc: 'Enxergar o que você vem carregando — sem autoengano e sem culpa.',
    icon: <BookOpen className="w-6 h-6 text-terracotta" />,
  },
  {
    title: 'Resgatar',
    desc: 'Voltar para você: identidade, voz, desejos e limites saudáveis.',
    icon: <Heart className="w-6 h-6 text-terracotta" />,
  },
  {
    title: 'Ressignificar',
    desc: 'Dar um novo sentido ao que feriu — e parar de repetir a dor.',
    icon: <Star className="w-6 h-6 text-terracotta" />,
  },
  {
    title: 'Reconstruir',
    desc: 'Criar decisões emocionais e espirituais mais firmes e conscientes.',
    icon: <Shield className="w-6 h-6 text-terracotta" />,
  },
  {
    title: 'Reposicionar',
    desc: 'Assumir clareza, limites e direção — sem se anular por ninguém.',
    icon: <Sun className="w-6 h-6 text-terracotta" />,
  },
  {
    title: 'Multiplicar',
    desc: 'Levar a transformação para casa, relações e rotina — com leveza real.',
    icon: <Users className="w-6 h-6 text-terracotta" />,
  },
];

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [heroStarted, setHeroStarted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
   <div className="min-h-screen bg-[#140f0d] text-[#f3ede6] font-sans selection:bg-terracotta selection:text-white overflow-x-hidden">
   {/* Background Ambience */}
   <div className="fixed inset-0 z-0 opacity-35 pointer-events-none mix-blend-screen">
      <CalmBackground />
   </div>

   {/* Navigation - Minimalist */}
   <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
         scrolled
         ? 'bg-[#140f0d]/95 backdrop-blur-md py-4 border-b border-white/10 shadow-sm'
         : 'bg-transparent py-8'
      }`}
   >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
         <div
         className="font-serif text-2xl tracking-widest text-[#f3ede6] font-bold cursor-pointer"
         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
         >
         RESSIGNIFICA
         </div>
         <button
         onClick={() => scrollToSection('investimento')}
         className={`hidden md:block text-xs uppercase tracking-[0.15em] border-b border-transparent hover:border-terracotta text-terracotta font-medium transition-all pb-1 ${
            scrolled ? 'opacity-100' : 'opacity-0 md:opacity-90'
         }`}
         >
         Reservar meu lugar
         </button>
      </div>
   </nav>

   <main className="relative z-10">
      {/* 1. HERO SECTION (video primeiro + mais intensidade) */}
      <section className="min-h-screen flex flex-col justify-center items-center pt-32 pb-20 px-6 relative">
         <div className="w-full max-w-6xl mx-auto">
         {/* VIDEO EM DESTAQUE (primeiro de tudo) */}
         <FadeInSection delay={0.15} className="flex justify-center">
            <div className="w-full max-w-[360px] md:max-w-[420px] mx-auto">
               <div className="aspect-[9/16] rounded-[24px] overflow-hidden relative border border-white/60 shadow-2xl shadow-terracotta/20 bg-black">

               {/* Imagem de capa preenchendo 100% (some ao dar play) */}
               {!heroStarted && (
                  <img
                     src="/ressignifica.jpg"
                     alt="Capa do video Ressignifica"
                     className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
                  />
               )}

               <video
                  className="w-full h-full object-cover relative z-20"
                  controls
                  playsInline
                  preload="metadata"
                  poster="/ressignifica.jpg"
                  onPlay={() => setHeroStarted(true)}
               >
                  <source src="/ressignifica.MP4" type="video/mp4" />
                  Seu navegador nao suporta a tag de video.
               </video>

               {!heroStarted && (
                  <div className="absolute bottom-4 left-0 right-0 text-center z-30 pointer-events-none px-4">
                     <p className="font-serif italic text-white/95 text-base md:text-lg drop-shadow-md bg-black/45 backdrop-blur-sm inline-block px-4 py-1.5 rounded-full">
                        "De o play. Voce vai se reconhecer."
                     </p>
                  </div>
               )}
               </div>
            </div>
         </FadeInSection>

         {/* TEXTO COM MAIS IMPACTO */}
         <div className="mt-12 text-center">
            <FadeInSection delay={0.25}>
               <span className="inline-block px-3 py-1 mb-6 border border-terracotta/40 rounded-full text-[10px] uppercase tracking-[0.24em] text-terracotta font-bold bg-white/5 backdrop-blur-sm">
               Imersão Ressignifica • Presencial • Grupo seleto
               </span>

               <h1 className="font-serif text-5xl md:text-7xl leading-[1.02] text-[#f3ede6] mb-6 font-normal">
               Você dá conta de tudo… <br />
               <span className="italic text-terracotta font-semibold drop-shadow-[0_10px_24px_rgba(165,83,57,0.18)]">
                  mas por dentro você está no limite?
               </span>
               </h1>

               <div className="w-24 h-[2px] bg-terracotta mx-auto mb-8 opacity-80" />
            </FadeInSection>

            <FadeInSection delay={0.35}>
               <p className="font-sans text-lg md:text-xl font-medium leading-relaxed text-white/85 max-w-3xl mx-auto mb-10">
               Se você é empresária, mãe e a “forte” da família, você conhece essa sensação:
               a vida funciona por fora — mas por dentro você está exausta, irritada, travada e com culpa por não conseguir parar.{' '}
               Aqui você vai <strong className="text-white">desligar do automático</strong> e voltar a sentir clareza, leveza e direção — de verdade.
               </p>
            </FadeInSection>

            <FadeInSection delay={0.45}>
               <div className="flex flex-col md:flex-row items-center gap-5 justify-center">
               <Button onClick={() => scrollToSection('investimento')} className="w-full md:w-auto">
                  Quero reservar minha vaga agora
               </Button>

               <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="w-full md:w-auto"
               >
                  <button
                     className="w-full md:w-auto px-8 md:px-10 py-4 uppercase tracking-[0.2em] text-xs font-semibold border border-white/15 hover:border-terracotta/60 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-500 ease-out flex items-center gap-3 justify-center text-[#f3ede6]"
                     onClick={() => scrollToSection('depoimentos')}
                  >
                     <span className="w-10 h-10 rounded-full border-2 border-terracotta/40 flex items-center justify-center text-terracotta">
                     <Play size={14} className="fill-current ml-0.5" />
                     </span>
                     Ver depoimentos (histórias reais)
                  </button>
               </motion.div>
               </div>

               <div className="mt-6 text-xs text-white/70 font-semibold tracking-wide">
               • Pausa real em Campos do Jordão • Profundidade • Acolhimento • Direção prática para a rotina
               </div>
            </FadeInSection>
         </div>
         </div>
      </section>

      {/* 2. THE METHOD */}
      <section id="metodo" className="py-24 bg-[#140f0d] relative">
         <div className="container mx-auto px-6 max-w-6xl">
         <FadeInSection>
            <div className="text-center mb-16">
               <h2 className="font-serif text-4xl md:text-5xl text-[#f3ede6] mb-4">
               O Método Ressignifica
               </h2>
               <p className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold">
               6 etapas para sair do peso invisível e voltar para você
               </p>
            </div>
         </FadeInSection>

         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {methodSteps.map((step, index) => (
               <FadeInSection key={index} delay={index * 0.1}>
               <div className="group p-8 bg-[#1c1512] border border-white/10 hover:border-terracotta transition-all duration-500 shadow-sm hover:shadow-lg rounded-sm h-full flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#140f0d] border border-terracotta/30 flex items-center justify-center mb-6 text-terracotta group-hover:bg-terracotta group-hover:text-white transition-colors shadow-sm">
                     {step.icon}
                  </div>
                  <h3 className="font-serif text-2xl text-[#f3ede6] mb-4 font-medium">
                     {step.title}
                  </h3>
                  <p className="font-medium text-white/80 leading-relaxed text-sm">
                     {step.desc}
                  </p>
               </div>
               </FadeInSection>
            ))}
         </div>

         <div className="text-center mt-16 max-w-2xl mx-auto">
            <p className="text-lg font-medium text-white/80 italic">
               "Não é sobre se consertar. É sobre voltar a ser você — com clareza, fé prática e decisões firmes."
            </p>
         </div>
         </div>
      </section>

      {/* 3. TARGET AUDIENCE & PAIN */}
      <section className="py-32 bg-[#140f0d] text-[#f3ede6] relative overflow-hidden">
         <div className="absolute inset-0 z-0 opacity-25">
         <img
            src="/fundo.jpeg"
            alt="Mulheres sentadas em roda"
            className="w-full h-full object-cover grayscale"
         />
         </div>
         <div className="absolute inset-0 bg-[#140f0d]/85 z-0"></div>

         <div className="container mx-auto px-6 max-w-6xl relative z-10">
         <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeInSection>
               <div className="w-16 h-[1px] bg-terracotta mb-8"></div>
               <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
               Para quem faz a vida acontecer por fora…{' '}
               <span className="text-terracotta font-medium">
                  mas está se perdendo por dentro
               </span>
               .
               </h2>
               <p className="text-white/85 font-light text-lg mb-8 leading-relaxed">
               Você não precisa de mais um conteúdo bonito.
               Você precisa de um lugar para <strong className="text-white">baixar a armadura</strong>, olhar para sua história com coragem e sair com um plano interno:
               limites, direção e paz na rotina.
               </p>
               <div className="grid grid-cols-1 gap-4">
               {[
                  'Sente que a mente não desliga nem quando deita na cama',
                  'Carrega culpa por se priorizar — e por isso nunca se prioriza',
                  'Perdeu a própria identidade no “eu resolvo tudo”',
                  'Vive ciclos repetidos em relacionamentos e na família',
               ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-white/85">
                     <span className="w-1.5 h-1.5 rounded-full bg-terracotta"></span>
                     {item}
                  </div>
               ))}
               </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
               <div className="bg-[#1c1512] text-[#f3ede6] p-10 md:p-12 rounded-sm shadow-2xl relative border border-white/10">
               <div className="absolute -top-4 -right-4 w-20 h-20 bg-terracotta rounded-full flex items-center justify-center text-white font-serif text-3xl font-bold opacity-90">
                  !
               </div>
               <h3 className="font-serif text-2xl mb-6 text-[#f3ede6] font-medium">
                  Não é para você se:
               </h3>
               <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3 text-white/85 font-medium">
                     <XIcon size={18} className="mt-1 text-terracotta shrink-0" />
                     Quer “uma palestra bonita” sem aplicação real na vida.
                  </li>
                  <li className="flex items-start gap-3 text-white/85 font-medium">
                     <XIcon size={18} className="mt-1 text-terracotta shrink-0" />
                     Não está pronta para encarar padrões e tomar decisões.
                  </li>
                  <li className="flex items-start gap-3 text-white/85 font-medium">
                     <XIcon size={18} className="mt-1 text-terracotta shrink-0" />
                     Procura um milagre sem responsabilidade e sem processo.
                  </li>
               </ul>

               {/* ✅ NOVO BOTÃO (pedido) */}
               <div className="mb-8">
                  <Button onClick={() => scrollToSection('investimento')} className="w-full">
                     Quero reservar minha vaga agora
                  </Button>
               </div>

               <div className="pt-6 border-t border-white/10">
                  <p className="font-serif italic text-lg text-terracotta">
                     "Isso não é motivação. É reposicionamento."
                  </p>
               </div>
               </div>
            </FadeInSection>
         </div>
         </div>
      </section>

      {/* 4. THE STORY (JULIANA STURARI) */}
      <section className="py-32 bg-[#140f0d] relative">
         <div className="container mx-auto px-6 max-w-6xl">
         <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 relative">
               <FadeInSection>
               <div className="aspect-[3/4] rounded-sm overflow-hidden border border-white/10 shadow-xl relative">
                  <img
                     src="/juliana.jpeg"
                     alt="Juliana Sturari"
                     className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-8">
                     <p className="text-white font-serif text-xl italic">
                     "Eu entendo a sua dor."
                     </p>
                  </div>
               </div>
               </FadeInSection>
            </div>

            <div className="md:col-span-7">
               <FadeInSection delay={0.2}>
               <span className="text-xs uppercase tracking-[0.2em] text-terracotta block mb-4 font-bold">
                  Quem conduz
               </span>
               <h2 className="font-serif text-4xl md:text-5xl mb-8 text-[#f3ede6]">
                  Juliana Sturari
               </h2>

               <div className="space-y-6 text-white/85 font-normal leading-relaxed text-lg">
                  <p>
                     Eu não ensino teorias que não vivi. Minha história é marcada por padrões familiares que doeram,
                     e por anos eu tentei “dar conta” — até perceber que força sem cura vira prisão.
                  </p>
                  <p>
                     Passei por crises no casamento, vivi a maternidade real com suas culpas e beleza, e enfrentei momentos
                     em que minha saúde emocional parecia ruir. A fé sempre foi base, mas precisei transformar fé em{' '}
                     <strong className="text-white">sabedoria prática</strong> para o dia a dia.
                  </p>
                  <p>
                     Em 2025, durante uma internação na UTI, escrevi a canção{' '}
                     <em>"Ressignifica"</em>. Ali, entendi que a reconstrução não acontece quando sobra tempo —
                     acontece quando você decide parar de fugir de si mesma.
                  </p>
                  <p>
                     Sou autora de <em>"Ressignificando Milagres"</em>, <em>"O Silêncio das Dores"</em> e{' '}
                     <em>"365 dias com Deus"</em>. Hoje, minha missão é guiar mulheres a voltarem para si — com clareza,
                     limites e paz verdadeira.
                  </p>
               </div>
               </FadeInSection>
            </div>
         </div>
         </div>
      </section>

      {/* 4.1 NOVA SEÇÃO (TRAVESSIA REAL - credibilidade profunda) */}
      <section className="py-28 bg-[#140f0d] relative">
         <div className="container mx-auto px-6 max-w-5xl">
         <FadeInSection>
            <div className="bg-[#1c1512] border border-white/10 shadow-sm rounded-sm p-10 md:p-14 relative overflow-hidden">
               <div className="absolute -top-24 -right-24 w-72 h-72 bg-terracotta/10 rounded-full blur-2xl pointer-events-none" />
               <div className="w-16 h-[2px] bg-terracotta mb-8 opacity-80" />

               <h2 className="font-serif text-3xl md:text-4xl text-[#f3ede6] mb-6 leading-tight">
               Essa imersão nasceu da minha própria travessia.
               </h2>

               <div className="space-y-5 text-white/85 text-lg leading-relaxed">
               <p>Eu não cheguei até aqui com uma vida perfeita.</p>
               <p>
                  Cheguei passando por dores reais, crises profundas e momentos em que me perdi de mim mesma.
               </p>
               <p>
                  Houve fases em que me anulei completamente. <br className="hidden md:block" />
                  Parei de me enxergar como mulher. <br className="hidden md:block" />
                  Vivi a maternidade com amor, mas também com exaustão emocional.
               </p>
               <p>
                  Atravessei luto, enfrentei crises no casamento, dúvidas sobre minha identidade e momentos em que não
                  sabia mais como continuar sendo quem eu era.
               </p>

               <div className="pt-2">
                  <p className="font-semibold text-white">Foi nesse processo que comecei a buscar respostas.</p>
                  <p>Na fé. No autoconhecimento. Na reconstrução diária da minha vida.</p>
               </div>

               <p className="font-medium text-white">
                  Não de forma rápida. Não de forma mágica. Mas passo a passo.
               </p>

               <p>
                  Aprendendo a ressignificar o passado. <br className="hidden md:block" />
                  A reorganizar minha história. <br className="hidden md:block" />
                  A reconstruir minha identidade. <br className="hidden md:block" />
                  A voltar a viver com leveza, clareza e paz.
               </p>

               <p className="font-semibold text-white">
                  A Ressignifica nasce exatamente daí. <br className="hidden md:block" />
                  Não de teoria. De travessia real.
               </p>

               <p>
                  E hoje eu conduzo outras mulheres pelo mesmo caminho de reconexão, fortalecimento e reconstrução de vida.
               </p>
               </div>

               <div className="mt-10 flex flex-col md:flex-row gap-4">
               <Button onClick={() => scrollToSection('investimento')} className="w-full md:w-auto">
                  Quero reservar minha vaga agora
               </Button>
               <Button variant="outline" onClick={() => scrollToSection('depoimentos')} className="w-full md:w-auto">
                  Ver histórias reais
               </Button>
               </div>
            </div>
         </FadeInSection>
         </div>
      </section>

      {/* 5. TESTIMONIALS (sem overlay conflitante + posters) */}
      <section id="depoimentos" className="py-24 bg-[#140f0d] relative">
         <div className="container mx-auto px-6 max-w-6xl">
         <FadeInSection>
            <div className="text-center mb-16">
               <h2 className="font-serif text-4xl text-[#f3ede6] mb-4">
               Histórias Reais
               </h2>
               <p className="text-terracotta uppercase tracking-[0.2em] text-xs font-bold">
               Dê o play e veja o que muda quando uma mulher se reencontra
               </p>
            </div>
         </FadeInSection>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 7 }).map((_, i) => {
               const videoSrcs = [
               '/Depoimento1.mp4',
               '/depoimento2.mp4',
               '/depoimento3.mp4',
               '/depoimento4.mp4',
               '/depoimento5.mp4',
               '/depoimento6.mp4',
               '/depoimento7.mp4',
               ];

               const posters = [
               '/depoimento1.jpg',
               '/depoimento2.jpg',
               '/depoimento3.jpg',
               '/depoimento4.jpg',
               '/depoimento5.jpg',
               '/depoimento6.jpg',
               '/depoimento7.jpg',
               ];

               return (
               <FadeInSection key={i} delay={i * 0.05} className="w-full">
                  <div className="aspect-[9/16] bg-black rounded-lg overflow-hidden relative border border-white/10 hover:border-terracotta/50 transition-all">
                     <video
                     className="w-full h-full object-cover relative z-10"
                     controls
                     playsInline
                     preload="metadata"
                     poster={posters[i]}
                     >
                     <source src={videoSrcs[i]} type="video/mp4" />
                     Seu navegador nao suporta a tag de video.
                     </video>

                     <div className="absolute top-3 left-3 z-20 pointer-events-none">
                     <p className="text-white text-xs font-bold tracking-widest bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                        DEPOIMENTO {i + 1}
                     </p>
                     </div>
                  </div>
               </FadeInSection>
               );
            })}

            <FadeInSection delay={0.6} className="w-full">
               <div className="aspect-[9/16] bg-black/20 rounded-lg overflow-hidden relative flex items-center justify-center border-2 border-dashed border-terracotta/30">
               <div className="text-center p-6">
                  <p className="font-serif text-xl text-terracotta mb-2">
                     Sua História
                  </p>
                  <p className="text-xs text-white/60">
                     Pode ser a próxima: leveza, clareza e reencontro.
                  </p>
               </div>
               </div>
            </FadeInSection>
         </div>
         </div>
      </section>

      {/* 6. EXPERIENCE & FORMAT */}
      <section className="py-24 bg-[#140f0d]">
         <div className="container mx-auto px-6 max-w-5xl">
         <FadeInSection>
            <div className="flex flex-col md:flex-row gap-12 items-center border border-white/10 p-8 md:p-12 rounded-sm bg-[#1c1512] shadow-sm">
               <div className="flex-1">
               <h2 className="font-serif text-3xl text-[#f3ede6] mb-6">
                  Como funciona a Imersão?
               </h2>
               <p className="text-white/70 font-medium mb-6 leading-relaxed">
                  É um ambiente desenhado para mulheres que carregam muito. Você chega cansada — e sai com clareza, direção e leveza prática
                  para aplicar na rotina, no casamento, na maternidade e em você.
               </p>
               <ul className="space-y-4">
                  {[
                     '3 dias presenciais em Campos do Jordão (pausa de verdade)',
                     'Hospedagem e alimentação completa inclusas',
                     'Material didático exclusivo + vivências sensoriais',
                     'Grupo seleto para garantir profundidade e acolhimento',
                     'Acompanhamento pós-imersão para não voltar ao automático',
                  ].map((item, i) => (
                     <li
                     key={i}
                     className="flex items-center gap-3 text-white/85 font-medium"
                     >
                     <Check size={18} className="text-terracotta shrink-0" />{' '}
                     {item}
                     </li>
                  ))}
               </ul>
               </div>

               <div className="flex-1 w-full">
               <div className="aspect-video bg-black/20 rounded-sm overflow-hidden relative group border border-white/10">
                  <img
                     src="/campos.jpg"
                     alt="Ambiente da imersão"
                     className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/45 backdrop-blur px-4 py-2 text-xs font-bold tracking-widest uppercase text-white">
                     Campos do Jordão
                  </div>
               </div>
               </div>
            </div>
         </FadeInSection>
         </div>
      </section>

      {/* 7. INVESTMENT & KIT */}
      <section
         id="investimento"
         className="py-32 bg-[#140f0d] relative text-[#f3ede6] overflow-hidden"
      >
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-terracotta/10 rounded-full blur-[120px] pointer-events-none"></div>

         <div className="container mx-auto px-6 max-w-6xl relative z-10">
         <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeInSection>
               <div className="relative">
               <div className="absolute -top-10 -left-10 text-white/5 font-serif text-9xl font-bold opacity-50 select-none">
                  KIT
               </div>
               <div className="aspect-square bg-[#1c1512] rounded-sm p-4 transition-transform duration-700 shadow-2xl border border-white/10">
                  <div className="w-full h-full border border-white/10 overflow-hidden relative">
                     <img
                     src="/kit.jpeg"
                     alt="Kit Ressignifica com vela, caderno e garrafa"
                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                     />
                     <div className="absolute bottom-4 left-4 bg-black/45 backdrop-blur text-white px-4 py-2 text-xs font-bold tracking-widest uppercase">
                     Incluso na inscrição
                     </div>
                  </div>
               </div>
               <p className="mt-6 text-white/85 font-medium text-center md:text-left leading-relaxed">
                  Você não está comprando “um evento”. Você está garantindo um antes e depois.
                  <br />
                  E ainda recebe o exclusivo <strong className="text-white">Kit Ressignifica</strong> para sustentar sua jornada:
                  vela aromática, caderno de jornada, caneta especial e garrafa térmica.
               </p>
               </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
               <div className="bg-[#1c1512] text-[#f3ede6] p-12 rounded-sm shadow-2xl relative border border-white/10">
               <div className="text-center">
                  <h2 className="font-serif text-3xl md:text-4xl mb-2 text-[#f3ede6]">
                     Reserve sua vaga na próxima turma
                  </h2>
                  <p className="text-terracotta uppercase tracking-widest text-xs font-bold mb-8">
                     Para mulheres que decidiram parar de se abandonar
                  </p>

                  <div className="mb-8">
                     <span className="text-lg text-white/40 line-through">
                     R$ 2.997
                     </span>
                     <div className="font-serif text-6xl text-terracotta font-medium">
                     R$ 2.497
                     </div>
                     <p className="text-white/55 text-sm mt-2">
                     à vista ou em até 12x no cartão • investimento em você
                     </p>
                  </div>

                  <div className="space-y-4 mb-10 text-left bg-black/20 p-6 rounded-sm border border-white/10">
                     <p className="font-bold text-sm text-white uppercase tracking-widest mb-2">
                     O que está incluso:
                     </p>
                     <div className="flex items-center gap-3 text-sm text-white/85 font-medium">
                     <Check size={16} className="text-terracotta" /> Hospedagem completa (3 dias)
                     </div>
                     <div className="flex items-center gap-3 text-sm text-white/85 font-medium">
                     <Check size={16} className="text-terracotta" /> Alimentação completa (todas as refeições)
                     </div>
                     <div className="flex items-center gap-3 text-sm text-white/85 font-medium">
                     <Check size={16} className="text-terracotta" /> Kit Ressignifica exclusivo
                     </div>
                     <div className="flex items-center gap-3 text-sm text-white/85 font-medium">
                     <Check size={16} className="text-terracotta" /> Material didático + vivências guiadas
                     </div>
                     <div className="flex items-center gap-3 text-sm text-white/85 font-medium">
                     <Check size={16} className="text-terracotta" /> Acompanhamento pós-imersão
                     </div>
                  </div>

                  <Button className="w-full">
                     Quero garantir minha vaga
                  </Button>
                  <p className="mt-4 text-xs text-white/45 text-center font-medium">
                     Checkout seguro • Confirmação imediata • Suporte no WhatsApp
                  </p>
               </div>
               </div>
            </FadeInSection>
         </div>
         </div>
      </section>

      {/* 8. FINAL CALL */}
      <section className="py-32 bg-[#140f0d] text-center relative">
         <div className="container mx-auto px-6 max-w-3xl">
         <FadeInSection>
            <div className="w-16 h-[1px] bg-terracotta mx-auto mb-8"></div>
            <h2 className="font-serif text-3xl md:text-5xl text-[#f3ede6] mb-8">
               "Você não precisa ser forte o tempo todo. <br />Você precisa se reencontrar."
            </h2>
            <p className="text-white/60 mb-10 italic font-serif text-xl">
               - Juliana Sturari
            </p>
            <Button variant="outline" onClick={() => scrollToSection('investimento')}>
               Quero reservar meu lugar agora
            </Button>
            <p className="mt-6 text-sm text-white/55 font-medium">
               Se você sentiu um “sim” por dentro, não ignore. A vida muda quando você escolhe você.
            </p>
         </FadeInSection>
         </div>
      </section>
   </main>

   <footer className="bg-[#0f0b09] py-16 text-[#f3ede6] border-t border-white/10">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12 text-sm font-light">
         <div className="md:col-span-1">
         <div className="font-serif text-2xl tracking-widest text-white mb-6">
            RESSIGNIFICA
         </div>
         <p className="opacity-60 mb-6">
            Uma experiência baseada no Método Ressignifica por Juliana Sturari.
            Todos os direitos reservados &copy; 2024.
         </p>
         </div>
         <div className="md:col-span-1">
         <h4 className="uppercase tracking-widest text-terracotta mb-4 font-bold text-xs">
            Contato
         </h4>
         <p className="opacity-60 mb-2">juliana.sturari@gmail.com</p>
         <p className="opacity-60">(11) 99856-7718</p>
         </div>
         <div className="md:col-span-1">
         <h4 className="uppercase tracking-widest text-terracotta mb-4 font-bold text-xs">
            Redes Sociais
         </h4>
         <a
            href="#"
            className="block opacity-60 hover:opacity-100 transition-opacity mb-2"
         >
            @juliana.sturari
         </a>
         </div>
      </div>
   </footer>
   </div>
);
};

export default App;
