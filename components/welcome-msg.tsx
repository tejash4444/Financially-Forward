"use client";
import {useUser} from "@clerk/nextjs";

export const WelcomeMsg =() =>{
    const {user,isLoaded} =useUser();

    return(
        <div className="space-y-2 mb-4" >
            <h2 className="text-2xl text-white font-medium" >
            🙏 नमस्ते {isLoaded ?"," :" "} {user?.firstName} 🙏
            </h2>
            <p className="text-sm lg:text-base text-[#89b6fd]">
                This is your Financial Overview Dashboard
            </p>
        </div>
    )
}