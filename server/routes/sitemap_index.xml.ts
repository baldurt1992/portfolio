export default defineEventHandler((event) => {
  sendRedirect(event, '/sitemap.xml', 301)
})
