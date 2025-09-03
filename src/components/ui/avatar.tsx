import { useAuth } from "@/hooks/useAuth";
import { User } from "lucide-react";
import Image from "next/image";

export default function Avatar() {
  const { user } = useAuth();
  return (
    <div className="rounded-full border-2 border-gray-500">
      {user?.profilePicture && user.profilePicture.trim() !== "" ? (
        <img
          src={user.profilePicture}
          alt="User profile picture"
          width={200}
          height={200}
        />
      ) : (
        <User />
      )}
    </div>
  );
}
