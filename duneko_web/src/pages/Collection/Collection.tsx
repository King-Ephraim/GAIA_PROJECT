import React, { useState } from "react";
import './Collection.css';

interface WasteItem {
  id: number;
  type: string;
  quantity: number;
  region: string;
  collectionDate: string;
  canton: string;
  collectionState: string;
  validated: boolean;
  deleted: boolean;
}

const CollectionPage: React.FC = () => {
  // Données initiales des déchets
  const initialWasteData: WasteItem[] = [
    { id: 1, type: "Plastique", quantity: 120, region: "Lomé", canton: "Canton A", collectionDate: "2023-10-05", collectionState: "fréquent", validated: true, deleted: false },
    { id: 2, type: "Verre", quantity: 85, region: "Lomé", canton: "Canton B", collectionDate: "2023-10-06", collectionState: "occasionnel", validated: true, deleted: false },
    { id: 3, type: "Métal", quantity: 45, region: "Kpalimé", canton: "Canton C", collectionDate: "2023-10-07", collectionState: "rare", validated: false, deleted: false },
    { id: 4, type: "Papier", quantity: 210, region: "Sokodé", canton: "Canton D", collectionDate: "2023-10-08", collectionState: "inconnu", validated: true, deleted: false },
    { id: 5, type: "Organique", quantity: 150, region: "Kara", canton: "Canton E", collectionDate: "2023-10-09", collectionState: "fréquent", validated: false, deleted: true },
    { id: 6, type: "Électronique", quantity: 75, region: "Dapaong", canton: "Canton F", collectionDate: "2023-10-10", collectionState: "occasionnel", validated: true, deleted: false },
    { id: 7, type: "Textile", quantity: 95, region: "Lomé", canton: "Canton G", collectionDate: "2023-10-11", collectionState: "rare", validated: false, deleted: false },
    { id: 8, type: "Déchets verts", quantity: 180, region: "Kpalimé", canton: "Canton H", collectionDate: "2023-10-12", collectionState: "fréquent", validated: true, deleted: false },
  ];

  const [wasteData] = useState<WasteItem[]>(initialWasteData);
  const [selectedRegion, setSelectedRegion] = useState("Lomé");
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fonction pour exporter en CSV
  const exportToCSV = () => {
    // Entête CSV
    const headers = "ID,Canton,Type,Quantité (kg),Région,Date de collecte,Etat de la collecte,Validé,Supprimé\n";
    
    // Création du corps du CSV
    const csvContent = wasteData.map(item => 
      `${item.id},${item.canton},${item.type},${item.quantity},${item.region},${item.collectionDate},${item.collectionState},${item.validated ? "Oui" : "Non"},${item.deleted ? "Oui" : "Non"}`
    ).join("\n");

    // Combiner entête et données
    const fullCSV = headers + csvContent;

    // Créer et télécharger le fichier
    const blob = new Blob([fullCSV], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", "collecte_dechets.csv");
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtrer les données par région et fréquence
  const filteredData = wasteData.filter(item => 
    (selectedRegion === "Toutes" || item.region === selectedRegion) &&
    (!selectedFrequency || item.collectionState === selectedFrequency)
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="collection-container">
      <div className="collection-header">
        <div className="header-left">
          <h1>Collecte des Déchets</h1>
          <p>Suivi et gestion des collectes de déchets au Togo</p>
        </div>
        <button onClick={exportToCSV} className="download-button">
          <i className="fas fa-download"></i> Télécharger CSV
        </button>
      </div>

      <div className="categorie">
        <div className="country-info">
          <div className="country-flag">
            <div className="flag-stripe yellow"></div>
            <div className="flag-stripe green"></div>
            <div className="flag-stripe red"></div>
            <div className="flag-stripe white"></div>
          </div>
          <div className="country-text">
            <h2>Togo</h2>
            <p>Compagnie: CollectDechets</p>
          </div>
        </div>
        
        <div className="region-selector">
          <label>Région:</label>
          <select 
            value={selectedRegion} 
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="region-select"
          >
            <option value="Toutes">Toutes les régions</option>
            <option value="Lomé">Lomé</option>
            <option value="Kara">Kara</option>
            <option value="Kpalimé">Kpalimé</option>
            <option value="Sokodé">Sokodé</option>
            <option value="Dapaong">Dapaong</option>
          </select>
        </div>
      </div>

      <div className="filter-section">
        <h3>Filtrer par fréquence:</h3>
        <div className="frequency-buttons">
          <button 
            className={`frequency-button ${selectedFrequency === "fréquent" ? "active" : ""}`}
            onClick={() => setSelectedFrequency(selectedFrequency === "fréquent" ? null : "fréquent")}
          >
            Fréquent
          </button>
          <button 
            className={`frequency-button ${selectedFrequency === "occasionnel" ? "active" : ""}`}
            onClick={() => setSelectedFrequency(selectedFrequency === "occasionnel" ? null : "occasionnel")}
          >
            Occasionnel
          </button>
          <button 
            className={`frequency-button ${selectedFrequency === "rare" ? "active" : ""}`}
            onClick={() => setSelectedFrequency(selectedFrequency === "rare" ? null : "rare")}
          >
            Rare
          </button>
          <button 
            className={`frequency-button ${selectedFrequency === "inconnu" ? "active" : ""}`}
            onClick={() => setSelectedFrequency(selectedFrequency === "inconnu" ? null : "inconnu")}
          >
            Inconnu
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="waste-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Canton</th>
              <th>Type</th>
              <th>Quantité (kg)</th>
              <th>Région</th>
              <th>Date de collecte</th>
              <th>État de la collecte</th>
              <th>Validé</th>
              <th>Supprimé</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.canton}</td>
                <td>
                  <span className={`waste-type ${item.type.toLowerCase().replace(/\s/g, '-')}`}>
                    {item.type}
                  </span>
                </td>
                <td className="quantity">{item.quantity} kg</td>
                <td>{item.region}</td>
                <td>{item.collectionDate}</td>
                <td>
                  <span className={`collection-state ${item.collectionState}`}>
                    {item.collectionState}
                  </span>
                </td>
                <td>
                  {item.validated 
                    ? <span className="status-badge valid"><i className="fas fa-check"></i></span> 
                    : <span className="status-badge invalid"><i className="fas fa-times"></i></span>
                  }
                </td>
                <td>
                  {item.deleted 
                    ? <span className="status-badge deleted"><i className="fas fa-trash"></i></span> 
                    : <span className="status-badge not-deleted">-</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-info">
          Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, filteredData.length)} sur {filteredData.length} entrées
        </div>
        <div className="pagination-controls">
          <button 
            className="pagination-button" 
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            &lt;&lt;
          </button>
          <button 
            className="pagination-button" 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`pagination-button ${currentPage === page ? "active" : ""}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          
          <button 
            className="pagination-button" 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
          <button 
            className="pagination-button" 
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;