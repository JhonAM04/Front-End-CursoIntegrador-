import { lesson } from '../../declarations/ApiDeclarations'

const LessonRender = ({ less }: { less: lesson }) => {

  const isYouTube = (url: string): boolean =>
    url.includes('youtube.com') || url.includes('youtu.be')

  const getYouTubeEmbedUrl = (url: string): string => {
    // Para enlaces tipo: https://www.youtube.com/watch?v=VIDEO_ID
    const match1 = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w-]+)/);
    if (match1) return `https://www.youtube.com/embed/${match1[1]}`;

    // Para enlaces tipo: https://youtu.be/VIDEO_ID
    const match2 = url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([\w-]+)/);
    if (match2) return `https://www.youtube.com/embed/${match2[1]}`;

    return url; // fallback
  }

  const isPDF = (url: string): boolean =>
    url.toLowerCase().endsWith('.pdf')

  return (
    <>
      {isYouTube(less.leccion) && (
        <iframe
            width='100%'
            height='700px'
            title={less.titulo}
            src={getYouTubeEmbedUrl(less.leccion)}
            allowFullScreen  
        />

      )}

      {isPDF(less.leccion) && (
        <iframe
          src={less.leccion}
          width="100%"
          height="90%"
          style={{ border: "none" }}
        ></iframe>
      )}
    </>
  )
}

export default LessonRender
