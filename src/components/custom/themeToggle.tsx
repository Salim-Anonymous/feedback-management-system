"use client"

import useColorMode from '@/hooks/useColorMode'
import { SwitchMod } from '@/components/custom/mod/switch'
let color:string| ((value: string) => void)|undefined;
const ThemeToggle = () => {
    const [theme, setTheme] = useColorMode();
    color = theme;
    return (
    <div className="flex items-center justify-center">
        <SwitchMod
            id="theme-toggle"
            onClick={() =>{ 
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setTheme(theme === 'light' ? 'dark' : 'light')}
            }
            className='px-1 py-2 text-lg font-medium'
        >
            {theme !== 'light' ? "🌙 Dark" : "☀️ Light"}
        </SwitchMod>
    </div>
  )
}

export {color}

export default ThemeToggle