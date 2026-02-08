<html lang="en"><head>
<meta charset="utf-8"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        primary: "#00D9FF", // Cyan from prompt
                        secondary: "#39FF14", // Neon Green from prompt
                        "background-light": "#F3F4F6", 
                        "background-dark": "#0F1419", // Deep Blue-Black
                        "surface-dark": "rgba(22, 27, 34, 0.7)", // Slightly more opaque glass
                        "card-dark": "rgba(30, 35, 45, 0.6)", // Inner card bg
                        "accent-purple": "#A855F7",
                        "accent-orange": "#F97316",
                    },
                    fontFamily: {
                        display: ["Inter", "sans-serif"],
                        mono: ["JetBrains Mono", "monospace"],
                    },
                    boxShadow: {
                        'neon-cyan': '0 0 15px rgba(0, 217, 255, 0.4), 0 0 30px rgba(0, 217, 255, 0.15)',
                        'neon-green': '0 0 15px rgba(57, 255, 20, 0.4), 0 0 30px rgba(57, 255, 20, 0.15)',
                        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
                        'inner-glow': 'inset 0 0 20px rgba(255,255,255,0.03)',
                    },
                },
            },
        };
    </script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;family=JetBrains+Mono:wght@400;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        ::-webkit-scrollbar {
            width: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #0F1419; 
        }
        ::-webkit-scrollbar-thumb {
            background: #333; 
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #555; 
        }
        input[type=range] {
            -webkit-appearance: none; 
            background: transparent; 
        }
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
        }input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
            -webkit-appearance: none; 
            margin: 0; 
        }
    </style>
</head>
<body class="bg-background-dark font-display min-h-screen text-gray-100 overflow-hidden selection:bg-primary selection:text-black">
<div class="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
<div class="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] opacity-40"></div>
<div class="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px] opacity-40"></div>
</div>
<div class="flex flex-col h-screen max-w-[1500px] mx-auto p-4 md:p-6 gap-6">
<header class="flex items-center justify-between py-4 px-6 rounded-2xl bg-surface-dark backdrop-blur-xl border border-white/5 shadow-glass">
<div class="flex items-center gap-3">
<div class="relative w-10 h-10 flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-4xl drop-shadow-[0_0_12px_rgba(0,217,255,0.8)]">precision_manufacturing</span>
</div>
<h1 class="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                ToolOptimizer<span class="font-light text-primary">CNC</span>
</h1>
</div>
<nav class="hidden md:flex items-center gap-8">
<button class="text-sm font-medium text-gray-400 hover:text-white transition-colors">History</button>
<button class="text-sm font-medium text-gray-400 hover:text-white transition-colors">Materials</button>
<button class="text-sm font-medium text-gray-400 hover:text-white transition-colors">Settings</button>
</nav>
<div class="flex items-center gap-4">
<button class="p-2 rounded-full hover:bg-white/5 transition-colors relative group">
<span class="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-secondary rounded-full animate-pulse shadow-neon-green"></span>
<span class="material-symbols-outlined text-gray-400 group-hover:text-white transition-colors">notifications</span>
</button>
<div class="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10 flex items-center justify-center shadow-lg cursor-pointer hover:border-primary/50 transition-colors">
<span class="material-symbols-outlined text-sm text-gray-300">person</span>
</div>
</div>
</header>
<main class="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
<section class="lg:col-span-3 flex flex-col gap-6 overflow-y-auto pr-1 custom-scrollbar">
<div class="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-5 shadow-glass flex flex-col gap-5">
<div class="flex gap-3">
<button class="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-bold tracking-wide shadow-neon-cyan hover:shadow-[0_0_25px_rgba(0,217,255,0.5)] hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm uppercase">
<span class="material-symbols-outlined text-lg">play_arrow</span>
                        Simular
                    </button>
<button class="w-12 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all flex items-center justify-center active:scale-[0.98]">
<span class="material-symbols-outlined text-xl">restart_alt</span>
</button>
</div>
<div class="bg-card-dark rounded-xl p-4 border border-white/5 shadow-inner-glow">
<h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
<span class="w-1 h-3 bg-primary rounded-full"></span>
                        Configuração Base
                    </h3>
