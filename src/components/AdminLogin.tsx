import { useState } from 'react';
import { Lock, Eye, EyeOff, X } from 'lucide-react';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ADMIN_CODE = 'nyancat123';

export function AdminLogin({ isOpen, onClose, onSuccess }: AdminLoginProps) {
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code === ADMIN_CODE) {
      setError(false);
      setCode('');
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div 
        className={`w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden ${
          shake ? 'animate-shake' : ''
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">Admin-Zugang</h2>
              <p className="text-xs text-slate-500">Nur für Entwickler</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Freischaltungscode
          </label>
          
          <div className="relative">
            <input
              type={showCode ? 'text' : 'password'}
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(false);
              }}
              placeholder="Code eingeben..."
              className={`w-full px-4 py-3 pr-12 rounded-xl border-2 text-sm transition-colors ${
                error 
                  ? 'border-red-300 bg-red-50 focus:border-red-500' 
                  : 'border-slate-200 bg-slate-50 focus:border-slate-900'
              } focus:outline-none`}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowCode(!showCode)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
              <span>❌</span> Falscher Code
            </p>
          )}

          <button
            type="submit"
            className="w-full mt-4 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all"
          >
            Zugang freischalten
          </button>
        </form>
      </div>
    </div>
  );
}
