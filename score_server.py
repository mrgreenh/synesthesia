from flask import Flask, render_template, session, request
from flask.ext.socketio import SocketIO, emit, disconnect

from threading import Thread

import mido

app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
thread = None
rtmidi = mido.Backend('mido.backends.rtmidi')
portname = rtmidi.get_input_names()[0]

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/tracks')
def tracks():
    return render_template('tracks.html')

@app.route('/stage')
def stage():
    return render_template('stage.html')


#Write a template that imports layers and actors classes by reading a configuration file
#Starting point is a webpage with two options:

# Direct (1)
# ----------
# Stage  (2)
# ----------

#Write actors and layers properties from a json configuration file

if __name__ == '__main__':
    app.run()