<div class="space-y-5">
<div class="group">
<div class="flex items-center justify-between mb-2">
<label class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide group-hover:text-primary transition-colors">Material da Peça</label>
</div>
<div class="relative">
<select class="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-3 pr-8 text-sm text-gray-200 focus:ring-1 focus:ring-primary focus:border-primary outline-none appearance-none transition-all hover:border-white/20">
<option>Aço ABNT 1045</option>
<option>Aluminum 6061-T6</option>
<option>Stainless 304</option>
<option>Titanium Grade 5</option>
</select>
<span class="material-symbols-outlined absolute right-3 top-3 text-gray-500 pointer-events-none text-sm">expand_more</span>
</div>
<div class="flex justify-between mt-1 px-1">
<span class="text-[10px] text-gray-600">Hardness: 170 HB</span>
<span class="text-[10px] text-primary/70">Vc: 80-160 m/min</span>
</div>
</div>
<div>
<div class="flex items-center justify-between mb-2">
<label class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Tipo de Usinagem</label>
</div>
<div class="grid grid-cols-2 gap-2">
<label class="cursor-pointer group">
<input class="peer sr-only" name="machining_type" type="radio"/>
<div class="py-2.5 px-1 rounded-lg bg-black/40 border border-white/5 text-gray-400 peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary transition-all text-center text-[11px] font-medium hover:bg-white/5 group-hover:border-white/10">
                                        Desbaste
                                    </div>
</label>
<label class="cursor-pointer group">
<input class="peer sr-only" name="machining_type" type="radio"/>
<div class="py-2.5 px-1 rounded-lg bg-black/40 border border-white/5 text-gray-400 peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary transition-all text-center text-[11px] font-medium hover:bg-white/5 group-hover:border-white/10">
                                        Redesbaste
                                    </div>
</label>
<label class="cursor-pointer group">
<input checked="" class="peer sr-only" name="machining_type" type="radio"/>
<div class="py-2.5 px-1 rounded-lg bg-black/40 border border-white/5 text-gray-400 peer-checked:bg-primary peer-checked:border-primary peer-checked:text-black peer-checked:shadow-neon-cyan transition-all text-center text-[11px] font-bold hover:bg-white/5 group-hover:border-white/10">
                                        Semi-Acab.
                                    </div>
</label>
<label class="cursor-pointer group">
<input class="peer sr-only" name="machining_type" type="radio"/>
<div class="py-2.5 px-1 rounded-lg bg-black/40 border border-white/5 text-gray-400 peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary transition-all text-center text-[11px] font-medium hover:bg-white/5 group-hover:border-white/10">
                                        Acabamento
                                    </div>
</label>
</div>
</div>
</div>
</div>
<div class="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-5 shadow-glass flex-1 flex flex-col">
<div class="bg-card-dark rounded-xl p-4 border border-white/5 shadow-inner-glow h-full flex flex-col">
<h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
<span class="w-1 h-3 bg-secondary rounded-full"></span>
                            Ferramenta
                        </h3>
