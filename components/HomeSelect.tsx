import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

interface Props {
  onGoogle: () => void;
  onGuest: () => void;
  loading: boolean;
  error: string | null;
  bgStyle?: React.CSSProperties;
}

interface Language {
  code: string;
  name: string;
  flag: string;
  local: string;
}

const LANGUAGES: Language[] = [
  { code: 'id', name: 'Indonesian', flag: '🇮🇩', local: 'Indonesia' },
  { code: 'en', name: 'English', flag: '🇺🇸', local: 'English' },
  { code: 'jp', name: 'Japanese', flag: '🇯🇵', local: '日本語' }
];

const HomeSelect: React.FC<Props> = ({ onGoogle, onGuest, loading, error, bgStyle }) => {
  const [theme, setTheme] = useState("light");
  const [showLanguages, setShowLanguages] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(LANGUAGES[0]);
  const [imgError, setImgError] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLanguageSelect = (lang: Language) => {
    setCurrentLang(lang);
    setShowLanguages(false);
  };

  const getLoginButtonText = () => {
    if (loading) {
      return currentLang.code === 'jp' ? '読み込み中...' :
             currentLang.code === 'en' ? 'Loading...' :
             'Memuat...';
    }
    return currentLang.code === 'jp' ? 'Google でログイン' :
           currentLang.code === 'en' ? 'Sign in with Google' :
           'Daftar dengan Google';
  };

  const getCreditsText = (type: 'google' | 'guest') => {
    const credits = type === 'google' ? '75' : '25';
    const creditsText = currentLang.code === 'jp' ? 'クレジット' :
                       currentLang.code === 'en' ? 'Credits' :
                       'Kredit';
    return `${credits} ${creditsText}`;
  };

  return (
    <div 
      className="min-h-screen w-full"
      style={{
        backgroundImage: theme === "dark" 
          ? "linear-gradient(135deg,#0f172a 40%,#172554 100%)"
          : "url('https://raw.githubusercontent.com/Minatoz997/angel_background.png/main/angel_background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        ...bgStyle
      }}
    >
      {/* Theme and Language Selectors */}
      <div className="fixed top-4 left-4 flex gap-2 z-10">
        <button 
          onClick={toggleTheme}
          className="px-3 py-1 rounded-md bg-white/80 backdrop-blur-sm text-blue-900 text-sm font-medium hover:bg-white/90 transition"
        >
          {theme === "light" ? "Biru Langit" : "Mode Gelap"}
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowLanguages(!showLanguages)}
            className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/80 backdrop-blur-sm text-blue-900 text-sm font-medium hover:bg-white/90 transition"
          >
            <span className="text-lg" role="img" aria-label={`${currentLang.name} Flag`}>
              {currentLang.flag}
            </span>
            {currentLang.local}
          </button>

          {showLanguages && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white/95 backdrop-blur-sm rounded-md shadow-lg overflow-hidden">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-blue-50 transition ${
                    currentLang.code === lang.code ? 'bg-blue-50' : ''
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.local}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center Card */}
      <div className="h-screen flex items-center justify-center px-4">
        <div className={`${
          theme === "dark" 
            ? "bg-gray-800/95 text-white" 
            : "bg-white/95"
          } rounded-3xl shadow-2xl px-8 py-10 w-full max-w-md flex flex-col items-center relative backdrop-blur-md`}
        >
          {/* Beta Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <span className="bg-[#4785FF] text-white font-medium px-4 py-1 rounded-full text-xs">
              MyKugy Beta
            </span>
          </div>

          {/* Logo */}
          <div className="w-32 h-32 mb-4 relative">
            <Image
              src={imgError ? '/fallback-logo.png' : '/logo.png'}
              alt="MyKugy Logo"
              width={128}
              height={128}
              priority
              className="object-contain"
              onError={() => setImgError(true)}
            />
          </div>

          <h1 className={`text-2xl font-bold mb-1 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}>AI Anime Chat</h1>
          <p className={`text-sm mb-8 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            MyKugy
          </p>

          {/* Error Message */}
          {error && (
            <div className="w-full mb-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Login Buttons */}
          <button
            onClick={onGoogle}
            disabled={loading}
            className="w-full py-3 mb-3 rounded-lg font-medium bg-[#4785FF] text-white hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {getLoginButtonText()}
          </button>
          <button
            onClick={onGuest}
            disabled={loading}
            className="w-full py-3 rounded-lg font-medium border-2 border-gray-400 text-gray-600 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 
              (currentLang.code === 'jp' ? '読み込み中...' :
               currentLang.code === 'en' ? 'Loading...' :
               'Memuat...') :
              (currentLang.code === 'jp' ? 'ゲストとして始める' :
               currentLang.code === 'en' ? 'Start as Guest' :
               'Mulai Sebagai Tamu')}
          </button>

          {/* Credits Info */}
          <div className="mt-6 flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/30 w-full">
            <div className="flex items-center gap-2 text-sm w-full">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#4785FF] text-white font-bold text-xs">G</span>
              <span className={theme === "dark" ? "text-gray-200" : "text-gray-600"}>
                {currentLang.code === 'jp' ? 'Googleログイン' :
                 currentLang.code === 'en' ? 'Google Login' :
                 'Login Google'}
                <span className="font-semibold ml-1">{getCreditsText('google')}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm w-full">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-400 text-white font-bold text-xs">T</span>
              <span className={theme === "dark" ? "text-gray-200" : "text-gray-600"}>
                {currentLang.code === 'jp' ? 'ゲストモード' :
                 currentLang.code === 'en' ? 'Guest Mode' :
                 'Mode Tamu'}
                <span className="font-semibold ml-1">{getCreditsText('guest')}</span>
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className={`mt-8 text-center text-xs ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}>
            <p>
              {currentLang.code === 'jp' ? 'MyKugy Team により愛を込めて制作' :
               currentLang.code === 'en' ? 'Made with ❤️ by MyKugy Team' :
               'Dibuat dengan ❤️ oleh MyKugy Team'}
            </p>
            <p className="mt-1">© 2024 MyKugy - v1.0.0 Beta</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSelect;
