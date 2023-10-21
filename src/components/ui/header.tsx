"use client"

import { MenuIcon, ShoppingCartIcon, LogInIcon, PercentIcon, ListOrderedIcon, HomeIcon } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Separator } from "@/components/ui/separator"




const Header = () => {
    
    const { status, data } = useSession();

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
                    
                    {status === "authenticated" && data?.user && (
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 py-4">
                                <Avatar>
                                    <AvatarFallback>
                                        {data.user.name?.[0].toLocaleUpperCase()}
                                    </AvatarFallback>
                                    {data?.user?.image && <AvatarImage src={data.user.image}/>}
                                </Avatar>

                                <div className="flex flex-col">
                                    <p className="font-medium">{data.user.name}</p>
                                    <p className="text-sm opacity-75">Boas Compras!</p>
                                </div>
                            </div>
                            <Separator/>
                        </div>
                    )}
                    <div className="mt4 flex flex-col gap-3">
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
                    <span className="text-primary">LIS </span>Store
                </h1>

                <Button size="icon" variant="outline">
                    <ShoppingCartIcon/>
                </Button>
            </Card>
        </>
     );
}

export default Header;