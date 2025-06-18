import React from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Award, Users, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-journalist-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-lg font-serif font-semibold mb-4">Maria Pia Farinella</h3>
            <p className="text-gray-300 mb-4">
              Giornalista e autrice siciliana con oltre 25 anni di esperienza nel giornalismo 
              internazionale. Specializzata in reportage culturali e inchieste approfondite 
              dal Mediterraneo al mondo.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-accent-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Riconoscimenti</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-accent-400" />
                <span className="text-gray-300">Premio Troccoli-Magna Graecia 2018</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-accent-400" />
                <span className="text-gray-300">Cittadinanza onoraria Cassano allo Ionio</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-accent-400" />
                <span className="text-gray-300">Prima fiduciaria Casagit Sicilia</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contatti</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent-400" />
                <span className="text-gray-300">maria.farinella@email.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent-400" />
                <span className="text-gray-300">+39 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-accent-400" />
                <span className="text-gray-300">Palermo, Sicilia</span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="La tua email"
                  className="flex-1 px-3 py-2 bg-journalist-700 border border-journalist-600 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm"
                />
                <button className="bg-accent-600 px-3 py-2 rounded-r-md hover:bg-accent-700 transition-colors text-sm">
                  Iscriviti
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-journalist-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Maria Pia Farinella. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};