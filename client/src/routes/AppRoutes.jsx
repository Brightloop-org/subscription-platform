import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Brightloop Subscriptions</h1>
        <p className="text-slate-600 mb-6 text-sm">
          Unified subscription management, automated billing, and revenue platform.
        </p>
        <div className="space-y-3">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-left text-slate-700">
            <span className="font-semibold block mb-1">Infrastructure Setup Ready:</span>
            • Server: Node.js + Express + Mongoose (MVC)<br/>
            • Client: React + Vite + Tailwind CSS<br/>
            • Database: MongoDB
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
