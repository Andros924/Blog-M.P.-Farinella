import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Eye, ArrowLeft, Tag, Image } from 'lucide-react';
import { RichTextEditor } from '../components/Editor/RichTextEditor';
import { supabase } from '../lib/supabase';
import { Article } from '../types';
import { createSlug, calculateReadingTime } from '../lib/utils';

export const ArticleEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [article, setArticle] = useState<Partial<Article>>({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: [],
    featured_image: '',
    published: false,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (isEditing && id) {
      fetchArticle(id);
    }
  }, [id, isEditing]);

  const fetchArticle = async (articleId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', articleId)
        .single();

      if (error) throw error;
      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (publish = false) => {
    if (!article.title || !article.content) {
      alert('Titolo e contenuto sono obbligatori');
      return;
    }

    setSaving(true);
    try {
      const slug = createSlug(article.title);
      const readingTime = calculateReadingTime(article.content);
      
      const articleData = {
        ...article,
        slug,
        reading_time: readingTime,
        published: publish,
        published_at: publish ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      };

      if (isEditing) {
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('articles')
          .insert([{
            ...articleData,
            created_at: new Date().toISOString(),
          }]);

        if (error) throw error;
      }

      navigate('/admin');
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Errore nel salvare l\'articolo');
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !article.tags?.includes(tagInput.trim())) {
      setArticle({
        ...article,
        tags: [...(article.tags || []), tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setArticle({
      ...article,
      tags: article.tags?.filter(tag => tag !== tagToRemove) || []
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin')}
              className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-serif font-bold text-journalist-800">
                {isEditing ? 'Modifica Articolo' : 'Nuovo Articolo'}
              </h1>
              <p className="text-gray-600">
                {isEditing ? 'Modifica il tuo articolo' : 'Crea un nuovo articolo'}
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 disabled:opacity-50 inline-flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Salvando...' : 'Salva Bozza'}
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="bg-accent-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-700 disabled:opacity-50 inline-flex items-center"
            >
              <Eye className="h-4 w-4 mr-2" />
              {saving ? 'Pubblicando...' : 'Pubblica'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titolo *
              </label>
              <input
                type="text"
                value={article.title || ''}
                onChange={(e) => setArticle({ ...article, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-lg"
                placeholder="Inserisci il titolo dell'articolo..."
              />
            </div>

            {/* Excerpt */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Riassunto
              </label>
              <textarea
                value={article.excerpt || ''}
                onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                placeholder="Breve riassunto dell'articolo..."
              />
            </div>

            {/* Content Editor */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Contenuto *</h3>
              </div>
              <div className="p-6">
                <RichTextEditor
                  content={article.content || ''}
                  onChange={(content) => setArticle({ ...article, content })}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={article.category || ''}
                onChange={(e) => setArticle({ ...article, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              >
                <option value="">Seleziona categoria</option>
                <option value="Inchieste">Inchieste</option>
                <option value="Politica">Politica</option>
                <option value="Società">Società</option>
                <option value="Economia">Economia</option>
                <option value="Cronaca">Cronaca</option>
                <option value="Cultura">Cultura</option>
              </select>
            </div>

            {/* Featured Image */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Image className="h-4 w-4 inline mr-1" />
                Immagine in evidenza
              </label>
              <input
                type="url"
                value={article.featured_image || ''}
                onChange={(e) => setArticle({ ...article, featured_image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                placeholder="URL dell'immagine..."
              />
              {article.featured_image && (
                <div className="mt-3">
                  <img
                    src={article.featured_image}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="h-4 w-4 inline mr-1" />
                Tag
              </label>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-sm"
                  placeholder="Aggiungi tag..."
                />
                <button
                  onClick={addTag}
                  className="bg-accent-600 text-white px-3 py-2 rounded-md hover:bg-accent-700 text-sm"
                >
                  +
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm flex items-center"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Article Stats */}
            {article.content && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Statistiche</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Parole: {article.content.split(/\s+/).length}</div>
                  <div>Tempo di lettura: ~{calculateReadingTime(article.content)} min</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};