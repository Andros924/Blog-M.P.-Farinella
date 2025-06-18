/*
  # Schema per il sito di Maria Pia Farinella

  1. Nuove Tabelle
    - `articles`
      - `id` (uuid, primary key)
      - `title` (text, titolo dell'articolo)
      - `content` (text, contenuto HTML dell'articolo)
      - `excerpt` (text, riassunto dell'articolo)
      - `slug` (text, URL-friendly version del titolo)
      - `featured_image` (text, URL dell'immagine in evidenza)
      - `category` (text, categoria dell'articolo)
      - `tags` (text[], array di tag)
      - `published` (boolean, stato di pubblicazione)
      - `published_at` (timestamptz, data di pubblicazione)
      - `reading_time` (integer, tempo di lettura stimato in minuti)
      - `created_at` (timestamptz, data di creazione)
      - `updated_at` (timestamptz, data di ultimo aggiornamento)

  2. Sicurezza
    - Abilita RLS sulla tabella `articles`
    - Politiche per permettere la lettura pubblica degli articoli pubblicati
    - Politiche per permettere la gestione completa agli utenti autenticati
*/

-- Crea la tabella articles
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text DEFAULT '',
  slug text UNIQUE NOT NULL,
  featured_image text DEFAULT '',
  category text DEFAULT '',
  tags text[] DEFAULT '{}',
  published boolean DEFAULT false,
  published_at timestamptz,
  reading_time integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Abilita Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Politica per permettere la lettura pubblica degli articoli pubblicati
CREATE POLICY "Articoli pubblicati sono visibili a tutti"
  ON articles
  FOR SELECT
  USING (published = true);

-- Politica per permettere agli utenti autenticati di vedere tutti gli articoli
CREATE POLICY "Utenti autenticati possono vedere tutti gli articoli"
  ON articles
  FOR SELECT
  TO authenticated
  USING (true);

-- Politica per permettere agli utenti autenticati di inserire articoli
CREATE POLICY "Utenti autenticati possono inserire articoli"
  ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Politica per permettere agli utenti autenticati di aggiornare articoli
CREATE POLICY "Utenti autenticati possono aggiornare articoli"
  ON articles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Politica per permettere agli utenti autenticati di eliminare articoli
CREATE POLICY "Utenti autenticati possono eliminare articoli"
  ON articles
  FOR DELETE
  TO authenticated
  USING (true);

-- Crea indici per migliorare le performance
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);

-- Funzione per aggiornare automaticamente updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger per aggiornare automaticamente updated_at
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();