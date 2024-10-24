import { UserAuthForm } from './components/user-auth-form'
import TorfresmaLogo from '@/assets/logoIconVerde.png'
import BannerImage from '@/assets/bannerTorfresma.png'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/register');
  };

  return (
    <>
      <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-[1fr_40vw] lg:px-0'>
        <div className='relative hidden h-full flex-col bg-cover bg-no-repeat bg-center rounded-r-[32px] p-10 text-white dark:border-r lg:flex'
          style={{ backgroundImage: `url(${BannerImage})`, backgroundSize: 'cover' }}>
          <div className='absolute inset-0 bg-zinc-900/10 rounded-r-[32px]' />
          <div className='relative z-20 flex items-center text-lg font-medium'>
            <img
              src={TorfresmaLogo}
              width={55}
              height={55}
              alt='Logo'
            />
          </div>

          <div className='relative z-20 mt-auto'>
            <blockquote className='space-y-2'>
              <p className='text-lg'>
                Avaliação para Desenvolvedor de Software.
              </p>
              <footer className='text-sm'>Lucca Menezes</footer>
            </blockquote>
          </div>
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
              <p className='text-sm text-muted-foreground'>
                Digite seu e-mail e senha abaixo para entrar na sua conta
              </p>
            </div>
            <UserAuthForm />
            <button
              onClick={handleCreateAccount}
              className='mt-4 text-sm hover:underline'>
              Não tem uma conta? Crie uma agora!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
