import { MutedCardWithHeader } from '~/component/lib'

export default function VideoDisplayCard({ url }: { url: string }) {
  function getVideoID(videoURL: string) {
    const Id = videoURL
      .split('/')
      .find((item) => item.includes('BV'))
      ?.split('?')[0]
    return `//player.bilibili.com/player.html?&bvid=${Id}&page=1&high_quality=1&danmaku=0`
  }
  const videoSrc = getVideoID(url)
  return (
    <MutedCardWithHeader additionalCSS="p-2 md:w-full ">
      toggle
      <h1 id="内容" className="sr-only scroll-mt-16">
        视频
      </h1>
      <iframe
        src={videoSrc}
        title="视频"
        scrolling="no"
        height="500px"
        allowFullScreen={false}
        sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
        frameBorder="no"
      />
      <div />
    </MutedCardWithHeader>
  )
}
