import React from 'react'
import {EditIcon, TrashIcon} from "lucide-react";
import AppShell from "@/components/custom/appshell";
import {api} from "@/utils/api";
import CategoryDialog from "@/components/custom/add-category";
function Admin() {

    const {data: categories } = api.category.getAll.useQuery({text: ""});
    const {data: users} = api.user.getAll.useQuery({text: ""});
    const deleteCategory = api.category.deleteCategory.useMutation();

    return (
        <AppShell>
        <div className="flex flex-col">
            <div className="rounded-lg p-8 shadow-lg mt-6 border">
                <h1 className="text-2xl font-bold mb-6">Categories Management</h1>
                {
                    categories?.length ===0 ? <div className="flex flex-col items-center justify-center">
                        <span className="text-xl font-bold">No categories found</span>
                        <span className="text-lg">Add a category to get started</span>
                    </div> : ""
                }
                {
                    categories?.map((category, index) => {
                        return (<div
                            key={index.toString()+"category-admin"}
                            className="flex border-2 rounded-md mt-6">
                            <div className="flex-grow p-1">{category.name}</div>
                            <div className="flex-grow p-1 text-gray-300">
                                {users?.find(user => user.id === category.moderatorId)?.name}
                            </div>
                            <div className="p-2">
                                <EditIcon />
                            </div>
                            <div className="p-2">
                                <TrashIcon
                                    className='hover:text-red-500 cursor-pointer'
                                    onClick={() => deleteCategory.mutate({categoryId:category.id})}
                                />
                            </div>
                        </div>)} )
                }
                <CategoryDialog />
            </div>
        </div>
        </AppShell>
    )
}

export default Admin