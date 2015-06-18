from flask import Flask, render_template, session, request, jsonify
from flask.ext.socketio import SocketIO, emit, disconnect
from synesthesia.data_managing import Bookshelf
from synesthesia.midi_managing import MidiManager
import synesthesia.config as config
import logging

import json

app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

CURRENT_TRACK_ID = ""

def on_midi_note(note):
    socketio.emit('midi_note', note, namespace = '/stage')

@app.route('/')
@app.route('/index')
def index():
    bookshelf = Bookshelf();
    tracks = bookshelf.get_tracks_list()
    return render_template('index.html', tracks=tracks)

@app.route('/direct/<track_id>')
def direct(track_id):
    set_current_track(track_id)
    return render_template('direct.html', track_id=track_id)

@app.route('/stage/')
@app.route('/stage/<track_id>')
def stage(track_id=None):
    if track_id is not None: set_current_track(track_id)
    return render_template('stage.html')

@app.route('/editor/<track_id>')
@app.route('/editor')
def editor(track_id=None):
    if track_id is not None: set_current_track(track_id)
    return render_template('editor.html')

@app.route('/get_current_track')
def get_current_track():
    global CURRENT_TRACK_ID
    bookshelf = Bookshelf()
    track_data = bookshelf.load_track(CURRENT_TRACK_ID)
    return jsonify(**track_data)

@app.route('/update_current_track', methods=["POST"])
def update_current_track():
    global CURRENT_TRACK_ID
    data = request.json["trackData"]
    bookshelf = Bookshelf()
    track_data = bookshelf.update_track(CURRENT_TRACK_ID, data)
    return jsonify(status=200, track_data=track_data)

@app.route('/get_stage_config')
def get_stage_config():
    return jsonify(**config.STAGE_CONFIG)

def set_current_track(track_id):
    global CURRENT_TRACK_ID
    CURRENT_TRACK_ID = track_id
    bookshelf = Bookshelf()
    track_data = bookshelf.ensure_track(CURRENT_TRACK_ID)

@socketio.on('connect', namespace='/stage')
def connect():
    global CURRENT_TRACK_ID
    logging.info( "Stage connecting")

    bookshelf = Bookshelf()
    track_data = bookshelf.load_track(CURRENT_TRACK_ID)
    midi_manager = MidiManager(on_midi_note, track_data)
    midi_manager.ignite()

    emit('message', {'message': 'Connected, midi loop started'})



if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    socketio.run(app)