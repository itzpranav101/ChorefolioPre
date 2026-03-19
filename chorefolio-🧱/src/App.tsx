import React, { useEffect, useRef, useState, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Wallet, 
  TrendingUp, 
  CheckCircle2, 
  BrainCircuit, 
  ShieldCheck, 
  Trophy, 
  ArrowRight, 
  Menu, 
  X, 
  Star,
  ChevronRight,
  Zap,
  PiggyBank,
  Gamepad2,
  Users,
  Sparkles,
  Smartphone,
  BarChart3,
  Target,
  Lock,
  Linkedin,
  Twitter,
  Mail,
  Sun,
  Moon,
  Quote
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

// --- Components ---

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

interface GlowCardProps {
  key?: any;
  title: string;
  description: string;
  icon: any;
  delay?: number;
}

const GlowCard = ({ title, description, icon: Icon, delay = 0 }: GlowCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="group rounded-3xl p-10 bg-white border border-corporate-grey overflow-hidden"
    >
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-corporate-gold/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
          <Icon className="text-corporate-gold w-7 h-7" />
        </div>
        <h3 className="text-2xl font-serif font-bold mb-4 text-corporate-blue transition-colors duration-300">
          {title}
        </h3>
        <p className="text-corporate-blue leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const Navbar = ({ onJoinWaitlist }: { onJoinWaitlist: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-corporate-stone/80 backdrop-blur-md border-b border-corporate-grey/30' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-corporate-blue rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
            <PiggyBank className="text-corporate-gold w-5 h-5" />
          </div>
          <span className="font-script text-2xl text-corporate-blue lowercase">chorefolio</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <a href="#features" className="text-sm font-medium text-corporate-blue/70 hover:text-corporate-gold transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-corporate-blue/70 hover:text-corporate-gold transition-colors">How it Works</a>
          <a href="#parents" className="text-sm font-medium text-corporate-blue/70 hover:text-corporate-gold transition-colors">For Parents</a>
          <a href="#gamification" className="text-sm font-medium text-corporate-blue/70 hover:text-corporate-gold transition-colors">Gamification</a>
          
          <button 
            onClick={onJoinWaitlist}
            className="px-6 py-2.5 bg-corporate-blue text-white text-sm font-bold rounded-lg hover:bg-corporate-gold hover:text-corporate-blue transition-all duration-300"
          >
            Join Waitlist
          </button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button 
            className="text-corporate-blue"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-corporate-stone border-t border-corporate-grey overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <a href="#features" className="text-lg font-serif font-bold text-corporate-blue" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#how-it-works" className="text-lg font-serif font-bold text-corporate-blue" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
              <a href="#parents" className="text-lg font-serif font-bold text-corporate-blue" onClick={() => setMobileMenuOpen(false)}>For Parents</a>
              <a href="#gamification" className="text-lg font-serif font-bold text-corporate-blue" onClick={() => setMobileMenuOpen(false)}>Gamification</a>
              <button 
                onClick={() => { setMobileMenuOpen(false); onJoinWaitlist(); }}
                className="w-full py-4 bg-corporate-blue text-white font-bold rounded-xl"
              >
                Join Waitlist
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onJoinWaitlist }: { onJoinWaitlist: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo('.hero-title', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.5 }
    );
    
    gsap.fromTo('.hero-desc', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.8 }
    );
    
    gsap.fromTo('.hero-btns', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 1.1 }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center">
        <div className="z-10">
          <h1 className="hero-title font-serif text-6xl md:text-8xl font-bold leading-[1.05] text-corporate-blue mb-8">
            Turn chores into <br />
            <span className="text-corporate-gold italic">money.</span> <br />
            Turn money into <br />
            <span className="text-corporate-gold italic">investing skills.</span>
          </h1>
          
          <p className="hero-desc text-xl text-corporate-blue/70 max-w-xl leading-relaxed mb-12">
            The first gamified finance platform where kids earn, save, and invest in a safe environment. Powered by AI to teach real-world financial literacy.
          </p>
          
          <div className="hero-btns flex flex-col sm:flex-row gap-6">
            <button 
              onClick={onJoinWaitlist}
              className="btn-primary flex items-center justify-center gap-2 group"
            >
              Join the Waitlist <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-gold flex items-center justify-center gap-2">
              Watch Demo
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          {/* Main App Frame */}
          <div className="relative z-10 glass rounded-[3.5rem] p-5 shadow-2xl border-white/20 transform hover:scale-[1.02] transition-transform duration-700">
            <div className="bg-corporate-stone rounded-[2.8rem] overflow-hidden aspect-[9/19] w-full max-w-[380px] mx-auto relative shadow-inner border border-white/10">
              {/* App Header */}
              <div className="p-8 pb-4 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-bold text-corporate-blue/40 uppercase tracking-widest mb-1">Welcome back,</p>
                  <p className="text-xl font-serif font-bold text-corporate-blue">Alex Chen</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-corporate-gold/20 flex items-center justify-center">
                  <Star className="text-corporate-gold w-5 h-5 fill-corporate-gold" />
                </div>
              </div>

              {/* Balance Card */}
              <div className="px-8 mb-8">
                <div className="bg-corporate-blue p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-corporate-gold/10 blur-2xl rounded-full" />
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Total Balance</p>
                  <p className="text-3xl font-serif font-bold mb-4">$1,240.50</p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 -rotate-45" />
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 rotate-135" />
                      </div>
                    </div>
                    <p className="text-xs font-bold text-emerald-400">+12.4%</p>
                  </div>
                </div>
              </div>

              {/* Chores Section */}
              <div className="px-8 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xs font-bold text-corporate-blue/40 uppercase tracking-widest">Active Chores</p>
                  <p className="text-[10px] font-bold text-corporate-gold uppercase tracking-widest">View All</p>
                </div>
                <div className="space-y-3">
                  {[
                    { title: "Mow the Lawn", reward: "$15.00", icon: Zap },
                    { title: "Clean Room", reward: "$5.00", icon: CheckCircle2 }
                  ].map((chore, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-corporate-grey">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-corporate-stone rounded-xl flex items-center justify-center">
                          <chore.icon className="w-5 h-5 text-corporate-blue" />
                        </div>
                        <p className="text-sm font-bold text-corporate-blue">{chore.title}</p>
                      </div>
                      <p className="text-sm font-serif font-bold text-corporate-gold">{chore.reward}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stock Market Preview */}
              <div className="px-8">
                <p className="text-xs font-bold text-corporate-blue/40 uppercase tracking-widest mb-4">Market Watch</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { symbol: "AAPL", price: "$182.40", change: "+1.2%" },
                    { symbol: "TSLA", price: "$240.10", change: "-0.8%" }
                  ].map((stock, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-corporate-grey text-center">
                      <p className="text-xs font-bold text-corporate-blue mb-1">{stock.symbol}</p>
                      <p className="text-sm font-serif font-bold text-corporate-blue">{stock.price}</p>
                      <p className={`text-[10px] font-bold ${stock.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{stock.change}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Nav Simulation */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-corporate-grey flex items-center justify-around px-6">
                <Wallet className="w-6 h-6 text-corporate-blue" />
                <TrendingUp className="w-6 h-6 text-corporate-blue/20" />
                <div className="w-12 h-12 bg-corporate-blue rounded-full flex items-center justify-center -translate-y-6 shadow-xl border-4 border-corporate-stone">
                  <Sparkles className="text-corporate-gold w-6 h-6" />
                </div>
                <Trophy className="w-6 h-6 text-corporate-blue/20" />
                <Users className="w-6 h-6 text-corporate-blue/20" />
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 glass p-6 rounded-3xl shadow-2xl border-white/40"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="text-emerald-500 w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-corporate-blue/50 font-bold uppercase tracking-widest">Monthly Growth</p>
                  <p className="text-xl font-serif font-bold text-corporate-blue">+24.5%</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 glass p-6 rounded-3xl shadow-2xl border-white/40"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-corporate-gold/20 rounded-xl flex items-center justify-center">
                  <Trophy className="text-corporate-gold w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-corporate-blue/50 font-bold uppercase tracking-widest">New Achievement</p>
                  <p className="text-xl font-serif font-bold text-corporate-blue">Master Saver</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Earn from Chores",
      description: "Turn daily tasks into rewarding opportunities. Kids learn the value of work through a gamified chore system."
    },
    {
      icon: BarChart3,
      title: "Simulated Stocks",
      description: "Invest in real companies with live market data. Zero risk, pure learning. Build a portfolio like a Wall Street pro."
    },
    {
      icon: PiggyBank,
      title: "Compound Interest",
      description: "Watch savings grow with automated interest systems. Teach kids the power of long-term thinking and patience."
    },
    {
      icon: BrainCircuit,
      title: "AI Financial Advisor",
      description: "Personalized guidance that explains market trends and savings strategies in a way kids actually understand."
    },
    {
      icon: Trophy,
      title: "Goal-Based Rewards",
      description: "Set targets for big purchases. Visual milestones help kids stay motivated and track their progress."
    },
    {
      icon: ShieldCheck,
      title: "Parental Controls",
      description: "Full visibility and approval for every transaction. A safe, closed-loop environment for financial exploration."
    }
  ];

  return (
    <section id="features" className="py-32 bg-corporate-stone relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-serif font-bold text-corporate-blue mb-8"
          >
            Everything they need to <br />
            <span className="text-corporate-gold italic">succeed.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-corporate-blue/60 max-w-2xl mx-auto leading-relaxed"
          >
            We've built a complete ecosystem to turn kids into financial masters before they even graduate.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <GlowCard 
              key={i}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TrustBar = () => {
  return (
    <div className="py-12 border-y border-corporate-grey bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[10px] font-bold text-corporate-blue/40 uppercase tracking-[0.3em] mb-8">Trusted by families from leading institutions</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {['Goldman', 'Morgan Stanley', 'J.P. Morgan', 'BlackRock', 'Vanguard'].map((name) => (
            <span key={name} className="font-serif text-xl md:text-2xl font-bold text-corporate-blue">{name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      icon: Users,
      title: "Set the Stage",
      role: "Parents",
      description: "Assign chores, set interest rates, and establish investment boundaries for your kids."
    },
    {
      icon: Zap,
      title: "Earn & Learn",
      role: "Kids",
      description: "Complete tasks to unlock rewards and gain real-world work experience through effort."
    },
    {
      icon: TrendingUp,
      title: "Grow Wealth",
      role: "Kids",
      description: "Allocate earnings into savings or simulated stocks to see the power of compounding."
    },
    {
      icon: BrainCircuit,
      title: "Master Finance",
      role: "Kids",
      description: "Use AI insights to understand market trends and build lifelong wealth habits."
    }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-serif font-bold text-corporate-blue mb-8"
          >
            How it <span className="text-corporate-gold italic">Works.</span>
          </motion.h2>
          <p className="text-xl text-corporate-blue/60 max-w-2xl mx-auto leading-relaxed">
            A simple, sequential journey designed to build financial confidence for the whole family.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-corporate-grey -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-3xl bg-corporate-stone flex items-center justify-center mb-8 shadow-inner border border-corporate-grey relative group">
                  <div className="absolute -top-3 -right-3 px-3 py-1 bg-corporate-blue text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
                    {step.role}
                  </div>
                  <step.icon className="text-corporate-blue w-10 h-10 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-corporate-blue">
                  {step.title}
                </h3>
                <p className="text-corporate-blue/70 leading-relaxed text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ForParents = () => {
  return (
    <section id="parents" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl bg-corporate-blue p-12 aspect-[4/3] flex flex-col justify-center items-center text-center"
          >
            <ShieldCheck className="w-24 h-24 text-corporate-gold mb-6" />
            <h3 className="text-3xl font-serif font-bold text-white mb-4">Safety First</h3>
            <p className="text-white/60 max-w-sm">A secure, closed-loop environment designed for learning without financial risk.</p>
          </motion.div>
        </div>

        <div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-corporate-blue mb-8 leading-tight">
            Peace of mind for <span className="italic">parents.</span>
          </h2>
          <div className="space-y-10">
            {[
              { 
                icon: Lock,
                title: "Full Control", 
                desc: "Approve chores, investments, and withdrawals with one tap. You're always in the driver's seat." 
              },
              { 
                icon: ShieldCheck,
                title: "Safe Environment", 
                desc: "No real money is at risk in the stock simulator. It's a risk-free playground for financial growth." 
              },
              { 
                icon: BarChart3,
                title: "Educational Insights", 
                desc: "Get weekly reports on your child's financial progress, learning milestones, and spending habits." 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-corporate-blue text-corporate-gold rounded-2xl flex items-center justify-center">
                  <item.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-corporate-blue mb-2">{item.title}</h3>
                  <p className="text-corporate-blue/60 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Gamification = () => {
  return (
    <section id="gamification" className="py-32 bg-corporate-stone overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-bold text-corporate-blue mb-8"
        >
          <Gamepad2 className="w-4 h-4" /> Level Up Their Future
        </motion.div>
        <h2 className="font-serif text-4xl md:text-7xl font-bold mb-16 text-corporate-blue">
          It's not a bank. <br /> It's a <span className="text-corporate-gold italic">game.</span>
        </h2>
        
        <div className="relative max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {[
              { label: "Daily Streaks", val: "12 Days", color: "from-orange-400 to-red-400", icon: Zap },
              { label: "Current Level", val: "Level 24", color: "from-corporate-blue to-corporate-gold", icon: Trophy },
              { label: "Total XP", val: "12,450", color: "from-purple-400 to-pink-400", icon: Sparkles }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 rounded-[2.5rem] border-white/40 shadow-xl group hover:scale-105 transition-transform duration-500"
              >
                <div className="w-12 h-12 bg-corporate-stone rounded-xl flex items-center justify-center mb-6 mx-auto shadow-inner">
                  <stat.icon className="w-6 h-6 text-corporate-blue" />
                </div>
                <p className="text-corporate-blue/50 text-xs font-bold uppercase tracking-widest mb-2">{stat.label}</p>
                <p className={`text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>{stat.val}</p>
                <div className="mt-6 w-full h-2 bg-corporate-grey rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '70%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className={`h-full bg-gradient-to-r ${stat.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = ({ onJoinWaitlist }: { onJoinWaitlist: () => void }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(1248);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) onJoinWaitlist();
  };

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="glass p-16 md:p-24 rounded-[4rem] border-white/40 shadow-2xl relative overflow-hidden">
          <h2 className="font-serif text-5xl md:text-8xl font-bold mb-8 text-corporate-blue">
            Ready to build their <br />
            <span className="text-corporate-gold italic">future?</span>
          </h2>
          <p className="text-2xl text-corporate-blue/60 mb-16 font-light max-w-2xl mx-auto leading-relaxed">
            Join <span className="font-bold text-corporate-blue">{count.toLocaleString()}</span> families getting early access to the financial revolution for kids.
          </p>
          
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit} 
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              >
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow bg-white border border-corporate-grey rounded-2xl px-8 py-5 focus:outline-none focus:border-corporate-gold transition-all text-corporate-blue shadow-inner text-lg"
                />
                <button className="btn-primary !py-5 px-10 whitespace-nowrap">
                  Get Early Access
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-corporate-blue/5 border border-corporate-blue/10 p-10 rounded-3xl"
              >
                <Sparkles className="w-12 h-12 text-corporate-gold mx-auto mb-4" />
                <p className="text-corporate-blue font-serif font-bold text-2xl">You're on the list!</p>
                <p className="text-corporate-blue/60 mt-2">We'll be in touch soon with your early access invite.</p>
              </motion.div>
            )}
          </AnimatePresence>
          <p className="mt-10 text-corporate-blue/40 text-sm font-medium uppercase tracking-widest">No credit card required. Limited spots available.</p>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 border-t border-corporate-grey bg-corporate-stone">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-corporate-blue rounded-xl flex items-center justify-center shadow-lg shadow-corporate-blue/20">
              <PiggyBank className="text-corporate-gold w-5 h-5" />
            </div>
            <span className="font-script text-2xl text-corporate-blue lowercase">chorefolio</span>
          </div>
          
          <div className="flex gap-12 text-sm font-bold text-corporate-blue/50 uppercase tracking-widest">
            <a href="#" className="hover:text-corporate-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-corporate-gold transition-colors">Terms</a>
            <a href="#" className="hover:text-corporate-gold transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="pt-12 border-t border-corporate-grey flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-sm text-corporate-blue/40 font-medium">
            Built by two teenage founders — <span className="text-corporate-blue">pranav & andrea</span>
          </p>
          <div className="flex gap-6">
            <a href="#" className="w-10 h-10 rounded-full border border-corporate-grey flex items-center justify-center text-corporate-blue/40 hover:text-corporate-blue hover:border-corporate-blue transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-corporate-grey flex items-center justify-center text-corporate-blue/40 hover:text-corporate-blue hover:border-corporate-blue transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FoundersNote = () => {
  return (
    <section className="py-32 bg-corporate-stone relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass p-8 md:p-20 rounded-[3rem] border-white/40 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-corporate-blue text-corporate-gold rounded-2xl flex items-center justify-center mb-8 mx-auto">
              <Quote className="w-8 h-8" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-corporate-blue mb-8 leading-tight">
              A note from the <span className="text-corporate-gold italic">founders.</span>
            </h2>
            <p className="text-xl text-corporate-blue/70 leading-relaxed mb-8 italic">
              "We started Chorefolio because we realized that traditional banking apps for kids were either too boring or too complicated. As teenagers ourselves, we wanted something that felt like a game but taught us real-world skills like stock market investing and compound interest."
            </p>
            <div className="flex flex-col items-center gap-2">
              <p className="font-bold text-corporate-blue text-lg">pranav & andrea</p>
              <p className="text-sm text-corporate-blue/50 uppercase tracking-widest font-bold">Co-Founders, Chorefolio</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WaitlistPage = ({ onBack }: { onBack: () => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-corporate-stone flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-12 md:p-20 rounded-[3rem] border-white/40 shadow-2xl text-center max-w-2xl w-full"
        >
          <div className="w-20 h-20 bg-corporate-blue text-corporate-gold rounded-3xl flex items-center justify-center mb-8 mx-auto">
            <Sparkles className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-serif font-bold text-corporate-blue mb-6">You're on the list!</h2>
          <p className="text-xl text-corporate-blue/70 mb-10 leading-relaxed">
            Thank you for joining the Chorefolio revolution. We've sent a confirmation email to <span className="font-bold text-corporate-blue">{formData.email}</span>.
          </p>
          <button 
            onClick={onBack}
            className="btn-primary"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-corporate-stone pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Back Arrow */}
      <button 
        onClick={onBack}
        className="fixed top-10 left-10 w-12 h-12 bg-white border border-corporate-grey rounded-full flex items-center justify-center text-corporate-blue hover:bg-corporate-blue hover:text-white transition-all z-50 shadow-sm"
      >
        <ArrowRight className="w-6 h-6 rotate-180" />
      </button>

      <div className="max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-10 md:p-16 rounded-[3rem] border-white/40 shadow-2xl"
        >
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-corporate-blue rounded-2xl flex items-center justify-center mb-8 mx-auto">
              <PiggyBank className="text-corporate-gold w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-corporate-blue mb-4">Join the Waitlist</h1>
            <p className="text-corporate-blue/60">Secure your spot in the future of family finance.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-corporate-blue uppercase tracking-widest mb-2 ml-1">Full Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full bg-white border border-corporate-grey rounded-2xl px-6 py-4 focus:outline-none focus:border-corporate-gold transition-all text-corporate-blue shadow-inner"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-corporate-blue uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="w-full bg-white border border-corporate-grey rounded-2xl px-6 py-4 focus:outline-none focus:border-corporate-gold transition-all text-corporate-blue shadow-inner"
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full btn-primary !py-5 text-lg flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>Get Early Access <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>
          
          <p className="mt-8 text-center text-xs text-corporate-blue/40 font-medium uppercase tracking-widest">
            By joining, you agree to our privacy policy and terms of service.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'waitlist'>('home');

  useEffect(() => {
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (currentPage === 'waitlist') {
    return (
      <div className="min-h-screen bg-corporate-stone selection:bg-corporate-gold/30">
        <WaitlistPage onBack={() => setCurrentPage('home')} />
      </div>
    );
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-corporate-stone transition-colors duration-500 selection:bg-corporate-gold/30">
        <Navbar onJoinWaitlist={() => setCurrentPage('waitlist')} />
        <main className="blender-viewport">
          <div className="page-3d-wrapper">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Hero onJoinWaitlist={() => setCurrentPage('waitlist')} />
              <TrustBar />
              <HowItWorks />
              <Features />
              <ForParents />
              <Gamification />
              <FoundersNote />
              <FinalCTA onJoinWaitlist={() => setCurrentPage('waitlist')} />
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
