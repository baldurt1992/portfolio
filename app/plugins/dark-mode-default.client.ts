export default defineNuxtPlugin(() => {
  const colorMode = useColorMode()
  const storageKey = 'baldur-dark-default-v1'

  try {
    if (!localStorage.getItem(storageKey)) {
      colorMode.preference = 'dark'
      localStorage.setItem(storageKey, '1')
    }
  } catch {
    colorMode.preference = 'dark'
  }
})
