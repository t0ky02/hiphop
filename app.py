import sys
import subprocess
import os
from flask import Flask, render_template, jsonify, send_from_directory, url_for
from werkzeug.utils import secure_filename
from mutagen.mp3 import MP3

app = Flask(__name__)
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg'}
app.config.from_pyfile('config.cfg')
navbar = app.config['NAVBAR']
footer = app.config['FOOTER']

# implement pip as a subprocess:
subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'mutagen'])


def audio_duration(length): 
    mins = length // 60  # calculate in minutes 
    length %= 60
    seconds = length  # calculate in seconds
    return mins, seconds


@app.route('/')
def index():
    # Mendapatkan daftar nama artis dari direktori music
    artists = os.listdir('static/music')
    return render_template('index.html', navbar=navbar, footer=footer, artists=artists)

@app.route('/artist/<artist>')
def artist(artist):
    songs = os.listdir(f'static/music/{artist}')
    durations =[]
    for i in songs:
        path = f'static/music/{artist}/{i}'
        audio = MP3(path) 
        audio_info = audio.info 
        length = int(audio_info.length) 
        mins, seconds = audio_duration(length)
        durations.append(f'{mins:02d}:{seconds:02d}')
    
    image_extension = next((ext for ext in app.config['ALLOWED_EXTENSIONS'] if os.path.exists(f'static/img/foto_artis/{artist}.{ext}')), None)
    image_url = url_for('static', filename=f'img/foto_artis/{artist}.{image_extension}')
    
    return jsonify(artist=artist, songs=songs, image_url=image_url, duration=durations)

@app.route('/<artist>/<filename>')
def play(artist, filename):
    #path = os.path.join('static/music', artist, filename)
    return send_from_directory('static/music', f'{artist}/{filename}')

if __name__ == '__main__':
    app.run(debug=True)

