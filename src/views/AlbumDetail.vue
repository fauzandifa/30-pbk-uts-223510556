<template>
  <div>
    <h2>{{ album.title }}</h2>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="photos.length > 0">
        <div v-for="photo in photos" :key="photo.id" @click="showPhoto(photo)">
          <q-img :src="photo.thumbnailUrl"></q-img>
        </div>
      </div>
      <div v-else>
        Tidak ada foto dalam album ini.
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'AlbumDetail',
  props: {
    albumId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const album = ref(null);
    const photos = ref([]);
    const loading = ref(false);

    onMounted(async () => {
      try {
        loading.value = true;

        // Ambil detail album
        const albumResponse = await axios.get(`https://jsonplaceholder.typicode.com/albums/${props.albumId}`);
        album.value = albumResponse.data;

        // Ambil foto-foto dalam album
        const photoResponse = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${props.albumId}`);
        photos.value = photoResponse.data;

        loading.value = false;
      } catch (error) {
        console.error('Error fetching album details and photos:', error);
        loading.value = false;
      }
    });

    const showPhoto = (photo) => {
      // Navigasi ke halaman tampilan foto dalam ukuran sebenarnya
      this.$router.push(`/albums/${props.albumId}/photos/${photo.id}`);
    };

    return {
      album,
      photos,
      loading,
      showPhoto,
    };
  },
};
</script>
