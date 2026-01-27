<!-- src/components/BaserowTable.vue -->
<template>
  <div class="baserow-wrapper">
    <!-- Titre de la section -->
    <h2>Baserow – Données de la table</h2>

    <!-- Loader pendant que les données arrivent -->
    <div v-if="loading" class="status">
      Chargement des données...
    </div>

    <!-- Message d'erreur si quelque chose s'est mal passé -->
    <div v-else-if="error" class="status error">
      Une erreur est survenue : {{ error }}
    </div>

    <!-- Affichage des données si tout est OK -->
    <div v-else>
      <!-- Si aucune ligne -->
      <p v-if="rows.length === 0">
        Aucune donnée trouvée.
      </p>

      <!-- Sinon on affiche les lignes -->
      <table class="baserow-table" v-else>
        <thead>
          <tr>
            <!-- On affiche dynamiquement les clés du premier objet comme entêtes -->
            <th v-for="(value, key) in rows[0]" :key="key">
              {{ key }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.id">
            <td v-for="(value, key) in row" :key="key">
              {{ formatCell(value) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// 1) Import des outils de réactivité de Vue
import { ref, onMounted } from "vue";

// 2) Import de la fonction de service qui appelle Baserow
import { fetchBaserowRows } from "../services/baserowService";

// 3) State réactif : rows, loading, error
const rows = ref([]);       // Stocke les données récupérées de Baserow
const loading = ref(false); // Indique si on est en cours de chargement
const error = ref(null);    // Stocke un éventuel message d'erreur

// 4) Fonction utilitaire pour formater une cellule (ex: tableau -> texte lisible)
function formatCell(value) {
  if (Array.isArray(value)) {
    // Si c'est un tableau, on rejoint les éléments par une virgule
    return value.join(", ");
  }
  if (typeof value === "object" && value !== null) {
    // Si c'est un objet, on le stringify pour le display
    return JSON.stringify(value);
  }
  return value;
}

// 5) Fonction qui appelle le service et met à jour le state
async function loadRows() {
  loading.value = true;
  error.value = null;

  try {
    // fetchBaserowRows retourne un objet avec count, next, previous, results
    const data = await fetchBaserowRows();

    // On stocke les résultats (les lignes)
    rows.value = data.results || [];
  } catch (err) {
    // On stocke un message d'erreur lisible pour l'utilisateur
    error.value = err.message || "Erreur inconnue";
  } finally {
    // On coupe le loader dans tous les cas
    loading.value = false;
  }
}

// 6) On appelle loadRows au montage du composant
onMounted(() => {
  loadRows();
});
</script>

<style scoped>
.baserow-wrapper {
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 1rem 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.status {
  padding: 0.5rem 0;
}

.status.error {
  color: #b00020;
  font-weight: 600;
}

.baserow-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.baserow-table th,
.baserow-table td {
  border: 1px solid #ccc;
  padding: 0.5rem;
}

.baserow-table th {
  background: #f5f5f5;
  text-align: left;
}
</style>
