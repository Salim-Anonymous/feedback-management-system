"use client"

import useColorMode from '@/hooks/useColorMode'
import { SwitchMod } from '@/components/custom/mod/switch'

const ThemeToggle = () => {
    const [theme, setTheme] = useColorMode();

    return (
    <div className="flex items-center justify-center">
        <SwitchMod
            id="theme-toggle"
            onClick={() =>{ 
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setTheme(theme === 'light' ? 'dark' : 'light')}
            }
            className='px-1 py-2 text-sm font-medium'
        >
            {theme !== 'light' ? "🌙 dark" : "☀️ light"}
        </SwitchMod>
    </div>
  )
}

export default ThemeToggle