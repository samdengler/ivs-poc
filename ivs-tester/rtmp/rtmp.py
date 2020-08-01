import os
import json
import tempfile
import urllib.request
import shutil

DEFAULT_STREAM_LOOP_COUNT = 1

def start_stream_handler(event, context):
  print(json.dumps(event))

  f = download_source_video(event["sourceVideoUrl"])
  video_file_path = f.name
  ingest_server = f'rtmps://{event["channel"]["ingestEndpoint"]}/app/{event["channel"]["streamKey"]}'

  stream_loop_count = event.get("streamLoopCount") or DEFAULT_STREAM_LOOP_COUNT

  cmd = f'/opt/bin/ffmpeg -re -stream_loop {stream_loop_count} -i {video_file_path} -r 30 -c:v libx264 -pix_fmt yuv420p -profile:v main -preset veryfast -x264opts "nal-hrd=cbr:no-scenecut" -minrate 3000 -maxrate 3000 -g 60 -c:a aac -b:a 160k -ac 2 -ar 44100 -f flv {ingest_server}'
  print(cmd)
  os.system(cmd)

  f.close()
  return

def download_source_video(url):
  f = tempfile.NamedTemporaryFile()
  with urllib.request.urlopen(url) as response, open(f.name, 'wb') as out_file:
    shutil.copyfileobj(response, out_file)

  return f