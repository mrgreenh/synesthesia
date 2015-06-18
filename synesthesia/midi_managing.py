import simplejson as json
import synesthesia.config as config
from synesthesia.data_managing import Bookshelf as Bookshelf
from threading import Thread
import mido
import logging


class MidiManager:
    def __init__(self, callback):
        self._note_event_callback = callback

    def ignite(self):
        #can start multiple, listening to various busses
        self.midi_loop_thread = MidiBusThread(manager=self)
        self.midi_loop_thread.start()

    def on_midi_note(self, note):
        self._note_event_callback(note)

class MidiBusThread(Thread):
    def __init__(self, manager):
        super(MidiBusThread, self).__init__()
        self._manager = manager

    def run(self):
        rtmidi = mido.Backend('mido.backends.rtmidi')
        #Will have to be passed to the function
        busname = rtmidi.get_input_names()[0]

        logging.info("Igniting midi event loop")
        with rtmidi.open_input(busname) as port:
            for message in port:
                note = {
                    'note': getattr(message, 'note', None),
                    'velocity': getattr(message, 'velocity', None),
                    'type': getattr(message, 'type', None),
                    'channel': getattr(message, 'channel', None),
                    'bus': busname
                    }

                self._manager.on_midi_note(note)
                logging.info( "%s" % note)

        if port.closed:
            print("Yup, it's closed.")
