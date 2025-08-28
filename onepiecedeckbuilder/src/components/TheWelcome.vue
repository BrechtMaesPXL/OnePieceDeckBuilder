<script setup>
import { ref } from "vue"

const slots = ref(Array.from({ length: 51 }, () => ({ code: "", url: "" })))

function updateUrl(slot) {
  if (slot.code.trim() !== "") {
    slot.url = `https://static.dotgg.gg/onepiece/card/${slot.code}.webp`
  } else {
    slot.url = ""
  }
}

function downloadDeck() {
  const newWindow = window.open("", "_blank")
  if (!newWindow) return

  // Create a full HTML page with cards in a grid (10 per row, no margins)
  newWindow.document.write(`
    <html>
      <head>
        <title>Deck Screenshot</title>
        <style>
          body {
            background-color: rgba(0,0,0,0.8);
            margin: 0;
            padding: 0;
            display: grid;
            grid-template-columns: repeat(10, 120px);
            grid-auto-rows: 170px;
            gap: 0;
            justify-content: center;
          }
          .card-slot {
            width: 120px;
            height: 170px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .card-slot img {
            width: 120px;
            height: 170px;
            border-radius: 8px;
          }
          .placeholder {
            width: 120px;
            height: 170px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px dashed #ccc;
            border-radius: 8px;
            font-size: 12px;
            color: white;
          }
        </style>
      </head>
      <body>
        ${slots.value
      .map(slot =>
          slot.url
              ? `<div class="card-slot"><img src="${slot.url}" /></div>`
              : `<div class="card-slot"><div class="placeholder">No Card</div></div>`
      )
      .join("")}
      </body>
    </html>
  `)
  newWindow.document.close()
  alert("Deck opened in a new tab. Use your browser's screenshot functionality to capture it!")
}
</script>

<template>
  <v-container fluid>
    <!-- Grid of cards -->
    <div id="deck-grid" class="card-grid">
      <div v-for="(slot, i) in slots" :key="i" class="card-slot">
        <div class="card-wrapper">
          <v-img
              v-if="slot.url"
              :src="slot.url"
              width="120"
              height="170"
              class="rounded shadow"
              cover
          />
          <div v-else class="placeholder">No Card</div>

          <!-- Input field on hover -->
          <div class="hover-input">
            <v-text-field
                v-model="slot.code"
                @input="updateUrl(slot)"
                label="Kaart code"
                variant="outlined"
                density="compact"
                hide-details
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Download button -->
    <v-btn color="primary" class="mt-4" @click="downloadDeck">
      Download Deck
    </v-btn>
  </v-container>
</template>

<style scoped>
:global(body) {
  background-color: rgba(0, 0, 0, 0.8);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 16px;
}

.card-slot {
  display: flex;
  justify-content: center;
}

.card-wrapper {
  position: relative;
  width: 120px;
  height: 170px;
}

.placeholder {
  width: 120px;
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  border-radius: 8px;
  font-size: 12px;
}

.hover-input {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: 8px;
}

.card-wrapper:hover .hover-input {
  opacity: 1;
}

.rounded {
  border-radius: 8px;
}

.shadow {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
</style>
