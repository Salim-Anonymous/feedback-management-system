import React from 'react'
import { useMediaQuery } from 'react-responsive';
import { Button } from '@/components/ui/button';
import {
    SidebarOpen,
    SidebarClose,
  } from "lucide-react";

export default function SidebarButton({
    open,
    setOpen
}:{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1023px)" });
  return (
    <>
    {isMobileOrTablet && (
        <Button
          className="transition-all duration-1000 ease-in-out"
          variant="ghost"
          onClick={() => setOpen(!open)}
        >
          {!open ? <SidebarOpen size={24} /> : <SidebarClose size={24} />}
        </Button>
      )}
    </>
  )
}
