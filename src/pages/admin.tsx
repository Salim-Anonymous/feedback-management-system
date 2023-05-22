import React from 'react'
import {EditIcon, TrashIcon} from "lucide-react";
import AppShell from "@/components/custom/appshell";


//make sure to go to http://localhost:3000/feed

function Admin() {
    return (
        <AppShell>
        <div className="flex flex-col items-center justify-center">
            <div className="bg-white rounded-lg p-8 shadow-lg mt-6">
                <h1 className="text-2xl font-bold mb-6">Categories and Moderators Management</h1>

                <div className="flex border-2 rounded-md mt-6">
                    <div className="flex-grow p-2">Academic Performance</div>
                    <div className="flex-grow p-2">Ngawang Choden</div>
                    <div className="p-2">
                        <EditIcon />
                    </div>
                    <div className="p-2">
                        <TrashIcon />
                    </div>
                </div>

                <div className="flex border-2 rounded-md">
                    <div className="flex-grow p-2">Academic Performance</div>
                    <div className="flex-grow p-2">Ngawang Choden</div>
                    <div className="p-2">
                        <EditIcon />
                    </div>
                    <div className="p-2">
                        <TrashIcon />
                    </div>
                </div>

                <center>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
                        Add Category
                    </button>
                </center>
            </div>
        </div>
        </AppShell>
    )
}

export default Admin