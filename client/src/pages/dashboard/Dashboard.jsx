import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { Shield, Briefcase, CheckCircle2, Users } from 'lucide-react';

export default function Dashboard() {
  const { user, role } = useAuth();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-3">
              {role === 'admin' ? <Shield className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
              <span>{role === 'admin' ? 'Administrator Workspace' : 'Internal Staff Workspace'}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Signed in as <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-indigo-700">{user?.email}</code> ({role.toUpperCase()} role)
            </p>
          </div>

          {role === 'admin' && (
            <Link
              to="/admin/staff"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition"
            >
              <Users className="w-4 h-4" />
              Manage Staff
            </Link>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-800 text-sm mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Role Permissions:
            </h3>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              {role === 'admin' ? (
                <>
                  <li>Full system control over products, plans, taxes, and discounts</li>
                  <li>Exclusive authority to add and manage internal staff members</li>
                  <li>Full visibility into active subscriptions, revenue reports, and invoices</li>
                </>
              ) : (
                <>
                  <li>Handle day-to-day customer subscription operations and quotations</li>
                  <li>Record incoming payments across different methods</li>
                  <li>Follow up on overdue invoices</li>
                  <li>Restricted from creating staff accounts or modifying system tax rules</li>
                </>
              )}
            </ul>
          </div>

          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
            <h3 className="font-semibold text-indigo-900 text-sm mb-2">Authentication Status</h3>
            <p className="text-xs text-indigo-700">
              JWT token securely issued and stored. RBAC route protection active.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

