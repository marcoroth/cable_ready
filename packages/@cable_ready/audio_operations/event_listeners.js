export const setupAudio = () => {
  if (!document.audio && document.body.hasAttribute('data-unlock-audio')) {
    document.audio = new Audio(
      'data:audio/mpeg;base64,//OExAAAAAAAAAAAAEluZm8AAAAHAAAABAAAASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/P39/f39/f39/f39/f39/f39/f39/f39/f3+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/AAAAAAAAAAAAAAAAAAAAAAAAAAAAJAa/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//MUxAAAAANIAAAAAExBTUUzLjk2LjFV//MUxAsAAANIAAAAAFVVVVVVVVVVVVVV//MUxBYAAANIAAAAAFVVVVVVVVVVVVVV//MUxCEAAANIAAAAAFVVVVVVVVVVVVVV'
    )
    const unlockAudio = () => {
      document.body.removeEventListener('click', unlockAudio)
      document.body.removeEventListener('touchstart', unlockAudio)
      document.audio
        .play()
        .then(() => {})
        .catch(() => {})
    }
    document.body.addEventListener('click', unlockAudio)
    document.body.addEventListener('touchstart', unlockAudio)
  }
}

document.addEventListener('DOMContentLoaded', setupAudio)
