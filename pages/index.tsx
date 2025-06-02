import { useState, useEffect } from "react";
import HomeSelect from "../components/HomeSelect";
import ChatInterface from "../components/ChatInterface";

// Quotes anime inspiratif
const animeQuotes = [
  { text: "Impian itu bukan untuk dikejar, tapi untuk diwujudkan.", author: "One Piece" },
  { text: "Tidak apa-apa untuk menangis, tapi bangkitlah setelahnya.", author: "Naruto" },
  { text: "Hidup ini seperti pensil yang pasti akan habis, tapi meninggalkan tulisan indah.", author: "Natsume Yuujinchou" },
  { text: "Jangan remehkan kekuatan impian.", author: "Haikyuu!!" },
  { text: "Setiap orang punya waktu yang berharga.", author: "Your Name" },
  { text: "Jika kamu tidak mencoba, kamu tidak akan pernah tahu hasilnya.", author: "Kuroko no Basket" },
  { text: "Dunia ini kejam, tapi juga sangat indah.", author: "Attack on Titan" },
];

const themes = [
  { name: "Biru Langit", color: "#38bdf8", gradient: "from-blue-400 to-sky-400" },
  { name: "Ungu", color: "#a78bfa", gradient: "from-purple-400 to-fuchsia-400" },
  { name: "Pink", color: "#fb7185", gradient: "from-pink-400 to-rose-400" },
  { name: "Hijau", color: "#34d399", gradient: "from-emerald-400 to-teal-300" },
];

const languages = [
  { code: "id", label: "🇮🇩 Indonesia" },
  { code: "en", label: "🇬🇧 English" },
  { code: "jp", label: "🇯🇵 日本語" },
];

const texts = {
  id: {
    start: "Mulai",
    carousel: [
      "🎁 Gratis 75 Kredit untuk Pengguna Baru!",
      "🚀 Login dengan Google atau Sebagai Tamu",
      "💬 Chat AI Karakter Anime 24/7",
      "✨ Privasi Aman & Tampilan Premium"
    ],
    faq: "FAQ / Info Singkat",
    close: "Tutup FAQ",
    join: "Gabung komunitas kami di",
    or: "atau",
    developed: "Dikembangkan dengan",
    by: "oleh",
    version: "Versi",
  },
  en: {
    start: "Start",
    carousel: [
      "🎁 75 Free Credits for New Users!",
      "🚀 Login with Google or as Guest",
      "💬 Chat with Anime AI 24/7",
      "✨ Secure Privacy & Premium Appearance"
    ],
    faq: "FAQ / Quick Info",
    close: "Close FAQ",
    join: "Join our community on",
    or: "or",
    developed: "Developed with",
    by: "by",
    version: "Version",
  },
  jp: {
    start: "スタート",
    carousel: [
      "🎁 新規ユーザーに75クレジット無料！",
      "🚀 Googleでログインまたはゲスト利用",
      "💬 24時間アニメAIチャット",
      "✨ 安全なプライバシー＆プレミアムデザイン"
    ],
    faq: "よくある質問 / クイック情報",
    close: "FAQを閉じる",
    join: "コミュニティに参加",
    or: "または",
    developed: "開発：",
    by: "",
    version: "バージョン",
  }
};

const animeBg = {
  background: "url('https://raw.githubusercontent.com/Minatoz997/angel_background.png/main/angel_background.png') center/cover no-repeat",
  minHeight: "100vh"
};
const darkBg = {
  background: "linear-gradient(135deg,#0f172a 40%,#172554 100%)",
  minHeight: "100vh"
};

