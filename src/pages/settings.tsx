import AppShell from '@/components/custom/appshell';
import type { NextPage } from 'next';

const settings:NextPage = () => {
    return (
        <AppShell>
            <div className="flex flex-col items-center justify-center w-full">
                <h1 className="text-2xl font-bold">Settings Coming Soon!</h1>
            </div>
        </AppShell>
    );
}

export default settings