import { redirect } from 'next/navigation';

export default function LoginPage() {
  // Redirect to the root page which is now the login page
  redirect('/');
  return null;
}
