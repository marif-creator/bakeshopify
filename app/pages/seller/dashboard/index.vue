<script setup lang="ts">
// Redirect to overview page as the main dashboard
const router = useRouter()

// Redirect to overview on mount
onMounted(() => {
  router.replace('/seller/dashboard/overview')
})

// Define page meta for authentication and layout
definePageMeta({
  auth: true,
  layout: 'seller'
})
</script>