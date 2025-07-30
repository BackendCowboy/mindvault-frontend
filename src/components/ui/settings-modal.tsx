// src/components/ui/settings-modal.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, User, Lock, Trash2, Save } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  userName?: string;
  onUserUpdate: (email: string, name?: string) => void;
}

export default function SettingsModal({ 
  isOpen, 
  onClose, 
  userEmail, 
  userName = "",
  onUserUpdate 
}: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "account">("profile");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Profile form state
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);

  // Password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!isOpen) return null;

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // TODO: Replace with actual API call when you add user update endpoint
      // await apiFetch("/users/me", {
      //   method: "PUT",
      //   body: JSON.stringify({ name, email })
      // });

      // For now, just simulate success
      setTimeout(() => {
        setMessage("Profile updated successfully!");
        onUserUpdate(email, name);
        setLoading(false);
      }, 1000);

    } catch {
      setError("Failed to update profile. Please try again.");
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      // TODO: Replace with actual API call when you add change password endpoint
      // await apiFetch("/users/change-password", {
      //   method: "POST",
      //   body: JSON.stringify({ 
      //     current_password: currentPassword,
      //     new_password: newPassword 
      //   })
      // });

      // For now, just simulate success
      setTimeout(() => {
        setMessage("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setLoading(false);
      }, 1000);

    } catch {
      setError("Failed to change password. Please check your current password.");
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = confirm(
      "Are you absolutely sure you want to delete your account? This action cannot be undone and will permanently delete all your journal entries."
    );

    if (!confirmed) return;

    const doubleConfirm = prompt(
      'Type "DELETE" to confirm account deletion:'
    );

    if (doubleConfirm !== "DELETE") {
      alert("Account deletion cancelled.");
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // await apiFetch("/users/me", { method: "DELETE" });
      
      alert("Account deletion is not yet implemented. Please contact support if you need to delete your account.");
      setLoading(false);
    } catch {
      setError("Failed to delete account. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "profile"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <User className="h-4 w-4 inline mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "security"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Lock className="h-4 w-4 inline mr-2" />
            Security
          </button>
          <button
            onClick={() => setActiveTab("account")}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "account"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Trash2 className="h-4 w-4 inline mr-2" />
            Account
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Messages */}
          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      This will be displayed on your profile
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Used for login and account recovery
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>{loading ? "Saving..." : "Save Profile"}</span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5" />
                  <span>Change Password</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <PasswordInput
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <PasswordInput
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                      minLength={6}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <PasswordInput
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      required
                      minLength={6}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex items-center space-x-2"
                  >
                    <Lock className="h-4 w-4" />
                    <span>{loading ? "Changing..." : "Change Password"}</span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Account Tab */}
          {activeTab === "account" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-600">
                  <Trash2 className="h-5 w-5" />
                  <span>Danger Zone</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <h3 className="font-medium text-red-900 mb-2">Delete Account</h3>
                    <p className="text-sm text-red-700 mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <Button
                      onClick={handleDeleteAccount}
                      disabled={loading}
                      variant="outline"
                      className="border-red-300 text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}