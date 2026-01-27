// src/services/baserowService.js

// 1) On importe axios pour faire les requêtes HTTP
import axios from "axios";

// 2) On lit les variables d'environnement définies dans .env.local
// Vite expose ces variables via import.meta.env
const BASEROW_API_URL = import.meta.env.VITE_BASEROW_API_URL;
const BASEROW_TABLE_ID = import.meta.env.VITE_BASEROW_TABLE_ID;
const BASEROW_API_TOKEN = import.meta.env.VITE_BASEROW_API_TOKEN;

// 3) On crée une instance axios préconfigurée pour Baserow
//    -> ça évite de répéter les headers et l'URL de base dans chaque requête
const baserowClient = axios.create({
  baseURL: BASEROW_API_URL,
  headers: {
    // Authentification : Baserow attend "Authorization: Token <token>"
    Authorization: `Token ${BASEROW_API_TOKEN}`,
  },
});

// 4) Fonction pour récupérer les lignes d'une table Baserow
//    - params optionnels pour filtrer/paginer plus tard
export async function fetchBaserowRows(params = {}) {
  try {
    // On construit l'URL du endpoint rows pour une table donnée
    // /api/database/rows/table/{table_id}/
    const url = `/api/database/rows/table/${BASEROW_TABLE_ID}/`;

    // user_field_names=true permet d'avoir les noms des colonnes
    // tels qu'affichés dans Baserow (plus lisible)
    const response = await baserowClient.get(url, {
      params: {
        user_field_names: true,
        ...params, // on peut ajouter page, size, filters, etc.
      },
    });

    // On retourne uniquement les résultats utiles (les lignes)
    return response.data;
  } catch (error) {
    // On log l'erreur pour le debug
    console.error("Erreur lors du fetch Baserow:", error);

    // On peut re-throw pour que le composant gère l'affichage d'erreur
    throw error;
  }
}
