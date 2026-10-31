import React, { useState, useEffect } from 'react';
import { getStaffApi, createStaffApi } from '../../api/auth.js';
import { UserPlus, Users, AlertCircle, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

export default function StaffManagement() {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Password policy check
  const isLengthValid = password.length > 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isPasswordValid = isLengthValid && hasUpperCase && hasLowerCase && hasSpecial;

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await getStaffApi();
      if (res?.success) {
        setStaffList(res.staff || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch staff members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isPasswordValid) {
      setError('Staff password must meet all policy requirements.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await createStaffApi({ name, email, password });
      setSuccess(`Staff account created for ${res.user.name} (${res.user.email})`);
      setName('');
      setEmail('');
      setPassword('');
      fetchStaff();
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating staff member');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-1 text-indigo-600 font-semibold text-sm">
          <ShieldCheck className="w-5 h-5" />
          <span>Admin Access Only</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Internal Staff Management</h1>
        <p className="text-sm text-slate-600 mt-1">
          Brightloop Policy: Only administrators can create and manage internal staff accounts.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-sm text-rose-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-500 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-sm text-emerald-700">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-500 mt-0.5" />
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Staff Form */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-indigo-600" />
            Add New Staff Member
          </h2>

          <form onSubmit={handleCreateStaff} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sarah Jenkins"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Company Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarah@brightloop.com"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Temporary Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {/* Password Policy Tracker */}
              <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5">
                <p className="font-semibold text-slate-700">Password Checklist:</p>
                <div className="flex items-center gap-1.5">
                  {isLengthValid ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-slate-400" />}
                  <span className={isLengthValid ? 'text-emerald-700 font-medium' : 'text-slate-600'}>
                    &gt; 8 characters ({password.length}/9+)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {hasUpperCase ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-slate-400" />}
                  <span className={hasUpperCase ? 'text-emerald-700 font-medium' : 'text-slate-600'}>
                    Uppercase letter (A-Z)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {hasLowerCase ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-slate-400" />}
                  <span className={hasLowerCase ? 'text-emerald-700 font-medium' : 'text-slate-600'}>
                    Lowercase letter (a-z)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {hasSpecial ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-slate-400" />}
                  <span className={hasSpecial ? 'text-emerald-700 font-medium' : 'text-slate-600'}>
                    Special character (!@#$%^&*)
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || !isPasswordValid}
              className="w-full py-2.5 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition"
            >
              {submitting ? 'Creating Staff Member...' : 'Create Staff Member'}
            </button>
          </form>
        </div>

        {/* Staff Members List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-600" />
              Active Staff Members ({staffList.length})
            </h2>
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm text-slate-500">
              Loading staff accounts...
            </div>
          ) : staffList.length === 0 ? (
            <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-lg">
              <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-700">No staff members created yet</p>
              <p className="text-xs text-slate-500 mt-1">Use the form on the left to add internal team members.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Email</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Role</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {staffList.map((member) => (
                    <tr key={member._id} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-medium text-slate-900">{member.name}</td>
                      <td className="px-4 py-3 text-slate-600">{member.email}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          Internal Staff
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs">
                        {new Date(member.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