const IndexPage = () => {
  const [step, setStep] = useState<"start" | "select" | "guest" | "login">("start");
  const [credits, setCredits] = useState(0);
  const [email, setEmail] = useState("");
  const [featureIdx, setFeatureIdx] = useState(0);
  const [carouselProg, setCarouselProg] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState(themes[0]);
  const [lang, setLang] = useState<"id" | "en" | "jp">("id");
  const [blurTrans, setBlurTrans] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Parallax background effect
  useEffect(() => {
    if (step !== "start") return;
    const listener = (e: MouseEvent) => {
      // Koordinat -1..1
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setParallax({ x: x * 12, y: y * 8 });
    };
    window.addEventListener("mousemove", listener);
    return () => window.removeEventListener("mousemove", listener);
  }, [step]);

  // Carousel fitur & progress
  useEffect(() => {
    if (step === "start") {
      const interval = setInterval(() => {
        setFeatureIdx(i => (i + 1) % texts[lang].carousel.length);
        setCarouselProg(0);
      }, 2500);
      const prog = setInterval(() => {
        setCarouselProg(p => (p < 100 ? p + 2 : 100));
      }, 50);
      return () => {
        clearInterval(interval);
        clearInterval(prog);
      };
    }
  }, [step, lang]);

  useEffect(() => {
    if (typeof window !== "undefined" && step === "start") {
      const params = new URLSearchParams(window.location.search);
      const gotEmail = params.get("email");
      if (gotEmail) {
        setEmail(gotEmail);
        setStep("login");
        setCredits(75);
        window.history.replaceState({}, document.title, "/");
      }
    }
  }, [step]);

  // Cinematic Transisi
  const handleStart = () => {
    setBlurTrans(true);
    setTimeout(() => {
      setBlurTrans(false);
      setStep("select");
    }, 450);
  };

  // Random quote anime
  const randQuote = animeQuotes[Math.floor(Math.random() * animeQuotes.length)];

  // Custom cursor effect
  useEffect(() => {
    if (step !== "start") return;
    document.body.style.cursor = "url('/star-cursor.png'), auto";
    return () => { document.body.style.cursor = "auto"; };
  }, [step]);

  // --- HALAMAN DEPAN PREMIUM ---
  if (step === "start") {
    return (
      <div
        className={`flex flex-col min-h-screen relative overflow-hidden transition-colors duration-500`}
        style={
          darkMode
            ? darkBg
            : { ...animeBg, backgroundPosition: `${50 + parallax.x}% ${50 + parallax.y}%` }
        }
      >
        {/* Theme & Language Switcher */}
        <div className="absolute top-5 left-5 z-20 flex gap-2">
          {/* Pilihan theme color */}
          <select
            className="rounded px-2 py-1 bg-white/60 text-blue-900 font-bold shadow"
            value={theme.name}
            onChange={e => setTheme(themes.find(t => t.name === e.target.value) || themes[0])}
          >
            {themes.map(t => <option value={t.name} key={t.name}>{t.name}</option>)}
          </select>
          {/* Pilihan bahasa */}
          <select
            className="rounded px-2 py-1 bg-white/60 text-blue-900 font-bold shadow"
            value={lang}
            onChange={e => setLang(e.target.value as any)}
          >
            {languages.map(l => <option value={l.code} key={l.code}>{l.label}</option>)}
          </select>
        </div>

        {/* Toggle Dark Mode */}
        <button
          className="absolute top-5 right-5 z-20 bg-white/30 hover:bg-white/60 p-2 rounded-full shadow transition"
          onClick={() => setDarkMode(d => !d)}
          title={darkMode ? "Light Mode" : "Dark Mode"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Badge Beta */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-8 z-10">
          <span className={`bg-gradient-to-r ${theme.gradient} text-white text-xs font-bold px-3 py-1 rounded-full shadow`}>Beta</span>
        </div>

        {/* Logo & Judul */}
        <div className="absolute top-14 left-0 right-0 flex flex-col items-center z-10">
          <div
            className="text-2xl font-extrabold drop-shadow-lg tracking-wider"
            style={{ color: theme.color, textShadow: "0 2px 8px #0369a1cc" }}
          >
            MyKugy Ai Chat Anime
          </div>
        </div>

        {/* Card + Tombol Mulai */}
        <div className="flex flex-1 items-center justify-center">
          <div className={`bg-white/30 ${darkMode ? "bg-opacity-10" : "backdrop-blur-2xl"} rounded-3xl shadow-2xl p-8 flex flex-col items-center min-w-[320px] max-w-[94vw] w-full mx-2 border border-white/50 relative`}>
            {/* Carousel fitur */}
            <div className="mb-6 w-full">
              <div className="text-md" style={{ color: theme.color, fontWeight: 700, textAlign: "center" }}>
                {texts[lang].carousel[featureIdx]}
              </div>
              {/* Progress bar carousel */}
              <div className="w-full h-1 bg-blue-100 rounded-full mt-1">
                <div
                  className="h-1 rounded-full transition-all"
                  style={{ width: `${carouselProg}%`, background: theme.color }}
                />
              </div>
            </div>
            {/* Tombol Mulai besar */}
            <button
              className={`px-16 py-4 text-2xl rounded-full font-bold bg-gradient-to-r ${theme.gradient} shadow-xl text-white hover:scale-105 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200/40 animate-glow ${blurTrans ? "blur-sm" : ""}`}
              onClick={handleStart}
              style={{ letterSpacing: '2px' }}
              disabled={blurTrans}
            >
              {texts[lang].start}
            </button>
            {/* Transisi Blur */}
            {blurTrans && <div className="absolute inset-0 bg-white/60 backdrop-blur-md rounded-3xl transition-all duration-300" />}
            <style>{`
              .animate-glow {
                box-shadow: 0 0 20px 3px ${theme.color}80, 0 0 40px 7px ${theme.color}60;
                transition: box-shadow 0.3s;
              }
              .animate-glow:hover {
                box-shadow: 0 0 36px 10px ${theme.color}88, 0 0 72px 12px ${theme.color}80;
              }
            `}</style>

            {/* Quote Anime */}
            <div className="mt-7 mb-2 w-full flex flex-col items-center">
              <div className="text-xs italic text-blue-900 text-center max-w-xs">
                “{randQuote.text}” <span className="not-italic font-bold text-blue-600">- {randQuote.author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer lengkap */}
        <div className="absolute bottom-3 w-full flex flex-col items-center z-10 text-xs text-white/80">
          <div className="mb-1 flex gap-2">
            <span className={`bg-blue-300/80 text-sky-800 px-2 py-0.5 rounded font-bold text-xs`}>{texts[lang].version} v1.0.0 Beta</span>
            <span>|</span>
            <a href="https://instagram.com/yourbrand" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition">Instagram</a>
            <span>|</span>
            <a href="https://discord.gg/yourbrand" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition">Discord</a>
          </div>
          <div>
            Artwork by AI | <a href="/privacy" className="underline hover:text-blue-200">Kebijakan Privasi</a>
          </div>
          <div className="mt-1">
            {texts[lang].developed} <span className="text-pink-300">❤️</span> {texts[lang].by} <b className="text-sky-300">Eichiro</b>
          </div>
        </div>
      </div>
    );
  }

  // --- HALAMAN BERIKUTNYA (tidak diubah) ---
  if (step === "select") {
    return (
      <HomeSelect
        onGoogle={() => {
          if (typeof window !== "undefined") {
            window.location.href = "https://backend-cb98.onrender.com/auth/google";
          }
        }}
        onGuest={() => {
          setStep("guest");
          setCredits(20);
          setEmail("");
        }}
        bgStyle={darkMode ? darkBg : animeBg}
      />
    );
  }

  return (
    <ChatInterface
      email={email}
      isGuest={step === "guest"}
      credits={credits}
      bgStyle={darkMode ? darkBg : animeBg}
    />
  );
};

export default IndexPage;
