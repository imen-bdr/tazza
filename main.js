// Header Scroll 
let nav = document.querySelector(".navbar");
window.onscroll = function () {
    if (document.documentElement.scrollTop > 50) {
        nav.classList.add("header-scrolled");
    } else {
        nav.classList.remove("header-scrolled");
    }
};

// Nav hide  
let navBar = document.querySelectorAll(".nav-link");
let navCollapse = document.querySelector(".navbar-collapse.collapse");
navBar.forEach(function (a) {
    a.addEventListener("click", function () {
        navCollapse.classList.remove("show");
    });
});

// Données enrichies
const produits = [
    {
        nom: "Citron",
        type: "Fruit",
        description: "Un agrume riche en vitamine C.",
        preparation: "Peut être utilisé pour faire du jus, dans les plats, ou en tisane.",
        saison: "Hiver",
        bienfaits: ["Renforce l'immunité", "Détoxifiant"],
        associations: ["Menthe", "Gingembre"],
        varietes: ["Citron jaune", "Citron vert"],
        vitamines: ["C"]
    },
    {
        nom: "Jus de citron",
        type: "Jus",
        description: "Jus concentré pur à 99.99%, sans sucre ajouté.",
        preparation: "Ajoutez à l’eau tiède, au thé, ou dans la cuisine.",
        saison: "Toute l'année",
        bienfaits: ["Hydratant", "Stimule la digestion"],
        associations: ["Thé vert", "Curcuma"],
        varietes: [],
        vitamines: ["C"]
    },
    {
        nom: "Carotte",
        type: "Légume",
        description: "Légume racine riche en bêta-carotène.",
        preparation: "Râpée, en jus, cuite à la vapeur ou en soupe.",
        saison: "Printemps",
        bienfaits: ["Bonne pour la vue", "Améliore la peau"],
        associations: ["Orange", "Pomme"],
        varietes: ["Carotte orange", "Carotte pourpre"],
        vitamines: ["A", "K", "B6"]
    },
    {
        nom: "Orange",
        type: "Fruit",
        description: "Un fruit juteux et sucré, riche en vitamine C.",
        preparation: "À manger cru, en jus ou en dessert.",
        saison: "Hiver",
        bienfaits: ["Renforce les défenses", "Rafraîchissante"],
        associations: ["Carotte", "Cannelle"],
        varietes: ["Sanguine", "Navel"],
        vitamines: ["C", "B1"]
    },
    {
        nom: "Jus de pomme",
        type: "Jus",
        description: "Jus naturel doux et sucré.",
        preparation: "À boire frais, ou utiliser en cuisine.",
        saison: "Automne",
        bienfaits: ["Hydratant", "Source d'antioxydants"],
        associations: ["Cannelle", "Citron"],
        varietes: [],
        vitamines: ["C"]
    }
    // Tu peux ajouter plus de produits ici
];

let favoris = new Set(); // Système de favoris

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("searchInput");
    const resultsContainer = document.getElementById("resultsContainer");

    const filterType = document.getElementById("filterType");
    const filterSaison = document.getElementById("filterSaison");
    const filterVitamine = document.getElementById("filterVitamine");

    function renderProduits() {
        const searchTerm = input.value.toLowerCase();
        const typeVal = filterType?.value || "";
        const saisonVal = filterSaison?.value || "";
        const vitamineVal = filterVitamine?.value || "";

        resultsContainer.innerHTML = "";

        const results = produits.filter(p => {
            const searchMatch =
                p.nom.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm) ||
                p.preparation.toLowerCase().includes(searchTerm) ||
                (p.associations && p.associations.join(",").toLowerCase().includes(searchTerm));

            const typeMatch = typeVal === "" || p.type === typeVal;
            const saisonMatch = saisonVal === "" || p.saison === saisonVal;
            const vitamineMatch = vitamineVal === "" || (p.vitamines && p.vitamines.includes(vitamineVal));

            return searchMatch && typeMatch && saisonMatch && vitamineMatch;
        });

        if (results.length > 0) {
            results.forEach(p => {
                const isFavori = favoris.has(p.nom);
                const card = `
                    <div class="col-md-6 mb-4">
                        <div class="card h-100 shadow-sm">
                            <div class="card-body">
                                <h5 class="card-title">
                                    ${p.nom} (${p.type})
                                    <span class="float-end" style="cursor:pointer;" onclick="toggleFavori('${p.nom}')">
                                        ${isFavori ? "❤️" : "🤍"}
                                    </span>
                                </h5>
                                <p><strong>Description :</strong> ${p.description}</p>
                                <p><strong>Préparation :</strong> ${p.preparation}</p>
                                <p><strong>Saison :</strong> ${p.saison}</p>
                                <p><strong>Bienfaits :</strong> ${p.bienfaits.join(", ")}</p>
                                <p><strong>Associations :</strong> ${p.associations.join(", ")}</p>
                                <p><strong>Variétés :</strong> ${p.varietes.join(", ")}</p>
                                <p><strong>Vitamines :</strong> ${p.vitamines.join(", ")}</p>
                            </div>
                        </div>
                    </div>
                `;
                resultsContainer.innerHTML += card;
            });
        } else {
            resultsContainer.innerHTML = "<p class='text-center'>Aucun résultat trouvé.</p>";
        }
    }

    document.querySelector('.search-icon').addEventListener('click', renderProduits);
    input.addEventListener("keypress", e => { if (e.key === "Enter") renderProduits(); });
    filterType?.addEventListener("change", renderProduits);
    filterSaison?.addEventListener("change", renderProduits);
    filterVitamine?.addEventListener("change", renderProduits);
});

// Gestion des favoris
function toggleFavori(nom) {
    if (favoris.has(nom)) {
        favoris.delete(nom);
    } else {
        favoris.add(nom);
    }
    document.querySelector('.search-icon').click(); // Re-render
}
