export function nodeStreamToReadableStream(nodeStream: any) {
  return new ReadableStream({
    start(controller: any) {
      nodeStream.on('data', (chunk: any) => {
        controller.enqueue(chunk)
      })
      nodeStream.on('end', () => {
        controller.close()
      })
    },
  })
}