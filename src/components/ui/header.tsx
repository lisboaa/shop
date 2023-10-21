"use client"

import { MenuIcon, ShoppingCartIcon, LogInIcon, PercentIcon, ListOrderedIcon, HomeIcon } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";



const Header = () => {
    
    const { status } = useSession();

    const handlerLoginCheck = async () => {
        await signIn();
    }

    const handlerSignOut = async () => {
        await signOut();
    }

    return ( 
        <>
            <Card className="flex p-5 justify-between p-[1.875rem] items-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline">
                            <MenuIcon/>
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="left">
                        <SheetHeader className="text-left text-lg font-semibold">
                            Menu
                        </SheetHeader>
                    <div className="mt2 flex flex-col gap-3">
                        {status === "unauthenticated" && ( 
                        <Button onClick={handlerLoginCheck} variant="outline" className="w-full justify-start gap-2">
                            <LogInIcon size={16}/>
                            Fazer Login
                        </Button>
                        )}
                       
                       {status === "authenticated" && (
                        <Button onClick={handlerSignOut} variant="outline" className="w-full justify-start gap-2">
                            <LogInIcon size={16}/>
                            Fazer Logout
                        </Button>
                       )}

                        <Button variant="outline" className="w-full justify-start gap-2">
                            <PercentIcon size={16}/>
                            Ofertas
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2">
                            <HomeIcon size={16}/>
                            Inicio
                        </Button>
                        
                        <Button variant="outline" className="w-full justify-start gap-2">
                            <ListOrderedIcon size={16}/>
                            Catalogo
                        </Button>
                    </div>
                    </SheetContent>
                </Sheet>

                <h1 className="text-lg font-semibold">
                    <span className="text-primary">FSW</span>Store
                </h1>

                <Button size="icon" variant="outline">
                    <ShoppingCartIcon/>
                </Button>
            </Card>
        </>
     );
}

export default Header;