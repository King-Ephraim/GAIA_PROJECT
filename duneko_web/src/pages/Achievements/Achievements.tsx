import React, { useEffect, useState } from "react";
import { FaMedal, FaTrophy, FaStar, FaLeaf, FaRecycle } from "react-icons/fa";
import "./Achievements.css";

const AchievementsPage: React.FC = () => {
  // Achievement categories
  const categories = [
    { id: "all", name: "Tous", icon: <FaStar /> },
    { id: "recycling", name: "Recyclage", icon: <FaRecycle /> },
    { id: "eco", name: "Écologie", icon: <FaLeaf /> },
    { id: "community", name: "Communauté", icon: <FaMedal /> },
  ];

  const verses = [
    "Genèse 2:15 — L'Éternel Dieu prit l’homme et le plaça dans le jardin d'Éden pour le cultiver et pour le garder.",
    "Chaque petit geste compte dans la préservation de notre planète.",
    "Recycler aujourd’hui pour un meilleur demain.",
    "La Terre n’est pas un don de nos parents, ce sont nos enfants qui nous la prêtent.",
    "Réduire, Réutiliser, Recycler : les 3R du changement.",
    "Un monde plus propre commence avec vous.",
    "Protéger l’environnement, c’est se protéger soi-même.",
    "Ne jetez pas demain, agissez aujourd’hui.",
    "Psaume 24:1 — À l'Éternel la terre et ce qu’elle renferme, le monde et ceux qui l’habitent !",
    "Proverbes 12:10 — Le juste prend soin de ses bêtes, mais le cœur des méchants est cruel.",
    "Apocalypse 11:18 — ...et de détruire ceux qui détruisent la terre.",
    "Lévitique 25:23-24 — La terre ne se vendra point à perpétuité, car la terre est à moi...",
    "Ésaïe 55:12 — Car vous sortirez avec joie... les montagnes et les collines éclateront d’allégresse devant vous.",
    "Psaume 104:24 — Que tes œuvres sont en grand nombre, ô Éternel ! Tu les as toutes faites avec sagesse...",
  ];

  // Sample achievements data
  const achievements = [
    {
      id: 1,
      title: "Recycleur Débutant",
      description: "A recyclé plus de 100 kg de déchets",
      icon: <FaRecycle />,
      category: "recycling",
      progress: 100,
      date: "2023-05-15",
      unlocked: true,
    },
    {
      id: 2,
      title: "Éco-Citoyen",
      description: "A participé à 5 événements écologiques",
      icon: <FaLeaf />,
      category: "eco",
      progress: 100,
      date: "2023-07-22",
      unlocked: true,
    },
    {
      id: 3,
      title: "Ambassadeur Vert",
      description: "A convaincu 10 personnes de rejoindre la plateforme",
      icon: <FaMedal />,
      category: "community",
      progress: 100,
      date: "2023-09-10",
      unlocked: true,
    },
    {
      id: 4,
      title: "Maître du Tri",
      description: "A trié plus de 500 kg de déchets",
      icon: <FaRecycle />,
      category: "recycling",
      progress: 75,
      date: "",
      unlocked: false,
    },
    {
      id: 5,
      title: "Protecteur des Océans",
      description: "A participé à un nettoyage de plage",
      icon: <FaLeaf />,
      category: "eco",
      progress: 40,
      date: "",
      unlocked: false,
    },
    {
      id: 6,
      title: "Influenceur Vert",
      description: "A partagé 20 conseils écologiques sur les réseaux",
      icon: <FaMedal />,
      category: "community",
      progress: 20,
      date: "",
      unlocked: false,
    },
    {
      id: 7,
      title: "Expert en Recyclage",
      description: "A recyclé plus de 1000 kg de déchets",
      icon: <FaRecycle />,
      category: "recycling",
      progress: 0,
      date: "",
      unlocked: false,
    },
    {
      id: 8,
      title: "Gardien de la Forêt",
      description: "A planté 10 arbres",
      icon: <FaLeaf />,
      category: "eco",
      progress: 0,
      date: "",
      unlocked: false,
    },
  ];

  // User stats
  const userStats = {
    totalAchievements: 3,
    unlockedAchievements: 3,
    recyclingPoints: 1240,
    level: 5,
  };

  const [verset, setVerset] = useState(verses[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newQuote = verses[Math.floor(Math.random() * verses.length)];
      setVerset(newQuote);
    }, 40000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="achievements-container">
      <header className="achievements-header">
        <div className="header-content">
          <h1>Vos Réalisations</h1>
          <p>Suivez vos progrès et vos accomplissements écologiques</p>
        </div>
        <div className="header-graphic">
          <div className="trophy-icon">
            <FaTrophy />
          </div>
        </div>
      </header>

      {/* User stats section */}
      <section className="user-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FaMedal />
            </div>
            <div className="stat-info">
              <h3>Succès Débloqués</h3>
              <p className="stat-value">
                {userStats.unlockedAchievements} / {userStats.totalAchievements}
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaRecycle />
            </div>
            <div className="stat-info">
              <h3>Points de Recyclage</h3>
              <p className="stat-value">{userStats.recyclingPoints} pts</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaStar />
            </div>
            <div className="stat-info">
              <h3>Niveau Actuel</h3>
              <p className="stat-value">Niveau {userStats.level}</p>
            </div>
          </div>
        </div>

        <div className="level-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(userStats.level / 10) * 100}%` }}
            ></div>
          </div>
          <div className="level-labels">
            <span>Niveau {userStats.level}</span>
            <span>Niveau {userStats.level + 1}</span>
          </div>
        </div>
      </section>

      {/* Categories filter */}
      <section className="categories-section">
        <div className="section-title">
          <h2>Catégories</h2>
          <div className="title-decoration"></div>
        </div>
        <div className="categories-grid">
          {categories.map(category => (
            <button
              key={category.id}
              className="category-card"
            >
              <div className="category-icon">{category.icon}</div>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Achievements grid */}
      <section className="achievements-section">
        <div className="section-title">
          <h2>Succès Disponibles</h2>
          <div className="title-decoration"></div>
        </div>

        <div className="achievements-grid">
          {achievements.map(achievement => (
            <div
              key={achievement.id}
              className={`achievement-card ${achievement.unlocked ? "unlocked" : ""}`}
            >
              <div className="achievement-icon">{achievement.icon}</div>

              <div className="achievement-content">
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>

                {achievement.unlocked ? (
                  <div className="achievement-date">
                    <FaStar className="star-icon" />
                    <span>Débloqué le {achievement.date}</span>
                  </div>
                ) : (
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                    <span>{achievement.progress}%</span>
                  </div>
                )}
              </div>

              <div className={`achievement-status ${achievement.unlocked ? "unlocked" : ""}`}>
                {achievement.unlocked ? "Débloqué" : "En cours"}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="inspiration-quote">
        <p>{verset}</p>
      </div>
    </div>
  );
};

export default AchievementsPage;