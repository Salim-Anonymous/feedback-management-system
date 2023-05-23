import AppShell from "@/components/custom/appshell";
import TabComponent from "@/components/ui/profile/option";
import ProfilePicture from "@/components/ui/profile/profilePicture";
import React from "react";

const ProfilePage = () => {
  return (
    <AppShell>
        <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-center">My profile</h1>
      <ProfilePicture />
      <TabComponent />
    </div>
    </AppShell>
  );
};

export default ProfilePage;