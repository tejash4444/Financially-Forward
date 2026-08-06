// const SignUpPage =()=>{
//     return (
//         <div>
//             Sign Up Page
//         </div>
//     );
// };

// export default SignUpPage;
//by export default our previous function becomes a route
//[[..]] this is going to give our auth parameter to catch every callback url and everything
//else it needs to properly handle or redirect to this authentication page

// import { SignUp } from '@clerk/nextjs'

// export default function Page() {
//   return <SignUp />
// }

// const SignInPage =()=>{
//     return (
//         <div>
//             Sign In Page
//         </div>
//     );
// };

// export default SignInPage;
//by export default our previous function becomes a route
import Image from "next/image";
import {Loader2} from "lucide-react";
import { SignUp, ClerkLoaded,ClerkLoading } from '@clerk/nextjs'
import Logo from "/logo.svg";
export default function Page() {
  return( 
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2'>
        <div className='h-full lg:flex flex-col items-center justify-center px-4'>
            <div className='text-center space-y-4 pt-16'>
                <h1 className="font-bold text-3xl text-[#2E2A47]">
                Welcome !!
                </h1>
                <p className='text-base text-[#7E8CA0]'>
                    Login or create account to get back to dashboard.
                </p>
            </div>
            <div className='flex items-center justify-center mt-8'>
                <ClerkLoaded>
  <SignUp />
  </ClerkLoaded>
  <ClerkLoading>
    <Loader2 className="animate-spin text-muted-foreground"/>
  </ClerkLoading>
  </div>
  </div>
  <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
    <Image src={Logo} height={100} width={100} alt="logo"/>
  </div>
  </div>
);
}