<div class="flex flex-col gap-5 flex-1">
<div class="group">
<label class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2 block group-hover:text-secondary transition-colors">Tipo de Ferramenta</label>
<div class="grid grid-cols-2 gap-2">
<button class="bg-primary text-black font-bold py-2 rounded border border-primary shadow-neon-cyan text-xs">Toroidal</button>
<button class="bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 py-2 rounded border border-white/10 transition-colors text-xs">Topo Reto</button>
<button class="col-span-2 bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 py-2 rounded border border-white/10 transition-colors text-xs">Esférica</button>
</div>
</div>
<div class="group">
<label class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2 block group-hover:text-secondary transition-colors">Raio de Ponta</label>
<div class="grid grid-cols-2 gap-2">
<button class="bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 py-2 rounded border border-white/10 transition-colors text-xs">R0.5</button>
<button class="bg-primary text-black font-bold py-2 rounded border border-primary shadow-neon-cyan text-xs">R1.0</button>
</div>
</div>
<div class="group">
<label class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2 block group-hover:text-secondary transition-colors">Diâmetro <span class="text-[10px] text-gray-600 ml-1">mm</span></label>
<div class="bg-black/40 border border-white/10 rounded-lg p-2 mb-2">
<input class="w-full bg-transparent border-none text-white text-sm font-mono focus:ring-0 p-1" placeholder="Custom" type="text" value="10"/>
</div>
<div class="grid grid-cols-5 gap-1.5">
<button class="bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 py-1.5 rounded border border-white/10 text-xs font-mono">2</button>
<button class="bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 py-1.5 rounded border border-white/10 text-xs font-mono">4</button>
<button class="bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 py-1.5 rounded border border-white/10 text-xs font-mono">6</button>
<button class="bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 py-1.5 rounded border border-white/10 text-xs font-mono">8</button>
<button class="bg-primary text-black font-bold py-1.5 rounded border border-primary shadow-neon-cyan text-xs font-mono">10</button>
<button class="bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 py-1.5 rounded border border-white/10 text-xs font-mono">12</button>
<button class="bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 py-1.5 rounded border border-white/10 text-xs font-mono">14</button>
<button class="bg-black/40 text-gray-400 hover:text-white hover:bg-white/5 py-1.5 rounded border border-white/10 text-xs font-mono">16</button>
</div>
</div>
<div class="group">
<label class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2 block group-hover:text-secondary transition-colors">Altura Fixação <span class="text-[10px] text-gray-600 ml-1">mm</span></label>
<div class="bg-black/40 border border-white/10 rounded-lg p-2">
<input class="w-full bg-transparent border-none text-white text-sm font-mono focus:ring-0 p-1" type="number" value="30"/>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<section class="lg:col-span-6 flex flex-col gap-6 h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar pr-2 pb-2">
<div class="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-glass relative group overflow-hidden shrink-0">
<div class="absolute right-6 top-6 opacity-30">
<span class="material-symbols-outlined text-gray-500">wysiwyg</span>
</div>
<div class="flex flex-col gap-6">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
<span class="material-symbols-outlined text-gray-400">analytics</span>
</div>
<div>
<h3 class="text-sm font-bold text-white uppercase tracking-widest">Parâmetros Calculados</h3>
<p class="text-[10px] text-gray-500 font-mono mt-0.5">Resumo da Operação</p>
</div>
</div>
<div class="flex flex-col gap-4">
<div class="bg-black/40 rounded-xl border border-white/5 overflow-hidden">
<div class="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
<div class="p-4 flex flex-col gap-1">
<span class="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Spindle</span>
<div class="flex items-baseline gap-1">
<span class="text-2xl font-bold text-white font-mono">3,800</span>
<span class="text-[10px] text-primary font-bold">RPM</span>
</div>
</div>
<div class="p-4 flex flex-col gap-1">
<span class="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Feed Rate</span>
<div class="flex items-baseline gap-1">
<span class="text-2xl font-bold text-white font-mono">1,240</span>
<span class="text-[10px] text-secondary font-bold">mm/m</span>
</div>
</div>
<div class="p-4 flex flex-col gap-1">
<span class="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Depth (ap)</span>
<div class="flex items-baseline gap-1">
<span class="text-2xl font-bold text-white font-mono">3.0</span>
<span class="text-[10px] text-accent-orange font-bold">mm</span>
</div>
</div>
<div class="p-4 flex flex-col gap-1">
<span class="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Width (ae)</span>
<div class="flex items-baseline gap-1">
<span class="text-2xl font-bold text-white font-mono">2.5</span>
<span class="text-[10px] text-accent-purple font-bold">mm</span>
</div>
</div>
</div>
<div class="bg-white/[0.02] border-t border-white/5 p-3 flex flex-col md:flex-row gap-4 items-center justify-between">
<div class="flex items-center gap-4">
<div class="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-lg border border-white/5">
<span class="material-symbols-outlined text-primary text-sm">speed</span>
<div class="flex flex-col leading-none">
<span class="text-[9px] text-gray-500 uppercase tracking-wide">Surface Speed</span>
<span class="text-xs font-bold text-white font-mono">143 m/min</span>
</div>
</div>
<div class="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-lg border border-white/5">
<span class="material-symbols-outlined text-secondary text-sm">inventory_2</span>
<div class="flex flex-col leading-none">
<span class="text-[9px] text-gray-500 uppercase tracking-wide">Rem. Rate (MRR)</span>
<span class="text-xs font-bold text-white font-mono">45.2 cm³/min</span>
</div>
</div>
</div>
<div class="flex items-center gap-2">
<button class="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                    APPLY TO MACHINE
                </button>
