import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, BookOpen, Globe, Camera, Mic } from 'lucide-react';
import { ArticleCard } from '../components/Articles/ArticleCard';
import { supabase } from '../lib/supabase';
import { Article } from '../types';

export const Home: React.FC = () => {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      // Fetch featured articles
      const { data: featured } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(3);

      // Fetch recent articles
      const { data: recent } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(6);

      setFeaturedArticles(featured || []);
      setRecentArticles(recent || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      // Set empty arrays as fallback
      setFeaturedArticles([]);
      setRecentArticles([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-journalist-800 to-journalist-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Maria Pia Farinella
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Giornalista e autrice siciliana con una lunga carriera dedicata all'approfondimento 
              internazionale e alla cultura. Caporedattrice Rai per oltre vent'anni, 
              inviata nei luoghi chiave della storia contemporanea.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/articles"
                className="bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-700 transition-colors inline-flex items-center justify-center"
              >
                Leggi gli Articoli
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-journalist-800 transition-colors"
              >
                Scopri di più
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-3xl font-bold text-journalist-800 mb-2">25+</h3>
              <p className="text-gray-600">Anni di Carriera</p>
            </div>
            <div className="text-center">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-3xl font-bold text-journalist-800 mb-2">4</h3>
              <p className="text-gray-600">Continenti Visitati</p>
            </div>
            <div className="text-center">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-3xl font-bold text-journalist-800 mb-2">20+</h3>
              <p className="text-gray-600">Documentari Rai</p>
            </div>
            <div className="text-center">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-3xl font-bold text-journalist-800 mb-2">3</h3>
              <p className="text-gray-600">Premi Nazionali</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {!loading && featuredArticles.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-journalist-800 mb-4">
                Articoli in Evidenza
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Le inchieste più importanti e gli approfondimenti che hanno fatto la differenza.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article, index) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  featured={index === 0}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-journalist-800 mb-6">
                Chi è Maria Pia Farinella
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Maria Pia Farinella è una giornalista e autrice siciliana con una lunga carriera 
                dedicata all'approfondimento internazionale e alla cultura. Nata a Petralia Sottana (PA), 
                ha conseguito due lauree con lode in Lingue e Letterature (inglese e spagnola) 
                all'Università di Palermo, oltre a un diploma in Filología Hispánica conseguito a Salamanca.
              </p>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Dagli anni '80 ha collaborato con Radio Rai e il Giornale di Sicilia, ma è soprattutto 
                in Rai che si è affermata: per oltre vent'anni è stata caporedattrice e inviata della 
                rubrica <em>Mediterraneo</em>, una coproduzione internazionale tra Rai, France Télévisions, 
                ERT e altri partner del bacino mediterraneo.
              </p>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                I suoi reportage l'hanno portata nei luoghi chiave della storia contemporanea, 
                dal Medio Oriente all'Africa Subsahariana. Femminista, europeista, appassionata 
                di diritti e cultura, oggi è anche attivamente impegnata nella formazione 
                giornalistica e nelle istituzioni della categoria.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center text-accent-600 hover:text-accent-700 font-semibold"
              >
                Leggi la biografia completa
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="/IMG-20230922-WA0000.jpg"
                alt="Maria Pia Farinella"
                className="rounded-lg shadow-lg w-full"
                onError={(e) => {
                  // Fallback to a placeholder if the image fails to load
                  (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800";
                }}
              />
              <div className="absolute -bottom-6 -right-6 bg-accent-600 text-white p-6 rounded-lg">
                <p className="font-semibold">25+ anni</p>
                <p className="text-sm">di esperienza</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-journalist-800 mb-4">
              Premi e Riconoscimenti
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Una carriera riconosciuta a livello nazionale per l'eccellenza nel giornalismo culturale e internazionale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-journalist-800 mb-2">
                Premio Troccoli-Magna Graecia
              </h3>
              <p className="text-gray-600 mb-2">2018</p>
              <p className="text-sm text-gray-500">
                Per l'alto valore del giornalismo culturale e televisivo
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-journalist-800 mb-2">
                Cittadinanza Onoraria
              </h3>
              <p className="text-gray-600 mb-2">Cassano allo Ionio, 2018</p>
              <p className="text-sm text-gray-500">
                Per l'impegno nella promozione del territorio calabrese
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-journalist-800 mb-2">
                Prima Fiduciaria Casagit
              </h3>
              <p className="text-gray-600 mb-2">Sicilia, 2021</p>
              <p className="text-sm text-gray-500">
                Prima donna eletta fiduciaria regionale in Sicilia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      {!loading && recentArticles.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-journalist-800">
                Ultimi Articoli
              </h2>
              <Link
                to="/articles"
                className="text-accent-600 hover:text-accent-700 font-semibold inline-flex items-center"
              >
                Vedi tutti
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentArticles.slice(0, 6).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-16 bg-journalist-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Resta aggiornato
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Iscriviti alla newsletter per ricevere i miei ultimi articoli 
            e aggiornamenti direttamente nella tua casella di posta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="La tua email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
            <button className="bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-700 transition-colors">
              Iscriviti
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};