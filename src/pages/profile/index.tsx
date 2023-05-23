import React from 'react'
import AppShell from "@/components/custom/appshell";
import {api} from "@/utils/api";
import {useRouter} from "next/router";

function Profile() {
    const router = useRouter();
    const {id} = router.query;
    const {data: categories, error} = api.category.getAll.useQuery({text: ""});
    return (
        <AppShell>
            <div className="flex flex-col">
                {id}
            </div>
        </AppShell>
    )
}

export default Profile