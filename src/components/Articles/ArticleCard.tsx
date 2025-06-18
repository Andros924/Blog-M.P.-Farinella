import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag } from 'lucide-react';
import { Article } from '../../types';
import { formatDate } from '../../lib/utils';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
  const cardClasses = featured
    ? "bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    : "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300";

  return (
    <article className={cardClasses}>
      {article.featured_image && (
        <div className={`relative ${featured ? 'h-64' : 'h-48'} overflow-hidden`}>
          <img
            src={article.featured_image}
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-accent-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
          </div>
        </div>
      )}
      
      <div className={`p-${featured ? '8' : '6'}`}>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(article.published_at || article.created_at)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{article.reading_time} min di lettura</span>
          </div>
        </div>

        <h2 className={`font-serif font-bold text-journalist-800 mb-3 line-clamp-2 ${
          featured ? 'text-2xl' : 'text-xl'
        }`}>
          <Link 
            to={`/articles/${article.slug}`}
            className="hover:text-accent-600 transition-colors"
          >
            {article.title}
          </Link>
        </h2>

        <p className={`text-gray-600 mb-4 line-clamp-3 ${featured ? 'text-lg' : ''}`}>
          {article.excerpt}
        </p>

        {article.tags && article.tags.length > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="h-4 w-4 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {article.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <Link
          to={`/articles/${article.slug}`}
          className="inline-flex items-center text-accent-600 hover:text-accent-700 font-medium transition-colors"
        >
          Leggi tutto
          <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
};