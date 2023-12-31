export async function startStream(
  videoId: string,
  audioId: string,
  constraints: MediaTrackConstraints
): Promise<MediaStream> {
  const newStream = await navigator.mediaDevices.getUserMedia({
    video: { 
      facingMode: { exact: "environment" },
      // deviceId: { exact: videoId } 
    },
  });
  const tracks = newStream.getTracks();
  tracks.forEach((track) => track.applyConstraints(constraints));
  return newStream;
}
