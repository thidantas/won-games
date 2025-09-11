import Auth from 'templates/Auth'
import FormSignIn from 'components/FormSignIn'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function SignIn() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  }

  return (
    <Auth title="Sign In">
      <FormSignIn />
    </Auth>
  )
}
