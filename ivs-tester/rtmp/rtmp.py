import json
import tempfile
import urllib.request
import shutil
import subprocess

# Allow 5 seconds to cleanup ffmpeg before function times out
LAMBDA_TIMEOUT_OFFSET_IN_MILLIS = 5 * 1000

def start_stream_handler(event, context):
  print(json.dumps(event))

  f = download_source_video(event["sourceVideoUrl"])
  video_file_path = f.name
  ingest_server = f'rtmps://{event["channel"]["ingestEndpoint"]}/app/{event["channel"]["streamKey"]}'

  # timeout - if specified in the event, use it unless lambda timeout will come first
  lambda_offset_timeout_seconds = (context.get_remaining_time_in_millis() - LAMBDA_TIMEOUT_OFFSET_IN_MILLIS) / 1000;
  if event.get("streamTimeoutSeconds") < lambda_offset_timeout_seconds:
    timeout_seconds = event.get("streamTimeoutSeconds")
  else:
    timeout_seconds = lambda_offset_timeout_seconds

  try:
    cmd = f'/opt/bin/ffmpeg -re -stream_loop -1 -i {video_file_path} -r 30 -c:v libx264 -pix_fmt yuv420p -profile:v main -preset veryfast -x264opts "nal-hrd=cbr:no-scenecut" -minrate 3000 -maxrate 3000 -g 60 -c:a aac -b:a 160k -ac 2 -ar 44100 -f flv {ingest_server}'
    print(f'timeout_seconds={timeout_seconds}, cmd={cmd}')
    subprocess.run(cmd, shell=True, check=True, timeout=timeout_seconds)
  except subprocess.TimeoutExpired:
    return
  finally:
    f.close()

  return

def download_source_video(url):
  f = tempfile.NamedTemporaryFile()
  with urllib.request.urlopen(url) as response, open(f.name, 'wb') as out_file:
    shutil.copyfileobj(response, out_file)

  return f