<button class="w-8 h-8 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 text-gray-400 border border-white/10 transition-colors">
<span class="material-symbols-outlined text-sm">share</span>
</button>
</div>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
<div class="bg-black/20 rounded-xl p-4 border border-white/5">
<h4 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Ferramenta</h4>
<div class="space-y-3">
<div class="flex justify-between items-center text-xs">
<span class="text-gray-400 font-medium">Tipo</span>
<span class="text-white font-mono">Toroidal R1.0</span>
</div>
<div class="flex justify-between items-center text-xs">
<span class="text-gray-400 font-medium">Diâmetro</span>
<span class="text-white font-mono">Ø10mm</span>
</div>
<div class="flex justify-between items-center text-xs">
<span class="text-gray-400 font-medium">Perfil</span>
<span class="text-white font-mono">Inteiriça</span>
</div>
<div class="flex justify-between items-center text-xs">
<span class="text-gray-400 font-medium">Fixação</span>
<span class="text-white font-mono">30mm</span>
</div>
</div>
</div>
<div class="bg-black/20 rounded-xl p-4 border border-white/5">
<h4 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Parâmetros</h4>
<div class="space-y-4">
<div class="flex justify-between items-center text-xs">
<span class="text-gray-400 font-medium w-1/2">Avanço/Dente (fz)</span>
<span class="text-white font-mono font-bold">0.050 mm</span>
</div>
<div class="flex justify-between items-center text-xs">
<span class="text-gray-400 font-medium w-1/2">Largura (ae)</span>
<div class="text-right">
<span class="text-white font-mono font-bold block">2.5mm</span>
<span class="text-[9px] text-gray-500">(25%)</span>
</div>
</div>
<div class="flex justify-between items-center text-xs">
<span class="text-gray-400 font-medium w-1/2">Profundidade (ap)</span>
<div class="text-right">
<span class="text-white font-mono font-bold block">3.0mm</span>
<span class="text-[9px] text-gray-500">(30%)</span>
</div>
</div>
</div>
</div>
<div class="bg-black/20 rounded-xl p-4 border border-white/5 flex flex-col justify-between">
<div class="flex justify-between items-start mb-2">
<h4 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Avanço (F)</h4>
<span class="text-xs text-secondary font-mono font-bold">2600 mm/min</span>
</div>
<div class="relative w-full h-20 overflow-hidden flex justify-center items-end mt-2">
<svg class="w-32 h-16 transform" viewBox="0 0 100 50">
<path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.1)" stroke-linecap="round" stroke-width="6"></path>
<path class="drop-shadow-[0_0_8px_rgba(57,255,20,0.4)]" d="M 10 50 A 40 40 0 0 1 78 18" fill="none" stroke="url(#gauge-gradient-2)" stroke-dasharray="125.6" stroke-dashoffset="0" stroke-linecap="round" stroke-width="6"></path>
<defs>
<linearGradient id="gauge-gradient-2" x1="0%" x2="100%" y1="0%" y2="0%">
<stop offset="0%" style="stop-color:#00D9FF"></stop>
<stop offset="100%" style="stop-color:#39FF14"></stop>
</linearGradient>
</defs>
</svg>
<div class="absolute bottom-0 flex flex-col items-center">
<span class="text-xl font-bold text-white font-mono leading-none tracking-tighter">86</span>
<span class="text-[7px] text-secondary font-bold uppercase tracking-[0.2em] mb-1">Good</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="grid grid-cols-3 gap-4 h-32 shrink-0">
<div class="bg-surface-dark backdrop-blur-md border border-white/5 rounded-xl p-5 flex flex-col justify-between hover:bg-white/5 transition-colors group relative overflow-hidden">
<div class="absolute bottom-0 left-0 w-full h-[2px] bg-accent-orange/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
<div class="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Power Est.</div>
<div class="text-3xl font-mono text-white tracking-tight">2.4 <span class="text-sm text-gray-500 font-sans font-normal">kW</span></div>
<div class="h-1 w-full bg-white/10 rounded-full overflow-hidden mt-2">
<div class="h-full bg-accent-orange w-1/3 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
</div>
</div>
<div class="bg-surface-dark backdrop-blur-md border border-white/5 rounded-xl p-5 flex flex-col justify-between hover:bg-white/5 transition-colors group relative overflow-hidden">
<div class="absolute bottom-0 left-0 w-full h-[2px] bg-accent-purple/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
<div class="text-[10px] font-bold tracking-wider text-gray-400 uppercase">MRR</div>
<div class="text-3xl font-mono text-white tracking-tight">45.2 <span class="text-sm text-gray-500 font-sans font-normal">cm³/min</span></div>
<div class="h-1 w-full bg-white/10 rounded-full overflow-hidden mt-2">
<div class="h-full bg-accent-purple w-2/3 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
</div>
</div>
<div class="bg-surface-dark backdrop-blur-md border border-white/5 rounded-xl p-5 flex flex-col justify-between hover:bg-white/5 transition-colors group relative overflow-hidden">
<div class="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
<div class="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Surface Speed</div>
<div class="text-3xl font-mono text-white tracking-tight">310 <span class="text-sm text-gray-500 font-sans font-normal">m/min</span></div>
<div class="h-1 w-full bg-white/10 rounded-full overflow-hidden mt-2">
<div class="h-full bg-blue-500 w-3/4 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
</div>
</div>
</div>
<div class="flex-1 flex flex-col gap-4 shrink-0">
<div class="relative bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-glass flex flex-col justify-center items-center group overflow-hidden h-56">
<div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
<div class="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 blur-[60px] rounded-full"></div>
<div class="absolute top-4 right-4 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
<span class="material-symbols-outlined text-3xl text-primary drop-shadow-neon-cyan">speed</span>
</div>
<h3 class="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-2 relative z-10 drop-shadow-[0_0_8px_rgba(0,217,255,0.4)]">Spindle Speed</h3>
<div class="flex items-baseline gap-2 z-10 relative">
<span class="text-6xl md:text-7xl font-mono font-bold text-white tracking-tighter drop-shadow-[0_0_20px_rgba(0,217,255,0.4)]">8,250</span>
<span class="text-lg text-gray-400 font-medium font-mono uppercase tracking-widest">RPM</span>
</div>
<div class="mt-4 w-full max-w-sm bg-black/40 h-1.5 rounded-full overflow-hidden relative z-10">
<div class="h-full bg-primary w-[75%] shadow-[0_0_15px_rgba(0,217,255,1)] rounded-full relative">
<div class="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-white rounded-full shadow-[0_0_5px_white]"></div>
</div>
</div>
<p class="mt-2 text-xs text-primary/70 font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">Optimized for stability</p>
</div>
<div class="relative bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-glass flex flex-col justify-center items-center group overflow-hidden h-56">
<div class="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
<div class="absolute -left-10 -bottom-10 w-40 h-40 bg-secondary/10 blur-[60px] rounded-full"></div>
<div class="absolute top-4 right-4 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
<span class="material-symbols-outlined text-3xl text-secondary drop-shadow-neon-green">moving</span>
</div>
<h3 class="text-xs uppercase tracking-[0.25em] text-secondary font-bold mb-2 relative z-10 drop-shadow-[0_0_8px_rgba(57,255,20,0.4)]">Feed Rate</h3>
<div class="flex items-baseline gap-2 z-10 relative">
<span class="text-6xl md:text-7xl font-mono font-bold text-white tracking-tighter drop-shadow-[0_0_20px_rgba(57,255,20,0.4)]">1,240</span>
<span class="text-lg text-gray-400 font-medium font-mono uppercase tracking-widest">mm/min</span>
</div>
<div class="mt-4 w-full max-w-sm bg-black/40 h-1.5 rounded-full overflow-hidden relative z-10">
<div class="h-full bg-secondary w-[60%] shadow-[0_0_15px_rgba(57,255,20,1)] rounded-full relative">
<div class="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-white rounded-full shadow-[0_0_5px_white]"></div>
</div>
</div>
<p class="mt-2 text-xs text-secondary/70 font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">Chip load: 0.05mm</p>
</div>
</div>
</section>
<section class="lg:col-span-3 h-full">
<div class="bg-surface-dark backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-glass h-full flex flex-col">
<h2 class="text-sm font-bold uppercase tracking-widest mb-8 flex items-center justify-between text-gray-300">
<span class="flex items-center gap-2"><span class="material-symbols-outlined text-lg">tune</span> Fine Tune</span>
<button class="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
<span class="material-symbols-outlined text-gray-400 text-sm">refresh</span>
</button>
</h2>
<div class="flex-1 flex flex-col justify-between gap-6 px-1">
<div class="flex flex-col gap-2 group">
<div class="flex justify-between items-end mb-1">
<div class="flex items-baseline gap-2">
<span class="text-sm font-bold font-mono text-primary group-hover:text-primary transition-colors">Vc</span>
<span class="text-[10px] font-bold tracking-wider text-gray-500 uppercase">CUTTING SPEED</span>
</div>
<div class="text-right">
<div class="text-xl font-bold font-mono text-primary drop-shadow-[0_0_8px_rgba(0,217,255,0.4)]">310</div>
<div class="text-[9px] text-gray-500 font-mono tracking-wider">M/MIN</div>
</div>
</div>
<div class="relative h-1.5 w-full bg-black/40 rounded-full flex items-center">
<div class="absolute inset-0 bg-primary/20 blur-sm opacity-0 group-hover:opacity-50 transition-opacity"></div>
<div class="absolute left-0 h-full bg-primary rounded-full shadow-[0_0_10px_rgba(0,217,255,0.6)]" style="width: 70%"></div>
<div class="absolute left-[70%] w-4 h-4 bg-background-dark border-2 border-primary rounded-full shadow-[0_0_15px_rgba(0,217,255,0.8)] cursor-ew-resize hover:scale-125 transition-transform z-10 flex items-center justify-center -translate-x-1/2">
<div class="w-1.5 h-1.5 bg-primary rounded-full"></div>
</div>
</div>
<p class="text-[10px] text-gray-500 leading-tight mt-1 opacity-70">
                            Controls the tangential speed at the tool edge. Higher values improve finish but increase heat.
                        </p>
