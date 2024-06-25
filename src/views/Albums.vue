<template>
  <div class="albums-container">
    <h1>Albums</h1>
    <div class="album" v-for="album in albums" :key="album.id">
      <!-- Menggunakan q-img untuk menampilkan gambar -->
      <q-img class="album-image"
             :src="getAlbumImageUrl(album)"
             img-fit="cover"
             @click="showPhoto(album.photos[0].url)">
      </q-img>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      albums: []
    };
  },
  mounted() {
    this.fetchAlbums();
  },
  methods: {
    async fetchAlbums() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        this.albums = response.data;
        
        // Fetch photos for each album
        await Promise.all(this.albums.map(async (album) => {
          const photoResponse = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`);
          album.photos = photoResponse.data;
        }));
      } catch (error) {
        console.error('Error fetching albums and photos:', error);
      }
    },
    getAlbumImageUrl(album) {
      // Menampilkan thumbnail foto pertama dalam album (jika ada)
      if (album.photos && album.photos.length > 0) {
        return album.photos[0].thumbnailUrl;
      } else {
        // Placeholder URL jika tidak ada foto
        return `https://via.placeholder.com/150/FF5733/FFFFFF?text=Album-${album.id}`;
      }
    },
    showPhoto(photoUrl) {
      // Navigasi langsung ke foto dalam ukuran sesungguhnya
      window.open(photoUrl, '_blank');
    }
  }
};
</script>

<style scoped>
.albums-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* Menyusun album dalam baris dan memanfaatkan ruang secara efektif */
}

.album {
  width: calc(50% - 10px); /* Menggunakan calc untuk mempertimbangkan margin */
  margin-bottom: 20px;
  cursor: pointer;
}

.album-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
