import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { LogOut, Shield, User, Users, Briefcase } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to={role === 'customer' ? '/portal' : '/dashboard'} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                B
              </div>
              <span className="font-bold text-slate-900 tracking-tight text-lg">Brightloop</span>
            </Link>

            <div className="hidden md:flex items-center space-x-4 text-sm font-medium">
              {role !== 'customer' && (
                <Link
                  to="/dashboard"
                  className="px-3 py-1.5 rounded-md text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition"
                >
                  Dashboard
                </Link>
              )}

              {role === 'admin' && (
                <Link
                  to="/admin/staff"
                  className="px-3 py-1.5 rounded-md text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition flex items-center gap-1.5"
                >
                  <Users className="w-4 h-4 text-indigo-500" />
                  Staff Management
                </Link>
              )}

              {role === 'customer' && (
                <Link
                  to="/portal"
                  className="px-3 py-1.5 rounded-md text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition"
                >
                  My Portal
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* User Profile & Role Badge */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900 leading-tight">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>

              {role === 'admin' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                  <Shield className="w-3 h-3" /> Admin
                </span>
              )}
              {role === 'staff' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                  <Briefcase className="w-3 h-3" /> Staff
                </span>
              )}
              {role === 'customer' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <User className="w-3 h-3" /> Customer
                </span>
              )}

              <button
                onClick={handleLogout}
                title="Sign out"
                className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

