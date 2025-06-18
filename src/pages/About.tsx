import React from 'react';
import { Award, Globe, Mic, Camera, BookOpen, Users, MapPin, Calendar, Languages, GraduationCap } from 'lucide-react';

const awards = [
  {
    title: "Premio Nazionale Troccoli-Magna Graecia (2018)",
    description: "Riconoscimento per l'alto valore del giornalismo culturale svolto in Rai. Premiata nella sezione 'Giornalismo radiotelevisivo' per aver dato voce al Mediterraneo e ai popoli in trasformazione.",
    quote: "«Una giornalista che ha saputo raccontare i paesi del sud del mondo con empatia e rigore» – Motivazione della giuria",
    imageUrl: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400",
    imageAlt: "Maria Pia Farinella durante la cerimonia del Premio Troccoli 2018"
  },
  {
    title: "Cittadinanza onoraria Cassano allo Ionio",
    description: "Conferita per l'impegno nella promozione del territorio e per la narrazione della realtà calabrese nei suoi reportage.",
    quote: "«La sua narrazione umana e rispettosa ha restituito dignità alla nostra terra» – Sindaco Giovanni Papasso",
    imageUrl: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400",
    imageAlt: "Cerimonia di consegna della cittadinanza onoraria a Cassano"
  },
  {
    title: "Prima fiduciaria donna Casagit Sicilia (2021)",
    description: "Elezione storica alla guida della rappresentanza regionale della Cassa Autonoma di Assistenza Integrativa dei Giornalisti Italiani.",
    quote: "«Essere la prima donna fiduciaria Casagit in Sicilia è un onore e una responsabilità» – M. P. Farinella",
    imageUrl: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
    imageAlt: "Maria Pia Farinella eletta fiduciaria Casagit"
  }
];

const documentaries = [
  "Il sogno della ragione (Leonardo Sciascia)",
  "Camerun, i figli della strada",
  "Etiopia, la sfida della pace",
  "Sicilia, le radici dell'autonomia",
  "Bufalino: dicerie intorno a uno scrittore"
];

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-journalist-800 mb-4">
              Maria Pia Farinella
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Giornalista e autrice siciliana con una lunga carriera dedicata 
              all'approfondimento internazionale e alla cultura
            </p>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-serif font-bold text-journalist-800 mb-6">
                Biografia
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
                <p>
                  Maria Pia Farinella è una giornalista e autrice siciliana con una lunga carriera 
                  dedicata all'approfondimento internazionale e alla cultura. Nata a Petralia Sottana (PA), 
                  nelle suggestive Madonie siciliane, ha conseguito due lauree con lode in Lingue e 
                  Letterature (inglese nel 1977 e spagnola nel 1982) all'Università di Palermo, 
                  oltre a un diploma in Filología Hispánica conseguito nel 1976 presso l'Universidad de Salamanca.
                </p>

                <p>
                  Tra il 1978 e il 1981, ha studiato a Madrid con Enrique Tierno Galván, promotore 
                  della transizione democratica spagnola, e ha facilitato le conferenze di Leonardo Sciascia 
                  nel 1982, dimostrando fin da giovane la sua passione per la cultura e l'impegno civile.
                </p>

                <p>
                  Dagli anni '80 ha collaborato con Radio Rai (1981-85) e il Giornale di Sicilia (dal 1979), 
                  ma è soprattutto in Rai che si è affermata come una delle voci più autorevoli del 
                  giornalismo internazionale italiano. Dal 1992 al 2017, per oltre vent'anni, è stata 
                  caporedattrice e inviata della rubrica <em>Mediterraneo</em>, una coproduzione 
                  internazionale tra Rai, France Télévisions, ERT e altri partner del bacino mediterraneo.
                </p>

                <p>
                  I suoi reportage l'hanno portata nei luoghi chiave della storia contemporanea: 
                  Europa, Medio Oriente, America Latina, Africa Subsahariana e Maghreb. Ha coordinato 
                  format televisivi di successo come Bellitalia, Italia delle Regioni e Ambiente Italia, 
                  sempre con un occhio attento alle trasformazioni sociali e culturali.
                </p>

                <p>
                  Femminista, europeista, appassionata di diritti e cultura, oggi è anche attivamente 
                  impegnata nella formazione giornalistica e nelle istituzioni della categoria, 
                  ricoprendo ruoli di responsabilità come tesoriera dell'Ordine dei Giornalisti di Sicilia 
                  e membro del CdA INPGI.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Quick Facts */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-journalist-800 mb-4">
                  Informazioni Personali
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-accent-600" />
                    <span>Nata a Petralia Sottana (PA), Sicilia</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Languages className="h-4 w-4 text-accent-600" />
                    <span>Lingue: Italiano, Inglese, Spagnolo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-4 w-4 text-accent-600" />
                    <span>Università di Palermo, Universidad de Salamanca</span>
                  </div>
                </div>
              </div>

              {/* Career Highlights */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-journalist-800 mb-4">
                  Tappe della Carriera
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Calendar className="h-4 w-4 text-accent-600 mt-0.5" />
                    <div>
                      <div className="font-medium">1979-presente</div>
                      <div className="text-gray-600">Giornale di Sicilia</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Calendar className="h-4 w-4 text-accent-600 mt-0.5" />
                    <div>
                      <div className="font-medium">1981-1985</div>
                      <div className="text-gray-600">Radio Rai</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Calendar className="h-4 w-4 text-accent-600 mt-0.5" />
                    <div>
                      <div className="font-medium">1992-2017</div>
                      <div className="text-gray-600">Rai - TGR Mediterraneo</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentaries */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-journalist-800 mb-4">
              Documentari e Reportage
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Una selezione dei principali documentari realizzati per Rai, 
              che testimoniano l'impegno nella narrazione culturale e sociale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentaries.map((doc, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start space-x-3">
                  <Camera className="h-6 w-6 text-accent-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-journalist-800 mb-2">{doc}</h3>
                    <p className="text-sm text-gray-600">Documentario Rai</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-journalist-800 mb-4">
              Premi e Riconoscimenti
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Una carriera riconosciuta a livello nazionale per l'eccellenza 
              nel giornalismo culturale e internazionale.
            </p>
          </div>

          <div className="space-y-12">
            {awards.map((award, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-serif font-bold text-journalist-800 mb-4">
                      {award.title}
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {award.description}
                    </p>
                    <blockquote className="border-l-4 border-accent-600 pl-4 italic text-gray-600">
                      {award.quote}
                    </blockquote>
                  </div>
                  <div className="flex justify-center">
                    <img
                      src={award.imageUrl}
                      alt={award.imageAlt}
                      className="w-full max-w-sm h-64 object-cover rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Roles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-journalist-800 mb-4">
              Incarichi Attuali
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Impegno continuo nelle istituzioni del giornalismo e nella formazione professionale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-journalist-800 mb-2">
                Tesoriera Ordine Giornalisti
              </h3>
              <p className="text-gray-600">Sicilia</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-journalist-800 mb-2">
                Consigliera CdA INPGI
              </h3>
              <p className="text-gray-600">Istituto Nazionale Previdenza</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-journalist-800 mb-2">
                Fiduciaria Casagit
              </h3>
              <p className="text-gray-600">Prima donna in Sicilia</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};