</div>
<div class="flex flex-col gap-2 group">
<div class="flex justify-between items-end mb-1">
<div class="flex items-baseline gap-2">
<span class="text-sm font-bold font-mono text-secondary group-hover:text-secondary transition-colors">fz</span>
<span class="text-[10px] font-bold tracking-wider text-gray-500 uppercase">FEED PER TOOTH</span>
</div>
<div class="text-right">
<div class="text-xl font-bold font-mono text-secondary drop-shadow-[0_0_8px_rgba(57,255,20,0.4)]">0.05</div>
<div class="text-[9px] text-gray-500 font-mono tracking-wider">MM/TOOTH</div>
</div>
</div>
<div class="relative h-1.5 w-full bg-black/40 rounded-full flex items-center">
<div class="absolute inset-0 bg-secondary/20 blur-sm opacity-0 group-hover:opacity-50 transition-opacity"></div>
<div class="absolute left-0 h-full bg-secondary rounded-full shadow-[0_0_10px_rgba(57,255,20,0.6)]" style="width: 50%"></div>
<div class="absolute left-[50%] w-4 h-4 bg-background-dark border-2 border-secondary rounded-full shadow-[0_0_15px_rgba(57,255,20,0.8)] cursor-ew-resize hover:scale-125 transition-transform z-10 flex items-center justify-center -translate-x-1/2">
<div class="w-1.5 h-1.5 bg-secondary rounded-full"></div>
</div>
</div>
<p class="text-[10px] text-gray-500 leading-tight mt-1 opacity-70">
                            The thickness of the chip removed by each flute. Impact tool life and chip evacuation.
                        </p>
