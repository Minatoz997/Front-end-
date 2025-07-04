import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { UiContext } from '../_app';

const AuthCallback: React.FC = () => {
  const router = useRouter();
  const { lang } = useContext(UiContext);

  useEffect(() => {
    const handleCallback = async () => {
      if (!router.isReady) return;

      const { token, email } = router.query;

      console.log('Auth callback query:', { token, email });

      if (typeof token === 'string' && typeof email === 'string') {
        try {
          // Simpan data auth secara synchronous
          sessionStorage.setItem('token', token);
          localStorage.setItem('user_email', email);
          
          // Verifikasi data tersimpan
          const storedToken = sessionStorage.getItem('token');
          const storedEmail = localStorage.getItem('user_email');
          
          if (storedToken && storedEmail) {
            // Fetch credits sebelum redirect
            try {
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/credits?user_email=${encodeURIComponent(email)}`
              );
              const data = await response.json();
              
              // Redirect dengan credits yang sudah diverifikasi
              await router.push(`/menu?email=${encodeURIComponent(email)}&credits=${data.credits || 75}`);
            } catch (error) {
              console.error('Error fetching credits:', error);
              // Fallback ke default credits jika API gagal
              await router.push(`/menu?email=${encodeURIComponent(email)}&credits=75`);
            }
          } else {
            throw new Error('Failed to store auth data');
          }
        } catch (error) {
          console.error('Auth storage error:', error);
          alert(
            lang === 'id'
              ? 'Terjadi kesalahan saat login. Silakan coba lagi.'
              : lang === 'en'
              ? 'Error during login. Please try again.'
              : 'ログイン中にエラーが発生しました。もう一度お試しください。'
          );
          router.push('/');
        }
      } else {
        console.error('Invalid token or email in callback:', { token, email });
        alert(
          lang === 'id'
            ? 'Data login tidak valid. Silakan coba lagi.'
            : lang === 'en'
            ? 'Invalid login data. Please try again.'
            : '無効なログインデータです。もう一度お試しください。'
        );
        router.push('/');
      }
    };

    handleCallback();
  }, [router.isReady, router.query, lang, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="text-white text-xl">Loading...</div>
    </div>
  );
};

export default AuthCallback;
