import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { User, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function CustomerPortal() {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
          <User className="w-3.5 h-3.5" />
          <span>Customer Self-Service Portal</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Welcome, {user?.name}
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Registered customer account: <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">{user?.email}</code>
        </p>

        <div className="mt-6 p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
          <div className="font-semibold text-slate-800 flex items-center gap-1.5 text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Brightloop RBAC Guard:
          </div>
          <p>
            As a registered customer, your account permissions are strictly scoped to self-service view. You have access only to your own subscriptions, invoices, and payment receipts without access to administrative controls or other customers' records.
          </p>
        </div>
      </div>
    </div>
  );
}