</div>
<div class="flex flex-col gap-2 group">
<div class="flex justify-between items-end mb-1">
<div class="flex items-baseline gap-2">
<span class="text-sm font-bold font-mono text-accent-purple group-hover:text-accent-purple transition-colors">ae</span>
<span class="text-[10px] font-bold tracking-wider text-gray-500 uppercase">RADIAL ENGAGEMENT</span>
</div>
<div class="text-right">
<div class="text-xl font-bold font-mono text-accent-purple drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">2.5</div>
<div class="text-[9px] text-gray-500 font-mono tracking-wider">MM</div>
</div>
</div>
<div class="relative h-1.5 w-full bg-black/40 rounded-full flex items-center">
<div class="absolute inset-0 bg-accent-purple/20 blur-sm opacity-0 group-hover:opacity-50 transition-opacity"></div>
<div class="absolute left-0 h-full bg-accent-purple rounded-full shadow-[0_0_10px_rgba(168,85,247,0.6)]" style="width: 30%"></div>
<div class="absolute left-[30%] w-4 h-4 bg-background-dark border-2 border-accent-purple rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)] cursor-ew-resize hover:scale-125 transition-transform z-10 flex items-center justify-center -translate-x-1/2">
<div class="w-1.5 h-1.5 bg-accent-purple rounded-full"></div>
</div>
</div>
<p class="text-[10px] text-gray-500 leading-tight mt-1 opacity-70">
                            Width of cut perpendicular to the tool axis. Affects lateral pressure and tool deflection.
                        </p>
