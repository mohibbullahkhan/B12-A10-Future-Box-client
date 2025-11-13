import React, { useState, use } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthContext";

const theme = {
  primary: "#001c30",
  secondary: "#3468c0",
  base200: "#f0f0f0",
  base300: "#ffffff",
  accent: "#706f6f",
};

const MyProfile = () => {
  const { user, updateUser, setUser } = use(AuthContext);

  const [isUpdating, setIsUpdating] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");
  const [newImage, setNewImage] = useState(user?.photoURL || "");
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ backgroundColor: theme.base200 }}
      >
        <div className="text-xl font-semibold" style={{ color: theme.accent }}>
          Please log in to view your profile.
        </div>
      </div>
    );
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateUser({ displayName: newName, photoURL: newImage });

      const updatedUser = { ...user, displayName: newName, photoURL: newImage };

      setUser(updatedUser);

      toast.success("Profile updated successfully! 🎉");
      setIsUpdating(false);
    } catch (e) {
      toast.error("Failed to update profile. Please try again.", e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isUpdating) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ backgroundColor: theme.base200 }}
      >
        <div
          className="w-full max-w-lg rounded-2xl shadow-xl p-8"
          style={{ backgroundColor: theme.base300 }}
        >
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: theme.secondary }}
          >
            Update Your Profile
          </h2>

          <form onSubmit={handleUpdateSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium"
                style={{ color: theme.primary }}
              >
                New Name
              </label>
              <input
                id="name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2"
                style={{
                  borderColor: theme.accent,
                  color: theme.primary,
                  backgroundColor: theme.base200,
                  "--tw-ring-color": theme.secondary,
                }}
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium"
                style={{ color: theme.primary }}
              >
                New Image URL
              </label>
              <input
                id="image"
                type="url"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2"
                style={{
                  borderColor: theme.accent,
                  color: theme.primary,
                  backgroundColor: theme.base200,
                  "--tw-ring-color": theme.secondary,
                }}
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => setIsUpdating(false)}
                className="py-2 px-4 border rounded-lg font-semibold transition duration-150 hover:opacity-80 disabled:opacity-50"
                style={{
                  borderColor: theme.accent,
                  color: theme.primary,
                  backgroundColor: theme.base200,
                }}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-6 text-white font-semibold rounded-lg shadow-md transition duration-150 hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: theme.secondary }}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: theme.base200 }}
    >
      <div
        className="w-full max-w-lg rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:shadow-2xl"
        style={{ backgroundColor: theme.base300 }}
      >
        <div
          className="h-28 relative"
          style={{ backgroundColor: theme.primary }}
        >
          <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 mt-4">
            <img
              className="w-32 h-32 object-cover rounded-full border-4 shadow-lg"
              src={user.photoURL}
              alt={"User Profile"}
              style={{ borderColor: theme.base300 }}
            />
          </div>
        </div>

        <div className="pt-20 pb-8 px-8 text-center">
          <h2
            className="text-3xl font-extrabold mb-2"
            style={{ color: theme.primary }}
          >
            {user.displayName || "User Name Not Set"}
          </h2>
          <p
            className="text-lg mb-6 font-medium"
            style={{ color: theme.accent }}
          >
            {user.email}
          </p>

          <div
            className="border-t pt-6 space-y-4"
            style={{ borderColor: theme.base200 }}
          >
            <div
              className="p-4 rounded-lg text-left"
              style={{ backgroundColor: theme.base200 }}
            >
              <div
                className="flex justify-between items-center text-sm font-medium"
                style={{ color: theme.primary }}
              >
                <span>Account Status:</span>
                <span className="font-bold" style={{ color: theme.secondary }}>
                  Active
                </span>
              </div>
              <div
                className="flex justify-between items-center text-sm font-medium mt-2"
                style={{ color: theme.primary }}
              >
                <span>Member Since:</span>
                <span className="font-bold" style={{ color: theme.secondary }}>
                  Jan 2024
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setNewName(user.displayName || "");
                setNewImage(user.photoURL || "");
                setIsUpdating(true);
              }}
              className="w-full py-3 text-lg font-bold text-white rounded-xl shadow-lg transition duration-300 transform hover:scale-[1.01] cursor-pointer"
              style={{ backgroundColor: theme.secondary }}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
