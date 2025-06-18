import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PenTool, Home, FileText, Settings, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface HeaderProps {
  isAuthenticated: boolean;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isAuthenticated, onSignOut }) => {
  const location = useLocation();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onSignOut();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <PenTool className="h-8 w-8 text-accent-600" />
              <div>
                <h1 className="text-xl font-serif font-bold text-journalist-800">
                  Maria Pia Farinella
                </h1>
                <p className="text-xs text-journalist-500 -mt-1">Giornalista d'Inchiesta</p>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-accent-600 bg-accent-50' 
                  : 'text-journalist-600 hover:text-accent-600 hover:bg-gray-50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/articles"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/articles') 
                  ? 'text-accent-600 bg-accent-50' 
                  : 'text-journalist-600 hover:text-accent-600 hover:bg-gray-50'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Articoli</span>
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/admin"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/admin') 
                      ? 'text-accent-600 bg-accent-50' 
                      : 'text-journalist-600 hover:text-accent-600 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
                
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-journalist-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Esci</span>
                </button>
              </>
            )}
          </nav>

          {!isAuthenticated && (
            <Link
              to="/login"
              className="bg-accent-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-accent-700 transition-colors"
            >
              Accedi
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};