</div>
<div class="flex flex-col gap-2 group">
<div class="flex justify-between items-end mb-1">
<div class="flex items-baseline gap-2">
<span class="text-sm font-bold font-mono text-accent-orange group-hover:text-accent-orange transition-colors">ap</span>
<span class="text-[10px] font-bold tracking-wider text-gray-500 uppercase">AXIAL DEPTH</span>
</div>
<div class="text-right">
<div class="text-xl font-bold font-mono text-accent-orange drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]">12.0</div>
<div class="text-[9px] text-gray-500 font-mono tracking-wider">MM</div>
</div>
</div>
<div class="relative h-1.5 w-full bg-black/40 rounded-full flex items-center">
<div class="absolute inset-0 bg-accent-orange/20 blur-sm opacity-0 group-hover:opacity-50 transition-opacity"></div>
<div class="absolute left-0 h-full bg-accent-orange rounded-full shadow-[0_0_10px_rgba(249,115,22,0.6)]" style="width: 85%"></div>
<div class="absolute left-[85%] w-4 h-4 bg-background-dark border-2 border-accent-orange rounded-full shadow-[0_0_15px_rgba(249,115,22,0.8)] cursor-ew-resize hover:scale-125 transition-transform z-10 flex items-center justify-center -translate-x-1/2">
<div class="w-1.5 h-1.5 bg-accent-orange rounded-full"></div>
</div>
</div>
<p class="text-[10px] text-gray-500 leading-tight mt-1 opacity-70">
                            The depth of cut along the tool axis. Primary driver for material removal rate.
                        </p>
</div>
</div>
<div class="mt-8 pt-5 border-t border-white/5">
<div class="flex justify-between items-center mb-3">
<span class="text-[10px] uppercase tracking-wider text-gray-500">Material Removal</span>
<span class="material-symbols-outlined text-xs text-secondary animate-pulse">trending_up</span>
</div>
<div class="bg-black/30 p-4 rounded-xl flex items-center justify-between border border-white/5 shadow-inner-glow group hover:border-white/10 transition-colors">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-gray-600 text-lg">delete_sweep</span>
<span class="text-xs text-gray-400">Net Volume</span>
</div>
<span class="font-mono text-lg font-bold text-white group-hover:text-primary transition-colors">125.4 <span class="text-xs text-gray-600">cm³</span></span>
</div>
</div>
</div>
</section>
</main>
</div>
</body></html>
