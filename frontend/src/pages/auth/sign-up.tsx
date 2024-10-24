import { Card } from '@/components/ui/card'
import { SignUpForm } from './components/sign-up-form'
import { Link } from 'react-router-dom'
import TorfresmaLogo from '@/assets/logoIconPreto.png'
import TorfresmaLogoEmpresa from '@/assets/logotipo_preto.png'

export default function SignUp() {
  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
          <div className=' flex items-center justify-center'>
            <img
              src={TorfresmaLogo}
              width={55}
              height={55}
              alt='Logo'
            />
            <img
              src={TorfresmaLogoEmpresa}
              width={200}
              height={200}
              alt='Logo'
            />
          </div>
          <Card className='p-6'>
            <div className='mb-2 flex flex-col space-y-2 text-left'>
              <h1 className='text-lg font-semibold tracking-tight'>
                Criar um conta
              </h1>
              <p className='text-sm text-muted-foreground'>
                Digite seu e-mail e senha para criar uma conta. <br />
                Já tem uma conta? {' '}
                <Link
                  to='/login'
                  className='underline underline-offset-4 hover:text-primary'
                >
                  Entrar
                </Link>
              </p>
            </div>
            <SignUpForm />
          </Card>
        </div>
      </div>
    </>
  )
}
