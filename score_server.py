from flask import Flask, render_template, session, request, jsonify
from flask.ext.socketio import SocketIO, emit, disconnect
from synesthesia.data_managing import Bookshelf as Bookshelf
import synesthesia.config as config

from threading import Thread
import json

import mido

app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
thread = None
rtmidi = mido.Backend('mido.backends.rtmidi')
portname = rtmidi.get_input_names()[0]

current_track_id = "foo"

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/tracks')
def tracks():
    return render_template('tracks.html')

@app.route('/stage')
def stage():
    return render_template('stage.html')

@app.route('/editor/<track_id>')
def editor(track_id):
    bookshelf = Bookshelf()
    track_data = bookshelf.load_track(track_id)

    return render_template('editor.html', track_data = track_data)

@app.route('/get_current_track')
def get_current_track():
    global current_track_id
    bookshelf = Bookshelf()
    track_data = bookshelf.load_track(current_track_id)
    return jsonify(**track_data)

@app.route('/get_stage_config')
def get_stage_config():
    return jsonify(**config.STAGE_CONFIG)

#Write a template that imports layers and actors classes by reading a configuration file
#Starting point is a webpage with two options:

# Direct (1)
# ----------
# Stage  (2)
# ----------

#Write actors and layers properties from a json configuration file

if __name__ == '__main__':
    app.run()