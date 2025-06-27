import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>À propos de Duneko</h1>
      
      <div style={styles.section}>
        <h2 style={styles.subtitle}>Notre mission</h2>
        <p style={styles.text}>
          Duneko révolutionne la gestion des déchets par des solutions innovantes
          et écologiques. Nous transformons les déchets en ressources précieuses
          pour construire un avenir plus vert.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>Notre technologie</h2>
        <p style={styles.text}>
          Grâce à notre plateforme intelligente, nous optimisons le tri, 
          la collecte et le recyclage des matériaux, réduisant l'impact 
          environnemental de 60%.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>Chiffres clés</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>+500 tonnes de déchets valorisés</li>
          <li style={styles.listItem}>32 communes partenaires</li>
          <li style={styles.listItem}>87% de taux de recyclage</li>
        </ul>
      </div>

      <div style={styles.ctaBox}>
        <p style={styles.ctaText}>
          Rejoignez la révolution verte !
        </p>
        <button style={styles.button}>Découvrir nos solutions</button>
      </div>
    </div>
  );
};

// Styles avec thème vert "écologie"
const styles = {
  container: {
    backgroundColor: "#f8fff2",
    minHeight: "100vh",
    padding: "40px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    lineHeight: 1.6
  },
  title: {
    color: "#1a5d1a",
    fontSize: "2.5rem",
    textAlign: "center" as const,
    marginBottom: "40px",
    borderBottom: "3px solid #4caf50",
    paddingBottom: "15px"
  },
  subtitle: {
    color: "#2e7d32",
    fontSize: "1.8rem",
    margin: "25px 0 15px 0"
  },
  text: {
    color: "#333",
    fontSize: "1.1rem",
    marginBottom: "20px"
  },
  section: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "25px",
    margin: "25px 0",
    boxShadow: "0 4px 8px rgba(46, 125, 50, 0.1)"
  },
  list: {
    paddingLeft: "20px"
  },
  listItem: {
    margin: "10px 0",
    color: "#333",
    fontSize: "1.1rem"
  },
  ctaBox: {
    backgroundColor: "#e8f5e9",
    borderLeft: "5px solid #4caf50",
    padding: "25px",
    marginTop: "40px",
    textAlign: "center" as const,
    borderRadius: "12px"
  },
  ctaText: {
    color: "#1b5e20",
    fontSize: "1.4rem",
    fontWeight: "bold" as const,
    marginBottom: "20px"
  },
  button: {
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    padding: "12px 30px",
    fontSize: "1.1rem",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontWeight: "bold" as const,
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
  }
};

export default AboutPage;